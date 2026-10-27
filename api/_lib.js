// Shared helpers for the server functions in /api (files starting with _ are not routes).
import { createClient } from '@supabase/supabase-js'

export const PRODUCT_ID = 'hit-negotiation-selfpaced' // must match course.product.id

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

export async function hasPaid(userId) {
  const { data } = await db().from('purchases').select('id').eq('user_id', userId).eq('product_id', PRODUCT_ID).eq('status', 'paid').limit(1)
  return !!data?.length
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
export async function notifyOwner(subject, lines) {
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
      }),
    })
    if (!r.ok) console.error('Notification email failed', r.status, await r.text())
  } catch (e) { console.error('Notification email failed', e) }
}
