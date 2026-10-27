// The coach's knowledge base: every module's pages turned into searchable text chunks.
// The coach answers from these chunks first (see prompts.js), so it stays faithful to the course.

const clean = (s) => String(s ?? '').replace(/\*\*|\*/g, '').replace(/\s+\n/g, '\n').trim()
const join = (arr) => (arr || []).map(clean).filter(Boolean).join('\n- ')

// Plain text for one content block. Interactive blocks contribute their prompts and answers.
function blockText(b) {
  switch (b.t) {
    case 'lead': case 'p': case 'quote': return clean(b.text)
    case 'h': return '## ' + clean(b.text)
    case 'list': case 'checks': return '- ' + join(b.items)
    case 'callout': return [clean(b.title), clean(b.text), b.list ? '- ' + join(b.list) : ''].filter(Boolean).join('\n')
    case 'research': return `[Beyond the module: research] ${clean(b.title)}\n${clean(b.text)}`
    case 'person': return [clean(b.name), clean(b.text), clean(b.quote)].filter(Boolean).join('\n')
    case 'cards': case 'situationCards': case 'factorCards':
      return (b.items || []).map((it) => [clean(it.title), clean(it.text), it.list ? '- ' + join(it.list) : '', clean(it.example)].filter(Boolean).join('\n')).join('\n\n')
    case 'steps': return (b.items || []).map((it, i) => `${i + 1}. ${clean(it.title)}${it.text ? '\n' + clean(it.text) : ''}${it.list ? '\n- ' + join(it.list) : ''}`).join('\n')
    case 'table': return [b.head?.join(' | '), ...(b.rows || []).map((r) => (typeof r === 'string' ? r : r.map(clean).join(' | ')))].filter(Boolean).join('\n')
    case 'scene': return `Example script: ${clean(b.label)}\n` + (b.lines || []).map(([who, text, note]) => (who ? `${who}: "${clean(text)}"` : `(${clean(text)})`) + (note ? ` [${clean(note)}]` : '')).join('\n') + (b.note ? '\n' + clean(b.note) : '')
    case 'examples': return (b.items || []).map((x) => (typeof x === 'string' ? clean(x) : [clean(x.title), clean(x.text)].join(': '))).join('\n')
    case 'flipCards': return (b.items || []).map((x) => `${clean(x.front)}: ${clean(x.back)}`).join('\n')
    case 'diagram': case 'img': return clean(b.caption)
    case 'traits': return ['Characteristics', 'Benefits', 'Risks'].map((k) => `${k}: ${join(b[k.toLowerCase()])}`).join('\n')
    case 'behaviourList': case 'voices': return (b.items || []).map((x) => [clean(x.title || x.name), clean(x.text || x.desc)].join(': ')).join('\n')
    default: return ''
  }
}

const MAX = 3200

export function buildChunks(modules) {
  const chunks = []
  for (const m of Object.values(modules)) {
    const where = `Module ${m.number}: ${m.title}`
    chunks.push({ id: `${m.id}-about`, moduleId: m.id, where, page: 'Module overview', text: `${m.summary}\nObjectives:\n- ${join(m.objectives)}\nKey takeaways:\n- ${join(m.takeaways)}` })
    for (const sec of m.sections) {
      if (!['lesson'].includes(sec.kind)) continue
      for (const st of sec.steps) {
        const text = (st.blocks || []).map(blockText).filter(Boolean).join('\n\n')
        if (!text) continue
        // Long pages are split so each excerpt stays focused.
        for (let i = 0, part = 0; i < text.length; i += MAX, part++) {
          chunks.push({ id: `${m.id}-${st.id}-${part}`, moduleId: m.id, stepId: st.id, where: `${where}, ${sec.title.replace(/^\d+ · /, 'Lesson $&').replace(' · ', ': ')}`, page: st.title, text: text.slice(i, i + MAX) })
        }
      }
    }
  }
  for (const c of chunks) c.terms = terms(`${c.page} ${c.page} ${c.text}`)
  const df = new Map()
  for (const c of chunks) for (const t of new Set(c.terms)) df.set(t, (df.get(t) || 0) + 1)
  const avg = chunks.reduce((a, c) => a + c.terms.length, 0) / chunks.length
  return { chunks, df, avg, n: chunks.length }
}

const STOP = new Set('a an and are as at be but by can do does for from has have how i if in into is it its me my of on or our so than that the their them then there these they this to us was we what when which who why will with you your yours im dont cant just about would should could get got any some more most very also'.split(' '))
const stem = (w) => w.replace(/(ings|ing|edly|ed|ies|es|s|ly)$/, (m) => (m === 'ies' ? 'y' : '')) || w
export function terms(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9€$ ]+/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)).map(stem)
}

// BM25 search over the chunks. The page the learner is on is always included.
export function retrieve(kb, query, { moduleId, stepId } = {}, k = 7) {
  const q = [...new Set(terms(query))]
  const scored = kb.chunks.map((c) => {
    const tf = new Map()
    for (const t of c.terms) tf.set(t, (tf.get(t) || 0) + 1)
    let s = 0
    for (const t of q) {
      const f = tf.get(t); if (!f) continue
      const idf = Math.log(1 + (kb.n - kb.df.get(t) + 0.5) / (kb.df.get(t) + 0.5))
      s += idf * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * c.terms.length / kb.avg))
    }
    if (moduleId && c.moduleId === moduleId) s *= 1.25
    return { c, s }
  }).sort((a, b) => b.s - a.s)
  const picked = scored.filter((x) => x.s > 0).slice(0, k).map((x) => x.c)
  const here = kb.chunks.find((c) => c.moduleId === moduleId && c.stepId === stepId)
  if (here && !picked.includes(here)) picked.unshift(here)
  return picked.slice(0, k + 1)
}

export function formatExcerpts(chunks) {
  return chunks.map((c) => `--- ${c.where} · Page: "${c.page}" ---\n${c.text}`).join('\n\n')
}

// The vetted library: every source the modules already cite. The coach may only add research from here
// (or equally established literature it names precisely).
export function library(modules) {
  const seen = new Map()
  for (const m of Object.values(modules)) for (const r of Object.values(m.references || {})) if (!seen.has(r.text)) seen.set(r.text, r.text)
  return [...seen.values()].map((t) => '- ' + t).join('\n')
}
