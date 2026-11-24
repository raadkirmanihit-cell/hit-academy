// PREVIEW backend: accounts, purchases and progress live in the learner's browser.
// Nothing is sent anywhere and no payment is taken. Used when the Supabase settings are absent
// (the claude.ai preview and local development).
import { quote, CURRENCY } from '../content/pricing.js'
import { readJSON, writeJSON, remove } from './storage.js'
import { TERMS_VERSION } from '../content/terms.js'
import { previewForum } from './forum.preview.js'
import { checkReview, shortName, summary } from '../content/reviews.js'

const K = { session: 'hit.session', users: 'hit.users', progress: (id) => `hit.progress.${id}` }
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const newId = () => 'u_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

function current() {
  const s = readJSON(K.session)
  if (!s) return null
  return readJSON(K.users, {})[s.email] ?? null
}
function save(user) {
  const users = readJSON(K.users, {})
  users[user.email] = user
  writeJSON(K.users, users)
  return user
}

export const previewBackend = {
  mode: 'preview',
  async init() { return current() },
  onRecovery() {},
  async signUp({ name, email, acceptTerms }) {
    await wait(250)
    email = email.trim().toLowerCase()
    if (readJSON(K.users, {})[email]) throw new Error('An account with this email already exists. Sign in instead.')
    // Preview mode never stores passwords.
    const user = save({ id: newId(), name: name.trim(), email, createdAt: new Date().toISOString(), purchases: [], ...(acceptTerms ? { termsVersion: TERMS_VERSION, termsAcceptedAt: new Date().toISOString() } : {}) })
    writeJSON(K.session, { email })
    return user
  },
  async signIn({ email }) {
    await wait(250)
    email = email.trim().toLowerCase()
    const user = readJSON(K.users, {})[email]
    if (!user) throw new Error('No account found for this email in this browser. Create one first.')
    writeJSON(K.session, { email })
    return user
  },
  async signOut() { remove(K.session) },
  takeAuthError() { return null },
  // The preview shows the buttons so the page can be checked, but cannot reach Google or Facebook.
  async socialProviders() { return ['google', 'facebook'] },
  async signInWithProvider(provider) {
    await wait(200)
    throw new Error(`${provider === 'google' ? 'Google' : 'Facebook'} sign-in works on the live site only. Use your email in this preview.`)
  },
  async requestPasswordReset() { await wait(400) },
  async setNewPassword() { await wait(300) },
  async refreshUser() { return current() },
  async acceptTerms(user) {
    return save({ ...current(), termsVersion: TERMS_VERSION, termsAcceptedAt: new Date().toISOString() })
  },
  hasAccess(user, productId) {
    return !!user?.purchases?.some((p) => p.productId === productId && p.status === 'paid')
  },
  async startCheckout(user, choice) {
    await wait(900)
    const q = quote(choice, user.purchases)
    if (q.error) throw new Error(q.error)
    const purchase = {
      id: 'demo_' + Date.now().toString(36), productId: q.productId, amount: q.cents / 100,
      currency: CURRENCY, status: 'paid', paidAt: new Date().toISOString(), mode: 'preview',
    }
    return save({ ...user, purchases: [...(user.purchases || []), purchase] })
  },
  async loadProgress(userId) { return readJSON(K.progress(userId), null) },
  async saveProgress(userId, data) { writeJSON(K.progress(userId), data) },
  async resetProgress(userId) { remove(K.progress(userId)) },
  async getToken() { return null },
  async isAdmin() { return false },
  async listStudents() { return [] },
  async adminData() { return { students: [], payments: [], messages: [], messagesReady: true } },
  async adminAction() { await wait(300); return { ok: true } },
  async sendMessage() { await wait(500); return { ok: true } },
  // Community forum, kept in this browser (members = anyone who bought something in the preview).
  async forum(params) { await wait(150); return previewForum.read(current(), params) },
  async forumAction(action, payload) { await wait(200); return previewForum.act(current(), action, payload) },
  // Course reviews, kept in this browser. The preview user may also approve them, to try the flow.
  async reviews({ mine, admin } = {}) {
    await wait(120)
    const all = readJSON('hit.reviews', [])
    const u = current()
    if (admin) return { ready: true, reviews: all, ...summary(all) }
    if (mine) return { ready: true, canReview: !!u?.purchases?.length, mine: all.find((r) => r.userId === u?.id) || null }
    const pub = all.filter((r) => r.status === 'published')
    return { reviews: pub, ...summary(all) }
  },
  async reviewAction(action, { rating, body, id, reason, topic } = {}) {
    await wait(200)
    const all = readJSON('hit.reviews', [])
    const u = current()
    if (action === 'submit') {
      const problem = checkReview(Number(rating), body)
      if (problem) throw new Error(problem)
      const rest = all.filter((r) => r.userId !== u.id)
      writeJSON('hit.reviews', [{ id: 'r_' + Date.now().toString(36), userId: u.id, name: shortName(u.name), rating: Number(rating), topic: topic || 'course', body: String(body || '').trim(), status: String(body || '').trim() ? 'pending' : 'published', at: new Date().toISOString(), email: u.email }, ...rest])
    } else if (action === 'publish' || action === 'reject') {
      writeJSON('hit.reviews', all.map((r) => (r.id === id ? { ...r, status: action === 'publish' ? 'published' : 'rejected', rejectReason: reason || null } : r)))
    }
    return { ok: true }
  },
  // The preview has no payments: the coach is simply open.
  async launchStatus() { return { launch: true, left: 100, until: null } },
  async coachPlan() { return { paid: true, subscribed: true, preview: true, left: Infinity } },
  async subscribeCoach() { await wait(300); return { alreadySubscribed: true } },
  async coachPortal() { await wait(300) },
  // The preview has no server: keep the ratings in this browser so the flow can be tried.
  async coachFeedback({ rating, reason, version }) { const k = 'hit.coach.feedback'; try { const l = JSON.parse(localStorage.getItem(k) || '[]'); l.push({ rating, reason, version, at: new Date().toISOString() }); localStorage.setItem(k, JSON.stringify(l)) } catch { /* storage blocked */ } },
}
