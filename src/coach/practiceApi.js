// The Arena calls to our server (live site only). See api/practice.js.
import { backend } from '../platform/backend.js'

const err = (code, message) => Object.assign(new Error(message), { code })

async function call(method, body, signal) {
  const token = await backend.getToken()
  if (!token) throw err('not_granted', 'Please sign in to practise.')
  let r
  try {
    r = await fetch('/api/practice', {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal,
    })
  } catch (e) {
    if (e?.name === 'AbortError') throw err('cancelled', 'Cancelled')
    throw err('network', 'Connection problem. Please check your internet and try again.')
  }
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw err(data.code || (r.status === 429 ? 'rate_limited' : 'server'), data.error || 'Something went wrong.')
  }
  return r
}

// One learner turn. Streams the counterpart's reply into onText. Returns { text, sessionId, saved, free }
// (free: the server paused the role-play for safety without using a token).
export async function practiceTurn({ scenarioId, sessionId, message, delivery, turns, onText, signal }) {
  const r = await call('POST', { action: 'turn', scenarioId, sessionId, message, delivery, turns }, signal)
  const reader = r.body.getReader()
  const dec = new TextDecoder()
  let text = ''
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      text += dec.decode(value, { stream: true })
      onText?.(text)
    }
  } catch (e) {
    if (e?.name === 'AbortError') throw err('cancelled', 'Cancelled')
    throw err('network', 'The connection dropped. Please try again.')
  }
  return { text, sessionId: r.headers.get('X-Session-Id'), saved: r.headers.get('X-Session-Saved') === '1', free: r.headers.get('X-Safety') === '1' }
}

export async function practiceScore({ sessionId, scenarioId, turns }) {
  const r = await call('POST', { action: 'score', sessionId, scenarioId, turns })
  return r.json()
}

export async function practiceHistory() {
  const r = await call('GET')
  return r.json()
}
