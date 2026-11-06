// Course reviews: shared by the server (api/reviews.js), the preview and the screens.
// Only students who bought the course (a module or the complete course) can write one.
// Raad approves each review before it is shown, but may reject only for spam, abuse or private
// details, never because it is critical, and never edits it (§ 5b UWG: honest reviews).
import { hasStrongLanguage } from './forum.js'

export const GOOGLE_REVIEW_URL = 'https://g.page/r/CVEmuY5MA9xaEBM/review'

export const REVIEW_LIMITS = { body: [20, 1500] }

// The only reasons a review may be rejected. "It's negative" is not one of them.
export const REJECT_REASONS = [
  { id: 'spam', label: 'Spam or advertising' },
  { id: 'abuse', label: 'Insults, threats or discrimination' },
  { id: 'private', label: 'Names or private details of other people or companies' },
  { id: 'unrelated', label: 'Not about the course' },
]
export const rejectReason = (id) => REJECT_REASONS.find((r) => r.id === id)?.label || ''

export function checkReview(rating, body) {
  const t = String(body || '').trim()
  const [min, max] = REVIEW_LIMITS.body
  if (!(Number.isInteger(rating) && rating >= 1 && rating <= 5)) return 'Please choose a star rating.'
  if (t.length < min) return `Please write at least ${min} characters about your experience.`
  if (t.length > max) return `Your review is too long (at most ${max} characters).`
  if (hasStrongLanguage(t)) return 'Please keep it professional: strong swear words are not allowed. Rephrase and try again.'
  return ''
}

// "Sara Meyer" -> "Sara M." (never the full name or email).
export function shortName(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'Student'
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0]
}

// Average and count of the published reviews.
export function summary(list) {
  const pub = list.filter((r) => r.status === 'published')
  const count = pub.length
  const average = count ? Math.round((pub.reduce((a, r) => a + r.rating, 0) / count) * 10) / 10 : null
  return { count, average }
}
