// Short illustrative scenes for Module 5, built from the module's own phrases.
// A line with an empty speaker ('') is a stage direction; a third element is a coaching note.

export const batnaScene = {
  label: 'Example: leveraging your BATNA without a threat',
  cast: {
    You: { initials: 'YO', side: 'right' }, Supplier: { initials: 'SU' },
  },
  lines: [
    ['', 'You buy components for a manufacturer. Your objective is under $15/unit. Supplier B has confirmed $16/unit, delivery next week. You have spent twenty minutes understanding this supplier\'s capacity and priorities.'],
    ['Supplier', 'Our price is $17 per unit. That\'s where the market is right now.'],
    ['You', 'I appreciate you walking me through your capacity. I\'ve looked at the market closely: three comparable suppliers quoted between $14.50 and $16 this month.', 'Negotiate from information, not emotion.'],
    ['Supplier', 'Hmm. Quality isn\'t always comparable, though.'],
    ['You', 'Fair point, and that\'s why I\'d prefer to work with you. We\'re also exploring other partnerships, but I\'d like to see how we can make this work together.', 'Signal confidence, not threats, and only after rapport.'],
    ['Supplier', 'What volume are we talking about?'],
    ['You', 'If we commit to 12 months of volume, could you get to $14.80?', 'Stay flexible: a creative term that can improve both sides\' outcomes.'],
    ['Supplier', 'At 12 months… I could do $15.20.'],
    ['', 'Still above your $15 objective, but better than your BATNA at $16. You continue to explore, knowing exactly where your floor is.'],
  ],
  note: 'Notice what you never said: "If you don\'t agree, I\'ll go elsewhere." Your BATNA did its work quietly.',
}

export const stageScene = {
  label: 'Example: setting the stage',
  cast: {
    You: { initials: 'YO', side: 'right' }, Client: { initials: 'CL' },
  },
  lines: [
    ['', 'A contract renewal meeting with a long-standing client. You planned the path: easy issues first, price later.'],
    ['You', 'Thanks for making the time. I suggest we cover three things today: the service report, the scope for next year, and then pricing. Does that work for you?', 'Open with a clear agenda and a cooperative tone.'],
    ['Client', 'Sure. Though I should say, our CFO will make the final call on pricing.'],
    ['You', 'Good to know. Should we plan a short call with the CFO once we\'ve agreed the scope?', 'Confirm the decision-makers.'],
    ['Client', 'That would help.'],
    ['You', 'We\'ve looked closely at how this year went, and we\'re open to adjusting how we work together. Shall we start with the report?', 'Signal flexibility, but show confidence in your preparation.'],
  ],
  note: 'Two minutes of setting the stage told you who decides, and gave the meeting a shape you planned.',
}
