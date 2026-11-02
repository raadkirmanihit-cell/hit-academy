// Extra practice for Module 1: "your turn" scripts, quick checks, say-it-out-loud practice,
// the interactive planner and the confidence check. Illustrative scenarios written for the course.

const J = 'Jordan', M = 'Mia', Y = 'You'

export const yourTurnWorkload = {
  id: 'yt-workload',
  title: 'Now you: the extra proposal',
  setup: 'Your manager, Jordan, wants you to take on a new client proposal. Your week is already full with the Henley launch, due the same day. At each pause, choose what you would say, or write your own line.',
  cast: { Jordan: { initials: 'JO', role: 'Manager' } },
  you: Y,
  script: [
    [J, 'Have you got a minute? The Morgan account needs a proposal by Friday, and I\'d like you to own it.'],
    { pause: {
      prompt: 'Jordan has asked you to own the proposal. Your week is already full. What do you say?',
      options: [
        { t: 'Sure, no problem. I\'ll find the time somehow.', fb: 'Passive. You avoid an awkward moment, but you take on work you can\'t deliver well, and Jordan never learns about the clash.' },
        { t: 'Seriously? I\'m already drowning. You can\'t keep dumping things on me.', fb: 'Aggressive. Your point is valid, but the tone makes the conversation about your attitude, not the workload.' },
        { t: 'I\'d be glad to own it. To do it well by Friday, we need to talk about the Henley launch, which is due the same day. Can we look at priorities together?', best: true, fb: 'Assertive. You show willingness, state the real constraint as a fact, and invite Jordan to solve it with you.' },
        { t: 'Of course. I\'ll just work the weekend again, like last time. It\'s fine.', fb: 'Manipulative (passive-aggressive). You say yes but use guilt to make the point. Jordan feels blamed and still doesn\'t know what you need.' },
      ],
      expert: 'I\'d be glad to own it. To do it well by Friday, we need to talk about the Henley launch, which is due the same day. Can we look at priorities together?',
      why: 'It opens positively, states the clash as a fact, and turns it into a shared problem. Your needs and Jordan\'s needs both count: that is assertive behaviour.',
    } },
    [J, 'Henley matters too, but honestly, everyone is stretched. I really need a yes on this.'],
    { pause: {
      prompt: 'Jordan pushes back. You want to keep a good relationship and protect the quality of both projects. What do you say next?',
      options: [
        { t: 'Okay, forget I said anything. I\'ll do both.', fb: 'You drop your position at the first push. That is passive, and it teaches Jordan that your concerns disappear under pressure.' },
        { t: 'Here\'s what I can do: I\'ll own the Morgan proposal if Sam takes the Henley status report, or if Henley moves to Monday. Which works better for you?', best: true, fb: 'Firm on the substance, flexible on the solution. Assertive behaviour combined with a collaborative strategy.' },
        { t: 'If everyone is stretched, maybe you should hire more people instead of asking me.', fb: 'A fair point delivered as an attack. Jordan will defend instead of solving the problem with you.' },
      ],
      expert: 'Here\'s what I can do: I\'ll own the Morgan proposal if Sam takes the Henley status report, or if Henley moves to Monday. Which works better for you?',
      why: 'Jordan gets the yes they need, with a clear condition attached and a choice between two options. You hold your boundary without a fight.',
    } },
    [J, 'Let\'s move Henley to Monday. I\'ll let the client know. Thanks for being straight with me.'],
  ],
  note: 'Assertive behaviour protected both the work and the relationship: Jordan got a yes, and you got a realistic plan.',
}

export const yourTurnSupplier = {
  id: 'yt-supplier',
  title: 'Now you: the late delivery',
  setup: 'Mia, account manager at a long-term supplier, calls with bad news. The delivery date matters to your production plan, and you want to keep working with this supplier for years. Choose your behaviour and your strategy at each pause.',
  cast: { Mia: { initials: 'MI', role: 'Account manager, supplier' } },
  you: Y,
  script: [
    [M, 'I\'m sorry to tell you this, but the components for your order will be three weeks late. Our factory had a breakdown.'],
    { pause: {
      prompt: 'Both the outcome (your production plan) and the relationship matter here. What do you say?',
      options: [
        { t: 'That\'s unacceptable. Deliver on time or we cancel the contract.', fb: 'Competing, delivered aggressively. It may force a short-term fix, but it puts a long partnership at risk and gives Mia no reason to go the extra mile.' },
        { t: 'Oh dear. Well, these things happen. Just send it when you can.', fb: 'Accommodating, delivered passively. The relationship is safe for now, but your production plan pays the price.' },
        { t: 'Thanks for telling me early. Three weeks would stop our production line, so we need to solve this together. Which parts of the order could you ship sooner?', best: true, fb: 'Assertive and collaborating: you value the early warning, state the impact clearly, and open a joint search for options.' },
        { t: 'Let\'s talk about it next month, when things are clearer.', fb: 'Avoiding. The delay is happening now; postponing the conversation only shrinks your options.' },
      ],
      expert: 'Thanks for telling me early. Three weeks would stop our production line, so we need to solve this together. Which parts of the order could you ship sooner?',
      why: 'The outcome and the relationship both matter and there is time to problem-solve, which points to collaborating. Assertive behaviour makes the collaboration work: clear about the impact, respectful of Mia.',
    } },
    [M, 'We could ship about half the components next week. The rest would still be three weeks out, and splitting the shipment costs us extra freight.'],
    { pause: {
      prompt: 'Mia offers a partial shipment but mentions the extra freight cost. What do you say?',
      options: [
        { t: 'The freight is your problem, not ours. You caused the delay.', fb: 'Perhaps true, but it turns a joint solution into a blame contest. Mia now has less reason to speed up the rest.' },
        { t: 'Fine, we\'ll pay all the extra costs. Whatever helps.', fb: 'Generous, but you give away value without asking for anything in return. That slides into accommodating.' },
        { t: 'Half next week works. We\'ll cover the extra freight on the first shipment if you can bring the rest forward by a week. Could you check that with the factory today?', best: true, fb: 'You trade something you can give (the freight cost) for something you need (time). Both sides gain: that is collaborating.' },
      ],
      expert: 'Half next week works. We\'ll cover the extra freight on the first shipment if you can bring the rest forward by a week. Could you check that with the factory today?',
      why: 'Collaborating makes the pie bigger before dividing it: each side gives something that costs it little and helps the other a lot.',
    } },
    [M, 'That\'s fair. I\'ll call the factory this afternoon. I think we can do two weeks for the rest.'],
  ],
  note: 'Collaborating strategy, assertive behaviour: the problem got smaller, and the partnership got stronger.',
}

// Quick checks: one question straight after each concept.
const qc = (id, q, options) => ({ t: 'quickCheck', id, q, options })
export const checks = {
  define: qc('qc-define', 'Which statement matches the module\'s definition of negotiation?', [
    { t: 'Getting as much as you can from the other side.', fb: 'The definition says nothing about "getting the most". It is about reaching a mutually acceptable agreement.' },
    { t: 'A process of communication where parties with different interests work toward a mutually acceptable agreement.', correct: true, fb: 'Right: communication, different interests, and an agreement both sides can accept.' },
    { t: 'Persuading the other side to accept your position.', fb: 'Persuasion can be part of it, but negotiation is a two-way process toward an agreement that works for both sides.' },
  ]),
  overview: qc('qc-behaviours', 'In a meeting, a colleague smiles and says "Sure, great idea", then quietly misses every deadline linked to it. Which behaviour is this?', [
    { t: 'Assertive', fb: 'Assertive behaviour states needs openly. Here the real message is hidden.' },
    { t: 'Passive', fb: 'Close, but passive people usually go along with things. This colleague seems to agree, then disrupts.' },
    { t: 'Manipulative (passive-aggressive)', correct: true, fb: 'Right: cooperative on the surface, disruptive underneath. That causes frustration and confusion.' },
    { t: 'Aggressive', fb: 'Aggressive behaviour is openly hostile. This is indirect.' },
  ]),
  aggressive: qc('qc-aggressive', 'Even when aggressive behaviour wins a point, what does it usually cost you?', [
    { t: 'Nothing, if you win.', fb: 'The cost often shows up later: less trust, less information, and a counterpart looking for payback.' },
    { t: 'Goodwill and future cooperation, and the risk that the talks break down.', correct: true, fb: 'Right. Aggression trades the relationship for the short-term result.' },
    { t: 'Only a bit of extra time.', fb: 'Time is the smallest cost. The relationship is the bigger one.' },
  ]),
  passive: qc('qc-passive', 'Which reply in a planning meeting is passive?', [
    { t: '"I guess that\'s fine… whatever works for everyone."', correct: true, fb: 'Right. Your own needs disappear from the conversation, even if you have them.' },
    { t: '"That deadline doesn\'t work for me. Could we look at Thursday instead?"', fb: 'That is assertive: clear, respectful and open.' },
    { t: '"Fine. We do it my way or not at all."', fb: 'That is aggressive.' },
  ]),
  manipulative: qc('qc-manipulative', 'Why does manipulative behaviour usually backfire over time?', [
    { t: 'It is too direct.', fb: 'The opposite: it is indirect.' },
    { t: 'It erodes trust, because the other side senses they aren\'t hearing the real message.', correct: true, fb: 'Right. It can create a temporary advantage, but it damages relationships through perceived dishonesty.' },
    { t: 'It ends negotiations too quickly.', fb: 'It usually prolongs them, by disrupting communication.' },
  ]),
  assertive: qc('qc-assertive', 'When might assertiveness be mistaken for weakness?', [
    { t: 'When the other party is highly aggressive or non-cooperative.', correct: true, fb: 'Right. That is why Lesson 3 shows how to adjust the tone of your assertiveness to the counterpart.' },
    { t: 'When the other side is also assertive.', fb: 'Two assertive negotiators usually understand each other well.' },
    { t: 'When you give reasons for your request.', fb: 'Reasons make an assertive request stronger, not weaker.' },
  ]),
  situation: qc('qc-situation', 'You will work with a peer for years. You need clear expectations about who owns which tasks, without a fight. Which behaviour fits best?', [
    { t: 'Passive', fb: 'You would keep the peace now, but the unclear ownership will cause friction later.' },
    { t: 'Assertive', correct: true, fb: 'Right: assertive behaviour sets clear expectations without causing conflict, and builds long-term trust.' },
    { t: 'Aggressive', fb: 'You might win this round, but it damages a relationship you depend on.' },
  ]),
  anchor: qc('qc-anchor', 'When you adapt to a difficult counterpart, what should change?', [
    { t: 'Your values and your position.', fb: 'Those stay. Adapting is not giving in.' },
    { t: 'Your tone and intensity, while your assertive anchor stays.', correct: true, fb: 'Right: adjust tone, not values.' },
    { t: 'Nothing. Always use exactly the same words.', fb: 'Even assertiveness needs adjusting in tone and intensity to the person in front of you.' },
  ]),
  grid: qc('qc-grid', 'On the strategy grid, what does the assertiveness axis measure?', [
    { t: 'How loudly and firmly you speak.', fb: 'Careful: on the grid, assertiveness is about what you are pursuing, not your tone of voice.' },
    { t: 'Your concern for the outcome.', correct: true, fb: 'Right. The cooperation axis is your concern for the relationship.' },
    { t: 'Your concern for the relationship.', fb: 'That is the cooperation axis.' },
  ]),
  competing: qc('qc-competing', 'You decide a competing strategy fits. How should you deliver it?', [
    { t: 'Aggressively, to show you mean it.', fb: 'Aggression adds damage without adding results.' },
    { t: 'Assertively: firm and clear on what you need, respectful to the person.', correct: true, fb: 'Right. The strategy is competing; the behaviour stays assertive.' },
    { t: 'Passively, so they don\'t notice.', fb: 'A competing strategy delivered passively usually just fails.' },
  ]),
  collaborating: qc('qc-collaborating', 'What does collaborating need in order to work?', [
    { t: 'One side with much more power than the other.', fb: 'Collaboration works best when both sides have important stakes and engage.' },
    { t: 'Time, trust and both parties engaged in solving the problem.', correct: true, fb: 'Right. If one side isn\'t fully engaged, it may not work as intended.' },
    { t: 'A very tight deadline.', fb: 'Collaborating takes time. Under tight deadlines, compromising is often the better fit.' },
  ]),
  compromising: qc('qc-compromising', 'What is the main risk of compromising too often?', [
    { t: 'Neither side is fully satisfied, and important issues are never properly addressed.', correct: true, fb: 'Right: overuse creates a "culture of compromise".' },
    { t: 'It always takes too long.', fb: 'Compromising is usually quick. That is its strength.' },
    { t: 'It always damages the relationship.', fb: 'A fair middle ground usually preserves the relationship.' },
  ]),
  avoiding: qc('qc-avoiding', 'When is avoiding a sensible choice?', [
    { t: 'When a key client is about to leave.', fb: 'High stakes and an important relationship: avoiding would let the problem grow.' },
    { t: 'When emotions are running high and a cooling-off period is needed.', correct: true, fb: 'Right. Avoid on purpose, and set a time to come back to it.' },
    { t: 'When the issue is critical and urgent.', fb: 'Avoiding critical issues lets them fester into bigger problems.' },
  ]),
  accommodating: qc('qc-accommodating', 'You decide to accommodate a stakeholder on a small point. How do you make it count?', [
    { t: 'Say nothing, so it doesn\'t look like a favour.', fb: 'An unnoticed concession builds little goodwill.' },
    { t: 'Yield on purpose and name it lightly: "Happy to help on this one."', correct: true, fb: 'Right. Deliberate accommodation builds goodwill you can draw on later.' },
    { t: 'Ask for something in return straight away, firmly.', fb: 'That turns accommodating into a trade, and the goodwill disappears.' },
  ]),
  factors: qc('qc-factors', 'Which three factors does the module use to choose a strategy?', [
    { t: 'Price, deadline and how you feel that day.', fb: 'Time is part of context, but the module names three broader factors.' },
    { t: 'Desired outcome, the counterpart\'s position, and context.', correct: true, fb: 'Right. Re-check them as the negotiation develops.' },
    { t: 'Your personality, their personality and the venue.', fb: 'Personality shapes behaviour, but strategy follows outcome, counterpart and context.' },
  ]),
  bridge: qc('qc-bridge', 'You choose a collaborating strategy. Which behaviour gives it the best chance of working?', [
    { t: 'Passive: let them lead so they feel comfortable.', fb: 'Collaborating needs both sides to state their interests. Passive behaviour hides yours.' },
    { t: 'Assertive: open about your interests, respectful of theirs.', correct: true, fb: 'Right: firm on interests, warm on people.' },
    { t: 'Manipulative: guide them to your preferred answer.', fb: 'Collaboration depends on trust. Manipulation destroys it.' },
  ]),
  pareto: qc('qc-pareto', 'How should you treat your Could and Won\'t items when you prepare?', [
    { t: 'Prepare them in as much detail as your Musts.', fb: 'That spends most of your effort on issues that add little value.' },
    { t: 'Give them light effort, and keep them ready as things you can trade.', correct: true, fb: 'Right. They are rarely worth deep preparation, but they are useful currency.' },
    { t: 'Drop them from your plan entirely.', fb: 'They still matter as trades, so keep them on the list.' },
  ]),
}

export const sayAnchor = {
  t: 'sayItAloud',
  id: 'say-anchor',
  title: 'Say it out loud: hold your anchor with a valued client',
  situation: 'A long-standing client asks you to add a reporting dashboard to the project at no extra cost. It is about four days of extra work. You value this client and want to keep the relationship strong.',
  task: 'Say your reply out loud, as you would in the meeting. Two or three sentences.',
  criteria: [
    'Acknowledge the client\'s request positively.',
    'State your position clearly: the extra work has a cost.',
    'Give a short reason.',
    'Offer an option or invite the client in, without apologising or hedging.',
  ],
  modelLine: 'I\'m glad the dashboard would help your team. It\'s about four days of extra work, so it would be an additional €2,400. If the budget is tight this quarter, we could schedule it for phase two. Which would work better for you?',
  modelAudio: 'audio/m1/model-anchor.mp4',
}

export const confidence = {
  id: 'conf-m1',
  items: [
    { id: 'c1', text: 'Telling negotiation behaviour and strategy apart' },
    { id: 'c2', text: 'Recognising aggressive, passive, manipulative and assertive behaviour' },
    { id: 'c3', text: 'Staying assertive with a difficult counterpart' },
    { id: 'c4', text: 'Choosing the right strategy for a negotiation' },
    { id: 'c5', text: 'Prioritising the issues that matter most' },
  ],
}

const scale = (id, label, tag) => ({ id, type: 'scale', label, tag })
const ta = (id, label, placeholder, rows) => ({ id, type: 'textarea', label, placeholder, rows })
const STRATS = ['Competing', 'Collaborating', 'Compromising', 'Avoiding', 'Accommodating']

export const planner = {
  id: 'planner-m1',
  title: 'Your negotiation planner',
  intro: 'The module worksheet as an interactive planner. Fill it in for a real negotiation you are preparing for: it takes 15–20 minutes. Answer the parts that help and skip the rest. Everything saves to your account as you type.',
  sections: [
    { id: 'p0', title: 'The negotiation', fields: [
      { id: 'what', type: 'text', label: 'The negotiation I\'m preparing for', placeholder: 'e.g. Contract renewal with our main logistics supplier' },
      { id: 'when', type: 'text', label: 'When it happens', placeholder: 'e.g. Thursday 14 November, 10:00' },
      { id: 'who', type: 'text', label: 'Who is across the table', placeholder: 'Name and role' },
    ] },
    { id: 'p1', title: 'Behaviour self-check', hint: 'How often do these describe you when the stakes are high? 1 = rarely, 5 = very often. This is a reflection aid, not a scored test.', fields: [
      scale('s1', 'I push hard and raise my voice to get my way.', 'aggressive'),
      scale('s2', 'I make demands or ultimatums early in the conversation.', 'aggressive'),
      scale('s3', 'I accept the first offer to avoid an awkward conversation.', 'passive'),
      scale('s4', 'I raise a need, then take it back ("never mind, it\'s fine").', 'passive'),
      scale('s5', 'I hint at what I want rather than saying it.', 'manipulative'),
      scale('s6', 'I use guilt or flattery to move the other person.', 'manipulative'),
      scale('s7', 'I state my needs clearly and give my reasons.', 'assertive'),
      scale('s8', 'I ask about the other side\'s needs before proposing a solution.', 'assertive'),
      { id: 'default', type: 'select', label: 'My default under pressure is…', options: ['Aggressive', 'Passive', 'Manipulative', 'Assertive'] },
      ta('cost', 'The cost of that default is…', 'What has it cost you in past negotiations?', 2),
    ] },
    { id: 'p2', title: 'Counterpart map and opening lines', hint: 'Which behaviour do you expect from the other side? Plan your flavour of assertiveness and write your actual words. Adjust tone, not values.', fields: [
      { id: 'expect', type: 'select', label: 'The behaviour I expect from them', options: ['Assertive', 'Aggressive', 'Passive', 'Manipulative', 'Highly emotional', 'Passive-aggressive'] },
      { id: 'flavour', type: 'select', label: 'The flavour of assertiveness I\'ll use', options: ['Assertive', 'Calm assertiveness', 'Supportive assertiveness', 'Transparent assertiveness', 'Grounded, empathetic assertiveness', 'Clear, firm assertiveness'] },
      ta('open', 'My opening line, word for word', 'What will you say first?'),
      ta('push', 'If they push back, I\'ll say…'),
      ta('must', 'The one sentence I most need to say clearly', '', 2),
    ] },
    { id: 'p3', title: 'Strategy planner', hint: 'Weigh the three factors from Lesson 5, then commit to a starting strategy and a backup.', fields: [
      ta('want', 'Desired outcome: what do I want?', '', 2),
      scale('o', 'How important is the outcome?'),
      scale('r', 'How important is the future relationship?'),
      ta('them', 'Counterpart\'s position: their needs, interests and possible leverage'),
      scale('tp', 'How much time pressure is there?'),
      { id: 'hint', type: 'strategyHint', from: ['o', 'r', 'tp'] },
      { id: 'start', type: 'select', label: 'My starting strategy', options: STRATS },
      { id: 'backup', type: 'select', label: 'My backup strategy, if the situation changes', options: STRATS },
      ta('plan', 'My plan in one line: "I will use a ____ strategy, delivered with ____ behaviour, because ____."', '', 2),
    ] },
    { id: 'p4', title: 'MoSCoW issue list', hint: 'List the issues, one per line, in the zone where they belong. Your Musts and Shoulds create most of the value; Could and Won\'t items can become trades.', fields: [
      ta('mu', 'Must: the deal-breakers', 'One issue per line'),
      ta('sh', 'Should: important, but not deal-breakers', 'One issue per line'),
      ta('co', 'Could: nice to have', 'One issue per line'),
      ta('wo', 'Won\'t: not worth the effort this time', 'One issue per line'),
      ta('trade', 'Which Could or Won\'t items could I offer as trades?', '', 2),
    ] },
    { id: 'p5', title: 'After-action review', hint: 'Come back after the negotiation and score it on the three tests from Lesson 1.', fields: [
      ta('agreed', 'What was agreed?', '', 2),
      scale('t1', 'A wise agreement: does it meet the key interests of both sides, and will it last?'),
      scale('t2', 'Efficiency: did we get there without wasting time, money or energy?'),
      scale('t3', 'The relationship: is it better, or at least preserved?'),
      ta('keep', 'What I\'ll repeat next time', '', 2),
      ta('change', 'What I\'ll change next time', '', 2),
    ] },
  ],
}
