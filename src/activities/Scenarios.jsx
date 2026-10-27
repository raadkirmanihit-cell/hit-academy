import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { Icon } from '../ui/icons.jsx'

// A sequence of short situations, each with options and feedback on every option.
export default function Scenarios({ a, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[a.id]
  const [picks, setPicks] = useState(saved?.picks || {})
  const [i, setI] = useState(() => Math.min(Object.keys(saved?.picks || {}).length, a.items.length - 1))
  const it = a.items[i]
  const p = picks[i]
  const done = Object.keys(picks).length === a.items.length
  const score = a.items.filter((x, n) => x.options[picks[n]]?.correct).length

  function pick(k) {
    if (p != null) return
    const np = { ...picks, [i]: k }
    setPicks(np)
    const fin = Object.keys(np).length === a.items.length
    saveActivity(module.id, a.id, { picks: np, done: fin, score: a.items.filter((x, n) => x.options[np[n]]?.correct).length / a.items.length })
  }

  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Scenario practice</span>
        <h3>{a.title}</h3>
        <p className="muted">{a.prompt}</p>
      </div>
      <div className="row" style={{ gap: '.35rem' }} aria-label="Scenarios">
        {a.items.map((x, n) => (
          <button key={n} onClick={() => setI(n)} className="btn btn-sm" aria-current={n === i}
            style={{ minHeight: 32, padding: '0 .7rem', background: n === i ? 'var(--navy)' : picks[n] != null ? (x.options[picks[n]].correct ? 'var(--good-soft)' : 'var(--bad-soft)') : undefined, color: n === i ? 'var(--on-navy)' : undefined }}>
            {n + 1}
          </button>
        ))}
      </div>
      <div className="dialogue" style={{ background: 'var(--surface-2)', border: 0 }}>
        <span className="eyebrow">{it.who}{it.type && p != null ? ` · ${it.type}` : ''}</span>
        <p style={{ font: '500 1.1rem/1.5 var(--f-display)' }}>{it.scene}</p>
      </div>
      <div className="choice-list">
        {it.options.map((o, k) => {
          let cls = 'choice'
          if (p != null) cls += o.correct ? ' correct' : k === p ? ' wrong' : ''
          return (
            <button key={k} className={cls} disabled={p != null} onClick={() => pick(k)}>
              <span className="key">{'ABC'[k]}</span><span>{o.t}</span>
              {p != null && <span className="fb">{o.fb}</span>}
            </button>
          )
        })}
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="small muted tnum">{done ? `Done: ${score} of ${a.items.length} best responses` : `${Object.keys(picks).length} of ${a.items.length} answered`}</span>
        {i < a.items.length - 1 && <button className="btn btn-dark btn-sm" disabled={p == null} onClick={() => setI(i + 1)}>Next situation <Icon.arrowR /></button>}
        {done && i === a.items.length - 1 && <button className="btn btn-sm" onClick={() => { setPicks({}); setI(0); saveActivity(module.id, a.id, { picks: {} }) }}>Start over</button>}
      </div>
    </section>
  )
}
