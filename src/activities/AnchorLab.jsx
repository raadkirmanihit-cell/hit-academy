import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

// Module 6: experience anchoring first-hand with the Mississippi question from the module.
const ID = 'a-anchor-lab'
const TRUE_LEN = 2340 // miles, source to Gulf of Mexico (USGS)

export default function AnchorLab({ module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[ID]
  const [anchor] = useState(() => saved?.anchor || (Math.random() < 0.5 ? 500 : 5000))
  const [side, setSide] = useState(saved?.side || null)
  const [guess, setGuess] = useState(saved?.guess ? String(saved.guess) : '')
  const [done, setDone] = useState(!!saved?.done)
  const other = anchor === 500 ? 5000 : 500
  const n = Number(guess.replace(/[^0-9]/g, ''))
  const reveal = () => {
    if (!n) return
    setDone(true)
    saveActivity(module.id, ID, { anchor, side, guess: n, done: true })
  }
  const reset = () => { setSide(null); setGuess(''); setDone(false); saveActivity(module.id, ID, { anchor, done: true }) }
  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Try it yourself</span>
        <h3>Feel the anchor</h3>
        <p className="muted">Answer quickly, without looking anything up.</p>
      </div>
      <div className="alab">
        <p className="alab-q"><span className="alab-n">1</span>Is the Mississippi River longer or shorter than <strong>{anchor.toLocaleString('en-US')} miles</strong>?</p>
        <div className="alab-btns">
          {['Longer', 'Shorter'].map((s) => <button key={s} className={'btn' + (side === s ? ' btn-dark' : '')} disabled={done} onClick={() => setSide(s)}>{s}</button>)}
        </div>
        {side && (
          <>
            <p className="alab-q"><span className="alab-n">2</span>What is your best estimate of its length?</p>
            <div className="alab-input">
              <input inputMode="numeric" aria-label="Your estimate in miles" value={guess} disabled={done} onChange={(e) => setGuess(e.target.value)} placeholder="e.g. 1,800" />
              <span>miles</span>
              {!done && <button className="btn btn-primary" disabled={!n} onClick={reveal}>Reveal</button>}
            </div>
          </>
        )}
        {done && n > 0 && (
          <div className="alab-out">
            <div className="alab-scale" aria-hidden="true">
              {[['Your anchor', anchor, 'a'], ['Your estimate', n, 'y'], ['Actual', TRUE_LEN, 't']].map(([l, v, c]) => (
                <span key={c} className={'alab-pin ' + c} style={{ left: Math.min(100, (v / 6000) * 100) + '%' }}><b>{l}</b>{v.toLocaleString('en-US')}</span>
              ))}
            </div>
            <p><strong>The Mississippi is about 2,340 miles long.</strong> You were asked about {anchor.toLocaleString('en-US')} miles. Other learners see {other.toLocaleString('en-US')} miles instead, and their estimates tend to be much {anchor === 500 ? 'higher' : 'lower'}.</p>
            <p className="small muted">The anchor was arbitrary, and you knew it was only a question. It still pulls estimates toward it. That is why the first number in a negotiation matters so much. Try the question on a colleague with the other number, and compare.</p>
            <button className="btn" onClick={reset}>Try again</button>
          </div>
        )}
      </div>
    </section>
  )
}
