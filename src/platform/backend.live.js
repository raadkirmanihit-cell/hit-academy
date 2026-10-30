// LIVE backend: Supabase for accounts and progress, Stripe (through /api/checkout) for payment.
import { createClient } from '@supabase/supabase-js'
import { TERMS_VERSION } from '../content/terms.js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
let sb
let recovering = false // set when the student arrives from a "reset your password" email
const recoveryListeners = new Set()
function client() {
  if (!sb) {
    sb = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
    sb.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') { recovering = true; recoveryListeners.forEach((cb) => cb()) }
    })
  }
  return sb
}

const friendly = (error) => {
  const m = error?.message || ''
  if (/invalid login credentials/i.test(m)) return 'That email and password don\'t match. Try again, or reset your password.'
  if (/email not confirmed/i.test(m)) return 'Please confirm your email first: open the link we sent you, then sign in.'
  if (/already registered|already exists/i.test(m)) return 'An account with this email already exists. Sign in instead.'
  if (/rate limit|too many/i.test(m)) return 'Too many attempts. Please wait a minute and try again.'
  if (/password/i.test(m) && /weak|short|least/i.test(m)) return 'Please choose a stronger password (at least 8 characters).'
  return m || 'Something went wrong. Please try again.'
}

async function token() {
  const { data } = await client().auth.getSession()
  return data.session?.access_token || null
}

async function api(path, body) {
  const t = await token()
  const r = await fetch(path, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
  return data
}

// The app's user object: { id, name, email, purchases: [{ productId, status }] }
async function loadUser(authUser) {
  if (!authUser) return null
  const sbc = client()
  const [{ data: profile }, { data: purchases }] = await Promise.all([
    sbc.from('profiles').select('*').eq('id', authUser.id).maybeSingle(),
    sbc.from('purchases').select('product_id, status, amount, currency, created_at').eq('user_id', authUser.id),
  ])
  return {
    id: authUser.id,
    email: authUser.email,
    name: profile?.name || authUser.user_metadata?.name || '',
    createdAt: profile?.created_at || authUser.created_at,
    // Terms acceptance: from the database (update 3), else from the sign-up details.
    termsVersion: profile?.terms_version || authUser.user_metadata?.terms_version || null,
    termsAcceptedAt: profile?.terms_accepted_at || authUser.user_metadata?.terms_accepted_at || null,
    purchases: (purchases || []).map((p) => ({ productId: p.product_id, status: p.status, amount: p.amount, currency: p.currency, paidAt: p.created_at })),
  }
}

export const liveBackend = {
  mode: 'live',
  async init() {
    const sbc = client()
    // Wait for the client to read a login from an email link (?code=… or #access_token=…).
    await sbc.auth.initialize?.()
    const { data } = await sbc.auth.getSession()
    return loadUser(data.session?.user)
  },
  // Calls back when a student arrives from a "reset your password" email.
  onRecovery(cb) {
    client()
    if (recovering) setTimeout(cb)
    recoveryListeners.add(cb)
    return () => recoveryListeners.delete(cb)
  },
  async signUp({ name, email, password, acceptTerms }) {
    // The database stores the acceptance with its own clock when the account is created.
    const terms = acceptTerms ? { terms_version: TERMS_VERSION, terms_accepted_at: new Date().toISOString() } : {}
    const { data, error } = await client().auth.signUp({
      email: email.trim().toLowerCase(), password,
      options: { data: { name: name.trim(), ...terms }, emailRedirectTo: window.location.origin },
    })
    if (error) throw new Error(friendly(error))
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) throw new Error('An account with this email already exists. Sign in instead.')
    if (!data.session) throw Object.assign(new Error('confirm'), { code: 'confirm_email' })
    api('/api/notify-signup', {}).catch(() => {})
    return loadUser(data.user)
  },
  async signIn({ email, password }) {
    const { data, error } = await client().auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
    if (error) throw new Error(friendly(error))
    api('/api/notify-signup', {}).catch(() => {}) // first sign-in after confirming the email
    return loadUser(data.user)
  },
  async signOut() { await client().auth.signOut() },
  async requestPasswordReset(email) {
    const { error } = await client().auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: window.location.origin })
    if (error) throw new Error(friendly(error))
  },
  async setNewPassword(password) {
    const { error } = await client().auth.updateUser({ password })
    if (error) throw new Error(friendly(error))
  },
  // Records that a signed-in student accepted the current Terms (for accounts made before them).
  async acceptTerms() {
    const sbc = client()
    const { error } = await sbc.rpc('accept_terms', { p_version: TERMS_VERSION })
    // Before database update 3 is run, keep the record on the account itself.
    const { error: e2 } = await sbc.auth.updateUser({ data: { terms_version: TERMS_VERSION, terms_accepted_at: new Date().toISOString() } })
    if (error && e2) throw new Error(friendly(e2))
    return this.refreshUser()
  },
  async refreshUser() {
    const { data } = await client().auth.getUser()
    return loadUser(data.user)
  },
  hasAccess(user, productId) {
    return !!user?.purchases?.some((p) => p.productId === productId && p.status === 'paid')
  },
  // Sends the student to Stripe's payment page. They come back to /?checkout=success.
  // choice: 'bundle' (all 7 modules) or a module id like 'm3'.
  async startCheckout(user, choice, { waiver } = {}) {
    const r = await api('/api/checkout', { waiver: !!waiver, choice })
    window.location.assign(r.url)
    return new Promise(() => {}) // the page is leaving
  },
  async loadProgress(userId) {
    const { data } = await client().from('progress').select('data').eq('user_id', userId).maybeSingle()
    return data?.data && Object.keys(data.data).length ? data.data : null
  },
  async saveProgress(userId, data) {
    const { error } = await client().from('progress').upsert({ user_id: userId, data, updated_at: new Date().toISOString() })
    if (error) throw error
  },
  async resetProgress(userId) {
    await client().from('progress').upsert({ user_id: userId, data: {}, updated_at: new Date().toISOString() })
  },
  getToken: token,
  async isAdmin() { return !!(await api('/api/admin-students?check=1')).admin },
  async listStudents() { return (await api('/api/admin-students')).students },
  async adminData() { return api('/api/admin-students') },
  async adminAction(action, payload = {}) { return api('/api/admin-action', { action, ...payload }) },
  async sendMessage({ subject, body }) { return api('/api/message', { subject, body }) },
  // AI coach subscription: status, Stripe Checkout to subscribe, Stripe's page to cancel or change the card.
  async coachPlan() { return api('/api/coach-plan') },
  async subscribeCoach({ consent }) {
    const r = await api('/api/coach-plan', { action: 'subscribe', consent: !!consent })
    if (r.alreadySubscribed) return r
    window.location.assign(r.url)
    return new Promise(() => {}) // the page is leaving
  },
  async coachPortal() {
    const r = await api('/api/coach-plan', { action: 'portal' })
    window.location.assign(r.url)
    return new Promise(() => {})
  },
}
