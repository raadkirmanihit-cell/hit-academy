// PREVIEW community forum: same answers as api/forum.js, kept in this browser only.
// Moderation is not available in the preview (there is no admin there).
import { readJSON, writeJSON } from './storage.js'
import { CATEGORIES, categoryOf, checkText } from '../content/forum.js'
import { COURSE_PRODUCT_IDS } from '../content/pricing.js'

const KEY = 'hit.forum'
const load = () => readJSON(KEY, { members: {}, threads: [], posts: [] })
const id = () => crypto.randomUUID?.() || 'f_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
const fail = (m) => { throw new Error(m) }

function meOf(user, db) {
  const member = !!user?.purchases?.some((p) => p.status === 'paid' && COURSE_PRODUCT_IDS.includes(p.productId))
  const p = db.members[user?.id]
  return { admin: false, member, blocked: false, blockedReason: '', name: p?.name || '', rulesAccepted: !!p?.rulesAt, canPost: member && !!p?.name && !!p?.rulesAt }
}

const nameOf = (db, uid) => db.members[uid]?.name || 'Member'

export const previewForum = {
  read(user, { thread, category } = {}) {
    const db = load()
    const me = meOf(user, db)
    if (!me.member) return { locked: true, me }
    if (thread) {
      const t = db.threads.find((x) => x.id === thread && !x.removed)
      if (!t) fail('This conversation was removed or does not exist.')
      return {
        me,
        thread: { id: t.id, category: t.category, title: t.title, pinned: false, locked: false, removed: false, mine: t.userId === user.id, createdAt: t.createdAt },
        posts: db.posts.filter((p) => p.threadId === t.id).map((p) => ({
          id: p.id, first: p.first, name: nameOf(db, p.userId), trainer: false, mine: p.userId === user.id,
          status: p.deleted ? 'deleted' : 'ok', body: p.deleted ? null : p.body, createdAt: p.createdAt, editedAt: p.editedAt || null,
        })),
      }
    }
    const live = db.threads.filter((t) => !t.removed)
    const counts = Object.fromEntries(CATEGORIES.map((c) => [c.id, live.filter((t) => t.category === c.id).length]))
    const list = live.filter((t) => !category || t.category === category).sort((a, b) => b.lastPostAt.localeCompare(a.lastPostAt))
    return {
      me, counts,
      threads: list.map((t) => ({
        id: t.id, category: t.category, title: t.title, name: nameOf(db, t.userId), trainer: false, mine: t.userId === user.id, pinned: false, locked: false,
        replies: db.posts.filter((p) => p.threadId === t.id && !p.first && !p.deleted).length, lastPostAt: t.lastPostAt, createdAt: t.createdAt,
      })),
    }
  },
  act(user, action, b = {}) {
    const db = load()
    const me = meOf(user, db)
    const now = new Date().toISOString()
    const save = (out = {}) => { writeJSON(KEY, db); return { ok: true, ...out } }
    if (!me.member) fail('The community is for course members. Buy a module or the complete course to join.')
    if (action === 'profile') {
      const name = String(b.name || '').trim().replace(/\s+/g, ' ')
      const err = checkText('name', name); if (err) fail(err)
      if (!b.acceptRules) fail('Please accept the community rules.')
      db.members[user.id] = { name, rulesAt: now }
      return save()
    }
    if (action === 'report') return { ok: true } // Raad gets reports on the live site only.
    if (!me.canPost) fail('Choose a display name and accept the community rules first.')
    if (action === 'thread') {
      const cat = categoryOf(b.category)
      if (!cat) fail('Choose a category.')
      if (cat.adminOnly) fail('Only Raad can start a conversation in Announcements.')
      const title = String(b.title || '').trim(), body = String(b.body || '').trim()
      const err = checkText('title', title) || checkText('body', body); if (err) fail(err)
      const t = { id: id(), category: cat.id, title, userId: user.id, createdAt: now, lastPostAt: now }
      db.threads.push(t)
      db.posts.push({ id: id(), threadId: t.id, userId: user.id, first: true, body, createdAt: now })
      return save({ threadId: t.id })
    }
    if (action === 'reply') {
      const t = db.threads.find((x) => x.id === b.threadId && !x.removed)
      if (!t) fail('This conversation was removed.')
      const body = String(b.body || '').trim()
      const err = checkText('body', body); if (err) fail(err)
      db.posts.push({ id: id(), threadId: t.id, userId: user.id, first: false, body, createdAt: now })
      t.lastPostAt = now
      return save()
    }
    const p = db.posts.find((x) => x.id === b.postId)
    if (!p || p.userId !== user.id) fail('You can only change your own posts.')
    const t = db.threads.find((x) => x.id === p.threadId)
    if (action === 'edit') {
      const body = String(b.body || '').trim()
      const err = checkText('body', body) || (b.title !== undefined && p.first ? checkText('title', b.title) : ''); if (err) fail(err)
      p.body = body; p.editedAt = now
      if (b.title !== undefined && p.first) t.title = String(b.title).trim()
      return save()
    }
    if (action === 'delete') {
      p.deleted = true
      if (p.first) t.removed = true
      return save({ threadRemoved: p.first })
    }
    fail('Moderation is only available on the live site.')
  },
}
