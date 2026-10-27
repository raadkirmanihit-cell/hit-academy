// Interactive activities for Module 4. Built from the module's own concepts and examples.

export const softHardPrincipled = {
  id: 'a-soft-hard-principled',
  kind: 'classify',
  title: 'Soft, hard or principled?',
  prompt: 'Nine things a negotiator might do. Sort each one into the approach it belongs to. On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'soft', label: 'Soft', hint: 'The goal is agreement', color: 'var(--s-accommodating)' },
    { id: 'hard', label: 'Hard', hint: 'The goal is victory', color: 'var(--b-aggressive)' },
    { id: 'principled', label: 'Principled', hint: 'A wise outcome, efficiently', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 's1', text: 'Drops the price as soon as the client looks unhappy', answer: 'soft', why: 'Makes concessions to cultivate the relationship, and yields to pressure.' },
    { id: 's2', text: '"Take it or leave it. That\'s our final offer."', answer: 'hard', why: 'Applies pressure and tries to win a contest of will.' },
    { id: 's3', text: '"Let\'s look at what similar contracts paid last year."', answer: 'principled', why: 'Looks for a result based on standards independent of will.' },
    { id: 's4', text: 'Reveals their absolute walk-away price at the start', answer: 'soft', why: 'Discloses the bottom line, the soft approach.' },
    { id: 's5', text: 'Misleads the other side about how much they can pay', answer: 'hard', why: 'Misleads as to the bottom line, the hard approach.' },
    { id: 's6', text: '"Before we decide, let\'s put a few different options on the table."', answer: 'principled', why: 'Develops multiple options to choose from; decides later.' },
    { id: 's7', text: 'Trusts everything the other side says without checking', answer: 'soft', why: 'Soft bargainers trust others; principled negotiators proceed independent of trust.' },
    { id: 's8', text: 'Treats the other side as an opponent to be beaten', answer: 'hard', why: 'Participants are adversaries; the goal is victory.' },
    { id: 's9', text: '"I understand your pressure. Help me understand what\'s driving the deadline."', answer: 'principled', why: 'Soft on the people, hard on the problem, and exploring interests.' },
  ],
}

export const peopleProblem = {
  id: 'a-people-problem',
  kind: 'scenarios',
  title: 'Soft on the people, hard on the problem',
  prompt: 'Five tense moments. Each time, choose the response that separates the people from the problem.',
  items: [
    {
      who: 'Consider perception', scene: 'A partner has missed two deadlines. Before the meeting, a colleague says: "They obviously don\'t care about this project."',
      options: [
        { t: 'Agree, and go in ready to call out their lack of commitment.', fb: 'You are deducing their intentions through your fears. If you are wrong, you will damage the relationship for nothing.' },
        { t: '"Maybe. Let\'s first find out what has been happening on their side."', fb: 'Put yourself in their shoes before you decide what their behaviour means.', correct: true },
        { t: 'Cancel the meeting and escalate to their manager.', fb: 'You treat the people as the problem before you understand the problem.' },
      ],
    },
    {
      who: 'Acknowledge emotion', scene: 'The other side\'s project lead bursts out: "We\'ve bent over backwards for you, and this is how you repay us?"',
      options: [
        { t: '"That\'s not fair, and you know it."', fb: 'Reacting to an outburst escalates it. The problem gets lost in the fight.' },
        { t: 'Let them finish. Then: "It sounds like your team feels taken for granted. Tell me more."', fb: 'Allow them to let off steam, do not react, and recognise the emotion.', correct: true },
        { t: '"Let\'s keep emotions out of this, please."', fb: 'Asking someone to stop feeling usually makes the feeling louder.' },
      ],
    },
    {
      who: 'Speak about yourself', scene: 'You need to raise a quality problem with a supplier\'s last delivery.',
      options: [
        { t: '"Your team was careless with the last shipment."', fb: 'Speaking about them invites defence, not solutions.' },
        { t: '"I\'m worried about the last shipment. Twelve units failed our checks, and I need to understand how we fix that."', fb: 'Speak about yourself and your concern, not about them, and speak for a purpose.', correct: true },
        { t: 'Say nothing this time and hope the next delivery is better.', fb: 'Being soft on the problem lets it continue.' },
      ],
    },
    {
      who: 'Don\'t blame', scene: 'A client\'s late approvals have delayed your project. They now ask why you are behind schedule.',
      options: [
        { t: '"We\'re behind because you took three weeks to approve the designs."', fb: 'It may be true, but blame turns a scheduling problem into a personal one.' },
        { t: '"The approvals took longer than we planned for, so let\'s look at how we speed that step up together."', fb: 'You describe the problem neutrally and invite them to solve it with you.', correct: true },
        { t: '"We\'re working on it. It will be fine."', fb: 'You avoid blame, but also avoid the problem.' },
      ],
    },
    {
      who: 'Speak for a purpose', scene: 'The discussion has drifted into a long complaint about last year\'s contract.',
      options: [
        { t: 'Point out every inaccuracy in their account of last year.', fb: 'Winning the history debate does not solve this year\'s problem.' },
        { t: 'Let them talk until the meeting runs out of time.', fb: 'Listening matters, but without purpose the meeting ends with nothing solved.' },
        { t: '"That history matters, and I hear it. What would make this year\'s agreement work better for you?"', fb: 'Acknowledge, then redirect the focus back to the issue.', correct: true },
      ],
    },
  ],
}

export const positionOrInterest = {
  id: 'a-position-interest',
  kind: 'classify',
  title: 'Position or interest?',
  prompt: 'Eight statements. Is each one a position (what someone demands) or an interest (why they want it)?',
  buckets: [
    { id: 'position', label: 'Position', hint: 'What they demand', color: 'var(--b-aggressive)' },
    { id: 'interest', label: 'Interest', hint: 'Why they want it', color: 'var(--b-assertive)' },
  ],
  items: [
    { id: 'p1', text: '"I want a 15% raise."', answer: 'position', why: 'A specific demand. The interest might be recognition, security or keeping up with living costs.' },
    { id: 'p2', text: '"Our budget is limited this quarter."', answer: 'interest', why: 'The reason behind a request for a discount.' },
    { id: 'p3', text: '"I refuse to sell for less than $1,000."', answer: 'position', why: 'A firm stance on price.' },
    { id: 'p4', text: '"I need to show my board we\'re reducing risk."', answer: 'interest', why: 'A need for security and recognition that could be met in several ways.' },
    { id: 'p5', text: '"It has to be delivered by Friday."', answer: 'position', why: 'A deadline demand. Ask what makes Friday important.' },
    { id: 'p6', text: '"I want my team to feel their work is valued."', answer: 'interest', why: 'Recognition and belonging, underneath many possible demands.' },
    { id: 'p7', text: '"We need exclusivity in the region."', answer: 'position', why: 'A specific term. The interest may be protecting their investment from competitors.' },
    { id: 'p8', text: '"I can\'t risk another project going over budget."', answer: 'interest', why: 'Security and economic well-being: the motivation behind tighter terms.' },
  ],
}

export const interestCards = [
  { front: '"I want a 15% raise."', sub: 'An employee to their manager', layer: 'Recognition, economic well-being', say: 'A sense that their contribution is valued, and a salary that keeps up with their responsibilities.', why: 'Ask: "What would make you feel your contribution is properly recognised?" Options appear: a title, a bonus, a development budget, a review in six months.' },
  { front: '"We need a 20% discount."', sub: 'A buyer to a supplier', layer: 'Economic well-being, security', say: 'Their budget is limited this quarter, and they need to stay within it.', why: 'Ask: "What does your budget look like over the next year?" Options: phased delivery, deferred payment, a smaller first order.' },
  { front: '"I need this delivered by the end of the week."', sub: 'A client to a project team', layer: 'Security, recognition', say: 'They have promised a launch date to their own leadership and cannot afford to look unreliable.', why: 'Ask: "What happens on your side at the end of the week?" Perhaps a partial delivery or a preview is enough.' },
  { front: '"We want final sign-off on every change."', sub: 'A partner in a joint project', layer: 'Control / autonomy', say: 'They were caught out by an unapproved change last time and want influence over the outcome.', why: 'Ask: "What kind of changes worry you most?" Options: sign-off only on major changes, a weekly review, a shared change log.' },
  { front: '"Your team should come to our office for every meeting."', sub: 'A large client', layer: 'Recognition, belonging', say: 'They want to feel like a priority client and to build a real working relationship.', why: 'Ask: "What would make the partnership feel closer?" Options: quarterly on-site visits, a named contact, joint planning days.' },
  { front: '"We split everything 50/50, or there\'s no deal."', sub: 'A co-founder', layer: 'Fairness', say: 'They want an arrangement that feels just, and a process they can trust.', why: 'Ask: "What would make the split feel fair to you?" Then agree on criteria: contribution, risk taken, time invested.' },
]

export const whichNeed = {
  id: 'a-which-need',
  kind: 'classify',
  title: 'Which need is speaking?',
  prompt: 'Six things people say at the table. Match each one to the basic human need most likely behind it.',
  buckets: [
    { id: 'security', label: 'Security', hint: 'Safe, free from risk', color: 'var(--navy-2)' },
    { id: 'economic', label: 'Economic well-being', hint: 'Financial stability', color: 'var(--orange)' },
    { id: 'belonging', label: 'Belonging', hint: 'Accepted, part of a group', color: 'var(--b-assertive)' },
    { id: 'recognition', label: 'Recognition', hint: 'Respect and status', color: '#6b5bd2' },
    { id: 'control', label: 'Control / autonomy', hint: 'Influence over choices', color: 'var(--s-accommodating)' },
    { id: 'fairness', label: 'Fairness', hint: 'Just process and outcome', color: 'var(--b-aggressive)' },
  ],
  cols: 3,
  items: [
    { id: 'n1', text: '"What guarantees do we have if your system goes down?"', answer: 'security', why: 'A concern about risk and reliability.' },
    { id: 'n2', text: '"We need better payment terms to keep our cash flow healthy."', answer: 'economic', why: 'Financial stability and resources.' },
    { id: 'n3', text: '"I want our team to be seen as a real partner, not just a vendor."', answer: 'belonging', why: 'Acceptance and a shared purpose.' },
    { id: 'n4', text: '"My name should be on the final report."', answer: 'recognition', why: 'Visibility, reputation and professional respect.' },
    { id: 'n5', text: '"We need the final say on which features go live."', answer: 'control', why: 'Decision-making power and freedom of choice.' },
    { id: 'n6', text: '"Why does the other region get a better rate than us?"', answer: 'fairness', why: 'A sense that the deal is not balanced.' },
  ],
}

export const pressureOrPrinciple = {
  id: 'a-pressure-principle',
  kind: 'scenarios',
  title: 'Pressure or principle?',
  prompt: 'Five moments of pressure. Each time, choose the response that yields only to principle.',
  items: [
    {
      who: 'The ultimatum', scene: 'A buyer says: "Cut your price by 25% by tomorrow, or we go to your competitor."',
      options: [
        { t: '"Okay, we can do 25%."', fb: 'Yielding to pressure. You have also taught them that threats work.' },
        { t: '"Then go to our competitor."', fb: 'Answering pressure with pressure turns it into a contest of will.' },
        { t: '"I want a price that\'s fair to both of us. Let\'s look at current market rates for this scope and see where we stand."', fb: 'You redirect the conversation from pressure to an objective standard.', correct: true },
      ],
    },
    {
      who: 'The appeal to the relationship', scene: 'A long-standing client says: "After ten years together, you can surely just waive the price increase."',
      options: [
        { t: '"You\'re right. For you, we\'ll waive it."', fb: 'A soft concession to cultivate the relationship. It may feel good now and hurt later.' },
        { t: '"I value our ten years together. Let\'s look at what\'s driving the increase, our costs and the industry index, and find what\'s fair."', fb: 'Soft on the people, hard on the problem, and anchored in objective criteria.', correct: true },
        { t: '"Business is business. The increase stands."', fb: 'Hard on the people. You may keep the price and lose the client.' },
      ],
    },
    {
      who: 'The better standard', scene: 'You proposed using last year\'s price plus inflation. The other side shows you a published industry benchmark that is more current and slightly lower.',
      options: [
        { t: 'Reject it. You proposed your standard first.', fb: 'Never yielding to pressure does not mean never yielding. A better standard is a principle.' },
        { t: '"That\'s a fair point. How do you see this benchmark applying to our scope?"', fb: 'Reason openly and stay flexible when a better standard emerges.', correct: true },
        { t: 'Accept it without looking at whether it covers the same scope.', fb: 'Being open to reasons still means checking that the standard fits.' },
      ],
    },
    {
      who: 'The time pressure', scene: 'Late in the day, the other side says: "We need an answer in the next ten minutes or the deal\'s off."',
      options: [
        { t: '"I want to get this right for both of us. Let\'s agree on the criteria we\'ll use, and I\'ll confirm against them by tomorrow morning."', fb: 'Calm and composed: you redirect pressure towards the agreed criteria and a fair procedure.', correct: true },
        { t: 'Agree to everything to avoid losing the deal.', fb: 'An artificial deadline is a form of pressure. Yielding to it rarely produces a wise agreement.' },
        { t: '"That\'s a ridiculous way to negotiate."', fb: 'Attacking the tactic personally escalates instead of redirecting.' },
      ],
    },
    {
      who: 'The emotional appeal', scene: 'A colleague says: "If you don\'t give my team the bigger budget, I\'ll take it as a personal insult."',
      options: [
        { t: 'Give them the budget to avoid conflict.', fb: 'You yield to emotional pressure, and other teams will notice.' },
        { t: '"I don\'t want this to feel personal. Can we agree on how we decide budgets, say by project size and expected impact, and apply it to every team?"', fb: 'You acknowledge the emotion and move to a fair, transparent procedure applied consistently.', correct: true },
        { t: '"Then take it personally."', fb: 'Hard on the people, and the problem remains.' },
      ],
    },
  ],
}

export const stalledRenewal = {
  id: 'a-roleplay-stalled',
  kind: 'branching',
  title: 'Role-play: break the stalemate',
  intro: 'You buy logistics services for a manufacturing company. Marco, your long-standing supplier, has announced a 12% price increase at renewal. Your boss has told you: "No increase, full stop." The last meeting ended in deadlock. Today you try again, using the four stages. Watch the two meters.',
  img: 'img/m4/positional.webp',
  counterpart: { name: 'Marco', initials: 'MA', role: 'Supplier, account director' },
  meterLabels: ['Progress toward a wise agreement', 'Relationship'],
  start: { outcome: 15, relationship: 35 },
  nodes: {
    start: {
      say: 'I\'ll be honest, I nearly didn\'t come. Twelve percent is what we need. If your company can\'t accept that, maybe we\'re not the right partner.',
      choices: [
        { t: '"And our position is zero percent. So where does that leave us?"', tag: 'Positional', d: [-5, -15], next: 'deadlock', fb: 'Position against position: the same deadlock as last time.' },
        { t: '"I\'m glad you came. Last meeting got tense, and I think we both dug in. I\'d like to understand what\'s behind the 12%."', tag: 'Principled', d: [15, 20], next: 'people', fb: 'Stage 1: you acknowledge the emotion, separate the people from the problem and turn towards interests.' },
        { t: '"Fine, we can probably accept 10%."', tag: 'Soft', d: [5, -5], next: 'soft', fb: 'A concession with no understanding of the reason, and against your boss\'s instructions.' },
      ],
    },
    deadlock: {
      say: 'It leaves us nowhere. Again.',
      choices: [
        { t: '"You\'re right, and that\'s on both of us. Can we start over? What\'s driving the 12% on your side?"', tag: 'Principled', d: [15, 15], next: 'people', fb: 'You recover by shifting from positions to interests.' },
        { t: '"Then I guess we\'ll have to go to tender."', tag: 'Hard', d: [-10, -20], next: 'endBreak', fb: 'A threat ends the conversation, and a ten-year relationship with it.' },
      ],
    },
    soft: {
      say: 'Ten? I\'d need to check. But honestly, even twelve is tight for us.',
      choices: [
        { t: '"Let\'s step back. Before we talk numbers, help me understand what\'s happening on your side."', tag: 'Principled', d: [10, 10], next: 'people', fb: 'Good recovery: from haggling over numbers to exploring interests.' },
        { t: '"Okay, twelve it is."', tag: 'Soft', d: [-5, 0], next: 'endSoft', fb: 'You yielded to pressure, and you now have a difficult conversation with your boss.' },
      ],
    },
    people: {
      say: 'Fuel and driver wages are up. And frankly, your volumes dropped 20% last year, so our trucks run half-empty on your routes. We\'re losing money on them.',
      choices: [
        { t: '"So it\'s not only rising costs. The half-empty trucks on our routes are what really hurts."', tag: 'Principled', d: [15, 10], next: 'interests', fb: 'Stage 2: you isolate his interests (economic well-being, predictability) from his position (12%).' },
        { t: '"Our volumes are our business. That\'s not a reason to charge us more."', tag: 'Hard', d: [-10, -15], next: 'deadlock', fb: 'You dismiss his interest as illegitimate, so he will defend the position harder.' },
      ],
    },
    interests: {
      say: 'Exactly. If I could fill those trucks, I wouldn\'t need anything like 12%. What\'s your side of it?',
      choices: [
        { t: '"My boss needs to show cost control this year, and we need reliability during our peak season. A big increase is very hard for me to take back to him."', tag: 'Principled', d: [15, 10], next: 'options', fb: 'You bring your own interests to life and present the problem before any proposal.' },
        { t: '"My side is that we\'re not paying more. Full stop."', tag: 'Positional', d: [-10, -10], next: 'deadlock', fb: 'You repeated a position just as he asked for your interests.' },
      ],
    },
    options: {
      say: 'Okay. So what do we do?',
      choices: [
        { t: '"Let\'s brainstorm for ten minutes, no judging yet: longer contract, guaranteed minimum volumes, consolidated deliveries, shared fuel index…"', tag: 'Principled', d: [20, 10], next: 'criteria', fb: 'Stage 3: you separate inventing from judging and broaden the options on the table.' },
        { t: '"Let\'s split the difference: 6%."', tag: 'Positional', d: [5, 0], next: 'endSplit', fb: 'A quick compromise. It ends the deadlock but ignores the half-empty trucks, the real problem.' },
      ],
    },
    criteria: {
      say: 'I like the minimum-volume idea. If you consolidate deliveries to three days a week and guarantee volumes, I could do it for… let\'s say 5%. But I\'m guessing at the fuel part.',
      choices: [
        { t: '"Instead of guessing, could we tie the fuel part to the published national diesel index, adjusted every quarter, both ways?"', tag: 'Principled', d: [20, 10], next: 'pressure', fb: 'Stage 4: a fair, external standard replaces guesswork, and it protects both sides.' },
        { t: '"Five percent is still too much. Make it two."', tag: 'Positional', d: [-5, -5], next: 'endSplit', fb: 'Back to haggling. You had an objective standard within reach.' },
      ],
    },
    pressure: {
      say: 'The index works for me. But my CEO will want a decision today, or he\'ll push for the full 12% again.',
      choices: [
        { t: '"I understand the pressure. Let\'s write down what we\'ve agreed in principle: three delivery days, a volume floor, a 2% base increase and the diesel index. I\'ll confirm with my boss tomorrow."', tag: 'Principled', d: [20, 10], next: 'endStrong', fb: 'You do not yield to pressure, only to principle, and you still give him something solid to take back.' },
        { t: '"Fine, I\'ll sign whatever you need today."', tag: 'Soft', d: [-10, 0], next: 'endSoft', fb: 'Yielding to pressure at the last step undoes careful work.' },
      ],
    },
    endStrong: { end: true, verdict: 'Stalemate broken', say: 'That I can sell to my CEO. Send it over and we\'ll formalise it this week.', summary: 'You used all four stages: you separated the people from the problem, uncovered his real interest (half-empty trucks) and yours (cost control and reliability), generated several options before judging them, and replaced guesswork with an objective fuel index. The result is better for both sides than 0% or 12%.' },
    endSplit: { end: true, verdict: 'A compromise, not a solution', say: 'Fine. Six percent. Let\'s just get it done.', summary: 'Splitting the difference ended the deadlock, but neither side\'s real problem was solved. The trucks are still half-empty, and next year\'s renewal will be just as hard. Explore interests and options before you compromise.' },
    endSoft: { end: true, verdict: 'You yielded to pressure', say: 'Great, thanks. I\'ll send the paperwork.', summary: 'Marco got his number, but you gave it away without understanding why he needed it, or exploring what else could have worked. Yield to principle, not pressure.' },
    endBreak: { end: true, verdict: 'Relationship broken', say: 'Then go to tender. We\'re done here.', summary: 'Threats turned a negotiation into a contest of will. Positional bargaining, repeated, damaged a ten-year relationship. Separating the people from the problem would have kept the door open.' },
  },
}
