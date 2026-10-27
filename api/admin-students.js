// Student list for the admin page. Only emails listed in ADMIN_EMAILS can call it.
import { requireUser, isAdmin, db, fail } from './_lib.js'

export default async function handler(req, res) {
  try {
    const user = await requireUser(req)
    if (req.query?.check !== undefined || /[?&]check\b/.test(req.url || '')) return res.status(200).json({ admin: isAdmin(user) })
    if (!isAdmin(user)) return res.status(403).json({ error: 'Admins only.' })
    const [profiles, purchases, progress] = await Promise.all([
      db().from('profiles').select('id, name, email, created_at').order('created_at', { ascending: false }).limit(2000),
      db().from('purchases').select('user_id, status, amount, currency, created_at'),
      db().from('progress').select('user_id, data, updated_at'),
    ])
    for (const r of [profiles, purchases, progress]) if (r.error) throw r.error
    const paid = new Map(purchases.data.filter((p) => p.status === 'paid').map((p) => [p.user_id, p]))
    const prog = new Map(progress.data.map((p) => [p.user_id, p]))
    const students = profiles.data.map((p) => {
      const pr = prog.get(p.id)
      const mods = pr?.data?.modules || {}
      return {
        name: p.name, email: p.email, registered: p.created_at,
        paidAt: paid.get(p.id)?.created_at || null,
        modulesCompleted: Object.values(mods).filter((m) => m?.completedAt).length,
        quizzesPassed: Object.values(mods).filter((m) => m?.quiz?.passed).length,
        lastActive: pr?.updated_at || null,
      }
    })
    res.status(200).json({ students })
  } catch (e) { fail(res, e) }
}
