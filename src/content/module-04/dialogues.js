// Examples from Raad's module, shown as short scenes.
// A line with an empty speaker ('') is a stage direction; a third element is a coaching note.

// Example 1 in Stage 2. The classic story from Fisher, Ury & Patton (2011).
export const libraryScene = {
  label: 'Example 1: the library window dispute',
  cast: {
    Reader: { initials: 'RA' }, Student: { initials: 'ST' },
    Librarian: { initials: 'LI', side: 'right' },
  },
  lines: [
    ['', 'Two people are quarrelling in a library.'],
    ['Reader', 'Can we open the window, please? It\'s stuffy in here.'],
    ['Student', 'No. Leave it closed.', 'Two positions: "open" and "closed". Any compromise (a crack, half-way) satisfies neither.'],
    ['Reader', 'Just a little, then?'],
    ['Student', 'Not even a little.'],
    ['', 'They argue back and forth about how far to open it. The librarian walks over.'],
    ['Librarian', 'Why do you want the window open?', 'She asks why, to find the interest behind the position.'],
    ['Reader', 'To get some fresh air.'],
    ['Librarian', 'And why would you rather it stayed closed?'],
    ['Student', 'To avoid the draft. My papers keep blowing around.'],
    ['', 'The librarian thinks for a moment, then opens a window wide in the next room.'],
    ['Librarian', 'Fresh air, and no draft.', 'A solution neither position could have produced, because it was built on the interests.'],
  ],
  note: 'The positions were opposed. The interests, fresh air and no draft, were not. Source: Fisher, Ury & Patton (2011).',
}

// Example 1 in Stage 4. Raad's slide gives only the title, so this is an illustrative version.
export const doorbellScene = {
  label: 'Example 1: compensation for a malfunctioning doorbell',
  cast: {
    You: { initials: 'YO', side: 'right' }, Manager: { initials: 'SM' },
  },
  lines: [
    ['', 'You bought a smart doorbell 14 months ago. It has stopped working. The shop\'s own warranty was 12 months.'],
    ['Manager', 'I\'m sorry, it\'s out of warranty. There\'s nothing we can do.'],
    ['You', 'I understand that your warranty was 12 months. Let\'s find what\'s fair here. How long would you expect a doorbell like this to last?', 'Collaborative search: frame it as a shared problem, then ask for a standard.'],
    ['Manager', 'Well, a few years, normally.'],
    ['You', 'That was my expectation too. Also, as I understand it, the legal guarantee for consumer goods here is at least two years, separate from your own warranty. How do you see that applying to this case?', 'Reason openly: propose a standard, then ask how they see it applying.'],
    ['Manager', 'I\'d have to check that with head office.'],
    ['You', 'Please do. And how have you handled similar faults with this model?', 'Precedent and historical data are standards too.'],
    ['Manager', 'Look, if you keep pushing, I can offer you 10% off a new one. Take it or leave it.', 'Pressure: an arbitrary number and an ultimatum.'],
    ['You', 'I appreciate the offer. I\'d rather we stick to the criteria we discussed. If the legal guarantee covers it, a repair or a replacement seems fair. If it doesn\'t, I\'m open to hearing why.', 'Never yield to pressure, only to principle. Firm, calm and open to reasons.'],
    ['Manager', 'Fair enough. Let me call head office now.'],
  ],
  note: 'Illustrative example. Check the consumer rules that apply in your country: in the EU, sellers must offer a legal guarantee of at least two years.',
}
