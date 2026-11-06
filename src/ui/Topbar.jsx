import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { backend } from '../platform/backend.js'
import { courseStats } from '../platform/progress.js'

export default function Topbar() {
  const { course, modules, user, paid, progress, go, signOut, resetProgress, authorMode, setAuthorMode, view, admin, isLive, practice, notify } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])
  const stats = paid ? courseStats(course, modules, progress, practice) : null
  // Jump to the "HIT Academy courses" section on the home page, from any screen.
  const showCourses = () => {
    const scroll = () => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
    if (view.name === 'landing') scroll()
    else { go('landing'); setTimeout(scroll, 150) }
  }
  const initials = user?.name?.split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase()

  return (
    <>
      {!isLive && (
        <div className="preview-banner">
          <div className="wrap">
            <span><b>Preview mode.</b> Accounts and progress are saved in this browser only, and checkout takes no payment.</span>
          </div>
        </div>
      )}
      <header className="topbar">
        <div className="wrap topbar-inner">
          <button className="brand" onClick={() => go(user && paid ? 'dashboard' : 'landing')} aria-label="Home">
            <img src="img/brand/logo.webp" alt="" />
            <span>
              <span className="brand-name">HIT Academy</span><br />
              <span className="brand-sub">{course.org}</span>
            </span>
          </button>
          <div className="spacer" />
          <button className="btn btn-ghost btn-sm nav-courses" onClick={showCourses}>Courses</button>
          {user && <button className="btn btn-ghost btn-sm nav-courses hide-phone" aria-current={view.name === 'community' ? 'page' : undefined} onClick={() => go('community')}>Community</button>}
          {stats && view.name !== 'dashboard' && (
            <button className={'btn btn-ghost btn-sm' + (user ? '' : ' hide-phone')} onClick={() => go('dashboard')}>
              <span className="hide-phone">Dashboard</span> <span className="pill orange tnum">{stats.pctAll}%</span>
            </button>
          )}
          {!user && (
            <div className="row">
              <button className="btn btn-ghost btn-sm" onClick={() => go('signin')}>Sign in</button>
              <button className="btn btn-primary btn-sm" onClick={() => go('signup')}>Start free</button>
            </div>
          )}
          {user && (
            <div className="menu" ref={ref}>
              <button className="btn btn-ghost btn-sm" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Account menu">
                <span className="avatar">{initials}</span>
              </button>
              {open && (
                <div className="menu-pop" role="menu">
                  <div style={{ padding: '.5rem .75rem' }}>
                    <strong>{user.name}</strong>
                    <div className="small muted">{user.email}</div>
                  </div>
                  {paid && <button role="menuitem" onClick={() => { setOpen(false); go('dashboard') }}>My dashboard</button>}
                  {paid && <button role="menuitem" onClick={() => { setOpen(false); go('certificate') }}>My certificate</button>}
                  <button role="menuitem" onClick={() => { setOpen(false); go('community') }}>Community</button>
                  {paid && <button role="menuitem" onClick={() => { setOpen(false); go('reviews') }}>Review the course</button>}
                  <button role="menuitem" onClick={() => { setOpen(false); go('contact') }}>Message Raad</button>
                  {admin && <button role="menuitem" onClick={() => { setOpen(false); go('admin') }}>Control board (admin)</button>}
                  <button role="menuitem" onClick={() => setAuthorMode(!authorMode)}>
                    {authorMode ? 'Hide' : 'Highlight'} content added beyond the module
                  </button>
                  {paid && <button role="menuitem" onClick={() => { setOpen(false); resetProgress() }}>Reset my progress</button>}
                  <button role="menuitem" onClick={() => { setOpen(false); signOut() }}>Sign out</button>
                  <button role="menuitem" onClick={() => { setOpen(false); requestDeletion(user, notify) }}>Delete my account</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}

// GDPR right to erasure (Art. 17): the request goes to Raad, who deletes the account from the
// control board within 30 days (Privacy Policy, section 6).
async function requestDeletion(user, notify) {
  const ok = window.confirm('Delete your account?\n\nWe will delete your account, progress, Arena role-plays and community posts within 30 days, and cancel any AI coach subscription. You will lose access to everything you bought. Payment records are kept as tax law requires.\n\nPress OK to send the request.')
  if (!ok) return
  try {
    await backend.sendMessage({ subject: 'Account deletion request', body: `Please delete my account (${user.email}) and my personal data, as described in the Privacy Policy.` })
    notify('Request sent. We will delete your account within 30 days and confirm by email.', 6000)
  } catch (e) { notify(`The request could not be sent: ${e.message} Please email info@humaninteractionstranslated.com instead.`, 8000) }
}
