// The AI coach on the live site: streams Claude's reply as plain text.
// Course buyers get a few free messages; after that it needs the monthly coach subscription.
// Subscribers have a monthly fair-use cap, and everyone has a daily limit.
import Anthropic from '@anthropic-ai/sdk'
import { env, db, requireUser, hasPaid, readJson, fail, coachAccess } from './_lib.js'

const MODEL = process.env.COACH_MODEL || 'claude-opus-5-5'
const DAILY_LIMIT = Number(process.env.COACH_DAILY_LIMIT || 80)
const MAX_CHARS = 120_000

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })
  let user
  try {
    user = await requireUser(req)
    if (!(await hasPaid(user.id))) return res.status(403).json({ error: 'The AI coach is for students who bought the course.', code: 'not_granted' })
  } catch (e) { return fail(res, e) }

  let access
  try { access = await coachAccess(user.id) } catch (e) { return fail(res, e) }
  if (access.left <= 0) {
    return access.subscribed
      ? res.status(429).json({ error: `You have used this month's ${access.limit} coach messages. ${access.periodEnd ? `They renew on ${new Date(access.periodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.` : 'They renew with your next monthly payment.'}`, code: 'monthly_limit' })
      : res.status(402).json({ error: 'Your free coach messages are used up. Subscribe to keep coaching.', code: 'needs_subscription' })
  }

  let messages, tier
  try {
    const body = await readJson(req)
    tier = body.modelTier === 'quick' ? 'quick' : 'default'
    messages = (Array.isArray(body.messages) ? body.messages : [{ role: 'user', content: String(body.messages || '') }])
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({ role: m.role, content: m.content }))
    if (!messages.length || messages[messages.length - 1].role !== 'user') return res.status(400).json({ error: 'Nothing to answer.' })
    if (JSON.stringify(messages).length > MAX_CHARS) return res.status(413).json({ error: 'That conversation is too long. Please start a new one.' })
  } catch { return res.status(400).json({ error: 'Bad request.' }) }

  const { data: count, error: usageError } = await db().rpc('bump_coach_usage', { p_user: user.id })
  if (usageError) return fail(res, usageError)
  if (count > DAILY_LIMIT) return res.status(429).json({ error: 'You have reached today\'s coach limit. It resets at midnight.', code: 'rate_limited' })

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
