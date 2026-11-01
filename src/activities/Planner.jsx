import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { recommend } from './Selector.jsx'
import { Icon } from '../ui/icons.jsx'

// The module worksheet as an in-app planner. Answers save to the learner's account as they type,
// and "Save as PDF" prints a branded copy (the browser's print dialog offers "Save as PDF").
// Field types: text, textarea, scale (1–5), select, strategyHint (suggestion from other answers).
const LABEL = { competing: 'Competing', collaborating: 'Collaborating', compromising: 'Compromising', avoiding: 'Avoiding', accommodating: 'Accommodating' }

export default function Planner({ module }) {
  const { progress, saveActivity, user } = useApp()
  const pl = module.planner
  const saved = moduleState(progress, module.id).activities[pl.id]
  const [vals, setVals] = useState(saved?.values || {})
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(pl.sections[0].id)
  const t = useRef()
  useEffect(() => () => clearTimeout(t.current), [])

  function set(id, v) {
    const next = { ...vals, [id]: v }
    setVals(next); setStatus('Saving…')
    clearTimeout(t.current)
    t.current = setTimeout(() => {
      saveActivity(module.id, pl.id, { values: next, updatedAt: new Date().toISOString(), done: filled(pl, next) >= Math.ceil(count(pl) / 2) })
      setStatus('Saved to your account')
    }, 500)
  }

  const total = count(pl), done = filled(pl, vals)
  return (
    <section className="activity planner" aria-label={pl.title}>
      <div className="activity-head">
        <span className="activity-kind">Interactive planner</span>
        <h3>{pl.title}</h3>
        <p className="muted">{pl.intro}</p>
      </div>
      <div className="planner-bar">
        <div className="bar"><span style={{ width: (total ? (done / total) * 100 : 0) + '%' }} /></div>
        <span className="small muted tnum">{done} of {total} answered</span>
        <span className="small muted" aria-live="polite">{status}</span>
      </div>
      {pl.sections.map((s, n) => {
        const isOpen = open === s.id
        const secDone = s.fields.filter((f) => f.type !== 'strategyHint' && has(vals[f.id])).length
        const secTotal = s.fields.filter((f) => f.type !== 'strategyHint').length
        return (
          <div key={s.id} className={'planner-sec' + (isOpen ? ' open' : '')}>
            <button className="planner-sec-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)}>
              <span className="planner-n">{String(n + 1).padStart(2, '0')}</span>
              <span className="stack" style={{ gap: '.1rem', textAlign: 'left' }}><strong>{s.title}</strong><span className="small muted">{secDone} of {secTotal} answered</span></span>
              <span aria-hidden="true" className="planner-chev">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="planner-body fade-in">
                {s.hint && <p className="small muted">{s.hint}</p>}
                {s.fields.map((f) => <Field key={f.id} f={f} v={vals[f.id]} vals={vals} set={set} />)}
                {n < pl.sections.length - 1 && <button className="btn btn-sm" style={{ justifySelf: 'start' }} onClick={() => setOpen(pl.sections[n + 1].id)}>Next: {pl.sections[n + 1].title} <Icon.arrowR /></button>}
              </div>
            )}
          </div>
        )
      })}
      <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => printPlanner(module, vals, user)}><Icon.download /> Save as PDF or print</button>
        <span className="small muted">Your answers are saved to your account, so you can come back and change them any time.</span>
      </div>
    </section>
  )
}

const has = (v) => (typeof v === 'number' ? v > 0 : !!String(v ?? '').trim())
const count = (pl) => pl.sections.reduce((a, s) => a + s.fields.filter((f) => f.type !== 'strategyHint').length, 0)
const filled = (pl, vals) => pl.sections.reduce((a, s) => a + s.fields.filter((f) => f.type !== 'strategyHint' && has(vals[f.id])).length, 0)
const hintFor = (f, vals) => {
  const [o, r, tm] = f.from.map((id) => vals[id])
  return o && r ? recommend({ outcome: o, relationship: r, time: tm || 2 }) : null
}

function Field({ f, v, vals, set }) {
  const id = 'pl-' + f.id
  if (f.type === 'strategyHint') {
    const k = hintFor(f, vals)
    return <p className="feedback neutral small"><b>{k ? `Suggested starting strategy: ${LABEL[k]}` : 'Rate the outcome and the relationship above to see a suggested strategy.'}</b>{k && <span>Based on the strategy selector in Lesson 5. It is a thinking aid: you decide.</span>}</p>
  }
  if (f.type === 'scale') return (
    <div className="conf-row">
      <span id={id}>{f.label}{f.tag && <span className="planner-tag">{f.tag}</span>}</span>
      <div className="conf-scale" role="radiogroup" aria-labelledby={id}>
        {[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={v === n} className={'conf-dot' + (v === n ? ' on' : '')} onClick={() => set(f.id, v === n ? 0 : n)}>{n}</button>)}
      </div>
    </div>
  )
  return (
    <div className="field">
      <label htmlFor={id}>{f.label}</label>
      {f.sub && <span className="small muted">{f.sub}</span>}
      {f.type === 'select' ? (
        <select id={id} value={v || ''} onChange={(e) => set(f.id, e.target.value)}>
          <option value="">Choose…</option>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : f.type === 'text' ? (
        <input id={id} value={v || ''} onChange={(e) => set(f.id, e.target.value)} placeholder={f.placeholder || ''} />
      ) : (
        <textarea id={id} value={v || ''} onChange={(e) => set(f.id, e.target.value)} placeholder={f.placeholder || ''} rows={f.rows || 3} style={{ minHeight: (f.rows || 3) * 26 + 20 }} />
      )}
    </div>
  )
}

// ---- Printable copy ---------------------------------------------------------

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export function plannerHtml(module, vals, user) {
  const pl = module.planner
  const logo = new URL('img/brand/logo.webp', document.baseURI).href
  const body = pl.sections.map((s, n) => `
    <section><h2><span class="n">${String(n + 1).padStart(2, '0')}</span>${esc(s.title)}</h2>
    ${s.fields.map((f) => {
      if (f.type === 'strategyHint') { const k = hintFor(f, vals); return k ? `<p class="hint">Suggested starting strategy: <b>${LABEL[k]}</b></p>` : '' }
      const v = vals[f.id]
      const ans = f.type === 'scale' ? (v ? `<span class="scale">${[1, 2, 3, 4, 5].map((x) => `<i class="${x === v ? 'on' : ''}">${x}</i>`).join('')}</span>` : '<span class="empty">Not rated</span>')
        : has(v) ? `<div class="ans">${esc(v).replace(/\n/g, '<br>')}</div>` : '<div class="ans empty">&nbsp;</div>'
      return `<div class="q ${f.type === 'scale' ? 'row' : ''}"><div class="lbl">${esc(f.label)}${f.tag ? ` <small>(${esc(f.tag)})</small>` : ''}</div>${ans}</div>`
    }).join('')}</section>`).join('')
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(pl.title)}</title>
<style>
@page { size: A4; margin: 14mm 14mm 16mm; }
* { box-sizing: border-box; }
body { font: 10.5pt/1.45 "DM Sans", Arial, sans-serif; color: #1b2547; margin: 0; }
h1, h2 { color: #0b1a44; margin: 0; }
h1 { font-size: 22pt; line-height: 1.1; }
h2 { font-size: 14pt; margin: 6mm 0 3mm; display: flex; gap: 3mm; align-items: baseline; border-bottom: 1px solid #c9cfdf; padding-bottom: 1.5mm; }
h2 .n { font: 600 9pt monospace; color: #a94f00; letter-spacing: .1em; }
.head { display: flex; gap: 6mm; align-items: center; border-bottom: 3px solid #f7861b; padding-bottom: 5mm; margin-bottom: 4mm; }
.head img { width: 18mm; height: 18mm; object-fit: contain; }
.eyebrow { font: 600 8pt monospace; letter-spacing: .14em; text-transform: uppercase; color: #5d6888; }
.q { margin: 0 0 3mm; break-inside: avoid; }
.q.row { display: flex; justify-content: space-between; gap: 6mm; align-items: center; }
.lbl { font-weight: 600; margin-bottom: 1mm; }
.lbl small { font-weight: 400; color: #5d6888; }
.ans { border: 1px solid #c9cfdf; border-radius: 2mm; padding: 2mm 3mm; min-height: 9mm; white-space: normal; }
.empty { color: #8a93b0; }
.scale i { display: inline-block; width: 6mm; height: 6mm; line-height: 6mm; text-align: center; border: 1px solid #c9cfdf; border-radius: 50%; margin-left: 1mm; font-style: normal; font-size: 8.5pt; color: #8a93b0; }
.scale i.on { background: #f7861b; border-color: #f7861b; color: #1c0f00; font-weight: 700; }
.hint { background: #fff0e1; border-radius: 2mm; padding: 2mm 3mm; }
.foot { margin-top: 8mm; font-size: 8pt; color: #8a93b0; display: flex; justify-content: space-between; }
</style></head><body>
<div class="head"><img src="${logo}" alt=""><div><div class="eyebrow">Module ${module.number} planner</div><h1>${esc(pl.title)}</h1><div class="eyebrow">${user?.name ? esc(user.name) + ' · ' : ''}${date}</div></div></div>
${body}
<div class="foot"><span>Human Interactions Translated · ${esc(module.title)}</span><span>humaninteractionstranslated.com</span></div>
</body></html>`
}

function printPlanner(module, vals, user) {
  const old = document.getElementById('planner-print'); if (old) old.remove()
  const f = document.createElement('iframe')
  f.id = 'planner-print'
  f.setAttribute('aria-hidden', 'true')
  Object.assign(f.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0', visibility: 'hidden' })
  document.body.appendChild(f)
  const doc = f.contentDocument
  doc.open(); doc.write(plannerHtml(module, vals, user)); doc.close()
  let printed = false
  const go = () => { if (printed) return; printed = true; try { f.contentWindow.focus(); f.contentWindow.print() } catch { /* printing blocked */ } }
  const img = doc.querySelector('img')
  if (img && !img.complete) { img.onload = img.onerror = go; setTimeout(go, 1500) } else setTimeout(go, 100)
}
