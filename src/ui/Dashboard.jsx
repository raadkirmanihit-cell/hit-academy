import { firstName } from '../platform/names.js'
import { useApp } from '../App.jsx'
import { courseStats, flatSteps, moduleStats } from '../platform/progress.js'
import { Icon } from './icons.jsx'
import { CoachTile, ArenaTile, TopUpCard } from '../coach/plan.jsx'
import { offers, MODULE_PRICE, BUNDLE_PRACTICE_MESSAGES, FREE_MODULES, euro } from '../content/pricing.js'
import { useState } from 'react'
import { pitch, moduleInside, previewBlock } from '../content/module-pitch.js'
import { Blocks } from './Blocks.jsx'
import { SelfEvalCard, selfEvalOf } from './SelfEval.jsx'
import { ReviewPanel } from './Reviews.jsx'

export default function Dashboard() {
  const { course, modules, user, progress, openModule, go, view, owned, launch, practice } = useApp()
  const o = offers(user.purchases, { launch: launch.launch })
  const stats = courseStats(course, modules, progress, practice)
  const last = progress.last && modules[progress.last.moduleId] && owned.has(progress.last.moduleId) ? progress.last : null
  const resumeModule = last ? modules[last.moduleId] : modules[course.modules.find((m) => owned.has(m.id) && modules[m.id])?.id] || modules.m1
  const resumeSteps = flatSteps(resumeModule)
  const resumeStep = resumeSteps.find((s) => s.id === last?.stepId) || resumeSteps[0]
  const rs = moduleStats(resumeModule, progress)
  const first = firstName(user)
  const [buying, setBuying] = useState(false)

  return (
    <div className="wrap dash">
      <div className="dash-head">
        <div className="stack dash-hello">
          <span className="eyebrow">My learning</span>
          <h1>{view.welcome ? `Welcome aboard, ${first}` : last ? `Welcome back, ${first}` : `Let's begin, ${first}`}</h1>
          <p className="muted">
            {stats.doneSteps} of {stats.totalSteps} sections completed · {stats.completeCount} of {course.modules.length} modules complete
          </p>
        </div>
        <div className="ring" style={{ '--p': stats.pctAll }} aria-label={`Course ${stats.pctAll}% complete`}>
          <div><span><strong className="tnum">{stats.pctAll}%</strong><br /><span className="small muted">course</span></span></div>
        </div>
      </div>

      <div className="stack dash-stack">
        <div className="card resume-card">
          <img src={resumeModule.cover} alt="" />
          <div className="resume-body">
            <span className="eyebrow">{rs.complete ? 'Completed' : last ? 'Continue where you left off' : 'Start here'} · Module {resumeModule.number}</span>
            <h2>{resumeModule.title}</h2>
            <p className="muted">{rs.complete ? 'Module complete. Review any section, or retake the quiz to improve your score.' : last ? <>Next up: <strong style={{ color: 'var(--ink)' }}>{resumeStep.title}</strong></> : resumeModule.subtitle}</p>
            <div className="row">
              <div className="bar" style={{ flex: 1, minWidth: 140 }}><span style={{ width: rs.pct + '%' }} /></div>
              <span className="small muted tnum">{rs.pct}%</span>
            </div>
            <div><button className="btn btn-primary" onClick={() => openModule(resumeModule.id, resumeStep.id)}>{rs.complete ? 'Review module' : last ? 'Resume' : 'Start module'} <Icon.play /></button></div>
          </div>
        </div>

        {!selfEvalOf(progress).before && <SelfEvalCard modulesOk={stats.modulesOk} />}
        <div className="premium-tiles">
          <CoachTile />
          <ArenaTile onOpen={() => go('practice')} onBuy={() => setBuying(true)} />
          <div className="card premium-tile tile-community">
            <div className="tile-top">
              <span className="coach-dot lg cm-dot" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3.2" /><circle cx="16.5" cy="10" r="2.6" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8M14.5 15c2.6-.4 5 1 5.8 4" /></svg></span>
              <span className="eyebrow">{owned.size > 1 ? 'Members' : 'Members only'}</span>
            </div>
            <h4>The community</h4>
            <p className="small muted">Share your wins, ask other members how they would handle a tough conversation, and find practice partners.</p>
            <div className="tile-actions">
              <button className="btn btn-sm" onClick={() => go('community')}>{owned.size > 1 ? 'Open the community' : 'See what is inside'}</button>
            </div>
          </div>
        </div>
        {buying && <TopUpCard onClose={() => setBuying(false)} />}

        {/* My courses: one block per course (banner, then its modules), so a second course simply adds another block. */}
        <div className="dash-section-title">
          <h2>My courses</h2>
        </div>

        <div className="stack">
          <CourseBanner course={course} stats={stats} owned={owned} />
          <div className="modules-label"><span>Course modules</span></div>
          {o.bundle && (
            <div className="card upgrade-card">
              <div>
                <strong>Unlock all 7 modules for {euro(o.bundle.price)}{o.bundle.launch && !o.bundle.credit ? ` (launch price, normally ${euro(o.bundle.regular)})` : ''}</strong>
                <p className="small muted">{o.bundle.credit ? `You pay only the difference: ${euro(o.bundle.full)} less ${euro(o.bundle.credit)} for what you already bought. ` : ''}Save {euro(o.bundle.saving)} compared with buying them one by one. Includes the Arena for AI role-plays ({BUNDLE_PRACTICE_MESSAGES} tokens, valid for a year) and the certificate.</p>
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
            {stats.practiceLevels.length > 0 && (() => {
              const n = stats.practicePassed.length, total = stats.practiceLevels.length, done = n >= total
              return (
                <div className={'module-row practice-row' + (done ? ' done' : '')}>
                  <span className="num">{done ? <Icon.check /> : <Icon.chat width="18" height="18" />}</span>
                  <div style={{ minWidth: 0 }}>
                    <span className="practice-row-step">Final step before your certificate</span>
                    <h4>The Arena</h4>
                    <p className="small muted"><strong>Put your skills to the test.</strong> Pass one AI role-play at each level ({stats.practiceLevels.join(', ')}).</p>
                    <div className="row small muted" style={{ marginTop: '.35rem' }}>
                      <div className="bar" style={{ width: 140 }}><span style={{ width: Math.round((n / total) * 100) + '%' }} /></div>
                      <span className="tnum">{n} of {total} levels</span>
                    </div>
                  </div>
                  <button className={'btn btn-sm' + (done ? '' : ' btn-primary')} onClick={() => go('practice')}>{done ? 'Review' : n > 0 ? 'Continue' : 'Start'}</button>
                </div>
              )
            })()}
          </div>
        </div>

        {selfEvalOf(progress).before && <SelfEvalCard modulesOk={stats.modulesOk} />}

        <div className="card cert-teaser">
          <Icon.award />
          <div>
            <h4>Certificate of completion</h4>
            <p className="small muted">
              {stats.eligible ? 'Your certificate is ready.' : <>
                {course.certificate.requires === 'all'
                  ? `Complete all ${course.modules.length} modules and pass each quiz (${stats.completeCount} of ${stats.required} done)`
                  : `Complete every released module and pass each quiz (${stats.completeCount} of ${stats.required} done)`}
                {stats.practiceLevels.length > 0 && `, and pass one Arena role-play at each level: ${stats.practiceLevels.join(', ')} (${stats.practicePassed.length} of ${stats.practiceLevels.length} done)`}.
              </>}
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

        <ReviewPanel embedded />
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
            <ul className="pitch-inside small muted">{inside.usp.map((t) => <li key={t} className="usp">{t}</li>)}{inside.core.map((t) => <li key={t}>{t}</li>)}</ul>
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

// The course's own banner on the dashboard: name, tagline and progress.
function CourseBanner({ course, stats, owned }) {
  const name = course.displayName || course.title
  const [first, ...rest] = name.split(' & ')
  const total = course.modules.length
  const unlocked = course.modules.filter((m) => owned.has(m.id)).length
  return (
    <div className="course-banner">
      <div className="course-banner-text">
        <span className="course-banner-eyebrow">Course · Self-paced · {total} modules</span>
        <h2>{rest.length ? <>{first} <span className="amp">&amp;</span> {rest.join(' & ')}</> : name}</h2>
        <p>{course.tagline}</p>
        <div className="course-banner-stats">
          <span><strong className="tnum">{stats.completeCount}</strong> of {total} modules complete</span>
          <span><strong className="tnum">{unlocked}</strong> unlocked</span>
          <span>Certificate of completion</span>
        </div>
      </div>
      <div className="ring course-banner-ring" style={{ '--p': stats.pctAll }} aria-label={`${name}: ${stats.pctAll}% complete`}>
        <div><span><strong className="tnum">{stats.pctAll}%</strong><br /><span className="small">done</span></span></div>
      </div>
    </div>
  )
}
