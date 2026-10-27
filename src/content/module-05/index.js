// Module 5 content. Source: "Chapter 5: Win Before You Begin - The Ultimate Preparation Framework"
// by Raad Kirmani.
// Blocks of type 'research' (and items marked { added: true }) are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import { batnaScene, stageScene } from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m5/${name}.webp`

const m5 = {
  id: 'm5',
  number: 5,
  title: 'Win Before You Begin',
  subtitle: 'The Ultimate Preparation Framework',
  cover: img('cover'),
  coverAlt: 'A composed professional sitting at a meeting table, hands folded, ready to negotiate',
  tags: ['Goals', 'BATNA', 'Leverage'],
  duration: '95–110 min',
  author: 'Raad Kirmani',
  summary: `Develop a proven system for strategic preparation that gives you a decisive edge before any negotiation begins. In this module you learn to set clear goals and priorities, to analyse both your BATNA (Best Alternative to a Negotiated Agreement) and your counterpart's, and to recognise the different forms of leverage and use them with integrity. With this framework, you enter every negotiation with structure, adaptability and the confidence to guide the discussion toward favourable outcomes.`,
  objectives: [
    'Explain why thorough preparation, of both tangible and intangible factors, decides most negotiations before they start.',
    'Set an ideal outcome, a walk-away point, affordable trade-offs and a clear hierarchy of priorities.',
    'Identify, strengthen and leverage your BATNA, and use it as confidence rather than a threat.',
    'Evaluate the other party\'s BATNA from research, questions and the clues they give away, and find the ZOPA between both walk-away points.',
    'Recognise positive, negative and normative leverage, and blend them in a collaborative way.',
    'Run a negotiation with the five-step execution framework, and prepare with the ultimate preparation checklist.',
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · Why preparation wins',
      steps: [
        {
          id: 'l1-importance', title: 'The importance of thorough preparation',
          blocks: [
            { t: 'lead', text: `Most negotiations are won or lost before anyone sits down at the table.` },
            { t: 'cards', items: [
              { eyebrow: '1', title: 'Time investment', img: img('time'), color: 'var(--b-assertive)', list: [
                'Effective negotiators spend more time preparing than negotiating.',
                'For every hour of negotiation, **3–5 hours** are typically spent on preparation.',
                'Preparation is crucial for achieving favourable outcomes.',
              ] },
              { eyebrow: '2', title: 'Tangible and intangible factors', img: img('tangible'), color: 'var(--orange)', list: [
                'Preparation includes **tangible** factors like pricing and market data.',
                '**Intangible** factors such as values, motivations and negotiation style are equally important.',
                'Successful negotiators create detailed profiles of their counterparts.',
                'Market conditions are analysed to inform strategy.',
                'Multiple scenarios are prepared to anticipate various outcomes.',
              ] },
              { eyebrow: '3', title: 'Strategic framework', img: img('framework'), color: '#6b5bd2', list: [
                'A structured preparation approach provides a strategic advantage.',
                'Develop clear objectives to guide the negotiation.',
                'Identify potential obstacles and prepare responses to objections.',
                'Establish ideal outcomes and acceptable compromises.',
                'A solid framework ensures focus and covers critical aspects in complex negotiations.',
              ] },
            ] },
            { t: 'diagram', name: 'PrepRatio', caption: 'For every hour at the table, skilled negotiators invest three to five hours in preparation, across both tangible and intangible factors.' },
            { t: 'research', added: true, title: 'What skilled negotiators do differently when they plan', text: `In a classic study, researchers at Huthwaite observed experienced negotiators who were rated as highly effective by both sides, and compared how they planned with average negotiators. The skilled negotiators considered **about twice as many options** for each issue (5.1 versus 2.6), and they gave **more than three times as much attention to common ground** (38% of their planning comments, versus 11%). They also set **ranges** with upper and lower limits, rather than a single fixed point, and planned each issue on its own instead of locking in a rigid sequence. The rest of this module gives you exactly those tools: ranges, alternatives and a flexible plan.`, cite: ['rackham1978'] },
            { t: 'reflect', id: 'r-l1', prompt: `Think of your last important negotiation. Roughly how long did you prepare, and what did you prepare: only the numbers, or also the other person's motivations and style? What would you add next time?` },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · Setting clear goals and priorities',
      steps: [
        {
          id: 'l2-goals', title: 'Preliminary prep: three layers of goals',
          blocks: [
            { t: 'person', img: img('goals'), alt: 'A professional mapping a strategic plan on a whiteboard', eyebrow: 'Preliminary prep', name: 'Know what you want, and what you won\'t accept', text: `Before you think about the other side, get clear on your own goals. Three layers build on each other, from the outcomes you aim for to the limits you won't cross.` },
            { t: 'steps', items: [
              { title: 'Ideal and minimum outcomes', list: [
                'Establish acceptable result ranges to guide your strategy.',
                'Your **ideal** is the best realistic result; your **minimum** is the least you can accept.',
              ] },
              { title: 'Define walk-away points and trade-offs', list: [
                'Define clear limits and affordable concessions to avoid unfavourable agreements.',
                'Your **walk-away point** is the lowest acceptable deal: below it, your alternative is better.',
                '**Trade-offs** are the things you can give, to get what matters more.',
              ] },
              { title: 'Prioritise key elements', list: [
                'Keep focus on the essentials while maintaining flexibility on the rest.',
                'Know which items are must-haves, which are important, and which you can trade.',
              ] },
            ] },
            { t: 'diagram', name: 'GoalRange', caption: 'Example: a job offer. You negotiate inside your range, aim toward your ideal, and never go below your walk-away point. Below it, your BATNA is the better choice.' },
            { t: 'callout', tone: 'key', title: 'Important', text: `By establishing a clear hierarchy of goals, from defining outcomes to setting limits and prioritising key elements, you create a strong foundation for successful negotiations.` },
            { t: 'research', added: true, title: 'Aim at your ideal, not at your minimum', text: `Where you put your attention during a negotiation changes the result. In three experiments, negotiators who kept their **ideal target** in mind reached **objectively better deals** than those who focused on their minimum. There was a twist: they felt *less* satisfied, because they compared the result with their ambitious target. Reminding them afterwards of their minimum restored their satisfaction. The lesson for preparation: write down both numbers, negotiate toward the ideal, and judge the outcome against your walk-away point.`, cite: ['galinsky2002'] },
          ],
        },
        {
          id: 'l2-practice', title: 'Practice: rank the priorities',
          blocks: [
            { t: 'activity', ...act.priorityTiers },
            { t: 'reflect', id: 'r-l2', prompt: `For a negotiation you are preparing, write your ideal outcome, your walk-away point, two must-haves and two things you could trade.` },
          ],
        },
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: '3 · Understanding and leveraging your BATNA',
      steps: [
        {
          id: 'l3-what', title: 'What a BATNA is, and why it matters',
          blocks: [
            { t: 'person', img: img('batna'), ratio: '960/820', alt: 'Two professionals facing each other across a small negotiating table', eyebrow: 'BATNA', name: 'Best Alternative to a Negotiated Agreement', text: `Your BATNA is what you will do if this negotiation doesn't produce a deal. It is your **safety net** and your **source of power**: the better your alternative, the less you need this particular deal.` },
            { t: 'p', text: `Understanding and developing your BATNA is essential for successful negotiations. It works in four steps: three on your side, and one on theirs.` },
            { t: 'diagram', name: 'BatnaSteps', caption: 'The four steps of working with BATNAs. Each step has its own page in this lesson.' },
            { t: 'callout', tone: 'tip', title: 'BATNA and walk-away point', text: `They are connected, but not the same. Your **BATNA** is the alternative itself ("Supplier B at $16/unit"). Your **walk-away point** is the worst deal you would accept before choosing that alternative. A stronger BATNA raises your walk-away point.` },
          ],
        },
        {
          id: 'l3-identify', title: 'Step 1: Identify your fallback plan',
          blocks: [
            { t: 'p', text: `**Goal:** know exactly what you'll do if the deal doesn't happen.` },
            { t: 'steps', items: [
              { title: 'Clarify your objectives', list: ['Write down what you want from the negotiation (e.g. price, timeline, terms).', 'Then ask: **"If I don\'t get this, what will I do instead?"**'] },
              { title: 'List possible alternatives', list: ['What other deals, suppliers, employers or outcomes are available?', 'Include "internal" options (e.g. delaying the project, reallocating resources).'] },
              { title: 'Assess each option\'s value', list: ['Estimate the practical, financial or emotional value of each alternative.', 'Rank them from most to least favourable.'] },
              { title: 'Define your walk-away point', list: ['Identify the lowest acceptable deal: the point at which you\'d prefer your BATNA.', 'Write it down clearly. This keeps you grounded during pressure moments.'] },
              { title: 'Summarise it concisely', list: ['Example: **"If I can\'t secure a supplier under $15/unit by next week, I\'ll use Supplier B\'s $16/unit offer instead."**'] },
            ] },
            { t: 'diagram', name: 'FallbackLadder', caption: 'Rank your alternatives. The best one is your BATNA, and it sets your walk-away point.' },
          ],
        },
        {
          id: 'l3-strengthen', title: 'Step 2: Strengthen your BATNA',
          blocks: [
            { t: 'p', text: `**Goal:** improve your alternatives before you start negotiating.` },
            { t: 'steps', start: 1, items: [
              { title: 'Do market research', list: ['Gather 2–3 realistic alternative options.', 'Know the pricing, timelines or features competitors offer.'] },
              { title: 'Build relationships early', list: ['Reach out to potential partners, vendors or employers, even if you\'re not negotiating yet.', 'A warm relationship makes your alternatives more viable.'] },
              { title: 'Develop internal solutions', list: ['Consider in-house fixes or DIY options (e.g. reassigning resources, adjusting timelines).'] },
              { title: 'Test your fallback', list: ['Validate that your BATNA is actually feasible: get a quote, schedule a meeting or confirm interest.', 'This ensures your alternative isn\'t just theoretical.'] },
              { title: 'Improve your credibility', list: ['Collect data, testimonials or results that make you a more attractive counterpart.', 'The stronger your position, the stronger your BATNA looks.'] },
            ] },
            { t: 'batnaMeter' },
            { t: 'research', added: true, title: 'A better alternative brings a better deal', text: `Experiments on negotiation alternatives have confirmed what this step promises. In a study of two-party negotiations, negotiators who had an **attractive alternative** to settlement claimed a **larger share of the outcome** than negotiators without one. The alternative changed what they were willing to accept, and how firmly they held to it. Strengthening your BATNA before the meeting is one of the few ways to gain power without saying a word at the table.`, cite: ['pinkley1994'] },
          ],
        },
        {
          id: 'l3-leverage', title: 'Step 3: Leverage your BATNA',
          blocks: [
            { t: 'p', text: `**Goal:** use your alternatives to gain better outcomes without being confrontational.` },
            { t: 'steps', items: [
              { title: 'Signal confidence, not threats', list: ['Example: **"We\'re also exploring other partnerships, but I\'d like to see how we can make this work with you."**', 'Avoid saying: "If you don\'t agree, I\'ll go elsewhere."'] },
              { title: 'Negotiate from information, not emotion', list: ['Use facts from your research to justify your position (e.g. market benchmarks, data points).'] },
              { title: 'Stay flexible', list: ['Be willing to adjust terms or explore creative solutions that might improve both sides\' outcomes.'] },
              { title: 'Control your timing', list: ['Reference your BATNA **after** you\'ve built rapport and clearly understood their needs, not too early.'] },
              { title: 'Keep your fallback ready', list: ['Be prepared to walk away gracefully if the offer doesn\'t meet your minimum threshold.'] },
            ] },
            { t: 'table', head: ['Say this (confidence)', 'Not this (threat)'], rows: [
              ['"We\'re also exploring other partnerships, but I\'d like to make this work with you."', '"If you don\'t agree, I\'ll go elsewhere."'],
              ['"Comparable providers quoted between $14.50 and $16 this month."', '"Your competitor is cheaper, so match it."'],
              ['"This doesn\'t meet what we need, so we\'ll go another way for now. I hope we can work together in future."', '"This is insulting. We\'re done."'],
            ] },
            { t: 'scene', ...batnaScene },
            { t: 'activity', ...act.useYourBatna },
          ],
        },
        {
          id: 'l3-theirs', title: 'Step 4: Evaluate the other party\'s BATNA',
          blocks: [
            { t: 'p', text: `**Goal:** know what the other side will do if they don't agree with you.` },
            { t: 'steps', items: [
              { title: 'Research their situation', list: ['Look for recent deals, partnerships or public statements.', 'What pressures or deadlines might they face?'] },
              { title: 'Ask subtle questions', list: ['**"How critical is this timeline for your team?"**', '**"Are you considering other vendors or partners?"**', 'Their responses reveal how strong or weak their BATNA might be.'] },
              { title: 'Listen for clues', list: ['Hesitation, urgency or overconfidence can signal their fallback strength.', 'Pay attention to body language and tone.'] },
              { title: 'Estimate their alternatives', list: ['What options do they realistically have if you walk away?', 'Rank their possible alternatives from strongest to weakest.'] },
              { title: 'Monitor shifts', list: ['Keep track of new information or changes (e.g. market trends, internal changes, new entrants).', 'Update your assessment during the negotiation.'] },
              { title: 'Use insight strategically', list: ['If their BATNA is weak, emphasise the unique value you provide.', 'If it is strong, focus on partnership, differentiation or added value beyond price.'] },
            ] },
            { t: 'diagram', name: 'TheirBatna', caption: 'Research, ask and listen; then estimate their alternatives, keep updating, and use what you learn.' },
            { t: 'activity', ...act.readTheirBatna },
          ],
        },
        {
          id: 'l3-zopa', title: 'Putting both BATNAs together: the ZOPA',
          blocks: [
            { t: 'lead', text: 'Your BATNA sets the least you will accept. Their BATNA sets the most they will give. Put the two limits side by side and you find the space where a deal can happen.' },
            { t: 'steps', items: [
              { title: 'Your walk-away point', list: ['The least you will accept before you prefer your BATNA.', 'Example: you won\'t take less than **€68,000**.'] },
              { title: 'Their walk-away point', list: ['The most they will give before they prefer *their* BATNA.', 'Example: Lena can\'t pay more than **€72,000**, the top of her salary band.', 'You rarely know it for sure: estimate it from your research on their BATNA (Step 4).'] },
              { title: 'The overlap is the ZOPA', list: ['**ZOPA = Zone of Possible Agreement**: every deal both sides prefer to walking away.', 'Here, any salary from €68,000 to €72,000.', 'If the limits don\'t overlap, there is **no ZOPA**: no deal works on these terms.'] },
            ] },
            { t: 'zopa' },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'When there is a ZOPA', title: 'Claim your share of the zone', color: 'var(--b-assertive)', list: ['Aim your first offer near **their** edge of the zone, not yours.', 'Never reveal your walk-away point: it tells them where the zone ends.', 'Use interests and trade-offs (Module 4) to move within the zone.'] },
              { eyebrow: 'When there is no ZOPA', title: 'Change the deal, or walk away', color: 'var(--b-aggressive)', list: ['Add value to widen the zone: other terms, timing, a review, a pilot.', 'Check your estimate: their limit may be higher than you think.', 'If the gap stays, use your BATNA, calmly and with respect.'] },
            ] },
            { t: 'callout', tone: 'key', title: 'Why your BATNA matters here', text: 'A stronger BATNA raises your walk-away point, so more of the zone belongs to you. A weaker BATNA on their side lowers their alternatives and widens the zone. Preparation moves the limits before anyone speaks.' },
            { t: 'research', added: true, title: 'Where the idea comes from, and why the first offer matters', text: `The ZOPA was set out by Harvard decision scientist **Howard Raiffa**, who described every bargain as two reservation prices (walk-away points) on one scale: a deal is possible only where they overlap. Later research showed how much the **first offer** shapes where in the zone you land. In experiments by Galinsky and Mussweiler, the side that made the first offer usually got the better outcome, because the offer **anchors** the discussion. The anchor lost its power when the other side focused on the first party's walk-away point and alternatives, or on their own target. So prepare both: an ambitious but credible first offer, and a clear view of their limits.`, cite: ['raiffa1982', 'galinsky2001'] },
          ],
        },
        {
          id: 'l3-strength', title: 'Weak, moderate and strong BATNAs',
          blocks: [
            { t: 'cards', items: [
              { eyebrow: 'Weak BATNA', title: 'A last resort', color: 'var(--b-aggressive)', list: [
                '**Definition:** a fallback option that offers little value, or is risky, costly or uncertain.',
                '**Use case:** primarily a pressure release or last resort, not a viable alternative.',
              ], example: 'Going to court in a divorce: costly, emotionally draining, and the outcome is uncertain.' },
              { eyebrow: 'Moderate BATNA', title: 'Partial leverage', color: 'var(--orange)', list: [
                '**Definition:** a somewhat acceptable alternative that meets some, but not all, of your goals.',
                '**Use case:** provides partial leverage; you might take it if the deal falls through, but it\'s not ideal.',
              ], example: 'Accepting a job with lower pay but better lifestyle trade-offs.' },
              { eyebrow: 'Strong BATNA', title: 'Freedom to walk away', color: 'var(--b-assertive)', list: [
                '**Definition:** a well-developed, reliable option that is equal to or better than the deal you\'re negotiating.',
                '**Use case:** gives you high bargaining power and the confidence to walk away if needed.',
              ], example: 'Renting your home instead of selling it at a loss: income continues, no pressure to settle.' },
            ] },
            { t: 'p', text: `**BATNA examples**` },
            { t: 'table', head: ['Scenario', 'BATNA', 'Strength', 'Explanation'], rows: [
              ['Job offer negotiation', 'Another job offer with lower pay but better work-life balance', 'Moderate', 'It\'s viable but may not fully meet your goals (e.g. salary).'],
              ['Business partnership', 'Partner with a smaller firm', 'Moderate', 'The alternative achieves the objectives, but with less impact or reach.'],
              ['Buying a car', 'A lower quote from another dealer, or wait for a discount', 'Strong', 'A concrete, often better financial option is available.'],
              ['Divorce settlement', 'Go to court for a potentially better legal judgement', 'Weak', 'Court is costly and time-consuming, and the outcome is uncertain.'],
              ['Real estate sale', 'Rent the property instead of selling at a loss', 'Strong', 'Renting generates income and avoids selling at an unfavourable price.'],
              ['International diplomacy', 'Trade with other partners or focus on domestic production', 'Moderate to strong', 'Depends on the country\'s economic resilience and other partners, but generally viable.'],
            ] },
            { t: 'p', text: `**The same idea in four everyday contexts.** Open each one to see what a strong, medium and weak BATNA looks like, and what it lets you do.` },
            { t: 'table', reveal: '1 · A couple negotiating time commitments (work vs relationship time)', head: ['Strength', 'Example', 'Why it\'s that strength', 'What it lets you do'], rows: [
              ['Strong', 'You already maintain fulfilling social and personal routines (friends, hobbies, independence) outside the relationship.', 'You\'re emotionally balanced and not reliant on your partner to meet all your needs.', 'Negotiate calmly and assertively, not from desperation.'],
              ['Medium', 'You have some personal outlets, but most free time revolves around your partner.', 'Partial independence; a moderate fallback.', 'Push for compromise, but you may still feel pressured to agree.'],
              ['Weak', 'Your life is completely centred on your partner, with no other emotional or social outlets.', 'High emotional dependency; no alternative support.', 'Negotiation becomes fear-driven; it\'s harder to assert needs without anxiety.'],
            ] },
            { t: 'table', reveal: '2 · A family negotiation (adult child and parent discussing living arrangements)', head: ['Strength', 'Example', 'Why it\'s that strength', 'What it lets you do'], rows: [
              ['Strong', 'You have the financial and logistical ability to live independently if needed.', 'A real, viable alternative.', 'Negotiate boundaries respectfully, without fear of losing shelter.'],
              ['Medium', 'You could move out, but it would be financially tight or inconvenient.', 'The option exists, but with some cost or discomfort.', 'Push for compromise, but weigh trade-offs carefully.'],
              ['Weak', 'You have no savings or other living options.', 'Dependence limits alternatives.', 'Shift the focus from leverage to empathy and cooperation.'],
            ] },
            { t: 'table', reveal: '3 · A B2B sales negotiation (selling a product or service)', head: ['Strength', 'Example', 'Why it\'s that strength', 'What it lets you do'], rows: [
              ['Strong', 'Another customer is ready to buy at full price next week.', 'A real alternative sale with comparable value.', 'Walk away from discounts; maintain price integrity.'],
              ['Medium', 'You have other leads in the pipeline, but none are closing yet.', 'Potential, but with timing risk.', 'Some confidence: negotiate value instead of price.'],
              ['Weak', 'This is your only qualified lead this quarter.', 'No immediate substitute sale.', 'Focus on relationship-building, extended contracts or pilot programmes.'],
            ] },
            { t: 'table', reveal: '4 · A job offer negotiation', head: ['Strength', 'Example', 'Why it\'s that strength', 'What it lets you do'], rows: [
              ['Strong', 'You already have another written offer from a reputable company at a higher salary.', 'It\'s concrete, available and valuable: immediate leverage.', 'Negotiate assertively on salary, benefits or flexibility.'],
              ['Medium', 'You\'ve had promising interviews elsewhere, but no offers yet.', 'Possible but uncertain: some leverage, limited pressure.', 'Use cautiously: signal market interest without bluffing.'],
              ['Weak', 'You need the job badly and have no other prospects.', 'No fallback; dependent on one outcome.', 'Focus on long-term potential or non-salary benefits; avoid ultimatums.'],
            ] },
            { t: 'activity', ...act.rateBatna },
            { t: 'reflect', id: 'r-l3', prompt: `For a negotiation coming up, write your BATNA in one sentence ("If I can't…, I'll…"). How strong is it today? Name one action you will take this week to strengthen it, and one clue you will look for about their BATNA.` },
          ],
        },
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · Identifying leverage',
      steps: [
        {
          id: 'l4-types', title: 'Three types of leverage',
          blocks: [
            { t: 'person', img: img('leverage'), alt: 'A negotiation strategy mapped out with sticky notes on a whiteboard', eyebrow: 'Your power in negotiations', name: 'What is leverage?', text: `Leverage represents your **ability to influence the other party's decisions**. Understanding and using it effectively is crucial for successful negotiations. It takes several forms, each with its own strategic value.` },
            { t: 'cards', items: [
              { eyebrow: '1', title: 'Positive leverage', color: 'var(--b-assertive)', text: 'Create win-win situations by emphasising benefits:', list: ['Highlight unique capabilities and resources', 'Demonstrate long-term partnership potential', 'Offer complementary services or products'] },
              { eyebrow: '2', title: 'Negative leverage', color: 'var(--b-aggressive)', text: 'Subtly emphasise potential losses or risks:', list: ['Market competition and opportunity costs', 'Time-sensitive factors or deadlines', 'Business impact of delayed decisions'] },
              { eyebrow: '3', title: 'Normative leverage', color: '#6b5bd2', text: 'Build rapport through shared values:', list: ['Industry standards and best practices', 'Mutual organisational values', 'Shared commitments to sustainability'] },
            ] },
            { t: 'diagram', name: 'LeverageTypes', caption: 'Each type of leverage works on something different: what they want, what they fear losing, or what they believe in.' },
          ],
        },
        {
          id: 'l4-examples', title: 'Leverage in action',
          blocks: [
            { t: 'cards', items: [
              { eyebrow: 'Positive leverage', title: 'Something they want', color: 'var(--b-assertive)', text: '**Definition:** you have something the other party wants or needs: value you can offer.\n**Used when:** you can give something desirable: access, opportunity, benefit or reward.', list: ['"If we move forward today, I can include three months of free onboarding support."', '"We have the distribution network to put your product in front of 5,000 new customers."', '"This partnership would give your team first-mover advantage in your region."'], example: 'Core idea: "If you do this, I can give you something you want."' },
              { eyebrow: 'Negative leverage', title: 'Something they fear losing', color: 'var(--b-aggressive)', text: '**Definition:** you can impose a cost or consequence the other party wants to avoid: loss, delay or disadvantage.\n**Used when:** you control access to something they fear losing, or you can make inaction costly.', list: ['"Delaying the rollout past Q2 means missing out on seasonal demand spikes."', '"If the pilot doesn\'t happen this month, pricing will revert to list next quarter."', '"Other vendors are submitting proposals. If timing is important, we need clarity soon."'], example: 'Core idea: "If you don\'t do this, something you care about may be lost."' },
              { eyebrow: 'Normative leverage', title: 'Something they believe in', color: '#6b5bd2', text: '**Definition:** you appeal to the other party\'s values, standards or past statements: principles they claim to uphold.\n**Used when:** you want to hold someone accountable to what they\'ve said, or to shared norms.', list: ['"Earlier, you said innovation was a top priority. How does delaying align with that goal?"', '"You mentioned wanting to give your team better tools. Doesn\'t this help fulfil that promise?"', '"Industry best practice shows most leaders in your space are already making this shift."'], example: 'Core idea: "Based on your own words and values, you should do this."' },
            ] },
            { t: 'table', head: ['Leverage type', 'What it leverages', 'How it works'], rows: [
              ['Positive', 'What they want', '"If you agree, you gain something."'],
              ['Negative', 'What they fear losing', '"If you don\'t agree, you risk something."'],
              ['Normative', 'What they believe in or value', '"If you want to stay consistent with your values, this is the right move."'],
            ] },
            { t: 'activity', ...act.whichLeverage },
          ],
        },
        {
          id: 'l4-use', title: 'Using leverage effectively',
          blocks: [
            { t: 'person', img: img('leverage-handshake'), alt: 'Two professionals shaking hands in front of a city view', eyebrow: 'Effective usage', name: 'Balance is everything', text: `The key to using leverage effectively is **maintaining balance**. It's important to recognise and use your sources of leverage, and equally crucial to avoid appearing aggressive or manipulative.` },
            { t: 'callout', tone: 'key', title: 'Blend, don\'t bludgeon', text: `The best negotiators seamlessly blend different types of leverage while maintaining a collaborative, problem-solving approach.` },
            { t: 'callout', tone: 'tip', title: 'Leverage shifts', text: `Leverage can change during a negotiation as new information comes to light or circumstances change. Stay alert to these changes and be prepared to adjust your strategy.` },
            { t: 'research', added: true, title: 'Why negative and normative leverage are so powerful, and must be handled with care', text: `Two well-established findings explain the pull of these forms of leverage. **Losses loom larger than gains:** in Kahneman and Tversky's research on decision-making, people reacted more strongly to a potential loss than to a gain of the same size. That is why "you'll miss the seasonal spike" can move someone more than "you'll gain new customers", and also why it can feel like pressure if it is overused. **People want to be consistent** with what they have said and committed to: Cialdini describes this as one of the core principles of influence. Normative leverage works because it invites people to act in line with their own words. Used honestly, it is persuasive; used as a trap, it breeds resentment.`, cite: ['kahneman1979', 'cialdini2021'] },
            { t: 'reflect', id: 'r-l4', prompt: `For your next negotiation, write one example of each type of leverage you could use: positive (what they want), negative (what they'd lose) and normative (what they've said they value). Which one fits the relationship best?` },
          ],
        },
      ],
    },
    {
      id: 'l5', kind: 'lesson', title: '5 · The five-step execution framework',
      steps: [
        {
          id: 'l5-framework', title: 'From preparation to execution',
          blocks: [
            { t: 'lead', text: `Preparation gives you the map. These five steps are how you walk it at the table.` },
            { t: 'steps', items: [
              { title: 'Plan the path', list: ['Define the scope of discussion and expectations.', 'Sequence topics: start with a few easy wins to build trust, then move to the tough issues.', 'Assign team roles and authority clearly.'] },
              { title: 'Set the stage', list: ['Open with a clear agenda and a cooperative tone.', 'Confirm decision-makers and objectives.', 'Signal flexibility, but show confidence in your preparation.'] },
              { title: 'Explore interests', list: ['Ask open questions to uncover what truly matters to them.', 'Listen for priorities, pressures and timing clues.', 'Summarise key themes to show understanding and build rapport.'] },
              { title: 'Shape and trade', list: ['Present offers linked to their interests.', 'Use structured trade-offs: **"If we do X, could you do Y?"**', 'Track concessions and confirm progress as you go.'] },
              { title: 'Close and confirm', list: ['Summarise agreements clearly before ending.', 'Confirm next steps, responsibilities and follow-up timing.', 'Reinforce the relationship: end on respect, not relief.'] },
            ] },
            { t: 'diagram', name: 'ExecPath', caption: 'The five-step execution framework at a glance.' },
            { t: 'scene', ...stageScene },
          ],
        },
        {
          id: 'l5-roleplay', title: 'Role-play: negotiating the offer',
          blocks: [
            { t: 'activity', ...act.salaryRoleplay },
            { t: 'reflect', id: 'r-l5', prompt: `Plan the path for your next negotiation: which easy issue will you start with, which tough issue comes later, and what "If we do X, could you do Y?" trade could you offer?` },
          ],
        },
      ],
    },
    {
      id: 'l6', kind: 'lesson', title: '6 · The ultimate preparation checklist',
      steps: [
        {
          id: 'l6-checklist', title: 'The ultimate preparation checklist',
          blocks: [
            { t: 'person', img: img('checklist'), alt: 'A relaxed, confident professional leaning back in an office chair, smiling', eyebrow: 'Win before you begin', name: 'Eight things to prepare', text: `Use this checklist before every important negotiation. It brings together this module and the tools from Module 4. The downloadable worksheet walks you through each item.` },
            { t: 'steps', items: [
              { title: 'Set clear goals', list: ['Define your ideal and minimum outcomes, walk-away points and acceptable trade-offs.'] },
              { title: 'Develop a strong BATNA', list: ['Actively strengthen your alternatives, and use them subtly as leverage to improve your position.'] },
              { title: 'Understand the other party', list: ['Research their priorities, constraints, negotiation style and past behaviour.'] },
              { title: 'Identify leverage', list: ['Identify and apply positive, negative or normative leverage, adapted to the specific negotiation.'] },
              { title: 'Anticipate obstacles, to be consciously flexible with trade-offs', list: ['Prepare for potential barriers and adjust your strategy to maintain momentum and control. *(See Module 4.)*'] },
              { title: 'Value creation', list: ['Actively brainstorm ways to create mutual value beyond price, focusing on shared interests. *(See Module 4.)*'] },
              { title: 'Execution strategy', list: ['Plan the order and method you\'ll use to conduct the negotiation. Let your strategy steer the process toward your desired outcomes.'] },
              { title: 'Logistics and notes', list: ['Anticipate how logistics (venue, medium and timing) affect outcomes.', 'Keep detailed records for accuracy and efficient follow-up.'] },
            ] },
            { t: 'reflect', id: 'r-l6', prompt: `Which item on the checklist do you usually skip? Write one thing you will do differently in your next preparation.` },
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
    'Effective negotiators spend 3–5 hours preparing for every hour of negotiating, on tangible and intangible factors alike.',
    'Set three layers of goals: ideal and minimum outcomes, walk-away points and trade-offs, and clear priorities.',
    'Your BATNA (Best Alternative to a Negotiated Agreement) is your safety net and your source of power.',
    'Identify your fallback plan, then strengthen it before you start: research, relationships, internal options, testing and credibility.',
    'Your walk-away point is the lowest acceptable deal before you prefer your BATNA. Write it down.',
    'Leverage your BATNA as confidence, not a threat, and only after you have built rapport and understood their needs.',
    'Evaluate their BATNA too: research, ask subtle questions, listen for clues and keep updating.',
    'The ZOPA (Zone of Possible Agreement) lies between your walk-away point and theirs. No overlap means no deal on these terms: change the deal or use your BATNA.',
    'Leverage comes in three forms: positive (what they want), negative (what they fear losing) and normative (what they believe in). Blend them collaboratively.',
    'Execute in five steps: plan the path, set the stage, explore interests, shape and trade, close and confirm.',
    'Use the ultimate preparation checklist before every important negotiation.',
  ],
  worksheet: {
    file: 'worksheets/module-05-win-before-you-begin-worksheet.pdf',
    title: 'Win Before You Begin: Preparation Planner',
    pages: 4,
    contents: ['Goals, walk-away point and priorities', 'My BATNA: alternatives ranked and strengthened', 'Their BATNA: clues and estimate', 'Leverage map', 'Execution plan and logistics', 'After-action review'],
  },
}

export default m5
