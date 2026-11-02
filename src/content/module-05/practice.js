// Extra practice for Module 5: quick checks, "your turn" scripts, say-it-out-loud practice,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.
import { qc, scale, ta, tx, sel } from '../withPractice.js'

const Y = 'You'

const yourTurnTrade = {
  t: 'yourTurn',
  id: 'yt-trade',
  title: 'Now you: shape and trade, then close',
  setup: 'You buy packaging for a food producer. Your goal is a 6% price reduction; your walk-away point is 3%. Your BATNA: a second supplier who has quoted 4% below today\'s price but needs six weeks to start. You are meeting Tomasz, your current supplier\'s account manager.',
  cast: { Tomasz: { initials: 'TO', role: 'Account manager, packaging supplier' } },
  you: Y,
  script: [
    ['Tomasz', 'Before we start: prices are going up across the industry. Holding your current price is already a good deal.'],
    { pause: {
      prompt: 'He opens by lowering your expectations. How do you respond?',
      options: [
        { t: 'If we can\'t get at least 3% off, we\'re moving to another supplier.', fb: 'You reveal your walk-away point in the first minute and turn your BATNA into a threat.' },
        { t: 'I hear you on costs. Before we talk numbers, can we agree the agenda? I\'d like to cover volumes for next year, delivery terms and then price.', best: true, fb: 'You set the stage: a clear agenda, a cooperative tone, and the easier issues first to build momentum.' },
        { t: 'Okay, holding the price is fine then.', fb: 'You abandon your goal before exploring anything. Aim at your ideal, not at your minimum.' },
      ],
      expert: 'I hear you on costs. Before we talk numbers, can we agree the agenda? I\'d like to cover volumes for next year, delivery terms and then price.',
      why: 'Plan the path and set the stage: sequence easy wins first, and keep your limits to yourself.',
    } },
    ['Tomasz', 'Fine. On volumes, we\'d love more certainty. Our factory planning is a nightmare with your monthly orders.'],
    { pause: {
      prompt: 'He has revealed an interest: planning certainty. What do you do with it?',
      options: [
        { t: 'If we commit to a twelve-month volume forecast with quarterly call-offs, could you do 6% off the unit price?', best: true, fb: 'A structured trade linked to his interest: "If we do X, could you do Y?" You give him what he values and ask for what you value.' },
        { t: 'That\'s your problem, our ordering won\'t change.', fb: 'You throw away the most valuable thing you could trade.' },
        { t: 'We\'ll commit to a forecast, no problem.', fb: 'You give a concession for free. Every concession should be traded, not given.' },
      ],
      expert: 'If we commit to a twelve-month volume forecast with quarterly call-offs, could you do 6% off the unit price?',
      why: 'Shape and trade: present offers linked to their interests, and always tie what you give to what you get.',
    } },
    ['Tomasz', 'Six is impossible. I could do four, with the forecast.'],
    { pause: {
      prompt: 'Four percent: above your walk-away, below your goal, and equal to your BATNA without the six-week switch. What now?',
      options: [
        { t: 'We\'re also talking to another supplier, but I\'d genuinely rather make this work with you. If we add a two-year term on top of the forecast, could you meet us at 5%?', best: true, fb: 'You signal your BATNA as confidence, not a threat, and you add another trade to move closer to your goal.' },
        { t: 'Done. Four percent.', fb: 'Acceptable, but you stop trading while you still have something he values (a longer term).' },
        { t: 'Four? Then we\'re leaving.', fb: 'Four percent beats your walk-away point. Walking away now would leave you worse off than this deal.' },
      ],
      expert: 'We\'re also talking to another supplier, but I\'d genuinely rather make this work with you. If we add a two-year term on top of the forecast, could you meet us at 5%?',
      why: 'Use your BATNA subtly, after rapport and understanding, and keep trading towards your ideal.',
    } },
    ['Tomasz', 'Two years, forecast and quarterly call-offs… I can sign off 5%.'],
    { pause: {
      prompt: 'You have a deal. How do you close?',
      options: [
        { t: 'Great, thanks. Talk soon!', fb: 'Relief, not a close. Without a summary and next steps, details will drift.' },
        { t: 'Let me summarise: 5% off unit prices, a two-year term, a twelve-month forecast with quarterly call-offs. I\'ll send the written summary today; could you have the revised contract to us by Friday? Thanks for working this through with us.', best: true, fb: 'Close and confirm: summarise, agree next steps and owners, and end on respect.' },
        { t: 'So, could you maybe do 6% after all?', fb: 'Re-opening a closed point damages trust. It is the nibble you will learn about in Module 7.' },
      ],
      expert: 'Let me summarise: 5% off unit prices, a two-year term, a twelve-month forecast with quarterly call-offs. I\'ll send the written summary today; could you have the revised contract to us by Friday? Thanks for working this through with us.',
      why: 'Summarise agreements clearly, confirm next steps and timing, and reinforce the relationship.',
    } },
  ],
  note: 'Preparation did the work: you knew your goal, your limit and your alternative, so you could trade calmly instead of reacting.',
}

const saySignalBatna = {
  t: 'sayItAloud',
  id: 'say-batna',
  title: 'Say it out loud: signal your BATNA without a threat',
  situation: 'You are negotiating a software licence renewal. The vendor has proposed a 12% increase. You have a quote from a competitor that would meet most of your needs, though switching would take effort.',
  task: 'Say out loud how you would let the vendor know you have alternatives, without threatening them. Two or three sentences.',
  criteria: [
    'Mention your alternative calmly, without "If you don\'t…, we\'ll…".',
    'Show that you would prefer to make it work with them.',
    'Ground it in information, not emotion.',
    'End with an open question that invites a better proposal.',
  ],
  modelLine: 'We\'ve looked at a couple of other platforms, and one of them would cover most of what we need at today\'s price. I\'d honestly rather stay with you, the team knows the system. What could you do on the increase to make staying the clear choice?',
  modelNote: 'Notice the calm, even tone: the alternative is a fact, not a weapon.',
}

export const inserts = {
  'l2-goals': [qc('qc5-goals', 'What is your walk-away point?', [
    { t: 'The outcome you hope for.', fb: 'That is your ideal outcome. Aim for it, but it is not your limit.' },
    { t: 'The least you will accept before you would rather take your alternative.', correct: true, fb: 'Right. Write it down before the negotiation so pressure doesn\'t move it.' },
    { t: 'The first offer you make.', fb: 'Your first offer should be near your ideal, not your limit.' },
  ])],
  'l3-what': [qc('qc5-batna', 'Which is a BATNA?', [
    { t: '"We want a 10% discount."', fb: 'That is a goal or position.' },
    { t: '"If this supplier won\'t go below €15 a unit, we\'ll order from Supplier B at €16."', correct: true, fb: 'Right. Your BATNA is what you will actually do if there is no deal.' },
    { t: '"We will accept no less than €15."', fb: 'That is a walk-away point. It is connected to your BATNA but not the same thing.' },
  ])],
  'l3-strengthen': [qc('qc5-strengthen', 'Which action strengthens your BATNA most reliably?', [
    { t: 'Telling the other side you have many options.', fb: 'Claiming alternatives doesn\'t create them. If tested, a bluff weakens you.' },
    { t: 'Getting a real quote from an alternative supplier before the negotiation.', correct: true, fb: 'Right. Test your fallback so it isn\'t just theoretical.' },
    { t: 'Lowering your goals so any deal is acceptable.', fb: 'That weakens your position instead of improving your alternatives.' },
  ])],
  'l3-leverage': [saySignalBatna],
  'l3-zopa': [qc('qc5-zopa', 'Your walk-away is €68,000. Their maximum is €72,000. Where should your first offer go?', [
    { t: 'Around €68,000, so they accept quickly.', fb: 'That is your edge of the zone. You give away the whole zone to them.' },
    { t: 'Near their edge, around €72,000, with reasons to support it.', correct: true, fb: 'Right. Aim near their edge of the zone and justify it with objective criteria.' },
    { t: 'There is no ZOPA, so don\'t make an offer.', fb: 'Any deal from €68,000 to €72,000 is in the zone. There is a ZOPA.' },
  ])],
  'l4-examples': [qc('qc5-normative', 'A client says they "always reward long-term partners". You remind them of this when they push to cut your fees. Which leverage is that?', [
    { t: 'Positive', fb: 'Positive leverage is something they want from you.' },
    { t: 'Negative', fb: 'Negative leverage is a cost or loss they want to avoid.' },
    { t: 'Normative', correct: true, fb: 'Right. You appeal to their own stated values and standards.' },
  ])],
  'l5-framework': [yourTurnTrade],
}

export const confidence = {
  id: 'conf-m5',
  items: [
    { id: 'c1', text: 'Setting my ideal outcome, walk-away point and priorities' },
    { id: 'c2', text: 'Knowing and strengthening my BATNA' },
    { id: 'c3', text: 'Estimating the other side\'s BATNA and the ZOPA' },
    { id: 'c4', text: 'Using positive, negative and normative leverage' },
    { id: 'c5', text: 'Planning the path from opening to close' },
  ],
}

export const planner = {
  id: 'planner-m5',
  title: 'Your preparation planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real negotiation you are preparing for: it takes 20–30 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The negotiation', fields: [
      tx('what', 'The negotiation I\'m preparing for', 'e.g. Annual price review with our packaging supplier'),
      tx('when', 'When it happens', 'e.g. 14 March, video call'),
      tx('who', 'Who I\'ll be negotiating with', 'Name, role and who decides'),
    ] },
    { id: 'p1', title: 'Goals, walk-away point and priorities', hint: 'Three layers of goals.', fields: [
      ta('ideal', 'My ideal outcome', '', 2),
      ta('walk', 'My walk-away point', 'The least I will accept before I prefer my BATNA', 2),
      ta('must', 'Must-haves (one per line)', ''),
      ta('trade', 'Things I could trade (one per line)', ''),
    ] },
    { id: 'p2', title: 'My BATNA', hint: 'If there is no deal, what will I actually do?', fields: [
      ta('alts', 'My alternatives, ranked from best to worst (one per line)', ''),
      ta('batna', 'My BATNA in one sentence', '"If I can\'t…, I\'ll…"', 2),
      sel('strength', 'How strong is it today?', ['Weak', 'Moderate', 'Strong']),
      ta('improve', 'One action this week to strengthen it', 'e.g. Get a written quote from Supplier B', 2),
    ] },
    { id: 'p3', title: 'Their BATNA', hint: 'Clues and estimate.', fields: [
      ta('clues', 'What I know about their pressures, deadlines and options', ''),
      ta('questions', 'Subtle questions I\'ll ask', '"How critical is this timeline for your team?"', 2),
      sel('theirstrength', 'My estimate of their BATNA', ['Weak', 'Moderate', 'Strong', 'Not sure yet']),
      ta('zopa', 'Where I think the ZOPA is', 'Between my walk-away and their likely limit', 2),
    ] },
    { id: 'p4', title: 'Leverage map', hint: 'One example of each type, adapted to this negotiation.', fields: [
      ta('pos', 'Positive: what they want that I can offer', '', 2),
      ta('neg', 'Negative: what they could lose or risk', '', 2),
      ta('norm', 'Normative: values or standards they have committed to', '', 2),
    ] },
    { id: 'p5', title: 'Execution plan and logistics', hint: 'Plan the path from opening to close.', fields: [
      ta('agenda', 'Agenda: easy issues first, tough issues later', ''),
      ta('trades', 'My "If we do X, could you do Y?" trades', ''),
      ta('logistics', 'Venue, medium, timing and who attends', '', 2),
      ta('close', 'How I will summarise and confirm next steps', '', 2),
    ] },
    { id: 'p6', title: 'After-action review', hint: 'Come back after the negotiation.', fields: [
      ta('happened', 'What happened, in two sentences', '', 2),
      scale('r1', 'I stayed anchored to my goals and walk-away point.'),
      scale('r2', 'I used my BATNA with confidence, not threats.'),
      scale('r3', 'I traded concessions instead of giving them away.'),
      ta('change', 'What I\'ll prepare differently next time', '', 2),
    ] },
  ],
}
