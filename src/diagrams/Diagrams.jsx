import { useState } from 'react'
// Explanatory diagrams. All colours come from theme tokens so they work in light and dark.
const F = (v) => ({ fill: v })
const ST = (v, w = 1.5) => ({ stroke: v, strokeWidth: w, fill: 'none' })

export function Criteria() {
  const c = [
    { x: 210, y: 150, col: 'var(--orange)' },
    { x: 310, y: 150, col: 'var(--s-accommodating)' },
    { x: 260, y: 236, col: 'var(--s-collaborating)' },
  ]
  const label = (x, y, t, sub) => (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize="19" fontWeight="700">{t}</text>
      <text x={x} y={y + 20} textAnchor="middle" fontSize="13" style={F('var(--muted)')}>{sub}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 520 380" role="img" aria-label="Three criteria for a good negotiation: wise agreement, efficient, relationship">
      {c.map((k, i) => <circle key={i} cx={k.x} cy={k.y} r="88" style={{ fill: k.col, fillOpacity: 0.16, stroke: k.col, strokeWidth: 2 }} />)}
      {label(110, 34, 'Wise agreement', 'meets key interests, lasts')}
      {label(410, 34, 'Efficient', 'no wasted time or energy')}
      {label(260, 350, 'Relationship', 'improved, or at least preserved')}
      <circle cx="260" cy="180" r="40" style={F('var(--navy)')} />
      <text x="260" y="176" textAnchor="middle" fontSize="13" fontWeight="700" style={F('#fff')}>Good</text>
      <text x="260" y="192" textAnchor="middle" fontSize="13" fontWeight="700" style={F('#fff')}>negotiation</text>
    </svg>
  )
}

export function TwoDimensions() {
  return (
    <div className="dims" role="img" aria-label="Behaviour (how) plus strategy (what) shape the outcome">
      <div className="dim" style={{ background: 'var(--orange-soft)' }}>
        <span className="eyebrow" style={{ color: 'var(--orange-ink)' }}>Behaviour</span>
        <b>How</b><span>you show up</span>
        <span className="small muted">Tone · emotional style · communication pattern</span>
      </div>
      <span className="op">+</span>
      <div className="dim" style={{ background: 'var(--info-soft)' }}>
        <span className="eyebrow" style={{ color: 'var(--s-accommodating)' }}>Strategy</span>
        <b>What</b><span>approach you take</span>
        <span className="small muted">Cooperate · compete · avoid …</span>
      </div>
      <span className="op">=</span>
      <span className="out">Outcome</span>
    </div>
  )
}

export function BehaviourMap() {
  const L = 90, R = 500, T = 16, B = 290, mx = (L + R) / 2, my = (T + B) / 2
  const q = [
    { x: L, y: T, label: 'Aggressive', sub: ['Direct, but disregards', 'the other side'], col: 'var(--b-aggressive)' },
    { x: mx, y: T, label: 'Assertive', sub: ['Direct and', 'respectful'], col: 'var(--b-assertive)' },
    { x: L, y: my, label: 'Manipulative', sub: ['Indirect, works against', 'the other side'], col: 'var(--b-manipulative)' },
    { x: mx, y: my, label: 'Passive', sub: ['Defers to the other,', 'hides own needs'], col: 'var(--b-passive)' },
  ]
  return (
    <svg viewBox="0 0 520 350" role="img" aria-label="Four behaviours mapped by directness about own needs and respect for the other side">
      {q.map((k) => (
        <g key={k.label}>
          <rect x={k.x + 4} y={k.y + 4} width={(R - L) / 2 - 8} height={(B - T) / 2 - 8} rx="12" style={{ fill: k.col, fillOpacity: 0.14 }} />
          <text x={k.x + (R - L) / 4} y={k.y + (B - T) / 4 - 12} textAnchor="middle" fontSize="21" fontWeight="700" style={F(k.col)}>{k.label}</text>
          {k.sub.map((t, j) => <text key={j} x={k.x + (R - L) / 4} y={k.y + (B - T) / 4 + 14 + j * 18} textAnchor="middle" fontSize="15" style={F('var(--ink-2)')}>{t}</text>)}
        </g>
      ))}
      <text x={mx} y={B + 30} textAnchor="middle" fontSize="15" fontWeight="600">Respect for the other side's needs →</text>
      <text transform={`translate(${L - 22} ${my}) rotate(-90)`} textAnchor="middle" fontSize="15" fontWeight="600">Directness about my needs →</text>
      <text x={L + 4} y={B + 28} fontSize="11" style={F('var(--muted)')}>Low</text>
      <text x={R} y={B + 28} fontSize="11" textAnchor="end" style={F('var(--muted)')}>High</text>
    </svg>
  )
}

export function Funnel() {
  const rows = [
    { n: 1, t: 'Desired outcome', s: 'The value you want and the impact on the relationship', w: 420 },
    { n: 2, t: "Counterpart's position", s: 'Their needs, interests and potential leverage', w: 340 },
    { n: 3, t: 'Context', s: 'Time, resources and relationship dynamics', w: 260 },
  ]
  return (
    <svg viewBox="0 0 520 330" role="img" aria-label="Three factors narrow down your strategy: desired outcome, counterpart's position, context">
      {rows.map((r, i) => {
        const y = 10 + i * 82, top = r.w, bot = rows[i + 1]?.w ?? 190
        return (
          <g key={r.n}>
            <path d={`M${260 - top / 2} ${y} H${260 + top / 2} L${260 + bot / 2} ${y + 74} H${260 - bot / 2} Z`} style={{ fill: 'var(--navy-2)', fillOpacity: 0.12 + i * 0.1 }} />
            <text x="260" y={y + 32} textAnchor="middle" fontSize="18" fontWeight="700">{r.n} · {r.t}</text>
            <text x="260" y={y + 53} textAnchor="middle" fontSize="13" style={F('var(--ink-2)')}>{r.s}</text>
          </g>
        )
      })}
      <rect x="165" y="262" width="190" height="52" rx="26" style={F('var(--orange)')} />
      <text x="260" y="294" textAnchor="middle" fontSize="15" fontWeight="700" style={F('#1c0f00')}>Your strategy</text>
    </svg>
  )
}

export function Combos() {
  const items = [
    { s: 'Collaborative', b: 'Assertive', r: 'Builds trust and leads to win-win outcomes.', good: true },
    { s: 'Collaborative', b: 'Passive', r: 'Your needs may be ignored.' },
    { s: 'Competitive', b: 'Aggressive', r: 'Might win the deal but harms the relationship.' },
    { s: 'Accommodating', b: 'Manipulative', r: 'May seem helpful but can create distrust.' },
  ]
  const bk = { Assertive: 'assertive', Passive: 'passive', Aggressive: 'aggressive', Manipulative: 'manipulative' }
  const sk = { Collaborative: 'collaborating', Competitive: 'competing', Accommodating: 'accommodating' }
  return (
    <div className="cards-2" role="list" aria-label="Examples of behaviour and strategy combinations">
      {items.map((it) => (
        <div role="listitem" key={it.s + it.b} style={{ display: 'grid', gap: '.5rem', padding: '1rem', borderRadius: 'var(--r-m)', background: it.good ? 'var(--good-soft)' : 'var(--surface-2)' }}>
          <div className="row" style={{ gap: '.4rem' }}>
            <span className="pill" style={{ background: 'var(--surface)', color: `var(--s-${sk[it.s]})` }}>{it.s} strategy</span>
            <span aria-hidden="true">+</span>
            <span className="pill" style={{ background: 'var(--surface)', color: `var(--b-${bk[it.b]})` }}>{it.b} behaviour</span>
          </div>
          <p style={{ fontWeight: 600 }}>{it.r}</p>
        </div>
      ))}
    </div>
  )
}

export function Pareto() {
  // Data read from the module's chart "Pareto Principle Analysis (Updated View)".
  const pts = [[0, 60], [5, 67.5], [20, 90], [50, 96], [50.4, 95], [100, 97.5]]
  const zones = [
    { a: 0, b: 5, label: 'Must', col: '#e0a400' },
    { a: 5, b: 20, label: 'Should', col: 'var(--orange)' },
    { a: 20, b: 50, label: 'Could', col: 'var(--s-avoiding)' },
    { a: 50, b: 100, label: "Won't", col: 'var(--b-aggressive)' },
  ]
  const L = 56, R = 500, T = 34, B = 290
  const x = (v) => L + (v / 100) * (R - L), y = (v) => B - (v / 100) * (B - T)
  const curveAt = (v) => { for (let i = 1; i < pts.length; i++) if (v <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + ((v - x0) / (x1 - x0 || 1)) * (y1 - y0) } return 97.5 }
  const line = pts.map(([a, b], i) => `${i ? 'L' : 'M'}${x(a).toFixed(1)} ${y(b).toFixed(1)}`).join(' ')
  return (
    <svg viewBox="0 0 520 340" role="img" aria-label="Pareto chart: benefit rises from 60% to 90% over the first 20% of effort, then flattens near 97%">
      {[0, 20, 40, 60, 80, 100].map((t) => (
        <g key={t}>
          <line x1={L} x2={R} y1={y(t)} y2={y(t)} style={{ stroke: 'var(--line)' }} strokeDasharray="3 4" />
          <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" style={F('var(--muted)')}>{t}</text>
          <text x={x(t)} y={B + 18} textAnchor="middle" fontSize="11" style={F('var(--muted)')}>{t}</text>
        </g>
      ))}
      {zones.map((z) => {
        const steps = 20, top = []
        for (let i = 0; i <= steps; i++) { const v = z.a + ((z.b - z.a) * i) / steps; top.push(`${x(v).toFixed(1)} ${y(curveAt(v)).toFixed(1)}`) }
        return (
          <g key={z.label}>
            <path d={`M${x(z.a)} ${y(0)} L${top.join(' L')} L${x(z.b)} ${y(0)} Z`} style={{ fill: z.col, fillOpacity: 0.22 }} />
            <text x={(x(z.a) + x(z.b)) / 2} y={y(0) - 12} textAnchor="middle" fontSize={z.b - z.a < 10 ? 10 : 13} fontWeight="700" style={F('var(--ink-2)')}>{z.label}</text>
          </g>
        )
      })}
      <path d={line} style={ST('var(--navy-2)', 3)} />
      <circle cx={x(20)} cy={y(90)} r="5" style={F('var(--orange)')} />
      <text x={x(20) + 8} y={y(90) + 22} fontSize="12" fontWeight="700">20% effort ≈ 90% benefit</text>
      <text x={(L + R) / 2} y={B + 40} textAnchor="middle" fontSize="12.5" fontWeight="600">Level of effort (%)</text>
      <text transform={`translate(14 ${(T + B) / 2}) rotate(-90)`} textAnchor="middle" fontSize="12.5" fontWeight="600">Level of benefit (%)</text>
    </svg>
  )
}

export function Iceberg() {
  const W = 600, SEA = 178
  const above = [['Price', 'Deadlines'], ['Deliverables', 'Roles'], ['Responsibilities']]
  const below = [['Trust', 'Respect'], ['Status', 'Fairness'], ['Control', 'Fear']]
  const chipW = (t, size) => t.length * size * 0.52 + 24
  const row = (items, y, size, x0, gap, style, txt, center) => {
    const widths = items.map((t) => chipW(t, size))
    const total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1)
    let x = center ? x0 - total / 2 : x0
    return items.map((t, i) => {
      const w = widths[i], cx = x
      x += w + gap
      return (
        <g key={t}>
          <rect x={cx} y={y} width={w} height={size + 14} rx={(size + 14) / 2} style={style} />
          <text x={cx + w / 2} y={y + size + 3} textAnchor="middle" fontSize={size} fontWeight="600" style={txt}>{t}</text>
        </g>
      )
    })
  }
  const wave = (y, a) => `M0 ${y} ` + Array.from({ length: 12 }, (_, i) => `Q ${i * 50 + 25} ${y + (i % 2 ? a : -a)} ${i * 50 + 50} ${y}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} 470`} role="img" aria-label="An iceberg. Above the waterline: the rational conversation about price, deadlines, deliverables, roles and responsibilities. Below the waterline, much larger: the emotional conversation about trust, respect, status, fairness, control and fear. Most failed negotiations break down below the surface.">
      <defs>
        <clipPath id="ib-clip"><rect width={W} height="470" rx="18" /></clipPath>
        <linearGradient id="ib-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6f9fd" /><stop offset="1" stopColor="#dbe8f5" /></linearGradient>
        <linearGradient id="ib-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f5a96" /><stop offset=".45" stopColor="#14336b" /><stop offset="1" stopColor="#0b1a44" /></linearGradient>
        <linearGradient id="ib-mass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bcd6ef" stopOpacity=".55" /><stop offset="1" stopColor="#6d93c4" stopOpacity=".18" /></linearGradient>
        <linearGradient id="ib-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".16" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></linearGradient>
      </defs>
      <g clipPath="url(#ib-clip)">
        <rect width={W} height={SEA} style={{ fill: 'url(#ib-sky)' }} />
        <rect y={SEA} width={W} height={470 - SEA} style={{ fill: 'url(#ib-sea)' }} />
        {/* light rays */}
        {[[90, 40], [250, 55], [470, 45]].map(([x, w]) => <polygon key={x} points={`${x},${SEA} ${x + w},${SEA} ${x + w * 2.6},470 ${x + w * 1.2},470`} style={{ fill: 'url(#ib-ray)' }} />)}
        {/* underwater mass */}
        <polygon points={`236,${SEA} 398,${SEA} 478,236 506,322 452,402 318,438 182,404 112,318 150,232`} style={{ fill: 'url(#ib-mass)', stroke: '#d7e6f6', strokeOpacity: 0.45, strokeWidth: 1.5 }} />
        <g style={{ stroke: '#ffffff', strokeOpacity: 0.08, strokeWidth: 1.2, fill: 'none' }}>
          <path d={`M150 232 L236 ${SEA} M478 236 L398 ${SEA} M150 232 L300 262 L478 236 M300 262 L318 438 M112 318 L300 262 L506 322 M182 404 L300 262 L452 402`} />
        </g>
        {/* tip above water */}
        <polygon points={`236,${SEA} 268,104 292,122 326,64 360,130 398,${SEA}`} style={{ fill: '#ffffff' }} />
        <polygon points={`326,64 360,130 398,${SEA} 330,${SEA} 318,118`} style={{ fill: '#b9d0e8' }} />
        <polygon points={`268,104 292,122 286,${SEA} 236,${SEA}`} style={{ fill: '#d3e2f2' }} />
        <polygon points={`292,122 326,64 318,118 330,${SEA} 286,${SEA}`} style={{ fill: '#f4f8fc' }} />
        <path d={`M236 ${SEA} L268 104 L292 122 L326 64 L360 130 L398 ${SEA}`} style={{ fill: 'none', stroke: '#8fb0d3', strokeWidth: 1.5, strokeLinejoin: 'round' }} />
        {/* waterline */}
        <path d={wave(SEA, 3)} style={{ fill: 'none', stroke: '#ffffff', strokeOpacity: 0.85, strokeWidth: 2.5 }} />
        <path d={wave(SEA + 7, 2)} style={{ fill: 'none', stroke: '#ffffff', strokeOpacity: 0.25, strokeWidth: 1.5 }} />
        {/* above the surface */}
        <text x="26" y="34" fontSize="12" fontWeight="600" letterSpacing="2" style={{ fill: '#b35600' }}>ABOVE THE SURFACE</text>
        <text x="26" y="60" fontSize="21" fontWeight="700" style={{ fill: '#0b1a44', fontFamily: 'var(--f-display)' }}>The rational conversation</text>
        <text x="26" y="80" fontSize="14" style={{ fill: '#4a5679' }}>What is said</text>
        {above.map((r, i) => row(r, 92 + i * 27, 13, 26, 6, { fill: '#ffffff', stroke: '#b9cbe2', strokeWidth: 1 }, { fill: '#1b2c66' }))}
        {/* below the surface */}
        <text x="317" y="222" textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="2" style={{ fill: '#ffb46b' }}>BELOW THE SURFACE</text>
        <text x="317" y="250" textAnchor="middle" fontSize="23" fontWeight="700" style={{ fill: '#ffffff', fontFamily: 'var(--f-display)' }}>The emotional conversation</text>
        <text x="317" y="272" textAnchor="middle" fontSize="15" style={{ fill: '#c9d8ef' }}>What is felt</text>
        {below.map((r, i) => row(r, 290 + i * 38, 17, 317, 10, { fill: '#ffffff', fillOpacity: 0.13, stroke: '#ffffff', strokeOpacity: 0.4, strokeWidth: 1 }, { fill: '#ffffff' }, true))}
        {/* caption */}
        <g transform="translate(300 452)">
          <rect x="-178" y="-15" width="356" height="26" rx="13" style={{ fill: '#f7861b', fillOpacity: 0.16, stroke: '#f7861b', strokeOpacity: 0.55 }} />
          <text x="0" y="3" textAnchor="middle" fontSize="13" fontWeight="600" style={{ fill: '#ffc48a' }}>Most failed negotiations break down here</text>
        </g>
      </g>
    </svg>
  )
}

export function EIGrid() {
  const cells = [
    { x: 0, y: 0, n: 1, t: 'Self-awareness', s: 'Know what you feel\nand why', c: 'var(--orange)' },
    { x: 1, y: 0, n: 3, t: 'Social awareness', s: 'Read the room and\ngroup dynamics', c: 'var(--s-accommodating)' },
    { x: 0, y: 1, n: 2, t: 'Self-regulation', s: 'Manage your\nreactions', c: 'var(--orange)' },
    { x: 1, y: 1, n: 4, t: 'Empathy', s: "Tune into others'\nemotions", c: 'var(--s-accommodating)' },
  ]
  const L = 110, T = 46, W = 200, H = 130
  return (
    <svg viewBox="0 0 520 340" role="img" aria-label="Four emotional intelligence skills: self-awareness and self-regulation about you; social awareness and empathy about them">
      <text x={L + W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700">YOU</text>
      <text x={L + W * 1.5 + 8} y="28" textAnchor="middle" fontSize="16" fontWeight="700">THEM</text>
      <text x="96" y={T + H / 2 + 5} textAnchor="end" fontSize="16" fontWeight="600" style={F('var(--muted)')}>Notice</text>
      <text x="96" y={T + H * 1.5 + 13} textAnchor="end" fontSize="16" fontWeight="600" style={F('var(--muted)')}>Respond</text>
      {cells.map((c) => {
        const x = L + c.x * (W + 8), y = T + c.y * (H + 8)
        return (
          <g key={c.t}>
            <rect x={x} y={y} width={W} height={H} rx="14" style={{ fill: c.c, fillOpacity: 0.14, stroke: c.c, strokeWidth: 1.5 }} />
            <circle cx={x + 26} cy={y + 28} r="14" style={F(c.c)} />
            <text x={x + 26} y={y + 33} textAnchor="middle" fontSize="14" fontWeight="700" style={F('#fff')}>{c.n}</text>
            <text x={x + 16} y={y + 74} fontSize="20" fontWeight="700">{c.t}</text>
            <text x={x + 16} y={y + 98} fontSize="15" style={F('var(--ink-2)')}>{c.s.split('\n').map((l, k) => <tspan key={k} x={x + 16} dy={k ? 19 : 0}>{l}</tspan>)}</text>
          </g>
        )
      })}
    </svg>
  )
}

// Self-regulation: the pause between a trigger and a chosen response.
export function Regulate() {
  const pts = []
  for (let x = 0; x <= 900; x += 2) {
    let y = 60
    if (x < 300) {
      const p = x % 60
      y = 60 + (p > 22 && p < 28 ? -46 * Math.sin(((p - 22) / 6) * Math.PI) : p > 28 && p < 33 ? 30 * Math.sin(((p - 28) / 5) * Math.PI) : 4 * Math.sin(p / 3))
    } else if (x < 600) {
      const k = 1 - (x - 300) / 300
      y = 60 - (14 + 22 * k) * Math.sin(((x - 300) / 300) * Math.PI * (3 + 2 * k))
    } else {
      y = 60 - 10 * Math.sin(((x - 600) / 300) * Math.PI * 2)
    }
    pts.push(`${x},${y.toFixed(1)}`)
  }
  const stages = [
    { k: 'trigger', eyebrow: 'The trigger', title: 'Pressure rises', quote: '"That\'s a ridiculous price."', text: 'Your pulse quickens, your jaw tightens, and the urge to hit back is strong.', icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /> },
    { k: 'pause', eyebrow: 'The pause', title: 'Notice, breathe, name it', quote: '"I\'m feeling defensive. This is pressure, not danger."', text: 'One slow breath. You observe the reaction instead of acting on it.', icon: <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></> },
    { k: 'response', eyebrow: 'Your response', title: 'Calm and deliberate', quote: '"That\'s a strong reaction. Help me understand what feels off."', text: 'Composed, curious and still firm. You stay in control of the conversation.', icon: <path d="m5 12 4.5 4.5L19 7" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /> },
  ]
  return (
    <div className="reg" role="img" aria-label="Self-regulation: a trigger raises your pulse, a deliberate pause lets you notice, breathe and name the feeling, and you respond calmly by choice.">
      <svg className="reg-pulse" viewBox="0 0 900 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="reg-g" x1="0" x2="1">
            <stop offset="0" style={{ stopColor: 'var(--b-aggressive)' }} />
            <stop offset=".5" style={{ stopColor: 'var(--orange)' }} />
            <stop offset="1" style={{ stopColor: 'var(--b-assertive)' }} />
          </linearGradient>
        </defs>
        <rect x="0" width="300" height="120" style={{ fill: 'var(--b-aggressive)', fillOpacity: 0.08 }} />
        <rect x="300" width="300" height="120" style={{ fill: 'var(--orange)', fillOpacity: 0.1 }} />
        <rect x="600" width="300" height="120" style={{ fill: 'var(--b-assertive)', fillOpacity: 0.08 }} />
        <polyline points={pts.join(' ')} vectorEffect="non-scaling-stroke" style={{ fill: 'none', stroke: 'url(#reg-g)', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' }} />
      </svg>
      <div className="reg-cols">
        {stages.map((s, i) => (
          <div key={s.k} className={'reg-stage ' + s.k}>
            <span className="reg-ico"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">{s.icon}</svg></span>
            <span className="eyebrow">{i + 1} · {s.eyebrow}</span>
            <h4>{s.title}</h4>
            <p className="reg-quote">{s.quote}</p>
            <p className="small muted">{s.text}</p>
          </div>
        ))}
      </div>
      <p className="reg-foot">Self-regulation lives in the pause: the space between what happens and what you do.</p>
    </div>
  )
}

// Module 3: how convincing each "yes" sounds vs. how much it commits the speaker to.
export function YesGap() {
  const rows = [
    { k: 'counterfeit', name: 'Counterfeit Yes', c: 'var(--b-aggressive)', sounds: 85, sw: 'Very convincing', commits: 5, cw: 'Almost nothing', gap: true },
    { k: 'confirmation', name: 'Confirmation Yes', c: 'var(--s-accommodating)', sounds: 45, sw: 'Neutral', commits: 10, cw: 'Nothing: a fact, not a decision' },
    { k: 'commitment', name: 'Commitment Yes', c: 'var(--b-assertive)', sounds: 90, sw: 'Very convincing', commits: 95, cw: 'Action, owner and timing' },
  ]
  return (
    <div className="yesgap" role="img" aria-label="Counterfeit yes sounds very convincing but commits to almost nothing. Confirmation yes sounds neutral and commits to nothing. Commitment yes sounds very convincing and commits to action, an owner and timing.">
      {rows.map((r) => (
        <div key={r.k} className="yesgap-row" style={{ '--c': r.c }} aria-hidden="true">
          <div className="yesgap-name">
            <strong>{r.name}</strong>
            {r.gap && <span className="yesgap-warn">Sounds like yes, means no</span>}
          </div>
          <div className="yesgap-bars">
            <div className="yg-line">
              <span className="yg-k">How it sounds</span>
              <div className="bar sounds"><span style={{ width: r.sounds + '%' }} /></div>
              <span className="yg-v">{r.sw}</span>
            </div>
            <div className="yg-line">
              <span className="yg-k">What it commits to</span>
              <div className="bar commits"><span style={{ width: Math.max(r.commits, 2) + '%' }} /></div>
              <span className="yg-v">{r.cw}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Module 3: the three outcomes of inviting a "no".
export function NoOutcomes() {
  const out = [
    { k: 'clar', eyebrow: 'Outcome 1', title: 'Clarification', text: 'You uncover a hidden objection or concern.', you: '"Does the plan not feel fine to you?"', them: '"No, the plan\'s fine. It\'s just the timeline that worries me."', c: 'var(--s-accommodating)' },
    { k: 'corr', eyebrow: 'Outcome 2', title: 'Correction', text: 'They shift your thinking.', you: '"Would you say this idea is completely unreasonable?"', them: '"No, I wouldn\'t call it unreasonable, but we\'d need to change a few things."', c: 'var(--orange)' },
    { k: 'comm', eyebrow: 'Outcome 3', title: 'Commitment', text: 'Once people are free to say no, they often move toward yes on their own.', you: '"Do you think it is a bad idea to move forward?"', them: '"No, it\'s not a bad idea at all. Let\'s do it."', c: 'var(--b-assertive)' },
  ]
  return (
    <div className="noout">
      <div className="noout-root">
        <span className="eyebrow">You invite a "no"</span>
        <strong>The other side feels safe, and in control</strong>
      </div>
      <div className="noout-stem" aria-hidden="true" />
      <div className="noout-cols">
        {out.map((o) => (
          <div key={o.k} className="noout-card" style={{ '--c': o.c }}>
            <span className="eyebrow">{o.eyebrow}</span>
            <h4>{o.title}</h4>
            <p className="small muted">{o.text}</p>
            <p className="noout-line you">{o.you}</p>
            <p className="noout-line them">{o.them}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Module 3: where the six strategic pauses fall in a conversation, in three phases.
export function PauseMap() {
  const phases = [
    { n: 1, title: 'You make a point', steps: [
      { pause: 1, name: 'Before you speak', goal: 'Gather your thoughts, show control' },
      { say: 'You speak' },
      { pause: 2, name: 'After you speak', goal: 'Let your message land' },
    ] },
    { n: 2, title: 'You ask a question', steps: [
      { say: 'You ask' },
      { pause: 3, name: 'After asking', goal: 'Invite a deeper answer' },
    ] },
    { n: 3, title: 'They respond', steps: [
      { say: 'They speak' },
      { pause: 4, name: 'To encourage elaboration', goal: 'Prompt them to go deeper' },
      { pause: 5, name: 'While listening', goal: 'Show you are fully present' },
    ] },
  ]
  return (
    <div className="pmap" role="img" aria-label="Six strategic pauses across three conditions and one special condition. When you make a point: pause 1 before you speak and pause 2 after you speak. When you ask a question: pause 3 after asking. When they respond: pause 4 to encourage elaboration and pause 5 while listening. Pause 6, to shift tone or energy, is the special condition: use it at any point when tension rises.">
      <div className="pmap-phases" aria-hidden="true">
        {phases.map((ph) => (
          <section key={ph.n} className="pmap-phase">
            <header><span className="eyebrow">Condition {ph.n}</span><h4>{ph.title}</h4></header>
            <ol className="pmap-steps">
              {ph.steps.map((st, i) => st.pause ? (
                <li key={i} className="pmap-step pause">
                  <span className="pmap-n">{st.pause}</span>
                  <span className="pmap-txt"><strong>{st.name}</strong><span>{st.goal}</span></span>
                </li>
              ) : (
                <li key={i} className="pmap-step say">
                  <span className="pmap-dot" />
                  <span className="pmap-txt"><span>{st.say}</span></span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <div className="pmap-any" aria-hidden="true">
        <span className="pmap-n">6</span>
        <span className="pmap-txt"><span className="eyebrow">Special condition</span><strong>To shift tone or energy</strong><span>At any point, whenever tension rises: "Let's slow down for a second."</span></span>
      </div>
    </div>
  )
}

// Module 4: positional vs principled bargaining, as a toggle.
export function DealZone() {
  const [mode, setMode] = useState('positional')
  const pos = mode === 'positional'
  return (
    <div className="dealzone">
      <div className="tabs" role="tablist" aria-label="Bargaining approach">
        <button role="tab" className="tab" aria-selected={pos} onClick={() => setMode('positional')}>Positional</button>
        <button role="tab" className="tab" aria-selected={!pos} onClick={() => setMode('principled')}>Principled</button>
      </div>
      {pos ? (
        <div className="dz-pos">
          <div className="dz-side me">
            <span className="eyebrow">Me</span>
            <strong>"I want a 15% raise."</strong>
            <span className="small muted">My position</span>
          </div>
          <div className="dz-gap" aria-hidden="true">
            <span className="dz-arrow l" /><span className="dz-gap-label">Contest of will</span><span className="dz-arrow r" />
          </div>
          <div className="dz-side you">
            <span className="eyebrow">You</span>
            <strong>"We can offer 3%."</strong>
            <span className="small muted">Your position</span>
          </div>
          <div className="dz-results">
            <span><b>Stalemate:</b> no agreement</span>
            <span><b>Split the difference:</b> 9%, and both feel short-changed</span>
            <span><b>Damaged relationship:</b> someone "lost"</span>
          </div>
        </div>
      ) : (
        <div className="dz-pri">
          <div className="dz-venn">
            <div className="dz-circle me">
              <span className="eyebrow">My interests</span>
              <ul><li>Pay that keeps up with my role</li><li>Room to grow</li></ul>
            </div>
            <div className="dz-overlap">
              <span className="eyebrow">I-Deal zone</span>
              <ul><li>Keep a strong performer</li><li>Recognise the bigger role</li><li>A clear path forward</li></ul>
            </div>
            <div className="dz-circle you">
              <span className="eyebrow">Your interests</span>
              <ul><li>Stay within this year's budget</li><li>Fairness across the team</li></ul>
            </div>
          </div>
          <div className="dz-results ok">
            <span><b>Options appear:</b> 6% now and a review in six months; a new title; a training budget; a bonus tied to results</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Module 4: the Circle Chart from Getting to Yes, for broadening options.
export function CircleChart() {
  const q = [
    { k: 'ii', n: 'Step II', title: 'Analysis', sub: 'What\'s wrong · in theory', text: 'Diagnose the problem: sort symptoms into categories, suggest causes, note what is lacking and what stands in the way.', ex: '"Their budget is fixed by quarter, and our pricing ignores timing."' },
    { k: 'i', n: 'Step I', title: 'Problem', sub: 'What\'s wrong · in the real world', text: 'What are the current symptoms? The facts you dislike, compared with a preferred situation.', ex: '"The client wants 20% off; we can\'t go below our margin."' },
    { k: 'iii', n: 'Step III', title: 'Approaches', sub: 'What might be done · in theory', text: 'Possible strategies or cures. Generate broad ideas about what might be done.', ex: '"Shift the timing of payments. Change the scope. Link price to volume."' },
    { k: 'iv', n: 'Step IV', title: 'Action ideas', sub: 'What might be done · in the real world', text: 'Specific, concrete steps that could be taken to deal with the problem.', ex: '"Defer 40% of the invoice to next quarter. A smaller first order. A year-end rebate."' },
  ]
  return (
    <div className="circlechart">
      <div className="cc-head" aria-hidden="true"><span>In theory</span><span>In the real world</span></div>
      <div className="cc-body">
        <div className="cc-rowlabel top" aria-hidden="true">What's wrong</div>
        <div className="cc-rowlabel bottom" aria-hidden="true">What might be done</div>
        <div className="cc-grid">
          {q.map((x) => (
            <div key={x.k} className={'cc-q ' + x.k}>
              <span className="eyebrow">{x.n}</span>
              <h4>{x.title}</h4>
              <span className="cc-sub">{x.sub}</span>
              <p className="small muted">{x.text}</p>
              <p className="cc-ex">{x.ex}</p>
            </div>
          ))}
          <div className="cc-hub" aria-hidden="true">↺</div>
        </div>
      </div>
      <p className="small muted cc-flow">Work around the circle: I → II → III → IV. Each good action idea can send you back to Step III for more approaches.</p>
    </div>
  )
}

// Module 4, Stage 4 step 2: from a contest of will to a joint search for standards.
export function SearchTogether() {
  const std = ['Market rates', 'Industry standards', 'Legal precedents', 'Expert opinion', 'Historical data']
  return (
    <div className="srch">
      <div className="srch-panel bad">
        <span className="eyebrow">Contest of will</span>
        <div className="srch-face">
          <span className="srch-p me">Me<small>"A full refund, or I'll post a bad review."</small></span>
          <span className="srch-vs" aria-hidden="true">⟷</span>
          <span className="srch-p you">You<small>"Nothing. It's out of warranty."</small></span>
        </div>
        <p className="srch-q">The question: <b>who will give in?</b></p>
      </div>
      <div className="srch-arrow" aria-hidden="true">→</div>
      <div className="srch-panel good">
        <span className="eyebrow">Collaborative search</span>
        <div className="srch-std">{std.map((s) => <span key={s}>{s}</span>)}</div>
        <div className="srch-up" aria-hidden="true">↑ ↑</div>
        <div className="srch-side">
          <span className="srch-p me">Me</span><span className="srch-p you">You</span>
        </div>
        <p className="srch-q">The question: <b>what's fair?</b></p>
      </div>
    </div>
  )
}

// Module 4, Stage 4 step 3: reasoning openly is a loop, not a speech.
export function ReasonLoop() {
  const steps = [
    { t: 'Propose a standard', s: 'Bring evidence or a rationale for it.' },
    { t: 'Ask for their view', s: '"How do you see this standard applying here?"' },
    { t: 'Listen', s: 'Take their arguments and concerns seriously.' },
    { t: 'Adapt if it\'s better', s: '"What other criteria might work better?"' },
  ]
  return (
    <div className="rloop">
      <ol className="rloop-steps">
        {steps.map((x, i) => (
          <li key={x.t}><span className="rloop-n">{i + 1}</span><strong>{x.t}</strong><span>{x.s}</span></li>
        ))}
      </ol>
      <div className="rloop-back" aria-hidden="true"><span>↺ Repeat until you agree on a standard both sides accept</span></div>
    </div>
  )
}

// Module 4, Stage 4 step 4: closed to pressure, open to reasons.
export function PressureGate() {
  const rows = [
    { k: 'no', label: 'Pressure', items: ['Threats', '"Take it or leave it"', 'Emotional appeals', 'Arbitrary deadlines'], gate: '✕', out: 'Doesn\'t pass. Redirect calmly:', say: '"Let\'s stick to the agreed criteria."' },
    { k: 'yes', label: 'Principle', items: ['New evidence', 'A better standard', 'A fair procedure'], gate: '✓', out: 'Passes. Consider it openly:', say: '"That\'s a fair point. Let\'s use that standard."' },
  ]
  return (
    <div className="pgate">
      {rows.map((r) => (
        <div key={r.k} className={'pgate-row ' + r.k}>
          <div className="pgate-in"><span className="eyebrow">{r.label}</span><div>{r.items.map((i) => <span key={i}>{i}</span>)}</div></div>
          <div className="pgate-wall" aria-hidden="true"><span>{r.gate}</span></div>
          <div className="pgate-out"><span className="small muted">{r.out}</span><b>{r.say}</b></div>
        </div>
      ))}
      <p className="pgate-key small muted"><b>Your principles</b> (fairness, equality, legality) are the gate. Define them before the negotiation starts.</p>
    </div>
  )
}

// Module 5: preparation vs negotiation time.
export function PrepRatio() {
  return (
    <div className="prep">
      <div className="prep-row">
        <span className="prep-label">Negotiating</span>
        <div className="prep-track"><span className="prep-bar neg" style={{ width: '18%' }}><b>1 hour</b></span></div>
      </div>
      <div className="prep-row">
        <span className="prep-label">Preparing</span>
        <div className="prep-track">
          <span className="prep-bar prep" style={{ width: '54%' }}><b>3 hours</b></span>
          <span className="prep-bar more" style={{ width: '36%' }}><b>up to 5</b></span>
        </div>
      </div>
      <div className="prep-split">
        <div><span className="eyebrow">Tangible</span><p>Pricing, market data, costs, timelines, terms</p></div>
        <div><span className="eyebrow">Intangible</span><p>Values, motivations, negotiation style, relationships</p></div>
      </div>
    </div>
  )
}

// Module 5: ideal outcome, acceptable range, walk-away point and BATNA on one line.
export function GoalRange() {
  return (
    <div className="grange">
      <div className="grange-bar" aria-hidden="true">
        <span className="z batna">Below: take your BATNA</span>
        <span className="z range">Acceptable range: negotiate here</span>
        <span className="z stretch">Ideal</span>
      </div>
      <div className="grange-marks">
        <div className="m walk" style={{ left: '30%' }}><b>Walk-away point</b><span>€68,000</span><small>Lowest acceptable deal</small></div>
        <div className="m ideal" style={{ left: '84%' }}><b>Ideal outcome</b><span>€75,000</span><small>Best realistic result</small></div>
      </div>
      <ul className="grange-legend">
        <li><b>1 · Ideal and minimum outcomes:</b> set the range you will negotiate within.</li>
        <li><b>2 · Walk-away point and trade-offs:</b> the limit you won't cross, and what you can afford to give.</li>
        <li><b>3 · Priorities:</b> stay firm on the essentials (here, two home-working days) and flexible on the rest.</li>
      </ul>
    </div>
  )
}

// Module 5: the four BATNA steps, yours and theirs.
export function BatnaSteps() {
  const mine = [['1', 'Identify your fallback plan', 'Know exactly what you\'ll do if there is no deal.'], ['2', 'Strengthen your BATNA', 'Improve your alternatives before you start.'], ['3', 'Leverage your BATNA', 'Use it to gain better outcomes, without confrontation.']]
  return (
    <div className="bsteps">
      <div className="bsteps-side mine">
        <span className="eyebrow">Your side</span>
        <ol>{mine.map(([n, t, s]) => <li key={n}><span className="bsteps-n">{n}</span><div><strong>{t}</strong><span>{s}</span></div></li>)}</ol>
      </div>
      <div className="bsteps-side theirs">
        <span className="eyebrow">Their side</span>
        <ol><li><span className="bsteps-n">4</span><div><strong>Evaluate the other party's BATNA</strong><span>Know what they will do if they don't agree with you.</span></div></li></ol>
        <p className="small muted">Your power depends on both: how good your alternative is, and how good theirs is.</p>
      </div>
    </div>
  )
}

// Module 5: ranking your alternatives to find the BATNA (Raad's supplier example).
export function FallbackLadder() {
  const alts = [
    { t: 'Supplier B: $16/unit, can deliver next week (quote confirmed)', v: 82, tag: 'Your BATNA' },
    { t: 'Supplier C: $17/unit, 3-week lead time', v: 60 },
    { t: 'Delay the product launch by one quarter', v: 35 },
    { t: 'Make the part in-house: new equipment needed', v: 20 },
  ]
  return (
    <div className="ladder">
      <p className="ladder-goal"><span className="eyebrow">My objective</span> A supplier under <b>$15/unit</b> by next week.</p>
      <ol>
        {alts.map((a, i) => (
          <li key={a.t} className={i === 0 ? 'top' : ''}>
            <span className="ladder-rank">{i + 1}</span>
            <div className="ladder-body"><span>{a.t}</span><div className="ladder-track"><i style={{ width: a.v + '%' }} /></div></div>
            {a.tag && <span className="ladder-tag">{a.tag}</span>}
          </li>
        ))}
      </ol>
      <p className="ladder-sum">"If I can't secure a supplier under $15/unit by next week, I'll use Supplier B's $16/unit offer instead." <span className="small muted">Walk-away point: anything worse than $16/unit with next-week delivery.</span></p>
    </div>
  )
}

// Module 5: how to read the other side's BATNA.
export function TheirBatna() {
  const cols = [
    { t: 'Research', items: ['Recent deals and partnerships', 'Public statements', 'Pressures and deadlines they face'] },
    { t: 'Ask', items: ['"How critical is this timeline for your team?"', '"Are you considering other vendors or partners?"'] },
    { t: 'Listen', items: ['Hesitation, urgency or overconfidence', 'Body language and tone'] },
  ]
  return (
    <div className="theirs">
      <div className="theirs-cols">
        {cols.map((c, i) => (
          <div key={c.t} className="theirs-col"><span className="theirs-n">{i + 1}</span><strong>{c.t}</strong><ul>{c.items.map((x) => <li key={x}>{x}</li>)}</ul></div>
        ))}
      </div>
      <div className="theirs-funnel" aria-hidden="true">↓</div>
      <div className="theirs-est"><strong>4 · Estimate and rank their alternatives</strong><span>What can they realistically do if you walk away? &nbsp;·&nbsp; <b>5 · Monitor shifts</b> and update as you go.</span></div>
      <div className="theirs-funnel" aria-hidden="true">↓</div>
      <div className="theirs-use">
        <div className="weak"><span className="eyebrow">Their BATNA is weak</span><p>Emphasise the unique value you provide.</p></div>
        <div className="strong"><span className="eyebrow">Their BATNA is strong</span><p>Focus on partnership, differentiation and value beyond price.</p></div>
      </div>
    </div>
  )
}

// Module 5: the three types of leverage.
export function LeverageTypes() {
  const t = [
    { k: 'pos', n: 'Positive', what: 'What they want', core: '"If you do this, I can give you something you want."', c: 'var(--b-assertive)' },
    { k: 'neg', n: 'Negative', what: 'What they fear losing', core: '"If you don\'t do this, something you care about may be lost."', c: 'var(--b-aggressive)' },
    { k: 'nor', n: 'Normative', what: 'What they believe in or value', core: '"Based on your own words and values, you should do this."', c: '#6b5bd2' },
  ]
  return (
    <div className="levt">
      {t.map((x) => (
        <div key={x.k} className="levt-card" style={{ '--c': x.c }}>
          <span className="levt-dot" aria-hidden="true" />
          <span className="eyebrow">{x.n} leverage</span>
          <strong>{x.what}</strong>
          <p>{x.core}</p>
        </div>
      ))}
      <p className="levt-note small muted">Blend them, keep a collaborative tone, and remember: leverage shifts as new information comes to light.</p>
    </div>
  )
}

// Module 5: the five-step execution framework.
export function ExecPath() {
  const s = [['Plan the path', 'Scope, sequence, roles'], ['Set the stage', 'Agenda, tone, decision-makers'], ['Explore interests', 'Open questions, listen, summarise'], ['Shape and trade', '"If we do X, could you do Y?"'], ['Close and confirm', 'Summarise, next steps, respect']]
  return (
    <ol className="xpath">
      {s.map(([t, d], i) => <li key={t}><span className="xpath-n">{i + 1}</span><strong>{t}</strong><span>{d}</span></li>)}
    </ol>
  )
}
