// The AI coach subscription for the signed-in student.
//   GET                          -> what the student may do with the coach (free messages left, subscription status)
//   POST { action: 'subscribe' } -> Stripe Checkout page for the €12/month subscription
//   POST { action: 'portal' }    -> Stripe's page to cancel the subscription or change the card
import Stripe from 'stripe'
import { env, requireUser, hasPaid, readJson, siteUrl, fail, coachAccess, getCoachSubscription, COACH_PRICE_CENTS } from './_lib.js'

export default async function handler(req, res) {
  try {
    const user = await requireUser(req)
    if (req.method === 'GET') {
      const paid = await hasPaid(user.id)
      return res.status(200).json({ paid, ...(paid ? await coachAccess(user.id) : { subscribed: false, left: 0 }) })
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Use GET or POST.' })

    const body = await readJson(req)
    if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Online payment isn\'t switched on yet. Please try again later.' })
    const stripe = new Stripe(env('STRIPE_SECRET_KEY'))
    const base = siteUrl(req)
    const sub = await getCoachSubscription(user.id)

    if (body.action === 'portal') {
      if (!sub?.stripe_customer_id) return res.status(400).json({ error: 'You don\'t have a coach subscription yet.' })
      const portal = await stripe.billingPortal.sessions.create({ customer: sub.stripe_customer_id, return_url: `${base}/?coach=portal` })
      return res.status(200).json({ url: portal.url })
    }

    if (body.action === 'subscribe') {
      if (!(await hasPaid(user.id))) return res.status(403).json({ error: 'The coach subscription is for students who bought the course.' })
      if (!body.consent) return res.status(400).json({ error: 'Please confirm the box about starting the coach right away first.' })
      const access = await coachAccess(user.id)
      if (access.subscribed) return res.status(200).json({ alreadySubscribed: true })
      const consentAt = new Date().toISOString()
      const priceId = process.env.STRIPE_COACH_PRICE_ID
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [priceId
          ? { price: priceId, quantity: 1 }
          : { quantity: 1, price_data: { currency: 'eur', unit_amount: COACH_PRICE_CENTS, recurring: { interval: 'month' }, product_data: { name: 'H.I.T. AI Negotiation Coach (monthly)' } } }],
        // Reuse the Stripe customer from an earlier subscription, so the portal shows everything in one place.
        ...(sub?.stripe_customer_id ? { customer: sub.stripe_customer_id } : { customer_email: user.email }),
        client_reference_id: user.id,
        metadata: { user_id: user.id, kind: 'coach', consent_at: consentAt },
        subscription_data: { metadata: { user_id: user.id, kind: 'coach', consent_at: consentAt } },
        automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === 'true' },
        ...(process.env.STRIPE_AUTOMATIC_TAX === 'true' ? { billing_address_collection: 'required' } : {}),
        allow_promotion_codes: true,
        success_url: `${base}/?coach=success`,
        cancel_url: `${base}/?coach=cancel`,
      })
      return res.status(200).json({ url: session.url })
    }

    res.status(400).json({ error: 'Unknown action.' })
  } catch (e) { fail(res, e) }
}
