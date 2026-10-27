// Interactive activities for Module 1. All built from the module's own concepts.

export const behaviourOrStrategy = {
  id: 'a-behaviour-strategy',
  kind: 'classify',
  title: 'Behaviour or strategy?',
  prompt: 'Drag each card to the dimension it belongs to. On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'behaviour', label: 'Behaviour', hint: 'How you show up and communicate', color: 'var(--orange)' },
    { id: 'strategy', label: 'Strategy', hint: 'The approach you use to reach the outcome', color: 'var(--navy-2)' },
  ],
  items: [
    { id: 'i1', text: 'Speaking calmly and confidently', answer: 'behaviour', why: 'Tone and confidence are about how you express yourself.' },
    { id: 'i2', text: 'Deciding to look for a win-win solution', answer: 'strategy', why: 'Choosing to collaborate is a game plan, not a tone of voice.' },
    { id: 'i3', text: 'Raising your voice and interrupting', answer: 'behaviour', why: 'This is an aggressive communication pattern.' },
    { id: 'i4', text: 'Offering a later delivery date in exchange for a lower price', answer: 'strategy', why: 'Trading one issue against another is a method for reaching an agreement.' },
    { id: 'i5', text: 'Using guilt and flattery to get your way', answer: 'behaviour', why: 'Emotional manipulation is a way of communicating (manipulative behaviour).' },
    { id: 'i6', text: 'Postponing the talk until you have more data', answer: 'strategy', why: 'Deliberately deferring is the avoiding strategy.' },
    { id: 'i7', text: 'Holding firm on price because the deal is one-off', answer: 'strategy', why: 'Prioritizing the outcome over the relationship is the competing strategy.' },
    { id: 'i8', text: 'Hesitating and not stating what you need', answer: 'behaviour', why: 'Hesitancy and self-silencing are passive behaviour.' },
  ],
}

export const nameThatBehaviour = {
  id: 'a-name-behaviour',
  kind: 'classify',
  title: 'Name that behaviour',
  prompt: 'Eight new statements from different negotiations. Sort each one into the behaviour it shows.',
  buckets: [
    { id: 'aggressive', label: 'Aggressive', color: 'var(--b-aggressive)' },
    { id: 'passive', label: 'Passive', color: 'var(--b-passive)' },
    { id: 'manipulative', label: 'Manipulative', color: 'var(--b-manipulative)' },
    { id: 'assertive', label: 'Assertive', color: 'var(--b-assertive)' },
  ],
  items: [
    { id: 'n1', text: '"I\'m not signing anything until you drop the price by 30%. Take it or leave it."', answer: 'aggressive', why: 'A demanding stance and an ultimatum.' },
    { id: 'n2', text: '"Whatever you think is best is fine with me. I don\'t want to cause trouble."', answer: 'passive', why: 'Submits and avoids stating any need.' },
    { id: 'n3', text: '"No, it\'s fine that I\'m covering the weekend again. Someone has to be the reliable one."', answer: 'manipulative', why: 'Says "fine" while using guilt to make a point indirectly.' },
    { id: 'n4', text: '"I can commit to Friday if we move the review to Monday. Would that work for you?"', answer: 'assertive', why: 'States a clear position and invites the other side in.' },
    { id: 'n5', text: '"Are you seriously wasting my time with this offer?"', answer: 'aggressive', why: 'Hostile and belittling.' },
    { id: 'n6', text: '"Um, maybe we could… no, forget it. It\'s not important."', answer: 'passive', why: 'Starts to raise a need, then withdraws it.' },
    { id: 'n7', text: '"I\'d love to help, really, but after what happened last time, I\'m sure you understand why I can\'t."', answer: 'manipulative', why: 'Avoids the real issue and leans on guilt rather than stating it.' },
    { id: 'n8', text: '"I hear that budget is tight. For me, the training budget matters most. Can we explore that?"', answer: 'assertive', why: 'Respects their constraint and clearly names their own priority.' },
  ],
}

export const adaptationDrill = {
  id: 'a-adapt',
  kind: 'scenarios',
  title: 'Adaptation drill: same anchor, different tone',
  prompt: 'You are leading a project review. Each counterpart reacts differently. Pick the response that best adapts your assertiveness.',
  items: [
    {
      who: 'Dana, Finance', type: 'Aggressive', scene: '"This budget is a joke. Cut it by half or don\'t bother coming back."',
      options: [
        { t: '"Fine, if that\'s what you want, I\'ll cut it."', fb: 'Yielding to force teaches Dana that pressure works.' },
        { t: '"I can see this matters a lot to you. Let me walk you through the three biggest costs, then we can look at what could move."', correct: true, fb: 'Calm assertiveness: acknowledge the energy, hold your ground, and steer to evaluating options.' },
        { t: '"Maybe if Finance did its job, we wouldn\'t be here."', fb: 'Matching aggression escalates. The meeting becomes a fight about respect.' },
      ],
    },
    {
      who: 'Sam, Engineering', type: 'Passive', scene: '"It\'s fine. Whatever the team decides is okay with me."',
      options: [
        { t: '"Great, then we\'ll go with the original plan."', fb: 'You lose Sam\'s input, and their concerns may surface later as missed deadlines.' },
        { t: '"Your view matters here. Which part of the plan worries you most?"', correct: true, fb: 'Supportive assertiveness: create safety and invite a specific answer.' },
        { t: '"Come on, Sam, you must have an opinion. Speak up."', fb: 'Pressure on a passive counterpart usually makes them withdraw further.' },
      ],
    },
    {
      who: 'Lee, Sales', type: 'Manipulative', scene: '"I thought we were a team. I guess I\'ll just tell my clients that Product doesn\'t care about them."',
      options: [
        { t: '"Of course we care! Okay, we\'ll add your feature."', fb: 'Guilt worked, so expect it again next time.' },
        { t: '"We do care about your clients. That\'s why I want to decide this on the data, not on pressure. Can you share the client numbers?"', correct: true, fb: 'Transparent assertiveness: name your commitment, decline the guilt frame, return to facts.' },
        { t: '"Tell them whatever you want."', fb: 'Dismissive. It ends the tactic but damages the relationship.' },
      ],
    },
    {
      who: 'Priya, Customer Success', type: 'Highly emotional', scene: '"This is ridiculous! Nobody ever listens to my team!"',
      options: [
        { t: '"Let\'s keep emotions out of this, please."', fb: 'Telling someone to calm down usually has the opposite effect.' },
        { t: '"It sounds like your team feels ignored, and that\'s frustrating. Let\'s take a minute, then go through what needs to change."', correct: true, fb: 'Grounded, empathetic assertiveness: label the emotion, then steer back to the issue.' },
        { t: '"Okay, okay, we\'ll do whatever your team needs."', fb: 'Calms the moment but trades away the decision to emotion.' },
      ],
    },
    {
      who: 'Chris, Design', type: 'Passive-aggressive', scene: '"Oh sure, I\'ll just redo the whole thing again, since nothing I do is ever good enough."',
      options: [
        { t: 'Ignore the sarcasm and move to the next agenda item.', fb: 'The resentment stays under the surface and shows up later.' },
        { t: '"It sounds like you\'re frustrated with the feedback. Let\'s talk directly about what isn\'t working so we can fix it together."', correct: true, fb: 'Clear, firm assertiveness: bring the indirect message into the open.' },
        { t: '"Well, if it were done right the first time…"', fb: 'Answers sarcasm with sarcasm and escalates.' },
      ],
    },
    {
      who: 'Jordan, Partner company', type: 'Assertive', scene: '"We should move the launch up a week to stay competitive."',
      options: [
        { t: '"That\'s a fair point. On our side we\'d need to shift resources. Let\'s look at what\'s realistic together."', correct: true, fb: 'Match assertiveness with assertiveness: respectful, clear and collaborative.' },
        { t: '"No. We agreed on a date and we\'re sticking to it."', fb: 'Overly rigid. Jordan raised a reasonable point respectfully.' },
        { t: '"Sure, whatever you think."', fb: 'Too passive. You agree to a change without checking whether you can deliver it.' },
      ],
    },
  ],
}

export const adaptationCards = [
  { front: 'Assertive', sub: 'Clear, respectful, confident, open-minded', you: 'Assertive', why: 'Matches tone, builds mutual respect, enables constructive collaboration or compromise.', them: '"I think we should move the deadline up by a week to stay competitive."', say: '"That\'s a fair point. From my side, we\'d need to adjust resources to make that work. Let\'s look at what\'s realistic together."' },
  { front: 'Aggressive', sub: 'Dominating, forceful, interrupting, possibly disrespectful', you: 'Calm assertiveness', why: 'Maintains boundaries without escalation; shows strength without aggression.', them: '"You\'re clearly not listening! My way is the only one that makes sense."', say: '"I can see you\'re passionate about this. I\'d like to share my perspective fully, then we can evaluate both options."' },
  { front: 'Passive', sub: 'Avoids conflict, hesitant, doesn\'t speak up', you: 'Supportive assertiveness', why: 'Encourages expression, creates psychological safety, gently draws out their needs.', them: '"It\'s fine, whatever you all decide."', say: '"I value your perspective. Your input helps us make a better call. What concerns do you have about the options?"' },
  { front: 'Manipulative', sub: 'Uses guilt, hidden agendas, flattery, or emotional tactics', you: 'Transparent assertiveness', why: 'Neutralizes tactics through clarity, truth, and focus on facts.', them: '"I thought you cared about the team. I can\'t believe you\'d say no to this."', say: '"I do care about the team. That\'s why I want to make sure our decision is based on facts and fairness, not pressure."' },
  { front: 'Highly emotional', sub: 'Reactive, defensive, emotionally charged', you: 'Grounded, empathetic assertiveness', why: 'Validates emotions while keeping focus on issues; helps de-escalate.', them: '"This is ridiculous! No one ever listens to me!"', say: '"I hear that you\'re feeling ignored, and that sounds frustrating. Let\'s take a minute, then talk through what needs to change so you\'re heard."' },
  { front: 'Passive-aggressive', sub: 'Indirect resistance, sarcasm, avoidance, subtle blaming', you: 'Clear, firm assertiveness', why: 'Addresses issues openly; refuses to play along with indirect tactics.', them: '"Oh sure, I\'ll just redo the whole thing again, since nothing I do is good enough."', say: '"It sounds like you\'re frustrated about the feedback. Let\'s talk directly about what\'s not working so we can fix it together."' },
]

export const sortTheStrategy = {
  id: 'a-sort-strategy',
  kind: 'classify',
  title: 'Sort the strategy',
  prompt: 'Ten things people say at the table. Match each one to the strategy behind it.',
  buckets: [
    { id: 'competing', label: 'Competing', color: 'var(--s-competing)' },
    { id: 'collaborating', label: 'Collaborating', color: 'var(--s-collaborating)' },
    { id: 'compromising', label: 'Compromising', color: 'var(--s-compromising)' },
    { id: 'avoiding', label: 'Avoiding', color: 'var(--s-avoiding)' },
    { id: 'accommodating', label: 'Accommodating', color: 'var(--s-accommodating)' },
  ],
  cols: 3,
  items: [
    { id: 's1', text: '"Our terms are the same for every client. We won\'t go below this price."', answer: 'competing', why: 'Firm, outcome-first, no concession offered.' },
    { id: 's2', text: '"Let\'s list what matters most to each of us and design the deal around both lists."', answer: 'collaborating', why: 'Explores both sides\' interests to create joint value.' },
    { id: 's3', text: '"You take Monday, I\'ll take Friday. Deal?"', answer: 'compromising', why: 'Meets in the middle so both give a little.' },
    { id: 's4', text: '"Let\'s park this until after the audit."', answer: 'avoiding', why: 'Defers the issue to a later time.' },
    { id: 's5', text: '"No problem, take the slot. Your deadline matters more than mine this week."', answer: 'accommodating', why: 'Yields to protect goodwill on a minor issue.' },
    { id: 's6', text: '"This is our final offer. If it doesn\'t work, we\'ll find another supplier."', answer: 'competing', why: 'Uses an alternative as leverage to hold the outcome.' },
    { id: 's7', text: '"What if we combine your timeline with my budget plan?"', answer: 'collaborating', why: 'Integrates both proposals instead of choosing one.' },
    { id: 's8', text: '"If we each give 5%, can we sign today?"', answer: 'compromising', why: 'Equal concessions in exchange for speed.' },
    { id: 's9', text: '"I\'d rather not get into that right now."', answer: 'avoiding', why: 'Sidesteps the conflict.' },
    { id: 's10', text: '"Happy to go with your version. It\'s not a big deal for me."', answer: 'accommodating', why: 'Low personal stake, so you give way.' },
  ],
}

export const pickTheStrategy = {
  id: 'a-pick-strategy',
  kind: 'scenarios',
  title: 'Pick the strategy',
  prompt: 'Read each situation and choose the strategy that fits best. Think about outcome, relationship and context.',
  items: [
    {
      who: 'Supplier contract', scene: 'Your company\'s only certified supplier wants to renegotiate a 3-year contract. Both sides depend on each other, and there is a month before renewal.',
      options: [
        { t: 'Competing', fb: 'Hard bargaining risks the relationship with a partner you depend on for years.' },
        { t: 'Collaborating', correct: true, fb: 'High stakes on both sides, a long relationship and time to talk: the classic case for collaborating.' },
        { t: 'Avoiding', fb: 'Postponing a renewal you depend on creates a bigger problem later.' },
      ],
    },
    {
      who: 'Used car', scene: 'You\'re buying a used car from a private seller you will never meet again. The price matters a lot to you.',
      options: [
        { t: 'Competing', correct: true, fb: 'High stakes for you, no ongoing relationship: competing fits, delivered assertively rather than aggressively.' },
        { t: 'Accommodating', fb: 'Giving way on a high-stakes issue with no relationship to protect costs you money for nothing.' },
        { t: 'Collaborating', fb: 'Possible, but deep joint problem-solving is usually more than a one-off transaction needs.' },
      ],
    },
    {
      who: 'Desk swap', scene: 'A colleague you rely on asks to swap desks so they can sit near their team. You don\'t mind where you sit.',
      options: [
        { t: 'Compromising', fb: 'There is nothing to split. You don\'t need anything in return.' },
        { t: 'Accommodating', correct: true, fb: 'Low stake for you, valuable relationship: yielding builds goodwill at almost no cost.' },
        { t: 'Competing', fb: 'Fighting over something you don\'t care about damages a relationship for no gain.' },
      ],
    },
    {
      who: 'Heated meeting', scene: 'Ten minutes into a budget meeting, two managers are shouting. Nobody has the latest figures yet.',
      options: [
        { t: 'Avoiding', correct: true, fb: 'Emotions are high and data is missing. A deliberate pause ("let\'s regroup tomorrow with the numbers") is the wise move.' },
        { t: 'Competing', fb: 'Pushing for a decision now adds fuel to the fire.' },
        { t: 'Compromising', fb: 'Splitting the difference without data may lock in a bad decision.' },
      ],
    },
    {
      who: 'Shared budget', scene: 'Two team leads must split a training budget by end of day. Both needs are reasonable, and they have equal say.',
      options: [
        { t: 'Compromising', correct: true, fb: 'Limited time, equal power, moderate stakes: meeting in the middle is quick and fair.' },
        { t: 'Avoiding', fb: 'The deadline is today, so postponing just moves the problem.' },
        { t: 'Accommodating', fb: 'Giving it all away ignores a reasonable need of your own team.' },
      ],
    },
  ],
}

export const salaryRolePlay = {
  id: 'a-roleplay-salary',
  kind: 'branching',
  title: 'Role-play: your salary review',
  intro: 'You are Riley. You led the product launch, mentored two new hires and helped cut development time by 20%. Market data says people in your role earn 8–12% more than you. Your manager, Alex, is about to make an offer. Watch the two meters: the outcome you secure and the relationship you keep.',
  img: 'img/m1/sit-assertive.webp',
  counterpart: { name: 'Alex', initials: 'AL', role: 'Your manager' },
  start: { outcome: 30, relationship: 60 },
  nodes: {
    start: {
      say: 'Riley, your performance this year has been excellent. Your leadership on the launch really stood out. Based on our standard adjustment, we\'re offering a 5% raise.',
      choices: [
        { t: '"That\'s not acceptable. I need 15% or I\'m looking elsewhere."', tag: 'Aggressive', d: [5, -25], next: 'defensive', fb: 'You named a number, but as a threat. Alex now has to defend the company instead of considering your case.' },
        { t: '"Oh, okay. Thank you, that\'s fine."', tag: 'Passive', d: [-15, 5], next: 'endPassive', fb: 'Polite, but you accepted before sharing any of your evidence.' },
        { t: '"5% is totally fine… I mean, I did get a much higher offer elsewhere, but loyalty matters more to me."', tag: 'Manipulative', d: [5, -15], next: 'suspicious', fb: 'You signalled leverage indirectly. Alex is now unsure what you really want.' },
        { t: '"Thank you, I appreciate that. I\'d like to discuss it further. Given my added responsibilities and market data, I believe 10% reflects my contribution."', tag: 'Assertive', d: [15, 5], next: 'curious', fb: 'Appreciation first, then a clear and reasoned request. This keeps the door open.' },
      ],
    },
    curious: {
      say: 'I understand where you\'re coming from. 10% is above our usual range. Can you help me understand how you arrived at that number?',
      choices: [
        { t: '"Sure. I took on project management, mentored two new hires and helped cut development time by 20%. Benchmarks for my role are 8–12% above my salary."', tag: 'Assertive', d: [15, 10], next: 'open', fb: 'Specific contributions plus market data give Alex something to take to HR.' },
        { t: '"It\'s just what I feel I\'m worth."', tag: 'Passive', d: [-5, 0], next: 'unconvinced', fb: 'A feeling is hard for Alex to defend. Your evidence is strong, so use it.' },
        { t: '"Other companies pay way more. If you can\'t match it, I\'ll leave."', tag: 'Aggressive', d: [0, -15], next: 'defensive', fb: 'The threat undoes the good start.' },
      ],
    },
    unconvinced: {
      say: 'I want to help, but I need more than a feeling to take to HR. What would help me make the case?',
      choices: [
        { t: '"Fair. Here\'s what I delivered: the launch, two mentees, a 20% cut in development time. Market benchmarks are 8–12% higher."', tag: 'Assertive', d: [15, 10], next: 'open', fb: 'Good recovery. Alex now has evidence to work with.' },
        { t: '"Never mind. 5% is fine."', tag: 'Passive', d: [-10, 0], next: 'endPassive', fb: 'You withdrew just as Alex invited you to make your case.' },
      ],
    },
    defensive: {
      say: 'Riley, I hear you, but threatening to walk away isn\'t the best way to approach this. I can\'t promise anything with that tone.',
      choices: [
        { t: '"You\'re right, that came out too strongly. Let me explain how I got to my number."', tag: 'Assertive', d: [5, 20], next: 'curious', fb: 'Owning the tone and returning to the substance repairs the relationship.' },
        { t: '"Then I suggest you move quickly. I won\'t wait around."', tag: 'Aggressive', d: [-10, -20], next: 'endBreakdown', fb: 'Escalation. The conversation is now about power, not pay.' },
      ],
    },
    suspicious: {
      say: 'You received an outside offer? I… I may need to revisit this with HR.',
      choices: [
        { t: '"Yes, I did, and I\'d rather be direct. I want to stay, and I\'d like my pay to reflect my contribution. Here\'s my reasoning…"', tag: 'Assertive', d: [10, 15], next: 'open', fb: 'Switching to transparency rebuilds trust and turns the offer into honest context.' },
        { t: '"No rush. I trust you\'ll do what\'s best for the people who quietly go the extra mile."', tag: 'Manipulative', d: [5, -15], next: 'endManipulative', fb: 'Guilt as a closing move. You might get something, at the cost of trust.' },
      ],
    },
    open: {
      say: 'That\'s a strong case. I\'ll need to discuss it with HR, but I can advocate for a higher adjustment. If we can\'t meet 10% right away, would other forms of compensation interest you?',
      choices: [
        { t: '"I\'d consider it, depending on what\'s offered. But my priority is a salary that reflects my contributions. Can we follow up after you speak with HR?"', tag: 'Assertive', d: [10, 10], next: 'endAssertive', fb: 'Open to options while keeping your priority clear, with a concrete next step.' },
        { t: '"Sure, whatever works for you."', tag: 'Passive', d: [-15, 0], next: 'endSoft', fb: 'You gave away your priority at the last step.' },
        { t: '"No. It\'s 10% or nothing."', tag: 'Aggressive', d: [0, -20], next: 'endHard', fb: 'Rigid. You turned an advocate back into an opponent.' },
      ],
    },
    endAssertive: { end: true, verdict: 'Strong, balanced result', say: 'That\'s fair. I\'ll get back to you by next week. Thanks for raising it professionally.', summary: 'You stated your needs clearly, backed them with evidence, and stayed open to options. Alex became your advocate. This mirrors the assertive example in the module.' },
    endPassive: { end: true, verdict: 'Pleasant, but you left value on the table', say: 'Alright. Let\'s check in again at your next review.', summary: 'The relationship is intact, but you accepted 5% without sharing your evidence. Passive behaviour preserves peace at the cost of your outcome.' },
    endSoft: { end: true, verdict: 'Good case, weak close', say: 'Great, I\'ll see what HR can offer.', summary: 'You built a strong case, then let go of your main priority. Assertive negotiators stay open to options without dropping what matters most.' },
    endHard: { end: true, verdict: 'Deal at risk', say: 'Then I can\'t promise anything. I\'ll pass it on.', summary: 'Your case was strong, but the ultimatum at the end made Alex defensive. Adjust tone, not values.' },
    endBreakdown: { end: true, verdict: 'Breakdown', say: 'I\'ll bring your concerns to HR, but I can\'t make promises.', summary: 'Aggression turned a pay discussion into a power struggle. This is the risk the module warns about: concessions at best, a broken relationship at worst.' },
    endManipulative: { end: true, verdict: 'Uncertain result, eroded trust', say: 'I see… I\'ll look into it.', summary: 'You might get a raise, but Alex now wonders what else you aren\'t saying. Manipulative behaviour creates short-term advantage and long-term distrust.' },
  },
}

export const moscowSort = {
  id: 'a-moscow',
  kind: 'classify',
  open: true,
  title: 'Prioritize a job offer (MoSCoW)',
  prompt: 'You have a job offer and one conversation to negotiate it. Sort the issues into Must, Should, Could and Won\'t. There is no single right answer; afterwards, compare with a common way to rank them.',
  buckets: [
    { id: 'must', label: 'Must', hint: 'Deal-breakers', color: '#e0a400' },
    { id: 'should', label: 'Should', hint: 'Important, worth real effort', color: 'var(--orange)' },
    { id: 'could', label: 'Could', hint: 'Nice to have', color: 'var(--s-avoiding)' },
    { id: 'wont', label: 'Won\'t', hint: 'Not worth negotiating now', color: 'var(--b-aggressive)' },
  ],
  items: [
    { id: 'm1', text: 'Base salary', answer: 'must', why: 'It compounds every year and anchors future raises.' },
    { id: 'm2', text: 'Remote days per week', answer: 'should', why: 'Often high value to you and low cost to the employer.' },
    { id: 'm3', text: 'Start date', answer: 'should', why: 'Matters if you need notice time; usually easy to agree.' },
    { id: 'm4', text: 'Signing bonus', answer: 'could', why: 'A useful trade if base salary is capped.' },
    { id: 'm5', text: 'Training budget', answer: 'could', why: 'Valuable, and easy for employers to say yes to.' },
    { id: 'm6', text: 'Job title', answer: 'should', why: 'Affects your next move, depending on the industry.' },
    { id: 'm7', text: 'Choice of laptop', answer: 'wont', why: 'Low impact. Spending capital here costs goodwill.' },
    { id: 'm8', text: 'Reserved parking spot', answer: 'wont', why: 'Rarely worth raising in the main conversation.' },
  ],
}
