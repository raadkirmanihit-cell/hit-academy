// Shared helpers for the server functions in /api (files starting with _ are not routes).
import { createClient } from '@supabase/supabase-js'
import { BUNDLE_ID, COURSE_PRODUCT_IDS, LAUNCH_BUYERS, BUNDLE_COACH_MONTHS, BUNDLE_PRACTICE_MESSAGES, TOPUP_ID, TOPUP_MESSAGES, PAID_MODULES, moduleProductId, ARENA_ID, ARENA_TOKENS } from '../src/content/pricing.js'

export const PRODUCT_ID = BUNDLE_ID // the complete course (all 7 modules); single modules are hit-negotiation-m1…m7

// Small business (§ 19 UStG): every invoice must say why no VAT is shown.
export const INVOICE_FOOTER = 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. / No VAT is charged under § 19 UStG (small business exemption).'

// The student's Stripe customer, with the § 19 footer saved on it, so every invoice Stripe creates
// for them (including each monthly coach renewal) carries the footer.
export async function stripeCustomerFor(stripe, user, existingId) {
  const invoice_settings = { footer: INVOICE_FOOTER }
  if (existingId) { await stripe.customers.update(existingId, { invoice_settings }); return existingId }
  const found = (await stripe.customers.list({ email: user.email, limit: 10 })).data
  const mine = found.find((c) => c.metadata?.user_id === user.id) || found[0]
  if (mine) { await stripe.customers.update(mine.id, { invoice_settings, metadata: { user_id: user.id } }); return mine.id }
  const c = await stripe.customers.create({ email: user.email, name: user.user_metadata?.name || undefined, metadata: { user_id: user.id }, invoice_settings })
  return c.id
}

export function env(name, required = true) {
  const v = process.env[name]
  if (required && !v) throw Object.assign(new Error(`Server setting ${name} is missing.`), { status: 500 })
  return v
}

let admin
// Supabase with the service role: bypasses row security, so use it only on the server.
export function db() {
  admin ||= createClient(env('VITE_SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return admin
}

// The signed-in student, from the "Authorization: Bearer <token>" header.
export async function requireUser(req) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) throw Object.assign(new Error('Please sign in.'), { status: 401 })
  const { data, error } = await db().auth.getUser(token)
  if (error || !data?.user) throw Object.assign(new Error('Please sign in again.'), { status: 401 })
  return data.user
}

// The student's paid course purchases, as [{ productId, status }] (the shape pricing.js expects).
export async function coursePurchases(userId) {
  // The Arena is included too: it counts towards the complete-course upgrade price.
  const { data, error } = await db().from('purchases').select('product_id, status').eq('user_id', userId).eq('status', 'paid').in('product_id', [...COURSE_PRODUCT_IDS, ARENA_ID])
  if (error) throw error
  return (data || []).map((p) => ({ productId: p.product_id, status: p.status }))
}

// Bought the complete course or at least one module.
export async function hasPaid(userId) {
  return (await coursePurchases(userId)).some((p) => p.productId !== ARENA_ID)
}

export function isAdmin(user) {
  const list = (process.env.ADMIN_EMAILS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  return !!user?.email && list.includes(user.email.toLowerCase())
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const c of req) chunks.push(c)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

export function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `https://${host}`
}

export function fail(res, err) {
  const status = err.status || 500
  if (status >= 500) console.error(err)
  res.status(status).json({ error: status >= 500 ? 'Something went wrong on our side. Please try again.' : err.message })
}

// Sends an email through Resend, if it is set up. Never blocks the main action.
export async function sendEmail(to, subject, lines, { replyTo } = {}) {
  const key = process.env.RESEND_API_KEY
  if (!key || !to) return
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || 'H.I.T. Academy <onboarding@resend.dev>',
        to: (Array.isArray(to) ? to : String(to).split(',')).map((s) => s.trim()).filter(Boolean),
        subject,
        text: lines.join('\n'),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!r.ok) console.error('Email failed', r.status, await r.text())
  } catch (e) { console.error('Email failed', e) }
}

// Sends an email to Raad (NOTIFY_EMAIL).
export async function notifyOwner(subject, lines, opts) {
  return sendEmail(process.env.NOTIFY_EMAIL, subject, lines, opts)
}

// The AI coach months that used to come with the complete course (purchases before 1 November 2026;
// new buyers get the practice pack instead). Never replaces a paid subscription,
// and never charges anything: when they end, the student can choose to subscribe.
export async function grantBundleCoach(userId, { livemode = false } = {}) {
  const cur = await getCoachSubscription(userId)
  if (cur && ['active', 'trialing', 'past_due'].includes(cur.status)) return null
  if (cur?.status === 'included' && new Date(cur.current_period_end) > Date.now()) return null // already granted (Stripe may send the same event twice)
  const now = new Date()
  const row = {
    user_id: userId,
    status: 'included',
    stripe_subscription_id: null,
    current_period_start: now.toISOString(),
    current_period_end: new Date(now.getTime() + BUNDLE_COACH_MONTHS * MONTH).toISOString(),
    cancel_at_period_end: true,
    started_at: now.toISOString(),
    amount: 0,
    currency: 'eur',
    livemode: !!livemode,
    updated_at: now.toISOString(),
    ...(cur?.stripe_customer_id ? {} : { stripe_customer_id: null }),
  }
  const { error } = await db().from('coach_subscriptions').upsert(row, { onConflict: 'user_id' })
  if (error && !missingTable(error)) throw error
  return row
}

// Launch price for the complete course: on for the first LAUNCH_BUYERS real package sales,
// and (if LAUNCH_PRICE_UNTIL is set, e.g. 2026-12-31) until that date.
export async function launchStatus() {
  const until = process.env.LAUNCH_PRICE_UNTIL ? new Date(`${process.env.LAUNCH_PRICE_UNTIL}T23:59:59Z`) : null
  if (process.env.LAUNCH_PRICE === 'off' || (until && until < new Date())) return { launch: false }
  const { count, error } = await db().from('purchases').select('id', { count: 'exact', head: true })
    .eq('product_id', BUNDLE_ID).eq('status', 'paid').eq('livemode', true)
  const sold = error ? 0 : count || 0
  if (sold >= LAUNCH_BUYERS) return { launch: false }
  return { launch: true, left: LAUNCH_BUYERS - sold, until: until ? until.toISOString() : null }
}

// Marks a purchase refunded (works before and after database update 2).
// Refunding the complete course also ends the coach months that came with it.
export async function markRefunded(sessionId) {
  const { data: p } = await db().from('purchases').select('user_id, product_id').eq('stripe_session_id', sessionId).maybeSingle()
  if (p?.product_id === BUNDLE_ID) {
    await db().from('coach_subscriptions').update({ current_period_end: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('user_id', p.user_id).eq('status', 'included')
  }
  let { error } = await db().from('purchases').update({ status: 'refunded', refunded_at: new Date().toISOString() }).eq('stripe_session_id', sessionId)
  if (error && /column|schema cache/i.test(error.message || '')) ({ error } = await db().from('purchases').update({ status: 'refunded' }).eq('stripe_session_id', sessionId))
  if (error) throw error
}

export async function requireAdmin(req) {
  const user = await requireUser(req)
  if (!isAdmin(user)) throw Object.assign(new Error('Admins only.'), { status: 403 })
  return user
}

// ---- AI coach subscription -------------------------------------------------

export const COACH_PRICE_CENTS = 2100 // €21 a month (used when STRIPE_COACH_PRICE_ID isn't set)
export const COACH_TASTER = Number(process.env.COACH_TASTER || 10) // free HIT Mentor messages for every account (coach only)
export const ARENA_FREE_TOKENS = Number(process.env.ARENA_FREE_TOKENS || 0) // free Arena tokens for every account (off: the Arena is paid)
export const COACH_MONTHLY_LIMIT = Number(process.env.COACH_MONTHLY_LIMIT || 300) // fair use per month
// past_due: Stripe is still retrying a failed renewal, so access stays on until it gives up.
// included: the coach months that come with the complete course (no Stripe subscription).
const ACTIVE = new Set(['active', 'trialing', 'past_due', 'included'])
const MONTH = 30 * 864e5

const dayOf = (d) => new Date(d).toISOString().slice(0, 10)
const missingTable = (e) => /relation|schema cache|does not exist|column/i.test(e?.message || '')

export async function getCoachSubscription(userId) {
  const { data, error } = await db().from('coach_subscriptions').select('*').eq('user_id', userId).maybeSingle()
  if (error && missingTable(error)) return null // database update 4 not run yet
  if (error) throw error
  return data
}

// Arena tokens: every batch (free starter, course pack, each extra pack) lasts ARENA_TOKEN_DAYS
// from the day it was received. Tokens are spent oldest batch first, so the ones that run out
// soonest go first. Usage is recorded per day (practice_usage), so a day's tokens come out of
// the batches that were valid on that day.
export const ARENA_TOKEN_DAYS = 365
export function arenaBalance(batches, usage, now = Date.now()) {
  const list = batches
    .map((b) => ({ ...b, from: dayOf(b.at), until: new Date(new Date(b.at).getTime() + ARENA_TOKEN_DAYS * 864e5), left: b.tokens }))
    .sort((a, b) => a.until - b.until)
  for (const u of [...usage].sort((a, b) => (a.day < b.day ? -1 : 1))) {
    let n = u.count
    for (const b of list) {
      if (n <= 0) break
      if (b.left <= 0 || b.from > u.day || dayOf(b.until) <= u.day) continue
      const take = Math.min(n, b.left); b.left -= take; n -= take
    }
  }
  const live = list.filter((b) => b.until > now)
  const total = live.reduce((t, b) => t + b.tokens, 0)
  const left = live.reduce((t, b) => t + b.left, 0)
  const next = live.find((b) => b.left > 0)
  return { total, left, used: total - left, expires: next ? next.until.toISOString() : null, expiresLeft: next ? next.left : 0 }
}

// What the student may do right now with the coach (messages) and the Arena (tokens).
// The two are never pooled: coach messages can't be spent in the Arena, Arena tokens can't be spent on the coach.
// user: the signed-in user (its created_at starts the free Arena tokens), or just the id.
export async function coachAccess(user) {
  const userId = typeof user === 'string' ? user : user.id
  const sub = await getCoachSubscription(userId)
  // A paid subscription gets 3 days' grace while Stripe confirms the renewal; included months end on the day.
  const grace = sub?.status === 'included' ? 0 : 3 * 864e5
  const subscribed = !!sub && ACTIVE.has(sub.status) && (!sub.current_period_end || new Date(sub.current_period_end) > Date.now() - grace)
  // The monthly allowance counts from the start of the current month of access
  // (the included coach months count as three separate months).
  let start = sub?.current_period_start ? new Date(sub.current_period_start).getTime() : Date.now() - MONTH
  if (sub?.status === 'included') start += Math.floor((Date.now() - start) / MONTH) * MONTH
  const since = subscribed ? dayOf(start) : '1970-01-01'
  const { data: used, error } = await db().rpc('coach_usage_since', { p_user: userId, p_since: since })
  // Before update 4 the counter function is missing: count nothing, so nobody is locked out by mistake.
  const count = error ? 0 : used || 0

  // Arena tokens, batch by batch (refunded purchases no longer count).
  const { data: bought } = await db().from('purchases').select('product_id, created_at').eq('user_id', userId).eq('status', 'paid')
  const rows = bought || []
  const batches = []
  const joined = (typeof user === 'object' && user.created_at) || rows.map((p) => p.created_at).sort()[0] || new Date().toISOString()
  if (ARENA_FREE_TOKENS > 0) batches.push({ kind: 'free', tokens: ARENA_FREE_TOKENS, at: joined })
  const bundle = rows.filter((p) => p.product_id === BUNDLE_ID).map((p) => p.created_at).sort()[0]
  // Students who bought all seven modules one by one get the same pack (from the day they owned all seven),
  // so everyone can earn the certificate.
  const singles = PAID_MODULES.map((m) => rows.filter((p) => p.product_id === moduleProductId(m)).map((p) => p.created_at).sort()[0])
  const allSingles = singles.every(Boolean) ? singles.sort().at(-1) : null
  const coursePack = bundle || allSingles
  if (coursePack) batches.push({ kind: 'course', tokens: BUNDLE_PRACTICE_MESSAGES, at: coursePack })
  // The Arena bought on its own (not again if the complete course already gave the tokens).
  const arenaBuy = rows.filter((p) => p.product_id === ARENA_ID).map((p) => p.created_at).sort()[0]
  if (arenaBuy && !coursePack) batches.push({ kind: 'arena', tokens: ARENA_TOKENS, at: arenaBuy })
  const arenaAccess = !!(coursePack || arenaBuy)
  const topupRows = rows.filter((p) => p.product_id === TOPUP_ID)
  for (const p of topupRows) batches.push({ kind: 'pack', tokens: TOPUP_MESSAGES, at: p.created_at })
  const { data: usage, error: ue } = await db().from('practice_usage').select('day, count').eq('user_id', userId)
  const arena = arenaBalance(batches, ue ? [] : usage || []) // before update 5 the table is missing: count nothing

  return {
    subscribed,
    topups: topupRows.length,
    // Arena: access (bought or included) and tokens
    arenaAccess,
    arenaTokens: arena.total,
    arenaUsed: arena.used,
    arenaLeft: arena.left,
    arenaExpires: arena.expires, // when the oldest tokens still left run out
    arenaExpiresLeft: arena.expiresLeft, // how many tokens run out on that day
    // Coach messages
    status: sub?.status || 'none',
    periodEnd: sub?.current_period_end || null,
    cancelAtPeriodEnd: !!sub?.cancel_at_period_end,
    included: sub?.status === 'included',
    hasCustomer: !!sub?.stripe_customer_id,
    used: count,
    limit: subscribed ? COACH_MONTHLY_LIMIT : COACH_TASTER,
    left: Math.max(0, (subscribed ? COACH_MONTHLY_LIMIT : COACH_TASTER) - count),
    price: COACH_PRICE_CENTS,
  }
}

// Saves a Stripe subscription object on the student's row.
export async function saveSubscription(sub, { userId, consentAt } = {}) {
  const item = sub.items?.data?.[0]
  const ts = (s) => (s ? new Date(s * 1000).toISOString() : null)
  // Newer Stripe API versions keep the billing period on the item, older ones on the subscription.
  const start = item?.current_period_start ?? sub.current_period_start
  const end = item?.current_period_end ?? sub.current_period_end
  const uid = userId || sub.metadata?.user_id
  if (!uid) { console.error('HIT Mentor subscription without user id', sub.id); return null }
  const row = {
    user_id: uid,
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id,
    stripe_subscription_id: sub.id,
    status: sub.status,
    amount: item?.price?.unit_amount ?? null,
    currency: item?.price?.currency ?? sub.currency ?? null,
    current_period_start: ts(start),
    current_period_end: ts(end),
    cancel_at_period_end: !!sub.cancel_at_period_end || !!sub.cancel_at,
    canceled_at: ts(sub.canceled_at),
    started_at: ts(sub.start_date),
    livemode: !!sub.livemode,
    updated_at: new Date().toISOString(),
    ...(consentAt || sub.metadata?.consent_at ? { consent_at: consentAt || sub.metadata.consent_at } : {}),
  }
  const { error } = await db().from('coach_subscriptions').upsert(row, { onConflict: 'user_id' })
  // The account was deleted (Stripe tells us about the cancellation afterwards): nothing to keep.
  if (error?.code === '23503') { console.warn('HIT Mentor subscription for a deleted account', sub.id); return null }
  if (error) throw error
  return row
}

export const COACH_DAILY_LIMIT = Number(process.env.COACH_DAILY_LIMIT || 80)

// Counts one AI message against the right allowance. Returns null when it may go ahead,
// or { status, body } to send back when the student has nothing left.
// practice: an Arena role-play turn or report, paid with one Arena token.
// Otherwise a coach answer, paid with one coach message. The two are never mixed.
export async function chargeCoach(user, { practice = false } = {}) {
  const userId = typeof user === 'string' ? user : user.id
  const access = await coachAccess(user)
  let count, error
  if (practice) {
    if (!access.arenaAccess) return { status: 402, body: { error: 'The Arena comes with the complete course, or you can unlock it on its own.', code: 'needs_arena' } }
    if (access.arenaLeft <= 0) return { status: 402, body: { error: `You have no Arena tokens left. Buy ${TOPUP_MESSAGES} more to keep practising.`, code: 'needs_tokens' } }
    ;({ data: count, error } = await db().rpc('bump_practice_usage', { p_user: userId }))
  } else {
    if (access.left <= 0) return access.subscribed
      ? { status: 429, body: { error: `You have used this month's ${access.limit} HIT Mentor messages. ${access.periodEnd ? `They renew on ${new Date(access.periodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.` : 'They renew with your next monthly payment.'}`, code: 'monthly_limit' } }
      : { status: 402, body: { error: 'Your free HIT Mentor messages are used up. Subscribe to keep using HIT Mentor.', code: 'needs_subscription' } }
    ;({ data: count, error } = await db().rpc('bump_coach_usage', { p_user: userId }))
  }
  if (error) throw error
  if (count > COACH_DAILY_LIMIT) return { status: 429, body: { error: 'You have reached today\'s AI limit. It resets at midnight.', code: 'rate_limited' } }
  return null
}

// Gives back the message chargeCoach just counted, when the reply could not be finished
// (cut off, AI error, or the connection dropped). Best effort: a failure here only logs.
export async function refundCoach(user, { practice = false } = {}) {
  const userId = typeof user === 'string' ? user : user.id
  const table = practice ? 'practice_usage' : 'coach_usage'
  const day = new Date().toISOString().slice(0, 10)
  try {
    const { data, error } = await db().from(table).select('count').eq('user_id', userId).eq('day', day).maybeSingle()
    if (error) throw error
    if (!data || data.count <= 0) return
    const { error: ue } = await db().from(table).update({ count: data.count - 1 }).eq('user_id', userId).eq('day', day).eq('count', data.count)
    if (ue) throw ue
  } catch (e) { console.error('refundCoach', e) }
}
