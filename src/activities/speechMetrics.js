// Delivery measurements for "say it out loud" practice, all computed in the browser.
// Nothing is uploaded: the recording and the measurements stay on the learner's device.
const FRAME_MS = 30

// Records the microphone, samples loudness and pitch every 30 ms, and transcribes where the browser can.
export async function startCapture({ onLevel, onWords } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
  const AC = window.AudioContext || window.webkitAudioContext
  const ctx = new AC()
  const src = ctx.createMediaStreamSource(stream)
  const an = ctx.createAnalyser()
  an.fftSize = 2048
  src.connect(an)
  const buf = new Float32Array(an.fftSize)
  const frames = []
  const t0 = performance.now()
  const timer = setInterval(() => {
    an.getFloatTimeDomainData(buf)
    let sum = 0
    for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i]
    const rms = Math.sqrt(sum / buf.length)
    frames.push({ t: (performance.now() - t0) / 1000, rms, pitch: rms > 0.008 ? detectPitch(buf, ctx.sampleRate) : 0 })
    onLevel?.(Math.min(1, rms * 8))
  }, FRAME_MS)

  let rec = null, chunks = []
  try {
    rec = new MediaRecorder(stream)
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
    rec.start()
  } catch { rec = null }

  // Live transcript (Chrome, Edge, Safari). Other browsers: the learner types what they said.
  const R = window.SpeechRecognition || window.webkitSpeechRecognition
  let sr = null, finalText = '', interim = ''
  if (R) {
    try {
      sr = new R()
      sr.lang = 'en-US'; sr.continuous = true; sr.interimResults = true
      sr.onresult = (e) => {
        interim = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) finalText += e.results[i][0].transcript + ' '
          else interim += e.results[i][0].transcript
        }
        onWords?.((finalText + interim).trim())
      }
      sr.onerror = () => {}
      sr.start()
    } catch { sr = null }
  }

  return {
    hasTranscript: !!sr,
    async stop() {
      clearInterval(timer)
      const blob = await new Promise((res) => {
        if (!rec || rec.state === 'inactive') return res(null)
        rec.onstop = () => res(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }))
        rec.stop()
      })
      // Give the recogniser a moment to deliver its last words.
      const text = await new Promise((res) => {
        if (!sr) return res('')
        let done = false
        const finish = () => { if (!done) { done = true; res((finalText + ' ' + interim).replace(/\s+/g, ' ').trim()) } }
        sr.onend = finish
        try { sr.stop() } catch { finish() }
        setTimeout(finish, 1200)
      })
      stream.getTracks().forEach((t) => t.stop())
      ctx.close().catch(() => {})
      return { blob, frames, transcript: text }
    },
  }
}

// Autocorrelation pitch estimate in the human speaking range (70–400 Hz). 0 when unclear.
function detectPitch(buf, rate) {
  const n = buf.length
  const minLag = Math.floor(rate / 400), maxLag = Math.floor(rate / 70)
  let best = 0, bestLag = 0, energy = 0
  for (let i = 0; i < n; i++) energy += buf[i] * buf[i]
  if (!energy) return 0
  for (let lag = minLag; lag <= maxLag; lag++) {
    let c = 0
    for (let i = 0; i < n - lag; i++) c += buf[i] * buf[i + lag]
    c /= energy
    if (c > best) { best = c; bestLag = lag }
  }
  return best > 0.45 && bestLag ? rate / bestLag : 0
}

const median = (xs) => { if (!xs.length) return 0; const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)] }
const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor((s.length - 1) * p)] || 0 }

export const HEDGES = ['um', 'uh', 'erm', 'er', 'kind of', 'sort of', 'i guess', 'maybe', 'just', 'i mean', 'you know', 'actually', 'sorry', 'i was wondering', 'a little bit', 'hopefully']

export function countHedges(text) {
  const t = ' ' + String(text).toLowerCase().replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ') + ' '
  const found = []
  for (const h of HEDGES) {
    const m = t.split(' ' + h + ' ').length - 1
    if (m) found.push({ word: h, n: m })
  }
  return found
}

// Turns the raw frames into pace, pauses, phrase endings and hedges.
export function analyse(frames, transcript) {
  const out = { ok: false }
  if (frames.length < 20) return out
  const rmsAll = frames.map((f) => f.rms)
  const thr = Math.max(pct(rmsAll, 0.15) * 3, 0.012)
  const speech = frames.map((f) => f.rms > thr)
  const first = speech.indexOf(true), last = speech.lastIndexOf(true)
  if (first < 0 || last - first < 10) return out
  const speechSec = frames[last].t - frames[first].t

  // Silences of 0.4 s or more between words count as pauses; they split the speech into phrases.
  const minGap = Math.round(400 / FRAME_MS)
  const segments = [], pauses = []
  let segStart = first, gap = 0
  for (let i = first; i <= last; i++) {
    if (speech[i]) {
      if (gap >= minGap) { segments.push([segStart, i - gap - 1]); pauses.push(gap * FRAME_MS / 1000); segStart = i }
      gap = 0
    } else gap++
  }
  segments.push([segStart, last])

  // Phrase endings: the pitch over the last part of each phrase against the rest of it.
  const endings = segments.map(([a, b]) => {
    const p = frames.slice(a, b + 1).filter((f) => f.pitch > 0)
    if (p.length < 8) return null
    const cut = Math.max(4, Math.round(p.length * 0.3))
    const head = median(p.slice(0, -cut).map((f) => f.pitch)), tail = median(p.slice(-cut).map((f) => f.pitch))
    if (!head || !tail) return null
    const r = tail / head
    return r < 0.94 ? 'down' : r > 1.06 ? 'up' : 'level'
  }).filter(Boolean)

  const words = String(transcript).trim().split(/\s+/).filter(Boolean).length
  const wpm = words && speechSec > 1 ? Math.round(words / speechSec * 60) : null
  const pitched = frames.slice(first, last + 1).filter((f) => f.pitch > 0)
  return {
    ok: true,
    seconds: Math.round(speechSec * 10) / 10,
    words, wpm,
    pauses: pauses.length,
    longestPause: pauses.length ? Math.round(Math.max(...pauses) * 10) / 10 : 0,
    endings,
    down: endings.filter((e) => e === 'down').length,
    up: endings.filter((e) => e === 'up').length,
    medianPitch: Math.round(median(pitched.map((f) => f.pitch))),
    contour: pitched.map((f) => [Math.round((f.t - frames[first].t) * 100) / 100, Math.round(f.pitch)]),
    hedges: countHedges(transcript),
  }
}

// Plain-language reading of each measurement. Tone: 'good' | 'warn'.
export function readings(m) {
  const r = []
  if (m.wpm == null) r.push({ k: 'Pace', v: '—', tone: 'neutral', t: 'Add the words you said in the box below to measure your pace.' })
  else if (m.wpm < 100) r.push({ k: 'Pace', v: `${m.wpm} words/min`, tone: 'warn', t: 'Slow. Calm is good, but this may sound unsure. Aim for about 120–160.' })
  else if (m.wpm > 170) r.push({ k: 'Pace', v: `${m.wpm} words/min`, tone: 'warn', t: 'Fast. Rushing can sound nervous. Slow down to about 120–160.' })
  else r.push({ k: 'Pace', v: `${m.wpm} words/min`, tone: 'good', t: 'A steady, confident pace.' })

  if (m.pauses === 0) r.push({ k: 'Pauses', v: 'None', tone: 'warn', t: 'Add one short pause after your key point, so it lands.' })
  else if (m.pauses >= 3 && m.pauses / Math.max(m.seconds, 1) > 0.3) r.push({ k: 'Pauses', v: `${m.pauses}`, tone: 'warn', t: 'Many pauses. That can sound hesitant: try to speak in fuller phrases.' })
  else r.push({ k: 'Pauses', v: `${m.pauses} (longest ${m.longestPause}s)`, tone: 'good', t: 'Purposeful pauses give your words weight.' })

  if (!m.endings.length) r.push({ k: 'Phrase endings', v: '—', tone: 'neutral', t: 'Not enough clear voice to read the pitch. Try again a little closer to the microphone.' })
  else if (m.up > m.down) r.push({ k: 'Phrase endings', v: `${m.down} of ${m.endings.length} go down`, tone: 'warn', t: 'Your voice mostly rises at the end, which can sound like asking permission. On your position, let the pitch drop.' })
  else r.push({ k: 'Phrase endings', v: `${m.down} of ${m.endings.length} go down`, tone: 'good', t: 'Downward endings sound sure. A rise is fine on a real question.' })

  const n = m.hedges.reduce((a, h) => a + h.n, 0)
  if (!m.words) r.push({ k: 'Hedges and fillers', v: '—', tone: 'neutral', t: 'Add the words you said to check for hedges.' })
  else if (n >= 2) r.push({ k: 'Hedges and fillers', v: `${n}: ${m.hedges.map((h) => `"${h.word}"`).join(', ')}`, tone: 'warn', t: 'Hedges soften your position and sound passive. Cut them.' })
  else if (n === 1) r.push({ k: 'Hedges and fillers', v: `1: "${m.hedges[0].word}"`, tone: 'warn', t: 'Almost clean. Cut that one hedge and your position sounds firmer.' })
  else r.push({ k: 'Hedges and fillers', v: 'None', tone: 'good', t: 'Clean, direct wording.' })
  return r
}
