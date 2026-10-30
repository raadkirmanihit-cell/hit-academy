// Module 2 content. Source: "Chapter 2: The Voice of Influence: Mastering Strategic Empathy
// Through Emotional Intelligence" by Raad Kirmani.
// Blocks of type 'research' (and items marked { added: true }) are material added beyond the module.
import { references } from './references.js'
import { quiz } from './quiz.js'
import { maya } from './dialogues.js'
import * as act from './activities.js'

const img = (name) => `img/m2/${name}.webp`

const m2 = {
  id: 'm2',
  number: 2,
  title: 'The Voice of Influence',
  subtitle: 'Mastering Strategic Empathy Through Emotional Intelligence',
  cover: img('cover'),
  coverAlt: 'A presenter leading a meeting while colleagues listen around the table',
  coverWide: true,
  tags: ['Emotion', 'Empathy', 'Voice'],
  duration: '80–95 min',
  author: 'Raad Kirmani',
  summary: `People decide with emotion and justify with logic. In this module you learn to hear both conversations in every negotiation: the rational one about price and deadlines, and the emotional one about trust, respect, status and fear. You will build the four emotional intelligence skills that matter most at the table, practise techniques to stay calm under pressure, learn to decode what people really mean, and use your voice, labels, mirrors and an Allegation Assessment to turn tension into trust.`,
  objectives: [
    `Explain why emotions drive decisions, and separate the rational and the emotional conversation in any negotiation.`,
    `Apply the four emotional intelligence skills (self-awareness, self-regulation, social awareness and empathy) in a negotiation.`,
    `Stay composed under pressure with Name & Reframe, 4-7-8 breathing, grounding, "Calm – Curious – Clear" and anchor phrases.`,
    `Decode the emotion behind common statements and replace dismissive replies with emotionally intelligent ones.`,
    `Choose the right voice for the moment: assertive, midnight (FM RJ) or playful.`,
    `Recognise when de-escalation is needed, and use an Allegation Assessment, active listening, labeling and mirroring.`,
    `Combine these techniques into a six-step flow to confront an issue without confrontation.`,
  ],
  references,
  quiz,
  sections: [
    {
      id: 'intro', kind: 'overview', title: 'Start here',
      steps: [{ id: 'overview', title: 'Module overview', kind: 'overview', blocks: [{ t: 'overview' }] }],
    },
    {
      id: 'l1', kind: 'lesson', title: '1 · Why emotions drive decisions',
      steps: [
        {
          id: 'l1-felt', title: `It's about what's felt`,
          blocks: [
            { t: 'lead', text: `"It's not just about what's said, it's about what's felt." That stands true for **both sides** in a negotiation.` },
            { t: 'person', img: img('damasio'), alt: 'Portrait of neuroscientist Antonio Damasio', name: 'Dr. Antonio Damasio', eyebrow: `Neuroscientist · Descartes' Error (1994)`,
              text: `Damasio studied patients with brain injuries that impaired their ability to feel emotion. Despite having normal IQs, they struggled to make even simple decisions. His conclusion:`,
              quote: 'People make decisions based on emotion, then use logic to justify them afterward.' },
            { t: 'p', text: `For negotiators, this changes everything. Your counterpart will not say yes because your spreadsheet is right. They will say yes when the deal *feels* right, and then use your spreadsheet to explain the decision.` },
            { t: 'research', added: true, title: 'Emotions shape decisions powerfully and predictably', text: `A major review of 35 years of research concluded that emotions are not a side effect of decision making but one of its main drivers. Fear tends to make people see more risk; anger makes them more confident and more willing to take risks; and **"incidental" emotions**, such as frustration from an earlier meeting, carry over into unrelated decisions. For negotiators this means two things: manage your own emotional state before you walk in, and remember that your counterpart\'s mood may have nothing to do with you.`, cite: ['lerner2015'] },
          ],
        },
        {
          id: 'l1-layer', title: 'The emotional layer',
          blocks: [
            { t: 'p', text: `Every negotiation has **two conversations** happening at once:` },
            { t: 'diagram', name: 'Iceberg', caption: 'The rational conversation is what you can see. The emotional conversation sits below the surface, and it is usually bigger.' },
            { t: 'cols2', items: [
              { title: '1 · The rational conversation', text: `About **price, deadlines, deliverables, roles and responsibilities**.` },
              { title: '2 · The emotional conversation', text: `About **trust, respect, status, fairness, control and fear**.` },
            ] },
            { t: 'p', text: `Most failed negotiations happen not because of bad logic, but because the emotional conversation is ignored.` },
            { t: 'quote', text: `People will forget what you said, but they won't forget how you made them feel.`, by: 'Maya Angelou, American memoirist and poet' },
            { t: 'callout', tone: 'warn', title: `Why it matters: if you're not managing the emotional layer`, list: [
              'People shut down, even if your logic is solid.',
              'Trust erodes over small gestures, such as tone, interruptions or a lack of empathy.',
              'Positions harden, not because of the issue, but because of how the issue *feels* emotionally.',
            ] },
            { t: 'callout', tone: 'key', title: 'Key insight', text: `Negotiation isn't just about "getting to yes". It's about getting past fear, ego and tension. A skilled negotiator hears both layers and responds to both needs. This is where **emotional intelligence (EI)** becomes your greatest tool: not to "feel" your way through conflict, but to influence it powerfully and constructively.` },
            { t: 'activity', ...act.twoConversations },
          ],
        },
      ],
    },
    {
      id: 'l2', kind: 'lesson', title: '2 · The four emotional intelligence skills',
      steps: [
        {
          id: 'l2-intro', title: 'EI is a skillset, not a trait',
          blocks: [
            { t: 'p', text: `Emotional intelligence is not just about "being nice". In negotiation, it's about being **strategically aware, emotionally composed and socially effective**, especially when things get tense.` },
            { t: 'p', text: `This lesson breaks down the four EI skills that matter most at the table. They are based on Daniel Goleman's emotional intelligence framework, tailored for negotiation and conflict.` },
            { t: 'diagram', name: 'EIGrid', caption: 'Two skills are about you, two are about them. In each pair, you first notice, then respond.' },
            { t: 'p', text: `**One moment, four skills.** You're presenting a price increase to a long-standing client. Here is how the four skills work together in just a few seconds:` },
            { t: 'cards', cols: 4, items: [
              { eyebrow: '1 · Self-awareness', title: 'Notice yourself', color: 'var(--orange)', text: `The client says, "That's outrageous." You feel your jaw tighten and the urge to defend your price.` },
              { eyebrow: '2 · Self-regulation', title: 'Choose your response', color: 'var(--orange)', text: `You pause, take one slow breath and use an anchor phrase: "That's an important point, I want to respond well."` },
              { eyebrow: '3 · Social awareness', title: 'Read the room', color: 'var(--s-accommodating)', text: `You notice their finance lead has gone quiet and keeps glancing at the CEO. The pressure may be internal.` },
              { eyebrow: '4 · Empathy', title: 'Meet the emotion', color: 'var(--s-accommodating)', text: `"It sounds like this lands at a difficult time for your budget." The client exhales, and the real conversation can begin.` },
            ] },
          ],
        },
        {
          id: 'l2-self-awareness', title: '1 · Self-awareness',
          blocks: [
            { t: 'quote', text: `You can't manage what you don't recognize.`, by: 'Skill 1 · Self-awareness' },
            { t: 'img', src: img('self-awareness'), alt: 'A man in a suit pausing to think, hand on his chin', ratio: '16/9' },
            { t: 'cols2', items: [
              { title: 'What it means', list: [
                'Recognising your own emotional state in real time',
                'Knowing your emotional triggers (for example being talked over, being challenged, an aggressive tone)',
                'Understanding how your mood or mindset affects your negotiation style',
              ] },
              { title: 'Why it matters', text: `If you're unaware of your emotional state, you're likely to react impulsively, undermining your logic and presence. High self-awareness helps you **choose your response** instead of being controlled by the situation.` },
            ] },
            { t: 'p', text: '**Common triggers in negotiation:**' },
            { t: 'checks', items: ['Being interrupted or dismissed', 'A perceived power imbalance', 'Surprise objections or unreasonable demands'] },
            { t: 'callout', tone: 'tip', title: 'Self-awareness in action', text: `You're in a pricing discussion, and the other party becomes aggressive. You notice your pulse quickening and your jaw tightening. Instead of pushing back emotionally, you **pause, breathe, and choose** a calm, measured response.` },
            { t: 'reflect', id: 'r-l2-checklist', prompt: `Practice tip: use a pre-negotiation checklist. Think of your next negotiation and answer three questions. What emotions am I bringing in today? What might trigger me? How do I want to show up?` },
          ],
        },
        {
          id: 'l2-self-regulation', title: '2 · Self-regulation',
          blocks: [
            { t: 'quote', text: 'Composure is a competitive advantage.', by: 'Skill 2 · Self-regulation' },
            { t: 'cols2', items: [
              { title: 'What it means', list: [
                'Managing your impulses and emotional reactions',
                'Staying composed, even when provoked or pressured',
                'Deliberately choosing thoughtful, calm responses over emotional ones',
              ] },
              { title: 'Why it matters', text: `High-stakes conversations often bring out frustration, defensiveness or even aggression. Without self-regulation, your response can damage the relationship or the outcome, even if you're "right".` },
            ] },
            { t: 'img', src: img('self-regulation'), alt: 'A negotiator staying composed while the person across the table gestures emphatically', ratio: '16/9', caption: 'Composure under pressure: the other side pushes, and you choose your response.' },
            { t: 'p', text: `**Technique: Name & Reframe.** Two short sentences, said silently to yourself, that move you from inside the reaction to observing it.` },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Step 1', title: 'Name', color: 'var(--orange)', text: `Start by naming what's happening internally: **"I'm feeling defensive."**`, list: [`Naming the emotion activates self-awareness. It shifts you from being *inside* the reaction to *observing* it, and this alone can reduce the intensity of the feeling.`] },
              { eyebrow: 'Step 2', title: 'Reframe', color: 'var(--navy-2)', text: `Then reframe the meaning of the situation in a calmer, more constructive way: **"This is a high-pressure moment, but not a personal threat."**`, list: [`The stress doesn't mean you're under attack. It's just pressure, not danger.`] },
            ] },
            { t: 'diagram', name: 'Regulate' },
            { t: 'research', added: true, title: 'Why naming and reframing work', text: `Both halves of the technique have research behind them. In a brain-imaging study, simply **putting a feeling into words** reduced activity in the amygdala, a region involved in threat responses. In separate experiments, people who **reappraised their anxiety** before a stressful task, by saying "I am excited" instead of trying to calm down, performed better at public speaking and under test conditions than those who tried to suppress it. Reframing works best when the new meaning is believable, which is why "pressure, not danger" is more useful than "I'm totally fine".`, cite: ['lieberman2007', 'brooks2014'] },
          ],
        },
        {
          id: 'l2-anchors', title: 'Physical anchor techniques',
          blocks: [
            { t: 'p', text: `When emotion rises, your body reacts first. These three techniques use the body to bring the mind back. Try the first one now.` },
            { t: 'p', text: `**Deep breathing (4–7–8 method).** Inhale quietly through your nose for 4 seconds. Hold your breath for 7 seconds. Exhale completely through your mouth for 8 seconds, making a gentle whooshing sound. Repeat 3–4 times.` },
            { t: 'breathing' },
            { t: 'p', text: `**Why it works:** this pattern activates the parasympathetic nervous system, slowing your heart rate and signalling to your body that it's safe. It reduces stress hormones and helps centre your attention in the present moment. The counted rhythm also gives your mind something steady to focus on instead of spiralling thoughts.` },
            { t: 'cards', cols: 2, items: [
              { eyebrow: 'Anchor 2', title: 'Grounding', color: 'var(--b-assertive)', text: `Sit or stand with both feet flat on the ground. Take a slow, deep breath in through your nose and out through your mouth. Direct your eyes to something neutral (a nearby object, the floor, your hands). As you breathe, silently note the sensations: the floor's firmness, your breath, what you see.`, list: [`**Why it works:** grounding uses touch, sight and breath to remind your body and brain that you are here, now, and safe. It interrupts anxiety or reactivity and re-centres your awareness.`] },
              { eyebrow: 'Anchor 3', title: 'Write 3 words: Calm – Curious – Clear', color: 'var(--orange)', text: `Write the three words on a card, in a notebook or in your phone. When you feel tense or distracted, look at them or rewrite them slowly, reflecting on each:`, list: ['**Calm:** relax your breath and shoulders.', '**Curious:** open your mind without judgment.', '**Clear:** focus on simplicity and understanding.', `**Why it works:** writing engages your body and slows your mind. Over time the words become cues that quickly return you to a balanced mindset.`] },
            ] },
            { t: 'callout', tone: 'tip', title: 'Practice tip: develop anchor phrases', text: `Prepare a few phrases you can use under stress. They buy you a few seconds to breathe and choose your response:`, list: [`"Let me think about that for a second."`, `"That's an important point, I want to make sure I respond well."`] },
            { t: 'research', added: true, title: 'What the evidence says about slow breathing', text: `A systematic review of slow-breathing studies found that breathing at under ten breaths per minute is linked with higher heart-rate variability, more parasympathetic ("rest and digest") activity, and lower anxiety and arousal. The 4–7–8 cycle takes 19 seconds, about three breaths a minute, so it sits well inside that range. Most studies looked at slow breathing in general rather than this exact count, so treat 4–7–8 as one practical way to slow down, not the only one.`, cite: ['zaccaro2018'] },
          ],
        },
        {
          id: 'l2-social', title: '3 · Social awareness',
          blocks: [
            { t: 'quote', text: 'Social awareness is reading the room, not just hearing the words.', by: 'Skill 3 · Social awareness' },
            { t: 'img', src: img('social-awareness'), alt: 'A man standing at the edge of a meeting room, observing the group', ratio: '16/9' },
            { t: 'cols2', items: [
              { title: 'What it means', list: [
                'Reading subtle shifts in tone, pace, body language and group energy',
                `Noticing when engagement changes: who's leaning in, tuning out or tensing up`,
                'Recognising that emotion often drives logic: defensiveness usually signals pride, fear or pressure',
                'Sensing unspoken dynamics and influence patterns shaping the conversation',
              ] },
              { title: 'Why it matters', text: `Logic alone doesn't move people; emotion does. When you're socially aware, you can sense when the conversation turns from rational to emotional, when someone feels unheard, or when tension rises under polite words. Spotting these shifts early lets you **adapt your tone, pace or approach before resistance hardens**.` },
            ] },
            { t: 'p', text: '**How to become more socially aware:**' },
            { t: 'cards', items: [
              { eyebrow: '1', title: 'Pay attention to tone shifts', color: 'var(--navy-2)', list: ['Are they talking faster, quieter, sharper?', 'Did the energy drop or suddenly spike?'], example: `A change in tone often signals a change in emotion: curiosity, defensiveness or frustration.` },
              { eyebrow: '2', title: 'Watch for non-verbal signals', color: 'var(--orange)', list: ['Crossed arms, sighing, avoiding eye contact', 'Nervous laughter, fidgeting, deep inhales'], example: `The body often reveals what the mouth conceals: tension, impatience or discomfort.` },
              { eyebrow: '3', title: 'Track emotional "hot spots"', color: 'var(--b-assertive)', list: ['What topics make them defensive, excited or shut down?', `Are they stuck on a "detail" that doesn't seem logical?`], example: `That's usually a sign you've hit an emotional nerve, not a rational barrier. Instead of pushing, pause and explore what the resistance might represent.` },
            ] },
            { t: 'callout', tone: 'tip', title: 'Practice tip: scan the room, not your notes', text: `Before reacting, ask yourself: Who's suddenly quiet? Who's mirroring or distancing? What just changed in the emotional temperature? **The best negotiators don't just listen to words, they listen to the weather of the room.**` },
            { t: 'activity', ...act.readTheRoom },
          ],
        },
        {
          id: 'l2-empathy', title: '4 · Empathy',
          blocks: [
            { t: 'quote', text: `Empathy is not agreement, it's emotional connection in action.`, by: 'Skill 4 · Empathy' },
            { t: 'p', text: `Social awareness helps you **spot** emotions; empathy helps you **meet** them. It's the bridge from recognition to response: tuning into what someone feels and showing you understand, without judgment or agenda.` },
            { t: 'person', img: img('empathy-work'), alt: 'Two colleagues in a meeting, one listening closely, chin resting on her hand', eyebrow: 'Empathy at work', name: 'Meet the feeling before you try to change it', text: 'A client or colleague who feels understood stops defending and starts engaging. Empathy comes first; the arguments come after.' },
            { t: 'cols2', items: [
              { title: 'What it means', list: [
                `Listening for what's felt beneath what's said`,
                `Naming or reflecting the emotion behind their words ("It sounds like this has been frustrating.")`,
                'Validating the feeling before addressing the logic',
                `Showing curiosity instead of correction: "Help me understand what's driving that."`,
                'Giving people space to feel seen and safe before moving the conversation forward',
              ] },
              { title: 'Why it matters', text: `Empathy transforms tension into trust. When people feel understood, they stop defending and start engaging. It defuses emotion, uncovers hidden drivers and opens space for problem-solving. **Without it, even the best arguments sound like opposition.**` },
            ] },
            { t: 'examples', items: [`It sounds like this has been really frustrating.`, `It seems like you're under pressure from your team.`, `This might be coming across as one-sided. Would it help to walk through the intent again?`] },
            { t: 'p', text: '**How to practise empathy in the moment:**' },
            { t: 'steps', items: [
              { title: 'Pause before responding', text: 'Let emotion land before logic leads.' },
              { title: `Reflect, don't fix`, text: `Show understanding first: "That sounds like a lot to manage."` },
              { title: 'Name what you sense', text: `"I get the feeling this decision carries extra pressure."` },
              { title: 'Stay present', text: 'Eye contact, calm tone, open posture. Small signals of attention build trust.' },
            ] },
            { t: 'callout', tone: 'tip', title: 'Practice tip: lean in to hot spots', text: `When you sense an emotional hot spot, don't push past it, lean in gently. Ask yourself: "What emotion might be driving this reaction?" and "How can I show I understand before trying to persuade?" Empathy is how you turn social awareness into influence: by meeting emotion with understanding, not argument.` },
            { t: 'research', added: true, title: 'Empathy that keeps your interests in view', text: `Experiments by Galinsky and colleagues separated two kinds of empathy. **Perspective-taking** (understanding what the other side thinks and needs) helped negotiators find creative deals and reach agreement more often, without giving away value. **Emotional empathy** alone (feeling what they feel) helped less, and sometimes led people to concede too much. That is exactly the module's point: empathy is not agreement. Understand their feelings fully, and keep your own interests clear.`, cite: ['galinsky2008'] },
          ],
        },
        {
          id: 'l2-summary', title: 'Summary: the EI skillset',
          blocks: [
            { t: 'p', text: `Emotional intelligence in negotiation is a **skillset, not a trait**. Like any skill, it gets stronger with practice.` },
            { t: 'table', head: ['EI skill', 'Core focus', 'Practical application in negotiation'], rows: [
              ['Self-awareness', 'Know what you feel and why', 'Pause when triggered; avoid emotional hijack; set the tone you want to lead with'],
              ['Self-regulation', 'Manage your reactions', 'Stay calm under pressure; respond thoughtfully; use tone and timing strategically'],
              ['Social awareness', 'Read the room and group dynamics', 'Notice tone shifts, body language and energy changes; sense when logic stops working and emotion takes over; adapt your approach'],
              ['Empathy', `Tune into others' emotions`, 'Surface hidden concerns; defuse tension; build emotional connection'],
            ] },
            { t: 'reflect', id: 'r-l2-rating', prompt: `Rate yourself from 1 to 5 on each of the four skills. Which one is your strongest at the table, and which one lets you down under pressure? Write one thing you will do in your next negotiation to practise the weaker skill.` },
          ],
        },
      ],
    },
    {
      id: 'l3', kind: 'lesson', title: `3 · Decode, don't dismiss`,
      steps: [
        {
          id: 'l3-decode', title: 'Your job: decode the emotion',
          blocks: [
            { t: 'lead', text: `Most people try to debate the words. Emotionally intelligent negotiators decode the emotion behind the words.` },
            { t: 'p', text: `When someone says, "This just doesn't feel right," your job isn't to explain harder, it's to **understand deeper**. Each card below shows a rational statement you will hear often. Before you flip it, guess the emotion that might sit underneath.` },
            { t: 'flipCards', items: act.decodeCards, frontLabel: 'They say', backLabel: 'Emotionally intelligent response', hint: 'Guess the feeling, then tap to decode →' },
            { t: 'callout', tone: 'key', title: 'The pattern', text: `Every response does the same three things: it **accepts** the statement without arguing ("Totally fair", "Of course", "Makes sense"), it **invites** them to say more, and it gives them back a sense of **control**.` },
          ],
        },
        {
          id: 'l3-reactions', title: 'Responding to emotional reactions',
          blocks: [
            { t: 'p', text: `Some reactions are louder than a rational statement. Here is what to say instead when emotions show up openly. Practise first, then open the full table and keep it as a reference.` },
            { t: 'activity', ...act.insteadOfSaying },
            { t: 'table', ...act.emotionalReactions, reveal: 'Show the full reference table (12 reactions)', caption: 'Responses based on emotional reactions.' },
            { t: 'reflect', id: 'r-l3', prompt: `Which "instead of saying" line do you catch yourself using most? Write the situation where it usually happens and the replacement line you will use next time.` },
          ],
        },
      ],
    },
    {
      id: 'l4', kind: 'lesson', title: '4 · Voice tonality',
      steps: [
        {
          id: 'l4-voices', title: 'Three voices of influence',
          blocks: [
            { t: 'lead', text: `"It's not about **what** you say, but **how** you say it."` },
            { t: 'p', text: `The same sentence can calm a room or inflame it. Skilled negotiators use three distinct voice styles deliberately. Each card has a short recording; listen to all three before you read on.` },
            { t: 'voices', items: [
              { name: 'Assertive voice', style: 'Firm, straightforward, commanding', color: 'var(--navy-2)', img: img('voice-assertive'), audio: 'audio/m2/voice-assertive.mp4',
                rows: [['Main purpose', 'Project confidence and authority'], ['Use it to', 'Lead, influence, set boundaries or pitch'], ['Tone', 'Clear, firm, steady'], ['Speed', 'Medium, deliberate'], ['Volume', 'Medium to strong'], ['Effect', 'Encourages respect and compliance'], ['Risk if overused', 'Can feel cold or intimidating'], ['How to use it', 'Downward inflection to sound certain; steady rhythm; control filler words; avoid trailing off']],
                vibe: `I've got this, let's move forward.` },
              { name: 'Midnight voice', style: 'FM RJ: calm, steady, slow, intimate', color: '#6b5bd2', img: img('voice-midnight'), audio: 'audio/m2/voice-midnight.mp4',
                rows: [['Main purpose', 'Create calm, trust and intimacy'], ['Use it to', 'Soothe, de-escalate, connect emotionally, resolve conflict'], ['Tone', 'Smooth, low, relaxed'], ['Speed', 'Slow and thoughtful'], ['Volume', 'Softer, more intimate'], ['Effect', 'Builds trust and emotional safety'], ['Risk if overused', 'Can feel too passive or vague'], ['How to use it', 'Soft downward inflection, longer pauses, close mic proximity; elongate vowels for warmth']],
                vibe: `You're safe here, let's take it slow.` },
              { name: 'Playful / positive voice', style: 'Warm, approachable, collaborative', color: 'var(--orange)', img: img('voice-playful'), audio: 'audio/m2/voice-playful.mp4',
                rows: [['Main purpose', 'Build rapport, energy and approachability'], ['Use it to', 'Energise and engage; team motivation, storytelling, friendly negotiations'], ['Tone', 'Upbeat, warm, friendly'], ['Speed', 'Medium to fast, with rhythm and bounce'], ['Volume', 'Moderate to high, lively'], ['Effect', 'Creates comfort, motivation and openness'], ['Risk if overused', 'Can feel unprofessional or too casual'], ['How to use it', 'Upward inflection for friendliness (not excessively); smile while speaking; vary tone for energy']],
                vibe: `This is going to be fun, we're in this together.` },
            ] },
            { t: 'callout', tone: 'tip', title: 'Try it out loud', text: `Say this line three times, once in each voice, and notice how the meaning changes: **"I hear what you are saying, and I understand how you feel, but we still need to find a solution, together."**` },
            { t: 'research', added: true, title: 'Your voice carries more than your words', text: `In a series of experiments, evaluators judged job candidates' pitches either by reading a transcript or by hearing the same words spoken. When they **heard** the pitch, they rated the candidate as more competent, thoughtful and intelligent, and were more likely to want to hire them. The researchers traced the effect to vocal cues such as variation in pitch and pacing. The words were identical; the voice made the difference.`, cite: ['schroeder2015'] },
          ],
        },
        {
          id: 'l4-practice', title: 'Practice: pick the voice',
          blocks: [
            { t: 'activity', ...act.pickTheVoice },
            { t: 'reflect', id: 'r-l4', prompt: `Record yourself on your phone saying the voice example line in all three voices. Which one comes naturally to you, and which one feels awkward? Where in your work would the awkward one be most useful?` },
          ],
        },
      ],
    },
    {
      id: 'l5', kind: 'lesson', title: '5 · De-escalation and strategic empathy',
      steps: [
        {
          id: 'l5-signs', title: 'When de-escalation is needed',
          blocks: [
            { t: 'p', text: `Emotions play a critical role in shaping decisions and outcomes. **Unmanaged emotions derail negotiations**, leading to conflict and poor decisions. De-escalation restores focus, reduces tension and fosters productive dialogue. That is why emotional ignorance is dangerous.` },
            { t: 'p', text: '**Four signs that de-escalation is needed:**' },
            { t: 'cards', cols: 4, items: [
              { eyebrow: 'Sign 1', title: 'Increased tension or hostility', color: 'var(--b-aggressive)', text: 'Raised voices, defensive body language or aggressive behaviour suggest emotional escalation.' },
              { eyebrow: 'Sign 2', title: 'Lack of active listening', color: 'var(--b-manipulative)', text: 'One or both parties interrupt, ignore points, or repeat their stance without engaging.' },
              { eyebrow: 'Sign 3', title: 'Personal attacks or blame', color: 'var(--orange)', text: 'When discussion shifts from the issue to personal criticism, emotions have overtaken logic.' },
              { eyebrow: 'Sign 4', title: 'Emotional outbursts', color: 'var(--b-passive)', text: 'Visible frustration, anger or impatience show a loss of control over emotions.' },
            ] },
            { t: 'p', text: '**Two strategies for managing other people\'s emotions** (adapted from Voss, *Never Split the Difference*, 2016):' },
            { t: 'cards', cols: 2, items: [
              { title: 'Allegation Assessment', img: img('allegation'), color: 'var(--navy-2)', text: 'Pre-emptively address potential negative perceptions.' },
              { title: 'Strategic empathy', img: img('strategic-empathy'), color: 'var(--orange)', text: 'Actively listen to and acknowledge their concerns.' },
            ] },
          ],
        },
        {
          id: 'l5-allegation', title: 'The power of an Allegation Assessment',
          blocks: [
            { t: 'cards', items: [
              { eyebrow: '1', title: 'What is it?', color: 'var(--navy-2)', text: `The practice of proactively **naming the negative thoughts, assumptions or objections** the other person may have about you or your position, *before they say them*. By doing this, you disarm resistance and build immediate trust.`, list: [`"You probably think I'm only looking out for myself."`, `"This might seem like a one-sided proposal."`, `"You may feel we haven't listened enough."`] },
              { eyebrow: '2', title: 'Why it works', color: 'var(--orange)', text: 'Calling out objections in advance:', list: ['Reduces defensiveness', 'Builds credibility and empathy', 'Shifts control of the narrative', `You're not admitting guilt. You're showing you understand their concerns, which lowers tension and opens the door to real dialogue.`] },
              { eyebrow: '3', title: 'How to use it', color: 'var(--b-assertive)', text: `Before any negotiation, ask: **"What might they fear, assume or resent about me or my position?"** Then open by naming those concerns calmly and confidently:`, list: [`"You might be thinking…"`, `"It may seem like…"`, `"You probably feel…"`] },
            ] },
            { t: 'quote', text: `If they say it, it's a problem. If you say it first, it's connection.`, by: 'The principle behind the Allegation Assessment' },
            { t: 'callout', tone: 'tip', title: 'Pro tips', list: ['Stack multiple concerns to clear the air quickly.', 'Use a calm, non-defensive tone.', 'Follow with a question or proposal once tension lowers.'] },
            { t: 'reflect', id: 'r-l5-allegation', prompt: `Build your own Allegation Assessment. Think of a difficult conversation coming up. List three things the other person might fear, assume or resent about you or your position. Then write your opening, starting with "You might be thinking…", stacking all three, and ending with a question.` },
          ],
        },
        {
          id: 'l5-empathy', title: 'Strategic empathy in three moves',
          blocks: [
            { t: 'p', text: `Strategic empathy builds trust and psychological safety by valuing the other side's concerns and perspectives, which leads to better collaboration and better outcomes. It has three practical moves.` },
            { t: 'cards', items: [
              { eyebrow: 'Move 1', title: 'Active listening with acknowledgement', img: img('listening'), color: 'var(--b-assertive)', text: 'Understand emotions without agreeing.', list: [`Focus on what they're saying: their words, tone and non-verbal cues.`, 'Avoid interrupting or rushing to provide solutions.', 'Acknowledge their emotions without agreeing.'], example: `"That must be hard." · "That does seem challenging."` },
              { eyebrow: 'Move 2', title: 'Labeling emotions', img: img('labeling'), color: 'var(--orange)', text: `Name the other party's emotions to reduce defensiveness.`, list: ['Pay close attention to emotional cues.', `Name the emotion you sense: "It sounds like…", "It seems like…", "You look…", "It feels like…"`, 'Give them space to confirm or elaborate.'], example: `A partner seems unhappy with progress: "It sounds like you're frustrated with how things are moving." This opens dialogue and surfaces the specific concerns faster.` },
              { eyebrow: 'Move 3', title: 'Verbal mirroring to encourage dialogue', img: img('mirroring'), color: '#6b5bd2', text: 'Repeat key phrases to prompt elaboration.', list: ['Listen for key phrases or emotionally charged statements.', 'Repeat back the last few words, or the most important part.', 'Let the other party elaborate.'], example: `A colleague says, "I'm not sure this contract is in our favor." You reply: "Not in your favor?" They explain which parts concern them, so you can address them.` },
            ] },
            { t: 'research', added: true, title: 'Evidence for labeling and mirroring', text: `**Labeling:** the affect-labeling study you met in Module 1 showed that putting a feeling into words calms the brain's threat response. When *you* name *their* feeling, you help them do the same. **Mirroring:** in negotiation experiments, people who subtly mirrored their counterpart's mannerisms reached agreement far more often and created more value for both sides than people who did not. That research looked at mirroring behaviour; Voss applies the same principle to words, by repeating the last one to three key words.`, cite: ['lieberman2007', 'maddux2008', 'voss2016'] },
          ],
        },
        {
          id: 'l5-practice', title: 'Practice: spot the technique',
          blocks: [
            { t: 'activity', ...act.spotTheTechnique },
          ],
        },
      ],
    },
    {
      id: 'l6', kind: 'lesson', title: '6 · Confront without confrontation',
      steps: [
        {
          id: 'l6-flow', title: 'The six-step flow',
          blocks: [
            { t: 'lead', text: 'How to confront an issue, and get your way, without confrontation.' },
            { t: 'steps', items: [
              { title: 'Active listening with the midnight voice', text: 'Use a calm, slow, measured tone. It conveys confidence and trustworthiness, even when discussing difficult issues, and builds psychological safety.' },
              { title: `Start with "I'm sorry…" + acknowledgement`, text: 'Expressing empathy shows understanding, even if you disagree. It creates a foundation for productive dialogue.' },
              { title: 'Label', text: 'Name the unspoken feeling or emotion to validate their perspective and build trust.' },
              { title: 'Verbal mirror', text: 'Repeat key phrases to show active listening and draw them out.' },
              { title: 'Silence', text: 'Allow time for reflection and processing. This creates space for their own realisations.' },
              { title: 'Repeat', text: 'Reinforce key points and restate your perspective in a calm, clear manner.' },
            ] },
            { t: 'scene', ...maya },
            { t: 'img', src: img('handshake'), alt: 'Close-up of a firm, warm handshake', ratio: '3/2', caption: 'The goal of the flow: the issue gets resolved and the relationship stays intact.' },
          ],
        },
        {
          id: 'l6-roleplay', title: 'Role-play: the furious client',
          blocks: [
            { t: 'activity', ...act.angryClient },
            { t: 'reflect', id: 'r-l6', prompt: `Think of a tense conversation you need to have. Script it using the six steps: your "I'm sorry" + acknowledgement line, the label you might use, a phrase you expect to mirror, where you will stay silent, and how you will summarise their real need.` },
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
    'People decide based on emotion, then use logic to justify the decision afterwards (Damasio).',
    'Every negotiation runs two conversations: the rational one (price, deadlines, roles) and the emotional one (trust, respect, status, fairness, control, fear).',
    'Most negotiations fail not because of bad logic, but because the emotional conversation is ignored.',
    'Emotional intelligence is a skillset, not a trait: self-awareness, self-regulation, social awareness and empathy.',
    'Stay composed with Name & Reframe, 4-7-8 breathing, grounding, "Calm – Curious – Clear" and anchor phrases.',
    'Read the weather of the room: tone shifts, non-verbal signals and emotional hot spots tell you more than the words.',
    `Empathy is not agreement. Validate the feeling before addressing the logic. Decode, don't dismiss.`,
    'Use your voice deliberately: assertive to lead, midnight to calm and build trust, playful to energise.',
    `An Allegation Assessment names their fears before they do: if they say it, it's a problem; if you say it first, it's connection.`,
    'To confront without confrontation: midnight voice, "I\'m sorry" + acknowledgement, label, mirror, silence, repeat.',
  ],
  worksheet: {
    file: 'worksheets/module-02-voice-of-influence-worksheet.pdf',
    title: 'The Voice of Influence: Emotional Preparation Worksheet',
    pages: 4,
    contents: ['Pre-negotiation emotional checklist', 'Triggers and anchor phrases', 'Allegation Assessment builder', 'Decode table and voice plan', 'After-action review'],
  },
}

export default m2
