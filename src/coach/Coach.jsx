import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { flatSteps } from '../platform/progress.js'
import { Md } from '../ui/md.jsx'
import { buildChunks, retrieve, formatExcerpts, library } from './knowledge.js'
import { COACH_RULES, SPAR_RULES, FEEDBACK_PROMPT } from './prompts.js'
import { scenarios, scenarioById } from './scenarios.js'
import { useVoice } from './voice.js'

const MicIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
const SpeakerIcon = ({ off }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" />{off ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}</svg>

// Voice replies on/off, shown when the browser can speak.
function VoiceToggle({ voice }) {
  if (!voice.canSpeak) return null
  return (
    <button type="button" className={'btn btn-sm voice-toggle' + (voice.voiceOn ? ' on' : '')} aria-pressed={voice.voiceOn}
      onClick={() => { if (voice.voiceOn) voice.stopSpeaking(); voice.setVoiceOn(!voice.voiceOn) }}>
      <SpeakerIcon off={!voice.voiceOn} /> {voice.voiceOn ? 'Voice on' : 'Voice off'}
    </button>
  )
}
function MicButton({ voice, onText, onFinal, disabled }) {
  if (!voice.canListen) return (
    <button type="button" className="btn btn-sm mic-btn off" disabled={disabled} aria-label="How to speak instead of typing" onClick={() => voice.dictationTip()}><MicIcon /></button>
  )
  return (
    <button type="button" className={'btn btn-sm mic-btn' + (voice.listening ? ' listening' : '')} disabled={disabled}
      aria-label={voice.listening ? 'Stop listening' : 'Speak instead of typing'} aria-pressed={voice.listening}
      onClick={() => voice.listen(onText, onFinal)}><MicIcon /></button>
  )
}
function PlayButton({ voice, text }) {
  if (!voice.canSpeak) return null
  return <button type="button" className="play-btn" onClick={() => voice.speak(text)} aria-label="Read this reply aloud"><SpeakerIcon /> Listen</button>
}

// ---- Shared plumbing -------------------------------------------------------

let kbCache = null
export function useKb() {
  const { modules } = useApp()
  return useMemo(() => (kbCache ||= { ...buildChunks(modules), library: library(modules) }), [modules])
}

// Resolves the page's "ask Claude" function, or null where the viewer can't run it (e.g. outside claude.ai).
export function useSample() {
  const [state, setState] = useState({ ready: false, sample: null })
  useEffect(() => {
    let live = true
    const c = typeof window !== 'undefined' ? window.claude : null
    if (!c?.use) { setState({ ready: true, sample: null }); return }
    c.use('sample').then((s) => live && setState({ ready: true, sample: s || null })).catch(() => live && setState({ ready: true, sample: null }))
    return () => { live = false }
  }, [])
  return state
}

const ERRORS = {
  not_granted: 'The coach needs your permission to use Claude. Reload the page and choose Allow to try again.',
  sampling_disabled: 'Claude is not available for this account.',
  rate_limited: 'The coach is busy. Please wait a minute and try again.',
  session_expired: 'Your session has expired. Please sign in to claude.ai again.',
  refused: 'The coach can\'t help with that. Try rephrasing your question.',
}
const errorText = (e) => ERRORS[e?.code] || 'Something went wrong. Please try again.'

// Coach replies use **bold** and "- " bullets only.
function Rich({ text }) {
  const blocks = []
  let list = null
  for (const line of String(text).split('\n')) {
    if (/^\s*[-•]\s+/.test(line)) { (list ||= []).push(line.replace(/^\s*[-•]\s+/, '')); continue }
    if (list) { blocks.push({ list }); list = null }
    if (line.trim()) blocks.push({ p: line })
  }
  if (list) blocks.push({ list })
  return blocks.map((b, i) => b.list
    ? <ul key={i}>{b.list.map((x, j) => <li key={j}><Md text={x} /></li>)}</ul>
    : <p key={i} className={/^Review:/.test(b.p) ? 'coach-review' : ''}><Md text={b.p} /></p>)
}

function Unavailable() {
  return <p className="small muted coach-off">The AI coach works when the course is opened on claude.ai. In this view it is switched off.</p>
}

const SUGGESTIONS = [
  'I need to ask my manager for a raise next week.',
  'My landlord wants to raise my rent by 15%.',
  'My business partner and I keep arguing about priorities.',
  'How do I respond to "this is our final offer"?',
]

// ---- Ask the coach (side panel) --------------------------------------------

export function CoachLauncher() {
  const { user, paid, view, modules, progress } = useApp()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setOpen(true)
    window.addEventListener('open-coach', h)
    return () => window.removeEventListener('open-coach', h)
  }, [])
  if (!user || !paid || !['dashboard', 'module', 'practice'].includes(view.name)) return null
  // Where the learner is, so the coach can include that page.
  let ctx = {}
  if (view.name === 'module' && progress.last?.moduleId && modules[progress.last.moduleId]) {
    const m = modules[progress.last.moduleId]
    const st = flatSteps(m).find((s) => s.id === progress.last.stepId)
    ctx = { moduleId: m.id, stepId: st?.id, where: `Module ${m.number} (${m.title}), page "${st?.title || ''}"` }
  }
  return (
    <>
      {!open && <button className="coach-fab" onClick={() => setOpen(true)} aria-label="Ask the AI coach"><span className="coach-dot" aria-hidden="true">AI</span> Ask the coach</button>}
      {open && <CoachPanel ctx={ctx} onClose={() => setOpen(false)} />}
    </>
  )
}

function CoachPanel({ ctx, onClose }) {
  const kb = useKb()
  const { ready, sample } = useSample()
  const [turns, setTurns] = useState([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [live, setLive] = useState('')
  const [err, setErr] = useState('')
  const ctl = useRef(null)
  const end = useRef(null)
  const voice = useVoice()
  const voiceOn = useRef(false); voiceOn.current = voice.voiceOn
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [turns, live])
  useEffect(() => () => ctl.current?.abort(), [])

  async function ask(q) {
    q = q.trim()
    if (!q || busy || !sample) return
    setErr(''); setDraft('')
    const history = [...turns, { role: 'user', content: q }]
    setTurns(history); setBusy(true); setLive('')
    // Search with the latest question plus the previous one, so follow-ups keep their topic.
    // The learner's recent messages together describe the situation, so search with all of them.
    const prevQ = turns.filter((t) => t.role === 'user').slice(-3).map((t) => t.content).join(' ')
    const found = retrieve(kb, q + ' ' + q + ' ' + prevQ, ctx)
    const rules = COACH_RULES({ where: ctx.where, library: kb.library, excerpts: formatExcerpts(found) })
    ctl.current = new AbortController()
    try {
      const { text } = await sample([{ role: 'user', content: rules }, ...history.slice(-16)], {
        cache: false, signal: ctl.current.signal, onText: ({ text }) => setLive(text),
      })
      setTurns((t) => [...t, { role: 'assistant', content: text }])
      if (voiceOn.current) voice.speak(text)
    } catch (e) {
      if (e?.text) setTurns((t) => [...t, { role: 'assistant', content: e.text + ' …' }])
      if (e?.code !== 'cancelled') setErr(errorText(e))
    } finally { setBusy(false); setLive('') }
  }

  return (
    <aside className="coach-panel fade-in" aria-label="AI coach">
      <header className="coach-head">
        <div>
          <span className="eyebrow">Premium · prototype</span>
          <h3>H.I.T. Negotiation Coach</h3>
        </div>
        <div className="row" style={{ gap: '.4rem', flexWrap: 'nowrap' }}>
          {sample && <VoiceToggle voice={voice} />}
          <button className="btn btn-sm" onClick={() => { voice.stopSpeaking(); onClose() }} aria-label="Close the coach">Close</button>
        </div>
      </header>
      <div className="coach-body">
        {!ready ? <p className="small muted">Starting the coach…</p> : !sample ? <Unavailable /> : (
          <>
            {turns.length === 0 && (
              <div className="coach-intro">
                <p>Tell me about a negotiation or a conflict you're facing. I'll ask you a few questions, one at a time, to understand your situation and your goal. Then I'll suggest what to do and what to say.</p>
                {ctx.where && <p className="small muted">I can see you're on {ctx.where}.</p>}
                <div className="coach-sugs">{SUGGESTIONS.map((s) => <button key={s} className="coach-sug" onClick={() => ask(s)}>{s}</button>)}</div>
              </div>
            )}
            {turns.map((t, i) => (
              <div key={i} className={'coach-msg ' + t.role}>{t.role === 'user' ? <p>{t.content}</p> : <><Rich text={t.content} /><PlayButton voice={voice} text={t.content} /></>}</div>
            ))}
            {busy && <div className="coach-msg assistant">{live ? <Rich text={live} /> : <p className="muted coach-thinking">Thinking…</p>}</div>}
            {err && <p className="small coach-err" role="alert">{err}</p>}
            {voice.micNote && <p className="small muted">{voice.micNote}</p>}
            <div ref={end} />
          </>
        )}
      </div>
      {sample && (
        <form className="coach-input" onSubmit={(e) => { e.preventDefault(); ask(draft) }}>
          <textarea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={voice.listening ? 'Listening… speak now' : 'Ask about a negotiation or a conflict…'}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(draft) } }} aria-label="Your question" />
          <MicButton voice={voice} disabled={busy} onText={setDraft} onFinal={(t) => { voice.setVoiceOn(true); voiceOn.current = true; ask(t) }} />
          {busy ? <button type="button" className="btn btn-sm" onClick={() => ctl.current?.abort()}>Stop</button>
            : <button className="btn btn-primary btn-sm" disabled={!draft.trim()}>Send</button>}
        </form>
      )}
      <p className="coach-fine">AI coach based on the course modules. Educational guidance, not legal, financial or psychological advice.</p>
    </aside>
  )
}

// ---- Live sparring partner -------------------------------------------------

export function Spar({ scenarioId, compact }) {
  const sc = scenarioById(scenarioId)
  const kb = useKb()
  const { ready, sample } = useSample()
  const [turns, setTurns] = useState(null) // null = not started
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [live, setLive] = useState('')
  const [ended, setEnded] = useState(false)
  const [report, setReport] = useState(null)
  const [reporting, setReporting] = useState(false)
  const [err, setErr] = useState('')
  const ctl = useRef(null)
  const end = useRef(null)
  const voice = useVoice({ alt: true })
  const voiceOn = useRef(false); voiceOn.current = voice.voiceOn
  useEffect(() => { if (turns) end.current?.scrollIntoView({ block: 'nearest' }) }, [turns, live])
  useEffect(() => () => ctl.current?.abort(), [])

  const start = () => { setTurns([{ role: 'assistant', content: sc.opening }]); setEnded(false); setReport(null); setErr(''); if (voiceOn.current) voice.speak(sc.opening) }

  async function send(msg) {
    msg = msg.trim()
    if (!msg || busy || ended || !sample) return
    setErr(''); setDraft('')
    const history = [...turns, { role: 'user', content: msg }]
    setTurns(history); setBusy(true); setLive('')
    ctl.current = new AbortController()
    // The opening line is the counterpart's, so the instructions turn comes first and the transcript follows.
    const transcript = history.map((t) => `${t.role === 'user' ? 'LEARNER' : sc.counterpart.name.toUpperCase()}: ${t.content}`).join('\n')
    const input = SPAR_RULES(sc) + `\n\nCONVERSATION SO FAR\n${transcript}\n\nWrite ${sc.counterpart.name}'s next reply only.`
    try {
      const { text } = await sample(input, { cache: false, modelTier: 'quick', signal: ctl.current.signal, onText: ({ text }) => setLive(text.replace('[END]', '')) })
      const done = text.includes('[END]')
      setTurns((t) => [...t, { role: 'assistant', content: text.replace('[END]', '').trim() }])
      if (voiceOn.current) voice.speak(text.replace('[END]', ''))
      if (done) setEnded(true)
    } catch (e) {
      if (e?.code !== 'cancelled') setErr(errorText(e))
    } finally { setBusy(false); setLive('') }
  }

  async function feedback() {
    if (!sample || reporting) return
    setEnded(true); setReporting(true); setErr('')
    const transcript = turns.map((t) => `${t.role === 'user' ? 'LEARNER' : sc.counterpart.name.toUpperCase()}: ${t.content}`).join('\n')
    const excerpts = formatExcerpts(retrieve(kb, sc.query + ' ' + transcript, {}, 9))
    try {
      const r = await sample.json(FEEDBACK_PROMPT(sc, transcript, excerpts), { cache: false })
      setReport(r && typeof r === 'object' ? r : null)
      if (!r || typeof r !== 'object') setErr('The feedback report could not be created. Please try again.')
    } catch (e) {
      setErr(e?.code === 'invalid_json' ? 'The feedback report could not be read. Please try again.' : errorText(e))
    } finally { setReporting(false) }
  }

  const learnerTurns = turns ? turns.filter((t) => t.role === 'user').length : 0
  return (
    <div className={'activity spar' + (compact ? ' compact' : '')}>
      <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>Live sparring partner · AI coach (premium prototype)</span>
      <h4>{sc.title}</h4>
      <div className="spar-brief">
        <img src={sc.img} alt="" />
        <div>
          <p><strong>Your role:</strong> {sc.you}.</p>
          <p>{sc.brief}</p>
          <p className="small muted">You'll negotiate with {sc.counterpart.name} ({sc.counterpart.role}), played by the AI. Type or say what you would say. When you're done, ask for your feedback report.</p>
        </div>
      </div>
      {!ready ? <p className="small muted">Starting the coach…</p> : !sample ? <Unavailable /> : !turns ? (
        <div className="row" style={{ gap: '.6rem' }}>
          <button className="btn btn-primary" onClick={start}>Start the negotiation</button>
          <VoiceToggle voice={voice} />
        </div>
      ) : (
        <>
          <div className="spar-log" aria-live="polite">
            {turns.map((t, i) => <SparLine key={i} t={t} sc={sc} voice={voice} />)}
            {busy && <SparLine t={{ role: 'assistant', content: live }} sc={sc} typing={!live} />}
            <div ref={end} />
          </div>
          {err && <p className="small coach-err" role="alert">{err}</p>}
          {voice.micNote && <p className="small muted">{voice.micNote}</p>}
          {!ended && (
            <form className="coach-input" onSubmit={(e) => { e.preventDefault(); send(draft) }}>
              <textarea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={voice.listening ? 'Listening… speak now' : `Your reply to ${sc.counterpart.name}…`}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(draft) } }} aria-label="Your reply" disabled={busy} />
              <MicButton voice={voice} disabled={busy} onText={setDraft} onFinal={(t) => { voice.setVoiceOn(true); voiceOn.current = true; send(t) }} />
              {busy ? <button type="button" className="btn btn-sm" onClick={() => ctl.current?.abort()}>Stop</button>
                : <button className="btn btn-primary btn-sm" disabled={!draft.trim()}>Send</button>}
            </form>
          )}
          <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
            {!report && <button className="btn btn-dark" onClick={feedback} disabled={reporting || busy || learnerTurns < 2}>{reporting ? 'Writing your feedback…' : ended ? 'Get my feedback report' : 'End and get feedback'}</button>}
            <button className="btn" onClick={start} disabled={busy || reporting}>Start again</button>
            <VoiceToggle voice={voice} />
            {learnerTurns < 2 && !report && <span className="small muted">Feedback unlocks after two of your replies.</span>}
          </div>
          {report && <Report r={report} />}
        </>
      )}
    </div>
  )
}

function SparLine({ t, sc, typing, voice }) {
  const me = t.role === 'user'
  return (
    <div className={'line' + (me ? ' right' : '')}>
      <span className="who" style={me ? { background: 'var(--orange)', color: '#1c0f00', fontSize: '.7rem' } : undefined}>{me ? 'YOU' : sc.counterpart.initials}</span>
      <div className="bubble">
        <span className="name">{me ? 'You' : `${sc.counterpart.name} · ${sc.counterpart.role}`}</span>
        {typing ? <span className="muted coach-thinking">…</span> : <Md text={t.content} />}
        {!me && !typing && voice && <PlayButton voice={voice} text={t.content} />}
      </div>
    </div>
  )
}

const HANDLED = { well: ['Handled well', 'var(--b-assertive)'], partly: ['Partly handled', 'var(--orange)'], missed: ['Missed', 'var(--b-aggressive)'] }

function Report({ r }) {
  const list = (x) => (Array.isArray(x) ? x : [])
  return (
    <div className="spar-report fade-in">
      <span className="eyebrow">Feedback report</span>
      <h4>{r.rating ? `${r.rating}: ` : ''}{r.outcome}</h4>
      {list(r.tactics).length > 0 && (
        <div className="stack" style={{ gap: '.5rem' }}>
          <h5>Tactics you faced</h5>
          {list(r.tactics).map((x, i) => {
            const [label, c] = HANDLED[x.handled] || HANDLED.partly
            return (
              <div key={i} className="spar-tactic" style={{ borderLeftColor: c }}>
                <div className="row" style={{ justifyContent: 'space-between', gap: '.5rem' }}><strong>{x.tactic}</strong><span className="pill" style={{ color: c }}>{label}</span></div>
                {x.moment && <p className="small muted">"{x.moment}"</p>}
                <p className="small">{x.note}</p>
              </div>
            )
          })}
        </div>
      )}
      {list(r.strengths).length > 0 && <><h5>What you did well</h5><ul>{list(r.strengths).map((s, i) => <li key={i}>{String(s)}</li>)}</ul></>}
      {list(r.improve).length > 0 && <><h5>Try next time</h5><ul>{list(r.improve).map((s, i) => <li key={i}>{s.tip}{s.say && <><br /><strong>"{String(s.say).replace(/^"|"$/g, '')}"</strong></>}</li>)}</ul></>}
      {list(r.review).length > 0 && <><h5>Lessons to review</h5><ul>{list(r.review).map((s, i) => <li key={i}>{s.where}{s.page ? `: ${s.page}` : ''}</li>)}</ul></>}
    </div>
  )
}

// ---- Practice studio (dashboard page) --------------------------------------

export function PracticeStudio() {
  const { go, view } = useApp()
  const active = view.scenarioId && scenarioById(view.scenarioId)
  return (
    <div className="wrap" style={{ paddingBottom: '4rem', maxWidth: 920 }}>
      <button className="btn btn-sm" onClick={() => (active ? go('practice') : go('dashboard'))} style={{ marginBottom: '1rem' }}>← {active ? 'All scenarios' : 'Dashboard'}</button>
      {active ? <Spar key={active.id} scenarioId={active.id} /> : (
        <div className="stack" style={{ gap: '1.2rem' }}>
          <span className="eyebrow">AI coach · Premium prototype</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>Practice studio</h1>
          <p className="muted">Negotiate live with an AI counterpart who uses the tactics from the course. Afterwards you get a feedback report that links back to the lessons.</p>
          <div className="studio-grid">
            {scenarios.map((s) => (
              <button key={s.id} className="card studio-card" onClick={() => go('practice', { scenarioId: s.id })}>
                <img src={s.img} alt="" />
                <span className="eyebrow">{s.level} · {s.modules}</span>
                <h4>{s.title}</h4>
                <p className="small muted">Play {s.you}. Opposite you: {s.counterpart.name} ({s.counterpart.role}).</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function CoachTeaser() {
  const { go } = useApp()
  return (
    <div className="card coach-teaser">
      <span className="coach-dot lg" aria-hidden="true">AI</span>
      <div>
        <span className="eyebrow">Premium · prototype</span>
        <h4>Your AI negotiation coach</h4>
        <p className="small muted">Ask questions about any situation, or practise live with an AI counterpart. Everything it teaches comes from the course.</p>
      </div>
      <div className="row" style={{ gap: '.5rem' }}>
        <button className="btn" onClick={() => window.dispatchEvent(new Event('open-coach'))}>Ask the coach</button>
        <button className="btn btn-primary" onClick={() => go('practice')}>Practice studio</button>
      </div>
    </div>
  )
}
