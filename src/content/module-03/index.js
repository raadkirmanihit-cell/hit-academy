// Module 3 content. Source: "Chapter 3: The Silent Advantage: Reading the Unspoken Yes, No and Pause"
// by Raad Kirmani.
// Blocks of type 'research' (and items marked { added: true }) are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import { counterfeitScene, confirmationScene, commitmentScene, pauseScene } from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m3/${name}.webp`

const m3 = {
  id: 'm3',
  number: 3,
  title: 'The Silent Advantage',
  subtitle: 'Reading the Unspoken Yes, No and Pause',
  cover: img('cover'),
  coverAlt: 'Three colleagues in a focused discussion across a meeting table',
  tags: ['Yes', 'No', 'Silence'],
  duration: '75–90 min',
  author: 'Raad Kirmani',
  summary: `Not every "yes" means yes, and not every "no" means no. In this module you learn to read the unspoken: the shifts in tone, timing and body language that tell you what someone really means. You will tell apart three kinds of "yes" and turn a polite one into a real commitment, reframe your questions so that "no" feels safe and honest answers follow, handle a "no" as the start of the conversation rather than the end, and use silence and strategic pauses as instruments of influence.`,
  objectives: [
    `Distinguish a counterfeit, a confirmation and a commitment "yes", and spot the signals of each.`,
    `Respond to each type of yes, and turn agreement into commitment with follow-up questions, probing and a test of agreement.`,
    `Explain why inviting a "no" creates psychological safety, and the three outcomes it leads to.`,
    `Reframe yes-questions into no-oriented questions that lower pressure and surface real objections.`,
    `Handle a "no" productively with open-ended questions, validation and strategic empathy, and a positive reframe.`,
    `Use silence, and six strategic pauses, to project confidence, draw out information and calm tension.`,
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · Three types of "yes"',
      steps: [
        {
          id: 'l1-power', title: 'Understanding the power of "yes"',
          blocks: [
            { t: 'lead', text: `"Yes" is the word every negotiator wants to hear. But a yes can mean very different things, and mistaking one for another is expensive.` },
            { t: 'p', text: `There are **three types of "yes"**. They can sound almost identical. What separates them is what the person intends to do next.` },
            { t: 'cards', items: [
              { eyebrow: 'Type 1', title: 'Counterfeit Yes', color: 'var(--b-aggressive)', text: `**Deceptive or non-committal.** It gives a false sense of agreement and can derail a negotiation if it is mistaken for a commitment.`, list: [`**Usage:** given to avoid conflict, delay the negotiation or move the conversation along, without any intention of following through.`] },
              { eyebrow: 'Type 2', title: 'Confirmation Yes', color: 'var(--navy-2)', text: `**The most basic form.** It acknowledges that something is understood, but doesn't necessarily signify agreement.`, list: [`**Usage:** keeps the conversation going without committing to any specific terms or decisions.`] },
              { eyebrow: 'Type 3', title: 'Commitment Yes', color: 'var(--b-assertive)', text: `**The genuine yes.** It signals agreement and a willingness to follow through on the terms being negotiated.`, list: [`**Usage:** given when someone wants to take action. It signifies true acceptance of the proposal or terms.`] },
            ] },
            { t: 'diagram', name: 'YesGap', caption: 'Illustration: for each type of yes, the top bar shows how convincing it sounds and the bottom bar shows what it actually commits the person to. The danger lives in the gap between the two.' },
            { t: 'p', text: `**Why recognising the type of yes is crucial:**` },
            { t: 'cards', items: [
              { eyebrow: 'Risk 1', title: 'False expectations', color: 'var(--orange)', text: 'Believing a counterfeit yes leads to wasted resources and effort.' },
              { eyebrow: 'Risk 2', title: 'Missed opportunities', color: 'var(--orange)', text: 'Failing to probe may overlook hidden objections that derail agreements later.' },
              { eyebrow: 'Risk 3', title: 'Damaged trust', color: 'var(--orange)', text: 'Discovering a counterfeit yes later creates adversarial dynamics.' },
            ] },
          ],
        },
        {
          id: 'l1-counterfeit', title: '1 · Counterfeit Yes',
          blocks: [
            { t: 'quote', text: 'Says yes, means no.', by: 'Type 1 · Counterfeit Yes' },
            { t: 'p', text: `A counterfeit yes is **not sincere**. The person says "yes" to escape pressure, avoid conflict or appear agreeable, but they have no intention of acting on it.` },
            { t: 'cards', items: [
              { title: 'What it sounds like', img: img('counterfeit-1'), color: 'var(--b-aggressive)', list: [`"Yes, totally."`, `"Sure, of course."`, `"Yeah, I'll get to it."`], example: `Often said quickly, with enthusiasm that doesn't match their body language or past behaviour. The tone might feel overly smooth, vague or evasive.` },
              { title: 'What to watch for', img: img('counterfeit-2'), color: 'var(--b-aggressive)', list: ['A lack of follow-up questions', 'A history of agreeing but not delivering', 'Vague language or deflection when asked for details'] },
              { title: 'How to respond', img: img('counterfeit-3'), color: 'var(--b-aggressive)', list: [`"Just to be sure we're aligned, what's the first step you'll take on this?"`, `"When do you think you'll be able to start?"`, `"Can we move forward then with the next step (ABC) to do (XYZ)?"`, `"By when can we expect a PO or draft agreement?"`], example: `These questions force clarity. If it's a fake yes, they'll stumble or give non-answers.` },
            ] },
            { t: 'scene', ...counterfeitScene },
            { t: 'research', added: true, title: 'Why you test the yes instead of reading the face', text: `It is tempting to believe you can spot a fake yes from body language alone. The research says otherwise. A meta-analysis of 206 studies, with more than 24,000 judges, found that people detect lies only **about 54% of the time**, barely better than a coin toss. Mismatched signals are still worth noticing, because they tell you *where* to probe. But the reliable test is the one this module teaches: ask for specifics. A counterfeit yes rarely survives "What's the first step, and by when?"`, cite: ['bond2006'] },
          ],
        },
        {
          id: 'l1-confirmation', title: '2 · Confirmation Yes',
          blocks: [
            { t: 'quote', text: 'Acknowledges the facts, commits to nothing.', by: 'Type 2 · Confirmation Yes' },
            { t: 'p', text: `This is a **factual acknowledgement**: a response to verify information. It's neutral, emotionless and carries no commitment.` },
            { t: 'cards', items: [
              { title: 'What it sounds like', img: img('confirmation-1'), color: 'var(--navy-2)', list: [`"Yes."`, `"That's correct."`, `"Exactly."`], example: 'Clear, short, and delivered without emotional charge.' },
              { title: 'What to watch for', img: img('confirmation-2'), color: 'var(--navy-2)', list: ['A short, factual tone', 'No emotional shift or energy', 'No indication of a decision being made'] },
              { title: 'How to respond', img: img('confirmation-3'), color: 'var(--navy-2)', list: [`"Thanks for confirming. How does that affect your priorities going forward?"`, `"Given that, where do you see the biggest opportunity for us to support you?"`], example: 'The goal is to move from data to action.' },
            ] },
            { t: 'scene', ...confirmationScene },
            { t: 'callout', tone: 'tip', title: 'Use it as a bridge', text: `A confirmation yes is not a problem. It is a foothold. Every confirmed fact is a chance to ask a deeper question about what that fact *means* to them.` },
          ],
        },
        {
          id: 'l1-commitment', title: '3 · Commitment Yes',
          blocks: [
            { t: 'quote', text: 'The real yes: a decision, an intent and a willingness to act.', by: 'Type 3 · Commitment Yes' },
            { t: 'p', text: `This is the **real yes**: the one that signals a decision, intent and a willingness to act. It is tied to next steps, ownership and forward motion.` },
            { t: 'cards', items: [
              { title: 'What it sounds like', img: img('commitment-1'), color: 'var(--b-assertive)', list: [`"Yes, let's move forward."`, `"Absolutely. Send the contract."`, `"Yes, I'm in. I'll start today."`], example: `You'll hear certainty, energy and specifics.` },
              { title: 'What to watch for', img: img('commitment-2'), color: 'var(--b-assertive)', list: ['A clear commitment to action', 'Timelines, deliverables or ownership', 'Tone and body language that match the words'] },
              { title: 'How to reinforce it', img: img('commitment-3'), color: 'var(--b-assertive)', list: [`"Excellent, I'll send over the paperwork now."`, `"Great, I'll update the timeline and notify the team."`], example: 'At this stage, your job is to confirm and support execution.' },
            ] },
            { t: 'scene', ...commitmentScene },
          ],
        },
        {
          id: 'l1-summary', title: 'Summary and practice',
          blocks: [
            { t: 'table', head: ['Type', 'Meaning', 'Tone / behaviour', 'Action needed'], rows: [
              ['Counterfeit Yes', 'Says yes but means no', 'Vague, eager, avoidant', 'Ask for specifics, test intent'],
              ['Confirmation Yes', 'Acknowledges facts', 'Neutral, brief', 'Use it as a bridge to deeper questions'],
              ['Commitment Yes', 'Real agreement and intent', 'Clear, confident, action-focused', 'Reinforce, move to execution'],
            ] },
            { t: 'activity', ...act.whichYes },
            { t: 'reflect', id: 'r-l1', prompt: `Think of a "yes" you received recently that never turned into action. What signals did you miss at the time? Write the question you could have asked to test it.` },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · Ensuring a commitment "yes"',
      steps: [
        {
          id: 'l2-ensure', title: 'Three steps to a real yes',
          blocks: [
            { t: 'lead', text: `A yes is only as good as what happens next. These three steps turn agreement into commitment.` },
            { t: 'person', img: img('ensure'), alt: 'Two professionals shaking hands and smiling after reaching agreement', eyebrow: 'The goal', name: 'From "yes" to action', text: `A handshake feels like the end of the negotiation. In reality, it is the moment to make sure both sides mean the same thing, and will act on it.` },
            { t: 'steps', items: [
              { title: 'Ask follow-up questions', text: `"Can you confirm that we are both aligned on the next steps?" · "What specific actions are we agreeing to take moving forward?"` },
              { title: 'Probe for hesitations', text: `Watch for non-verbal cues that indicate a "yes" isn't a full commitment. Observe body language and ask: "You seem unsure. Can we address any concerns?"` },
              { title: 'Test the agreement', text: `After getting a "yes", test its strength by asking for small, immediate actions. Hesitation could mean it's not a true commitment. "Can we schedule a meeting tomorrow to finalise?" · "Could you provide a formal purchase order or letter of intent by the end of the week to confirm our agreement?"` },
            ] },
            { t: 'research', added: true, title: 'Why "what, when and who" makes a yes stick', text: `Psychologists call a plan that names *when*, *where* and *how* you will act an **implementation intention**. A meta-analysis of 94 studies found that people who form one are far more likely to follow through on their goals than people who only state an intention (a medium-to-large effect, d = 0.65). That is the logic behind this lesson's questions. "Yes, we'll do it" is an intention. "Yes, I'll send the PO by Friday" is a plan, and plans get done.`, cite: ['gollwitzer2006'] },
          ],
        },
        {
          id: 'l2-practice', title: 'Practice: test the yes',
          blocks: [
            { t: 'activity', ...act.testTheYes },
            { t: 'reflect', id: 'r-l2', prompt: `Write the three questions you will use at the end of your next negotiation: one follow-up question, one probe for hesitation, and one small, immediate action that tests the agreement.` },
          ],
        },
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: '3 · The power of "no"',
      steps: [
        {
          id: 'l3-no', title: 'Why "no" is good news',
          blocks: [
            { t: 'img', src: img('no'), alt: 'The word NO in large three-dimensional letters', ratio: '16/7', caption: '"No" is often misunderstood as negative, but it can lead to clarity and better negotiation outcomes.' },
            { t: 'p', text: `Most of us are trained to fear "no". In negotiation, it is often the most useful word you can hear. A "no" has four positive effects:` },
            { t: 'cards', cols: 4, items: [
              { eyebrow: '1', title: 'Creates clarity', color: 'var(--navy-2)', text: 'You learn where the other side really stands.' },
              { eyebrow: '2', title: 'Restores a sense of control', color: 'var(--b-assertive)', text: 'Saying no makes people feel safe and in charge of their decision.' },
              { eyebrow: '3', title: 'Prevents false agreements', color: 'var(--orange)', text: 'An honest no is better than a counterfeit yes.' },
              { eyebrow: '4', title: 'Encourages open dialogue', color: '#6b5bd2', text: 'Once the no is said, the real conversation can begin.' },
            ] },
          ],
        },
        {
          id: 'l3-invite', title: 'Technique: inviting "no" early',
          blocks: [
            { t: 'p', text: `**Asking for a "no" is a deliberate technique.** It works in three ways:` },
            { t: 'cols2', items: [
              { title: 'What it does', list: [
                '**Shifts the dynamic:** asking for "no" reduces pressure, fosters control and empowers the other party to express genuine thoughts. It creates psychological safety.',
                '**Builds trust:** providing space for "no" shows respect for autonomy and encourages honest dialogue.',
                '**Diffuses tension:** it lowers defences and creates an environment for productive conversations.',
              ] },
              { title: 'What it is not', text: `Inviting a "no" isn't about being negative. It's about **surfacing the truth**. A "no" leads to one of three outcomes, and all three move you forward.` },
            ] },
            { t: 'diagram', name: 'NoOutcomes', caption: 'Inviting a "no" leads to clarification, correction or commitment. Every one of them is progress.' },
            { t: 'research', added: true, title: 'Reminding people they can say no makes them more likely to say yes', text: `Researchers have tested a simple version of this idea for decades: adding "but you are free to refuse" to a request. A meta-analysis of 42 studies, with around 22,000 participants, found that this reminder of autonomy **roughly doubled** the odds that people agreed. The effect was strongest face to face. Feeling free to say no is what makes a real yes possible, and it is why a no-oriented question lowers resistance instead of raising it.`, cite: ['carpenter2013'] },
          ],
        },
        {
          id: 'l3-reframe', title: 'Stop chasing "yes"',
          blocks: [
            { t: 'lead', text: `Most people are conditioned to chase agreement. Inviting "no" creates psychological safety and better outcomes.` },
            { t: 'cards', items: [
              { eyebrow: 'The problem', title: 'The problem with "yes"', img: img('problem-yes'), color: 'var(--b-aggressive)', text: 'Traditional questions invite automatic yeses that feel safe but are often superficial, avoidant and non-committal.', list: [`"Can I ask you a question?"`, `"Do you agree?"`, `"Would you like to move forward?"`] },
              { eyebrow: 'The fix', title: 'Negative framing creates safety', img: img('negative-framing'), color: 'var(--b-assertive)', text: 'Structure questions so saying "no" feels easy, comfortable and respectful, by flipping from requests for agreement to checks for disagreement.', list: [`"Is this plan unreasonable?"`, `"Would it be a bad idea to meet tomorrow?"`, `"Is it impossible to get this approved today?"`] },
              { eyebrow: 'The tone', title: 'Disarming language lowers pressure', img: img('disarming'), color: 'var(--orange)', text: 'Use casual, even self-deprecating phrases that create permission to say no without shutting the door.', list: [`"Would it be ridiculous to…?"`, `"Is it out of the question if…?"`, `"Would it be crazy to consider…?"`] },
            ] },
            { t: 'p', text: `**Nine reframes you can use tomorrow.** Read the yes-question on each card, try to reframe it yourself, then tap to compare.` },
            { t: 'flipCards', items: act.reframeCards, frontLabel: 'Instead of', backLabel: 'Ask', hint: 'Reframe it yourself, then tap →' },
            { t: 'callout', tone: 'key', title: 'What these reframed questions do', list: [
              'They give the other person **psychological safety** by allowing them to say "no" instead of being pushed into "yes".',
              'They sound **less pushy and more collaborative**, which builds rapport.',
              `They invite **real feedback**, so you're less likely to mistake a counterfeit yes for real commitment.`,
            ] },
            { t: 'callout', tone: 'warn', title: 'One caution', text: `A no-oriented question must leave a genuine choice. "Don't you want to save money?" is phrased for a no, but nobody can say no without looking foolish. That is a trap, not an invitation, and people feel the difference.` },
          ],
        },
        {
          id: 'l3-practice', title: 'Practice: ask for the "no"',
          blocks: [
            { t: 'activity', ...act.askForNo },
            { t: 'reflect', id: 'r-l3-reframe', prompt: `Write down three yes-questions you ask often at work (for example "Does that make sense?" or "Can we meet on Friday?"). Rewrite each one so that "no" is the safe answer.` },
          ],
        },
        {
          id: 'l3-handling', title: 'Handling "no" productively',
          blocks: [
            { t: 'p', text: `When you hear a no, your first move is not to defend, withdraw or sweeten the offer. It is to understand. Three techniques help:` },
            { t: 'steps', items: [
              { title: 'Ask open-ended follow-up questions', text: `"What are your main concerns?" · "What changes would make this acceptable?" · "Is there a specific part of this proposal that doesn't work for you?"` },
              { title: 'Validation followed by strategic empathy', text: `"I understand why you might feel that way." · "It makes sense that you'd be cautious about this point." · "It sounds like you're worried about the impact this could have on your timeline." · "It seems like you're concerned about the budget constraints."` },
              { title: `Reframe "no" positively`, text: `"It sounds like we're getting closer to understanding what's really important to you. What other concerns do you have that we can work through?"` },
            ] },
            { t: 'callout', tone: 'tip', title: 'Connect it to Module 2', text: `The second technique uses the labels you practised in Module 2: "It sounds like…", "It seems like…". Validate first, then label the concern behind the no.` },
          ],
        },
        {
          id: 'l3-roleplay', title: 'Role-play: the "no" on the renewal',
          blocks: [
            { t: 'activity', ...act.handleNo },
            { t: 'reflect', id: 'r-l3-no', prompt: `Think of a "no" you are likely to hear soon. Write the open-ended question you will ask first, the validation and label you will use, and how you will reframe the no positively.` },
          ],
        },
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · The power of silence and pause',
      steps: [
        {
          id: 'l4-silence', title: 'The power of silence',
          blocks: [
            { t: 'img', src: img('silence'), alt: 'A man and a woman in quiet, thoughtful reflection', ratio: '1200/226' },
            { t: 'lead', text: `Silence is not the absence of communication. Used deliberately, it is one of the most powerful things you can "say".` },
            { t: 'cards', cols: 4, items: [
              { eyebrow: '1', title: 'Promotes reflection', color: 'var(--navy-2)', text: 'Creates essential space for processing complex information, calming heightened emotions and reorienting discussions toward productive outcomes.' },
              { eyebrow: '2', title: 'Uncovers information', color: 'var(--orange)', text: 'Creates a vacuum that naturally draws out additional details, concerns and priorities the other party might otherwise withhold.' },
              { eyebrow: '3', title: 'Projects confidence', color: 'var(--b-assertive)', text: 'Demonstrates conviction in your position, communicates patience, and prevents the appearance of anxiety or eagerness to compromise.' },
              { eyebrow: '4', title: 'Enables constructive dialogue', color: '#6b5bd2', text: 'Transforms exchanges from impulsive reactions into thoughtful responses, creating space for meaningful, solution-oriented conversations.' },
            ] },
            { t: 'silence' },
            { t: 'research', added: true, title: 'Silence creates value, and it feels uncomfortable', text: `In negotiation experiments at MIT, negotiators who were asked to hold **extended silences of three seconds or more** created more value for both sides than those who negotiated as usual. Silence shifted them from quick, fixed-pie reactions into a more deliberate mindset. Other research explains why silence is hard to hold: in conversation studies, an unexpected silence of just **four seconds** was enough to make people feel uneasy and less connected. That discomfort is exactly what gives silence its pull, so pair it with warm eye contact and a calm face, and it reads as attention rather than rejection.`, cite: ['curhan2022', 'koudenburg2011'] },
          ],
        },
        {
          id: 'l4-pauses', title: 'Six strategic pauses',
          blocks: [
            { t: 'p', text: `Mastering the power of pause in different conversational contexts. Each pause has a different purpose, and each one happens at a different moment in the conversation.` },
            { t: 'diagram', name: 'PauseMap', caption: 'The six pauses follow the flow of a conversation. Pauses 1 to 5 each belong to a specific condition; pause 6 is the special condition, for whenever tension rises.' },
            { t: 'cards', imgRatio: '4/3', items: [
              { eyebrow: 'Pause 1', title: 'Pause before you speak', img: img('pause-1'), color: 'var(--navy-2)', text: '**Purpose:** to gather your thoughts, demonstrate emotional control and respond with clarity.', list: [`It shows you're composed and intentional, not reactive.`, 'It builds trust: people interpret thoughtful pauses as signs of intelligence and maturity.'], example: `"I appreciate you bringing that up. Let me think about it for a second." (Pause, steady breath.)` },
              { eyebrow: 'Pause 2', title: 'Pause after you speak', img: img('pause-2'), color: 'var(--navy-2)', text: `**Purpose:** to let your message land with impact and give others space to absorb what you've said.`, list: ['It signals that what you just said is important.', 'It helps prevent your point from being buried under more words.'], example: `"We're not just solving a problem, we're redefining the customer experience." (Pause, let silence amplify the message.)` },
              { eyebrow: 'Pause 3', title: 'Pause after asking a question', img: img('pause-3'), color: 'var(--navy-2)', text: '**Purpose:** to invite deeper, more thoughtful responses, and avoid cutting someone off too early.', list: [`Silence creates psychological pressure to respond: people tend to "fill the gap".`, `It shows you're genuinely interested in their answer, not just asking to respond.`], example: `"What do you think is really going on in the team right now?" (Pause. No rush. Let them reflect.)` },
              { eyebrow: 'Pause 4', title: 'Pause to encourage elaboration', img: img('pause-5'), color: 'var(--orange)', text: '**Purpose:** to prompt the speaker to go deeper, share more or clarify themselves, without pressure.', list: ['People interpret silence as an invitation to continue, especially when it is paired with verbal mirroring.', 'Verbal mirroring reinforces connection and curiosity, making them feel understood.'], example: `Speaker: "I've just been feeling overwhelmed." You: "Overwhelmed?" (Pause. Soft eye contact.)` },
              { eyebrow: 'Pause 5', title: 'Pause while listening', img: img('pause-6'), color: 'var(--orange)', text: `**Purpose:** to give space for the speaker's thoughts and show you're fully present.`, list: ['It creates psychological safety: they feel heard, not hurried.', 'It often encourages them to continue sharing organically.'], example: `(They speak. You nod gently, stay quiet.) "Thanks for telling me that." (Pause. Don't immediately shift focus.)` },
              { eyebrow: 'Pause 6', title: 'Pause to shift tone or energy', img: img('pause-4'), color: 'var(--orange)', text: '**Purpose:** to calm tension, reset the dynamic, or prevent escalation during emotionally charged moments.', list: ['It disrupts reactive momentum and changes the emotional rhythm.', `It signals that you're grounded and willing to steer things constructively.`], example: `(In a tense conversation) "Let's slow down for a second." (Pause. Breathe. Let silence create space for reflection.)` },
            ] },
            { t: 'scene', ...pauseScene },
            { t: 'research', added: true, title: 'Three seconds that change the answer', text: `Some of the clearest evidence for the pause after a question comes from classrooms. When teachers waited **three seconds or more** after asking a question, instead of the typical one second, students gave longer answers, offered more evidence for their reasoning and asked more questions of their own. Adults at the negotiating table respond to the same space. If your pause after a question feels long, it is probably just long enough.`, cite: ['rowe1986'] },
          ],
        },
        {
          id: 'l4-summary', title: 'Summary and practice',
          blocks: [
            { t: 'table', head: ['Use', 'Purpose', 'Why it works'], rows: [
              ['1. Pause before speaking', 'Reflect, slow down, signal calm', 'Shows composure; increases perceived thoughtfulness'],
              ['2. Pause after speaking', 'Add weight, clarity', 'Emphasises key points; helps others process'],
              ['3. Pause after asking', 'Invite deeper answers', 'Encourages elaboration; signals real curiosity'],
              ['4. Pause to encourage elaboration', 'Gently prompt more depth', 'Silence draws out more detail; verbal mirroring deepens connection'],
              ['5. Pause while listening', 'Show full presence', 'Builds trust and safety; opens space for reflection'],
              ['6. Pause to shift tone', 'De-escalate or redirect', 'Breaks emotional loops; promotes calm and leadership presence'],
            ] },
            { t: 'activity', ...act.choosePause },
            { t: 'reflect', id: 'r-l4', prompt: `Which of the six pauses is hardest for you to hold? In your next meeting, choose one pause to practise deliberately. Afterwards, note what happened in the silence.` },
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
    'There are three types of "yes": counterfeit (says yes, means no), confirmation (acknowledges facts) and commitment (real agreement and intent).',
    'A counterfeit yes creates false expectations, hides objections and damages trust when it is discovered later.',
    'Test any yes with specifics: "What\'s the first step you\'ll take?" and "By when can we expect a draft agreement?"',
    'Use a confirmation yes as a bridge to deeper questions: move from data to action.',
    'Ensure a commitment yes in three steps: ask follow-up questions, probe for hesitations, and test the agreement with a small, immediate action.',
    '"No" creates clarity, restores a sense of control, prevents false agreements and encourages open dialogue.',
    'Inviting a "no" leads to one of three outcomes, all of them progress: clarification, correction or commitment.',
    'Stop chasing "yes": reframe questions so "no" is the safe answer. "Have I caught you at a bad time?"',
    'When you hear a no, ask open-ended questions, validate and label the concern, and reframe the no positively.',
    'Silence and strategic pauses project confidence, draw out information and calm tension. Let the silence work.',
  ],
  worksheet: {
    file: 'worksheets/module-03-silent-advantage-worksheet.pdf',
    title: 'The Silent Advantage: Yes, No and Pause Planner',
    pages: 4,
    contents: ['Yes audit', 'Commitment questions', 'No-oriented question builder', 'Handling "no" script', 'Pause plan and after-action review'],
  },
}

export default m3
