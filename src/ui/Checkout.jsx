import { useState } from 'react'
import { useApp } from '../App.jsx'
import { Icon } from './icons.jsx'

export default function Checkout() {
  const { course, user, purchase, isLive } = useApp()
  const [busy, setBusy] = useState(false)
  const [waiver, setWaiver] = useState(false)
  const [err, setErr] = useState('')
  const fmt = new Intl.NumberFormat('en-IE', { style: 'currency', currency: course.product.currency })
  return (
    <div className="wrap auth-shell">
      <div className="checkout-grid fade-in">
        <div className="card" style={{ padding: '2rem', display: 'grid', gap: '1.2rem', alignContent: 'start' }}>
          <span className="eyebrow">Step 2 of 2 · Unlock the course</span>
          <h2>You're one step away, {user.name.split(' ')[0]}</h2>
          <ul className="prose" style={{ listStyle: 'none', padding: 0, gap: '.6rem' }}>
            {['All seven modules', 'Interactive role-plays, activities and graded quizzes', 'Downloadable worksheet for every module', 'Certificate of completion', 'Lifetime access, at your own pace'].map((t) => (
              <li key={t} className="row" style={{ gap: '.6rem', flexWrap: 'nowrap', alignItems: 'start' }}><span style={{ color: 'var(--good)', marginTop: 3 }}><Icon.check /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ padding: '2rem', display: 'grid', gap: '1rem', alignContent: 'start' }}>
          <h3>Order summary</h3>
          <div>
            <div className="order-line"><span>{course.title}<br /><span className="small muted">{course.product.name}</span></span><span className="tnum">{fmt.format(course.product.price)}</span></div>
            <div className="order-line" style={{ borderBottom: 0, fontWeight: 700 }}><span>Total</span><span className="tnum">{fmt.format(course.product.price)}</span></div>
          </div>
          {isLive
            ? <p className="small muted">You'll pay securely on Stripe's payment page. Your receipt and invoice are sent by email.</p>
            : <div className="notice">Preview checkout: no card details are collected and no payment is taken. In the live course this button opens a secure payment page from the payment provider.</div>}
          <label className="waiver">
            <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)} />
            <span>I want access to the course immediately. I understand that I lose my 14-day right of withdrawal once access begins.</span>
          </label>
          {err && <p className="error" role="alert">{err}</p>}
          <button className="btn btn-primary" disabled={busy || !waiver} onClick={async () => {
            setBusy(true); setErr('')
            try { await purchase({ waiver }) } catch (x) { setErr(x.message); setBusy(false) }
          }}>
            {busy ? (isLive ? 'Opening secure payment…' : 'Unlocking…') : <>{isLive ? 'Continue to payment' : 'Unlock the course'} <Icon.lock /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
