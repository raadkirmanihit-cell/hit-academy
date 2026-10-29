import { useState } from 'react'
import { useApp } from '../App.jsx'
import { Md } from './md.jsx'
import { TERMS, TERMS_UPDATED, TERMS_VERSION, LEGAL } from '../content/terms.js'
import { PRIVACY, PRIVACY_UPDATED, PRIVACY_VERSION, IMPRINT } from '../content/privacy.js'

// The legal pages, opened at /?page=terms, /?page=privacy and /?page=imprint.
export const LEGAL_PAGES = {
  terms: { title: 'Terms and Conditions', sections: TERMS, meta: `Version ${TERMS_VERSION} · Last updated ${TERMS_UPDATED}`, toc: true },
  privacy: { title: 'Privacy Policy', sections: PRIVACY, meta: `Version ${PRIVACY_VERSION} · Last updated ${PRIVACY_UPDATED}`, toc: true },
  imprint: { title: 'Legal notice (Impressum)', sections: IMPRINT, meta: '' },
}

// Link that opens the Terms page in a new tab, so a half-filled form is not lost.
export function TermsLink({ page = 'terms', children = LEGAL_PAGES[page].title }) {
  return <a href={`/?page=${page}`} target="_blank" rel="noopener">{children}</a>
}

// Footer links to all legal pages.
export function LegalLinks() {
  return <><TermsLink /> · <TermsLink page="privacy" /> · <TermsLink page="imprint">Legal notice</TermsLink></>
}

function Section({ s }) {
  return (
    <section id={`terms-${s.id}`} className="stack" style={{ gap: '.7rem' }}>
      <h3>{s.title}</h3>
      {s.body.map((b, i) => b.list
        ? <ul key={i}>{b.list.map((li, k) => <li key={k}><Md text={li} /></li>)}</ul>
        : <Md key={i} as="p" text={b} />)}
    </section>
  )
}

export default function TermsPage({ page = 'terms' }) {
  const { user, paid, go } = useApp()
  const doc = LEGAL_PAGES[page] || LEGAL_PAGES.terms
  return (
    <div className="wrap" style={{ paddingBlock: '2.5rem 4rem' }}>
      <article className="prose terms fade-in">
        <span className="eyebrow">H.I.T. Academy</span>
        <h1>{doc.title}</h1>
        <p className="small muted">{doc.meta ? `${doc.meta} · ` : ''}{LEGAL.name}</p>
        {doc.toc && (
          <nav className="card terms-toc" aria-label="Contents">
            <b className="small">Contents</b>
            <ol>{doc.sections.map((s) => <li key={s.id}><a href={`#terms-${s.id}`}>{s.title.replace(/^\d+\.\s*/, '')}</a></li>)}</ol>
          </nav>
        )}
        {doc.sections.map((s) => <Section key={s.id} s={s} />)}
        <div className="row" style={{ gap: '.6rem' }}>
          <button className="btn btn-ghost" onClick={() => window.print()}>Print or save as PDF</button>
          <button className="btn btn-primary" onClick={() => go(user ? (paid ? 'dashboard' : 'checkout') : 'landing')}>Back</button>
        </div>
      </article>
    </div>
  )
}

// Shown once to a signed-in student who has not yet accepted the current Terms
// (accounts created before the Terms existed, or after the Terms change).
export function AcceptTerms() {
  const { acceptTerms, signOut } = useApp()
  const [ok, setOk] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  return (
    <div className="wrap auth-shell">
      <form className="card auth-card fade-in stack" style={{ gap: '1rem' }} onSubmit={async (e) => {
        e.preventDefault()
        if (!ok) return setErr('Please tick the box to continue.')
        setBusy(true); setErr('')
        try { await acceptTerms() } catch (x) { setErr(x.message); setBusy(false) }
      }}>
        <span className="eyebrow">Before you continue</span>
        <h2>Our Terms and Conditions</h2>
        <p className="muted small">Please read and accept our Terms and Conditions to keep using the course.</p>
        <TermsCheckbox checked={ok} onChange={setOk} />
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'One moment…' : 'Accept and continue'}</button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button>
      </form>
    </div>
  )
}

export function TermsCheckbox({ checked, onChange }) {
  return (
    <label className="waiver">
      <input type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        I have read and agree to the <TermsLink /> and have read the <TermsLink page="privacy" />. I understand that the course is for educational purposes only,
        that no results are guaranteed, and that it is not legal, psychological, medical or financial advice.
      </span>
    </label>
  )
}
