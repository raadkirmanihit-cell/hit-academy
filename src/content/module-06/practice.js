// Extra practice for Module 6: quick checks, "your turn" scripts, a write-it exercise,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.
import { qc, scale, ta, tx, sel } from '../withPractice.js'

const Y = 'You'

const yourTurnAnchor = {
  t: 'yourTurn',
  id: 'yt-counter-anchor',
  title: 'Now you: counter-anchor with fairness',
  setup: 'You run a small design studio. A client, Claudia, wants a full rebrand and has asked for your price. Market rates for this scope run from €38,000 to €48,000. Before you can quote, she names a number.',
  cast: { Claudia: { initials: 'CL', role: 'Marketing Director, client' } },
  you: Y,
  script: [
    ['Claudia', 'Our budget for this is €20,000. I assume that works for you?'],
    { pause: {
      prompt: 'She has anchored low, far below market. What do you say?',
      options: [
        { t: 'Hmm, could we meet in the middle, at €30,000?', fb: 'You negotiate from her anchor. "The middle" is now defined by her number, not by the market.' },
        { t: 'I appreciate you sharing that. For a full rebrand of this scope, comparable projects run between €38,000 and €48,000. Based on what you\'ve described, we\'d be at €43,750.', best: true, fb: 'You counter-anchor quickly, with market data and a precise number. The frame moves back to fair value.' },
        { t: 'That\'s ridiculous. Nobody does a rebrand for that.', fb: 'You challenge the anchor, but confrontationally. She may dig in to save face.' },
      ],
      expert: 'I appreciate you sharing that. For a full rebrand of this scope, comparable projects run between €38,000 and €48,000. Based on what you\'ve described, we\'d be at €43,750.',
      why: 'Counter-anchor immediately, frame your number as reasonable with data, and use a precise figure to signal careful calculation.',
    } },
    ['Claudia', 'That\'s more than double our budget. I really can\'t go to my CFO with that.'],
    { pause: {
      prompt: 'She has a real constraint. What do you do next?',
      options: [
        { t: 'How would you like us to approach this, given the budget you have this year?', best: true, fb: 'A calibrated "how" question. She now helps solve the problem instead of defending her number.' },
        { t: 'Why did you set such a low budget?', fb: '"Why" sounds accusing and makes her defend herself.' },
        { t: 'Then we can do it for €25,000.', fb: 'A big, unearned concession. It also tells her your first price wasn\'t real.' },
      ],
      expert: 'How would you like us to approach this, given the budget you have this year?',
      why: 'Calibrated questions start with "what" or "how" and turn resistance into joint problem-solving.',
    } },
    ['Claudia', 'Could we do part of it now and the rest next year?'],
    { pause: {
      prompt: 'Now design the choice. What do you offer?',
      options: [
        { t: 'Two options, both priced fairly. Option A: strategy, logo and core identity now for €22,400, with the full roll-out next year. Option B: the complete rebrand now at €41,500 if you confirm this month. Which works better for you?', best: true, fb: 'Two genuine options, both good for you and for her, with a real reason to decide. That is the illusion of choice used honestly.' },
        { t: 'Sure, whatever you think is best.', fb: 'You hand over control of the structure, and probably of the price.' },
        { t: 'Take it or leave it: €43,750.', fb: 'A yes-or-no ultimatum invites a no. Options give her a sense of control.' },
      ],
      expert: 'Two options, both priced fairly. Option A: strategy, logo and core identity now for €22,400, with the full roll-out next year. Option B: the complete rebrand now at €41,500 if you confirm this month. Which works better for you?',
      why: 'Choices make people feel empowered. Design each option so it works for both sides, and only use a deadline that is real.',
    } },
    ['Claudia', 'Option A I can sign this week. And I\'d like to talk about the roll-out in January.'],
  ],
  note: 'Her €20,000 anchor never became the frame. Market data, a calibrated question and two fair options did.',
}

const writeFairness = {
  t: 'writeIt',
  id: 'wi-fairness',
  title: 'Write your fairness line',
  intro: 'Three situations where the offer on the table looks unfair. For each one, write what you would say. Then check your line and compare it with one strong version.',
  items: [
    {
      situation: 'A long-standing supplier proposes a 15% price increase. The published industry index for your category rose 6% this year. You value the relationship.',
      task: 'Write what you would say to challenge the increase without confrontation.',
      criteria: ['It acknowledges their proposal or the relationship.', 'It compares the offer with an objective standard.', 'It frames fairness as a shared priority.', 'It ends with a calibrated "what" or "how" question.'],
      model: 'I appreciate you being upfront about costs, and you\'ve always been fair with us. I want this to be fair for both of us: the industry index rose 6% this year, and 15% is well above that. How did you arrive at the figure?',
      why: 'The fairness identity at the start and the standard in the middle do the arguing for you, and the question invites them to explain rather than defend.',
    },
    {
      situation: 'A new client asks you to take on 30% more scope for the same fee, because "it\'s only a few extra pages".',
      task: 'Write your reply.',
      criteria: ['It stays friendly and calm.', 'It names the gap between the work and the fee clearly.', 'It points to a fair baseline (your rate, the original scope).', 'It offers a way forward or a choice.'],
      model: 'I want this to work well for both of us. The extra pages add about a third to the scope we agreed, so keeping the same fee wouldn\'t be fair on either side. Would you prefer to adjust the fee, or keep the fee and phase the extra pages into a second stage?',
      why: 'You address the unfairness without accusing them, and a choice of two fair options keeps them in control.',
    },
    {
      situation: 'You and a peer are splitting a shared budget for next year. They propose 70/30 in their favour, though both teams have similar headcount and targets.',
      task: 'Write how you would respond.',
      criteria: ['It acknowledges their needs.', 'It points to an objective basis for the split.', 'It frames the goal as a split you can both defend.', 'It invites them to look at the criteria together.'],
      model: 'I can see why your team needs a solid budget next year, and I\'d like a split we can both defend to our directors. Our headcount and targets are close, so 70/30 is hard for me to explain. What criteria do you think we should base it on?',
      why: 'A split you can "both defend" makes fairness the shared goal, and asking for criteria moves the talk from positions to standards.',
    },
  ],
}

export const inserts = {
  'l1-six': [qc('qc6-integrity', 'What makes the principles in this module ethical to use?', [
    { t: 'They are legal, so anything goes.', fb: 'Legal is not the same as honest. A fake deadline can be legal and still destroy trust.' },
    { t: 'Using them with real facts: real losses, justified anchors, genuine fairness and options that work for both sides.', correct: true, fb: 'Right. The same principle can be honest or manipulative; the difference is whether it is true.' },
    { t: 'Only using them on people you don\'t know.', fb: 'Integrity doesn\'t depend on the relationship.' },
  ])],
  'l2-apply': [qc('qc6-loss', 'Why does the module insist that you only use real losses, deadlines and scarcity?', [
    { t: 'Because invented ones are illegal everywhere.', fb: 'Not always illegal, but always risky for trust.' },
    { t: 'Because an invented deadline may work once, but when it is discovered it destroys your credibility.', correct: true, fb: 'Right. Loss aversion is powerful, which is why it must be honest.' },
    { t: 'Because real losses are always bigger.', fb: 'Size is not the point. Truth is.' },
  ])],
  'l3-how': [qc('qc6-anchor', 'When is it risky to set the first anchor?', [
    { t: 'When you know the market well.', fb: 'That is exactly when anchoring first works best.' },
    { t: 'When you don\'t know the market or their limits, because you may anchor far too low (or too high).', correct: true, fb: 'Right. Anchoring works best when you understand the market and what the other side can accept.' },
    { t: 'Never: going first is always best.', fb: 'Going first is powerful, but only when you have the information to set a good anchor.' },
  ])],
  'l4-how': [writeFairness],
  'l5-how': [qc('qc6-choice', 'How many options should you usually put in front of the other side?', [
    { t: 'One: a clear proposal is best.', fb: 'A single proposal becomes a yes-or-no decision.' },
    { t: 'Two or three well-designed options.', correct: true, fb: 'Right. Enough to give a sense of control, few enough to make choosing easy.' },
    { t: 'As many as possible, to show flexibility.', fb: 'Too many options overwhelm people and stall decisions.' },
  ])],
  'l6-how': [yourTurnAnchor],
  'l7-how': [qc('qc6-reciprocity', 'You introduced a client to a useful contact last month. They thank you. Which reply reinforces reciprocity without sounding transactional?', [
    { t: '"Great. So now you owe me one."', fb: 'It turns a gift into a debt, and the goodwill disappears.' },
    { t: '"I was happy to help. I know you\'d do the same."', correct: true, fb: 'Right. It gently names the norm of mutual help while keeping it warm.' },
    { t: '"Remember this when we discuss the renewal."', fb: 'Linking it openly to a future ask makes the gesture look manipulative.' },
  ])],
}

export const confidence = {
  id: 'conf-m6',
  items: [
    { id: 'c1', text: 'Framing an offer around what they could lose, honestly' },
    { id: 'c2', text: 'Setting a strong first anchor, and countering theirs' },
    { id: 'c3', text: 'Using fairness to challenge an unfair offer' },
    { id: 'c4', text: 'Designing options instead of yes-or-no questions' },
    { id: 'c5', text: 'Asking calibrated "what" and "how" questions' },
  ],
}

export const planner = {
  id: 'planner-m6',
  title: 'Your perception planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real negotiation you are preparing for: it takes 20–25 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The negotiation', fields: [
      tx('what', 'The negotiation I\'m preparing for', 'e.g. Quoting a rebrand for a new client'),
      tx('when', 'When it happens', ''),
      tx('who', 'Who I\'ll be negotiating with', 'Name and role'),
    ] },
    { id: 'p1', title: 'Loss frame', hint: 'Reframing, opportunity costs, scarcity and urgency. Only real ones.', fields: [
      ta('gain', 'My offer as a gain ("You will get…")', '', 2),
      ta('loss', 'The same offer as a loss ("Without this, you will lose…")', '', 2),
      ta('real', 'The real deadline, scarcity or cost of waiting I can point to', '', 2),
    ] },
    { id: 'p2', title: 'Anchor plan and counter-anchor', fields: [
      tx('anchor', 'My opening number (precise)', 'e.g. €43,750'),
      ta('justify', 'The data that makes it reasonable', 'Market rates, comparable deals, case studies', 2),
      ta('counter', 'If they anchor first: my counter-anchor line', '', 2),
    ] },
    { id: 'p3', title: 'Fairness lines', fields: [
      ta('baseline', 'My fairness baseline', '"I want this to be fair for both of us. Based on…"', 2),
      ta('unfair', 'What I\'ll say if their offer looks unfair', '', 2),
      ta('identity', 'A fairness trait I genuinely see in them', '', 2),
    ] },
    { id: 'p4', title: 'Choice design', hint: 'Two or three options, every one acceptable to you and genuinely good for them.', fields: [
      ta('optA', 'Option A', '', 2),
      ta('optB', 'Option B', '', 2),
      ta('optC', 'Option C (optional)', '', 2),
    ] },
    { id: 'p5', title: 'Calibrated question bank', hint: 'Start with "what" or "how". Avoid "why".', fields: [
      ta('questions', 'My calibrated questions (one per line)', '"What about this is important to you?"'),
    ] },
    { id: 'p6', title: 'Reciprocity plan and integrity check', fields: [
      ta('give', 'Something of value I can give first', '', 2),
      sel('honest', 'Is every loss, anchor, fairness line and option I plan to use true?', ['Yes, all of them', 'Mostly, I need to fix one', 'Not yet, I need to rethink']),
      ta('fix', 'Anything to change so it stays honest', '', 2),
    ] },
    { id: 'p7', title: 'After-action review', hint: 'Come back after the negotiation.', fields: [
      ta('happened', 'What happened, in two sentences', '', 2),
      scale('r1', 'My anchor shaped the conversation.'),
      scale('r2', 'I asked calibrated questions instead of arguing.'),
      scale('r3', 'Everything I used was honest.'),
      ta('change', 'What I\'ll change next time', '', 2),
    ] },
  ],
}
