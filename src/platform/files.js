// Hands a generated file to the learner. In a normal browser this is a plain download.
// Inside the claude.ai preview frame, downloads go through the viewer's save prompt.
export async function saveFile(filename, blob) {
  const host = typeof window !== 'undefined' && window.claude?.use ? await window.claude.use('downloads').catch(() => null) : null
  if (host) {
    try { await host.save({ filename, data: blob }); return 'saved' }
    catch (e) { return e?.code === 'declined' ? 'declined' : 'failed' }
  }
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 4000)
  return 'saved'
}

export async function saveUrl(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('missing')
  return saveFile(filename, await res.blob())
}
