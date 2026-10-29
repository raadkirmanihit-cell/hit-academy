import { useApp } from '../App.jsx'
import { LegalLinks } from './Terms.jsx'
import { Icon } from './icons.jsx'

const features = [
  { icon: 'layers', title: 'Seven in-depth modules', text: 'From behaviour and strategy to empathy, body language, preparation, perception and objections.' },
  { icon: 'chat', title: 'Practise, not just read', text: 'Role-plays with branching dialogue, sorting exercises and real workplace scenarios.' },
  { icon: 'target', title: 'Graded quizzes', text: 'Feedback on every answer, so you know exactly why a response works or fails.' },
  { icon: 'clock', title: 'Self-paced', text: 'Progress saves automatically. Pick up exactly where you left off.' },
  { icon: 'doc', title: 'Worksheets', text: 'A downloadable planning worksheet for every module to use before real negotiations.' },
  { icon: 'device', title: 'Any device', text: 'Learn on your laptop at work or your phone on the train.' },
]

const GOOGLE_REVIEWS = 'https://www.google.com/search?hl=en-DE&q=human+interactions+translated+reviews&uds=AJ5uw1_a2D0D09lxm8gpKKOTUn4rroxomuMMUq4TL01afLYbLYTGJTCwJBttE7EAUtqS7M1aSAZ4IWT2caGTJcBh38e1ba0um6AOxqeTu4b8W2r0P9q6UHGeDKLbbuRvn9S7ldp_NcG85hie7zP-hXGc8cY_P-SxnaB0dr2xelUR4hKL7JWMFNp0PiQVPP-4U187VeE_iIJg&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_4t2CVO9nnawaUR0K28fQryOQFqUeZ_9xiSZKejFYGP84ZpGz4SKlJgvDV0I7peLkJxuGNHUOidZ2hAyg1KNEpdOOcBFOZL33iNSSh4L_3wuPnI_RA%3D%3D'

export default function Landing() {
  const { course, modules, user, paid, go } = useApp()
  const cta = () => (user ? go(paid ? 'dashboard' : 'checkout') : go('signup'))
  const price = new Intl.NumberFormat('en-IE', { style: 'currency', currency: course.product.currency, maximumFractionDigits: 0 }).format(course.product.price)

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="stack" style={{ gap: '1.4rem' }}>
            <span className="eyebrow">{course.org} · Online course</span>
            <h1>Master difficult conversations <em>when the stakes are high</em></h1>
            <p className="lede">When the stakes are high, do you react, or do you respond with intention? A practical, self-paced course in negotiation and conflict resolution for professionals, leaders and anyone who wants to communicate with clarity, confidence and calm.</p>
            <div className="row" style={{ gap: '1.25rem' }}>
              <button className="btn btn-primary" onClick={cta}>{user && paid ? 'Go to my course' : 'Enroll now'} <Icon.arrowR /></button>
              <div className="price-tag"><strong>{price}</strong><span className="muted" style={{ color: '#9aa5c6' }}>one-time · lifetime access</span></div>
            </div>
          </div>
          <div className="hero-art">
            <img src="img/m1/cover.webp" alt="Colleagues in a relaxed discussion around a table" />
          </div>
        </div>
      </section>
      <section className="section promo-section">
        <div className="wrap">
          {/* Course promo. Swap the file for Raad's own video once it's recorded. */}
          <video className="promo-video" src="video/promo.mp4" poster="video/promo-poster.jpg" autoPlay muted loop playsInline controls preload="metadata" aria-label="Course overview video, about one minute" />
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ gap: '2rem' }}>
          <div className="stack" style={{ gap: '.5rem', maxWidth: '60ch' }}>
            <span className="eyebrow">What you get</span>
            <h2>Built for practice, designed for busy people</h2>
          </div>
          <div className="feature-grid">
            {features.map((f) => {
              const I = Icon[f.icon]
              return (
                <div className="feature" key={f.title}>
                  <I />
                  <h4>{f.title}</h4>
                  <p className="muted small">{f.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: '1.5rem' }}>
          <div className="stack" style={{ gap: '.5rem' }}>
            <span className="eyebrow">Syllabus</span>
            <h2>Seven modules, one complete method</h2>
          </div>
          <ol className="syllabus" style={{ padding: 0, margin: 0 }}>
            {course.modules.map((m) => (
              <li key={m.id}>
                <span className="num">{String(m.number).padStart(2, '0')}</span>
                <div><h4>{m.title}</h4><p className="muted small">{m.subtitle}</p></div>
                <span className={'pill' + (modules[m.id] ? ' good' : '')}>{modules[m.id] ? 'Included' : 'Coming soon'}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: '1.5rem' }}>
          <span className="eyebrow">From past participants</span>
          <div className="quote-grid">
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>Changed how I handle business conversations. I lead with clarity and calm.</p><span className="small muted">Sara T., Tech Entrepreneur</span></div>
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>I used the preparation framework in a compensation discussion and got a better offer.</p><span className="small muted">Arun T., Sr. Program Manager</span></div>
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>These tools gave me an unexpected edge. I use strategic empathy every day now, at work, in meetings, and even at home.</p><span className="small muted">Jamal B., Software Team Lead</span></div>
          </div>
          <a className="google-link" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">
            <span className="stars" aria-hidden="true">★★★★★</span> Read our reviews on Google <Icon.arrowR />
          </a>
          <div><button className="btn btn-dark" onClick={cta}>Start Module 1 <Icon.arrowR /></button></div>
        </div>
      </section>
      <footer className="wrap" style={{ paddingBlock: '2rem', borderTop: '1px solid var(--line)' }}>
        <p className="small muted">© 2026 Human Interactions Translated · Offenbach, Germany · All rights reserved · <LegalLinks /></p>
      </footer>
    </>
  )
}
