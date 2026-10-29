import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { course } from './content/course.js'
import { modules } from './content/index.js'
import { backend, isLive } from './platform/backend.js'
import { emptyProgress, update } from './platform/progress.js'
import Topbar from './ui/Topbar.jsx'
import Landing from './ui/Landing.jsx'
import AuthScreen from './ui/Auth.jsx'
import Checkout from './ui/Checkout.jsx'
import Dashboard from './ui/Dashboard.jsx'
import Player from './ui/Player.jsx'
import CertificatePage from './ui/Certificate.jsx'
import { CoachLauncher, PracticeStudio } from './coach/Coach.jsx'
import { refreshCoachPlan } from './coach/plan.jsx'
import AdminPage from './ui/Admin.jsx'
import ContactPage from './ui/Contact.jsx'
import TermsPage, { AcceptTerms, LegalLinks, LEGAL_PAGES } from './ui/Terms.jsx'
import { TERMS_VERSION } from './content/terms.js'
import { ownedModules } from './content/pricing.js'

// Modules the student may open, and whether they bought anything at all.
const ownedOf = (u) => ownedModules(u?.purchases)
const hasAny = (u) => ownedOf(u).size > 0
// After a Stripe payment: is the thing they just bought unlocked yet?
const unlocked = (u, item) => (item && item !== 'bundle' ? ownedOf(u).has(item) : ownedOf(u).size === 7)

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export default function App() {
  const [booted, setBooted] = useState(false)
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(emptyProgress)
  const owned = useMemo(() => ownedOf(user), [user])
  const paid = owned.size > 0
  const [view, setView] = useState({ name: 'landing' })
  const [toast, setToast] = useState(null)
  const [authorMode, setAuthorMode] = useState(false)
  const [admin, setAdmin] = useState(false)
  const toastTimer = useRef()
  const loaded = useRef(false) // progress is only saved after it has been loaded
  const lastSaved = useRef('') // skip saving when nothing changed

  const notify = useCallback((msg, ms = 2800) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), ms)
  }, [])

  const go = useCallback((name, extra = {}) => setView({ name, ...extra }), [])

  // Signs a user in on this device: loads their saved progress and picks the right screen.
  const enter = useCallback(async (u, { welcome = false } = {}) => {
    loaded.current = false
    setUser(u)
    if (!u) { setProgress(emptyProgress()); return }
    const saved = await backend.loadProgress(u.id).catch(() => null)
    const start = saved || emptyProgress()
    lastSaved.current = JSON.stringify(start)
    setProgress(start)
    loaded.current = true
    go(hasAny(u) ? 'dashboard' : 'checkout', welcome ? { welcome: true } : {})
    if (isLive) backend.isAdmin().then(setAdmin, () => setAdmin(false))
  }, [go])

  // Start-up: restore the session, and handle returns from Stripe and from email links.
  useEffect(() => {
    let off = () => {}
    ;(async () => {
      const params = new URLSearchParams(window.location.search)
      const checkout = params.get('checkout')
      const item = params.get('item') // what they just paid for: 'bundle' or a module id
      const coach = params.get('coach') // back from the coach subscription checkout or Stripe's subscription page
      // Sign in first: links from confirmation and reset emails carry the login in the URL.
      let u = await backend.init().catch(() => null)
      if (checkout || coach || params.get('code') || /access_token|error_description/.test(window.location.hash)) window.history.replaceState({}, '', window.location.pathname)
      if (u && checkout === 'success' && !unlocked(u, item)) {
        // Stripe confirms the payment to our server a few seconds after the redirect.
        for (let i = 0; i < 10 && !unlocked(u, item); i++) {
          await new Promise((r) => setTimeout(r, 1500))
          u = await backend.refreshUser().catch(() => u)
        }
      }
      if (u) await enter(u, { welcome: checkout === 'success' && unlocked(u, item) })
      if (u && checkout === 'success' && item && item !== 'bundle' && unlocked(u, item)) go('module', { moduleId: item })
      if (LEGAL_PAGES[params.get('page')]) go('legal', { page: params.get('page') })
      if (checkout === 'cancel' || coach === 'cancel') notify('Payment cancelled. You have not been charged.')
      if (u && coach === 'success') {
        // Stripe confirms the subscription to our server a few seconds after the redirect.
        let plan = null
        for (let i = 0; i < 10 && !plan?.subscribed; i++) {
          plan = await backend.coachPlan().catch(() => null)
          if (!plan?.subscribed) await new Promise((r) => setTimeout(r, 1500))
        }
        await refreshCoachPlan()
        notify(plan?.subscribed ? 'Your AI coach subscription is active. Ask away!' : 'Payment received. The coach unlocks in a minute: please reload this page shortly.', 6000)
      }
      if (u && coach === 'portal') refreshCoachPlan()
      if (u && checkout === 'success' && !unlocked(u, item)) notify('Payment received. Unlocking can take a minute: please reload this page shortly.', 8000)
      off = backend.onRecovery(() => go('newpass')) || (() => {})
      setBooted(true)
    })()
    return () => off()
  }, [enter, go, notify])

  // Persist progress whenever it changes (debounced).
  const saveTimer = useRef()
  useEffect(() => {
    if (!user || !loaded.current) return
    clearTimeout(saveTimer.current)
    const json = JSON.stringify(progress)
    if (json === lastSaved.current) return
    saveTimer.current = setTimeout(() => {
      backend.saveProgress(user.id, progress).then(() => { lastSaved.current = json }, () => {})
    }, isLive ? 1500 : 250)
    return () => clearTimeout(saveTimer.current)
  }, [progress, user])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [view.name, view.moduleId])

  const api = useMemo(() => ({
    course, modules, user, paid, owned, progress, view, go, notify, authorMode, setAuthorMode, admin, isLive,
    async signUp(data) {
      const u = await backend.signUp(data)
      await enter(u)
    },
    async signIn(data) {
      const u = await backend.signIn(data)
      await enter(u)
    },
    async acceptTerms() {
      const u = await backend.acceptTerms(user)
      await enter(u)
    },
    async signOut() { await backend.signOut(); setAdmin(false); await enter(null); go('landing') },
    requestPasswordReset: (email) => backend.requestPasswordReset(email),
    async setNewPassword(pw) {
      await backend.setNewPassword(pw)
      notify('Your new password is saved.')
      const u = await backend.refreshUser().catch(() => null)
      if (u) await enter(u); else go('signin')
    },
    // choice: 'bundle' or a module id. On the live site this leaves for Stripe's payment page.
    async purchase(choice, opts) {
      const u = await backend.startCheckout(user, choice, opts)
      setUser(u)
      if (choice !== 'bundle') go('module', { moduleId: choice }); else go('dashboard', { welcome: true })
    },
    async resetProgress() {
      if (user) await backend.resetProgress(user.id)
      const fresh = emptyProgress()
      lastSaved.current = JSON.stringify(fresh)
      setProgress(fresh); notify('Progress reset'); go('dashboard')
    },
    openModule(moduleId, stepId) { go('module', { moduleId, stepId }) },
    markDone(moduleId, stepId) {
      setProgress((p) => update({ ...p, last: { moduleId, stepId, at: Date.now() } }, moduleId, (ms) => { ms.done[stepId] = true }))
    },
    visit(moduleId, stepId) { setProgress((p) => ({ ...p, last: { moduleId, stepId, at: Date.now() } })) },
    saveActivity(moduleId, activityId, data) {
      setProgress((p) => update(p, moduleId, (ms) => { ms.activities[activityId] = { ...(ms.activities[activityId] || {}), ...data } }))
    },
    saveReflection(moduleId, id, text) {
      setProgress((p) => update(p, moduleId, (ms) => { ms.reflections[id] = text }))
    },
    saveQuiz(moduleId, result) {
      setProgress((p) => update(p, moduleId, (ms) => {
        const prev = ms.quiz || { attempts: 0, best: 0, passed: false }
        ms.quiz = { attempts: prev.attempts + 1, best: Math.max(prev.best, result.score), last: result, passed: prev.passed || result.passed }
        if (result.passed) ms.done.quiz = true
      }))
    },
    completeModule(moduleId) {
      setProgress((p) => update(p, moduleId, (ms) => { if (!ms.completedAt) ms.completedAt = new Date().toISOString() }))
    },
  }), [user, paid, owned, progress, view, go, notify, authorMode, admin, enter])

  if (!booted) return <div className="boot" aria-busy="true"><span className="boot-dot" /></div>

  let screen
  if (view.name === 'legal') screen = <TermsPage key={view.page} page={view.page} />
  else if (view.name === 'newpass') screen = <AuthScreen mode="newpass" />
  else if (user && user.termsVersion !== TERMS_VERSION) screen = <AcceptTerms />
  else if (!user && !['landing', 'signup', 'signin', 'reset'].includes(view.name)) screen = <Landing />
  else if (view.name === 'contact' && user) screen = <ContactPage />
  else if (user && !paid && !['checkout', 'landing'].includes(view.name)) screen = <Checkout />
  else if (view.name === 'landing') screen = <Landing />
  else if (['signup', 'signin', 'reset'].includes(view.name)) screen = <AuthScreen mode={view.name} />
  else if (view.name === 'checkout') screen = <Checkout choice={view.choice} />
  else if (view.name === 'module' && modules[view.moduleId] && !owned.has(view.moduleId)) screen = <Checkout choice={view.moduleId} />
  else if (view.name === 'module' && modules[view.moduleId]) screen = <Player key={view.moduleId} module={modules[view.moduleId]} initialStep={view.stepId} />
  else if (view.name === 'certificate') screen = <CertificatePage />
  else if (view.name === 'practice') screen = <PracticeStudio />
  else if (view.name === 'admin' && admin) screen = <AdminPage />
  else screen = <Dashboard />

  return (
    <Ctx.Provider value={api}>
      <div className={authorMode ? 'author-mode' : ''}>
        <Topbar />
        <main>{screen}</main>
        {view.name !== 'landing' && (
          <footer className="wrap site-footer small muted">
            © {new Date().getFullYear()} {course.org} · <LegalLinks />
          </footer>
        )}
        <CoachLauncher />
        {toast && <div className="toast fade-in" role="status">{toast}</div>}
      </div>
    </Ctx.Provider>
  )
}
