// The student's AI coach plan: free messages left, or the €12/month subscription.
// One shared copy for the whole page, so the coach panel, sparring and dashboard agree.
import { useEffect, useState } from 'react'
import { backend, isLive } from '../platform/backend.js'
import { TermsLink } from '../ui/Terms.jsx'
import { LEGAL } from '../content/terms.js'

export const COACH_PRICE = 12 // € per month, shown on the page (Stripe holds the real price)

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
export function coachLocked() {
  if (state.plan) set({ plan: { ...state.plan, left: 0 } })
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
    refresh: refreshCoachPlan,
  }
}

const day = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// A one-line note under the coach: free messages left, or the monthly allowance.
export function PlanNote() {
  const { plan } = useCoachPlan()
  if (!isLive || !plan || plan.preview) return null
  if (!plan.subscribed) return <p className="coach-plan-note small">{plan.left > 0 ? `${plan.left} free coach message${plan.left === 1 ? '' : 's'} left.` : 'Your free coach messages are used up.'} <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event('coach-subscribe'))}>Subscribe for €{COACH_PRICE}/month</button></p>
  if (plan.left <= 30) return <p className="coach-plan-note small">{plan.left} of this month's {plan.limit} coach messages left.</p>
  return null
}

// The subscribe card: price, what's included, the withdrawal notice and the Stripe button.
export function CoachPaywall({ compact }) {
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const { plan } = useCoachPlan()
  const usedUp = plan && !plan.subscribed && plan.left <= 0
  return (
    <div className={'coach-paywall' + (compact ? ' compact' : '')}>
      <span className="eyebrow">AI coach subscription</span>
      <h4>{usedUp ? 'Keep coaching with the AI coach' : 'Unlock the AI coach'}</h4>
      {usedUp && <p className="small muted">You've used your free coach messages.</p>}
      <p className="coach-price"><strong className="tnum">€{COACH_PRICE}</strong> <span className="muted">per month · cancel any time</span></p>
      <ul className="small">
        <li>Ask about any negotiation or conflict you're facing</li>
        <li>Live sparring with AI counterparts, with feedback reports</li>
        <li>Up to 300 coach messages a month (fair use)</li>
      </ul>
      {LEGAL.smallBusiness && <p className="small muted">No VAT is charged: small business under § 19 UStG.</p>}
      <label className="waiver">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I want the AI coach to start right away, before the 14-day withdrawal period ends. If I withdraw within those 14 days, I pay only for the days I had the coach.</span>
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

// Dashboard card: status, and the buttons to subscribe or cancel.
export function CoachPlanCard() {
  const { plan } = useCoachPlan()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  if (!isLive || !plan || plan.preview) return null
  const portal = async () => { setBusy(true); setErr(''); try { await backend.coachPortal() } catch (x) { setErr(x.message); setBusy(false) } }
  return (
    <div className="card coach-plan-card">
      <div className="stack" style={{ gap: '.3rem' }}>
        <span className="eyebrow">AI coach subscription</span>
        {plan.subscribed ? (
          <>
            <h4>{plan.cancelAtPeriodEnd ? 'Cancelled' : plan.status === 'past_due' ? 'Payment problem' : 'Active'} · €{COACH_PRICE}/month</h4>
            <p className="small muted">
              {plan.cancelAtPeriodEnd
                ? `Your coach stays on until ${day(plan.periodEnd)}, then the subscription ends. You won't be charged again.`
                : plan.status === 'past_due'
                  ? 'Your last monthly payment didn\'t go through. Please update your card to keep the coach.'
                  : `Renews on ${plan.periodEnd ? day(plan.periodEnd) : 'your next billing date'}. ${plan.left} of ${plan.limit} messages left this month.`}
            </p>
          </>
        ) : (
          <>
            <h4>{plan.left > 0 ? `${plan.left} free coach message${plan.left === 1 ? '' : 's'} left` : 'Free coach messages used up'}</h4>
            <p className="small muted">Subscribe for €{COACH_PRICE} a month to keep using the AI coach and the practice studio. Cancel any time.</p>
          </>
        )}
        {err && <p className="error small" role="alert">{err}</p>}
      </div>
      <div className="row" style={{ gap: '.5rem' }}>
        {plan.subscribed
          ? <>
              {plan.status === 'past_due' && <button className="btn btn-primary" disabled={busy} onClick={portal}>Update card</button>}
              {/* The cancel button the law asks for (§ 312k BGB): it opens Stripe's page, where one more click cancels. */}
              <button className="btn" disabled={busy} onClick={portal}>{busy ? 'Opening…' : plan.cancelAtPeriodEnd ? 'Restart or manage subscription' : 'Cancel subscription here'}</button>
            </>
          : <>
              <button className="btn btn-primary" onClick={() => window.dispatchEvent(new Event('coach-subscribe'))}>Subscribe for €{COACH_PRICE}/month</button>
              {plan.hasCustomer && <button className="btn" disabled={busy} onClick={portal}>Past invoices</button>}
            </>}
      </div>
    </div>
  )
}
