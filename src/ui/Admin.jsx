import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useApp } from '../App.jsx'
import { backend } from '../platform/backend.js'
import { flatSteps } from '../platform/progress.js'
import { scenarios as SCENARIOS } from '../coach/scenarios.js'
import { SKILLS, LEVELS, band } from '../coach/scoring.js'
import { REMOVAL_REASONS } from '../content/forum.js'
import { REJECT_REASONS } from '../content/reviews.js'

const date = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '–')
const dateTime = (d) => (d ? new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–')
const money = (cents, cur = 'eur') => new Intl.NumberFormat('en-IE', { style: 'currency', currency: String(cur || 'eur').toUpperCase() }).format((cents || 0) / 100)
const monthKey = (d) => d.slice(0, 7)
const monthName = (k) => new Date(`${k}-01T00:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

function downloadCsv(name, head, rows) {
  const lines = rows.map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' }))
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
}

// Raad's control board: overview, students and their progress, payments and refunds, messages.
export default function AdminPage() {
  const { notify } = useApp()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const [tab, setTab] = useState('overview')
  const load = useCallback(() => backend.adminData().then(setData, (e) => setErr(e.message)), [])
  useEffect(() => { load() }, [load])

  async function act(action, payload, done) {
    try { await backend.adminAction(action, payload); if (done) notify(done); await load() } catch (e) { notify(e.message, 5000) }
  }

  if (err) return <div className="wrap" style={{ paddingBlock: '2rem' }}><p className="error">{err}</p></div>
  if (!data) return <div className="boot"><span className="boot-dot" /></div>
  const unread = data.messages.filter((m) => !m.read_at).length

  return (
    <div className="wrap stack" style={{ gap: '1.5rem', paddingBlock: '2rem' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'end' }}>
        <div className="stack" style={{ gap: '.3rem' }}>
          <span className="eyebrow">Admin</span>
          <h1>Control board</h1>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { setData(null); load() }}>Refresh</button>
      </div>
      <div className="tabs" role="tablist">
        {[['overview', 'Overview'], ['students', `Students (${data.students.length})`], ['payments', 'Payments & refunds'], ['coach', 'AI coach'], ['practice', 'The Arena'], ['community', 'Community'], ['reviews', 'Reviews'], ['messages', `Messages${unread ? ` (${unread} new)` : ''}`]].map(([id, label]) => (
          <button key={id} className="tab" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      {tab === 'overview' && <Overview data={data} unread={unread} setTab={setTab} />}
      {tab === 'students' && <Students data={data} act={act} />}
      {tab === 'payments' && <Payments data={data} act={act} />}
      {tab === 'coach' && <CoachSubs data={data} />}
      {tab === 'practice' && <Practice data={data} />}
      {tab === 'community' && <CommunityAdmin />}
      {tab === 'reviews' && <ReviewsAdmin notify={notify} />}
      {tab === 'messages' && <Messages data={data} act={act} />}
    </div>
  )
}

function Overview({ data, unread, setTab }) {
  const { students, payments } = data
  const live = payments.filter((p) => p.live)
  const testCount = payments.length - live.length
  const paidStudents = students.filter((s) => s.paidAt).length
  const gross = live.reduce((a, p) => a + (p.amount || 0), 0)
  const refunded = live.filter((p) => p.status === 'refunded').reduce((a, p) => a + (p.amount || 0), 0)
  const finished = students.filter((s) => s.modulesCompleted >= 7).length
  const active7 = students.filter((s) => s.lastActive && Date.now() - new Date(s.lastActive) < 7 * 864e5).length
  const since30 = students.filter((s) => Date.now() - new Date(s.registered) < 30 * 864e5).length

  const months = useMemo(() => {
    const m = new Map()
    for (const p of live) {
      const k = monthKey(p.paidAt)
      const r = m.get(k) || { sales: 0, gross: 0, refunds: 0 }
      r.sales += 1; r.gross += p.amount || 0
      if (p.status === 'refunded') r.refunds += p.amount || 0
      m.set(k, r)
    }
    return [...m.entries()].sort((a, b) => b[0].localeCompare(a[0]))
  }, [live])

  return (
    <div className="stack" style={{ gap: '1.5rem' }}>
      <div className="admin-stats">
        <Stat label="Revenue (after refunds)" value={money(gross - refunded)} />
        <Stat label="Sales" value={live.length} />
        <Stat label="Refunded" value={money(refunded)} />
        <Stat label="Registered" value={students.length} sub={`${since30} in the last 30 days`} />
        <Stat label="Paid students" value={paidStudents} sub={students.length ? `${Math.round((paidStudents / students.length) * 100)}% of registered` : ''} />
        <Stat label="Active this week" value={active7} />
        <Stat label="Finished all 7 modules" value={finished} />
        <button className="card admin-stat-btn" onClick={() => setTab('coach')}><span className="small muted">AI coach subscribers</span><strong className="tnum">{(data.coach?.subscriptions || []).filter((c) => c.live && ACTIVE.has(c.status)).length}</strong></button>
        <button className="card admin-stat-btn" onClick={() => setTab('messages')}><span className="small muted">New messages</span><strong>{unread}</strong></button>
      </div>
      <p className="small muted">Revenue here is course sales only; AI coach subscriptions are on the AI coach tab. It counts real payments only, before Stripe's fees.{testCount ? ` ${testCount} test payment${testCount > 1 ? 's are' : ' is'} left out.` : ''}</p>
      <div className="stack" style={{ gap: '.6rem' }}>
        <h3>Revenue by month</h3>
        <div className="card admin-scroll" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead><tr><th>Month</th><th>Sales</th><th>Earned</th><th>Refunded</th><th>Net</th></tr></thead>
            <tbody>
              {months.map(([k, r]) => (
                <tr key={k}><td>{monthName(k)}</td><td className="tnum">{r.sales}</td><td className="tnum">{money(r.gross)}</td><td className="tnum">{money(r.refunds)}</td><td className="tnum"><b>{money(r.gross - r.refunds)}</b></td></tr>
              ))}
              {!months.length && <tr><td colSpan={5} className="muted">No real payments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, sub }) {
  return <div className="card"><span className="small muted">{label}</span><strong className="tnum">{value}</strong>{sub && <span className="small muted">{sub}</span>}</div>
}

function Students({ data, act }) {
  const { course, modules } = useApp()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const rows = data.students
    .filter((r) => `${r.name} ${r.email}`.toLowerCase().includes(q.toLowerCase()))
    .filter((r) => filter === 'all' || (filter === 'paid' ? r.paidAt : !r.paidAt))

  return (
    <div className="stack" style={{ gap: '1rem' }}>
      <div className="row" style={{ justifyContent: 'space-between', gap: '1rem' }}>
        <div className="row" style={{ gap: '.6rem', flex: '1 1 320px' }}>
          <div className="field" style={{ flex: '1 1 220px', maxWidth: 340 }}>
            <input aria-label="Search students" placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="field"><select aria-label="Show" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Everyone</option><option value="paid">Paid</option><option value="unpaid">Not paid yet</option>
          </select></div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => downloadCsv('hit-academy-students', ['Name', 'Email', 'Registered', 'Paid', 'Modules completed', 'Quizzes passed', 'Last active', 'Practice levels passed', 'Best practice score', 'Terms accepted', 'Terms version'],
          data.students.map((r) => [r.name, r.email, r.registered, r.paidAt || '', r.modulesCompleted, r.quizzesPassed, r.lastActive || '', (r.practice?.levelsPassed || []).join(' / '), r.practice?.best ?? '', r.termsAcceptedAt || '', r.termsVersion || '']))}>Download as spreadsheet (CSV)</button>
      </div>
      <p className="small muted">Tap a student to see their progress in each module.</p>
      <div className="card admin-scroll" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Registered</th><th>Paid</th><th>Modules done</th><th>Quizzes passed</th><th>Practice</th><th>Last active</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <Fragment key={r.id}>
                <tr className={`admin-row${open === r.id ? ' open' : ''}`} onClick={() => setOpen(open === r.id ? null : r.id)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(open === r.id ? null : r.id)}>
                  <td><b>{r.name || '–'}</b></td><td>{r.email}</td><td>{date(r.registered)}</td>
                  <td>{r.paidAt ? date(r.paidAt) : <span className="muted">No</span>}</td>
                  <td className="tnum">{r.modulesCompleted} / 7</td><td className="tnum">{r.quizzesPassed}</td><td className="tnum">{r.practice?.attempts ? `${r.practice.levelsPassed.length} / 3 levels` : <span className="muted">–</span>}</td><td>{date(r.lastActive)}</td>
                </tr>
                {open === r.id && (
                  <tr className="admin-detail"><td colSpan={8}>
                    <div className="stack" style={{ gap: '1rem' }}>
                      <p className="small muted">Terms and Conditions: {r.termsAcceptedAt ? <>accepted {dateTime(r.termsAcceptedAt)} (version {r.termsVersion})</> : 'not accepted yet'}</p>
                      <table className="admin-table admin-mini">
                        <thead><tr><th>Module</th><th>Lessons</th><th>Best quiz score</th><th>Status</th></tr></thead>
                        <tbody>
                          {course.modules.map((m, i) => {
                            const s = r.modules?.[m.id]
                            const total = modules[m.id] ? flatSteps(modules[m.id]).length : 0
                            return (
                              <tr key={m.id}>
                                <td>{i + 1}. {m.title}</td>
                                <td className="tnum">{s?.done || 0} / {total}</td>
                                <td className="tnum">{s?.quizBest != null ? `${Math.round(s.quizBest * 100)}%` : '–'}</td>
                                <td>{s?.completedAt ? <span className="pill good">Done {date(s.completedAt)}</span> : s?.done ? <span className="pill orange">In progress</span> : <span className="muted">Not started</span>}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      <p className="small muted">The Arena: {r.practice?.attempts ? <>{r.practice.attempts} scored role-play{r.practice.attempts === 1 ? '' : 's'}, best score {r.practice.best ?? '–'}/100, levels passed: {r.practice.levelsPassed.length ? LEVELS.filter((l) => r.practice.levelsPassed.includes(l)).join(', ') : 'none yet'}. See the Arena tab for each attempt.</> : 'no scored role-plays yet'}</p>
                      <div className="row" style={{ gap: '.5rem' }}>
                        <a className="btn btn-ghost btn-sm" href={`mailto:${r.email}`}>Email {r.name.split(' ')[0] || 'student'}</a>
                        <button className="btn btn-ghost btn-sm" onClick={() => {
                          if (window.confirm(`Send ${r.email} an email with a link to choose a new password?`)) act('reset', { email: r.email }, 'Password-reset email sent.')
                        }}>Send password-reset email</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--b-aggressive)' }} onClick={() => {
                          const typed = window.prompt(`Delete ${r.name || r.email}'s account for good?\n\nThis cancels their AI coach subscription in Stripe and deletes their account, progress, Arena role-plays and community posts. It can't be undone. Payment records stay for tax purposes.\n\nType their email address to confirm:`)
                          if (typed == null) return
                          if (typed.trim().toLowerCase() !== String(r.email).toLowerCase()) return notify('The email didn\'t match, so nothing was deleted.', 5000)
                          act('delete-user', { userId: r.id }, 'Account deleted.')
                        }}>Delete account</button>
                      </div>
                    </div>
                  </td></tr>
                )}
              </Fragment>
            ))}
            {!rows.length && <tr><td colSpan={8} className="muted">No students found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Payments({ data, act }) {
  const [busy, setBusy] = useState(null)
  const [showTest, setShowTest] = useState(true)
  const rows = data.payments.filter((p) => showTest || p.live)
  return (
    <div className="stack" style={{ gap: '1rem' }}>
      <div className="row" style={{ justifyContent: 'space-between', gap: '1rem' }}>
        <label className="row" style={{ gap: '.4rem' }}><input type="checkbox" checked={showTest} onChange={(e) => setShowTest(e.target.checked)} /> Show test payments</label>
        <button className="btn btn-ghost btn-sm" onClick={() => downloadCsv('hit-academy-payments', ['Date', 'Name', 'Email', 'Bought', 'Amount', 'Currency', 'Status', 'Real payment', 'Refunded on', 'Stripe session'],
          data.payments.map((p) => [p.paidAt, p.name, p.email, p.item || 'Complete course', (p.amount || 0) / 100, p.currency, p.status, p.live ? 'yes' : 'test', p.refundedAt || '', p.sessionId]))}>Download as spreadsheet (CSV)</button>
      </div>
      <p className="small muted">A refund goes back to the student's card through Stripe (it usually arrives within 5 to 10 days) and removes their access to what they bought (the module, or the complete course). Stripe doesn't return its fee on refunds.</p>
      <div className="card admin-scroll" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Student</th><th>Bought</th><th>Amount</th><th>Status</th><th /></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{date(p.paidAt)}</td>
                <td><b>{p.name || '–'}</b><br /><span className="small muted">{p.email}</span></td>
                <td>{p.item || 'Complete course'}</td>
                <td className="tnum">{money(p.amount, p.currency)} {!p.live && <span className="pill">Test</span>}</td>
                <td>{p.status === 'refunded' ? <span className="pill orange">Refunded{p.refundedAt ? ` ${date(p.refundedAt)}` : ''}</span> : <span className="pill good">Paid</span>}</td>
                <td style={{ textAlign: 'right' }}>
                  {p.status !== 'refunded' && (
                    <button className="btn btn-ghost btn-sm" disabled={busy === p.id} onClick={async () => {
                      if (!window.confirm(`Refund ${money(p.amount, p.currency)} to ${p.name || p.email}?\n\nThe money goes back to their card and their course access ends. This can't be undone.`)) return
                      setBusy(p.id); await act('refund', { purchaseId: p.id }, 'Refund sent.'); setBusy(null)
                    }}>{busy === p.id ? 'Refunding…' : 'Refund'}</button>
                  )}
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={6} className="muted">No payments yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const ACTIVE = new Set(['active', 'trialing', 'past_due'])
const SUB_STATUS = { included: ['Included with course', 'good'], active: ['Active', 'good'], trialing: ['Active', 'good'], past_due: ['Payment failed, retrying', 'orange'], canceled: ['Ended', ''], unpaid: ['Unpaid', 'orange'], incomplete: ['Not completed', ''], incomplete_expired: ['Not completed', ''] }

// AI coach subscriptions: who subscribes, monthly revenue, cancellations. Refunds and cancellations are done in Stripe.
function CoachSubs({ data }) {
  const [showTest, setShowTest] = useState(true)
  const { subscriptions = [], payments = [], ready } = data.coach || {}
  const subs = subscriptions.filter((c) => showTest || c.live)
  const live = payments.filter((p) => p.live)
  const activeLive = subscriptions.filter((c) => c.live && ACTIVE.has(c.status))
  const includedLive = subscriptions.filter((c) => c.live && c.status === 'included' && new Date(c.periodEnd) > Date.now())
  const mrr = activeLive.filter((c) => !c.cancelAtPeriodEnd).reduce((a, c) => a + (c.amount || 0), 0)
  const gross = live.reduce((a, p) => a + (p.amount || 0), 0)
  const refunded = live.filter((p) => p.status === 'refunded').reduce((a, p) => a + (p.amount || 0), 0)
  const months = useMemo(() => {
    const m = new Map()
    for (const p of live) {
      const k = monthKey(p.paidAt)
      const r = m.get(k) || { n: 0, gross: 0, refunds: 0 }
      r.n += 1; r.gross += p.amount || 0
      if (p.status === 'refunded') r.refunds += p.amount || 0
      m.set(k, r)
    }
    return [...m.entries()].sort((a, b) => b[0].localeCompare(a[0]))
  }, [live])

  if (!ready) return <p className="muted">Run database update 4 (supabase/update-4-coach-subscription.sql) in Supabase to see AI coach subscriptions here.</p>
  return (
    <div className="stack" style={{ gap: '1.5rem' }}>
      <div className="admin-stats">
        <Stat label="Active subscribers" value={activeLive.length} sub={`${activeLive.filter((c) => c.cancelAtPeriodEnd).length} cancelled, running to month end`} />
        <Stat label="Monthly recurring revenue" value={money(mrr)} sub="from subscribers who haven't cancelled" />
        <Stat label="Coach revenue so far (after refunds)" value={money(gross - refunded)} />
        <Stat label="Coach included with course" value={includedLive.length} sub="3 free months, not paying yet" />
        <Stat label="Ended subscriptions" value={subscriptions.filter((c) => c.live && c.status === 'canceled').length} />
      </div>
      <p className="small muted">Real payments only, before Stripe's fees. To refund a coach payment or end a subscription early, open the customer in your Stripe dashboard; this board updates by itself.</p>
      <div className="stack" style={{ gap: '.6rem' }}>
        <h3>Coach revenue by month</h3>
        <div className="card admin-scroll" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead><tr><th>Month</th><th>Payments</th><th>Earned</th><th>Refunded</th><th>Net</th></tr></thead>
            <tbody>
              {months.map(([k, r]) => (
                <tr key={k}><td>{monthName(k)}</td><td className="tnum">{r.n}</td><td className="tnum">{money(r.gross)}</td><td className="tnum">{money(r.refunds)}</td><td className="tnum"><b>{money(r.gross - r.refunds)}</b></td></tr>
              ))}
              {!months.length && <tr><td colSpan={5} className="muted">No real coach payments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        <div className="row" style={{ justifyContent: 'space-between', gap: '1rem' }}>
          <h3>Subscribers</h3>
          <label className="row small" style={{ gap: '.4rem' }}><input type="checkbox" checked={showTest} onChange={(e) => setShowTest(e.target.checked)} /> Show test subscriptions</label>
        </div>
        <div className="card admin-scroll" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead><tr><th>Student</th><th>Since</th><th>Price</th><th>Status</th><th>Paid until</th></tr></thead>
            <tbody>
              {subs.map((c, i) => {
                const [label, tone] = SUB_STATUS[c.status] || [c.status, '']
                return (
                  <tr key={i}>
                    <td><b>{c.name || '–'}</b><br /><span className="small muted">{c.email}</span></td>
                    <td>{date(c.startedAt)}</td>
                    <td className="tnum">{money(c.amount, c.currency)}/month {!c.live && <span className="pill">Test</span>}</td>
                    <td><span className={'pill ' + tone}>{label}</span>{c.cancelAtPeriodEnd && ACTIVE.has(c.status) && <><br /><span className="small muted">Cancelled, ends {date(c.periodEnd)}</span></>}</td>
                    <td>{c.status === 'canceled' ? date(c.canceledAt) : date(c.periodEnd)}</td>
                  </tr>
                )
              })}
              {!subs.length && <tr><td colSpan={5} className="muted">No subscribers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const scenarioName = (id) => SCENARIOS.find((s) => s.id === id)?.title || id

function Practice({ data }) {
  const { ready, attempts = [] } = data.practice || {}
  const [q, setQ] = useState('')
  const byScenario = useMemo(() => SCENARIOS.map((sc) => {
    const list = attempts.filter((a) => a.scenario === sc.id)
    const scored = list.filter((a) => a.overall != null)
    return {
      sc, n: list.length, people: new Set(list.map((a) => a.email)).size,
      avg: scored.length ? Math.round(scored.reduce((t, a) => t + a.overall, 0) / scored.length) : null,
      passRate: list.length ? Math.round((list.filter((a) => a.passed).length / list.length) * 100) : null,
    }
  }), [attempts])
  const skillAvg = useMemo(() => SKILLS.map((k) => {
    const n = attempts.map((a) => a.skills?.find((s) => s.id === k.id)?.score).filter((x) => x != null)
    return { ...k, avg: n.length ? n.reduce((t, x) => t + x, 0) / n.length : null }
  }), [attempts])
  const rows = attempts.filter((a) => !q || `${a.name} ${a.email}`.toLowerCase().includes(q.toLowerCase()))

  if (!ready) return <p className="muted">Run database update 6 (supabase/update-6-practice-scores.sql) in Supabase to record and see Arena scores here.</p>
  return (
    <div className="stack" style={{ gap: '1.5rem' }}>
      <div className="admin-stats">
        <Stat label="Scored role-plays" value={attempts.length} />
        <Stat label="Students practising" value={new Set(attempts.map((a) => a.email)).size} />
        <Stat label="Pass rate" value={attempts.length ? `${Math.round((attempts.filter((a) => a.passed).length / attempts.length) * 100)}%` : '–'} sub="65/100 or more, no skill below 2" />
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        <h3>By scenario</h3>
        <div className="card admin-scroll" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead><tr><th>Scenario</th><th>Level</th><th>Attempts</th><th>Students</th><th>Average score</th><th>Pass rate</th></tr></thead>
            <tbody>
              {byScenario.map(({ sc, n, people, avg, passRate }) => (
                <tr key={sc.id}><td>{sc.title}</td><td>{sc.level}</td><td className="tnum">{n}</td><td className="tnum">{people}</td><td className="tnum">{avg != null ? `${avg} (${band(avg)})` : '–'}</td><td className="tnum">{passRate != null ? `${passRate}%` : '–'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        <h3>Average per skill</h3>
        <p className="small muted">Out of 5, across all attempts. The lowest skill shows where students need the most help.</p>
        <div className="card admin-scroll" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead><tr><th>Skill</th><th>Taught in</th><th>Average</th></tr></thead>
            <tbody>{skillAvg.map((k) => <tr key={k.id}><td>{k.name}</td><td>{k.modules}</td><td className="tnum">{k.avg != null ? k.avg.toFixed(1) : '–'}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        <div className="row" style={{ justifyContent: 'space-between', gap: '1rem' }}>
          <h3>All attempts</h3>
          <div className="row" style={{ gap: '.6rem' }}>
            <div className="field"><input aria-label="Search attempts" placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <button className="btn btn-ghost btn-sm" onClick={() => downloadCsv('hit-academy-practice', ['Date', 'Name', 'Email', 'Scenario', 'Level', 'Score', 'Passed', ...SKILLS.map((k) => k.name), 'Learner turns'],
              attempts.map((a) => [a.at, a.name, a.email, scenarioName(a.scenario), a.level, a.overall ?? '', a.passed ? 'yes' : 'no', ...SKILLS.map((k) => a.skills?.find((s) => s.id === k.id)?.score ?? ''), a.turns ?? '']))}>Download as spreadsheet (CSV)</button>
          </div>
        </div>
        <div className="card admin-scroll" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead><tr><th>Date</th><th>Student</th><th>Scenario</th><th>Score</th><th>Skills (1–5)</th></tr></thead>
            <tbody>
              {rows.map((a, i) => (
                <tr key={i}>
                  <td>{dateTime(a.at)}</td>
                  <td><b>{a.name || '–'}</b><br /><span className="small muted">{a.email}</span></td>
                  <td>{scenarioName(a.scenario)}<br /><span className="small muted">{a.level}</span></td>
                  <td className="tnum">{a.overall != null ? <><b>{a.overall}</b>/100 </> : <span className="muted">Too short </span>}{a.passed ? <span className="pill good">Passed</span> : <span className="pill">Not yet</span>}</td>
                  <td className="small">{SKILLS.map((k) => `${k.name.split(' ')[0]} ${a.skills?.find((s) => s.id === k.id)?.score ?? '–'}`).join(' · ')}</td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={5} className="muted">No scored role-plays yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Messages({ data, act }) {
  if (!data.messagesReady) return <div className="notice">Messages switch on after the database update is run in Supabase.</div>
  if (!data.messages.length) return <p className="muted">No messages yet. Students can write to you from the "Message Raad" item in their account menu.</p>
  return (
    <div className="stack" style={{ gap: '.8rem' }}>
      {data.messages.map((m) => (
        <article key={m.id} className={`card admin-msg${m.read_at ? '' : ' unread'}`}>
          <div className="row" style={{ justifyContent: 'space-between', gap: '.5rem' }}>
            <div><b>{m.name || m.email}</b> <span className="small muted">{m.email}</span></div>
            <span className="small muted">{dateTime(m.created_at)}{!m.read_at && <span className="pill orange" style={{ marginLeft: '.5rem' }}>New</span>}</span>
          </div>
          {m.subject && <h4 style={{ margin: 0 }}>{m.subject}</h4>}
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{m.body}</p>
          <div className="row" style={{ gap: '.5rem' }}>
            <a className="btn btn-primary btn-sm" href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || 'Your message'}`)}`}
              onClick={() => { if (!m.read_at) act('read', { messageId: m.id }) }}>Reply by email</a>
            <button className="btn btn-ghost btn-sm" onClick={() => act('read', { messageId: m.id, unread: !!m.read_at })}>{m.read_at ? 'Mark as new' : 'Mark as read'}</button>
          </div>
        </article>
      ))}
    </div>
  )
}

// Community moderation: reports to review (DSA notices) and members who post.
function CommunityAdmin() {
  const { notify, go } = useApp()
  const [d, setD] = useState(null)
  const [err, setErr] = useState('')
  const [pick, setPick] = useState({}) // report id -> chosen removal reason
  const load = useCallback(() => backend.forum({ admin: true }).then(setD, (e) => setErr(e.message)), [])
  useEffect(() => { load() }, [load])
  async function run(action, payload, done) {
    try { await backend.forumAction(action, payload); notify(done); await load() } catch (e) { notify(e.message, 5000) }
  }
  if (err) return <p className="muted">{/opens soon/i.test(err) ? 'Run database update 7 (supabase/update-7-community.sql) in Supabase to switch the community on.' : err}</p>
  if (!d) return <div className="boot"><span className="boot-dot" /></div>
  const open = d.reports.filter((r) => !r.resolvedAt)
  const done = d.reports.filter((r) => r.resolvedAt)
  const blocked = d.members.filter((m) => m.blockedAt)
  return (
    <div className="stack" style={{ gap: '1.5rem' }}>
      <div className="row">
        <button className="btn btn-primary btn-sm" onClick={() => go('community')}>Open the community</button>
        <span className="small muted">{d.members.length} member{d.members.length === 1 ? '' : 's'} with a forum name · {open.length} open report{open.length === 1 ? '' : 's'} · {blocked.length} blocked</span>
      </div>
      <p className="small muted" style={{ margin: 0 }}>You can also remove posts, pin or close conversations and block members right inside the community. Every removal or block emails the member the reason, and every report you resolve emails the person who reported it.</p>
      <div className="stack">
        <h3>Reports to review</h3>
        {!open.length && <p className="muted">No open reports.</p>}
        {open.map((r) => (
          <article key={r.id} className="card admin-msg unread">
            <div className="row" style={{ justifyContent: 'space-between', gap: '.5rem' }}>
              <div><b>{r.reason}</b> <span className="small muted">reported by {r.reporter}</span></div>
              <span className="small muted">{dateTime(r.at)}</span>
            </div>
            {r.details && <p style={{ margin: 0 }}><i>{r.details}</i></p>}
            {r.post ? <>
              <div className="small muted">Post by <b>{r.post.author}</b> {r.post.authorEmail && `(${r.post.authorEmail})`} in “{r.post.thread}”{r.post.status !== 'ok' ? ` · already ${r.post.status}` : ''}</div>
              <p style={{ whiteSpace: 'pre-wrap', margin: 0, padding: '.7rem .9rem', background: 'var(--surface-2)', borderRadius: 'var(--r-s)' }}>{r.post.body}</p>
              <div className="row" style={{ gap: '.5rem' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => go('community', { threadId: r.post.threadId })}>Open conversation</button>
                <select value={pick[r.id] || ''} onChange={(e) => setPick({ ...pick, [r.id]: e.target.value })} aria-label="Reason for removal" style={{ minHeight: 36, borderRadius: 8, border: '1px solid var(--line)', padding: '0 .5rem', background: 'var(--surface)', color: 'var(--ink)' }}>
                  <option value="">Reason for removal…</option>
                  {REMOVAL_REASONS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                </select>
                <button className="btn btn-primary btn-sm" disabled={!pick[r.id] || r.post.status !== 'ok'} onClick={() => run('remove', { postId: r.post.id, reason: pick[r.id] }, 'Post removed. The author and the reporter have been told.')}>Remove post</button>
                <button className="btn btn-ghost btn-sm" onClick={() => run('dismiss', { reportId: r.id }, 'Report closed. The post stays up.')}>Keep post</button>
              </div>
            </> : <div className="row"><span className="small muted">The post no longer exists.</span><button className="btn btn-ghost btn-sm" onClick={() => run('dismiss', { reportId: r.id }, 'Report closed.')}>Close report</button></div>}
          </article>
        ))}
      </div>
      <div className="stack">
        <h3>Members</h3>
        {!d.members.length ? <p className="muted">Nobody has posted yet.</p> : (
          <div className="admin-scroll"><table className="admin-table">
            <thead><tr><th>Display name</th><th>Email</th><th>Joined</th><th>Posts (30 days)</th><th>Status</th><th /></tr></thead>
            <tbody>{d.members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td><td>{m.email}</td><td>{date(m.since)}</td><td className="tnum">{m.posts30}</td>
                <td>{m.blockedAt ? <span title={m.blockedReason}>Blocked {date(m.blockedAt)}</span> : 'Can post'}</td>
                <td>{m.blockedAt
                  ? <button className="btn btn-ghost btn-sm" onClick={() => run('block', { userId: m.id, on: false }, `${m.name} can post again.`)}>Unblock</button>
                  : <span className="small muted">Block from a post</span>}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div>
      {!!done.length && (
        <details>
          <summary className="small">Resolved reports ({done.length})</summary>
          <div className="admin-scroll"><table className="admin-table">
            <thead><tr><th>Reported</th><th>Reason</th><th>Post by</th><th>Outcome</th><th>Resolved</th></tr></thead>
            <tbody>{done.map((r) => <tr key={r.id}><td>{date(r.at)}</td><td>{r.reason}</td><td>{r.post?.author || '–'}</td><td>{r.resolution === 'removed' ? 'Removed' : 'Kept'}</td><td>{date(r.resolvedAt)}</td></tr>)}</tbody>
          </table></div>
        </details>
      )}
    </div>
  )
}

// Course reviews waiting for approval, and the published ones. Raad can publish or reject, never edit.
// Reject only for the listed reasons: a genuine critical review must be published (§ 5b UWG).
function ReviewsAdmin({ notify }) {
  const [data, setData] = useState(null)
  const [reasonFor, setReasonFor] = useState(null)
  const [reason, setReason] = useState('')
  const load = useCallback(() => backend.reviews({ admin: true }).then(setData, (e) => notify(e.message, 5000)), [notify])
  useEffect(() => { load() }, [load])
  async function act(action, id, extra = {}) {
    try { await backend.reviewAction(action, { id, ...extra }); notify(action === 'publish' ? 'Review published.' : 'Review rejected. The student has been told why.'); setReasonFor(null); setReason(''); load() } catch (e) { notify(e.message, 5000) }
  }
  if (!data) return <p className="muted">Loading reviews…</p>
  if (!data.ready) return <p className="muted">Run supabase/update-9-reviews.sql in Supabase to switch on course reviews.</p>
  const pending = data.reviews.filter((r) => r.status === 'pending')
  const rest = data.reviews.filter((r) => r.status !== 'pending')
  const Row = ({ r }) => (
    <div className="card" style={{ padding: '1rem 1.1rem', display: 'grid', gap: '.5rem' }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span><b>{r.name}</b> <span className="small muted">{r.email} · {new Date(r.updatedAt || r.at).toLocaleDateString('en-GB')}{r.google ? ' · opened Google' : ''}</span></span>
        <span className="review-stars" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}<span className="off">{'★'.repeat(5 - r.rating)}</span></span>
      </div>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{r.body}</p>
      {r.status === 'rejected' && <p className="small muted" style={{ margin: 0 }}>Rejected: {r.rejectReason}</p>}
      {reasonFor === r.id ? (
        <div className="row">
          <select value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Reason">
            <option value="">Choose a reason…</option>
            {REJECT_REASONS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
          </select>
          <button className="btn btn-sm" disabled={!reason} onClick={() => act('reject', r.id, { reason })}>Reject</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setReasonFor(null)}>Cancel</button>
        </div>
      ) : (
        <div className="row">
          {r.status !== 'published' && <button className="btn btn-primary btn-sm" onClick={() => act('publish', r.id)}>Publish</button>}
          {r.status !== 'rejected' && <button className="btn btn-ghost btn-sm" onClick={() => { setReasonFor(r.id); setReason('') }}>Reject…</button>}
          {r.status !== 'pending' && <span className={'pill ' + (r.status === 'published' ? 'good' : '')}>{r.status === 'published' ? 'Published' : 'Rejected'}</span>}
        </div>
      )}
    </div>
  )
  return (
    <div className="stack" style={{ gap: '1rem' }}>
      <p className="small muted">Publish every genuine review, including critical ones. Reject only spam, abuse, private details about other people, or text that isn't about the course. You can't change a review's words. {data.count ? `Published: ${data.count}, average ${data.average.toFixed(1)}★.` : ''}</p>
      <h3>Waiting for approval ({pending.length})</h3>
      {pending.length ? pending.map((r) => <Row key={r.id} r={r} />) : <p className="muted">Nothing waiting.</p>}
      {rest.length > 0 && <><h3>Decided</h3>{rest.map((r) => <Row key={r.id} r={r} />)}</>}
    </div>
  )
}
