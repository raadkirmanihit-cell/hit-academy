// Pure helpers for course progress. A module's steps are flattened from its sections.

export function emptyProgress() {
  return { version: 1, modules: {}, last: null, startedAt: new Date().toISOString() }
}

export function flatSteps(module) {
  const out = []
  module.sections.forEach((sec) => sec.steps.forEach((st) => out.push({ ...st, sectionId: sec.id, sectionTitle: sec.title, sectionKind: sec.kind })))
  return out
}

export function moduleState(progress, moduleId) {
  return progress.modules[moduleId] || { done: {}, activities: {}, reflections: {}, quiz: null, completedAt: null }
}

export function moduleStats(module, progress) {
  const steps = flatSteps(module)
  const ms = moduleState(progress, module.id)
  const done = steps.filter((s) => ms.done[s.id]).length
  const quizPassed = !!ms.quiz?.passed
  const complete = done === steps.length && quizPassed
  return { total: steps.length, done, pct: steps.length ? Math.round((done / steps.length) * 100) : 0, quizPassed, complete, best: ms.quiz?.best ?? null }
}

export function courseStats(course, modules, progress) {
  const published = course.modules.filter((m) => modules[m.id])
  const stats = published.map((m) => moduleStats(modules[m.id], progress))
  const required = course.certificate.requires === 'all' ? course.modules.length : published.length
  const completeCount = stats.filter((s) => s.complete).length
  const totalSteps = stats.reduce((a, s) => a + s.total, 0)
  const doneSteps = stats.reduce((a, s) => a + s.done, 0)
  // Overall % counts unpublished modules as 0% so the ring stays honest.
  const pctAll = Math.round(stats.reduce((a, s) => a + s.pct, 0) / course.modules.length)
  return { completeCount, required, published: published.length, totalSteps, doneSteps, pctAll, eligible: completeCount >= required && required > 0 }
}

export function update(progress, moduleId, fn) {
  const ms = structuredClone(moduleState(progress, moduleId))
  fn(ms)
  return { ...progress, modules: { ...progress.modules, [moduleId]: ms } }
}
