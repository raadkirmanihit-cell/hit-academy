// Course reviews (needs database update 9).
//   GET                 -> published reviews, average and count (public: the landing page shows them)
//   GET ?mine=1         -> the signed-in student's own review and whether they may write one
//   GET ?admin=1        -> every review, for Raad's control board
//   POST { action: 'submit', rating, body }   -> save (or update) the student's review; it waits for approval
//   POST { action: 'google' }                 -> note that the student opened Google's review page
//   POST { action: 'publish' | 'reject', id, reason? }  -> Raad only
// Only buyers (a module or the complete course) can write. Raad can publish or reject, never edit,
// and may reject only for the reasons in src/content/reviews.js (spam, abuse, private details, off topic).
import { requireUser, isAdmin, hasPaid, db, readJson, notifyOwner, sendEmail, siteUrl, fail } from './_lib.js'
import { checkReview, shortName, rejectReason, REJECT_REASONS, summary } from '../src/content/reviews.js'

const bad = (msg, status = 400) => Object.assign(new Error(msg), { status })
const notReady = (e) => /relation|schema cache|does not exist/i.test(e?.message || '')
const must = ({ data, error }) => { if (error) throw error; return data }
const pub = (r) => ({ id: r.id, name: r.display_name, rating: r.rating, body: r.body, at: r.created_at })

function query(req) {
  if (req.query && Object.keys(req.query).length) return req.query
  return Object.fromEntries(new URL(req.url || '/', 'http://x').searchParams)
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const q = query(req)
      if (q.mine || q.admin) {
        const user = await requireUser(req)
        if (q.admin) {
          if (!isAdmin(user)) throw bad('Admins only.', 403)
          const { data, error } = await db().from('reviews').select('*').order('created_at', { ascending: false }).limit(1000)
          if (error && notReady(error)) return res.status(200).json({ ready: false, reviews: [] })
          if (error) throw error
          const emails = new Map(must(await db().from('profiles').select('id, email').in('id', data.map((r) => r.user_id).concat(['00000000-0000-0000-0000-000000000000']))).map((p) => [p.id, p.email]))
          return res.status(200).json({ ready: true, reviews: data.map((r) => ({ ...pub(r), status: r.status, rejectReason: r.reject_reason, email: emails.get(r.user_id) || '', google: !!r.google_clicked_at, updatedAt: r.updated_at })), ...summary(data) })
        }
        const [canReview, mine] = await Promise.all([
          isAdmin(user) ? true : hasPaid(user.id),
          db().from('reviews').select('*').eq('user_id', user.id).maybeSingle(),
        ])
        if (mine.error && notReady(mine.error)) return res.status(200).json({ ready: false, canReview, mine: null })
        if (mine.error) throw mine.error
        const m = mine.data
        return res.status(200).json({ ready: true, canReview, mine: m ? { ...pub(m), status: m.status, rejectReason: m.reject_reason } : null })
      }
      const { data, error } = await db().from('reviews').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(200)
      if (error && notReady(error)) return res.status(200).json({ reviews: [], count: 0, average: null })
      if (error) throw error
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600')
      return res.status(200).json({ reviews: data.map(pub), ...summary(data) })
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Use GET or POST.' })

    const user = await requireUser(req)
    const body = await readJson(req)

    if (body.action === 'submit') {
      if (!isAdmin(user) && !(await hasPaid(user.id))) throw bad('Reviews are open to students who bought the course.', 403)
      const rating = Number(body.rating)
      const text = String(body.body || '').trim()
      const problem = checkReview(rating, text)
      if (problem) throw bad(problem)
      const { data: p } = await db().from('profiles').select('name').eq('id', user.id).maybeSingle()
      const now = new Date().toISOString()
      // A review with text waits for approval (also after an edit). Stars only have nothing to check,
      // so they count straight away.
      const starsOnly = !text
      const { error } = await db().from('reviews').upsert({
        user_id: user.id, display_name: shortName(p?.name || user.user_metadata?.name), rating, body: text,
        status: starsOnly ? 'published' : 'pending', reject_reason: null, decided_at: starsOnly ? now : null, updated_at: now,
      }, { onConflict: 'user_id' })
      if (error && notReady(error)) throw bad('Reviews aren\'t switched on yet. Please try again soon.', 503)
      if (error) throw error
      if (starsOnly) return res.status(200).json({ ok: true, status: 'published' })
      await notifyOwner(`New course review (${rating}★) waiting for approval`, [
        `${p?.name || ''} <${user.email}> wrote:`, '', `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`, text, '',
        `Publish or reject it on your control board (Reviews tab): ${siteUrl(req)}/#/admin`,
        'Remember: publish every genuine review, including critical ones. Reject only spam, abuse, private details or off-topic text.',
      ])
      return res.status(200).json({ ok: true, status: 'pending' })
    }

    if (body.action === 'google') {
      await db().from('reviews').update({ google_clicked_at: new Date().toISOString() }).eq('user_id', user.id)
      return res.status(200).json({ ok: true })
    }

    if (body.action === 'publish' || body.action === 'reject') {
      if (!isAdmin(user)) throw bad('Admins only.', 403)
      const id = String(body.id || '')
      const r = must(await db().from('reviews').select('*').eq('id', id).maybeSingle())
      if (!r) throw bad('Review not found.', 404)
      const now = new Date().toISOString()
      if (body.action === 'publish') {
        must(await db().from('reviews').update({ status: 'published', reject_reason: null, decided_at: now }).eq('id', id))
        return res.status(200).json({ ok: true })
      }
      const reason = rejectReason(body.reason)
      if (!reason) throw bad(`Choose a reason: ${REJECT_REASONS.map((x) => x.label).join(', ')}.`)
      must(await db().from('reviews').update({ status: 'rejected', reject_reason: reason, decided_at: now }).eq('id', id))
      const { data: p } = await db().from('profiles').select('name, email').eq('id', r.user_id).maybeSingle()
      if (p?.email) await sendEmail(p.email, 'About your H.I.T. Academy review', [
        `Hello ${p.name?.split(' ')[0] || 'there'},`, '',
        'Thank you for reviewing the course. We could not publish your review as written, for this reason:', `- ${reason}`, '',
        `You are welcome to change it and send it again: ${siteUrl(req)}/#/reviews`, '', 'Human Interactions Translated',
      ])
      return res.status(200).json({ ok: true })
    }

    throw bad('Unknown action.')
  } catch (e) { fail(res, e) }
}
