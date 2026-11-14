import { useEffect, useRef } from 'react'
import { GOOGLE_REVIEWS_LIST } from '../content/google-reviews.js'

const SPEED = 60 // pixels per second of automatic scrolling
const RESUME_AFTER = 2500 // ms after someone swipes or drags before it moves on its own again
const COPIES = 4 // the list is drawn several times so it loops endlessly in both directions

function Card({ r }) {
  return (
    <figure className="rc-card">
      <span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span>
      <blockquote><p>“{r.text}”</p></blockquote>
      <figcaption className="reviewer">
        {r.photo
          ? <img className="reviewer-avatar" src={r.photo} alt="" loading="lazy" draggable="false" />
          : <span className="reviewer-avatar" style={{ background: 'var(--navy)' }} aria-hidden="true">{r.name[0]}</span>}
        <span className="small muted">{r.name}, Google review</span>
      </figcaption>
    </figure>
  )
}

// Row of Google reviews that scrolls on its own and can be swiped (touch, trackpad)
// or dragged with the mouse in either direction. Extra copies are hidden from screen readers.
// With "reduce motion" switched on it does not move by itself.
export function ReviewCarousel({ reviews = GOOGLE_REVIEWS_LIST }) {
  const vp = useRef(null)

  useEffect(() => {
    const el = vp.current
    if (!el) return
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const setW = () => el.firstElementChild.firstElementChild.offsetWidth
    let pos = 0, last = 0, raf = 0, holdUntil = 0, drag = null

    // Keep the position inside the second copy so there is always room both ways.
    // Returns how far it jumped, so a drag in progress can follow.
    const wrap = () => {
      const w = setW()
      let shift = 0
      if (w && pos < w) shift = w
      else if (w && pos >= 2 * w) shift = -w
      pos += shift
      el.scrollLeft = pos
      return shift
    }
    const hold = () => { holdUntil = performance.now() + RESUME_AFTER }

    const tick = (t) => {
      const dt = last ? Math.min(t - last, 100) : 0
      last = t
      if (!still && !drag && t > holdUntil) {
        pos += (SPEED * dt) / 1000
        wrap()
      }
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => { if (Math.abs(el.scrollLeft - pos) > 2) { hold(); pos = el.scrollLeft; wrap() } }
    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag = { x: e.clientX, start: el.scrollLeft }
      el.classList.add('rc-dragging')
      el.setPointerCapture(e.pointerId)
    }
    const onMove = (e) => {
      if (!drag) return
      pos = drag.start - (e.clientX - drag.x)
      drag.start += wrap()
    }
    const onUp = () => { if (!drag) return; drag = null; el.classList.remove('rc-dragging'); hold() }
    const onTouch = () => hold()

    pos = setW()
    el.scrollLeft = pos
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('touchstart', onTouch, { passive: true })
    el.addEventListener('wheel', onTouch, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('touchstart', onTouch)
      el.removeEventListener('wheel', onTouch)
    }
  }, [reviews])

  return (
    <div className="rc" role="region" aria-label="Google reviews">
      <div className="rc-viewport" ref={vp}>
        <div className="rc-track">
          {Array.from({ length: COPIES }, (_, i) => (
            <div className="rc-set" key={i} aria-hidden={i === 1 ? undefined : 'true'}>
              {reviews.map((r) => <Card key={r.name} r={r} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
