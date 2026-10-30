// Example scripts for Module 7, from Raad's chapter. One scene per tactic (two for some).
// A line with an empty speaker ('') is a stage direction; a third element is a coaching note.
const you = { initials: 'YO', side: 'right' }

export const goodCopScene = {
  label: 'Example: salary negotiation (employer vs. candidate)',
  cast: { 'HR Manager (bad cop)': { initials: 'HR' }, 'Hiring Manager (good cop)': { initials: 'HM' }, Candidate: { initials: 'CA', side: 'right' } },
  lines: [
    ['HR Manager (bad cop)', 'Our budget is firm. $92k is the ceiling.'],
    ['Hiring Manager (good cop)', 'I know that\'s tight, but I really want you on the team. Let\'s see what\'s possible.'],
    ['Candidate', 'I was hoping for $100k.'],
    ['Hiring Manager (good cop)', 'I\'ll speak with HR and explore options.'],
    ['HR Manager (bad cop)', 'We might allow a small signing bonus if they commit today, but the base won\'t change.'],
    ['Hiring Manager (good cop)', 'That could be a path.'],
    ['Candidate', 'I appreciate the range of viewpoints you both bring to the process. To evaluate the offer properly, could we review the approved compensation band for this role? Working from the actual data rather than tone will help me understand the full picture.', 'Professional counter: acknowledge both viewpoints, then move to the data.'],
  ],
  note: 'The candidate never reacts to the "nice" or the "tough" voice. The conversation moves to the facts.',
}

export const ultimatumScene = {
  label: 'Example 1: an ultimatum in a salary negotiation',
  cast: { HR: { initials: 'HR' }, Candidate: { initials: 'CA', side: 'right' } },
  lines: [
    ['HR', 'The offer is $95,000. That\'s the final number. Take it or leave it.'],
    ['Candidate', 'I appreciate that you\'ve worked within your constraints. Just to be clear, is that truly your firm and final position, or is there flexibility based on experience or performance metrics?', 'Strategic empathy first, then an assertive test of the ultimatum.'],
    ['HR', 'No, that\'s it.'],
    ['Candidate', 'Thank you. What happens if I can\'t accept that number? Is there an alternative structure (bonus, equity or review cycle) that we could explore?', 'A calibrated question.'],
    ['HR', 'We might be able to adjust the review cycle.'],
    ['Candidate', 'Understood. I do have other opportunities in motion, so I\'m prepared to explore those options if the compensation needs to stay fixed. But if we can create a structure that reflects value more accurately, I\'m very open to continuing this discussion.', 'Reinforce your BATNA, and keep the door open.'],
  ],
  note: 'The "final" number turned out to have room around it: a different review cycle.',
}

export const redHerringScene = {
  label: 'Example: a department head deflects in a budget review',
  cast: { 'Department head': { initials: 'DH' }, You: you },
  lines: [
    ['Department head', 'I don\'t think we should go through the budget today.'],
    ['You', 'It\'s important we agree on next quarter\'s figures together.'],
    ['Department head', 'Well, before that: why is your team always booking the big meeting room? We never get it.'],
    ['You', 'I understand the room bookings have been frustrating. Can you help me understand how that connects to the budget conversation we were having?', 'You recognise the red herring, and ask how it relates.'],
    ['Department head', '…It doesn\'t, really.'],
    ['You', 'No problem. Let\'s park the room bookings and come back to them later so we can stay focused on the budget.', 'Table the side issue.'],
    ['', 'After finishing the budget talk…'],
    ['You', 'Just to keep everything clear: we agreed to review spending at the start of every month. And if the room bookings are a concern, let\'s sort them out tomorrow so they don\'t get mixed into other discussions.', 'Document what was agreed.'],
  ],
}

export const lowballScene = {
  label: 'Example: salary negotiation (employer vs. candidate)',
  cast: { Employer: { initials: 'EM' }, You: you },
  lines: [
    ['Employer', 'We can offer you $58,000 for the role.'],
    ['', 'You know the market rate is about $75,000.'],
    ['You', 'I appreciate the offer. I want to make sure we\'re both working from accurate data. According to current market benchmarks for this role, compensation typically ranges from $72,000 to $78,000.', 'Calm and controlled: re-anchor with market data.'],
    ['You', 'Can you walk me through how you arrived at the $58,000 figure?', 'A calibrated question reveals how they built their number.'],
    ['Employer', 'Well… budget constraints, mostly.'],
    ['You', 'Understood. Before we finalise anything, let\'s align on industry benchmarks so we\'re on the same page regarding fair market value.'],
  ],
}

export const bogeyScene = {
  label: 'The bogey in action: a high-pressure job negotiation',
  cast: { 'Hiring Manager': { initials: 'HM' }, You: you },
  lines: [
    ['', 'You\'re negotiating a job offer. Your real priority is remote work. Salary is already acceptable. You introduce a bogey: the job title.'],
    ['You', 'I need the title to be Senior Lead Strategist. That\'s extremely important to me.'],
    ['Hiring Manager', 'The title? We usually just use "Strategist". Why is that a dealbreaker?'],
    ['You', 'It directly affects my credibility in the industry. Without that title, this role doesn\'t make sense for me long-term.', 'Overemphasise the bogey.'],
    ['Hiring Manager', 'Titles are tightly controlled here. That could be difficult.'],
    ['You', 'Then I\'m not sure this offer works. I\'ve turned down roles before over this exact issue.', 'Hold firm and create tension.'],
    ['Hiring Manager', 'What if we adjusted compensation instead?'],
    ['You', 'No. The title matters more than money in this case.', 'Reject, and keep the pressure on the bogey.'],
    ['', 'Silence. You let it sit.'],
    ['Hiring Manager', 'Okay… hypothetically, if we could get close on the title, what else would need to work?'],
    ['You', 'If the role were fully remote, I could be flexible on the exact wording of the title.', 'Spring the trap.'],
    ['Hiring Manager', 'Remote work is a bigger lift than the title.'],
    ['You', 'Understood. Then the title remains non-negotiable.', 'Cold and controlled.'],
    ['Hiring Manager', '…Let me check with leadership.'],
    ['', 'Later.'],
    ['Hiring Manager', 'We can approve full remote. Title will stay "Strategist".'],
    ['You', 'That works for me.', 'Immediate release of the bogey.'],
  ],
  note: 'Watch for the warning signs from the other side: heavy emphasis on a secondary issue, then a sudden willingness to drop it.',
}

export const strawmanScene = {
  label: 'Example: rebalancing workload in a team',
  cast: { Colleague: { initials: 'CO' }, You: you },
  lines: [
    ['You', 'I think we should talk about how we divide the project tasks more evenly.'],
    ['Colleague', 'So you think I do nothing on this team? Really?', 'The straw man: an exaggerated version of what you said.'],
    ['You', 'That\'s not what I said. Let me restate it clearly: I\'m asking that we rebalance a few tasks, not that you do nothing.', 'Clarify immediately.'],
    ['You', 'Can you repeat my point back to me in your own words so we\'re discussing the same thing?', 'Invite correction.'],
    ['Colleague', 'You want to redistribute some tasks, not accuse me.'],
    ['You', 'Right. So let\'s base the discussion on what was actually proposed: adjusting a few responsibilities.', 'Refocus.'],
  ],
}

export const silenceScene = {
  label: 'Example: asking your manager for support',
  cast: { Manager: { initials: 'MA' }, You: you },
  lines: [
    ['You', 'To keep the timeline realistic, I\'ll need support from one more team member.'],
    ['', 'A long pause. Your manager watches to see if you retract the request.'],
    ['You', 'I\'ll give you a moment to consider that.', 'Maintain your position, calmly.'],
    ['', 'You stay confident and quiet, and let the silence sit.'],
    ['Manager', '…Alright. Let me see who we can allocate.'],
  ],
}

export const limitedAuthorityScene = {
  label: 'Example: authority surfaces at the end',
  cast: { Them: { initials: 'TH' }, You: you },
  lines: [
    ['Them', 'I like everything we discussed, but I actually need to run this by my VP. I don\'t have final authority.'],
    ['You', 'Thanks for letting me know. Since we negotiated all terms under the assumption that the decision-makers were represented, we now need your VP to join the next call so we can finalise.', 'Direct, calm, high control.'],
    ['You', 'To avoid delays or misalignment, if we don\'t have approval within 24 hours, the terms we agreed to will need to be reopened. I want to ensure that whatever we finalise is accurate for both sides.', 'The boundary: firm and unmistakable.'],
    ['Them', '…Understood. I\'ll get them in the next meeting.'],
  ],
}

export const deadlineScene = {
  label: 'Example: a vendor trying to force a fast close',
  cast: { Vendor: { initials: 'VE' }, You: you },
  lines: [
    ['Vendor', 'We need your decision today. If we don\'t sign by 5 p.m., the offer expires.'],
    ['You', 'I understand the urgency. What happens if we take another day to decide?', 'A calm question to test the deadline.'],
    ['Vendor', 'Well… we prefer to close today, but maybe tomorrow could work.', 'The deadline shifts after pushback: a warning sign.'],
    ['You', 'We want to make the right decision. Can we get 24 more hours to review the total terms?', 'Respectful pushback.'],
    ['You', 'Also, you mentioned last week that you needed to close that day too, so I want to clarify what the true timeline is.', 'Expose the inconsistency, gently.'],
    ['Vendor', '…Alright. Take the additional day. Let\'s talk tomorrow.'],
  ],
}

export const outburstScene = {
  label: 'Example: a team member overreacts to feedback',
  cast: { Employee: { initials: 'EM' }, You: you },
  lines: [
    ['You', 'We need to tighten the report. Some sections were unclear.'],
    ['Employee', 'What? I worked all weekend on this! Nothing I do is good enough!'],
    ['You', 'I hear you. You put a lot of effort into this.', 'Calm and steady.'],
    ['You', 'I can see this matters to you. Let\'s talk through the feedback step by step so we can get the report exactly where it needs to be.', 'Acknowledge without amplifying.'],
    ['Employee', 'I\'m just overwhelmed right now.'],
    ['You', 'Would a 10-minute break help you reset before we continue? I want this conversation to be as clear and helpful as possible.', 'Offer a reset.'],
    ['Employee', '…Yes, thanks.'],
  ],
}

export const nibblingScene = {
  label: 'Example: a post-agreement add-on request',
  cast: { Vendor: { initials: 'VE' }, You: you },
  lines: [
    ['', 'You and a vendor have agreed on price and delivery terms for a software contract.'],
    ['Vendor', 'Great, so we\'re aligned at $48,000 for the year with standard support.'],
    ['You', 'Yes, that works. I think we\'re ready to move forward.'],
    ['Vendor', 'Perfect. Just one more thing: could you also include free onboarding sessions for our whole team?', 'The nibble.'],
    ['You', 'I see. Since we\'ve already agreed on the core terms, let\'s be careful about adding scope after the fact.', 'Recognise the nibble and stay composed.'],
    ['You', 'Before we finalise, I want to make sure everything is clearly defined and frozen in writing.', 'Closure language.'],
    ['Vendor', 'It shouldn\'t be a big lift, just a few sessions.'],
    ['You', 'If onboarding is added, what can you offer on your side to balance that?', 'Tie the concession to reciprocation.'],
    ['Vendor', 'Well… we could commit to a two-year renewal instead of one.'],
    ['You', 'That works. Let\'s document the two-year commitment and the onboarding sessions, then lock the scope so we can move straight to contract.', 'Set terms.'],
    ['Vendor', 'Agreed. Let\'s finalise it.'],
  ],
}

export const playingDumbScene = {
  label: 'Example: post-agreement clarification',
  cast: { Them: { initials: 'TH' }, You: you },
  lines: [
    ['', 'You are finalising terms with a partner who appears to stall once the agreement is close.'],
    ['You', 'So to confirm, you will receive a 10% net margin on all units sold.'],
    ['Them', 'Net margin? I\'m not sure I really understand what that means.'],
    ['You', 'Okay, let\'s walk through it together.', 'No frustration: slow the pace.'],
    ['You', 'I have outlined this here in writing. Let me show you.', 'Use documentation.'],
    ['You', 'Using your last invoice as an example: revenue was $50,000, costs were $45,000. That leaves $5,000. That $5,000 is the net margin, which is 10%.', 'Reframe, step by step.'],
    ['Them', 'So is that before or after marketing costs?'],
    ['You', 'Good question. Which part feels unclear: the cost structure, or how the percentage is applied?', 'Ask a clarifying question.'],
    ['Them', 'The cost structure.'],
    ['You', 'Got it. Marketing costs are included here, as shown in section 3.2. If that works, we can move forward and finalise the agreement.', 'Clarify and regain momentum.'],
    ['Them', 'Okay. That makes sense now.'],
  ],
}

export const delayScene = {
  label: 'Example: a partner company avoiding a difficult decision',
  cast: { Partner: { initials: 'PA' }, You: you },
  lines: [
    ['', 'Your company and a partner firm need to decide whether to launch a joint product. The decision keeps getting postponed, and your team cannot plan.'],
    ['You', 'We\'ve discussed this for months. We need to decide whether we\'re going ahead with the joint launch.'],
    ['Partner', 'We just need more time to think. It\'s a big decision.'],
    ['You', 'I understand that it matters.', 'You feel the pressure but stay grounded.'],
    ['', 'Weeks pass with no follow-up.'],
    ['You', 'We need an answer by Friday. The uncertainty is starting to hold up our planning.', 'Set a clear timeline.'],
    ['Partner', 'We\'re still not ready. It\'s been a very busy quarter.'],
    ['You', 'Is there something specific you\'re unsure about, or is the decision itself the problem?', 'Escalate honestly, but calmly.'],
    ['Partner', 'I don\'t know. We just can\'t commit right now.'],
    ['You', 'If we can\'t settle this by Friday, we\'ll take that as a no and move the budget to other projects.', 'A drop-dead boundary.'],
    ['Partner', 'That feels unfair. You\'re pressuring us.'],
    ['You', 'I\'m not pressuring you to say yes. I\'m protecting my team from being stuck in uncertainty with no end date.', 'Hold firm, and stay transparent.'],
    ['Partner', '…Okay. Let\'s set a call for tomorrow.'],
  ],
}

export const cherryScene = {
  label: 'Example: selective acceptance of terms',
  cast: { Them: { initials: 'TH' }, You: you },
  lines: [
    ['You', 'The proposal includes discounted pricing, a two-year contract and a minimum volume commitment.'],
    ['Them', 'We\'ll take the discount, but we don\'t want the volume commitment or the long-term contract.'],
    ['You', 'I understand your preference.', 'Stay composed; don\'t renegotiate piece by piece.'],
    ['You', 'The pricing is directly tied to both the volume and the contract term. They\'re structured as one package.', 'Reinforce the interlinkages.'],
    ['Them', 'We only care about the lower price.'],
    ['You', 'That\'s fair. If you\'d prefer the discounted price without the volume commitment, we can look at option B, which has a higher per-unit rate and a shorter term.', 'Offer alternatives.'],
    ['Them', 'So the discount only applies if we take the full package?'],
    ['You', 'Yes. Once we separate the components, the pricing adjusts accordingly. Let me know which option works best so we can finalise.', 'Hold the boundary.'],
    ['Them', 'Alright. We\'ll review option B.'],
  ],
}

export const threatBusinessScene = {
  label: 'Example 2: a client threatens to cancel near a decision point',
  cast: { Client: { initials: 'CL' }, You: you },
  lines: [
    ['', 'You are negotiating terms with a long-term client. The conversation becomes tense as deadlines approach.'],
    ['Client', 'If you can\'t meet this rate, we\'ll cancel the contract and move on.'],
    ['You', 'I hear what you\'re saying.', 'Don\'t panic; stay steady.'],
    ['You', 'Is ending the relationship the outcome you\'re hoping for here?', 'Calmly question the threat.'],
    ['Client', 'We need an answer now or this is over.'],
    ['You', 'Let\'s focus on finding a solution that works for both of us rather than forcing a rushed decision.', 'Reframe toward solutions.'],
    ['Client', 'We don\'t have time to keep going back and forth.'],
    ['You', 'We do have other options, but our preference is to continue working with you if there\'s still a fit.', 'Reassert your BATNA.'],
    ['You', 'If we can\'t agree by Friday, the delivery schedule will shift and availability may change.', 'State natural consequences.'],
    ['Client', 'Alright. Let\'s review the terms one more time.'],
    ['You', 'Good. Let\'s look at what matters most on both sides and see where we can align.'],
  ],
}

export const threatResignationScene = {
  label: 'Example 3: a resignation threat used as leverage',
  cast: { 'Team member': { initials: 'TM' }, You: you },
  lines: [
    ['', 'You manage a valued team member who has been passed over for promotion. Emotions are high, and they use a resignation threat to force a change.'],
    ['Team member', 'If this doesn\'t change right now, I\'m done. I\'ll hand in my notice.'],
    ['You', 'Okay. Let\'s slow down for a second. I want to understand something clearly.', 'Pause; don\'t plead or defend.'],
    ['You', 'Are you telling me you want to leave, or is this the way to show me how strongly you feel?', 'Calmly question the threat.'],
    ['Team member', 'I\'m serious. I can\'t keep doing this.'],
    ['You', 'Then let\'s talk about what is actually not working, instead of using leaving as pressure.', 'Reframe, firmly.'],
    ['Team member', 'I need to know the promotion will happen.'],
    ['You', 'I\'m open to working on a path to promotion, but I won\'t make promises under pressure.', 'Reassert your agency.'],
    ['You', 'If threats are the only way forward, that damages trust between us, and I\'ll have to plan for the team without you.', 'A real consequence you are prepared for.'],
    ['Team member', '…I don\'t want to leave. I just feel overlooked.'],
    ['You', 'Then let\'s talk honestly about what a path to promotion would look like, without ultimatums.'],
  ],
}

export const higherAuthorityScene = {
  label: 'Example: enterprise software agreement near close',
  cast: { 'Commercial lead': { initials: 'CL' }, You: you },
  lines: [
    ['', 'You and a senior commercial lead have aligned on pricing, scope and delivery. Just before closing, a higher authority is introduced.'],
    ['You', 'Based on what we reviewed, are you comfortable moving forward on these terms today?'],
    ['Commercial lead', 'Yes, commercially this works for us. I just need to run it by our legal team.'],
    ['You', 'Understood. Just so we\'re aligned, does legal have final approval, or is anyone else involved in the decision?', 'Confirm final authority.'],
    ['Commercial lead', 'Legal is the final sign-off.'],
    ['You', 'What specific concern do you expect legal to have with the current language?', 'Translate authority into specifics.'],
    ['Commercial lead', 'They may push back on the limitation of liability.'],
    ['You', 'That makes sense. Would it be useful to address that concern together now, so the review goes smoothly?', 'Convert escalation into collaboration.'],
    ['Commercial lead', 'Yes, that could help.'],
    ['You', 'If needed, would it be better to loop them in briefly, or are you able to represent their position directly?', 'Clarify access or mandate.'],
    ['Commercial lead', 'I can represent their position.'],
    ['You', 'When should we expect confirmation, so we can manage commitments on our side?', 'Anchor the approval timeline.'],
    ['Commercial lead', 'Within 24 hours.'],
    ['You', 'Great. Since we aligned on these terms with the expectation of closing today, we can hold them for the next 24 hours. If approval extends beyond that, we\'d need to revisit pricing or structure.', 'Protect your leverage after alignment.'],
    ['Commercial lead', 'That\'s fair. I\'ll prioritise this with legal.'],
  ],
}

export const bracketingScene = {
  label: 'Example: anchoring vs. bracketing in the same conversation',
  cast: { Them: { initials: 'TH' }, You: you },
  lines: [
    ['', 'Part 1: anchoring. An enterprise services pricing negotiation.'],
    ['You', 'For this scope and delivery timeline, our price is $110,000.', 'You anchor first. Even if they disagree, $110,000 is now the reference point.'],
    ['Them', 'That feels high. We were thinking something lower.'],
    ['', 'Part 2: bracketing. Everything is now measured against your anchor, not against zero.'],
    ['Them', 'Realistically, we\'re looking at something between $90,000 and $100,000.'],
    ['You', 'Given the scope and the accelerated timeline, we\'d be comfortable at $98,000.', 'You don\'t pick the midpoint: you place your number near the top of their range.'],
    ['Them', 'The midpoint would be $95,000.', 'Classic midpoint logic.'],
    ['You', 'Let\'s not average numbers for convenience. The right number reflects delivery risk, resource allocation and market benchmarks.', 'Defend the bracket with rationale, not math.'],
  ],
}

export const flinchBusinessScene = {
  label: 'Example 1: professional services pricing',
  cast: { Client: { initials: 'CL' }, You: you },
  lines: [
    ['', 'You are presenting pricing for a consulting engagement after outlining scope and deliverables.'],
    ['You', 'For the full scope we discussed, the monthly service fee is $5,000.'],
    ['Client', 'Whoa. That\'s way higher than we expected.', 'A visible flinch.'],
    ['You', 'I see.', 'Stay calm; don\'t rush to justify. Pause, and let the reaction settle.'],
    ['Client', 'That feels really expensive.'],
    ['You', 'Let\'s walk through how we arrived at that number.', 'Confidence, not defensiveness.'],
    ['You', 'The fee reflects the dedicated team, response-time guarantees and the results we committed to. It\'s also in line with comparable engagements in your industry.'],
    ['Client', 'Okay. I didn\'t realise all of that was included.'],
    ['You', 'If budget is the concern, we can look at adjusting scope rather than the rate.', 'Offer structure instead of a concession.'],
    ['Client', 'That makes sense. Let\'s review the scope again.'],
  ],
}

export const flinchBudgetScene = {
  label: 'Example 2: an internal budget request',
  cast: { Manager: { initials: 'MA' }, You: you },
  lines: [
    ['', 'You are asking your manager to fund a two-day negotiation training for your team.'],
    ['You', 'For the training, I need €8,000 from the department budget.'],
    ['Manager', 'Eight thousand? That\'s way more than I thought it would be.'],
    ['You', '…Okay.', 'Stay calm; let the reaction sit.'],
    ['Manager', 'That feels like a lot.'],
    ['You', 'Let\'s walk through the costs so we\'re on the same page. The trainer is two days, materials and the venue are included, and it covers all twelve people. I\'m not adding anything extra.'],
    ['Manager', 'Oh. When you break it down like that, it makes sense.'],
    ['You', 'If that number doesn\'t work, we can train a smaller group first or spread it over two quarters.', 'Options without conceding.'],
    ['Manager', 'No. That\'s fair. Let\'s keep it as is.'],
  ],
}

export const lastMinuteBusinessScene = {
  label: 'Example 1: a new clause before signing',
  cast: { Them: { initials: 'TH' }, You: you },
  lines: [
    ['', 'You are about to finalise an agreement after weeks of negotiation.'],
    ['Them', 'Before we sign, we just need to add this clause.'],
    ['You', 'Okay. That changes our understanding slightly.', 'Slow the process immediately.'],
    ['Them', 'It\'s just standard language.'],
    ['You', 'Let\'s take a moment to review how this affects the overall agreement.', 'Reopen the discussion, calmly.'],
    ['Them', 'It shouldn\'t be an issue. We\'re ready to move forward.'],
    ['You', 'We can\'t accept new terms without proper review. If this clause is necessary, we\'ll need time to evaluate it or revisit other parts of the deal.', 'Assert the boundary, and protect your leverage.'],
    ['Them', 'Alright. Let\'s review it together.'],
    ['You', 'Good. We want to be sure we\'re aligned before signing.'],
  ],
}

export const lastMinuteOfferScene = {
  label: 'Example 2: a late condition in a job offer',
  cast: { 'Hiring manager': { initials: 'HM' }, You: you },
  lines: [
    ['', 'You and a new employer have agreed on salary, title and start date. The decision feels settled.'],
    ['Hiring manager', 'Before we send the contract, you\'ll need to agree to a two-year non-compete clause.'],
    ['You', 'That\'s new.', 'Pause, and slow things down.'],
    ['Hiring manager', 'It\'s standard. It shouldn\'t be a big deal.'],
    ['You', 'This changes what we agreed to. We need to talk through what it would really mean for me.', 'Reopen the conversation.'],
    ['Hiring manager', 'We\'ve already agreed on everything. Why are you backing out now?'],
    ['You', 'I\'m not backing out. I\'m saying I can\'t accept something this significant without reviewing it. If it\'s a requirement, we need to revisit the rest of the package or rethink the offer.', 'Hold the boundary; be willing to walk away.'],
    ['Hiring manager', '…Okay. Let\'s discuss it.'],
  ],
}

export const divideScene = {
  label: 'Example: a vendor targets one team member',
  cast: { Vendor: { initials: 'VE' }, You: you },
  lines: [
    ['', 'You and a colleague are negotiating terms with a vendor as a unified team.'],
    ['Vendor', 'You seem more flexible than your colleague. Maybe we can work this out directly.'],
    ['You', 'I appreciate that, but we\'re aligned as a team. We make decisions together.', 'Don\'t engage individually; reinforce unity.'],
    ['Vendor', 'I\'m just trying to move things forward.'],
    ['You', 'Let\'s take a few minutes to align internally and come back with a clear response.', 'A time-out to regroup.'],
    ['', 'A short pause.'],
    ['You', 'Going forward, I\'ll cover commercial terms and my colleague will handle scope and delivery.', 'Return with structure: clear speaking roles.'],
    ['Vendor', 'Alright. That works.'],
    ['You', 'This way we can keep the conversation efficient and consistent.'],
  ],
}

export const overwhelmBusinessScene = {
  label: 'Example 1: data used to stall and dominate',
  cast: { Them: { initials: 'TH' }, You: you },
  lines: [
    ['', 'In a late-stage negotiation, the other party introduces a large volume of data to avoid committing on pricing.'],
    ['Them', 'Before we finalise, we want to walk you through this analysis. It includes 48 slides, market forecasts, regulatory assumptions and sensitivity models.'],
    ['', 'They begin flipping rapidly through slides.'],
    ['You', 'Thanks for pulling this together. Before we go deeper, what decision are you hoping this analysis helps us make today?', 'Stay calm, don\'t chase details, and interrupt with control.'],
    ['Them', 'Well, it shows why the pricing needs to be adjusted.'],
    ['You', 'Understood. What are the top three conclusions that lead you to that recommendation?', 'Ask for a summary.'],
    ['Them', 'If you look at slides 17 and 29…'],
    ['You', 'Let\'s pause. I\'m not asking for the mechanics yet. What are the three drivers that matter most?', 'Refocus, firmly.'],
    ['Them', 'Cost volatility, regulatory risk and resource allocation.'],
    ['You', 'Good. Let\'s focus on those three. If they hold, we can review the supporting data afterwards.', 'Take control of the agenda.'],
  ],
}

export const overwhelmSupplierScene = {
  label: 'Example 2: a supplier avoiding a direct answer',
  cast: { Supplier: { initials: 'SU' }, You: you },
  lines: [
    ['', 'You asked a supplier why they pulled out of a delivery commitment at the last minute.'],
    ['You', 'I need to understand why you cancelled after we agreed.'],
    ['Supplier', 'It\'s not simple. There\'s a lot going on. Our production schedule changed, raw-material prices are up, our board has concerns, and we\'ve seen a lot of projects like this run into trouble.'],
    ['You', 'Okay. Before we get into all of that, what is the main reason you decided not to go through with it?', 'Stay grounded, and interrupt with intent.'],
    ['Supplier', 'It\'s all connected. You have to understand the full picture.'],
    ['You', 'I want to understand. But listing everything is making it harder, not clearer. Can you name the one or two things that mattered most?', 'Set a clear frame, and prioritise.'],
    ['Supplier', '…We weren\'t sure we could meet your quality specification, and didn\'t want to let you down later.'],
    ['You', 'Thank you. That\'s what I needed to hear. We can talk about the other factors later. Right now, a clear answer matters more than detail.'],
  ],
}
