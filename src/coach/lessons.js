// The coach's lesson map: which course lesson teaches which topic.
// At the end of an answer the coach points the learner to ONE lesson from this list, written as a
// token like [[m5/l3-what]]. The chat turns the token into a link to that page. Tokens that are not
// in this list are dropped, so the coach can never send a learner to a page that doesn't exist.
// Every id is "moduleId/stepId" from the module content (checked by scripts/check-coach-lessons.mjs).

export const LESSONS = [
  // Module 1: The Negotiator's Blueprint
  ['m1/l1-criteria', 'what a good negotiation is; the three tests of a good outcome'],
  ['m1/l2-overview', 'the four behaviours: aggressive, passive, manipulative / passive-aggressive, assertive'],
  ['m1/l2-passive', 'giving in, caving under pressure, saying yes too fast, avoiding asking for what you want'],
  ['m1/l2-aggressive', 'handling or avoiding aggressive behaviour, a pushy or hostile counterpart'],
  ['m1/l2-manipulative', 'guilt-tripping, passive-aggressive or manipulative counterparts'],
  ['m1/l2-assertive', 'being assertive: firm, calm and respectful; asking for what you want'],
  ['m1/l3-adapt', 'adapting your tone to the counterpart: calm assertiveness, transparent assertiveness'],
  ['m1/l4-intro', 'the five strategies: competing, collaborating, compromising, avoiding, accommodating'],
  ['m1/l5-factors', 'choosing a strategy by outcome, relationship and context'],
  ['m1/l6-bridge', 'combining behaviour and strategy; salary review conversations'],
  ['m1/l7-pareto', 'prioritising issues, spending effort where it counts (Pareto)'],
  // Module 2: The Voice of Influence
  ['m2/l1-felt', 'why emotions drive decisions; the emotional layer of a negotiation'],
  ['m2/l2-self-regulation', 'staying calm under pressure, managing your own emotions and nerves'],
  ['m2/l2-anchors', 'physical techniques to stay composed (breathing, grounding)'],
  ['m2/l2-social', 'reading the other side: social awareness, body language, cues'],
  ['m2/l3-reactions', 'responding to emotional reactions: anger, frustration, defensiveness'],
  ['m2/l4-voices', 'voice tonality: Midnight voice (FM RJ), assertive voice, playful voice'],
  ['m2/l5-signs', 'de-escalation: when a conversation is heating up'],
  ['m2/l5-allegation', 'Allegation Assessment: naming the accusations before they make them'],
  ['m2/l5-empathy', 'strategic empathy, labeling and verbal mirroring'],
  ['m2/l6-flow', 'confronting someone without confrontation; difficult conversations with colleagues or clients; giving hard feedback'],
  // Module 3: The Silent Advantage
  ['m3/l1-counterfeit', 'counterfeit yes: agreement that is not real, people who say yes and don\'t follow through'],
  ['m3/l2-ensure', 'turning a yes into a real commitment (what, when, who); follow-through, next steps'],
  ['m3/l3-no', 'why "no" is good news; getting a no'],
  ['m3/l3-invite', 'no-oriented questions; inviting "no" early'],
  ['m3/l3-handling', 'handling a "no" or a rejection productively'],
  ['m3/l4-silence', 'the power of silence'],
  ['m3/l4-pauses', 'strategic pauses: when and how to pause'],
  // Module 4: Break the Stalemate
  ['m4/l1-principled', 'principled vs positional bargaining; deadlocks and stalemates'],
  ['m4/l2-how', 'separating the people from the problem; protecting the relationship'],
  ['m4/l3-needs', 'the six basic human needs (security, economic well-being, belonging, recognition, control, fairness)'],
  ['m4/l3-how', 'finding the interests behind positions; what the other side really wants'],
  ['m4/l4-how', 'generating options, creative solutions, trades, win-win packages'],
  ['m4/l5-standards', 'objective criteria: market rates, benchmarks, fair standards and procedures'],
  ['m4/l5-firm', 'not yielding to pressure; staying principled'],
  // Module 5: Win Before You Begin
  ['m5/l1-importance', 'why preparation wins; preparing for a negotiation'],
  ['m5/l2-goals', 'setting goals: ideal outcome, minimum acceptable, walk-away point, priorities'],
  ['m5/l3-what', 'BATNA: your best alternative if there is no deal'],
  ['m5/l3-strengthen', 'strengthening your BATNA; creating alternatives (other offers, other suppliers)'],
  ['m5/l3-theirs', 'estimating the other side\'s BATNA'],
  ['m5/l3-zopa', 'ZOPA: the zone of possible agreement'],
  ['m5/l4-types', 'leverage: types of leverage and where it comes from'],
  ['m5/l4-use', 'using leverage and timing effectively'],
  ['m5/l5-framework', 'the five-step execution framework; job offers and salary negotiations'],
  ['m5/l6-checklist', 'the ultimate preparation checklist'],
  // Module 6: Shape Their Reality
  ['m6/l2-apply', 'loss aversion: framing what they stand to lose'],
  ['m6/l3-how', 'anchoring: making the first offer, setting the number, counter-anchoring'],
  ['m6/l4-how', 'the fairness play: appealing to fairness'],
  ['m6/l5-how', 'the illusion of choice: offering options'],
  ['m6/l6-how', 'calibrated questions ("how" and "what" questions)'],
  ['m6/l7-how', 'reciprocity: giving to get, concessions in return'],
  // Module 7: From Resistance to Resolution
  ['m7/l1-decode', 'decoding any tactic: recognise it, raise it, question it'],
  ['m7/l2-ultimatum', 'ultimatums, threats, "final offer", "take it or leave it"'],
  ['m7/l2-deadline', 'false deadlines and time pressure'],
  ['m7/l2-outburst', 'emotional outbursts as a tactic'],
  ['m7/l2-silence', 'silence used against you'],
  ['m7/l2-flinch', 'the flinch (shocked reaction to your number)'],
  ['m7/l3-highball', 'highball / lowball offers, extreme first offers'],
  ['m7/l3-bracketing', 'bracketing, "let\'s split the difference"'],
  ['m7/l3-bogey', 'the bogey ("we only have budget for X", fake constraints)'],
  ['m7/l3-nibbling', 'nibbling: small extra demands after agreement'],
  ['m7/l3-cherry', 'cherry picking parts of your offer; price discount demands against competitor quotes'],
  ['m7/l4-herring', 'red herrings: distractions from the real issue'],
  ['m7/l4-strawman', 'strawman proposals'],
  ['m7/l4-dumb', 'playing dumb'],
  ['m7/l4-overwhelm', 'overwhelming with information'],
  ['m7/l4-delay', 'deliberate delays, stalling, not getting a reply'],
  ['m7/l5-goodcop', 'good cop / bad cop'],
  ['m7/l5-limited', 'limited authority ("I can\'t decide this")'],
  ['m7/l5-higher', 'appealing to higher authority ("I need to check with my boss")'],
  ['m7/l5-divide', 'divide and conquer across a team or a buying committee'],
  ['m7/l5-lastminute', 'last-minute changes before signing'],
]

const IDS = new Set(LESSONS.map(([id]) => id))
export const TOKEN = /\[\[\s*(m\d\/[a-z0-9-]+)\s*\]\]/g

// The list the coach sees in its rules.
export function lessonList(modules, owned) {
  return LESSONS.map(([id, topic]) => {
    const l = lessonOf(modules, id)
    if (!l) return null
    const locked = owned && !owned.has(l.moduleId) ? ' (LOCKED for this learner)' : ''
    return `[[${id}]] ${l.label}${locked}: ${topic}`
  }).filter(Boolean).join('\n')
}

// The page a token points to, or null when it is not on the map (or no longer in the course).
export function lessonOf(modules, id) {
  if (!IDS.has(id)) return null
  const [moduleId, stepId] = id.split('/')
  const m = modules[moduleId]
  const sec = m?.sections.find((s) => s.steps.some((st) => st.id === stepId))
  if (!sec) return null
  const step = sec.steps.find((st) => st.id === stepId)
  const lesson = sec.title.replace(/^\d+\s*·\s*/, '')
  return { moduleId, stepId, label: `Module ${m.number} · ${lesson}`, page: step.title }
}

// Plain text for read-aloud: tokens become the lesson's name; unknown tokens disappear.
export function lessonsAsText(text, modules) {
  return String(text).replace(TOKEN, (_, id) => lessonOf(modules, id)?.label || '').replace(/\s+([.,!?])/g, '$1')
}
