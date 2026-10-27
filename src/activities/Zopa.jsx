import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

// Module 5 ZOPA: your walk-away point and theirs on one salary scale. The overlap is the ZOPA.
const MIN = 60, MAX = 80
const pct = (v) => ((v - MIN) / (MAX - MIN)) * 100
const eur = (v) => '€' + Math.round(v * 1000).toLocaleString('en-US')

export function ZopaChart({ you = 68, them = 72 }) {
  const has = them >= you
  const lo = Math.min(you, them), hi = Math.max(you, them)
  return (
    <div className="zopa">
      <div className="zopa-plot">
        <div className={'zopa-band' + (has ? '' : ' gap')} style={{ left: `calc(var(--off) + (100% - var(--off)) * ${pct(lo) / 100})`, width: `calc((100% - var(--off)) * ${Math.max(0.6, pct(hi) - pct(lo)) / 100})` }}>
          <span>{has ? 'ZOPA' : 'No ZOPA'}</span>
        </div>
        <div className="zopa-row">
          <span className="zopa-who">You <small>accept {eur(you)} or more</small></span>
          <div className="zopa-track"><i className="you" style={{ left: pct(you) + '%', right: 0 }} /><b style={{ left: pct(you) + '%' }} /></div>
        </div>
        <div className="zopa-row">
          <span className="zopa-who">Lena <small>can pay up to {eur(them)}</small></span>
          <div className="zopa-track"><i className="them" style={{ left: 0, right: (100 - pct(them)) + '%' }} /><b style={{ left: pct(them) + '%' }} /></div>
        </div>
        <div className="zopa-axis" aria-hidden="true">
          {[60, 65, 70, 75, 80].map((v) => <span key={v} style={{ left: pct(v) + '%' }}>€{v}k</span>)}
        </div>
      </div>
      <p className={'zopa-out' + (has ? '' : ' none')}>
        {has
          ? <><strong>ZOPA: {eur(you)} to {eur(them)}.</strong> Any salary in this zone is better for both of you than walking away.</>
          : <><strong>No ZOPA: a gap of {eur(you - them)}.</strong> No salary works for both sides. Change the deal (add value, trade other terms) or use your BATNA.</>}
      </p>
    </div>
  )
}

const ID = 'a-zopa'
export function ZopaLab({ module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[ID]
  const [you, setYou] = useState(saved?.you ?? 68)
  const [them, setThem] = useState(saved?.them ?? 72)
  const [seen, setSeen] = useState(saved?.seen || { zopa: true, none: false })
  const update = (y, t) => {
    setYou(y); setThem(t)
    const s = { ...seen, [t >= y ? 'zopa' : 'none']: true }
    setSeen(s)
    saveActivity(module.id, ID, { you: y, them: t, seen: s, done: s.zopa && s.none })
  }
  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Interactive exercise</span>
        <h3>Find the ZOPA</h3>
        <p className="muted">Back to the salary talk with Lena. Move the two limits. When does a deal become possible, and when does it disappear? Try making the zone vanish.</p>
      </div>
      <ZopaChart you={you} them={them} />
      <div className="zopa-controls">
        <label htmlFor="zopa-you"><span>Your walk-away point</span><strong>{eur(you)}</strong></label>
        <input id="zopa-you" type="range" min={MIN} max={MAX} step="0.5" value={you} onChange={(e) => update(+e.target.value, them)} />
        <label htmlFor="zopa-them"><span>The most Lena can pay</span><strong>{eur(them)}</strong></label>
        <input id="zopa-them" type="range" min={MIN} max={MAX} step="0.5" value={them} onChange={(e) => update(you, +e.target.value)} />
      </div>
      <p className="small muted">{seen.zopa && seen.none
        ? 'Notice: a stronger BATNA raises your walk-away point and shrinks the zone in your favour, but push it too far and the zone disappears.'
        : 'Your walk-away point comes from your BATNA. Lena\'s limit comes from hers: the salary band and the other candidates she could hire.'}</p>
    </section>
  )
}
