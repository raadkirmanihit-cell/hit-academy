// GET: whether the launch price for the complete course is on (no sign-in needed).
// POST: starts a Stripe Checkout payment for the signed-in student and returns the payment page URL.
//   body.choice: 'bundle' (all 7 modules: €99, or €79 at launch, less €19 per module already bought)
//   or a module id like 'm3' (€19). Module 1 is free.
import Stripe from 'stripe'
import { env, requireUser, coursePurchases, readJson, siteUrl, fail, INVOICE_FOOTER, launchStatus } from './_lib.js'
import { quote } from '../src/content/pricing.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try { return res.status(200).json(await launchStatus()) } catch (e) { return fail(res, e) }
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use GET or POST.' })
  try {
    const user = await requireUser(req)
    const body = await readJson(req)
    if (!body.waiver) return res.status(400).json({ error: 'Please confirm the box about immediate access first.' })
    const [purchases, launch] = await Promise.all([coursePurchases(user.id), launchStatus()])
    const q = quote(body.choice || 'bundle', purchases, { launch: launch.launch })
    if (q.error) return res.status(400).json({ error: q.error })
    if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Online payment isn\'t switched on yet. Please try again later.' })

    const stripe = new Stripe(env('STRIPE_SECRET_KEY'))
    const base = siteUrl(req)
    // A fixed Stripe price can be used for the full package; upgrades and modules are priced here.
    const priceId = q.full ? process.env.STRIPE_PRICE_ID : null
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [priceId
        ? { price: priceId, quantity: 1 }
        : { quantity: 1, price_data: { currency: 'eur', unit_amount: q.cents, product_data: { name: q.name } } }],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: { user_id: user.id, product_id: q.productId, withdrawal_waiver: 'yes', waiver_at: new Date().toISOString() },
      payment_intent_data: { metadata: { user_id: user.id, product_id: q.productId } },
      // Small business (§ 19 UStG): the invoice must say why no VAT is shown.
      invoice_creation: { enabled: true, invoice_data: { footer: INVOICE_FOOTER } },
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === 'true' },
      ...(process.env.STRIPE_AUTOMATIC_TAX === 'true' ? { billing_address_collection: 'required' } : {}),
      allow_promotion_codes: true,
      success_url: `${base}/?checkout=success&item=${encodeURIComponent(body.choice || 'bundle')}`,
      cancel_url: `${base}/?checkout=cancel`,
    })
    res.status(200).json({ url: session.url })
  } catch (e) { fail(res, e) }
}
