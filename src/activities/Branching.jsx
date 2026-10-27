import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { Meter } from '../ui/Blocks.jsx'

const clamp = (v) => Math.max(0, Math.min(100, v))
const tagColor = { Aggressive: 'var(--b-aggressive)', Passive: 'var(--b-passive)', Manipulative: 'var(--b-manipulative)', Assertive: 'var(--b-assertive)', Dismissive: 'var(--b-aggressive)', Defensive: 'var(--b-aggressive)', Avoidant: 'var(--b-passive)', Empathetic: 'var(--b-assertive)', Strategic: 'var(--b-assertive)', Effective: 'var(--b-assertive)', Risky: 'var(--b-manipulative)' }

// Branching role-play: the counterpart reacts to each choice; two meters track
// the outcome and the relationship. The path is saved so learners can review it.
export default function Branching({ a, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[a.id]
  const [path, setPath] = useState(saved?.path || []) // [{node, choice}]
  const [started, setStarted] = useState(!!saved?.path?.length)
  const endRef = useRef()

  let meters = { ...a.start }
  path.forEach(({ node, choice }) => {
    const d = a.nodes[node].choices[choice].d
    meters = { outcome: clamp(meters.outcome + d[0]), relationship: clamp(meters.relationship + d[1]) }
  })
  const current = path.length ? a.nodes[path[path.length - 1].node].choices[path[path.length - 1].choice].next : 'start'
  const node = a.nodes[current]

  useEffect(() => { if (started && path.length) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [path.length, started])

  function choose(k) {
    const np = [...path, { node: current, choice: k }]
    setPath(np)
    const nextNode = a.nodes[a.nodes[current].choices[k].next]
    saveActivity(module.id, a.id, { path: np, done: !!nextNode.end, ending: nextNode.end ? a.nodes[current].choices[k].next : undefined })
  }
  function restart() { setPath([]); saveActivity(module.id, a.id, { path: [] }) }

  const c = a.counterpart
  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Branching role-play</span>
        <h3>{a.title}</h3>
      </div>
      <div className="scene">
        <img src={a.img} alt="" />
        <p className="small" style={{ color: 'var(--ink-2)' }}>{a.intro}</p>
      </div>
      {!started ? (
        <div><button className="btn btn-primary" onClick={() => setStarted(true)}>Start the conversation</button></div>
      ) : (
        <>
          <div className="meters" style={{ position: 'sticky', top: 'calc(70px + env(safe-area-inset-top, 0px))', background: 'var(--surface)', paddingBlock: '.5rem', zIndex: 2 }}>
            <Meter label={a.meterLabels?.[0] || 'Your outcome'} v={meters.outcome} />
            <Meter label={a.meterLabels?.[1] || `Relationship with ${c.name}`} v={meters.relationship} rel />
          </div>
          <div className="stack" style={{ gap: '.7rem' }}>
            {path.map(({ node: n, choice }, idx) => {
              const nd = a.nodes[n], ch = nd.choices[choice]
              return (
                <div key={idx} className="stack" style={{ gap: '.6rem' }}>
                  <CLine c={c} text={nd.say} />
                  <div className="line right">
                    <div className="bubble" style={{ justifySelf: 'end' }}>
                      <span className="name">You · <span style={{ color: tagColor[ch.tag] || 'var(--muted)' }}>{ch.tag}</span></span>
                      <span>{ch.t}</span>
                      <span className="annot">{ch.fb}</span>
                    </div>
                    <span className="who" style={{ background: 'var(--orange)', color: '#1c0f00', fontSize: '.7rem', order: 2 }}>YOU</span>
                  </div>
                </div>
              )
            })}
            <CLine c={c} text={node.say} />
          </div>
          <div ref={endRef}>
            {node.end ? (
              <div className="stack celebrate" style={{ gap: '.8rem' }}>
                <div className="result-card" style={{ background: 'var(--navy)' }}>
                  <span className="eyebrow" style={{ color: '#9aa5c6' }}>Result</span>
                  <h3 style={{ color: '#fff' }}>{node.verdict}</h3>
                  <p style={{ color: '#c9d0e6' }}>{node.summary}</p>
                  <p className="small tnum" style={{ color: '#c9d0e6' }}>{a.meterLabels?.[0] || 'Outcome'} {meters.outcome} / 100 · {a.meterLabels?.[1] || 'Relationship'} {meters.relationship} / 100</p>
                </div>
                <div><button className="btn" onClick={restart}>Try a different path</button></div>
              </div>
            ) : (
              <div className="stack" style={{ gap: '.5rem' }}>
                <span className="eyebrow">How do you respond?</span>
                <div className="choice-list">
                  {node.choices.map((ch, k) => (
                    <button key={k} className="choice" onClick={() => choose(k)}>
                      <span className="key">{'ABCD'[k]}</span><span>{ch.t}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}

function CLine({ c, text }) {
  return (
    <div className="line">
      <span className="who">{c.initials}</span>
      <div className="bubble"><span className="name">{c.name} · {c.role}</span><span>{text}</span></div>
    </div>
  )
}
