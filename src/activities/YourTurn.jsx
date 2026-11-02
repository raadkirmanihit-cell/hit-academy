import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { Line } from '../ui/Blocks.jsx'
import { Icon } from '../ui/icons.jsx'

// An example script that stops at "your turn" moments. The learner picks a line (or writes their
// own), then sees the line an expert would use and why, and the script carries on.
// script: [who, text, note] lines and { pause: { prompt, options: [{ t, best, fb }], expert, why } } items.
export default function YourTurn({ b, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[b.id]
  const [answers, setAnswers] = useState(saved?.answers || {}) // pause index -> { pick, own }
  const [mode, setMode] = useState('pick')
  const [own, setOwn] = useState('')
  const pauses = b.script.map((x, i) => (x.pause ? i : null)).filter((i) => i != null)
  const doneCount = pauses.filter((i) => answers[i]).length

  // Show everything up to (and including) the first unanswered pause.
  const firstOpen = pauses.find((i) => !answers[i])
  const visible = firstOpen == null ? b.script : b.script.slice(0, firstOpen + 1)

  function answer(i, a) {
    const next = { ...answers, [i]: a }
    setAnswers(next); setOwn(''); setMode('pick')
    const finished = pauses.every((p) => next[p])
    saveActivity(module.id, b.id, { answers: next, done: finished, score: pauses.filter((p) => b.script[p].pause.options[next[p]?.pick]?.best).length / pauses.length })
  }
  function restart() { setAnswers({}); setOwn(''); setMode('pick'); saveActivity(module.id, b.id, { answers: {}, done: false }) }

  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Your turn · script practice</span>
        <h3>{b.title}</h3>
        {b.setup && <p className="muted">{b.setup}</p>}
      </div>
      <div className="dialogue">
        {visible.map((x, i) => {
          if (!x.pause) {
            const [who, text, note] = x
            return who === '' ? <p key={i} className="stage-dir">{text}</p> : <Line key={i} who={who} text={text} note={note} cast={b.cast || {}} />
          }
          const p = x.pause
          const a = answers[i]
          const n = pauses.indexOf(i) + 1
          if (!a) return (
            <div key={i} className="your-turn fade-in">
              <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>Your turn{pauses.length > 1 ? ` · ${n} of ${pauses.length}` : ''}</span>
              <p style={{ fontWeight: 600 }}>{p.prompt}</p>
              <div className="tabs" role="tablist" aria-label="How to answer">
                <button role="tab" className="tab" aria-selected={mode === 'pick'} onClick={() => setMode('pick')}>Pick a line</button>
                <button role="tab" className="tab" aria-selected={mode === 'own'} onClick={() => setMode('own')}>Write your own</button>
              </div>
              {mode === 'pick' ? (
                <div className="choice-list">
                  {p.options.map((o, k) => (
                    <button key={k} className="choice" onClick={() => answer(i, { pick: k })}>
                      <span className="key">{'ABCD'[k]}</span><span>"{o.t}"</span>
                    </button>
                  ))}
                </div>
              ) : (
                <form className="stack" style={{ gap: '.5rem' }} onSubmit={(e) => { e.preventDefault(); if (own.trim()) answer(i, { own: own.trim() }) }}>
                  <div className="field">
                    <label htmlFor={`yt-${b.id}-${i}`} className="small">What would you say? Write it word for word.</label>
                    <textarea id={`yt-${b.id}-${i}`} rows={3} value={own} onChange={(e) => setOwn(e.target.value)} style={{ minHeight: 80 }} />
                  </div>
                  <button className="btn btn-dark btn-sm" style={{ justifySelf: 'start' }} disabled={!own.trim()}>Compare with the expert line</button>
                </form>
              )}
            </div>
          )
          const picked = a.pick != null ? p.options[a.pick] : null
          return (
            <div key={i} className="stack fade-in" style={{ gap: '.6rem' }}>
              <Line who={b.you} text={picked ? picked.t : a.own} cast={b.cast || {}} right />
              {picked && (
                <div className={'feedback ' + (picked.best ? 'good' : 'bad')}>
                  <b>{picked.best ? 'That\'s the expert move.' : 'Here\'s how that lands.'}</b>
                  <span>{picked.fb}</span>
                </div>
              )}
              {!picked?.best && (
                <div className="expert-line">
                  <span className="eyebrow">What an expert would say</span>
                  <p>"{p.expert}"</p>
                </div>
              )}
              <p className="small" style={{ color: 'var(--ink-2)' }}><strong>Why it works:</strong> {p.why}</p>
              {a.own && <p className="small muted">Compare your line with the expert line: does yours do the same things?</p>}
            </div>
          )
        })}
        {firstOpen == null && b.note && <p className="dialogue-note">{b.note}</p>}
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="small muted tnum">{doneCount} of {pauses.length} turns played</span>
        {firstOpen == null && <button className="btn btn-sm" onClick={restart}><Icon.arrowL /> Play it again</button>}
      </div>
    </section>
  )
}
