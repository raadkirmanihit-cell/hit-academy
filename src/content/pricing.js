// Prices and what each purchase unlocks. Used by the app and by the server (api/checkout.js),
// so the price shown is always the price charged.
//
// - Complete package: all 7 modules for €99 (product id kept from the first €119 offer, so
//   earlier buyers keep full access).
// - Single module: €19 each.
// - Students who already bought modules can upgrade to the package for €99 minus €19 per module
//   they own. That upgrade is offered while it is cheaper than buying the rest one by one.

export const CURRENCY = 'EUR'
export const BUNDLE_ID = 'hit-negotiation-selfpaced'
export const BUNDLE_PRICE = 99
export const MODULE_PRICE = 19
export const MODULE_IDS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7']

export const moduleProductId = (moduleId) => `hit-negotiation-${moduleId}`
export const moduleFromProduct = (productId) => MODULE_IDS.find((m) => moduleProductId(m) === productId) || null
export const isCourseProduct = (productId) => productId === BUNDLE_ID || !!moduleFromProduct(productId)
export const COURSE_PRODUCT_IDS = [BUNDLE_ID, ...MODULE_IDS.map(moduleProductId)]

// purchases: [{ productId, status }] -> which modules the student may open.
export function ownedModules(purchases) {
  const paid = (purchases || []).filter((p) => p.status === 'paid')
  if (paid.some((p) => p.productId === BUNDLE_ID)) return new Set(MODULE_IDS)
  return new Set(paid.map((p) => moduleFromProduct(p.productId)).filter(Boolean))
}

// What the student can buy next, with prices in euros.
//   { bundle: { price, full, credit } | null, modulePrice, owned, remaining }
export function offers(purchases) {
  const owned = ownedModules(purchases)
  const remaining = MODULE_IDS.filter((m) => !owned.has(m))
  const credit = owned.size * MODULE_PRICE
  const price = BUNDLE_PRICE - credit
  const bundle = remaining.length && price > 0 && price < remaining.length * MODULE_PRICE
    ? { price, full: BUNDLE_PRICE, credit }
    : null
  return { bundle, modulePrice: MODULE_PRICE, owned, remaining }
}

// The server's price for a checkout request: 'bundle' or a module id like 'm3'.
export function quote(choice, purchases) {
  const o = offers(purchases)
  if (choice === 'bundle') {
    if (!o.remaining.length) return { error: 'You already have the complete course.' }
    if (!o.bundle) return { error: 'Only one module is left: unlock it on its own.' }
    return {
      productId: BUNDLE_ID,
      cents: o.bundle.price * 100,
      name: o.bundle.credit ? `Negotiation & Conflict Resolution: complete course (upgrade, €${o.bundle.credit} credit for modules you own)` : 'Negotiation & Conflict Resolution: complete course, all 7 modules',
      full: !o.bundle.credit,
    }
  }
  if (!MODULE_IDS.includes(choice)) return { error: 'Please choose a module or the complete course.' }
  if (o.owned.has(choice)) return { error: 'You already have this module.' }
  return { productId: moduleProductId(choice), cents: MODULE_PRICE * 100, name: `Negotiation & Conflict Resolution: Module ${MODULE_IDS.indexOf(choice) + 1}` }
}
