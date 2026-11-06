// The members' community forum: categories, community rules and the checks shared by the
// browser and the server (api/forum.js). Change the wording here; the screens read it from this file.

export const FORUM_NAME = 'Community'

// Order = order on screen. adminOnly: only Raad can start a thread there (members can still reply).
export const CATEGORIES = [
  { id: 'announcements', title: 'Announcements', blurb: 'News from Raad about the course and the academy.', adminOnly: true },
  { id: 'introductions', title: 'Introductions', blurb: 'Say hello: your role, your industry, and the conversation you want to get better at.' },
  { id: 'wins', title: 'Wins and stories', blurb: 'A negotiation that went well, or one you learned from. What did you try, and what happened?' },
  { id: 'questions', title: 'Ask the community', blurb: 'Preparing for a tough conversation? Ask how other members would handle it.' },
  { id: 'partners', title: 'Practice partners', blurb: 'Find another member to role-play with before a real negotiation.' },
]
export const categoryOf = (id) => CATEGORIES.find((c) => c.id === id)

// Short version, shown before a member's first post. The full text is in the Terms (section 12).
export const COMMUNITY_RULES = [
  'Be respectful. Disagree with ideas, never attack people. No harassment, threats or discrimination.',
  'Keep it professional. No strong swearing, no sexual content, nothing unlawful.',
  'Protect confidential information. Change names and leave out details that identify your employer, clients or colleagues.',
  'No advertising, selling or recruiting, and no links to paid offers.',
  'Share experience, not professional advice. Nothing here is legal, financial or psychological advice.',
  'Report posts that break these rules. Raad reviews every report.',
]

// Reasons a member can give when reporting a post (the DSA asks for a reason with every notice).
export const REPORT_REASONS = [
  { id: 'abuse', label: 'Insulting, harassing or threatening' },
  { id: 'hate', label: 'Discriminatory or hateful' },
  { id: 'illegal', label: 'Possibly illegal content' },
  { id: 'confidential', label: 'Shares confidential or personal information' },
  { id: 'spam', label: 'Advertising or spam' },
  { id: 'profile', label: 'Inappropriate profile photo or display name' },
  { id: 'other', label: 'Something else' },
]
export const reportReason = (id) => REPORT_REASONS.find((r) => r.id === id)?.label || 'Something else'

// Grounds Raad can pick when removing a post or blocking a member (shown in the statement of reasons).
export const REMOVAL_REASONS = [
  { id: 'respect', label: 'Not respectful (community rule 1)' },
  { id: 'professional', label: 'Not professional (community rule 2)' },
  { id: 'confidential', label: 'Confidential or personal information (community rule 3)' },
  { id: 'advertising', label: 'Advertising or spam (community rule 4)' },
  { id: 'illegal', label: 'Possibly illegal content' },
  { id: 'other', label: 'Other breach of the community rules' },
]
export const removalReason = (id) => REMOVAL_REASONS.find((r) => r.id === id)?.label || 'Breach of the community rules'

export const LIMITS = {
  title: [6, 120],
  body: [2, 5000],
  name: [2, 40],
  threadsPerDay: 5,
  postsPerDay: 40,
  reportsPerDay: 20,
  photoChangesPerDay: 10,
  photoBytes: 120 * 1024, // after the browser shrinks it to PHOTO_SIZE (usually 5 to 15 KB)
}

// Profile photos are cropped to a square and shrunk to this size (pixels) in the browser before upload.
export const PHOTO_SIZE = 192

// Strong words that stop a post from being sent (same list as the Arena's scoring rules).
// Mild everyday words (damn, crap, hell…) are allowed.
const STRONG = /\b(f+u+c+k+\w*|motherf\w*|c+u+n+t+s?|cocks?|dicks?|pricks?|twats?|wankers?|bollocks|a+ss+holes?|arseholes?|bastards?|bitch\w*|pussy|pussies)\b/i
export const hasStrongLanguage = (s) => STRONG.test(String(s || ''))

// Checks a new post, thread or display name. Returns an error message, or '' when it is fine.
export function checkText(kind, text) {
  const t = String(text || '').trim()
  const [min, max] = LIMITS[kind]
  const what = { title: 'The title', body: 'Your post', name: 'Your display name' }[kind]
  if (t.length < min) return `${what} is too short.`
  if (t.length > max) return `${what} is too long (at most ${max} characters).`
  if (hasStrongLanguage(t)) return 'Please keep it professional: strong swear words are not allowed in the community. Rephrase and try again.'
  if (kind === 'name' && /@|https?:|www\./i.test(t)) return 'Please use a name, not an email address or link.'
  return ''
}

// Names only Raad may use, so nobody can pass themselves off as the trainer or the academy.
const RESERVED = /\b(raad|kirmani|admin|administrator|moderator|mod|trainer|support|h\.?\s?i\.?\s?t\.?(\s+academy)?|hit\s*academy|human\s+interactions)\b/i
export const reservedName = (name) => RESERVED.test(String(name || '')) ? 'That name is reserved for the academy. Please choose another one.' : ''

// Checks an uploaded profile photo (a data URL made by the browser). Returns { type, bytes } or an error string.
export function parsePhoto(dataUrl) {
  const m = /^data:image\/(webp|jpeg|png);base64,([A-Za-z0-9+/]+={0,2})$/.exec(String(dataUrl || ''))
  if (!m) return 'Please choose a JPG, PNG or WebP picture.'
  const size = Math.floor(m[2].length * 3 / 4)
  if (size > LIMITS.photoBytes) return 'That picture is too large. Please choose a smaller one.'
  return { type: 'image/' + m[1], base64: m[2], size }
}
