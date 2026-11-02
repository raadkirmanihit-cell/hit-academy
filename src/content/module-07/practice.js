// Extra practice for Module 7: quick checks, "your turn" scripts, say-it-out-loud practice,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.
import { qc, scale, ta, tx, sel } from '../withPractice.js'

const Y = 'You'

const yourTurnClosing = {
  t: 'yourTurn',
  id: 'yt-closing',
  title: 'Now you: authority games and a last-minute change',
  setup: 'You have spent three weeks agreeing a €180,000 software implementation with Henrik, an IT manager at a client. Today is meant to be the signing call. At each pause, choose what you would say, or write your own line.',
  cast: { Henrik: { initials: 'HE', role: 'IT Manager, client' } },
  you: Y,
  script: [
    ['Henrik', 'Good news, we\'re ready to sign. Just one thing: my director says we need the training days included free. Otherwise she won\'t approve it.'],
    { pause: {
      prompt: 'A last-minute change, plus an appeal to higher authority. What do you say?',
      options: [
        { t: 'Fine, we\'ll include the training. Let\'s just get it signed.', fb: 'Relief makes you concede. Training days are worth real money, and you have taught them that last-minute asks work.' },
        { t: 'I want to get this signed today too. Training wasn\'t part of what we agreed, so let\'s look at it properly. Could your director join us for ten minutes so we can hear her concern directly?', best: true, fb: 'You stay calm, name the change without accusing anyone, and ask to involve the real decision-maker.' },
        { t: 'That\'s a classic negotiation trick and I\'m not falling for it.', fb: 'You recognise the tactic, but attacking it puts Henrik on the defensive and risks the whole deal.' },
      ],
      expert: 'I want to get this signed today too. Training wasn\'t part of what we agreed, so let\'s look at it properly. Could your director join us for ten minutes so we can hear her concern directly?',
      why: 'Counter higher authority by asking to involve the decision-maker, and counter last-minute changes by treating them as a new item, not a formality.',
    } },
    ['Henrik', 'She\'s travelling all week. I really need to tell her it\'s sorted.'],
    { pause: {
      prompt: 'The decision-maker is out of reach. How do you handle the new request?',
      options: [
        { t: 'I understand. If training is now part of the scope, then something else needs to move too. We could include two training days if we move the go-live from March to April, or keep March and price the training at our standard day rate. Which would she prefer?', best: true, fb: 'Any new request reopens the trade. You give two genuine options, and nothing is free.' },
        { t: 'Then we\'ll wait until she\'s back.', fb: 'Delaying may be fine, but you leave the request unanswered and lose momentum.' },
        { t: 'Okay, one free day, but that\'s it.', fb: 'Still a free concession at the last minute. A nibble that works once will come back.' },
      ],
      expert: 'I understand. If training is now part of the scope, then something else needs to move too. We could include two training days if we move the go-live from March to April, or keep March and price the training at our standard day rate. Which would she prefer?',
      why: 'Never give a last-minute concession for free: link it to a trade, and offer a choice.',
    } },
    ['Henrik', 'I think she\'d take the April go-live. Let me confirm by email tonight.'],
    { pause: {
      prompt: 'Close it so it doesn\'t move again.',
      options: [
        { t: 'Great, talk soon.', fb: 'Without a written summary, the next last-minute change is only an email away.' },
        { t: 'Perfect. I\'ll send a written summary now: €180,000, two training days included, go-live in April. Once she confirms, could we sign on Thursday? And is there anything else that might come up before then, so we can deal with it now?', best: true, fb: 'You summarise in writing, set a date, and invite any other surprises before signing, not after.' },
        { t: 'And nothing else changes, okay? Or we walk.', fb: 'A threat at the close damages the relationship you just protected.' },
      ],
      expert: 'Perfect. I\'ll send a written summary now: €180,000, two training days included, go-live in April. Once she confirms, could we sign on Thursday? And is there anything else that might come up before then, so we can deal with it now?',
      why: 'Confirm everything in writing and ask for any remaining issues before the close, so the deal stops moving.',
    } },
  ],
  note: 'Recognising the tactics let you stay calm. You protected the value of the deal and the relationship, and the client still got what they needed.',
}

const sayUltimatum = {
  t: 'sayItAloud',
  id: 'say-ultimatum',
  title: 'Say it out loud: respond to an ultimatum',
  situation: 'A major customer\'s buyer says: "This is our final offer: 8% off, or we move the contract to your competitor next month." You suspect there is some flexibility, and you have other customers who value your service.',
  task: 'Say your response out loud. Stay calm, test the ultimatum, and keep the door open. Two or three sentences.',
  criteria: [
    'Stay calm: acknowledge the pressure without matching it.',
    'Test the ultimatum with a calibrated question.',
    'Move the conversation toward a mutual solution.',
    'Show you have options, without threatening.',
  ],
  modelLine: 'I can hear this is important to you, and I want to keep working together. Is 8% truly your final position, or is there room to look at the whole package, such as volumes or payment terms? We have options, but we\'d much rather make this work with you.',
  modelNote: 'Notice the even tone: empathy first, then a test, then your BATNA as a quiet fact.',
}

export const inserts = {
  'l1-decode': [qc('qc7-recognise', 'You realise the other side is using a tactic. What should usually come first?', [
    { t: 'Use the same tactic back on them.', fb: 'Matching tactics escalates the game and damages trust.' },
    { t: 'Recognise it, stay calm, and respond to the substance rather than the pressure.', correct: true, fb: 'Right. A tactic loses most of its power the moment you recognise it.' },
    { t: 'End the negotiation immediately.', fb: 'Walking away is sometimes right, but most tactics can be countered calmly.' },
  ])],
  'l2-ultimatum-scripts': [sayUltimatum],
  'l2-deadline': [qc('qc7-deadline', 'A supplier says the discount "expires at 5 pm today". What is the best first response?', [
    { t: 'Sign before 5 pm to be safe.', fb: 'If the deadline is false, you have decided under pressure for nothing.' },
    { t: 'Ask what happens after 5 pm and why the deadline exists.', correct: true, fb: 'Right. Test the deadline with questions. Real deadlines have reasons; false ones often soften.' },
    { t: 'Tell them you know it\'s fake.', fb: 'Accusing them makes them defend the deadline instead of explaining it.' },
  ])],
  'l3-nibbling': [qc('qc7-nibble', 'After agreeing the price, the client asks, "You\'ll include delivery for free, right?" What is the best counter?', [
    { t: '"Sure, no problem."', fb: 'A free nibble. Small concessions at the end add up, and teach the other side to keep asking.' },
    { t: '"If delivery is included, could we agree payment in 30 days instead of 60?"', correct: true, fb: 'Right. Trade any late request for something of value to you.' },
    { t: '"No. Absolutely not."', fb: 'A flat refusal can sour the close. Trading keeps it constructive.' },
  ])],
  'l4-overwhelm': [qc('qc7-overwhelm', 'The other side sends a 90-page document an hour before the meeting. How do you respond?', [
    { t: 'Skim it and agree to avoid looking unprepared.', fb: 'Agreeing to what you haven\'t read is exactly what the tactic hopes for.' },
    { t: 'Ask them to summarise the key changes, and take time to review before deciding.', correct: true, fb: 'Right. Bring it back to what matters, and don\'t decide until you understand it.' },
    { t: 'Refuse to discuss anything.', fb: 'You can protect yourself without shutting the conversation down.' },
  ])],
  'l5-goodcop': [qc('qc7-goodcop', 'One buyer is aggressive; the other is friendly and says, "Help me help you: give me something to calm my boss." What is going on?', [
    { t: 'The friendly one is on your side.', fb: 'Both are on the same side. The contrast is designed to make you concede to the "nice" one.' },
    { t: 'Good cop / bad cop: treat them as one team and keep to your criteria.', correct: true, fb: 'Right. Respond to both in the same way, and keep the focus on the substance.' },
    { t: 'You should concede to calm the bad cop.', fb: 'That is the outcome the tactic is designed to produce.' },
  ])],
  'l5-lastminute': [yourTurnClosing],
}

export const confidence = {
  id: 'conf-m7',
  items: [
    { id: 'c1', text: 'Recognising a tactic while it is happening' },
    { id: 'c2', text: 'Staying calm under ultimatums, deadlines and outbursts' },
    { id: 'c3', text: 'Protecting my numbers against nibbles and bracketing' },
    { id: 'c4', text: 'Bringing authority games back to the real decision-maker' },
    { id: 'c5', text: 'Knowing when a tactic is ethical and when it is manipulation' },
  ],
}

export const planner = {
  id: 'planner-m7',
  title: 'Your objection-handling planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real negotiation you are preparing for: it takes 20–25 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The negotiation', fields: [
      tx('what', 'The negotiation I\'m preparing for', 'e.g. Signing the implementation contract'),
      tx('when', 'When it happens', ''),
      tx('who', 'Who I\'ll be negotiating with', 'Names, roles and who really decides'),
    ] },
    { id: 'p1', title: 'Tactic forecast and counter scripts', hint: 'The tactics I am most likely to face, and my counters.', fields: [
      tx('t1', 'Tactic 1', 'e.g. False deadline'),
      ta('c1', 'My counter for tactic 1, word for word', '', 2),
      tx('t2', 'Tactic 2', 'e.g. Appealing to higher authority'),
      ta('c2', 'My counter for tactic 2, word for word', '', 2),
      tx('t3', 'Tactic 3 (optional)', ''),
      ta('c3', 'My counter for tactic 3', '', 2),
    ] },
    { id: 'p2', title: 'Warning-sign checklist', hint: 'Which warning signs will I watch for? Use the quick reference table.', fields: [
      ta('signs', 'The warning signs I\'ll watch for (one per line)', '"Final offer", "my boss won\'t approve", a sudden flood of documents…'),
    ] },
    { id: 'p3', title: 'Tactic log', hint: 'Use this during or straight after the negotiation.', fields: [
      ta('log', 'Tactics I noticed, when, and how I responded (one per line)', ''),
    ] },
    { id: 'p4', title: 'My lines for pressure moments', fields: [
      ta('pause', 'My line to buy time', '"Let me take a moment to think about that."', 2),
      ta('test', 'My line to test an ultimatum or deadline', '"Is that truly your final position?"', 2),
      ta('batna', 'My BATNA line, calm and without threat', '"We have options, but we want to make this work with you."', 2),
    ] },
    { id: 'p5', title: 'Team roles and time-out signal', hint: 'If you negotiate as a team.', fields: [
      ta('roles', 'Who leads, who listens, who decides', '', 2),
      tx('signal', 'Our time-out signal', 'e.g. "Let\'s check the numbers"'),
    ] },
    { id: 'p6', title: 'Integrity check', fields: [
      ta('mytactics', 'Any tactic I plan to use myself', '', 2),
      sel('ethical', 'Would I be comfortable if the other side knew exactly what I was doing and why?', ['Yes', 'Not sure', 'No, I need to rethink it']),
    ] },
    { id: 'p7', title: 'After-action review', hint: 'Come back after the negotiation.', fields: [
      ta('happened', 'What happened, in two sentences', '', 2),
      scale('r1', 'I recognised the tactics as they happened.'),
      scale('r2', 'I stayed calm and responded to the substance.'),
      scale('r3', 'I stayed within my own integrity line.'),
      ta('change', 'What I\'ll change next time', '', 2),
    ] },
  ],
}
