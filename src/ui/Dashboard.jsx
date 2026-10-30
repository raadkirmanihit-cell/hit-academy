import { useApp } from '../App.jsx'
import { courseStats, flatSteps, moduleStats } from '../platform/progress.js'
import { Icon } from './icons.jsx'
import { CoachTeaser } from '../coach/Coach.jsx'
import { CoachPlanCard } from '../coach/plan.jsx'
import { offers, MODULE_PRICE, BUNDLE_COACH_MONTHS, FREE_MODULES, euro } from '../content/pricing.js'
import { useState } from 'react'
import { pitch, moduleInside, previewBlock } from '../content/module-pitch.js'
import { Blocks } from './Blocks.jsx'

export default function Dashboard() {
  const { course, modules, user, progress, openModule, go, view, owned, launch } = useApp()
  const o = offers(user.purchases, { launch: launch.launch })
  const stats = courseStats(course, modules, progress)
  const last = progress.last && modules[progress.last.moduleId] && owned.has(progress.last.moduleId) ? progress.last : null
  const resumeModule = last ? modules[last.moduleId] : modules[course.modules.find((m) => owned.has(m.id) && modules[m.id])?.id] || modules.m1
  const resumeSteps = flatSteps(resumeModule)
  const resumeStep = resumeSteps.find((s) => s.id === last?.stepId) || resumeSteps[0]
  const rs = moduleStats(resumeModule, progress)
  const first = user.name.split(' ')[0]

  return (
    <div className="wrap" style={{ paddingBottom: '4rem' }}>
      <div className="dash-head">
        <div className="stack" style={{ gap: '.5rem' }}>
          <span className="eyebrow">My learning</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>{view.welcome ? `Welcome aboard, ${first}` : last ? `Welcome back, ${first}` : `Let's begin, ${first}`}</h1>
          <p className="muted">
            {stats.doneSteps} of {stats.totalSteps} sections completed · {stats.completeCount} of {course.modules.length} modules complete
          </p>
        </div>
        <div className="ring" style={{ '--p': stats.pctAll }} aria-label={`Course ${stats.pctAll}% complete`}>
          <div><span><strong className="tnum">{stats.pctAll}%</strong><br /><span className="small muted">course</span></span></div>
        </div>
      </div>

      <div className="stack" style={{ gap: '2rem' }}>
        <div className="card resume-card">
          <img src={resumeModule.cover} alt="" />
          <div className="resume-body">
            <span className="eyebrow">{rs.complete ? 'Completed' : last ? 'Continue where you left off' : 'Start here'} · Module {resumeModule.number}</span>
            <h2 style={{ fontSize: '1.6rem' }}>{resumeModule.title}</h2>
            <p className="muted">{rs.complete ? 'Module complete. Review any section, or retake the quiz to improve your score.' : last ? <>Next up: <strong style={{ color: 'var(--ink)' }}>{resumeStep.title}</strong></> : resumeModule.subtitle}</p>
            <div className="row">
              <div className="bar" style={{ flex: 1, minWidth: 140 }}><span style={{ width: rs.pct + '%' }} /></div>
              <span className="small muted tnum">{rs.pct}%</span>
            </div>
            <div><button className="btn btn-primary" onClick={() => openModule(resumeModule.id, resumeStep.id)}>{rs.complete ? 'Review module' : last ? 'Resume' : 'Start module'} <Icon.play /></button></div>
          </div>
        </div>

        <CoachTeaser />
        <CoachPlanCard />

        <div className="stack">
          <h3>Course modules</h3>
          {o.bundle && (
            <div className="card upgrade-card">
              <div>
                <strong>Unlock all 7 modules for {euro(o.bundle.price)}{o.bundle.launch && !o.bundle.credit ? ` (launch price, normally ${euro(o.bundle.regular)})` : ''}</strong>
                <p className="small muted">{o.bundle.credit ? `You pay only the difference: ${euro(o.bundle.full)} less ${euro(o.bundle.credit)} for the modules you bought. ` : ''}Save {euro(o.bundle.saving)} compared with buying them one by one. Includes {BUNDLE_COACH_MONTHS} months of the AI coach and the certificate.</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => go('checkout', { choice: 'bundle' })}>Unlock all</button>
            </div>
          )}
          <div className="module-list">
            {course.modules.map((m) => {
              const mod = modules[m.id]
              const s = mod ? moduleStats(mod, progress) : null
              return (
                <div key={m.id} className={'module-row' + (!mod || !owned.has(m.id) ? ' locked' : '') + (s?.complete ? ' done' : '')}>
                  <span className="num">{s?.complete ? <Icon.check /> : m.number}</span>
                  <div style={{ minWidth: 0 }}>
                    <h4>{m.title}</h4>
                    <p className="small muted">{m.subtitle}</p>
                    {FREE_MODULES.includes(m.id) && !s?.done && pitch[m.id] && <p className="pitch-identity small">{pitch[m.id].identity} <span className="pill good">Free</span></p>}
                    {s && (owned.has(m.id) || s.pct > 0) && <div className="row small muted" style={{ marginTop: '.35rem' }}>
                      <div className="bar" style={{ width: 140 }}><span style={{ width: s.pct + '%' }} /></div>
                      <span className="tnum">{s.pct}%</span>
                      {s.best != null && <span className="tnum">· Quiz best {Math.round(s.best * 100)}%</span>}
                    </div>}
                  </div>
                  {FREE_MODULES.includes(m.id) && !s?.done && o.remaining.length > 0 ? (
                    <button className="btn btn-sm btn-primary" onClick={() => openModule(m.id)}>Start free</button>
                  ) : mod && !owned.has(m.id) && pitch[m.id] ? (
                    <span className="pill"><Icon.lock width="12" height="12" /> {euro(MODULE_PRICE)}</span>
                  ) : mod && !owned.has(m.id) ? (
                    <button className="btn btn-sm" onClick={() => go('checkout', { choice: m.id })}><Icon.lock width="12" height="12" /> Unlock · {euro(MODULE_PRICE)}</button>
                  ) : mod ? (
                    <button className="btn btn-sm" onClick={() => openModule(m.id)}>{s.complete ? 'Review' : s.done ? 'Continue' : 'Start'}</button>
                  ) : (
                    <span className="pill"><Icon.lock width="12" height="12" /> Coming soon</span>
                  )}
                  {mod && !owned.has(m.id) && pitch[m.id] && <ModulePitch mod={mod} onUnlock={() => go('checkout', { choice: m.id })} />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="card cert-teaser">
          <Icon.award />
          <div>
            <h4>Certificate of completion</h4>
            <p className="small muted">
              {stats.eligible ? 'Your certificate is ready.' : course.certificate.requires === 'all'
                ? `Complete all ${course.modules.length} modules and pass each quiz to earn it.`
                : `Complete every released module and pass each quiz to earn it (${stats.completeCount} of ${stats.required} done).`}
            </p>
          </div>
          <button className={'btn ' + (stats.eligible ? 'btn-primary' : '')} onClick={() => go('certificate')}>{stats.eligible ? 'View certificate' : 'Preview'}</button>
        </div>

        <div className="card cert-teaser">
          <span style={{ color: 'var(--orange)' }}><Icon.chat width="40" height="40" /></span>
          <div>
            <h4>Questions along the way?</h4>
            <p className="small muted">Send Raad a message about the course or a negotiation you're preparing. He replies by email.</p>
          </div>
          <button className="btn" onClick={() => go('contact')}>Message Raad</button>
        </div>
      </div>
    </div>
  )
}

// The sales panel under a locked module: who you'll become, three skills, where you'll use it,
// what's inside, and one exercise to try for free.
function ModulePitch({ mod, onUnlock }) {
  const p = pitch[mod.id]
  const inside = moduleInside(mod)
  const pv = previewBlock(mod)
  const [open, setOpen] = useState(false)
  return (
    <div className="pitch">
      <p className="pitch-identity">{p.identity}</p>
      <div className="pitch-grid">
        <div>
          <span className="eyebrow">You'll be able to</span>
          <ul className="pitch-skills">{p.skills.map((t) => <li key={t}><Icon.check width="14" height="14" /> {t}</li>)}</ul>
        </div>
        <div className="stack" style={{ gap: '.9rem' }}>
          <div>
            <span className="eyebrow">Where you'll use it</span>
            <div className="pitch-tags">{p.useIt.map((t) => <span key={t} className="pill orange">{t}</span>)}</div>
          </div>
          <div>
            <span className="eyebrow">What's inside</span>
            <ul className="pitch-inside small muted">{inside.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </div>
      <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-sm" onClick={onUnlock}>Unlock Module {mod.number} · {euro(MODULE_PRICE)}</button>
        {pv && <button className="btn btn-sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close the preview' : `${pv.label} (free)`}</button>}
      </div>
      {pv && open && (
        <div className="pitch-preview fade-in">
          <span className="eyebrow">Free preview · Lesson {pv.lesson}</span>
          {pv.note && <p className="small muted">{pv.note}</p>}
          <Blocks blocks={[pv.block]} module={mod} step={pv.step} />
          <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="small muted">Liked it? The whole module works like this.</span>
            <button className="btn btn-primary btn-sm" onClick={onUnlock}>Unlock · {euro(MODULE_PRICE)}</button>
          </div>
        </div>
      )}
    </div>
  )
}
