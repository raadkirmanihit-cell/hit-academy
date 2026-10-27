// Stripe calls this after a payment. It records the purchase, which unlocks the course.
import Stripe from 'stripe'
import { env, db, notifyOwner, PRODUCT_ID } from './_lib.js'

// Stripe signs the exact bytes it sent, so read the raw body.
async function rawBody(req) {
  const chunks = []
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c)
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const stripe = new Stripe(env('STRIPE_SECRET_KEY'))
  let event
  try {
    event = stripe.webhooks.constructEvent(await rawBody(req), req.headers['stripe-signature'], env('STRIPE_WEBHOOK_SECRET'))
  } catch (e) {
    console.error('Webhook signature check failed', e.message)
    return res.status(400).send('Invalid signature')
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const s = event.data.object
      if (s.payment_status === 'paid') {
        const userId = s.client_reference_id || s.metadata?.user_id
        const { error } = await db().from('purchases').upsert({
          user_id: userId,
          product_id: s.metadata?.product_id || PRODUCT_ID,
          status: 'paid',
          amount: s.amount_total,
          currency: s.currency,
          stripe_session_id: s.id,
          withdrawal_waiver: s.metadata?.withdrawal_waiver === 'yes',
        }, { onConflict: 'stripe_session_id' })
        if (error) throw error
        const { data: p } = await db().from('profiles').select('name, email').eq('id', userId).maybeSingle()
        await notifyOwner(`New course purchase: ${p?.name || s.customer_details?.name || 'a student'}`, [
          `${p?.name || ''} <${p?.email || s.customer_details?.email || ''}> just bought the course.`,
          `Amount: ${(s.amount_total / 100).toFixed(2)} ${String(s.currency).toUpperCase()}`,
          `Stripe session: ${s.id}`,
        ])
      }
    }
    if (event.type === 'charge.refunded') {
      const pi = event.data.object.payment_intent
      if (pi) {
        const sessions = await stripe.checkout.sessions.list({ payment_intent: pi, limit: 1 })
        const id = sessions.data[0]?.id
        if (id) await db().from('purchases').update({ status: 'refunded' }).eq('stripe_session_id', id)
      }
    }
    res.status(200).json({ received: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Webhook handling failed') // Stripe retries automatically.
  }
}
