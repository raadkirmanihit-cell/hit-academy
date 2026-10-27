// A signed-in student sends Raad a message. It is saved for the control board and emailed to Raad.
import { requireUser, db, readJson, notifyOwner, fail } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  try {
    const user = await requireUser(req)
    const body = await readJson(req)
    const text = String(body.body || '').trim().slice(0, 5000)
    const subject = String(body.subject || '').trim().slice(0, 200)
    if (text.length < 2) return res.status(400).json({ error: 'Please write a message first.' })
    // Simple flood guard: at most 10 messages per student per day.
    const since = new Date(Date.now() - 864e5).toISOString()
    const { count } = await db().from('messages').select('id', { count: 'exact', head: true }).eq('user_id', user.id).gte('created_at', since)
    if ((count || 0) >= 10) return res.status(429).json({ error: 'You\'ve sent a lot of messages today. Please try again tomorrow.' })
    const { data: p } = await db().from('profiles').select('name, email').eq('id', user.id).maybeSingle()
    const name = p?.name || user.user_metadata?.name || ''
    const { error } = await db().from('messages').insert({ user_id: user.id, name, email: user.email, subject, body: text })
    if (error) {
      console.error(error)
      return res.status(503).json({ error: 'Messages aren\'t switched on yet. Please email us directly for now.' })
    }
    await notifyOwner(`New message from ${name || user.email}${subject ? `: ${subject}` : ''}`, [
      `From: ${name} <${user.email}>`, '', text, '', 'Reply to this student by email, or see it on your control board.',
    ], { replyTo: user.email })
    res.status(200).json({ ok: true })
  } catch (e) { fail(res, e) }
}
