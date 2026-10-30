import { useState } from 'react'
import { useApp } from '../App.jsx'
import { Icon } from './icons.jsx'
import { TermsLink } from './Terms.jsx'
import { LEGAL } from '../content/terms.js'
import { offers, MODULE_PRICE, CURRENCY, BUNDLE_COACH_MONTHS, euro } from '../content/pricing.js'


// Buy the complete course (€99, or €79 at launch, less €19 for each module already bought) or a single module (€19).
// Module 1 is free for everyone.
// `choice`: the module the student tried to open, or 'bundle'.
export default function Checkout({ choice }) {
  const { course, user, purchase, isLive, go, launch } = useApp()
  const o = offers(user.purchases, { launch: launch.launch })
  const paid = o.bought > 0
  const firstLeft = o.remaining[0]
  const [pick, setPick] = useState(() => (choice && choice !== 'bundle' && o.remaining.includes(choice) ? choice : o.bundle ? 'bundle' : firstLeft))
  const [mod, setMod] = useState(() => (choice && o.remaining.includes(choice) ? choice : firstLeft))
  const [busy, setBusy] = useState(false)
  const [waiver, setWaiver] = useState(false)
  const [err, setErr] = useState('')
  const title = (id) => { const m = course.modules.find((x) => x.id === id); return m ? `Module ${m.number}: ${m.title}` : '' }

  if (!o.remaining.length) {
    return (
      <div className="wrap auth-shell"><div className="card fade-in" style={{ padding: '2rem', display: 'grid', gap: '1rem', maxWidth: 520 }}>
        <h2>You have the complete course</h2>
        <button className="btn btn-primary" onClick={() => go('dashboard')}>Go to my dashboard</button>
      </div></div>
    )
  }

  const bundle = pick === 'bundle'
  const item = bundle ? 'bundle' : mod
  const total = bundle ? o.bundle.price : MODULE_PRICE
  const tryingModule = choice && choice !== 'bundle' && o.remaining.includes(choice)

  return (
    <div className="wrap auth-shell">
      <div className="checkout-grid fade-in">
        <div className="card" style={{ padding: '2rem', display: 'grid', gap: '1.2rem', alignContent: 'start' }}>
          <span className="eyebrow">Unlock more of the course</span>
          <h2>{tryingModule ? `${title(choice).split(':')[0]} is locked` : `Keep going, ${user.name.split(' ')[0]}`}</h2>
          <p className="muted small">Module 1 is free. Unlock the other six one at a time, or all at once.</p>
          <div className="buy-options" role="radiogroup" aria-label="What would you like to unlock?">
            {o.bundle && (
              <label className={'buy-option' + (bundle ? ' on' : '')}>
                <input type="radio" name="buy" checked={bundle} onChange={() => setPick('bundle')} />
                <span className="buy-main">
                  <strong>Complete course: all 7 modules</strong>
                  <span className="small muted">
                    {o.bundle.credit ? `You pay only the difference: ${euro(o.bundle.full)} less ${euro(o.bundle.credit)} for the module${o.bought > 1 ? 's' : ''} you bought. ` : ''}
                    Save {euro(o.bundle.saving)} compared with buying the remaining modules one by one ({euro(o.bundle.separately)}). Includes {BUNDLE_COACH_MONTHS} months of the AI coach and the certificate.
                  </span>
                  {o.bundle.launch && <span className="small" style={{ color: 'var(--orange-ink)', fontWeight: 600 }}>Launch price: {euro(o.bundle.full)} instead of {euro(o.bundle.regular)}{launch.left ? ` for the first 100 students (${launch.left} places left)` : ''}{launch.until ? `, until ${new Date(launch.until).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}` : ''}.</span>}
                </span>
                <span className="buy-price tnum">{o.bundle.credit || o.bundle.launch ? <><s className="muted">{euro(o.bundle.credit ? o.bundle.full : o.bundle.regular)}</s> </> : null}{euro(o.bundle.price)}{!o.bundle.credit && <span className="pill good">Best value</span>}</span>
              </label>
            )}
            <label className={'buy-option' + (!bundle ? ' on' : '')}>
              <input type="radio" name="buy" checked={!bundle} onChange={() => setPick(mod)} />
              <span className="buy-main">
                <strong>A single module</strong>
                <select value={mod} onChange={(e) => { setMod(e.target.value); setPick(e.target.value) }} aria-label="Which module" onClick={() => setPick(mod)}>
                  {o.remaining.map((id) => <option key={id} value={id}>{title(id)}</option>)}
                </select>
              </span>
              <span className="buy-price tnum">{euro(MODULE_PRICE)}</span>
            </label>
          </div>
          <ul className="prose" style={{ listStyle: 'none', padding: 0, gap: '.6rem' }}>
            {['Interactive role-plays, activities and a graded quiz in every module', 'Downloadable worksheet for every module', 'Lifetime access, at your own pace', 'The certificate once you complete all seven modules', '14-day money-back guarantee'].map((t) => (
              <li key={t} className="row" style={{ gap: '.6rem', flexWrap: 'nowrap', alignItems: 'start' }}><span style={{ color: 'var(--good)', marginTop: 3 }}><Icon.check /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ padding: '2rem', display: 'grid', gap: '1rem', alignContent: 'start' }}>
          <h3>Order summary</h3>
          <div>
            <div className="order-line"><span>{bundle ? course.title : title(mod)}<br /><span className="small muted">{bundle ? (o.bundle.credit ? 'Complete course, upgrade' : 'Complete course, all 7 modules') : course.title}</span></span><span className="tnum">{euro(total)}</span></div>
            <div className="order-line" style={{ borderBottom: 0, fontWeight: 700 }}><span>Total</span><span className="tnum">{euro(total)}</span></div>
            {LEGAL.smallBusiness && <p className="small muted">No VAT is charged: small business under § 19 UStG.</p>}
          </div>
          {isLive
            ? <p className="small muted">You'll pay securely on Stripe's payment page. Your receipt and invoice are sent by email.</p>
            : <div className="notice">Preview checkout: no card details are collected and no payment is taken. In the live course this button opens a secure payment page from the payment provider.</div>}
          <label className="waiver">
            <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)} />
            <span>I expressly agree that you give me access {bundle ? 'to the course' : 'to this module'} immediately, before the 14-day withdrawal period ends. I understand that I lose my legal right of withdrawal once access begins.</span>
          </label>
          <p className="small muted"><strong>14-day money-back guarantee:</strong> not happy? Email us within 14 days of your purchase and we refund it in full, no questions asked. Subject to our <TermsLink />, section 5.</p>
          {err && <p className="error" role="alert">{err}</p>}
          <button className="btn btn-primary" disabled={busy || !waiver} onClick={async () => {
            setBusy(true); setErr('')
            try { await purchase(item, { waiver }) } catch (x) { setErr(x.message); setBusy(false) }
          }}>
            {busy ? (isLive ? 'Opening secure payment…' : 'Unlocking…') : <>{isLive ? `Continue to payment · ${euro(total)}` : `Unlock · ${euro(total)}`} <Icon.lock /></>}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => go('dashboard')}>Back to my dashboard</button>
        </div>
      </div>
    </div>
  )
}
