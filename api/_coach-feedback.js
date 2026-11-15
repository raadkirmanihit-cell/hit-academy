// A learner's thumbs up or down on a coach plan. The rated conversation is sent to the AI once, for a
// short anonymous analysis (src/coach/feedback.js); only that analysis and the rating are stored,
// without the learner's id and without the chat. Files starting with "_" are not API routes.
import Anthropic from '@anthropic-ai/sdk'
import { env, db } from './_lib.js'
import { feedbackPrompt, scrub, SITUATIONS, AREAS, DOWN_REASONS } from '../src/coach/feedback.js'

const MODEL = process.env.COACH_FEEDBACK_MODEL || 'claude-sonnet-5-5'
const MAX_CHARS = 60_000
const PER_DAY = 30 // ratings per learner per day (kept only in memory of this server instance)
const seen = new Map()

const list = (x, n) => (Array.isArray(x) ? x.slice(0, n).map(scrub).filter(Boolean) : [])

export async function feedback(req, res, user, body) {
  try { return await rate(res, user, body) } catch (e) { console.error(e); return res.status(500).json({ error: 'Could not save your feedback.' }) }
}

async function rate(res, user, body) {
  const rating = body.rating === 'up' ? 'up' : body.rating === 'down' ? 'down' : null
  const reason = DOWN_REASONS.includes(body.reason) ? body.reason : null
  const turns = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
  if (!rating || turns.length < 2) return res.status(400).json({ error: 'Nothing to rate.' })
  const day = new Date().toISOString().slice(0, 10), key = `${user.id}:${day}`
  if ((seen.get(key) || 0) >= PER_DAY) return res.status(429).json({ error: 'Thanks, that is plenty of feedback for today.' })
  seen.set(key, (seen.get(key) || 0) + 1)

  const transcript = turns.map((m) => `${m.role === 'user' ? 'LEARNER' : 'COACH'}: ${m.content.replace(/<case>[\s\S]*?(<\/case>|$)/g, '').trim()}`).join('\n\n').slice(-MAX_CHARS)
  let a = {}
  try {
    const client = new Anthropic({ apiKey: env('ANTHROPIC_API_KEY') })
    const r = await client.messages.create({ model: MODEL, max_tokens: 800, messages: [{ role: 'user', content: feedbackPrompt({ rating, reason, transcript }) }] })
    const text = r.content.map((b) => b.text || '').join('')
    a = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1))
  } catch (e) { console.error('coach feedback analysis', e) }

  const row = {
    rating, reason,
    version: String(body.version || '').slice(0, 20) || null,
    situation: SITUATIONS.includes(a.situation) ? a.situation : 'other',
    summary: scrub(a.summary).slice(0, 120) || null,
    question_rounds: Number.isFinite(a.questionRounds) ? Math.max(0, Math.min(20, Math.round(a.questionRounds))) : null,
    went_well: list(a.wentWell, 3),
    went_wrong: list(a.wentWrong, 3),
    area: AREAS.includes(a.area) ? a.area : 'other',
    lesson: scrub(a.lesson) || null,
  }
  const { error } = await db().from('coach_feedback').insert(row)
  if (error) console.error('coach feedback save', error.message) // e.g. database update 12 not run yet
  res.status(200).json({ ok: true })
}
