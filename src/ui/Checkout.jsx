import { useState } from 'react'
import { useApp } from '../App.jsx'
import { Icon } from './icons.jsx'

export default function Checkout() {
  const { course, user, purchase } = useApp()
  const [busy, setBusy] = useState(false)
  const fmt = new Intl.NumberFormat('en-IE', { style: 'currency', currency: course.product.currency })
  return (
    <div className="wrap auth-shell">
      <div className="checkout-grid fade-in">
        <div className="card" style={{ padding: '2rem', display: 'grid', gap: '1.2rem', alignContent: 'start' }}>
          <span className="eyebrow">Step 2 of 2 · Unlock the course</span>
          <h2>You're one step away, {user.name.split(' ')[0]}</h2>
          <ul className="prose" style={{ listStyle: 'none', padding: 0, gap: '.6rem' }}>
            {['All seven modules as they are released', 'Interactive role-plays, activities and graded quizzes', 'Downloadable worksheet for every module', 'Certificate of completion', 'Lifetime access, at your own pace'].map((t) => (
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
          <div className="notice">Preview checkout: no card details are collected and no payment is taken. In the live course this button opens a secure payment page from the payment provider.</div>
          <button className="btn btn-primary" disabled={busy} onClick={async () => { setBusy(true); await purchase() }}>
            {busy ? 'Unlocking…' : <>Unlock the course <Icon.lock /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
