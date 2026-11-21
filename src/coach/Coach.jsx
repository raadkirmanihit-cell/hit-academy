import { isLive } from '../platform/backend.js'
import { makeServerSample } from './serverSample.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { Icon } from '../ui/icons.jsx'
import { flatSteps } from '../platform/progress.js'
import { Md } from '../ui/md.jsx'
import { buildChunks, retrieve, formatExcerpts, library } from './knowledge.js'
import { COACH_RULES, SPAR_RULES, FEEDBACK_PROMPT } from './prompts.js'
import { lessonOf, TOKEN } from './lessons.js'
import { CoachPanel } from './CoachPanel.jsx'
import { SAFETY_TOKEN } from './safety.js'
import { scenarios, scenarioById } from './scenarios.js'
import { useVoice } from './voice.js'
import { practiceTurn, practiceScore } from './practiceApi.js'
import { combineVoice, readings } from '../activities/speechMetrics.js'
import { SKILLS, PASS_SCORE, PASS_MIN_SKILL, MIN_SKILLS, MIN_TURNS, LEVELS, RANKS, levelOpen, currentRank, computeScore, practiceSummary } from './scoring.js'
import { useCoachPlan, usedOneMessage, usedOnePractice, coachLocked, arenaLocked, CoachPaywall, PlanNote, PracticeCounter, TopUpCard, ArenaUnlockCard, useArenaAccess, refreshCoachPlan } from './plan.jsx'

const MicIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
const SpeakerIcon = ({ off }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" />{off ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}</svg>

// Voice replies on/off, shown when the browser can speak.
export function VoiceToggle({ voice }) {
  if (!voice.canSpeak) return null
  return (
    <button type="button" className={'btn btn-sm voice-toggle' + (voice.voiceOn ? ' on' : '')} aria-pressed={voice.voiceOn}
      onClick={() => { if (voice.voiceOn) voice.stopSpeaking(); voice.setVoiceOn(!voice.voiceOn) }}>
      <SpeakerIcon off={!voice.voiceOn} /> {voice.voiceOn ? 'Voice on' : 'Voice off'}
    </button>
  )
}
export function MicButton({ voice, onText, onFinal, disabled, measure = false }) {
  if (!voice.canListen) return (
    <button type="button" className="btn btn-sm mic-btn off" disabled={disabled} aria-label="How to speak instead of typing" onClick={() => voice.dictationTip()}><MicIcon /></button>
  )
  return (
    <button type="button" className={'btn btn-sm mic-btn' + (voice.listening ? ' listening' : '')} disabled={disabled}
      aria-label={voice.listening ? 'Stop listening' : 'Speak instead of typing'} aria-pressed={voice.listening}
      onClick={() => voice.listen(onText, onFinal, undefined, { measure })}><MicIcon /></button>
  )
}
export function PlayButton({ voice, text }) {
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
  not_granted: 'The AI needs your permission to use Claude. Reload the page and choose Allow to try again.',
  sampling_disabled: 'Claude is not available for this account.',
  rate_limited: 'The AI is busy. Please wait a minute and try again.',
  session_expired: 'Your session has expired. Please sign in to claude.ai again.',
  refused: 'The AI can\'t help with that. Try rephrasing your question.',
  network: 'Connection problem. Please check your internet and try again.',
}
// Server says the free messages are used up: switch the coach to the subscribe card.
export const noteError = (e) => { if (e?.code === 'needs_subscription') coachLocked(); if (e?.code === 'needs_tokens') arenaLocked(); if (e?.code === 'needs_arena') refreshCoachPlan() }
export const errorText = (e) => (isLive && e?.message && e.code !== 'cancelled' ? e.message : ERRORS[e?.code]) || 'Something went wrong. Please try again.'

// A lesson token from the coach ([[m5/l3-what]]) becomes a link to that page.
// Modules the learner doesn't own open the unlock page instead. Unknown tokens are dropped.
export function LessonLink({ id, onOpen }) {
  const { modules, owned, go } = useApp()
  const l = lessonOf(modules, id)
  if (!l) return null
  const open = owned.has(l.moduleId)
  return (
    <a className={'coach-lesson' + (open ? '' : ' locked')} href={open ? `#/module/${l.moduleId}/${l.stepId}` : `#/checkout/${l.moduleId}`}
      title={open ? `Open "${l.page}"` : 'Unlock this module'}
      onClick={(e) => { e.preventDefault(); onOpen?.(); open ? go('module', { moduleId: l.moduleId, stepId: l.stepId }) : go('checkout', { choice: l.moduleId }) }}>
      {!open && <Icon.lock width="13" height="13" aria-hidden="true" style={{ verticalAlign: '-1px', marginRight: '.2rem' }} />}{l.label}{!open && <span className="sr-only"> (locked: opens the unlock page)</span>}
    </a>
  )
}
export function WithLessons({ text, onLesson }) {
  if (!/\[\[/.test(text)) return <Md text={text} />
  const out = []
  let last = 0, m, i = 0
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(<Md key={i++} text={text.slice(last, m.index)} />)
    out.push(<LessonLink key={i++} id={m[1]} onOpen={onLesson} />)
    last = m.index + m[0].length
  }
  // A half-streamed token ("[[m5/l3-") stays hidden until it is complete.
  const rest = text.slice(last).replace(/\[\[[^\]]*$/, '')
  if (rest) out.push(<Md key={i++} text={rest} />)
  return out
}

// Coach replies use **bold**, "- " bullets and "1. " steps only, plus lesson tokens.
export function Rich({ text, onLesson }) {
  const blocks = []
  let list = null
  const flush = () => { if (list) { blocks.push(list); list = null } }
  for (const line of String(text).split('\n')) {
    const ol = /^\s*\d+[.)]\s+/.test(line)
    if (ol || /^\s*[-•]\s+/.test(line)) {
      const kind = ol ? 'ol' : 'ul'
      if (list && list.kind !== kind) flush()
      // A numbered list keeps the coach's own numbers, so "Step 6" still matches when a plan is split into phases.
      ;(list ||= { kind, items: [], start: ol ? parseInt(line, 10) || 1 : undefined }).items.push(line.replace(/^\s*(\d+[.)]|[-•])\s+/, ''))
      continue
    }
    flush()
    if (line.trim()) blocks.push({ p: line })
  }
  flush()
  return blocks.map((b, i) => b.items
    ? <b.kind key={i} start={b.start > 1 ? b.start : undefined}>{b.items.map((x, j) => <li key={j}><WithLessons text={x} onLesson={onLesson} /></li>)}</b.kind>
    : <p key={i} className={/^Review:/.test(b.p) ? 'coach-review' : /\[\[/.test(b.p) ? 'coach-pointer' : /^\*\*[^*]+\*\*:?\s*$/.test(b.p.trim()) ? 'coach-label' : ''}><WithLessons text={b.p} onLesson={onLesson} /></p>)
}

export function Unavailable() {
  return <p className="small muted coach-off">HIT Mentor works when the course is opened on claude.ai. In this view it is switched off.</p>
}

export const SUGGESTIONS = [
  'I need to ask my manager for a raise next week.',
  'A key supplier wants to raise prices by 15%.',
  'My business partner and I keep arguing about priorities.',
  'How do I respond to "this is our final offer"?',
]

// ---- Ask the coach (side panel) --------------------------------------------

export function CoachLauncher() {
  const { user, paid, view, modules, progress } = useApp()
  const [open, setOpen] = useState(false)
  const [mini, setMini] = useState(false) // tucked away while the learner reads a lesson; the chat is kept
  const [subscribe, setSubscribe] = useState(false)
  useEffect(() => {
    const h = () => { setSubscribe(false); setMini(false); setOpen(true) }
    const s = () => { setSubscribe(true); setMini(false); setOpen(true) }
    window.addEventListener('open-coach', h)
    window.addEventListener('coach-subscribe', s)
    return () => { window.removeEventListener('open-coach', h); window.removeEventListener('coach-subscribe', s) }
  }, [])
  if (!user || !paid) return null
  // On other screens (e.g. the unlock page a lesson link leads to) the chat stays open behind the scenes.
  const here = ['dashboard', 'module', 'practice'].includes(view.name)
  if (!here && !open) return null
  // Where the learner is, so the coach can include that page.
  let ctx = {}
  if (view.name === 'module' && progress.last?.moduleId && modules[progress.last.moduleId]) {
    const m = modules[progress.last.moduleId]
    const st = flatSteps(m).find((s) => s.id === progress.last.stepId)
    ctx = { moduleId: m.id, stepId: st?.id, where: `Module ${m.number} (${m.title}), page "${st?.title || ''}"` }
  }
  return (
    <>
      {here && (!open || mini) && <button className="coach-fab" onClick={() => { setMini(false); setOpen(true) }} aria-label={mini ? 'Back to your HIT Mentor chat' : 'Ask HIT Mentor'}><span className="coach-dot" aria-hidden="true">AI</span> {mini ? 'Back to HIT Mentor' : 'Ask HIT Mentor'}</button>}
      {open && <CoachPanel ctx={ctx} subscribe={subscribe} hidden={!here || mini} onClose={() => { setMini(false); setOpen(false) }}
        onLesson={(full) => { if (full || window.matchMedia?.('(max-width: 640px)').matches) setMini(true) }} />}
    </>
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
  const { practiceLocked } = useCoachPlan()
  const arenaAccess = useArenaAccess()
  const locked = !arenaAccess || practiceLocked
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
    const past = turns.filter(inPlay)
    const history = [...past, { role: 'user', content: msg, ...(delivery ? { delivery } : {}) }]
    setTurns(history); setBusy(true); setLive('')
    ctl.current = new AbortController()
    try {
      let text, free = false
      if (isLive) {
        const r = await practiceTurn({ scenarioId: sc.id, sessionId: session.current, message: msg, delivery, turns: past, signal: ctl.current.signal, onText: (t) => setLive(t.replace('[END]', '')) })
        session.current = r.sessionId || session.current // also when not saved: the server then scores what the browser sends
        text = r.text; free = r.free
      } else {
        // claude.ai preview: the conversation is built in the browser.
        const transcript = history.filter(inPlay).map((t) => `${t.role === 'user' ? 'LEARNER' : sc.counterpart.name.toUpperCase()}: ${t.content}`).join('\n')
        const input = SPAR_RULES(sc) + `\n\nCONVERSATION SO FAR\n${transcript}\n\nWrite ${sc.counterpart.name}'s next reply only.`
        text = (await sample(input, { cache: false, modelTier: 'quick', purpose: 'practice', signal: ctl.current.signal, onText: ({ text }) => setLive(text.replace('[END]', '')) })).text
      }
      if (text.trimStart().startsWith(SAFETY_TOKEN)) {
        // Stepped out of role for the learner's safety: pause, show help lines, keep both lines out of the role-play.
        voice.stopSpeaking(); setHandsFree(false); hf.current = false
        setTurns((t) => [...t.slice(0, -1), { ...t[t.length - 1], off: true }, { role: 'safety', content: text.trimStart().slice(SAFETY_TOKEN.length).trim() }])
        if (!free) usedOnePractice()
        return
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
        ({ report: r, score: s } = await practiceScore({ sessionId: session.current, scenarioId: sc.id, turns: turns.filter(inPlay) }))
      } else {
        const transcript = turns.filter(inPlay).map((t) => `${t.role === 'user' ? 'LEARNER' : sc.counterpart.name.toUpperCase()}: ${t.content}`).join('\n')
        const excerpts = formatExcerpts(retrieve(kb, sc.query + ' ' + transcript, {}, 12))
        r = await sample.json(FEEDBACK_PROMPT(sc, transcript, excerpts, kb.library), { cache: false, purpose: 'practice' })
        s = { ...computeScore(r?.skills, { turns: turns.filter((t) => inPlay(t) && t.role === 'user').length, level: sc.level, conduct: r?.conduct }), level: sc.level, saved: true, at: new Date().toISOString() }
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

  const learnerTurns = turns ? turns.filter((t) => inPlay(t) && t.role === 'user').length : 0
  const [early, setEarly] = useState(false) // asking: end before the minimum replies?
  const canHandsFree = voice.canListen && voice.canSpeak
  return (
    <div className={'activity spar' + (compact ? ' compact' : '')}>
      <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>Live sparring partner · AI role-play{isLive ? '' : ' (premium prototype)'} · {sc.level}</span>
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
      {!ready ? <p className="small muted">Starting…</p> : !sample ? <Unavailable /> : locked && !report ? (arenaAccess ? <TopUpCard /> : <ArenaUnlockCard compact />) : !turns ? (
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

// Lines that belong to the role-play (not a safety pause or the message that caused it).
const inPlay = (t) => !t.off && t.role !== 'safety'

function SparLine({ t, sc, typing, voice }) {
  if (t.role === 'safety') {
    return (
      <div className="spar-safety" role="alert">
        <strong>Role-play paused</strong>
        <Md text={t.content} />
        <p className="small muted">When you're ready, you can carry on with your next reply or start again.</p>
      </div>
    )
  }
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

// A unique badge for each level: shield in the level's colour with its own emblem.
// Earned badges are in full colour with a green tick; the others are greyed out.
const BADGE_COLORS = ['#5b8def', '#2f5bd3', '#16275e']
function LevelBadge({ level, earned, size = 44, hero = false }) {
  const i = LEVELS.indexOf(level)
  const fill = earned ? BADGE_COLORS[i] : '#a9b1c7'
  return (
    <span className={'level-badge' + (earned ? ' earned' : '') + (hero ? ' hero' : '')} style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" shapeRendering="geometricPrecision">
        <path d="M24 3 L42 9 V23 C42 34 34 41 24 45 C14 41 6 34 6 23 V9 Z" fill={fill} stroke="#f7861b" strokeWidth={earned ? 2 : 0} strokeLinejoin="round" />
        {hero && <path d="M24 6.6 L39 11.6 V23 C39 32.4 32.4 38.3 24 41.8 C15.6 38.3 9 32.4 9 23 V11.6 Z" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth=".8" strokeLinejoin="round" />}
        {i === 0 && <path d="M15 15h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4h-4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" fill="#fff" />}
        {i === 1 && <g fill="none" stroke="#fff" strokeWidth="2.4"><circle cx="24" cy="23" r="9" /><circle cx="24" cy="23" r="4.5" /><circle cx="24" cy="23" r="1" fill="#fff" /></g>}
        {i === 2 && <polygon points="24.0,13.5 26.6,19.9 33.5,20.4 28.2,24.9 29.9,31.6 24.0,27.9 18.1,31.6 19.8,24.9 14.5,20.4 21.4,19.9" fill="#f7861b" />}
      </svg>
      {earned && <span className="level-badge-tick"><Icon.check width="12" height="12" /></span>}
    </span>
  )
}

// Shown in the report when a role-play passes: the badge earned and what it unlocks.
function LevelUp({ level }) {
  const next = LEVELS[LEVELS.indexOf(level) + 1]
  return (
    <div className="level-up">
      <LevelBadge level={level} earned size={52} />
      <div>
        <span className="eyebrow">{level} badge earned</span>
        <h4>You earned the {RANKS[level].title} badge</h4>
        <p className="small">{next ? `The ${next} level is now unlocked.` : 'You have earned every badge: the practice part of your certificate is done.'}</p>
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

// ---- The Arena (dashboard page) --------------------------------------

export function PracticeStudio() {
  const { go, view, practice, course, admin } = useApp()
  const active = view.scenarioId && scenarioById(view.scenarioId)
  const sum = practiceSummary(practice)
  const needCert = (course.certificate.practiceLevels || []).length > 0
  const [buying, setBuying] = useState(false)
  const arenaAccess = useArenaAccess()
  const open = (level) => admin || levelOpen(level, sum.levels)
  const rank = currentRank(sum.levels)
  const nextLevel = LEVELS.find((l) => !sum.levels.has(l))
  if (active && !open(active.level)) {
    const need = LEVELS.find((l) => !sum.levels.has(l))
    return (
      <div className="wrap" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', maxWidth: 920 }}>
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
    <div className="wrap" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', maxWidth: 920 }}>
      <button className="btn btn-sm" onClick={() => (active ? go('practice') : go('dashboard'))} style={{ marginBottom: '1rem' }}>← {active ? 'All scenarios' : 'Dashboard'}</button>
      {active ? <Spar key={active.id} scenarioId={active.id} /> : (
        <div className="stack" style={{ gap: '.9rem' }}>
          <div className="studio-head">
            <div className="stack" style={{ gap: '.6rem' }}>
              <span className="eyebrow">{isLive ? 'Premium · Arena tokens' : 'Premium prototype'}</span>
              <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>The Arena</h1>
              <p className="arena-tagline">Put your skills to the test</p>
            </div>
            <PracticeCounter onBuy={() => setBuying(true)} />
          </div>
          <p className="muted">Negotiate live with AI counterparts who react to whatever you say. Clear three levels to earn your badges{needCert ? ' and unlock your certificate' : ''}.</p>
          {!arenaAccess && <ArenaUnlockCard />}
          {buying && <TopUpCard onClose={() => setBuying(false)} />}

          <div className="quest">
            <div className="quest-rank">
              <LevelBadge level={rank || LEVELS[0]} earned={!!rank} size={84} hero />
              <div className="quest-rank-text">
                <span className="eyebrow">Your latest badge</span>
                <strong>{rank ? RANKS[rank].title : 'No badge yet'}</strong>
                <span className="small">{rank ? RANKS[rank].line : 'Clear the Beginner level to earn your first badge.'}</span>
              </div>
            </div>
            <ol className="quest-path">
              {LEVELS.map((l, i) => {
                const done = sum.levels.has(l)
                const state = done ? 'done' : levelOpen(l, sum.levels) ? 'open' : 'locked'
                return (
                  <li key={l} className={'quest-step ' + state}>
                    <LevelBadge level={l} earned={done} size={42} />
                    <span className="quest-label"><strong>{l}</strong><span className="small quest-name">{RANKS[l].title.split(' ').map((w, j) => <span key={j}>{w}</span>)}</span><span className="small quest-state">{done ? 'Earned' : state === 'open' ? 'Play now' : 'Locked'}</span></span>
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
            <h4 className="rules-title"><span>Rules of the game</span></h4>
            <ul className="small rules-how">
              <li><strong>Clear a level</strong> by passing one of its role-plays: score {PASS_SCORE} points or more out of 100, with no skill rated below {PASS_MIN_SKILL} out of 5. Retry as often as you like.</li>
              <li><strong>Aim for 10 exchanges or more.</strong> A real negotiation needs time to unfold: the other side opens up, pushes back and tests you.</li>
              <li><strong>Arena tokens:</strong> each AI reply uses 1 token, and your feedback report uses 1.</li>
            </ul>
            <details className="full-rules">
              <summary>Do's and don'ts</summary>
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
              <section key={level} className={'level-band band-' + (i + 1) + (cleared ? ' done' : '') + (unlocked ? '' : ' locked')}>
                <div className="level-band-head">
                  <div className="level-band-title">
                    <h3>Level {i + 1} · {level}</h3>
                    <span className="level-tag">{cleared ? <span className="earned-tag">✓ Completed</span> : unlocked ? (level === nextLevel ? 'Your next level' : 'Open') : admin ? <><Icon.lock width="14" height="14" /> Locked for students · you can test it</> : <><Icon.lock width="14" height="14" /> Clear {LEVELS[i - 1]} to unlock</>}</span>
                  </div>
                  <div className="level-band-badge">
                    <div className={'badge-title' + (cleared ? ' earned' : '')}>
                      <span className="badge-title-label">{cleared ? '★ Badge earned' : 'Badge to earn'}</span>
                      <strong>{RANKS[level].title}</strong>
                    </div>
                    <LevelBadge level={level} earned={cleared} size={64} />
                  </div>
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

