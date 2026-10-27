// Raad's actions from the control board: refund a payment, send a password-reset email, mark a message read.
import Stripe from 'stripe'
import { env, db, requireAdmin, readJson, siteUrl, markRefunded, fail } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  try {
    await requireAdmin(req)
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

    res.status(400).json({ error: 'Unknown action.' })
  } catch (e) { fail(res, e) }
}
