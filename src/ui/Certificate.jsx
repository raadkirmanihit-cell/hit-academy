import { useEffect, useRef, useState } from 'react'
import { useApp } from '../App.jsx'
import { courseStats } from '../platform/progress.js'
import { Icon } from './icons.jsx'
import { saveFile } from '../platform/files.js'

const W = 1600, H = 1131 // A4 landscape ratio

function certId(user) {
  let h = 0
  for (const ch of user.id + user.email) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return 'HIT-' + h.toString(36).toUpperCase().padStart(7, '0')
}

async function draw(canvas, { name, course, date, id, locked, logo }) {
  const ctx = canvas.getContext('2d')
  canvas.width = W; canvas.height = H
  try { await Promise.all(['italic 400 40px "DM Sans Variable"', '750 60px "Bricolage Grotesque Variable"', '500 18px "DM Mono"'].map((f) => document.fonts.load(f))); await document.fonts.ready } catch { /* fonts optional */ }
  const navy = '#0b1a44', orange = '#f7861b', ink = '#1b2547', muted = '#5d6888'
  ctx.fillStyle = '#fbfaf7'; ctx.fillRect(0, 0, W, H)
  // navy side band with orange rule
  ctx.fillStyle = navy; ctx.fillRect(0, 0, 360, H)
  ctx.fillStyle = orange; ctx.fillRect(360, 0, 10, H)
  // subtle grid motif (assertiveness × cooperation) on the band
  ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 2
  for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(60 * i, 0); ctx.lineTo(60 * i, H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 190 * i); ctx.lineTo(360, 190 * i); ctx.stroke() }
  if (logo) { ctx.save(); ctx.beginPath(); ctx.arc(180, 200, 105, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.clip(); ctx.drawImage(logo, 80, 100, 200, 200); ctx.restore() }
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'
  ctx.font = '600 22px "DM Mono", monospace'
  ctx.fillText('HUMAN INTERACTIONS', 180, 380); ctx.fillText('TRANSLATED', 180, 410)
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = '400 20px "DM Sans Variable", sans-serif'
  ctx.fillText('Offenbach, Germany', 180, 450)

  const x = 470
  ctx.textAlign = 'left'
  ctx.fillStyle = muted; ctx.font = '500 24px "DM Mono", monospace'
  ctx.fillText('CERTIFICATE OF COMPLETION', x, 190)
  ctx.fillStyle = ink; ctx.font = '400 30px "DM Sans Variable", sans-serif'
  ctx.fillText('This certifies that', x, 290)
  ctx.fillStyle = navy
  let size = 96
  do { ctx.font = `750 ${size}px "Bricolage Grotesque Variable", "DM Sans Variable", sans-serif`; size -= 4 } while (ctx.measureText(name).width > W - x - 120 && size > 40)
  ctx.fillText(name, x, 400)
  ctx.fillStyle = orange; ctx.fillRect(x, 432, 140, 6)
  ctx.fillStyle = ink; ctx.font = '400 30px "DM Sans Variable", sans-serif'
  ctx.fillText('has successfully completed the self-paced course', x, 510)
  ctx.fillStyle = navy; ctx.font = '700 48px "Bricolage Grotesque Variable", "DM Sans Variable", sans-serif'
  ctx.fillText(course.title, x, 580)
  ctx.fillStyle = muted; ctx.font = '400 24px "DM Sans Variable", sans-serif'
  ctx.fillText('Behaviour and strategy · strategic empathy · reading the unspoken · principled progress', x, 630)
  ctx.fillText('preparation · perception · handling objections', x, 664)

  ctx.strokeStyle = '#c9cfdf'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(x, 900); ctx.lineTo(x + 420, 900); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(x + 560, 900); ctx.lineTo(x + 900, 900); ctx.stroke()
  ctx.fillStyle = navy; ctx.font = 'italic 400 40px "DM Sans Variable", sans-serif'
  ctx.fillText(course.certificate.signatory, x, 880)
  ctx.fillStyle = ink; ctx.font = '600 24px "DM Sans Variable", sans-serif'
  ctx.fillText(course.certificate.signatory, x, 940)
  ctx.fillText(date, x + 560, 880)
  ctx.fillStyle = muted; ctx.font = '400 21px "DM Sans Variable", sans-serif'
  ctx.fillText(course.certificate.signatoryRole, x, 972)
  ctx.fillText('Date of completion', x + 560, 940)
  ctx.font = '500 18px "DM Mono", monospace'
  ctx.fillText(`Certificate ID ${id}`, x, 1060)

  if (locked) {
    ctx.save(); ctx.translate(W / 2 + 180, H / 2); ctx.rotate(-0.35)
    ctx.fillStyle = 'rgba(192,58,43,.16)'; ctx.font = '800 150px "Bricolage Grotesque Variable", sans-serif'; ctx.textAlign = 'center'
    ctx.fillText('PREVIEW', 0, 40); ctx.restore()
  }
}

export default function CertificatePage() {
  const { course, modules, user, progress, go, notify } = useApp()
  const ref = useRef()
  const [ready, setReady] = useState(false)
  const stats = courseStats(course, modules, progress)
  const dates = Object.values(progress.modules).map((m) => m.completedAt).filter(Boolean).sort()
  const date = new Date(dates[dates.length - 1] || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const id = certId(user)

  useEffect(() => {
    const logo = new Image()
    logo.src = 'img/brand/logo.webp'
    const go2 = () => draw(ref.current, { name: user.name, course, date, id, locked: !stats.eligible, logo: logo.complete && logo.naturalWidth ? logo : null }).then(() => setReady(true))
    logo.onload = go2; logo.onerror = go2
  }, [user.name, stats.eligible, date]) // eslint-disable-line react-hooks/exhaustive-deps

  function download() {
    ref.current.toBlob(async (blob) => {
      if (!blob) return notify('Could not create the image. Try again.')
      const r = await saveFile(`HIT-certificate-${user.name.replace(/\s+/g, '-')}.png`, blob)
      if (r === 'failed') notify('The download did not start. Please try again.')
    }, 'image/png')
  }

  return (
    <div className="wrap cert-wrap">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'end' }}>
        <div className="stack" style={{ gap: '.4rem' }}>
          <span className="eyebrow">Certificate</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>{stats.eligible ? 'Congratulations, ' + user.name.split(' ')[0] : 'Your certificate'}</h1>
          <p className="muted">{stats.eligible ? `Verified completion · ID ${id}` : `Complete ${course.certificate.requires === 'all' ? 'all modules' : 'every released module'} and pass each quiz to unlock it. ${stats.completeCount} of ${stats.required} done.`}</p>
        </div>
        <div className="row">
          <button className="btn" onClick={() => go('dashboard')}><Icon.arrowL /> Dashboard</button>
          {stats.eligible && <button className="btn btn-primary" disabled={!ready} onClick={download}><Icon.download /> Download PNG</button>}
        </div>
      </div>
      <div className="cert-frame"><canvas ref={ref} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} aria-label={`Certificate of completion for ${user.name}`} /></div>
    </div>
  )
}
