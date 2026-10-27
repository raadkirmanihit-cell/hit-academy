import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

// Module 4 "Invent, then judge": brainstorm options without judging, then mark which meet
// each side's interests, to reveal the options with mutual gain.
const ID = 'a-option-board'
const SUGGESTED = [
  { id: 'p1', text: 'Give them the full 20% discount', mine: false, theirs: true, note: 'Meets their budget, but at the cost of your margin: a one-sided loss.' },
  { id: 'p2', text: 'Defer 40% of the invoice to next quarter, at full price', mine: true, theirs: true, note: 'Mutual gain: their budget this quarter is protected, and your price stays intact.' },
  { id: 'p3', text: 'Split the difference at 10%', mine: false, theirs: false, note: 'A classic positional compromise. It meets neither interest fully, and both sides leave a little dissatisfied.' },
  { id: 'p4', text: 'A smaller first order this quarter, the rest next quarter', mine: true, theirs: true, note: 'Mutual gain: it fits their quarterly budget, and you keep the full order at full price.' },
  { id: 'p5', text: 'A lower price in exchange for a two-year contract', mine: true, theirs: true, note: 'Mutual gain: they save, you secure future revenue. A trade-off on issues you value differently.' },
  { id: 'p6', text: 'Refuse any discount and hold firm', mine: true, theirs: false, note: 'Protects your margin today, but ignores their interest. Expect a stalemate.' },
  { id: 'p7', text: 'Remove the premium support package to lower the price', mine: true, theirs: true, note: 'Mutual gain, if they don\'t need premium support: a lower price for them, a lower cost to serve for you.' },
  { id: 'p8', text: 'A rebate at year end if they reach a volume target', mine: true, theirs: true, note: 'Mutual gain: they can earn a lower price, and you only give it when volume grows.' },
]
const MIN = 6

export default function OptionBoard({ module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[ID]
  const [ideas, setIdeas] = useState(saved?.ideas || [])
  const [phase, setPhase] = useState(saved?.phase || 'invent')
  const [draft, setDraft] = useState('')
  const [warn, setWarn] = useState(false)

  const save = (next) => {
    const st = { ideas, phase, ...next }
    saveActivity(module.id, ID, { ...st, done: st.phase === 'reveal' })
  }
  const setI = (n) => { setIdeas(n); save({ ideas: n }) }
  const go = (p) => { setPhase(p); save({ phase: p }); setWarn(false) }

  // Simple guard: in the invent phase, judging words get a gentle reminder.
  const judging = /\b(won'?t work|bad idea|impossible|no way|too expensive|never|stupid|silly)\b/i

  function add(e) {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    setWarn(judging.test(t))
    setI([...ideas, { id: 'u' + Date.now(), text: t, own: true }])
    setDraft('')
  }
  function suggest() {
    const next = SUGGESTED.find((s) => !ideas.some((i) => i.id === s.id))
    if (next) setI([...ideas, { id: next.id, text: next.text }])
  }
  const remove = (id) => setI(ideas.filter((i) => i.id !== id))
  const mark = (id, k) => setI(ideas.map((i) => (i.id === id ? { ...i, [k]: !i[k] } : i)))
  const restart = () => { setIdeas([]); setPhase('invent'); setWarn(false); saveActivity(module.id, ID, { ideas: [], phase: 'invent' }) }

  const left = SUGGESTED.filter((s) => !ideas.some((i) => i.id === s.id)).length
  const both = ideas.filter((i) => i.mine && i.theirs)
  const ref = (i) => SUGGESTED.find((s) => s.id === i.id)

  return (
    <section className="activity">
      <div className="activity-head">
        <span className="activity-kind">Interactive exercise</span>
        <h3>Invent, then judge</h3>
        <p className="muted">Generate options first, without judging any of them. Only then judge each one against both sides' interests, and see which offer mutual gains.</p>
      </div>

      <div className="ob-case">
        <span className="eyebrow">The stalemate</span>
        <p>You supply software to a client. They say: <strong>"We need a 20% discount, or we can't sign."</strong> You have learned the interest behind it: <em>their budget is limited this quarter.</em> Your interests: <em>protect your margin and secure future revenue.</em></p>
      </div>

      <ol className="ob-phases" aria-label="Steps">
        {[['invent', '1 · Invent'], ['judge', '2 · Judge'], ['reveal', '3 · Mutual gains']].map(([k, l]) => (
          <li key={k} className={phase === k ? 'on' : ''}>{l}</li>
        ))}
      </ol>

      {phase === 'invent' && (
        <div className="stack" style={{ gap: '.8rem' }}>
          <form className="ob-add" onSubmit={add}>
            <label className="sr-only" htmlFor="ob-input">Add an option</label>
            <input id="ob-input" className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type an option, any option…" maxLength={140} />
            <button className="btn btn-sm btn-dark" type="submit" disabled={!draft.trim()}>Add</button>
            <button className="btn btn-sm" type="button" onClick={suggest} disabled={!left}>Suggest one</button>
          </form>
          {warn && <p className="ob-warn small">That sounds like judging. Save it for step 2: right now every idea goes on the board.</p>}
          {ideas.length ? (
            <ul className="ob-list">
              {ideas.map((i) => (
                <li key={i.id} className="ob-chip">
                  <span>{i.text}</span>
                  <button className="ob-x" onClick={() => remove(i.id)} aria-label={`Remove "${i.text}"`}>×</button>
                </li>
              ))}
            </ul>
          ) : <p className="small muted">No options yet. Add your own, or tap "Suggest one" for ideas.</p>}
          <div className="row" style={{ gap: '.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" disabled={ideas.length < MIN} onClick={() => go('judge')}>Start judging</button>
            <span className="small muted">{ideas.length < MIN ? `${ideas.length} of at least ${MIN} options. Keep inventing.` : `${ideas.length} options on the board.`}</span>
          </div>
        </div>
      )}

      {phase === 'judge' && (
        <div className="stack" style={{ gap: '.8rem' }}>
          <p className="small muted">For each option, mark whether it meets <strong>your</strong> interests, <strong>their</strong> interests, or both.</p>
          <ul className="ob-judge">
            {ideas.map((i) => (
              <li key={i.id}>
                <span className="ob-text">{i.text}</span>
                <div className="ob-toggles">
                  <button className={'ob-t' + (i.mine ? ' on' : '')} aria-pressed={!!i.mine} onClick={() => mark(i.id, 'mine')}>Meets mine</button>
                  <button className={'ob-t' + (i.theirs ? ' on' : '')} aria-pressed={!!i.theirs} onClick={() => mark(i.id, 'theirs')}>Meets theirs</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => go('invent')}>Back to inventing</button>
            <button className="btn btn-primary btn-sm" onClick={() => go('reveal')}>Show mutual gains</button>
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="stack" style={{ gap: '.8rem' }}>
          <p className="ob-score"><strong>{both.length}</strong> of your {ideas.length} options meet both sides' interests.</p>
          <ul className="ob-judge reveal">
            {[...ideas].sort((a, b) => (b.mine && b.theirs) - (a.mine && a.theirs)).map((i) => {
              const r = ref(i)
              const win = i.mine && i.theirs
              const differs = r && (r.mine !== !!i.mine || r.theirs !== !!i.theirs)
              return (
                <li key={i.id} className={win ? 'win' : ''}>
                  <div className="stack" style={{ gap: '.25rem' }}>
                    <span className="ob-text">{i.text}</span>
                    {r && <span className="small muted">{differs ? 'Our view: ' : ''}{r.note}</span>}
                    {i.own && <span className="small muted">Your own idea.</span>}
                  </div>
                  <span className={'ob-tag' + (win ? ' win' : '')}>{win ? 'Mutual gain' : i.mine ? 'Mine only' : i.theirs ? 'Theirs only' : 'Neither'}</span>
                </li>
              )
            })}
          </ul>
          <p className="small muted">Notice how many mutual-gain options exist once you stop arguing about 20% versus 0%. Most of them change <em>timing</em>, <em>scope</em> or <em>terms</em>, not just price.</p>
          <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => go('judge')}>Back to judging</button>
            <button className="btn btn-sm btn-ghost" onClick={restart}>Start over</button>
          </div>
        </div>
      )}
    </section>
  )
}
