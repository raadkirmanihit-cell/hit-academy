import { useEffect, useMemo, useState } from 'react'
import { useApp } from '../App.jsx'
import { flatSteps, moduleState, moduleStats, courseStats } from '../platform/progress.js'
import { Blocks } from './Blocks.jsx'
import { Icon } from './icons.jsx'

const kindLabel = { overview: '', quiz: 'Quiz', takeaways: '', resources: 'PDF' }

export default function Player({ module, initialStep }) {
  const { progress, markDone, visit, go, completeModule, notify } = useApp()
  const steps = useMemo(() => flatSteps(module), [module])
  const ms = moduleState(progress, module.id)
  const firstOpen = steps.find((s) => !ms.done[s.id])?.id
  const [stepId, setStepId] = useState(() => (steps.some((s) => s.id === initialStep) ? initialStep : (progress.last?.moduleId === module.id && progress.last.stepId) || firstOpen || steps[0].id))
  const [railOpen, setRailOpen] = useState(false)
  const [finished, setFinished] = useState(false)
  const idx = Math.max(0, steps.findIndex((s) => s.id === stepId))
  const step = steps[idx]
  const stats = moduleStats(module, progress)

  useEffect(() => { visit(module.id, step.id); window.scrollTo({ top: 0 }) }, [step.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Leaving a section (by Next, Back or the outline) counts as having read it. The quiz counts only when passed.
  const goTo = (id) => { if (step.kind !== 'quiz' && id !== step.id) markDone(module.id, step.id); setStepId(id); setRailOpen(false); setFinished(false) }
  const next = () => {
    if (idx < steps.length - 1) goTo(steps[idx + 1].id)
    else finish()
  }
  const finish = () => {
    markDone(module.id, step.id)
    const missing = steps.filter((s) => s.id !== step.id && !ms.done[s.id])
    if (!ms.quiz?.passed) { notify('Pass the quiz to complete this module.'); goTo('quiz'); return }
    if (missing.length) { notify(`${missing.length} section${missing.length > 1 ? 's' : ''} still to visit. They're marked in the outline.`); return }
    completeModule(module.id)
    setFinished(true)
    window.scrollTo({ top: 0 })
  }

  const sections = module.sections
  return (
    <div className="player">
      <aside className={'rail' + (railOpen ? ' open' : '')} aria-label="Module outline">
        <span className="eyebrow">Module {module.number}</span>
        <h4 style={{ marginTop: '.3rem' }}>{module.title}</h4>
        <div className="module-progress">
          <div className="bar"><span style={{ width: stats.pct + '%' }} /></div>
          <span className="small muted tnum">{stats.done} of {stats.total} sections · {stats.pct}%</span>
        </div>
        {sections.map((sec) => (
          <div className="rail-group" key={sec.id}>
            <span className="eyebrow">{sec.title}</span>
            {sec.steps.map((s) => (
              <button key={s.id} className={'rail-item' + (s.id === step.id ? ' active' : '') + (ms.done[s.id] ? ' done' : '')} onClick={() => goTo(s.id)} aria-current={s.id === step.id ? 'step' : undefined}>
                <span className="rail-dot" />
                <span>{s.title}{kindLabel[s.kind] ? <span className="rail-kind">{kindLabel[s.kind]}</span> : null}</span>
              </button>
            ))}
          </div>
        ))}
        <div style={{ marginTop: '1.5rem' }}><button className="btn btn-sm" onClick={() => go('dashboard')}><Icon.arrowL /> Dashboard</button></div>
      </aside>

      <section className="stage">
        <div className="stage-inner">
          <div className="row mobile-outline" style={{ justifyContent: 'space-between' }}>
            <button className="btn btn-sm" onClick={() => setRailOpen((o) => !o)} aria-expanded={railOpen}>{railOpen ? <Icon.close /> : <Icon.menu />} Outline</button>
            <span className="small muted tnum">{idx + 1} / {steps.length} · {stats.pct}%</span>
          </div>

          {finished ? <Finished module={module} /> : (
            <>
              <div className="step-head fade-in" key={step.id + '-h'}>
                <span className="eyebrow">Module {module.number} · {step.sectionTitle}</span>
                <h1 style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)' }}>{step.kind === 'overview' ? module.title : step.title}</h1>
              </div>
              <div className="stack fade-in" key={step.id} style={{ gap: '1.5rem' }}>
                <Blocks blocks={step.blocks} module={module} step={step} />
              </div>
              <nav className="step-nav" aria-label="Step navigation">
                <button className="btn" onClick={() => goTo(steps[idx - 1].id)} disabled={idx === 0}><Icon.arrowL /> Back</button>
                <button className="btn btn-primary" onClick={next}>
                  {idx === steps.length - 1 ? 'Finish module' : step.kind === 'overview' ? 'Start lesson 1' : 'Next'} <Icon.arrowR />
                </button>
              </nav>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function Finished({ module }) {
  const { go, course, modules, progress } = useApp()
  const ms = moduleState(progress, module.id)
  const nextMod = course.modules.find((m) => m.number === module.number + 1)
  const eligible = courseStats(course, modules, progress).eligible
  // An earlier released module the learner hasn't finished yet.
  const unfinished = course.modules.find((m) => modules[m.id] && m.id !== module.id && !moduleStats(modules[m.id], progress).complete)
  return (
    <div className="card celebrate" style={{ padding: '2.5rem', display: 'grid', gap: '1.2rem', justifyItems: 'center', textAlign: 'center' }}>
      <Icon.award width="72" height="72" />
      <span className="eyebrow">Module {module.number} complete</span>
      <h2>Well done. You've finished {module.title}.</h2>
      <p className="muted" style={{ maxWidth: '52ch' }}>Quiz score: <strong className="tnum">{Math.round((ms.quiz?.best || 0) * 100)}%</strong>. Download the worksheet and use it to plan your next real negotiation.</p>
      <div className="row" style={{ justifyContent: 'center' }}>
        {eligible && <button className="btn btn-primary" onClick={() => go('certificate')}>View certificate</button>}
        {!eligible && unfinished && <button className="btn btn-primary" onClick={() => go('module', { moduleId: unfinished.id })}>Go to Module {unfinished.number}: {unfinished.title}</button>}
        <button className="btn" onClick={() => go('dashboard')}>Back to dashboard</button>
      </div>
      {nextMod && modules[nextMod.id] && nextMod.id !== unfinished?.id && <button className="btn btn-dark" onClick={() => go('module', { moduleId: nextMod.id })}>Start Module {nextMod.number}: {nextMod.title}</button>}
      {nextMod && !modules[nextMod.id] && <p className="small muted">Next up: Module {nextMod.number}, {nextMod.title}. We'll let you know when it's released.</p>}
    </div>
  )
}
