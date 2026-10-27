import { useState } from 'react'
import { StrategyGrid } from '../diagrams/StrategyGrid.jsx'

const info = {
  competing: { label: 'Competing', why: 'The outcome matters much more to you than the relationship. Hold firm, use your leverage, and stay assertive rather than aggressive.' },
  collaborating: { label: 'Collaborating', why: 'Both the outcome and the relationship matter, and you have time. Explore interests and build a solution where both sides gain.' },
  compromising: { label: 'Compromising', why: 'Both matter moderately, or time is short. Trade concessions to reach a fair middle ground quickly.' },
  avoiding: { label: 'Avoiding', why: 'Neither the outcome nor the relationship is a priority right now. Postpone deliberately, and set a time to revisit if needed.' },
  accommodating: { label: 'Accommodating', why: 'The relationship matters more than this outcome. Yield on purpose, and note the goodwill you\'ve built.' },
}

export function recommend({ outcome, relationship, time }) {
  // outcome/relationship 1–5, time pressure 1–5
  if (outcome <= 2 && relationship <= 2) return 'avoiding'
  if (outcome >= 4 && relationship >= 4) return time >= 4 ? 'compromising' : 'collaborating'
  if (outcome >= 4 && relationship <= 3) return 'competing'
  if (relationship >= 4 && outcome <= 3) return 'accommodating'
  return 'compromising'
}

export default function Selector() {
  const [v, setV] = useState({ outcome: 4, relationship: 4, time: 2 })
  const rec = recommend(v)
  const s = (k, label, lo, hi) => (
    <div className="slider">
      <div className="row"><label htmlFor={'sl-' + k}><strong>{label}</strong></label><span className="tnum muted">{v[k]} / 5</span></div>
      <input id={'sl-' + k} type="range" min="1" max="5" step="1" value={v[k]} onChange={(e) => setV({ ...v, [k]: +e.target.value })} />
      <div className="row small muted"><span>{lo}</span><span>{hi}</span></div>
    </div>
  )
  return (
    <section className="activity" aria-label="Strategy selector">
      <div className="activity-head">
        <span className="activity-kind">Interactive tool</span>
        <h3>Strategy selector</h3>
      </div>
      <div className="cards-2" style={{ alignItems: 'center' }}>
        <div className="stack">
          {s('outcome', 'How important is the outcome?', 'Minor', 'Critical')}
          {s('relationship', 'How important is the relationship?', 'One-off', 'Long-term, vital')}
          {s('time', 'How much time pressure?', 'Plenty of time', 'Must decide now')}
        </div>
        <div className="diagram fit" style={{ padding: '.5rem' }}>
          <StrategyGrid highlight={rec} marker={{ x: v.relationship, y: v.outcome }} compact />
        </div>
      </div>
      <div className="feedback neutral" aria-live="polite">
        <b style={{ color: `var(--s-${rec})` }}>Start with: {info[rec].label}</b>
        <span>{info[rec].why}</span>
        <span className="small muted">Also consider the counterpart's position: their needs, interests and leverage. Be ready to shift if they change approach.</span>
      </div>
    </section>
  )
}
