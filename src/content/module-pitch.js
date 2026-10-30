// Sales copy for each module, shown on the dashboard while a module is locked
// (and as a short "what you'll get" on the checkout page).
//
// - identity: who the student becomes. One line.
// - skills: three concrete things they will be able to do.
// - useIt: real situations where they will use it.
// - extra: optional lines added to the top of "What's inside".
// - preview: one exercise from the module that anyone can try for free on the dashboard.
//   `step` is the step id in the module, `t` the block type, `id` the activity id (for 'activity').
//
// The "What's inside" counts (lessons, exercises, role-play, quiz questions, worksheet) are
// worked out from the module content itself, in moduleInside() below, so they stay true when a
// module changes.

export const pitch = {
  m1: {
    identity: 'Know exactly how you come across, and choose your approach on purpose.',
    skills: [
      'Recognise aggressive, passive, manipulative and assertive behaviour, in others and in yourself.',
      'Pick the right one of the five strategies for the outcome, the person and the context.',
      'Stay assertive with any type of counterpart without giving up your position.',
    ],
    useIt: ['Salary review', 'Team disagreement', 'Supplier price talk'],
  },
  m2: {
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
    identity: 'Stay in control when the other side plays hardball.',
    skills: [
      'Recognise 20 common tactics, from ultimatums to last-minute add-ons.',
      'Counter each one calmly with a ready script, a question or your BATNA.',
      'Know when a tactic is fair to use, and when it crosses into manipulation.',
    ],
    useIt: ['Vendor pressure', 'Salary talk', '"Final offer" ultimatums'],
    extra: ['20 tactics, each with counter-scripts'],
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

// Tools that get their own line under "What's inside".
const TOOLS = {
  voices: (b) => `${b.items.length} voice recordings by Raad`,
  breathing: () => 'Guided breathing exercise',
  silence: () => 'Guided pause practice',
  options: () => 'Invent-then-judge option board',
  batnaMeter: () => 'BATNA strength meter',
  zopa: () => 'Deal-zone (ZOPA) lab',
  anchorLab: () => 'Anchoring lab',
  selector: () => 'Strategy selector',
}
const PRACTICE = new Set(['activity', 'flipCards', 'situationCards'])

// "What's inside", counted from the module content.
export function moduleInside(mod) {
  const blocks = blocksOf(mod)
  const lessons = mod.sections.filter((s) => s.kind === 'lesson').length
  const roleplays = blocks.filter((b) => b.t === 'activity' && b.kind === 'branching').length
  const exercises = blocks.filter((b) => PRACTICE.has(b.t) && !(b.t === 'activity' && b.kind === 'branching')).length
  const scenes = blocks.filter((b) => b.t === 'scene' || b.t === 'compareDialogues').length
  const tools = [...new Set(blocks.filter((b) => TOOLS[b.t]).map((b) => TOOLS[b.t](b)))]
  const quiz = mod.quiz?.questions?.length || 0
  const worksheet = blocks.some((b) => b.t === 'worksheet')
  const n = (k, one, many) => `${k} ${k === 1 ? one : many}`
  return [
    ...(pitch[mod.id]?.extra || []),
    n(lessons, 'short lesson', 'short lessons'),
    exercises && n(exercises, 'interactive exercise', 'interactive exercises'),
    roleplays && n(roleplays, 'branching role-play', 'branching role-plays'),
    scenes && n(scenes, 'example dialogue', 'example dialogues'),
    ...tools,
    quiz && n(quiz, 'quiz question', 'quiz questions'),
    worksheet && 'Printable planning worksheet',
    mod.duration && `About ${mod.duration}`,
  ].filter(Boolean)
}
