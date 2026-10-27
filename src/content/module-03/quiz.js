// Graded quiz. Questions 1–12 come from Raad's module quiz, with the answers Raad marked.
// `added: true` marks extra questions. Every option carries its own feedback (`fb`).
export const quiz = {
  passMark: 0.8,
  questions: [
    {
      id: 'q1',
      q: 'During a meeting, a colleague enthusiastically agrees with every idea but rarely follows through. Which type of "Yes" does this behavior most likely represent?',
      options: [
        { t: 'Confirmation Yes', fb: 'A confirmation yes acknowledges a fact. Here the colleague appears to agree to act, and then does not.' },
        { t: 'Counterfeit Yes', correct: true, fb: 'Correct. Enthusiasm that does not match past behaviour, and a history of agreeing without delivering, are classic signs of a counterfeit yes.' },
        { t: 'Commitment Yes', fb: 'A commitment yes is tied to action, ownership and follow-through, which is exactly what is missing here.' },
        { t: 'Conditional Yes', fb: 'This is not one of the three types in the module. Nothing in the behaviour attaches a condition; the agreement is simply never acted on.' },
      ],
    },
    {
      id: 'q2',
      q: 'A "Counterfeit Yes" is most dangerous in negotiations because it:',
      options: [
        { t: 'Signals clear rejection disguised as agreement', fb: 'There is nothing clear about it. The danger is that it looks like agreement, so you do not see the rejection.' },
        { t: 'Creates a false sense of progress that wastes time and trust', correct: true, fb: 'Correct. Believing a counterfeit yes leads to false expectations and wasted effort, and discovering it later damages trust.' },
        { t: 'Indicates a lack of understanding rather than dishonesty', fb: 'People usually understand perfectly well. They say yes to escape pressure, avoid conflict or move the conversation along.' },
        { t: 'Usually transitions quickly into a firm commitment', fb: 'The opposite: a counterfeit yes rarely turns into action unless you test it and surface the real objection.' },
      ],
    },
    {
      id: 'q3',
      q: 'Which of the following best indicates a Commitment Yes rather than a Confirmation Yes?',
      options: [
        { t: '"Yes, we can make that work by Friday."', correct: true, fb: 'Correct. A timeline and an implied owner turn the yes into a decision to act.' },
        { t: '"Yes, that\'s true."', fb: 'This verifies a fact. It is a confirmation yes and carries no commitment.' },
        { t: '"Yes, I see your point."', fb: 'This acknowledges your view without agreeing to do anything.' },
        { t: '"Yes, I understand."', fb: 'Understanding is not agreement. Use it as a bridge to a deeper question.' },
      ],
    },
    {
      id: 'q4',
      q: 'To verify whether a "Yes" is genuine, a skilled negotiator should:',
      options: [
        { t: 'Mirror the answer to build rapport', fb: 'Mirroring can draw out more detail, but it does not test whether the yes will turn into action.' },
        { t: 'Ask for immediate, specific next steps', correct: true, fb: 'Correct. "What\'s the first step you\'ll take?" or "By when can we expect a draft agreement?" A counterfeit yes stumbles on specifics.' },
        { t: 'Offer a summary of key points instead of asking questions', fb: 'A summary is useful, but on its own it invites another easy yes. You need a question that asks for action.' },
        { t: 'Wait silently to test the other party\'s patience', fb: 'Silence is powerful, but it is not a test of patience, and it does not confirm commitment.' },
      ],
    },
    {
      id: 'q5',
      q: 'Why is encouraging a "No" response often more productive than chasing a "Yes"?',
      options: [
        { t: 'It makes the other person feel pressured to explain their objections', fb: 'The aim is the opposite: inviting a no lowers pressure, so people share objections freely.' },
        { t: 'It creates psychological safety and fosters honest communication', correct: true, fb: 'Correct. Saying no restores a sense of control. People who feel safe tell you what they really think.' },
        { t: 'It speeds up the decision-making process', fb: 'It can, but that is a side effect. The main benefit is honesty and safety.' },
        { t: 'It eliminates all forms of disagreement early', fb: 'It does not eliminate disagreement. It surfaces it early, so you can work with it.' },
      ],
    },
    {
      id: 'q6',
      q: 'Which reframed question most effectively reduces pressure while inviting authenticity?',
      options: [
        { t: '"Can we finalize this today?"', fb: 'A direct request for a yes. It raises pressure and invites a counterfeit yes.' },
        { t: '"Would it be a bad idea to wrap this up today?"', correct: true, fb: 'Correct. "No" is the safe, comfortable answer, and it still moves the conversation toward closing.' },
        { t: '"Do you want to move forward right now?"', fb: 'Another yes-question, with "right now" adding pressure.' },
        { t: '"Is this something you\'d be interested in?"', fb: 'This invites an automatic, non-committal yes. The module reframes it as "Would it be ridiculous to explore this a bit further?"' },
      ],
    },
    {
      id: 'q7',
      q: 'When someone says "No," a strong negotiator\'s first move should be to:',
      options: [
        { t: 'Withdraw to avoid confrontation', fb: 'A no is the start of the real conversation, not the end of it.' },
        { t: 'Rephrase the offer to make it more attractive', fb: 'Improving the offer before you know the reason means negotiating against yourself.' },
        { t: 'Ask open-ended questions to uncover the reason', correct: true, fb: 'Correct. "What are your main concerns?" or "Is there a specific part that doesn\'t work for you?" Find the reason first.' },
        { t: 'Repeat the proposal to reinforce confidence', fb: 'Repeating it louder does not address why they said no.' },
      ],
    },
    {
      id: 'q8',
      q: 'A negotiator says, "Would it be ridiculous to consider a short pilot instead of a full rollout?" This question is effective because it:',
      options: [
        { t: 'Uses humor to minimize disagreement', fb: 'The phrasing is light, but its job is to make "no" a safe answer, not to be funny.' },
        { t: 'Invites a safe "No" while keeping the discussion open', correct: true, fb: 'Correct. "No, it\'s not ridiculous" feels comfortable to say, and it moves you toward the pilot.' },
        { t: 'Pushes for an immediate decision', fb: 'It does the opposite: it lowers pressure and invites them to think.' },
        { t: 'Deflects responsibility to the other person', fb: 'It gives them a sense of control, but you remain responsible for the proposal.' },
      ],
    },
    {
      id: 'q9',
      q: 'The deliberate use of silence after making a key point serves primarily to:',
      options: [
        { t: 'Signal disapproval', fb: 'A pause after your own point is about emphasis, not judgement.' },
        { t: 'Reinforce the importance of what was just said', correct: true, fb: 'Correct. The pause lets your message land and stops it being buried under more words.' },
        { t: 'Encourage the other person to interrupt', fb: 'The aim is to give them space to absorb what you said, not to invite an interruption.' },
        { t: 'Show uncertainty or hesitation', fb: 'A deliberate pause signals conviction. Rushing to add words is what looks uncertain.' },
      ],
    },
    {
      id: 'q10',
      q: 'Pausing before speaking is an effective strategy because it:',
      options: [
        { t: 'Demonstrates uncertainty', fb: 'People tend to read a thoughtful pause as composure and maturity, not doubt.' },
        { t: 'Shows emotional control and thoughtful intention', correct: true, fb: 'Correct. It shows you are composed and intentional, not reactive, and it gives you time to respond with clarity.' },
        { t: 'Creates unnecessary tension', fb: 'A short, steady pause usually lowers tension, because it slows the exchange down.' },
        { t: 'Signals lack of preparation', fb: 'It signals the opposite: that you think before you answer.' },
      ],
    },
    {
      id: 'q11',
      q: 'In emotionally charged moments, a well-timed pause can:',
      options: [
        { t: 'Escalate tension by creating awkward silence', fb: 'Used with a calm tone ("Let\'s slow down for a second"), a pause disrupts the reactive momentum instead.' },
        { t: 'Reset the emotional rhythm and reestablish calm', correct: true, fb: 'Correct. A pause breaks the emotional loop and signals that you are grounded and willing to steer things constructively.' },
        { t: 'Convey indecision or weakness', fb: 'In a heated moment, the person who can pause looks like the one in control.' },
        { t: 'Make the speaker appear dismissive', fb: 'Only if it is cold. A pause with steady eye contact and a calm tone shows you are taking things seriously.' },
      ],
    },
    {
      id: 'q12',
      q: 'After asking a thoughtful question, remaining silent often leads the other person to:',
      options: [
        { t: 'Change the subject quickly', fb: 'Silence after a question usually keeps them on the topic, because the question is still open.' },
        { t: 'Elaborate further and share more detail', correct: true, fb: 'Correct. Silence creates a gentle pressure to fill the gap, and shows you really want their answer.' },
        { t: 'Feel uncomfortable and shut down', fb: 'A warm, attentive silence invites reflection. Shutting down is more likely if you rush them.' },
        { t: 'Lose interest in the discussion', fb: 'Being given time to think tends to increase engagement, not reduce it.' },
      ],
    },
    {
      id: 'q13', added: true,
      q: 'A client confirms, "That\'s right, our revenue doubled last quarter." What is the best next move?',
      options: [
        { t: '"Great! So you\'re ready to sign today?"', fb: 'You are treating a confirmation yes as a commitment yes. They verified a fact; they did not make a decision.' },
        { t: '"Thanks for confirming. How does that affect your priorities going forward?"', correct: true, fb: 'Correct. A confirmation yes is a bridge: use it to move from data to deeper questions and, later, to action.' },
        { t: 'Move on to the next item on your agenda.', fb: 'You miss the chance to use the confirmed fact to learn what matters to them.' },
        { t: '"Are you sure? That seems high."', fb: 'Questioning a fact they just confirmed adds friction without adding insight.' },
      ],
    },
    {
      id: 'q14', added: true,
      q: 'Why does "Have I caught you at a bad time?" usually work better than "Is this a good time?"',
      options: [
        { t: 'It makes the other person feel guilty for being busy.', fb: 'Guilt is not the aim. The question is designed to feel easy and respectful.' },
        { t: 'It invites an easy "No, now\'s fine," which gives them control and opens the door.', correct: true, fb: 'Correct. Saying no feels safe and in control, and in this case the no is an invitation to continue.' },
        { t: 'It forces them to commit to a longer conversation.', fb: 'It forces nothing. It simply makes the comfortable answer one that lets you continue.' },
        { t: 'It sounds more formal and professional.', fb: 'It is actually more casual. Its power comes from inviting a no, not from formality.' },
      ],
    },
    {
      id: 'q15', added: true,
      q: 'Inviting a "No" leads to one of three outcomes. Which of these is NOT one of them?',
      options: [
        { t: 'Clarification: you uncover a hidden objection or concern', fb: 'This is one of the three. "No, the plan\'s fine. It\'s just the timeline that worries me."' },
        { t: 'Correction: they shift your thinking', fb: 'This is one of the three. "No, I wouldn\'t call it unreasonable, but we\'d need to change a few things."' },
        { t: 'Commitment: they move toward yes on their own', fb: 'This is one of the three. "No, it\'s not a bad idea at all. Let\'s do it."' },
        { t: 'Capitulation: they give in to avoid further discussion', correct: true, fb: 'Correct. Giving in to escape the conversation is what produces a counterfeit yes. Inviting a no is designed to prevent it.' },
      ],
    },
  ],
}
