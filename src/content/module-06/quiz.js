// Graded quiz. Questions 1–12 come from Raad's module quiz, with the answers Raad marked.
// `added: true` marks extra questions. Every option carries its own feedback (`fb`).
export const quiz = {
  passMark: 0.8,
  questions: [
    {
      id: 'q1',
      q: 'What is the central idea behind The Psychology of Perception in negotiation?',
      options: [
        { t: 'Decisions are based purely on logic and facts.', fb: 'Facts matter, but decisions are rarely driven by facts alone.' },
        { t: 'Decisions are influenced more by perception than by facts.', correct: true, fb: 'Correct. How a fact is perceived often matters more than the fact itself, so shaping perception with integrity is a core skill.' },
        { t: 'Negotiation success depends on aggressive persuasion.', fb: 'This module is about guiding perception ethically, not about pressure.' },
        { t: 'Emotional appeal has no role in influencing perception.', fb: 'Emotion plays a large role: loss aversion and fairness are both emotional responses.' },
      ],
    },
    {
      id: 'q2',
      q: 'According to the chapter, which psychological principle suggests people fear losses more than they value gains?',
      options: [
        { t: 'Reciprocity Bias', fb: 'Reciprocity is the urge to return favours.' },
        { t: 'Strategic Anchoring', fb: 'Anchoring is about the first reference point.' },
        { t: 'Loss Aversion', correct: true, fb: 'Correct. People feel about twice as much pain from a loss as pleasure from an equal gain.' },
        { t: 'Fairness Play', fb: 'Fairness Play taps the desire for equitable outcomes.' },
      ],
    },
    {
      id: 'q3',
      q: 'Which of the following best applies the Loss Aversion principle in negotiation?',
      options: [
        { t: 'Emphasizing the benefits of accepting an offer', fb: 'That is a gain frame. Loss aversion works through what they would lose.' },
        { t: 'Focusing on the potential loss if the offer is declined', correct: true, fb: 'Correct. Highlighting what they stand to lose makes the proposal feel more valuable and urgent.' },
        { t: 'Offering extra bonuses to motivate agreement', fb: 'Bonuses are gains, and gains motivate less than avoided losses.' },
        { t: 'Avoiding any mention of risk or loss', fb: 'This gives up the most powerful frame available.' },
      ],
    },
    {
      id: 'q4',
      q: 'What is the purpose of Strategic Anchoring?',
      options: [
        { t: 'To avoid setting any initial expectations', fb: 'Anchoring is precisely about setting the first expectation.' },
        { t: 'To establish the first reference point that shapes all future negotiation discussions', correct: true, fb: 'Correct. Later judgements adjust around the first number, so whoever sets it gains an advantage.' },
        { t: 'To make random offers that confuse the other party', fb: 'A good anchor is justified with data, not random.' },
        { t: 'To wait for the other party to present their offer first', fb: 'Waiting hands the anchor to them. If they go first, counter-anchor quickly.' },
      ],
    },
    {
      id: 'q5',
      q: 'Why are precise numbers effective when setting an anchor?',
      options: [
        { t: 'They create an impression of accuracy and credibility.', correct: true, fb: 'Correct. A number like €47,850 suggests careful calculation, so it is harder to dismiss.' },
        { t: 'They make negotiations less flexible.', fb: 'Precision signals research, not rigidity.' },
        { t: 'They signal emotional commitment.', fb: 'They signal careful analysis, not emotion.' },
        { t: 'They distract the counterpart from main points.', fb: 'The aim is credibility, not distraction.' },
      ],
    },
    {
      id: 'q6',
      q: 'What does the Fairness Play principle leverage?',
      options: [
        { t: 'The tendency to conform to authority', fb: 'Authority is a different influence principle.' },
        { t: 'The innate human desire for equitable outcomes', correct: true, fb: 'Correct. People reject deals they see as unfair, even when the deal would benefit them.' },
        { t: 'The fear of losing control', fb: 'That relates more to the Illusion of Choice.' },
        { t: 'The drive for personal gain over shared value', fb: 'Fairness is about what is equitable for both sides.' },
      ],
    },
    {
      id: 'q7',
      q: 'Which strategy supports using the Illusion of Choice effectively?',
      options: [
        { t: 'Offer two or more options that all benefit your position', correct: true, fb: 'Correct. The other party gains a sense of autonomy, and any option they choose works for you.' },
        { t: 'Give unlimited options to show flexibility', fb: 'Too many options overwhelm people and stall decisions.' },
        { t: 'Force a yes/no decision early on', fb: 'A yes/no question invites a "no". Offer a choice instead.' },
        { t: 'Hide your preferred option completely', fb: 'Your preferred option should be there, structured to look the most reasonable.' },
      ],
    },
    {
      id: 'q8',
      q: 'The goal of Calibrated Questions is to:',
      options: [
        { t: 'Pressure the other party into agreement', fb: 'Calibrated questions guide without direct confrontation.' },
        { t: 'Shift the other party from defensiveness to problem-solving', correct: true, fb: 'Correct. "What" and "How" questions invite them to help solve the problem.' },
        { t: 'Test how much the other party knows', fb: 'The aim is collaboration, not a test.' },
        { t: 'Confuse the counterpart with open-ended language', fb: 'They are open-ended to invite information, not to confuse.' },
      ],
    },
    {
      id: 'q9',
      q: 'Which of the following is a well-structured calibrated question?',
      options: [
        { t: '"Why are you rejecting this offer?"', fb: '"Why" often sounds like an accusation and triggers defensiveness.' },
        { t: '"How can we make this proposal work better for you?"', correct: true, fb: 'Correct. It starts with "How", is open-ended and invites problem-solving.' },
        { t: '"Are you sure you can\'t agree to this?"', fb: 'A closed yes/no question, with a hint of pressure.' },
        { t: '"Don\'t you think this is fair?"', fb: 'A leading yes/no question. It pushes instead of inviting.' },
      ],
    },
    {
      id: 'q10',
      q: 'The Reciprocity Bias relies on which psychological principle?',
      options: [
        { t: 'People tend to mirror emotions unconsciously.', fb: 'That is emotional contagion, not reciprocity.' },
        { t: 'People feel obligated to return favors or kindnesses.', correct: true, fb: 'Correct. Even a small, unrequested favour creates a sense of obligation.' },
        { t: 'People respond best to firm authority.', fb: 'Authority is a different principle.' },
        { t: 'People ignore small gestures in negotiations.', fb: 'The opposite: small gestures can trigger large concessions.' },
      ],
    },
    {
      id: 'q11',
      q: 'What is a key guideline for using Reciprocity Bias ethically?',
      options: [
        { t: 'Make gestures manipulative to gain quick results.', fb: 'Obvious manipulation backfires and damages trust.' },
        { t: 'Offer genuine, personalized value before making a request.', correct: true, fb: 'Correct. Tailor the gesture to their needs. Authenticity amplifies the effect.' },
        { t: 'Only give when you expect something immediately in return.', fb: 'Give first and ask later. An instant demand feels like a transaction.' },
        { t: 'Focus on large gestures for maximum impact.', fb: 'Small courtesies are often enough.' },
      ],
    },
    {
      id: 'q12',
      q: 'What is the overall objective of mastering these six psychological principles (loss aversion, anchoring, fairness, choice illusion, calibrated questions, and reciprocity)?',
      options: [
        { t: 'To manipulate outcomes regardless of ethics', fb: 'The module is clear: shape perceptions with integrity.' },
        { t: 'To shape perceptions ethically and guide decisions with clarity and trust', correct: true, fb: 'Correct. Used with integrity, the six principles help your message land with clarity, credibility and impact.' },
        { t: 'To dominate conversations through persuasive tactics', fb: 'Domination damages trust and relationships.' },
        { t: 'To replace logic entirely with emotion', fb: 'Perception works alongside logic; it does not replace it.' },
      ],
    },
    {
      id: 'q13', added: true,
      q: '"This bulb uses only 30% of the energy of a regular one" and "This bulb uses 70% less energy" describe the same fact. What is changing?',
      options: [
        { t: 'The facts', fb: 'The facts are identical. Only the frame changes.' },
        { t: 'The anchor', fb: 'No first number is being set here; the same fact is being framed two ways.' },
        { t: 'The frame, and with it the perception', correct: true, fb: 'Correct. Reframing value presents the same fact so that the saving, or the loss avoided, feels stronger.' },
        { t: 'The reciprocity', fb: 'Nothing is being given or returned.' },
      ],
    },
    {
      id: 'q14', added: true,
      q: 'The other side opens with a number far below the market rate. What does the module recommend?',
      options: [
        { t: 'Counter-anchor quickly, with data on market value', correct: true, fb: 'Correct. Re-anchor immediately and support your number with market rates or standards.' },
        { t: 'Split the difference straight away', fb: 'Splitting the difference accepts their anchor as a valid starting point.' },
        { t: 'Stay silent until they raise it', fb: 'Silence can be powerful, but here the anchor keeps working on both of you.' },
        { t: 'Make a slightly higher offer to show goodwill', fb: 'A small move from their number confirms their anchor.' },
      ],
    },
    {
      id: 'q15', added: true,
      q: 'Which use of time-based urgency keeps your integrity?',
      options: [
        { t: 'Inventing a deadline to rush their decision', fb: 'A false deadline is manipulation. If discovered, it destroys trust.' },
        { t: 'Repeating "now or never" in every meeting', fb: 'Constant pressure loses credibility and feels like a tactic.' },
        { t: 'Hiding the deadline until it has passed', fb: 'That removes their chance to decide, and it is unfair.' },
        { t: 'Pointing to a real deadline, such as a quote that genuinely expires on Friday', correct: true, fb: 'Correct. Loss aversion is ethical when the loss is real and you state it honestly.' },
      ],
    },
  ],
}
