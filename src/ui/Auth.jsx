import { useEffect, useState } from 'react'
import { useApp } from '../App.jsx'
import { TermsCheckbox } from './Terms.jsx'

const COPY = {
  signup: { eyebrow: 'Free account · no card needed', title: 'Create your free account', sub: 'Start Module 1 for free right away. Your progress and certificate are tied to this account.', button: 'Create account and start' },
  signin: { eyebrow: 'Welcome back', title: 'Sign in', sub: 'Pick up exactly where you left off.', button: 'Sign in' },
  reset: { eyebrow: 'Forgot your password?', title: 'Reset your password', sub: 'Enter your email and we\'ll send you a link to choose a new password.', button: 'Send reset link' },
  newpass: { eyebrow: 'Almost done', title: 'Choose a new password', sub: 'Use at least 8 characters.', button: 'Save new password' },
}

export default function AuthScreen({ mode }) {
  const { signUp, signIn, requestPasswordReset, setNewPassword, socialProviders, signInWithProvider, go } = useApp()
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
  const [providers, setProviders] = useState([])
  const showSocial = mode === 'signup' || mode === 'signin'
  useEffect(() => {
    if (!showSocial) return
    let live = true
    socialProviders().then((p) => { if (live) setProviders(p || []) }, () => {})
    return () => { live = false }
  }, [showSocial, socialProviders])

  async function social(provider) {
    setErr('')
    setBusy(provider)
    // A ticked Terms box on the sign-up page is recorded once they come back; otherwise they are asked then.
    try { await signInWithProvider(provider, { acceptTerms: isUp && terms }) } catch (x) { setErr(x.message); setBusy(false) }
  }

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
        {showSocial && providers.length > 0 && (
          <div className="social-auth">
            {providers.map((p) => (
              <button key={p} type="button" className="btn social-btn" disabled={!!busy} onClick={() => social(p)}>
                {p === 'google' ? <GoogleLogo /> : <FacebookLogo />}
                <span>{busy === p ? 'One moment…' : `Continue with ${p === 'google' ? 'Google' : 'Facebook'}`}</span>
              </button>
            ))}
            <div className="or-line" role="separator"><span>or {isUp ? 'sign up' : 'sign in'} with email</span></div>
          </div>
        )}
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
        {isUp && providers.length > 0 && <p className="small muted" style={{ marginTop: '-.6rem' }}>Using {providers.map((p) => p === 'google' ? 'Google' : 'Facebook').join(' or ')}? Tick the box first, or we'll ask you right after.</p>}
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={!!busy}>{busy === true ? 'One moment…' : c.button}</button>
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

// Official provider marks, as their brand guidelines ask for on sign-in buttons.
function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

function FacebookLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path fill="#fff" d="M16.67 15.47 17.2 12h-3.33V9.75c0-.95.47-1.87 1.96-1.87h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.66V12H7.08v3.47h3.05v8.4a12.1 12.1 0 0 0 3.74 0v-8.4h2.8z" />
    </svg>
  )
}
