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
        <div className="wrap hero-grid hero-grid-video">
          <div className="stack" style={{ gap: '1.4rem' }}>
            <span className="eyebrow">HIT Academy · by {course.org}</span>
            <a className="hero-proof" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer"><span className="stars" aria-hidden="true">★★★★★</span> 5.0 · 25 Google reviews</a>
            <h1>Master difficult conversations <em>when the stakes are high</em></h1>
            <p className="lede">When the stakes are high, do you react, or do you respond with intention?<br />HIT Academy is the online home of Human Interactions Translated: practical, self-paced courses for professionals and leaders who want to communicate with clarity, confidence and calm.</p>
            <p className="hero-now"><span className="pill orange">Now open</span> Our first course: <strong>{course.title}</strong></p>
            <div className="stack" style={{ gap: '.9rem' }}>
              <div className="row" style={{ gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={cta}>{user ? 'Go to my course' : 'Start the first module free'} <Icon.arrowR /></button>
                {!user && <span style={{ color: '#7fb2ff', fontWeight: 700, fontSize: '1.05rem' }}>Includes 10 AI coach messages</span>}
              </div>
              {!user && <p style={{ margin: '0 0 1rem', fontSize: '1rem', lineHeight: 1.6, color: '#fff' }}>Sign up with your email, no card needed.</p>}
              <div className="price-tag"><strong>{euro(bundle)}</strong><span className="muted" style={{ color: '#9aa5c6' }}>{launch.launch ? <><s>{euro(BUNDLE_PRICE)}</s> launch price · </> : null}complete course: all 7 modules + the Arena for AI role-plays ({BUNDLE_PRACTICE_MESSAGES} tokens) + certificate of completion · or {euro(MODULE_PRICE)} per module</span></div>
              <div className="guarantee">
                <span className="guarantee-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" /><path d="M8.5 12.2l2.4 2.4 4.6-4.8" /></svg></span>
                <span><strong>14-day money-back guarantee</strong>On every purchase. Not happy? Full refund, no questions asked.</span>
              </div>
            </div>
          </div>
          <div className="hero-video">
            {/* Course promo. Swap the file for Raad's own video once it's recorded. */}
            <video className="promo-video" src="video/promo.mp4" poster="video/promo-poster.jpg" autoPlay muted loop playsInline controls preload="metadata" aria-label="Course overview video, about one minute" />
          </div>
        </div>
      </section>

      <section className="section" id="courses">
        <div className="wrap stack" style={{ gap: '1.5rem' }}>
          <div className="stack" style={{ gap: '.5rem', maxWidth: '62ch' }}>
            <span className="eyebrow">HIT Academy courses</span>
            <h2>Courses for the conversations that matter</h2>
            <p className="muted" style={{ margin: 0 }}>Every course follows the same approach: short lessons, real workplace scenarios and plenty of practice, so the skills hold up when the pressure is on.</p>
          </div>
          <div className="course-grid">
            <article className="course-card">
              <img src="img/m4/cover.webp" alt="" loading="lazy" />
              <div className="stack" style={{ gap: '.6rem', padding: '1.25rem', alignContent: 'start' }}>
                <span className="pill orange" style={{ justifySelf: 'start' }}>Now open</span>
                <h3 style={{ margin: 0 }}>{course.title}</h3>
                <p className="muted small" style={{ margin: 0 }}>Seven in-depth modules on behaviour, empathy, body language, preparation, perception and objections, with AI role-play practice and a certificate of completion.</p>
                <p className="small" style={{ margin: 0 }}><strong>{euro(bundle)}</strong>{launch.launch ? <> <s className="muted">{euro(BUNDLE_PRICE)}</s> launch price</> : null} · or {euro(MODULE_PRICE)} per module · first module free</p>
                <div className="row" style={{ gap: '.6rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary btn-sm" onClick={cta}>{user ? 'Go to my course' : 'Start free'} <Icon.arrowR /></button>
                  <a className="btn btn-ghost btn-sm" href="#course-details" onClick={(e) => { e.preventDefault(); document.getElementById('course-details')?.scrollIntoView({ behavior: 'smooth' }) }}>See what's inside</a>
                </div>
              </div>
            </article>
            {[1, 2].map((n) => (
              <article className="course-card soon" key={n} aria-label="Course coming soon">
                <div className="soon-art" aria-hidden="true"><Icon.lock /></div>
                <div className="stack" style={{ gap: '.6rem', padding: '1.25rem', alignContent: 'start' }}>
                  <span className="pill" style={{ justifySelf: 'start' }}>Coming soon</span>
                  <h3 style={{ margin: 0 }}>New course in development</h3>
                  <p className="muted small" style={{ margin: 0 }}>More HIT Academy courses are on the way.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: '1.5rem' }}>
          <span className="eyebrow">From Raad's coaching and training clients</span>
          <div className="quote-grid">
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>“I wanted to improve my confidence level in terms of communication with colleagues and customers… Moreover, he helped me to get a raise of my bonus from my supervisor.”</p><span className="reviewer"><img className="reviewer-avatar" src="img/reviews/ildar.webp" alt="" /><span className="small muted">Ildar A., Google review</span></span></div>
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>“I was having a hard time and several issues overcoming some difficulties at the work place… a brilliant and well thought approach that helped improve my communication skills and my fear of conflict.”</p><span className="reviewer"><img className="reviewer-avatar" src="img/reviews/teji.webp" alt="" /><span className="small muted">Teji, Google review</span></span></div>
            <div className="quote"><span className="stars" aria-label="Rated 5 out of 5 stars">★★★★★</span><p>“It completely transformed the way I perceive workplace relationships, approach challenges, and handle a wide range of client situations. The insights I gained have had an immediate and meaningful impact on how I work every day.”</p><span className="reviewer"><img className="reviewer-avatar" src="img/reviews/milica.webp" alt="" /><span className="small muted">Milica J., Google review</span></span></div>
          </div>
          <a className="google-link" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">
            <span className="stars" aria-hidden="true">★★★★★</span> Read our reviews on Google <Icon.arrowR />
          </a>
          {/* § 5b (3) UWG: say whether and how shown reviews are checked. */}
          <p className="small muted review-note">These are excerpts from public Google reviews of Raad's coaching and training, shortened (…) but otherwise unchanged. Google reviews are not checked by us to come from verified customers. The star rating is the average of all reviews on our Google profile.</p>
                  </div>
      </section>

      <section className="section" id="course-details" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: '2rem' }}>
          <div className="stack" style={{ gap: '.5rem', maxWidth: '60ch' }}>
            <span className="eyebrow">Inside {course.title}</span>
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
          <div><button className="btn btn-dark" onClick={cta}>{user ? 'Go to my course' : 'Start the first module free'} <Icon.arrowR /></button></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap trainer">
          <img className="trainer-photo" src="img/brand/raad.webp" alt="Raad Kirmani, founder of Human Interactions Translated" loading="lazy" />
          <div className="stack" style={{ gap: '.75rem' }}>
            <span className="eyebrow">Your trainer</span>
            <h2>Raad Kirmani</h2>
            <p className="trainer-role">Founder of Human Interactions Translated · Negotiation and conflict resolution trainer</p>
            <p className="muted">I train professionals to handle high-stakes conversations in live workshops and one-to-one coaching. HIT Academy brings those same methods online, so you can learn and practise them at your own pace.</p>
            <ul className="creds">
              <li><span className="cred-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg></span><span><strong>10+ years</strong>cross-cultural negotiation</span></li>
              <li><span className="cred-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 12h7M8.5 9h5" /></svg></span><span><strong>Persuasion expert</strong>sales &amp; business development</span></li>
              <li><span className="cred-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /><path d="M18.5 4.5c1 .9 1.5 2.1 1.5 3.5s-.5 2.6-1.5 3.5M5.5 4.5C4.5 5.4 4 6.6 4 8s.5 2.6 1.5 3.5" /></svg></span><span><strong>Human behaviour</strong>specialist</span></li>
              <li><span className="cred-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5-10-5z" /><path d="M6 11v5c1.7 1.4 3.7 2 6 2s4.3-.6 6-2v-5" /><path d="M22 9v5" /></svg></span><span><strong>Master's degree</strong>Management &amp; Psychology</span></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="wrap" style={{ paddingBlock: '2rem', borderTop: '1px solid var(--line)' }}>
        <p className="small muted">© 2026 HIT Academy by Human Interactions Translated · Offenbach, Germany · All rights reserved · <LegalLinks /></p>
      </footer>
    </>
  )
}
