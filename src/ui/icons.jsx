const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const Icon = {
  check: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...P} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>,
  arrowR: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...P} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  arrowL: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...P} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...P} {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>,
  play: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...P} {...p}><path d="M8 5.5v13l10-6.5z" /></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...P} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  close: (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...P} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>,
  download: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...P} {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>,
  award: (p) => <svg viewBox="0 0 48 48" width="48" height="48" {...p}><circle cx="24" cy="19" r="13" style={{ fill: 'var(--orange)' }} /><circle cx="24" cy="19" r="8.5" fill="none" stroke="#fff" strokeWidth="2" /><path d="M16 29l-4 14 7-3 4 6 3-14M32 29l4 14-7-3-4 6" style={{ fill: 'var(--navy-2)' }} /></svg>,
  layers: (p) => <svg viewBox="0 0 24 24" {...P} {...p}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  chat: (p) => <svg viewBox="0 0 24 24" {...P} {...p}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></svg>,
  target: (p) => <svg viewBox="0 0 24 24" {...P} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r=".8" fill="currentColor" /></svg>,
  device: (p) => <svg viewBox="0 0 24 24" {...P} {...p}><rect x="3" y="5" width="13" height="10" rx="1.5" /><rect x="17" y="9" width="4.5" height="10" rx="1" /><path d="M7 19h6" /></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" {...P} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" {...P} {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>,
}
