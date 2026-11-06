import { useEffect, useState } from 'react'
import { useApp } from '../App.jsx'
import { backend } from '../platform/backend.js'
import { GOOGLE_REVIEW_URL, REVIEW_LIMITS, REVIEW_TOPICS, topicLabel } from '../content/reviews.js'
import { Icon } from './icons.jsx'

// Course reviews: a student who bought the course rates it and writes a review. It is saved here
// (and shown on the site once approved), then they can share the same text on Google in one paste.
// The Google step is offered to everyone, whatever their rating (no review gating).
export default function ReviewsPage() {
  return <ReviewPanel />
}

// The same review box, also shown at the bottom of the dashboard (embedded: only for buyers,
// and without the page wrapper).
export function ReviewPanel({ embedded = false }) {
  const { go } = useApp()
  const [me, setMe] = useState(null)
  const [err, setErr] = useState('')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [topic, setTopic] = useState('course')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    backend.reviews({ mine: true }).then((r) => {
      setMe(r)
      if (r.mine) { setRating(r.mine.rating); setText(r.mine.body); setTopic(r.mine.topic || 'course') }
    }, (e) => setErr(e.message))
  }, [])

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      const r = await backend.reviewAction('submit', { rating, body: text, topic })
      setDone(true); setEditing(false)
      setMe((m) => ({ ...m, mine: { rating, topic, body: text.trim(), status: r?.status || (text.trim() ? 'pending' : 'published') } }))
    } catch (x) { setErr(x.message) } finally { setBusy(false) }
  }

  if (!me) return embedded ? null : <div className="wrap reviews-wrap"><p className="muted">{err || 'Loading…'}</p></div>
  if (!me.canReview) {
    if (embedded) return null
    return (
      <div className="wrap reviews-wrap stack">
        <span className="eyebrow">Reviews</span>
        <h1>Reviews are for students of the course</h1>
        <p className="muted">Once you have bought a module or the complete course, you can rate it here.</p>
        <div className="row"><button className="btn btn-primary" onClick={() => go('checkout')}>See the course</button></div>
      </div>
    )
  }

  const mine = me.mine
  const showForm = !mine || editing || (mine.status === 'rejected' && !done)
  return (
    <div className={embedded ? 'stack dash-review' : 'wrap reviews-wrap stack'} style={{ gap: embedded ? '1rem' : '1.5rem' }}>
      {embedded ? (
        <div className="dash-section-title"><h2>{mine && !editing ? 'Your experience' : 'Share your experience'}</h2></div>
      ) : (
        <div className="stack" style={{ gap: '.4rem' }}>
          <span className="eyebrow">Reviews</span>
          <h1>{mine && !editing ? 'Your experience' : 'Share your experience'}</h1>
        </div>
      )}

      {showForm ? (
        <form className="card review-form stack" onSubmit={submit}>
          {mine?.status === 'rejected' && !editing && <p className="callout-plain">Your review wasn't published{mine.rejectReason ? `: ${mine.rejectReason}` : ''}. You can change it and send it again.</p>}
          <div className="field">
            <label htmlFor="rv-topic">What is it about?</label>
            <select id="rv-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {REVIEW_TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div className="stack" style={{ gap: '.3rem' }}>
            <span className="label" id="rv-stars">Your rating</span>
            <StarPicker value={rating} onChange={setRating} labelledBy="rv-stars" />
          </div>
          <div className="field">
            <label htmlFor="rv-text">Your review</label>
            <textarea id="rv-text" rows={5} value={text} maxLength={REVIEW_LIMITS.body[1]} onChange={(e) => setText(e.target.value)}
              placeholder="What did you learn? What changed in your negotiations? What could be better? (You can also leave just a star rating.)" />
          </div>
          {!rating && <p className="small review-need" role="status">Choose a star rating to submit.</p>}
          <p className="small muted">Your first name and last initial are shown with your review. Each review is checked for spam and abuse before it goes live. Your words are never changed.</p>
          {err && <p className="error" role="alert">{err}</p>}
          <div className="row">
            <button className="btn btn-primary" disabled={busy || !rating}>{busy ? 'Sending…' : mine ? 'Send updated review' : 'Submit review'}</button>
            {editing && <button type="button" className="btn btn-ghost" onClick={() => { setEditing(false); setRating(mine.rating); setText(mine.body) }}>Cancel</button>}
          </div>
        </form>
      ) : (
        <div className="card stack">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="review-stars" aria-label={`${mine.rating} out of 5 stars`}>{'★'.repeat(mine.rating)}<span className="off">{'★'.repeat(5 - mine.rating)}</span></span>
            <span className={'pill ' + (mine.status === 'published' ? 'good' : 'orange')}>{mine.status === 'published' ? (mine.body ? 'Published' : 'Counted') : 'Waiting for approval'}</span>
          </div>
          <span className="small muted">{topicLabel(mine.topic)}</span>
          {mine.body ? <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{mine.body}</p> : <p className="small muted" style={{ margin: 0 }}>Star rating only. You can add a few words any time.</p>}
          <div className="row"><button className="btn btn-sm" onClick={() => setEditing(true)}>Edit my review</button></div>
        </div>
      )}

      {mine && !showForm && <GoogleShare text={mine.body} thanks={done} />}
    </div>
  )
}

// One click: copy the review text and open Raad's Google review page in a new tab.
function GoogleShare({ text, thanks }) {
  const [copied, setCopied] = useState(false)
  async function onClick() {
    if (text) { try { await navigator.clipboard.writeText(text) } catch { /* the student can still type it */ } }
    setCopied(true)
    backend.reviewAction('google').catch(() => {})
  }
  return (
    <div className="card google-share stack">
      <span className="google-badge" aria-hidden="true"><span className="g">G</span><span><b>Google</b> Reviews<br /><span className="gstars">★★★★★</span></span></span>
      <span className="eyebrow">{thanks ? 'Thank you' : 'Share it'}</span>
      {thanks && <strong style={{ fontSize: '1.1rem' }}>Your review is saved.</strong>}
      <p className="small muted" style={{ margin: 0 }}>Would you also share it on Google? It helps other professionals find the course.{text ? ' Your text is ready to paste.' : ''}</p>
      {text && <p className="review-quote">“{text}”</p>}
      <div className="row">
        <a className="btn btn-primary" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" onClick={onClick}>{text ? 'Copy text and open Google' : 'Rate us on Google'} <Icon.arrowR /></a>
      </div>
      {copied && <p className="small muted" role="status" style={{ margin: 0 }}>{text ? 'Copied. Google\'s review page opened in a new tab: paste your text, choose your stars and post.' : 'Google\'s review page opened in a new tab: choose your stars and post.'}</p>}
    </div>
  )
}

export function StarPicker({ value, onChange, labelledBy }) {
  return (
    <div className="star-picker" role="radiogroup" aria-labelledby={labelledBy}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={n <= value ? 'on' : ''} onClick={() => onChange(n)}>★</button>
      ))}
    </div>
  )
}

// Published course reviews, for the landing page. Shows nothing until there is at least one.
export function StudentReviews() {
  const [data, setData] = useState(null)
  useEffect(() => { backend.reviews().then(setData, () => setData(null)) }, [])
  if (!data?.count) return null
  return (
    <div className="stack" style={{ gap: '1rem' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'end' }}>
        <span className="eyebrow">From students of the course</span>
        <span className="small"><span className="review-stars" aria-hidden="true">★</span> <b>{data.average.toFixed(1)}</b> <span className="muted">· {data.count} verified rating{data.count === 1 ? '' : 's'}</span></span>
      </div>
      <div className="quote-grid">
        {data.reviews.filter((r) => r.body).slice(0, 3).map((r) => (
          <div key={r.id} className="quote">
            <span className="stars" aria-label={`Rated ${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}<span className="off">{'★'.repeat(5 - r.rating)}</span></span>
            <p>“{r.body}”</p>
            <span className="reviewer"><span className="small muted">{r.name} · {topicLabel(r.topic)}</span> <span className="pill good">Verified student</span></span>
          </div>
        ))}
      </div>
      <p className="small muted review-note">Course reviews can only be written by students who bought the course. Written reviews are checked for spam and abuse before they go live. The rating counts every star rating and published review.</p>
    </div>
  )
}
