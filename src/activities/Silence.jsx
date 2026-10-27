import { useEffect, useState } from 'react'

// "Feel the pause": say a line, then hold a timed silence, then see what silence often brings.
const SITS = [
  { k: 'ask', tab: 'After a question', line: '"What do you think is really going on in the team right now?"', secs: 4, after: 'They pause, then: "Honestly? Two people aren\'t talking to each other, and it\'s slowing everything down." The real answer often comes after the first, safe one.' },
  { k: 'point', tab: 'After your key point', line: '"We\'re not just solving a problem, we\'re redefining the customer experience."', secs: 3, after: 'Nobody rushes to fill the gap. Your point hangs in the air, and the next thing said is a response to it, not to a stream of extra detail.' },
  { k: 'before', tab: 'Before you answer', line: 'They ask, sharply: "Why should we trust your numbers after last year?"', secs: 3, after: 'You: "I appreciate you bringing that up. Let me think about it for a second." Your calm pause has already answered part of the question: you are not rattled.' },
]

export default function Silence() {
  const [i, setI] = useState(0)
  const [left, setLeft] = useState(null) // null = idle, 0 = done
  const s = SITS[i]
  useEffect(() => {
    if (left == null || left <= 0) return
    const t = setTimeout(() => setLeft(left - 1), 1000)
    return () => clearTimeout(t)
  }, [left])
  const pick = (n) => { setI(n); setLeft(null) }
  const running = left != null && left > 0
  const pct = left == null ? 0 : ((s.secs - left) / s.secs) * 100
  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Guided practice</span>
        <h3>Feel the pause</h3>
        <p className="muted">Most people break a silence after about one second. Choose a moment, say the line out loud, then hold the silence until the circle closes.</p>
      </div>
      <div className="tabs" role="tablist" aria-label="Moment">
        {SITS.map((x, n) => <button key={x.k} role="tab" className="tab" aria-selected={n === i} onClick={() => pick(n)}>{x.tab}</button>)}
      </div>
      <div className="silence">
        <div className={'silence-ring' + (running ? ' on' : '')} style={{ '--p': pct }} aria-live="polite">
          <div>
            {running ? <><strong className="tnum">{s.secs - left + 1}</strong><span className="small">hold…</span></>
              : left === 0 ? <span className="small">Done</span> : <span className="small muted">{s.secs} seconds</span>}
          </div>
        </div>
        <div className="stack" style={{ gap: '.7rem' }}>
          <p className="silence-line">{s.line}</p>
          {left === 0 ? (
            <>
              <p className="small"><strong>What often happens in the silence:</strong> {s.after}</p>
              <div><button className="btn btn-sm" onClick={() => setLeft(s.secs)}>Try again</button></div>
            </>
          ) : (
            <div><button className="btn btn-primary btn-sm" disabled={running} onClick={() => setLeft(s.secs)}>{running ? 'Stay silent…' : 'I\'ve said it. Start the pause'}</button></div>
          )}
        </div>
      </div>
    </section>
  )
}
