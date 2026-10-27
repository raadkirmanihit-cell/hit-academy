// The one place the app talks to "the server".
//
// PREVIEW MODE (this file): accounts, purchases and progress live in the learner's
// browser. Nothing is sent anywhere and no payment is taken.
//
// PRODUCTION: replace the three objects below with real calls, keeping the same
// function signatures, e.g.
//   auth      -> Supabase Auth / Clerk / Auth0 (email + password, magic link)
//   billing   -> Stripe Checkout (redirect) + a webhook that records the purchase
//   progress  -> a `progress` table keyed by user id (JSON column is enough)
// The UI only depends on these signatures, so no screen needs to change.
import { readJSON, writeJSON, remove } from './storage.js'

const K = { session: 'hit.session', users: 'hit.users', progress: (id) => `hit.progress.${id}` }
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function newId() {
  return 'u_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export const auth = {
  current() {
    const s = readJSON(K.session)
    if (!s) return null
    const users = readJSON(K.users, {})
    return users[s.email] ?? null
  },
  async signUp({ name, email }) {
    await wait(250)
    email = email.trim().toLowerCase()
    const users = readJSON(K.users, {})
    if (users[email]) throw new Error('An account with this email already exists. Sign in instead.')
    // Preview mode never stores passwords. A real auth provider handles them.
    const user = { id: newId(), name: name.trim(), email, createdAt: new Date().toISOString(), purchases: [] }
    users[email] = user
    writeJSON(K.users, users)
    writeJSON(K.session, { email })
    return user
  },
  async signIn({ email }) {
    await wait(250)
    email = email.trim().toLowerCase()
    const users = readJSON(K.users, {})
    if (!users[email]) throw new Error('No account found for this email in this browser. Create one first.')
    writeJSON(K.session, { email })
    return users[email]
  },
  signOut() { remove(K.session) },
  update(user) {
    const users = readJSON(K.users, {})
    users[user.email] = user
    writeJSON(K.users, users)
    return user
  },
}

export const billing = {
  hasAccess(user, productId) {
    return !!user?.purchases?.some((p) => p.productId === productId && p.status === 'paid')
  },
  // Production: create a Stripe Checkout Session on the server and redirect.
  // On return, the webhook has already recorded the purchase; just reload the user.
  async startCheckout(user, product) {
    await wait(900)
    const purchase = {
      id: 'demo_' + Date.now().toString(36), productId: product.id, amount: product.price,
      currency: product.currency, status: 'paid', paidAt: new Date().toISOString(), mode: 'preview',
    }
    const updated = { ...user, purchases: [...(user.purchases || []), purchase] }
    auth.update(updated)
    return updated
  },
}

export const progressStore = {
  load(userId) { return readJSON(K.progress(userId), null) },
  save(userId, data) { writeJSON(K.progress(userId), data) },
  reset(userId) { remove(K.progress(userId)) },
}
