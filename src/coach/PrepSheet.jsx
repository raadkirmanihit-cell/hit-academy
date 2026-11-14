// The one-page prep sheet the coach makes from a chat: shown in the coach, copied as text,
// or printed / saved as PDF.
import { useState } from 'react'
import { Icon } from '../ui/icons.jsx'

const arr = (x) => (Array.isArray(x) ? x.filter(Boolean).map(String) : x ? [String(x)] : [])
const txt = (x) => (x == null ? '' : String(x).trim())

// Rows in reading order: [label, value]. Empty rows are left out.
function rows(s) {
  return [
    ['The other side', txt(s.counterpart)],
    ['My goal', txt(s.goal)],
    ['Ideal outcome', txt(s.ideal)],
    ['Least I will accept', txt(s.minimum)],
    ['Walk-away point', txt(s.walkAway)],
    ['My BATNA', txt(s.batna)],
    ['Their likely BATNA', txt(s.theirBatna)],
    ['What matters to them', arr(s.theirInterests)],
    ['What really matters to me', arr(s.myInterests)],
    ['What I can trade', arr(s.tradeables)],
    ['My opening line', txt(s.opening)],
    ['Lines to use', arr(s.keyLines)],
    ['Questions to ask', arr(s.questions)],
  ].filter(([, v]) => (Array.isArray(v) ? v.length : v))
}
const pushback = (s) => (Array.isArray(s.pushback) ? s.pushback.filter((p) => p && (p.they || p.me)) : [])

export function prepAsText(s) {
  const out = [txt(s.title) || 'My prep sheet', '']
  for (const [l, v] of rows(s)) out.push(Array.isArray(v) ? `${l}:\n${v.map((x) => `- ${x}`).join('\n')}` : `${l}: ${v}`)
  const pb = pushback(s)
  if (pb.length) out.push('If they push back:\n' + pb.map((p) => `- They: ${txt(p.they)}\n  Me: ${txt(p.me)}`).join('\n'))
  if (txt(s.reminder)) out.push(`Remember: ${txt(s.reminder)}`)
  return out.join('\n\n')
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
function prepHtml(s, user) {
  const logo = new URL('img/brand/logo.webp', document.baseURI).href
  const date = new Date(s.at || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const row = ([l, v]) => `<div class="r"><div class="l">${esc(l)}</div><div class="v">${Array.isArray(v) ? `<ul>${v.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : esc(v)}</div></div>`
  const pb = pushback(s)
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(txt(s.title) || 'Prep sheet')}</title>
<style>
@page { size: A4; margin: 13mm 14mm 14mm; }
* { box-sizing: border-box; }
body { font: 10pt/1.42 "DM Sans", Arial, sans-serif; color: #1b2547; margin: 0; }
h1 { color: #0b1a44; font-size: 19pt; line-height: 1.1; margin: 0; }
h2 { color: #0b1a44; font-size: 11.5pt; margin: 4mm 0 2mm; border-bottom: 1px solid #c9cfdf; padding-bottom: 1mm; }
.head { display: flex; gap: 5mm; align-items: center; border-bottom: 3px solid #f7861b; padding-bottom: 4mm; margin-bottom: 3mm; }
.head img { width: 15mm; height: 15mm; object-fit: contain; }
.eyebrow { font: 600 7.5pt monospace; letter-spacing: .14em; text-transform: uppercase; color: #5d6888; }
.r { display: grid; grid-template-columns: 42mm 1fr; gap: 3mm; padding: 1.3mm 0; border-bottom: 1px dotted #dfe3ee; break-inside: avoid; }
.l { font-weight: 650; color: #0b1a44; }
ul { margin: 0; padding-left: 4mm; }
.pb { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 4mm; break-inside: avoid; }
.pb div { padding: 1.5mm 2mm; border-radius: 1.5mm; }
.they { background: #f3f5fa; } .me { background: #fff0e1; }
.rem { margin-top: 4mm; background: #0b1a44; color: #fff; border-radius: 2mm; padding: 3mm 4mm; font-weight: 600; }
.foot { margin-top: 5mm; font-size: 7.5pt; color: #8a93b0; display: flex; justify-content: space-between; }
</style></head><body>
<div class="head"><img src="${logo}" alt=""><div><div class="eyebrow">Prep sheet · H.I.T. Negotiation Coach</div><h1>${esc(txt(s.title) || 'My prep sheet')}</h1><div class="eyebrow">${user?.name ? esc(user.name) + ' · ' : ''}${date}</div></div></div>
${rows(s).map(row).join('')}
${pb.length ? `<h2>If they push back</h2><div class="pb">${pb.map((p) => `<div class="they"><b>They:</b> ${esc(p.they)}</div><div class="me"><b>Me:</b> ${esc(p.me)}</div>`).join('')}</div>` : ''}
${txt(s.reminder) ? `<div class="rem">Remember: ${esc(s.reminder)}</div>` : ''}
<div class="foot"><span>Human Interactions Translated · Negotiation &amp; Conflict Resolution</span><span>humaninteractionstranslated.com</span></div>
</body></html>`
}

function printPrep(s, user) {
  const old = document.getElementById('prep-print'); if (old) old.remove()
  const f = document.createElement('iframe')
  f.id = 'prep-print'
  f.setAttribute('aria-hidden', 'true')
  Object.assign(f.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0', visibility: 'hidden' })
  document.body.appendChild(f)
  const doc = f.contentDocument
  doc.open(); doc.write(prepHtml(s, user)); doc.close()
  let printed = false
  const go = () => { if (printed) return; printed = true; try { f.contentWindow.focus(); f.contentWindow.print() } catch { /* printing blocked */ } }
  const img = doc.querySelector('img')
  if (img && !img.complete) { img.onload = img.onerror = go; setTimeout(go, 1500) } else setTimeout(go, 100)
}

export function PrepSheet({ sheet, user, onBack, onRehearse }) {
  const [copied, setCopied] = useState(false)
  const pb = pushback(sheet)
  async function copy() {
    try { await navigator.clipboard.writeText(prepAsText(sheet)); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { setCopied(false) }
  }
  return (
    <div className="coach-prep">
      <span className="eyebrow">Your prep sheet</span>
      <h4>{txt(sheet.title) || 'My prep sheet'}</h4>
      <dl>
        {rows(sheet).map(([l, v]) => (
          <div key={l} className="coach-prep-row">
            <dt>{l}</dt>
            <dd>{Array.isArray(v) ? <ul>{v.map((x, i) => <li key={i}>{x}</li>)}</ul> : v}</dd>
          </div>
        ))}
      </dl>
      {pb.length > 0 && (
        <div className="coach-prep-pb">
          <strong>If they push back</strong>
          {pb.map((p, i) => <div key={i} className="coach-prep-pair"><p><b>They:</b> {txt(p.they)}</p><p><b>You:</b> {txt(p.me)}</p></div>)}
        </div>
      )}
      {txt(sheet.reminder) && <p className="coach-prep-rem">Remember: {txt(sheet.reminder)}</p>}
      <p className="small muted">Lines starting with "To decide:" are yours to fill in before the meeting.</p>
      <div className="coach-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => printPrep(sheet, user)}><Icon.download /> Save as PDF or print</button>
        <button type="button" className="btn btn-sm" onClick={copy}>{copied ? 'Copied' : 'Copy as text'}</button>
        <button type="button" className="btn btn-sm" onClick={onRehearse}>Rehearse it now</button>
        <button type="button" className="btn btn-sm" onClick={onBack}>Back to the chat</button>
      </div>
    </div>
  )
}
