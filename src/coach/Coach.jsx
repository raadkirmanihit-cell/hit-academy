import { isLive } from '../platform/backend.js'
import { makeServerSample } from './serverSample.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { Icon } from '../ui/icons.jsx'
import { flatSteps } from '../platform/progress.js'
import { Md } from '../ui/md.jsx'
import { buildChunks, retrieve, formatExcerpts, library } from './knowledge.js'
import { COACH_RULES, SPAR_RULES, FEEDBACK_PROMPT } from './prompts.js'
import { scenarios, scenarioById } from './scenarios.js'
import { useVoice } from './voice.js'
import { practiceTurn, practiceScore } from './practiceApi.js'
import { combineVoice, readings } from '../activities/speechMetrics.js'
import { SKILLS, PASS_SCORE, PASS_MIN_SKILL, MIN_SKILLS, MIN_TURNS, LEVELS, RANKS, levelOpen, currentRank, computeScore, practiceSummary } from './scoring.js'
import { useCoachPlan, usedOneMessage, usedOnePractice, coachLocked, CoachPaywall, PlanNote, PracticeCounter, TopUpCard } from './plan.jsx'

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
function MicButton({ voice, onText, onFinal, disabled, measure = false }) {
  if (!voice.canListen) return (
    <button type="button" className="btn btn-sm mic-btn off" disabled={disabled} aria-label="How to speak instead of typing" onClick={() => voice.dictationTip()}><MicIcon /></button>
  )
  return (
    <button type="button" className={'btn btn-sm mic-btn' + (voice.listening ? ' listening' : '')} disabled={disabled}
      aria-label={voice.listening ? 'Stop listening' : 'Speak instead of typing'} aria-pressed={voice.listening}
      onClick={() => voice.listen(onText, onFinal, undefined, { measure })}><MicIcon /></button>
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
    // Live website: our own coach server. claude.ai preview: the page's `sample` capability.
    if (isLive) { setState({ ready: true, sample: makeServerSample() }); return }
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
  network: 'Connection problem. Please check your internet and try again.',
}
// Server says the free messages are used up: switch the coach to the subscribe card.
export const noteError = (e) => { if (e?.code === 'needs_subscription') coachLocked() }
export const errorText = (e) => (isLive && e?.message && e.code !== 'cancelled' ? e.message : ERRORS[e?.code]) || 'Something went wrong. Please try again.'

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
  'A key supplier wants to raise prices by 15%.',
  'My business partner and I keep arguing about priorities.',
  'How do I respond to "this is our final offer"?',
]

// ---- Ask the coach (side panel) --------------------------------------------

export function CoachLauncher() {
  const { user, paid, view, modules, progress } = useApp()
  const [open, setOpen] = useState(false)
  const [subscribe, setSubscribe] = useState(false)
  useEffect(() => {
    const h = () => { setSubscribe(false); setOpen(true) }
    const s = () => { setSubscribe(true); setOpen(true) }
    window.addEventListener('open-coach', h)
    window.addEventListener('coach-subscribe', s)
    return () => { window.removeEventListener('open-coach', h); window.removeEventListener('coach-subscribe', s) }
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
      {open && <CoachPanel ctx={ctx} subscribe={subscribe} onClose={() => setOpen(false)} />}
    </>
  )
}

function CoachPanel({ ctx, subscribe, onClose }) {
  const kb = useKb()
  const { ready, sample } = useSample()
  const { locked, plan } = useCoachPlan()
  const showPaywall = locked || (subscribe && plan && (!plan.subscribed || plan.included) && !plan.preview)
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
      usedOneMessage()
      if (voiceOn.current) voice.speak(text)
    } catch (e) {
      if (e?.text) setTurns((t) => [...t, { role: 'assistant', content: e.text + ' …' }])
      noteError(e)
      if (e?.code !== 'cancelled') setErr(errorText(e))
    } finally { setBusy(false); setLive('') }
  }

  return (
    <aside className="coach-panel fade-in" aria-label="AI coach">
      <header className="coach-head">
        <div>
          <span className="eyebrow">{isLive ? 'Premium' : 'Premium · prototype'}</span>
          <h3>H.I.T. Negotiation Coach</h3>
        </div>
        <div className="row" style={{ gap: '.4rem', flexWrap: 'nowrap' }}>
          {sample && <VoiceToggle voice={voice} />}
          <button className="btn btn-sm" onClick={() => { voice.stopSpeaking(); onClose() }} aria-label="Close the coach">Close</button>
        </div>
      </header>
      <div className="coach-body">
        {!ready ? <p className="small muted">Starting the coach…</p> : !sample ? <Unavailable /> : showPaywall ? <CoachPaywall compact /> : (
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
      {sample && !showPaywall && <PlanNote />}
      {sample && !showPaywall && (
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
  const { practice, recordPractice } = useApp()
  const [turns, setTurns] = useState(null) // null = not started
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [live, setLive] = useState('')
  const [ended, setEnded] = useState(false)
  const [report, setReport] = useState(null)
  const [score, setScore] = useState(null)
  const [reporting, setReporting] = useState(false)
  const [err, setErr] = useState('')
  const [handsFree, setHandsFree] = useState(false)
  const [hint, setHint] = useState('')
  const ctl = useRef(null)
  const end = useRef(null)
  const session = useRef(null) // the server's id for this role-play
  const { practiceLocked: locked } = useCoachPlan()
  const voice = useVoice({ alt: true })
  const voiceOn = useRef(false); voiceOn.current = voice.voiceOn
  const hf = useRef(false); hf.current = handsFree
  const sendRef = useRef(null)
  const sending = useRef(false) // blocks a second send before the first has finished (state updates arrive too late)
  const endedRef = useRef(false); endedRef.current = ended
  useEffect(() => { if (turns) end.current?.scrollIntoView({ block: 'nearest' }) }, [turns, live])
  useEffect(() => () => ctl.current?.abort(), [])
  const history = practice.filter((a) => a.scenario_id === sc.id)

  // Hands-free: after the counterpart has spoken, the microphone opens by itself, and the learner's
  // turn is sent as soon as they stop talking.
  function listenNext() {
    if (!hf.current || endedRef.current || !voice.canListen) return
    setHint('')
    voice.listen(setDraft, (t, d) => sendRef.current(t, d), () => setHint('I didn\'t catch that. Tap the microphone and speak again.'), { measure: true })
  }
  function say(text) {
    if (voiceOn.current) voice.speak(text, listenNext)
    else listenNext()
  }

  function start() {
    voice.stopSpeaking()
    session.current = null
    setTurns([{ role: 'assistant', content: sc.opening }]); setEnded(false); setReport(null); setScore(null); setErr(''); setHint('')
    if (voiceOn.current || hf.current) say(sc.opening)
  }

  function toggleHandsFree() {
    const on = !handsFree
    setHandsFree(on); hf.current = on
    if (on) { voice.setVoiceOn(true); voiceOn.current = true; if (turns && !ended && !busy && !voice.listening) listenNext() }
    else voice.stopSpeaking()
  }

  async function send(msg, delivery) {
    msg = msg.trim()
    if (!msg || busy || sending.current || ended || !sample) return
    sending.current = true
    setErr(''); setDraft(''); setHint('')
    const past = turns
    const history = [...past, { role: 'user', content: msg, ...(delivery ? { delivery } : {}) }]
    setTurns(history); setBusy(true); setLive('')
    ctl.current = new AbortController()
    try {
      let text
      if (isLive) {
        const r = await practiceTurn({ scenarioId: sc.id, sessionId: session.current, message: msg, delivery, turns: past, signal: ctl.current.signal, onText: (t) => setLive(t.replace('[END]', '')) })
        session.current = r.sessionId // also when not saved: the server then scores what the browser sends
        text = r.text
      } else {
        // claude.ai preview: the conversation is built in the browser.
        const transcript = history.map((t) => `${t.role === 'user' ? 'LEARNER' : sc.counterpart.name.toUpperCase()}: ${t.content}`).join('\n')
        const input = SPAR_RULES(sc) + `\n\nCONVERSATION SO FAR\n${transcript}\n\nWrite ${sc.counterpart.name}'s next reply only.`
        text = (await sample(input, { cache: false, modelTier: 'quick', purpose: 'practice', signal: ctl.current.signal, onText: ({ text }) => setLive(text.replace('[END]', '')) })).text
      }
      const done = text.includes('[END]')
      const reply = text.replace('[END]', '').trim()
      setTurns((t) => [...t, { role: 'assistant', content: reply }])
      usedOnePractice()
      if (done) { setEnded(true); endedRef.current = true; if (voiceOn.current) voice.speak(reply) }
      else if (voiceOn.current || hf.current) say(reply)
    } catch (e) {
      noteError(e)
      if (e?.code !== 'cancelled') { setErr(errorText(e)); setTurns(past) }
    } finally { sending.current = false; setBusy(false); setLive('') }
  }
  sendRef.current = send

  async function feedback() {
    if (!sample || reporting) return
    voice.stopSpeaking(); setHandsFree(false); hf.current = false
    setEnded(true); setReporting(true); setErr('')
    try {
      let r, s
      if (isLive) {
        ({ report: r, score: s } = await practiceScore({ sessionId: session.current, scenarioId: sc.id, turns }))
      } else {
        const transcript = turns.map((t) => `${t.role === 'user' ? 'LEARNER' : sc.counterpart.name.toUpperCase()}: ${t.content}`).join('\n')
        const excerpts = formatExcerpts(retrieve(kb, sc.query + ' ' + transcript, {}, 12))
        r = await sample.json(FEEDBACK_PROMPT(sc, transcript, excerpts, kb.library), { cache: false, purpose: 'practice' })
        s = { ...computeScore(r?.skills, { turns: turns.filter((t) => t.role === 'user').length, level: sc.level, conduct: r?.conduct }), level: sc.level, saved: true, at: new Date().toISOString() }
      }
      usedOnePractice()
      if (!r || typeof r !== 'object') { setErr('The feedback report could not be created. Please try again.'); return }
      setReport(r); setScore(s)
      if (s?.saved) recordPractice({ scenario_id: sc.id, level: sc.level, overall: s.overall, passed: s.passed, skills: r.skills, created_at: s.at })
    } catch (e) {
      noteError(e)
      setErr(e?.code === 'invalid_json' ? 'The feedback report could not be read. Please try again.' : errorText(e))
      if (e?.code !== 'finished') setEnded(false)
    } finally { setReporting(false) }
  }

  const learnerTurns = turns ? turns.filter((t) => t.role === 'user').length : 0
  const [early, setEarly] = useState(false) // asking: end before the minimum replies?
  const canHandsFree = voice.canListen && voice.canSpeak
  return (
    <div className={'activity spar' + (compact ? ' compact' : '')}>
      <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>Live sparring partner · AI coach{isLive ? '' : ' (premium prototype)'} · {sc.level}</span>
      <h4>{sc.title}</h4>
      <div className="spar-brief">
        <img src={sc.img} alt="" />
        <div>
          <p><strong>Your role:</strong> {sc.you}.</p>
          <p>{sc.brief}</p>
          <p className="small muted">You'll negotiate with {sc.counterpart.name} ({sc.counterpart.role}), played by the AI. Type or say what you would say{canHandsFree ? ', or switch on hands-free to talk it through like a phone call' : ''}. When you're done, ask for your feedback report and score.</p>
        </div>
      </div>
      {sc.background?.length > 0 && (
        <div className="spar-background">
          {sc.background.map((b) => (
            <div key={b.h}>
              <h5>{b.h}</h5>
              <ul>{b.items.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {history.length > 0 && <ScoreHistory attempts={history} />}
      {!ready ? <p className="small muted">Starting the coach…</p> : !sample ? <Unavailable /> : locked && !report ? <div className="stack" style={{ gap: '1rem' }}>{isLive && <TopUpCard />}<CoachPaywall compact={compact} practice /></div> : !turns ? (
        <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={start}>Start the negotiation</button>
          <VoiceToggle voice={voice} />
          {canHandsFree && <HandsFreeToggle on={handsFree} onClick={toggleHandsFree} />}
        </div>
      ) : (
        <>
          <div className="spar-log" aria-live="polite">
            {turns.map((t, i) => <SparLine key={i} t={t} sc={sc} voice={voice} />)}
            {busy && <SparLine t={{ role: 'assistant', content: live }} sc={sc} typing={!live} />}
            <div ref={end} />
          </div>
          {reporting && <ReportProgress />}
          {err && <p className="small coach-err" role="alert">{err}</p>}
          {voice.micNote && <p className="small muted">{voice.micNote}</p>}
          {handsFree && !ended && <p className="small hands-free-status" role="status">{voice.listening ? 'Listening… speak now. Your turn is sent after a 4-second pause, or tap the microphone to send it straight away.' : voice.speaking ? `${sc.counterpart.name} is speaking…` : busy ? `${sc.counterpart.name} is thinking…` : hint || 'Hands-free is on.'}</p>}
          <PlanNote practice />
          {!ended && (
            <form className="coach-input" onSubmit={(e) => { e.preventDefault(); send(draft) }}>
              <textarea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={voice.listening ? 'Listening… speak now' : `Your reply to ${sc.counterpart.name}…`}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(draft) } }} aria-label="Your reply" disabled={busy} />
              <MicButton voice={voice} disabled={busy} measure onText={setDraft} onFinal={(t, d) => { voice.setVoiceOn(true); voiceOn.current = true; send(t, d) }} />
              {busy ? <button type="button" className="btn btn-sm" onClick={() => ctl.current?.abort()}>Stop</button>
                : <button className="btn btn-primary btn-sm" disabled={!draft.trim()}>Send</button>}
            </form>
          )}
          {early && !report && !reporting && (
            <div className="early-end" role="alertdialog" aria-label="End the role-play early?">
              <p className="small"><strong>You've given {learnerTurns} {learnerTurns === 1 ? 'reply' : 'replies'}.</strong> A {sc.level} role-play needs at least {MIN_TURNS[sc.level]} to qualify for passing, so this one can't clear the level. The report still uses 1 message.</p>
              <div className="row" style={{ gap: '.5rem' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setEarly(false)}>Keep negotiating</button>
                <button className="btn btn-sm" onClick={() => { setEarly(false); feedback() }}>End anyway</button>
              </div>
            </div>
          )}
          <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
            {!report && <button className="btn btn-dark" onClick={() => (!ended && learnerTurns < (MIN_TURNS[sc.level] || 0) ? setEarly(true) : feedback())} disabled={reporting || busy || learnerTurns < 2}>{reporting ? 'Writing your feedback and score…' : ended ? 'Get my feedback and score' : 'End and get feedback'}</button>}
            <button className="btn" onClick={start} disabled={busy || reporting}>Start again</button>
            <VoiceToggle voice={voice} />
            {canHandsFree && !ended && <HandsFreeToggle on={handsFree} onClick={toggleHandsFree} />}
            {learnerTurns < 2 && !report && <span className="small muted">Feedback unlocks after two of your replies.</span>}
          </div>
          {report && <Report r={report} sc={sc} score={score} turns={turns} />}
        </>
      )}
    </div>
  )
}

function HandsFreeToggle({ on, onClick }) {
  return (
    <button type="button" className={'btn btn-sm voice-toggle' + (on ? ' on' : '')} aria-pressed={on} onClick={onClick}
      title="Talk it through like a phone call: the microphone opens after each reply and sends your turn when you stop talking.">
      <MicIcon /> {on ? 'Hands-free on' : 'Hands-free'}
    </button>
  )
}

// Earlier scores for this scenario: best, latest and a small chart.
function ScoreHistory({ attempts }) {
  const scored = attempts.filter((a) => a.overall != null)
  const best = scored.length ? Math.max(...scored.map((a) => a.overall)) : null
  const latest = scored.length ? scored[scored.length - 1].overall : null
  const passed = attempts.some((a) => a.passed)
  const pts = scored.slice(-12)
  const w = 220, h = 56, x = (i) => (pts.length < 2 ? w / 2 : 8 + (i * (w - 16)) / (pts.length - 1)), y = (v) => h - 6 - ((v / 100) * (h - 12))
  return (
    <div className="score-history">
      <div>
        <span className="eyebrow">Your scores here</span>
        <p className="small"><strong className="tnum">{best ?? '–'}</strong> best · <strong className="tnum">{latest ?? '–'}</strong> latest · {attempts.length} attempt{attempts.length === 1 ? '' : 's'}
          {passed && <span className="pill pass-pill">Passed</span>}</p>
      </div>
      {pts.length > 0 && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Scores over time: ${pts.map((a) => a.overall).join(', ')}`}>
          <line x1="0" x2={w} y1={y(PASS_SCORE)} y2={y(PASS_SCORE)} className="pass-line" />
          {pts.length > 1 && <polyline fill="none" className="score-line" points={pts.map((a, i) => `${x(i)},${y(a.overall)}`).join(' ')} />}
          {pts.map((a, i) => <circle key={i} cx={x(i)} cy={y(a.overall)} r="3.5" className={a.passed ? 'dot pass' : 'dot'} />)}
        </svg>
      )}
    </div>
  )
}

// The counterpart's reply: each *stage direction* on its own line, apart from what they say.
function Spoken({ text }) {
  const parts = []
  let speech = '', last = 0
  const flush = () => { if (speech.trim()) parts.push({ say: speech.trim() }); speech = '' }
  for (const m of String(text).matchAll(/\*\*[^*]+\*\*|\*[^*\n]+\*/g)) {
    speech += text.slice(last, m.index); last = m.index + m[0].length
    if (m[0].startsWith('**')) { speech += m[0]; continue } // bold stays part of what they say
    flush(); parts.push({ stage: m[0].slice(1, -1).trim() })
  }
  speech += text.slice(last); flush()
  return parts.map((x, i) => x.stage ? <span key={i} className="action">{x.stage}</span> : <div key={i}><Md text={x.say} /></div>)
}

// Creating the report takes a while and can't report its own progress, so this estimates it from the time
// taken: it slows down as it gets closer, and never reaches 100% until the report is there.
function ReportProgress() {
  const [secs, setSecs] = useState(0)
  useEffect(() => { const id = setInterval(() => setSecs((x) => x + 0.5), 500); return () => clearInterval(id) }, [])
  const pct = Math.min(97, Math.round(100 * (1 - Math.exp(-secs / 25))))
  const step = pct < 25 ? 'Reading your conversation' : pct < 55 ? 'Scoring the five skills with evidence' : pct < 85 ? 'Writing your feedback and next steps' : 'Almost done'
  return (
    <div className="report-progress" role="status" aria-live="polite">
      <div className="row" style={{ justifyContent: 'space-between' }}><span className="small">{step}…</span><span className="small tnum">{pct}%</span></div>
      <div className="bar" aria-hidden="true"><i style={{ width: pct + '%' }} /></div>
      <span className="small muted">This usually takes 30 to 60 seconds. Please keep this page open.</span>
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
        {typing ? <span className="muted coach-thinking">…</span> : me ? <Md text={t.content} /> : <Spoken text={t.content} />}
        {!me && !typing && voice && <PlayButton voice={voice} text={t.content} />}
      </div>
    </div>
  )
}

const HANDLED = { well: ['Handled well', 'var(--b-assertive)'], partly: ['Partly handled', 'var(--orange)'], missed: ['Missed', 'var(--b-aggressive)'] }

// How the learner sounded across their spoken turns, measured in the browser (the same readings as
// the modules' "Say it out loud" exercises). Shown only when at least one turn was spoken.
function VoiceReport({ turns }) {
  const v = combineVoice(turns.filter((t) => t.role === 'user').map((t) => t.delivery?.voice))
  if (!v) return null
  return (
    <div className="stack" style={{ gap: '.5rem' }}>
      <h5>How you sounded ({v.turns} spoken {v.turns === 1 ? 'reply' : 'replies'})</h5>
      <div className="metric-grid">
        {readings(v).map((x) => (
          <div key={x.k} className={'metric ' + x.tone}>
            <span className="small muted">{x.k}</span>
            <strong>{x.v}</strong>
            <span className="small">{x.t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Shown in the report when a role-play passes: the rank earned and what it unlocks.
function LevelUp({ level }) {
  const next = LEVELS[LEVELS.indexOf(level) + 1]
  return (
    <div className="level-up">
      <span className="level-up-badge" aria-hidden="true"><Icon.award width="40" height="40" /></span>
      <div>
        <span className="eyebrow">{level} level cleared</span>
        <h4>You are now a {RANKS[level].title}</h4>
        <p className="small">{next ? `The ${next} level is now unlocked.` : 'You have cleared every level: the practice part of your certificate is done.'}</p>
      </div>
    </div>
  )
}

function Report({ r, sc, score, turns = [] }) {
  const list = (x) => (Array.isArray(x) ? x : [])
  const skills = new Map(list(r.skills).map((s) => [s?.id, s]))
  const hasSkills = skills.size > 0
  return (
    <div className="spar-report fade-in">
      <span className="eyebrow">Feedback report</span>
      {score?.overall != null ? (
        <div className={'score-head' + (score.passed ? ' pass' : '')}>
          <div className="score-num"><strong className="tnum">{score.overall}</strong><span>/100</span></div>
          <div>
            <h4>{score.label}{score.passed ? ' · Passed' : ' · Not passed yet'}</h4>
            <p className="small muted">{score.passed ? `You passed this ${sc.level} scenario.` : score.blocked === 'conduct' ? 'This role-play can\'t pass because of the language used towards the other side. Keep it respectful, even under pressure.' : score.blocked === 'short' ? `This role-play was too short to pass: a ${sc.level} scenario needs at least ${score.minTurns} replies from you, so the pressure moments can come up.` : `To pass: ${PASS_SCORE} or more, with no skill below ${PASS_MIN_SKILL}.`}{score.saved === false ? ' This score wasn\'t saved.' : ''}</p>
          </div>
        </div>
      ) : hasSkills && <p className="small muted">This role-play was too short for an overall score: at least {MIN_SKILLS} of the 5 skills need to come up. Play it a little longer next time.</p>}
      {score?.passed && RANKS[sc.level] && <LevelUp level={sc.level} />}
      <h4>{!hasSkills && r.rating ? `${r.rating}: ` : ''}{r.outcome}</h4>
      {hasSkills && (
        <div className="skill-bars">
          {SKILLS.map((k) => {
            const s = skills.get(k.id) || {}
            return (
              <div key={k.id} className="skill-bar">
                <div className="row" style={{ justifyContent: 'space-between', gap: '.5rem' }}>
                  <strong>{k.name}</strong>
                  <span className="tnum small">{s.score ? `${s.score} / 5` : 'Not shown'}</span>
                </div>
                <div className="bar" aria-hidden="true"><span style={{ width: `${(s.score || 0) * 20}%` }} className={s.score && s.score < PASS_MIN_SKILL ? 'low' : ''} /></div>
                {s.reason && <p className="small">{s.reason}</p>}
                {s.evidence && <p className="small muted">"{String(s.evidence).replace(/^"|"$/g, '')}"</p>}
              </div>
            )
          })}
        </div>
      )}
      <VoiceReport turns={turns} />
      {list(r.flags).length > 0 && <p className="small report-flags"><strong>Noted:</strong> {list(r.flags).join(' ')}</p>}
      {list(r.tactics).length > 0 && (
        <div className="stack" style={{ gap: '.5rem' }}>
          <h5>{sc?.faced || 'Tactics you faced'}</h5>
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
      {list(r.review).length > 0 && <><h5>Lessons to review</h5><ul>{list(r.review).map((s, i) => (
        <li key={i}>
          <strong>{s.where}{s.page ? `: ${s.page}` : ''}</strong>
          {s.observed && <><br /><span className="small"><span className="muted">What we noticed:</span> {s.observed}</span></>}
          {s.takeaway && <><br /><span className="small"><span className="muted">Take from it:</span> {s.takeaway}</span></>}
        </li>
      ))}</ul></>}
      {list(r.research).filter((x) => x?.insight && x?.source).length > 0 && <><h5>Beyond the course</h5><ul>{list(r.research).filter((x) => x?.insight && x?.source).map((x, i) => <li key={i}>{x.insight}<br /><span className="small muted">{x.source}</span></li>)}</ul></>}
    </div>
  )
}

// ---- Practice studio (dashboard page) --------------------------------------

export function PracticeStudio() {
  const { go, view, practice, course, admin } = useApp()
  const active = view.scenarioId && scenarioById(view.scenarioId)
  const sum = practiceSummary(practice)
  const needCert = (course.certificate.practiceLevels || []).length > 0
  const [buying, setBuying] = useState(false)
  const open = (level) => admin || levelOpen(level, sum.levels)
  const rank = currentRank(sum.levels)
  const nextLevel = LEVELS.find((l) => !sum.levels.has(l))
  if (active && !open(active.level)) {
    const need = LEVELS.find((l) => !sum.levels.has(l))
    return (
      <div className="wrap" style={{ paddingBottom: '4rem', maxWidth: 920 }}>
        <button className="btn btn-sm" onClick={() => go('practice')} style={{ marginBottom: '1rem' }}>← All scenarios</button>
        <div className="card" style={{ padding: '1.5rem', display: 'grid', gap: '.6rem' }}>
          <span className="eyebrow">Locked</span>
          <h3>Clear the {need} level to unlock this role-play</h3>
          <p className="muted">Pass one {need} role-play first. Each level you clear unlocks the next one.</p>
          <button className="btn btn-primary" style={{ justifySelf: 'start' }} onClick={() => go('practice')}>Go to the {need} level</button>
        </div>
      </div>
    )
  }
  return (
    <div className="wrap" style={{ paddingBottom: '4rem', maxWidth: 920 }}>
      <button className="btn btn-sm" onClick={() => (active ? go('practice') : go('dashboard'))} style={{ marginBottom: '1rem' }}>← {active ? 'All scenarios' : 'Dashboard'}</button>
      {active ? <Spar key={active.id} scenarioId={active.id} /> : (
        <div className="stack" style={{ gap: '1.2rem' }}>
          <div className="studio-head">
            <div className="stack" style={{ gap: '.6rem' }}>
              <span className="eyebrow">{isLive ? 'AI coach · Premium' : 'AI coach · Premium prototype'}</span>
              <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>Practice studio</h1>
            </div>
            <PracticeCounter onBuy={() => setBuying(true)} />
          </div>
          <p className="muted">Negotiate live with AI counterparts who react to whatever you say. Clear three levels to earn your ranks{needCert ? ' and unlock your certificate' : ''}.</p>
          {buying && <TopUpCard onClose={() => setBuying(false)} />}

          <div className="quest">
            <div className="quest-rank">
              <span className="eyebrow">Your rank</span>
              <strong>{rank ? RANKS[rank].title : 'Newcomer'}</strong>
              <span className="small">{rank ? RANKS[rank].line : 'Clear the Beginner level to earn your first rank.'}</span>
            </div>
            <ol className="quest-path">
              {LEVELS.map((l, i) => {
                const done = sum.levels.has(l)
                const state = done ? 'done' : levelOpen(l, sum.levels) ? 'open' : 'locked'
                return (
                  <li key={l} className={'quest-step ' + state}>
                    <span className="quest-dot" aria-hidden="true">{done ? <Icon.check /> : state === 'locked' ? <Icon.lock /> : i + 1}</span>
                    <span className="quest-label"><strong>{l}</strong><span className="small">{RANKS[l].title}</span><span className="small quest-state">{done ? 'Cleared' : state === 'open' ? 'Play now' : 'Locked'}</span></span>
                  </li>
                )
              })}
              {needCert && (
                <li className={'quest-step ' + (sum.allLevels ? 'done' : 'locked')}>
                  <span className="quest-dot" aria-hidden="true">{sum.allLevels ? <Icon.check /> : <Icon.lock />}</span>
                  <span className="quest-label"><strong>Certificate</strong><span className="small">Practice part</span><span className="small quest-state">{sum.allLevels ? 'Unlocked' : 'Clear all 3 levels'}</span></span>
                </li>
              )}
            </ol>
          </div>

          <div className="card practice-rules">
            <h4>Rules of the game</h4>
            <ul className="small rules-how">
              <li><strong>Clear a level</strong> by passing one of its role-plays: score {PASS_SCORE} points or more out of 100, with no skill rated below {PASS_MIN_SKILL} out of 5. Retry as often as you like.</li>
              <li><strong>Aim for 10 exchanges or more.</strong> A real negotiation needs time to unfold: the other side opens up, pushes back and tests you.</li>
              <li><strong>Messages:</strong> each AI reply uses 1, and your feedback report uses 1.</li>
            </ul>
            <details className="full-rules">
              <summary>Full rules: do's and don'ts</summary>
              <div className="dos-donts">
                <div className="dos">
                  <h5><Icon.check /> Do</h5>
                  <ul className="small">
                    <li>Treat it like a real meeting and stay in your role.</li>
                    <li>Ask questions, listen, and use what the course teaches.</li>
                    <li>Say your full point in one message.</li>
                    <li>Take your time. Pauses are fine: hands-free waits for 4 seconds of silence.</li>
                  </ul>
                </div>
                <div className="donts">
                  <h5><Icon.close width="18" height="18" /> Don't</h5>
                  <ul className="small">
                    <li>Insult or swear at the other side: they end the meeting and it can't pass.</li>
                    <li>Use strong swear words casually. One slip is forgiven; after that your score drops.</li>
                    <li>Send test messages or random text: each uses a message and repeats lower your score.</li>
                  </ul>
                </div>
              </div>
            </details>
          </div>

          {LEVELS.map((level, i) => {
            // Locked for the student until the level before is cleared (admins can still open it to test).
            const unlocked = levelOpen(level, sum.levels)
            const canPlay = admin || unlocked
            const cleared = sum.levels.has(level)
            return (
              <section key={level} className={'level-band band-' + (i + 1) + (unlocked ? '' : ' locked')}>
                <div className="level-band-head">
                  <span className="level-band-num" aria-hidden="true">{cleared ? <Icon.check /> : unlocked ? i + 1 : <Icon.lock width="16" height="16" />}</span>
                  <div>
                    <h3>Level {i + 1} · {level}</h3>
                    <span className="level-band-rank">Rank: {RANKS[level].title}</span>
                  </div>
                  <span className="level-tag">{cleared ? '✓ Cleared' : unlocked ? (level === nextLevel ? 'Your next level' : 'Open') : admin ? <><Icon.lock width="14" height="14" /> Locked for students · you can test it</> : <><Icon.lock width="14" height="14" /> Clear {LEVELS[i - 1]} to unlock</>}</span>
                </div>
                <div className="studio-grid">
                  {scenarios.filter((s) => s.level === level).map((s) => {
                    const r = sum.byScenario[s.id]
                    return (
                      <button key={s.id} className="card studio-card" disabled={!canPlay} onClick={() => go('practice', { scenarioId: s.id })}>
                        <span className="studio-img"><img src={s.img} alt="" />{!unlocked && <span className="studio-lock"><Icon.lock width="28" height="28" /></span>}</span>
                        <span className="studio-card-text">
                          <span className="eyebrow">{s.level}{r?.passed ? ' · Passed' : ''}</span>
                          <h4>{s.title}</h4>
                          <span className="small muted">Play {s.you}. Opposite you: {s.counterpart.name} ({s.counterpart.role}).</span>
                          {r && <span className="small tnum"><strong>{r.best ?? '–'}</strong> best · <strong>{r.latest ?? '–'}</strong> latest</span>}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
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
        <span className="eyebrow">{isLive ? 'Premium' : 'Premium · prototype'}</span>
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
