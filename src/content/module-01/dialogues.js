// Dialogues from Raad's module, with short coaching notes (`note`) on Riley's lines.
const A = 'Alex', R = 'Riley'
export const cast = { Alex: { initials: 'AL', role: 'Manager' }, Riley: { initials: 'RI', role: 'Employee', side: 'right' } }

export const salary = {
  aggressive: {
    label: 'Aggressive', color: 'var(--b-aggressive)',
    gauge: { outcome: 55, relationship: 15 },
    lines: [
      [A, 'Riley, thanks for your hard work this year. We\'re offering a 5% raise based on company policy and performance.'],
      [R, 'Honestly, that\'s not acceptable. I\'ve carried more than my share this year, and 5% doesn\'t even come close to what I deserve.', 'Opens by rejecting, before any discussion.'],
      [A, 'I understand you\'ve contributed a lot, but this is in line with what we\'re offering across the board.'],
      [R, 'That might work for others, but not for me. I\'ve led major projects, covered for absent team members, and I\'m underpaid compared to the market. If you want to keep me, I need at least a 15% raise—no less.', 'Good evidence, delivered as an ultimatum.'],
      [A, 'Riley, I hear you, but threatening to walk away isn\'t the best way to approach this.'],
      [R, 'I\'m just being honest. I know my worth, and I\'m not going to stay in a role where I\'m undervalued. If this can\'t be addressed, I\'ll have to explore other options.'],
      [A, 'I\'ll bring your concerns to HR, but I can\'t make any promises with that tone.', 'The tone has become the topic, not the raise.'],
      [R, 'Then I suggest you move quickly. I won\'t wait around.'],
    ],
    note: 'Riley may win something through pressure, but Alex is now defensive and less willing to advocate.',
  },
  passive: {
    label: 'Passive', color: 'var(--b-passive)',
    gauge: { outcome: 10, relationship: 70 },
    lines: [
      [A, 'Riley, thanks again for a solid year. We\'re offering you a 5% raise based on your performance and company standards.'],
      [R, 'Oh, okay. Thank you. I appreciate the raise.'],
      [A, 'Of course. You\'ve been doing great work.'],
      [R, 'I was… kind of hoping for a little more, I guess. I\'ve taken on a few extra tasks lately, but maybe it\'s just not the right time to ask.', 'Raises the need, then withdraws it in the same breath.'],
      [A, 'I see. Well, the 5% is standard, but if you have any concerns, I\'m happy to hear them.', 'Alex opens the door…'],
      [R, 'It\'s fine, really. I don\'t want to make a fuss or seem ungrateful. I\'m just glad to be here.', '…and Riley closes it.'],
      [A, 'Alright. Let\'s check in again during your next review.'],
      [R, 'Sounds good. Thanks again.'],
    ],
    note: 'The conversation stays pleasant, but Riley leaves with 5% and an unspoken grievance.',
  },
  manipulative: {
    label: 'Manipulative', color: 'var(--b-manipulative)',
    gauge: { outcome: 40, relationship: 25 },
    lines: [
      [A, 'Riley, thanks again for your contributions this year. We\'re offering a 5% raise, which reflects your performance and aligns with our compensation policy.'],
      [R, 'Oh, thank you, Alex. I really appreciate you taking the time. Honestly, 5%—that\'s totally fine. I mean, I know budgets are tight, and I would never want to make things difficult for you.', 'Says "fine" while signalling it is not.'],
      [A, 'I\'m glad you understand. We really do value you.'],
      [R, 'Of course! I mean… sure, I\'ve taken on more work than most of the team and basically kept the launch from falling apart—but I don\'t expect that to be a factor. I\'m not the kind of person to make a fuss about being underpaid.', 'A complaint disguised as modesty.'],
      [A, 'I don\'t think you\'re underpaid, Riley. We evaluate everyone fairly.'],
      [R, 'Oh absolutely. I trust that completely. It\'s just… I had another offer come in last week, actually. Significantly higher. But don\'t worry—I turned it down. Loyalty matters to me more than money.', 'Leverage revealed indirectly, wrapped in loyalty.'],
      [A, 'You received an outside offer?'],
      [R, 'Yeah, but again—it\'s not about the money for me. I\'m here because I believe in the team. That said, if at some point down the line the company did recognize the extra weight I\'ve carried, I wouldn\'t say no. But please, don\'t feel pressured. I\'m fine with whatever you decide.'],
      [A, 'I see… I may need to revisit this with HR.'],
      [R, 'No rush. I trust you\'ll do what\'s best for the company—and for the people who quietly go the extra mile.', 'Guilt as a closing move.'],
    ],
    note: 'Alex may revisit the raise, but now wonders what else Riley isn\'t saying directly.',
  },
  assertive: {
    label: 'Assertive', color: 'var(--b-assertive)',
    gauge: { outcome: 75, relationship: 85 },
    lines: [
      [A, 'Riley, your performance this past year has been excellent—your leadership on the product launch really stood out. Based on our standard adjustment, we\'re offering a 5% raise.'],
      [R, 'I appreciate the positive feedback, Alex. I\'ve really enjoyed contributing to the team\'s success. That said, I\'d like to discuss the raise further. Based on my added responsibilities and market research for similar roles, I believe a 10% increase would better reflect the value I bring.', 'Acknowledges, then states a clear, reasoned request.'],
      [A, 'I understand where you\'re coming from. A 10% raise is above our usual range. Can you help me understand how you arrived at that number?'],
      [R, 'Sure. Over the past year, I\'ve taken on project management tasks, mentored two new hires, and helped cut development time by 20%. I\'ve also reviewed salary benchmarks, and for someone in my role with this level of impact, the market average is 8–12% higher than my current salary.', 'Evidence: contribution plus market data.'],
      [A, 'That\'s a strong case. I\'ll need to discuss it with HR, but I can advocate for a higher adjustment. If we can\'t meet 10% right away, would other forms of compensation interest you?'],
      [R, 'I\'d consider that, depending on what\'s offered. But my priority is a salary that reflects my current contributions. I\'m open to a follow-up conversation after you speak with HR.', 'Open to options without dropping the priority.'],
      [A, 'That\'s fair. I\'ll get back to you by next week. Thanks for raising it professionally.'],
      [R, 'Thanks, Alex. I appreciate you taking it seriously.'],
    ],
    note: 'Alex becomes Riley\'s advocate. Both the outcome and the relationship move forward.',
  },
}

const Y = 'You'
export const strategyScenes = {
  avoiding: {
    condition: 'Low stakes, and the relationship isn\'t a priority right now (or it\'s a bad time to engage).',
    scenario: 'A colleague wants to debate the coffee reimbursement policy on a hectic deadline day.',
    lines: [['Colleague', 'I still think the company should reimburse our team coffees. It adds up.'], [Y, '(stressed) Totally get your point—but I can\'t get into that right now. Let\'s talk after this launch wraps.'], ['Colleague', 'Fair enough, let\'s put a pin in it.']],
    note: 'Low-value issue, poor timing. You avoid to protect energy for more important priorities.',
  },
  collaborating: {
    condition: 'High stakes for both sides, and maintaining a long-term relationship is crucial.',
    scenario: 'You\'re a team lead working with a colleague on a cross-functional product launch.',
    lines: [[Y, 'We need to finalize the user testing by next week, but my team is already maxed out.'], ['Colleague', 'Same here—we\'re racing to finish the UI designs.'], [Y, '(exploring options) What if we bring in two interns to handle documentation while we reassign staff for testing and design?'], ['Colleague', 'That could work. And if we adjust the internal milestones by three days, we can catch up without burning out the team.'], [Y, 'Perfect. Let\'s pitch the new timeline together.']],
    note: 'Shared problem, joint solution: trust and creativity deepen the working relationship.',
  },
  accommodating: {
    condition: 'Low personal stake in the issue, but the relationship is valuable or you\'re building goodwill.',
    scenario: 'A senior mentor asks for help organizing a team event.',
    lines: [['Mentor', 'Can you take charge of organizing the team offsite?'], [Y, 'Honestly, it\'s not my strong suit, but I\'d be happy to support however I can.'], ['Mentor', 'Really appreciate that—it\'s great to know I can count on you.'], [Y, 'No problem. I\'ll start planning and loop you in for final decisions.']],
    note: 'You yield because it\'s not a core concern for you, and the relationship matters more.',
  },
  compromising: {
    condition: 'Moderate importance of outcome and relationship. Or, time is limited.',
    scenario: 'You\'re negotiating meeting ownership with a peer.',
    lines: [[Y, 'I\'ve been running the client call for three months straight—it\'s your turn.'], ['Peer', 'I\'ve got a packed week. Can we swap next month instead?'], [Y, 'How about we co-host this one, and you take full lead next time?'], ['Peer', 'Deal.']],
    note: 'Quick, balanced solution: both sides give a little to maintain momentum and fairness.',
  },
  competing: {
    condition: 'High stakes for you, but the relationship is not critical or long-term.',
    scenario: 'You\'re a freelance consultant negotiating with a new client over a one-time project budget.',
    lines: [['Client', 'We want you to handle the data overhaul, but we can only pay $3,000.'], [Y, 'My rate for a project of that scope is $4,500. The value you\'ll gain in data efficiency will return far more than that.'], ['Client', 'That\'s above our budget.'], [Y, '(firm) Then I can remove analytics and automation from the package. Otherwise, we stick with the $4,500.'], ['Client', 'Alright, let\'s go with your full package.']],
    note: 'You win the deal through firmness, because the relationship isn\'t the priority—your value is.',
  },
}
