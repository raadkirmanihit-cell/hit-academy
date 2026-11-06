import { useCallback, useEffect, useState } from 'react'
import { useApp } from '../App.jsx'
import { backend } from '../platform/backend.js'
import { CATEGORIES, categoryOf, COMMUNITY_RULES, REPORT_REASONS, REMOVAL_REASONS, LIMITS, PHOTO_SIZE } from '../content/forum.js'

const ago = (d) => {
  const s = (Date.now() - new Date(d)) / 1000
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`
  if (s < 7 * 86400) return `${Math.floor(s / 86400)} d ago`
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
const initials = (n) => (n || '?').split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase()

const Chat = (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 5h16v11H9l-5 4z" /></svg>
const Pin = (p) => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 4h6l-1 5 3 3H7l3-3zM12 12v8" /></svg>
const Lock = (p) => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>

function Avatar({ name, photo, trainer, big }) {
  const [broken, setBroken] = useState(false)
  const cls = 'cm-avatar' + (trainer ? ' trainer' : '') + (big ? ' big' : '')
  if (photo && !broken) return <img className={cls} src={photo} alt="" loading="lazy" onError={() => setBroken(true)} />
  return <span className={cls} aria-hidden="true">{initials(name)}</span>
}

function Author({ name, photo, trainer, big }) {
  return (
    <span className="cm-author">
      <Avatar name={name} photo={photo} trainer={trainer} big={big} />
      <b>{name}</b>
      {trainer && <span className="pill orange">Trainer</span>}
    </span>
  )
}

// What was last loaded, so going back and forth shows the page at once and refreshes it quietly.
const cache = new Map()
let lastCategory = ''
let cameFromList = false

// The members' community: a list of conversations, or one conversation (threadId).
export default function Community({ threadId }) {
  const { notify } = useApp()
  // #/community/new and #/community/profile are the list with a form open, so Back closes the form.
  const form = threadId === 'new' || threadId === 'profile' ? threadId : ''
  const thread = form ? null : threadId
  const key = thread || 'list'
  const [data, setData] = useState(() => cache.get(key) || null)
  const [err, setErr] = useState('')
  const load = useCallback(() => {
    return backend.forum(thread ? { thread } : {}).then((d) => { cache.set(key, d); setData(d); setErr('') }, (e) => setErr(e.message))
  }, [thread, key])
  useEffect(() => { load() }, [load])

  async function act(action, payload, done) {
    try {
      const r = await backend.forumAction(action, payload)
      if (done) notify(done)
      return r
    } catch (e) { notify(e.message, 6000); throw e }
  }

  if (err && !data?.posts && !data?.threads) return <div className="wrap cm-page"><Head /><div className="notice">{err}</div></div>
  if (!data) return <div className="boot"><span className="boot-dot" /></div>
  if (data.locked) return <Locked />
  if (thread) return <ThreadView data={data} act={act} reload={load} setData={setData} />
  return <ThreadList data={data} act={act} reload={load} form={form} />
}

function Head({ children }) {
  return (
    <div className="cm-head">
      <div className="stack" style={{ gap: '.4rem' }}>
        <span className="eyebrow">HIT Academy members</span>
        <h1>Community</h1>
        <p className="muted">Swap stories, ask how others would handle a tough conversation, and find practice partners. Members only.</p>
      </div>
      {children}
    </div>
  )
}

// Free accounts: what the community is, and how to join.
function Locked() {
  const { go } = useApp()
  return (
    <div className="wrap cm-page">
      <div className="card cm-locked">
        <span className="cm-locked-icon" aria-hidden="true"><Lock width="26" height="26" /></span>
        <span className="eyebrow">Members only</span>
        <h2>Join the HIT Academy community</h2>
        <p className="muted">The community is where course members share real negotiations, ask each other for advice and find partners to practise with. It opens as soon as you buy a module or the complete course.</p>
        <ul className="cm-locked-list">
          {CATEGORIES.map((c) => <li key={c.id}><b>{c.title}.</b> {c.blurb}</li>)}
        </ul>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => go('checkout')}>See the course options</button>
          <button className="btn btn-ghost" onClick={() => go('dashboard')}>Back to my dashboard</button>
        </div>
      </div>
    </div>
  )
}

// Crops a picture to a square and shrinks it in the browser. Drawing it again also drops the
// photo's hidden details (camera, place), so only the picture itself is uploaded.
async function shrinkPhoto(file) {
  if (!/^image\//.test(file?.type || '')) throw new Error('Please choose a picture (JPG, PNG or WebP).')
  if (file.size > 20e6) throw new Error('That picture is too large. Please choose one under 20 MB.')
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise((ok, no) => {
      const i = new Image()
      i.onload = () => ok(i)
      i.onerror = () => no(new Error('That picture could not be opened. Please try a JPG or PNG.'))
      i.src = url
    })
    const side = Math.min(img.naturalWidth, img.naturalHeight)
    const c = document.createElement('canvas')
    c.width = c.height = PHOTO_SIZE
    const g = c.getContext('2d')
    g.imageSmoothingQuality = 'high'
    g.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, PHOTO_SIZE, PHOTO_SIZE)
    const webp = c.toDataURL('image/webp', 0.82)
    return webp.startsWith('data:image/webp') ? webp : c.toDataURL('image/jpeg', 0.85)
  } finally { URL.revokeObjectURL(url) }
}

// Before the first post: display name, optional photo and the community rules.
// Later (edit = true): change the name or the photo.
function Setup({ me, act, onDone, onCancel, edit = false }) {
  const { user, notify } = useApp()
  const [name, setName] = useState(me.name || user.name.split(' ')[0] || '')
  const [photo, setPhoto] = useState(undefined) // undefined = unchanged, null = remove, data URL = new
  const [ok, setOk] = useState(me.rulesAccepted)
  const [busy, setBusy] = useState(false)
  const shown = photo === undefined ? me.photo : photo
  const changed = name.trim() !== me.name || photo !== undefined
  return (
    <form className="card cm-setup stack" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true)
      try {
        await act('profile', { name, acceptRules: ok, ...(photo !== undefined ? { photo } : {}) }, edit ? 'Your profile is saved.' : undefined)
        cache.clear()
        await onDone()
      } catch { /* shown as a message */ } finally { setBusy(false) }
    }}>
      <span className="eyebrow">{edit ? 'Your community profile' : 'Before your first post'}</span>
      <h3>{edit ? 'Change how you appear to other members' : 'Choose how you appear, and agree to the community rules'}</h3>
      <div className="cm-photo-row">
        <Avatar name={name} photo={shown} trainer={me.admin} big />
        <div className="stack" style={{ gap: '.35rem' }}>
          <div className="row" style={{ gap: '.4rem' }}>
            <label className="btn btn-ghost btn-sm cm-file">
              {shown ? 'Change photo' : 'Add a photo'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" disabled={me.blocked} onChange={async (e) => {
                const f = e.target.files?.[0]; e.target.value = ''
                if (!f) return
                try { setPhoto(await shrinkPhoto(f)) } catch (x) { notify(x.message, 6000) }
              }} />
            </label>
            {shown && <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPhoto(null)}>Remove photo</button>}
          </div>
          <span className="small muted">Optional. Other members see it next to your posts. Please use a photo of yourself or a neutral picture: the community rules apply to photos too.</span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="cm-name">Display name</label>
        <input id="cm-name" value={name} maxLength={LIMITS.name[1]} disabled={me.blocked} onChange={(e) => setName(e.target.value)} required />
        <span className="small muted">Shown next to your posts. Your email is never shown. A first name, your full name or a nickname is fine.</span>
      </div>
      {!me.rulesAccepted && <>
        <ol className="cm-rules">{COMMUNITY_RULES.map((r) => <li key={r}>{r}</li>)}</ol>
        <label className="cm-check">
          <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
          <span>I agree to the community rules (section 12 of the <a href="/?page=terms" target="_blank" rel="noreferrer">Terms and Conditions</a>). I understand other members can read what I post.</span>
        </label>
      </>}
      <div className="row">
        <button className="btn btn-primary" disabled={busy || !ok || name.trim().length < LIMITS.name[0] || (edit && !changed)}>{busy ? 'Saving…' : edit ? 'Save' : 'Continue'}</button>
        {onCancel && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

function Blocked({ me }) {
  return <div className="notice">You can read the community, but you can no longer post.{me.blockedReason ? ` Reason: ${me.blockedReason}.` : ''} If you think this is a mistake, use "Message Raad" in your account menu.</div>
}

function ThreadList({ data, act, reload, form }) {
  const { go } = useApp()
  const composing = form === 'new'
  // Open a form as its own address; closing it steps back, so the browser's Back button does the same.
  const openForm = (f) => { cameFromList = true; go('community', { threadId: f }) }
  const startComposing = () => openForm('new')
  const stopComposing = () => {
    if (cameFromList) { cameFromList = false; window.history.back() } else go('community', {}, { replace: true })
  }
  const [category, setCat] = useState(lastCategory)
  const setCategory = (c) => { lastCategory = c; setCat(c) }
  const { me, counts } = data
  const threads = category ? data.threads.filter((t) => t.category === category) : data.threads
  // Opening a conversation shows its title straight away while the posts load.
  const open = (t) => {
    if (!cache.has(t.id)) cache.set(t.id, { me, thread: { id: t.id, category: t.category, title: t.title, pinned: t.pinned, locked: t.locked, mine: t.mine }, posts: null })
    go('community', { threadId: t.id })
  }
  const total = Object.values(counts || {}).reduce((a, b) => a + b, 0)
  const cat = categoryOf(category)
  const startable = CATEGORIES.filter((c) => !c.adminOnly || me.admin)

  return (
    <div className="wrap cm-page">
      <button className="btn btn-ghost btn-sm" style={{ justifySelf: 'start', marginBottom: '-.75rem' }} onClick={() => go('dashboard')}>← My dashboard</button>
      <Head>
        {!form && <div className="row" style={{ gap: '.5rem' }}>
          {me.name && <button className="btn btn-ghost cm-me" onClick={() => openForm('profile')}><Avatar name={me.name} photo={me.photo} trainer={me.admin} /> My profile</button>}
          {!me.blocked && <button className="btn btn-primary" onClick={startComposing}><Chat /> Start a conversation</button>}
        </div>}
      </Head>
      {me.blocked && <Blocked me={me} />}
      {form === 'profile' && <Setup me={me} act={act} edit={!!me.name} onDone={async () => { await reload(); stopComposing() }} onCancel={stopComposing} />}
      {composing && (!me.canPost
        ? <Setup me={me} act={act} onDone={reload} onCancel={stopComposing} />
        : <NewThread categories={startable} initial={cat && (!cat.adminOnly || me.admin) ? cat.id : startable.find((c) => !c.adminOnly)?.id} act={act}
            onCancel={stopComposing} onDone={(id) => { cameFromList = false; go('community', { threadId: id }, { replace: true }) }} />)}

      <div className="cm-layout">
        <nav className="cm-cats" aria-label="Categories">
          <button className={'cm-cat' + (!category ? ' on' : '')} onClick={() => setCategory('')}><span>All conversations</span><span className="tnum muted">{total}</span></button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={'cm-cat' + (category === c.id ? ' on' : '')} onClick={() => setCategory(c.id)}>
              <span>{c.title}</span><span className="tnum muted">{counts?.[c.id] || 0}</span>
            </button>
          ))}
        </nav>
        <section className="stack" style={{ gap: '.75rem', alignContent: 'start' }}>
          {cat && <p className="muted" style={{ margin: 0 }}>{cat.blurb}</p>}
          {!threads.length && (
            <div className="card cm-empty">
              <Chat width="28" height="28" />
              <h3>{cat ? `No conversations in ${cat.title} yet` : 'No conversations yet'}</h3>
              <p className="muted">{cat?.adminOnly ? 'Raad posts news about the academy here.' : 'Be the first: introduce yourself, or ask how others would handle a conversation you are preparing for.'}</p>
            </div>
          )}
          {threads.map((t) => (
            <button key={t.id} className="card cm-thread" onClick={() => open(t)}>
              <div className="cm-thread-main">
                <div className="row" style={{ gap: '.4rem' }}>
                  {t.pinned && <span className="pill orange"><Pin /> Pinned</span>}
                  {t.locked && <span className="pill"><Lock /> Closed</span>}
                  {!category && <span className="pill">{categoryOf(t.category)?.title}</span>}
                </div>
                <h3>{t.title}</h3>
                <span className="small muted"><Author name={t.name} photo={t.photo} trainer={t.trainer} /> · started {ago(t.createdAt)}</span>
              </div>
              <div className="cm-thread-meta small muted">
                <span><b className="tnum">{t.replies}</b> {t.replies === 1 ? 'reply' : 'replies'}</span>
                <span>active {ago(t.lastPostAt)}</span>
              </div>
            </button>
          ))}
        </section>
      </div>
    </div>
  )
}

function NewThread({ categories, initial, act, onCancel, onDone }) {
  const [category, setCategory] = useState(initial || categories[0]?.id)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)
  return (
    <form className="card cm-setup stack" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true)
      try { const r = await act('thread', { category, title, body }, 'Your conversation is live.'); onDone(r.threadId) } catch { /* shown as a message */ } finally { setBusy(false) }
    }}>
      <h3>Start a conversation</h3>
      <div className="field"><label htmlFor="cm-cat">Category</label>
        <select id="cm-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <span className="small muted">{categoryOf(category)?.blurb}</span>
      </div>
      <div className="field"><label htmlFor="cm-title">Title</label>
        <input id="cm-title" value={title} maxLength={LIMITS.title[1]} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. How do I answer &quot;Is that your best price?&quot;" required /></div>
      <div className="field"><label htmlFor="cm-body">Your post</label>
        <textarea id="cm-body" value={body} maxLength={LIMITS.body[1]} rows={7} onChange={(e) => setBody(e.target.value)} required />
        <span className="small muted">Change names and leave out anything that identifies your employer, clients or colleagues.</span></div>
      <div className="row">
        <button className="btn btn-primary" disabled={busy || title.trim().length < LIMITS.title[0] || body.trim().length < LIMITS.body[0]}>{busy ? 'Posting…' : 'Post'}</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

function ThreadView({ data, act, reload, setData }) {
  const { go } = useApp()
  const { me, thread } = data
  const posts = data.posts || []
  const loading = !data.posts
  const [reply, setReply] = useState('')
  const [busy, setBusy] = useState(false)
  const [setup, setSetup] = useState(false)
  const cat = categoryOf(thread.category)
  const replies = posts.filter((p) => !p.first)

  return (
    <div className="wrap cm-page cm-thread-page">
      <button className="btn btn-ghost btn-sm" style={{ justifySelf: 'start' }} onClick={() => go('community')}>← All conversations</button>
      <div className="stack" style={{ gap: '.5rem' }}>
        <div className="row" style={{ gap: '.4rem' }}>
          <span className="pill">{cat?.title}</span>
          {thread.pinned && <span className="pill orange"><Pin /> Pinned</span>}
          {thread.locked && <span className="pill"><Lock /> Closed for replies</span>}
          {thread.removed && <span className="pill" style={{ color: 'var(--bad)' }}>Removed</span>}
        </div>
        <h1 className="cm-title">{thread.title}</h1>
        {me.admin && (
          <div className="row" style={{ gap: '.4rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={async () => { await act('pin', { threadId: thread.id, on: !thread.pinned }, thread.pinned ? 'Unpinned.' : 'Pinned to the top.'); reload() }}><Pin /> {thread.pinned ? 'Unpin' : 'Pin to top'}</button>
            <button className="btn btn-ghost btn-sm" onClick={async () => { await act('lock', { threadId: thread.id, on: !thread.locked }, thread.locked ? 'Open for replies again.' : 'Closed for new replies.'); reload() }}><Lock /> {thread.locked ? 'Reopen' : 'Close for replies'}</button>
          </div>
        )}
      </div>

      <div className="stack" style={{ gap: '.75rem' }}>
        {loading && <div className="card cm-post cm-loading" aria-busy="true"><span /><span /><span /></div>}
        {posts.map((p) => <Post key={p.id} post={p} me={me} thread={thread} act={act} reload={reload} />)}
      </div>
      {!loading && <>

      <h3 style={{ marginTop: '.5rem' }}>{replies.length ? `${replies.filter((r) => r.status === 'ok').length} ${replies.length === 1 ? 'reply' : 'replies'}` : 'No replies yet'}</h3>
      {me.blocked ? <Blocked me={me} />
        : thread.locked && !me.admin ? <div className="notice">This conversation is closed for new replies.</div>
        : thread.removed ? null
        : !me.canPost ? (setup ? <Setup me={me} act={act} onDone={reload} onCancel={() => setSetup(false)} />
          : <div className="card cm-setup row" style={{ justifyContent: 'space-between' }}><span>Join the conversation.</span><button className="btn btn-primary btn-sm" onClick={() => setSetup(true)}>Write a reply</button></div>)
        : (
          <form className="card cm-setup stack" onSubmit={async (e) => {
            e.preventDefault(); setBusy(true)
            try {
              await act('reply', { threadId: thread.id, body: reply })
              // Show the reply at once; the quiet refresh then brings in anything new from others.
              setData((d) => ({ ...d, posts: [...(d.posts || []), { id: 'new-' + Date.now(), first: false, name: me.name, photo: me.photo, trainer: me.admin, mine: true, status: 'ok', body: reply.trim(), createdAt: new Date().toISOString() }] }))
              setReply(''); reload()
            } catch { /* shown */ } finally { setBusy(false) }
          }}>
            <div className="field"><label htmlFor="cm-reply">Your reply</label>
              <textarea id="cm-reply" value={reply} rows={4} maxLength={LIMITS.body[1]} onChange={(e) => setReply(e.target.value)} placeholder={`Reply as ${me.name}`} /></div>
            <div><button className="btn btn-primary" disabled={busy || reply.trim().length < LIMITS.body[0]}>{busy ? 'Posting…' : 'Post reply'}</button></div>
          </form>
        )}
      </>}
    </div>
  )
}

function Post({ post, me, thread, act, reload }) {
  const { go } = useApp()
  const [mode, setMode] = useState('') // '', 'edit', 'report', 'remove', 'block', 'photo'
  const [text, setText] = useState(post.body || '')
  const [title, setTitle] = useState(thread.title)
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const run = async (fn) => { setBusy(true); try { await fn(); setMode('') } catch { /* shown */ } finally { setBusy(false) } }

  if (post.status === 'deleted') return <div className="cm-post gone small muted">This post was deleted by its author.</div>
  if (post.status === 'removed' && post.body == null) return <div className="cm-post gone small muted">This post was removed by a moderator because it broke the community rules.</div>

  return (
    <article className={'card cm-post' + (post.first ? ' first' : '') + (post.status === 'removed' ? ' removed' : '')}>
      <header className="row" style={{ justifyContent: 'space-between', gap: '.5rem' }}>
        <Author name={post.name} photo={post.photo} trainer={post.trainer} big />
        <span className="small muted">{ago(post.createdAt)}{post.editedAt ? ' · edited' : ''}{me.admin && post.reports ? <span className="pill orange" style={{ marginLeft: '.4rem' }}>{post.reports} open report{post.reports > 1 ? 's' : ''}</span> : null}</span>
      </header>
      {post.status === 'removed' && (
        <div className="notice cm-removed">
          <b>{post.mine ? 'A moderator removed your post.' : 'Removed by a moderator.'}</b> Other members can no longer see it. Reason: {post.removedReason}.{post.removedNote ? ` ${post.removedNote}` : ''}
          {post.mine && ' If you think this is wrong, use "Message Raad" in your account menu.'}
        </div>
      )}
      {mode === 'edit' ? (
        <form className="stack" onSubmit={(e) => { e.preventDefault(); run(async () => { await act('edit', { postId: post.id, body: text, ...(post.first ? { title } : {}) }, 'Saved.'); await reload() }) }}>
          {post.first && <div className="field"><label htmlFor={`t-${post.id}`}>Title</label><input id={`t-${post.id}`} value={title} maxLength={LIMITS.title[1]} onChange={(e) => setTitle(e.target.value)} /></div>}
          <div className="field"><label htmlFor={`e-${post.id}`}>Your post</label><textarea id={`e-${post.id}`} value={text} rows={5} maxLength={LIMITS.body[1]} onChange={(e) => setText(e.target.value)} /></div>
          <div className="row"><button className="btn btn-primary btn-sm" disabled={busy}>Save</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('')}>Cancel</button></div>
        </form>
      ) : <p className="cm-body">{post.body}</p>}

      {mode === 'report' && (
        <form className="cm-sub stack" onSubmit={(e) => { e.preventDefault(); run(() => act('report', { postId: post.id, reason, details: note }, 'Thank you. Raad will review this post.')) }}>
          <b>Report this post</b>
          <div className="field"><label htmlFor={`r-${post.id}`}>What is wrong with it?</label>
            <select id={`r-${post.id}`} value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">Choose a reason</option>
              {REPORT_REASONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select></div>
          <div className="field"><label htmlFor={`rd-${post.id}`}>Details (optional)</label>
            <textarea id={`rd-${post.id}`} rows={3} maxLength={2000} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Explain why, especially if you think it is illegal." /></div>
          <span className="small muted">The author is not told who reported them. We will email you the outcome.</span>
          <div className="row"><button className="btn btn-primary btn-sm" disabled={busy || !reason}>Send report</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('')}>Cancel</button></div>
        </form>
      )}

      {['remove', 'block', 'photo'].includes(mode) && (
        <form className="cm-sub stack" onSubmit={(e) => {
          e.preventDefault()
          run(async () => {
            if (mode === 'remove') await act('remove', { postId: post.id, reason, note }, 'Post removed. The author has been told why.')
            else if (mode === 'photo') { await act('removePhoto', { userId: post.authorId, reason, note }, `${post.name}'s photo was removed. They have been told why.`); cache.clear() }
            else await act('block', { userId: post.authorId, on: true, reason, note }, `${post.name} can no longer post.`)
            if (mode === 'remove' && post.first) go('community'); else await reload()
          })
        }}>
          <b>{mode === 'remove' ? (post.first ? 'Remove this whole conversation' : 'Remove this post') : mode === 'photo' ? `Remove ${post.name}'s profile photo` : `Block ${post.name} from posting`}</b>
          <div className="field"><label htmlFor={`m-${post.id}`}>Reason (sent to the member)</label>
            <select id={`m-${post.id}`} value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">Choose a reason</option>
              {REMOVAL_REASONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select></div>
          <div className="field"><label htmlFor={`mn-${post.id}`}>Explanation (optional, sent to the member)</label>
            <textarea id={`mn-${post.id}`} rows={2} maxLength={1000} value={note} onChange={(e) => setNote(e.target.value)} /></div>
          <div className="row"><button className="btn btn-primary btn-sm" disabled={busy || !reason}>{mode === 'block' ? 'Block' : 'Remove'}</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('')}>Cancel</button></div>
        </form>
      )}

      {!mode && post.status === 'ok' && !String(post.id).startsWith('new-') && (
        <footer className="row cm-actions">
          {post.mine && <button className="btn btn-ghost btn-sm" onClick={() => { setText(post.body); setMode('edit') }}>Edit</button>}
          {post.mine && <button className="btn btn-ghost btn-sm" onClick={() => {
            if (!window.confirm(post.first ? 'Delete this conversation? Replies will no longer be visible.' : 'Delete this post?')) return
            run(async () => { const r = await act('delete', { postId: post.id }, 'Deleted.'); if (r.threadRemoved) go('community'); else await reload() })
          }}>Delete</button>}
          {!post.mine && <button className="btn btn-ghost btn-sm" onClick={() => setMode('report')}>Report</button>}
          {me.admin && !post.mine && <button className="btn btn-ghost btn-sm cm-mod" onClick={() => { setReason(''); setNote(''); setMode('remove') }}>Remove</button>}
          {me.admin && !post.mine && !post.trainer && post.authorId && post.photo && <button className="btn btn-ghost btn-sm cm-mod" onClick={() => { setReason(''); setNote(''); setMode('photo') }}>Remove photo</button>}
          {me.admin && !post.mine && !post.trainer && post.authorId && <button className="btn btn-ghost btn-sm cm-mod" onClick={() => { setReason(''); setNote(''); setMode('block') }}>Block member</button>}
        </footer>
      )}
    </article>
  )
}
