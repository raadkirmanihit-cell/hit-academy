import { useState } from 'react'
import { GOOGLE_REVIEWS_LIST } from '../content/google-reviews.js'

function Card({ r }) {
  return (
    <figure className="rc-card">
      <span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span>
      <blockquote><p>“{r.text}”</p></blockquote>
      <figcaption className="reviewer">
        {r.photo
          ? <img className="reviewer-avatar" src={r.photo} alt="" loading="lazy" />
          : <span className="reviewer-avatar" style={{ background: 'var(--navy)' }} aria-hidden="true">{r.name[0]}</span>}
        <span className="small muted">{r.name}, Google review</span>
      </figcaption>
    </figure>
  )
}

// Auto-scrolling row of Google reviews. The list is drawn twice so the loop is seamless;
// the copy is hidden from screen readers. Pauses on hover, on keyboard focus and with the
// pause button; with "reduce motion" switched on it is a plain swipeable row.
export function ReviewCarousel({ reviews = GOOGLE_REVIEWS_LIST }) {
  const [paused, setPaused] = useState(false)
  const secs = Math.max(30, reviews.length * 12)
  return (
    <div className={'rc' + (paused ? ' rc-paused' : '')} role="region" aria-label="Google reviews" style={{ '--rc-dur': `${secs}s` }}>
      <div className="rc-viewport">
        <div className="rc-track">
          <div className="rc-set">{reviews.map((r) => <Card key={r.name} r={r} />)}</div>
          <div className="rc-set rc-copy" aria-hidden="true">{reviews.map((r) => <Card key={r.name} r={r} />)}</div>
        </div>
      </div>
      <button type="button" className="rc-toggle btn btn-sm" onClick={() => setPaused(!paused)} aria-pressed={paused}>
        {paused ? '▶ Play reviews' : '❚❚ Pause reviews'}
      </button>
    </div>
  )
}
