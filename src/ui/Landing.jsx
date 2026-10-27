import { useApp } from '../App.jsx'
import { Icon } from './icons.jsx'

const features = [
  { icon: 'layers', title: 'Seven in-depth modules', text: 'From behaviour and strategy to empathy, body language, preparation, perception and objections.' },
  { icon: 'chat', title: 'Practise, not just read', text: 'Role-plays with branching dialogue, sorting exercises and real workplace scenarios.' },
  { icon: 'target', title: 'Graded quizzes', text: 'Feedback on every answer, so you know exactly why a response works or fails.' },
  { icon: 'clock', title: 'Self-paced', text: 'Progress saves automatically. Pick up exactly where you left off.' },
  { icon: 'doc', title: 'Worksheets', text: 'A downloadable planning worksheet for every module to use before real negotiations.' },
  { icon: 'device', title: 'Any device', text: 'Learn on your laptop at work or your phone on the train.' },
]

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
            <div className="quote"><p>Changed how I handle business conversations. I lead with clarity and calm.</p><span className="small muted">Sara T., Tech Entrepreneur</span></div>
            <div className="quote"><p>I used the preparation framework in a compensation discussion and got a better offer.</p><span className="small muted">Arun T., Sr. Program Manager</span></div>
            <div className="quote"><p>A game changer for high-stakes negotiations.</p><span className="small muted">Milena B., Senior Sales Manager</span></div>
          </div>
          <p className="small muted">Paraphrased from testimonials on humaninteractionstranslated.com.</p>
          <div><button className="btn btn-dark" onClick={cta}>Start Module 1 <Icon.arrowR /></button></div>
        </div>
      </section>
      <footer className="wrap" style={{ paddingBlock: '2rem', borderTop: '1px solid var(--line)' }}>
        <p className="small muted">© 2026 Human Interactions Translated · Offenbach, Germany · All rights reserved</p>
      </footer>
    </>
  )
}
