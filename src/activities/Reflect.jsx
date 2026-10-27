import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'

export default function Reflect({ id, prompt, module }) {
  const { progress, saveReflection } = useApp()
  const [text, setText] = useState(moduleState(progress, module.id).reflections[id] || '')
  const [status, setStatus] = useState('')
  const t = useRef()
  useEffect(() => () => clearTimeout(t.current), [])
  function change(e) {
    const v = e.target.value
    setText(v); setStatus('Saving…')
    clearTimeout(t.current)
    t.current = setTimeout(() => { saveReflection(module.id, id, v); setStatus('Saved') }, 600)
  }
  return (
    <section className="activity" style={{ boxShadow: 'none', background: 'var(--surface-2)', borderStyle: 'dashed' }}>
      <div className="activity-head">
        <span className="activity-kind">Reflection</span>
        <label htmlFor={'refl-' + id} style={{ fontWeight: 600, lineHeight: 1.5 }}>{prompt}</label>
      </div>
      <div className="field">
        <textarea id={'refl-' + id} value={text} onChange={change} placeholder="Write a few lines. Only you can see this." />
      </div>
      <span className="small muted" aria-live="polite">{status || (text ? 'Saved' : 'Your answer saves automatically.')}</span>
    </section>
  )
}
