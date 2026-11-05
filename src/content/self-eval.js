// Course self-evaluation: the same 20 statements before Module 1 and after all 7 modules.
// Students rate each from 1 to 5. Answers live in progress.selfEval (see ui/SelfEval.jsx).
// To change the wording, edit `text`. Keep the ids stable so earlier answers still line up.

export const SCALE = ['', 'Not like me at all', 'Rarely', 'Sometimes', 'Usually', 'Very much like me']

// One skill area per module, in course order.
export const AREAS = [
  { id: 'm1', short: 'Behaviour & style', title: "The Negotiator's Blueprint" },
  { id: 'm2', short: 'Strategic empathy', title: 'The Voice of Influence' },
  { id: 'm3', short: 'Reading the unspoken', title: 'The Silent Advantage' },
  { id: 'm4', short: 'Interests & options', title: 'Break the Stalemate' },
  { id: 'm5', short: 'Preparation', title: 'Win Before You Begin' },
  { id: 'm6', short: 'Perception', title: 'Shape Their Reality' },
  { id: 'm7', short: 'Objections & tactics', title: 'From Resistance to Resolution' },
]

export const QUESTIONS = [
  { id: 'q1', area: 'm1', text: 'In a tense work conversation, I can tell whether I am acting passively, aggressively, manipulatively or assertively.' },
  { id: 'q2', area: 'm1', text: 'I know my default conflict style and can switch to a different strategy when the situation calls for it.' },
  { id: 'q3', area: 'm1', text: 'I stay assertive under pressure: clear about what I need while respecting the other side.' },
  { id: 'q4', area: 'm2', text: 'I notice my own emotions and manage them before they shape what I say.' },
  { id: 'q5', area: 'm2', text: "I can name the other person's emotions out loud in a way that calms the conversation." },
  { id: 'q6', area: 'm2', text: 'I choose my tone of voice on purpose to steer a conversation.' },
  { id: 'q7', area: 'm3', text: 'I can tell a real yes from a polite or counterfeit one.' },
  { id: 'q8', area: 'm3', text: 'When someone says no, I stay calm and use it to keep the conversation going.' },
  { id: 'q9', area: 'm3', text: 'I use silence and pauses on purpose instead of rushing to fill them.' },
  { id: 'q10', area: 'm4', text: 'I look past what people demand to the interests and needs behind it.' },
  { id: 'q11', area: 'm4', text: 'When talks are stuck, I can create options that work for both sides.' },
  { id: 'q12', area: 'm4', text: 'I use fair, objective criteria rather than pressure to settle disagreements.' },
  { id: 'q13', area: 'm5', text: 'Before an important negotiation, I set clear goals and a walk-away point.' },
  { id: 'q14', area: 'm5', text: "I know my alternatives and my leverage, and the other side's, before I walk into the room." },
  { id: 'q15', area: 'm5', text: 'I can estimate the range where a deal is possible before talks start.' },
  { id: 'q16', area: 'm6', text: 'I can set a first offer with confidence, and I am not thrown by an extreme one.' },
  { id: 'q17', area: 'm6', text: 'I frame proposals so the other side clearly sees what they gain, or what they would lose.' },
  { id: 'q18', area: 'm6', text: 'I ask open "how" and "what" questions that get the other side working on the problem with me.' },
  { id: 'q19', area: 'm7', text: 'I recognise common pressure tactics, such as ultimatums, nibbling or "my boss won\'t allow it", and respond without giving in.' },
  { id: 'q20', area: 'm7', text: 'I handle objections calmly and reach agreement while keeping the relationship intact.' },
]

// Average rating per area and overall for one set of answers ({ q1: 4, ... }). null where nothing is rated.
export function summarise(answers = {}) {
  const avg = (xs) => (xs.length ? xs.reduce((a, x) => a + x, 0) / xs.length : null)
  const areas = AREAS.map((a) => ({ ...a, avg: avg(QUESTIONS.filter((q) => q.area === a.id).map((q) => answers[q.id]).filter(Boolean)) }))
  return { areas, overall: avg(QUESTIONS.map((q) => answers[q.id]).filter(Boolean)) }
}
