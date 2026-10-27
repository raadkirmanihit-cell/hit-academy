import { useEffect, useRef, useState } from 'react'

// Guided 4–7–8 breathing pacer: inhale 4s, hold 7s, exhale 8s, for up to 4 cycles.
const PHASES = [
  { name: 'Breathe in', hint: 'quietly, through your nose', secs: 4, scale: 1 },
  { name: 'Hold', hint: 'keep it gentle', secs: 7, scale: 1 },
  { name: 'Breathe out', hint: 'fully, through your mouth', secs: 8, scale: 0.55 },
]
const CYCLES = 4

export default function Breathing() {
  const [run, setRun] = useState(false)
  const [st, setSt] = useState({ phase: 0, left: PHASES[0].secs, cycle: 1, done: false })
  const t = useRef()

  useEffect(() => {
    if (!run) return
    t.current = setInterval(() => {
      setSt((s) => {
        if (s.left > 1) return { ...s, left: s.left - 1 }
        const np = (s.phase + 1) % PHASES.length
        if (np === 0 && s.cycle >= CYCLES) return { ...s, done: true }
        return { phase: np, left: PHASES[np].secs, cycle: np === 0 ? s.cycle + 1 : s.cycle, done: false }
      })
    }, 1000)
    return () => clearInterval(t.current)
  }, [run])
  useEffect(() => { if (st.done) setRun(false) }, [st.done])

  const { phase, left, cycle, done } = st
  const ph = PHASES[phase]
  const start = () => { setSt({ phase: 0, left: PHASES[0].secs, cycle: 1, done: false }); setRun(true) }
  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Guided practice</span>
        <h3>Try the 4–7–8 breath</h3>
        <p className="muted">Four cycles take about 76 seconds. Follow the circle and the count.</p>
      </div>
      <div className="breath">
        <div className={'breath-orb' + (run ? ' on' : '')} style={{ '--s': run ? ph.scale : 0.55, '--d': run ? `${ph.secs}s` : '.6s' }} aria-live="polite">
          <div>
            {run ? <><strong className="tnum">{left}</strong><span className="small">{ph.name}</span></> : <span className="small muted">{done ? 'Well done' : 'Ready'}</span>}
          </div>
        </div>
        <div className="stack" style={{ gap: '.6rem' }}>
          {run ? (
            <>
              <h4>{ph.name} <span className="muted small">· {ph.hint}</span></h4>
              <p className="small muted tnum">Cycle {cycle} of {CYCLES}</p>
              <div><button className="btn btn-sm" onClick={() => setRun(false)}>Stop</button></div>
            </>
          ) : (
            <>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--ink-2)' }}>
                {PHASES.map((p) => <li key={p.name}><strong>{p.name}</strong> for {p.secs} seconds, {p.hint}.</li>)}
              </ul>
              {done && <p className="small" style={{ color: 'var(--good)' }}>Notice your shoulders and jaw. Most people feel noticeably calmer after four cycles.</p>}
              <div><button className="btn btn-primary btn-sm" onClick={start}>{done ? 'Go again' : 'Start'}</button></div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
