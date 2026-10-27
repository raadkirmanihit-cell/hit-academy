// Module 7 diagrams: decoding and countering objection tactics.

const DECODE = [
  ['Definition', 'What is the tactic?', '#3d6fd8'],
  ['Why it works', 'Which instinct does it use?', '#6b5bd2'],
  ['Warning signs', 'What will you see or hear?', 'var(--orange)'],
  ['Counter', 'What do you say and do?', 'var(--b-assertive)'],
  ['Use ethically', 'When is it fair to use?', '#b0457a'],
]
export function TacticDecoder() {
  return (
    <ol className="decoder" aria-label="Five questions to decode any tactic">
      {DECODE.map(([t, d, c], i) => (
        <li key={t} style={{ '--c': c }}>
          <span className="decoder-n">{i + 1}</span>
          <strong>{t}</strong>
          <span>{d}</span>
        </li>
      ))}
    </ol>
  )
}

const FAMILIES = [
  ['Pressure', 'Lesson 2', '#c8452f', ['Ultimatums and threats', 'False deadlines', 'Emotional outbursts', 'Silence', 'The flinch']],
  ['Numbers and trades', 'Lesson 3', 'var(--orange)', ['Highball / lowball', 'Bracketing', 'The bogey', 'Nibbling', 'Cherry picking']],
  ['Distraction and confusion', 'Lesson 4', '#6b5bd2', ['Red herring', 'Strawman proposal', 'Playing dumb', 'Overwhelming with information', 'Deliberate delay']],
  ['Authority, teams and closing', 'Lesson 5', '#148a7a', ['Good cop / bad cop', 'Limited authority', 'Appealing to higher authority', 'Divide and conquer', 'Last-minute changes']],
]
export function TacticFamilies() {
  return (
    <div className="families">
      {FAMILIES.map(([t, l, c, items]) => (
        <section key={t} style={{ '--c': c }}>
          <span className="families-l">{l}</span>
          <h4>{t}</h4>
          <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
      ))}
    </div>
  )
}

// Anchoring vs bracketing on one number line (thousands).
export function AnchorBracket() {
  const W = 440, x0 = 20, x1 = 420, lo = 80, hi = 115
  const x = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0)
  const ticks = [80, 85, 90, 95, 100, 105, 110, 115]
  return (
    <div className="abr">
      <svg viewBox={`0 0 ${W} 250`} role="img" aria-label="Number line: you anchor at 110. They state a range of 90 to 100. You bracket at 98, near the top of their range, instead of the midpoint of 95.">
        <text x={x0} y="22" className="abr-h">1 · Anchoring: where it starts</text>
        <line x1={x0} y1="62" x2={x1} y2="62" className="abr-ax" />
        <circle cx={x(110)} cy="62" r="8" className="abr-you" />
        <text x={x(110)} y="44" textAnchor="middle" className="abr-v you">Your anchor: 110</text>
        <text x={x0} y="88" className="abr-s">Everything is now measured against 110</text>

        <text x={x0} y="132" className="abr-h">2 · Bracketing: where it settles</text>
        <rect x={x(90)} y="160" width={x(100) - x(90)} height="24" rx="6" className="abr-range" />
        <text x={(x(90) + x(100)) / 2} y="152" textAnchor="middle" className="abr-v them">Their range: 90–100</text>
        <line x1={x0} y1="172" x2={x1} y2="172" className="abr-ax" />
        <line x1={x(95)} y1="156" x2={x(95)} y2="196" className="abr-mid" />
        <text x={x(95)} y="214" textAnchor="middle" className="abr-s">Midpoint: 95</text>
        <circle cx={x(98)} cy="172" r="8" className="abr-you" />
        <text x={x(98) + 14} y="214" className="abr-v you">Your bracket: 98</text>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1="232" x2={x(t)} y2="238" className="abr-ax" />
            <text x={x(t)} y="249" textAnchor="middle" className="abr-t">{t}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
