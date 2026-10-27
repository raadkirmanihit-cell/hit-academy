// Interactive activities for Module 2. Built from the module's own concepts and examples.

export const twoConversations = {
  id: 'a-two-conversations',
  kind: 'classify',
  title: 'Which conversation is it?',
  prompt: 'Every negotiation runs two conversations at once. Drag each item to the conversation it belongs to. On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'rational', label: 'Rational conversation', hint: 'What is said', color: 'var(--navy-2)' },
    { id: 'emotional', label: 'Emotional conversation', hint: 'What is felt', color: 'var(--orange)' },
  ],
  items: [
    { id: 'c1', text: 'The delivery date in the contract', answer: 'rational', why: 'A deadline is part of the substance of the deal.' },
    { id: 'c2', text: 'Feeling that the other side is talking down to you', answer: 'emotional', why: 'This is about respect and status.' },
    { id: 'c3', text: 'The price per unit', answer: 'rational', why: 'Price is the classic rational issue.' },
    { id: 'c4', text: 'Worry about looking weak in front of your boss', answer: 'emotional', why: 'Fear and status, even though nobody says it out loud.' },
    { id: 'c5', text: 'Who is responsible for testing', answer: 'rational', why: 'Roles and responsibilities are part of what is said.' },
    { id: 'c6', text: 'Suspicion that the offer is a trick', answer: 'emotional', why: 'A question of trust.' },
    { id: 'c7', text: 'Being interrupted three times in one meeting', answer: 'emotional', why: 'Small gestures like interruptions erode trust and respect.' },
    { id: 'c8', text: 'Sense that the split is unfair to your team', answer: 'emotional', why: 'Perceived fairness lives in the emotional conversation, even when the numbers are rational.' },
  ],
}

export const readTheRoom = {
  id: 'a-read-room',
  kind: 'scenarios',
  title: 'Read the room',
  prompt: 'Five moments from a supplier negotiation. Each time, pick what a socially aware negotiator would do next.',
  items: [
    {
      who: 'Tone shift', scene: 'Until now the buyer has been chatty. When you mention the new payment terms, she starts speaking faster and her answers get shorter.',
      options: [
        { t: 'Keep going through the terms quickly so you finish on time.', fb: 'You notice nothing, and her resistance hardens before you reach the end.' },
        { t: 'Pause and say: "I notice the payment terms might have hit a nerve. What\'s on your mind?"', fb: 'A change in tone often signals a change in emotion. Naming it early lets you adapt before resistance sets in.', correct: true },
        { t: 'Ask whether she is in a hurry and offer to reschedule.', fb: 'Considerate, but it misreads the signal. The shift came with a topic, not with the clock.' },
      ],
    },
    {
      who: 'Body language', scene: 'Their finance lead has crossed his arms, is sighing, and has stopped making eye contact. He has not said anything.',
      options: [
        { t: 'Ignore it. He hasn\'t raised an objection, so there isn\'t one.', fb: 'The body often reveals what the mouth conceals. Silence is not agreement.' },
        { t: 'Ask him directly: "You don\'t seem happy. What\'s the problem?"', fb: 'Right instinct, but blunt. Putting him on the spot in front of others may make him defensive.' },
        { t: 'Bring him in gently: "I\'d value your view on the numbers. Is anything not sitting right?"', fb: 'You read the signal and create a safe opening for him to speak.', correct: true },
      ],
    },
    {
      who: 'Emotional hot spot', scene: 'They keep returning to the font size on the invoice template. It seems trivial, but it has come up three times.',
      options: [
        { t: 'Concede it quickly so you can move on to what matters.', fb: 'Quick, but you may miss what the detail represents, and the real concern will return elsewhere.' },
        { t: 'Point out that it is a minor issue and steer back to the agenda.', fb: 'Calling it minor dismisses what feels important to them and raises tension.' },
        { t: 'Explore it: "This seems important to you. What happened with the last invoices?"', fb: 'A detail that does not seem logical usually means you have hit an emotional nerve. Pause and explore.', correct: true },
      ],
    },
    {
      who: 'Group energy', scene: 'In a group call, one of their engineers was very engaged earlier. Since you proposed the new timeline, she has gone completely quiet.',
      options: [
        { t: 'Note it, and ask: "Priya, you know the build best. How does this timeline look from where you sit?"', fb: 'Who is suddenly quiet? Tracking engagement lets you surface a concern before it becomes a blocker.', correct: true },
        { t: 'Nothing. Quiet people usually agree.', fb: 'A sudden drop in energy is a signal, not consent.' },
        { t: 'Message her privately after the call to ask if she is okay.', fb: 'Kind, but the timeline will already be agreed without her input.' },
      ],
    },
    {
      who: 'Polite words, rising tension', scene: 'Their director says, smiling: "That\'s an interesting proposal. I\'m sure your team worked very hard on it." Her colleagues glance at each other.',
      options: [
        { t: 'Thank her and move to signatures.', fb: 'You heard the words but missed the weather of the room.' },
        { t: 'Check in: "I sense there may be some reservations. I\'d rather hear them now than later."', fb: 'Tension under polite words is common. Naming what you sense gives them permission to be direct.', correct: true },
        { t: 'Explain the proposal again in more detail.', fb: 'More logic will not shift a feeling you have not acknowledged.' },
      ],
    },
  ],
}

export const decodeCards = [
  { front: '"We\'re not comfortable with this pricing."', layer: 'Fear of being taken advantage; lack of trust; budget anxiety.', say: '"Totally fair. Can you share more about what would feel reasonable on your end?"', why: 'Invites collaboration and restores a sense of control; shifts from conflict to co-creation.' },
  { front: '"We\'ll need to think about it."', layer: 'Hesitation due to pressure, internal politics, or distrust.', say: '"Of course. What concerns do you think your team might raise that we could address now?"', why: 'Surfaces hidden objections early and shows respect for their process.' },
  { front: '"That\'s not how we do things."', layer: 'Desire to maintain control; fear of change; a threat to identity or culture.', say: '"Sounds like this would require a shift. What would make that feel safer or more manageable?"', why: 'Acknowledges resistance to change and invites them to define safer terms.' },
  { front: '"Your offer seems unrealistic."', layer: 'Feeling undervalued or disrespected; fear of manipulation.', say: '"I hear that. Can you help me understand what would feel more aligned with your expectations?"', why: 'Shows openness to feedback and lowers defensiveness; re-engages logically.' },
  { front: '"Let me run this by my team."', layer: 'Discomfort with responsibility; fear of backlash; need for consensus.', say: '"Makes sense. Is there anything you\'d want to clarify before presenting it to them?"', why: 'Supports their internal influence; shows partnership, not pressure.' },
]

export const insteadOfSaying = {
  id: 'a-instead',
  kind: 'scenarios',
  title: 'Instead of saying… say this',
  prompt: 'Six emotional reactions you will meet at the table. Choose the reply that names or explores the emotion instead of fighting it.',
  items: [
    {
      who: 'Defensiveness', scene: '"We followed the process exactly. If something went wrong, it wasn\'t on our side."',
      options: [
        { t: '"That\'s not true. The logs show otherwise."', fb: 'You may be right, but contradiction makes a defensive person dig in.' },
        { t: '"That\'s not how I saw it, but I\'d like to understand your view."', fb: 'You keep your view without attacking theirs, and invite them to explain.', correct: true },
        { t: '"Let\'s not worry about whose fault it was."', fb: 'Better than arguing, but it skips past their need to feel heard.' },
      ],
    },
    {
      who: 'Aggression', scene: '"This is unacceptable! Do you have any idea what this delay has cost us?"',
      options: [
        { t: '"Calm down. Shouting won\'t help."', fb: '"Calm down" almost always has the opposite effect.' },
        { t: '"The delay was caused by your late approvals."', fb: 'Even if accurate, it answers anger with blame and escalates.' },
        { t: '"I can see this is important to you. Walk me through what it has cost."', fb: 'Acknowledges the intensity and turns it into information.', correct: true },
      ],
    },
    {
      who: 'Shutdown / silence', scene: 'After your proposal, your counterpart looks at the table and says nothing for a long moment.',
      options: [
        { t: '"I sense some hesitation. Is something not sitting right with you?"', fb: 'Names what you sense and gently opens the door.', correct: true },
        { t: '"You\'re being uncooperative."', fb: 'A judgement about their character pushes them further away.' },
        { t: 'Fill the silence by improving your offer.', fb: 'You negotiate against yourself without knowing what the concern is.' },
      ],
    },
    {
      who: 'Sarcasm', scene: '"Oh great, another \'exciting opportunity\' from head office."',
      options: [
        { t: '"Don\'t be difficult."', fb: 'Answers indirect resistance with a reprimand. The real issue stays hidden.' },
        { t: '"It sounds like something\'s not working for you. Want to unpack it?"', fb: 'Brings the indirect message into the open without judging it.', correct: true },
        { t: 'Laugh it off and continue.', fb: 'Keeps things light, but the resistance will show up later.' },
      ],
    },
    {
      who: 'Blame', scene: '"Your team dropped the ball, and now we\'re the ones paying for it."',
      options: [
        { t: '"That\'s not my fault."', fb: 'Defending yourself makes the conversation about blame, not about the fix.' },
        { t: '"You\'re overreacting."', fb: 'Dismisses the feeling and escalates.' },
        { t: '"I understand why that feels frustrating. Let\'s talk about what we can control going forward."', fb: 'Validates the feeling, then moves the conversation to what can be done.', correct: true },
      ],
    },
    {
      who: 'Your own frustration', scene: 'You have been going round in circles for forty minutes, and you can feel your patience running out.',
      options: [
        { t: '"This is getting us nowhere."', fb: 'True, perhaps, but it sounds like an accusation and lowers energy further.' },
        { t: '"We seem to be stuck. How do you suggest we move forward?"', fb: 'Names the situation neutrally and makes them a partner in solving it.', correct: true },
        { t: 'Say nothing and let the meeting run out of time.', fb: 'Avoids conflict, but nothing gets resolved and both sides leave frustrated.' },
      ],
    },
  ],
}

export const emotionalReactions = {
  head: ['Emotional reaction', 'Instead of saying…', 'Say this instead…'],
  rows: [
    ['Defensiveness', '"That\'s not true."', '"That\'s not how I saw it, but I\'d like to understand your view."'],
    ['Aggression', '"Calm down."', '"I can see this is important to you."'],
    ['Shutdown / silence', '"You\'re being uncooperative."', '"I sense some hesitation. Is something not sitting right with you?"'],
    ['Sarcasm / passive-aggression', '"Don\'t be difficult."', '"It sounds like something\'s not working for you. Want to unpack it?"'],
    ['Rejection / resistance', '"You\'re just saying no to everything."', '"What parts feel like they won\'t work for you?"'],
    ['Stonewalling', '"Why aren\'t you saying anything?"', '"Take your time. I\'d really like to hear your thoughts when you\'re ready."'],
    ['Accusation', '"That\'s a ridiculous claim."', '"That\'s a strong concern. Can we walk through what\'s behind it?"'],
    ['Blame', '"That\'s not my fault."', '"I understand why that feels frustrating. Let\'s talk about what we can control going forward."'],
    ['Interrupting', '"Let me finish!"', '"I\'ll get to that in just a moment. I want to make sure I fully hear you first."'],
    ['Dismissive tone', '"You\'re not taking this seriously."', '"This seems like it\'s not a top priority for you. Is there something else going on?"'],
    ['Frustration (theirs)', '"You\'re overreacting."', '"It seems like this has been building up. What\'s the core concern for you?"'],
    ['Frustration (yours)', '"This is getting us nowhere."', '"We seem to be stuck. How do you suggest we move forward?"'],
  ],
}

export const pickTheVoice = {
  id: 'a-pick-voice',
  kind: 'classify',
  title: 'Pick the voice',
  prompt: 'Nine moments. Which voice would you use for each? Sort the cards into the three voice styles.',
  buckets: [
    { id: 'assertive', label: 'Assertive', hint: 'Firm, straightforward, commanding', color: 'var(--navy-2)' },
    { id: 'midnight', label: 'Midnight (FM RJ)', hint: 'Calm, steady, slow, intimate', color: '#6b5bd2' },
    { id: 'playful', label: 'Playful / positive', hint: 'Warm, approachable, collaborative', color: 'var(--orange)' },
  ],
  cols: 3,
  items: [
    { id: 'v1', text: 'Setting a firm boundary: "We can\'t go below this price."', answer: 'assertive', why: 'Boundaries need certainty: downward inflection, steady rhythm.' },
    { id: 'v2', text: 'A colleague is close to tears after a client call', answer: 'midnight', why: 'Soothing and emotional safety come first.' },
    { id: 'v3', text: 'Kicking off a brainstorm with a new partner', answer: 'playful', why: 'Energy and openness help people feel engaged.' },
    { id: 'v4', text: 'Pitching your proposal to the board', answer: 'assertive', why: 'You need to project confidence and authority.' },
    { id: 'v5', text: 'An angry customer is shouting on the phone', answer: 'midnight', why: 'Slow, low and soft de-escalates. Matching their volume would escalate.' },
    { id: 'v6', text: 'Motivating your team on a Monday morning', answer: 'playful', why: 'Team motivation and storytelling call for warmth and rhythm.' },
    { id: 'v7', text: 'Summarising the agreed next steps at the end of a meeting', answer: 'assertive', why: '"I\'ve got this, let\'s move forward." Clarity of intent.' },
    { id: 'v8', text: 'Delivering difficult news to a long-term client', answer: 'midnight', why: '"You\'re safe here, let\'s take it slow." Builds trust under pressure.' },
    { id: 'v9', text: 'A friendly negotiation over a team-building budget', answer: 'playful', why: 'Low tension and a shared goal: "We\'re in this together."' },
  ],
}

export const spotTheTechnique = {
  id: 'a-spot-technique',
  kind: 'classify',
  title: 'Spot the technique',
  prompt: 'Eight things a negotiator says. Match each to the technique it uses.',
  buckets: [
    { id: 'allegation', label: 'Allegation Assessment', hint: 'Names their concerns first', color: 'var(--navy-2)' },
    { id: 'listening', label: 'Active listening', hint: 'Acknowledges without agreeing', color: 'var(--b-assertive)' },
    { id: 'label', label: 'Labeling', hint: 'Names the emotion', color: 'var(--orange)' },
    { id: 'mirror', label: 'Verbal Mirroring', hint: 'Repeats key words', color: '#6b5bd2' },
  ],
  items: [
    { id: 't1', text: '"You probably think I\'m only looking out for myself."', answer: 'allegation', why: 'Names a negative assumption before they say it.' },
    { id: 't2', text: '"It sounds like you\'re worried about the budget constraints."', answer: 'label', why: '"It sounds like…" followed by an emotion.' },
    { id: 't3', text: 'They: "The timeline is impossible." You: "Impossible?"', answer: 'mirror', why: 'Repeats their key word to draw them out.' },
    { id: 't4', text: '"That does seem challenging."', answer: 'listening', why: 'Acknowledges the difficulty without agreeing to anything.' },
    { id: 't5', text: '"This might seem like a one-sided proposal."', answer: 'allegation', why: 'Pre-empts an objection and takes control of the narrative.' },
    { id: 't6', text: '"It seems like you\'re frustrated with how things are moving."', answer: 'label', why: 'Names the emotion you sense.' },
    { id: 't7', text: 'They: "We\'ve been let down before." You: "Let down before?"', answer: 'mirror', why: 'Repeats the emotionally charged phrase and lets them elaborate.' },
    { id: 't8', text: '"That must be hard."', answer: 'listening', why: 'Shows you understand their situation without taking a position.' },
  ],
}

export const angryClient = {
  id: 'a-roleplay-client',
  kind: 'branching',
  title: 'Role-play: the furious client',
  intro: 'You are an account manager. Daniel, a long-standing client, has just learned that his project will be delivered two weeks late, for the second time this year. He has called you, and he is angry. Your goal: lower the temperature, understand what is really at stake for him, and agree a way forward. Watch the two meters.',
  img: 'img/m2/deescalate.webp',
  counterpart: { name: 'Daniel', initials: 'DA', role: 'Client' },
  meterLabels: ['Progress toward a solution', 'Trust'],
  start: { outcome: 20, relationship: 35 },
  nodes: {
    start: {
      say: 'Two weeks late. Again! I promised my board this would be live by the first of the month. Do you have any idea how this makes me look?',
      choices: [
        { t: '"The delay was caused by the late approvals on your side, to be fair."', tag: 'Defensive', d: [0, -25], next: 'escalated', fb: 'Even if it is partly true, you answered anger with blame. The conversation is now about who is at fault.' },
        { t: '"Daniel, please calm down so we can talk about this properly."', tag: 'Dismissive', d: [0, -20], next: 'escalated', fb: '"Calm down" signals that his feelings are the problem. It rarely calms anyone.' },
        { t: '(Slow, low, steady) "I\'m sorry, Daniel. That puts you in a really difficult position with your board."', tag: 'Empathetic', d: [5, 20], next: 'opening', fb: 'Midnight voice plus "I\'m sorry" and an acknowledgement. You have not admitted fault; you have shown you understand.' },
        { t: '"Let me send you a revised plan by email and we can pick this up later."', tag: 'Avoidant', d: [-5, -10], next: 'brushed', fb: 'You avoided the heat, but Daniel feels brushed off at the moment he most needs to be heard.' },
      ],
    },
    escalated: {
      say: 'Don\'t tell me how to talk! This is exactly the problem: nobody on your side takes responsibility.',
      choices: [
        { t: '(Pause. Then slowly) "You\'re right to be angry. It sounds like you feel let down, and like we\'ve left you to explain this alone."', tag: 'Empathetic', d: [5, 25], next: 'opening', fb: 'Good recovery: silence, a calm tone and a label that names what he feels underneath the anger.' },
        { t: '"I\'m not going to be spoken to like that."', tag: 'Defensive', d: [-10, -20], next: 'endBreakdown', fb: 'A boundary can be fair, but here it turns the call into a fight about respect.' },
      ],
    },
    brushed: {
      say: 'An email? I don\'t want another email. I want someone to actually deal with this.',
      choices: [
        { t: '"You\'re right. I\'m sorry. Let\'s deal with it now. That sounds incredibly frustrating."', tag: 'Empathetic', d: [5, 20], next: 'opening', fb: 'You owned the misstep and turned back toward him.' },
        { t: '"I understand, but I don\'t have all the details yet."', tag: 'Avoidant', d: [-5, -10], next: 'endCold', fb: 'True perhaps, but it leaves him alone with the problem again.' },
      ],
    },
    opening: {
      say: 'It is difficult. I went out on a limb for your team. I told them you were reliable.',
      choices: [
        { t: '"You went out on a limb?"', tag: 'Strategic', d: [10, 10], next: 'deeper', fb: 'A mirror: you repeat his key words and give him room to say more.' },
        { t: '"Well, we are reliable. This was a one-off issue."', tag: 'Defensive', d: [-5, -15], next: 'cooling', fb: 'You corrected him instead of hearing him. He was about to tell you what is really at stake.' },
        { t: '"Let\'s focus on solutions. What if we add extra developers?"', tag: 'Risky', d: [10, -5], next: 'cooling', fb: 'Jumping to fixes before the emotion has landed feels like you are not listening.' },
      ],
    },
    cooling: {
      say: 'Look, I just need this not to happen again.',
      choices: [
        { t: '"It seems like this isn\'t just about the dates. It\'s about your credibility with the board."', tag: 'Empathetic', d: [10, 15], next: 'deeper', fb: 'A label that goes beneath the words. Labels give him a chance to confirm or correct.' },
        { t: '"It won\'t. I promise."', tag: 'Risky', d: [0, -5], next: 'endCold', fb: 'A promise without understanding or a plan sounds hollow, especially after a second delay.' },
      ],
    },
    deeper: {
      say: 'Yes. My CEO asked me last week if we should switch providers. I defended you. And now this.',
      choices: [
        { t: '(Silence. Three seconds.) Then: "So you put your own credibility on the line for us, and now you\'re the one who has to explain it."', tag: 'Empathetic', d: [10, 20], next: 'reveal', fb: 'Silence lets it land; your summary shows you heard the whole story. This is where trust turns.' },
        { t: '"Switch providers? That would be a big mistake."', tag: 'Defensive', d: [-5, -15], next: 'endCold', fb: 'You heard a threat, not a person. He just told you what he needs and you argued instead.' },
      ],
    },
    reveal: {
      say: 'Exactly. (He exhales.) I don\'t even mind the two weeks that much. I mind walking into that meeting with nothing.',
      choices: [
        { t: '"Then what you really need is something solid to take to your board: a date we\'ll stand behind, and a reason to trust it. Let\'s build that together now."', tag: 'Assertive', d: [25, 15], next: 'plan', fb: 'Repetition and reframing: you reflect his real need, then move calmly toward a joint solution.' },
        { t: '"We could give you a 10% discount on this phase."', tag: 'Risky', d: [10, 0], next: 'endDiscount', fb: 'A concession he didn\'t ask for. It costs you, and it doesn\'t solve his real problem: credibility.' },
      ],
    },
    plan: {
      say: 'That would help. What can you actually commit to?',
      choices: [
        { t: '"A confirmed date of the 15th, weekly progress notes you can forward to your board, and I\'ll join your board call if that helps. Would that work?"', tag: 'Assertive', d: [25, 15], next: 'endStrong', fb: 'Concrete, honest and aimed at his real need. You end with a question, so he keeps a sense of control.' },
        { t: '"We\'ll do our very best to get it done as soon as possible."', tag: 'Avoidant', d: [-10, -10], next: 'endCold', fb: 'Vague reassurance is exactly what he cannot take to his board.' },
      ],
    },
    endStrong: { end: true, verdict: 'Trust restored, plan agreed', say: 'Okay. Yes. Thank you for actually listening. Send me the date in writing today and let\'s get it done.', summary: 'You used the module\'s full flow: midnight voice, "I\'m sorry" plus acknowledgement, labeling, mirroring, silence and repetition. Once Daniel felt heard, the real issue (his credibility) surfaced, and the solution addressed it.' },
    endDiscount: { end: true, verdict: 'Calmer, but you paid for it', say: 'Fine. I suppose that\'s something. I\'ll let the board know.', summary: 'The temperature dropped, but you solved the wrong problem. Daniel needed something credible to show his board, not a discount. Listen for the need before you offer a concession.' },
    endCold: { end: true, verdict: 'The call ended, the problem didn\'t', say: 'Right. I\'ll wait for the email then.', summary: 'Daniel is calmer but not convinced. His real concern was never fully heard, so it will come back, perhaps as a decision to switch providers. Look for the moments where a label or a mirror would have opened him up.' },
    endBreakdown: { end: true, verdict: 'Breakdown', say: 'I\'ll be speaking to your director. (He hangs up.)', summary: 'The conversation became a contest about respect. When someone is flooded with emotion, logic and boundaries cannot land until the emotion is acknowledged. Try the midnight voice and an acknowledgement first.' },
  },
}
