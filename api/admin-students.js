// Data for Raad's control board: students, progress, payments and messages. Admins only (ADMIN_EMAILS).
import { requireUser, isAdmin, db, fail } from './_lib.js'

// Short per-module summary from a student's saved progress.
function moduleSummary(mods) {
  const out = {}
  for (const [id, m] of Object.entries(mods || {})) {
    out[id] = {
      done: Object.values(m?.done || {}).filter(Boolean).length,
      quizBest: m?.quiz?.best ?? null,
      quizPassed: !!m?.quiz?.passed,
      completedAt: m?.completedAt || null,
    }
  }
  return out
}

export default async function handler(req, res) {
  try {
    const user = await requireUser(req)
    if (req.query?.check !== undefined || /[?&]check\b/.test(req.url || '')) return res.status(200).json({ admin: isAdmin(user) })
    if (!isAdmin(user)) return res.status(403).json({ error: 'Admins only.' })
    const [profiles, purchases, progress, messages] = await Promise.all([
      db().from('profiles').select('id, name, email, created_at').order('created_at', { ascending: false }).limit(5000),
      db().from('purchases').select('*').order('created_at', { ascending: false }),
      db().from('progress').select('user_id, data, updated_at'),
      db().from('messages').select('*').order('created_at', { ascending: false }).limit(500),
    ])
    for (const r of [profiles, purchases, progress]) if (r.error) throw r.error
    const people = new Map(profiles.data.map((p) => [p.id, p]))
    const paid = new Map(purchases.data.filter((p) => p.status === 'paid').map((p) => [p.user_id, p]))
    const prog = new Map(progress.data.map((p) => [p.user_id, p]))
    const students = profiles.data.map((p) => {
      const pr = prog.get(p.id)
      const mods = pr?.data?.modules || {}
      return {
        id: p.id, name: p.name, email: p.email, registered: p.created_at,
        paidAt: paid.get(p.id)?.created_at || null,
        modulesCompleted: Object.values(mods).filter((m) => m?.completedAt).length,
        quizzesPassed: Object.values(mods).filter((m) => m?.quiz?.passed).length,
        lastActive: pr?.updated_at || null,
        modules: moduleSummary(mods),
      }
    })
    const payments = purchases.data.map((p) => ({
      id: p.id, sessionId: p.stripe_session_id, name: people.get(p.user_id)?.name || '', email: people.get(p.user_id)?.email || '',
      amount: p.amount, currency: p.currency, status: p.status, live: !!p.livemode, paidAt: p.created_at, refundedAt: p.refunded_at || null,
    }))
    // Messages need database update 2; until then the inbox is simply empty.
    res.status(200).json({ students, payments, messages: messages.error ? [] : messages.data, messagesReady: !messages.error })
  } catch (e) { fail(res, e) }
}
