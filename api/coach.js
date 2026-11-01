// The AI coach on the live site: streams Claude's reply as plain text.
// Every account gets a few free messages; after that it needs the monthly coach subscription.
// Complete-course buyers also get a practice pack for the Practice studio role-plays.
// Subscribers have a monthly fair-use cap, and everyone has a daily limit.
import Anthropic from '@anthropic-ai/sdk'
import { env, db, requireUser, readJson, fail, coachAccess } from './_lib.js'

const MODEL = process.env.COACH_MODEL || 'claude-opus-5-5'
const DAILY_LIMIT = Number(process.env.COACH_DAILY_LIMIT || 80)
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

  let access
  try { access = await coachAccess(user.id) } catch (e) { return fail(res, e) }
  // Which allowance pays for this message:
  // - coach chat: the free taster, or the subscription's monthly messages;
  // - a practice role-play: the subscription's monthly messages first (they expire), then the
  //   practice pack that comes with the complete course (no expiry), then the free taster.
  const usedUp = () => access.subscribed
    ? res.status(429).json({ error: `You have used this month's ${access.limit} coach messages. ${access.periodEnd ? `They renew on ${new Date(access.periodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.` : 'They renew with your next monthly payment.'}`, code: 'monthly_limit' })
    : res.status(402).json({ error: practice && access.practiceLimit ? `You have used the ${access.practiceLimit} practice messages that come with the course. Subscribe to the AI coach to keep practising.` : 'Your free coach messages are used up. Subscribe to keep coaching.', code: 'needs_subscription' })
  let fromPack = false
  if (practice) {
    if (access.subscribed && access.left > 0) { /* monthly messages first */ }
    else if (access.practiceLeft > 0) fromPack = true
    else if (access.left <= 0) return usedUp()
  } else if (access.left <= 0) return usedUp()

  let count, usageError
  if (fromPack) {
    ({ data: count, error: usageError } = await db().rpc('bump_practice_usage', { p_user: user.id }))
    if (usageError) ({ data: count, error: usageError } = await db().rpc('bump_coach_usage', { p_user: user.id })) // before update 5
  } else ({ data: count, error: usageError } = await db().rpc('bump_coach_usage', { p_user: user.id }))
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
