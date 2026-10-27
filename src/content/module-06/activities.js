// Interactive activities for Module 6. Built from the module's own concepts and examples.

// Lesson 2: loss aversion. Turn a gain frame into a loss frame.
export const reframeCards = [
  { front: '"This course will boost your career."', sub: 'Selling a training course', layer: 'Opportunity cost', say: '"If you don\'t take this course now, you may have to wait six more months for the next intake."', why: 'The same course, but now the cost of waiting is visible.' },
  { front: '"Upgrading will increase your revenue."', sub: 'Proposing a software upgrade', layer: 'Opportunity cost', say: '"Every month you delay upgrading, you\'re missing out on potential revenue."', why: 'A future gain becomes a present, ongoing loss.' },
  { front: '"This bulb uses only 30% of the energy of a regular one."', sub: 'Describing a product', layer: 'Reframing value', say: '"This bulb uses 70% less energy."', why: 'Same fact. The saving (the loss avoided) now leads.' },
  { front: '"We still have places in the programme."', sub: 'Inviting a client to a programme', layer: 'Scarcity', say: '"We only have three spots left in this program."', why: 'Limited availability, stated honestly, makes the place feel like something to lose.' },
  { front: '"You can accept this quote whenever you like."', sub: 'Sending a quote', layer: 'Time-based urgency', say: '"We can only honor this quote until the end of the week."', why: 'A real time window turns "later" into a possible loss.' },
]

// Lesson 2: the four loss-aversion strategies.
export const lossStrategies = {
  id: 'a-loss-strategies',
  kind: 'classify',
  title: 'Which loss-aversion strategy?',
  prompt: 'Eight things a negotiator might say. Which of the four strategies is each one using? On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'reframe', label: 'Reframing value', hint: 'Same fact, stronger frame', color: '#3d6fd8' },
    { id: 'cost', label: 'Opportunity cost', hint: 'What inaction loses', color: 'var(--orange)' },
    { id: 'scarcity', label: 'Scarcity', hint: 'Limited or exclusive', color: '#6b5bd2' },
    { id: 'urgency', label: 'Time-based urgency', hint: 'A limited time window', color: 'var(--b-aggressive)' },
  ],
  cols: 2,
  items: [
    { id: 'l1', text: '"This yogurt is 90% fat-free."', answer: 'reframe', why: 'The same fact as "10% fat", framed around what is absent.' },
    { id: 'l2', text: '"Every week without the new system costs your team about 12 hours."', answer: 'cost', why: 'It puts a number on the loss from waiting.' },
    { id: 'l3', text: '"This version is exclusive to early members. Once it\'s gone, it won\'t be offered again."', answer: 'scarcity', why: 'Exclusive access that will not come back.' },
    { id: 'l4', text: '"This offer expires in 24 hours."', answer: 'urgency', why: 'A limited time window for accepting.' },
    { id: 'l5', text: '"With this plan, you lose 70% less to downtime."', answer: 'reframe', why: 'The benefit is framed as a loss avoided.' },
    { id: 'l6', text: '"Only two consultants with this expertise are free this quarter."', answer: 'scarcity', why: 'Limited availability.' },
    { id: 'l7', text: '"If we start next quarter instead, you miss the whole holiday season."', answer: 'cost', why: 'The opportunity lost by inaction.' },
    { id: 'l8', text: '"The early-booking price applies until Friday at noon."', answer: 'urgency', why: 'A clear deadline for a better price.' },
  ],
}

// Lesson 3: anchoring in practice.
export const anchorScenarios = {
  id: 'a-anchor-scen',
  kind: 'scenarios',
  title: 'Set the anchor, or reset it',
  prompt: 'Four moments in a negotiation. Choose the move that uses anchoring best.',
  items: [
    {
      who: 'Selling your services',
      scene: 'A new client asks for your day rate. You know the market well: experienced consultants charge €1,100 to €1,400 a day. Your target is €1,250.',
      options: [
        { t: '"What budget did you have in mind?"', fb: 'You hand them the anchor. Their number will now shape the whole negotiation.' },
        { t: '"For a project like this, rates in the market run from €1,100 to €1,400 a day. Mine is €1,380, based on the scope you described."', correct: true, fb: 'You set the first number, start high so any reduction feels like a concession, and support it with data.' },
        { t: '"Around a thousand, but I\'m flexible."', fb: 'A low, vague anchor, and "flexible" invites them to push it lower.' },
      ],
    },
    {
      who: 'Making it credible',
      scene: 'You are buying a used delivery van. Similar vans sell for €18,000 to €21,000. You want to open low but stay credible.',
      options: [
        { t: '"I\'ll give you €10,000."', fb: 'So far below the market that it looks uninformed, and may end the conversation.' },
        { t: '"Would you take less?"', fb: 'No anchor at all: you let the asking price stay the reference point.' },
        { t: '"Given the mileage and the two new tyres it needs, I can offer €16,350."', correct: true, fb: 'Low but justified, and the precise number suggests careful calculation.' },
      ],
    },
    {
      who: 'Round or precise?',
      scene: 'You are proposing a fee for a three-month project. You have calculated your costs carefully.',
      options: [
        { t: '"€47,850, based on 290 hours across the three phases."', correct: true, fb: 'Precise numbers create a sense of careful analysis, so they are harder to dismiss.' },
        { t: '"About €50,000."', fb: 'A round number sounds like an estimate, and invites a round counteroffer.' },
        { t: '"Somewhere between €40,000 and €50,000."', fb: 'A wide range with a low end invites them to pick the lowest number.' },
      ],
    },
    {
      who: 'They anchored first',
      scene: 'You are negotiating your salary. Before you can speak, the employer says: "We were thinking €72,000." You know the role pays €82,000 to €90,000 in this market.',
      options: [
        { t: '"Could you stretch to €75,000?"', fb: 'You adjust from their anchor, so it keeps working against you.' },
        { t: 'Say nothing and accept that the first offer is usually final.', fb: 'Rarely true. An unanswered anchor becomes the frame for the whole deal.' },
        { t: '"Based on market research and my experience, professionals in this role typically earn between €82,000 and €90,000. I\'d like to position myself within that range."', correct: true, fb: 'You counter-anchor quickly, with data, and move the reference point to the market.' },
      ],
    },
  ],
}

// Lesson 4: the four fairness moves.
export const fairnessMoves = {
  id: 'a-fairness-moves',
  kind: 'classify',
  title: 'Which fairness move?',
  prompt: 'Eight sentences. Which of the four fairness moves is each one?',
  buckets: [
    { id: 'baseline', label: 'Establish the baseline', hint: 'Justify with market norms', color: '#3d6fd8' },
    { id: 'address', label: 'Address unfairness', hint: 'Challenge without confronting', color: 'var(--b-aggressive)' },
    { id: 'secure', label: 'Secure fair agreement', hint: 'An adjustment for commitment', color: 'var(--b-assertive)' },
    { id: 'identity', label: 'Invoke fairness identity', hint: 'Name fairness as who they are', color: '#6b5bd2' },
  ],
  cols: 2,
  items: [
    { id: 'f6', text: '"I can see why you proposed this. It\'s quite different from what we agreed with your other suppliers, though. Can we look at that?"', answer: 'address', why: 'It acknowledges their proposal, then points to an inconsistency.' },
    { id: 'f1', text: '"I want to make sure this is fair for both of us. Based on market rates, this is a reasonable price."', answer: 'baseline', why: 'The offer is justified by market rates.' },
    { id: 'f8', text: '"You\'ve always been straight with us, and that\'s why I wanted to raise this with you directly."', answer: 'identity', why: 'It anchors their self-image to fair behaviour.' },
    { id: 'f3', text: '"If I lower the price, would you be willing to commit today?"', answer: 'secure', why: 'A small adjustment in exchange for a prompt agreement.' },
    { id: 'f2', text: '"That number seems a bit low compared to industry standards. What would feel fair to you?"', answer: 'address', why: 'It gently points out the gap with norms, and asks.' },
    { id: 'f5', text: '"Three similar projects this year were priced between €40,000 and €45,000. Ours is €42,500."', answer: 'baseline', why: 'Comparable deals set the fair baseline.' },
    { id: 'f4', text: '"I\'ve always seen you as someone who really values doing the right thing."', answer: 'identity', why: 'It names fairness as part of who they are, before the request.' },
    { id: 'f7', text: '"I can take 5% off if we sign the agreement this week."', answer: 'secure', why: 'Fairness on both sides: a concession for a commitment.' },
  ],
}

// Lesson 5: the illusion of choice.
export const choiceScenarios = {
  id: 'a-choice-scen',
  kind: 'scenarios',
  title: 'Offer a choice, not a yes or no',
  prompt: 'Four moments where a choice works better than a question. Choose the best move.',
  items: [
    {
      who: 'Closing a sale',
      scene: 'A client has agreed that your service fits their needs. You want to move to agreement.',
      options: [
        { t: '"So, do you want to buy?"', fb: 'A yes/no question makes "no" an easy answer.' },
        { t: '"Would you prefer to pay in installments or upfront?"', correct: true, fb: 'Both answers move the deal forward, and the client feels in control.' },
        { t: '"Let me know if you\'d like to go ahead at some point."', fb: 'No choice and no next step. The decision drifts.' },
      ],
    },
    {
      who: 'Scheduling the start',
      scene: 'Your team is ready to begin a project. The client keeps saying "soon".',
      options: [
        { t: '"Would you like to start this week or next?"', correct: true, fb: 'Two options, both of which lead to a start date.' },
        { t: '"Do you want to move forward?"', fb: 'An open yes/no invites more delay.' },
        { t: '"We need to start this week."', fb: 'A demand. People resist feeling forced into a decision.' },
      ],
    },
    {
      who: 'Designing options',
      scene: 'You offer coaching. You want most clients to choose a 5-session package.',
      options: [
        { t: 'Offer twelve packages, so everyone finds the perfect fit.', fb: 'Too many options overwhelm people and delay the decision.' },
        { t: 'Offer only the 5-session package.', fb: 'No choice at all, so the client may feel pushed into a yes or no.' },
        { t: 'Offer one session at a premium price, the 5-session package at a discounted rate, and an ongoing monthly retainer.', correct: true, fb: 'Three distinct options that all work for you, with the package structured to look the most attractive.' },
      ],
    },
    {
      who: 'Keeping it ethical',
      scene: 'A client asks which of your three plans you would recommend for a small team of four.',
      options: [
        { t: 'Recommend the most expensive plan, whatever they need.', fb: 'Choices must lead to good outcomes for both sides. Overselling damages trust.' },
        { t: 'Ask what they need, then recommend the plan that genuinely fits, and explain why.', correct: true, fb: 'The options are still yours to design, but the advice is honest. That is shaping perception with integrity.' },
        { t: 'Hide the cheapest plan so they don\'t see it.', fb: 'Hiding options is manipulation, and it backfires when discovered.' },
      ],
    },
  ],
}

// Lesson 6: calibrated questions.
export const calibratedOrNot = {
  id: 'a-calibrated',
  kind: 'classify',
  title: 'Calibrated or not?',
  prompt: 'Nine questions. Which ones are calibrated: open, starting with "What" or "How", and inviting problem-solving?',
  buckets: [
    { id: 'yes', label: 'Calibrated', hint: 'Open, "What" or "How"', color: 'var(--b-assertive)' },
    { id: 'no', label: 'Not calibrated', hint: '"Why", yes/no or leading', color: 'var(--b-aggressive)' },
  ],
  items: [
    { id: 'c1', text: '"What about this is important to you?"', answer: 'yes', why: 'Open, and it invites them to share their interests.' },
    { id: 'c3', text: '"How can we solve this problem?"', answer: 'yes', why: '"We" and "How" turn it into a shared problem.' },
    { id: 'c2', text: '"Why would you ask for that?"', answer: 'no', why: '"Why" sounds like an accusation and puts them on the defensive.' },
    { id: 'c5', text: '"How am I supposed to do that?"', answer: 'yes', why: 'A calm way of saying "no" that asks them to solve your constraint.' },
    { id: 'c4', text: '"Don\'t you think this is fair?"', answer: 'no', why: 'A leading yes/no question. It pushes rather than invites.' },
    { id: 'c6', text: '"Can you lower the price?"', answer: 'no', why: 'A closed question: it gets a yes or a no, and little information.' },
    { id: 'c7', text: '"What are we trying to accomplish here?"', answer: 'yes', why: 'It brings both sides back to the shared objective.' },
    { id: 'c9', text: '"How would you like me to proceed?"', answer: 'yes', why: 'It gives them a sense of control and invites a next step.' },
    { id: 'c8', text: '"Why are you being so difficult?"', answer: 'no', why: 'Accusing and confrontational. It hardens resistance.' },
  ],
}

// Lesson 6: rewrite "why" and closed questions.
export const questionCards = [
  { front: '"Why did you reject our proposal?"', sub: 'After a client says no', layer: 'Replace "Why" with "What"', say: '"What about the proposal didn\'t work for you?"', why: 'Same information, without the accusation.' },
  { front: '"Can you do it by Friday?"', sub: 'Asking a supplier for speed', layer: 'Frame for problem-solving', say: '"What would it take to get this done by Friday?"', why: 'Instead of a yes or no, they start looking for a way.' },
  { front: '"Why is your price so high?"', sub: 'Questioning a quote', layer: 'Replace "Why" with "How"', say: '"How did you arrive at this price?"', why: 'Curious, not defensive: they explain instead of justify.' },
  { front: '"Is this your final offer?"', sub: 'Near the end of a negotiation', layer: 'Transform resistance', say: '"How can we make this better for both of us?"', why: 'It keeps the door open, and invites collaboration.' },
]

// Lesson 7: reciprocity.
export const reciprocityScenarios = {
  id: 'a-reciprocity',
  kind: 'scenarios',
  title: 'Give first, with integrity',
  prompt: 'Four moments where reciprocity can help. Choose the best move.',
  items: [
    {
      who: 'Before a first meeting',
      scene: 'You will meet a potential client next week. You know they are struggling to hire for a new team.',
      options: [
        { t: 'Send a generic company brochure.', fb: 'Not tailored, so it feels like marketing, not a favour.' },
        { t: 'Send them a short list of three hiring channels that worked for similar teams, with no request attached.', correct: true, fb: 'Offer first, ask later: personal, useful and genuine.' },
        { t: 'Promise them a discount if they sign at the meeting.', fb: 'That is a conditional offer, not a gift. It feels like a transaction.' },
      ],
    },
    {
      who: 'Size of the gesture',
      scene: 'You want to build goodwill with a supplier before asking for faster delivery.',
      options: [
        { t: 'Introduce them to a colleague in another department who needs their product.', correct: true, fb: 'A small, relevant favour can create a strong sense of mutual obligation.' },
        { t: 'Send an expensive gift before the meeting.', fb: 'Large gifts can feel like a bribe and raise suspicion.' },
        { t: 'Do nothing. Favours have no place in business.', fb: 'Reciprocity is one of the strongest social norms. Ignoring it wastes goodwill.' },
      ],
    },
    {
      who: 'When they thank you',
      scene: 'The supplier thanks you warmly for the introduction.',
      options: [
        { t: '"Good. Now you owe me one."', fb: 'Naming the debt bluntly turns goodwill into an obligation they may resent.' },
        { t: '"No problem." Then change the subject.', fb: 'Fine, but you miss the chance to reinforce the norm.' },
        { t: '"I was happy to help. I know you\'d do the same."', correct: true, fb: 'You subtly reinforce the social norm and keep the cycle of reciprocity going.' },
      ],
    },
    {
      who: 'Making the request',
      scene: 'A week later, you need the supplier to bring your delivery forward by five days.',
      options: [
        { t: '"After everything I did for you, you need to do this."', fb: 'Turning a favour into pressure feels manipulative and damages the relationship.' },
        { t: '"We\'ve got a tight launch date. How could we bring delivery forward by five days?"', correct: true, fb: 'A clear request with a calibrated question. The goodwill is already there; you don\'t need to mention it.' },
        { t: 'Don\'t ask. It might seem like you expected something in return.', fb: 'Giving first is what makes a request feel natural. Asking honestly is fine.' },
      ],
    },
  ],
}

// Lesson 7: role-play that combines the six principles.
export const renewalRoleplay = {
  id: 'a-roleplay-renewal',
  kind: 'branching',
  title: 'Role-play: the contract renewal',
  intro: 'You sell an online training platform. Priya, Head of HR at a client with 400 users, is up for renewal at €47,850 a year. Last week, you sent her a free usage report with tips to boost course completion. Your floor is €42,000, and the current price is genuinely locked only until 30 June, when list prices rise. Use the six principles, with integrity. Watch the two meters.',
  img: 'img/m6/handshake.webp',
  counterpart: { name: 'Priya', initials: 'PR', role: 'Head of HR' },
  meterLabels: ['Progress toward a good deal', 'Trust'],
  start: { outcome: 20, relationship: 45 },
  nodes: {
    start: {
      say: 'Thanks for the usage report, that was really helpful. But I\'ll be direct: budgets have been cut, and we need 20% off this year.',
      choices: [
        { t: '"20% is impossible. Our price is our price."', tag: 'Positional', d: [-5, -15], next: 'defensive', fb: 'A flat refusal. No questions, no fairness, no options.' },
        { t: '"I\'m glad the report helped. Before we talk numbers: what\'s driving the budget cut, and what does your team most need from the platform this year?"', tag: 'Calibrated question', d: [15, 15], next: 'explore', fb: 'You build on the goodwill from the report (reciprocity) and open with "What" questions that invite problem-solving.' },
        { t: '"Okay, I can do 20% if you sign today."', tag: 'Caves', d: [-20, 5], next: 'endCave', fb: 'You accept her anchor immediately. €38,280 is below your €42,000 floor.' },
      ],
    },
    defensive: {
      say: 'Then I\'ll have to take this to procurement and look at other vendors.',
      choices: [
        { t: '"Go ahead, but you\'ll lose all your course data."', tag: 'Threat', d: [-15, -25], next: 'endBreak', fb: 'Loss framing used as a threat. It destroys trust.' },
        { t: '"I understand. I want this to be fair to both of us. How can we make the renewal work within your new budget?"', tag: 'Recover', d: [10, 15], next: 'explore', fb: 'Fairness plus a calibrated question turns the conversation back to problem-solving.' },
      ],
    },
    explore: {
      say: 'Leadership wants every tool to prove its impact. Honestly, the onboarding courses get used the most; the leadership academy, less so.',
      choices: [
        { t: '"Based on the market and your usage, platforms of this size typically run between €52,000 and €56,000. Your renewal at €47,850 already sits below that, and your completion rates are up 18%."', tag: 'Anchor with data', d: [15, 5], next: 'anchor', fb: 'You re-anchor to the market, with precise, justified numbers, and link the price to the impact she must prove.' },
        { t: '"Shall we just meet in the middle at 10% off?"', tag: 'Splits', d: [0, 0], next: 'endSplit', fb: 'Quick, but it accepts her 20% as a valid reference point.' },
      ],
    },
    anchor: {
      say: 'Maybe. But €47,850 is still more than I have. My budget is €40,000.',
      choices: [
        { t: '"Fine, €40,000 for everything."', tag: 'Concedes', d: [-15, 0], next: 'endCave', fb: 'Below your floor, and the full platform for less: nothing traded in return.' },
        { t: '"That\'s unfair to us. You\'re being unreasonable."', tag: 'Accuses', d: [-10, -15], next: 'defensive', fb: 'Calling her unfair makes her defensive. Point to norms instead.' },
        { t: '"I want to be fair to both of us. If the price comes down, the scope needs to change too. Would you prefer the full platform at €47,850, or the onboarding courses only, at €39,900?"', tag: 'Fairness and choice', d: [20, 10], next: 'options', fb: 'You frame the trade-off as fairness, and offer two options that both work for you.' },
      ],
    },
    options: {
      say: 'Onboarding only is tempting, but the leadership academy matters for our new managers this year.',
      choices: [
        { t: '"Then here\'s an idea: keep the full platform at €47,850, and we\'ll add the manager toolkit at no cost. And so you can plan: today\'s price is locked until 30 June. After that it moves to the new list price of €52,400."', tag: 'Loss frame, honestly', d: [20, 10], next: 'close', fb: 'A small extra (reciprocity), and a real deadline that makes waiting a loss. The urgency is true, so it builds trust.' },
        { t: '"This offer expires in one hour."', tag: 'False urgency', d: [0, -25], next: 'endPressure', fb: 'An invented deadline. Loss aversion used without integrity.' },
      ],
    },
    close: {
      say: 'That works for me, if you can confirm the price lock and the toolkit in writing.',
      choices: [
        { t: '"Great, done!"', tag: 'Loose close', d: [0, 0], next: 'endLoose', fb: 'Agreed, but nothing confirmed in writing.' },
        { t: '"Of course, I\'ll send it today. And I was happy to put the report together. If the results hold, I\'d love to feature your team in a case study."', tag: 'Reinforce reciprocity', d: [15, 15], next: 'endStrong', fb: 'You confirm in writing and gently reinforce the cycle of reciprocity.' },
      ],
    },
    endStrong: { end: true, verdict: 'Perception shaped, with integrity', say: 'Deal. And yes, we\'d be happy to do the case study.', summary: 'You kept the full price, added a low-cost extra, and every principle was honest: a genuine favour, a justified anchor, a fair trade-off, a real choice, open questions and a true deadline.' },
    endLoose: { end: true, verdict: 'Good deal, loose ending', say: 'Great!', summary: 'The terms are strong, but without written confirmation the price lock and the toolkit can be misremembered. Close and confirm.' },
    endSplit: { end: true, verdict: 'Acceptable, but anchored low', say: '10% it is.', summary: '€43,065 is above your floor, but her 20% set the frame. Re-anchoring to the market and offering a choice would have served you better.' },
    endCave: { end: true, verdict: 'Below your floor', say: 'Great, I\'ll sign.', summary: 'You accepted a price below your €42,000 floor without trading anything. Her opening number anchored the whole deal.' },
    endBreak: { end: true, verdict: 'Trust broken', say: 'I think we\'re done here. I\'ll talk to procurement.', summary: 'A threat is not loss framing; it is pressure. Trust collapsed, and with it the renewal.' },
    endPressure: { end: true, verdict: 'The pressure backfired', say: 'An hour? Then the answer is no. I don\'t make decisions like that.', summary: 'Invented urgency feels manipulative and destroys credibility. Loss aversion works with integrity only when the loss is real.' },
  },
}
