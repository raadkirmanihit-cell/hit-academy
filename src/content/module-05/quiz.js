// Graded quiz. Questions 1–12 come from Raad's module quiz, with the answers Raad marked.
// `added: true` marks extra questions. Every option carries its own feedback (`fb`).
export const quiz = {
  passMark: 0.8,
  questions: [
    {
      id: 'q1',
      q: 'According to the module, expert negotiators typically spend how much time preparing compared to actual negotiation time?',
      options: [
        { t: 'Equal time for both', fb: 'Effective negotiators spend considerably more time preparing than negotiating.' },
        { t: 'Twice as much time preparing', fb: 'Closer, but the module gives a higher ratio.' },
        { t: 'Three to five times more time preparing', correct: true, fb: 'Correct. For every hour of negotiation, 3–5 hours are typically spent on preparation.' },
        { t: 'Less time preparing than negotiating', fb: 'The opposite: preparation is where most negotiations are won.' },
      ],
    },
    {
      id: 'q2',
      q: 'What is the primary purpose of establishing a structured preparation framework?',
      options: [
        { t: 'To reduce time spent researching', fb: 'A framework guides your research; it does not cut it short.' },
        { t: 'To create rigidity and control the process', fb: 'A good framework adds structure while keeping you adaptable.' },
        { t: 'To maintain focus and cover all critical negotiation aspects', correct: true, fb: 'Correct. A solid framework ensures focus and covers the critical aspects of complex negotiations.' },
        { t: 'To avoid flexibility in discussions', fb: 'Preparation gives you the confidence to be flexible, not a reason to avoid it.' },
      ],
    },
    {
      id: 'q3',
      q: 'BATNA stands for:',
      options: [
        { t: 'Best Approach to Negotiation and Agreement', fb: 'Close in spirit, but the A stands for Alternative.' },
        { t: 'Best Alternative to a Negotiated Agreement', correct: true, fb: 'Correct. It is what you will do if the deal does not happen: your safety net and a source of power.' },
        { t: 'Balanced Agreement through Negotiation Analysis', fb: 'Not quite. A BATNA is about your alternative if no agreement is reached.' },
        { t: 'Best Arrangement for Tactical Negotiation Advantage', fb: 'Not quite. BATNA = Best Alternative to a Negotiated Agreement.' },
      ],
    },
    {
      id: 'q4',
      q: 'A negotiator\'s walk-away point represents:',
      options: [
        { t: 'The target price or ideal outcome', fb: 'That is your ideal outcome, the top of your range.' },
        { t: 'The first offer made to open the negotiation', fb: 'An opening offer is a tactic. The walk-away point is a limit.' },
        { t: 'The lowest acceptable deal before preferring the BATNA', correct: true, fb: 'Correct. Below this point, your BATNA is the better choice. Write it down before you start.' },
        { t: 'The midpoint between two offers', fb: 'Splitting the difference has nothing to do with your limit.' },
      ],
    },
    {
      id: 'q5',
      q: 'What is a Strong BATNA characterized by?',
      options: [
        { t: 'Being uncertain but emotionally satisfying', fb: 'Uncertainty makes a BATNA weaker, not stronger.' },
        { t: 'Being less valuable but emotionally safe', fb: 'That describes a moderate BATNA at best.' },
        { t: 'Being equal to or better than the current deal', correct: true, fb: 'Correct. A well-developed, reliable option gives you high bargaining power and the confidence to walk away.' },
        { t: 'Having no practical or financial viability', fb: 'That is a weak BATNA: a last resort, not real leverage.' },
      ],
    },
    {
      id: 'q6',
      q: 'Which of the following is NOT an effective way to strengthen your BATNA?',
      options: [
        { t: 'Conducting market research', fb: 'Market research is step 1 of strengthening your BATNA.' },
        { t: 'Building relationships early', fb: 'Warm relationships make your alternatives more viable.' },
        { t: 'Ignoring alternative options until needed', correct: true, fb: 'Correct. Alternatives must be developed and tested before you need them, or they are only theoretical.' },
        { t: 'Testing fallback options for feasibility', fb: 'Testing (a quote, a meeting) makes sure your BATNA is real.' },
      ],
    },
    {
      id: 'q7',
      q: 'The best time to reference your BATNA during a negotiation is:',
      options: [
        { t: 'Immediately at the start to set dominance', fb: 'Too early, and it sounds like a threat before any rapport exists.' },
        { t: 'After building rapport and understanding their needs', correct: true, fb: 'Correct. Control your timing: reference it once you understand their needs, as confidence, not a threat.' },
        { t: 'When emotions start to rise', fb: 'Under emotion, a BATNA tends to come out as an ultimatum.' },
        { t: 'After the other side walks away', fb: 'By then it no longer helps the negotiation.' },
      ],
    },
    {
      id: 'q8',
      q: 'What does Positive Leverage rely on?',
      options: [
        { t: 'The threat of penalties or losses', fb: 'That is negative leverage: what they fear losing.' },
        { t: 'Appealing to shared values or standards', fb: 'That is normative leverage: what they believe in.' },
        { t: 'Offering something desirable or beneficial to the other party', correct: true, fb: 'Correct. "If you do this, I can give you something you want."' },
        { t: 'Limiting the counterpart\'s options', fb: 'Positive leverage expands what they can gain; it does not restrict them.' },
      ],
    },
    {
      id: 'q9',
      q: 'Normative Leverage is most effective when you:',
      options: [
        { t: 'Highlight shared commitments or previously stated principles', correct: true, fb: 'Correct. "Earlier, you said innovation was a top priority. How does delaying align with that goal?"' },
        { t: 'Impose deadlines or financial risks', fb: 'Deadlines and risks are negative leverage.' },
        { t: 'Offer additional rewards or incentives', fb: 'Rewards and incentives are positive leverage.' },
        { t: 'Use silence as a negotiation tool', fb: 'Silence is powerful (Module 3), but it is not normative leverage.' },
      ],
    },
    {
      id: 'q10',
      q: 'Which statement best describes the goal of setting clear priorities before a negotiation?',
      options: [
        { t: 'To focus only on what you want most, ignoring trade-offs', fb: 'Priorities exist precisely so you know what you can trade.' },
        { t: 'To establish a hierarchy of goals that balances flexibility and focus', correct: true, fb: 'Correct. Keep focus on the essentials while staying flexible on the rest.' },
        { t: 'To ensure the other party adapts to your priorities', fb: 'Priorities guide your own choices; they do not dictate theirs.' },
        { t: 'To prepare rigid positions that cannot change', fb: 'Rigid positions lead to deadlock (Module 4).' },
      ],
    },
    {
      id: 'q11',
      q: 'Which of the following is a key takeaway from the Ultimate Preparation Checklist?',
      options: [
        { t: 'Preparation only matters for high-stakes deals', fb: 'The checklist applies to any negotiation, from a salary talk to a family decision.' },
        { t: 'Understanding the other party\'s BATNA and leverage improves outcomes', correct: true, fb: 'Correct. Knowing their alternatives, priorities and constraints is part of thorough preparation.' },
        { t: 'Avoid discussing trade-offs until late in the process', fb: 'Trade-offs are planned in advance and used throughout.' },
        { t: 'Focus exclusively on your own goals', fb: 'Understanding the other party is item 3 of the checklist.' },
      ],
    },
    {
      id: 'q12',
      q: 'Why is "value creation" emphasized in preparation?',
      options: [
        { t: 'It shifts focus from competition to collaboration', correct: true, fb: 'Correct. Brainstorming ways to create mutual value beyond price focuses on shared interests (Module 4).' },
        { t: 'It eliminates the need for leverage', fb: 'Value creation and leverage work together.' },
        { t: 'It ensures the negotiation ends quickly', fb: 'Speed is not the goal; better outcomes for both sides are.' },
        { t: 'It prioritizes emotion over logic', fb: 'Value creation is a structured, logical search for mutual gains.' },
      ],
    },
    {
      id: 'q13', added: true,
      q: 'You need a supplier under $15/unit. Supplier B has already offered $16/unit, and you have checked that they can deliver. What is Supplier B\'s offer?',
      options: [
        { t: 'Your ideal outcome', fb: 'Your ideal is under $15/unit.' },
        { t: 'Your BATNA', correct: true, fb: 'Correct. It is what you will do if this deal does not happen, and you have tested that it is feasible.' },
        { t: 'Your opening offer', fb: 'It is not an offer you make; it is an alternative you hold.' },
        { t: 'Normative leverage', fb: 'Normative leverage appeals to values. This is an alternative deal.' },
      ],
    },
    {
      id: 'q14', added: true,
      q: 'Which sentence uses your BATNA as confidence, not as a threat?',
      options: [
        { t: '"If you don\'t agree today, I\'ll go elsewhere."', fb: 'This is the phrasing the module tells you to avoid. It sounds like an ultimatum.' },
        { t: '"We\'re also exploring other partnerships, but I\'d like to see how we can make this work with you."', correct: true, fb: 'Correct. It signals that you have alternatives while keeping the door open.' },
        { t: '"Your competitor is cheaper, so match them or lose us."', fb: 'Information used as a threat. It turns the negotiation into a contest of will.' },
        { t: '"We have no other options, so please help us."', fb: 'This reveals a weak BATNA and gives away leverage.' },
      ],
    },
    {
      id: 'q15', added: true,
      q: 'This is your only qualified lead this quarter (a weak BATNA). What does the module suggest?',
      options: [
        { t: 'Bluff about other buyers to create pressure', fb: 'Bluffing is risky and, if discovered, damages trust. The module says to avoid ultimatums.' },
        { t: 'Focus on relationship-building, extended contracts or pilot programs', correct: true, fb: 'Correct. With a weak BATNA, shift from leverage to value, relationship and creative options.' },
        { t: 'Walk away to show strength', fb: 'Walking away without a real alternative leaves you with nothing.' },
        { t: 'Accept any terms they offer', fb: 'A weak BATNA is a reason to work on value and on strengthening your alternatives, not to give up your walk-away point.' },
      ],
    },
    {
      id: 'q16', added: true,
      q: 'Your walk-away point is €68,000. The most the employer can pay is €72,000. What is the ZOPA?',
      options: [
        { t: 'There is none, because the offers are different', fb: 'Different offers are normal. The ZOPA depends on the walk-away points, and these overlap.' },
        { t: '€68,000 to €72,000', correct: true, fb: 'Correct. Any salary in this range is better for both sides than walking away.' },
        { t: 'Exactly €70,000, the midpoint', fb: 'The ZOPA is a range, not a point. Where you land inside it depends on how you negotiate.' },
        { t: 'Anything above €72,000', fb: 'Above €72,000 the employer prefers their BATNA, so no deal is possible there.' },
      ],
    },
  ],
}
