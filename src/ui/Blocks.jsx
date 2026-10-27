import { useState } from 'react'
import { useApp } from '../App.jsx'
import { Spar } from '../coach/Coach.jsx'
import { Md } from './md.jsx'
import { Icon } from './icons.jsx'
import { Diagram } from '../diagrams/index.jsx'
import Quiz from './Quiz.jsx'
import Classify from '../activities/Classify.jsx'
import Scenarios from '../activities/Scenarios.jsx'
import Branching from '../activities/Branching.jsx'
import FlipCards from '../activities/FlipCards.jsx'
import Selector from '../activities/Selector.jsx'
import Reflect from '../activities/Reflect.jsx'
import Breathing from '../activities/Breathing.jsx'
import Silence from '../activities/Silence.jsx'
import OptionBoard from '../activities/OptionBoard.jsx'
import BatnaMeter from '../activities/BatnaMeter.jsx'
import { ZopaLab } from '../activities/Zopa.jsx'
import AnchorLab from '../activities/AnchorLab.jsx'
import { moduleState } from '../platform/progress.js'
import { saveUrl } from '../platform/files.js'

const bColor = (k) => `var(--b-${k})`
const sColor = (k) => `var(--s-${k})`

export function Blocks({ blocks, module, step }) {
  return blocks.map((b, i) => <Block key={i} b={b} module={module} step={step} />)
}

function Block({ b, module }) {
  switch (b.t) {
    case 'h': return <h3 className="block-h">{b.text}</h3>
    case 'lead': return <p style={{ font: '500 1.3rem/1.45 var(--f-display)', maxWidth: '60ch' }}><Md text={b.text} /></p>
    case 'p': return <p className="prose" style={{ display: 'block', color: 'var(--ink-2)' }}><Md text={b.text} /></p>
    case 'list': return <ul className="prose" style={{ paddingLeft: '1.2rem', margin: 0 }}>{b.items.map((t, i) => <li key={i}><Md text={t} /></li>)}</ul>
    case 'checks': return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {b.items.map((t) => <li key={t} className="card" style={{ padding: '.85rem 1rem', display: 'flex', gap: '.6rem', boxShadow: 'none', borderRadius: 'var(--r-m)' }}><span style={{ color: 'var(--good)' }}><Icon.check /></span>{t}</li>)}
      </ul>
    )
    case 'quote': return <blockquote className="quote-block" style={{ margin: 0 }}><p>"{b.text}"</p><span className="small muted">{b.by}</span></blockquote>
    case 'img': return (
      <figure className="figure">
        <img src={b.src} alt={b.alt} loading="lazy" style={{ aspectRatio: b.ratio || 'auto', objectPosition: b.pos || 'center' }} />
        {b.caption && <figcaption>{b.caption}</figcaption>}
      </figure>
    )
    case 'callout': return (
      <div className={'callout' + (b.tone === 'tip' ? ' tip' : '')}>
        <span className="ico">{b.tone === 'warn' ? '!' : b.tone === 'tip' ? 'i' : '★'}</span>
        <div className="stack" style={{ gap: '.35rem' }}>
          <h4>{b.title}</h4>
          {b.text && <p><Md text={b.text} /></p>}
          {b.list && <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--ink-2)' }}>{b.list.map((t) => <li key={t}><Md text={t} /></li>)}</ul>}
        </div>
      </div>
    )
    case 'research': return <Research b={b} module={module} />
    case 'diagram': return (
      <figure className="figure">
        <div className={'diagram' + (b.name === 'Pareto' ? ' wide' : '')}><Diagram name={b.name} interactive={b.interactive} /></div>
        {b.caption && <figcaption>{b.caption}</figcaption>}
      </figure>
    )
    case 'cols2': return (
      <div className="cards-2">
        {b.items.map((it) => (
          <div key={it.title} className="card" style={{ padding: '1.1rem 1.2rem', boxShadow: 'none', borderRadius: 'var(--r-m)', display: 'grid', gap: '.5rem', alignContent: 'start' }}>
            <h4>{it.title}</h4>
            {it.text && <p className="muted"><Md text={it.text} /></p>}
            {it.listTitle && <span className="eyebrow" style={{ marginTop: '.3rem' }}>{it.listTitle}</span>}
            {it.list && <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--ink-2)', display: 'grid', gap: '.25rem' }}>{it.list.map((t) => <li key={t}><Md text={t} /></li>)}</ul>}
          </div>
        ))}
      </div>
    )
    case 'behaviourList': return (
      <div className="cards-2">
        {b.items.map((it, i) => (
          <div key={it.key} className="card" style={{ padding: '1rem 1.1rem', boxShadow: 'none', borderRadius: 'var(--r-m)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '.8rem', borderTop: `4px solid ${bColor(it.key)}` }}>
            <span style={{ font: '700 1.4rem/1 var(--f-display)', color: bColor(it.key) }}>{i + 1}</span>
            <div className="stack" style={{ gap: '.25rem' }}><h4>{it.name}</h4><p className="muted small">{it.text}</p></div>
          </div>
        ))}
      </div>
    )
    case 'traits': return <Traits b={b} />
    case 'compareDialogues': return <CompareDialogues b={b} />
    case 'strategyHeader': return (
      <div className="row" style={{ gap: '1rem', flexWrap: 'nowrap', alignItems: 'center' }}>
        <img src={b.image} alt="" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${sColor(b.key)}`, flexShrink: 0 }} />
        <div className="stack" style={{ gap: '.3rem' }}>
          <span className="pill" style={{ justifySelf: 'start', background: 'var(--surface-2)', color: sColor(b.key) }}>Strategy</span>
          <p style={{ font: '500 1.15rem/1.4 var(--f-display)' }}>{b.tagline}</p>
        </div>
      </div>
    )
    case 'examples': return (
      <div className="stack" style={{ gap: '.5rem' }}>
        <span className="eyebrow">How it sounds</span>
        {b.items.map((t) => <p key={t} className="quote-block" style={{ font: '500 1.02rem/1.5 var(--f-body)' }}>"{t}"</p>)}
      </div>
    )
    case 'scene': return <Scene b={b} />
    case 'situationCards': return (
      <div className="cards-4">
        {b.items.map((it) => (
          <div key={it.key} className="mini-card" style={{ borderTop: `4px solid ${bColor(it.key)}` }}>
            <img src={it.img} alt="" loading="lazy" />
            <div className="body"><h4>{it.title}</h4><ul>{it.list.map((t) => <li key={t}>{t}</li>)}</ul></div>
          </div>
        ))}
      </div>
    )
    case 'flipCards': return <FlipCards items={b.items} frontLabel={b.frontLabel} backLabel={b.backLabel} hint={b.hint} />
    case 'selector': return <Selector />
    case 'activity': return <ActivityHost b={b} module={module} />
    case 'reflect': return <Reflect id={b.id} prompt={b.prompt} module={module} />
    case 'zones': return <Zones />
    case 'breathing': return <Breathing />
    case 'silence': return <Silence />
    case 'options': return <OptionBoard module={module} />
    case 'batnaMeter': return <BatnaMeter module={module} />
    case 'zopa': return <ZopaLab module={module} />
    case 'anchorLab': return <AnchorLab module={module} />
    case 'liveSpar': return <Spar scenarioId={b.scenario} />
    case 'voices': return <Voices items={b.items} />
    case 'steps': return <Steps items={b.items} start={b.start} />
    case 'person': return (
      <div className={'person card' + (b.tall ? ' tall' : b.ratio ? ' wide' : '') + (b.small ? ' small' : '')}>
        <img src={b.img} alt={b.alt || ''} loading="lazy" style={{ ...(b.pos ? { objectPosition: b.pos } : {}), ...(b.ratio ? { aspectRatio: b.ratio } : {}) }} />
        <div className="stack" style={{ gap: '.5rem', alignContent: 'center' }}>
          {b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}
          <h3>{b.name}</h3>
          <p className="muted"><Md text={b.text} /></p>
          {b.quote && <p className="person-quote">"{b.quote}"</p>}
        </div>
      </div>
    )
    case 'cards': return (
      <div className={b.cols === 4 ? 'cards-4' : b.cols === 2 ? 'cards-2' : 'factor-cards'}>
        {b.items.map((it) => (
          <div key={it.title} className="mini-card" style={it.color ? { borderTop: `4px solid ${it.color}` } : undefined}>
            {it.img && <img src={it.img} alt="" loading="lazy" style={b.imgRatio ? { aspectRatio: b.imgRatio } : undefined} />}
            <div className="body">
              {it.eyebrow && <span className="eyebrow">{it.eyebrow}</span>}
              <h4>{it.title}</h4>
              {it.text && <p className="small muted"><Md text={it.text} /></p>}
              {it.list && <ul>{it.list.map((t) => <li key={t}><Md text={t} /></li>)}</ul>}
              {it.example && <p className="small" style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>{it.example}</p>}
            </div>
          </div>
        ))}
      </div>
    )
    case 'factorCards': return (
      <div className="factor-cards">
        {b.items.map((f) => (
          <div key={f.n} className="factor">
            <span className="factor-n">{f.n}</span>
            <h4>{f.title}</h4>
            <p className="small muted">{f.text}</p>
            <span className="eyebrow">Ask yourself</span>
            <ul>{f.ask.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        ))}
      </div>
    )
    case 'factorMatrix': return <FactorMatrix rows={b.rows} />
    case 'table': return b.reveal ? (
      <details className="reveal">
        <summary>{b.reveal}</summary>
        <TableBlock b={b} />
      </details>
    ) : <TableBlock b={b} />
    case 'tableInner': return (
      <figure className="figure">
        <div className="tablewrap">
          <table className={"data card-table" + (b.plain ? " plain" : "")}>
            <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, i) => typeof r === 'string' ? (
                <tr key={i} className="group"><td colSpan={b.head.length}>{r}</td></tr>
              ) : (
                <tr key={i}>{r.map((c, j) => <td key={j} data-label={b.head[j]}>{j === 0 && !b.plain ? <strong><Md text={c} /></strong> : <Md text={c} />}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        {b.caption && <figcaption>{b.caption}</figcaption>}
      </figure>
    )
    case 'overview': return <Overview module={module} />
    case 'quiz': return <Quiz module={module} />
    case 'takeaways': return <Takeaways module={module} />
    case 'worksheet': return <Worksheet module={module} />
    case 'references': return <References module={module} />
    default: return null
  }
}

function TableBlock({ b }) { return <Block b={{ ...b, t: 'tableInner' }} /> }

function Research({ b, module }) {
  return (
    <aside className="research" data-added="true">
      <span className="research-tag">Beyond the module · research</span>
      <h4>{b.title}</h4>
      <p style={{ color: 'var(--ink-2)' }}><Md text={b.text} /></p>
      {b.diagram && <div className="diagram fit" style={{ border: 0, padding: 0 }}><Diagram name={b.diagram} /></div>}
      <p className="cite">Source{b.cite.length > 1 ? 's' : ''}: {b.cite.map((id) => module.references[id].text).join(' · ')}</p>
    </aside>
  )
}

function Traits({ b }) {
  const cols = [
    { title: 'Characteristics', list: b.characteristics },
    { title: 'Benefits', list: b.benefits },
    { title: 'Risks', list: b.risks },
  ]
  return (
    <div className="trait-cols">
      {cols.map((c, i) => (
        <div className="trait-col" key={c.title}>
          <img src={b.images[i]} alt="" loading="lazy" />
          <div className="body">
            <span className="eyebrow" style={{ color: i === 0 ? bColor(b.key) : undefined }}>{c.title}</span>
            <ul>{c.list.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  )
}

function Line({ who, text, note, cast, right }) {
  const c = cast[who] || {}
  const initials = c.initials || (who === 'You' ? 'YOU' : who.slice(0, 2).toUpperCase())
  const isRight = right ?? (c.side === 'right' || who === 'You')
  return (
    <div className={'line' + (isRight ? ' right' : '')}>
      <span className="who" style={who === 'You' ? { background: 'var(--orange)', color: '#1c0f00', fontSize: '.7rem' } : undefined}>{initials}</span>
      <div className="bubble">
        <span className="name">{who}</span>
        <span>{text}</span>
        {note && <span className="annot">{note}</span>}
      </div>
    </div>
  )
}

function CompareDialogues({ b }) {
  const [k, setK] = useState(b.order[3])
  const d = b.dialogues[k]
  return (
    <div className="dialogue">
      <div className="dialogue-head">
        <div className="tabs" role="tablist" aria-label="Behaviour">
          {b.order.map((key) => (
            <button key={key} role="tab" className="tab" aria-selected={k === key} onClick={() => setK(key)}>
              <span className="chip-tone" style={{ background: b.dialogues[key].color, margin: 0 }} />{b.dialogues[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="meters" aria-label="Our reading of this conversation">
        <Meter label="Riley's likely outcome" v={d.gauge.outcome} />
        <Meter label="Relationship with Alex" v={d.gauge.relationship} rel />
      </div>
      <div className="stack" style={{ gap: '.6rem' }} key={k}>
        {d.lines.map(([who, text, note], i) => <Line key={i} who={who} text={text} note={note} cast={b.cast} />)}
      </div>
      <p className="dialogue-note">{d.note}</p>
      <p className="small muted">Meters show our reading of each version, for comparison only.</p>
    </div>
  )
}

export function Meter({ label, v, rel }) {
  return (
    <div className={'meter' + (rel ? ' rel' : '')}>
      <div className="row"><span>{label}</span><span className="tnum muted">{v}</span></div>
      <div className="bar"><span style={{ width: Math.max(2, v) + '%' }} /></div>
    </div>
  )
}

function Scene({ b }) {
  return (
    <div className="dialogue">
      <span className="eyebrow">{b.label || 'Scenario in action'}</span>
      {b.condition && <p><strong>Condition:</strong> <em>{b.condition}</em></p>}
      {b.scenario && <p><strong>Scenario:</strong> {b.scenario}</p>}
      <div className="stack" style={{ gap: '.6rem' }}>
        {b.lines.map(([who, text, note], i) => who === '' ? <p key={i} className="stage-dir">{text}</p> : <Line key={i} who={who} text={text} note={note} cast={b.cast || {}} />)}
      </div>
      {b.note && <p className="dialogue-note">{b.note}</p>}
    </div>
  )
}

function ActivityHost({ b, module }) {
  const map = { classify: Classify, scenarios: Scenarios, branching: Branching }
  const C = map[b.kind]
  return C ? <C a={b} module={module} /> : null
}

function Level({ v, label }) {
  const words = ['', 'Low', 'Medium', 'High']
  return (
    <span className="level" aria-label={`${label}: ${words[v]}`}>
      {[1, 2, 3].map((i) => <i key={i} className={i <= v ? 'on' : ''} />)}
      <span className="small muted">{words[v]}</span>
    </span>
  )
}

function FactorMatrix({ rows }) {
  return (
    <div className="tablewrap factor-wrap">
      <table className="data factor-table">
        <thead><tr><th>Strategy</th><th>Outcome matters</th><th>Relationship matters</th><th>Context</th><th>Module example</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td><strong style={{ color: `var(--s-${r.key})` }}>{r.strategy}</strong></td>
              <td data-label="Outcome matters"><Level v={r.outcome} label="Outcome" /></td>
              <td data-label="Relationship matters"><Level v={r.relationship} label="Relationship" /></td>
              <td data-label="Context">{r.context}</td>
              <td data-label="Module example" className="muted">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Voices({ items }) {
  return (
    <div className="factor-cards">
      {items.map((v) => (
        <div key={v.name} className="mini-card" style={{ borderTop: `4px solid ${v.color}` }}>
          <img src={v.img} alt="" loading="lazy" />
          <div className="body">
            <h4>{v.name}</h4>
            <p className="small muted">{v.style}</p>
            {v.audio && (
              <div className="voice-audio">
                <span className="eyebrow">Listen</span>
                <audio controls preload="metadata" src={v.audio} aria-label={`${v.name} example`} />
              </div>
            )}
            <dl className="voice-dl">
              {v.rows.map(([k, val]) => <div key={k}><dt>{k}</dt><dd>{val}</dd></div>)}
            </dl>
            <p className="small" style={{ fontStyle: 'italic' }}>"{v.vibe}"</p>
            {v.link && <a className="btn btn-sm" href={v.link} target="_blank" rel="noreferrer">{v.audio ? 'Watch the video ↗' : 'Hear an example ↗'}</a>}
          </div>
        </div>
      ))}
    </div>
  )
}

function Steps({ items, start = 1 }) {
  return (
    <ol className="flow">
      {items.map((it, i) => (
        <li key={it.title}>
          <span className="flow-n">{i + start}</span>
          <div><h4>{it.title}</h4>{it.text && <p className="small muted"><Md text={it.text} /></p>}{it.list && <ul className="flow-list small muted">{it.list.map((t) => <li key={t}><Md text={t} /></li>)}</ul>}</div>
        </li>
      ))}
    </ol>
  )
}

function Zones() {
  const z = [
    { k: 'Must', r: '0–5% of effort', c: '#e0a400', t: 'The few deal-breakers. They deliver most of the early benefit.' },
    { k: 'Should', r: '5–20%', c: 'var(--orange)', t: 'Important issues that lift the curve to around 90% of the benefit.' },
    { k: 'Could', r: '20–50%', c: 'var(--s-avoiding)', t: 'Nice-to-haves. Useful as trades; small gains for real effort.' },
    { k: 'Won\'t', r: '50–100%', c: 'var(--b-aggressive)', t: 'Half of all possible effort for almost no extra benefit.' },
  ]
  return (
    <div className="cards-4">
      {z.map((x) => (
        <div key={x.k} className="mini-card" style={{ borderTop: `4px solid ${x.c}` }}>
          <div className="body"><span className="eyebrow">{x.r}</span><h4>{x.k}</h4><p className="small muted">{x.t}</p></div>
        </div>
      ))}
    </div>
  )
}

const INTERACTIVE = new Set(['activity', 'selector', 'flipCards', 'breathing', 'silence', 'options', 'batnaMeter', 'zopa', 'anchorLab'])
function overviewStats(module) {
  const lessons = module.sections.filter((x) => x.kind === 'lesson').length
  const blocks = module.sections.flatMap((x) => x.steps.flatMap((st) => st.blocks))
  const acts = blocks.filter((b) => INTERACTIVE.has(b.t)).length
  return [[String(lessons), 'short lessons'], [String(acts), 'interactive activities'], [String(module.quiz.questions.length), 'quiz questions'], ['1', 'planning worksheet']]
}

function Overview({ module }) {
  return (
    <div className="stack" style={{ gap: '1.75rem' }}>
      <p className="muted" style={{ fontSize: '1.1rem' }}>{module.subtitle} · by {module.author} · {module.duration}</p>
      <div className={'ov-hero' + (module.coverWide ? ' wide' : '')}>
        <div className="ov-text">
          <span className="eyebrow">Module {String(module.number).padStart(2, '0')}</span>
          <p className="ov-title">{module.title}</p>
          <ul className="ov-pills">{(module.tags || []).map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <img src={module.cover} alt={module.coverAlt || ''} style={module.coverPos ? { objectPosition: module.coverPos } : undefined} />
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        <span className="eyebrow">Summary</span>
        <p style={{ font: '500 1.15rem/1.55 var(--f-body)', maxWidth: '66ch' }}>{module.summary}</p>
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        <span className="eyebrow">Learning objectives · by the end you will be able to</span>
        <ol style={{ margin: 0, paddingLeft: '1.3rem', display: 'grid', gap: '.45rem', color: 'var(--ink-2)' }}>
          {module.objectives.map((o) => <li key={o}>{o}</li>)}
        </ol>
      </div>
      <div className="cards-4">
        {overviewStats(module).map(([n, l]) => (
          <div key={l} className="card" style={{ padding: '1rem', boxShadow: 'none', borderRadius: 'var(--r-m)' }}>
            <div style={{ font: '750 2rem/1 var(--f-display)', color: 'var(--orange-ink)' }}>{n}</div>
            <div className="small muted">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Takeaways({ module }) {
  return (
    <div className="stack">
      <p className="muted">The {module.takeaways.length === 10 ? 'ten' : module.takeaways.length} ideas to remember from this module.</p>
      <div className="takeaways">{module.takeaways.map((t) => <div className="takeaway" key={t}><p>{t}</p></div>)}</div>
    </div>
  )
}

function Worksheet({ module }) {
  const { notify } = useApp()
  const w = module.worksheet
  return (
    <div className="card download">
      <span className="file-ico">PDF</span>
      <div className="stack" style={{ gap: '.25rem' }}>
        <h4>{w.title}</h4>
        <p className="small muted">{w.pages} pages · {w.contents.join(' · ')}</p>
      </div>
      <button className="btn btn-primary" onClick={async () => {
        try { const r = await saveUrl(w.file, w.file.split('/').pop()); if (r === 'failed') notify('The download did not start. Please try again.') }
        catch { notify('The worksheet could not be loaded. Please try again.') }
      }}><Icon.download /> Download worksheet</button>
    </div>
  )
}

function References({ module }) {
  const { progress } = useApp()
  const ms = moduleState(progress, module.id)
  const reflections = Object.entries(ms.reflections || {}).filter(([, t]) => t?.trim())
  const refs = Object.values(module.references)
  return (
    <div className="stack" style={{ gap: '1.5rem' }}>
      {reflections.length > 0 && (
        <div className="stack" style={{ gap: '.6rem' }}>
          <h3>Your reflections</h3>
          <p className="small muted">Saved to your account. Copy them into the worksheet when you plan your next negotiation.</p>
          {reflections.map(([id, t]) => <p key={id} className="quote-block" style={{ font: '400 .95rem/1.5 var(--f-body)', whiteSpace: 'pre-wrap' }}>{t}</p>)}
        </div>
      )}
      <div className="stack" style={{ gap: '.6rem' }}>
        <h3>Sources</h3>
        <ol className="refs">
          {refs.map((r) => (
            <li key={r.text} data-added={r.added ? 'true' : undefined}>
              {r.text}{r.url && <> <a href={r.url} target="_blank" rel="noreferrer">{r.url.replace('https://', '')}</a></>}
              {r.added ? <span className="tag">Beyond the module</span> : <span className="tag">Module reference</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
