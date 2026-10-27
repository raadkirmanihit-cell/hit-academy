import { useState } from 'react'
import { useApp } from '../App.jsx'

export default function AuthScreen({ mode }) {
  const { signUp, signIn, go } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const isUp = mode === 'signup'
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setErr('')
    if (isUp && form.name.trim().length < 2) return setErr('Enter your full name. It appears on your certificate.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setErr('Enter a valid email address.')
    if (form.password.length < 8) return setErr('Use at least 8 characters for your password.')
    setBusy(true)
    try { await (isUp ? signUp(form) : signIn(form)) } catch (x) { setErr(x.message); setBusy(false) }
  }

  return (
    <div className="wrap auth-shell">
      <form className="card auth-card fade-in" onSubmit={submit} noValidate>
        <div className="stack" style={{ gap: '.4rem' }}>
          <span className="eyebrow">{isUp ? 'Step 1 of 2 · Create account' : 'Welcome back'}</span>
          <h2>{isUp ? 'Create your account' : 'Sign in'}</h2>
          <p className="muted small">{isUp ? 'Your progress and certificate are tied to this account.' : 'Pick up exactly where you left off.'}</p>
        </div>
        {isUp && (
          <div className="field"><label htmlFor="f-name">Full name</label>
            <input id="f-name" autoComplete="name" value={form.name} onChange={set('name')} placeholder="As it should appear on your certificate" /></div>
        )}
        <div className="field"><label htmlFor="f-email">Email</label>
          <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} /></div>
        <div className="field"><label htmlFor="f-pass">Password</label>
          <input id="f-pass" type="password" autoComplete={isUp ? 'new-password' : 'current-password'} value={form.password} onChange={set('password')} placeholder="At least 8 characters" /></div>
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'One moment…' : isUp ? 'Create account and continue' : 'Sign in'}</button>
        <p className="small muted" style={{ textAlign: 'center' }}>
          {isUp ? 'Already enrolled? ' : 'New here? '}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => go(isUp ? 'signin' : 'signup')}>{isUp ? 'Sign in' : 'Create an account'}</button>
        </p>
      </form>
    </div>
  )
}
