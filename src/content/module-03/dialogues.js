// Real-world examples from Raad's module, shown as short scenes.
// A line with an empty speaker ('') is a stage direction; a third element is a coaching note.

export const counterfeitScene = {
  label: 'Real-world examples: counterfeit yes',
  cast: {
    Salesperson: { initials: 'SP', side: 'right' }, Prospect: { initials: 'PR' },
    Executive: { initials: 'EX', side: 'right' }, Manager: { initials: 'MG' },
  },
  lines: [
    ['', 'Sales call'],
    ['Salesperson', 'Do you think this could work for your team?'],
    ['Prospect', 'Yeah, totally, I think so.', 'Said with no thought or pause. They just want to end the call, and never intended to move forward.'],
    ['', 'Office setting'],
    ['Executive', 'Can you handle the client\'s request for the updated proposal today?'],
    ['Manager', 'Yes, we\'ll take care of it.', 'Said with no thought or pause. They haven\'t confirmed whether the team even has the new data yet.'],
  ],
  note: 'Both answers sound like agreement. Neither comes with a step, an owner or a date.',
}

export const confirmationScene = {
  label: 'Real-world examples: confirmation yes',
  cast: {
    Interviewer: { initials: 'IN', side: 'right' }, Candidate: { initials: 'CA' },
    Consultant: { initials: 'CO', side: 'right' }, Client: { initials: 'CL' },
  },
  lines: [
    ['', 'Interview setting'],
    ['Interviewer', 'So you worked at Salesforce before joining your current role?'],
    ['Candidate', 'Yes.', 'This is confirmation, not decision-making.'],
    ['', 'Client meeting'],
    ['Consultant', 'Your revenue doubled last quarter?'],
    ['Client', 'That\'s right.', 'Simply verifying a fact, not agreeing to take action.'],
  ],
}

export const commitmentScene = {
  label: 'Real-world examples: commitment yes',
  cast: {
    Client: { initials: 'CL' }, 'Project lead': { initials: 'PL', side: 'right' }, 'Team member': { initials: 'TM' },
  },
  lines: [
    ['', 'Sales conversation'],
    ['You', 'Are you ready to move forward with the solution?'],
    ['Client', 'Yes, let\'s do it. I\'ll loop in legal and sign by end of day.', 'A green light, both in tone and in action.'],
    ['', 'Team collaboration'],
    ['Project lead', 'Can we commit to launching next Tuesday?'],
    ['Team member', 'Yes, we\'re good to go. All assets are approved, and I\'ve scheduled the emails.', 'Deliverables, timing and ownership are already in place.'],
  ],
  note: 'At this stage your job is to confirm and support execution: "Excellent, I\'ll send over the paperwork now."',
}

export const pauseScene = {
  label: 'Example: the pause that opens people up',
  cast: { Colleague: { initials: 'CO' } },
  lines: [
    ['Colleague', 'I\'ve just been feeling overwhelmed.'],
    ['You', 'Overwhelmed?', 'Verbal mirror: repeat the key word'],
    ['', 'Pause. Soft eye contact. Say nothing more.'],
    ['Colleague', 'Yeah, everything at once. Deadlines, the new client, everything\'s piling up.', 'The silence invited them to go deeper.'],
    ['', 'Later, a different conversation.'],
    ['Colleague', 'It\'s been a rough week.'],
    ['', 'You just nod silently, and pause…'],
    ['Colleague', 'Actually, there\'s more going on than I\'ve admitted…', 'Even without a mirror, attentive silence draws out more.'],
  ],
  note: 'In both cases the most important thing you said was nothing at all.',
}
