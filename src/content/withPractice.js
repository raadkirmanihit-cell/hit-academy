// Adds a module's extra practice (quick checks, your-turn scripts, say-it-out-loud, planner and
// confidence check) without editing every page by hand. Each module's practice.js exports:
//   inserts: { stepId: [blocks] }  added to that page, before its reflection prompt if it has one
//   planner, confidence            the module's planner and before/after confidence items
export function withPractice(module, P) {
  const steps = module.sections.flatMap((s) => s.steps)
  for (const [id, blocks] of Object.entries(P.inserts || {})) {
    const step = steps.find((s) => s.id === id)
    if (!step) { console.warn(`practice: no step "${id}" in ${module.id}`); continue }
    const at = step.blocks.findIndex((b) => b.t === 'reflect')
    step.blocks.splice(at < 0 ? step.blocks.length : at, 0, ...blocks)
  }
  if (P.confidence) {
    module.confidence = P.confidence
    const ov = steps.find((s) => s.kind === 'overview')
    if (ov && !ov.blocks.some((b) => b.t === 'confidence')) ov.blocks.push({ t: 'confidence', phase: 'before' })
    const tk = steps.find((s) => s.id === 'takeaways')
    if (tk && !tk.blocks.some((b) => b.t === 'confidence')) tk.blocks.push({ t: 'confidence', phase: 'after' })
  }
  if (P.planner) {
    module.planner = P.planner
    const wrap = module.sections.find((s) => s.id === 'wrap')
    if (wrap && !wrap.steps.some((s) => s.id === 'planner')) {
      const at = wrap.steps.findIndex((s) => s.id === 'worksheet')
      wrap.steps.splice(at < 0 ? wrap.steps.length : at, 0, { id: 'planner', title: P.planner.title, blocks: [{ t: 'planner' }] })
    }
  }
  return module
}

// Small builders shared by the practice files.
export const qc = (id, q, options) => ({ t: 'quickCheck', id, q, options })
export const scale = (id, label, tag) => ({ id, type: 'scale', label, tag })
export const ta = (id, label, placeholder, rows) => ({ id, type: 'textarea', label, placeholder, rows })
export const tx = (id, label, placeholder) => ({ id, type: 'text', label, placeholder })
export const sel = (id, label, options) => ({ id, type: 'select', label, options })
