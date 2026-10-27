// PREVIEW backend: accounts, purchases and progress live in the learner's browser.
// Nothing is sent anywhere and no payment is taken. Used when the Supabase settings are absent
// (the claude.ai preview and local development).
import { readJSON, writeJSON, remove } from './storage.js'

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
  async signUp({ name, email }) {
    await wait(250)
    email = email.trim().toLowerCase()
    if (readJSON(K.users, {})[email]) throw new Error('An account with this email already exists. Sign in instead.')
    // Preview mode never stores passwords.
    const user = save({ id: newId(), name: name.trim(), email, createdAt: new Date().toISOString(), purchases: [] })
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
  async requestPasswordReset() { await wait(400) },
  async setNewPassword() { await wait(300) },
  async refreshUser() { return current() },
  hasAccess(user, productId) {
    return !!user?.purchases?.some((p) => p.productId === productId && p.status === 'paid')
  },
  async startCheckout(user, product) {
    await wait(900)
    const purchase = {
      id: 'demo_' + Date.now().toString(36), productId: product.id, amount: product.price,
      currency: product.currency, status: 'paid', paidAt: new Date().toISOString(), mode: 'preview',
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
}
