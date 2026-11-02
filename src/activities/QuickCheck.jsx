import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

// One question straight after a concept. Instant feedback; it does not count toward the graded quiz.
export default function QuickCheck({ b, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[b.id]
  const [pick, setPick] = useState(saved?.pick ?? null)
  const answered = pick != null
  const right = answered && b.options[pick]?.correct

  function choose(k) {
    if (answered) return
    setPick(k)
    saveActivity(module.id, b.id, { pick: k, correct: !!b.options[k].correct, done: true })
  }
  function retry() { setPick(null); saveActivity(module.id, b.id, { pick: null, done: false }) }

  return (
    <section className="activity quick-check" aria-label="Quick check">
      <div className="activity-head">
        <span className="activity-kind">Quick check</span>
        <h4 style={{ lineHeight: 1.4 }}>{b.q}</h4>
      </div>
      <div className="choice-list">
        {b.options.map((o, k) => {
          let cls = 'choice'
          if (answered) cls += o.correct ? ' correct' : k === pick ? ' wrong' : ''
          return (
            <button key={k} className={cls} disabled={answered} onClick={() => choose(k)}>
              <span className="key">{'ABCD'[k]}</span><span>{o.t}</span>
              {answered && (o.correct || k === pick) && <span className="fb">{o.fb}</span>}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="small" style={{ color: right ? 'var(--good)' : 'var(--bad)', fontWeight: 600 }}>{right ? 'Correct.' : 'Not quite. The best answer is highlighted.'}</span>
          {!right && <button className="btn btn-sm" onClick={retry}>Try again</button>}
        </div>
      )}
    </section>
  )
}
