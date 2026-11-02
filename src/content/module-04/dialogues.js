// Examples from Raad's module, shown as short scenes.
// A line with an empty speaker ('') is a stage direction; a third element is a coaching note.

// Example 1 in Stage 2. Adapted from the classic library story in Fisher, Ury & Patton (2011).
export const officeScene = {
  label: 'Example 1: the office window dispute',
  cast: {
    Analyst: { initials: 'AN' }, Designer: { initials: 'DE' },
    'Office manager': { initials: 'OM', side: 'right' },
  },
  lines: [
    ['', 'Two colleagues who share an office are arguing about the window.'],
    ['Analyst', 'Can we open the window, please? It\'s stuffy in here.'],
    ['Designer', 'No. Leave it closed.', 'Two positions: "open" and "closed". Any compromise (a crack, half-way) satisfies neither.'],
    ['Analyst', 'Just a little, then?'],
    ['Designer', 'Not even a little.'],
    ['', 'They argue back and forth about how far to open it. The office manager walks over.'],
    ['Office manager', 'Why do you want the window open?', 'She asks why, to find the interest behind the position.'],
    ['Analyst', 'To get some fresh air.'],
    ['Office manager', 'And why would you rather it stayed closed?'],
    ['Designer', 'To avoid the draft. My drawings keep blowing off the desk.'],
    ['', 'The office manager thinks for a moment, then opens a window wide in the empty meeting room next door and props the door open.'],
    ['Office manager', 'Fresh air, and no draft.', 'A solution neither position could have produced, because it was built on the interests.'],
  ],
  note: 'The positions were opposed. The interests, fresh air and no draft, were not. Adapted from Fisher, Ury & Patton (2011).',
}

// Example 1 in Stage 4. Raad's slide gives only the title, so this is an illustrative version.
export const printerScene = {
  label: 'Example 1: compensation for a failed production printer',
  cast: {
    You: { initials: 'YO', side: 'right' }, 'Account manager': { initials: 'AM' },
  },
  lines: [
    ['', 'Your company bought a €18,000 production printer from a supplier 14 months ago. It has stopped working. The supplier\'s warranty was 12 months.'],
    ['Account manager', 'I\'m sorry, it\'s out of warranty. There\'s nothing we can do.'],
    ['You', 'I understand that your warranty was 12 months. Let\'s find what\'s fair here. How long would you expect a printer in this class to run?', 'Collaborative search: frame it as a shared problem, then ask for a standard.'],
    ['Account manager', 'Well, five years or more, normally.'],
    ['You', 'That was our expectation too. The manufacturer\'s own datasheet rates it for five years of daily use. How do you see that applying to a failure after 14 months?', 'Reason openly: propose a standard, then ask how they see it applying.'],
    ['Account manager', 'I\'d have to check that with our service team.'],
    ['You', 'Please do. And how have you handled similar faults with this model for other customers?', 'Precedent and historical data are standards too.'],
    ['Account manager', 'Look, if you keep pushing, I can offer you 10% off a new one. Take it or leave it.', 'Pressure: an arbitrary number and an ultimatum.'],
    ['You', 'I appreciate the offer. I\'d rather we stick to the criteria we discussed. If the expected service life and your past practice point to a repair or replacement, that seems fair. If they don\'t, I\'m open to hearing why.', 'Never yield to pressure, only to principle. Firm, calm and open to reasons.'],
    ['Account manager', 'Fair enough. Let me call our service team now.'],
  ],
  note: 'Illustrative example. Check your contract and the rules that apply in your country: warranty and liability terms between businesses differ from consumer rules.',
}
