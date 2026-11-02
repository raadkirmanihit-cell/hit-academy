import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { Icon } from '../ui/icons.jsx'

// "Write it, then check it": a short series of situations. The learner writes the line they would
// use, then ticks a checklist against their own line and compares it with a model line.
// items: [{ situation, task, criteria: [..], model, why }]. Answers save to the learner's account.
export default function WriteIt({ b, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[b.id]
  const [answers, setAnswers] = useState(saved?.answers || {}) // index -> { text, ticks: [bool] }
  const [i, setI] = useState(() => Math.min(Object.keys(saved?.answers || {}).length, b.items.length - 1))
  const [draft, setDraft] = useState('')
  const it = b.items[i]
  const a = answers[i]
  const done = b.items.every((_, n) => answers[n])

  function store(next) {
    setAnswers(next)
    const fin = b.items.every((_, n) => next[n])
    const ticked = b.items.reduce((s, x, n) => s + (next[n]?.ticks || []).filter(Boolean).length, 0)
    const total = b.items.reduce((s, x) => s + x.criteria.length, 0)
    saveActivity(module.id, b.id, { answers: next, done: fin, score: ticked / total })
  }
  function submit(e) {
    e.preventDefault()
    if (!draft.trim()) return
    store({ ...answers, [i]: { text: draft.trim(), ticks: it.criteria.map(() => false) } })
    setDraft('')
  }
  function tick(k) {
    const ticks = [...a.ticks]; ticks[k] = !ticks[k]
    store({ ...answers, [i]: { ...a, ticks } })
  }
  function restart() { setAnswers({}); setI(0); setDraft(''); saveActivity(module.id, b.id, { answers: {}, done: false }) }

  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Write it, then check it</span>
        <h3>{b.title}</h3>
        {b.intro && <p className="muted">{b.intro}</p>}
      </div>
      <div className="stack fade-in" key={i} style={{ gap: '.8rem' }}>
        <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>Situation {i + 1} of {b.items.length}</span>
        <p>{it.situation}</p>
        <p style={{ fontWeight: 600 }}>{it.task}</p>
        {!a ? (
          <form className="stack" style={{ gap: '.5rem' }} onSubmit={submit}>
            <div className="field">
              <label htmlFor={`wi-${b.id}-${i}`} className="small">Write your line, word for word.</label>
              <textarea id={`wi-${b.id}-${i}`} rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} style={{ minHeight: 80 }} />
            </div>
            <button className="btn btn-dark btn-sm" style={{ justifySelf: 'start' }} disabled={!draft.trim()}>Check my line</button>
          </form>
        ) : (
          <div className="stack" style={{ gap: '.7rem' }}>
            <div className="expert-line" style={{ background: 'var(--surface-2)' }}>
              <span className="eyebrow">Your line</span>
              <p>"{a.text}"</p>
            </div>
            <div>
              <p className="small" style={{ fontWeight: 600, marginBottom: '.3rem' }}>Tick what your line does:</p>
              <div className="stack" style={{ gap: '.35rem' }}>
                {it.criteria.map((c, k) => (
                  <label key={k} className="row small" style={{ gap: '.5rem', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input type="checkbox" checked={!!a.ticks[k]} onChange={() => tick(k)} style={{ marginTop: '.2rem' }} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="expert-line">
              <span className="eyebrow">One strong version</span>
              <p>"{it.model}"</p>
            </div>
            {it.why && <p className="small" style={{ color: 'var(--ink-2)' }}><strong>Why it works:</strong> {it.why}</p>}
          </div>
        )}
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="small muted tnum">{Object.keys(answers).length} of {b.items.length} written</span>
        <div className="row" style={{ gap: '.5rem' }}>
          {i > 0 && <button className="btn btn-sm" onClick={() => { setI(i - 1); setDraft('') }}><Icon.arrowL /> Back</button>}
          {a && i < b.items.length - 1 && <button className="btn btn-dark btn-sm" onClick={() => { setI(i + 1); setDraft('') }}>Next situation</button>}
          {done && i === b.items.length - 1 && <button className="btn btn-sm" onClick={restart}>Start again</button>}
        </div>
      </div>
    </section>
  )
}
