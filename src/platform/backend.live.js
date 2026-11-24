// LIVE backend: Supabase for accounts and progress, Stripe (through /api/checkout) for payment.
import { createClient } from '@supabase/supabase-js'
import { TERMS_VERSION } from '../content/terms.js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
let sb
let recovering = false // set when the student arrives from a "reset your password" email
const recoveryListeners = new Set()
// Sign-in with Google or Facebook leaves the site and comes back; these notes survive the trip.
const OAUTH_KEY = 'hit.oauth' // a social sign-in is under way
const OAUTH_TERMS_KEY = 'hit.oauthTerms' // the Terms box was ticked on the sign-up page before leaving
const SOCIAL = ['google', 'facebook']
let socialError = null // message to show after a failed or cancelled social sign-in
const ss = {
  get(k) { try { return window.sessionStorage.getItem(k) } catch { return null } },
  set(k, v) { try { window.sessionStorage.setItem(k, v) } catch { /* private mode */ } },
  del(k) { try { window.sessionStorage.removeItem(k) } catch { /* private mode */ } },
}
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
  if (/provider is not enabled|unsupported provider/i.test(m)) return 'This sign-in option is not available yet. Please use your email instead.'
  if (/email.*(external provider|missing)|getting user email/i.test(m)) return 'We could not get your email address from that account. Please allow access to your email, or sign up with your email instead.'
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
    callName: authUser.user_metadata?.call_name || '', // "what should we call you?" (optional)
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
    // A cancelled or failed Google/Facebook sign-in comes back with ?error=… or #error=….
    const back = new URLSearchParams(window.location.search + '&' + window.location.hash.replace(/^#/, ''))
    const socialTrip = !!ss.get(OAUTH_KEY)
    if (socialTrip && back.get('error')) {
      socialError = back.get('error') === 'access_denied' && !/email/i.test(back.get('error_description') || '')
        ? 'Sign-in was cancelled. You can try again or use your email instead.'
        : friendly({ message: back.get('error_description') || back.get('error') })
    }
    // Wait for the client to read a login from an email link or a social sign-in (?code=… or #access_token=…).
    await sbc.auth.initialize?.()
    const { data } = await sbc.auth.getSession()
    let authUser = data.session?.user
    if (socialTrip) {
      const tickedTerms = ss.get(OAUTH_TERMS_KEY)
      ss.del(OAUTH_KEY); ss.del(OAUTH_TERMS_KEY)
      if (authUser) {
        // They ticked the Terms box on the sign-up page before going to Google/Facebook: record it now.
        const profile = await loadUser(authUser)
        if (tickedTerms === TERMS_VERSION && profile.termsVersion !== TERMS_VERSION) {
          await this.acceptTerms().catch(() => {})
          authUser = (await sbc.auth.getUser()).data.user || authUser
        }
        api('/api/notify-signup', {}).catch(() => {}) // tells Raad about brand-new accounts only
      }
    }
    return loadUser(authUser)
  },
  // The error from a social sign-in that just came back, once.
  takeAuthError() { const e = socialError; socialError = null; return e },
  // Which social sign-in buttons to show: only the providers switched on in Supabase.
  async socialProviders() {
    try {
      const r = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } })
      const s = await r.json()
      return SOCIAL.filter((p) => s?.external?.[p])
    } catch { return [] }
  },
  // Leaves for Google or Facebook; they send the student back to this site, signed in.
  async signInWithProvider(provider, { acceptTerms } = {}) {
    if (!SOCIAL.includes(provider)) throw new Error('Unknown sign-in option.')
    ss.set(OAUTH_KEY, provider)
    if (acceptTerms) ss.set(OAUTH_TERMS_KEY, TERMS_VERSION); else ss.del(OAUTH_TERMS_KEY)
    const { error } = await client().auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin, ...(provider === 'facebook' ? { scopes: 'email' } : {}) },
    })
    if (error) { ss.del(OAUTH_KEY); ss.del(OAUTH_TERMS_KEY); throw new Error(friendly(error)) }
    return new Promise(() => {}) // the page is leaving
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
  // name: full name for the certificate. callName: what greetings call them (blank = first word of name).
  async updateName(name, callName = '') {
    name = name.trim().replace(/\s+/g, ' ')
    callName = callName.trim().replace(/\s+/g, ' ')
    if (name.length < 2) throw new Error('Enter your full name.')
    const sbc = client()
    const { data: { user } } = await sbc.auth.getUser()
    const { error } = await sbc.from('profiles').update({ name }).eq('id', user.id)
    const { error: e2 } = await sbc.auth.updateUser({ data: { name, call_name: callName } })
    if (error && e2) throw new Error(friendly(error))
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
  // AI coach chats and profile (database update 11). Errors (e.g. update not run yet) go to the caller,
  // which then keeps them in the browser instead (src/coach/store.js).
  async coachChats(userId) {
    const { data, error } = await client().from('coach_chats').select('id, title, kind, parent_id, messages, prep, created_at, updated_at').eq('user_id', userId).order('updated_at', { ascending: false }).limit(100)
    if (error) throw error
    return (data || []).map((c) => ({ id: c.id, title: c.title, kind: c.kind, parentId: c.parent_id, messages: c.messages || [], prep: c.prep || null, createdAt: c.created_at, updatedAt: c.updated_at }))
  },
  async saveCoachChat(userId, c) {
    const { error } = await client().from('coach_chats').upsert({ id: c.id, user_id: userId, title: c.title, kind: c.kind || 'coach', parent_id: c.parentId || null, messages: c.messages, prep: c.prep || null, created_at: c.createdAt, updated_at: c.updatedAt })
    if (error) throw error
  },
  async deleteCoachChat(userId, id) {
    const { error } = await client().from('coach_chats').delete().eq('user_id', userId).eq('id', id)
    if (error) throw error
  },
  async coachProfile(userId) {
    const { data, error } = await client().from('coach_profiles').select('data').eq('user_id', userId).maybeSingle()
    if (error) throw error
    return data?.data || null
  },
  async saveCoachProfile(userId, data) {
    const { error } = await client().from('coach_profiles').upsert({ user_id: userId, data, updated_at: new Date().toISOString() })
    if (error) throw error
  },
  // A thumbs up or down on a coach plan (anonymous analysis on the server, src/coach/feedback.js).
  async coachFeedback(payload) { return api('/api/coach', { action: 'feedback', ...payload }) },
  async isAdmin() { return !!(await api('/api/admin-students?check=1')).admin },
  async listStudents() { return (await api('/api/admin-students')).students },
  async adminData() { return api('/api/admin-students') },
  async adminAction(action, payload = {}) { return api('/api/admin-action', { action, ...payload }) },
  async sendMessage({ subject, body }) { return api('/api/message', { subject, body }) },
  // Community forum: { thread } reads one conversation, { category } a list, { admin: true } the moderation view.
  async forum({ thread, category, admin } = {}) {
    const q = admin ? '?admin=1' : thread ? `?thread=${encodeURIComponent(thread)}` : category ? `?category=${encodeURIComponent(category)}` : ''
    return api('/api/forum' + q)
  },
  async forumAction(action, payload = {}) { return api('/api/forum', { action, ...payload }) },
  // Course reviews: {} the published list (public), { mine: true } the student's own, { admin: true } all for Raad.
  async reviews({ mine, admin } = {}) { return api('/api/reviews' + (admin ? '?admin=1' : mine ? '?mine=1' : '')) },
  async reviewAction(action, payload = {}) { return api('/api/reviews', { action, ...payload }) },
  // AI coach subscription: status, Stripe Checkout to subscribe, Stripe's page to cancel or change the card.
  async coachPlan() { return api('/api/coach-plan') },
  // Whether the €144 launch price for the complete course is still on.
  async launchStatus() { return api('/api/checkout') },
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
