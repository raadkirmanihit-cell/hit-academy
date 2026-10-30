// Module 7 content. Source: "Chapter 7: The Ultimate Guide to Objection Handling: Decode, Counter,
// and Win with Integrity" by Raad Kirmani.
// Blocks of type 'research' (and items marked { added: true }) are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import * as sc from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m7/${name}.webp`

// One page per tactic, always in the same order: definition, why it works and warning signs,
// how to counter, how to use it ethically, then the example scripts.
function tactic({ id, title, image, ratio, alt, def, why, signs, counter, ethics, scenes = [], after = [], before = [] }) {
  const [w, h] = ratio.split('/').map(Number)
  return {
    id, title,
    blocks: [
      { t: 'person', img: img(image), alt, ratio, tall: w / h < 0.8, eyebrow: 'Definition', name: title, text: def },
      { t: 'cards', cols: 2, items: [
        { eyebrow: 'Psychology', title: 'Why it works', color: '#6b5bd2', text: why },
        { eyebrow: 'Watch for', title: 'Warning signs', color: 'var(--orange)', list: signs },
      ] },
      ...before,
      { t: 'h', text: 'How to counter' },
      { t: 'steps', items: counter },
      { t: 'callout', tone: 'tip', title: 'How to use it ethically', list: ethics },
      ...scenes.map((s) => ({ t: 'scene', ...s })),
      ...after,
    ],
  }
}

const practice = (id, spot, counter) => [
  { id: `${id}-spot`, title: 'Practice: spot the tactic', blocks: [{ t: 'activity', ...spot }] },
  { id: `${id}-counter`, title: 'Practice: choose the counter', blocks: [{ t: 'activity', ...counter }] },
]

const m7 = {
  id: 'm7',
  number: 7,
  title: 'From Resistance to Resolution',
  subtitle: 'Mastering Objections with Integrity',
  cover: img('cover'),
  coverAlt: 'A negotiator in a suit reading a book titled Mastering Objections',
  tags: ['Objection handling', 'Counter-tactics', 'Integrity'],
  duration: '130–150 min',
  author: 'Raad Kirmani',
  summary: `Negotiation is a strategic battle of psychology and emotional intelligence. This module is your guide to 20 common objection tactics: what each one is, why it works, the warning signs, how to counter it, and how to use it ethically. Every tactic comes with real-world scripts from salary talks, vendor deals, client meetings and the workplace, so that you are ready for any negotiation.`,
  objectives: [
    'Decode any tactic with five questions: what it is, why it works, its warning signs, how to counter it and how to use it ethically.',
    'Recognise the warning signs of 20 common objection tactics, grouped into four families.',
    'Counter pressure tactics (ultimatums, false deadlines, threats, outbursts, silence and the flinch) calmly, with questions and your BATNA.',
    'Protect your numbers against highballs, bracketing, bogeys, nibbling and cherry picking.',
    'Bring distraction and authority tactics back to the facts, the real decision-makers and a clear timeline.',
    'Decide when a tactic can be used ethically, and when it crosses the line into manipulation.',
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · Decode any tactic',
      steps: [
        {
          id: 'l1-decode', title: 'Five questions to decode any tactic',
          blocks: [
            { t: 'lead', text: 'Negotiation is a strategic battle of psychology and emotional intelligence. Objection tactics are its most common weapons.' },
            { t: 'p', text: 'This module is your guide to common objection tactics, why they work, and how to counter them ethically. For every tactic you learn the same five things:' },
            { t: 'diagram', name: 'TacticDecoder', caption: 'Every tactic page in this module follows these five questions, followed by real-world example scripts.' },
            { t: 'callout', tone: 'key', title: 'Decode, counter and win with integrity', text: 'A tactic loses most of its power the moment you recognise it. Recognising it lets you stay calm, respond to the substance instead of the pressure, and keep the relationship intact. Every tactic also has an honest version: you will learn where the line is.' },
            { t: 'research', added: true, title: 'Recognise it, raise it, question it', text: `In *Getting to Yes*, Fisher, Ury and Patton suggest a three-step response when the other side uses a tricky tactic: **recognise** the tactic, **raise it** explicitly, and **question its legitimacy**. In other words, you negotiate about the rules of the game, not only about the substance. This module gives you the first step for 20 tactics, and calm scripts for the other two.`, cite: ['fisher2011'] },
          ],
        },
        {
          id: 'l1-map', title: 'The 20 tactics in four families',
          blocks: [
            { t: 'p', text: 'The 20 tactics in this module are grouped into four families. Each family has its own lesson, with one page per tactic and two practice activities at the end.' },
            { t: 'diagram', name: 'TacticFamilies', caption: 'The four families of objection tactics, and the lesson that covers each one.' },
            { t: 'callout', tone: 'tip', title: 'How to study this module', list: ['Read one tactic at a time, and say the counter scripts out loud.', 'Notice which tactics you have already met with clients, suppliers or colleagues.', 'Use the worksheet to prepare your counters before your next negotiation.'] },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · Pressure tactics',
      steps: [
        tactic({
          id: 'l2-ultimatum', title: 'Ultimatums and threats', image: 'ultimatum', ratio: '1000/1024',
          alt: 'A man in a suit leaning over a table, pointing at a contract in front of him',
          def: 'Putting a consequence on the table to force a quick decision. It comes in two forms: a **take-it-or-leave-it** offer, and a **threat or warning**.',
          why: 'Both activate **fear of loss** and create **urgency**, often triggering quick decisions.',
          signs: ['Phrases like "final offer" or "non-negotiable".', 'Time-bound threats.', '"If you don\'t agree, we\'ll cancel."', '"You\'ll lose the account if this goes on."'],
          before: [
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Form 1', title: 'Take-it-or-leave-it (ultimatum)', color: 'var(--b-aggressive)', text: 'A fixed, final offer designed to pressure an immediate decision.\n**"The offer is $95,000. That\'s the final number."**' },
              { eyebrow: 'Form 2', title: 'Threats and warnings', color: '#b0457a', text: 'Using consequences to apply pressure and influence behaviour.\n**"If you can\'t meet this rate, we\'ll cancel the contract."**' },
            ] },
          ],
          counter: [
            { title: 'Don\'t panic. De-escalate, then test it', list: ['Use strategic empathy, followed by an assertive tone.', '**"Is that truly your final position, or is there flexibility?"**'] },
            { title: 'Use calibrated questions', list: ['**"What happens if I can\'t meet that term?"**', '**"Is that the outcome you\'re hoping for?"**'] },
            { title: 'Reframe toward solutions', list: ['**"Let\'s focus on mutual solutions, not threats."**'] },
            { title: 'Reinforce your BATNA', list: ['**"We\'re prepared to explore other options if needed."**', '**"We have options, but we want to make this work with you."**'] },
          ],
          ethics: ['Use an ultimatum only when walking away is a true option and you\'ve already made fair offers.', 'Pair it with an explanation: **"This is our best and final offer based on current constraints."**', 'State natural consequences rather than threats: **"If we don\'t sign by Friday, the schedule will shift."**', '**Important:** only state a consequence when you\'re prepared to follow through.'],
          after: [
            { t: 'table', head: ['Threat (pressure)', 'Natural consequence (information)'], rows: [
              ['"If you don\'t agree, we\'ll cancel."', '"If we can\'t agree by Friday, the delivery schedule will shift."'],
              ['"You\'ll lose the account if this goes on."', '"If the delays continue past month-end, we\'ll have to review the account."'],
            ], caption: 'The same message can be a threat or an honest consequence. The second column informs; it doesn\'t intimidate.' },
            { t: 'callout', tone: 'key', title: 'Your BATNA makes the counter credible', text: 'The last counter only works if your alternative is real. This is why the BATNA work in Module 5 matters: with a strong alternative, a "final offer" or a threat to walk away is just one option among several.' },
          ],
        }),
        {
          id: 'l2-ultimatum-scripts', title: 'Ultimatums and threats: example scripts',
          blocks: [
            { t: 'person', img: img('threats'), alt: 'A man pointing aggressively at another man in a dim corridor, an exit sign behind them', ratio: '518/1024', tall: true, small: true, eyebrow: 'Three scripts', name: 'Ultimatums and threats in action', text: 'An ultimatum in a salary negotiation, a threat from a long-term client, and a resignation threat from a team member. In each one, notice the same moves: stay calm, question the pressure, reframe toward solutions, and rely on a real alternative.' },
            { t: 'scene', ...sc.ultimatumScene },
            { t: 'scene', ...sc.threatBusinessScene },
            { t: 'scene', ...sc.threatResignationScene },
          ],
        },
        tactic({
          id: 'l2-deadline', title: 'False deadlines', image: 'deadline', ratio: '1024/928',
          alt: 'An hourglass on a desk with the sand running through',
          def: 'Setting a deadline that isn\'t real, to create pressure or force a rushed decision.',
          why: 'Urgency activates the **scarcity principle**: it makes the deal feel more valuable.',
          signs: ['Phrases like "This offer expires today" without a rationale.', 'Deadlines that shift or extend after pushback.'],
          counter: [
            { title: 'Ask questions', list: ['**"What happens if we take another day to decide?"**'] },
            { title: 'Push back respectfully', list: ['**"We want to make the right decision. Can we get 24 more hours?"**'] },
            { title: 'Compare with previous behaviour', list: ['**"You mentioned needing to close this last week too."**'] },
          ],
          ethics: ['Use real deadlines to move stagnant negotiations.', 'Always offer a justification: **"Our budget window closes Friday, so we\'d need an answer by then."**'],
          scenes: [sc.deadlineScene],
          after: [{ t: 'research', added: true, title: 'Deadlines usually bind both sides', text: `Moore found that negotiators tend to see their own deadline as a weakness. In fact, a final deadline usually constrains **both** sides: if there is no deal by the deadline, the other side loses the deal too. When negotiators revealed their deadline, their counterparts conceded faster. So when someone presses you with a deadline, ask what happens to **them** if it passes.`, cite: ['moore2004'] }],
        }),
        tactic({
          id: 'l2-outburst', title: 'Emotional outbursts', image: 'outburst', ratio: '976/1024',
          alt: 'A man and a woman arguing across a conference table',
          def: 'Using anger, frustration or drama to intimidate or unsettle the other party.',
          why: 'It shifts the focus **from the issue to the emotion**. Many people respond by making concessions to calm the situation.',
          signs: ['Sudden yelling, tears or visible agitation.', 'Emotional language: "This is outrageous!" or "I can\'t believe this!"'],
          counter: [
            { title: 'Stay calm and composed', list: ['Do not mirror their emotional state.'] },
            { title: 'Acknowledge without feeding the emotion', list: ['**"I can see this is important to you. Let\'s work through it constructively."**'] },
            { title: 'Propose a break if emotions escalate', list: ['**"Would a 10-minute pause help us reset?"**'] },
          ],
          ethics: ['Express genuine passion to emphasise importance. Never fake an outburst.', 'Be careful not to manipulate emotionally vulnerable counterparts.'],
          scenes: [sc.outburstScene],
          after: [{ t: 'research', added: true, title: 'Why anger extracts concessions', text: `Van Kleef, De Dreu and Manstead found that negotiators conceded more to an **angry** counterpart than to a happy one. They read the anger as a sign that the other side was close to its limit, and adjusted their demands. Knowing this helps you separate the emotion from the information: acknowledge the feeling, then ask for the facts behind it before you move.`, cite: ['vankleef2004'] }],
        }),
        tactic({
          id: 'l2-silence', title: 'Silence', image: 'silence', ratio: '1024/874',
          alt: 'A woman in a library holding a finger to her lips',
          def: 'A non-verbal pressure tactic where one side says nothing after an offer or proposal, creating discomfort.',
          why: 'Human beings are hardwired to dislike silence in conversation. It often pressures the other party to **fill the void**, sometimes with concessions.',
          signs: ['Long pauses after your statements or offers.', 'A blank stare without engagement.'],
          counter: [
            { title: 'Stay calm', list: ['Don\'t interpret silence as rejection.'] },
            { title: 'Maintain your position', list: ['**"I\'ll give you a moment to consider the offer."**'] },
            { title: 'Use silence yourself', list: ['Wait for their reaction.'] },
          ],
          ethics: ['Allow your counterpart time to think.', 'Use it to test how strongly they feel about their position.'],
          scenes: [sc.silenceScene],
          after: [{ t: 'research', added: true, title: 'Silence can create value', text: `Curhan and colleagues studied pauses of **three seconds or more** in negotiations. Extended silence was linked to more value creation and better joint outcomes: it moved negotiators into a more deliberative mindset and away from "fixed-pie" thinking. They found no evidence that silence helped one side claim more at the other's expense. Used ethically, silence is less a pressure tool than a thinking tool.`, cite: ['curhan2022'] }],
        }),
        tactic({
          id: 'l2-flinch', title: 'The flinch', image: 'flinch', ratio: '510/1024',
          alt: 'A young woman with crossed arms, frowning in disbelief',
          def: 'An exaggerated physical or verbal reaction to an offer, intended to signal shock and discomfort.',
          why: 'It triggers **self-doubt** in the proposer and often leads to a quick concession.',
          signs: ['Recoiling, raised eyebrows or gasping.', 'Repeated phrases like "That\'s way too high!"'],
          counter: [
            { title: 'Remain confident and composed', list: ['Your number didn\'t change because they reacted to it.'] },
            { title: 'Don\'t defend too quickly', list: ['Pause and allow the reaction to settle.'] },
            { title: 'Walk through your rationale calmly', list: ['**"Let\'s walk through how we arrived at that figure."**'] },
          ],
          ethics: ['Use it sparingly, to signal genuine discomfort or pushback.', 'Pair it with a justification or alternative options.'],
          scenes: [sc.flinchBusinessScene, sc.flinchBudgetScene],
          after: [{ t: 'callout', tone: 'key', title: 'Offer structure, not concessions', text: 'In both scripts, the response to the flinch is to explain, then offer to adjust the **scope** (fewer services, a smaller group), never the **rate**. This keeps your price credible.' }],
        }),
        ...practice('l2', act.spotPressure, act.counterPressure),
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: '3 · Numbers and trades',
      steps: [
        tactic({
          id: 'l3-highball', title: 'Highball / lowball', image: 'highball', ratio: '1024/980',
          alt: 'Two brass candlesticks on a desk, with a price chart rising and falling between them',
          def: 'An extreme initial offer, designed to skew the negotiation range.',
          why: 'It sets an **anchor**. The final agreement often gravitates toward the initial position.',
          signs: ['Their offer is wildly unrealistic or outside the norms.'],
          counter: [
            { title: 'Don\'t respond emotionally', list: ['Re-anchor with market data.'] },
            { title: 'Ask how they got there', list: ['Ask questions to reveal how they arrived at their number.', '**"Can you walk me through how you arrived at that figure?"**'] },
            { title: 'Align on benchmarks first', list: ['**"Let\'s align on industry benchmarks before discussing figures."**'] },
          ],
          ethics: ['Start with an ambitious ask that is justifiable.', 'Be ready to explain your rationale clearly.'],
          scenes: [sc.lowballScene],
          after: [{ t: 'research', added: true, title: 'How to resist an extreme anchor', text: `Galinsky and Mussweiler confirmed that first offers act as strong anchors. They also found a way to neutralise them: when the person receiving the offer focused on the other side's **alternatives and limits**, or on their own **target**, the first offer lost its advantage. Before you respond to a highball or lowball, remind yourself of your target and of the market data.`, cite: ['galinsky2001'] }],
        }),
        tactic({
          id: 'l3-bracketing', title: 'Bracketing', image: 'bracketing', ratio: '644/1024',
          alt: 'A pair of brass brackets on a dark, reflective surface',
          def: 'Placing your offer at the high or low end of the other party\'s stated range, to shift the midpoint.',
          why: 'The brain tends to gravitate toward the **midpoint** of a range, so a calculated placement influences the final agreement.',
          signs: ['Counter-offers that deliberately frame new ranges.', 'Over-emphasis on midpoint logic.'],
          counter: [
            { title: 'Anchor first when possible', list: ['If your number is the first on the table, there is less room to bracket you.'] },
            { title: 'State your range and its rationale', list: ['Explain what your range is based on.'] },
            { title: 'Challenge their midpoint', list: ['**"Let\'s not just average numbers. Let\'s focus on what\'s fair."**'] },
          ],
          ethics: ['Use bracketing when you know their range and can safely pull it in your favour.', 'Pair it with data: **"You mentioned $90–$100. We\'re offering $91 based on last quarter\'s benchmarks."**'],
          scenes: [sc.bracketingScene],
          after: [
            { t: 'diagram', name: 'AnchorBracket', caption: 'The same conversation on one number line (in thousands). You anchor first at 110. They answer with a range of 90–100. You bracket at 98, not at the midpoint of 95.' },
            { t: 'callout', tone: 'key', title: 'A simple way to remember the difference', list: ['**Anchoring** decides where the conversation **starts**.', '**Bracketing** decides where the conversation **settles**.'] },
          ],
        }),
        tactic({
          id: 'l3-bogey', title: 'The bogey', image: 'bogey', ratio: '700/1024',
          alt: 'A cartoon businessman holding out a green apple, with a red apple behind it',
          def: 'Pretending something is very important when it\'s not, to use it as a bargaining chip.',
          why: 'It misleads the other party into making a **bigger concession**.',
          signs: ['Overemphasis on a secondary issue.', 'A sudden willingness to drop that issue later.'],
          counter: [
            { title: 'Probe deeply', list: ['**"Why is that a priority for you?"**'] },
            { title: 'Ask for trades', list: ['**"If that\'s crucial, what can you offer in return?"**'] },
            { title: 'Observe', list: ['Notice whether they give up the issue too easily. A "critical" point that is dropped in one move was rarely critical.'] },
          ],
          ethics: ['Use it when you can afford to concede on minor points to protect your core interests.', '**Example:** you emphasise on-site training as critical, then drop it in exchange for extended payment terms.'],
          scenes: [sc.bogeyScene],
          after: [{ t: 'callout', tone: 'warn', title: 'Keep the bogey honest', text: 'The issue you emphasise should be something you genuinely value, even if it matters less than your core interest. Never invent a dealbreaker, and never make claims that aren\'t true (for example, that you\'ve turned down roles over an issue when you haven\'t). As with the red herring in Lesson 4: never fabricate.' }],
        }),
        tactic({
          id: 'l3-nibbling', title: 'Nibbling', image: 'nibbling', ratio: '832/1024',
          alt: 'A close-up of a woman taking a small bite of a piece of cheese',
          def: 'Asking for small additional concessions after the main deal is reached.',
          why: 'After major negotiations, people want to **conclude**, so they give in.',
          signs: ['"Just one more thing…"', 'Asking for extras after the agreement.'],
          counter: [
            { title: 'Use closure language', list: ['**"Let\'s finalise everything in writing."**'] },
            { title: 'Tie concessions to reciprocation', list: ['**"What will you add on your side?"**'] },
            { title: 'Set terms', list: ['**"We need to freeze the scope before moving to contract."**'] },
          ],
          ethics: ['Request add-ons that don\'t cost the other side much but bring you significant benefit.'],
          scenes: [sc.nibblingScene],
        }),
        tactic({
          id: 'l3-cherry', title: 'Cherry picking', image: 'cherry', ratio: '842/1024',
          alt: 'A hand reaching to pick one ball from a row of coloured balls',
          def: 'Accepting only the most favourable parts of an offer and rejecting the rest.',
          why: 'It can weaken the comprehensive value of your proposal and force you to **renegotiate one-sidedly**.',
          signs: ['"We\'ll take this discount, but not the volume commitment."', 'Ignoring the interdependencies in the deal.'],
          counter: [
            { title: 'Reinforce the interlinkages', list: ['**"This pricing is tied to that commitment. They\'re part of a single package."**'] },
            { title: 'Offer alternatives', list: ['**"If you\'d prefer option A without volume, option B would be priced differently."**'] },
          ],
          ethics: ['Focus on the parts of their offer that most benefit you, but expect trade-offs.', 'Negotiate bundles while holding firm on key linkages.'],
          scenes: [sc.cherryScene],
          after: [{ t: 'research', added: true, title: 'Offer packages, not pieces', text: `Leonardelli and colleagues studied **multiple equivalent simultaneous offers** (MESOs): two or three complete packages, each equally good for you, presented together. Negotiators who made MESOs reached better economic outcomes and were seen as more flexible. Packages also make cherry picking harder, because every option already links price to terms.`, cite: ['leonardelli2019'] }],
        }),
        ...practice('l3', act.spotNumbers, act.counterNumbers),
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · Distraction and confusion',
      steps: [
        tactic({
          id: 'l4-herring', title: 'Red herring', image: 'redherring', ratio: '1002/1024',
          alt: 'A red herring lying on a bed of salt',
          def: 'A distraction tactic where irrelevant or exaggerated issues are raised to sidetrack the discussion.',
          why: 'It **confuses and misleads**, drawing focus away from the critical terms.',
          signs: ['Repeatedly revisiting minor issues.', 'Shifting the topic when progress is made.'],
          counter: [
            { title: 'Ask how it connects', list: ['**"Can you help me understand how this relates to the core of our agreement?"**'] },
            { title: 'Table side issues', list: ['**"Let\'s park this for now and return once key terms are settled."**'] },
            { title: 'Document agreements', list: ['Write down what you agreed, to prevent re-litigation.'] },
          ],
          ethics: ['Introduce non-critical issues early, to trade them later.', 'Never fabricate problems: only use valid but low-priority concerns.'],
          scenes: [sc.redHerringScene],
        }),
        tactic({
          id: 'l4-strawman', title: 'Strawman proposal', image: 'strawman', ratio: '1024/998',
          alt: 'A straw figure standing on torn papers with the words Deception and Falsehood',
          def: 'Misrepresenting the other side\'s position in a simplified, extreme or ridiculous way, to attack or reject it.',
          why: 'It puts you **on the defensive**, forcing you to correct misinterpretations instead of advancing your case.',
          signs: ['You hear distorted versions of your proposal.', 'Responses begin with "So you\'re saying…", followed by an exaggeration.'],
          counter: [
            { title: 'Clarify immediately', list: ['**"That\'s not what I said. Let me explain it again more precisely."**'] },
            { title: 'Ask them to restate it', list: ['Ask them to repeat your position in their own words.'] },
            { title: 'Refocus', list: ['**"Let\'s base the discussion on what was actually proposed."**'] },
          ],
          ethics: ['Highlight flaws in vague or weak arguments, but never fabricate.', 'Use it to stress-test a proposal.'],
          scenes: [sc.strawmanScene],
        }),
        tactic({
          id: 'l4-dumb', title: 'Playing dumb', image: 'dumb', ratio: '848/1024',
          alt: 'A smiling man in a grey suit wearing a yellow hat with the word DUMB on it',
          def: 'Pretending not to understand, in order to delay, avoid commitment or frustrate the process.',
          why: 'It places the **burden of explanation** on the other party and disrupts momentum.',
          signs: ['Asking the same basic questions repeatedly.', 'Misstating obvious terms or concepts.'],
          counter: [
            { title: 'Use documentation', list: ['**"Let me show you this in writing."**'] },
            { title: 'Ask clarifying questions', list: ['**"Which part is unclear?"**'] },
            { title: 'Reframe step by step', list: ['**"Let\'s go step by step together."**'] },
          ],
          ethics: ['Slow down fast-moving discussions to buy thinking time.', 'Use it to gather more information or clarify complex terms.'],
          scenes: [sc.playingDumbScene],
        }),
        tactic({
          id: 'l4-overwhelm', title: 'Overwhelming with information', image: 'overwhelm', ratio: '490/1024',
          alt: 'A man looking straight ahead, with a tower of documents and screens stacked above his head',
          def: 'Bombarding the other party with excessive data, charts, jargon or details, to dominate the conversation.',
          why: 'It creates **confusion and fatigue**, and deflects from the real issues.',
          signs: ['Giant packets of printouts mid-meeting.', 'Hyper-technical language or irrelevant statistics.'],
          counter: [
            { title: 'Ask for summaries', list: ['**"What\'s the key point from this section?"**'] },
            { title: 'Prioritise', list: ['**"Let\'s focus on the 3 biggest drivers."**'] },
            { title: 'Take control', list: ['**"Let\'s revisit the core issues we\'re here to resolve."**'] },
          ],
          ethics: ['Provide data for transparency, not intimidation.', 'Summarise the key points upfront, and offer the full details as backup.'],
          scenes: [sc.overwhelmBusinessScene, sc.overwhelmSupplierScene],
        }),
        tactic({
          id: 'l4-delay', title: 'Deliberate delay', image: 'delay', ratio: '760/1024',
          alt: 'A man in a suit reading a document stamped DELAY',
          def: 'Slowing the process intentionally to exhaust the other party, gain time or seek better options.',
          why: 'It increases pressure, encourages **impatience** and can wear down commitment.',
          signs: ['Postponed meetings and slow email replies.', 'Endless internal reviews: "We\'re still waiting on sign-off."'],
          counter: [
            { title: 'Set explicit timelines', list: ['**"We\'ll need confirmation by [date] to stay on track."**'] },
            { title: 'Escalate diplomatically', list: ['**"Is there someone who can help us move this forward?"**'] },
            { title: 'Prepare a drop-dead date', list: ['**"We\'ll need to explore other options if we can\'t progress this week."**'] },
          ],
          ethics: ['Delay when you need time for due diligence or internal alignment.', 'Be transparent about the reason, to avoid eroding trust.'],
          scenes: [sc.delayScene],
        }),
        ...practice('l4', act.spotDistraction, act.counterDistraction),
      ],
    },
    {
      id: 'l5', kind: 'lesson', title: '5 · Authority, teams and closing',
      steps: [
        tactic({
          id: 'l5-goodcop', title: 'Good cop / bad cop', image: 'goodcop', ratio: '910/1024',
          alt: 'A stern man and a smiling woman sitting side by side at a conference table',
          def: 'Two negotiators take opposing roles: one aggressive, the other friendly. The goal is to create pressure and relief.',
          why: 'The contrast generates **psychological relief**. The "good cop" appears cooperative, which increases your likelihood to agree.',
          signs: ['One person is harsh and inflexible, the other warm and understanding.', 'They bounce you between the two for decision-making.'],
          counter: [
            { title: 'Stay neutral', list: ['Don\'t be emotionally drawn in by either voice.'] },
            { title: 'Name the roles and return to the facts', list: ['**"I sense you\'re playing different roles. Let\'s focus on the facts."**'] },
            { title: 'Ask for joint decision-making', list: ['**"Can we get everyone needed for this decision in the room?"**'] },
          ],
          ethics: ['Assign team roles where one person probes hard questions and another builds rapport.', 'Don\'t let the good cop undermine the bad cop\'s credibility to gain trust.', 'Use it only if you maintain transparency later in the process.'],
          scenes: [sc.goodCopScene],
          after: [{ t: 'research', added: true, title: 'The order matters', text: `Brodt and Tuchinsky tested the good cop / bad cop tactic in negotiation experiments. The tactic worked when the **bad cop went first** and the good cop followed: the relief after the tough opening made the friendly offer feel generous. The reverse order did not work. When a tough voice suddenly gives way to a warm one, that is your cue to stay neutral and go back to the data.`, cite: ['brodt2000'] }],
        }),
        tactic({
          id: 'l5-limited', title: 'Limited authority', image: 'limited', ratio: '1024/882',
          alt: 'A wooden signpost reading NO AUTHORITY in an empty field at dusk',
          def: 'Claiming the lack of power to make decisions, often used to delay or avoid agreement.',
          why: 'It reduces accountability and makes you feel obligated to **compromise** in the hope of gaining approval.',
          signs: ['"I need to check with my manager."', 'Postponing commitments after a productive discussion.'],
          counter: [
            { title: 'Confirm authority at the start', list: ['**"Are you the person signing off on this?"**'] },
            { title: 'Bring in the decision-maker', list: ['**"Who is the final decision-maker? Can they join the next meeting?"**'] },
          ],
          ethics: ['Use it to buy yourself time to evaluate terms.', 'Push back diplomatically: **"I like this, but let me confirm it aligns with internal policy."**'],
          scenes: [sc.limitedAuthorityScene],
        }),
        tactic({
          id: 'l5-higher', title: 'Appealing to higher authority', image: 'higher', ratio: '556/1024',
          alt: 'A businesswoman pointing upward in front of a screen reading Higher Authority',
          def: 'Citing a manager, the legal department or an unseen stakeholder as a reason not to agree to terms.',
          why: 'It **deflects pressure** and stalls progress without direct confrontation.',
          signs: ['"I need to run this by my boss."', '"Our legal team won\'t approve that."'],
          counter: [
            { title: 'Confirm decision ownership early', list: ['**"Before we go further, who has final approval, so we can align appropriately?"**'] },
            { title: 'Pin down the real objection', list: ['**"What specific concern would they have with this term?"**'] },
            { title: 'Convert escalation into joint problem-solving', list: ['**"Would it be useful to address those concerns together before it goes for review?"**'] },
            { title: 'Request access or accountable representation', list: ['**"Can we include them directly, or can you represent their position so we avoid rework?"**'] },
            { title: 'Impose a clear approval timeline', list: ['**"When should we expect their feedback, so we can keep this moving on our side?"**'] },
            { title: 'Protect your leverage after agreement', list: ['**"These terms were agreed in the context of closing today. We can hold them for [hours or days]. Any extended delay would require us to revisit the structure."**'] },
          ],
          ethics: ['Use it to buy time for internal validation.', 'Frame it as a collaborative review rather than stonewalling.'],
          scenes: [sc.higherAuthorityScene],
          before: [{ t: 'callout', tone: 'key', title: 'Limited or higher authority?', list: ['**Limited authority:** "I can\'t decide this." The person claims they lack the power.', '**Higher authority:** "Someone above me won\'t approve this." The person points to an unseen decision-maker.', 'The counters overlap: find out who decides, what their real concern is, and when you will hear back.'] }],
        }),
        tactic({
          id: 'l5-divide', title: 'Divide and conquer', image: 'divide', ratio: '874/1024',
          alt: 'A chessboard broken apart, with pieces scattered across the cracks',
          def: 'Exploiting team dynamics to create misalignment or to pressure individuals.',
          why: 'It reduces **cohesion** and can isolate more compliant team members.',
          signs: ['Attempts to speak to individuals privately.', 'Comments like "You seem more reasonable than your colleague."'],
          counter: [
            { title: 'Maintain a unified front', list: ['**"I appreciate that, but we are aligned as a team."**'] },
            { title: 'Use time-outs to regroup', list: ['**"Let\'s take a few minutes to align internally and come back with a clear response."**'] },
            { title: 'Assign clear speaking roles within your team', list: ['For example: one person covers commercial terms, the other covers scope and delivery.'] },
          ],
          ethics: ['Engage champions or influencers within the opposing team to build support.'],
          scenes: [sc.divideScene],
        }),
        tactic({
          id: 'l5-lastminute', title: 'Last-minute changes', image: 'lastminute', ratio: '592/1024',
          alt: 'A pocket watch lying on a wooden table, its dial reading Last Min',
          def: 'Making unexpected or significant modifications to the deal at the final moment.',
          why: 'It leverages **momentum and time investment** to force acceptance without full evaluation.',
          signs: ['"Before we sign, we just need to add this clause…"', 'New terms surfacing after prior consensus.'],
          counter: [
            { title: 'Slow down the process', list: ['**"This changes our understanding. Let\'s review all impacts."**'] },
            { title: 'Reopen the discussion if needed', list: ['A new term can reopen the terms that were traded for it.'] },
            { title: 'Be ready to walk away', list: ['**"We can\'t accept this without proper review."**'] },
          ],
          ethics: ['Clarify outstanding issues early.', 'Present additions as clarifications or minor adjustments, and only when that is what they really are.'],
          scenes: [sc.lastMinuteBusinessScene, sc.lastMinuteOfferScene],
        }),
        ...practice('l5', act.spotAuthority, act.counterAuthority),
      ],
    },
    {
      id: 'l6', kind: 'lesson', title: '6 · Putting it together',
      steps: [
        {
          id: 'l6-reference', title: 'Quick reference: 20 tactics',
          blocks: [
            { t: 'lead', text: 'Keep this table to hand before any important negotiation. For each tactic: the sign to watch for, and your first counter.' },
            { t: 'table', head: ['Tactic', 'Warning sign', 'Your first counter'], rows: [
              'Pressure',
              ['Ultimatums and threats', '"Final offer", "If you don\'t agree, we\'ll cancel."', '"Is that truly your final position?" or "Is that the outcome you\'re hoping for?"'],
              ['False deadline', 'A deadline with no reason, or one that shifts', '"What happens if we take another day to decide?"'],
              ['Emotional outburst', 'Sudden yelling, tears, "This is outrageous!"', 'Stay calm. "Would a 10-minute pause help us reset?"'],
              ['Silence', 'A long pause and a blank stare after your offer', '"I\'ll give you a moment to consider the offer."'],
              ['The flinch', 'A gasp: "That\'s way too high!"', 'Pause. "Let\'s walk through how we arrived at that figure."'],
              'Numbers and trades',
              ['Highball / lowball', 'An offer far outside the norms', 'Re-anchor with market data. Ask how they got there.'],
              ['Bracketing', 'New ranges and midpoint logic', '"Let\'s not just average numbers. Let\'s focus on what\'s fair."'],
              ['The bogey', 'A secondary issue overemphasised, then dropped', '"If that\'s crucial, what can you offer in return?"'],
              ['Nibbling', '"Just one more thing…" after agreement', '"What will you add on your side?"'],
              ['Cherry picking', 'Taking the discount but not the commitment', '"They\'re part of a single package."'],
              'Distraction and confusion',
              ['Red herring', 'A topic change whenever progress is made', '"How does this relate to the core of our agreement?"'],
              ['Strawman', '"So you\'re saying…" plus an exaggeration', '"That\'s not what I said. Let me explain it more precisely."'],
              ['Playing dumb', 'The same basic questions, again and again', '"Which part is unclear?" Show it in writing.'],
              ['Overwhelming with information', 'Giant packets, jargon, irrelevant stats', '"Let\'s focus on the 3 biggest drivers."'],
              ['Deliberate delay', 'Postponed meetings, "still waiting on sign-off"', '"We\'ll need confirmation by [date] to stay on track."'],
              'Authority, teams and closing',
              ['Good cop / bad cop', 'One harsh voice, one warm voice', '"Let\'s focus on the facts."'],
              ['Limited authority', '"I need to check with my manager."', '"Who is the final decision-maker? Can they join?"'],
              ['Higher authority', '"Legal won\'t approve that."', '"What specific concern would they have with this term?"'],
              ['Divide and conquer', '"You seem more reasonable than your colleague."', '"We are aligned as a team." Take a time-out.'],
              ['Last-minute changes', '"Before we sign, we just need to add…"', '"This changes our understanding. Let\'s review all impacts."'],
            ], caption: 'The 20 tactics of this module, with the warning sign and the first counter for each.' },
          ],
        },
        {
          id: 'l6-roleplay', title: 'Role-play: the fleet-management deal',
          blocks: [
            { t: 'lead', text: 'Real negotiations rarely use one tactic at a time. In this role-play, a vendor uses several. Spot each one, and choose your counter.' },
            { t: 'activity', ...act.vendorRoleplay },
            { t: 'liveSpar', scenario: 'fleet' },
            { t: 'reflect', id: 'r-tactics', prompt: 'Think about your next important negotiation. Which two tactics are you most likely to face? Write the warning sign you will watch for, and the exact sentence you will use to counter each one.' },
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
    'Decode every tactic with five questions: what it is, why it works, its warning signs, how to counter it and how to use it ethically.',
    'A tactic loses most of its power the moment you recognise it. Name it calmly and return to the facts.',
    'Pressure tactics (ultimatums, threats, deadlines) feed on fear and urgency. Counter them with calibrated questions and a real BATNA.',
    'Stay composed under emotion: don\'t mirror an outburst, don\'t fill every silence, and don\'t defend too quickly after a flinch.',
    'Re-anchor extreme offers with market data, and challenge midpoint logic: anchoring decides where the conversation starts, bracketing decides where it settles.',
    'Protect the package: tie every extra to something in return, freeze the scope in writing, and keep linked terms linked.',
    'Bring distractions back to the core: ask how it connects, park side issues, ask for summaries and set clear timelines.',
    'Confirm who decides at the start. Find the real objection behind "my boss" or "legal", and agree when you will hear back.',
    'Keep your team united with clear roles and time-outs, and slow down when new terms appear at the last minute.',
    'Every tactic has an honest version. Use real deadlines, real consequences and real priorities. Never fabricate.',
  ],
  worksheet: {
    file: 'worksheets/module-07-resistance-to-resolution-worksheet.pdf',
    title: 'From Resistance to Resolution: Objection Planner',
    pages: 4,
    contents: ['Tactic forecast and counter scripts', 'Warning-sign checklist for all 20 tactics', 'Tactic log for use during the negotiation', 'My lines for pressure moments', 'Team roles and time-out signal', 'Integrity check for my own tactics', 'After-action review'],
  },
}

export default m7
