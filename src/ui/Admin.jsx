import { useEffect, useState } from 'react'
import { backend } from '../platform/backend.js'

const date = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '–')

// Raad's student list: who registered, who paid, how far they got.
export default function AdminPage() {
  const [rows, setRows] = useState(null)
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')
  useEffect(() => { backend.listStudents().then(setRows, (e) => setErr(e.message)) }, [])

  if (err) return <div className="wrap"><p className="error">{err}</p></div>
  if (!rows) return <div className="boot"><span className="boot-dot" /></div>
  const shown = rows.filter((r) => `${r.name} ${r.email}`.toLowerCase().includes(q.toLowerCase()))
  const paid = rows.filter((r) => r.paidAt).length
  const certs = rows.filter((r) => r.modulesCompleted >= 7).length

  function exportCsv() {
    const head = ['Name', 'Email', 'Registered', 'Paid', 'Modules completed', 'Quizzes passed', 'Last active']
    const lines = rows.map((r) => [r.name, r.email, r.registered, r.paidAt || '', r.modulesCompleted, r.quizzesPassed, r.lastActive || ''].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' }))
    a.download = `hit-academy-students-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  return (
    <div className="wrap stack" style={{ gap: '1.5rem', paddingBlock: '2rem' }}>
      <div className="stack" style={{ gap: '.3rem' }}>
        <span className="eyebrow">Admin</span>
        <h1>Students</h1>
      </div>
      <div className="admin-stats">
        <div className="card"><span className="small muted">Registered</span><strong>{rows.length}</strong></div>
        <div className="card"><span className="small muted">Paid</span><strong>{paid}</strong></div>
        <div className="card"><span className="small muted">Not paid yet</span><strong>{rows.length - paid}</strong></div>
        <div className="card"><span className="small muted">Finished all 7 modules</span><strong>{certs}</strong></div>
      </div>
      <div className="row" style={{ justifyContent: 'space-between', gap: '1rem' }}>
        <div className="field" style={{ flex: '1 1 240px', maxWidth: 360 }}>
          <input aria-label="Search students" placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button className="btn btn-ghost btn-sm" onClick={exportCsv}>Download as spreadsheet (CSV)</button>
      </div>
      <div className="card admin-scroll" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Registered</th><th>Paid</th><th>Modules done</th><th>Quizzes passed</th><th>Last active</th></tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.email}>
                <td>{r.name || '–'}</td><td>{r.email}</td><td>{date(r.registered)}</td>
                <td>{r.paidAt ? date(r.paidAt) : <span className="muted">No</span>}</td>
                <td className="tnum">{r.modulesCompleted} / 7</td><td className="tnum">{r.quizzesPassed}</td><td>{date(r.lastActive)}</td>
              </tr>
            ))}
            {!shown.length && <tr><td colSpan={7} className="muted">No students yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
