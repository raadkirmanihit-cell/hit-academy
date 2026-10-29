// Course catalogue. Each module listed here appears on the dashboard and sales page.
// A module becomes available as soon as its content file is registered in ./index.js.
export const course = {
  id: 'hit-negotiation',
  title: 'Negotiation & Conflict Resolution',
  tagline: 'Master difficult conversations when the stakes are high',
  author: 'Raad Kirmani',
  org: 'Human Interactions Translated',
  orgShort: 'H.I.T.',
  // Prices live in pricing.js (€99 for all 7 modules, €19 per module).
  product: { id: 'hit-negotiation-selfpaced', name: 'Self-paced course, lifetime access', price: 99, currency: 'EUR' },
  certificate: {
    // 'all' = every module below must be complete (use this in production).
    // 'all-published' = only modules released so far (useful while modules are still arriving).
    requires: 'all',
    signatory: 'Raad Kirmani',
    signatoryRole: 'Founder, Human Interactions Translated',
  },
  modules: [
    { id: 'm1', number: 1, title: "The Negotiator's Blueprint", subtitle: 'Behavior, Style vs Strategies & Adaptability' },
    { id: 'm2', number: 2, title: 'The Voice of Influence', subtitle: 'Mastering Strategic Empathy Through Emotional Intelligence' },
    { id: 'm3', number: 3, title: 'The Silent Advantage', subtitle: 'Reading the Unspoken Yes, No and Pause' },
    { id: 'm4', number: 4, title: 'Break the Stalemate', subtitle: 'From Positional Power to Principled Progress' },
    { id: 'm5', number: 5, title: 'Win Before You Begin', subtitle: 'The Ultimate Preparation Framework' },
    { id: 'm6', number: 6, title: 'Shape Their Reality', subtitle: 'The Psychology of Perception' },
    { id: 'm7', number: 7, title: 'From Resistance to Resolution', subtitle: 'Mastering Objections with Integrity' },
  ],
}
