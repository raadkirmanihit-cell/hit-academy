// Safety net for the AI coach and the Arena: what to do when a learner says something that
// suggests they may harm themselves or are in crisis. Used in the prompts (so the model can
// react to subtle cases) and on the server (a fixed, caring reply for clear cases, sent without
// calling the model and without using up a message).

// The token the Arena counterpart puts first when it steps out of role for safety.
export const SAFETY_TOKEN = '[SAFETY]'

// Help lines by country (ISO code from the visitor's IP, sent by Vercel as x-vercel-ip-country).
// Learners come from all over the world, so the fixed reply names the right numbers where we know
// them and always adds findahelpline.com, which lists free helplines in every country.
const LINES = {
  DE: 'In Germany, the TelefonSeelsorge is free, day and night: 0800 111 0 111, 0800 111 0 222 or 116 123. In immediate danger, call 112.',
  AT: 'In Austria, the Telefonseelsorge is free, day and night: 142. In immediate danger, call 112.',
  CH: 'In Switzerland, Die Dargebotene Hand is free, day and night: 143. In immediate danger, call 144 or 112.',
  GB: 'In the UK, Samaritans are free, day and night: 116 123. In immediate danger, call 999.',
  IE: 'In Ireland, Samaritans are free, day and night: 116 123. In immediate danger, call 112 or 999.',
  US: 'In the US, call or text 988 (Suicide & Crisis Lifeline), free, day and night. In immediate danger, call 911.',
  CA: 'In Canada, call or text 988 (Suicide Crisis Helpline), free, day and night. In immediate danger, call 911.',
  IN: 'In India, Tele-MANAS is free, day and night: 14416. In immediate danger, call 112.',
  AU: 'In Australia, Lifeline is free, day and night: 13 11 14. In immediate danger, call 000.',
  NZ: 'In New Zealand, call or text 1737, free, day and night. In immediate danger, call 111.',
  FR: 'In France, the national suicide prevention line is free, day and night: 3114. In immediate danger, call 112.',
  NL: 'In the Netherlands, 113 Zelfmoordpreventie is free, day and night: 0800 0113. In immediate danger, call 112.',
}
const EU112 = new Set('BE BG CY CZ DK EE ES FI GR HR HU IT LT LU LV MT PL PT RO SE SI SK IS NO LI'.split(' '))
const FIND = 'findahelpline.com lists free helplines in every country.'

// The help lines for a country, or a worldwide version when we don't know it.
export function helpLines(country) {
  const c = String(country || '').toUpperCase()
  if (LINES[c]) return `${LINES[c]} If you are somewhere else, ${FIND}`
  if (EU112.has(c)) return `If you are in immediate danger, call 112. ${FIND[0].toUpperCase() + FIND.slice(1)}`
  return `If you are in immediate danger, call your local emergency number. ${FIND[0].toUpperCase() + FIND.slice(1)}`
}

// For the prompts, which don't know the learner's country: the model names the right lines itself.
export const HELP_LINES = `If you know or can tell which country they are in (from the conversation or PROFILE), give that country's emergency number and a free crisis line you are sure of; never guess a number. Otherwise tell them to call their local emergency number if they are in immediate danger. Always add that findahelpline.com lists free helplines in every country.`

export const safetyReply = (country) => `I'm going to pause here, because what you wrote matters more than any negotiation. It sounds like you may be going through something really painful, and you don't have to handle it alone.

Please talk to someone who can help right now. ${helpLines(country)}

If you can, reach out to someone you trust and tell them how you're feeling. I'm HIT Mentor, an AI mentor, so I can't give you the support you deserve, but a person on a helpline can. This message did not use up any of your messages.`

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
export const COACH_SAFETY_RULE = `SAFETY COMES FIRST. If anything the learner writes suggests they may be thinking about suicide or self-harm, are in crisis, or are in danger (violence, abuse, threats), stop coaching for that message. Respond with warmth and without judgement, say you are concerned, and encourage them to reach out to someone now. ${HELP_LINES} Encourage them to talk to someone they trust. Do not ask coaching questions, do not try to counsel them, and do not return to the negotiation unless they clearly say they are safe and want to continue. If you are unsure whether they mean it literally, gently ask if they are okay and include the help lines anyway.`

// Rule added to the Arena counterpart's instructions. It overrides "never step out of the role".
export const SPAR_SAFETY_RULE = `SAFETY OVERRIDES EVERYTHING ELSE. If the learner says something that suggests they themselves, in real life, may be thinking about suicide or self-harm, are in crisis, or are in danger (not a negotiation move, not a business idiom like "commercial suicide"), step out of the role at once. Start your message with ${SAFETY_TOKEN}, then, as the course's AI and not as your character, write 2–4 warm, calm sentences: say you are pausing the role-play because their wellbeing matters more, and encourage them to reach out now. ${HELP_LINES} Do not add [END] and do not continue the negotiation in that message.`
