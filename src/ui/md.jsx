// Tiny inline formatter: **bold** and *italic*. Content files use only these.
export function Md({ text, as: Tag = 'span' }) {
  if (text == null) return null
  // A line break in the text starts a new line on the page.
  if (text.includes('\n')) return <Tag>{text.split('\n').map((line, k) => <span key={k}>{k > 0 && <br />}<Md text={line} /></span>)}</Tag>
  const parts = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0, m, i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const s = m[0]
    parts.push(s.startsWith('**') ? <strong key={i++}>{s.slice(2, -2)}</strong> : <em key={i++}>{s.slice(1, -1)}</em>)
    last = m.index + s.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <Tag>{parts}</Tag>
}
