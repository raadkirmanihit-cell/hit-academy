// The student's AI plan, in two separate allowances that are never mixed:
// - coach messages: the free taster, included months, or the €21/month subscription (coach only);
// - Arena tokens: free starter, course pack and extra packs, each valid 12 months (Arena only).
// One shared copy for the whole page, so the coach panel, the Arena and the dashboard agree.
import { useEffect, useState } from 'react'
import { backend, isLive } from '../platform/backend.js'
import { TermsLink } from '../ui/Terms.jsx'
import { LEGAL } from '../content/terms.js'
import { TOPUP_PRICE, TOPUP_MESSAGES, ARENA_PRICE, ARENA_TOKENS, hasArena, offers } from '../content/pricing.js'
import { useApp } from '../App.jsx'

export const COACH_PRICE = '21' // € per month, shown on the page (Stripe holds the real price)
export const COACH_MONTHLY = 300 // messages a month (fair use), must match COACH_MONTHLY_LIMIT on the server

let state = { loading: true, plan: null }
const listeners = new Set()
const set = (s) => { state = { ...state, ...s }; listeners.forEach((l) => l(state)) }
let inflight = null

export function refreshCoachPlan() {
  inflight ||= backend.coachPlan()
    .then((plan) => set({ loading: false, plan }), () => set({ loading: false }))
    .finally(() => { inflight = null })
  return inflight
}

// After each coach reply, count one message down without asking the server again.
export function usedOneMessage() {
  if (state.plan && Number.isFinite(state.plan.left)) set({ plan: { ...state.plan, left: Math.max(0, state.plan.left - 1), used: (state.plan.used || 0) + 1 } })
}
// The same for an Arena role-play message: one Arena token.
export function usedOnePractice() {
  const p = state.plan
  if (!p || !Number.isFinite(p.arenaLeft)) return
  set({ plan: { ...p, arenaLeft: Math.max(0, p.arenaLeft - 1), arenaUsed: (p.arenaUsed || 0) + 1 } })
}
export function coachLocked() {
  if (state.plan) set({ plan: { ...state.plan, left: 0 } })
}
export function arenaLocked() {
  if (state.plan) set({ plan: { ...state.plan, arenaLeft: 0 } })
}

export function useCoachPlan() {
  const [s, setS] = useState(state)
  useEffect(() => {
    listeners.add(setS)
    if (!state.plan && !inflight) refreshCoachPlan()
    return () => listeners.delete(setS)
  }, [])
  const plan = s.plan
  return {
    loading: s.loading && !plan,
    plan,
    // Live site without a subscription and no free messages left: show the subscribe card.
    locked: isLive && !!plan && !plan.subscribed && plan.left <= 0,
    // The Arena runs on Arena tokens only.
    practiceLocked: isLive && !!plan && !(plan.arenaLeft > 0),
    refresh: refreshCoachPlan,
  }
}

export const day = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// A one-line note under the coach (free messages left, or the monthly allowance),
// or under an Arena role-play (Arena tokens left).
export function PlanNote({ practice }) {
  const { plan } = useCoachPlan()
  if (!isLive || !plan || plan.preview) return null
  if (practice) return <p className="coach-plan-note small">{arenaNote(plan)}</p>
  if (!plan.subscribed) return <p className="coach-plan-note small">{plan.left > 0 ? `${plan.left} free HIT Mentor message${plan.left === 1 ? '' : 's'} left.` : 'Your free HIT Mentor messages are used up.'} <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event('coach-subscribe'))}>Subscribe for €{COACH_PRICE}/month</button></p>
  if (plan.included && plan.left > 30) return null
  if (plan.left <= 30) return <p className="coach-plan-note small">{plan.left} of this month's {plan.limit} HIT Mentor messages left.</p>
  return null
}

// The subscribe card: price, what's included, the withdrawal notice and the Stripe button.
export function CoachPaywall({ compact }) {
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const { plan } = useCoachPlan()
  const usedUp = plan && !plan.subscribed && plan.left <= 0
  const included = plan?.included && plan.subscribed // still in the HIT Mentor months that came with the course
  return (
    <div className={'coach-paywall' + (compact ? ' compact' : '')}>
      <span className="eyebrow">HIT Mentor subscription</span>
      <h4>{included ? 'Keep HIT Mentor after your included months' : usedUp ? 'Keep going with HIT Mentor' : 'Unlock HIT Mentor'}</h4>
      {usedUp && <p className="small muted">{plan.included ? 'Your included HIT Mentor months have ended.' : 'You\'ve used your free HIT Mentor messages.'}</p>}
      {included && <p className="small muted">HIT Mentor is included until {day(plan.periodEnd)}. If you subscribe now, the first payment is taken on that day, not before.</p>}
      <p className="coach-price"><strong className="tnum">€{COACH_PRICE}</strong> <span className="muted">per month · cancel any time</span></p>
      <ul className="small">
        <li>Ask about any negotiation or conflict you're facing</li>
        <li>Talk through your real situations before they happen</li>
        <li>Up to {COACH_MONTHLY} HIT Mentor messages a month (fair use)</li>
        <li>For HIT Mentor only: role-plays in the Arena use Arena tokens</li>
      </ul>
      {LEGAL.smallBusiness && <p className="small muted">No VAT is charged: small business under § 19 UStG.</p>}
      <label className="waiver">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I want HIT Mentor to start right away, before the 14-day withdrawal period ends. If I withdraw within those 14 days, I pay only for the days I had HIT Mentor.</span>
      </label>
      <p className="small muted">The subscription renews every month until you cancel. Subject to our <TermsLink />, sections 5 and 10.</p>
      {err && <p className="error" role="alert">{err}</p>}
      <button className="btn btn-primary" disabled={busy || !consent} onClick={async () => {
        setBusy(true); setErr('')
        try { await backend.subscribeCoach({ consent }); await refreshCoachPlan(); setBusy(false) } catch (x) { setErr(x.message); setBusy(false) }
      }}>{busy ? 'Opening secure payment…' : `Subscribe for €${COACH_PRICE}/month`}</button>
    </div>
  )
}

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`

// "128 Arena tokens left · 20 run out on 5 November 2027"
export function arenaNote(plan) {
  if (!(plan.arenaLeft > 0)) return 'You have no Arena tokens left.'
  const soon = plan.arenaExpires && plan.arenaExpiresLeft < plan.arenaLeft
  return `${plural(plan.arenaLeft, 'Arena token')} left · ${soon ? `${plan.arenaExpiresLeft} run out` : 'valid until'} ${plan.arenaExpires ? (soon ? 'on ' : '') + day(plan.arenaExpires) : ''}`.trim()
}

function Meter({ left, total, tone }) {
  const pct = total > 0 ? Math.max(0, Math.min(100, Math.round((left / total) * 100))) : 0
  return <div className={'bar tile-bar' + (tone ? ' ' + tone : '')} aria-hidden="true"><span style={{ width: pct + '%' }} /></div>
}

// Dashboard tile: the AI coach, its messages, and the buttons to subscribe or cancel.
export function CoachTile() {
  const { plan } = useCoachPlan()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const live = isLive && plan && !plan.preview
  const portal = async () => { setBusy(true); setErr(''); try { await backend.coachPortal() } catch (x) { setErr(x.message); setBusy(false) } }
  const subscribe = () => window.dispatchEvent(new Event('coach-subscribe'))
  const ask = () => window.dispatchEvent(new Event('open-coach'))
  let status = null, note = null, actions
  if (!live) {
    note = 'Talk through any negotiation or conflict and get advice based on the course.'
    actions = <button className="btn btn-primary btn-sm" onClick={ask}>Ask HIT Mentor</button>
  } else if (plan.subscribed && plan.included) {
    status = `${plan.left} of ${plan.limit} messages this month`
    note = `Included with your course until ${day(plan.periodEnd)}. Nothing is charged automatically.`
    actions = <><button className="btn btn-primary btn-sm" onClick={ask}>Ask HIT Mentor</button><button className="btn btn-sm" onClick={subscribe}>Continue after {day(plan.periodEnd).replace(/ \d{4}$/, '')}</button></>
  } else if (plan.subscribed) {
    status = `${plan.left} of ${plan.limit} messages this month`
    note = plan.cancelAtPeriodEnd
      ? `Cancelled: HIT Mentor stays on until ${day(plan.periodEnd)}. You won't be charged again.`
      : plan.status === 'past_due'
        ? 'Your last monthly payment didn\'t go through. Please update your card to keep HIT Mentor.'
        : `€${COACH_PRICE}/month · renews on ${plan.periodEnd ? day(plan.periodEnd) : 'your next billing date'}.`
    actions = <>
      <button className="btn btn-primary btn-sm" onClick={ask}>Ask HIT Mentor</button>
      {plan.status === 'past_due' && <button className="btn btn-sm" disabled={busy} onClick={portal}>Update card</button>}
      {/* The cancel button the law asks for (§ 312k BGB): it opens Stripe's page, where one more click cancels. */}
      <button className="btn btn-sm" disabled={busy} onClick={portal}>{busy ? 'Opening…' : plan.cancelAtPeriodEnd ? 'Restart or manage' : 'Cancel subscription'}</button>
    </>
  } else {
    status = plan.left > 0 ? `${plural(plan.left, 'free message')} left` : plan.included ? 'Included months ended' : 'Free messages used up'
    note = `Subscribe for €${COACH_PRICE} a month for up to ${COACH_MONTHLY} HIT Mentor messages. Cancel any time.`
    actions = <>
      {plan.left > 0 && <button className="btn btn-sm" onClick={ask}>Ask HIT Mentor</button>}
      <button className="btn btn-primary btn-sm" onClick={subscribe}>€{COACH_PRICE}/month</button>
      {plan.hasCustomer && <button className="btn btn-sm btn-ghost" disabled={busy} onClick={portal}>Past invoices</button>}
    </>
  }
  return (
    <div className="card premium-tile tile-coach">
      <div className="tile-top"><span className="coach-dot lg" aria-hidden="true">AI</span><span className="eyebrow">{isLive ? 'Premium · monthly' : 'Premium · prototype'}</span></div>
      <h4>HIT Mentor</h4>
      <p className="small muted">Your personal AI mentor for real situations at work. Everything it teaches comes from the course.</p>
      <div className="tile-meter">
        {status && <strong>{status}</strong>}
        {live && <Meter left={plan.left} total={plan.limit} />}
        {note && <span className="small muted">{note}</span>}
      </div>
      {err && <p className="error small" role="alert">{err}</p>}
      <div className="tile-actions">{actions}</div>
    </div>
  )
}

// Whether the student owns the Arena (complete course, the Arena on its own, or all seven modules).
export function useArenaAccess() {
  const { user } = useApp()
  return hasArena(user?.purchases)
}

// Unlock the Arena: on its own for €48, or with the complete course.
export function ArenaUnlockCard({ compact }) {
  const { go, user, launch, purchase } = useApp()
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const o = offers(user?.purchases, { launch: launch?.launch })
  return (
    <div className={'card arena-unlock' + (compact ? ' compact' : '')}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
        <div>
          <span className="eyebrow">Unlock the Arena</span>
          <h4>Put your skills to the test with AI role-plays</h4>
        </div>
        <p className="coach-price"><strong className="tnum">€{ARENA_PRICE}</strong> <span className="muted">one payment</span></p>
      </div>
      <ul className="small">
        <li>Live role-plays with AI counterparts at three levels, scored on five skills</li>
        <li>{ARENA_TOKENS} Arena tokens included (about 9 full role-plays), valid for 12 months</li>
        <li>Earn the three badges you need for your certificate</li>
      </ul>
      {o.bundle && <p className="small muted">Or get the complete course for {euro(o.bundle.price)}: all 7 modules with the Arena included. <button type="button" className="linklike" onClick={() => go('checkout', { choice: 'bundle' })}>See the complete course</button></p>}
      {LEGAL.smallBusiness && <p className="small muted">No VAT is charged: small business under § 19 UStG.</p>}
      <label className="waiver">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I want the Arena right away, before the 14-day withdrawal period ends. I understand that I lose my right of withdrawal once I start using it.</span>
      </label>
      <p className="small muted">Subject to our <TermsLink />, sections 5 and 10.</p>
      {err && <p className="error" role="alert">{err}</p>}
      <div className="row" style={{ gap: '.5rem' }}>
        <button className="btn btn-primary" disabled={busy || !consent} onClick={async () => {
          setBusy(true); setErr('')
          try { await purchase('arena', { waiver: consent }); setBusy(false) } catch (x) { setErr(x.message); setBusy(false) }
        }}>{busy ? 'Opening secure payment…' : `Unlock the Arena · €${ARENA_PRICE}`}</button>
      </div>
    </div>
  )
}

const euro = (n) => `€${Number.isInteger(n) ? n : n.toFixed(2)}`

// Dashboard tile: the Arena and its tokens.
export function ArenaTile({ onOpen, onBuy }) {
  const { plan } = useCoachPlan()
  const access = useArenaAccess()
  const live = access && isLive && plan && !plan.preview && Number.isFinite(plan.arenaLeft)
  return (
    <div className="card premium-tile tile-arena">
      <div className="tile-top">
        <span className="coach-dot lg tile-arena-dot" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 17.5 21 6V3h-3L6.5 14.5M5 13l6 6M8 16l-4 4M3 19l2 2" /></svg></span>
        <span className="eyebrow">{isLive ? 'Premium · tokens' : 'Premium · prototype'}</span>
      </div>
      <h4>The Arena</h4>
      <p className="small muted">Put your skills to the test in live AI role-plays, get scored and earn your badges.</p>
      <div className="tile-meter">
        {!access ? <>
          <strong>€{ARENA_PRICE} · or included in the complete course</strong>
          <span className="small muted">Comes with {ARENA_TOKENS} Arena tokens, valid for 12 months.</span>
        </> : live ? <>
          <strong>{plural(plan.arenaLeft, 'token')} left</strong>
          <Meter left={plan.arenaLeft} total={plan.arenaTokens} tone="good" />
          <span className="small muted">{plan.arenaLeft > 0 && plan.arenaExpires ? (plan.arenaExpiresLeft < plan.arenaLeft ? `${plan.arenaExpiresLeft} run out on ${day(plan.arenaExpires)}` : `Valid until ${day(plan.arenaExpires)}`) : `${TOPUP_MESSAGES} tokens for €${TOPUP_PRICE}, valid for 12 months.`}</span>
        </> : <span className="small muted">1 token = 1 AI reply. A full role-play with its report uses about 16.</span>}
      </div>
      <div className="tile-actions">
        <button className="btn btn-primary btn-sm" onClick={onOpen}>{access ? 'Enter the Arena' : 'Look inside'}</button>
        {access ? isLive && <button className="btn btn-sm" onClick={onBuy}>Buy tokens</button> : <button className="btn btn-sm" onClick={onOpen}>Unlock · €{ARENA_PRICE}</button>}
      </div>
    </div>
  )
}

// Arena tokens the student can still use (never coach messages).
export function practiceMessagesLeft(plan) {
  if (!plan || plan.preview || !Number.isFinite(plan.arenaLeft)) return null
  return Math.max(0, plan.arenaLeft)
}

// Top right of the Arena: how many Arena tokens are left, and a button to buy more.
export function PracticeCounter({ onBuy }) {
  const { plan } = useCoachPlan()
  const access = useArenaAccess()
  const left = practiceMessagesLeft(plan)
  if (!isLive || left == null || !access) return null
  return (
    <div className={'practice-counter' + (left <= 20 ? ' low' : '')} title={plan.arenaExpires ? arenaNote(plan) : undefined}>
      <span className="practice-counter-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v9M9.5 10h5M9.5 14h5" /></svg>
      </span>
      <span className="practice-counter-text">
        <span className="practice-counter-n tnum">{left}</span>
        <span className="practice-counter-label">Arena token{left === 1 ? '' : 's'} left</span>
      </span>
      <button type="button" className="practice-counter-buy" onClick={onBuy}>+ Buy tokens</button>
    </div>
  )
}

// Buy 150 more Arena tokens for €12 (one payment, no subscription, valid 12 months).
export function TopUpCard({ onClose }) {
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  return (
    <div className="card topup-card">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
        <div>
          <span className="eyebrow">Arena tokens</span>
          <h4>{TOPUP_MESSAGES} more Arena tokens</h4>
        </div>
        <p className="coach-price"><strong className="tnum">€{TOPUP_PRICE}</strong> <span className="muted">one payment</span></p>
      </div>
      <ul className="small">
        <li>Enough for about 9 full role-plays with feedback reports</li>
        <li>Valid for 12 months from today, added to what you have left</li>
        <li>For the Arena only: HIT Mentor has its own messages</li>
        <li>No subscription: you pay once</li>
      </ul>
      {LEGAL.smallBusiness && <p className="small muted">No VAT is charged: small business under § 19 UStG.</p>}
      <label className="waiver">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I want the tokens right away, before the 14-day withdrawal period ends. I understand that I lose my right of withdrawal once I start using them.</span>
      </label>
      <p className="small muted">Subject to our <TermsLink />, sections 5 and 10.</p>
      {err && <p className="error" role="alert">{err}</p>}
      <div className="row" style={{ gap: '.5rem' }}>
        <button className="btn btn-primary" disabled={busy || !consent || !isLive} onClick={async () => {
          setBusy(true); setErr('')
          try { await backend.startCheckout(null, 'practice', { waiver: consent }) } catch (x) { setErr(x.message); setBusy(false) }
        }}>{busy ? 'Opening secure payment…' : `Buy ${TOPUP_MESSAGES} tokens · €${TOPUP_PRICE}`}</button>
        {onClose && <button className="btn btn-ghost" onClick={onClose}>Not now</button>}
      </div>
    </div>
  )
}
