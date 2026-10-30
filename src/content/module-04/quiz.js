// Graded quiz. Questions 1–12 come from Raad's module quiz, with the answers Raad marked.
// `added: true` marks extra questions. Every option carries its own feedback (`fb`).
export const quiz = {
  passMark: 0.8,
  questions: [
    {
      id: 'q1',
      q: 'What best describes positional bargaining?',
      options: [
        { t: 'Focusing on shared goals and mutual gains', fb: 'That describes principled bargaining. Positional bargaining is about each side defending its own stance.' },
        { t: 'Taking fixed stances and negotiating from demands rather than interests', correct: true, fb: 'Correct. Each party sticks to a pre-determined position and often neglects the interests and needs underneath.' },
        { t: 'Collaboratively exploring creative solutions', fb: 'Exploring options together is part of principled bargaining (Stage 3).' },
        { t: 'Emphasizing fairness and objectivity', fb: 'Objective criteria belong to principled bargaining (Stage 4). Positional bargaining is a contest of will.' },
      ],
    },
    {
      id: 'q2',
      q: 'Which of the following is a likely outcome of positional bargaining?',
      options: [
        { t: 'Strengthened long-term relationships', fb: 'The opposite: repeated win-lose battles damage relationships.' },
        { t: 'Increased creativity and collaboration', fb: 'Fixed positions narrow the options. Creativity comes from exploring interests.' },
        { t: 'Stalemates or unfair compromises', correct: true, fb: 'Correct. When both sides cling to positions, you get deadlock or a compromise that leaves both dissatisfied.' },
        { t: 'Mutually beneficial agreements', fb: 'Possible by luck, but it is not what positional bargaining is designed to produce.' },
      ],
    },
    {
      id: 'q3',
      q: 'Why can positional bargaining damage relationships over time?',
      options: [
        { t: 'It avoids discussing personal needs', fb: 'It does tend to ignore needs, but the damage comes from turning every negotiation into a contest.' },
        { t: 'It prioritizes winning over understanding', correct: true, fb: 'Correct. When each negotiation feels like a win-lose battle, trust erodes and the next negotiation starts from suspicion.' },
        { t: 'It limits communication between parties', fb: 'There can be a lot of communication, mostly in the form of demands and counter-demands. The issue is the goal: winning.' },
        { t: 'It eliminates competitive incentives', fb: 'Positional bargaining is driven by competition, not short of it.' },
      ],
    },
    {
      id: 'q4',
      q: 'Principled negotiation focuses primarily on:',
      options: [
        { t: 'Defending one\'s stance at all costs', fb: 'That is the hard version of positional bargaining.' },
        { t: 'Protecting relationships at the expense of outcomes', fb: 'That is soft bargaining: making concessions to keep the peace.' },
        { t: 'Identifying underlying interests and solving problems jointly', correct: true, fb: 'Correct. Both sides work together to understand the motivations behind their demands.' },
        { t: 'Making concessions to avoid conflict', fb: 'Principled negotiators yield to principle, not to pressure or discomfort.' },
      ],
    },
    {
      id: 'q5',
      q: 'Which of the following is not one of the four key elements of principled negotiation?',
      options: [
        { t: 'Separate people from the problem', fb: 'This is Stage 1 of the framework.' },
        { t: 'Focus on interests, not positions', fb: 'This is Stage 2 of the framework.' },
        { t: 'Use objective criteria', fb: 'This is Stage 4 of the framework.' },
        { t: 'Demand concessions to show fairness', correct: true, fb: 'Correct. Demanding concessions is a hard, positional tactic. The fourth element is generating multiple options.' },
      ],
    },
    {
      id: 'q6',
      q: 'The main reason to separate people from the problem is to:',
      options: [
        { t: 'Reduce emotional escalation and maintain respect', correct: true, fb: 'Correct. Separating the two lets you be hard on the problem without being hard on the people.' },
        { t: 'Focus solely on interpersonal relationships', fb: 'The aim is to handle the relationship and the problem separately, not to drop the problem.' },
        { t: 'Avoid addressing the real issue', fb: 'The opposite: it clears the way to address the real issue.' },
        { t: 'Create a competitive dynamic', fb: 'It creates a collaborative dynamic: side by side, attacking the problem.' },
      ],
    },
    {
      id: 'q7',
      q: 'In the office window dispute, identifying that one colleague wants fresh air and the other wants to avoid a draft illustrates:',
      options: [
        { t: 'Positional demands', fb: '"Open the window" and "close the window" are the positions. Fresh air and no draft are what sit beneath them.' },
        { t: 'Miscommunication', fb: 'Both were clear. The problem was that they argued about positions.' },
        { t: 'Underlying interests', correct: true, fb: 'Correct. Once the interests are visible, a solution that serves both becomes possible.' },
        { t: 'Lack of trust', fb: 'Trust was not the issue. Looking past the positions was.' },
      ],
    },
    {
      id: 'q8',
      q: 'Which of the following is not one of the six basic human needs that drive negotiation interests?',
      options: [
        { t: 'Security', fb: 'Security is one of the six: the need to feel safe and free from risk.' },
        { t: 'Recognition', fb: 'Recognition is one of the six: the need for respect and acknowledgement.' },
        { t: 'Authority', correct: true, fb: 'Correct. The closest need is control/autonomy: influence over your own choices, not authority over others.' },
        { t: 'Fairness', fb: 'Fairness is one of the six: the need for a just process and outcome.' },
      ],
    },
    {
      id: 'q9',
      q: 'Why does principled negotiation encourage generating multiple options before deciding?',
      options: [
        { t: 'To delay agreement and gain leverage', fb: 'Options are not a stalling tactic. They are a way to find better agreements.' },
        { t: 'To expand creativity and uncover mutual gains', correct: true, fb: 'Correct. More options mean more chances to find one that satisfies both sides\' interests, and more room for trade-offs.' },
        { t: 'To increase competitive tension', fb: 'Limiting options is what reinforces conflict.' },
        { t: 'To test which side has stronger arguments', fb: 'Generating options is not a debate. Judging comes later.' },
      ],
    },
    {
      id: 'q10',
      q: 'The step "separate inventing from judging" means:',
      options: [
        { t: 'Brainstorm freely before evaluating ideas', correct: true, fb: 'Correct. Judging ideas too early limits creativity. Generate first, evaluate later.' },
        { t: 'Critique every idea immediately', fb: 'Immediate critique is exactly what this step prevents.' },
        { t: 'Decide on one solution early', fb: 'Settling early is the "single answer" trap that Stage 3 warns against.' },
        { t: 'Reject unconventional ideas', fb: 'A judgement-free zone welcomes unconventional ideas. Some of the best options start that way.' },
      ],
    },
    {
      id: 'q11',
      q: 'Objective criteria in negotiation are used to:',
      options: [
        { t: 'Emphasize personal values and emotions', fb: 'Objective criteria do the opposite: they move the decision away from subjective or emotional influences.' },
        { t: 'Establish fair, external standards for decisions', correct: true, fb: 'Correct. Market rates, industry standards, legal precedents, expert opinions and historical data.' },
        { t: 'Strengthen one party\'s dominance', fb: 'Neutral standards reduce the risk of dominance or coercion.' },
        { t: 'Avoid discussing evidence or data', fb: 'Evidence and data are at the heart of objective criteria.' },
      ],
    },
    {
      id: 'q12',
      q: '"Never yield to pressure, only to principle" means:',
      options: [
        { t: 'Compromise quickly to maintain relationships', fb: 'That is yielding to pressure, the soft approach.' },
        { t: 'Ignore the other party\'s perspective', fb: 'You should reason openly and be willing to adapt to a better standard. You just don\'t give in to threats.' },
        { t: 'Stay firm on fairness and reason, not on emotion or threats', correct: true, fb: 'Correct. Be open to reasons, closed to pressure. Redirect calmly: "Let\'s stick to the agreed criteria."' },
        { t: 'Avoid adapting to new information', fb: 'You should stay flexible if a better standard emerges. That is yielding to principle.' },
      ],
    },
    {
      id: 'q13', added: true,
      q: 'A supplier says: "We need payment within 15 days, not 60." Which of these is most likely the interest behind that position?',
      options: [
        { t: 'They want to win this point in the negotiation.', fb: 'That describes a positional mindset, not the need behind the demand.' },
        { t: 'Their cash flow is tight, and waiting 60 days creates a financial risk for them.', correct: true, fb: 'Correct. Economic well-being and security often sit behind payment terms. Knowing this opens options such as a deposit or staged payments.' },
        { t: '"15 days" is their interest.', fb: '"15 days" is the position: the specific demand. The interest is why they need it.' },
        { t: 'They don\'t trust your company at all.', fb: 'Possible, but it is an assumption drawn from fear. Ask before you deduce their intentions.' },
      ],
    },
    {
      id: 'q14', added: true,
      q: 'You want to uncover the other side\'s interests. Which question follows the module\'s advice?',
      options: [
        { t: '"Why are you being so inflexible about this?"', fb: '"Why" aimed at the other person can sound accusing. Ask yourself why; ask them how or what.' },
        { t: '"What would a good outcome look like for your team?"', correct: true, fb: 'Correct. A "What" question invites them to share interests without feeling they have to defend themselves.' },
        { t: '"Will you accept our offer or not?"', fb: 'A closed, positional question. It pushes for a yes or no rather than revealing interests.' },
        { t: '"Don\'t you think our price is fair?"', fb: 'A leading question about your position. It reveals nothing about theirs.' },
      ],
    },
    {
      id: 'q15', added: true,
      q: 'Two partners closing a joint venture must split its assets. One divides them into two packages, the other chooses first. Why is this a good example of a fair procedure?',
      options: [
        { t: 'Because the larger partner gets to decide.', fb: 'The procedure does not depend on who has more power, which is the point.' },
        { t: 'Because it is fair by design: the one who divides has every reason to make both packages equal.', correct: true, fb: 'Correct. The procedure is impartial and transparent, so both accept the result without a contest of will.' },
        { t: 'Because a judge decides for them.', fb: 'An outside expert can be a fair standard, but this example needs no outside judge.' },
        { t: 'Because both partners get exactly what they demanded.', fb: 'Neither demanded anything. The procedure, not the demands, produces the outcome.' },
      ],
    },
  ],
}
