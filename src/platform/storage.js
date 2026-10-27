// Safe wrapper around localStorage. Falls back to memory when storage is blocked
// (private windows, embedded previews), so the app never crashes on a read or write.
const memory = new Map()

export function readJSON(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw == null ? (memory.has(key) ? memory.get(key) : fallback) : JSON.parse(raw)
  } catch {
    return memory.has(key) ? memory.get(key) : fallback
  }
}

export function writeJSON(key, value) {
  memory.set(key, value)
  try { window.localStorage.setItem(key, JSON.stringify(value)) } catch { /* memory only */ }
}

export function remove(key) {
  memory.delete(key)
  try { window.localStorage.removeItem(key) } catch { /* ignore */ }
}
