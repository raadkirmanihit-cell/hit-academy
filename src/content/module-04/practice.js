// Extra practice for Module 4: quick checks, "your turn" scripts, say-it-out-loud practice,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.
import { qc, scale, ta, tx, sel } from '../withPractice.js'

const Y = 'You'

const yourTurnInterests = {
  t: 'yourTurn',
  id: 'yt-interests',
  title: 'Now you: from position to interest',
  setup: 'Jonas, the operations director at a logistics client, wants a 20% price cut on your maintenance contract before he will renew. At each pause, choose what you would say, or write your own line.',
  cast: { Jonas: { initials: 'JO', role: 'Operations Director, client' } },
  you: Y,
  script: [
    ['Jonas', 'I\'ll be straight with you. Unless you cut the price by 20%, we\'re not renewing.'],
    { pause: {
      prompt: 'A hard position. What is your first move?',
      options: [
        { t: 'We can do 5%, but that\'s really our limit.', fb: 'Positional bargaining. You start haggling over his number before you know why he needs it.' },
        { t: 'Twenty percent is a big number. Help me understand: what is behind it for you this year?', best: true, fb: 'A "what" question that moves the conversation from the position to the interest behind it.' },
        { t: 'Our prices are fair. Everyone else pays the same.', fb: 'You defend your position against his. That is the start of a stalemate.' },
      ],
      expert: 'Twenty percent is a big number. Help me understand: what is behind it for you this year?',
      why: 'Stage 2: positions are what people say they want; interests are why. Ask "what" and "how" to find out.',
    } },
    ['Jonas', 'The board has cut my operating budget, and I have to show savings in my next quarterly review.'],
    { pause: {
      prompt: 'Now you know an interest: visible savings for his review. What next?',
      options: [
        { t: 'Then 20% it is, if that\'s what you need.', fb: 'Soft bargaining. You yield the whole position without exploring other ways to meet the interest.' },
        { t: 'So what matters most is showing a clear saving to the board this quarter. Is that the main thing, or is there more?', best: true, fb: 'You summarise the interest and check for others. There may be more than one need behind the demand.' },
        { t: 'That\'s your board\'s problem, not ours.', fb: 'Hard on the person, not just the problem. You damage the relationship and learn nothing more.' },
      ],
      expert: 'So what matters most is showing a clear saving to the board this quarter. Is that the main thing, or is there more?',
      why: 'Check your understanding and dig for more interests. Security, recognition and control often sit behind an economic demand.',
    } },
    ['Jonas', 'That\'s most of it. And honestly, last year your engineers were slow on two breakdowns. I took the heat for that.'],
    { pause: {
      prompt: 'Two interests now: budget savings and reliability. How do you respond?',
      options: [
        { t: 'Let\'s put a few options on the table before we judge any of them: a lower annual fee with fewer scheduled visits, a guaranteed four-hour response time with a penalty if we miss it, or a two-year term at a reduced rate. Which of those would work best for your review?', best: true, fb: 'You invent several options that meet both of his interests, and invite him to shape them. That is Stage 3 in action.' },
        { t: 'The breakdowns weren\'t our fault. Your staff reported them late.', fb: 'Even if it is true, you are now arguing about the past instead of solving the problem.' },
        { t: 'Okay, 10% and we\'ll call it even.', fb: 'You split the difference on price and ignore the reliability interest he just told you about.' },
      ],
      expert: 'Let\'s put a few options on the table before we judge any of them: a lower annual fee with fewer scheduled visits, a guaranteed four-hour response time with a penalty if we miss it, or a two-year term at a reduced rate. Which of those would work best for your review?',
      why: 'Once you know the interests, generate options that meet them. Price is only one lever.',
    } },
    ['Jonas', 'The two-year deal with a response guarantee… that I could take to the board.'],
  ],
  note: 'The 20% was never the real need. A saving he could show and a service he could trust were, and both could be met without a 20% cut.',
}

const yourTurnPressure = {
  t: 'yourTurn',
  id: 'yt-pressure',
  title: 'Now you: open to reasons, closed to pressure',
  setup: 'You are agreeing the rate for a six-month consulting contract with Fatima, a purchasing lead. You have agreed to use published market rates for senior consultants as the standard. Then she pushes.',
  cast: { Fatima: { initials: 'FA', role: 'Purchasing lead, client' } },
  you: Y,
  script: [
    ['Fatima', 'Look, I need an answer today. Take €750 a day or we\'ll go with someone else.'],
    { pause: {
      prompt: 'Pressure and a deadline. What do you say?',
      options: [
        { t: 'Fine, €750. I don\'t want to lose the contract.', fb: 'You yield to pressure, not to principle. You also teach her that pressure works with you.' },
        { t: 'I understand you need to close this today. Let\'s stick to the standard we agreed: the published market rate. Can you show me how €750 fits it?', best: true, fb: 'You acknowledge the time pressure and bring the conversation back to the agreed criteria. Open to reasons, closed to pressure.' },
        { t: 'Then go with someone else.', fb: 'Matching pressure with pressure turns a negotiation into a contest of wills.' },
      ],
      expert: 'I understand you need to close this today. Let\'s stick to the standard we agreed: the published market rate. Can you show me how €750 fits it?',
      why: 'Stage 4: never yield to pressure. Invite her to justify the number against the standard you both accepted.',
    } },
    ['Fatima', 'The rate survey is for the big consultancies. You\'re a smaller firm, so your overheads are lower.'],
    { pause: {
      prompt: 'This time she gives a reason. How do you respond?',
      options: [
        { t: 'That\'s a fair point. Let\'s look at the survey\'s figures for firms of our size and use that range instead.', best: true, fb: 'She gave a reason, not pressure. Reasoning openly means you accept a better standard when you see one.' },
        { t: 'No. We agreed the survey and that\'s that.', fb: 'Being closed to pressure does not mean being closed to reasons. Refusing a fair point makes you the rigid one.' },
        { t: 'Our overheads are none of your business.', fb: 'Defensive and personal. Stay soft on the person and focus on the standard.' },
      ],
      expert: 'That\'s a fair point. Let\'s look at the survey\'s figures for firms of our size and use that range instead.',
      why: 'Changing your mind because of a better standard is not a concession: it is the method working.',
    } },
    ['Fatima', 'That puts you at around €880 to €950. Let\'s settle at €900.'],
  ],
  note: 'The pressure moved nothing. The reason moved the number, and both of you can defend the result.',
}

const sayAboutMe = {
  t: 'sayItAloud',
  id: 'say-about-me',
  title: 'Say it out loud: soft on the person, hard on the problem',
  situation: 'A colleague in another team has missed two hand-over deadlines this month, and your team has had to work late both times. You meet them for a coffee to raise it.',
  task: 'Say how it affected you out loud, without blaming them. Speak about yourself and the problem, not about their character. Two or three sentences.',
  criteria: [
    'Describe the facts, not their personality.',
    'Speak about yourself ("I feel…", "What I need…") rather than "you always…".',
    'Acknowledge their perspective or pressure.',
    'End with an invitation to solve the problem together.',
  ],
  modelLine: 'The last two hand-overs arrived a day late, and both times my team ended up working into the evening. I suspect you\'re under pressure too. Could we work out together what would make the Thursday deadline realistic for you?',
  modelNote: 'Notice there is no "you always" and no judgement of the person: the problem is on the table, the relationship is protected.',
}

export const inserts = {
  'l1-positional': [qc('qc4-position', 'Which statement is a position rather than an interest?', [
    { t: '"We need to stay within this quarter\'s budget."', fb: 'That is an interest: the reason behind a demand. It opens several options.' },
    { t: '"I want a 15% raise."', correct: true, fb: 'Right. A specific demand is a position. The interest might be recognition, security or fairness.' },
    { t: '"Our team needs to feel the process is fair."', fb: 'That is an interest: the need for fairness.' },
  ])],
  'l1-compare': [qc('qc4-approach', 'A negotiator is friendly and respectful, but refuses to move unless the other side shows a fair standard. Which approach is this?', [
    { t: 'Soft', fb: 'Soft bargainers are friendly but yield to pressure to keep the peace.' },
    { t: 'Hard', fb: 'Hard bargainers apply pressure and treat the other side as an adversary.' },
    { t: 'Principled', correct: true, fb: 'Right. Soft on the people, hard on the problem, and moved only by principle.' },
  ])],
  'l2-how': [qc('qc4-people', 'Which line separates the person from the problem?', [
    { t: '"You never send the data on time."', fb: '"You never" attacks the person and invites a defence.' },
    { t: '"When the data arrives after Monday, I can\'t finish the forecast. How can we fix that?"', correct: true, fb: 'Right. You describe the impact on you and invite joint problem-solving.' },
    { t: '"Everyone says you\'re hard to work with."', fb: 'Personal and second-hand. It turns the problem into a judgement of character.' },
  ])],
  'l2-practice': [sayAboutMe],
  'l3-needs': [qc('qc4-needs', 'A team leader insists on approving every expense personally, even small ones. Which basic need is most likely behind it?', [
    { t: 'Belonging', fb: 'Possible, but approving everything is more about influence over outcomes.' },
    { t: 'Control / autonomy', correct: true, fb: 'Right. The need to influence choices and outcomes. An option that gives them oversight without the workload may satisfy it.' },
    { t: 'Economic well-being', fb: 'Small expenses barely affect financial stability. Look for the need behind the behaviour.' },
  ])],
  'l3-how': [yourTurnInterests],
  'l4-how': [qc('qc4-options', 'In a joint brainstorm, a colleague says, "That will never work," about the very first idea. What do you do?', [
    { t: 'Agree and drop the idea to keep things moving.', fb: 'You let judging start during inventing, and the flow of ideas will dry up.' },
    { t: 'Remind everyone that you are inventing now and judging later, and note the idea.', correct: true, fb: 'Right. Keep the judgement-free zone. Ideas are evaluated later, against agreed criteria.' },
    { t: 'Argue for the idea until they accept it.', fb: 'Defending ideas turns a brainstorm into a debate.' },
  ])],
  'l5-standards': [qc('qc4-procedure', 'You are agreeing a daily rate with a new consulting client. Which is a fair standard?', [
    { t: 'What your biggest client pays you.', fb: 'That is your own reference point, not an independent standard.' },
    { t: 'A published rate survey for consultants with similar experience.', correct: true, fb: 'Right. An external, objective standard that both sides can check.' },
    { t: 'The rate you need to hit your annual revenue target.', fb: 'That is your need, not a fair standard for them.' },
  ])],
  'l5-firm': [yourTurnPressure],
}

export const confidence = {
  id: 'conf-m4',
  items: [
    { id: 'c1', text: 'Telling positions from the interests behind them' },
    { id: 'c2', text: 'Separating the people from the problem' },
    { id: 'c3', text: 'Asking questions that uncover the other side\'s needs' },
    { id: 'c4', text: 'Generating several options before judging any' },
    { id: 'c5', text: 'Using objective criteria and resisting pressure' },
  ],
}

export const planner = {
  id: 'planner-m4',
  title: 'Your principled negotiation planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real negotiation you are preparing for: it takes 20–25 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The negotiation', fields: [
      tx('what', 'The negotiation I\'m preparing for', 'e.g. Renewing the maintenance contract with a logistics client'),
      tx('when', 'When it happens', 'e.g. Next Wednesday, at their site'),
      tx('who', 'Who I\'ll be negotiating with', 'Name and role'),
    ] },
    { id: 'p1', title: 'Positions vs interests map', hint: 'Write the positions, then ask "why?" until you reach the interests.', fields: [
      ta('mypos', 'My position', 'What I will ask for', 2),
      ta('myint', 'My interests behind it (one per line)', ''),
      ta('theirpos', 'Their likely position', '', 2),
      ta('theirint', 'Their likely interests (one per line)', 'Guess where you must, then check in the conversation'),
      ta('shared', 'Interests we share', '', 2),
    ] },
    { id: 'p2', title: 'Six needs check', hint: 'Which basic needs are in play for them? Rate how strongly (1 = barely, 5 = very strongly).', fields: [
      scale('security', 'Security'),
      scale('economic', 'Economic well-being'),
      scale('belonging', 'Sense of belonging'),
      scale('recognition', 'Recognition'),
      scale('control', 'Control / autonomy'),
      scale('fairness', 'Fairness'),
      ta('needq', 'The "how" and "what" questions I\'ll ask to check these', '"What would a good result look like for you?"'),
    ] },
    { id: 'p3', title: 'People and perception prep', hint: 'Stage 1: separate the people from the problem.', fields: [
      ta('theirview', 'How they probably see the situation', '', 2),
      ta('emotion', 'Emotions that may come up, and how I\'ll acknowledge them', '', 2),
      ta('aboutme', 'One thing I\'ll say about myself, not about them', '"When X happens, I…"', 2),
    ] },
    { id: 'p4', title: 'Options brainstorm: invent, then judge', hint: 'Write at least five options without judging. Then judge them against both sides\' interests.', fields: [
      ta('options', 'Options (one per line, no judging yet)', ''),
      ta('best', 'The options that best meet both sides\' interests', '', 2),
    ] },
    { id: 'p5', title: 'Objective criteria and pressure plan', hint: 'Stage 4: agree fair standards before you argue numbers.', fields: [
      ta('standards', 'Fair standards I could propose', 'Market rates, industry benchmarks, precedents, expert opinion'),
      ta('procedure', 'A fair procedure if we get stuck', 'e.g. An independent valuation; one divides, the other chooses', 2),
      ta('pressure', 'My line when they apply pressure', '"Let\'s stick to the criteria we agreed."', 2),
    ] },
    { id: 'p6', title: 'After-action review', hint: 'Come back after the negotiation.', fields: [
      ta('happened', 'What happened, in two sentences', '', 2),
      scale('r1', 'I explored interests before arguing positions.'),
      scale('r2', 'I put several options on the table.'),
      scale('r3', 'I moved for reasons, not for pressure.'),
      ta('change', 'What I\'ll change next time', '', 2),
    ] },
  ],
}
