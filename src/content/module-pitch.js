// Sales copy for each module, shown on the dashboard while a module is locked
// (and as a short "what you'll get" on the checkout page).
//
// - identity: who the student becomes. One line.
// - skills: three concrete things they will be able to do.
// - useIt: real situations where they will use it.
// - usp: the two "What's inside" lines unique to this module (always exactly two).
// - preview: one exercise from the module that anyone can try for free on the dashboard.
//   `step` is the step id in the module, `t` the block type, `id` the activity id (for 'activity').
//
// "What's inside" is the same 8 lines for every module: 2 unique (usp) + 6 shared (see moduleInside).

export const pitch = {
  m1: {
    usp: ['Strategy selector tool', 'Adapt-your-style drill'],
    identity: 'Know exactly how you come across, and choose your approach on purpose.',
    skills: [
      'Recognise aggressive, passive, manipulative and assertive behaviour, in others and in yourself.',
      'Pick the right one of the five strategies for the outcome, the person and the context.',
      'Stay assertive with any type of counterpart without giving up your position.',
    ],
    useIt: ['Salary review', 'Team disagreement', 'Supplier price talk'],
  },
  m2: {
    usp: ['Voice recordings for each approach', 'Guided breathing exercise'],
    identity: 'Stay calm when others get heated, and turn tension into trust.',
    skills: [
      'Hear the emotional conversation behind the one about price and deadlines.',
      'Keep your composure under pressure with breathing, grounding and anchor phrases.',
      'De-escalate an angry counterpart with your voice, labels, mirrors and an Allegation Assessment.',
    ],
    useIt: ['Furious client', 'Tense team meeting', 'Family argument'],
    preview: { step: 'l4-voices', t: 'voices', label: 'Listen to the three voices', note: 'Hear Raad demonstrate the assertive, midnight and playful voice.' },
  },
  m3: {
    usp: ['Guided pause practice', 'Scripts to turn a polite yes into commitment'],
    identity: 'Hear what people really mean, even when they say "yes".',
    skills: [
      'Tell a polite "yes" from a real commitment, and turn one into the other.',
      'Ask questions that make "no" feel safe, so honest objections come out early.',
      'Use silence and six strategic pauses to draw out information and calm tension.',
    ],
    useIt: ['Client says "sounds good"', 'Contract renewal', 'Asking for buy-in'],
    preview: { step: 'l3-practice', t: 'activity', id: 'a-ask-for-no', label: 'Try: ask for the "no"' },
  },
  m4: {
    usp: ['Invent-then-judge option board', 'Six human needs guide'],
    identity: 'Get a stuck conversation moving without giving in.',
    skills: [
      'Separate the people from the problem, so you can be soft on one and firm on the other.',
      'Uncover the interests behind fixed positions with "how" and "what" questions.',
      'Invent options for mutual gain and settle differences with objective criteria.',
    ],
    useIt: ['Deadlocked price talk', 'Budget fight between teams', 'Long-running dispute'],
    preview: { step: 'l3-practice', t: 'activity', id: 'a-position-interest', label: 'Try: position or interest?' },
  },
  m5: {
    usp: ['BATNA strength meter', 'Deal-zone (ZOPA) lab'],
    identity: 'Walk into any negotiation already knowing your walk-away point.',
    skills: [
      'Set your ideal outcome, your walk-away point and what you can trade.',
      'Know your BATNA and theirs, and find the zone where a deal is possible.',
      'Spot your leverage and build a full preparation plan with one checklist.',
    ],
    useIt: ['Job offer or raise', 'Contract negotiation', 'Big purchase'],
    preview: { step: 'l3-strengthen', t: 'batnaMeter', label: 'Try the BATNA meter' },
  },
  m6: {
    usp: ['Anchoring lab', 'Six perception principles in action'],
    identity: 'Frame your offer so the other side sees its value, with integrity.',
    skills: [
      'Set a credible anchor, or reset one when the other side goes first.',
      'Frame offers around what they stand to lose, and give choices instead of yes-or-no.',
      'Ask calibrated "how" and "what" questions, and give value first to build goodwill.',
    ],
    useIt: ['Quoting a price', 'Contract renewal', 'Salary range'],
    preview: { step: 'l3-what', t: 'anchorLab', label: 'Try the anchor lab' },
  },
  m7: {
    usp: ['20 tactics, each with counter-scripts', 'Ethical-use check for every tactic'],
    identity: 'Stay in control when the other side plays hardball.',
    skills: [
      'Recognise 20 common tactics, from ultimatums to last-minute add-ons.',
      'Counter each one calmly with a ready script, a question or your BATNA.',
      'Know when a tactic is fair to use, and when it crosses into manipulation.',
    ],
    useIt: ['Vendor pressure', 'Salary talk', '"Final offer" ultimatums'],
    preview: { step: 'l2-counter', t: 'activity', id: 'a-counter-pressure', label: 'Try: choose the counter' },
  },
}

const stepsOf = (mod) => mod.sections.flatMap((s) => s.steps)
const blocksOf = (mod) => stepsOf(mod).flatMap((s) => s.blocks || [])

// The block used as the free preview, or null if it can't be found.
export function previewBlock(mod) {
  const p = pitch[mod.id]?.preview
  if (!p) return null
  const section = mod.sections.find((s) => s.steps.some((st) => st.id === p.step))
  const step = section?.steps.find((s) => s.id === p.step)
  const b = step?.blocks?.find((x) => x.t === p.t && (!p.id || x.id === p.id))
  return b ? { block: b, step, lesson: section.title, ...p } : null
}

// "What's inside": every module has the same 8 lines, so modules sold at the same price look
// equal: its two unique lines (usp) first, then the same six for every module. No counts or times.
export const CORE_INSIDE = ['Short lessons', 'Interactive exercises', 'A branching role-play', 'Example dialogues', 'Knowledge-check quiz', 'Printable planning worksheet']
export function moduleInside(mod) {
  return { usp: pitch[mod.id]?.usp || [], core: CORE_INSIDE }
}
