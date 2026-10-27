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
  label: 'Example: a partner deflects during an important discussion',
  cast: { Partner: { initials: 'PA' }, You: you },
  lines: [
    ['Partner', 'I don\'t think we should talk about finances tonight.'],
    ['You', 'It\'s important we organise our budget together.'],
    ['Partner', 'Well, before that: why didn\'t you fold the laundry? It\'s been sitting there for days.'],
    ['You', 'I understand the laundry bothered you. Can you help me understand how that connects to the budget conversation we were having?', 'You recognise the red herring, and ask how it relates.'],
    ['Partner', '…It doesn\'t, really.'],
    ['You', 'No problem. Let\'s park the laundry topic and come back to it later so we can stay focused on the budget.', 'Table the side issue.'],
    ['', 'After finishing the budget talk…'],
    ['You', 'Just to keep everything clear: we agreed to review expenses every Sunday. And if laundry is a concern, we\'ll talk about it tomorrow so it doesn\'t get mixed into other discussions.', 'Document what was agreed.'],
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
  label: 'Example: a couple discussing chores',
  cast: { Partner: { initials: 'PA' }, You: you },
  lines: [
    ['You', 'I think we should talk about how we divide chores more evenly.'],
    ['Partner', 'So you think I do nothing around here? Really?', 'The straw man: an exaggerated version of what you said.'],
    ['You', 'That\'s not what I said. Let me restate it clearly: I\'m asking that we rebalance a few tasks, not that you do nothing.', 'Clarify immediately.'],
    ['You', 'Can you repeat my point back to me in your own words so we\'re discussing the same thing?', 'Invite correction.'],
    ['Partner', 'You want to redistribute some chores, not accuse me.'],
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
  label: 'Example: a close friendship avoiding a difficult decision',
  cast: { Friend: { initials: 'FR' }, You: you },
  lines: [
    ['', 'You and a close friend need to decide whether to move in together. The topic keeps getting postponed, creating emotional strain.'],
    ['You', 'We\'ve talked about this for months. We need to decide whether we\'re moving in together.'],
    ['Friend', 'I just need more time to think. It\'s a big decision.'],
    ['You', 'I understand that it matters.', 'You feel the pressure but stay grounded.'],
    ['', 'Time passes with no follow-up.'],
    ['You', 'I need an answer by Sunday. Sitting in uncertainty is starting to affect me.', 'Set a clear timeline.'],
    ['Friend', 'I\'m still not ready. I\'ve been really busy and overwhelmed.'],
    ['You', 'Is there something specific you\'re unsure about, or are you avoiding the decision itself?', 'Escalate honestly, but calmly.'],
    ['Friend', 'I don\'t know. I just can\'t talk about it right now.'],
    ['You', 'If we can\'t talk this through this weekend, I\'ll assume the answer is no and make plans accordingly.', 'A drop-dead boundary.'],
    ['Friend', 'That feels unfair. You\'re pressuring me.'],
    ['You', 'I\'m not pressuring you to say yes. I\'m protecting myself from being stuck in uncertainty with no end date.', 'Hold firm, and stay transparent.'],
    ['Friend', '…Okay. Let\'s talk tomorrow.'],
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

export const threatPersonalScene = {
  label: 'Example 3: a breakup used as leverage',
  cast: { Partner: { initials: 'PA' }, You: you },
  lines: [
    ['', 'You and your partner have been arguing about trust and future plans. Emotions are high, and one person uses a breakup threat to force change.'],
    ['Partner', 'If this doesn\'t change right now, I\'m done. I\'ll end this relationship.'],
    ['You', 'Okay. Let\'s slow down for a second. I want to understand something clearly.', 'Pause; don\'t plead or defend.'],
    ['You', 'Are you saying you want to leave, or are you using this to try to scare me into agreeing?', 'Calmly question the threat.'],
    ['Partner', 'I\'m serious. I can\'t keep doing this.'],
    ['You', 'Then let\'s talk about what is actually not working, instead of using walking away as pressure.', 'Reframe, firmly.'],
    ['Partner', 'I need to know you\'ll change.'],
    ['You', 'I\'m open to working on things, but I won\'t make promises out of fear.', 'Reassert your agency.'],
    ['You', 'If our only way forward is threats, then we\'re already damaging the relationship, and I\'ll need to step back.', 'A real consequence you are prepared for.'],
    ['Partner', '…I don\'t want to lose you.'],
    ['You', 'Then let\'s talk honestly, without ultimatums. If we can\'t do that, we should both be willing to accept what comes next.'],
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

export const flinchFriendScene = {
  label: 'Example 2: friends discussing shared expenses',
  cast: { Friend: { initials: 'FR' }, You: you },
  lines: [
    ['', 'You and a close friend are planning a long weekend trip together and discussing how to split costs.'],
    ['You', 'For the rental and travel, my share would be around $400.'],
    ['Friend', 'Four hundred? That\'s way more than I thought it would be.'],
    ['You', '…Okay.', 'Stay calm; let the reaction sit.'],
    ['Friend', 'That feels like a lot.'],
    ['You', 'Let\'s walk through the costs so we\'re on the same page. The rental is two nights, gas is split evenly, and groceries are included. I\'m not adding anything extra.'],
    ['Friend', 'Oh. When you break it down like that, it makes sense.'],
    ['You', 'If that number doesn\'t work, we can adjust plans or shorten the trip.', 'Options without conceding.'],
    ['Friend', 'No. That\'s fair. Let\'s keep it as is.'],
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

export const lastMinutePersonalScene = {
  label: 'Example 2: a late condition in a relationship',
  cast: { Partner: { initials: 'PA' }, You: you },
  lines: [
    ['', 'You and a partner agree on plans to move in together. The decision feels settled.'],
    ['Partner', 'Before we do this, I need you to agree to not seeing certain friends anymore.'],
    ['You', 'That\'s new.', 'Pause, and slow things down.'],
    ['Partner', 'It\'s not a big deal. It should be obvious.'],
    ['You', 'This changes what we agreed to. We need to talk through what this really means.', 'Reopen the conversation.'],
    ['Partner', 'We\'ve already decided. Why are you backing out now?'],
    ['You', 'I\'m not backing out. I\'m saying I can\'t agree to something this significant without really thinking about it. If this is a requirement, then we need to slow down or rethink the plan.', 'Hold the boundary; be willing to walk away.'],
    ['Partner', '…Okay. Let\'s talk about it.'],
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

export const overwhelmFriendScene = {
  label: 'Example 2: a friend avoiding a direct answer',
  cast: { Friend: { initials: 'FR' }, You: you },
  lines: [
    ['', 'You asked a close friend why they backed out of a shared plan at the last minute.'],
    ['You', 'I need to understand why you cancelled after we agreed.'],
    ['Friend', 'It\'s not simple. There\'s a lot going on. Work has been intense, my schedule changed, money is tight, my family has opinions, and I read a lot about why this kind of plan usually fails.'],
    ['You', 'Okay. Before we get into all of that, what is the main reason you decided not to go through with it?', 'Stay grounded, and interrupt with intent.'],
    ['Friend', 'It\'s all connected. You have to understand the full picture.'],
    ['You', 'I want to understand. But listing everything is making it harder, not clearer. Can you name the one or two things that mattered most?', 'Set a clear frame, and prioritise.'],
    ['Friend', '…I was unsure, and didn\'t want to disappoint you if I changed my mind later.'],
    ['You', 'Thank you. That\'s what I needed to hear. We can talk about the other factors later. Right now, honesty matters more than detail.'],
  ],
}
