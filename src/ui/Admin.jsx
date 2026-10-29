import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useApp } from '../App.jsx'
import { backend } from '../platform/backend.js'
import { flatSteps } from '../platform/progress.js'

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
        {[['overview', 'Overview'], ['students', `Students (${data.students.length})`], ['payments', 'Payments & refunds'], ['messages', `Messages${unread ? ` (${unread} new)` : ''}`]].map(([id, label]) => (
          <button key={id} className="tab" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      {tab === 'overview' && <Overview data={data} unread={unread} setTab={setTab} />}
      {tab === 'students' && <Students data={data} act={act} />}
      {tab === 'payments' && <Payments data={data} act={act} />}
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
        <button className="card admin-stat-btn" onClick={() => setTab('messages')}><span className="small muted">New messages</span><strong>{unread}</strong></button>
      </div>
      <p className="small muted">Revenue counts real payments only, before Stripe's fees.{testCount ? ` ${testCount} test payment${testCount > 1 ? 's are' : ' is'} left out.` : ''}</p>
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
        <button className="btn btn-ghost btn-sm" onClick={() => downloadCsv('hit-academy-students', ['Name', 'Email', 'Registered', 'Paid', 'Modules completed', 'Quizzes passed', 'Last active', 'Terms accepted', 'Terms version'],
          data.students.map((r) => [r.name, r.email, r.registered, r.paidAt || '', r.modulesCompleted, r.quizzesPassed, r.lastActive || '', r.termsAcceptedAt || '', r.termsVersion || '']))}>Download as spreadsheet (CSV)</button>
      </div>
      <p className="small muted">Tap a student to see their progress in each module.</p>
      <div className="card admin-scroll" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Registered</th><th>Paid</th><th>Modules done</th><th>Quizzes passed</th><th>Last active</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <Fragment key={r.id}>
                <tr className={`admin-row${open === r.id ? ' open' : ''}`} onClick={() => setOpen(open === r.id ? null : r.id)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(open === r.id ? null : r.id)}>
                  <td><b>{r.name || '–'}</b></td><td>{r.email}</td><td>{date(r.registered)}</td>
                  <td>{r.paidAt ? date(r.paidAt) : <span className="muted">No</span>}</td>
                  <td className="tnum">{r.modulesCompleted} / 7</td><td className="tnum">{r.quizzesPassed}</td><td>{date(r.lastActive)}</td>
                </tr>
                {open === r.id && (
                  <tr className="admin-detail"><td colSpan={7}>
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
                      <div className="row" style={{ gap: '.5rem' }}>
                        <a className="btn btn-ghost btn-sm" href={`mailto:${r.email}`}>Email {r.name.split(' ')[0] || 'student'}</a>
                        <button className="btn btn-ghost btn-sm" onClick={() => {
                          if (window.confirm(`Send ${r.email} an email with a link to choose a new password?`)) act('reset', { email: r.email }, 'Password-reset email sent.')
                        }}>Send password-reset email</button>
                      </div>
                    </div>
                  </td></tr>
                )}
              </Fragment>
            ))}
            {!rows.length && <tr><td colSpan={7} className="muted">No students found.</td></tr>}
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
        <button className="btn btn-ghost btn-sm" onClick={() => downloadCsv('hit-academy-payments', ['Date', 'Name', 'Email', 'Amount', 'Currency', 'Status', 'Real payment', 'Refunded on', 'Stripe session'],
          data.payments.map((p) => [p.paidAt, p.name, p.email, (p.amount || 0) / 100, p.currency, p.status, p.live ? 'yes' : 'test', p.refundedAt || '', p.sessionId]))}>Download as spreadsheet (CSV)</button>
      </div>
      <p className="small muted">A refund goes back to the student's card through Stripe (it usually arrives within 5 to 10 days) and removes their access to the course. Stripe doesn't return its fee on refunds.</p>
      <div className="card admin-scroll" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Student</th><th>Amount</th><th>Status</th><th /></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{date(p.paidAt)}</td>
                <td><b>{p.name || '–'}</b><br /><span className="small muted">{p.email}</span></td>
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
            {!rows.length && <tr><td colSpan={5} className="muted">No payments yet.</td></tr>}
          </tbody>
        </table>
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
