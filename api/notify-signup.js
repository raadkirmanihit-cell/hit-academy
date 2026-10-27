// Called once after a student registers, so Raad gets an email about the new sign-up.
import { requireUser, notifyOwner, db, fail } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  try {
    const user = await requireUser(req)
    // Only announce brand-new accounts (created in the last 2 hours), and only once.
    const created = new Date(user.created_at).getTime()
    if (Date.now() - created > 2 * 3600e3 || user.user_metadata?.announced) return res.status(200).json({ ok: true })
    await db().auth.admin.updateUserById(user.id, { user_metadata: { ...user.user_metadata, announced: true } })
    await notifyOwner(`New registration: ${user.user_metadata?.name || user.email}`, [
      `${user.user_metadata?.name || '(no name)'} <${user.email}> just created an account on H.I.T. Academy.`,
      'They have not paid yet. You will get a separate email when they buy the course.',
    ])
    res.status(200).json({ ok: true })
  } catch (e) { fail(res, e) }
}
