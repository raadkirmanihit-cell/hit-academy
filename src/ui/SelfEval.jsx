import { useState } from 'react'
import { useApp } from '../App.jsx'
import { courseStats } from '../platform/progress.js'
import { AREAS, QUESTIONS, SCALE, summarise } from '../content/self-eval.js'
import { Icon } from './icons.jsx'

// The course self-evaluation: 20 statements rated 1 to 5, once before Module 1 and again after all 7 modules.
// Saved in progress.selfEval = { before: { answers, at }, after: { answers, at }, skippedAt }.

export const selfEvalOf = (progress) => progress.selfEval || {}

// Should opening a module first show the "before" survey? Only for students who haven't started yet.
export function needsBeforeGate(progress) {
  const se = selfEvalOf(progress)
  if (se.before || se.skippedAt) return false
  return !Object.values(progress.modules || {}).some((m) => Object.keys(m.done || {}).length > 0)
}

const fmt = (x) => (x == null ? '–' : x.toFixed(1))
const dateOf = (iso) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

// phase: 'before' | 'after' | 'results'. gate: shown in front of a module the student just opened.
export default function SelfEvalPage({ phase = 'results', gate = null }) {
  const { progress, go, course, modules, practice } = useApp()
  const se = selfEvalOf(progress)
  const stats = courseStats(course, modules, progress, practice)
  if (phase === 'before' || phase === 'after') {
    if (phase === 'after' && !stats.modulesOk) return <Locked stats={stats} />
    return <Survey phase={phase} gate={gate} key={phase} />
  }
  if (!se.before && !se.after) return <Survey phase="before" />
  return (
    <div className="wrap se-wrap">
      <div className="se-head">
        <div className="stack" style={{ gap: '.4rem' }}>
          <span className="eyebrow">Self-evaluation</span>
          <h1>{se.after ? 'How far you have come' : 'Your starting point'}</h1>
          <p className="muted">{se.after
            ? `Your own ratings at the start (${dateOf(se.before?.at) || 'not taken'}) and after finishing the course (${dateOf(se.after.at)}).`
            : `Your ratings from ${dateOf(se.before.at)}. You rate yourself again after finishing all ${course.modules.length} modules, and this chart then shows the change.`}</p>
        </div>
        <div className="row">
          <button className="btn" onClick={() => go('dashboard')}><Icon.arrowL /> Dashboard</button>
          {stats.modulesOk && !se.after && <button className="btn btn-primary" onClick={() => go('selfeval', { phase: 'after' })}>Rate yourself again</button>}
        </div>
      </div>
      <EvalChart before={se.before?.answers} after={se.after?.answers} />
      <AnswerList before={se.before?.answers} after={se.after?.answers} />
      <div className="row">
        {se.before && !se.after && <button className="btn btn-sm" onClick={() => go('selfeval', { phase: 'before' })}>Change my starting answers</button>}
        {se.after && <button className="btn btn-sm" onClick={() => go('selfeval', { phase: 'after' })}>Change my final answers</button>}
      </div>
    </div>
  )
}

function Locked({ stats }) {
  const { go, course } = useApp()
  return (
    <div className="wrap se-wrap">
      <div className="card se-locked">
        <Icon.lock width="28" height="28" />
        <h2>Unlocks when you finish the course</h2>
        <p className="muted">You rate yourself again once all {course.modules.length} modules are complete ({stats.completeCount} of {stats.required} done). Then you'll see your before and after side by side.</p>
        <div className="row" style={{ justifyContent: 'center' }}><button className="btn" onClick={() => go('dashboard')}><Icon.arrowL /> Dashboard</button></div>
      </div>
    </div>
  )
}

function Survey({ phase, gate }) {
  const { progress, go, notify, saveSelfEval, skipSelfEval } = useApp()
  const se = selfEvalOf(progress)
  const [vals, setVals] = useState(se[phase]?.answers || {})
  const answered = QUESTIONS.filter((q) => vals[q.id]).length
  const complete = answered === QUESTIONS.length
  const after = phase === 'after'

  const leave = () => (gate ? go('module', gate, { replace: true }) : go('dashboard'))
  function submit() {
    saveSelfEval(phase, vals)
    if (after) go('selfeval', { phase: 'results' }, { replace: true })
    else { notify('Saved. You\'ll rate yourself again at the end of the course.'); leave() }
  }
  function skip() { skipSelfEval(); leave() }

  let n = 0
  return (
    <div className="wrap se-wrap">
      <div className="se-intro card">
        <span className="eyebrow">Self-evaluation · {after ? 'after the course' : 'before you start'}</span>
        <h1>{after ? 'Rate your skills again' : 'Where do you stand today?'}</h1>
        <p>{after
          ? 'Same 20 statements as at the start. Answer for how you work now, not how you remember your first answers. Then you\'ll see your before and after side by side.'
          : 'Be honest. There are no right answers. This is a snapshot of how you see your skills today, so you can see how far you have come at the end of the course.'}</p>
        <p className="small muted">Rate each statement from 1 to 5. It takes about 5 minutes. Only you can see your answers, and they don't affect your certificate.</p>
        <ol className="se-scale" aria-label="Rating scale">{[1, 2, 3, 4, 5].map((v) => <li key={v}><b>{v}</b> {SCALE[v]}</li>)}</ol>
      </div>

      {AREAS.map((a, ai) => (
        <section key={a.id} className="card se-area" aria-labelledby={`se-${a.id}`}>
          <div className="se-area-head">
            <span className="se-area-num">{ai + 1}</span>
            <h3 id={`se-${a.id}`}>{a.title}</h3>
          </div>
          {QUESTIONS.filter((q) => q.area === a.id).map((q) => {
            n += 1
            return (
              <div key={q.id} className="se-q">
                <span id={`se-${q.id}`}><span className="se-qn tnum">{n}.</span> {q.text}</span>
                <div className="conf-scale" role="radiogroup" aria-labelledby={`se-${q.id}`}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button key={v} type="button" role="radio" aria-checked={vals[q.id] === v} title={SCALE[v]} aria-label={`${v}: ${SCALE[v]}`}
                      className={'conf-dot' + (vals[q.id] === v ? ' on' : '')} onClick={() => setVals((x) => ({ ...x, [q.id]: v }))}>{v}</button>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      ))}

      <div className="card se-submit">
        <span className="small muted tnum">{answered} of {QUESTIONS.length} answered</span>
        <div className="bar" style={{ flex: 1, minWidth: 120 }}><span style={{ width: (answered / QUESTIONS.length) * 100 + '%' }} /></div>
        <div className="row">
          {gate && !after && <button className="btn" onClick={skip}>Skip for now</button>}
          {!gate && <button className="btn" onClick={leave}>Cancel</button>}
          <button className="btn btn-primary" disabled={!complete} onClick={submit}>{after ? 'See my before and after' : gate ? 'Save and start the module' : 'Save my answers'}</button>
        </div>
      </div>
    </div>
  )
}

// The final evaluation chart: average rating per skill area, before (navy) vs after (orange).
export function EvalChart({ before, after, compact = false }) {
  const b = summarise(before), a = summarise(after)
  const both = before && after
  const changes = both ? a.areas.map((x, i) => ({ ...x, d: (x.avg ?? 0) - (b.areas[i].avg ?? 0) })) : []
  const top = changes.filter((x) => x.d > 0).sort((x, y) => y.d - x.d).slice(0, 3)
  const overallD = both ? a.overall - b.overall : null
  return (
    <div className={'card se-chart' + (compact ? ' compact' : '')}>
      <div className="se-chart-top">
        <div className="se-legend" aria-hidden="true">
          {before && <span><i className="sw before" /> Before the course</span>}
          {after && <span><i className="sw after" /> After the course</span>}
        </div>
        <div className="se-overall">
          {before && <div><span className="small muted">Start</span><strong className="tnum">{fmt(b.overall)}</strong></div>}
          {after && <div><span className="small muted">Now</span><strong className="tnum">{fmt(a.overall)}</strong></div>}
          {both && <div className={'se-delta' + (overallD > 0.05 ? ' up' : overallD < -0.05 ? ' down' : '')}><span className="small muted">Change</span><strong className="tnum">{overallD > 0 ? '+' : ''}{overallD.toFixed(1)}</strong></div>}
        </div>
      </div>
      <div className="se-bars" role="img" aria-label={AREAS.map((x, i) => `${x.short}: ${before ? 'before ' + fmt(b.areas[i].avg) : ''}${after ? ', after ' + fmt(a.areas[i].avg) : ''}`).join('; ')}>
        <div className="se-axis" aria-hidden="true"><span /><div>{[1, 2, 3, 4, 5].map((v) => <em key={v} style={{ left: `${(v / 5) * 100}%` }}>{v}</em>)}</div></div>
        {AREAS.map((x, i) => (
          <div key={x.id} className="se-bar-row">
            <span className="se-bar-label">{x.short}</span>
            <div className="se-bar-track">
              {before && <div className="se-bar before" style={{ width: ((b.areas[i].avg || 0) / 5) * 100 + '%' }}><em className="tnum">{fmt(b.areas[i].avg)}</em></div>}
              {after && <div className="se-bar after" style={{ width: ((a.areas[i].avg || 0) / 5) * 100 + '%' }}><em className="tnum">{fmt(a.areas[i].avg)}</em></div>}
            </div>
          </div>
        ))}
      </div>
      {both && (
        <p className="feedback neutral">
          {top.length
            ? <><b>Your biggest growth: {top.map((x) => `${x.short} (+${x.d.toFixed(1)})`).join(', ')}.</b><span>These are your own ratings. Keep the momentum: use the planner before your next real negotiation, and step into the Arena to test the areas you rated lowest.</span></>
            : <><b>Your ratings are about where they started.</b><span>That's useful to know. Revisit the lessons for your lowest-rated area, or test yourself in the Arena.</span></>}
        </p>
      )}
    </div>
  )
}

function AnswerList({ before = {}, after }) {
  return (
    <details className="card se-list">
      <summary>See all 20 answers</summary>
      <div className="conf-list">
        {QUESTIONS.map((q, i) => {
          const b = before[q.id] || 0, a = after?.[q.id] || 0, d = a - b
          return (
            <div key={q.id} className="conf-compare">
              <span><span className="se-qn tnum">{i + 1}.</span> {q.text}</span>
              <div className="conf-bars" aria-label={`Before ${b || 'not rated'}${after ? `, after ${a}` : ''} of 5`}>
                <div className="conf-bar before se"><span style={{ width: (b / 5) * 100 + '%' }} /><em>Before {b || '–'}</em></div>
                {after && <div className="conf-bar after"><span style={{ width: (a / 5) * 100 + '%' }} /><em>After {a}</em></div>}
              </div>
              <strong className={'conf-delta tnum' + (d > 0 ? ' up' : d < 0 ? ' down' : '')}>{after && b ? (d > 0 ? '+' + d : d) : ''}</strong>
            </div>
          )
        })}
      </div>
    </details>
  )
}

// Dashboard card: the next self-evaluation step for this student.
export function SelfEvalCard({ modulesOk }) {
  const { progress, go } = useApp()
  const se = selfEvalOf(progress)
  let title, text, label, phase, primary = false
  if (!se.before) {
    title = 'Rate your starting point'; phase = 'before'; label = 'Start (5 min)'; primary = true
    text = '20 quick statements about how you negotiate today. You answer the same ones at the end of the course and see how far you have come.'
  } else if (modulesOk && !se.after) {
    title = 'Rate your skills again'; phase = 'after'; label = 'Rate again'; primary = true
    text = 'You finished all the modules. Answer the same 20 statements and see your before and after side by side.'
  } else if (se.after) {
    title = 'Your before and after'; phase = 'results'; label = 'See my chart'
    text = 'Your own ratings at the start of the course next to your ratings at the end.'
  } else {
    title = 'Self-evaluation'; phase = 'results'; label = 'View'
    text = 'Your starting point is saved. You rate yourself again after finishing all modules.'
  }
  return (
    <div className="card cert-teaser">
      <span style={{ color: 'var(--orange)' }}><Icon.target width="40" height="40" /></span>
      <div>
        <h4>{title}</h4>
        <p className="small muted">{text}</p>
      </div>
      <button className={'btn' + (primary ? ' btn-primary' : '')} onClick={() => go('selfeval', { phase })}>{label}</button>
    </div>
  )
}
