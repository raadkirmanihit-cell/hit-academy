// Short illustrative scenes for Module 6, built from the module's own examples.
// A line with an empty speaker ('') is a stage direction; a third element is a coaching note.

export const salaryAnchorScene = {
  label: 'Example: anchoring a salary conversation',
  cast: { You: { initials: 'YO', side: 'right' }, Employer: { initials: 'EM' } },
  lines: [
    ['', 'You are negotiating a salary. You would be happy with $100,000.'],
    ['Employer', 'So, what are your salary expectations?'],
    ['You', 'Based on market research and my experience level, professionals in this role typically earn between $110,000 and $120,000. I\'d like to position myself within that range.', 'Set the first number, and frame it as reasonable with data.'],
    ['Employer', 'That\'s a bit above what we had planned. We could look at $108,500.'],
    ['', 'Their counter now starts near $110,000, not below $100,000. Your anchor set the frame.'],
  ],
  note: 'Instead of asking for $100,000, you anchored at the market range. The employer now perceives $110,000+ as a reasonable starting point.',
}

export const freelancerScene = {
  label: 'Example: the fairness play',
  cast: { Freelancer: { initials: 'FR', side: 'right' }, Client: { initials: 'CL' } },
  lines: [
    ['', 'A freelancer is negotiating a contract with a client.'],
    ['Client', 'We like the proposal, but we need a discount on your rate.'],
    ['Freelancer', 'I value fairness in all my agreements. If I reduce my rate, I\'d need to adjust the scope of work slightly. That way, it remains fair for both of us.', 'Fairness framed as a shared priority, not a refusal.'],
    ['Client', 'What would you take out?'],
    ['Freelancer', 'We could drop the second round of revisions and keep everything else. What would work best for you?', 'A calibrated question keeps the client involved in the solution.'],
  ],
  note: 'Instead of refusing, the freelancer links price to scope. The negotiation feels collaborative, and the rate keeps its value.',
}

export const reciprocityScene = {
  label: 'Example: give first, ask later',
  cast: { You: { initials: 'YO', side: 'right' }, Supplier: { initials: 'SU' } },
  lines: [
    ['', 'Two weeks ago, you introduced Dana, a supplier\'s account manager, to a colleague in another department who needed her product. They signed a new contract.'],
    ['Supplier', 'I wanted to say thank you for that introduction. It really helped us this quarter.'],
    ['You', 'I was happy to help. I know you\'d do the same.', 'Reinforce the social norm.'],
    ['', 'A week later, you need a delivery brought forward.'],
    ['You', 'We\'ve got a tight launch date. How could we bring our delivery forward by five days?', 'A clear request, as a calibrated question. No need to mention the favour.'],
    ['Supplier', 'Let me talk to the warehouse. I\'m sure we can find a way.'],
  ],
  note: 'The favour was small, personal and genuine. That is what made the later request feel natural.',
}
