// Module 1 content. Source: "Chapter 1: The Negotiator's Blueprint" by Raad Kirmani.
// Blocks marked { added: true } (or type 'research') are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import { salary, strategyScenes, cast } from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m1/${name}.webp`

const strategyDetail = (key, title, tagline, what, chars, when, risks, examples, image) => ({
  id: `l4-${key}`, title,
  blocks: [
    { t: 'strategyHeader', key, title, tagline, image: img(image) },
    { t: 'p', text: `**What is it?** ${what}` },
    { t: 'cols2', items: [
      { title: 'Key characteristics', list: chars },
      { title: 'When to use it', list: when },
    ] },
    { t: 'callout', tone: 'warn', title: 'Potential risks', list: risks },
    { t: 'examples', items: examples },
    { t: 'scene', ...strategyScenes[key], cast: {} },
  ],
})

const m1 = {
  id: 'm1',
  number: 1,
  title: "The Negotiator's Blueprint",
  subtitle: 'Behavior, Style vs Strategies & Adaptability',
  cover: img('cover'),
  coverAlt: 'Colleagues smiling during a discussion',
  tags: ['Behaviour', 'Strategy', 'Adaptability'],
  duration: '75–90 min',
  author: 'Raad Kirmani',
  summary: 'Negotiation is strategic, not just a set of tactics. In this module you separate two things people often confuse: your behaviour (how you show up) and your strategy (the game plan you choose). You will meet the four negotiation behaviours and the five classic strategies, learn when each one works, and practise adapting to the person across the table, with assertiveness as your anchor.',
  objectives: [
    'Define negotiation and judge any negotiation against three criteria: a wise agreement, efficiency, and the relationship.',
    'Tell apart negotiation behaviour (how you communicate) and negotiation strategy (the approach you take).',
    'Recognise aggressive, passive, manipulative and assertive behaviour, with the benefits and risks of each.',
    'Adapt your assertiveness to six types of counterpart without giving up your position.',
    'Explain the five strategies (competing, collaborating, compromising, avoiding, accommodating) on the assertiveness and cooperativeness grid.',
    'Choose a strategy using desired outcome, the counterpart\'s position, and context.',
    'Combine behaviour and strategy deliberately, and focus preparation on the issues that matter most.',
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · What negotiation really is',
      steps: [
        {
          id: 'l1-define', title: 'Defining negotiation',
          blocks: [
            { t: 'lead', text: 'Negotiation is a process of communication where two or more parties with different interests work toward a mutually acceptable agreement.' },
            { t: 'img', src: img('handshake'), alt: 'Two professionals shaking hands across a table', ratio: '16/7' },
            { t: 'quote', text: 'A wise negotiated agreement meets the key interests of all parties, resolves conflicts fairly, is long-lasting, and considers the broader community.', by: 'Fisher, Ury & Patton (2011)' },
            { t: 'p', text: 'Notice what this definition does *not* say. It does not say "getting the most" or "beating the other side". A good negotiator is judged by the quality of the agreement and what it leaves behind.' },
          ],
        },
        {
          id: 'l1-criteria', title: 'Three tests of a good negotiation',
          blocks: [
            { t: 'p', text: 'Any negotiation method can be evaluated using three key criteria. Use them as a checklist before, during and after every negotiation.' },
            { t: 'diagram', name: 'Criteria' },
            { t: 'list', items: [
              '**A wise agreement**, if an agreement is feasible. It meets the key interests of both sides and lasts.',
              '**Efficiency.** It does not waste time, money or energy getting there.',
              '**The relationship.** The process should improve, or at the very least preserve, the relationship between the parties.',
            ] },
            { t: 'research', added: true, title: 'Four principles behind "wise agreements"', text: 'Fisher, Ury and Patton\'s method of *principled negotiation* gives four practical rules for meeting these tests: **separate the people from the problem**; **focus on interests, not positions**; **invent options for mutual gain** before deciding; and **insist on objective criteria** such as market data or precedent. You will see these ideas again in Module 4, "Break the Stalemate".', cite: ['fisher2011'] },
            { t: 'reflect', id: 'r-l1', prompt: 'Think of a negotiation from the last month, at work or at home. Score it on the three tests: was the agreement wise, was the process efficient, and is the relationship better or worse? What one thing would you change?' },
          ],
        },
        {
          id: 'l1-dimensions', title: 'Two dimensions: behaviour and strategy',
          blocks: [
            { t: 'p', text: 'Every negotiation or conflict interaction involves **two interdependent dimensions**:' },
            { t: 'diagram', name: 'TwoDimensions' },
            { t: 'cols2', items: [
              { title: '1 · Negotiation behaviour', text: '**How** people express themselves: tone, emotional style, communication pattern.' },
              { title: '2 · Negotiation strategy', text: '**What** approach they use to influence outcomes: cooperation, competition, avoidance and so on.' },
            ] },
            { t: 'p', text: 'The two are easy to confuse. You can pursue a tough, competitive strategy with calm, respectful behaviour, or a cooperative strategy with a hostile tone. This module looks at each dimension in detail, then shows how they work together.' },
            { t: 'activity', ...act.behaviourOrStrategy },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · The four negotiation behaviours',
      steps: [
        {
          id: 'l2-overview', title: 'Nature of negotiation behaviours',
          blocks: [
            { t: 'p', text: 'Negotiation behaviours vary with the situation and the individuals involved. Understanding them is crucial, both to manage your own and to read the person in front of you.' },
            { t: 'img', src: img('meeting'), alt: 'A team meeting around a white table', ratio: '16/7', pos: 'center 30%' },
            { t: 'behaviourList', items: [
              { key: 'aggressive', name: 'Aggressive', text: 'Focus on maximising their own gains, often at the expense of the other party.' },
              { key: 'passive', name: 'Passive', text: 'Reluctant to express their needs or interests, and may be easily persuaded by others.' },
              { key: 'manipulative', name: 'Manipulative (passive-aggressive)', text: 'Seem cooperative but subtly disrupt the negotiation, causing frustration and confusion.' },
              { key: 'assertive', name: 'Assertive', text: 'Clearly express their needs and interests while respecting the needs and interests of others.' },
            ] },
            { t: 'research', added: true, title: 'A map of the four behaviours', text: 'Assertiveness research often places these behaviours on two questions: *Do I state my own needs directly?* and *Do I respect the other person\'s needs?* Assertive behaviour is the only one that answers yes to both.', diagram: 'BehaviourMap', cite: ['alberti2017'] },
          ],
        },
        {
          id: 'l2-aggressive', title: 'Aggressive behaviour',
          blocks: [
            { t: 'traits', key: 'aggressive', name: 'Aggressive negotiating behaviour', images: [img('aggressive-1'), img('aggressive-2'), img('aggressive-3')],
              characteristics: ['Hostility and intimidation', 'Overpowering communication', 'Demanding stance'],
              benefits: ['Can lead to quick resolutions where the aggressor has significant leverage or power.', 'Useful in high-stakes, one-time negotiations where maintaining relationships is not a priority.'],
              risks: ['Harms relationships, fostering resentment and hostility.', 'Gains concessions but sacrifices long-term goodwill and partnerships.', 'Risks complete negotiation breakdown if the other party feels coerced.'] },
          ],
        },
        {
          id: 'l2-passive', title: 'Passive behaviour',
          blocks: [
            { t: 'traits', key: 'passive', name: 'Passive negotiating behaviour', images: [img('passive-1'), img('passive-2'), img('passive-3')],
              characteristics: ['Submissiveness', 'Indecisiveness', 'Avoidance'],
              benefits: ['Preserves peace when the relationship is more important than the issue.', 'Useful when one party prioritises the relationship or lacks bargaining power.'],
              risks: ['Poor outcomes or exploitation by more aggressive negotiators.', 'Misses opportunities for better deals or balanced agreements.', 'May lose respect, as passiveness can be seen as weakness.'] },
          ],
        },
        {
          id: 'l2-manipulative', title: 'Manipulative behaviour',
          blocks: [
            { t: 'traits', key: 'manipulative', name: 'Manipulative negotiating behaviour', images: [img('manip-1'), img('manip-2'), img('manip-3')],
              characteristics: ['Indirect communication', 'Emotional manipulation', 'Avoiding direct conflict'],
              benefits: ['Creates a temporary advantage by keeping the other party off balance.', 'Allows for delays in decisions or commitments when stalling is strategic.'],
              risks: ['Erodes trust and frustrates the other party.', 'Prolongs negotiations by disrupting communication.', 'Damages relationships through perceived dishonesty.'] },
          ],
        },
        {
          id: 'l2-assertive', title: 'Assertive behaviour',
          blocks: [
            { t: 'traits', key: 'assertive', name: 'Assertive negotiating behaviour', images: [img('assertive-1'), img('assertive-2'), img('assertive-3')],
              characteristics: ['Clarity and directness', 'Respect for both sides', 'Problem-solving orientation'],
              benefits: ['Builds trust and long-term relationships.', 'Helps achieve balanced agreements.', 'Reduces misunderstandings.'],
              risks: ['If the other party is highly aggressive or non-cooperative, assertiveness may be mistaken for weakness.'] },
          ],
        },
        {
          id: 'l2-salary', title: 'One conversation, four behaviours',
          blocks: [
            { t: 'p', text: 'Alex, a manager, offers Riley a 5% raise. Riley has had a strong year. Switch between the four versions of the same conversation and notice how Riley\'s behaviour changes Alex\'s response.' },
            { t: 'compareDialogues', dialogues: salary, cast, order: ['aggressive', 'passive', 'manipulative', 'assertive'] },
            { t: 'callout', tone: 'tip', title: 'What changed?', text: 'Riley\'s achievements were the same in every version. Only the behaviour changed, and with it Alex\'s willingness to help. In the assertive version, Alex ends up advocating for Riley.' },
          ],
        },
        {
          id: 'l2-practice', title: 'Practice: name that behaviour',
          blocks: [
            { t: 'activity', ...act.nameThatBehaviour },
            { t: 'reflect', id: 'r-l2', prompt: 'Which behaviour do you slip into under pressure? Describe one moment when it helped you and one when it cost you.' },
          ],
        },
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: '3 · Choosing and adapting your behaviour',
      steps: [
        {
          id: 'l3-situation', title: 'Choosing behaviour by situation',
          blocks: [
            { t: 'p', text: 'Each behaviour has situations where it can work. Skilled negotiators choose deliberately instead of reacting by habit.' },
            { t: 'situationCards', items: [
              { key: 'aggressive', title: 'Aggressive behaviour', img: img('sit-aggressive'), list: ['In high-stakes situations with significant leverage.', 'For one-off deals where the relationship isn\'t a priority.', 'To push results when facing uncooperative parties.'] },
              { key: 'passive', title: 'Passive behaviour', img: img('sit-passive'), list: ['To prioritise relationships over the outcome.', 'For low-stakes matters not worth conflict.', 'When lacking leverage and maintaining peace is key.'] },
              { key: 'manipulative', title: 'Manipulative (passive-aggressive) behaviour', img: img('sit-manip'), list: ['To delay decisions for strategic advantage.', 'To avoid escalation with difficult parties.', 'To gain an edge by unsettling the other side.'] },
              { key: 'assertive', title: 'Assertive behaviour', img: img('sit-assertive'), list: ['For win-win outcomes respecting both parties\' interests.', 'To build trust and foster long-term relationships.', 'To set clear expectations without causing conflict.'] },
            ] },
          ],
        },
        {
          id: 'l3-anchor', title: 'Why assertiveness is your anchor',
          blocks: [
            { t: 'p', text: 'Assertiveness is the most balanced behaviour and serves as the default position in most negotiations, because it:' },
            { t: 'checks', items: ['Sets clear boundaries', 'Communicates with respect and confidence', 'Enables both collaboration and control', 'Avoids emotional overreaction'] },
            { t: 'callout', tone: 'key', title: 'Adjust tone, not values', text: 'Assertiveness is your most adaptable and effective default. Even assertiveness needs to be adjusted in tone and intensity depending on the other party.' },
            { t: 'research', added: true, title: 'Evidence: there is such a thing as too much, and too little', text: 'In studies of workplace leaders, Ames and Flynn found an inverted-U pattern: colleagues saw both low and very high assertiveness as weaknesses. Low assertiveness cost leaders results; very high assertiveness cost them relationships. The most effective leaders sat in the moderate, balanced middle, which is exactly the "anchor" position this module recommends.', cite: ['ames2007'] },
          ],
        },
        {
          id: 'l3-adapt', title: 'Adapting to your counterpart',
          blocks: [
            { t: 'p', text: 'Your anchor stays assertive. What changes is the *flavour* of assertiveness you use, depending on the behaviour of the person across the table. Tap each card to see the recommended response.' },
            { t: 'flipCards', items: act.adaptationCards },
            { t: 'research', added: true, title: 'Why naming emotions calms things down', text: 'The "grounded, empathetic" response works partly because naming a feeling ("that sounds frustrating") can reduce its intensity. In a brain-imaging study, putting feelings into words reduced activity in the amygdala, a region involved in emotional reactions. Voss and Raz call this technique *labelling* and use it in hostage and business negotiations.', cite: ['lieberman2007', 'voss2016'] },
          ],
        },
        {
          id: 'l3-practice', title: 'Practice: adaptation drill',
          blocks: [
            { t: 'activity', ...act.adaptationDrill },
            { t: 'reflect', id: 'r-l3', prompt: 'Think of a difficult person you negotiate with regularly. Which behaviour do they usually show? Write the exact opening line you will use next time, in the matching flavour of assertiveness.' },
          ],
        },
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · The five negotiating strategies',
      steps: [
        {
          id: 'l4-intro', title: 'The game plans of negotiation',
          blocks: [
            { t: 'lead', text: 'A negotiation strategy defines how you approach the exchange of value or the resolution of conflict.' },
            { t: 'p', text: 'It sets your **intent**, influences your **tactics**, and determines whether the outcome will be **competitive or cooperative**, **short-term or sustainable**.' },
            { t: 'p', text: 'There are five classic negotiating strategies, each with its own mindset, advantages and risks. Skilled negotiators know *when to use each*, and how to *shift strategies* fluidly depending on context and counterpart behaviour.' },
            { t: 'diagram', name: 'StrategyGrid', interactive: true, caption: 'Select a strategy to see where it sits. Assertiveness is concern for the outcome; cooperation is concern for the relationship.' },
            { t: 'research', added: true, title: 'Where this grid comes from', text: 'The two-axis grid is best known from the **Thomas-Kilmann Conflict Mode Instrument**, which builds on Blake and Mouton\'s earlier Managerial Grid. Researchers call the same idea the *dual concern model*: your strategy follows from how much you care about your own outcome and how much you care about the other side\'s.', cite: ['thomas1974', 'blake1964', 'pruitt1986'] },
          ],
        },
        strategyDetail('competing', 'Competing (distributive)', 'Focuses on achieving maximum benefit for oneself, regardless of the other party\'s needs.',
          'A "winner-take-all" mindset where one side aims to maximise their gains at the expense of the other.',
          ['**High assertiveness:** firm demands and aggressive tactics', '**Low cooperativeness:** prioritising personal goals over the relationship'],
          ['Quick decisions are needed', 'One side holds significant power or leverage', 'The outcome is more important than the long-term relationship'],
          ['Can damage relationships and lead to resentment', 'May result in lack of cooperation from the other party'],
          ['In this contract, our final offer stands. If it doesn\'t meet your budget, we\'ll explore other partners.', 'Our terms are non-negotiable; it\'s the same standard we apply to all clients.'], 'st-competing'),
        strategyDetail('collaborating', 'Collaborating (integrative)', 'Seeks to find a mutually beneficial solution where both parties gain.',
          'A "win-win" mindset where both parties work together to find a mutually beneficial solution.',
          ['**High assertiveness:** actively pursuing your interests', '**High cooperativeness:** prioritising shared goals over individual gains'],
          ['Both parties have important stakes in the negotiation', 'Maintaining the relationship is a priority', 'There is time for in-depth discussions and problem-solving'],
          ['Can be time-consuming and requires a high level of trust and communication', 'If one party isn\'t fully engaged, it may not work as intended'],
          ['Let\'s look at what matters most to each of us. Maybe we can adjust timelines instead of costs.', 'What if we combine your approach with part of mine? That could give us the best of both.'], 'st-collaborating'),
        strategyDetail('compromising', 'Compromising', 'Involves both parties making concessions to reach a middle ground.',
          'A "meet in the middle" strategy where both parties concede some of their demands to reach a mutually acceptable agreement.',
          ['**Moderate assertiveness:** neither party fully pursues their interests', '**Moderate cooperativeness:** both sides are willing to make concessions'],
          ['Time is limited and a quick resolution is needed', 'The parties have equal power and are willing to compromise', 'The issues are not highly critical for either side'],
          ['Can lead to suboptimal outcomes where neither side is fully satisfied', 'Overuse can create a "culture of compromise" where important issues are not properly addressed'],
          ['If we meet halfway on cost and delivery, can we finalise today?'], 'st-compromising'),
        strategyDetail('avoiding', 'Avoiding', 'Attempts to sidestep or postpone negotiations to avoid conflict.',
          'A "no-deal" strategy where one or both parties sidestep the conflict altogether, delaying or avoiding resolution.',
          ['**Low assertiveness:** avoiding directly pursuing your interests', '**Low cooperativeness:** prioritising evasion over finding a solution'],
          ['The issue is trivial or not worth the time and effort', 'Further negotiation would be futile and a waste of energy', 'Emotions are running high, and a cooling-off period is needed'],
          ['Can allow unresolved issues to fester and create larger problems down the line', 'May give the impression of disinterest or weakness, damaging relationships'],
          ['Let\'s pause for now. We can revisit this when we have more data.', 'Can we talk about this later? I\'ve got a lot on my plate.'], 'st-avoiding'),
        strategyDetail('accommodating', 'Accommodating', 'Prioritises the other party\'s needs and interests over one\'s own.',
          'A "lose-win" strategy where one party prioritises the relationship over their own goals, yielding to the other side\'s needs.',
          ['**Low assertiveness:** prioritising the other party\'s interests over your own', '**High cooperativeness:** focusing on maintaining harmony and goodwill'],
          ['The relationship is more important than the specific outcome', 'The issue at hand is relatively minor or unimportant to you', 'A gesture of goodwill is needed to build trust or de-escalate tension'],
          ['Consistently accommodating may lead to resentment or the other party taking advantage', 'Important personal or organisational goals may not be met, leading to dissatisfaction'],
          ['I understand this delivery date is critical for you. We\'ll adjust our schedule to make it happen.'], 'st-accommodating'),
        {
          id: 'l4-practice', title: 'Practice: sort the strategy',
          blocks: [
            { t: 'research', added: true, title: 'Distributive vs integrative', text: 'The labels in brackets come from Walton and McKersie\'s classic study of labour negotiations. *Distributive* bargaining divides a fixed pie: what one side gains, the other loses. *Integrative* bargaining looks for ways to make the pie bigger before dividing it, for example by trading issues the two sides value differently.', cite: ['walton1965'] },
            { t: 'activity', ...act.sortTheStrategy },
          ],
        },
      ],
    },
    {
      id: 'l5', kind: 'lesson', title: '5 · Choosing the right strategy',
      steps: [
        {
          id: 'l5-factors', title: 'Three factors that decide',
          blocks: [
            { t: 'p', text: 'Your negotiating style depends on the situation: the outcome\'s importance, the relationship between the parties, and the negotiation context. A successful negotiator can shift between styles as the situation changes.' },
            { t: 'diagram', name: 'Funnel', fit: true, caption: 'Work through the three factors in order. Together they point to your starting strategy.' },
            { t: 'factorCards', items: [
              { n: 1, title: 'Desired outcome', text: 'The value you want and the impact on the relationship.', ask: ['What must I walk away with?', 'How much does this result matter compared with the relationship?'] },
              { n: 2, title: "Counterpart's position", text: 'Their needs, interests and potential leverage.', ask: ['What do they need, and why?', 'Who has more leverage, and who has alternatives?'] },
              { n: 3, title: 'Context', text: 'Time, resources and relationship dynamics.', ask: ['How much time do we have?', 'Is this a one-off, or will we work together again?'] },
            ] },
            { t: 'p', text: 'The scenarios in this module show how different combinations of these factors point to different strategies:' },
            { t: 'factorMatrix', rows: [
              { key: 'competing', strategy: 'Competing', outcome: 3, relationship: 1, context: 'One-time project; you hold the value', example: 'Freelancer holding a $4,500 rate' },
              { key: 'collaborating', strategy: 'Collaborating', outcome: 3, relationship: 3, context: 'Long-term partnership; time to problem-solve', example: 'Two leads replanning a product launch' },
              { key: 'compromising', strategy: 'Compromising', outcome: 2, relationship: 2, context: 'Time is limited; equal power', example: 'Peers co-hosting the client call' },
              { key: 'accommodating', strategy: 'Accommodating', outcome: 1, relationship: 3, context: 'Building goodwill with someone senior', example: 'Helping a mentor organise the offsite' },
              { key: 'avoiding', strategy: 'Avoiding', outcome: 1, relationship: 1, context: 'Bad timing; a hectic deadline day', example: 'Parking the coffee-reimbursement debate' },
            ] },
            { t: 'callout', tone: 'tip', title: 'Re-check the factors as you go', text: 'The factors can change during a negotiation: a deadline appears, the other side reveals leverage, or the relationship turns out to matter more than you thought. When they change, a skilled negotiator shifts strategy.' },
          ],
        },
        {
          id: 'l5-selector', title: 'Try it: the strategy selector',
          blocks: [
            { t: 'p', text: 'The strategy grid uses two axes. Keep them in mind as you use the selector:' },
            { t: 'cols2', items: [
              { title: 'Assertiveness', text: 'Concern for the **outcome** of the negotiation or conflict. How much do you need to win on the substance?' },
              { title: 'Co-operation', text: 'Concern for the **relationship** between the parties. How much does the future relationship matter?' },
            ] },
            { t: 'p', text: 'Use the sliders to describe a negotiation you are facing. The selector places you on the grid, suggests a starting strategy and explains why. Treat it as a thinking aid, not a rule.' },
            { t: 'selector' },
            { t: 'activity', ...act.pickTheStrategy },
            { t: 'reflect', id: 'r-l5', prompt: 'Pick a negotiation coming up in the next month. Rate the importance of the outcome and of the relationship from 1 to 5, note the time pressure, and write which strategy you will start with and why.' },
          ],
        },
      ],
    },
    {
      id: 'l6', kind: 'lesson', title: '6 · Bridging behaviours and strategies',
      steps: [
        {
          id: 'l6-bridge', title: 'How they work together',
          blocks: [
            { t: 'p', text: 'It is important to understand the difference between your **behaviour** in a negotiation and the **strategy** you choose, and how the two work together.' },
            { t: 'cols2', items: [
              { title: 'Negotiation behaviours', text: 'How you show up and communicate. Shaped by your personality, confidence, emotional intelligence and typical response to conflict.', list: ['Your tone, body language and communication style', 'How the other person perceives you', 'The emotional tone of the negotiation'], listTitle: 'Your behaviour affects' },
              { title: 'Negotiation strategies', text: 'The methods or approaches you use to achieve your goals. Influenced by goals, interpersonal dynamics and priorities.', list: ['How you solve problems', 'How you balance your needs with others\'', 'How you handle trade-offs and outcomes'], listTitle: 'Your strategy affects' },
            ] },
            { t: 'p', text: 'Although behaviour is about style and strategy is about method, they are closely linked. **The effectiveness of your strategy often depends on your behaviour.**' },
            { t: 'diagram', name: 'Combos' },
            { t: 'research', added: true, title: 'Evidence: firm on interests, warm on people', text: 'A meta-analysis of 28 studies found that negotiators reached the best joint outcomes when they combined a cooperative motive with high *resistance to yielding*: they cared about the other side **and** held firm on their own interests. Cooperative but yielding negotiators, and firm but selfish ones, did worse. That is the assertive + collaborative combination.', cite: ['dedreu2000'] },
          ],
        },
        {
          id: 'l6-roleplay', title: 'Role-play: your salary review',
          blocks: [
            { t: 'activity', ...act.salaryRolePlay },
            { t: 'reflect', id: 'r-l6', prompt: 'For your next negotiation, write your plan as one line: "I will use a ____ strategy, delivered with ____ behaviour, because ____." Then write the first sentence you will say.' },
          ],
        },
      ],
    },
    {
      id: 'l7', kind: 'lesson', title: '7 · The Pareto principle',
      steps: [
        {
          id: 'l7-pareto', title: 'Spend effort where it counts',
          blocks: [
            { t: 'p', text: 'Not every issue in a negotiation deserves the same effort. The chart below, from the module, shows how benefit grows with effort, split into four priority zones.' },
            { t: 'diagram', name: 'Pareto', caption: 'Pareto principle analysis. Benefit rises steeply over the first 20% of effort, then flattens.' },
            { t: 'zones' },
            { t: 'research', added: true, title: 'The 80/20 rule and MoSCoW', text: 'The Pareto principle is the observation that a small share of causes usually produces most of the effect, often summarised as 80/20. Quality pioneer Joseph Juran called these the "vital few" and the "useful many". The four zones in the chart follow the **MoSCoW** method (Must, Should, Could, Won\'t), which was created for prioritising requirements in software projects and works well for negotiation issues too.', cite: ['juran1951', 'koch1998', 'clegg1994'] },
          ],
        },
        {
          id: 'l7-practice', title: 'Practice: prioritise your issues',
          blocks: [
            { t: 'activity', ...act.moscowSort },
            { t: 'reflect', id: 'r-l7', prompt: 'List the issues in a negotiation you are preparing for. Mark each as Must, Should, Could or Won\'t. Which "Won\'t" items could you offer as trades?' },
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
    'Negotiation is communication between parties with different interests, working toward a mutually acceptable agreement.',
    'Judge every negotiation on three tests: a wise agreement, efficiency, and an improved or preserved relationship.',
    'Every negotiation has two dimensions: behaviour (how you show up) and strategy (the approach you take).',
    'There are four behaviours. Aggressive, passive and manipulative each have narrow uses and real risks; assertive works in most situations.',
    'Make assertiveness your anchor. Adjust your tone to the counterpart (calm, supportive, transparent, empathetic or firm), never your values.',
    'The five strategies sit on two axes: assertiveness (concern for the outcome) and cooperation (concern for the relationship).',
    'Choose a strategy by weighing your desired outcome, the counterpart\'s position, and the context (time, resources, relationship).',
    'Strategy and behaviour must fit. Assertive + collaborative builds trust; manipulative + accommodating breeds distrust.',
    'Spend preparation effort on the vital few issues. Your Musts and Shoulds create most of the value.',
    'Skilled negotiators shift strategies fluidly as the situation and the other side change.',
  ],
  worksheet: {
    file: 'worksheets/module-01-negotiators-blueprint-worksheet.pdf',
    title: "The Negotiator's Blueprint: Planning Worksheet",
    pages: 4,
    contents: ['Behaviour self-check', 'Counterpart map and opening lines', 'Strategy planner', 'MoSCoW issue list', 'After-action review'],
  },
}

export default m1
