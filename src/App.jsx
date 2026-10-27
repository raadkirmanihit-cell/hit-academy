import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { course } from './content/course.js'
import { modules } from './content/index.js'
import { auth, billing, progressStore } from './platform/backend.js'
import { emptyProgress, update } from './platform/progress.js'
import Topbar from './ui/Topbar.jsx'
import Landing from './ui/Landing.jsx'
import AuthScreen from './ui/Auth.jsx'
import Checkout from './ui/Checkout.jsx'
import Dashboard from './ui/Dashboard.jsx'
import Player from './ui/Player.jsx'
import CertificatePage from './ui/Certificate.jsx'
import { CoachLauncher, PracticeStudio } from './coach/Coach.jsx'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export default function App() {
  const [user, setUser] = useState(() => auth.current())
  const [progress, setProgress] = useState(() => (user && progressStore.load(user.id)) || emptyProgress())
  const paid = billing.hasAccess(user, course.product.id)
  const [view, setView] = useState(() => (user ? (paid ? { name: 'dashboard' } : { name: 'checkout' }) : { name: 'landing' }))
  const [toast, setToast] = useState(null)
  const [authorMode, setAuthorMode] = useState(false)
  const toastTimer = useRef()

  // Persist progress whenever it changes (debounced).
  const saveTimer = useRef()
  useEffect(() => {
    if (!user) return
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => progressStore.save(user.id, progress), 250)
    return () => clearTimeout(saveTimer.current)
  }, [progress, user])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [view.name, view.moduleId])

  const notify = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  const go = useCallback((name, extra = {}) => setView({ name, ...extra }), [])

  const api = useMemo(() => ({
    course, modules, user, paid, progress, view, go, notify, authorMode, setAuthorMode,
    async signUp(data) {
      const u = await auth.signUp(data)
      setUser(u); setProgress(progressStore.load(u.id) || emptyProgress())
      go('checkout')
    },
    async signIn(data) {
      const u = await auth.signIn(data)
      setUser(u); setProgress(progressStore.load(u.id) || emptyProgress())
      go(billing.hasAccess(u, course.product.id) ? 'dashboard' : 'checkout')
    },
    signOut() { auth.signOut(); setUser(null); setProgress(emptyProgress()); go('landing') },
    async purchase() {
      const u = await billing.startCheckout(user, course.product)
      setUser(u); go('dashboard', { welcome: true })
    },
    resetProgress() { if (user) progressStore.reset(user.id); setProgress(emptyProgress()); notify('Progress reset'); go('dashboard') },
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
  }), [user, paid, progress, view, go, notify, authorMode])

  let screen
  if (!user && !['landing', 'signup', 'signin'].includes(view.name)) screen = <Landing />
  else if (user && !paid && !['checkout', 'landing'].includes(view.name)) screen = <Checkout />
  else if (view.name === 'landing') screen = <Landing />
  else if (view.name === 'signup' || view.name === 'signin') screen = <AuthScreen mode={view.name} />
  else if (view.name === 'checkout') screen = <Checkout />
  else if (view.name === 'module' && modules[view.moduleId]) screen = <Player key={view.moduleId} module={modules[view.moduleId]} initialStep={view.stepId} />
  else if (view.name === 'certificate') screen = <CertificatePage />
  else if (view.name === 'practice') screen = <PracticeStudio />
  else screen = <Dashboard />

  return (
    <Ctx.Provider value={api}>
      <div className={authorMode ? 'author-mode' : ''}>
        <Topbar />
        <main>{screen}</main>
        <CoachLauncher />
        {toast && <div className="toast fade-in" role="status">{toast}</div>}
      </div>
    </Ctx.Provider>
  )
}
