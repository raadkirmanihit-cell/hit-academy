// The AI coach on the live site: streams Claude's reply as plain text.
// Every account gets a few free messages; after that it needs the monthly coach subscription.
// Complete-course buyers also get a practice pack for the Practice studio role-plays.
// Subscribers have a monthly fair-use cap, and everyone has a daily limit.
import Anthropic from '@anthropic-ai/sdk'
import { env, requireUser, readJson, fail, chargeCoach } from './_lib.js'

const MODEL = process.env.COACH_MODEL || 'claude-opus-5-5'
const MAX_CHARS = 120_000

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  let user
  try {
    user = await requireUser(req)
  } catch (e) { return fail(res, e) }

  let messages, tier, practice
  try {
    const body = await readJson(req)
    tier = body.modelTier === 'quick' ? 'quick' : 'default'
    practice = body.purpose === 'practice' // a Practice studio role-play (or its feedback report)
    messages = (Array.isArray(body.messages) ? body.messages : [{ role: 'user', content: String(body.messages || '') }])
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({ role: m.role, content: m.content }))
    if (!messages.length || messages[messages.length - 1].role !== 'user') return res.status(400).json({ error: 'Nothing to answer.' })
    if (JSON.stringify(messages).length > MAX_CHARS) return res.status(413).json({ error: 'That conversation is too long. Please start a new one.' })
  } catch { return res.status(400).json({ error: 'Bad request.' }) }

  try {
    const stop = await chargeCoach(user.id, { practice })
    if (stop) return res.status(stop.status).json(stop.body)
  } catch (e) { return fail(res, e) }

  const client = new Anthropic({ apiKey: env('ANTHROPIC_API_KEY') })
  const ctl = new AbortController()
  req.on('close', () => ctl.abort())

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' })
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 4000,
      // The course's coach rules arrive as the first user message (built in the browser from the course content).
      messages,
      output_config: { effort: tier === 'quick' ? 'low' : 'medium' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
    }, { signal: ctl.signal })
    for await (const ev of stream) {
      if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') res.write(ev.delta.text)
    }
    const final = await stream.finalMessage()
    if (final.stop_reason === 'refusal') res.write('\n\n[The coach can\'t help with that. Try rephrasing your question.]')
  } catch (e) {
    if (!ctl.signal.aborted) {
      console.error(e)
      res.write('\n\n[The coach is unavailable right now. Please try again in a moment.]')
    }
  }
  res.end()
}
