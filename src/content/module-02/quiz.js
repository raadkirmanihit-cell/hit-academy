// Graded quiz. Questions 1–12 come from Raad's module quiz, with the answers Raad marked.
// `added: true` marks extra questions. Every option carries its own feedback (`fb`).
export const quiz = {
  passMark: 0.8,
  questions: [
    {
      id: 'q1',
      q: 'Dr. Antonio Damasio\'s research demonstrated that people primarily make decisions based on:',
      options: [
        { t: 'Logical reasoning and cost-benefit analysis', fb: 'Damasio\'s patients kept their logic and their IQ, yet struggled to decide. Logic alone was not enough to choose.' },
        { t: 'Emotional processes that precede rationalization', correct: true, fb: 'Correct. People decide based on emotion, then use logic to justify the decision afterwards.' },
        { t: 'Cognitive shortcuts and heuristics', fb: 'Shortcuts do shape decisions, but Damasio\'s point was about emotion: without it, people could not decide at all.' },
        { t: 'Moral or ethical frameworks', fb: 'Values matter, but Damasio\'s research showed that emotion comes first and reasoning follows.' },
      ],
    },
    {
      id: 'q2',
      q: 'The "emotional layer" in negotiation primarily includes factors such as:',
      options: [
        { t: 'Deadlines, deliverables, and pricing', fb: 'These belong to the rational conversation: what is said.' },
        { t: 'Tone, status, trust, and perceived fairness', correct: true, fb: 'Correct. The emotional conversation is about trust, respect, status, fairness, control and fear, often carried by tone.' },
        { t: 'Contracts, terms, and objectives', fb: 'These are the content of the deal, part of the rational conversation.' },
        { t: 'Planning, data, and preparation', fb: 'These support the rational conversation. The emotional layer is about how the issue feels.' },
      ],
    },
    {
      id: 'q3',
      q: 'A negotiator who notices their pulse rising during an argument and chooses to pause before responding is demonstrating:',
      options: [
        { t: 'Social awareness', fb: 'Social awareness is reading other people and the room. Here the negotiator is managing their own reaction.' },
        { t: 'Cognitive empathy', fb: 'Empathy is about understanding the other person\'s feelings. This example is about controlling your own.' },
        { t: 'Self-regulation', correct: true, fb: 'Correct. Noticing the pulse is self-awareness; choosing to pause instead of reacting is self-regulation.' },
        { t: 'Strategic mirroring', fb: 'Verbal mirroring means repeating the other person\'s key words. Nothing is being repeated here.' },
      ],
    },
    {
      id: 'q4',
      q: 'The main function of social awareness is to:',
      options: [
        { t: 'Detect unspoken emotions and shifts in group dynamics', correct: true, fb: 'Correct. Social awareness is reading the room: tone shifts, body language, energy and unspoken dynamics.' },
        { t: 'Maintain composure under stress', fb: 'Staying composed is self-regulation, which is about you, not the room.' },
        { t: 'Control emotional expression', fb: 'Controlling your own expression is self-regulation.' },
        { t: 'Memorize negotiation scripts', fb: 'Scripts can help preparation, but social awareness is about noticing what is happening live.' },
      ],
    },
    {
      id: 'q5',
      q: 'When a negotiator says, "It sounds like you\'re feeling pressured by your team," they are applying:',
      options: [
        { t: 'Strategic empathy', correct: true, fb: 'Correct. Naming the emotion you sense ("It sounds like…") is labeling, a core tool of strategic empathy.' },
        { t: 'Emotional detachment', fb: 'Detachment would ignore the feeling. This sentence names it.' },
        { t: 'Logical reframing', fb: 'Nothing is being reframed. The negotiator is reflecting an emotion back.' },
        { t: 'Power mirroring', fb: 'Verbal mirroring repeats the other person\'s own words. This sentence names a feeling they did not state.' },
      ],
    },
    {
      id: 'q6',
      q: 'Which breathing technique is recommended for managing stress during negotiation?',
      options: [
        { t: 'Box breathing (4-4-4-4)', fb: 'Box breathing is a real technique, but the module recommends the 4-7-8 method.' },
        { t: '4-7-8 breathing', correct: true, fb: 'Correct. Inhale for 4, hold for 7, exhale for 8, three to four times, to slow your heart rate and calm the body.' },
        { t: 'Ratio breathing (5-2-6)', fb: 'Not the method taught in this module. The module recommends 4-7-8.' },
        { t: 'Alternate nostril breathing', fb: 'Hard to do discreetly at a negotiating table, and not the method in this module.' },
      ],
    },
    {
      id: 'q7',
      q: 'Which of the following voice styles is best for building rapport and trust during tense discussions?',
      options: [
        { t: 'Assertive voice – firm and commanding', fb: 'The assertive voice projects authority. In a tense moment it can feel cold or intimidating.' },
        { t: 'Midnight voice (FM RJ) – calm, steady and low', correct: true, fb: 'Correct. The midnight voice is slow, low and soft. It signals "you\'re safe here", which builds trust and de-escalates.' },
        { t: 'Playful voice – fast and upbeat', fb: 'The playful voice builds energy, but in a tense discussion it can feel dismissive or unprofessional.' },
        { t: 'Authoritative voice – loud and direct', fb: 'Volume and force raise the temperature further.' },
      ],
    },
    {
      id: 'q8',
      q: 'What does an Allegation Assessment accomplish in negotiation?',
      options: [
        { t: 'Strengthens logical arguments before presenting them', fb: 'An Allegation Assessment works on emotions, not arguments.' },
        { t: 'Anticipates and names negative assumptions to reduce defensiveness', correct: true, fb: 'Correct. By naming the other side\'s likely fears first ("You might be thinking…"), you disarm resistance. If they say it, it\'s a problem; if you say it first, it\'s connection.' },
        { t: 'Forces the counterpart to admit guilt', fb: 'It is about naming their concerns about you. Nobody is asked to admit anything.' },
        { t: 'Encourages one-sided discussion of objections', fb: 'It opens a two-way dialogue: you name the concerns, then follow with a question or proposal.' },
      ],
    },
    {
      id: 'q9',
      q: 'The Assertive Voice is most effective when you need to:',
      options: [
        { t: 'Build calm and emotional safety', fb: 'That is the job of the midnight (FM RJ) voice.' },
        { t: 'Project confidence, leadership, and clarity of intent', correct: true, fb: 'Correct. Use it to lead, set boundaries or pitch: clear, firm and steady, with a downward inflection.' },
        { t: 'Create humor and informality in the discussion', fb: 'That is the playful voice.' },
        { t: 'Encourage relaxation and empathy', fb: 'That is closer to the midnight voice.' },
      ],
    },
    {
      id: 'q10',
      q: 'The "Name & Reframe" technique helps negotiators by:',
      options: [
        { t: 'Avoiding emotional discussions altogether', fb: 'The technique does the opposite: it starts by naming the emotion.' },
        { t: 'Naming their feelings, then redefining the meaning of the moment', correct: true, fb: 'Correct. "I\'m feeling defensive" (name), then "This is a high-pressure moment, but not a personal threat" (reframe).' },
        { t: 'Repeating key phrases to gain time', fb: 'Repeating phrases describes anchor phrases or verbal mirroring, not Name & Reframe.' },
        { t: 'Deflecting emotional responsibility', fb: 'Name & Reframe means taking ownership of your feeling, not deflecting it.' },
      ],
    },
    {
      id: 'q11',
      q: 'Which response best reflects emotional intelligence when facing defensiveness?',
      options: [
        { t: '"That\'s not true."', fb: 'Contradicting a defensive person usually makes them dig in.' },
        { t: '"That\'s not how I saw it, but I\'d like to understand your view."', correct: true, fb: 'Correct. You keep your own view and open the door to theirs, without attacking.' },
        { t: '"You\'re overreacting."', fb: 'Judging their reaction dismisses the feeling and escalates.' },
        { t: '"You\'re being uncooperative."', fb: 'A label about their character turns the issue into a personal attack.' },
      ],
    },
    {
      id: 'q12',
      q: 'Overall, the goal of emotional intelligence in negotiation is to:',
      options: [
        { t: 'Avoid emotions entirely to stay logical', fb: 'Emotions cannot be removed from decisions. Ignoring them is why many negotiations fail.' },
        { t: 'Leverage emotional awareness to foster trust and influence outcomes', correct: true, fb: 'Correct. EI is not about "feeling your way" through conflict, but about influencing it powerfully and constructively.' },
        { t: 'Focus on efficiency and decision speed', fb: 'EI often speeds things up, but that is a side effect, not the goal.' },
        { t: 'Control the other party\'s reactions', fb: 'You can only manage yourself and influence others. Trying to control people is closer to manipulation.' },
      ],
    },
    {
      id: 'q13', added: true,
      q: 'A colleague says, "I\'m not sure this contract is in our favor." Which reply is an example of verbal mirroring?',
      options: [
        { t: '"It sounds like you\'re worried about the terms."', fb: 'That is a label: it names an emotion. Verbal mirroring repeats their own key words.' },
        { t: '"Not in your favor?"', correct: true, fb: 'Correct. Repeating the last few key words, with a curious tone, invites them to explain which parts worry them.' },
        { t: '"The contract is standard. You\'ll be fine."', fb: 'This reassures and closes the topic instead of drawing them out.' },
        { t: '"Why would you think that?"', fb: '"Why" questions can sound accusatory and make people defend their position.' },
      ],
    },
    {
      id: 'q14', added: true,
      q: 'You are about to propose a budget cut to a team that has already had two cuts this year. Which opening is an Allegation Assessment?',
      options: [
        { t: '"Before you react, let me explain why this is necessary."', fb: 'This asks them to hold their feelings, which tends to raise defensiveness.' },
        { t: '"You probably think we\'re targeting your team again, and that this feels unfair after this year."', correct: true, fb: 'Correct. You name their likely fear and resentment before they do, calmly, which lowers tension and opens dialogue.' },
        { t: '"Every team is being treated the same way."', fb: 'A fair point, but it argues against their feelings instead of naming them.' },
        { t: '"I know nobody likes this, so let\'s get it over with quickly."', fb: 'This skips over their concerns and signals you are not interested in hearing them.' },
      ],
    },
    {
      id: 'q15', added: true,
      q: 'A client says, "We\'ll need to think about it." What is the emotionally intelligent response?',
      options: [
        { t: '"This offer is only valid until Friday."', fb: 'Pressure may confirm the hidden worry instead of surfacing it.' },
        { t: '"Of course. What concerns do you think your team might raise that we could address now?"', correct: true, fb: 'Correct. You respect their process and surface hidden objections early, while you can still address them.' },
        { t: '"What is there to think about? It\'s a great deal."', fb: 'This dismisses their hesitation and sounds like pressure.' },
        { t: '"No problem. Let me know whenever."', fb: 'Polite, but you lose the chance to learn what is holding them back.' },
      ],
    },
  ],
}
