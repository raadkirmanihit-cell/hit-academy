// Interactive activities for Module 7. Built from the module's own tactics, warning signs and counters.

// Lesson 2: pressure tactics.
export const spotPressure = {
  id: 'a-spot-pressure',
  kind: 'classify',
  title: 'Name the pressure tactic',
  prompt: 'Twelve things you might hear or see. Which pressure tactic is each one a warning sign of? On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'ultimatum', label: 'Ultimatum or threat', hint: 'Fear of loss as pressure', color: 'var(--b-aggressive)' },
    { id: 'deadline', label: 'False deadline', hint: 'Urgency without reason', color: 'var(--orange)' },
    { id: 'outburst', label: 'Emotional outburst', hint: 'Drama to unsettle', color: '#6b5bd2' },
    { id: 'silence', label: 'Silence', hint: 'The void you want to fill', color: '#3d6fd8' },
    { id: 'flinch', label: 'The flinch', hint: 'Shock to provoke doubt', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'p4', text: '"This is outrageous! I can\'t believe this!"', answer: 'outburst', why: 'Sudden, emotional language to intimidate or unsettle.' },
    { id: 'p5', text: 'A long pause after your offer, and a blank stare.', answer: 'silence', why: 'Silence pressures you to fill the void, often with a concession.' },
    { id: 'p2', text: '"This offer expires today." No reason given.', answer: 'deadline', why: 'A deadline without rationale is a warning sign.' },
    { id: 'p6', text: 'Raised eyebrows, a gasp: "That\'s way too high!"', answer: 'flinch', why: 'An exaggerated reaction to make you doubt your number.' },
    { id: 'p7', text: '"Take it or leave it. Decide now."', answer: 'ultimatum', why: 'A fixed offer with a demand for an immediate decision.' },
    { id: 'p12', text: '"Whoa. That\'s way higher than we expected."', answer: 'flinch', why: 'A visible show of shock, designed to provoke a quick concession.' },
    { id: 'p3', text: '"If you don\'t agree, we\'ll cancel."', answer: 'ultimatum', why: 'A consequence used to apply pressure.' },
    { id: 'p8', text: 'The "today only" deadline quietly becomes "tomorrow could work".', answer: 'deadline', why: 'A real deadline doesn\'t shift after pushback.' },
    { id: 'p9', text: '"You\'ll lose the account if this goes on."', answer: 'ultimatum', why: 'A warning about what you will lose, used as leverage.' },
    { id: 'p11', text: 'They say nothing after your proposal, waiting to see if you retract it.', answer: 'silence', why: 'The pause is meant to make you back down.' },
    { id: 'p1', text: '"This is our final offer. It\'s non-negotiable."', answer: 'ultimatum', why: '"Final offer" and "non-negotiable" are the classic phrases.' },
    { id: 'p10', text: 'Sudden yelling when you raise the price.', answer: 'outburst', why: 'Anger shifts the focus from the issue to the emotion.' },
  ],
}

export const counterPressure = {
  id: 'a-counter-pressure',
  kind: 'scenarios',
  title: 'Choose the counter',
  prompt: 'Five pressure moments. Choose the response the module recommends.',
  items: [
    {
      who: 'An ultimatum',
      scene: '"The offer is $95,000. That\'s the final number, take it or leave it."',
      options: [
        { t: '"Fine, I\'ll take it."', fb: 'You accept without testing whether it really is final.' },
        { t: '"I appreciate that you\'ve worked within your constraints. Is that truly your final position, or is there flexibility?"', correct: true, fb: 'Strategic empathy, then an assertive test of the ultimatum.' },
        { t: '"Then I\'m leaving."', fb: 'You end the negotiation before checking for flexibility or alternatives.' },
      ],
    },
    {
      who: 'A deadline',
      scene: 'A vendor says: "If we don\'t sign by 5 p.m., the offer expires." They said the same thing last week.',
      options: [
        { t: '"What happens if we take another day to decide? You mentioned needing to close last week too."', correct: true, fb: 'A calm question tests the deadline, and the comparison with past behaviour exposes it.' },
        { t: 'Sign before 5 p.m., just in case.', fb: 'That rewards a deadline that may not be real.' },
        { t: '"You\'re lying about the deadline."', fb: 'An accusation. Test it with a question instead.' },
      ],
    },
    {
      who: 'A threat',
      scene: 'A long-term client: "If you can\'t meet this rate, we\'ll cancel the contract and move on."',
      options: [
        { t: '"Go ahead. We don\'t need you."', fb: 'A counter-threat escalates, and is probably not true.' },
        { t: 'Immediately cut the rate.', fb: 'Panic. The threat worked exactly as intended.' },
        { t: '"Is ending the relationship the outcome you\'re hoping for? Let\'s focus on a solution that works for both of us."', correct: true, fb: 'You calmly question the threat and reframe toward mutual solutions.' },
      ],
    },
    {
      who: 'An outburst',
      scene: 'A team member shouts: "I worked all weekend on this! Nothing I do is good enough!"',
      options: [
        { t: '"I can see this matters to you. Let\'s work through the feedback step by step. Would a 10-minute break help first?"', correct: true, fb: 'Calm, acknowledge without feeding the emotion, and offer a reset.' },
        { t: '"Don\'t raise your voice at me!"', fb: 'Mirroring the emotion escalates the situation.' },
        { t: '"Okay, forget the feedback. It\'s fine."', fb: 'You concede to calm the situation: what the tactic relies on.' },
      ],
    },
    {
      who: 'A flinch',
      scene: 'You quote $5,000 a month. The client recoils: "That feels really expensive."',
      options: [
        { t: '"Okay, how about $4,000?"', fb: 'An instant concession: exactly what the flinch is designed to produce.' },
        { t: 'Pause. Then: "Let\'s walk through how we arrived at that number." And if budget is the issue, adjust scope, not rate.', correct: true, fb: 'Composed, no rush to defend, and structure instead of concession.' },
        { t: 'Explain at length why it\'s worth it, without stopping.', fb: 'Defending too quickly signals doubt.' },
      ],
    },
  ],
}

// Lesson 3: numbers and trades.
export const spotNumbers = {
  id: 'a-spot-numbers',
  kind: 'classify',
  title: 'Name the numbers tactic',
  prompt: 'Ten moments in a negotiation. Which tactic is each one a warning sign of?',
  buckets: [
    { id: 'lowball', label: 'Highball / lowball', hint: 'An extreme first offer', color: 'var(--b-aggressive)' },
    { id: 'bracket', label: 'Bracketing', hint: 'The edge of your range', color: 'var(--orange)' },
    { id: 'bogey', label: 'The bogey', hint: 'A fake priority', color: '#6b5bd2' },
    { id: 'nibble', label: 'Nibbling', hint: 'Extras after the deal', color: '#3d6fd8' },
    { id: 'cherry', label: 'Cherry picking', hint: 'Only the best parts', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'n1', text: 'An offer of $58,000 for a role the market pays about $75,000.', answer: 'lowball', why: 'Wildly outside market norms, to set an anchor.' },
    { id: 'n5', text: '"We\'ll take the discount, but not the volume commitment."', answer: 'cherry', why: 'Accepting only the favourable part of a linked package.' },
    { id: 'n2', text: 'You said "$90,000 to $100,000". They reply: "$98,000 it is."', answer: 'bracket', why: 'They placed their number at the edge of your range, shifting the midpoint.' },
    { id: 'n6', text: 'A seller opens at twice the price of every comparable offer.', answer: 'lowball', why: 'An extreme opening offer is a highball.' },
    { id: 'n9', text: '"We like the price, but we want the shorter contract too."', answer: 'cherry', why: 'They ignore the interdependency between price and contract length.' },
    { id: 'n10', text: 'A "dealbreaker" job title that is suddenly fine once remote work is approved.', answer: 'bogey', why: 'The "critical" issue was a bargaining chip.' },
    { id: 'n7', text: 'They keep repeating: "The midpoint would be fair."', answer: 'bracket', why: 'Over-emphasis on midpoint logic is a warning sign.' },
    { id: 'n4', text: '"Great, we\'re aligned. Just one more thing…"', answer: 'nibble', why: 'Small extras requested after agreement.' },
    { id: 'n3', text: 'They insist on on-site training as "critical", then drop it for longer payment terms.', answer: 'bogey', why: 'Overemphasis on a secondary issue, then a sudden willingness to drop it.' },
    { id: 'n8', text: 'After signing the main terms, they ask for free shipping on every order.', answer: 'nibble', why: 'A post-agreement extra, counting on deal fatigue.' },
  ],
}

export const counterNumbers = {
  id: 'a-counter-numbers',
  kind: 'scenarios',
  title: 'Choose the counter',
  prompt: 'Four moments with numbers on the table. Choose the response the module recommends.',
  items: [
    {
      who: 'A lowball',
      scene: 'The employer offers $58,000. You know the market range is $72,000 to $78,000.',
      options: [
        { t: '"How about $62,000?"', fb: 'A small step up from their extreme number accepts their anchor.' },
        { t: '"That\'s insulting."', fb: 'An emotional reaction. Stay calm and use data.' },
        { t: '"Market benchmarks for this role run from $72,000 to $78,000. Can you walk me through how you arrived at $58,000?"', correct: true, fb: 'Re-anchor with market data, then a question reveals their reasoning.' },
      ],
    },
    {
      who: 'Midpoint pressure',
      scene: 'They suggested $90,000 to $100,000. You said $98,000. They reply: "The midpoint would be $95,000."',
      options: [
        { t: '"Let\'s not average numbers for convenience. The right number reflects delivery risk, resources and market benchmarks."', correct: true, fb: 'Defend your bracket with rationale, not math.' },
        { t: '"Okay, $95,000."', fb: 'You let midpoint logic decide instead of value.' },
        { t: '"Then $100,000."', fb: 'Escalating without a reason undermines your credibility.' },
      ],
    },
    {
      who: 'A nibble',
      scene: 'You agreed $48,000 for the year. The vendor adds: "Could you also include free onboarding for the whole team?"',
      options: [
        { t: '"Sure, happy to."', fb: 'Deal fatigue at work: value given away for nothing.' },
        { t: '"If onboarding is added, what can you offer on your side to balance that? Then let\'s freeze the scope in writing."', correct: true, fb: 'Tie the concession to reciprocation, then use closure language.' },
        { t: '"No. Absolutely not."', fb: 'A flat no can sour a good deal. Trade instead.' },
      ],
    },
    {
      who: 'Cherry picking',
      scene: 'Your package: discounted price, two-year contract, minimum volume. They say: "We\'ll take the discount, but not the rest."',
      options: [
        { t: 'Give them the discount; you can\'t lose the deal.', fb: 'Renegotiating piece by piece weakens your whole proposal.' },
        { t: '"The discount only works with the other terms, so the deal\'s off."', fb: 'Linking is right, but you close the door instead of offering an alternative.' },
        { t: '"The pricing is tied to the volume and the term. If you prefer no volume commitment, option B has a higher unit rate and a shorter term."', correct: true, fb: 'Reinforce the interlinkages, and offer an alternative.' },
      ],
    },
  ],
}

// Lesson 4: distraction and confusion.
export const spotDistraction = {
  id: 'a-spot-distraction',
  kind: 'classify',
  title: 'Name the distraction tactic',
  prompt: 'Ten moments. Which distraction or confusion tactic is each one a warning sign of?',
  buckets: [
    { id: 'herring', label: 'Red herring', hint: 'An irrelevant side issue', color: 'var(--b-aggressive)' },
    { id: 'straw', label: 'Strawman', hint: 'Your position, distorted', color: 'var(--orange)' },
    { id: 'dumb', label: 'Playing dumb', hint: 'Feigned confusion', color: '#6b5bd2' },
    { id: 'overload', label: 'Information overload', hint: 'Too much data', color: '#3d6fd8' },
    { id: 'delay', label: 'Deliberate delay', hint: 'Slowing to wear you down', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'd5', text: '"We\'re still waiting on sign-off." Third week in a row.', answer: 'delay', why: 'Endless internal reviews and postponed meetings.' },
    { id: 'd7', text: 'You ask to rebalance two tasks. They reply: "So you think I do nothing?"', answer: 'straw', why: 'A distorted, extreme version of your proposal.' },
    { id: 'd8', text: 'They misstate a term you defined clearly yesterday.', answer: 'dumb', why: 'Misstating obvious terms places the burden of explanation on you.' },
    { id: 'd4', text: 'A 48-slide deck arrives mid-meeting, with sensitivity models.', answer: 'overload', why: 'Giant packets of data, mid-meeting.' },
    { id: 'd2', text: '"So you\'re saying our team is incompetent?"', answer: 'straw', why: '"So you\'re saying…" followed by an exaggeration.' },
    { id: 'd3', text: 'They ask, for the third time, what "net margin" means.', answer: 'dumb', why: 'Asking the same basic questions repeatedly.' },
    { id: 'd6', text: '"Before we discuss the budget: why does your team always book the big meeting room?"', answer: 'herring', why: 'An irrelevant issue to sidetrack an important discussion.' },
    { id: 'd10', text: 'Slow email replies and a meeting moved for the fourth time.', answer: 'delay', why: 'Slowing the process to exhaust you.' },
    { id: 'd1', text: 'Every time you make progress, they bring up a minor complaint from last year.', answer: 'herring', why: 'Shifting the topic when progress is made.' },
    { id: 'd9', text: 'Hyper-technical jargon and irrelevant statistics, instead of an answer on price.', answer: 'overload', why: 'Confusion and fatigue deflect from the real issue.' },
  ],
}

export const counterDistraction = {
  id: 'a-counter-distraction',
  kind: 'scenarios',
  title: 'Choose the counter',
  prompt: 'Four moments of distraction or confusion. Choose the response the module recommends.',
  items: [
    {
      who: 'A side issue',
      scene: 'In the middle of agreeing price, they raise a complaint about the font in your last report.',
      options: [
        { t: '"Can you help me understand how this relates to the core of our agreement? Let\'s park it until the key terms are settled."', correct: true, fb: 'Ask how it relates, then table the side issue.' },
        { t: 'Spend twenty minutes defending the report.', fb: 'The red herring worked: the price discussion is gone.' },
        { t: '"That\'s irrelevant."', fb: 'Dismissive. Ask and park it instead.' },
      ],
    },
    {
      who: 'A distortion',
      scene: 'You propose a phased start. They say: "So you\'re saying you can\'t deliver at all?"',
      options: [
        { t: '"Fine, we\'ll deliver everything at once."', fb: 'You concede to escape the distortion.' },
        { t: 'Defend your company\'s track record at length.', fb: 'You are now arguing against a position you never took.' },
        { t: '"That\'s not what I said. Let me explain it again more precisely. Can you repeat my point in your own words?"', correct: true, fb: 'Clarify immediately, then ask them to restate your position.' },
      ],
    },
    {
      who: 'Too much data',
      scene: 'They begin flipping through 48 slides instead of answering your question on price.',
      options: [
        { t: 'Ask them to email the deck, and agree to their price in the meantime.', fb: 'Overload is designed to make you do exactly that.' },
        { t: '"What decision is this analysis meant to help us make? What are the top three conclusions?"', correct: true, fb: 'Ask for a summary and prioritise: take back control of the agenda.' },
        { t: 'Go through all 48 slides carefully.', fb: 'You lose the meeting in the details.' },
      ],
    },
    {
      who: 'Endless delay',
      scene: 'For the third week, the answer is: "We\'re still waiting on sign-off."',
      options: [
        { t: '"We\'ll need confirmation by Friday to stay on track. Is there someone who can help us move this forward?"', correct: true, fb: 'An explicit timeline, and a diplomatic escalation.' },
        { t: 'Offer a discount to speed things up.', fb: 'That rewards the delay.' },
        { t: 'Wait patiently. They\'ll come back eventually.', fb: 'Waiting is exactly what the tactic wants.' },
      ],
    },
  ],
}

// Lesson 5: authority, teams and closing.
export const spotAuthority = {
  id: 'a-spot-authority',
  kind: 'classify',
  title: 'Name the tactic',
  prompt: 'Ten moments. Which authority, team or closing tactic is each one a warning sign of?',
  buckets: [
    { id: 'cop', label: 'Good cop / bad cop', hint: 'Harsh and warm in turns', color: 'var(--b-aggressive)' },
    { id: 'limited', label: 'Limited authority', hint: '"I can\'t decide"', color: 'var(--orange)' },
    { id: 'higher', label: 'Higher authority', hint: 'An unseen approver', color: '#6b5bd2' },
    { id: 'divide', label: 'Divide and conquer', hint: 'Isolating one of you', color: '#3d6fd8' },
    { id: 'late', label: 'Last-minute change', hint: 'New terms at signing', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'a6', text: 'You are bounced between two people for every decision.', answer: 'cop', why: 'They split the decision-making between the two roles.' },
    { id: 'a5', text: '"Before we sign, we just need to add this clause…"', answer: 'late', why: 'New terms surfacing after consensus.' },
    { id: 'a9', text: 'They ask your colleague for a private call "to sort this out between you two".', answer: 'divide', why: 'Trying to speak to individuals privately.' },
    { id: 'a3', text: '"Our legal team won\'t approve that."', answer: 'higher', why: 'An unseen stakeholder as a reason not to agree.' },
    { id: 'a7', text: '"I need to check with my manager." Again, at the end.', answer: 'limited', why: 'Postponing commitment after progress.' },
    { id: 'a10', text: 'At the signing, the delivery date suddenly moves by a month.', answer: 'late', why: 'A significant change at the final moment, counting on momentum.' },
    { id: 'a4', text: '"You seem more reasonable than your colleague."', answer: 'divide', why: 'An attempt to isolate the more compliant team member.' },
    { id: 'a2', text: '"I like everything we discussed, but I don\'t have final authority."', answer: 'limited', why: 'Claiming a lack of power to decide, after a productive discussion.' },
    { id: 'a1', text: 'One negotiator is harsh and inflexible; the other is warm and "on your side".', answer: 'cop', why: 'The contrast creates pressure, then relief.' },
    { id: 'a8', text: '"I need to run this by my boss before we can go further."', answer: 'higher', why: 'Deflecting pressure to someone you can\'t negotiate with.' },
  ],
}

export const counterAuthority = {
  id: 'a-counter-authority',
  kind: 'scenarios',
  title: 'Choose the counter',
  prompt: 'Four moments. Choose the response the module recommends.',
  items: [
    {
      who: 'Two voices',
      scene: 'The HR manager is tough; the hiring manager is warm and promises to "explore options with HR".',
      options: [
        { t: 'Thank the warm one and lower your ask, so they can help you.', fb: 'The relief of the "good cop" is exactly what the tactic relies on.' },
        { t: '"I appreciate both viewpoints. Could we review the approved compensation band, and get everyone needed for this decision in the room?"', correct: true, fb: 'Stay neutral, focus on the facts, and ask for joint decision-making.' },
        { t: 'Argue with the tough one until they back down.', fb: 'You are drawn into the emotional game.' },
      ],
    },
    {
      who: 'No authority',
      scene: 'After agreeing all terms: "I need to run this by my VP. I don\'t have final authority."',
      options: [
        { t: '"We negotiated assuming the decision-makers were represented. Let\'s have your VP join the next call. If we don\'t have approval within 24 hours, the terms will need to be reopened."', correct: true, fb: 'Direct and calm, with a clear boundary and timeline.' },
        { t: '"No problem, take your time."', fb: 'An open-ended delay, and the terms may be "renegotiated" by the VP.' },
        { t: 'Offer an extra discount to help them get approval.', fb: 'You concede in the hope of approval: what the tactic counts on.' },
      ],
    },
    {
      who: 'Divide and conquer',
      scene: 'The vendor says to you: "You seem more flexible than your colleague. Maybe we can work this out directly."',
      options: [
        { t: '"Sure, let\'s talk later, just us."', fb: 'You break your team\'s unity.' },
        { t: '"We\'re aligned as a team. Let\'s take a few minutes to regroup and come back with a clear response."', correct: true, fb: 'A unified front, and a time-out to regroup.' },
        { t: 'Agree with the vendor that your colleague is being difficult.', fb: 'Exactly the misalignment they wanted.' },
      ],
    },
    {
      who: 'At the signing',
      scene: '"Before we sign, we just need to add this clause. It\'s just standard language."',
      options: [
        { t: 'Sign. It\'s probably fine.', fb: 'Momentum is what the tactic exploits.' },
        { t: '"Then the deal is off."', fb: 'Be ready to walk away, but first review it.' },
        { t: '"That changes our understanding. Let\'s review how it affects the whole agreement. We can\'t accept new terms without proper review."', correct: true, fb: 'Slow down, reopen the discussion and set the boundary.' },
      ],
    },
  ],
}

// Lesson 6: the full role-play.
export const vendorRoleplay = {
  id: 'a-roleplay-tactics',
  kind: 'branching',
  title: 'Role-play: one negotiation, many tactics',
  intro: 'You are buying a fleet-management system for your company. You have researched the market: comparable systems cost €90,000 to €105,000 a year, and you have a solid quote from a second vendor at €98,000. Today you meet Jordan, the vendor\'s sales director. Expect tactics. Watch the two meters.',
  img: 'img/m7/goodcop.webp',
  counterpart: { name: 'Jordan', initials: 'JO', role: 'Sales director' },
  meterLabels: ['Progress toward a good deal', 'Your control of the process'],
  start: { outcome: 25, relationship: 40 },
  nodes: {
    start: {
      say: 'Great to see you. For the full package, the annual fee is €148,000.',
      choices: [
        { t: '"That\'s ridiculous. We\'ll never pay that."', tag: 'Emotional', d: [-5, -10], next: 'anchor', fb: 'You react emotionally to a highball. Stay calm and use data.' },
        { t: '"I appreciate the offer. Comparable systems run from €90,000 to €105,000. Can you walk me through how you arrived at €148,000?"', tag: 'Re-anchor', d: [15, 15], next: 'anchor', fb: 'You re-anchor with market data and ask how they built their number.' },
        { t: '"Could you do €140,000?"', tag: 'Accepts anchor', d: [-15, -10], next: 'endAnchored', fb: 'A small step down from their extreme number: their anchor now frames the deal.' },
      ],
    },
    anchor: {
      say: 'There\'s a lot of value in our platform. But I hear you. Look, I can do €118,000, but only if you sign today. This price expires at 5 p.m.',
      choices: [
        { t: '"I understand the urgency. What happens if we take another day to decide?"', tag: 'Test the deadline', d: [10, 15], next: 'deadline', fb: 'A calm question to test whether the deadline is real.' },
        { t: '"Okay, we\'ll sign today."', tag: 'Rushed', d: [-10, -15], next: 'endRushed', fb: 'A deadline without rationale pushed you into a rushed decision.' },
      ],
    },
    deadline: {
      say: 'Well… I could probably hold it until tomorrow. But I\'ll need to run any further discount past my VP. I don\'t have authority to go lower.',
      choices: [
        { t: '"No problem, take as long as you need."', tag: 'Open-ended', d: [-5, -15], next: 'endDrift', fb: 'An open-ended wait hands control to an unseen authority.' },
        { t: '"Then let\'s involve your VP now. Before we go further: who has final approval, and can they join a call tomorrow?"', tag: 'Confirm authority', d: [15, 15], next: 'vp', fb: 'Confirm the decision-maker and ask for access.' },
        { t: '"If you can\'t decide, what\'s the point of this meeting?"', tag: 'Accusing', d: [-5, -5], next: 'vp', fb: 'Right instinct, wrong tone. Ask calmly for the decision-maker.' },
      ],
    },
    vp: {
      say: 'Fair. My VP joined the call: we can do €104,000 a year. Oh, and our implementation fee is separate, of course.',
      choices: [
        { t: '"The implementation fee is a new term. Let\'s review how it affects the total. What is included in it, and was it in your €148,000 package?"', tag: 'Slow down', d: [15, 10], next: 'package', fb: 'New terms late in the process: slow down and review all impacts.' },
        { t: '"Great, let\'s go."', tag: 'Momentum', d: [-10, -10], next: 'endHidden', fb: 'A late addition, accepted on momentum.' },
      ],
    },
    package: {
      say: 'It\'s €12,000. Alright: we\'ll include implementation if you sign a three-year contract at €104,000 a year.',
      choices: [
        { t: '"Done. Three years at €104,000, implementation included."', tag: 'Good, not great', d: [10, 0], next: 'endGood', fb: 'A reasonable deal, but €104,000 is above your second quote at €98,000.' },
        { t: '"A three-year commitment has real value for you. With implementation included, we can commit for three years at €97,500 a year. Our other written quote is €98,000, but we\'d prefer to work with you."', tag: 'Trade and BATNA', d: [20, 15], next: 'nibble', fb: 'You trade the commitment they want for price, and reference your BATNA as confidence, not a threat.' },
      ],
    },
    nibble: {
      say: '…Okay. €97,500 for three years, implementation included. Agreed. Oh, and just one more thing: we\'ll need you to pay the first year upfront.',
      choices: [
        { t: '"Fine, upfront is okay."', tag: 'Gives in', d: [-5, -5], next: 'endNibbled', fb: 'A nibble accepted out of deal fatigue.' },
        { t: '"Upfront payment wasn\'t part of what we agreed. If that matters to you, what can you add on your side? Otherwise, let\'s freeze the terms in writing as agreed."', tag: 'Counter the nibble', d: [15, 15], next: 'endStrong', fb: 'Tie any extra to reciprocation, and use closure language.' },
      ],
    },
    endStrong: { end: true, verdict: 'Every tactic spotted', say: 'Fair enough. Quarterly payments, as agreed. I\'ll send the contract today.', summary: 'Highball, false deadline, limited authority, a last-minute fee and a nibble: you recognised each one and countered it calmly. Result: three years at €97,500, implementation included, below your best alternative.' },
    endGood: { end: true, verdict: 'A fair deal, with value left on the table', say: 'Great, I\'ll send the contract.', summary: 'You handled the tactics well, but €104,000 is above your second vendor\'s €98,000. Trading the three-year commitment for price, and referencing your BATNA, would have done better.' },
    endNibbled: { end: true, verdict: 'Good deal, one nibble too many', say: 'Perfect. I\'ll send the invoice for year one.', summary: 'A strong price, but you gave away the payment terms after the deal was done. Counter a nibble with reciprocation and closure language.' },
    endAnchored: { end: true, verdict: 'Anchored high', say: 'Let me see what I can do around €140,000.', summary: 'Their extreme first number now frames the whole negotiation. Re-anchor with market data before any counteroffer.' },
    endRushed: { end: true, verdict: 'Rushed by a false deadline', say: 'Wonderful. I\'ll send the contract now.', summary: '€118,000 is well above the market and your alternative. A calm question ("What happens if we take another day?") would have exposed the deadline.' },
    endDrift: { end: true, verdict: 'Lost in approvals', say: 'I\'ll get back to you once my VP has had a look.', summary: 'Two weeks later, there is still no answer. Confirm the decision-maker early, ask for access, and set a clear approval timeline.' },
    endHidden: { end: true, verdict: 'A hidden cost slipped through', say: 'Excellent. You\'ll get the invoice, including implementation.', summary: 'The €12,000 implementation fee appeared at the last moment and was accepted on momentum. Slow down and review all impacts.' },
  },
}
