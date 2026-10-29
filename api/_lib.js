// Shared helpers for the server functions in /api (files starting with _ are not routes).
import { createClient } from '@supabase/supabase-js'
import { BUNDLE_ID, COURSE_PRODUCT_IDS } from '../src/content/pricing.js'

export const PRODUCT_ID = BUNDLE_ID // the complete course (all 7 modules); single modules are hit-negotiation-m1…m7

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
  const { data, error } = await db().from('purchases').select('product_id, status').eq('user_id', userId).eq('status', 'paid').in('product_id', COURSE_PRODUCT_IDS)
  if (error) throw error
  return (data || []).map((p) => ({ productId: p.product_id, status: p.status }))
}

// Bought the complete course or at least one module.
export async function hasPaid(userId) {
  return (await coursePurchases(userId)).length > 0
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

// Sends an email to Raad through Resend, if it is set up. Never blocks the main action.
export async function notifyOwner(subject, lines, { replyTo } = {}) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL
  if (!key || !to) return
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || 'H.I.T. Academy <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()),
        subject,
        text: lines.join('\n'),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!r.ok) console.error('Notification email failed', r.status, await r.text())
  } catch (e) { console.error('Notification email failed', e) }
}

// Marks a purchase refunded (works before and after database update 2).
export async function markRefunded(sessionId) {
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

export const COACH_PRICE_CENTS = 1200 // €12 a month (used when STRIPE_COACH_PRICE_ID isn't set)
export const COACH_TASTER = Number(process.env.COACH_TASTER || 10) // free messages for course buyers
export const COACH_MONTHLY_LIMIT = Number(process.env.COACH_MONTHLY_LIMIT || 300) // fair use per billing month
// past_due: Stripe is still retrying a failed renewal, so access stays on until it gives up.
const ACTIVE = new Set(['active', 'trialing', 'past_due'])

const dayOf = (d) => new Date(d).toISOString().slice(0, 10)
const missingTable = (e) => /relation|schema cache|does not exist|column/i.test(e?.message || '')

export async function getCoachSubscription(userId) {
  const { data, error } = await db().from('coach_subscriptions').select('*').eq('user_id', userId).maybeSingle()
  if (error && missingTable(error)) return null // database update 4 not run yet
  if (error) throw error
  return data
}

// What the student may do with the coach right now.
export async function coachAccess(userId) {
  const sub = await getCoachSubscription(userId)
  const subscribed = !!sub && ACTIVE.has(sub.status) && (!sub.current_period_end || new Date(sub.current_period_end) > Date.now() - 3 * 864e5)
  const since = subscribed ? dayOf(sub.current_period_start || new Date(Date.now() - 30 * 864e5)) : '1970-01-01'
  const { data: used, error } = await db().rpc('coach_usage_since', { p_user: userId, p_since: since })
  // Before update 4 the counter function is missing: count nothing, so nobody is locked out by mistake.
  const count = error ? 0 : used || 0
  return {
    subscribed,
    status: sub?.status || 'none',
    periodEnd: sub?.current_period_end || null,
    cancelAtPeriodEnd: !!sub?.cancel_at_period_end,
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
  if (!uid) { console.error('Coach subscription without user id', sub.id); return null }
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
  if (error) throw error
  return row
}
