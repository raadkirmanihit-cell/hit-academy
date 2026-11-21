// Stripe calls this after a payment. It records the course purchase (which unlocks the course)
// and keeps the AI coach subscription in sync: new, renewed, failed, cancelled, refunded.
import Stripe from 'stripe'
import { env, db, notifyOwner, sendEmail, siteUrl, markRefunded, saveSubscription, PRODUCT_ID, INVOICE_FOOTER, COACH_MONTHLY_LIMIT } from './_lib.js'
import { moduleFromProduct, TOPUP_ID, TOPUP_MESSAGES, ARENA_ID } from '../src/content/pricing.js'

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
      if (s.mode === 'subscription') await coachCheckoutDone(stripe, s)
      else if (s.payment_status === 'paid') {
        const userId = s.client_reference_id || s.metadata?.user_id
        const row = {
          user_id: userId,
          product_id: s.metadata?.product_id || PRODUCT_ID,
          status: 'paid',
          amount: s.amount_total,
          currency: s.currency,
          stripe_session_id: s.id,
          withdrawal_waiver: s.metadata?.withdrawal_waiver === 'yes',
        }
        const extra = { payment_intent: typeof s.payment_intent === 'string' ? s.payment_intent : s.payment_intent?.id || null, livemode: !!event.livemode }
        let { error } = await db().from('purchases').upsert({ ...row, ...extra }, { onConflict: 'stripe_session_id' })
        // Before database update 2 is run, the extra columns don't exist yet: save the purchase without them.
        if (error && /column|schema cache/i.test(error.message || '')) ({ error } = await db().from('purchases').upsert(row, { onConflict: 'stripe_session_id' }))
        if (error) throw error
        // The complete course comes with a pack of Arena tokens, counted in api/_lib.js (coachAccess).
        const { data: p } = await db().from('profiles').select('name, email').eq('id', userId).maybeSingle()
        const mod = moduleFromProduct(row.product_id)
        const what = row.product_id === TOPUP_ID ? `${TOPUP_MESSAGES} Arena tokens` : row.product_id === ARENA_ID ? 'the Arena' : mod ? `Module ${mod.slice(1)}` : 'the complete course'
        await notifyOwner(`New purchase (${what}): ${p?.name || s.customer_details?.name || 'a student'}`, [
          `${p?.name || ''} <${p?.email || s.customer_details?.email || ''}> just bought ${what}.`,
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
        if (id) await markRefunded(id)
        await markCoachPaymentRefunded(pi)
      }
    }
    if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) {
      await coachSubscriptionChanged(event.data.object, event.type, siteUrl(req))
    }
    if (event.type === 'customer.subscription.trial_will_end') await coachFirstChargeReminder(event.data.object, siteUrl(req))
    if (event.type === 'invoice.paid') await coachInvoicePaid(stripe, event.data.object)
    res.status(200).json({ received: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Webhook handling failed') // Stripe retries automatically.
  }
}

// ---- AI coach subscription -------------------------------------------------

const isCoach = (sub) => sub?.metadata?.kind === 'coach'
const userName = async (userId) => (await db().from('profiles').select('name, email').eq('id', userId).maybeSingle()).data

async function coachCheckoutDone(stripe, s) {
  const subId = typeof s.subscription === 'string' ? s.subscription : s.subscription?.id
  if (!subId) return
  const sub = await stripe.subscriptions.retrieve(subId)
  if (!isCoach(sub)) return
  // Make sure renewals carry the § 19 UStG footer, whichever way the customer was created.
  const customer = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
  if (customer) await stripe.customers.update(customer, { invoice_settings: { footer: INVOICE_FOOTER } }).catch((e) => console.error('Invoice footer not set', e.message))
  const row = await saveSubscription(sub, { userId: s.client_reference_id || sub.metadata.user_id })
  const p = row && await userName(row.user_id)
  await notifyOwner(`New HIT Mentor subscriber: ${p?.name || s.customer_details?.name || 'a student'}`, [
    `${p?.name || ''} <${p?.email || s.customer_details?.email || ''}> subscribed to HIT Mentor.`,
    `Amount: ${((s.amount_total || 0) / 100).toFixed(2)} ${String(s.currency || 'eur').toUpperCase()} per month`,
    `Stripe subscription: ${subId}`,
  ])
}

const day = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' })

async function coachSubscriptionChanged(sub, type, base) {
  if (!isCoach(sub)) return
  // A late message about an old subscription must not overwrite a newer one.
  const { data: cur } = await db().from('coach_subscriptions').select('stripe_subscription_id, status, cancel_at_period_end').eq('user_id', sub.metadata.user_id).maybeSingle()
  if (cur && cur.stripe_subscription_id && cur.stripe_subscription_id !== sub.id && ['active', 'trialing', 'past_due'].includes(cur.status) && sub.status !== 'active') return
  const row = await saveSubscription(sub)
  // § 312k BGB: confirm a cancellation to the student straight away, in text form, with the end date.
  const sameSub = cur?.stripe_subscription_id === sub.id
  const newlyCancelled = row && sameSub && !cur.cancel_at_period_end && row.cancel_at_period_end && type === 'customer.subscription.updated'
  const endedNow = row && sameSub && type === 'customer.subscription.deleted' && !cur.cancel_at_period_end && cur.status !== 'canceled'
  if (newlyCancelled || endedNow) {
    const p = await userName(row.user_id)
    const end = sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : row.current_period_end
    if (p?.email) await sendEmail(p.email, 'Your HIT Mentor subscription is cancelled', [
      `Hello ${p.name?.split(' ')[0] || 'there'},`, '',
      `We have received your cancellation of the HIT Mentor subscription on ${day(new Date().toISOString())}.`,
      endedNow ? 'Your subscription has ended and you will not be charged again.' : `HIT Mentor stays on until ${day(end)}. After that the subscription ends and you will not be charged again.`, '',
      `Changed your mind? You can restart it any time from your dashboard: ${base}`, '',
      'Human Interactions Translated',
    ])
  }
  if (row && type === 'customer.subscription.deleted') {
    const p = await userName(row.user_id)
    await notifyOwner(`HIT Mentor subscription ended: ${p?.name || 'a student'}`, [`${p?.name || ''} <${p?.email || ''}>'s HIT Mentor subscription has ended (${sub.cancellation_details?.reason || sub.status}).`])
  }
}

async function coachInvoicePaid(stripe, inv) {
  // Newer Stripe API versions put the subscription under invoice.parent, older ones on the invoice.
  const details = inv.parent?.subscription_details
  const subId = details?.subscription || inv.subscription
  const meta = details?.metadata || inv.subscription_details?.metadata || {}
  if (!subId || meta.kind !== 'coach' || !inv.amount_paid) return
  let pi = typeof inv.payment_intent === 'string' ? inv.payment_intent : inv.payment_intent?.id || null
  if (!pi && stripe.invoicePayments) {
    try {
      const list = await stripe.invoicePayments.list({ invoice: inv.id, limit: 1 })
      const pay = list.data[0]?.payment
      pi = typeof pay?.payment_intent === 'string' ? pay.payment_intent : pay?.payment_intent?.id || null
    } catch (e) { console.error('Could not read invoice payment', e.message) }
  }
  const { error } = await db().from('coach_payments').upsert({
    stripe_invoice_id: inv.id,
    user_id: meta.user_id || null,
    amount: inv.amount_paid,
    currency: inv.currency,
    livemode: !!inv.livemode,
    payment_intent: pi,
    paid_at: new Date((inv.status_transitions?.paid_at || inv.created) * 1000).toISOString(),
  }, { onConflict: 'stripe_invoice_id' })
  if (error) throw error
}

async function markCoachPaymentRefunded(pi) {
  const { error } = await db().from('coach_payments').update({ status: 'refunded', refunded_at: new Date().toISOString() }).eq('payment_intent', pi)
  if (error && !/relation|schema cache|does not exist/i.test(error.message || '')) throw error
}

// Stripe sends this 3 days before a trial ends. Our only "trial" is the free coach time that earlier
// course buyers had included, when they subscribe before it runs out: remind them before the first charge.
async function coachFirstChargeReminder(sub, base) {
  if (!isCoach(sub) || !sub.trial_end || sub.cancel_at_period_end) return
  const p = await userName(sub.metadata.user_id)
  if (!p?.email) return
  const amount = ((sub.items?.data?.[0]?.price?.unit_amount || 0) / 100).toFixed(2)
  await sendEmail(p.email, 'Reminder: your HIT Mentor subscription starts soon', [
    `Hello ${p.name?.split(' ')[0] || 'there'},`, '',
    `The HIT Mentor time included with your course ends on ${day(new Date(sub.trial_end * 1000).toISOString())}. On that day your HIT Mentor subscription starts and we will charge €${amount}, then the same every month (up to ${COACH_MONTHLY_LIMIT} HIT Mentor messages a month).`, '',
    `If you don't want to continue, cancel before then on your dashboard ("Cancel subscription here"): ${base}`, '',
    'Human Interactions Translated',
  ])
}
