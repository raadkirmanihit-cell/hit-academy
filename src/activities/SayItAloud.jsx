import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { useSample, noteError, errorText } from '../coach/Coach.jsx'
import { useCoachPlan, usedOneMessage, CoachPaywall, PlanNote } from '../coach/plan.jsx'
import { VOICE_PROMPT } from '../coach/practicePrompts.js'
import { startCapture, analyse, readings } from './speechMetrics.js'
import { speakable } from '../coach/voice.js'

const MAX_SEC = 45
const VERDICT = { 'Assertive': 'var(--b-assertive)', 'Mostly assertive': 'var(--b-assertive)', 'Passive': 'var(--b-passive)', 'Aggressive': 'var(--b-aggressive)', 'Manipulative': 'var(--b-manipulative)' }

// Say-it-out-loud practice: the browser measures delivery (pace, pauses, pitch at phrase ends,
// hedges); the AI coach judges the wording from the transcript (one coach message per check).
export default function SayItAloud({ b, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[b.id]
  const [phase, setPhase] = useState(saved?.metrics ? 'done' : 'idle') // idle | recording | working | done
  const [level, setLevel] = useState(0)
  const [secs, setSecs] = useState(0)
  const [text, setText] = useState(saved?.transcript || '')
  const [frames, setFrames] = useState(null)
  const [metrics, setMetrics] = useState(saved?.metrics || null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [err, setErr] = useState('')
  const [fb, setFb] = useState(saved?.feedback || null)
  const [asking, setAsking] = useState(false)
  const cap = useRef(null), tick = useRef(null)
  const { ready, sample } = useSample()
  const { locked } = useCoachPlan()
  const canRecord = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof window.MediaRecorder !== 'undefined'

  useEffect(() => () => { clearInterval(tick.current); cap.current?.stop().catch(() => {}) }, [])
  useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl) }, [audioUrl])

  async function record() {
    setErr(''); setFb(null); setText(''); setMetrics(null); setFrames(null); setAudioUrl(null)
    try {
      cap.current = await startCapture({ onLevel: setLevel, onWords: setText })
    } catch {
      setErr('The microphone could not be opened. Please allow microphone access in your browser, or type your line below instead.')
      return
    }
    setPhase('recording'); setSecs(0)
    const t0 = Date.now()
    tick.current = setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000)
      setSecs(s)
      if (s >= MAX_SEC) stop()
    }, 250)
  }

  async function stop() {
    clearInterval(tick.current)
    const c = cap.current; cap.current = null
    if (!c) return
    setPhase('working'); setLevel(0)
    const r = await c.stop()
    const t = r.transcript || ''
    setText((old) => t || old)
    setFrames(r.frames)
    if (r.blob) setAudioUrl(URL.createObjectURL(r.blob))
    const m = analyse(r.frames, t)
    if (!m.ok) { setErr('We couldn\'t hear enough speech. Check that the right microphone is selected and try again, a little closer.'); setPhase(saved?.metrics ? 'done' : 'idle'); return }
    setMetrics(m); setPhase('done')
    saveActivity(module.id, b.id, { transcript: t, metrics: strip(m), done: true, at: new Date().toISOString() })
  }

  // When the learner corrects or types the transcript, pace and hedges are measured again.
  function editText(v) {
    setText(v)
    if (frames) { const m = analyse(frames, v); if (m.ok) setMetrics(m) }
  }
  function saveText() { saveActivity(module.id, b.id, { transcript: text, ...(metrics ? { metrics: strip(metrics) } : {}), done: true }) }

  async function getFeedback() {
    if (!sample || asking || !text.trim()) return
    setAsking(true); setErr('')
    try {
      const r = await sample.json(VOICE_PROMPT(b, text.trim(), metrics), { cache: false })
      usedOneMessage()
      if (!r || typeof r !== 'object') throw Object.assign(new Error(), { code: 'invalid_json' })
      setFb(r)
      saveActivity(module.id, b.id, { transcript: text, feedback: r, done: true })
    } catch (e) {
      noteError(e)
      setErr(e?.code === 'invalid_json' ? 'The feedback could not be read. Please try again.' : errorText(e))
    } finally { setAsking(false) }
  }

  function playModel() {
    const s = window.speechSynthesis; if (!s) return
    s.cancel()
    const u = new SpeechSynthesisUtterance(speakable(b.modelLine))
    const v = s.getVoices().find((x) => /^en[-_]GB/i.test(x.lang)) || s.getVoices().find((x) => /^en/i.test(x.lang))
    if (v) u.voice = v
    u.rate = 0.95
    s.speak(u)
  }

  const reads = metrics ? readings(metrics) : []
  return (
    <section className="activity say-aloud">
      <div className="activity-head">
        <span className="activity-kind">Say it out loud · voice practice</span>
        <h3>{b.title}</h3>
      </div>
      <div className="dialogue" style={{ background: 'var(--surface-2)', border: 0 }}>
        <span className="eyebrow">The situation</span>
        <p>{b.situation}</p>
        <p style={{ fontWeight: 600 }}>{b.task}</p>
        {b.criteria && <ul className="small" style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--ink-2)' }}>{b.criteria.map((c) => <li key={c}>{c}</li>)}</ul>}
      </div>

      <div className="rec-box">
        {phase === 'recording' ? (
          <>
            <button className="rec-btn on" onClick={stop} aria-label="Stop recording"><span className="rec-square" /></button>
            <div className="stack" style={{ gap: '.35rem', flex: 1 }}>
              <strong>Recording… speak now <span className="tnum muted">{secs}s / {MAX_SEC}s</span></strong>
              <div className="rec-level" aria-hidden="true"><span style={{ width: Math.round(level * 100) + '%' }} /></div>
              <span className="small muted">Click stop when you have finished.</span>
            </div>
          </>
        ) : (
          <>
            <button className="rec-btn" onClick={record} disabled={!canRecord || phase === 'working'} aria-label={phase === 'done' ? 'Record again' : 'Start recording'}><span className="rec-dot" /></button>
            <div className="stack" style={{ gap: '.25rem', flex: 1 }}>
              <strong>{phase === 'working' ? 'Measuring your delivery…' : phase === 'done' ? 'Record again' : 'Press to record your answer'}</strong>
              <span className="small muted">{canRecord ? 'Your recording stays on this device. It is not uploaded or saved.' : 'Recording isn\'t available in this browser. Type your line below instead.'}</span>
            </div>
          </>
        )}
      </div>
      {err && <p className="small coach-err" role="alert">{err}</p>}

      {metrics && (
        <div className="stack fade-in" style={{ gap: '.75rem' }}>
          <span className="eyebrow">Your delivery</span>
          <div className="metric-grid">
            {reads.map((r) => (
              <div key={r.k} className={'metric ' + r.tone}>
                <span className="small muted">{r.k}</span>
                <strong>{r.v}</strong>
                <span className="small">{r.t}</span>
              </div>
            ))}
          </div>
          {metrics.contour?.length > 8 && <Contour m={metrics} />}
          <details className="reveal">
            <summary>How the app reads your delivery</summary>
            <ul className="small" style={{ margin: '.5rem 0 0', paddingLeft: '1.1rem', color: 'var(--ink-2)', display: 'grid', gap: '.3rem' }}>
              <li><strong>Pace:</strong> the words in the box below, divided by the time you were speaking.</li>
              <li><strong>Pauses:</strong> silences of 0.4 seconds or more between words.</li>
              <li><strong>Sentence endings:</strong> the app tracks the pitch of your voice and compares the last third of a second before each longer pause (0.7 seconds or more), and at the very end, with the rest of that sentence. A drop of 1.5 semitones or more counts as down, a rise of 1.5 or more as up, anything smaller as level. Short pauses in the middle of a sentence are skipped, because the voice naturally stays up there.</li>
              <li><strong>Hedges:</strong> softening words such as "just", "maybe", "kind of" and "I guess" in the box below.</li>
              <li>These are estimates from your microphone, not a precise lab measurement. A quiet room and speaking at a normal volume give the best reading.</li>
            </ul>
          </details>
          {audioUrl && <div className="voice-audio"><span className="eyebrow">Listen back</span><audio controls src={audioUrl} /></div>}
        </div>
      )}

      <div className="field">
        <label htmlFor={'say-' + b.id}>{metrics ? 'What you said (correct it if the browser misheard you)' : 'Or type what you would say'}</label>
        <textarea id={'say-' + b.id} rows={3} style={{ minHeight: 84 }} value={text} onChange={(e) => editText(e.target.value)} onBlur={saveText} placeholder="Your words appear here as you speak." disabled={phase === 'recording'} />
      </div>

      <div className="stack" style={{ gap: '.6rem' }}>
        {!ready ? null : !sample ? <p className="small muted">AI feedback on your wording works on the course website.</p>
          : locked && !fb ? <CoachPaywall compact /> : (
          <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
            <button className="btn btn-dark" disabled={!text.trim() || asking || phase === 'recording'} onClick={getFeedback}>{asking ? 'Listening to your words…' : fb ? 'Check my new wording' : 'Get AI feedback on my wording'}</button>
            <span className="small muted">Uses one coach message.</span>
          </div>
        )}
        {sample && !locked && <PlanNote />}
      </div>

      {fb && (
        <div className="spar-report fade-in" style={{ borderTopColor: VERDICT[fb.verdict] || 'var(--orange)' }}>
          <span className="eyebrow">AI feedback on your wording</span>
          <h4><span style={{ color: VERDICT[fb.verdict] }}>{fb.verdict}</span>{fb.summary ? `: ${fb.summary}` : ''}</h4>
          {Array.isArray(fb.strengths) && fb.strengths.length > 0 && <><h5>What works</h5><ul>{fb.strengths.map((s, i) => <li key={i}>{String(s)}</li>)}</ul></>}
          {Array.isArray(fb.improve) && fb.improve.length > 0 && <><h5>Try this</h5><ul>{fb.improve.map((s, i) => <li key={i}>{s.tip}{s.say && <><br /><strong>"{String(s.say).replace(/^"|"$/g, '')}"</strong></>}</li>)}</ul></>}
          {fb.betterLine && <><h5>Your line, made fully assertive</h5><p className="quote-block" style={{ margin: 0 }}>"{String(fb.betterLine).replace(/^"|"$/g, '')}"</p></>}
          {fb.delivery && <p className="small muted">{fb.delivery}</p>}
        </div>
      )}

      {(metrics || fb) && (
        <div className="expert-line">
          <span className="eyebrow">Compare with the model answer</span>
          <p>"{b.modelLine}"</p>
          {b.modelAudio
            ? <div className="voice-audio"><span className="eyebrow">Listen to Raad</span><audio controls preload="metadata" src={b.modelAudio} /></div>
            : typeof window !== 'undefined' && window.speechSynthesis && <button className="btn btn-sm" style={{ justifySelf: 'start' }} onClick={playModel}>Hear it read aloud</button>}
          {b.modelNote && <p className="small muted">{b.modelNote}</p>}
        </div>
      )}
    </section>
  )
}

// Saved copy without the pitch contour (keeps the saved progress small).
const strip = ({ contour, ...m }) => m

// The pitch line of the recording, in semitones around the speaker's typical pitch, with the
// sentence endings the app judged marked as down, level or up.
const MARK = { down: ['↘', 'var(--good)'], level: ['→', 'var(--muted)'], up: ['↗', 'var(--orange-ink)'] }
function Contour({ m }) {
  const pts = m.contour
  const T = Math.max(pts[pts.length - 1][0], ...(m.endMarks || []).map((e) => e.t)) || 1
  const R = Math.max(6, ...pts.map((p) => Math.abs(p[1]))) + 1
  const W = 600, H = 110, y = (st) => H / 2 - (st / R) * (H / 2 - 8)
  const d = pts.map(([t, st], i) => `${i && t - pts[i - 1][0] < 0.15 ? 'L' : 'M'}${(t / T * W).toFixed(1)},${y(st).toFixed(1)}`).join(' ')
  return (
    <figure className="figure" style={{ margin: 0 }}>
      <div className="contour">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Pitch of your voice over time, with sentence endings marked">
          <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="var(--line)" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d={d} fill="none" stroke="var(--orange)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        {(m.endMarks || []).map((e, i) => (
          <span key={i} className="contour-mark" style={{ left: `${Math.min(97, (e.t / T) * 100)}%`, color: MARK[e.dir][1] }} title={`Ending: ${e.dir} (${e.d > 0 ? '+' : ''}${e.d} semitones)`}>{MARK[e.dir][0]}</span>
        ))}
      </div>
      <figcaption>Your pitch over time (higher line = higher voice; the dashed line is your typical pitch). Arrows mark the sentence endings the app judged: ↘ down, → level, ↗ up.</figcaption>
    </figure>
  )
}
