// Starts a Stripe Checkout payment for the signed-in student and returns the payment page URL.
import Stripe from 'stripe'
import { env, requireUser, hasPaid, readJson, siteUrl, fail, PRODUCT_ID } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  try {
    const user = await requireUser(req)
    const body = await readJson(req)
    if (!body.waiver) return res.status(400).json({ error: 'Please confirm the box about immediate access first.' })
    if (await hasPaid(user.id)) return res.status(200).json({ alreadyPaid: true })
    if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Online payment isn\'t switched on yet. Please try again later.' })

    const stripe = new Stripe(env('STRIPE_SECRET_KEY'))
    const base = siteUrl(req)
    const priceId = process.env.STRIPE_PRICE_ID
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [priceId
        ? { price: priceId, quantity: 1 }
        : { quantity: 1, price_data: { currency: 'eur', unit_amount: 4900, product_data: { name: 'Negotiation & Conflict Resolution: self-paced course' } } }],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: { user_id: user.id, product_id: PRODUCT_ID, withdrawal_waiver: 'yes', waiver_at: new Date().toISOString() },
      payment_intent_data: { metadata: { user_id: user.id, product_id: PRODUCT_ID } },
      invoice_creation: { enabled: true },
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === 'true' },
      ...(process.env.STRIPE_AUTOMATIC_TAX === 'true' ? { billing_address_collection: 'required' } : {}),
      allow_promotion_codes: true,
      success_url: `${base}/?checkout=success`,
      cancel_url: `${base}/?checkout=cancel`,
    })
    res.status(200).json({ url: session.url })
  } catch (e) { fail(res, e) }
}
