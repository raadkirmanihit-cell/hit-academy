// On the live website the coach talks to our own server (/api/coach) instead of the claude.ai
// preview's `sample` capability. Same call shape: sample(input, { onText, signal, modelTier, purpose }),
// and sample.json(input) for the feedback report.
import { backend } from '../platform/backend.js'
import { INCOMPLETE } from './stream.js'

const err = (code, message, text) => Object.assign(new Error(message), { code, text })

export function makeServerSample() {
  async function sample(input, opts = {}) {
    const token = await backend.getToken()
    if (!token) throw err('not_granted', 'Please sign in first.')
    let r
    try {
      r = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messages: input, modelTier: opts.modelTier || 'default', ...(opts.purpose ? { purpose: opts.purpose } : {}) }),
        signal: opts.signal,
      })
    } catch (e) {
      if (e?.name === 'AbortError') throw err('cancelled', 'Cancelled')
      throw err('network', 'Connection problem. Please check your internet and try again.')
    }
    if (!r.ok) {
      const data = await r.json().catch(() => ({}))
      throw err(data.code || (r.status === 429 ? 'rate_limited' : 'server'), data.error || 'Something went wrong.')
    }
    const reader = r.body.getReader()
    const dec = new TextDecoder()
    let text = ''
    try {
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        const delta = dec.decode(value, { stream: true })
        text += delta
        // The end marker never shows, even while it arrives in pieces.
        if (!text.includes('\u0000')) opts.onText?.({ text, delta })
      }
    } catch (e) {
      if (e?.name === 'AbortError') throw err('cancelled', 'Cancelled', text)
      throw err('incomplete', 'The connection dropped before the reply finished, so it did not use one of your messages. Your question is back in the box: press Send to try again.', text)
    }
    // The server could not finish this reply and gave the message back: never keep the half.
    if (text.includes(INCOMPLETE)) {
      throw err('incomplete', 'That reply was cut off before it finished, so it did not use one of your messages. Your question is back in the box: press Send to try again.', text.split(INCOMPLETE)[0])
    }
    // safety: the server answered a crisis message itself with help lines (no message used).
    return { text, truncated: false, safety: r.headers.get('X-Safety') === '1' }
  }
  sample.json = async (input, opts = {}) => {
    const { text } = await sample(input + '\n\nReply with the JSON object only, no other text.', opts)
    const m = text.match(/\{[\s\S]*\}/)
    try { return JSON.parse(m ? m[0] : text) } catch { throw err('invalid_json', 'Could not read the reply.') }
  }
  return sample
}
