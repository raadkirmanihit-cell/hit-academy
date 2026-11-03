import { CertificateSample } from './Certificate.jsx'
import { MODULE_PRICE, euro, BUNDLE_PRICE, LAUNCH_PRICE, BUNDLE_PRACTICE_MESSAGES, FREE_MODULES } from '../content/pricing.js'
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
  { icon: 'award', wide: true, title: 'Certificate of completion', text: 'Included with the complete course. Finish all seven modules and pass each quiz to earn your certificate, with your name and a unique ID.' },
]

const GOOGLE_REVIEWS = 'https://www.google.com/search?hl=en-DE&q=human+interactions+translated+reviews&uds=AJ5uw1_a2D0D09lxm8gpKKOTUn4rroxomuMMUq4TL01afLYbLYTGJTCwJBttE7EAUtqS7M1aSAZ4IWT2caGTJcBh38e1ba0um6AOxqeTu4b8W2r0P9q6UHGeDKLbbuRvn9S7ldp_NcG85hie7zP-hXGc8cY_P-SxnaB0dr2xelUR4hKL7JWMFNp0PiQVPP-4U187VeE_iIJg&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_4t2CVO9nnawaUR0K28fQryOQFqUeZ_9xiSZKejFYGP84ZpGz4SKlJgvDV0I7peLkJxuGNHUOidZ2hAyg1KNEpdOOcBFOZL33iNSSh4L_3wuPnI_RA%3D%3D'

export default function Landing() {
  const { course, modules, user, go, launch } = useApp()
  const cta = () => (user ? go('dashboard') : go('signup'))
  const bundle = launch.launch ? LAUNCH_PRICE : BUNDLE_PRICE

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="stack" style={{ gap: '1.4rem' }}>
            <span className="eyebrow">{course.org} · Online course</span>
            <a className="hero-proof" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer"><span className="stars" aria-hidden="true">★★★★★</span> 5.0 · 25 Google reviews</a>
            <h1>Master difficult conversations <em>when the stakes are high</em></h1>
            <p className="lede">When the stakes are high, do you react, or do you respond with intention? A practical, self-paced course in negotiation and conflict resolution for professionals, leaders and anyone who wants to communicate with clarity, confidence and calm.</p>
            <div className="stack" style={{ gap: '.9rem' }}>
              <div className="row" style={{ gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={cta}>{user ? 'Go to my course' : 'Start Module 1 free'} <Icon.arrowR /></button>
                {!user && <span style={{ color: '#7fb2ff', fontWeight: 700, fontSize: '1.05rem' }}>Includes 10 AI coach messages</span>}
              </div>
              {!user && <p style={{ margin: '0 0 1rem', fontSize: '1rem', lineHeight: 1.6, color: '#fff' }}>Sign up with your email, no card needed.</p>}
              <div className="price-tag"><strong>{euro(bundle)}</strong><span className="muted" style={{ color: '#9aa5c6' }}>{launch.launch ? <><s>{euro(BUNDLE_PRICE)}</s> launch price · </> : null}all 7 modules + {BUNDLE_PRACTICE_MESSAGES} AI role-play messages + certificate of completion · or {euro(MODULE_PRICE)} per module</span></div>
              <p className="small" style={{ color: '#fff', margin: 0, fontWeight: 700 }}>14-day money-back guarantee on every purchase.</p>
            </div>
          </div>
          <div className="hero-art">
            <img src="img/m1/cover.webp" alt="Colleagues in a relaxed discussion around a table" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap trainer">
          <img className="trainer-photo" src="img/brand/raad.webp" alt="Raad Kirmani, founder of Human Interactions Translated" loading="lazy" />
          <div className="stack" style={{ gap: '.75rem' }}>
            <span className="eyebrow">Your trainer</span>
            <h2>Raad Kirmani</h2>
            <p className="trainer-role">Founder of Human Interactions Translated · Negotiation and conflict resolution trainer</p>
            <p className="muted">I train professionals to handle high-stakes conversations in live workshops and one-to-one coaching. This course brings those same methods to you, so you can learn and practise them at your own pace.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: '1.5rem' }}>
          <span className="eyebrow">From past participants</span>
          <div className="quote-grid">
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>“I wanted to improve my confidence level in terms of communication with colleagues and customers… Moreover, he helped me to get a raise of my bonus from my supervisor.”</p><span className="small muted">Ildar A., Google review</span></div>
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>I used the preparation framework in a compensation discussion and got a better offer.</p><span className="small muted">Arun T., Sr. Program Manager</span></div>
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>“It completely transformed the way I perceive workplace relationships, approach challenges, and handle a wide range of client situations. The insights I gained have had an immediate and meaningful impact on how I work every day.”</p><span className="small muted">Milica J., Google review</span></div>
          </div>
          <a className="google-link" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">
            <span className="stars" aria-hidden="true">★★★★★</span> Read our reviews on Google <Icon.arrowR />
          </a>
          <div><button className="btn btn-dark" onClick={cta}>Start Module 1 <Icon.arrowR /></button></div>
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
                f.wide ? (
                  <div className="feature feature-cert" key={f.title}>
                    <div className="stack" style={{ gap: '.5rem', alignContent: 'start' }}>
                      <I />
                      <h4>{f.title}</h4>
                      <p className="muted small">{f.text}</p>
                    </div>
                    <CertificateSample course={course} />
                  </div>
                ) : (
                <div className="feature" key={f.title}>
                  <I />
                  <h4>{f.title}</h4>
                  <p className="muted small">{f.text}</p>
                </div>
                )
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
                <span className={'pill' + (modules[m.id] ? ' good' : '')}>{!modules[m.id] ? 'Coming soon' : FREE_MODULES.includes(m.id) ? 'Free' : `Included · or ${euro(MODULE_PRICE)} alone`}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="wrap" style={{ paddingBlock: '2rem', borderTop: '1px solid var(--line)' }}>
        <p className="small muted">© 2026 Human Interactions Translated · Offenbach, Germany · All rights reserved · <LegalLinks /></p>
      </footer>
    </>
  )
}
