// Extra practice for Module 2: quick checks, "your turn" scripts, say-it-out-loud practice,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.
import { qc, scale, ta, tx, sel } from '../withPractice.js'

const Y = 'You'

const yourTurnStakeholder = {
  t: 'yourTurn',
  id: 'yt-stakeholder',
  title: 'Now you: the frustrated stakeholder',
  setup: 'Priya, a senior stakeholder, has just heard that your project will miss its first milestone by two weeks. She calls you straight away. At each pause, choose what you would say, or write your own line.',
  cast: { Priya: { initials: 'PR', role: 'Head of Operations, internal client' } },
  you: Y,
  script: [
    ['Priya', 'Two weeks? This is ridiculous. I promised the board this would be live in March. You\'ve made me look like a fool.'],
    { pause: {
      prompt: 'Priya is angry and feels exposed in front of the board. What do you say first?',
      options: [
        { t: 'To be fair, the delay isn\'t our fault. The vendor changed the specification.', fb: 'You defend the logic before meeting the emotion. Even if it is true, Priya hears an excuse and feels more exposed.' },
        { t: 'Please calm down. Two weeks isn\'t the end of the world.', fb: '"Calm down" dismisses the feeling and usually raises the temperature. It also plays down what matters to her: her credibility with the board.' },
        { t: 'It sounds like this puts you in a really difficult position with the board. That matters, and I want to help you handle it.', best: true, fb: 'You label the emotion and the real concern (her standing with the board) before any explanation. That lowers the heat and opens the conversation.' },
      ],
      expert: 'It sounds like this puts you in a really difficult position with the board. That matters, and I want to help you handle it.',
      why: 'Decode, don\'t dismiss: the rational issue is two weeks, the emotional issue is status and trust. Naming the emotion first makes the rational conversation possible.',
    } },
    ['Priya', 'Of course it does. They\'ll ask why I didn\'t see this coming.'],
    { pause: {
      prompt: 'She has opened up about her real worry. What do you say next?',
      options: [
        { t: 'Why you didn\'t see it coming?', best: true, fb: 'A verbal mirror. It invites her to say more about what she fears, so you can address the real need instead of guessing.' },
        { t: 'Well, I did flag the vendor risk in last month\'s report.', fb: 'Factually correct, and exactly what she is afraid of hearing in front of the board. It turns empathy into blame.' },
        { t: 'Don\'t worry, they won\'t ask that.', fb: 'Reassurance you can\'t guarantee. It dismisses the fear rather than working with it.' },
      ],
      expert: 'Why you didn\'t see it coming?',
      why: 'Mirroring the last few words keeps her talking and shows you are listening. The more she explains, the clearer her real need becomes.',
    } },
    ['Priya', 'Yes. I need to walk in with a plan, not just bad news.'],
    { pause: {
      prompt: 'Her real need is now clear: a credible plan for the board. How do you move the conversation forward?',
      options: [
        { t: 'Let\'s build that plan together. I can give you a one-page recovery timeline and the two options we have to win back a week. Would Thursday morning work to go through it before your board meeting?', best: true, fb: 'You turn the emotion into a shared next step that meets her real need, and you give her a choice. That restores her sense of control.' },
        { t: 'I\'ll send you an email with the details.', fb: 'Polite, but it leaves her alone with the problem. The emotional conversation is not finished yet.' },
        { t: 'Honestly, there\'s not much we can do now.', fb: 'Passive and hopeless. It confirms her worst fear instead of giving her something to take to the board.' },
      ],
      expert: 'Let\'s build that plan together. I can give you a one-page recovery timeline and the two options we have to win back a week. Would Thursday morning work to go through it before your board meeting?',
      why: 'Once the feeling has been heard, logic can lead. A concrete plan with a choice gives her back control, which is what she was missing.',
    } },
    ['Priya', 'Thursday at nine. Thank you. I was ready to escalate this, but this helps.'],
  ],
  note: 'The delay did not change. What changed was how it felt to Priya: heard, in control, and with a plan to show.',
}

const yourTurnInterrupt = {
  t: 'yourTurn',
  id: 'yt-interrupt',
  title: 'Now you: confront without confrontation',
  setup: 'In the last three project meetings, Lukas, a respected senior colleague, has cut off a junior team member every time she spoke. You lead the project and decide to raise it with him privately. Use the six-step flow.',
  cast: { Lukas: { initials: 'LU', role: 'Senior engineer' } },
  you: Y,
  script: [
    ['Lukas', 'You wanted a word? I\'ve only got five minutes.'],
    { pause: {
      prompt: 'How do you open, knowing Lukas may feel criticised?',
      options: [
        { t: 'Yes. You keep interrupting Anna in meetings and it has to stop.', fb: 'Direct, but it starts with an accusation. Lukas will defend himself instead of listening.' },
        { t: 'I\'m sorry to grab you between things, I know your week is packed. You might think I\'m about to criticise your work. I\'m not: your input in meetings is some of the most valuable we get.', best: true, fb: '"I\'m sorry" plus acknowledgement, then a short Allegation Assessment. You lower his guard before you raise the issue.' },
        { t: 'It\'s nothing really, forget it. It can wait.', fb: 'Avoiding. The behaviour continues and Anna keeps paying the price.' },
      ],
      expert: 'I\'m sorry to grab you between things, I know your week is packed. You might think I\'m about to criticise your work. I\'m not: your input in meetings is some of the most valuable we get.',
      why: 'Steps 1 and 2 of the flow: calm tone, apology and acknowledgement. Naming his likely fear first takes the sting out of what comes next.',
    } },
    ['Lukas', 'Okay… so what is it then?'],
    { pause: {
      prompt: 'Now raise the issue. What do you say?',
      options: [
        { t: 'In the last few meetings, Anna has been cut off when she started to speak, and she has gone quiet. It seems like you\'re frustrated with how slowly some discussions move. Is that fair?', best: true, fb: 'You describe what happened without judging, then label the feeling that may be driving it. That invites him to explain rather than defend.' },
        { t: 'People are saying you\'re rude to Anna.', fb: 'Vague, second-hand and judgemental. It starts an argument about who said what.' },
        { t: 'You\'re always so impatient in meetings.', fb: '"Always" and a personal label: he will push back on the label and miss the point.' },
      ],
      expert: 'In the last few meetings, Anna has been cut off when she started to speak, and she has gone quiet. It seems like you\'re frustrated with how slowly some discussions move. Is that fair?',
      why: 'Step 3, label. Facts first, then the emotion behind the behaviour. The question gives him room to correct you.',
    } },
    ['Lukas', 'Frustrated, yes. We waste so much time going round in circles.'],
    { pause: {
      prompt: 'He has confirmed the label. What now?',
      options: [
        { t: 'Going round in circles?', best: true, fb: 'Step 4, verbal mirror. It draws out the detail of his frustration, which you can then solve together.' },
        { t: 'That\'s no excuse to interrupt people.', fb: 'True, but it shuts the conversation down just as he started to open up.' },
        { t: 'I agree, meetings are too long. Let\'s drop the topic.', fb: 'You trade the real issue for agreement. Anna\'s problem is left unsolved.' },
      ],
      expert: 'Going round in circles?',
      why: 'The mirror, followed by silence (step 5), lets him explain. Once his need is clear, you can restate yours calmly (step 6).',
    } },
    ['Lukas', 'Yes, the same points again and again. Look… I hadn\'t noticed I was cutting Anna off. I\'ll hold back. And maybe we could time-box the discussion items?'],
  ],
  note: 'The issue got raised, the behaviour changed, and Lukas offered a solution himself. That is confrontation without confrontation.',
}

const sayDeescalate = {
  t: 'sayItAloud',
  id: 'say-deescalate',
  title: 'Say it out loud: calm a tense moment with the midnight voice',
  situation: 'In a review meeting, a client\'s project lead says sharply: "We\'ve raised this bug three times. Nobody is listening to us." The room goes quiet and everyone looks at you.',
  task: 'Say your reply out loud in the midnight voice: slow, calm, warm. Two or three sentences.',
  criteria: [
    'Acknowledge the feeling without arguing or defending.',
    'Label the emotion ("It sounds like…", "It seems like…").',
    'Speak slowly, with calm pauses and falling endings.',
    'Invite them to say more, or offer a concrete next step.',
  ],
  modelLine: 'It sounds like you\'ve felt ignored, and that\'s frustrating, especially after raising it three times. You\'re right to push on this. Can you walk me through where it\'s hurting you most, so we fix the right thing first?',
  modelNote: 'Notice the pace and the pauses: the midnight voice slows the room down before any explanation.',
}

export const inserts = {
  'l1-layer': [qc('qc2-layers', 'A client says, "Your price is too high." Which conversation is most likely running underneath?', [
    { t: 'Only the rational one: they want a lower number.', fb: 'Price is the rational layer. The module says there is almost always an emotional layer too.' },
    { t: 'An emotional one about trust, fairness or fear, as well as the rational one about price.', correct: true, fb: 'Right. "Too high" may mean "I don\'t trust the value" or "I\'m afraid of looking bad to my boss".' },
    { t: 'Neither: it is just an opening tactic.', fb: 'It can be a tactic, but treating it only as one means missing the emotion behind it.' },
  ])],
  'l2-self-awareness': [qc('qc2-aware', 'What does self-awareness give you at the negotiation table?', [
    { t: 'The ability to hide every emotion.', fb: 'The goal is not to hide emotions but to notice them.' },
    { t: 'The ability to notice your own reactions, so you can choose your response instead of reacting.', correct: true, fb: 'Right: you can\'t regulate what you haven\'t noticed.' },
    { t: 'The ability to read the other person\'s emotions.', fb: 'That is social awareness, the third skill.' },
  ])],
  'l2-self-regulation': [qc('qc2-reframe', 'You feel defensive when a client attacks your proposal. Which line is a good reframe?', [
    { t: '"They\'re out to get me."', fb: 'That makes the threat bigger, not smaller.' },
    { t: '"This is a high-pressure moment, but not a personal threat."', correct: true, fb: 'Right. A believable reframe turns danger into pressure.' },
    { t: '"I\'m totally fine."', fb: 'Hard to believe in the moment, so it rarely works. Name the feeling first, then reframe.' },
  ])],
  'l2-social': [qc('qc2-social', 'The client\'s finance lead goes quiet and starts checking their phone after you mention payment terms. What does social awareness suggest?', [
    { t: 'Ignore it and keep going with your agenda.', fb: 'You may be pushing past an emotional hot spot.' },
    { t: 'You may have hit a hot spot: pause and explore what payment terms mean to them.', correct: true, fb: 'Right. A sudden change in energy often signals an emotional nerve, not a rational barrier.' },
    { t: 'Speed up so you finish before they lose interest.', fb: 'Rushing increases resistance. Slow down and explore.' },
  ])],
  'l2-empathy': [qc('qc2-empathy', 'Which statement best describes empathy in negotiation?', [
    { t: 'Agreeing with the other side so they feel good.', fb: 'Empathy is not agreement. You can understand fully and still hold your position.' },
    { t: 'Understanding and acknowledging their feelings, while keeping your own interests clear.', correct: true, fb: 'Right: perspective-taking helps you find better deals without giving value away.' },
    { t: 'Feeling exactly what they feel.', fb: 'Emotional empathy alone can lead you to concede too much.' },
  ])],
  'l3-decode': [qc('qc2-pattern', 'An emotionally intelligent response to "This just doesn\'t feel right" does three things. Which?', [
    { t: 'Explains, persuades and closes.', fb: 'Explaining harder is debating the words. Decode the emotion instead.' },
    { t: 'Accepts the statement, invites them to say more, and gives them a sense of control.', correct: true, fb: 'Right: accept, invite, give control.' },
    { t: 'Agrees, apologises and offers a discount.', fb: 'That gives away value before you know what the feeling is about.' },
  ])],
  'l3-reactions': [yourTurnStakeholder],
  'l4-voices': [qc('qc2-voice', 'When does the playful (positive) voice help most?', [
    { t: 'When you set a firm boundary on price.', fb: 'That moment calls for the assertive voice.' },
    { t: 'When you build rapport at the start, or open up a brainstorm.', correct: true, fb: 'Right. It relaxes people and makes them more open and creative.' },
    { t: 'When you deliver serious bad news.', fb: 'Playfulness here can feel dismissive. The midnight voice fits better.' },
  ])],
  'l4-practice': [sayDeescalate],
  'l5-allegation': [qc('qc2-allegation', 'When does an Allegation Assessment work best?', [
    { t: 'At the start, before you raise the difficult point, so you name their concern before they do.', correct: true, fb: 'Right. If they say it first, it\'s a problem; if you say it first, it\'s connection.' },
    { t: 'After they have complained, to defend yourself.', fb: 'By then it sounds like an excuse. The power is in naming it first.' },
    { t: 'Only in a follow-up email after the meeting.', fb: 'It works best in the conversation itself, before the emotion builds.' },
  ])],
  'l5-empathy': [qc('qc2-label', 'You say, "It sounds like the timeline worries you." What should you do next?', [
    { t: 'Explain straight away why the timeline is fine.', fb: 'You jump back to logic before they have had a chance to respond to the label.' },
    { t: 'Pause, and let them confirm, correct or expand on it.', correct: true, fb: 'Right. The silence after a label is where they tell you what is really going on.' },
    { t: 'Add two or three more labels to show you understand.', fb: 'Stacking labels feels like a technique. One label, then listen.' },
  ])],
  'l6-flow': [yourTurnInterrupt],
}

export const confidence = {
  id: 'conf-m2',
  items: [
    { id: 'c1', text: 'Noticing and managing my own emotions under pressure' },
    { id: 'c2', text: 'Reading the emotional conversation behind the words' },
    { id: 'c3', text: 'Using my voice deliberately (assertive, midnight, playful)' },
    { id: 'c4', text: 'Labeling and mirroring to calm a tense conversation' },
    { id: 'c5', text: 'Raising a difficult issue without creating conflict' },
  ],
}

export const planner = {
  id: 'planner-m2',
  title: 'Your emotional preparation planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real conversation you are preparing for: it takes 15–20 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The conversation', fields: [
      tx('what', 'The conversation I\'m preparing for', 'e.g. Telling a key client their launch will slip by two weeks'),
      tx('when', 'When it happens', 'e.g. Tuesday 10:00, video call'),
      tx('who', 'Who I\'ll be talking to', 'Name and role'),
    ] },
    { id: 'p1', title: 'Pre-negotiation emotional checklist', hint: 'Answer honestly before you walk in. Self-awareness comes first.', fields: [
      ta('bring', 'What emotions am I bringing in today?', 'e.g. Tired, a bit anxious about the numbers', 2),
      ta('trigger', 'What might trigger me in this conversation?', 'A phrase, a topic, a person…', 2),
      ta('showup', 'How do I want to show up?', 'e.g. Calm, curious and clear', 2),
      scale('calm', 'How calm do I feel right now? (1 = very tense, 5 = very calm)'),
    ] },
    { id: 'p2', title: 'Triggers and anchor phrases', hint: 'Plan how you will regulate yourself in the moment.', fields: [
      ta('name', 'Name: the feeling I expect ("I\'m feeling…")', '', 2),
      ta('reframe', 'Reframe: the calmer meaning I\'ll use', 'e.g. "This is pressure, not danger."', 2),
      sel('anchor', 'My physical anchor', ['4–7–8 breathing', 'Grounding', 'Calm – Curious – Clear', 'Another technique']),
      ta('phrases', 'My anchor phrases (one per line)', '"Let me think about that for a second."'),
    ] },
    { id: 'p3', title: 'Allegation Assessment builder', hint: 'What might they fear, assume or resent about you or your position? Name it before they do.', fields: [
      ta('fears', 'Three things they might think about me or my position (one per line)', ''),
      ta('opening', 'My opening, word for word', '"You might be thinking… It may seem like… You probably feel…"'),
      ta('question', 'The question or proposal I\'ll follow with', '', 2),
    ] },
    { id: 'p4', title: 'Decode table and voice plan', hint: 'Prepare for the statements you expect, and decide which voice fits each moment.', fields: [
      ta('expect', 'Statements or reactions I expect from them', 'e.g. "That\'s too expensive", "We\'ve been let down before"'),
      ta('emotion', 'The emotion that might sit underneath each one', ''),
      ta('response', 'My decode response: accept, invite, give control', ''),
      sel('voice-open', 'Voice for the opening', ['Assertive', 'Midnight', 'Playful / positive']),
      sel('voice-hard', 'Voice for the hardest moment', ['Assertive', 'Midnight', 'Playful / positive']),
      ta('label', 'A label I might use ("It sounds like…")', '', 2),
    ] },
    { id: 'p5', title: 'After-action review', hint: 'Come back after the conversation.', fields: [
      ta('happened', 'What happened, in two sentences', '', 2),
      scale('r1', 'I noticed my own emotions in the moment.'),
      scale('r2', 'I decoded their emotion before arguing the logic.'),
      scale('r3', 'I used my voice deliberately.'),
      ta('keep', 'What I\'ll repeat next time', '', 2),
      ta('change', 'What I\'ll change next time', '', 2),
    ] },
  ],
}
