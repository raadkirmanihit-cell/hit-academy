// The AI coach on the live site: streams Claude's reply as plain text.
// Every account gets a few free messages; after that it needs the monthly coach subscription.
// Coach messages and Arena tokens are separate: see chargeCoach in _lib.js.
// Subscribers have a monthly fair-use cap, and everyone has a daily limit.
import Anthropic from '@anthropic-ai/sdk'
import { env, requireUser, readJson, fail, chargeCoach, refundCoach } from './_lib.js'
import { soundsLikeCrisis, safetyReply } from '../src/coach/safety.js'
import { feedback } from './_coach-feedback.js'
import { INCOMPLETE } from '../src/coach/stream.js'

const MODEL = process.env.COACH_MODEL || 'claude-opus-5-5'
const MAX_CHARS = 120_000
// Room for the model's (hidden) thinking plus a full plan. Thinking counts toward this cap, so the
// old 4,000 often ran out halfway through a long plan. Only tokens actually written are paid for.
const MAX_TOKENS = 16_000
// If a reply still hits the cap, the server asks the model to carry on where it stopped (no extra message charged).
const MAX_CONTINUES = 2
const CONTINUE = 'Your previous reply was cut off by a length limit. Continue it exactly where it stopped: no repetition, no preamble, no comment about the cut.'
// Stop safely before Vercel's time limit (maxDuration 300 s in vercel.json) so the learner gets a clean notice, not a silent cut.
const DEADLINE_MS = 270_000

// Prompt caching: the long, fixed part of the coach rules and the conversation so far are
// stored by Anthropic for a few minutes, so the next message reads them at a tenth of the price.
const SPLIT = '\nThe learner is currently on:'
const CACHE = { type: 'ephemeral' }
function withCache(messages) {
  const out = messages.map((m) => ({ ...m }))
  const first = out[0]
  const at = first.role === 'user' ? first.content.indexOf(SPLIT) : -1
  if (at > 0) {
    first.content = [
      { type: 'text', text: first.content.slice(0, at), cache_control: CACHE },
      { type: 'text', text: first.content.slice(at) },
    ]
  }
  const last = out[out.length - 1]
  if (last !== first) last.content = [{ type: 'text', text: last.content, cache_control: CACHE }]
  return out
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  let user
  try {
    user = await requireUser(req)
  } catch (e) { return fail(res, e) }

  let messages, tier, practice
  try {
    const body = await readJson(req)
    // A thumbs up or down on a coach plan (Vercel's plan limits the number of API files, so it lives here).
    if (body.action === 'feedback') return await feedback(req, res, user, body)
    tier = body.modelTier === 'quick' ? 'quick' : 'default'
    practice = body.purpose === 'practice' // an Arena role-play (or its feedback report)
    messages = (Array.isArray(body.messages) ? body.messages : [{ role: 'user', content: String(body.messages || '') }])
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({ role: m.role, content: m.content }))
    if (!messages.length || messages[messages.length - 1].role !== 'user') return res.status(400).json({ error: 'Nothing to answer.' })
    if (JSON.stringify(messages).length > MAX_CHARS) return res.status(413).json({ error: 'That conversation is too long. Please start a new one.' })
  } catch { return res.status(400).json({ error: 'Bad request.' }) }

  // A clear sign of crisis gets a fixed, caring reply with help lines: no model call, no message used.
  // Only for coach chats, where the last message is the learner's own words (the first holds the rules).
  if (!practice && messages.length > 1 && soundsLikeCrisis(messages[messages.length - 1].content)) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Safety': '1' })
    return res.end(safetyReply(req.headers['x-vercel-ip-country']))
  }

  try {
    const stop = await chargeCoach(user, { practice })
    if (stop) return res.status(stop.status).json(stop.body)
  } catch (e) { return fail(res, e) }

  const client = new Anthropic({ apiKey: env('ANTHROPIC_API_KEY') })
  const ctl = new AbortController()
  let closed = false
  // The learner's connection dropped (closed before we finished): stop the model and give the message back.
  res.on('close', () => { if (!res.writableEnded) { closed = true; ctl.abort() } })
  const timer = setTimeout(() => ctl.abort(), DEADLINE_MS)

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' })
  let done = false
  try {
    const history = withCache(messages)
    let written = ''
    for (let round = 0; round <= MAX_CONTINUES; round++) {
      const turn = round === 0 ? history : [...history, { role: 'assistant', content: written }, { role: 'user', content: CONTINUE }]
      const stream = client.beta.messages.stream({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        // The course's coach rules arrive as the first user message (built in the browser from the course content).
        messages: turn,
        output_config: { effort: tier === 'quick' ? 'low' : 'medium' },
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
      }, { signal: ctl.signal })
      for await (const ev of stream) {
        if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') { written += ev.delta.text; res.write(ev.delta.text) }
      }
      const final = await stream.finalMessage()
      if (final.stop_reason === 'max_tokens' && written.trim()) {
        console.warn('coach reply hit max_tokens, continuing', { round, usage: final.usage })
        // Glue the next part on cleanly (a cut can land mid-word, so no extra space is added).
        continue
      }
      if (final.stop_reason === 'refusal') res.write('\n\n[The AI can\'t help with that. Try rephrasing your question.]')
      done = final.stop_reason !== 'max_tokens'
      break
    }
  } catch (e) {
    if (!closed) console.error(ctl.signal.aborted ? 'coach reply ran out of time' : e)
  }
  clearTimeout(timer)
  // Not finished (still cut off, AI error, time limit or the learner's connection dropped): give the message back.
  if (!done) {
    await refundCoach(user, { practice })
    if (!closed) res.write(INCOMPLETE)
  }
  res.end()
}
