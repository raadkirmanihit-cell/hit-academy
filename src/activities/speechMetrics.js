// Delivery measurements for "say it out loud" practice, all computed in the browser.
// Nothing is uploaded: the recording and the measurements stay on the learner's device.
const FRAME_MS = 30

const pairOf = ([pitch, g]) => ({ pitch, g })

// Records the microphone, samples loudness and pitch every 30 ms, and transcribes where the browser can.
export async function startCapture({ onLevel, onWords } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }) // raw voice: the browser's voice clean-up can flatten pitch
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
    frames.push({ t: (performance.now() - t0) / 1000, rms, ...pairOf(rms > 0.0015 ? pitchPair(buf, ctx.sampleRate) : [0, 0]) }) // quiet voice counts too: sentence endings often fade out
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
      // The full pitch track is computed from the finished recording; the live readings are only a
      // fallback for browsers that cannot decode their own recording.
      let out = frames
      try {
        if (blob) {
          const audio = await ctx.decodeAudioData(await blob.arrayBuffer())
          const tracked = trackPitch(audio.getChannelData(0), audio.sampleRate)
          if (tracked.length > 20) out = tracked
        }
      } catch { /* keep the live frames */ }
      ctx.close().catch(() => {})
      return { blob, frames: out, transcript: text }
    },
  }
}

// Pitch estimate in the human speaking range (45–600 Hz, low creaky endings, so high notes count too), or 0 when the frame isn't clearly voiced.
// Normalised autocorrelation with "first strong peak" picking (McLeod & Wyvill's method), which
// avoids most octave errors. Hissy sounds (s, f, sh, breath) are skipped: they have no pitch.
export function detectPitch(buf, rate) { return pitchPair(buf, rate)[0] }

// [pitch, strongest-peak pitch]. In a low creaky voice the strongest peak sits at the creak's slow,
// irregular beat, well below the clean reading, which is how a creaky fall is recognised.
export function pitchPair(buf, rate) {
  const n = buf.length
  let zc = 0
  for (let i = 1; i < n; i++) if ((buf[i - 1] < 0) !== (buf[i] < 0)) zc++
  if (zc / (n / rate) > 5000) return [0, 0] // too many zero crossings: a fricative or noise, not a voice
  const minLag = Math.floor(rate / 600), maxLag = Math.min(Math.floor(rate / 45), n - 64)
  const nsdf = new Float32Array(maxLag + 2)
  for (let lag = minLag - 1; lag <= maxLag + 1; lag++) {
    let ac = 0, m = 0
    for (let i = 0; i < n - lag; i++) { ac += buf[i] * buf[i + lag]; m += buf[i] * buf[i] + buf[i + lag] * buf[i + lag] }
    nsdf[lag] = m ? (2 * ac) / m : 0
  }
  // Local peaks, then the first one that is nearly as strong as the strongest.
  const peaks = []
  for (let lag = minLag; lag <= maxLag; lag++) if (nsdf[lag] > 0 && nsdf[lag] >= nsdf[lag - 1] && nsdf[lag] > nsdf[lag + 1]) peaks.push(lag)
  if (!peaks.length) return [0, 0]
  const top = Math.max(...peaks.map((l) => nsdf[l]))
  if (top < 0.5) return [0, 0]
  const lag = peaks.find((l) => nsdf[l] >= 0.88 * top)
  // Parabolic interpolation for a finer estimate.
  const a = nsdf[lag - 1], b = nsdf[lag], c = nsdf[lag + 1]
  const shift = (a - 2 * b + c) ? (a - c) / (2 * (a - 2 * b + c)) : 0
  const gl = peaks.find((l) => nsdf[l] === top)
  return [rate / (lag + shift), rate / gl]
}

// Pitch track of a whole recording, the way the speech-science tool Praat does it (Boersma, 1993):
// every 30 ms, several pitch candidates from the autocorrelation of the sound, plus "no voice";
// then the smoothest, strongest path through them. Choosing the path over the whole recording,
// instead of frame by frame, avoids the octave slips (reading a high note at half its pitch) and
// the noise readings that a frame-by-frame detector makes.
export function trackPitch(x, rate, step = 0.03) {
  const D = Math.max(1, Math.floor(rate / 12000)), sr = rate / D
  const y = new Float32Array(Math.floor(x.length / D))
  for (let i = 0; i < y.length; i++) { let s = 0; for (let k = 0; k < D; k++) s += x[i * D + k]; y[i] = s / D }
  const floor = 60, ceil = 600, VT = 0.45, ST = 0.03, OC = 0.01, OJ = 0.35, VU = 0.14, corr = 0.01 / step
  const W = Math.round(sr * 3 / floor), half = W >> 1
  const win = new Float32Array(W); for (let i = 0; i < W; i++) win[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * (i + 0.5) / W)
  const minLag = Math.floor(sr / ceil), maxLag = Math.ceil(sr / floor)
  const rw = new Float32Array(maxLag + 2)
  for (let l = 0; l <= maxLag + 1; l++) { let s = 0; for (let i = 0; i < W - l; i++) s += win[i] * win[i + l]; rw[l] = s }
  let gpk = 0; for (const v of y) gpk = Math.max(gpk, Math.abs(v))
  const nF = Math.floor((y.length - W) / (sr * step)) + 1
  const frames = [], cands = []
  const seg = new Float32Array(W), r = new Float32Array(maxLag + 2)
  for (let f = 0; f < nF; f++) {
    const s0 = Math.round(f * sr * step)
    let mean = 0; for (let i = 0; i < W; i++) mean += y[s0 + i]; mean /= W
    let lpk = 0, e = 0
    for (let i = 0; i < W; i++) { const v = y[s0 + i] - mean; lpk = Math.max(lpk, Math.abs(v)); e += v * v; seg[i] = v * win[i] }
    const t = (s0 + half) / sr
    const rms = Math.sqrt(e / W)
    let r0 = 0; for (let i = 0; i < W; i++) r0 += seg[i] * seg[i]
    const c = [[0, VT + Math.max(0, 2 - (lpk / (gpk || 1)) / (ST / (1 + VT)))]]
    if (r0 > 0) {
      for (let l = minLag - 1; l <= maxLag + 1; l++) { let s = 0; for (let i = 0; i < W - l; i++) s += seg[i] * seg[i + l]; r[l] = s / r0 / rw[l] * rw[0] }
      for (let l = minLag; l <= maxLag; l++) if (r[l] > 0.5 * VT && r[l] >= r[l - 1] && r[l] > r[l + 1]) {
        const a = r[l - 1], b = r[l], cc = r[l + 1], den = a - 2 * b + cc
        const sh = den ? (a - cc) / (2 * den) : 0, lag = l + Math.max(-0.5, Math.min(0.5, sh))
        const rr = Math.min(1, b - 0.25 * (a - cc) * sh)
        c.push([sr / lag, rr - OC * Math.log2(floor * lag / sr)])
      }
    }
    c.sort((p, q) => q[1] - p[1]); cands.push(c.slice(0, 15)); frames.push({ t, rms })
  }
  // Viterbi
  let prev = cands[0].map((c) => c[1]), back = []
  for (let f = 1; f < nF; f++) {
    const cur = [], bk = []
    for (const [fc, sc] of cands[f]) {
      let best = -1e9, bi = 0
      cands[f - 1].forEach(([fp], j) => {
        const cost = (fc === 0) !== (fp === 0) ? VU * corr : fc && fp ? OJ * corr * Math.abs(Math.log2(fc / fp)) : 0
        const v = prev[j] - cost; if (v > best) { best = v; bi = j }
      })
      cur.push(best + sc); bk.push(bi)
    }
    back.push(bk); prev = cur
  }
  let j = prev.indexOf(Math.max(...prev))
  for (let f = nF - 1; f >= 0; f--) { frames[f].pitch = cands[f][j][0]; if (f) j = back[f - 1][j] }
  return frames
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

    // Pitch, in semitones around the speaker's typical pitch. A very low reading (8+ semitones below
  // it) is a creaky voice ("vocal fry"): many speakers drop into it as a firm sentence fades.
  const voiced = frames.slice(first, last + 1).filter((f) => f.pitch > 0).map((f) => f.pitch)
  const m0 = median(voiced)
  const base = median(voiced.filter((p) => p > m0 * 0.63)) || m0 // typical pitch
  const creakHz = base * 0.63
  const semis = (p) => 12 * Math.log2(p / base)
  // A sentence often ends in a quiet syllable below the speech threshold that still has a pitch;
  // each stretch is extended over those frames (up to 0.3 s).
  const ext = segments.map(([a, b]) => { let e = b; while (e + 1 < frames.length && e - b < 10 && frames[e + 1].pitch > 0) e++; return [a, e] })
  const track = []
  for (const [a, b] of ext) for (let i = a; i <= b; i++) if (frames[i].pitch > 0) track.push({ i, t: frames[i].t, st: semis(frames[i].pitch), creak: frames[i].pitch < creakHz })
  for (let k = 0; k < track.length; k++) { // 3-point median filter against single-frame blips
    const w = track.slice(Math.max(0, k - 1), k + 2).filter((x) => Math.abs(x.i - track[k].i) <= 2 && x.creak === track[k].creak).map((x) => x.st)
    track[k].sm = median(w)
  }

  // Sentence endings, judged at every pause and at the very end, on the note the voice finishes on,
  // against the speaker's typical pitch (calibrated on real "upward" and "downward" recordings):
  // - up: the last syllable sits 4+ semitones above the typical pitch (a high, questioning finish);
  // - down: it finishes below the typical pitch, falls by 1.5+ semitones, or drops into creak;
  // - level: anything in between (a small lift onto the last stressed word included).
  const endings = []
  for (const [a, b] of ext) {
    const p = track.filter((x) => x.i >= a && x.i <= b)
    const clean = p.filter((x) => !x.creak)
    if (clean.length < 6) continue // too short to judge
    const end = median(clean.slice(-3).map((x) => x.sm))
    const lastClean = clean[clean.length - 1]
    const before = clean.filter((x) => x.t < lastClean.t - 0.25 && x.t > lastClean.t - 1.2).map((x) => x.sm)
    const tailCreak = p.filter((x) => x.creak && x.i > lastClean.i).length >= 2
    let dir = 'level'
    if (end >= 4) dir = 'up'
    else if (tailCreak || end <= -1.5 || (before.length >= 3 && end - median(before) <= -1.5)) dir = 'down'
    endings.push({ dir, t: p[p.length - 1].t - frames[first].t, d: Math.round(end * 10) / 10, creak: tailCreak })
  }

  const words = String(transcript).trim().split(/\s+/).filter(Boolean).length
  const wpm = words && speechSec > 1 ? Math.round(words / speechSec * 60) : null
  return {
    ok: true,
    offset: frames[first].t, // seconds from the start of the recording to the first word
    speech: segments.map(([a, b]) => [Math.round((frames[a].t - frames[first].t) * 100) / 100, Math.round((frames[b].t - frames[first].t) * 100) / 100]),
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
    contour: track.filter((x) => !x.creak).map((x) => [Math.round((x.t - frames[first].t) * 100) / 100, Math.round(x.sm * 10) / 10]), // creaky readings are left out: they are not a note
    hedges: countHedges(transcript),
  }
}

// Estimated timing of each word: the browser's transcript has no timings, so the words are spread
// over the stretches of speech in proportion to their length (a rough stand-in for syllables).
export function wordTimes(text, speech) {
  const words = String(text).trim().split(/\s+/).filter(Boolean)
  if (!words.length || !speech?.length) return []
  const total = speech.reduce((a, [s, e]) => a + (e - s), 0) || 1
  const weight = words.map((w) => Math.max(2, w.replace(/[^a-z0-9€]/gi, '').length))
  const W = weight.reduce((a, x) => a + x, 0)
  const at = (u) => { // u = share of the speaking time, 0..1 -> seconds
    let left = u * total
    for (const [s, e] of speech) { if (left <= e - s) return s + left; left -= e - s }
    return speech[speech.length - 1][1]
  }
  let acc = 0
  return words.map((w, i) => { const s = at(acc / W); acc += weight[i]; return { w, s, e: at(acc / W) } })
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
