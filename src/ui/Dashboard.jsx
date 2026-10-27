import { useApp } from '../App.jsx'
import { courseStats, flatSteps, moduleStats } from '../platform/progress.js'
import { Icon } from './icons.jsx'
import { CoachTeaser } from '../coach/Coach.jsx'

export default function Dashboard() {
  const { course, modules, user, progress, openModule, go, view } = useApp()
  const stats = courseStats(course, modules, progress)
  const last = progress.last && modules[progress.last.moduleId] ? progress.last : null
  const resumeModule = last ? modules[last.moduleId] : modules.m1
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

        <div className="stack">
          <h3>Course modules</h3>
          <div className="module-list">
            {course.modules.map((m) => {
              const mod = modules[m.id]
              const s = mod ? moduleStats(mod, progress) : null
              return (
                <div key={m.id} className={'module-row' + (!mod ? ' locked' : '') + (s?.complete ? ' done' : '')}>
                  <span className="num">{s?.complete ? <Icon.check /> : m.number}</span>
                  <div style={{ minWidth: 0 }}>
                    <h4>{m.title}</h4>
                    <p className="small muted">{m.subtitle}</p>
                    {s && <div className="row small muted" style={{ marginTop: '.35rem' }}>
                      <div className="bar" style={{ width: 140 }}><span style={{ width: s.pct + '%' }} /></div>
                      <span className="tnum">{s.pct}%</span>
                      {s.best != null && <span className="tnum">· Quiz best {Math.round(s.best * 100)}%</span>}
                    </div>}
                  </div>
                  {mod ? (
                    <button className="btn btn-sm" onClick={() => openModule(m.id)}>{s.complete ? 'Review' : s.done ? 'Continue' : 'Start'}</button>
                  ) : (
                    <span className="pill"><Icon.lock width="12" height="12" /> Coming soon</span>
                  )}
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
