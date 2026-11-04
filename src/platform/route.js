// Keeps the browser address in step with the screen, so Back, Forward, refresh and shared links work.
// Screens live in the hash (#/module/m2/intro) so the static host needs no server rewrites.
// Hashes from sign-in emails (#access_token=...) do not start with "#/" and are left alone.

const NAMES = ['landing', 'signup', 'signin', 'reset', 'checkout', 'dashboard', 'module', 'practice', 'certificate', 'contact', 'admin', 'legal']
// The extra value each screen carries in its address, in order.
const PARTS = { module: ['moduleId', 'stepId'], practice: ['scenarioId'], checkout: ['choice'], legal: ['page'] }

// Screen -> address. Returns null for screens that should not get their own address.
export function toHash(view) {
  if (!NAMES.includes(view.name)) return null
  if (view.name === 'landing') return ''
  const parts = (PARTS[view.name] || []).map((k) => view[k]).filter(Boolean).map(encodeURIComponent)
  return '#/' + [view.name, ...parts].join('/')
}

// Address -> screen. Returns null when the hash is not one of ours.
export function fromHash(hash = '') {
  if (!hash || hash === '#' || hash === '#/') return { name: 'landing' }
  if (!hash.startsWith('#/')) return null
  const [name, ...rest] = hash.slice(2).split('/').map((s) => { try { return decodeURIComponent(s) } catch { return s } })
  if (!NAMES.includes(name)) return null
  const view = { name }
  ;(PARTS[name] || []).forEach((k, i) => { if (rest[i]) view[k] = rest[i] })
  return view
}

// Writes the screen into the address bar. replace: true swaps the current entry instead of adding one.
export function writeHash(view, replace = false) {
  const hash = toHash(view)
  if (hash === null) return
  if (hash === window.location.hash && !window.location.search) return
  const url = window.location.pathname + hash
  window.history[replace ? 'replaceState' : 'pushState'](null, '', url)
}
