import { useState } from 'react'
import { useApp } from '../App.jsx'
import { TermsCheckbox } from './Terms.jsx'

const COPY = {
  signup: { eyebrow: 'Free account · no card needed', title: 'Create your free account', sub: 'Start Module 1 for free right away. Your progress and certificate are tied to this account.', button: 'Create account and start' },
  signin: { eyebrow: 'Welcome back', title: 'Sign in', sub: 'Pick up exactly where you left off.', button: 'Sign in' },
  reset: { eyebrow: 'Forgot your password?', title: 'Reset your password', sub: 'Enter your email and we\'ll send you a link to choose a new password.', button: 'Send reset link' },
  newpass: { eyebrow: 'Almost done', title: 'Choose a new password', sub: 'Use at least 8 characters.', button: 'Save new password' },
}

export default function AuthScreen({ mode }) {
  const { signUp, signIn, requestPasswordReset, setNewPassword, go } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [terms, setTerms] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(null) // 'confirm' | 'reset'
  const c = COPY[mode] || COPY.signin
  const [showPass, setShowPass] = useState(false)
  const isUp = mode === 'signup'
  const needsEmail = mode !== 'newpass'
  const needsPassword = mode !== 'reset'
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setErr('')
    if (isUp && form.name.trim().length < 2) return setErr('Enter your full name. It appears on your certificate.')
    if (needsEmail && !/^\S+@\S+\.\S+$/.test(form.email)) return setErr('Enter a valid email address.')
    if (needsPassword && form.password.length < 8) return setErr('Use at least 8 characters for your password.')
    if (isUp && !terms) return setErr('Please tick the box to accept the Terms and Conditions.')
    setBusy(true)
    try {
      if (mode === 'signup') await signUp({ ...form, acceptTerms: true })
      else if (mode === 'signin') await signIn(form)
      else if (mode === 'reset') { await requestPasswordReset(form.email); setSent('reset'); setBusy(false) }
      else if (mode === 'newpass') await setNewPassword(form.password)
    } catch (x) {
      if (x.code === 'confirm_email') setSent('confirm')
      else setErr(x.message)
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="wrap auth-shell">
        <div className="card auth-card fade-in stack" role="status">
          <span className="eyebrow">Check your inbox</span>
          <h2>{sent === 'confirm' ? 'Confirm your email' : 'Reset link sent'}</h2>
          <p>
            {sent === 'confirm'
              ? <>We've sent a confirmation link to <strong>{form.email}</strong>. Open it to activate your account, and you'll come straight back here.</>
              : <>If an account exists for <strong>{form.email}</strong>, you'll receive a link to choose a new password in the next few minutes.</>}
          </p>
          <p className="small muted">Nothing arrived? Check your spam folder, or wait a minute and try again.</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setSent(null); go('signin') }}>Back to sign in</button>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap auth-shell">
      <form className="card auth-card fade-in" onSubmit={submit} noValidate>
        <div className="stack" style={{ gap: '.4rem' }}>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p className="muted small">{c.sub}</p>
        </div>
        {isUp && (
          <div className="field"><label htmlFor="f-name">Full name</label>
            <input id="f-name" autoComplete="name" value={form.name} onChange={set('name')} placeholder="As it should appear on your certificate" /></div>
        )}
        {needsEmail && (
          <div className="field"><label htmlFor="f-email">Email</label>
            <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} /></div>
        )}
        {needsPassword && (
          <div className="field"><label htmlFor="f-pass">{mode === 'newpass' ? 'New password' : 'Password'}</label>
            <div className="pass-wrap">
              <input id="f-pass" type={showPass ? 'text' : 'password'} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={form.password} onChange={set('password')} placeholder="At least 8 characters" />
              <button type="button" className="pass-eye" onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'} aria-pressed={showPass} aria-controls="f-pass" title={showPass ? 'Hide password' : 'Show password'}>
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {mode === 'signin' && (
              <button type="button" className="btn btn-ghost btn-sm" style={{ justifySelf: 'end' }} onClick={() => go('reset')}>Forgot password?</button>
            )}
          </div>
        )}
        {isUp && <TermsCheckbox checked={terms} onChange={setTerms} />}
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'One moment…' : c.button}</button>
        {mode !== 'newpass' && (
          <p className="small muted" style={{ textAlign: 'center' }}>
            {isUp ? 'Already enrolled? ' : 'New here? '}
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => go(isUp ? 'signin' : 'signup')}>{isUp ? 'Sign in' : 'Create an account'}</button>
          </p>
        )}
      </form>
    </div>
  )
}

function Eye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOff() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
