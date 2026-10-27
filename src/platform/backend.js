// The one place the app talks to "the server". Every screen goes through `backend`.
//
// LIVE (the real website): set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.
//   Accounts and progress in Supabase, payment through Stripe, AI coach through /api/coach.
// PREVIEW (claude.ai preview, local development without those settings):
//   everything stays in the browser and no payment is taken.
import { liveBackend } from './backend.live.js'
import { previewBackend } from './backend.preview.js'

export const isLive = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
export const backend = isLive ? liveBackend : previewBackend
