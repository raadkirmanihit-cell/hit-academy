// On the live website the coach talks to our own server (/api/coach) instead of the claude.ai
// preview's `sample` capability. Same call shape: sample(input, { onText, signal, modelTier }),
// and sample.json(input) for the feedback report.
import { backend } from '../platform/backend.js'

const err = (code, message, text) => Object.assign(new Error(message), { code, text })

export function makeServerSample() {
  async function sample(input, opts = {}) {
    const token = await backend.getToken()
    if (!token) throw err('not_granted', 'Please sign in to use the coach.')
    let r
    try {
      r = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messages: input, modelTier: opts.modelTier || 'default' }),
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
        opts.onText?.({ text, delta })
      }
    } catch (e) {
      if (e?.name === 'AbortError') throw err('cancelled', 'Cancelled', text)
      throw err('network', 'The connection dropped. Please try again.', text)
    }
    return { text, truncated: false }
  }
  sample.json = async (input, opts = {}) => {
    const { text } = await sample(input + '\n\nReply with the JSON object only, no other text.', opts)
    const m = text.match(/\{[\s\S]*\}/)
    try { return JSON.parse(m ? m[0] : text) } catch { throw err('invalid_json', 'Could not read the reply.') }
  }
  return sample
}
