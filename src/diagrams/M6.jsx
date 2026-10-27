import { useState } from 'react'

// Module 6 diagrams: the psychology of perception.

const SIX = [
  ['Loss aversion', 'Frame offers around potential losses', '#c8452f'],
  ['Strategic anchoring', 'Set the first reference point', '#f7861b'],
  ['Fairness play', 'Tap the desire for equitable solutions', '#148a7a'],
  ['Illusion of choice', 'Create multiple paths to good outcomes', '#3d6fd8'],
  ['Calibrated questions', 'Open "What" and "How" questions', '#6b5bd2'],
  ['Reciprocity bias', 'Give first: people repay kindness', '#b0457a'],
]
export function SixPrinciples() {
  return (
    <div className="six">
      <ol className="six-grid">
        {SIX.map(([t, d, c], i) => (
          <li key={t} style={{ '--c': c }}><span className="six-n">{i + 1}</span><strong>{t}</strong><span>{d}</span></li>
        ))}
      </ol>
      <p className="six-core">Perception, shaped with integrity</p>
    </div>
  )
}

// Prospect-theory value function: losses loom about twice as large as gains.
export function ValueCurve() {
  const W = 600, H = 300, cx = 300, cy = 110, u = 0.5
  const v = (x, lambda) => lambda * u * Math.pow(x, 0.88)
  const pts = (sign, lambda) => Array.from({ length: 41 }, (_, i) => {
    const x = (i / 40) * 270
    return `${cx + sign * x},${cy - sign * v(x, lambda)}`
  }).join(' ')
  const gainY = cy - v(120, 1)
  const lossY = cy + v(120, 2.25)
  return (
    <div className="vcurve">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Value curve: a loss of 100 feels about twice as strong as a gain of 100">
        <line x1="20" y1={cy} x2={W - 20} y2={cy} className="ax" />
        <line x1={cx} y1="8" x2={cx} y2={H - 8} className="ax" />
        <text x={W - 22} y={cy - 8} textAnchor="end" className="lbl">Gains →</text>
        <text x="22" y={cy - 8} className="lbl">← Losses</text>
        <text x={cx + 8} y="20" className="lbl">Feels good</text>
        <text x={cx + 8} y={H - 12} className="lbl">Feels bad</text>
        <polyline points={pts(1, 1)} className="gain" />
        <polyline points={pts(-1, 2.25)} className="loss" />
        <line x1={cx + 120} y1={cy} x2={cx + 120} y2={gainY} className="guide g" />
        <line x1={cx - 120} y1={cy} x2={cx - 120} y2={lossY} className="guide l" />
        <circle cx={cx + 120} cy={gainY} r="5" className="dot g" />
        <circle cx={cx - 120} cy={lossY} r="5" className="dot l" />
        <text x={cx + 120} y={cy + 24} textAnchor="middle" className="note g">Gain €100: +1</text>
        <text x={cx - 120} y={cy - 12} textAnchor="middle" className="note l">Lose €100: about −2</text>
      </svg>
    </div>
  )
}

// The four loss-aversion strategies, applied in a cycle.
export function LossCycle() {
  const s = [
    ['Reframing value', 'Same fact, framed so avoiding the loss feels stronger'],
    ['Highlight opportunity costs', 'What they lose by not acting'],
    ['Leverage scarcity', 'Limited availability or exclusive access'],
    ['Create time-based urgency', 'A limited window to accept'],
  ]
  return (
    <div className="lcycle">
      {s.map(([t, d], i) => <div key={t} className={'lcycle-q q' + (i + 1)}><span className="lcycle-n">{i + 1}</span><strong>{t}</strong><span>{d}</span></div>)}
      <div className="lcycle-hub" aria-hidden="true"><span>↻</span><small>Reinforce the cost of not acting</small></div>
    </div>
  )
}

// How an anchor changes the perception of the same price.
export function AnchorPull() {
  return (
    <div className="apull">
      <div className="apull-row">
        <span className="apull-tag">No anchor</span>
        <div className="apull-track"><b className="price" style={{ left: '40%' }}>$32,000</b></div>
        <p>"Is that a good price?"</p>
      </div>
      <div className="apull-row anchored">
        <span className="apull-tag">Anchor first</span>
        <div className="apull-track">
          <b className="anchor" style={{ left: '84%' }}>$40,000</b>
          <i style={{ left: '40%', width: '44%' }} />
          <b className="price" style={{ left: '40%' }}>$32,000</b>
        </div>
        <p>"I'm saving $8,000: what a deal!"</p>
      </div>
      <p className="apull-note">The price is the same. The first number changed how it feels.</p>
    </div>
  )
}

// Three menus where the option design guides the choice.
const MENUS = {
  sub: { label: 'Subscription plans', items: [['Basic', '$9/month', 'Limited features'], ['Standard', '$12/month', 'All key features', true], ['Premium', '$25/month', 'Features most people don\'t need']], note: 'Standard is intentionally the most reasonable and attractive: Basic looks thin, Premium looks excessive.' },
  fries: { label: 'Restaurant menu', items: [['Small fries', '$2', ''], ['Medium fries', '$3', ''], ['Large fries', '$3.50', '', true]], note: 'Medium is priced close to Large, so Large feels like a much better deal.' },
  consult: { label: 'Consulting choices', items: [['Option A', 'Premium price', 'One-time session'], ['Option B', 'Discounted rate', '5-session package', true], ['Option C', 'Monthly retainer', 'Ongoing support', true]], note: 'Whichever option they pick, you gain revenue. Every path is a good outcome for you.' },
}
export function ChoiceMenus() {
  const [k, setK] = useState('sub')
  const m = MENUS[k]
  return (
    <div className="cmenu">
      <div className="tabs" role="tablist">
        {Object.entries(MENUS).map(([id, v]) => <button key={id} role="tab" aria-selected={k === id} className={'tab' + (k === id ? ' on' : '')} onClick={() => setK(id)}>{v.label}</button>)}
      </div>
      <ol className="cmenu-items">
        {m.items.map(([t, p, d, hi]) => (
          <li key={t} className={hi ? 'hi' : ''}><strong>{t}</strong><span className="cmenu-p">{p}</span>{d && <span className="cmenu-d">{d}</span>}{hi && k !== 'consult' && <em>Looks like the best choice</em>}</li>
        ))}
      </ol>
      <p className="cmenu-note">{m.note}</p>
    </div>
  )
}

// From "Why" to "What" and "How".
export function QuestionShift() {
  return (
    <div className="qshift">
      <div className="qshift-side bad">
        <span className="eyebrow">"Why…?" · yes/no</span>
        <p>"Why did you do that?"<br />"Can you lower the price?"</p>
        <strong>Defensive stance</strong>
        <small>Justify, resist, dig in</small>
      </div>
      <div className="qshift-arrow" aria-hidden="true">→</div>
      <div className="qshift-side good">
        <span className="eyebrow">"What…?" · "How…?"</span>
        <p>"What about this is important to you?"<br />"How can we solve this problem?"</p>
        <strong>Problem-solving mindset</strong>
        <small>Share information, look for solutions</small>
      </div>
    </div>
  )
}

// The cycle of reciprocity.
export function ReciprocityLoop() {
  const s = [
    ['You give first', 'Advice, help, information or goodwill: personal and genuine'],
    ['They feel a pull to repay', 'A small favour creates a sense of obligation'],
    ['They become more open', 'Your later request meets a cooperative mood'],
    ['You reinforce the norm', '"I was happy to help. I know you\'d do the same."'],
  ]
  return (
    <div className="lcycle rloop">
      {s.map(([t, d], i) => <div key={t} className={'lcycle-q q' + (i + 1)}><span className="lcycle-n">{i + 1}</span><strong>{t}</strong><span>{d}</span></div>)}
      <div className="lcycle-hub" aria-hidden="true"><span>↻</span><small>Give before you ask</small></div>
    </div>
  )
}
