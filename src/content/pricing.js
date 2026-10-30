// Prices and what each purchase unlocks. Used by the app and by the server (api/checkout.js),
// so the price shown is always the price charged.
//
// - Module 1 is free for every account (no payment needed).
// - Single modules 2 to 7: €24.99 each (€149.94 for all six).
// - Complete course (all 7 modules): €99, or €79 at the launch price (first 100 buyers, or until
//   LAUNCH_PRICE_UNTIL if that is set on the server). It includes 3 months of the AI coach.
// - Students who already bought single modules can upgrade to the complete course and pay only
//   the difference: the package price minus €24.99 for each module they bought.
// All sums are done in cents, so €24.99 never turns into €24.990000001.

export const CURRENCY = 'EUR'
export const BUNDLE_ID = 'hit-negotiation-selfpaced'
export const BUNDLE_PRICE = 99
export const LAUNCH_PRICE = 79
export const LAUNCH_BUYERS = 100 // the launch price ends after this many (real) package sales
export const MODULE_PRICE = 24.99
export const MODULE_IDS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7']
export const FREE_MODULES = ['m1']
export const PAID_MODULES = MODULE_IDS.filter((m) => !FREE_MODULES.includes(m))
export const BUNDLE_COACH_MONTHS = 3 // AI coach months included with the complete course

export const moduleProductId = (moduleId) => `hit-negotiation-${moduleId}`
export const moduleFromProduct = (productId) => MODULE_IDS.find((m) => moduleProductId(m) === productId) || null
export const isCourseProduct = (productId) => productId === BUNDLE_ID || !!moduleFromProduct(productId)
export const COURSE_PRODUCT_IDS = [BUNDLE_ID, ...PAID_MODULES.map(moduleProductId)]

const paidOf = (purchases) => (purchases || []).filter((p) => p.status === 'paid')
export const hasBundle = (purchases) => paidOf(purchases).some((p) => p.productId === BUNDLE_ID)

// purchases: [{ productId, status }] -> which modules the student may open (Module 1 always).
export function ownedModules(purchases) {
  if (hasBundle(purchases)) return new Set(MODULE_IDS)
  return new Set([...FREE_MODULES, ...paidOf(purchases).map((p) => moduleFromProduct(p.productId)).filter(Boolean)])
}

// What the student can buy next, with prices in euros.
// launch: whether the launch price is still on (the server decides; see api/checkout.js).
export function offers(purchases, { launch = false } = {}) {
  const owned = ownedModules(purchases)
  const remaining = PAID_MODULES.filter((m) => !owned.has(m))
  const bought = PAID_MODULES.filter((m) => owned.has(m)).length
  const c = (eur) => Math.round(eur * 100)
  const e = (cents) => cents / 100
  const full = launch ? LAUNCH_PRICE : BUNDLE_PRICE
  const credit = c(bought * MODULE_PRICE)
  const price = c(full) - credit
  const separately = remaining.length * c(MODULE_PRICE)
  const bundle = remaining.length && price > 0 && price < separately
    ? { price: e(price), full, regular: BUNDLE_PRICE, launch, credit: e(credit), separately: e(separately), saving: e(separately - price) }
    : null
  return { bundle, modulePrice: MODULE_PRICE, owned, remaining, bought }
}

// The server's price for a checkout request: 'bundle' or a module id like 'm3'.
export function quote(choice, purchases, opts) {
  const o = offers(purchases, opts)
  if (choice === 'bundle') {
    if (!o.remaining.length) return { error: 'You already have the complete course.' }
    if (!o.bundle) return { error: 'Only one module is left: unlock it on its own.' }
    return {
      productId: BUNDLE_ID,
      cents: Math.round(o.bundle.price * 100),
      name: o.bundle.credit
        ? `Negotiation & Conflict Resolution: complete course (upgrade, €${o.bundle.credit} credit for modules you own)`
        : 'Negotiation & Conflict Resolution: complete course, all 7 modules',
      full: !o.bundle.credit && !o.bundle.launch,
    }
  }
  if (FREE_MODULES.includes(choice)) return { error: 'This module is free: just open it.' }
  if (!PAID_MODULES.includes(choice)) return { error: 'Please choose a module or the complete course.' }
  if (o.owned.has(choice)) return { error: 'You already have this module.' }
  return { productId: moduleProductId(choice), cents: Math.round(MODULE_PRICE * 100), name: `Negotiation & Conflict Resolution: Module ${MODULE_IDS.indexOf(choice) + 1}` }
}

// "€24.99", "€99": cents only when there are any.
export function euro(n) {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: CURRENCY, minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n)
}
