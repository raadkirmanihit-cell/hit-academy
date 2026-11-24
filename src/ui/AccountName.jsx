import { useState } from 'react'
import { useApp } from '../App.jsx'
import { firstName } from '../platform/names.js'

// "My name": the full name on the certificate, and the first name used in greetings.
// Google and Facebook accounts can carry a nickname or a short name, so students can fix both here.
export default function AccountName() {
  const { user, updateName, notify, go, paid } = useApp()
  const [name, setName] = useState(user.name || '')
  const [call, setCall] = useState(user.callName || '')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const preview = call.trim() || name.trim().split(/\s+/)[0] || ''

  async function submit(e) {
    e.preventDefault()
    if (name.trim().length < 2) return setErr('Enter your full name, as it should appear on your certificate.')
    setBusy(true); setErr('')
    try {
      await updateName(name, call)
      notify('Your name is saved.')
      go(paid ? 'dashboard' : 'checkout')
    } catch (x) { setErr(x.message); setBusy(false) }
  }

  return (
    <div className="wrap auth-shell">
      <form className="card auth-card fade-in" onSubmit={submit} noValidate>
        <div className="stack" style={{ gap: '.4rem' }}>
          <span className="eyebrow">Your account</span>
          <h2>My name</h2>
          <p className="muted small">Check how your name appears in the course and on your certificate.</p>
        </div>
        <div className="field"><label htmlFor="acc-name">Full name</label>
          <input id="acc-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          <span className="small muted">Printed on your certificate of completion.</span></div>
        <div className="field"><label htmlFor="acc-call">What should we call you? <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
          <input id="acc-call" autoComplete="given-name" value={call} onChange={(e) => setCall(e.target.value)} placeholder={name.trim().split(/\s+/)[0] || 'Your first name'} />
          <span className="small muted">{preview ? <>Your dashboard will say "Welcome back, {preview}".</> : 'Used in greetings on your dashboard.'}</span></div>
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.history.back()}>Cancel</button>
      </form>
    </div>
  )
}
