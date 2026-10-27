import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

// Module 5 "Strengthen your BATNA": tick preparation actions and watch the fallback grow stronger.
const ID = 'a-batna-meter'
const ACTIONS = [
  { k: 'research', t: 'Do market research', d: 'You gather three realistic offers from other agencies and learn their prices and timelines.' },
  { k: 'relations', t: 'Build relationships early', d: 'You have coffee with two agency owners before you need them. A warm contact makes the alternative real.' },
  { k: 'internal', t: 'Develop an internal solution', d: 'You check whether two colleagues could run the campaign in-house if the timeline moved by a month.' },
  { k: 'test', t: 'Test your fallback', d: 'You ask your favourite alternative agency for a written quote. They can start on the 1st.' },
  { k: 'cred', t: 'Improve your credibility', d: 'You collect the results of last year\'s campaign, so any agency sees you as an attractive client.' },
]
const LEVELS = [
  { max: 1, name: 'Weak', c: 'var(--b-aggressive)', batna: '"If this falls through… I suppose we\'d have to find someone. Somehow."', note: 'A theoretical fallback. Under pressure, you are likely to accept a poor deal.' },
  { max: 3, name: 'Moderate', c: 'var(--orange)', batna: '"If we can\'t agree, we\'ll probably go with one of the other agencies, though we haven\'t confirmed anything."', note: 'Some leverage. You can push for compromise, but you still feel pressure.' },
  { max: 5, name: 'Strong', c: 'var(--b-assertive)', batna: '"If we can\'t beat Agency B\'s written €42,000 quote here, we\'ll sign with them and start on the 1st."', note: 'A tested, concrete alternative. You can negotiate calmly and walk away gracefully if needed.' },
]

export default function BatnaMeter({ module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[ID]
  const [on, setOn] = useState(saved?.on || {})
  const n = ACTIONS.filter((a) => on[a.k]).length
  const lvl = LEVELS.find((l) => n <= l.max)
  const toggle = (k) => {
    const next = { ...on, [k]: !on[k] }
    setOn(next)
    const count = ACTIONS.filter((a) => next[a.k]).length
    saveActivity(module.id, ID, { on: next, done: count === ACTIONS.length })
  }
  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Interactive exercise</span>
        <h3>Strengthen your BATNA</h3>
        <p className="muted">You are negotiating with a marketing agency for a product launch campaign. Right now, you have no real alternative. Tick each preparation step you take, and watch your BATNA change.</p>
      </div>
      <div className="bmeter">
        <ul className="bmeter-actions">
          {ACTIONS.map((a) => (
            <li key={a.k}>
              <button className={'bmeter-act' + (on[a.k] ? ' on' : '')} aria-pressed={!!on[a.k]} onClick={() => toggle(a.k)}>
                <span className="bmeter-box" aria-hidden="true">{on[a.k] ? '✓' : ''}</span>
                <span><strong>{a.t}</strong>{on[a.k] && <span className="small muted">{a.d}</span>}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="bmeter-out" style={{ '--c': lvl.c }} aria-live="polite">
          <span className="eyebrow">Your BATNA</span>
          <div className="bmeter-gauge"><i style={{ width: `${Math.max(8, (n / ACTIONS.length) * 100)}%` }} /></div>
          <strong className="bmeter-level">{lvl.name}</strong>
          <p className="bmeter-batna">{lvl.batna}</p>
          <p className="small muted">{lvl.note}</p>
        </div>
      </div>
    </section>
  )
}
