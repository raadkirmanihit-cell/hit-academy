// Extra practice for Module 3: quick checks, "your turn" scripts, say-it-out-loud practice,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.
import { qc, scale, ta, tx, sel } from '../withPractice.js'

const Y = 'You'

const yourTurnYes = {
  t: 'yourTurn',
  id: 'yt-test-yes',
  title: 'Now you: turn a polite yes into a commitment',
  setup: 'You have just presented a pilot proposal to Marco, a procurement manager at a mid-sized client. He nods along and smiles. At each pause, choose what you would say, or write your own line.',
  cast: { Marco: { initials: 'MA', role: 'Procurement manager, client' } },
  you: Y,
  script: [
    ['Marco', 'Yes, yes, totally. This looks great. Let\'s definitely do something together.'],
    { pause: {
      prompt: 'His yes is quick, warm and vague. What do you say?',
      options: [
        { t: 'Fantastic! I\'ll tell my team we\'ve got the deal.', fb: 'You treat a possibly counterfeit yes as a commitment. If nothing happens, you have raised false expectations inside your own company.' },
        { t: 'Great to hear. Just so we\'re aligned, what would be the first step on your side to get the pilot started?', best: true, fb: 'You welcome the yes and test it with a specific, easy question. A real yes has an answer; a counterfeit one starts to wobble.' },
        { t: 'Are you sure? You don\'t sound convinced.', fb: 'You may be right, but challenging him directly puts him on the defensive. Test with specifics instead.' },
      ],
      expert: 'Great to hear. Just so we\'re aligned, what would be the first step on your side to get the pilot started?',
      why: 'A counterfeit yes is tested with specifics, not with confrontation. "What is the first step?" forces clarity without accusing anyone.',
    } },
    ['Marco', 'Well… I\'d need to run it past finance. And maybe legal. It\'s a busy quarter.'],
    { pause: {
      prompt: 'Hesitation has appeared. What do you do next?',
      options: [
        { t: 'Of course. Let me know when you\'re ready.', fb: 'You let the hesitation go unexplored. The proposal will most likely sit in his inbox.' },
        { t: 'It sounds like there may be a concern you\'d need to answer for finance. Would it be unreasonable to ask what they\'ll push back on?', best: true, fb: 'You label the hesitation and use a no-oriented question. It is safe for him to tell you the real objection.' },
        { t: 'Finance always says that. Don\'t worry about it.', fb: 'Dismissing his concern does not make it disappear. It just stops him telling you about it.' },
      ],
      expert: 'It sounds like there may be a concern you\'d need to answer for finance. Would it be unreasonable to ask what they\'ll push back on?',
      why: 'Probe for hesitation: a label plus a question that invites "no" makes it easy for him to surface the hidden objection.',
    } },
    ['Marco', 'Honestly? They\'ll say the pilot cost isn\'t in this year\'s budget.'],
    { pause: {
      prompt: 'Now you know the real issue. How do you test the agreement?',
      options: [
        { t: 'What if we split the pilot so the first phase falls in this year\'s budget? Could we take thirty minutes with your finance lead on Thursday to check whether that works?', best: true, fb: 'You answer the real objection and ask for a small, immediate action: a meeting with a date and a person. If he agrees, the yes is becoming real.' },
        { t: 'Then let\'s just sign now and sort out the budget later.', fb: 'Pushing for a signature when you know the budget is missing invites another counterfeit yes.' },
        { t: 'Okay, maybe next year then.', fb: 'You give up at the moment the real conversation started.' },
      ],
      expert: 'What if we split the pilot so the first phase falls in this year\'s budget? Could we take thirty minutes with your finance lead on Thursday to check whether that works?',
      why: 'Test the agreement with a small, specific action. Willingness to act now is the clearest signal of a commitment yes.',
    } },
    ['Marco', 'Thursday at two. I\'ll bring Sandra from finance.'],
  ],
  note: 'The first yes was polite and empty. Three questions later you have a real next step, a date and the person who decides.',
}

const yourTurnNo = {
  t: 'yourTurn',
  id: 'yt-handle-no',
  title: 'Now you: handle the "no" without defending',
  setup: 'You manage a team and have asked Elena, the head of another department, to lend you two of her analysts for six weeks. She has just replied. Use open questions, validation and a positive reframe.',
  cast: { Elena: { initials: 'EL', role: 'Head of Finance Operations' } },
  you: Y,
  script: [
    ['Elena', 'No. I can\'t give you two people for six weeks. That\'s not happening.'],
    { pause: {
      prompt: 'A firm no. What is your first move?',
      options: [
        { t: 'But this project is a company priority. The leadership team signed it off.', fb: 'You defend and escalate. She hears pressure, not interest, and digs in.' },
        { t: 'Okay. What would be the main problem for your team if they were away for six weeks?', best: true, fb: 'An open question that treats the no as information. You find out what is behind it.' },
        { t: 'What if it\'s just one person?', fb: 'You sweeten the offer before you know what the problem is. You may be giving away something that wasn\'t the issue.' },
      ],
      expert: 'Okay. What would be the main problem for your team if they were away for six weeks?',
      why: 'Your first job after a no is to understand, not to defend, withdraw or sweeten the offer.',
    } },
    ['Elena', 'Quarter-end close. If I lose two analysts in March, we miss the reporting deadline and I\'m the one explaining it.'],
    { pause: {
      prompt: 'Now you know the concern. What do you say?',
      options: [
        { t: 'That makes sense. It sounds like you\'re worried about being exposed at quarter-end if your team is stretched.', best: true, fb: 'Validation followed by a label. She feels understood, which lowers her guard.' },
        { t: 'I\'m sure your team can cope for a few weeks.', fb: 'You dismiss the concern she has just shared. She will stop sharing.' },
        { t: 'Quarter-end isn\'t my problem, though.', fb: 'True, but it tells her you don\'t care about her problem, so why should she care about yours?' },
      ],
      expert: 'That makes sense. It sounds like you\'re worried about being exposed at quarter-end if your team is stretched.',
      why: 'Validation and strategic empathy (Module 2) come before any solution. People move when they feel understood.',
    } },
    ['Elena', 'Exactly. March is the worst possible month.'],
    { pause: {
      prompt: 'Reframe the no positively and move forward.',
      options: [
        { t: 'It sounds like we\'re getting closer to what matters to you. If the timing worked around your close, say from the second week of April, would that be out of the question?', best: true, fb: 'A positive reframe plus a no-oriented question. You show progress and make it safe for her to say what would work.' },
        { t: 'So you\'re saying no to the whole thing, then.', fb: 'You turn a specific objection into a total rejection. She only said no to March.' },
        { t: 'I\'ll take it to the leadership team and let them decide.', fb: 'Escalating now damages the relationship when a solution is within reach.' },
      ],
      expert: 'It sounds like we\'re getting closer to what matters to you. If the timing worked around your close, say from the second week of April, would that be out of the question?',
      why: 'The no was about March, not about you. Reframing turns it into a design brief for the next proposal.',
    } },
    ['Elena', 'April I could do. And one of them could start part-time at the end of March.'],
  ],
  note: 'Her no was the start of the conversation, not the end. It told you exactly what the deal needed.',
}

const sayAskForNo = {
  t: 'sayItAloud',
  id: 'say-ask-no',
  title: 'Say it out loud: invite a "no"',
  situation: 'You want your manager to approve a two-day external course for you. She is busy and protective of the training budget. You catch her after a team meeting.',
  task: 'Say your request out loud as a no-oriented question. Keep it relaxed and leave her a genuine choice. One or two sentences.',
  criteria: [
    'Frame the question so that "no" is the safe, easy answer.',
    'Use disarming language ("Would it be ridiculous…?", "Is it out of the question…?").',
    'Leave a genuine choice: no trap, no guilt.',
    'Pause after the question and let her answer.',
  ],
  modelLine: 'Have I caught you at a bad time? … Would it be out of the question for me to take two days in May for the negotiation course I mentioned? I\'ve drafted how the team would be covered.',
  modelNote: 'Notice the pause after the first question, and how covering her likely worry (the team) makes the no-question easy to answer honestly.',
}

export const inserts = {
  'l1-counterfeit': [qc('qc3-counterfeit', 'A supplier says, "Yes, of course, I\'ll get to it," very quickly, and looks away. What is the best response?', [
    { t: 'Thank them and move on: they said yes.', fb: 'Quick, vague enthusiasm with a mismatched look is a classic counterfeit signal.' },
    { t: '"Great. Just so we\'re aligned, when do you think you\'ll be able to start?"', correct: true, fb: 'Right. A specific question tests the yes without accusing anyone.' },
    { t: '"I don\'t believe you."', fb: 'Direct, but it creates conflict. Specific questions reveal the same thing without the damage.' },
  ])],
  'l1-confirmation': [qc('qc3-confirmation', 'A client says, "Yes, that\'s correct: we have 40 sites." What kind of yes is that, and what do you do with it?', [
    { t: 'A commitment yes: send the contract.', fb: 'Confirming a fact is not agreeing to buy.' },
    { t: 'A confirmation yes: use it as a bridge to a deeper question about what 40 sites means for them.', correct: true, fb: 'Right. Move from data to action: "How does managing 40 sites affect your priorities this year?"' },
    { t: 'A counterfeit yes: challenge it.', fb: 'Nothing here is evasive. It is a neutral factual acknowledgement.' },
  ])],
  'l1-commitment': [qc('qc3-commitment', 'Which signals point to a commitment yes?', [
    { t: 'Enthusiasm and a big smile.', fb: 'Enthusiasm alone can also come with a counterfeit yes.' },
    { t: 'Specifics such as a timeline, an owner or a next step, with tone and body language that match the words.', correct: true, fb: 'Right. A commitment yes comes with action and consistency.' },
    { t: 'A short, neutral "yes".', fb: 'That is more typical of a confirmation yes.' },
  ])],
  'l2-ensure': [yourTurnYes],
  'l3-reframe': [qc('qc3-reframe', 'Which question is the best no-oriented version of "Can we meet on Friday?"', [
    { t: '"You can meet on Friday, right?"', fb: 'That pushes for a yes even harder.' },
    { t: '"Would Friday be a bad time to meet?"', correct: true, fb: 'Right. Saying no feels safe, and either answer gives you clarity.' },
    { t: '"Don\'t you want to sort this out on Friday?"', fb: 'Phrased for a no, but no one can say no without looking unhelpful. That is a trap.' },
  ])],
  'l3-practice': [sayAskForNo],
  'l3-handling': [
    qc('qc3-handling', 'You hear "no" to your proposal. What should you do first?', [
      { t: 'Explain your proposal again, more clearly.', fb: 'That is defending. You still don\'t know why they said no.' },
      { t: 'Ask an open-ended question to understand the concern behind it.', correct: true, fb: 'Right. "What are your main concerns?" turns the no into information.' },
      { t: 'Offer a discount straight away.', fb: 'Sweetening the deal before you understand the no gives away value.' },
    ]),
    yourTurnNo,
  ],
  'l4-silence': [qc('qc3-silence', 'You\'ve just made your offer and the other side goes quiet. What do you do?', [
    { t: 'Fill the silence by explaining your offer again.', fb: 'Talking over the silence often leads you to weaken your own offer.' },
    { t: 'Hold the silence and let them respond.', correct: true, fb: 'Right. Silence projects confidence and gives them space to think.' },
    { t: 'Lower the price to break the tension.', fb: 'Negotiating against yourself. The silence was doing the work for you.' },
  ])],
  'l4-pauses': [qc('qc3-pauses', 'A colleague says, "The deadline is just… unrealistic." Which pause helps most here?', [
    { t: 'Pause to encourage elaboration, with a mirror: "Unrealistic?" and then silence.', correct: true, fb: 'Right. The mirror plus silence invites them to explain what is behind "unrealistic".' },
    { t: 'Pause after you speak, to let your point land.', fb: 'Useful when you\'ve said something important, but here they have the information you need.' },
    { t: 'No pause: reply with the reasons the deadline is fine.', fb: 'Arguing first means you never find out what makes it unrealistic for them.' },
  ])],
}

export const confidence = {
  id: 'conf-m3',
  items: [
    { id: 'c1', text: 'Telling a counterfeit yes from a real commitment' },
    { id: 'c2', text: 'Turning agreement into a specific next step' },
    { id: 'c3', text: 'Asking no-oriented questions that make honesty safe' },
    { id: 'c4', text: 'Responding to a "no" without defending or giving in' },
    { id: 'c5', text: 'Holding a silence or pause on purpose' },
  ],
}

export const planner = {
  id: 'planner-m3',
  title: 'Your yes, no and pause planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real conversation you are preparing for: it takes 15–20 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The conversation', fields: [
      tx('what', 'The conversation I\'m preparing for', 'e.g. Following up with a client who said yes to a pilot but hasn\'t signed'),
      tx('when', 'When it happens', 'e.g. Thursday 14:00, at their office'),
      tx('who', 'Who I\'ll be talking to', 'Name and role'),
    ] },
    { id: 'p1', title: 'Yes audit', hint: 'Look back at the yeses you already have. Which ones are real?', fields: [
      ta('yeses', 'The yeses I have received so far (one per line)', 'e.g. "Yes, let\'s do something together" (Marco, last week)'),
      sel('type', 'The most important one is most likely a…', ['Counterfeit yes', 'Confirmation yes', 'Commitment yes', 'Not sure yet']),
      ta('signals', 'The signals that tell me so', 'Tone, timing, follow-up, past behaviour', 2),
    ] },
    { id: 'p2', title: 'Commitment questions', hint: 'Prepare the three steps to a real yes.', fields: [
      ta('follow', 'Follow-up question', '"What specific actions are we agreeing to take?"', 2),
      ta('probe', 'Probe for hesitation', '"You seem unsure. Can we address any concerns?"', 2),
      ta('test', 'Small, immediate action that tests the agreement', '"Could you send a letter of intent by Friday?"', 2),
    ] },
    { id: 'p3', title: 'No-oriented question builder', hint: 'Rewrite your key requests so that "no" is the safe answer.', fields: [
      ta('yesq', 'The yes-questions I usually ask (one per line)', '"Does that make sense?"'),
      ta('noq', 'My no-oriented versions (one per line)', '"Is there anything here that doesn\'t work for you?"'),
      ta('trap', 'Check: does each one leave a genuine choice? Anything to fix?', '', 2),
    ] },
    { id: 'p4', title: 'Handling "no" script', hint: 'Prepare for the no you are most likely to hear.', fields: [
      ta('likely', 'The no I expect', 'e.g. "We can\'t do that this year."', 2),
      ta('open', 'My open-ended question', '"What would make this acceptable?"', 2),
      ta('validate', 'My validation and label', '"It makes sense that you\'d be cautious. It sounds like…"', 2),
      ta('reframe', 'My positive reframe', '"It sounds like we\'re getting closer to what matters to you…"', 2),
    ] },
    { id: 'p5', title: 'Pause plan and after-action review', hint: 'Choose your pauses before, then review after.', fields: [
      sel('pause', 'The pause I will practise deliberately', ['Before I speak', 'After I speak', 'After asking a question', 'To encourage elaboration', 'While listening', 'To shift tone or energy']),
      ta('moment', 'The moment I will use it', 'e.g. Right after I state the price', 2),
      ta('happened', 'After: what happened, in two sentences', '', 2),
      scale('r1', 'I tested the yes instead of assuming it.'),
      scale('r2', 'I invited a no and explored it calmly.'),
      scale('r3', 'I held at least one silence on purpose.'),
      ta('change', 'What I\'ll change next time', '', 2),
    ] },
  ],
}
