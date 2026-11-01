import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

const WORDS = ['', 'Not at all', 'A little', 'Somewhat', 'Confident', 'Very confident']

// Before/after self-rating. The "before" ratings are taken on the overview page, the "after"
// ratings on the takeaways page, which then shows the change side by side.
export default function Confidence({ phase, module }) {
  const { progress, saveActivity } = useApp()
  const c = module.confidence
  const saved = moduleState(progress, module.id).activities[c.id] || {}
  const [vals, setVals] = useState(saved[phase] || {})
  const [editing, setEditing] = useState(!saved[phase + 'At'])
  const complete = c.items.every((it) => vals[it.id])
  const before = saved.before || {}
  const showCompare = phase === 'after' && !editing && Object.keys(before).length > 0

  function rate(id, v) { setVals((x) => ({ ...x, [id]: v })) }
  function submit() {
    saveActivity(module.id, c.id, { [phase]: vals, [phase + 'At']: new Date().toISOString(), done: phase === 'after' || !!saved.afterAt })
    setEditing(false)
  }
  const avg = (o) => { const xs = c.items.map((it) => o[it.id]).filter(Boolean); return xs.length ? xs.reduce((a, x) => a + x, 0) / xs.length : null }

  return (
    <section className="activity confidence" aria-label="Confidence check">
      <div className="activity-head">
        <span className="activity-kind">Confidence check · {phase === 'before' ? 'before you start' : 'after the module'}</span>
        <h3>{phase === 'before' ? 'How confident are you right now?' : 'How confident are you now?'}</h3>
        <p className="muted">{phase === 'before'
          ? 'Rate yourself on each skill from 1 to 5. At the end of the module you rate again and see how far you have come. Only you can see this.'
          : Object.keys(before).length ? 'Rate yourself again on the same skills. We\'ll put your answers next to the ones you gave at the start.' : 'Rate yourself on each skill from 1 to 5. Only you can see this.'}</p>
      </div>
      {editing ? (
        <>
          <div className="conf-list">
            {c.items.map((it) => (
              <div key={it.id} className="conf-row">
                <span id={`cf-${c.id}-${it.id}`}>{it.text}</span>
                <div className="conf-scale" role="radiogroup" aria-labelledby={`cf-${c.id}-${it.id}`}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button key={v} type="button" role="radio" aria-checked={vals[it.id] === v} title={WORDS[v]}
                      className={'conf-dot' + (vals[it.id] === v ? ' on' : '')} onClick={() => rate(it.id, v)}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="row small muted" style={{ justifyContent: 'space-between' }}><span>1 = {WORDS[1].toLowerCase()}</span><span>5 = {WORDS[5].toLowerCase()}</span></div>
          <button className="btn btn-dark btn-sm" style={{ justifySelf: 'start' }} disabled={!complete} onClick={submit}>Save my ratings</button>
        </>
      ) : showCompare ? (
        <>
          <div className="conf-list">
            {c.items.map((it) => {
              const b = before[it.id] || 0, a = vals[it.id] || 0, d = a - b
              return (
                <div key={it.id} className="conf-compare">
                  <span>{it.text}</span>
                  <div className="conf-bars" aria-label={`Before ${b} of 5, now ${a} of 5`}>
                    <div className="conf-bar before"><span style={{ width: (b / 5) * 100 + '%' }} /><em>Before {b}</em></div>
                    <div className="conf-bar after"><span style={{ width: (a / 5) * 100 + '%' }} /><em>Now {a}</em></div>
                  </div>
                  <strong className={'conf-delta tnum' + (d > 0 ? ' up' : d < 0 ? ' down' : '')}>{d > 0 ? '+' + d : d}</strong>
                </div>
              )
            })}
          </div>
          {(() => {
            const d = avg(vals) - avg(before)
            return <p className="feedback neutral"><b>{d > 0.05 ? `Your confidence went up by ${d.toFixed(1)} points on average.` : 'Your confidence is about where it started.'}</b>
              <span>{d > 0.05 ? 'Keep it growing: use the planner on the next page before your next real negotiation.' : 'That\'s useful to know. Pick the skill you rated lowest and revisit that lesson, or practise it with the AI partner.'}</span></p>
          })()}
          <button className="btn btn-sm" style={{ justifySelf: 'start' }} onClick={() => setEditing(true)}>Change my ratings</button>
        </>
      ) : (
        <>
          <p className="feedback good"><b>Saved.</b><span>{phase === 'before' ? 'You\'ll rate yourself again on the "Key takeaways" page at the end of the module.' : 'Thanks for rating yourself.'}</span></p>
          <button className="btn btn-sm" style={{ justifySelf: 'start' }} onClick={() => setEditing(true)}>Change my ratings</button>
        </>
      )}
    </section>
  )
}
