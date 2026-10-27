// Graded quiz. Questions 1–9 come from Raad's module; `added: true` marks extra questions.
// Every option carries its own feedback (`fb`), shown after the learner answers.
export const quiz = {
  passMark: 0.8,
  questions: [
    {
      id: 'q1',
      q: 'Which of the following best explains why assertiveness is considered the most adaptable negotiation behavior?',
      options: [
        { t: 'It eliminates the need for compromise', fb: 'Assertive negotiators still compromise when it makes sense. Assertiveness is about how you communicate, not about refusing concessions.' },
        { t: 'It allows for respect, boundary-setting, and collaboration across contexts', correct: true, fb: 'Correct. Assertiveness sets clear boundaries, communicates with respect and confidence, and enables both collaboration and control. That is why it works as a default anchor.' },
        { t: 'It prioritizes speed over long-term outcomes', fb: 'Speed at the expense of the relationship is closer to aggressive behavior. Assertiveness protects long-term outcomes.' },
        { t: 'It guarantees a win-win solution', fb: 'No behavior guarantees a result. Assertiveness makes balanced agreements more likely, but the other side and the context still matter.' },
      ],
    },
    {
      id: 'q2',
      q: 'A negotiator who says, "I\'ll take the offer for now, but I did receive another higher offer recently" is most likely using:',
      options: [
        { t: 'Passive behavior', fb: 'A passive negotiator would accept without signalling leverage. This statement is applying pressure, just indirectly.' },
        { t: 'Aggressive behavior', fb: 'Aggressive behavior is open and forceful ("15% or I leave"). This statement hides the pressure behind apparent acceptance.' },
        { t: 'Manipulative (Passive-Aggressive) behavior', correct: true, fb: 'Correct. It looks cooperative on the surface while quietly applying pressure, just like Riley mentioning the outside offer in the manipulative salary example.' },
        { t: 'Assertive behavior', fb: 'An assertive negotiator would state the outside offer and the request directly, with reasons, instead of hinting.' },
      ],
    },
    {
      id: 'q3',
      q: 'In which situation would aggressive negotiation behavior potentially be more effective than assertive negotiation behavior?',
      options: [
        { t: 'When the relationship is critical for future deals', fb: 'Aggression harms relationships and fosters resentment, so it is a poor fit when future deals depend on goodwill.' },
        { t: 'When the outcome matters more than long-term goodwill', correct: true, fb: 'Correct. The module lists high-stakes, one-time negotiations with significant leverage as the situations where aggressive behavior can produce quick results.' },
        { t: 'When trust-building is the top priority', fb: 'Trust-building calls for assertive behavior. Aggression sacrifices long-term goodwill.' },
        { t: 'When both parties have equal stakes and need cooperation', fb: 'Equal stakes and a need to cooperate point to assertive behavior and a collaborative or compromise strategy.' },
      ],
    },
    {
      id: 'q4',
      q: 'Which risk is shared by both passive negotiating behavior and the accommodating negotiation strategy?',
      options: [
        { t: 'Damaging long-term trust', fb: 'Both passive behavior and accommodating usually protect the relationship in the short term. Damaged trust is the typical risk of manipulative behavior.' },
        { t: 'Being exploited or overlooked by the other party', correct: true, fb: 'Correct. Both put the other side first, so your own needs can be ignored, and repeated use invites the other party to take advantage.' },
        { t: 'Escalating conflicts unnecessarily', fb: 'Escalation is a risk of aggressive behavior and competing, not of yielding.' },
        { t: 'Forcing premature agreements', fb: 'Forcing agreement is a competitive move. Passive and accommodating negotiators tend to give way rather than force.' },
      ],
    },
    {
      id: 'q5',
      q: 'If a negotiator avoids conflict due to time pressure and emotional intensity, which strategy are they most likely using?',
      options: [
        { t: 'Compromising', fb: 'Compromising still settles the issue by meeting in the middle. Here the negotiator is postponing it.' },
        { t: 'Avoiding', correct: true, fb: 'Correct. Avoiding fits when emotions are running high and a cooling-off period is needed, or when timing is poor.' },
        { t: 'Accommodating', fb: 'Accommodating means giving the other side what they want. Here nobody gets anything yet; the issue is deferred.' },
        { t: 'Competing', fb: 'Competing pushes for your outcome now. Stepping back from the conflict is the opposite.' },
      ],
    },
    {
      id: 'q6',
      q: 'Which combination of behavior and strategy is most likely to create distrust in negotiations?',
      options: [
        { t: 'Assertive + Collaborative', fb: 'This is the combination most likely to build trust and lead to win-win outcomes.' },
        { t: 'Aggressive + Competing', fb: 'This might win a deal but harm the relationship. It is open about its intent, so it creates resentment more than distrust.' },
        { t: 'Passive + Compromising', fb: 'This risks a weak deal for you, but it does not usually create distrust.' },
        { t: 'Manipulative + Accommodating', correct: true, fb: 'Correct. The module notes that an accommodating strategy used with manipulative behavior may seem helpful but can create distrust, because the help comes with hidden strings.' },
      ],
    },
    {
      id: 'q7',
      q: 'What is the main difference between competing and collaborating strategies?',
      options: [
        { t: 'Competing focuses on quick fixes, collaborating on long-term trust', correct: true, fb: 'Correct. Competing is used when quick decisions are needed and the outcome outweighs the relationship. Collaborating takes time and builds trust for the long term.' },
        { t: 'Competing seeks win-win, collaborating is winner-take-all', fb: 'This is reversed. Competing is the winner-take-all mindset; collaborating is win-win.' },
        { t: 'Competing is time-consuming, collaborating is always efficient', fb: 'Also reversed. Collaborating is the time-consuming one, because it needs in-depth discussion and trust.' },
        { t: 'Competing balances concessions, collaborating avoids concessions', fb: 'Balancing concessions describes compromising. Neither competing nor collaborating is defined by that.' },
      ],
    },
    {
      id: 'q8',
      q: 'Which scenario best demonstrates the compromise approach?',
      options: [
        { t: "A consultant demanding their full rate despite the client's budget", fb: 'That is the competing example from the module: firm, outcome-first, relationship secondary.' },
        { t: 'Two team members co-hosting a client meeting after disagreeing on ownership', correct: true, fb: 'Correct. Both give a little ("co-host this one, you take full lead next time") to reach a quick, balanced solution.' },
        { t: 'A negotiator walking away from a low-priority issue', fb: 'Walking away from a low-value issue is avoiding.' },
        { t: 'A manager offering full concessions to preserve goodwill', fb: 'Giving everything to protect goodwill is accommodating.' },
      ],
    },
    {
      id: 'q9',
      q: 'A negotiator prioritizes the relationship over the outcome in a minor issue. Which style are they applying?',
      options: [
        { t: 'Accommodating', correct: true, fb: 'Correct. Accommodating is low assertiveness and high cooperativeness: you yield on a minor issue because the relationship matters more.' },
        { t: 'Avoiding', fb: 'Avoiding is low on both concerns. Here the negotiator clearly cares about the relationship.' },
        { t: 'Compromising', fb: 'Compromising means both sides concede part of their demands. Here one side simply yields.' },
        { t: 'Competing', fb: 'Competing puts the outcome first, which is the opposite of this situation.' },
      ],
    },
    {
      id: 'q10', added: true,
      q: 'Your counterpart says: "I thought you cared about this team. I can\'t believe you\'d say no to this." Which response best fits the recommended adaptation?',
      options: [
        { t: '"You\'re right, I\'m sorry. I\'ll do it."', fb: 'This rewards the guilt tactic. You give up your position because of pressure, not because of the merits.' },
        { t: '"Don\'t lecture me about caring. I\'ve done more for this team than you."', fb: 'This matches manipulation with aggression and escalates the conflict.' },
        { t: '"I do care about the team. That\'s why I want our decision to rest on facts and fairness, not pressure."', correct: true, fb: 'Correct. This is transparent assertiveness: it names your commitment, refuses the guilt frame, and moves the conversation back to facts.' },
        { t: '"Let\'s just talk about it some other time."', fb: 'Postponing can be useful when emotions run high, but here it leaves the manipulative tactic unaddressed and likely to return.' },
      ],
    },
    {
      id: 'q11', added: true,
      q: 'According to Fisher, Ury & Patton, a negotiation method should be judged on which three criteria?',
      options: [
        { t: 'Speed, leverage and final price', fb: 'Price and leverage matter in practice, but they are not the three criteria quoted in the module.' },
        { t: 'A wise agreement (if one is possible), efficiency, and improving or at least preserving the relationship', correct: true, fb: 'Correct. These are the three tests from Getting to Yes, quoted at the start of the module.' },
        { t: 'Winning, saving face and avoiding conflict', fb: 'These describe common instincts in a negotiation, not the evaluation criteria.' },
        { t: 'Assertiveness, cooperativeness and timing', fb: 'Assertiveness and cooperativeness are the two axes for choosing a strategy, not criteria for judging a method.' },
      ],
    },
    {
      id: 'q12', added: true,
      q: 'Which of these describes a negotiation STRATEGY rather than a negotiation BEHAVIOR?',
      options: [
        { t: 'Speaking calmly and holding steady eye contact', fb: 'Tone and body language are part of behavior: how you show up and communicate.' },
        { t: 'Raising your voice and interrupting', fb: 'This is aggressive behavior, part of how you communicate.' },
        { t: 'Deciding to look for a solution where both sides gain', correct: true, fb: 'Correct. Choosing a win-win approach is a strategy (collaborating). It is about the method you use to reach your goals.' },
        { t: 'Hinting at problems instead of stating them', fb: 'Indirect communication is manipulative behavior, part of how you express yourself.' },
      ],
    },
    {
      id: 'q13', added: true,
      q: 'You are a freelancer quoting a one-time project. The client offers well below your rate and you are unlikely to work together again. Which strategy fits best?',
      options: [
        { t: 'Accommodating: accept their budget to keep them happy', fb: 'Accommodating fits when the relationship matters more than the outcome. Here the opposite is true.' },
        { t: 'Competing: hold firm on your rate, and adjust scope instead of price', correct: true, fb: 'Correct. High stakes for you and a short-term relationship point to competing, delivered assertively, like the $4,500 consultant example.' },
        { t: 'Avoiding: stop replying and see if they come back', fb: 'Avoiding wastes a valuable opportunity and may look like disinterest.' },
        { t: 'Collaborating: run several workshops to explore shared interests', fb: 'Collaborating takes time and pays off in long-term relationships. For a one-off project it is usually more effort than the situation needs.' },
      ],
    },
    {
      id: 'q14', added: true,
      q: 'On the assertiveness and cooperativeness grid, where does compromising sit?',
      options: [
        { t: 'High assertiveness, low cooperativeness', fb: 'That is competing.' },
        { t: 'Low assertiveness, high cooperativeness', fb: 'That is accommodating.' },
        { t: 'Moderate assertiveness, moderate cooperativeness', correct: true, fb: 'Correct. Neither side fully pursues its interests, and both are willing to make concessions.' },
        { t: 'High assertiveness, high cooperativeness', fb: 'That is collaborating.' },
      ],
    },
    {
      id: 'q15', added: true,
      q: 'The Pareto chart in this module suggests that, when you prepare for a negotiation, most of your effort should go to:',
      options: [
        { t: 'Every issue equally, so nothing is missed', fb: 'Spreading effort evenly means the few issues that drive most of the value get the same attention as trivial ones.' },
        { t: 'The small number of "must-have" issues that create most of the value', correct: true, fb: 'Correct. In the chart, the first 20% of effort delivers around 90% of the benefit. Focus first on your Musts and Shoulds.' },
        { t: 'The issues the other side cares about least', fb: 'Low-priority issues for them can be useful trades, but they are not where your preparation effort pays off most.' },
        { t: 'Small "won\'t-have" items, because they are easy wins', fb: 'In the chart, the Won\'t zone takes half of the effort and adds almost no benefit.' },
      ],
    },
  ],
}
