// The members' community forum (needs database update 7).
// Paying members only (a bought module or the complete course, or the AI coach subscription) can read
// and post. Free accounts get { locked: true }. Posting also needs a display name and the community rules.
// Raad (ADMIN_EMAILS) moderates: remove posts, pin and lock threads, block members, resolve reports.
// Removals and blocks send the member a statement of reasons, as the EU Digital Services Act asks.
import { createHmac, timingSafeEqual } from 'node:crypto'
import { requireUser, isAdmin, db, env, readJson, notifyOwner, sendEmail, siteUrl, fail } from './_lib.js'
import { COURSE_PRODUCT_IDS } from '../src/content/pricing.js'
import { CATEGORIES, categoryOf, checkText, reservedName, parsePhoto, LIMITS, reportReason, removalReason, REPORT_REASONS, REMOVAL_REASONS } from '../src/content/forum.js'

const COACH_ACTIVE = new Set(['active', 'trialing', 'past_due', 'included'])
const bad = (msg, status = 400) => Object.assign(new Error(msg), { status })
const notReady = (e) => /relation|schema cache|does not exist/i.test(e?.message || '')
const uuid = (s) => /^[0-9a-f-]{36}$/i.test(String(s || ''))
const dayAgo = () => new Date(Date.now() - 864e5).toISOString()
const must = ({ data, error }) => { if (error) throw error; return data }

function query(req) {
  if (req.query && Object.keys(req.query).length) return req.query
  return Object.fromEntries(new URL(req.url || '/', 'http://x').searchParams)
}

// Profile photos. An <img> cannot send the sign-in token, so each photo gets a link signed by the
// server: only members ever receive these links, they change with every new photo, and an old link
// stops working as soon as the photo is replaced or removed.
const PHOTO_KEY = () => 'forum-photo:' + env('SUPABASE_SERVICE_ROLE_KEY')
const sign = (s) => createHmac('sha256', PHOTO_KEY()).update(s).digest('base64url').slice(0, 22)
const photoUrl = (userId, v) => (v ? `/api/forum?photo=${userId}.${v}.${sign(`${userId}.${v}`)}` : null)

async function servePhoto(res, token) {
  const [userId, v, sig] = String(token).split('.')
  const want = Buffer.from(sign(`${userId}.${v}`)), got = Buffer.from(String(sig || ''))
  if (!uuid(userId) || !/^\d+$/.test(v || '') || want.length !== got.length || !timingSafeEqual(want, got)) return res.status(404).end()
  const m = must(await db().from('forum_members').select('avatar, avatar_v').eq('user_id', userId).maybeSingle())
  if (!m?.avatar || String(m.avatar_v) !== v) return res.status(404).end()
  const photo = parsePhoto(m.avatar)
  if (typeof photo === 'string') return res.status(404).end()
  res.writeHead(200, {
    'Content-Type': photo.type, 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'",
    'Cache-Control': 'private, max-age=86400', // the browser keeps it a day; a new photo gets a new link
  })
  res.end(Buffer.from(photo.base64, 'base64'))
}

// The member columns we need for each request (the photo itself is only read by servePhoto).
const MEMBER_COLS = 'user_id, display_name, rules_accepted_at, blocked_at, blocked_reason, avatar_v'
// Until database update 11 has been run there is no photo column: carry on without photos.
async function members(build, cols) {
  const r = await build(cols)
  return r.error && /avatar/.test(r.error.message || '') ? build(cols.replace(/,\s*avatar_v/, '')) : r
}

// Who is asking, and what they may do.
async function whoAmI(user) {
  const admin = isAdmin(user)
  // Three small lookups at once (one after the other made every click slow).
  const [prof, bought, coach] = await Promise.all([
    members((c) => db().from('forum_members').select(c).eq('user_id', user.id).maybeSingle(), MEMBER_COLS),
    db().from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'paid').in('product_id', COURSE_PRODUCT_IDS).limit(1),
    db().from('coach_subscriptions').select('status, current_period_end').eq('user_id', user.id).maybeSingle(),
  ])
  if (prof.error) throw prof.error
  const p = prof.data
  // Same rule as coachAccess() in _lib.js: an active subscription, with 3 days' grace on paid renewals.
  const c = coach.error ? null : coach.data
  const grace = c?.status === 'included' ? 0 : 3 * 864e5
  const subscribed = !!c && COACH_ACTIVE.has(c.status) && (!c.current_period_end || new Date(c.current_period_end) > Date.now() - grace)
  const member = admin || (bought.data || []).length > 0 || subscribed
  const blocked = !!p?.blocked_at && !admin
  return {
    admin, member, blocked,
    blockedReason: blocked ? p.blocked_reason || '' : '',
    name: p?.display_name || '',
    photo: photoUrl(user.id, p?.avatar_v),
    rulesAccepted: !!p?.rules_accepted_at,
    canPost: member && !blocked && !!p?.display_name && !!p?.rules_accepted_at,
  }
}

// Display names, photo links (and whether the author is Raad) for a list of user ids.
async function authors(ids) {
  ids = [...new Set(ids.filter(Boolean))]
  if (!ids.length) return new Map()
  const [names, profiles] = await Promise.all([
    members((c) => db().from('forum_members').select(c).in('user_id', ids), 'user_id, display_name, avatar_v'),
    db().from('profiles').select('id, email').in('id', ids),
  ])
  const emails = new Map((profiles.data || []).map((p) => [p.id, p.email]))
  const out = new Map()
  for (const id of ids) out.set(id, { name: '', photo: null, trainer: isAdmin({ email: emails.get(id) }) })
  for (const n of names.data || []) Object.assign(out.get(n.user_id), { name: n.display_name, photo: photoUrl(n.user_id, n.avatar_v) })
  return out
}

const authorOf = (map, id) => {
  const a = map.get(id)
  if (!id || !a) return { name: 'Former member', photo: null, trainer: false }
  return { name: a.name || 'Member', photo: a.photo, trainer: a.trainer }
}

// All conversations in one go: the browser filters by category itself, so switching is instant.
async function listThreads(user, me) {
  const threads = must(await db().from('forum_threads').select('*').is('removed_at', null).order('pinned', { ascending: false }).order('last_post_at', { ascending: false }).limit(500))
  const who = await authors(threads.map((t) => t.user_id))
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c.id, threads.filter((t) => t.category === c.id).length]))
  return {
    me, counts,
    threads: threads.map((t) => ({
      id: t.id, category: t.category, title: t.title, ...authorOf(who, t.user_id), mine: t.user_id === user.id,
      pinned: t.pinned, locked: t.locked, replies: t.reply_count, lastPostAt: t.last_post_at, createdAt: t.created_at,
    })),
  }
}

async function readThread(user, me, id) {
  if (!uuid(id)) throw bad('This conversation does not exist.', 404)
  const [tr, pr] = await Promise.all([
    db().from('forum_threads').select('*').eq('id', id).maybeSingle(),
    db().from('forum_posts').select('*').eq('thread_id', id).order('created_at').limit(1000),
  ])
  const t = must(tr), posts = must(pr)
  if (!t || (t.removed_at && !me.admin && t.user_id !== user.id)) throw bad('This conversation was removed or does not exist.', 404)
  const [who, reps] = await Promise.all([
    authors([t.user_id, ...posts.map((p) => p.user_id)]),
    me.admin && posts.length ? db().from('forum_reports').select('post_id').is('resolved_at', null).in('post_id', posts.map((p) => p.id)).then(must) : [],
  ])
  const open = new Map()
  for (const r of reps) open.set(r.post_id, (open.get(r.post_id) || 0) + 1)
  return {
    me,
    thread: { id: t.id, category: t.category, title: t.title, pinned: t.pinned, locked: t.locked, removed: !!t.removed_at, mine: t.user_id === user.id, createdAt: t.created_at },
    posts: posts.map((p) => {
      const mine = p.user_id === user.id
      const status = p.removed_at ? 'removed' : p.deleted_at ? 'deleted' : 'ok'
      // Removed posts stay readable for the author and for Raad, so the reason makes sense.
      const show = status === 'ok' || (status === 'removed' && (mine || me.admin))
      return {
        id: p.id, first: p.is_first, ...authorOf(who, p.user_id), mine, status,
        body: show ? p.body : null,
        removedReason: status === 'removed' && (mine || me.admin) ? removalReason(p.removed_reason) : null,
        removedNote: status === 'removed' && (mine || me.admin) ? p.removed_note || '' : null,
        createdAt: p.created_at, editedAt: p.edited_at,
        reports: me.admin ? open.get(p.id) || 0 : undefined,
        authorId: me.admin ? p.user_id : undefined,
      }
    }),
  }
}

// Deleted and removed posts are kept for 6 months (to handle complaints), resolved reports for a year.
// The Privacy Policy promises this, so the clean-up runs each time Raad opens the moderation view.
async function purgeOld() {
  const months = (n) => new Date(Date.now() - n * 30 * 864e5).toISOString()
  await db().from('forum_reports').delete().lt('resolved_at', months(12))
  await db().from('forum_posts').delete().lt('deleted_at', months(6))
  await db().from('forum_posts').delete().lt('removed_at', months(6))
  await db().from('forum_threads').delete().lt('removed_at', months(6))
}

async function adminView() {
  await purgeOld().catch((e) => console.error('Community clean-up failed', e))
  const reports = must(await db().from('forum_reports').select('*').order('created_at', { ascending: false }).limit(300))
  const postIds = [...new Set(reports.map((r) => r.post_id).filter(Boolean))]
  const posts = postIds.length ? must(await db().from('forum_posts').select('id, thread_id, user_id, body, removed_at, deleted_at').in('id', postIds)) : []
  const postOf = new Map(posts.map((p) => [p.id, p]))
  const threadIds = [...new Set(posts.map((p) => p.thread_id))]
  const threads = threadIds.length ? must(await db().from('forum_threads').select('id, title').in('id', threadIds)) : []
  const titleOf = new Map(threads.map((t) => [t.id, t.title]))
  const memberRows = must(await members((c) => db().from('forum_members').select(c).order('created_at', { ascending: false }).limit(5000), MEMBER_COLS + ', created_at'))
  const ids = [...reports.map((r) => r.reporter_id), ...posts.map((p) => p.user_id), ...memberRows.map((m) => m.user_id)].filter(Boolean)
  const profiles = ids.length ? must(await db().from('profiles').select('id, name, email').in('id', [...new Set(ids)])) : []
  const person = new Map(profiles.map((p) => [p.id, p]))
  const nameOf = new Map(memberRows.map((m) => [m.user_id, m.display_name]))
  const since = new Date(Date.now() - 30 * 864e5).toISOString()
  const recent = must(await db().from('forum_posts').select('user_id').gte('created_at', since).limit(10000))
  const postsBy = new Map()
  for (const p of recent) postsBy.set(p.user_id, (postsBy.get(p.user_id) || 0) + 1)
  return {
    ready: true,
    reports: reports.map((r) => {
      const p = postOf.get(r.post_id)
      return {
        id: r.id, reason: reportReason(r.reason), details: r.details || '', at: r.created_at, resolvedAt: r.resolved_at, resolution: r.resolution,
        reporter: person.get(r.reporter_id)?.email || 'Deleted account',
        post: p ? {
          id: p.id, threadId: p.thread_id, thread: titleOf.get(p.thread_id) || '', body: p.body, status: p.removed_at ? 'removed' : p.deleted_at ? 'deleted' : 'ok',
          author: nameOf.get(p.user_id) || 'Former member', authorEmail: person.get(p.user_id)?.email || '', authorId: p.user_id,
        } : null,
      }
    }),
    members: memberRows.map((m) => ({
      id: m.user_id, name: m.display_name, photo: photoUrl(m.user_id, m.avatar_v), email: person.get(m.user_id)?.email || '', since: m.created_at,
      blockedAt: m.blocked_at, blockedReason: m.blocked_reason || '', posts30: postsBy.get(m.user_id) || 0,
    })),
  }
}

async function emailOf(userId) {
  const { data } = await db().from('profiles').select('email, name').eq('id', userId).maybeSingle()
  return data
}

// The statement of reasons sent to a member when a post is removed or they are blocked (DSA Art. 17).
function reasonsEmail({ what, ground, note, url }) {
  return [
    `${what}`,
    '',
    `Reason: ${ground}.`,
    ...(note ? [`Details: ${note}`] : []),
    'This decision was made by a person (Raad Kirmani), not by an automated system. It was based on the community rules in section 12 of our Terms and Conditions.',
    '',
    'If you think this decision is wrong, reply to this email and tell us why. We will look at it again and answer you. You can also use an out-of-court dispute settlement body certified under the EU Digital Services Act, or go to court.',
    '',
    `Community rules and Terms: ${url}/?page=terms`,
    '',
    'H.I.T. Academy',
  ]
}

async function countSince(table, userId, extra = (q) => q) {
  const { count } = await extra(db().from(table).select('id', { count: 'exact', head: true }).eq(table === 'forum_reports' ? 'reporter_id' : 'user_id', userId).gte('created_at', dayAgo()))
  return count || 0
}

async function act(req, user, me, body) {
  const a = body.action
  const now = new Date().toISOString()
  const ok = (extra = {}) => ({ ok: true, ...extra })

  if (a === 'profile') {
    if (!me.member) throw bad('Posting in the community is for course members. Buy a module or the complete course to join in.', 403)
    // Choosing the name and accepting the rules happens once; after that members can change their
    // name and photo at any time (also while blocked from posting, so they can remove a photo).
    const name = String(body.name || '').trim().replace(/\s+/g, ' ')
    const err = checkText('name', name) || (me.admin ? '' : reservedName(name))
    if (err) throw bad(err)
    if (!me.rulesAccepted && !body.acceptRules) throw bad('Please accept the community rules.')
    if (me.blocked && name !== me.name) throw bad('You cannot change your display name while you are blocked from posting.', 403)
    const row = { user_id: user.id, display_name: name, ...(me.rulesAccepted ? {} : { rules_accepted_at: now }) }
    if (body.photo === null) Object.assign(row, { avatar: null, avatar_v: null })
    else if (body.photo !== undefined) {
      if (me.blocked) throw bad('You cannot add a photo while you are blocked from posting.', 403)
      const photo = parsePhoto(body.photo)
      if (typeof photo === 'string') throw bad(photo)
      if (!me.admin && (await photoChanges(user.id)) >= LIMITS.photoChangesPerDay) throw bad('You have changed your photo a lot today. Please try again tomorrow.', 429)
      Object.assign(row, { avatar: body.photo, avatar_v: Date.now() })
    }
    const saved = await db().from('forum_members').upsert(row, { onConflict: 'user_id' })
    if (saved.error && /avatar/.test(saved.error.message || '')) throw bad('Profile photos are not switched on yet. Please try again later.', 503)
    must(saved)
    return ok({ photo: row.avatar_v !== undefined ? photoUrl(user.id, row.avatar_v) : me.photo })
  }

  // Reporting is open to every member who can read, including blocked ones (the DSA asks for an easy way to report).
  if (a === 'report') {
    if (!uuid(body.postId)) throw bad('Post not found.', 404)
    if (!REPORT_REASONS.some((r) => r.id === body.reason)) throw bad('Please choose a reason.')
    if ((await countSince('forum_reports', user.id)) >= LIMITS.reportsPerDay) throw bad('You have sent a lot of reports today. Please email us if something is urgent.', 429)
    const p = must(await db().from('forum_posts').select('id, thread_id, body').eq('id', body.postId).maybeSingle())
    if (!p) throw bad('Post not found.', 404)
    const details = String(body.details || '').trim().slice(0, 2000)
    must(await db().from('forum_reports').insert({ post_id: p.id, reporter_id: user.id, reason: body.reason, details }))
    await notifyOwner(`Community report: ${reportReason(body.reason)}`, [
      `Reported by: ${user.email}`, `Reason: ${reportReason(body.reason)}`, ...(details ? [`Details: ${details}`] : []), '',
      'The post:', p.body.slice(0, 1500), '', `Review it on your control board (Community tab): ${siteUrl(req)}/#/admin`,
    ], { replyTo: user.email })
    return ok()
  }

  // Admin moderation.
  if (['remove', 'pin', 'lock', 'block', 'dismiss', 'removePhoto'].includes(a)) {
    if (!me.admin) throw bad('Admins only.', 403)
    if (a === 'removePhoto') {
      if (!uuid(body.userId) || !REMOVAL_REASONS.some((r) => r.id === body.reason)) throw bad('Choose the member and a reason.')
      const who = await emailOf(body.userId)
      if (isAdmin({ email: who?.email })) throw bad('Use your own community profile to change your photo.')
      must(await db().from('forum_members').update({ avatar: null, avatar_v: null }).eq('user_id', body.userId))
      const note = String(body.note || '').trim().slice(0, 1000)
      if (who?.email) await sendEmail(who.email, 'Your community profile photo was removed', reasonsEmail({
        what: `Hello${who.name ? ` ${who.name.split(' ')[0]}` : ''},\n\nwe removed your profile photo in the H.I.T. Academy community. Your posts are not affected, and you can add a different photo that follows the community rules.`,
        ground: removalReason(body.reason), note, url: siteUrl(req),
      }), { replyTo: process.env.NOTIFY_EMAIL?.split(',')[0] })
      return ok()
    }
    if (a === 'remove') {
      if (!uuid(body.postId) || !REMOVAL_REASONS.some((r) => r.id === body.reason)) throw bad('Choose the post and a reason.')
      const p = must(await db().from('forum_posts').select('*').eq('id', body.postId).maybeSingle())
      if (!p) throw bad('Post not found.', 404)
      const note = String(body.note || '').trim().slice(0, 1000)
      must(await db().from('forum_posts').update({ removed_at: now, removed_reason: body.reason, removed_note: note }).eq('id', p.id))
      if (p.is_first) must(await db().from('forum_threads').update({ removed_at: now }).eq('id', p.thread_id))
      await recount(p.thread_id)
      // Close the reports about this post and tell each reporter (DSA Art. 16 (5)).
      await resolveReports(req, p.id, 'removed')
      const author = p.user_id && !isAdmin({ email: (await emailOf(p.user_id))?.email }) ? await emailOf(p.user_id) : null
      if (author?.email) {
        await sendEmail(author.email, 'Your community post was removed', reasonsEmail({
          what: `Hello${author.name ? ` ${author.name.split(' ')[0]}` : ''},\n\nwe removed ${p.is_first ? 'a conversation you started' : 'one of your posts'} in the H.I.T. Academy community. It is no longer visible to other members. You can still see it, with this reason, when you open the conversation.\n\nYour post: "${p.body.slice(0, 400)}${p.body.length > 400 ? '…' : ''}"`,
          ground: removalReason(body.reason), note, url: siteUrl(req),
        }), { replyTo: process.env.NOTIFY_EMAIL?.split(',')[0] })
      }
      return ok()
    }
    if (a === 'pin' || a === 'lock') {
      if (!uuid(body.threadId)) throw bad('Conversation not found.', 404)
      must(await db().from('forum_threads').update({ [a === 'pin' ? 'pinned' : 'locked']: !!body.on }).eq('id', body.threadId))
      return ok()
    }
    if (a === 'dismiss') {
      const r = must(await db().from('forum_reports').select('post_id').eq('id', body.reportId).maybeSingle())
      if (!r) throw bad('Report not found.', 404)
      if (r.post_id) await resolveReports(req, r.post_id, 'kept')
      else must(await db().from('forum_reports').update({ resolved_at: now, resolution: 'kept' }).eq('id', body.reportId))
      return ok()
    }
    if (a === 'block') {
      if (!uuid(body.userId)) throw bad('Member not found.', 404)
      const who = await emailOf(body.userId)
      if (isAdmin({ email: who?.email })) throw bad('You cannot block yourself.')
      if (body.on && !REMOVAL_REASONS.some((r) => r.id === body.reason)) throw bad('Please choose a reason.')
      const note = String(body.note || '').trim().slice(0, 1000)
      const reason = body.on ? `${removalReason(body.reason)}${note ? `: ${note}` : ''}` : null
      const existing = must(await db().from('forum_members').select('user_id').eq('user_id', body.userId).maybeSingle())
      if (existing) must(await db().from('forum_members').update({ blocked_at: body.on ? now : null, blocked_reason: reason }).eq('user_id', body.userId))
      else must(await db().from('forum_members').insert({ user_id: body.userId, display_name: who?.name || 'Member', blocked_at: body.on ? now : null, blocked_reason: reason }))
      if (who?.email) {
        if (body.on) await sendEmail(who.email, 'You can no longer post in the community', reasonsEmail({
          what: `Hello${who.name ? ` ${who.name.split(' ')[0]}` : ''},\n\nwe have stopped you from posting in the H.I.T. Academy community. You can still read the community and use the whole course as before.`,
          ground: removalReason(body.reason), note, url: siteUrl(req),
        }), { replyTo: process.env.NOTIFY_EMAIL?.split(',')[0] })
        else await sendEmail(who.email, 'You can post in the community again', [`Hello${who.name ? ` ${who.name.split(' ')[0]}` : ''},`, '', 'you can post in the H.I.T. Academy community again. Thank you for keeping it a respectful, professional place.', '', 'H.I.T. Academy'])
      }
      return ok()
    }
  }

  // Everything below writes a post: members only.
  if (me.blocked) throw bad(`You can no longer post in the community.${me.blockedReason ? ` Reason: ${me.blockedReason}.` : ''} Write to us if you think this is a mistake.`, 403)
  if (!me.member) throw bad('Posting in the community is for course members. Buy a module or the complete course to join in.', 403)
  if (!me.canPost) throw bad('Choose a display name and accept the community rules first.', 403)

  if (a === 'thread') {
    const cat = categoryOf(body.category)
    if (!cat) throw bad('Choose a category.')
    if (cat.adminOnly && !me.admin) throw bad('Only Raad can start a conversation in Announcements.', 403)
    const title = String(body.title || '').trim().replace(/\s+/g, ' ')
    const text = String(body.body || '').trim()
    const err = checkText('title', title) || checkText('body', text)
    if (err) throw bad(err)
    if (!me.admin && (await countSince('forum_threads', user.id)) >= LIMITS.threadsPerDay) throw bad(`You can start up to ${LIMITS.threadsPerDay} conversations a day. Please try again tomorrow.`, 429)
    const t = must(await db().from('forum_threads').insert({ category: cat.id, title, user_id: user.id, last_post_at: now }).select('id').single())
    must(await db().from('forum_posts').insert({ thread_id: t.id, user_id: user.id, is_first: true, body: text }))
    return ok({ threadId: t.id })
  }

  if (a === 'reply') {
    if (!uuid(body.threadId)) throw bad('Conversation not found.', 404)
    const t = must(await db().from('forum_threads').select('*').eq('id', body.threadId).maybeSingle())
    if (!t || t.removed_at) throw bad('This conversation was removed.', 404)
    if (t.locked && !me.admin) throw bad('This conversation is closed for new replies.', 403)
    const text = String(body.body || '').trim()
    const err = checkText('body', text)
    if (err) throw bad(err)
    if (!me.admin && (await countSince('forum_posts', user.id)) >= LIMITS.postsPerDay) throw bad('You have posted a lot today. Please try again tomorrow.', 429)
    must(await db().from('forum_posts').insert({ thread_id: t.id, user_id: user.id, body: text }))
    await recount(t.id, now)
    return ok()
  }

  if (a === 'edit' || a === 'delete') {
    if (!uuid(body.postId)) throw bad('Post not found.', 404)
    const p = must(await db().from('forum_posts').select('*').eq('id', body.postId).maybeSingle())
    if (!p || p.user_id !== user.id) throw bad('You can only change your own posts.', 403)
    if (p.removed_at) throw bad('This post was removed by a moderator and cannot be changed.', 403)
    if (a === 'edit') {
      const text = String(body.body || '').trim()
      const title = body.title === undefined ? null : String(body.title).trim().replace(/\s+/g, ' ')
      const err = checkText('body', text) || (title !== null && p.is_first ? checkText('title', title) : '')
      if (err) throw bad(err)
      must(await db().from('forum_posts').update({ body: text, edited_at: now }).eq('id', p.id))
      if (title !== null && p.is_first) must(await db().from('forum_threads').update({ title }).eq('id', p.thread_id))
      return ok()
    }
    must(await db().from('forum_posts').update({ deleted_at: now }).eq('id', p.id))
    // Deleting the first post takes the whole conversation down (replies stay stored for moderation).
    if (p.is_first) must(await db().from('forum_threads').update({ removed_at: now }).eq('id', p.thread_id))
    else await recount(p.thread_id)
    return ok({ threadRemoved: p.is_first })
  }

  throw bad('Unknown action.')
}

// Photo uploads in the last day, counted in the server's memory. That is enough to stop someone
// uploading in a loop, which is all this limit is for.
const photoTimes = new Map()
async function photoChanges(userId) {
  const since = Date.now() - 864e5
  const times = (photoTimes.get(userId) || []).filter((t) => t > since)
  times.push(Date.now())
  photoTimes.set(userId, times)
  return times.length - 1
}

// Keeps the reply count (visible replies only) and the last activity time up to date.
async function recount(threadId, lastAt) {
  const { count } = await db().from('forum_posts').select('id', { count: 'exact', head: true }).eq('thread_id', threadId).eq('is_first', false).is('removed_at', null).is('deleted_at', null)
  must(await db().from('forum_threads').update({ reply_count: count || 0, ...(lastAt ? { last_post_at: lastAt } : {}) }).eq('id', threadId))
}

// Marks every open report about a post as resolved and tells each reporter the outcome.
async function resolveReports(req, postId, resolution) {
  const open = must(await db().from('forum_reports').select('id, reporter_id').eq('post_id', postId).is('resolved_at', null))
  if (!open.length) return
  must(await db().from('forum_reports').update({ resolved_at: new Date().toISOString(), resolution }).in('id', open.map((r) => r.id)))
  for (const id of new Set(open.map((r) => r.reporter_id).filter(Boolean))) {
    const who = await emailOf(id)
    if (!who?.email) continue
    await sendEmail(who.email, 'Your community report', [
      `Hello${who.name ? ` ${who.name.split(' ')[0]}` : ''},`, '',
      'thank you for reporting a post in the H.I.T. Academy community. Raad has reviewed it.',
      resolution === 'removed' ? 'The post broke our community rules and has been removed.' : 'After review, the post does not break our community rules, so it stays up. If you have more information, reply to this email.',
      '', 'H.I.T. Academy',
    ], { replyTo: process.env.NOTIFY_EMAIL?.split(',')[0] })
  }
}

export default async function handler(req, res) {
  try {
    const q0 = query(req)
    if (req.method === 'GET' && q0.photo) return await servePhoto(res, q0.photo)
    const user = await requireUser(req)
    let me
    try { me = await whoAmI(user) } catch (e) {
      if (notReady(e)) return res.status(503).json({ error: 'The community opens soon.', code: 'not_ready' })
      throw e
    }
    // Free accounts see a locked page: nothing from the community is sent to them.
    if (!me.member) return res.status(req.method === 'POST' ? 403 : 200).json(req.method === 'POST' ? { error: 'The community is for course members. Buy a module or the complete course to join.' } : { locked: true, me })
    if (req.method === 'POST') return res.status(200).json(await act(req, user, me, await readJson(req)))
    const q = query(req)
    if (q.admin !== undefined) {
      if (!me.admin) throw bad('Admins only.', 403)
      return res.status(200).json(await adminView())
    }
    if (q.thread) return res.status(200).json(await readThread(user, me, q.thread))
    res.status(200).json(await listThreads(user, me))
  } catch (e) { fail(res, e) }
}
