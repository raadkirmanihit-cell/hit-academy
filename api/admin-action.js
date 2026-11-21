// Raad's actions from the control board: refund a payment, send a password-reset email, mark a message read,
// delete a student's account (GDPR right to erasure).
import Stripe from 'stripe'
import { env, db, requireAdmin, readJson, siteUrl, markRefunded, fail, getCoachSubscription, sendEmail } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  try {
    const admin = await requireAdmin(req)
    const body = await readJson(req)

    if (body.action === 'refund') {
      const { data: p, error } = await db().from('purchases').select('*').eq('id', body.purchaseId).maybeSingle()
      if (error) throw error
      if (!p) return res.status(404).json({ error: 'Payment not found.' })
      if (p.status === 'refunded') return res.status(200).json({ ok: true, already: true })
      const stripe = new Stripe(env('STRIPE_SECRET_KEY'))
      let pi = p.payment_intent
      if (!pi) {
        try { pi = (await stripe.checkout.sessions.retrieve(p.stripe_session_id)).payment_intent } catch (e) {
          // A test-mode payment can't be found with a live key (and the other way round).
          return res.status(400).json({ error: 'Stripe couldn\'t find this payment. It may have been made in test mode while the site now uses live payments (or the other way round).' })
        }
      }
      if (!pi) return res.status(400).json({ error: 'This payment has no Stripe charge to refund.' })
      try {
        await stripe.refunds.create({ payment_intent: typeof pi === 'string' ? pi : pi.id, reason: 'requested_by_customer' })
      } catch (e) {
        if (!/already been refunded/i.test(e.message || '')) return res.status(400).json({ error: `Stripe said: ${e.message}` })
      }
      await markRefunded(p.stripe_session_id)
      return res.status(200).json({ ok: true })
    }

    if (body.action === 'reset') {
      const email = String(body.email || '').trim().toLowerCase()
      if (!email) return res.status(400).json({ error: 'Email missing.' })
      const { error } = await db().auth.resetPasswordForEmail(email, { redirectTo: siteUrl(req) })
      if (error) return res.status(400).json({ error: error.message })
      return res.status(200).json({ ok: true })
    }

    if (body.action === 'read') {
      const { error } = await db().from('messages').update({ read_at: body.unread ? null : new Date().toISOString() }).eq('id', body.messageId)
      if (error) throw error
      return res.status(200).json({ ok: true })
    }

    if (body.action === 'delete-user') {
      const id = String(body.userId || '')
      if (!/^[0-9a-f-]{36}$/i.test(id)) return res.status(400).json({ error: 'Student missing.' })
      if (admin?.id === id) return res.status(400).json({ error: 'You can\'t delete your own admin account here.' })
      const { data: { user: u }, error: e0 } = await db().auth.admin.getUserById(id)
      if (e0 || !u) return res.status(404).json({ error: 'Student not found.' })
      // Stop any running coach subscription first, so they are never charged again.
      const sub = await getCoachSubscription(id)
      if (sub?.stripe_subscription_id && ['active', 'trialing', 'past_due', 'unpaid'].includes(sub.status)) {
        try { await new Stripe(env('STRIPE_SECRET_KEY')).subscriptions.cancel(sub.stripe_subscription_id) } catch (e) {
          if (!/No such subscription|canceled/i.test(e.message || '')) return res.status(400).json({ error: `Stripe couldn't cancel the HIT Mentor subscription, so nothing was deleted: ${e.message}` })
        }
      }
      // Deleting the sign-in account removes their profile, progress, Arena role-plays, usage and posts
      // (the database deletes them with it). Payment records stay, without the link to the account (update 8).
      const { error } = await db().auth.admin.deleteUser(id)
      if (error) return res.status(400).json({ error: error.message })
      if (u.email) await sendEmail(u.email, 'Your H.I.T. Academy account has been deleted', [
        'Hello,', '', 'As you asked, we have deleted your H.I.T. Academy account and the personal data that belongs to it: your profile, course progress, Arena role-plays and community posts. Any HIT Mentor subscription has been cancelled.', '',
        'We keep payment and invoice records only for as long as German tax law requires.', '', 'Thank you for learning with us.', 'Human Interactions Translated',
      ]).catch((e) => console.error(e))
      return res.status(200).json({ ok: true })
    }

    res.status(400).json({ error: 'Unknown action.' })
  } catch (e) { fail(res, e) }
}
