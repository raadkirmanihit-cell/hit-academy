// Shows which settings are present (yes/no only, never the values), to check a deployment.
const NAMES = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET',
  'ANTHROPIC_API_KEY', 'ADMIN_EMAILS', 'RESEND_API_KEY', 'NOTIFY_EMAIL']

export default function handler(req, res) {
  const settings = Object.fromEntries(NAMES.map((n) => [n, !!process.env[n]]))
  const sk = process.env.STRIPE_SECRET_KEY || ''
  const wh = process.env.STRIPE_WEBHOOK_SECRET || ''
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({
    ok: true,
    settings,
    stripeMode: sk.startsWith('sk_live_') ? 'live' : sk.startsWith('sk_test_') ? 'test' : sk ? 'unrecognised' : 'missing',
    // Shape checks only, to catch a key that was cut off when copying.
    stripeKeyLooksComplete: sk ? sk.length >= 30 : null,
    webhookSecretLooksComplete: wh ? /^whsec_[A-Za-z0-9]{32,}$/.test(wh) : null,
  })
}
