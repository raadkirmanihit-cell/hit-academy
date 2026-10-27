import { useState } from 'react'

export const STRATS = [
  { key: 'competing', label: 'Competing', x: 0.14, y: 0.86, note: 'High assertiveness, low cooperation. "Winner-take-all." Use when quick decisions are needed, you hold leverage, and the outcome outweighs the relationship.' },
  { key: 'collaborating', label: 'Collaborating', x: 0.86, y: 0.86, note: 'High assertiveness, high cooperation. "Win-win." Use when both sides have important stakes, the relationship matters, and there is time to problem-solve.' },
  { key: 'compromising', label: 'Compromising', x: 0.5, y: 0.5, note: 'Moderate on both. "Meet in the middle." Use when time is short, power is equal, and the issues are not critical.' },
  { key: 'avoiding', label: 'Avoiding', x: 0.14, y: 0.14, note: 'Low on both. "No deal for now." Use when the issue is trivial, talks are futile, or emotions need to cool down.' },
  { key: 'accommodating', label: 'Accommodating', x: 0.86, y: 0.14, note: 'Low assertiveness, high cooperation. "Lose-win." Use when the relationship matters more, the issue is minor to you, or goodwill is needed.' },
]

const S = (v) => ({ fill: v })

export function StrategyGrid({ highlight, marker, compact, interactive }) {
  const [sel, setSel] = useState(interactive ? 'collaborating' : null)
  const active = highlight || sel
  const L = 74, R = 500, T = 18, B = 330
  const px = (x) => L + x * (R - L), py = (y) => B - y * (B - T)
  const current = STRATS.find((s) => s.key === active)
  return (
    <div>
      <svg viewBox="0 0 520 392" role="img" aria-label="Five negotiation strategies on assertiveness and cooperation axes">
        <rect x={L} y={T} width={R - L} height={B - T} rx="14" style={S('var(--surface-2)')} />
        <line x1={(L + R) / 2} y1={T + 8} x2={(L + R) / 2} y2={B - 8} style={{ stroke: 'var(--line)' }} strokeDasharray="4 6" />
        <line x1={L + 8} y1={(T + B) / 2} x2={R - 8} y2={(T + B) / 2} style={{ stroke: 'var(--line)' }} strokeDasharray="4 6" />
        <path d={`M${L} ${B + 14} H${R}`} style={{ stroke: 'var(--muted)', fill: 'none' }} strokeWidth="1.5" markerEnd="url(#ah)" />
        <path d={`M${L - 16} ${B} V${T}`} style={{ stroke: 'var(--muted)', fill: 'none' }} strokeWidth="1.5" markerEnd="url(#ah)" />
        <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" style={S('var(--muted)')} /></marker></defs>
        <text x={(L + R) / 2} y={B + 40} textAnchor="middle" fontSize="16" fontWeight="600">Cooperation · concern for the relationship →</text>
        <text x={L + 4} y={B + 40} fontSize="11" style={S('var(--muted)')}>Low</text>
        <text x={R} y={B + 40} fontSize="11" textAnchor="end" style={S('var(--muted)')}>High</text>
        <text transform={`translate(${L - 30} ${(T + B) / 2}) rotate(-90)`} textAnchor="middle" fontSize="16" fontWeight="600">Assertiveness · concern for the outcome →</text>
        {marker && (
          <g>
            <circle cx={px((marker.x - 1) / 4 * 0.84 + 0.08)} cy={py((marker.y - 1) / 4 * 0.84 + 0.08)} r="9" style={{ fill: 'var(--orange)', stroke: 'var(--surface)' }} strokeWidth="3" />
            <text x={px((marker.x - 1) / 4 * 0.84 + 0.08)} y={py((marker.y - 1) / 4 * 0.84 + 0.08) - 14} textAnchor="middle" fontSize="14" fontWeight="700">You</text>
          </g>
        )}
        {STRATS.map((s) => {
          const on = active === s.key
          const cx = px(s.x), cy = py(s.y)
          return (
            <g key={s.key} style={{ cursor: interactive ? 'pointer' : 'default', opacity: active && !on ? 0.55 : 1 }}
              onClick={() => interactive && setSel(s.key)} tabIndex={interactive ? 0 : undefined}
              onKeyDown={(e) => { if (interactive && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setSel(s.key) } }}
              role={interactive ? 'button' : undefined} aria-pressed={interactive ? on : undefined} aria-label={s.label}>
              <circle cx={cx} cy={cy} r={on ? 30 : 24} style={{ fill: `var(--s-${s.key})`, transition: 'r .2s' }} opacity={on ? 1 : 0.85} />
              <text x={cx} y={cy + (s.y > 0.6 ? 48 : s.y < 0.4 ? -40 : 48)} textAnchor="middle" fontSize={compact ? 19 : 17} fontWeight="700">{s.label}</text>
            </g>
          )
        })}
      </svg>
      {interactive && current && (
        <div className="feedback neutral" style={{ marginTop: '.75rem' }} aria-live="polite">
          <b style={{ color: `var(--s-${current.key})` }}>{current.label}</b>
          <span>{current.note}</span>
        </div>
      )}
    </div>
  )
}
