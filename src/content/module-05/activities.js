// Interactive activities for Module 5. Built from the module's own concepts and examples.

// Lesson 2: priorities. The scenario states Sam's priorities, so each item has a clear answer.
export const priorityTiers = {
  id: 'a-priority-tiers',
  kind: 'classify',
  title: 'Must-have, important or tradeable?',
  prompt: 'Sam is negotiating a job offer. Sam has told you: "I can\'t go below €68,000, and I must be able to work from home two days a week because of childcare. I\'d really like a senior title and a training budget. The start date, the car allowance and the office location don\'t matter much to me." Sort each item. On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'must', label: 'Must-have', hint: 'Non-negotiable: protect it', color: 'var(--b-aggressive)' },
    { id: 'important', label: 'Important', hint: 'Push for it, but can flex', color: 'var(--orange)' },
    { id: 'trade', label: 'Tradeable', hint: 'Give it to get something else', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'p1', text: 'Salary of at least €68,000', answer: 'must', why: 'Below this, Sam would rather keep looking. It is Sam\'s walk-away point.' },
    { id: 'p2', text: 'Two days a week working from home', answer: 'must', why: 'Childcare makes this non-negotiable for Sam.' },
    { id: 'p3', text: 'A "Senior" job title', answer: 'important', why: 'Sam would really like it, but could accept a review in six months.' },
    { id: 'p4', text: 'A yearly training budget', answer: 'important', why: 'Valuable to Sam, and worth pushing for, but not a deal-breaker.' },
    { id: 'p5', text: 'Start date in four weeks rather than two', answer: 'trade', why: 'Sam doesn\'t mind, so it is something Sam can offer in exchange.' },
    { id: 'p6', text: 'A car allowance', answer: 'trade', why: 'Low value to Sam, so Sam can concede it to win on something that matters more.' },
    { id: 'p7', text: 'Working from the city office rather than the suburb', answer: 'trade', why: 'Location doesn\'t matter much to Sam: an affordable concession.' },
  ],
}

// Lesson 3: rate the strength of a BATNA.
export const rateBatna = {
  id: 'a-rate-batna',
  kind: 'classify',
  title: 'Weak, moderate or strong?',
  prompt: 'Eight people and their fallback options. How strong is each BATNA?',
  buckets: [
    { id: 'weak', label: 'Weak', hint: 'Risky, costly or uncertain', color: 'var(--b-aggressive)' },
    { id: 'moderate', label: 'Moderate', hint: 'Meets some goals, not all', color: 'var(--orange)' },
    { id: 'strong', label: 'Strong', hint: 'Equal to or better than the deal', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'b1', text: 'A candidate with a written offer from another company, at a higher salary', answer: 'strong', why: 'Concrete, available and valuable: immediate leverage.' },
    { id: 'b2', text: 'A seller who can rent the property out instead of selling at a loss', answer: 'strong', why: 'Income continues, so there is no pressure to settle.' },
    { id: 'b3', text: 'A buyer with a lower written quote from another car dealer', answer: 'strong', why: 'A concrete, often better financial option is available.' },
    { id: 'b4', text: 'A salesperson with several leads in the pipeline, none close to signing', answer: 'moderate', why: 'Potential, but with timing risk.' },
    { id: 'b5', text: 'A candidate with promising interviews elsewhere, but no offer yet', answer: 'moderate', why: 'Possible but uncertain: some leverage, limited pressure.' },
    { id: 'b6', text: 'A company that could partner with a smaller firm instead', answer: 'moderate', why: 'It achieves the objectives, but with less impact or reach.' },
    { id: 'b7', text: 'A spouse whose only alternative to a settlement is going to court', answer: 'weak', why: 'Costly, emotionally draining and uncertain: a last resort.' },
    { id: 'b8', text: 'A freelancer whose only client this quarter is the one at the table', answer: 'weak', why: 'No immediate substitute. Focus on value and relationship, and on building alternatives.' },
  ],
}

// Lesson 3, step 3: leverage your BATNA without threatening.
export const useYourBatna = {
  id: 'a-use-batna',
  kind: 'scenarios',
  title: 'Signal confidence, not threats',
  prompt: 'Five moments where your BATNA could help. Choose the best move.',
  items: [
    {
      who: 'Opening the meeting',
      scene: 'You have a solid quote from a second supplier. The meeting with your preferred supplier has just started, and you haven\'t yet discussed their needs.',
      options: [
        { t: '"Before we start, you should know we have a cheaper quote."', fb: 'Too early. Before rapport and understanding, it sounds like a threat and puts them on the defensive.' },
        { t: 'Keep it in your pocket. Build rapport and explore their needs first.', correct: true, fb: 'Control your timing: reference your BATNA after you\'ve built rapport and understood their needs.' },
        { t: '"Let\'s be clear: we don\'t need you."', fb: 'A threat that damages the relationship, and probably isn\'t true.' },
      ],
    },
    {
      who: 'Mentioning alternatives',
      scene: 'You have built rapport and understand their priorities. Now you want them to know you have options.',
      options: [
        { t: '"If you don\'t agree, I\'ll go elsewhere."', fb: 'This is exactly the phrasing the module tells you to avoid.' },
        { t: '"We\'re also exploring other partnerships, but I\'d like to see how we can make this work with you."', correct: true, fb: 'Signal confidence, not threats. You show you have options and keep the door open.' },
        { t: 'Say nothing about alternatives at all.', fb: 'You may leave value on the table. A calm signal is appropriate now.' },
      ],
    },
    {
      who: 'Justifying your position',
      scene: 'They say your price expectation is unrealistic.',
      options: [
        { t: '"That\'s just what we expect."', fb: 'An assertion without evidence invites a contest of will.' },
        { t: '"Three comparable providers quoted between $14 and $16 per unit this month. Here\'s the summary."', correct: true, fb: 'Negotiate from information, not emotion: use facts from your research.' },
        { t: '"Fine, what number would work for you?"', fb: 'You abandon your preparation at the first push.' },
      ],
    },
    {
      who: 'An offer below your walk-away point',
      scene: 'After real effort on both sides, their final offer is below the walk-away point you wrote down. Your BATNA is tested and ready.',
      options: [
        { t: 'Accept it anyway. You\'ve invested so much time.', fb: 'Sunk time is not a reason to take a deal worse than your BATNA.' },
        { t: '"Thank you for working on this. It doesn\'t meet what we need, so we\'ll go another way for now, and I hope we can work together in future."', correct: true, fb: 'Keep your fallback ready and walk away gracefully: firm on the limit, warm on the relationship.' },
        { t: '"This is insulting. We\'re done."', fb: 'Walking away is right; burning the bridge is not.' },
      ],
    },
    {
      who: 'Their BATNA is weak',
      scene: 'Your research shows they urgently need a supplier who can deliver within a month, and few can.',
      options: [
        { t: 'Raise your price sharply. They have no choice.', fb: 'Exploiting a weak BATNA wins once and loses the relationship.' },
        { t: 'Emphasise the unique value you provide: guaranteed delivery within the month.', correct: true, fb: 'Use insight strategically: if their BATNA is weak, emphasise the unique value you provide.' },
        { t: 'Tell them you know they\'re desperate.', fb: 'Revealing what you know this way creates resentment and defensiveness.' },
      ],
    },
  ],
}

// Lesson 3, step 4: reading the other side's BATNA.
export const readTheirBatna = {
  id: 'a-read-their-batna',
  kind: 'classify',
  title: 'What does it say about their BATNA?',
  prompt: 'Eight things the other side says or does. Does each one suggest their alternatives are strong or weak?',
  buckets: [
    { id: 'weak', label: 'Suggests a weak BATNA', hint: 'They need this deal', color: 'var(--b-aggressive)' },
    { id: 'strong', label: 'Suggests a strong BATNA', hint: 'They have good options', color: 'var(--b-assertive)' },
  ],
  cols: 2,
  items: [
    { id: 'r1', text: '"We need this signed before our board meets on Friday."', answer: 'weak', why: 'Urgency and an external deadline: pressure on their side.' },
    { id: 'r2', text: 'A long pause, then: "Other vendors? Well… we\'re looking."', answer: 'weak', why: 'Hesitation about alternatives often signals that there aren\'t many.' },
    { id: 'r3', text: 'They mention that their current supplier is going out of business.', answer: 'weak', why: 'Their status quo is disappearing, so they need a new deal.' },
    { id: 'r4', text: 'They keep asking how quickly you could start.', answer: 'weak', why: 'Timing pressure is a clue to their fallback strength.' },
    { id: 'r5', text: '"We\'ve had three proposals already. We\'re in no rush."', answer: 'strong', why: 'Multiple concrete alternatives and no time pressure. Test it gently, but take it seriously.' },
    { id: 'r6', text: 'They recently announced a partnership with one of your competitors.', answer: 'strong', why: 'Public statements and recent deals reveal real alternatives.' },
    { id: 'r7', text: 'They calmly walk you through how they would do this in-house.', answer: 'strong', why: 'A credible internal solution is a real BATNA.' },
    { id: 'r8', text: 'They are relaxed about the timeline and happy to "revisit next quarter".', answer: 'strong', why: 'No deadline pressure: waiting costs them little.' },
  ],
}

// Lesson 4: types of leverage.
export const whichLeverage = {
  id: 'a-which-leverage',
  kind: 'classify',
  title: 'Positive, negative or normative?',
  prompt: 'Nine things a negotiator might say. Which type of leverage is each one using?',
  buckets: [
    { id: 'positive', label: 'Positive', hint: 'What they want', color: 'var(--b-assertive)' },
    { id: 'negative', label: 'Negative', hint: 'What they fear losing', color: 'var(--b-aggressive)' },
    { id: 'normative', label: 'Normative', hint: 'What they believe in', color: '#6b5bd2' },
  ],
  cols: 3,
  items: [
    { id: 'l1', text: '"If we move forward today, I can include three months of free onboarding support."', answer: 'positive', why: 'You offer something they want.' },
    { id: 'l4', text: '"Delaying past Q2 means missing the seasonal demand spike."', answer: 'negative', why: 'It highlights what inaction will cost them.' },
    { id: 'l7', text: '"Earlier, you said innovation was a top priority. How does delaying fit with that?"', answer: 'normative', why: 'It holds them to their own stated values.' },
    { id: 'l2', text: '"Our distribution network can put your product in front of 5,000 new customers."', answer: 'positive', why: 'A benefit only you can provide.' },
    { id: 'l5', text: '"If the pilot doesn\'t happen this month, pricing reverts to list next quarter."', answer: 'negative', why: 'A loss they want to avoid.' },
    { id: 'l8', text: '"Industry best practice shows most leaders in your space have already made this shift."', answer: 'normative', why: 'An appeal to standards and norms.' },
    { id: 'l3', text: '"This partnership would give your team first-mover advantage in your region."', answer: 'positive', why: 'A gain they get if they agree.' },
    { id: 'l6', text: '"Other vendors are submitting proposals, so if timing matters, we need clarity soon."', answer: 'negative', why: 'Market competition and time pressure.' },
    { id: 'l9', text: '"You mentioned wanting to give your team better tools. Doesn\'t this fulfil that promise?"', answer: 'normative', why: 'Consistency with their own commitment.' },
  ],
}

// Lesson 5: the five-step execution framework, as a role-play.
export const salaryRoleplay = {
  id: 'a-roleplay-offer',
  kind: 'branching',
  title: 'Role-play: negotiating the offer',
  intro: 'You have been offered a role at a growing tech company. The offer is €64,000. You prepared: your ideal is €75,000, your walk-away point is €68,000, and working from home two days a week is a must-have. Your BATNA is moderate: promising interviews elsewhere, but no written offer yet. Today you meet Lena, the hiring manager. Watch the two meters.',
  img: 'img/m5/batna.webp',
  counterpart: { name: 'Lena', initials: 'LE', role: 'Hiring manager' },
  meterLabels: ['Progress toward a good deal', 'Relationship'],
  start: { outcome: 20, relationship: 40 },
  nodes: {
    start: {
      say: 'Thanks for coming in. We\'re really excited about you. So, what did you think of the offer?',
      choices: [
        { t: '"Honestly, €64,000 is too low. I have other offers."', tag: 'Bluff', d: [-5, -15], next: 'bluff', fb: 'You have no written offer, so this is a bluff, and you lead with it before any rapport.' },
        { t: '"Thank you, I\'m excited too. Could we agree how to use the time? I\'d like to understand the role\'s priorities first, then talk about the package."', tag: 'Set the stage', d: [15, 15], next: 'explore', fb: 'Step 2: you open with a clear agenda and a cooperative tone.' },
        { t: '"It\'s great, I accept!"', tag: 'Unprepared', d: [-15, 5], next: 'endAccept', fb: 'You abandon your preparation: the offer is below your walk-away point.' },
      ],
    },
    bluff: {
      say: 'Other offers? Which companies? We\'d need to see them to consider matching.',
      choices: [
        { t: '"I can\'t share that. Match it or I walk."', tag: 'Ultimatum', d: [-15, -20], next: 'endBreak', fb: 'An ultimatum built on a bluff. If she calls it, you have nothing.' },
        { t: '"To be accurate, I\'m in final rounds elsewhere, no written offer yet. I\'d rather understand what matters to you, and find a package that works."', tag: 'Recover', d: [10, 10], next: 'explore', fb: 'Honesty restores credibility. Signal market interest without bluffing, as the module advises for a moderate BATNA.' },
      ],
    },
    explore: {
      say: 'Of course. The team is growing fast, and we need someone who can lead the new client projects within six months. Budget is tight this year, though: salaries are set by band.',
      choices: [
        { t: '"Every company says budget is tight."', tag: 'Dismissive', d: [-10, -15], next: 'cold', fb: 'You dismiss her constraint instead of exploring it.' },
        { t: '"That helps. What does the band look like for this level, and how is someone moved up within it?"', tag: 'Explore interests', d: [15, 10], next: 'band', fb: 'Step 3: open questions uncover priorities, pressures and timing.' },
      ],
    },
    cold: {
      say: 'Well, in our case it\'s true.',
      choices: [
        { t: '"I\'m sorry, that came out wrong. Help me understand how the bands work."', tag: 'Recover', d: [10, 10], next: 'band', fb: 'You repair the relationship and return to exploring.' },
        { t: '"Then I\'ll need €75,000, or this won\'t work."', tag: 'Ultimatum', d: [-10, -15], next: 'endBreak', fb: 'An ultimatum with a moderate BATNA is a gamble you are likely to lose.' },
      ],
    },
    band: {
      say: 'The band for this level is €62,000 to €72,000. Moving up depends on taking on leadership responsibilities.',
      choices: [
        { t: '"Then I want the top of the band, €72,000. Final answer."', tag: 'Positional', d: [0, -10], next: 'counter', fb: 'Within the band, but stated as a demand, not linked to her interests.' },
        { t: '"So it sounds like the priority is someone who can lead client projects quickly, within a fixed band. I\'ve led three similar projects. Given that, I\'d propose €71,000, with two home-working days a week."', tag: 'Shape and trade', d: [20, 5], next: 'counter', fb: 'Step 4: you summarise her interests, then present an offer linked to them, inside her own standard (the band).' },
      ],
    },
    counter: {
      say: 'Two home days is fine. €71,000 is above what I can approve today. I could do €68,000.',
      choices: [
        { t: '"Let\'s split the difference at €69,500."', tag: 'Compromise', d: [5, 0], next: 'endSplit', fb: 'Quick, but it ignores the trade that would have served you both better.' },
        { t: '"I appreciate that. If I take on the client-lead role from month three, could we agree a review to €72,000 at six months, in writing?"', tag: 'Shape and trade', d: [20, 10], next: 'review', fb: '"If we do X, could you do Y?" You trade something she values (early leadership) for something you value.' },
        { t: '"€68,000 is my walk-away point, so fine."', tag: 'Reveals limit', d: [0, 0], next: 'endSplit', fb: 'Never reveal your walk-away point as if it were your goal.' },
      ],
    },
    review: {
      say: 'I like that: it\'s tied to exactly what we need. I can get a six-month review approved. Shall we leave it there?',
      choices: [
        { t: '"Let me summarise: €68,000 now, two home days a week, client-lead role from month three, and a written review to €72,000 at six months. Could you send that in writing by Thursday? I\'m really looking forward to this."', tag: 'Close and confirm', d: [20, 15], next: 'endStrong', fb: 'Step 5: summarise, confirm next steps and timing, and end on respect.' },
        { t: '"Great, see you soon!"', tag: 'Loose close', d: [0, 5], next: 'endLoose', fb: 'Without a summary and written confirmation, details can get lost.' },
      ],
    },
    endStrong: { end: true, verdict: 'Prepared, and it paid off', say: 'Absolutely. You\'ll have it on Thursday. Welcome aboard.', summary: 'You never went below your walk-away point, protected your must-have, used her own standard (the salary band) and traded early leadership for a written review. That is the five-step framework at work: plan the path, set the stage, explore interests, shape and trade, close and confirm.' },
    endLoose: { end: true, verdict: 'Good deal, loose ending', say: 'See you soon!', summary: 'The terms are good, but nothing is confirmed in writing. Step 5 matters: summarise, confirm responsibilities and timing, and get it written down.' },
    endSplit: { end: true, verdict: 'Acceptable, but value left on the table', say: 'Fine, let\'s do that.', summary: 'You reached your walk-away point or a bit above, but missed the trade that served both sides better: early leadership in exchange for a written review.' },
    endAccept: { end: true, verdict: 'Below your walk-away point', say: 'Wonderful! I\'ll send the contract.', summary: 'You accepted €64,000, below the €68,000 walk-away point you prepared, and never raised your must-have. Preparation only helps if you use it.' },
    endBreak: { end: true, verdict: 'The bluff was called', say: 'I\'m afraid we can\'t go further. Good luck with the other offers.', summary: 'An ultimatum built on a moderate BATNA backfired. Signal market interest without bluffing, and reference your BATNA only after rapport, as confidence, not a threat.' },
  },
}
