// The AI coach window: saved chats, a short profile, quick diagnosis questions with tap answers,
// "Rehearse it now" (the coach plays the other side) and a one-page prep sheet.
import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { isLive, backend } from '../platform/backend.js'
import { COACH_VERSION, DOWN_REASONS } from './feedback.js'
import { readJSON, writeJSON } from '../platform/storage.js'
import { retrieve, formatExcerpts } from './knowledge.js'
import { COACH_RULES, REHEARSE_RULES, REHEARSE_FEEDBACK, PREP_PROMPT } from './prompts.js'
import { lessonList, lessonsAsText } from './lessons.js'
import { movesAsText } from './moves.js'
import { SAFETY_TOKEN } from './safety.js'
import { useVoice } from './voice.js'
import { useCoachPlan, usedOneMessage, CoachPaywall, PlanNote } from './plan.jsx'
import { loadChats, saveChat, deleteChat, loadProfile, saveProfile, newId } from './store.js'
import { useKb, useSample, noteError, errorText, Rich, MovesContext, VoiceToggle, MicButton, PlayButton, Unavailable, SUGGESTIONS } from './Coach.jsx'
import { PrepSheet } from './PrepSheet.jsx'
import { Icon } from '../ui/icons.jsx'

const NO_MOVES = { lines: null, onTry: null }

// ---- Profile ---------------------------------------------------------------

export const PROFILE_FIELDS = [
  { id: 'role', label: 'Your role', hint: 'e.g. team lead, sales manager, founder' },
  { id: 'industry', label: 'Your industry or field', hint: 'e.g. automotive, IT services, healthcare' },
  { id: 'with', label: 'Who you negotiate with most', hint: 'e.g. clients, suppliers, my manager' },
  { id: 'challenge', label: 'What you find hardest', hint: 'e.g. staying calm, giving in under pressure' },
  { id: 'goal', label: 'What you want from HIT Mentor', hint: 'e.g. prepare my salary review, win back a key client' },
  { id: 'note', label: 'Anything else HIT Mentor should know', hint: 'e.g. I work across Germany and India' },
]

// Older profiles stored some answers as lists of tapped options; show and send them as text.
const asText = (x) => (Array.isArray(x) ? x.join(', ') : String(x || ''))

export function profileText(p) {
  if (!p) return ''
  const v = (id) => asText(p[id]).trim()
  return [['Role', 'role'], ['Industry', 'industry'], ['Usually negotiates with', 'with'], ['Finds hardest', 'challenge'], ['Wants from HIT Mentor', 'goal'], ['Also', 'note']]
    .filter(([, id]) => v(id)).map(([l, id]) => `${l}: ${v(id).slice(0, 300)}`).join('. ')
}

function ProfileForm({ profile, onSave, onCancel }) {
  const [vals, setVals] = useState(() => Object.fromEntries(PROFILE_FIELDS.map((f) => [f.id, asText(profile?.[f.id])])))
  const set = (id, x) => setVals((v) => ({ ...v, [id]: x }))
  return (
    <form className="coach-profile" onSubmit={(e) => { e.preventDefault(); onSave({ ...(profile || {}), ...vals, skipped: false, at: new Date().toISOString() }) }}>
      <h4>About you</h4>
      <p className="small muted">A few words on each helps HIT Mentor fit its advice to you. Everything is optional, and you can change it any time.</p>
      {PROFILE_FIELDS.map((f) => (
        <label key={f.id} className="coach-profile-field">
          <span className="coach-profile-label">{f.label} <span className="coach-profile-hint">{f.hint}</span></span>
          <input type="text" value={vals[f.id]} maxLength={200} onChange={(e) => set(f.id, e.target.value)} />
        </label>
      ))}
      <div className="row" style={{ gap: '.5rem' }}>
        <button className="btn btn-primary btn-sm">Save</button>
        <button type="button" className="btn btn-sm" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

// ---- Diagnosis questions ("? Question | answer | answer") ---------------------

export function splitQuestions(text) {
  const qs = []
  const rest = []
  for (const line of String(text).split('\n')) {
    const m = line.match(/^\s*\?\s+(.+)$/)
    if (m) { const [q, ...opts] = m[1].split(/\s+\|\s+/); qs.push({ q: q.trim(), opts: opts.map((o) => o.trim()).filter(Boolean).slice(0, 4) }) }
    else rest.push(line)
  }
  return { qs, text: rest.join('\n').trim() }
}

// Tap answers are shortcuts: one question sends on a tap; with two, pick both (or one) and send.
// "Something else" opens a small box under that question for the learner's own words; an open
// question (no tap answers) shows the box straight away. The chat box below works too.
const OTHER = 'Something else'
function Diagnosis({ qs, active, onSend, onSkip }) {
  const [picks, setPicks] = useState(() => qs.map(() => ''))
  const [typed, setTyped] = useState(() => qs.map(() => ''))
  if (!active) return <ul className="coach-qs-done">{qs.map((x, i) => <li key={i}>{x.q}</li>)}</ul>
  const fit = qs.length === 1 && /fit your situation/i.test(qs[0].q)
  const open = (i) => qs[i].opts.length === 0 || picks[i] === OTHER
  const answer = (i) => (open(i) ? typed[i].trim() : picks[i])
  const send = () => onSend(qs.length === 1 ? answer(0) : qs.map((x, i) => (answer(i) ? `${x.q}\n${answer(i)}` : '')).filter(Boolean).join('\n\n'))
  const tap = (i, o) => {
    if (qs.length === 1 && o !== OTHER) { onSend(o); return }
    setPicks((p) => p.map((v, j) => (j === i ? (v === o ? '' : o) : v)))
  }
  const ready = qs.some((_, i) => answer(i))
  const showSend = qs.length > 1 || open(0)
  return (
    <div className="coach-qs">
      {qs.map((x, i) => (
        <div key={i} className="coach-q">
          <p className="coach-q-text">{x.q}</p>
          {x.opts.length > 0 && <div className="coach-chips">{(fit ? x.opts : [...x.opts, OTHER]).map((o) => (
            <button type="button" key={o} className={'coach-chip' + (o === OTHER ? ' other' : '') + (picks[i] === o ? ' on' : '')} aria-pressed={picks[i] === o} onClick={() => tap(i, o)}>{o === OTHER ? 'Something else…' : o}</button>
          ))}</div>}
          {open(i) && (
            <textarea className="coach-q-own" rows={x.opts.length ? 2 : 3} autoFocus={x.opts.length > 0}
              value={typed[i]} placeholder={x.opts.length ? 'In your own words…' : 'Tell it in your own words. A few sentences is plenty.'}
              onChange={(e) => { const v = e.target.value; setTyped((t) => t.map((w, j) => (j === i ? v : w))) }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && ready) { e.preventDefault(); send() } }} />
          )}
        </div>
      ))}
      <div className="coach-qs-foot">
        {showSend && <button type="button" className="btn btn-primary btn-sm" disabled={!ready} onClick={send}>Send</button>}
        {!showSend && <span className="small muted">Tap an answer, or type in your own words below.</span>}
        {!fit && <button type="button" className="linklike small" onClick={onSkip}>Skip the questions</button>}
      </div>
    </div>
  )
}

// Thumbs under a plan. A rating sends the conversation once for an anonymous analysis (see
// src/coach/feedback.js); only that analysis is kept, never the chat.
function Rate({ rated, onRate }) {
  const [asking, setAsking] = useState(false)
  if (rated) return <p className="coach-rate small muted">{rated === 'up' ? 'Thanks! Glad it helped.' : 'Thanks, this helps us improve HIT Mentor.'}</p>
  if (asking) return (
    <div className="coach-rate">
      <span className="small muted">What was off? (optional)</span>
      <div className="coach-chips">{DOWN_REASONS.map((r) => <button key={r} type="button" className="coach-chip" onClick={() => onRate('down', r)}>{r}</button>)}</div>
      <button type="button" className="linklike small" onClick={() => onRate('down', null)}>Just send</button>
    </div>
  )
  return (
    <div className="coach-rate">
      <span className="small muted">Was this plan helpful?</span>
      <button type="button" className="coach-thumb" aria-label="Helpful" title="Helpful" onClick={() => onRate('up', null)}><Icon.thumbUp /></button>
      <button type="button" className="coach-thumb" aria-label="Not helpful" title="Not helpful" onClick={() => setAsking(true)}><Icon.thumbDown /></button>
    </div>
  )
}

// Under a finished plan: one button that opens what the learner can do next.
function NextStep({ busy, hasPrep, prepOld, onRehearse, onPrep, onAsk }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const pick = (fn) => { setOpen(false); fn() }
  // Bring the opened list into view inside the chat.
  useEffect(() => {
    const el = box.current, body = el?.closest('.coach-body')
    if (!open || !body) return
    const over = el.getBoundingClientRect().bottom - body.getBoundingClientRect().bottom + 12
    if (over > 0) body.scrollBy({ top: over, behavior: 'smooth' })
  }, [open])
  return (
    <div className="coach-next" ref={box}>
      <button type="button" className="btn btn-primary btn-sm coach-next-btn" aria-expanded={open} disabled={!!busy} onClick={() => setOpen((o) => !o)}>
        {busy === 'prep' ? 'Making your prep sheet…' : 'Next step'} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <ul className="coach-next-menu">
          <li><button type="button" onClick={() => pick(onRehearse)}><strong>Rehearse it now</strong><span>HIT Mentor plays the other side, then gives you a debrief.</span></button></li>
          <li><button type="button" onClick={() => pick(onPrep)}><strong>{prepOld ? 'Update my prep sheet' : hasPrep ? 'Open my prep sheet' : 'Make my prep sheet'}</strong><span>{prepOld ? 'Your plan changed since the last sheet. This makes a new one.' : 'A one-page plan to take into the meeting.'}</span></button></li>
          <li><button type="button" onClick={() => pick(onAsk)}><strong>Ask something else</strong><span>Follow up on this plan or add a detail.</span></button></li>
        </ul>
      )}
    </div>
  )
}

// ---- Helpers -----------------------------------------------------------------

const say = (m) => m.role === 'user' || m.role === 'assistant' // what the model sees
// The coach ends each reply with its hidden case file (<case>{…}</case>). It is never shown.
export const stripCase = (t) => String(t).replace(/<case>[\s\S]*?(<\/case>|$)/g, '').replace(/<c(a(s(e)?)?)?$/, '').trim()
export function caseOf(t) {
  const m = String(t).match(/<case>([\s\S]*?)<\/case>/)
  if (!m) return null
  try { return JSON.parse(m[1]) } catch { return null }
}
// For the model: only the latest case file is kept, older ones are dropped to save tokens.
function forModel(messages) {
  const list = messages.filter(say)
  const last = list.map((m) => m.role).lastIndexOf('assistant')
  return list.map((m, i) => (m.role === 'assistant' && i !== last ? { role: m.role, content: stripCase(m.content) } : { role: m.role, content: m.content }))
}
const isPlan = (text) => /\*\*What to say\*\*/i.test(text)
const titleOf = (q) => { const t = q.replace(/\s+/g, ' ').trim(); return t.length > 60 ? t.slice(0, 57).trim() + '…' : t }
const when = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

function chatText(chat) {
  return chat.messages.filter(say).map((m) => `${m.role === 'user' ? 'LEARNER' : 'COACH'}: ${movesAsText(stripCase(m.content))}`).join('\n\n').slice(-14000)
}
function rehearsalText(chat) {
  return chat.messages.filter(say).map((m) => `${m.role === 'user' ? 'LEARNER' : 'OTHER SIDE'}: ${m.content}`).join('\n').slice(-12000)
}
// What the coach may remember from other chats: the situation and, if made, the prep sheet's goal.
function historyText(chats, currentId) {
  return chats.filter((c) => c.id !== currentId && c.kind !== 'rehearsal' && c.messages.some((m) => m.role === 'user')).slice(0, 5).map((c) => {
    const first = c.messages.find((m) => m.role === 'user')?.content.replace(/\s+/g, ' ').slice(0, 260) || ''
    const rehearsed = chats.some((r) => r.parentId === c.id)
    return `- ${when(c.updatedAt)}: "${first}"${c.prep?.goal ? ` Goal: ${c.prep.goal}.` : ''}${rehearsed ? ' They rehearsed it with you.' : ''}`
  }).join('\n')
}

const FULL_KEY = 'hit.coach.full'

// ---- The panel -----------------------------------------------------------------

export function CoachPanel({ ctx, subscribe, hidden, onClose, onLesson }) {
  const kb = useKb()
  const { user, modules, owned } = useApp()
  const { ready, sample } = useSample()
  const { locked, plan } = useCoachPlan()
  const showPaywall = locked || (subscribe && plan && (!plan.subscribed || plan.included) && !plan.preview)
  const [chats, setChats] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [fresh, setFresh] = useState(() => blank()) // a new chat, saved once it has a message
  const [profile, setProfile] = useState(null)
  const [screen, setScreen] = useState('chat') // chat | list | profile | prep
  const [full, setFull] = useState(() => !!readJSON(FULL_KEY, false))
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState('') // '' | 'reply' | 'prep' | 'debrief'
  const [live, setLive] = useState('')
  const [err, setErr] = useState('')
  const [confirmDel, setConfirmDel] = useState(null)
  const ctl = useRef(null)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const lastUser = useRef(null)
  const scrollMode = useRef('end') // after a send: bring the learner's message to the top; after opening a chat: the end
  const [scrollTick, setScrollTick] = useState(0)
  const userScrolled = useRef(false) // the learner scrolled the chat after sending: leave the view where they put it
  const voice = useVoice()
  const voiceOn = useRef(false); voiceOn.current = voice.voiceOn
  const chatsRef = useRef(chats); chatsRef.current = chats

  function blank(extra = {}) { const now = new Date().toISOString(); return { id: newId(), title: '', kind: 'coach', messages: [], prep: null, createdAt: now, updatedAt: now, ...extra } }

  useEffect(() => {
    if (!user) return
    let on = true
    Promise.all([loadChats(user.id), loadProfile(user.id)]).then(([list, p]) => {
      if (!on) return
      setChats(list); setProfile(p)
      if (list[0]) setActiveId(list[0].id)
      setLoaded(true); setScrollTick((n) => n + 1)
    })
    return () => { on = false; ctl.current?.abort() }
  }, [user?.id])

  const chat = chats.find((c) => c.id === activeId) || fresh
  const parent = chat.kind === 'rehearsal' ? chats.find((c) => c.id === chat.parentId) : null

  // Scrolling: never follow the reply as it streams, so the learner can read from the top.
  useEffect(() => {
    const body = bodyRef.current; if (!body) return
    if (screen !== 'chat') { body.scrollTop = 0; return }
    // Scroll only the chat itself (scrollIntoView would also shift the panel and hide its header).
    if (scrollMode.current === 'start' && lastUser.current) body.scrollTo({ top: lastUser.current.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 12, behavior: 'smooth' })
    else body.scrollTop = body.scrollHeight
  }, [scrollTick, activeId, screen])

  // Notice when the learner scrolls the chat themselves (wheel, touch, keys or the scrollbar).
  useEffect(() => {
    const body = bodyRef.current; if (!body) return
    const mark = () => { userScrolled.current = true }
    const evs = ['wheel', 'touchstart', 'keydown', 'mousedown']
    evs.forEach((e) => body.addEventListener(e, mark, { passive: true }))
    return () => evs.forEach((e) => body.removeEventListener(e, mark))
  }, [])

  // While the chat covers the page (full screen, or any phone), the page behind it must not scroll: one scrollbar only.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('coach-open', !hidden)
    root.classList.toggle('coach-open-full', !hidden && full)
    return () => root.classList.remove('coach-open', 'coach-open-full')
  }, [hidden, full])

  function store(next) {
    next = { ...next, updatedAt: new Date().toISOString() }
    setChats((list) => [next, ...list.filter((c) => c.id !== next.id)])
    if (activeId !== next.id) setActiveId(next.id)
    if (user) saveChat(user.id, next).catch(() => {})
    return next
  }

  function rate(i, rating, reason) {
    const cur = chat
    const messages = cur.messages.map((m, j) => (j === i ? { ...m, rated: rating } : m))
    store({ ...cur, messages })
    const upTo = cur.messages.slice(0, i + 1).filter(say).map((m) => ({ role: m.role, content: m.content }))
    backend.coachFeedback?.({ rating, reason, version: COACH_VERSION, messages: upTo }).catch(() => {})
  }

  function openChat(id) { setActiveId(id); setScreen('chat'); setErr(''); scrollMode.current = 'end'; setScrollTick((n) => n + 1) }
  // "Try it with HIT Mentor" on a move card: start the learner's attempt in the input box.
  function tryMove(name) { setDraft(`Let me try ${name}: `); setTimeout(() => { const el = inputRef.current; if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length) } }, 0) }
  function newChat() { ctl.current?.abort(); setFresh(blank()); setActiveId(null); setScreen('chat'); setErr(''); setDraft('') }
  async function removeChat(id) {
    setConfirmDel(null)
    setChats((list) => list.filter((c) => c.id !== id))
    if (activeId === id) setActiveId(null)
    if (user) await deleteChat(user.id, id).catch(() => {})
  }
  function toggleFull() { setFull((f) => { writeJSON(FULL_KEY, !f); return !f }) }

  // One model call. Returns the text, or null when it failed (the error is shown).
  async function call(input, { onText } = {}) {
    ctl.current = new AbortController()
    try {
      const { text, safety } = await sample(input, { cache: false, signal: ctl.current.signal, onText })
      if (!safety) usedOneMessage() // the safety reply with help lines is free
      return text
    } catch (e) {
      noteError(e)
      if (e?.code !== 'cancelled') setErr(errorText(e))
      return e?.text ? e.text + ' …' : null
    }
  }

  // A coach message (or a rehearsal turn, in a rehearsal chat).
  async function ask(q) {
    q = q.trim()
    if (!q || busy || !sample) return
    setErr(''); setDraft('')
    const base = chat
    const mine = { role: 'user', content: q, at: new Date().toISOString() }
    let cur = store({ ...base, title: base.title || titleOf(q), messages: [...base.messages, mine] })
    scrollMode.current = 'start'; userScrolled.current = false; setScrollTick((n) => n + 1)
    setBusy('reply'); setLive('')
    let input
    if (cur.kind === 'rehearsal') {
      const p = chatsRef.current.find((c) => c.id === cur.parentId)
      input = [{ role: 'user', content: REHEARSE_RULES(p ? chatText(p) : '', profileText(profile)) }, ...cur.messages.filter(say).slice(-30)]
    } else {
      // Search with the learner's recent messages together, so follow-ups keep their topic.
      const prevQ = base.messages.filter((t) => t.role === 'user').slice(-3).map((t) => t.content).join(' ')
      const found = retrieve(kb, q + ' ' + q + ' ' + prevQ, ctx)
      const rules = COACH_RULES({ where: ctx.where, library: kb.library, lessons: lessonList(modules, owned), excerpts: formatExcerpts(found), profile: profileText(profile), history: historyText(chatsRef.current, cur.id) })
      input = [{ role: 'user', content: rules }, ...forModel(cur.messages).slice(-16)]
    }
    const text = await call(input, { onText: ({ text }) => setLive(text.replace('[END]', '')) })
    if (text) {
      if (cur.kind === 'rehearsal' && text.trimStart().startsWith(SAFETY_TOKEN)) {
        cur = store({ ...cur, ended: true, messages: [...cur.messages, { role: 'safety', content: text.trimStart().slice(SAFETY_TOKEN.length).trim() }] })
      } else {
        const ended = cur.kind === 'rehearsal' && text.includes('[END]')
        const reply = text.replace('[END]', '').trim()
        cur = store({ ...cur, ...(ended ? { ended: true } : {}), messages: [...cur.messages, { role: 'assistant', content: reply, at: new Date().toISOString() }] })
        if (voiceOn.current) voice.speak(lessonsAsText(stripCase(splitQuestions(reply).text), modules))
        if (cur.kind !== 'rehearsal') learn(caseOf(reply)?.learned)
      }
      // The reply is complete: show it from its start (with the learner's message just above it),
      // unless the learner already scrolled while it was being written: pulling them back would make the chat jump.
      if (!userScrolled.current) { scrollMode.current = 'start'; setScrollTick((n) => n + 1) }
    }
    setBusy(''); setLive('')
  }

  // "Rehearse it now": a new chat in which the coach plays the other side.
  async function rehearse(from) {
    if (busy || !sample) return
    setErr('')
    const r = store(blank({ kind: 'rehearsal', parentId: from.id, title: from.title || 'My conversation' }))
    setScreen('chat'); scrollMode.current = 'end'
    setBusy('reply'); setLive('')
    const text = await call([{ role: 'user', content: REHEARSE_RULES(chatText(from), profileText(profile)) }], { onText: ({ text }) => setLive(text) })
    if (text) store({ ...r, messages: [{ role: 'assistant', content: text.replace('[END]', '').trim(), at: new Date().toISOString() }] })
    setBusy(''); setLive('')
  }

  async function debrief() {
    if (busy || !parent) return
    setErr(''); setBusy('debrief')
    const excerpts = formatExcerpts(retrieve(kb, rehearsalText(chat), {}, 6))
    const text = await call(REHEARSE_FEEDBACK(chatText(parent), rehearsalText(chat), excerpts))
    if (text) store({ ...chat, ended: true, messages: [...chat.messages, { role: 'debrief', content: text.trim(), at: new Date().toISOString() }] })
    scrollMode.current = 'end'; setScrollTick((n) => n + 1)
    setBusy('')
  }

  async function makePrep(from) {
    if (busy || !sample) return
    setErr(''); setBusy('prep')
    ctl.current = new AbortController()
    try {
      const sheet = await sample.json(PREP_PROMPT(chatText(from), profileText(profile)), { cache: false, signal: ctl.current.signal })
      usedOneMessage()
      store({ ...from, prep: { ...sheet, at: new Date().toISOString(), upTo: from.messages.length } })
      setActiveId(from.id); setScreen('prep')
    } catch (e) {
      noteError(e)
      if (e?.code !== 'cancelled') setErr(e?.code === 'invalid_json' ? 'The prep sheet could not be made this time. Please try again.' : errorText(e))
    }
    setBusy('')
  }

  // What the learner told the coach about themselves fills empty profile answers (never overwrites theirs).
  function learn(l) {
    if (!l || !user) return
    const next = { ...(profile || {}) }
    let changed = false
    for (const k of ['role', 'industry', 'with']) {
      const v = String(l[k] || '').trim().slice(0, 120)
      const cur = Array.isArray(next[k]) ? next[k].join(', ') : String(next[k] || '').trim()
      if (v && !cur) { next[k] = v; changed = true }
    }
    if (!changed) return
    next.learnedAt = new Date().toISOString()
    setProfile(next)
    saveProfile(user.id, next).catch(() => {})
  }

  async function keepProfile(p) {
    setProfile(p); setScreen('chat')
    if (user) await saveProfile(user.id, p).catch(() => {})
  }

  const msgs = chat.messages
  const lastAssistant = msgs.map((m) => m.role).lastIndexOf('assistant')
  const lastPlan = chat.kind === 'coach' ? msgs.map((m, i) => (m.role === 'assistant' && isPlan(m.content) ? i : -1)).filter((i) => i >= 0).at(-1) : -1
  // A prep sheet made before the latest plan is out of date (sheets from before this check count as current).
  const prepOld = !!chat.prep?.upTo && lastPlan >= chat.prep.upTo
  const lastUserIdx = msgs.map((m) => m.role).lastIndexOf('user')
  const rehearsing = chat.kind === 'rehearsal'
  const learnerTurns = msgs.filter((m) => m.role === 'user').length
  const hasDebrief = msgs.some((m) => m.role === 'debrief' || m.role === 'safety')
  const coachChats = useMemo(() => chats.filter((c) => c.messages.length > 0), [chats])

  const list = (
    <nav className="coach-list" aria-label="Your HIT Mentor chats">
      <button type="button" className="btn btn-primary btn-sm coach-new" onClick={newChat}>+ New chat</button>
      {!loaded ? <p className="small muted">Loading your chats…</p> : coachChats.length === 0 ? <p className="small muted">Your chats are saved here, so you can come back to them any time.</p> : (
        <ul>
          {coachChats.map((c) => (
            <li key={c.id} className={c.id === chat.id ? 'on' : ''}>
              {confirmDel === c.id ? (
                <div className="coach-del">
                  <span className="small">Delete this chat for good?</span>
                  <button type="button" className="btn btn-sm" onClick={() => removeChat(c.id)}>Delete</button>
                  <button type="button" className="btn btn-sm" onClick={() => setConfirmDel(null)}>Keep</button>
                </div>
              ) : (
                <>
                  <button type="button" className="coach-list-item" onClick={() => openChat(c.id)}>
                    <span className="coach-list-title">{c.kind === 'rehearsal' && <span className="coach-tag">Rehearsal</span>}{c.title || 'New chat'}</span>
                    <span className="coach-list-date">{when(c.updatedAt)}{c.prep ? ' · prep sheet' : ''}</span>
                  </button>
                  <button type="button" className="coach-list-del" aria-label={`Delete "${c.title || 'chat'}"`} onClick={() => setConfirmDel(c.id)}>×</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  )

  const body = !ready ? <p className="small muted">Starting HIT Mentor…</p> : !sample ? <Unavailable /> : showPaywall ? <CoachPaywall compact />
    : screen === 'profile' ? <ProfileForm profile={profile} onSave={keepProfile} onCancel={() => setScreen('chat')} />
    : screen === 'prep' && chat.prep ? <PrepSheet sheet={chat.prep} user={user} onBack={() => setScreen('chat')} onRehearse={() => rehearse(chat)} />
    : screen === 'list' ? list
    : (
      <>
        {msgs.length === 0 && !rehearsing && (
          <div className="coach-intro">
            <p>Tell me about a negotiation or a conflict you're facing, in your own words. What happened, who's involved, and what you'd like to come out of it: the more you share, the better your plan fits. I'll ask a few quick questions first, then you get a game plan, the exact words to say, and how to answer their pushback.</p>
            {ctx.where && <p className="small muted">I can see you're on {ctx.where}.</p>}
            <div className="coach-sugs">{SUGGESTIONS.map((s) => <button key={s} className="coach-sug" onClick={() => ask(s)}>{s}</button>)}</div>
          </div>
        )}
        {rehearsing && (
          <div className="coach-rehearse-note small">
            <strong>Rehearsal.</strong> HIT Mentor now plays the other side of your situation. Answer as you would in the real conversation. Each reply uses one HIT Mentor message.
            {parent && <> <button type="button" className="linklike" onClick={() => openChat(parent.id)}>Back to the HIT Mentor chat</button></>}
          </div>
        )}
        {msgs.map((t, i) => {
          if (t.role === 'user') return <div key={i} ref={i === lastUserIdx ? lastUser : null} className="coach-msg user"><p>{t.content}</p></div>
          if (t.role === 'safety') return <div key={i} className="coach-msg assistant safety"><Rich text={t.content} /></div>
          if (t.role === 'debrief') return <div key={i} className="coach-msg assistant debrief"><span className="eyebrow">Your debrief</span><Rich text={t.content} /></div>
          const { qs, text } = rehearsing ? { qs: [], text: t.content } : splitQuestions(stripCase(t.content))
          return (
            <div key={i} className={'coach-msg assistant' + (rehearsing ? ' counterpart' : '')}>
              {text && (
                <MovesContext.Provider value={rehearsing ? NO_MOVES : { lines: caseOf(t.content)?.moves || null, onTry: tryMove }}>
                  <Rich text={text} onLesson={() => onLesson?.(full)} />
                </MovesContext.Provider>
              )}
              {qs.length > 0 && <Diagnosis qs={qs} active={i === lastAssistant && i === msgs.length - 1 && !busy} onSend={ask} onSkip={() => ask('Please skip the questions and give me your advice with what you know so far, and tell me what you assumed.')} />}
              <PlayButton voice={voice} text={lessonsAsText(text, modules)} />
              {i === lastPlan && <Rate rated={t.rated} onRate={(r, why) => rate(i, r, why)} />}
              {i === lastPlan && (
                <NextStep busy={busy} hasPrep={!!chat.prep} prepOld={prepOld} onRehearse={() => rehearse(chat)} onPrep={() => (chat.prep && !prepOld ? setScreen('prep') : makePrep(chat))} onAsk={() => inputRef.current?.focus()} />
              )}
            </div>
          )
        })}
        {busy === 'reply' && <div className={'coach-msg assistant' + (rehearsing ? ' counterpart' : '')}>{live ? <Rich text={rehearsing ? live : splitQuestions(stripCase(live)).text} /> : <p className="muted coach-thinking">{rehearsing && !msgs.length ? 'Setting the scene…' : 'Thinking…'}</p>}</div>}
        {busy === 'debrief' && <div className="coach-msg assistant"><p className="muted coach-thinking">Writing your debrief…</p></div>}
        {rehearsing && !busy && learnerTurns > 0 && !hasDebrief && (
          <div className="coach-actions">
            {chat.ended && <p className="small muted">The conversation has ended.</p>}
            <button type="button" className="btn btn-primary btn-sm" onClick={debrief}>{chat.ended ? 'Get my debrief' : 'End and get my debrief'}</button>
          </div>
        )}
        {rehearsing && hasDebrief && parent && (
          <div className="coach-actions">
            <button type="button" className="btn btn-primary btn-sm" disabled={!!busy} onClick={() => rehearse(parent)}>Rehearse again</button>
            <button type="button" className="btn btn-sm" onClick={() => openChat(parent.id)}>Back to the HIT Mentor chat</button>
          </div>
        )}
        {err && <p className="small coach-err" role="alert">{err}</p>}
        {voice.micNote && <p className="small muted">{voice.micNote}</p>}
      </>
    )

  const canType = sample && !showPaywall && screen === 'chat' && !(rehearsing && (chat.ended || hasDebrief))
  return (
    <aside className={'coach-panel fade-in' + (full ? ' full' : '')} aria-label="HIT Mentor" hidden={hidden}>
      <header className="coach-head">
        <div className="coach-title-row">
          <div>
            <span className="eyebrow">{isLive ? 'Premium' : 'Premium · prototype'}</span>
            <h3>HIT Mentor</h3>
          </div>
          <button className="btn btn-sm" onClick={() => { voice.stopSpeaking(); onClose() }} aria-label="Close HIT Mentor">Close</button>
        </div>
        <div className="coach-tools">
          {sample && !showPaywall && <>
            <button type="button" className={'btn btn-sm coach-chats-btn' + (screen === 'list' ? ' on' : '')} onClick={() => setScreen(screen === 'list' ? 'chat' : 'list')}>Chats</button>
            <button type="button" className="btn btn-sm coach-new-btn" onClick={newChat} aria-label="New chat">+ New</button>
            <button type="button" className={'btn btn-sm' + (screen === 'profile' ? ' on' : '')} onClick={() => setScreen(screen === 'profile' ? 'chat' : 'profile')} aria-label="About you (HIT Mentor profile)">About you</button>
          </>}
          {sample && <VoiceToggle voice={voice} />}
          <button type="button" className="btn btn-sm coach-full-btn" onClick={toggleFull} aria-pressed={full} aria-label={full ? 'Exit full screen' : 'Full screen'} title={full ? 'Exit full screen' : 'Full screen'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{full ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}</svg>
          </button>
        </div>
      </header>
      <div className="coach-wrap">
        {full && sample && !showPaywall && <div className="coach-side">{list}</div>}
        <div className="coach-main">
          <div className="coach-body" ref={bodyRef}>{body}</div>
          {sample && !showPaywall && <PlanNote />}
          {canType && (
            <form className="coach-input" onSubmit={(e) => { e.preventDefault(); ask(draft) }}>
              <textarea ref={inputRef} rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={voice.listening ? 'Listening… speak now' : rehearsing ? 'Your reply to the other side…' : 'Ask about a negotiation or a conflict…'}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(draft) } }} aria-label={rehearsing ? 'Your reply' : 'Your question'} />
              <MicButton voice={voice} disabled={!!busy} onText={setDraft} onFinal={(t) => { voice.setVoiceOn(true); voiceOn.current = true; ask(t) }} />
              {busy ? <button type="button" className="btn btn-sm" onClick={() => ctl.current?.abort()}>Stop</button>
                : <button className="btn btn-primary btn-sm" disabled={!draft.trim()}>Send</button>}
            </form>
          )}
          <p className="coach-fine">HIT Mentor is based on the course modules. Your chats are saved to your account; delete any of them under Chats. Educational guidance, not legal, financial or psychological advice.</p>
        </div>
      </div>
    </aside>
  )
}
