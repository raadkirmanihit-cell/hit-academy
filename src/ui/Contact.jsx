import { useState } from 'react'
import { useApp } from '../App.jsx'
import { backend } from '../platform/backend.js'

// "Message Raad": a signed-in student writes to Raad. Raad sees it on the control board and by email.
export default function ContactPage() {
  const { user, go, paid } = useApp()
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  if (sent) {
    return (
      <div className="wrap auth-shell">
        <div className="card auth-card fade-in stack" style={{ gap: '1rem' }}>
          <span className="eyebrow">Message sent</span>
          <h2>Thank you, {user.name.split(' ')[0] || 'there'}</h2>
          <p>Raad has your message and will reply to <b>{user.email}</b>.</p>
          <div className="row">
            <button className="btn btn-primary" onClick={() => go(paid ? 'dashboard' : 'landing')}>Back to the course</button>
            <button className="btn btn-ghost" onClick={() => { setSent(false); setSubject(''); setBody('') }}>Write another</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap auth-shell">
      <form className="card auth-card fade-in stack" style={{ gap: '1rem' }} onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true); setErr('')
        try { await backend.sendMessage({ subject, body }); setSent(true) } catch (x) { setErr(x.message) } finally { setBusy(false) }
      }}>
        <span className="eyebrow">Contact</span>
        <h2>Message Raad</h2>
        <p className="muted">Questions about the course, a negotiation you're preparing, or anything about your account. Raad replies by email to <b>{user.email}</b>.</p>
        <div className="field"><label htmlFor="m-subject">Subject (optional)</label>
          <input id="m-subject" value={subject} maxLength={200} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Question about Module 4" /></div>
        <div className="field"><label htmlFor="m-body">Your message</label>
          <textarea id="m-body" value={body} maxLength={5000} onChange={(e) => setBody(e.target.value)} rows={7} required /></div>
        {err && <p className="error" role="alert">{err}</p>}
        <div className="row">
          <button className="btn btn-primary" disabled={busy || body.trim().length < 2}>{busy ? 'Sending…' : 'Send message'}</button>
          <button type="button" className="btn btn-ghost" onClick={() => go(paid ? 'dashboard' : 'landing')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
