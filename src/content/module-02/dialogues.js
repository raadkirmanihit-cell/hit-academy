// The Maya example from Raad's module, with technique notes on each of your lines.
// A line with an empty speaker ('') is a stage direction.
const M = 'Maya', Y = 'You'
export const mayaCast = { Maya: { initials: 'MA', role: 'Team member' } }

export const maya = {
  label: 'Example: the burned-out employee',
  scenario: 'A one-on-one with Maya. She is high-performing but lately disengaged, angry, frustrated and exhausted. You have asked how she is doing.',
  cast: mayaCast,
  lines: [
    [M, 'Honestly? I\'m tired. I\'ve been drowning in deadlines, no one\'s checking in, and I\'m just… expected to keep delivering. It\'s starting to feel like I\'m not even a person anymore, just output. I cannot take it anymore!'],
    [Y, 'I\'m sorry, Maya. That sounds incredibly heavy.', 'Midnight voice (low, warm, steady) + "I\'m sorry" and acknowledgement'],
    ['', 'Silence. Give it three seconds. Let it land.'],
    [Y, 'It seems like you\'re not just overwhelmed. You\'re starting to feel taken for granted… like no one\'s really seeing you in all of this. Maybe even a little burned out?', 'Labeling: names the feeling beneath the words'],
    [M, 'Yeah… that\'s exactly it. I\'m trying to keep up, but it feels like the more I give, the less anyone notices.'],
    [Y, 'The more you give, the less anyone notices?', 'Verbal mirroring: repeats her key phrase'],
    [M, 'Right. Like there\'s no space to say, "Hey, this is too much." Because it won\'t change anything anyway.'],
    ['', 'Silence again. A nod. Let her sit with her own words.'],
    [Y, 'So what you\'re really asking for is to be seen. To be supported. And to know that when you raise your hand, someone\'s actually going to listen, and act.', 'Repetition: calm, reflective summary of her need'],
    [M, 'Yes. That would mean a lot.'],
    [Y, 'You deserve that, Maya. Let\'s reset, together. We\'ll figure out how to rebalance things. But more importantly, I want you to feel like this isn\'t just on your shoulders anymore.', 'Anchoring with quiet conviction'],
  ],
  note: 'Notice what you never did: argue, fix too early, or tell her how to feel. The solution comes last, after she feels heard.',
}
