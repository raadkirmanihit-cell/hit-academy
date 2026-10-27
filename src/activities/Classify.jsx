import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

// Drag-and-drop sorting. Works with mouse, touch (pointer events) and keyboard/tap:
// tap or press Enter on a card to pick it up, then tap or press Enter on a box.
export default function Classify({ a, module }) {
  const { progress, saveActivity } = useApp()
  const saved = moduleState(progress, module.id).activities[a.id]
  const [place, setPlace] = useState(saved?.place || {})
  const [checked, setChecked] = useState(!!saved?.checked)
  const [sel, setSel] = useState(null)
  const [drag, setDrag] = useState(null) // {id, x, y, w}
  const [over, setOver] = useState(null)

  const unplaced = a.items.filter((it) => !place[it.id])
  const allPlaced = unplaced.length === 0
  const correctCount = a.items.filter((it) => place[it.id] === it.answer).length

  function put(id, bucket) {
    if (checked) return
    setPlace((p) => { const n = { ...p }; if (bucket) n[id] = bucket; else delete n[id]; return n })
    setSel(null)
  }

  // Pointer listeners are attached on press, so a fast drag can never miss the release.
  function onDown(e, it) {
    if (checked || e.button > 0) return
    const w = e.currentTarget.offsetWidth
    const s0 = { x: e.clientX, y: e.clientY }
    let dragging = false
    const findDrop = (ev) => document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-drop]')?.dataset.drop ?? null
    const move = (ev) => {
      if (!dragging && Math.hypot(ev.clientX - s0.x, ev.clientY - s0.y) > 6) dragging = true
      if (dragging) { ev.preventDefault(); setDrag({ id: it.id, x: ev.clientX, y: ev.clientY, w }); setOver(findDrop(ev)) }
    }
    const up = (ev) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      if (dragging) {
        const d = findDrop(ev)
        if (d) put(it.id, d === '__pool' ? null : d)
        setDrag(null); setOver(null)
      } else {
        setSel((s) => (s === it.id ? null : it.id))
      }
    }
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  function check() {
    setChecked(true)
    saveActivity(module.id, a.id, { place, checked: true, score: correctCount / a.items.length, done: true })
  }
  function retry() {
    const keep = a.open ? {} : Object.fromEntries(Object.entries(place).filter(([id, b]) => a.items.find((x) => x.id === id).answer === b))
    setPlace(keep); setChecked(false)
    saveActivity(module.id, a.id, { place: keep, checked: false })
  }

  const token = (it) => {
    const st = checked ? (a.open ? '' : place[it.id] === it.answer ? ' correct' : ' wrong') : ''
    return (
      <button key={it.id} type="button" className={'token' + st + (sel === it.id ? ' selected' : '') + (drag?.id === it.id ? ' dragging' : '')}
        onPointerDown={(e) => onDown(e, it)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel((s) => (s === it.id ? null : it.id)) } }}
        aria-pressed={sel === it.id}>
        {it.text}
        {checked && (
          <span className="small" style={{ display: 'block', marginTop: '.3rem', color: 'var(--ink-2)' }}>
            {a.open ? <>Common choice: <strong>{a.buckets.find((b) => b.id === it.answer).label}</strong>. {it.why}</>
              : place[it.id] === it.answer ? it.why : <>Belongs in <strong>{a.buckets.find((b) => b.id === it.answer).label}</strong>. {it.why}</>}
          </span>
        )}
      </button>
    )
  }
  const dragged = drag && a.items.find((x) => x.id === drag.id)

  return (
    <section className="activity" aria-labelledby={a.id + '-t'}>
      <div className="activity-head">
        <span className="activity-kind">{a.open ? 'Prioritising exercise' : 'Drag and drop'}</span>
        <h3 id={a.id + '-t'}>{a.title}</h3>
        <p className="muted">{a.prompt}</p>
      </div>
      <div className={'pool' + (over === '__pool' ? ' over' : '')} data-drop="__pool" onClick={() => sel && place[sel] && put(sel, null)}>
        {unplaced.length ? unplaced.map(token) : <span className="small muted">{checked ? 'All cards sorted.' : 'All cards placed. Check your answers when ready.'}</span>}
      </div>
      <div className="buckets" style={{ '--cols': a.cols || Math.min(a.buckets.length, 4) }}>
        {a.buckets.map((b) => (
          <div key={b.id} className={'bucket' + (over === b.id ? ' over' : '')} data-drop={b.id}
            role="button" tabIndex={0} aria-label={`Place selected card in ${b.label}`}
            onClick={(e) => { if (sel && !e.target.closest('.token')) put(sel, b.id) }}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && sel && e.target === e.currentTarget) { e.preventDefault(); put(sel, b.id) } }}>
            <div>
              <div className="bucket-title"><span className="chip-tone" style={{ background: b.color }} />{b.label}</div>
              {b.hint && <div className="bucket-hint">{b.hint}</div>}
            </div>
            {a.items.filter((it) => place[it.id] === b.id).map(token)}
          </div>
        ))}
      </div>
      {checked ? (
        <div className={'feedback ' + (a.open ? 'neutral' : correctCount === a.items.length ? 'good' : 'bad')}>
          <b className="tnum">{a.open ? 'Compare your ranking' : `${correctCount} of ${a.items.length} correct`}</b>
          <span>{a.open ? 'Your priorities depend on your situation. Where you differ from the common choice, ask yourself why. That reasoning is your preparation.' : correctCount === a.items.length ? 'Excellent. Every card is in the right place.' : 'Read the explanations on the red cards, then try those again.'}</span>
          {(a.open || correctCount < a.items.length) && <div><button className="btn btn-sm" onClick={retry}>{a.open ? 'Sort again' : 'Try the missed ones again'}</button></div>}
        </div>
      ) : (
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="small muted">{sel ? 'Now tap a box to place the card.' : `${a.items.length - unplaced.length} of ${a.items.length} placed`}</span>
          <button className="btn btn-dark" disabled={!allPlaced} onClick={check}>{a.open ? 'Compare' : 'Check answers'}</button>
        </div>
      )}
      {drag && dragged && (
        <div className="token drag-ghost" style={{ left: drag.x - 20, top: drag.y - 18, width: Math.min(drag.w, 320) }}>{dragged.text}</div>
      )}
    </section>
  )
}
