// Interactive activities for Module 3. Built from the module's own concepts and examples.

export const whichYes = {
  id: 'a-which-yes',
  kind: 'classify',
  title: 'Which "yes" is it?',
  prompt: 'Nine moments where someone says yes. Sort each one into the type of yes it most likely is. On a phone, tap a card and then tap a box.',
  buckets: [
    { id: 'counterfeit', label: 'Counterfeit Yes', hint: 'Says yes, means no', color: 'var(--b-aggressive)' },
    { id: 'confirmation', label: 'Confirmation Yes', hint: 'Acknowledges a fact', color: 'var(--s-accommodating)' },
    { id: 'commitment', label: 'Commitment Yes', hint: 'Real agreement and intent', color: 'var(--b-assertive)' },
  ],
  cols: 3,
  items: [
    { id: 'y1', text: '"Yeah, totally, I think so." (said instantly, while checking their phone)', answer: 'counterfeit', why: 'Quick, eager and vague, with body language that doesn\'t match the words.' },
    { id: 'y2', text: '"That\'s correct, we moved to the new system in March."', answer: 'confirmation', why: 'Short and factual. It verifies information and decides nothing.' },
    { id: 'y3', text: '"Yes, let\'s do it. I\'ll loop in legal and sign by end of day."', answer: 'commitment', why: 'A decision with an owner and a deadline.' },
    { id: 'y4', text: '"Sure, of course. I\'ll get to it." (the third time this month)', answer: 'counterfeit', why: 'A history of agreeing but not delivering is one of the clearest warning signs.' },
    { id: 'y5', text: 'Interviewer: "You led the Berlin project?" Candidate: "Yes."', answer: 'confirmation', why: 'A factual answer to a factual question. No emotional shift, no commitment.' },
    { id: 'y6', text: '"Yes, we\'re good to go. All assets are approved and I\'ve scheduled the emails."', answer: 'commitment', why: 'Concrete deliverables that are already moving. Your job now is to support execution.' },
    { id: 'y7', text: '"Yes, we\'ll take care of it." (but nobody has checked whether the team has the data)', answer: 'counterfeit', why: 'A yes given to move the conversation along, without the basis to follow through.' },
    { id: 'y8', text: '"Exactly. That\'s the number we reported to the board."', answer: 'confirmation', why: 'Agreement with a fact, not agreement to act. Use it as a bridge to a deeper question.' },
    { id: 'y9', text: '"Absolutely. Send the contract, I\'ll start today."', answer: 'commitment', why: 'Certainty, energy and a specific next step.' },
  ],
}

export const testTheYes = {
  id: 'a-test-yes',
  kind: 'scenarios',
  title: 'Test the yes',
  prompt: 'Five moments after someone has said yes. Each time, choose the move that turns the yes into something you can rely on.',
  items: [
    {
      who: 'The quick yes', scene: 'You ask a prospect whether the solution could work for their team. Without a pause, they say: "Yeah, totally, I think so."',
      options: [
        { t: '"Great! I\'ll send the contract over this afternoon."', fb: 'You may be acting on a counterfeit yes. If it is fake, the contract will sit unsigned and you won\'t know why.' },
        { t: '"Good to hear. When do you think you\'d be able to start?"', fb: 'A specific, forward-looking question. A real yes has an answer; a counterfeit yes stumbles.', correct: true },
        { t: '"Are you sure? You don\'t sound convinced."', fb: 'Right instinct, but it sounds like an accusation and may make them defensive.' },
      ],
    },
    {
      who: 'Mixed signals', scene: 'Your counterpart says "Yes, that works," but leans back, folds their arms and looks at the table.',
      options: [
        { t: 'Note the yes and move to the next agenda item.', fb: 'Words and body language disagree. Moving on leaves a possible objection buried.' },
        { t: '"You seem a little unsure. Is there anything we should address first?"', fb: 'Probe for hesitations. You name what you see, calmly, and give them room to raise it.', correct: true },
        { t: 'Ask them to put their agreement in writing right now.', fb: 'Testing agreement is right, but jumping straight to a demand ignores the hesitation you just saw.' },
      ],
    },
    {
      who: 'The vague owner', scene: 'An executive asks your manager whether the team can deliver the updated proposal today. Your manager says: "Yes, we\'ll take care of it."',
      options: [
        { t: '"Just to be sure we\'re aligned, what\'s the first step, and who will own it?"', fb: 'Asks for specifics and ownership. It turns an easy yes into a plan, or reveals that there isn\'t one yet.', correct: true },
        { t: 'Say nothing. The manager said yes.', fb: 'If the team does not have the data, the "yes" will become a missed deadline and a trust problem.' },
        { t: '"That\'s impossible, we don\'t have the data yet."', fb: 'Contradicting your manager in front of the executive creates conflict instead of clarity.' },
      ],
    },
    {
      who: 'Closing the deal', scene: 'After a long negotiation the buyer says: "Yes, we\'re happy with these terms."',
      options: [
        { t: '"Excellent. Could you send a purchase order or letter of intent by the end of the week to confirm?"', fb: 'Test agreement with a small, immediate action. If they hesitate, it was not a full commitment yet.', correct: true },
        { t: '"Fantastic, thank you!" and end the meeting.', fb: 'Warm, but a yes without a next step is easy to walk back.' },
        { t: '"Are there any other terms you would like to change?"', fb: 'This reopens the negotiation just as it was closing.' },
      ],
    },
    {
      who: 'The confirmation', scene: 'You check a fact: "So your team doubled in size this year?" The client says: "That\'s right."',
      options: [
        { t: '"Then you\'ll definitely need our premium package."', fb: 'You treat a confirmation yes as a buying signal. They agreed to a fact, not to a purchase.' },
        { t: '"Thanks for confirming. How has that changed your priorities?"', fb: 'Uses the confirmation as a bridge to a deeper question: from data to what matters to them.', correct: true },
        { t: '"Great." Then move to your next question on the list.', fb: 'Not wrong, but you waste a natural opening to learn more.' },
      ],
    },
  ],
}

export const reframeCards = [
  { front: '"Is this something you\'d be interested in?"', say: '"Would it be ridiculous to explore this a bit further?"', why: 'Removes the pressure to commit. "No, not ridiculous" keeps the door open.' },
  { front: '"Can you approve this today?"', say: '"Is it out of the question to wrap this up today?"', why: 'They can say no and still feel in control, while moving toward closing.' },
  { front: '"Do you like this idea?"', say: '"Is there something here that doesn\'t sit right with you?"', why: 'Invites real feedback instead of a polite yes.' },
  { front: '"Are you available for a call this afternoon?"', say: '"Would it be a bad idea to hop on a quick call this afternoon?"', why: 'A safe "no, not a bad idea" is easier to give than a yes to a request.' },
  { front: '"Can I show you how this works?"', say: '"Would it be a mistake to walk you through how this works?"', why: 'Lowers resistance to a demo by letting them decline easily.' },
  { front: '"Will you move forward with the project?"', say: '"Is there something stopping you from moving forward with the project?"', why: 'Surfaces the hidden objection, so you are not fooled by a counterfeit yes.' },
  { front: '"Is this a good time?"', say: '"Have I caught you at a bad time?"', why: 'Famously effective: it often gets a quick, relaxed "No, now\'s fine," and opens the door.' },
  { front: '"Are we on the same page?"', say: '"Is there anything here that concerns you or doesn\'t make sense?"', why: 'Asks for disagreement directly, which makes it safe to share.' },
  { front: '"Do you want to renew your contract?"', say: '"Is renewing your contract a bad idea at this point?"', why: 'A comfortable "no" here is a step toward renewal, and any real concern comes out early.' },
]

export const askForNo = {
  id: 'a-ask-for-no',
  kind: 'scenarios',
  title: 'Ask for the "no"',
  prompt: 'Five situations. Choose the question that makes "no" feel safe and still moves the conversation forward.',
  items: [
    {
      who: 'A first call', scene: 'You are calling a busy procurement manager you have never spoken to before.',
      options: [
        { t: '"Is this a good time to talk?"', fb: 'Invites an automatic yes, or an easy "no, it isn\'t", which ends the call.' },
        { t: '"Have I caught you at a bad time?"', fb: 'The safe answer, "No, now\'s fine", opens the door and gives them control.', correct: true },
        { t: '"This will only take two minutes, okay?"', fb: 'Pressure dressed as politeness. People hear the push.' },
      ],
    },
    {
      who: 'Proposing a pilot', scene: 'The client is hesitant about a full rollout. You want to suggest a smaller first step.',
      options: [
        { t: '"Would it be ridiculous to consider a short pilot instead of a full rollout?"', fb: '"No, not ridiculous" is easy to say, and it moves you toward the pilot.', correct: true },
        { t: '"You\'d agree that a pilot makes sense, right?"', fb: 'A leading question pushes for yes. People notice, and resist.' },
        { t: '"Don\'t you want to reduce your risk?"', fb: 'Technically a "no" question, but it is manipulative: nobody can say no without looking foolish.' },
      ],
    },
    {
      who: 'Checking for concerns', scene: 'You have just walked a client through a complex proposal.',
      options: [
        { t: '"Are we on the same page?"', fb: 'Invites a quick, polite yes, and the real concerns stay hidden.' },
        { t: '"Does that all make sense?"', fb: 'Same problem: it is easier to nod than to admit confusion.' },
        { t: '"Is there anything here that concerns you or doesn\'t make sense?"', fb: 'Makes disagreement the expected answer, so it is safe to share.', correct: true },
      ],
    },
    {
      who: 'Asking for a meeting', scene: 'You need a decision-maker to meet you tomorrow to finalise the details.',
      options: [
        { t: '"Can we meet tomorrow?"', fb: 'A direct yes-request. It is easy to deflect with "let me check my calendar."' },
        { t: '"Would it be a bad idea to meet tomorrow?"', fb: 'A safe "no" moves you toward the meeting and lowers pressure.', correct: true },
        { t: '"I\'ve booked us for 10 a.m. tomorrow."', fb: 'Assertive, but it takes away their control and may trigger resistance.' },
      ],
    },
    {
      who: 'The renewal', scene: 'A long-standing client\'s contract ends next month. You want to find out where they stand.',
      options: [
        { t: '"Is renewing your contract a bad idea at this point?"', fb: 'Either a comfortable "no, it isn\'t" or an honest concern you can now address.', correct: true },
        { t: '"You\'ll be renewing, won\'t you?"', fb: 'Presumes the answer and invites a counterfeit yes.' },
        { t: '"Do you want to renew your contract?"', fb: 'A plain yes-question. You may get a polite yes that hides a competitor\'s offer.' },
      ],
    },
  ],
}

export const handleNo = {
  id: 'a-roleplay-renewal',
  kind: 'branching',
  title: 'Role-play: the "no" on the renewal',
  intro: 'You manage a software account. Priya, head of operations at a mid-sized logistics firm, has just told you they will not renew next quarter. Your goal: treat the "no" as the start of the conversation, find out what is really behind it, and see whether there is a way forward. Watch the two meters.',
  img: 'img/m3/handling.webp',
  counterpart: { name: 'Priya', initials: 'PR', role: 'Head of operations' },
  meterLabels: ['Understanding of the real issue', 'Trust'],
  start: { outcome: 15, relationship: 45 },
  nodes: {
    start: {
      say: 'I\'ll be straight with you. We\'re not renewing next quarter. We\'ve decided to go in a different direction.',
      choices: [
        { t: '"That\'s a shame. Can I offer you a 15% discount to stay?"', tag: 'Risky', d: [-5, -5], next: 'discount', fb: 'You improved the offer before knowing the reason. You may be solving the wrong problem, and paying for it.' },
        { t: '"Really? You\'ve been with us four years. I think that would be a mistake."', tag: 'Defensive', d: [-5, -20], next: 'defended', fb: 'Arguing with a no makes people defend it. Now she has to justify her decision instead of explaining it.' },
        { t: '"I appreciate you telling me directly. What are your main concerns?" (Then stay silent.)', tag: 'Strategic', d: [20, 15], next: 'concern', fb: 'An open-ended question followed by silence. You treat the no as information, not as rejection.' },
        { t: '"Okay, understood. Thanks for letting me know."', tag: 'Avoidant', d: [-10, 0], next: 'endWithdraw', fb: 'Withdrawing avoids discomfort, but a no is often the start of the real conversation.' },
      ],
    },
    discount: {
      say: 'It\'s not really about price.',
      choices: [
        { t: '(Pause.) "It\'s not about price… What is it about?"', tag: 'Strategic', d: [15, 10], next: 'concern', fb: 'You recovered: a mirror, a pause and an open question.' },
        { t: '"20%, then? That\'s the best I can do."', tag: 'Risky', d: [-10, -10], next: 'endDiscount', fb: 'You are now negotiating against yourself on something she just told you does not matter.' },
      ],
    },
    defended: {
      say: 'Well, it\'s been decided. I\'m not sure there\'s much to discuss.',
      choices: [
        { t: '"I understand why you might feel that way. Would it be unreasonable to ask what led to the decision?"', tag: 'Empathetic', d: [15, 20], next: 'concern', fb: 'Validation, then a question that makes "no, not unreasonable" the easy answer.' },
        { t: '"Can I at least send you our new roadmap?"', tag: 'Avoidant', d: [0, -5], next: 'endWithdraw', fb: 'A brochure will not change a decision whose reason you don\'t yet know.' },
      ],
    },
    concern: {
      say: 'Honestly? The last two system updates broke our warehouse integration. My team spent a week on workarounds. I can\'t keep defending the platform internally.',
      choices: [
        { t: '"It sounds like you\'ve been carrying the cost of our updates, and it\'s put you in a tough spot with your team."', tag: 'Empathetic', d: [15, 20], next: 'deeper', fb: 'Validation followed by strategic empathy: you label what she is dealing with, before you try to fix anything.' },
        { t: '"Those updates were necessary for security. Every customer had to take them."', tag: 'Defensive', d: [-5, -20], next: 'endCold', fb: 'True, perhaps, but it explains your side while she is telling you about hers.' },
        { t: '"We can fix the integration. I\'ll get our engineers on it today."', tag: 'Risky', d: [10, 0], next: 'deeper', fb: 'Helpful in spirit, but you jumped to a fix before understanding everything. Some of the concern may still be hidden.' },
      ],
    },
    deeper: {
      say: 'Exactly. And when I raised it, it took nine days to get a real answer from support.',
      choices: [
        { t: '"Nine days?" (Soft eye contact. Pause.)', tag: 'Strategic', d: [15, 10], next: 'reveal', fb: 'A mirror plus a pause. You invite her to go deeper without pushing.' },
        { t: '"That shouldn\'t have happened. I\'ll raise it with the support manager."', tag: 'Assertive', d: [5, 5], next: 'reveal', fb: 'Taking ownership is good, but you closed the topic before she had finished.' },
      ],
    },
    reveal: {
      say: 'Nine days. And the vendor we\'re looking at has promised a dedicated contact. That\'s really what my CEO wants: someone who picks up the phone.',
      choices: [
        { t: '"It sounds like we\'re getting closer to what\'s really important to you: reliable updates and a person who responds fast. What other concerns do you have that we can work through?"', tag: 'Strategic', d: [20, 15], next: 'proposal', fb: 'You reframe the no positively, summarise her real needs, and keep the door open for any remaining concerns.' },
        { t: '"We can give you a dedicated contact too. So you\'ll renew?"', tag: 'Risky', d: [5, -10], next: 'endPushed', fb: 'Matching the offer and pushing for yes in one breath invites a counterfeit yes.' },
      ],
    },
    proposal: {
      say: 'That\'s most of it. If those two things changed, I\'d have a reason to stay.',
      choices: [
        { t: '"Would it be a bad idea to try a 90-day plan: a named engineer for your integration, updates tested on your setup first, and a direct line to me? If it doesn\'t work, you walk away."', tag: 'Strategic', d: [20, 10], next: 'test', fb: 'A no-oriented question around a concrete proposal that addresses her real needs.' },
        { t: '"Great, I\'ll put that in an email and we\'ll get the renewal signed."', tag: 'Risky', d: [0, -10], next: 'endPushed', fb: 'You skipped from concerns to signature. Her "if" was not yet a commitment.' },
      ],
    },
    test: {
      say: 'No, it\'s not a bad idea. I\'d need to run it past my CEO, though.',
      choices: [
        { t: '"Of course. Would it be unreasonable to put 30 minutes in the diary with both of you this week, so I can answer his questions directly?"', tag: 'Assertive', d: [15, 10], next: 'endStrong', fb: 'You test the agreement with a small, immediate action, and turn "I\'d need to run it past my CEO" into a concrete next step.' },
        { t: '"Sure, just let me know what he says."', tag: 'Avoidant', d: [-10, 0], next: 'endCold', fb: 'You handed control of the next step to someone you have never met. Ask for a specific, immediate action.' },
      ],
    },
    endStrong: { end: true, verdict: 'From "no" to a real next step', say: 'No, that\'s fine. Thursday at 2 works. I\'ll send the invite.', summary: 'You treated the no as the start of the conversation: open questions, silence, validation with strategic empathy, a mirror and a positive reframe. The real issues (broken updates and slow support) surfaced, your proposal addressed them, and you tested the agreement with a concrete action.' },
    endDiscount: { end: true, verdict: 'You paid for the wrong problem', say: 'I\'ll take it back to the team. No promises.', summary: 'Price was never the issue. Improving the offer before asking why she said no cost you margin and taught you nothing. Ask open-ended questions first.' },
    endWithdraw: { end: true, verdict: 'The door closed quietly', say: 'Thanks for understanding. Good luck with everything.', summary: 'A no feels final, but it is often the start of the real conversation. Ask what is behind it before you accept it.' },
    endCold: { end: true, verdict: 'Heard, but not convinced', say: 'Right. Well, I\'ll let you know if anything changes.', summary: 'Priya shared her concern, but the conversation stalled before it turned into a commitment. Validate before you explain, and test any agreement with a specific next step.' },
    endPushed: { end: true, verdict: 'A yes you can\'t rely on', say: 'Yeah, sure, maybe. Send it over.', summary: 'That sounds like a counterfeit yes: quick, vague and with no next step. You pushed for agreement before her concerns were fully heard. Invite a no and test the yes instead.' },
  },
}

export const choosePause = {
  id: 'a-choose-pause',
  kind: 'scenarios',
  title: 'Choose the pause',
  prompt: 'Six new moments, one for each strategic pause. Each time, choose what to do with the silence.',
  items: [
    {
      who: 'Price pressure', scene: 'A procurement director leans in: "Your competitor quoted 20% less. Can you match it?" You feel the urge to answer straight away.',
      options: [
        { t: '"Yes, I think we can get close to that."', fb: 'A reflex answer under pressure. You have conceded before you have even thought about it.' },
        { t: 'Take a slow breath: "That\'s a fair question. Give me a moment to think about what it would really mean."', fb: 'Pause before you speak: you show emotional control and buy time to answer with clarity.', correct: true },
        { t: '"Why are you comparing us with them?"', fb: 'A defensive reaction. The pressure is now running the conversation, not you.' },
      ],
    },
    {
      who: 'Your final position', scene: 'You have just said: "This is the lowest price we can offer while keeping the quality your team needs."',
      options: [
        { t: 'Walk them through every cost line to justify the number.', fb: 'Extra explanation sounds like doubt and buries your point.' },
        { t: '"…but we might be a little flexible if needed."', fb: 'You undo your own statement before they have even responded.' },
        { t: 'Stop talking. Hold steady eye contact and let the statement land.', fb: 'Pause after you speak: the silence tells them you mean it.', correct: true },
      ],
    },
    {
      who: 'A question that needs thought', scene: 'You ask a new team member: "What would make this project feel like a success for you?" They say "Hmm…" and look away, thinking.',
      options: [
        { t: 'Wait quietly and keep your attention on them.', fb: 'Pause after asking: they are thinking, and the answer that follows will be their own.', correct: true },
        { t: 'Help them out: "For example, hitting the deadline?"', fb: 'You hand them an answer, and you will probably hear your own idea back.' },
        { t: 'Say "No worries, think about it" and move to the next topic.', fb: 'You close the question just as a real answer was forming.' },
      ],
    },
    {
      who: 'A passing remark', scene: 'Early in a sales meeting, a client says in passing: "Our last supplier was… complicated."',
      options: [
        { t: '"Well, you\'ll find we\'re very different."', fb: 'You jump to selling and miss what the remark could tell you.' },
        { t: '"Complicated?" Then pause, with an interested look.', fb: 'Pause to encourage elaboration, paired with a verbal mirror. The story behind "complicated" is likely to be their real buying criteria.', correct: true },
        { t: '"Sorry to hear that. Anyway, let me show you our features."', fb: 'Polite, but you steer away from the most useful thing they have said so far.' },
      ],
    },
    {
      who: 'A difficult explanation', scene: 'A team member explains, at length and more and more quietly, why they missed an important deadline. They finish and look at you.',
      options: [
        { t: 'Go straight to the recovery plan: "Okay, so here\'s what we\'ll do."', fb: 'Practical, but moving on instantly tells them their explanation did not really land.' },
        { t: 'Nod. "I appreciate you walking me through that." Then let a moment pass before you continue.', fb: 'Pause while listening: they feel heard, not hurried, and often add the part they were hesitant to say.', correct: true },
        { t: 'Reassure them with a story about a deadline you once missed.', fb: 'Kind, but it shifts the focus to you just as they finished opening up.' },
      ],
    },
    {
      who: 'Two voices rising', scene: 'In a budget meeting, two department heads start talking over each other, and the exchange is getting personal.',
      options: [
        { t: 'Raise your voice to get the agenda back on track.', fb: 'A louder voice adds to the noise and the tension.' },
        { t: 'Quickly side with whoever seems more reasonable.', fb: 'You end the argument by creating a loser, and the tension moves elsewhere.' },
        { t: 'Lower your voice: "Let\'s pause here for a moment." Then stay silent for a few seconds before continuing.', fb: 'Pause to shift tone or energy: the silence breaks the reactive loop and resets the rhythm of the room.', correct: true },
      ],
    },
  ],
}
