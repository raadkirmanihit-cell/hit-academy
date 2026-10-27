import { useState } from 'react'

export default function FlipCards({ items, frontLabel = 'Counterpart', backLabel = 'You', hint = 'Tap to see your response →' }) {
  const [on, setOn] = useState({})
  return (
    <div className="flip-grid">
      {items.map((c, i) => (
        <button key={c.front} className={'flip' + (on[i] ? ' on' : '')} onClick={() => setOn({ ...on, [i]: !on[i] })} aria-pressed={!!on[i]}
          aria-label={`${c.front}. ${on[i] ? 'Showing response' : 'Show recommended response'}`}>
          <div className="flip-inner">
            <div className="flip-face" aria-hidden={!!on[i]}>
              <span className="eyebrow">{frontLabel}</span>
              <h4 style={{ fontSize: '1.15rem' }}>{c.front}</h4>
              <p className="small muted">{c.sub}</p>
              <p className="small" style={{ fontStyle: 'italic' }}>{c.them}</p>
              <span className="hint">{hint}</span>
            </div>
            <div className="flip-face flip-back" aria-hidden={!on[i]}>
              <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>{backLabel}{c.you ? `: ${c.you}` : ''}</span>
              {c.layer && <p className="small"><strong>Possible emotional layer:</strong> {c.layer}</p>}
              <p>{c.say}</p>
              <p className="small muted">{c.why}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
