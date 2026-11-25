// H.I.T. moves: the course techniques HIT Mentor names inside its plans.
// The coach writes a move as a token like [[move:allegation-assessment]]. The chat turns it into a
// tappable chip that opens a mini lesson: what it is, why it works, the learner's own line (from the
// coach's hidden case file), a short "try it" exercise and a link to the lesson for more.
// The "what" and "why" text is fixed here, written from the module pages, so it never contradicts the
// course and costs no AI messages. Tokens that are not in this list are shown as plain text.
// Moves are techniques to use, except kind 'spot': patterns to recognise in the other side.
// Every `lesson` must be on the coach's lesson map (checked by scripts/check-coach-lessons.mjs).

export const MOVES = [
  // Module 1
  { id: 'calm-assertiveness', name: 'Calm assertiveness', lesson: 'm1/l3-adapt',
    what: 'Staying firm and respectful while the other side gets forceful, without matching their heat.',
    why: 'It holds your boundary without escalating, so you look strong, not aggressive.',
    tryIt: 'Answer "My way is the only one that makes sense" in one calm sentence that keeps your point.' },
  { id: 'transparent-assertiveness', name: 'Transparent assertiveness', lesson: 'm1/l3-adapt',
    what: 'Answering guilt, flattery or hidden agendas with calm clarity: you say plainly what you see and what you want.',
    why: 'A tactic loses its pull once it is out in the open, and clarity leaves nothing to manipulate.',
    tryIt: 'Answer "After everything I did for you, you can\'t say no" in one clear, friendly sentence.' },
  { id: 'supportive-assertiveness', name: 'Supportive assertiveness', lesson: 'm1/l3-adapt',
    what: 'With someone quiet or hesitant, you stay clear about what you need and actively draw out their view.',
    why: 'It makes it safe for them to speak up, so you hear problems before they cost you.',
    tryIt: 'Turn "Any questions?" into a question that makes it easy for a quiet person to raise a doubt.' },
  // Module 2
  { id: 'midnight-voice', name: 'Midnight voice', lesson: 'm2/l4-voices',
    what: 'A calm, low, slow voice with soft downward endings and longer pauses, like a late-night radio host.',
    why: 'It builds trust and safety, so hard words land without setting off alarm.',
    tryIt: 'Say your hardest sentence out loud twice: once at normal speed, once slower and lower. Notice the difference.' },
  { id: 'assertive-voice', name: 'Assertive voice', lesson: 'm2/l4-voices',
    what: 'A clear, steady voice at medium pace with a downward ending, so a statement sounds certain.',
    why: 'It projects confidence and sets boundaries without raising the volume.',
    tryIt: 'Say "This is where we need to be" twice: ending up, then ending down. The second one is the assertive voice.' },
  { id: 'labeling', name: 'Labeling', lesson: 'm2/l5-empathy',
    what: 'Naming the emotion you notice in the other person: "It sounds like…", "It seems like…".',
    why: 'Named emotions lose their grip, defensiveness drops and people tell you more.',
    tryIt: 'Someone says "Fine, whatever you decide." Write one label starting with "It sounds like…".' },
  { id: 'verbal-mirroring', name: 'Verbal mirroring', lesson: 'm2/l5-empathy',
    what: 'Repeating the last few words, or the key words, of what they said, then waiting.',
    why: 'It shows you are listening and invites them to explain more, without you asking a question.',
    tryIt: 'They say "I\'m not sure this works for my team." Write your mirror (two to four of their words).' },
  { id: 'allegation-assessment', name: 'Allegation Assessment', lesson: 'm2/l5-allegation',
    what: 'Naming, before they do, the negative thoughts or objections the other person may have about you or your position.',
    why: 'If they say it, it is a problem; if you say it first, it is connection. It lowers defensiveness and builds trust.',
    tryIt: 'Ask yourself: "What might they fear, assume or resent about me?" Turn the answer into one "You might be thinking…" sentence.' },
  { id: 'strategic-empathy', name: 'Strategic empathy', lesson: 'm2/l5-empathy',
    what: 'Showing you understand their feelings and view, without agreeing with them: listening, labeling and mirroring.',
    why: 'Understanding builds trust and safety, which makes the other side more open to solving the problem with you.',
    tryIt: 'Write one sentence that acknowledges how the other person probably feels, without agreeing that they are right.' },
  { id: 'confront-without-confrontation', name: 'Confront without confrontation', lesson: 'm2/l6-flow',
    what: 'A six-step flow for raising a hard issue: calm voice, acknowledge, label, mirror, silence, then restate your point.',
    why: 'They feel heard first, so your point meets less resistance and the relationship survives.',
    tryIt: 'Write the "acknowledge" sentence you would open your hard conversation with.' },
  { id: 'self-regulation', name: 'Self-regulation', lesson: 'm2/l2-self-regulation',
    what: 'Managing your own reactions under pressure, so you choose a calm response instead of a reflex.',
    why: 'Composure is a competitive advantage: a heated reply can damage the outcome even when you are right.',
    tryIt: 'Name the moment in your conversation most likely to make you react, and the one sentence you will say to yourself then.' },
  // Module 3
  // A pattern to recognise in the other side (kind 'spot'): the card shows how to spot it and offers
  // an explanation for the learner's own situation instead of an exercise.
  { id: 'counterfeit-yes', name: 'Counterfeit yes', lesson: 'm3/l1-counterfeit', kind: 'spot',
    what: 'A "yes" said to escape pressure or look agreeable, with no real intention or understanding behind it.',
    spot: 'It comes quickly and easily ("Yes, totally", "Sure, I\'ll get to it"), with no follow-up questions, vague answers when you ask for details, enthusiasm that doesn\'t match their body language, or a history of agreeing without delivering.',
    why: 'Spotting it early saves you from building on an agreement that was never there.',
    tryIt: 'Think of a recent "yes, sure" you received. What is one follow-up question that would have tested it?' },
  { id: 'commitment-yes', name: 'Commitment yes (what, when, who)', lesson: 'm3/l2-ensure',
    what: 'Turning a "yes" into a real commitment by agreeing what happens, by when, and who does it.',
    why: 'A plan that names the action and the time makes follow-through far more likely than a simple "yes".',
    tryIt: 'Rewrite "Got it?" as one question that checks what, when and who.' },
  { id: 'no-oriented-question', name: 'No-oriented question', lesson: 'm3/l3-invite',
    what: 'A question that invites a safe "no", like "Would it be unreasonable to…?" or "Is it a bad idea to…?".',
    why: 'Saying no feels safe and in control, so people answer honestly and lower their guard.',
    tryIt: 'Turn "Can you send it by Friday?" into a no-oriented question.' },
  { id: 'silence', name: 'Strategic silence', lesson: 'm3/l4-silence',
    what: 'Staying quiet on purpose after an important point, a number or a question.',
    why: 'Silence projects confidence and draws out information the other side would otherwise keep back.',
    tryIt: 'Pick the sentence in your plan after which you will stay silent, and count to five in your head when you get there.' },
  { id: 'strategic-pause', name: 'Strategic pause', lesson: 'm3/l4-pauses',
    what: 'A deliberate pause before you answer or after a key point, to think, to calm the room, or to let words sink in.',
    why: 'It shows composure and makes your reply sound considered instead of reactive.',
    tryIt: 'Write the words you will use to buy a pause, e.g. "Let me think about that for a second."' },
  // Module 4
  { id: 'separate-people-problem', name: 'Separate the people from the problem', lesson: 'm4/l2-how',
    what: 'Talking about the issue and its effects, not about the person\'s character or intentions.',
    why: 'People defend themselves when they feel judged; they solve problems when they feel respected.',
    tryIt: 'Rewrite "You\'re careless" as a sentence about one specific behaviour and its effect.' },
  { id: 'interests-behind-positions', name: 'Interests behind positions', lesson: 'm4/l3-how',
    what: 'Looking past what someone demands (the position) to why they want it (the interest).',
    why: 'Interests can often be met in more than one way, which opens options a fight over positions never will.',
    tryIt: 'Write the other side\'s demand, then ask "What is this for?" and write the most likely answer.' },
  { id: 'six-needs', name: 'The six basic needs', lesson: 'm4/l3-needs',
    what: 'Security, economic well-being, belonging, recognition, control and fairness: the deepest interests under most positions.',
    why: 'When you meet the need behind a demand, the demand often softens or changes.',
    tryIt: 'Which of the six needs is most at stake for the other person in your situation?' },
  { id: 'generate-options', name: 'Generate options', lesson: 'm4/l4-how',
    what: 'Inventing several possible solutions first, and judging them only afterwards.',
    why: 'More options mean more ways to meet both sides\' interests, instead of one fight over one solution.',
    tryIt: 'Write three different ways your issue could be solved, without judging any of them yet.' },
  { id: 'objective-criteria', name: 'Objective criteria', lesson: 'm4/l5-standards',
    what: 'Basing the decision on a fair standard both sides can accept: market rates, agreed criteria, past results, a fair procedure.',
    why: 'It turns a contest of wills into a shared test, so nobody has to give in to the other.',
    tryIt: 'Name one fact or standard both sides in your situation would accept as fair.' },
  // Module 5
  { id: 'goals-and-limits', name: 'Ideal, minimum and walk-away', lesson: 'm5/l2-goals',
    what: 'Deciding before you start your best realistic result, the least you can accept, and the point where you walk away.',
    why: 'Clear limits stop you from caving under pressure or accepting a deal worse than your alternative.',
    tryIt: 'Write your ideal, your minimum and your walk-away point for this situation in three short lines.' },
  { id: 'batna', name: 'BATNA', lesson: 'm5/l3-what',
    what: 'Your Best Alternative To a Negotiated Agreement: what you will do if this conversation produces no deal.',
    why: 'The better your alternative, the less you need this deal, and the calmer and firmer you can be.',
    tryIt: 'Finish the sentence: "If this doesn\'t work out, I will…".' },
  // Module 6
  { id: 'loss-aversion', name: 'Loss aversion', lesson: 'm6/l2-apply',
    what: 'Framing what the other side stands to lose by not acting, not only what they could gain.',
    why: 'People feel losses more strongly than equal gains, so the cost of inaction moves them.',
    tryIt: 'Rewrite one benefit in your situation as what they lose if nothing changes.' },
  { id: 'anchoring', name: 'Anchoring', lesson: 'm6/l3-how',
    what: 'Setting the first number, justified with facts, so the conversation moves around your reference point.',
    why: 'The first credible number shapes what both sides see as reasonable.',
    tryIt: 'Write your opening number and the one-line reason that makes it sound fair.' },
  { id: 'fairness-play', name: 'The fairness play', lesson: 'm6/l4-how',
    what: 'Appealing to fairness for both sides, backed by a standard, to justify your position or challenge theirs.',
    why: 'Most people want to see themselves as fair, so a fair frame is hard to argue against.',
    tryIt: 'Write one sentence starting with "I want to make sure this is fair for both of us…".' },
  { id: 'illusion-of-choice', name: 'Illusion of choice', lesson: 'm6/l5-how',
    what: 'Offering two or more acceptable options instead of a yes-or-no question.',
    why: 'Choosing gives the other side a sense of control, and every option moves things forward.',
    tryIt: 'Turn "Can we meet?" into a question with two options.' },
  { id: 'calibrated-questions', name: 'Calibrated questions', lesson: 'm6/l6-how',
    what: 'Open "what" and "how" questions (not "why") that invite the other side to solve the problem with you.',
    why: 'They avoid sounding like an attack and make the other person think about your problem as theirs.',
    tryIt: 'Turn "Why didn\'t you ask?" into a "what" or "how" question.' },
  { id: 'reciprocity', name: 'Reciprocity', lesson: 'm6/l7-how',
    what: 'Giving something of value first, and making every concession in exchange for something.',
    why: 'People feel a natural pull to return a favour, and trades protect you from giving ground for free.',
    tryIt: 'Name one thing you could offer, and what you would ask for in return.' },
  // Module 7
  { id: 'decode-tactic', name: 'Recognise, raise, question', lesson: 'm7/l1-decode',
    what: 'Countering a pressure tactic by recognising it, naming it calmly, and asking a question about it.',
    why: 'A tactic loses most of its power once it is recognised, so you can respond to the substance, not the pressure.',
    tryIt: 'They say "This offer expires today." Write a calm sentence that names it, then a question.' },
]

const BY_ID = new Map(MOVES.map((m) => [m.id, m]))
export const moveOf = (id) => BY_ID.get(id) || null
export const MOVE_TOKEN = /\[\[\s*move:([a-z0-9-]+)\s*\]\]/g

// The list the coach sees in its rules: token, name, and what it is.
export const moveList = () => MOVES.map((m) => `[[move:${m.id}]] ${m.name}: ${m.what}`).join('\n')

// Plain text for read-aloud and copies: a move token becomes the move's name.
export const movesAsText = (text) => String(text).replace(MOVE_TOKEN, (_, id) => moveOf(id)?.name || '')
