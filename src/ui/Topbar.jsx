import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { courseStats } from '../platform/progress.js'

export default function Topbar() {
  const { course, modules, user, paid, progress, go, signOut, resetProgress, authorMode, setAuthorMode, view, admin, isLive } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])
  const stats = paid ? courseStats(course, modules, progress) : null
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
              <span className="brand-name">{course.title}</span><br />
              <span className="brand-sub">{course.org}</span>
            </span>
          </button>
          <div className="spacer" />
          {stats && view.name !== 'dashboard' && (
            <button className="btn btn-ghost btn-sm" onClick={() => go('dashboard')}>
              <span className="hide-phone">Dashboard</span> <span className="pill orange tnum">{stats.pctAll}%</span>
            </button>
          )}
          {!user && (
            <div className="row">
              <button className="btn btn-ghost btn-sm" onClick={() => go('signin')}>Sign in</button>
              <button className="btn btn-primary btn-sm" onClick={() => go('signup')}>Enroll</button>
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
                  <button role="menuitem" onClick={() => { setOpen(false); go('contact') }}>Message Raad</button>
                  {admin && <button role="menuitem" onClick={() => { setOpen(false); go('admin') }}>Control board (admin)</button>}
                  <button role="menuitem" onClick={() => setAuthorMode(!authorMode)}>
                    {authorMode ? 'Hide' : 'Highlight'} content added beyond the module
                  </button>
                  {paid && <button role="menuitem" onClick={() => { setOpen(false); resetProgress() }}>Reset my progress</button>}
                  <button role="menuitem" onClick={() => { setOpen(false); signOut() }}>Sign out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}
