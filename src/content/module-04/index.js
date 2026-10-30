// Module 4 content. Source: "Chapter 4: Break the Stalemate - From Positional Power to Principled Progress"
// by Raad Kirmani.
// Blocks of type 'research' (and items marked { added: true }) are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import { officeScene, printerScene } from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m4/${name}.webp`

const m4 = {
  id: 'm4',
  number: 4,
  title: 'Break the Stalemate',
  subtitle: 'From Positional Power to Principled Progress',
  cover: img('cover'),
  coverAlt: 'Two teams facing each other across a long meeting table',
  tags: ['Positions', 'Interests', 'Options'],
  duration: '80–95 min',
  author: 'Raad Kirmani',
  summary: `Move beyond rigid demands and positional bargaining by embracing collaborative dialogue. In this module you learn a four-stage framework that helps you avoid deadlocks, break through stalemates and guide conversations toward mutual solutions. By focusing on shared interests rather than fixed positions, you unlock opportunities for creative problem-solving and reach outcomes that are not only effective in the moment but sustainable over time.`,
  objectives: [
    'Explain the difference between positional and principled bargaining, and the outcomes each one tends to produce.',
    'Compare the soft, hard and principled approaches, and recognise each one at the table.',
    'Separate the people from the problem by considering perception, acknowledging emotion and communicating softly.',
    'Look past positions to the interests beneath them, using the six basic human needs and "how" and "what" questions.',
    'Generate multiple options by separating inventing from judging, broadening the options and searching for mutual gains.',
    'Use objective criteria and fair procedures to settle differences, and yield to principle, never to pressure.',
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · Positional vs principled bargaining',
      steps: [
        {
          id: 'l1-bargaining', title: 'Two ways to bargain',
          blocks: [
            { t: 'img', src: img('bazaar'), alt: 'Two traders bargaining in a busy, sunlit market hall', ratio: '16/9', caption: 'Bargaining is as old as the market. How you bargain decides whether you leave with a deal, a stalemate or a damaged relationship.' },
            { t: 'lead', text: `Every negotiation starts with what people say they want. The question is whether you bargain over those demands, or over the reasons behind them.` },
            { t: 'p', text: `There are **two broad ways to bargain**. In **positional bargaining**, each side takes a stance and defends it. In **principled bargaining**, both sides look beneath their stances for the interests that drive them, and solve the problem together. Toggle the diagram to see the difference.` },
            { t: 'diagram', name: 'DealZone', caption: 'Positional bargaining pulls two fixed demands against each other. Principled bargaining looks for the zone where both sides\' interests overlap.' },
          ],
        },
        {
          id: 'l1-positional', title: 'Understanding positional bargaining',
          blocks: [
            { t: 'person', img: img('positional'), ratio: '16/9', alt: 'Two colleagues pointing at each other across a desk in a heated argument', eyebrow: 'Positional bargaining', name: 'A contest of will', text: `Positional bargaining is a **competitive approach** where each party sticks to their pre-determined position, often neglecting the underlying interests and needs. This can lead to a rigid, "win-lose" dynamic, focused on getting the most for oneself.` },
            { t: 'p', text: `**Outcomes of positional bargaining:**` },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Outcome 1', title: 'Stalemates and unfair compromises', color: 'var(--b-aggressive)', text: `When parties focus solely on their own positions, compromise becomes challenging. This often results in **stalemates** with no agreement, or **unsatisfactory compromises** that leave both parties dissatisfied.` },
              { eyebrow: 'Outcome 2', title: 'Damage to relationships', color: 'var(--b-aggressive)', text: `Prolonged or repeated positional bargaining can **harm long-term relationships**, especially when each negotiation feels like a win-lose battle.` },
            ] },
            { t: 'p', text: `**What a position sounds like.** A position is a specific demand, stated as if there were only one acceptable answer:` },
            { t: 'cards', items: [
              { eyebrow: 'Example 1', title: '"I want a 15% raise."', color: 'var(--orange)', text: 'A position statement reflecting a specific demand.' },
              { eyebrow: 'Example 2', title: '"I refuse to sell for less than $1,000."', color: 'var(--orange)', text: 'A firm stance on pricing during negotiations.' },
              { eyebrow: 'Example 3', title: '"I need this delivered by the end of the week."', color: 'var(--orange)', text: 'A clear deadline request indicating urgency.' },
            ] },
            { t: 'research', added: true, title: 'Why positions trap you', cite: ['fisher2011'], text: `The more clearly you state a position and defend it, the more your reputation becomes tied to it. Giving ground then feels like losing face, so both sides dig in further. That is how a disagreement about terms becomes a contest of will.` },
          ],
        },
        {
          id: 'l1-principled', title: 'Understanding principled bargaining',
          blocks: [
            { t: 'person', img: img('principled'), ratio: '16/9', alt: 'Two professionals in calm conversation at a café table, with icons for ideas and agreement above them', eyebrow: 'Principled bargaining', name: 'Solving the problem together', text: `Principled bargaining, also known as **interest-based negotiation**, focuses on underlying interests and needs rather than rigid positions. Instead of fixating on a specific outcome, both parties work collaboratively to understand the motivations driving their demands.` },
            { t: 'p', text: `**The four elements of principled bargaining.** Each one becomes a stage of the framework you learn in this module.` },
            { t: 'cards', cols: 4, items: [
              { eyebrow: 'Stage 1', title: 'Separate people from the problem', color: 'var(--s-accommodating)', text: 'Distinguish interpersonal issues from the core problem. Prioritise respect, understanding emotions and acknowledging concerns, so ego, biases or emotions don\'t cloud the process.' },
              { eyebrow: 'Stage 2', title: 'Focus on interests, not positions', color: 'var(--orange)', text: 'Positions are surface-level demands that can lead to deadlock. Interests, the motivations behind them, reveal real needs and creative, flexible solutions.' },
              { eyebrow: 'Stage 3', title: 'Generate multiple options', color: '#6b5bd2', text: 'Brainstorm multiple solutions before deciding, beyond a zero-sum approach where one party wins at the other\'s expense. This encourages win-win outcomes.' },
              { eyebrow: 'Stage 4', title: 'Use objective criteria', color: 'var(--b-assertive)', text: 'Rely on fair, external standards such as market data, legal precedents or expert opinions, to avoid subjective or emotional influences.' },
            ] },
            { t: 'p', text: `**Position or interest?** The same demand can rest on a very different reason:` },
            { t: 'table', head: ['Situation', 'Position (what they ask for)', 'Interest (why they ask for it)'], rows: [
              ['A company asks for a discount', 'To save money', 'Their budget is limited this quarter'],
              ['A manager wants the project review moved to Monday', 'It suits their calendar', 'They present to the board on Tuesday and want the team\'s latest figures first'],
              ['A client insists on an earlier delivery date', 'They want it sooner', 'Their own product launch depends on it, and they need time to test before go-live'],
            ] },
            { t: 'callout', tone: 'tip', title: 'Notice what the interest unlocks', text: `"Save money" leaves only one lever: price. "Budget is limited this quarter" opens several: deferred payment, a smaller first order, a phased start. Interests give you more ways to say yes.` },
          ],
        },
        {
          id: 'l1-compare', title: 'Soft, hard and principled',
          blocks: [
            { t: 'p', text: `Positional bargaining comes in two flavours. **Soft** bargainers want agreement and avoid conflict. **Hard** bargainers want victory and see the other side as an adversary. **Principled** negotiation changes the game: it is soft on the people and hard on the problem.` },
            { t: 'table', plain: true, head: ['Soft', 'Hard', 'Principled'], rows: [
              ['Participants are friends.', 'Participants are adversaries.', 'Participants are problem-solvers.'],
              ['The goal is agreement.', 'The goal is victory.', 'The goal is a wise outcome reached efficiently and amicably.'],
              ['Make concessions to cultivate the relationship.', 'Demand concessions as a condition of the relationship.', '**Separate the people from the problem.**'],
              ['Be soft on the people and the problem.', 'Be hard on the problem and the people.', 'Be soft on the people, hard on the problem.'],
              ['Trust others.', 'Distrust others.', 'Proceed independent of trust.'],
              ['Change your position easily.', 'Dig in to your position.', '**Focus on interests, not positions.**'],
              ['Make offers.', 'Make threats.', 'Explore interests.'],
              ['Disclose your bottom line.', 'Mislead as to your bottom line.', 'Avoid having a bottom line.'],
              ['Accept one-sided losses to reach agreement.', 'Demand one-sided gains as the price of agreement.', '**Invent options for mutual gain.**'],
              ['Search for the single answer: the one *they* will accept.', 'Search for the single answer: the one *you* will accept.', 'Develop multiple options to choose from; decide later.'],
              ['Insist on agreement.', 'Insist on your position.', '**Insist on using objective criteria.**'],
              ['Try to avoid a contest of will.', 'Try to win a contest of will.', 'Try to reach a result based on standards independent of will.'],
              ['Yield to pressure.', 'Apply pressure.', 'Reason and be open to reasons; yield to principle, not pressure.'],
            ], caption: 'Adapted from Fisher, Ury & Patton (2011), Getting to Yes.' },
            { t: 'activity', ...act.softHardPrincipled },
            { t: 'research', added: true, title: 'The fixed pie: why we miss easy wins', text: `Positional bargaining feeds a bias that researchers call the **fixed-pie assumption**: the belief that whatever one side gains, the other must lose. A review of 32 studies, with more than 5,000 negotiators, found that when both sides actually wanted the same thing on an issue, negotiators failed to realise it **about half the time**. In around **one in five** cases they even settled on an outcome that was worse for both of them than another available option. Asking about interests is the cure: you cannot see a shared goal you never ask about.`, cite: ['thompson1996'] },
            { t: 'reflect', id: 'r-l1', prompt: `Think of a negotiation that stalled. Which approach were you using, soft, hard or principled? And the other side? Write one thing you could have done differently from the principled column.` },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · Stage 1: Separate people from the problem',
      steps: [
        {
          id: 'l2-why', title: 'Why separating people from the problem matters',
          blocks: [
            { t: 'person', img: img('people'), alt: 'Two colleagues sitting side by side, facing the same direction, looking thoughtful', eyebrow: 'Stage 1', name: 'Side by side, attacking the problem', text: `Every negotiator has two kinds of interest: in the **substance** and in the **relationship**. When the two get tangled, a disagreement about terms turns into a fight about people. Stage 1 untangles them.` },
            { t: 'cards', items: [
              { eyebrow: 'Why 1', title: 'Avoids unnecessary conflict', color: 'var(--s-accommodating)', text: 'Escalating interpersonal dynamics can create unnecessary conflict and defensiveness.' },
              { eyebrow: 'Why 2', title: 'Collaborate, not compete', color: 'var(--s-accommodating)', text: 'Viewing the other party as an adversary hinders collaboration.' },
              { eyebrow: 'Why 3', title: 'Redirects focus on solutions', color: 'var(--s-accommodating)', text: 'Shifting focus to problem-solving fosters a cooperative negotiation process.' },
            ] },
          ],
        },
        {
          id: 'l2-how', title: 'How it is done',
          blocks: [
            { t: 'steps', items: [
              { title: 'Consider perception', list: [
                '**Put yourself in their shoes.**',
                '**Don\'t deduce their intentions from your fears.** Assuming the worst turns a neutral act into a hostile one.',
                '**Don\'t blame them for your problem**, even when it is tempting. Blame makes people defend themselves instead of solving the problem.',
              ] },
              { title: 'Acknowledge emotion', list: [
                '**Recognise and understand emotions on both sides**, including your own.',
                '**Allow the other side to let off steam.** Let them finish, without interrupting.',
                '**Do not react to emotional outbursts.** A calm response stops the spiral.',
              ] },
              { title: 'Soft communication', list: [
                '**Listen with acknowledgement and speak to be understood.**',
                '**Speak about yourself, not about them:** "I feel let down" rather than "You broke your promise."',
                '**Speak for a purpose:** before you say something, know what you want it to achieve, and redirect the focus to the issue.',
              ] },
            ] },
            { t: 'table', head: ['Instead of (people + problem)', 'Try (soft on people, hard on problem)'], rows: [
              ['"You always deliver late."', '"The last three deliveries arrived after the deadline. Let\'s work out what\'s causing it."'],
              ['"You\'re trying to squeeze us."', '"I feel the price is above what we budgeted. Can you walk me through how you reached it?"'],
              ['"Calm down, you\'re overreacting."', '"I can see this has been really frustrating. Tell me what happened."'],
            ] },
            { t: 'callout', tone: 'tip', title: 'Connect it to Module 2', text: `Acknowledging emotion is where the de-escalation and strategic empathy you learned in Module 2 do their work. Label the emotion ("It sounds like this has been frustrating"), then bring the conversation back to the problem.` },
          ],
        },
        {
          id: 'l2-practice', title: 'Practice: soft on the people, hard on the problem',
          blocks: [
            { t: 'activity', ...act.peopleProblem },
            { t: 'research', added: true, title: 'Both sides think the other is more extreme than it is', text: `Psychologists call it **naive realism**: the belief that we see the world as it really is, so anyone who disagrees must be biased or unreasonable. In studies of people on opposing sides of heated disputes, both sides **overestimated how extreme the other side\'s views were**, and how far apart the two groups really stood. The real gap was much smaller than either side assumed. That is why "consider perception" comes first: before you argue about the problem, check whether you are arguing with the person in front of you, or with the one you imagined.`, cite: ['robinson1995'] },
            { t: 'reflect', id: 'r-l2', prompt: `Think of someone you find difficult to negotiate with. Write down one assumption you make about their intentions. Then write a question you could ask to test it, and one "I" statement you could use instead of a "you" statement.` },
          ],
        },
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: '3 · Stage 2: Focus on interests, not positions',
      steps: [
        {
          id: 'l3-needs', title: 'Six basic human needs',
          blocks: [
            { t: 'lead', text: `A position is what someone says they want. An interest is why they want it. And the most powerful interests are basic human needs.` },
            { t: 'p', text: `Understanding these **six fundamental human needs** will help you identify the interests beneath any position:` },
            { t: 'cards', imgRatio: '908/561', items: [
              { eyebrow: 'Need 1', title: 'Security', img: img('need-security'), color: 'var(--s-accommodating)', text: 'The need to feel safe and free from threats, risks or harm.', example: 'Physical safety, basic comfort, job security, contract reliability, risk management.' },
              { eyebrow: 'Need 2', title: 'Economic well-being', img: img('need-economic'), color: 'var(--b-assertive)', text: 'The need for financial stability and material resources.', example: 'Salary, profits, resources, favourable payment terms.' },
              { eyebrow: 'Need 3', title: 'Sense of belonging', img: img('need-belonging'), color: 'var(--orange)', text: 'The need to feel accepted and part of a group or community (affiliation).', example: 'Team acceptance, shared purpose, strong partnerships.' },
              { eyebrow: 'Need 4', title: 'Recognition', img: img('need-recognition'), color: '#6b5bd2', text: 'The need for respect, acknowledgement and validation (status and appreciation).', example: 'Reputation, visibility, professional respect.' },
              { eyebrow: 'Need 5', title: 'Control / autonomy', img: img('need-control'), color: 'var(--navy-2)', text: 'The need to feel a sense of control or influence over one\'s choices and outcomes.', example: 'Decision-making power, negotiation leverage, freedom of choice.' },
              { eyebrow: 'Need 6', title: 'Fairness', img: img('need-fairness'), color: 'var(--b-aggressive)', text: 'The need to feel that the process and outcome are just and equitable.', example: 'Balanced deals, transparent processes, win-win outcomes.' },
            ] },
            { t: 'activity', ...act.whichNeed },
          ],
        },
        {
          id: 'l3-why', title: 'Why interests matter',
          blocks: [
            { t: 'person', img: img('interests'), alt: 'A smiling professional listening to a colleague, with thought bubbles about teamwork and growth above them', eyebrow: 'Stage 2', name: 'Look behind the demand', text: `Positions are surface-level demands, like a salary increase or faster delivery, and they can lead to deadlock. Interests are the motivations underneath. For every interest there are usually **several possible positions** that could satisfy it.` },
            { t: 'cards', cols: 4, items: [
              { eyebrow: 'Why 1', title: 'Encourages flexibility', color: 'var(--orange)', text: 'Understanding interests lets negotiators move beyond rigid demands, fostering adaptability.' },
              { eyebrow: 'Why 2', title: 'Opens creative solutions', color: 'var(--orange)', text: 'Exploring interests broadens the scope for mutually beneficial outcomes, rather than limiting options to fixed positions.' },
              { eyebrow: 'Why 3', title: 'Enhances collaboration', color: 'var(--orange)', text: 'Addressing underlying needs builds trust and cooperation, improving the chance of satisfying both parties.' },
              { eyebrow: 'Why 4', title: 'Avoids deadlock', color: 'var(--orange)', text: 'Shifting from positions to interests stops negotiations from stalling over uncompromising demands.' },
            ] },
            { t: 'scene', ...officeScene },
          ],
        },
        {
          id: 'l3-how', title: 'How it is done',
          blocks: [
            { t: 'cols2', items: [
              { title: 'Step 1: Identify interests', list: [
                '**Try to isolate interests from positions.** Ask what the demand is for.',
                '**Ask "Why?" and "Why not?" to yourself**, then rephrase them as **"How?" and "What?"** questions when you ask the other side. "Why do you need it by Friday?" can sound like a challenge; "What happens on your side on Friday?" invites an answer.',
                '**Realise that each side has multiple interests**, and that people on the same side may not share them all.',
                '**The most powerful interests are basic human needs:** the six on the previous page.',
                '**Make a list** of each side\'s interests as they come up. It keeps them visible and helps you rank them.',
              ] },
              { title: 'Step 2: Talk about interests', list: [
                '**Bring your interests to life.** Be specific and vivid, so the other side understands why they matter to you.',
                '**Acknowledge their interests as part of the problem.** People listen better when they feel heard.',
                '**Present the problem before offering your proposal.** Give your reasons first, then your conclusion.',
                '**Be hard on the problem, soft on the people.** Commit firmly to your interests, and stay open on how to meet them.',
              ] },
            ] },
            { t: 'p', text: `**From position to interest.** Read each position, think about what might lie beneath it, then tap to see one possible interest and the question that would uncover it.` },
            { t: 'flipCards', items: act.interestCards, frontLabel: 'Position', backLabel: 'Interest', hint: 'Guess the interest, then tap →' },
            { t: 'research', added: true, title: 'Ask, and the hidden value appears', text: `In a series of negotiation experiments, Leigh Thompson found that negotiators who **asked the other party about their interests and priorities**, or who shared their own, came to understand the other side much more accurately, and reached **better agreements for both sides**. The catch: few negotiators asked on their own initiative. Most assumed they already knew what the other side wanted. The "How" and "What" questions in this lesson are the simple habit that closes that gap.`, cite: ['thompson1991'] },
          ],
        },
        {
          id: 'l3-practice', title: 'Practice: position or interest?',
          blocks: [
            { t: 'activity', ...act.positionOrInterest },
            { t: 'reflect', id: 'r-l3', prompt: `Pick a negotiation coming up soon. Write your own position, then the interests behind it. Do the same for the other side, guessing where you must. Which of the six basic needs is most at stake for each of you?` },
          ],
        },
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · Stage 3: Generate multiple options',
      steps: [
        {
          id: 'l4-why', title: 'Why options matter',
          blocks: [
            { t: 'person', img: img('options'), pos: 'center 70%', alt: 'A team brainstorming around a meeting table, surrounded by sketches of ideas', eyebrow: 'Stage 3', name: 'More options, fewer stalemates', text: `Most stalemates are not caused by a lack of goodwill. They are caused by a lack of options. When both sides argue over a single answer, someone has to lose. When there are several options on the table, both sides can find one that works.` },
            { t: 'cards', items: [
              { eyebrow: 'Why 1', title: 'Avoid reinforcing conflict', color: '#6b5bd2', text: 'Limiting options can escalate disagreements by emphasising rigid positions.' },
              { eyebrow: 'Why 2', title: 'Encourage alternative but mutually beneficial outcomes', color: '#6b5bd2', text: 'Exploring alternatives increases the chances of finding solutions that benefit both parties.' },
              { eyebrow: 'Why 3', title: 'Enable trade-offs', color: '#6b5bd2', text: 'Having multiple options allows for compromises that leave both parties satisfied.' },
            ] },
          ],
        },
        {
          id: 'l4-how', title: 'How it is done',
          blocks: [
            { t: 'p', text: `**Step 1: Separate the act of inventing options from judging them.** Judging ideas too early limits creativity and discourages open dialogue. Let ideas flow freely before subjecting them to evaluation.` },
            { t: 'cards', cols: 4, items: [
              { title: 'Use brainstorming sessions', color: '#6b5bd2', text: 'Set ground rules so participants share ideas without fear of criticism or judgement.' },
              { title: 'Time separation', color: '#6b5bd2', text: 'Dedicate specific time blocks to brainstorming, and set a later time for analysis and judgement.' },
              { title: 'Create a judgement-free zone', color: '#6b5bd2', text: 'Remind participants that all ideas are welcome, no matter how unconventional they seem.' },
              { title: 'Assign roles and criteria', color: '#6b5bd2', text: 'One group generates ideas; another (or the same) evaluates them, voting against criteria set in advance.' },
            ] },
            { t: 'p', text: `**Step 2: Broaden the options on the table rather than look for a single answer.** Explore multiple possibilities instead of settling on the first acceptable solution.` },
            { t: 'cards', cols: 4, items: [
              { title: 'Ask "what if" questions', color: 'var(--orange)', text: 'Use open-ended questions to explore different scenarios: "What if we had unlimited resources?"' },
              { title: 'Use the "multiple hats" technique', color: 'var(--orange)', text: 'Approach the problem from different roles, such as customer, competitor or innovator.' },
              { title: 'Explore categories', color: 'var(--orange)', text: 'Group options into themes or categories, then generate diverse solutions within each one.' },
              { title: 'Collaborative divergence', color: 'var(--orange)', text: 'Let individuals or teams brainstorm separately, then combine their ideas to broaden the pool.' },
            ] },
            { t: 'p', text: `**Step 3: Search for mutual gains.** Instead of focusing solely on individual interests, look for options that benefit all parties. **Focus on shared goals:** identify common objectives that align with everyone's interests, and make them explicit to move the negotiation forward amicably.` },
            { t: 'diagram', name: 'CircleChart', caption: 'The Circle Chart: a way to broaden options by moving from a specific problem, to its causes, to general approaches, and back to concrete action ideas. Adapted from Fisher, Ury & Patton (2011), Getting to Yes.' },
            { t: 'research', added: true, title: 'Brainstorm alone first, then together', text: `Classic brainstorming has a weakness: in a group, only one person can speak at a time. While you wait your turn, ideas fade or feel less worth saying. In a well-known set of experiments, people who brainstormed **alone and then pooled their ideas** produced substantially more ideas than the same number of people brainstorming together, and the main cause was this "production blocking". It is the reason behind **collaborative divergence**: generate separately, then combine.`, cite: ['diehl1987'] },
          ],
        },
        {
          id: 'l4-practice', title: 'Practice: invent, then judge',
          blocks: [
            { t: 'options' },
            { t: 'reflect', id: 'r-l4', prompt: `For a negotiation you are preparing, write at least five options without judging any of them. Then mark which ones meet your interests, which meet theirs, and which meet both. Which option would you never have thought of if you had stopped at the first one?` },
          ],
        },
      ],
    },
    {
      id: 'l5', kind: 'lesson', title: '5 · Stage 4: Use objective criteria',
      steps: [
        {
          id: 'l5-why', title: 'Why objective criteria matter',
          blocks: [
            { t: 'person', img: img('criteria'), alt: 'Screens showing market data, charts and dashboards on a desk', eyebrow: 'Stage 4', name: 'Let the standard decide', text: `When interests truly conflict, you can try to settle it by will (who is more stubborn), or by a standard both sides can accept. Objective criteria move the decision away from the people and onto **fair, external standards**.` },
            { t: 'cards', cols: 4, items: [
              { eyebrow: 'Why 1', title: 'Avoids power struggles', color: 'var(--b-assertive)', text: 'Shifts the focus from individual positions to neutral standards, reducing the risk of dominance or coercion.' },
              { eyebrow: 'Why 2', title: 'Promotes rational decisions', color: 'var(--b-assertive)', text: 'Encourages logical evaluation of options rather than subjective or biased judgements, minimising emotional conflict.' },
              { eyebrow: 'Why 3', title: 'Justifies outcomes', color: 'var(--b-assertive)', text: 'Decisions based on agreed standards feel more legitimate and defensible to everyone involved.' },
              { eyebrow: 'Why 4', title: 'Facilitates agreement', color: 'var(--b-assertive)', text: 'When both parties accept fair criteria, it becomes easier to evaluate options and reach a mutually acceptable solution.' },
            ] },
          ],
        },
        {
          id: 'l5-standards', title: 'Step 1: Identify fair standards and fair procedures',
          blocks: [
            { t: 'cols2', items: [
              { title: 'Fair standards', list: ['**Market rates:** what similar goods or services cost.', '**Industry standards:** accepted norms and benchmarks.', '**Legal precedents:** what courts or regulations have established.', '**Expert opinions:** independent, qualified judgement.', '**Historical data:** what was agreed or achieved before.'] },
              { title: 'Fair procedures', list: ['**Clarity:** clearly defined rules and processes.', '**Consistency:** the same process for all similar situations.', '**Transparency:** decisions and criteria are open and accessible.', '**Impartiality:** no bias or favouritism.', '**Participation:** all parties can contribute or appeal.'] },
            ] },
            { t: 'quote', text: 'Two partners closing a joint venture must split its assets fairly. Solution: one side divides them into two packages, the other picks first.', by: 'Example of a fair procedure' },
            { t: 'callout', tone: 'key', title: 'Why "one divides, the other chooses" works', text: `Nobody has to trust anybody. The side that divides has every reason to make both packages equal in value, because the other side chooses first. The procedure is **clear, impartial and transparent**, so both accept the result. The same logic works in many business settings: one side drafts the package, the other chooses which half to take; or both agree on an independent valuer before either knows the number.` },
          ],
        },
        {
          id: 'l5-search', title: 'Step 2: Search for criteria together',
          blocks: [
            { t: 'lead', text: `Don't bring a number and defend it. Bring a question both of you can answer: what would be fair here?` },
            { t: 'steps', start: 2, items: [
              { title: 'Approach each issue as a collaborative search for objective criteria', list: [
                `Frame the discussion as a shared problem to solve, not a competition.`,
                `Identify and propose neutral benchmarks, such as market rates or legal standards.`,
                `Encourage mutual exploration of data and standards to create common ground.`,
                `Use collaborative language: **"Let's find what's fair"** or **"What do you see as a reasonable standard?"**`,
              ] },
            ] },
            { t: 'diagram', name: 'SearchTogether', caption: 'In a contest of will, the question is who will give in. In a collaborative search, both sides look at the same standards, and the question becomes what is fair.' },
            { t: 'callout', tone: 'tip', title: 'Ask them first', text: `Asking "What do you see as a reasonable standard?" before you propose your own does two things. It shows you are not trying to impose an answer, and it often reveals a standard you can accept. If they choose it, they are far more likely to keep to it.` },
          ],
        },
        {
          id: 'l5-reason', title: 'Step 3: Reason openly',
          blocks: [
            { t: 'lead', text: `Reasoning openly is a conversation, not a speech. You propose, you ask, you listen, and you stay willing to change your mind.` },
            { t: 'steps', start: 3, items: [
              { title: 'Reason openly about standards and their application', list: [
                `Suggest criteria and ask the other party for feedback or alternatives.`,
                `Be prepared with evidence or a rationale for your standards.`,
                `Listen actively to their arguments and concerns.`,
                `Ask clarifying questions: **"How do you see this standard applying here?"** or **"What other criteria might work better?"**`,
                `Stay flexible if a better standard or method emerges.`,
              ] },
            ] },
            { t: 'diagram', name: 'ReasonLoop', caption: 'Reasoning openly about standards is a loop. Each round brings both sides closer to a standard they can both accept.' },
            { t: 'callout', tone: 'key', title: 'Open is not soft', text: `Changing your mind because of a better standard is not a concession. It is the method working. What you never do is change your mind because someone pushed harder. That is Step 4.` },
          ],
        },
        {
          id: 'l5-firm', title: 'Step 4: Never yield to pressure',
          blocks: [
            { t: 'quote', text: 'Be open to reasons, closed to pressure.', by: 'Step 4 · Never yield to pressure, only to principle' },
            { t: 'steps', start: 4, items: [
              { title: 'Never yield to pressure, only to principle', list: [
                `Define your principles before you enter the negotiation (for example fairness, equality or legality).`,
                `Politely but firmly reject demands that deviate from agreed standards or your principles.`,
                `Keep the discussion on objective reasoning, not emotional appeals or coercive tactics.`,
                `Use statements like **"I want to ensure this aligns with our shared values"** or **"Let's stick to the agreed criteria."**`,
                `Stay calm if pressured, and redirect to principles or objective criteria.`,
              ] },
            ] },
            { t: 'diagram', name: 'PressureGate', caption: 'Pressure does not pass the gate; reasons do. Your principles decide what gets through.' },
            { t: 'table', head: ['When they say…', 'You can say…'], rows: [
              ['"Take it or leave it."', '"I\'d like to understand the reasoning. What standard is that offer based on?"'],
              ['"We need an answer today."', '"I want to get this right for both of us. Which part can we settle today using the criteria we agreed?"'],
              ['"Everyone else accepts these terms."', '"That may be a useful standard. Can you show me what similar clients agreed?"'],
              ['"If you cared about this relationship, you\'d agree."', '"I do care about it, which is why I want an outcome we can both defend. Let\'s stick to the agreed criteria."'],
            ] },
          ],
        },
        {
          id: 'l5-example', title: 'Example: the failed production printer',
          blocks: [
            { t: 'p', text: `Here are all four steps in a single supplier conversation. Watch for the standards, the questions, and the moment of pressure.` },
            { t: 'scene', ...printerScene },
          ],
        },
        {
          id: 'l5-practice', title: 'Practice: pressure or principle?',
          blocks: [
            { t: 'activity', ...act.pressureOrPrinciple },
            { t: 'research', added: true, title: 'People will pay to reject an unfair deal', text: `In the **ultimatum game**, one person proposes how to split a sum of money and the other can accept or reject. If they reject, both get nothing. Pure self-interest says accept any offer above zero. Yet in the original experiments, and in many since, people regularly **rejected offers they saw as unfair**, choosing nothing over a lopsided deal, and many proposers offered an even split from the start. Fairness is not a soft extra. It decides whether a deal holds. Objective criteria make fairness visible, so both sides can accept the result.`, cite: ['guth1982'] },
          ],
        },
        {
          id: 'l5-roleplay', title: 'Role-play: break the stalemate',
          blocks: [
            { t: 'activity', ...act.stalledRenewal },
            { t: 'reflect', id: 'r-l5', prompt: `For your next negotiation, list two objective standards you could bring (market rates, industry standards, past agreements…) and one fair procedure you could propose. Then write the sentence you will use if the other side applies pressure.` },
          ],
        },
        {
          id: 'l5-summary', title: 'The four stages at a glance',
          blocks: [
            { t: 'table', head: ['Stage', 'What you do', 'Key question'], rows: [
              ['1. Separate people from the problem', 'Consider perception, acknowledge emotion, communicate softly', '"How do they see this, and what are they feeling?"'],
              ['2. Focus on interests, not positions', 'Look past demands to the needs beneath; ask how and what', '"What is this demand for?"'],
              ['3. Generate multiple options', 'Invent first, judge later; broaden; seek mutual gains', '"What else could work for both of us?"'],
              ['4. Use objective criteria', 'Agree fair standards and procedures; yield only to principle', '"What would make this fair?"'],
            ] },
            { t: 'img', src: img('handshake'), alt: 'A firm handshake between two professionals', ratio: '3/2', caption: 'All four stages serve one goal: an agreement both sides can accept and defend, with the relationship intact.' },
          ],
        },
      ],
    },
    { id: 'quiz', kind: 'quiz', title: 'Knowledge check', steps: [{ id: 'quiz', title: 'Graded quiz', kind: 'quiz', blocks: [{ t: 'quiz' }] }] },
    {
      id: 'wrap', kind: 'takeaways', title: 'Wrap-up',
      steps: [
        { id: 'takeaways', title: 'Key takeaways', kind: 'takeaways', blocks: [{ t: 'takeaways' }] },
        { id: 'worksheet', title: 'Worksheet & sources', kind: 'resources', blocks: [{ t: 'worksheet' }, { t: 'references' }] },
      ],
    },
  ],
  takeaways: [
    'Positional bargaining means defending fixed demands. It tends to produce stalemates, unfair compromises and damaged relationships.',
    'Principled (interest-based) bargaining focuses on the needs behind the demands, and solves the problem together.',
    'Soft bargainers seek agreement and yield to pressure; hard bargainers seek victory and apply it. Principled negotiators are soft on the people and hard on the problem.',
    'Stage 1: separate the people from the problem. Consider perception, acknowledge emotion, and speak about yourself, not about them.',
    'Stage 2: focus on interests, not positions. Ask yourself "why?", and ask the other side "how?" and "what?".',
    'Six basic human needs drive most interests: security, economic well-being, belonging, recognition, control/autonomy and fairness.',
    'Stage 3: generate multiple options. Separate inventing from judging, broaden the options, and search for mutual gains.',
    'Stage 4: use objective criteria. Agree fair standards (market rates, precedents, expert opinion) and fair procedures (one cuts, the other chooses).',
    'Be open to reasons, closed to pressure: "Let\'s stick to the agreed criteria."',
    'A stalemate is usually a sign that the conversation is about positions. Move it to interests, options and standards.',
  ],
  worksheet: {
    file: 'worksheets/module-04-break-the-stalemate-worksheet.pdf',
    title: 'Break the Stalemate: Principled Negotiation Planner',
    pages: 4,
    contents: ['Positions vs interests map', 'Six needs check', 'People and perception prep', 'Options brainstorm: invent, then judge', 'Objective criteria and pressure plan', 'After-action review'],
  },
}

export default m4
