// Safety net for the AI coach and the Arena: what to do when a learner says something that
// suggests they may harm themselves or are in crisis. Used in the prompts (so the model can
// react to subtle cases) and on the server (a fixed, caring reply for clear cases, sent without
// calling the model and without using up a message).

// The token the Arena counterpart puts first when it steps out of role for safety.
export const SAFETY_TOKEN = '[SAFETY]'

export const HELP_LINES = `In Germany you can call the TelefonSeelsorge for free, day and night, at 0800 111 0 111 or 0800 111 0 222, or 116 123. If you are in immediate danger, call 112. Outside Germany, findahelpline.com lists free helplines in your country.`

export const SAFETY_REPLY = `I'm going to pause here, because what you wrote matters more than any negotiation. It sounds like you may be going through something really painful, and you don't have to handle it alone.

Please talk to someone who can help right now. ${HELP_LINES}

If you can, reach out to someone you trust and tell them how you're feeling. I'm an AI coach for negotiation, so I can't give you the support you deserve, but a person on a helpline can. This message did not use up any of your messages.`

// Clear statements only. Everyday phrases such as "this deal is killing me" or "I could kill him"
// are not matched; the prompts handle anything subtler.
const PATTERNS = [
  // "commercial suicide", "career suicide": business idioms, not a crisis.
  /(?<!\b(commercial|career|political|financial|brand|business|market|social|price|pricing) )\bsuicid(e|al)\b/i,
  /\b(kill|hurt|harm|cut|hang|poison)(ing)? myself\b/i,
  /\bself[-\s]?harm/i,
  /\bend(ing)? (my life|my own life)\b/i,
  /\btake my (own )?life\b/i,
  /\b(want|wanna|going) to die\b(?! (of|from|laughing|when|if))/i,
  /\bwish I (was|were) dead\b/i,
  /\b(don'?t|do not) want to (live|be alive|exist)( anymore)?\b/i,
  /\bno (reason|point) (in |to )?(living|live|going on)\b/i,
  /\bbetter off (dead|without me)\b/i,
  /\b(selbstmord|suizid|umbringen will|nicht mehr leben|mich umbringen|mir das leben nehmen)\b/i,
]

export const soundsLikeCrisis = (text) => PATTERNS.some((p) => p.test(String(text || '')))

// Rule added to the coach's instructions.
export const COACH_SAFETY_RULE = `SAFETY COMES FIRST. If anything the learner writes suggests they may be thinking about suicide or self-harm, are in crisis, or are in danger (violence, abuse, threats), stop coaching for that message. Respond with warmth and without judgement, say you are concerned, and encourage them to reach out to someone now: ${HELP_LINES} Encourage them to talk to someone they trust. Do not ask coaching questions, do not try to counsel them, and do not return to the negotiation unless they clearly say they are safe and want to continue. If you are unsure whether they mean it literally, gently ask if they are okay and include the help lines anyway.`

// Rule added to the Arena counterpart's instructions. It overrides "never step out of the role".
export const SPAR_SAFETY_RULE = `SAFETY OVERRIDES EVERYTHING ELSE. If the learner says something that suggests they themselves, in real life, may be thinking about suicide or self-harm, are in crisis, or are in danger (not a negotiation move, not a business idiom like "commercial suicide"), step out of the role at once. Start your message with ${SAFETY_TOKEN}, then, as the course's AI and not as your character, write 2–4 warm, calm sentences: say you are pausing the role-play because their wellbeing matters more, and encourage them to reach out now: ${HELP_LINES} Do not add [END] and do not continue the negotiation in that message.`
