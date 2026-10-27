// Module 6 content. Source: "Chapter 6: Shape Their Reality - The Psychology of Perception"
// by Raad Kirmani.
// Blocks of type 'research' (and items marked { added: true }) are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import { salaryAnchorScene, freelancerScene, reciprocityScene } from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m6/${name}.webp`

const m6 = {
  id: 'm6',
  number: 6,
  title: 'Shape Their Reality',
  subtitle: 'The Psychology of Perception',
  cover: img('cover'),
  coverAlt: 'A professional working at her desk in a high-rise office, the city skyline behind her',
  tags: ['Framing', 'Anchoring', 'Reciprocity'],
  duration: '100–115 min',
  author: 'Raad Kirmani',
  summary: `Decisions are rarely driven by facts alone: they are powerfully influenced by perception. This module reveals how to shape those perceptions with integrity, using ethical techniques such as framing, anchoring and positioning. You learn six psychological principles that work together in every negotiation, and how to guide the way your message is received, so that it resonates with clarity, credibility and impact.`,
  objectives: [
    'Explain why perception, not facts alone, drives decisions in a negotiation.',
    'Use loss aversion to frame offers around what the other party stands to lose, with real costs and real deadlines.',
    'Set a strategic anchor, make it credible with data and precise numbers, and counter-anchor when the other side goes first.',
    'Apply the fairness play to justify offers, challenge unfair ones and secure commitment.',
    'Design choices that give the other party autonomy while leading to good outcomes.',
    'Ask calibrated "What" and "How" questions, and use reciprocity by giving genuine value first.',
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · Six principles of perception',
      steps: [
        {
          id: 'l1-six', title: 'Six principles that shape perception',
          blocks: [
            { t: 'lead', text: 'Decisions are rarely driven by facts alone. They are powerfully influenced by how those facts are perceived.' },
            { t: 'person', img: img('principles'), alt: 'Professionals standing in front of a large blank screen in a dark room', ratio: '1440/1104', eyebrow: 'Key negotiation principles', name: 'The foundation of advanced negotiation', text: 'These six psychological principles form the foundation of advanced negotiation. When applied strategically, they work together to help you influence perceptions and shape decisions in your favour.' },
            { t: 'diagram', name: 'SixPrinciples', caption: 'The six principles of this module. Each one has its own lesson.' },
            { t: 'callout', tone: 'key', title: 'With integrity', text: 'Every principle in this module can be used honestly or dishonestly. This course teaches the honest way: real losses, justified anchors, genuine fairness, options that work for both sides, sincere questions and authentic gestures. Used like this, perception builds trust instead of eroding it.' },
            { t: 'research', added: true, title: 'Same facts, different decision', text: `In a famous experiment, Tversky and Kahneman described a disease expected to kill 600 people, and offered two programmes. When the options were framed as lives **saved**, 72% chose the safe programme ("200 people will be saved"). When the *same* options were framed as lives **lost** ("400 people will die"), 78% chose the risky one. Nothing about the facts changed: only the frame. That is the core idea of this module: how you present a fact shapes what people decide.`, cite: ['tversky1981'] },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · Loss aversion',
      steps: [
        {
          id: 'l2-power', title: 'The power of loss aversion',
          blocks: [
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Psychological principle', title: 'Losses hurt twice as much', color: 'var(--b-aggressive)', text: 'Loss aversion is a psychological principle stating that people feel **twice as much pain from loss** as they do pleasure from gain. This can be leveraged to create a sense of urgency and drive negotiations in your favour.' },
              { eyebrow: 'Negotiation application', title: 'Emphasise what they could lose', color: 'var(--b-assertive)', text: 'Instead of highlighting the gains of your offer, emphasise the **potential loss** for the other party if they choose not to accept. This can make your proposal seem more valuable and increase the likelihood of agreement.' },
            ] },
            { t: 'diagram', name: 'ValueCurve', caption: 'The value curve: a loss of €100 feels about twice as strong as a gain of €100. The red line is steeper.' },
            { t: 'cards', cols: 2, imgRatio: '1/1', items: [
              { eyebrow: 'Choosing gains', title: 'Take the safe option', img: img('gains'), color: 'var(--b-assertive)', text: 'A person told they have a **95% chance of receiving $10,000** or a **100% chance of getting $9,499** will usually avoid risk and take the 100% certain, safe choice.' },
              { eyebrow: 'Avoiding losses', title: 'Gamble to avoid the loss', img: img('losses'), color: 'var(--b-aggressive)', text: 'But the same person, told they have a **95% chance of losing $10,000** or a **100% chance of losing $9,499**, will make the opposite choice: risking the bigger 95% option to avoid the loss.' },
            ] },
            { t: 'research', added: true, title: 'How big is the effect?', text: `Kahneman and Tversky's research on decision-making found that the pain of a loss is roughly **twice** the pleasure of an equal gain. In their 1991 work on everyday choices, they showed the same pattern outside the laboratory: people demand far more to give something up than they would pay to get it. In a negotiation, this means the other side weighs what they might **lose** by saying no more heavily than what they might **gain** by saying yes.`, cite: ['tversky1991'] },
          ],
        },
        {
          id: 'l2-apply', title: 'How to apply loss aversion',
          blocks: [
            { t: 'person', img: img('hourglass'), alt: 'An hourglass with sand running through', eyebrow: 'Four strategies', name: 'Make the cost of not acting visible', text: 'These four interconnected strategies help you leverage loss aversion in negotiations. By applying them cyclically throughout your negotiation, you consistently reinforce the potential losses of not taking action, making your proposals more compelling and urgent.' },
            { t: 'steps', items: [
              { title: 'Reframing value', list: ['Frame the same fact to make loss avoidance feel stronger than the gain.', 'Fat content: "This yogurt contains 10% fat." → **"This yogurt is 90% fat-free."**', 'Energy efficiency: "This bulb uses only 30% of the energy of a regular one." → **"This bulb uses 70% less energy."**'] },
              { title: 'Highlight opportunity costs', list: ['Outline potential losses from inaction.', '**"If you don\'t take this course now, you may have to wait six more months for the next intake."**', '**"Every month you delay upgrading, you\'re missing out on potential revenue."**'] },
              { title: 'Leverage scarcity', list: ['Suggest limited availability or exclusive access.', '**"We only have three spots left in this program."**', '**"This version is exclusive to early members. Once it\'s gone, it won\'t be offered again."**'] },
              { title: 'Create time-based urgency', list: ['Emphasise a limited time window for accepting the offer.', '**"This offer expires in 24 hours."**', '**"We can only honor this quote until the end of the week."**'] },
            ] },
            { t: 'diagram', name: 'LossCycle', caption: 'Apply the four strategies cyclically, to keep reinforcing the cost of not acting.' },
            { t: 'callout', tone: 'warn', title: 'Keep it real', text: 'Use loss aversion only with **real** losses: a real deadline, real scarcity, a real cost of waiting. An invented deadline may work once, but when it is discovered, it destroys your credibility.' },
            { t: 'flipCards', items: act.reframeCards, frontLabel: 'Gain frame', backLabel: 'Loss frame', hint: 'Think how you would reframe it, then tap →' },
            { t: 'activity', ...act.lossStrategies },
            { t: 'reflect', id: 'r-loss', prompt: 'Think of an offer you will make soon. Write it once as a gain ("You will get…") and once as a loss ("Without this, you will lose…"). Which is stronger, and is the loss real?' },
          ],
        },
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: '3 · Strategic anchoring',
      steps: [
        {
          id: 'l3-what', title: 'What strategic anchoring is',
          blocks: [
            { t: 'person', img: img('anchor'), alt: 'A small anchor standing on a white platform', ratio: '1440/1148', eyebrow: 'Strategic anchoring', name: 'The first number sets the frame', text: 'Anchoring is a cognitive bias where the first piece of information we receive becomes a mental reference point (the "anchor"). All later judgements are unconsciously adjusted around it, even if the anchor is arbitrary or unrelated.' },
            { t: 'cards', cols: 2, items: [
              { eyebrow: '1', title: 'Setting the anchor', color: 'var(--orange)', text: 'The first number mentioned in a negotiation often sets the expectation for the entire negotiation. This means that whoever sets the first anchor gains a **significant advantage** in influencing the outcome.' },
              { eyebrow: '2', title: 'Controlling expectations', color: '#3d6fd8', text: 'By establishing the first anchor, you create a **frame of reference** for all subsequent negotiations. This allows you to guide the conversation and control the overall direction of the deal.' },
            ] },
            { t: 'callout', tone: 'tip', title: 'Note', text: 'This method is most effective when you have a strong understanding of the market, region, or the other party\'s ability to accept and adapt to the proposal.' },
            { t: 'diagram', name: 'AnchorPull', caption: 'Example 1, pricing: if a car is shown at $40,000 first and then discounted to $32,000, the buyer feels they\'re getting a deal, even if $32,000 was the real target price.' },
            { t: 'p', text: '**Example 2, estimation:** if you ask, "Is the Mississippi River longer than 500 miles?", people guess a length near that number. Ask, "Is it longer than 5,000 miles?", and their guesses jump higher. Try it yourself:' },
            { t: 'anchorLab' },
            { t: 'research', added: true, title: 'Even a random number anchors', text: `In a classic experiment, Tversky and Kahneman spun a wheel of fortune in front of participants. It was rigged to stop at either 10 or 65. Participants were then asked what percentage of African countries were members of the United Nations. Those who saw 10 gave a median estimate of **25%**; those who saw 65 estimated **45%**. Everyone knew the wheel was random, and it still moved their answers. In a negotiation, the first number is not random, so its pull is even stronger.`, cite: ['tversky1974'] },
          ],
        },
        {
          id: 'l3-how', title: 'How to use anchoring',
          blocks: [
            { t: 'steps', items: [
              { title: 'Set the first price', list: ['Be the first to set the price, establishing the initial frame of reference for the negotiation.', 'If you\'re **selling**, start with a high number to make any reduction seem like a concession.', 'If you\'re **buying**, start with a low number so the other party must adjust downward.'] },
              { title: 'Frame the anchor as reasonable', list: ['Support your initial number with data, industry standards or case studies to make it seem justified.'] },
              { title: 'Use precise numbers', list: ['Use high-precision numbers to create a sense of careful calculation and detailed analysis.', 'This makes your offer more credible and persuasive.'] },
              { title: 'Counter-anchor quickly', list: ['Re-anchor immediately if the other party sets the anchor first.', 'This demonstrates your understanding of market value and negotiation effectiveness.'] },
            ] },
            { t: 'scene', ...salaryAnchorScene },
            { t: 'research', added: true, title: 'Why precise numbers work', text: `Researchers at Columbia Business School compared round first offers with precise ones (think $2,000 versus $1,865). Counterparts made **more conciliatory counteroffers** to the precise numbers, because they assumed the person who made them **knew more** about the item's real value. A precise number signals research. Use it only when you have done the research, and be ready to explain how you arrived at it.`, cite: ['mason2013'] },
            { t: 'activity', ...act.anchorScenarios },
            { t: 'reflect', id: 'r-anchor', prompt: 'For your next negotiation, write your opening number. What data makes it reasonable? Could it be more precise? And if they anchor first, what will your counter-anchor be?' },
          ],
        },
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · The fairness play',
      steps: [
        {
          id: 'l4-what', title: 'Why fairness moves people',
          blocks: [
            { t: 'person', img: img('fairness'), alt: 'Lady Justice, blindfolded, holding the scales by the sea', ratio: '1440/1282', eyebrow: 'The fairness play', name: 'People reject what feels unfair', text: 'Fairness is one of the strongest forces in any negotiation. A deal that feels fair gets accepted; a deal that feels unfair gets rejected, whatever it is worth.' },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'The need for fairness', title: 'Unfair deals get rejected', color: 'var(--b-aggressive)', text: 'People have a strong desire for fairness. When they perceive a deal as **unfair**, they are likely to reject it, regardless of its potential benefits.' },
              { eyebrow: 'Negotiation tool', title: 'Appeal to their sense of fairness', color: 'var(--b-assertive)', text: 'Skilled negotiators use the concept of fairness to their advantage. They **appeal to the other party\'s sense of fairness** to influence their decisions and gain their cooperation.' },
            ] },
            { t: 'research', added: true, title: 'People will pay to punish unfairness', text: `In the **ultimatum game**, one person proposes how to split a sum of money, and the other can accept or reject. If they reject, **both get nothing**. Pure logic says to accept any amount, because something is better than nothing. Yet in the original study by Güth and colleagues, and in many studies since, people regularly rejected offers they saw as unfair, typically those below about 20–30% of the total. Most proposers, sensing this, offered close to half. Fairness is not a soft extra: it changes what people will accept.`, cite: ['guth1982'] },
          ],
        },
        {
          id: 'l4-how', title: 'How to use fairness',
          blocks: [
            { t: 'steps', items: [
              { title: 'Establish the baseline', list: ['Justify your offer by emphasising its fairness, based on market rates, industry standards or similar deals.', '**"I want to make sure this is fair for both of us. Based on market rates, this is a reasonable price."**'] },
              { title: 'Address unfairness', list: ['Challenge unfair offers without being confrontational.', 'Acknowledge the other party\'s proposal, but gently point out inconsistencies or discrepancies compared to established norms.', '**"I want to make sure we\'re both treated fairly. That number seems a bit low compared to industry standards. What would feel fair to you?"**'] },
              { title: 'Secure fair agreement', list: ['Leverage fairness to secure commitment by offering a slight adjustment in your price or terms in exchange for a prompt agreement.', '**"I want to be fair to both of us. If I lower the price, would you be willing to commit today?"**'] },
              { title: 'Invoke fairness identity', list: ['Prime a fair response by naming fairness as part of their identity.', 'By briefly complimenting this trait out loud, you anchor their self-image to fair behaviour before making your request, encouraging them to act consistently with it.', '**"I\'ve always seen you as someone who really values fairness and doing the right thing. That\'s why I wanted to bring this up and ask if we could adjust this in a way that feels fair to both of us."**'] },
            ] },
            { t: 'scene', ...freelancerScene },
            { t: 'callout', tone: 'key', title: 'Why it works', text: 'This approach frames fairness as a **shared priority** and makes the negotiation feel more collaborative. And only compliment a trait you genuinely see in them: a hollow compliment is easy to spot.' },
            { t: 'activity', ...act.fairnessMoves },
          ],
        },
      ],
    },
    {
      id: 'l5', kind: 'lesson', title: '5 · The illusion of choice',
      steps: [
        {
          id: 'l5-what', title: 'Why choice persuades',
          blocks: [
            { t: 'person', img: img('choice'), alt: 'One hand offering a remote control to another open hand', ratio: '884/1440', eyebrow: 'The illusion of choice', name: 'Autonomy makes people say yes', text: 'People resist being pushed, but they enjoy choosing. Give them options, and they feel in control.' },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Power of choice', title: 'Options feel empowering', color: '#3d6fd8', text: 'People resist feeling pressured or forced into a decision. When given options, they feel **empowered** and more likely to make a choice.' },
              { eyebrow: 'Controlled outcomes', title: 'Every option works for you', color: 'var(--orange)', text: 'The key is to offer choices that **all lead to a favourable outcome** for you. This allows you to maintain control while creating the perception of autonomy for the other party.' },
            ] },
          ],
        },
        {
          id: 'l5-how', title: 'How to use the illusion of choice',
          blocks: [
            { t: 'steps', items: [
              { title: 'Create multiple options', list: ['Present two or more distinct options rather than forcing a yes/no decision.', 'This gives the other party a sense of control and autonomy in the negotiation.', 'Instead of "Do you want to buy?", say: **"Would you prefer to pay in installments or upfront?"**', 'Instead of "Do you want to move forward?", ask: **"Would you like to start this week or next?"**'] },
              { title: 'Design strategic alternatives', list: ['Structure the options so that one choice appears slightly more attractive than the others.', 'This subtly guides the decision-making process.'] },
              { title: 'Ensure win-win outcomes', list: ['Carefully craft each option to lead to favourable results for your position.', 'This creates a scenario where any choice benefits your objectives.'] },
            ] },
            { t: 'diagram', name: 'ChoiceMenus', caption: 'Three examples from the module. Switch between them to see how the option design guides the choice.' },
            { t: 'research', added: true, title: 'Decoys, and the limits of choice', text: `Two findings explain this lesson. First, the **decoy effect**: Huber, Payne and Puto showed that adding an option that is clearly worse than one of the others makes that option more popular, which is why the "Medium fries" and the "Premium plan" exist. Second, **choice overload**: in Iyengar and Lepper's famous jam study, shoppers who saw 24 jams were far more likely to stop and taste, but only **3%** bought, against **30%** of those who saw just 6. Two or three well-designed options beat a long list.`, cite: ['huber1982', 'iyengar2000'] },
            { t: 'callout', tone: 'warn', title: 'Choices that are good for both sides', text: 'Design options that genuinely serve the other party too. If they later feel steered into a choice that was bad for them, you lose the relationship, and the next deal.' },
            { t: 'activity', ...act.choiceScenarios },
          ],
        },
      ],
    },
    {
      id: 'l6', kind: 'lesson', title: '6 · Calibrated questions',
      steps: [
        {
          id: 'l6-what', title: 'What calibrated questions are',
          blocks: [
            { t: 'person', img: img('questions'), alt: 'Four colleagues in a relaxed discussion around a meeting table', ratio: '1440/1026', eyebrow: 'Calibrated questions', name: 'Guide without confrontation', text: 'The right question turns an opponent into a problem-solving partner.' },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Problem-solving mindset', title: 'From defensive to collaborative', color: '#6b5bd2', text: 'Calibrated questions are strategically worded open-ended questions that encourage the other party to shift from a **defensive stance** to a **problem-solving mindset**. This allows you to guide the negotiation without direct confrontation.' },
              { eyebrow: 'Open-ended questions', title: 'Start with "What" or "How"', color: 'var(--b-assertive)', text: 'These questions start with **"What"** or **"How"** and prompt the other party to provide more information and engage in a collaborative discussion. This approach can help break down resistance and facilitate a more productive dialogue.' },
            ] },
            { t: 'diagram', name: 'QuestionShift', caption: 'Replacing "Why" and yes/no questions with "What" and "How" moves the other party from defending to solving.' },
          ],
        },
        {
          id: 'l6-how', title: 'How to use calibrated questions',
          blocks: [
            { t: 'steps', items: [
              { title: 'Choose the right words', list: ['Replace "Why" questions with **"What"** and **"How"**.', 'This avoids confrontation and helps you better understand the other party\'s perspective.'] },
              { title: 'Frame for problem-solving', list: ['Structure questions to prompt the other party to consider solutions and alternatives.', 'This creates a more collaborative and constructive tone.'] },
              { title: 'Transform resistance', list: ['Build trust and respect by acknowledging concerns.', 'Use questions that encourage collaboration, leading to more productive negotiations.'] },
            ] },
            { t: 'callout', tone: 'key', title: 'Examples', list: ['"What about this is important to you?"', '"How can I help to make this better for us?"', '"How would you like me to proceed?"', '"What is it that brought us into this situation?"', '"How can we solve this problem?"', '"What\'s the objective? What are we trying to accomplish here?"', '"How am I supposed to do that?"'] },
            { t: 'flipCards', items: act.questionCards, frontLabel: 'Instead of', backLabel: 'Ask', hint: 'Rewrite it in your head, then tap →' },
            { t: 'activity', ...act.calibratedOrNot },
            { t: 'research', added: true, title: 'Skilled negotiators ask twice as many questions', text: `When Neil Rackham's team observed negotiators at work, the skilled ones spent **21%** of their behaviour asking questions, more than **twice** the 10% of average negotiators. Questions gave them information, time to think, and control over the direction of the talk, without the confrontation that comes with stating demands. Calibrated questions are the most useful kind: open, and pointed toward a solution.`, cite: ['rackham1980'] },
          ],
        },
      ],
    },
    {
      id: 'l7', kind: 'lesson', title: '7 · Reciprocity bias',
      steps: [
        {
          id: 'l7-what', title: 'The power of giving',
          blocks: [
            { t: 'person', img: img('reciprocity'), alt: 'One hand passing a small wrapped gift to another', ratio: '1728/1204', eyebrow: 'Reciprocity bias', name: 'Give before you ask', text: 'A small, genuine gesture can open more doors than a long argument.' },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Power of giving', title: 'People repay kindness', color: '#b0457a', text: 'People have an innate desire to return favours and maintain social balance. When someone does something kind, helpful or generous, others feel a **psychological obligation** to repay the gesture, even if the initial act was small or unrequested.\nThis principle leverages a fundamental human drive: the need to reciprocate kindness to preserve fairness and reputation.' },
              { eyebrow: 'Creating obligation', title: 'Small favour, big return', color: 'var(--b-assertive)', text: 'The essence of reciprocity bias is to **initiate value first**: to give before asking. A small gesture can create a powerful sense of indebtedness, making others more open, cooperative and willing to agree with your proposals later on.\nThe perceived debt doesn\'t have to match in scale: often, a **minor favour can trigger a major concession** in return.' },
            ] },
            { t: 'research', added: true, title: 'A soft drink and twice as many tickets', text: `In a classic study by Dennis Regan, participants worked alongside an assistant who, during a break, left the room and came back with two bottles of Coca-Cola, one for himself and one for the participant. Later, he asked them to buy raffle tickets. Participants who had received the unrequested drink bought **about twice as many tickets** as those who had not, and the effect held **even when they didn't particularly like him**. Cialdini lists reciprocity as one of the core principles of influence for exactly this reason.`, cite: ['regan1971', 'cialdini2021'] },
          ],
        },
        {
          id: 'l7-how', title: 'How to use reciprocity bias',
          blocks: [
            { t: 'steps', items: [
              { title: 'Offer first, ask later', list: ['Start interactions by giving something of value: advice, assistance, information or even goodwill.', 'This primes the other person to respond positively when you later make a request.'] },
              { title: 'Make the gesture personal and genuine', list: ['Tailor your "gift" or favour to the person\'s needs or interests.', 'Authenticity amplifies the effect, while obvious manipulation can backfire.'] },
              { title: 'Use small acts strategically', list: ['Even small courtesies, like a compliment, an introduction or a resource, can create a sense of mutual obligation.', 'They open doors to collaboration or agreement.'] },
              { title: 'Reinforce the social norm', list: ['Subtly highlight the exchange by acknowledging the relationship.', '**"I was happy to help. I know you\'d do the same."**', 'This reinforces the idea of fairness and maintains the cycle of reciprocity.'] },
            ] },
            { t: 'diagram', name: 'ReciprocityLoop', caption: 'The cycle of reciprocity: give first, and keep the cycle going.' },
            { t: 'scene', ...reciprocityScene },
            { t: 'activity', ...act.reciprocityScenarios },
          ],
        },
      ],
    },
    {
      id: 'l8', kind: 'lesson', title: '8 · Putting it together',
      steps: [
        {
          id: 'l8-roleplay', title: 'Role-play: the contract renewal',
          blocks: [
            { t: 'lead', text: 'The six principles work best together. In this role-play, every one of them has a moment.' },
            { t: 'activity', ...act.renewalRoleplay },
            { t: 'reflect', id: 'r-together', prompt: 'Plan your next negotiation with the six principles. For each one, write one honest sentence you could use: a real loss, a justified anchor, a fairness line, a choice of two options, a calibrated question, and a genuine first gesture.' },
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
    'Decisions are rarely driven by facts alone: perception shapes them. Shape it with integrity.',
    'Loss aversion: people feel losses about twice as strongly as gains. Frame offers around what they would lose by saying no.',
    'Four loss-aversion strategies: reframe value, highlight opportunity costs, leverage scarcity and create time-based urgency. Use only real losses and real deadlines.',
    'The first number sets the frame. Anchor first, high when selling and low when buying.',
    'Make your anchor credible with data and precise numbers, and counter-anchor quickly if they go first.',
    'People reject deals that feel unfair. Establish the baseline, address unfairness calmly, trade a small adjustment for commitment, and invoke their fairness identity.',
    'Offer a choice, not a yes or no. Design two or three options that all lead to a good outcome, for you and for them.',
    'Calibrated "What" and "How" questions move the other side from defending to problem-solving.',
    'Give first: a small, personal and genuine gesture creates goodwill that makes later requests feel natural.',
    'The six principles work together. Used honestly, they build trust; used as tricks, they destroy it.',
  ],
  worksheet: {
    file: 'worksheets/module-06-shape-their-reality-worksheet.pdf',
    title: 'Shape Their Reality: Perception Planner',
    pages: 4,
    contents: ['Loss frame: reframing, opportunity costs, scarcity, urgency', 'Anchor plan and counter-anchor', 'Fairness lines', 'Choice design', 'Calibrated question bank', 'Reciprocity plan and integrity check', 'After-action review'],
  },
}

export default m6
