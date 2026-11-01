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
    frames.push({ t: (performance.now() - t0) / 1000, rms, pitch: rms > 0.005 ? detectPitch(buf, ctx.sampleRate) : 0 })
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

// Pitch estimate in the human speaking range (65–600 Hz, so high notes count too), or 0 when the frame isn't clearly voiced.
// Normalised autocorrelation with "first strong peak" picking (McLeod & Wyvill's method), which
// avoids most octave errors. Hissy sounds (s, f, sh, breath) are skipped: they have no pitch.
export function detectPitch(buf, rate) {
  const n = buf.length
  let zc = 0
  for (let i = 1; i < n; i++) if ((buf[i - 1] < 0) !== (buf[i] < 0)) zc++
  if (zc / (n / rate) > 5000) return 0 // too many zero crossings: a fricative or noise, not a voice
  const minLag = Math.floor(rate / 600), maxLag = Math.min(Math.floor(rate / 65), n - 64)
  const nsdf = new Float32Array(maxLag + 2)
  for (let lag = minLag - 1; lag <= maxLag + 1; lag++) {
    let ac = 0, m = 0
    for (let i = 0; i < n - lag; i++) { ac += buf[i] * buf[i + lag]; m += buf[i] * buf[i] + buf[i + lag] * buf[i + lag] }
    nsdf[lag] = m ? (2 * ac) / m : 0
  }
  // Local peaks, then the first one that is nearly as strong as the strongest.
  const peaks = []
  for (let lag = minLag; lag <= maxLag; lag++) if (nsdf[lag] > 0 && nsdf[lag] >= nsdf[lag - 1] && nsdf[lag] > nsdf[lag + 1]) peaks.push(lag)
  if (!peaks.length) return 0
  const top = Math.max(...peaks.map((l) => nsdf[l]))
  if (top < 0.5) return 0
  const lag = peaks.find((l) => nsdf[l] >= 0.88 * top)
  // Parabolic interpolation for a finer estimate.
  const a = nsdf[lag - 1], b = nsdf[lag], c = nsdf[lag + 1]
  const shift = (a - 2 * b + c) ? (a - c) / (2 * (a - 2 * b + c)) : 0
  return rate / (lag + shift)
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

  // Pitch track. Real intonation glides, even when it climbs high; a reading error jumps instantly
  // to 2x, 3x or half the real pitch for a frame or two. So each reading is checked against the
  // frames just before it: a sudden jump is corrected (or dropped), a gradual climb is kept.
  const raw = frames.slice(first, last + 1).filter((f) => f.pitch > 0)
  const m0 = median(raw.map((f) => f.pitch))
  const base = median(raw.map((f) => f.pitch).filter((p) => p < m0 * 1.5)) || m0 // typical pitch
  const semis = (p, ref) => 12 * Math.log2(p / ref)
  const track = []
  for (const [a, b] of segments) {
    const seg = []
    for (let i = a; i <= b; i++) if (frames[i].pitch > 0) seg.push({ i, t: frames[i].t, p: frames[i].pitch })
    if (!seg.length) continue
    // Starting reference: the beginning of a phrase sits near the speaker's typical pitch.
    const fold = (p, ref) => [p, p / 2, p / 3, p * 2].reduce((x, y) => (Math.abs(semis(y, ref)) < Math.abs(semis(x, ref)) ? y : x))
    let ref = median(seg.slice(0, 5).map((x) => fold(x.p, base)))
    let lastI = seg[0].i
    const kept = []
    for (const x of seg) {
      const gap = x.i - lastI // frames since the last accepted reading
      const limit = 4 + 2 * Math.min(gap, 6) // allowed glide, in semitones
      let p = x.p
      if (Math.abs(semis(p, ref)) > limit) p = fold(p, ref)
      if (Math.abs(semis(p, ref)) > limit) continue // still a jump: drop it
      kept.push({ i: x.i, t: x.t, st: semis(p, base) })
      const recent = kept.slice(-3).map((k) => base * 2 ** (k.st / 12))
      ref = median(recent); lastI = x.i
    }
    track.push(...kept)
  }
  for (let k = 0; k < track.length; k++) { // 5-point median filter
    const w = track.slice(Math.max(0, k - 2), k + 3).filter((x) => Math.abs(x.i - track[k].i) <= 4).map((x) => x.st)
    track[k].sm = median(w)
  }

  // Sentence endings: the last ~0.3 s of voice before a longer pause (0.7 s or more) or at the very end,
  // against the rest of that stretch of speech. Short pauses mid-sentence are skipped, because the
  // voice naturally stays up there ("If the budget is tight, ..."). A change of 1.5 semitones or more
  // counts as a fall or a rise; smaller changes count as level.
  const endings = []
  for (const [k, [a, b]] of segments.entries()) {
    if (k < segments.length - 1 && pauses[k] < 0.7) continue
    const p = track.filter((x) => x.i >= a && x.i <= b)
    if (p.length < 14) continue // too short to judge
    const tailN = Math.min(10, Math.round(p.length * 0.35))
    const body = p.slice(0, -tailN), tail = p.slice(-tailN)
    const d = median(tail.map((x) => x.sm)) - median(body.map((x) => x.sm))
    endings.push({ dir: d <= -1.5 ? 'down' : d >= 1.5 ? 'up' : 'level', t: tail[tail.length - 1].t - frames[first].t, d: Math.round(d * 10) / 10 })
  }

  const words = String(transcript).trim().split(/\s+/).filter(Boolean).length
  const wpm = words && speechSec > 1 ? Math.round(words / speechSec * 60) : null
  return {
    ok: true,
    seconds: Math.round(speechSec * 10) / 10,
    words, wpm,
    pauses: pauses.length,
    longestPause: pauses.length ? Math.round(Math.max(...pauses) * 10) / 10 : 0,
    endings: endings.map((e) => e.dir),
    endMarks: endings,
    down: endings.filter((e) => e.dir === 'down').length,
    up: endings.filter((e) => e.dir === 'up').length,
    level: endings.filter((e) => e.dir === 'level').length,
    medianPitch: Math.round(base),
    contour: track.map((x) => [Math.round((x.t - frames[first].t) * 100) / 100, Math.round(x.sm * 10) / 10]),
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

  const E = m.endings.length, up = m.endings.filter((e) => e === 'up').length, down = m.endings.filter((e) => e === 'down').length
  const v = E ? [down && `${down} down`, E - up - down && `${E - up - down} level`, up && `${up} up`].filter(Boolean).join(', ') : '—'
  if (!E) r.push({ k: 'Sentence endings', v, tone: 'neutral', t: 'Not enough clear voice to read the pitch. Try again a little closer to the microphone.' })
  else if (up > down && up > E / 2) r.push({ k: 'Sentence endings', v, tone: 'warn', t: 'Your voice went up at the end, which can sound like asking permission. On your position, let the pitch drop. A rise is fine on a yes/no question.' })
  else if (down) r.push({ k: 'Sentence endings', v, tone: 'good', t: 'Downward endings sound sure of your position.' })
  else r.push({ k: 'Sentence endings', v, tone: 'neutral', t: 'Your endings stayed level: calm, but not yet firm. Let the pitch drop slightly on your key point.' })

  const n = m.hedges.reduce((a, h) => a + h.n, 0)
  if (!m.words) r.push({ k: 'Hedges and fillers', v: '—', tone: 'neutral', t: 'Add the words you said to check for hedges.' })
  else if (n >= 2) r.push({ k: 'Hedges and fillers', v: `${n}: ${m.hedges.map((h) => `"${h.word}"`).join(', ')}`, tone: 'warn', t: 'Hedges soften your position and sound passive. Cut them.' })
  else if (n === 1) r.push({ k: 'Hedges and fillers', v: `1: "${m.hedges[0].word}"`, tone: 'warn', t: 'Almost clean. Cut that one hedge and your position sounds firmer.' })
  else r.push({ k: 'Hedges and fillers', v: 'None', tone: 'good', t: 'Clean, direct wording.' })
  return r
}
