# H.I.T. Negotiation & Conflict Resolution course

Self-paced course app for Human Interactions Translated. Vite + React, no other runtime dependencies.

```
npm install
npm run dev        # local development
npm run build      # production build in dist/
```

## How it is organised

- `src/content/course.js` – course name, price, the 7 modules, certificate rule.
- `src/content/module-XX/` – one folder per module: `index.js` (lessons, objectives, takeaways),
  `activities.js`, `dialogues.js`, `quiz.js`, `references.js`.
- `src/content/index.js` – registers finished modules. A module listed in `course.js` but not
  registered here shows as "Coming soon".
- `src/platform/backend.js` – the only place that talks to accounts, payments and saved progress.
  It picks `backend.live.js` (Supabase + Stripe) when the Supabase settings exist, otherwise
  `backend.preview.js` (browser storage, no payment: used by the claude.ai preview).
- `api/` – server functions on Vercel: `checkout` (Stripe payment page), `stripe-webhook` (records
  payments and keeps the coach subscription in sync), `coach` (AI coach via the Claude API),
  `coach-plan` (AI coach subscription: status, subscribe, Stripe's cancel page), `notify-signup`, `admin-students`.
- `supabase/schema.sql` – database tables and security rules. Run once in the Supabase SQL Editor.
  Existing databases run the numbered updates instead (`update-2-admin-board.sql`, `update-3-terms.sql`,
  `update-4-coach-subscription.sql`).
- `src/content/terms.js` and `privacy.js` – Terms and Conditions, Privacy Policy and Legal notice (pages at `/?page=terms`, `privacy`, `imprint`; company details in `LEGAL`). Students must tick the box at sign-up;
  the database records the version and time. Raise `TERMS_VERSION` after changing the text and every
  student is asked to accept the new version at their next visit.
- `src/ui/`, `src/activities/`, `src/diagrams/` – screens, interactive activity types, SVG diagrams.

## Adding a module

1. Copy `src/content/module-01` to `module-0N` and replace the content.
2. Put images in `public/img/mN/` (webp, about 900px wide).
3. Add the worksheet HTML to `scripts/worksheets/` and run
   `NODE_PATH=$(npm root -g) node scripts/build-worksheets.mjs` (needs Playwright).
4. Register the module in `src/content/index.js`.
5. When all 7 are live, set `certificate.requires` to `'all'` in `course.js`.

## Content rules

- Anything added beyond the original module uses a `research` block (shown as "Beyond the module")
  and cites a source from `references.js` with `added: true`. Extra quiz questions carry `added: true`.
- "Highlight content added beyond the module" in the account menu outlines all added material.

## Block types (lesson content)

`lead, p, list, checks, quote, img, callout, research, diagram, cols2, behaviourList, traits,
compareDialogues, strategyHeader, examples, scene, situationCards, flipCards, selector,
activity (classify | scenarios | branching), reflect, zones, factorCards, factorMatrix, breathing, silence, options (Module 4 invent-then-judge board), voices,
steps (optional `start`), cards (optional `imgRatio`), person, table (optional `reveal` makes it collapsible, `plain` unbolds the first column, a string row is a group heading), overview, quiz, takeaways, worksheet, references`

In a `scene` block, a line with an empty speaker (`['', 'Silence…']`) renders as a stage direction, and a
third element on a line is a coaching note.

## Live website settings (Vercel → Settings → Environment Variables)

| Name | What it is |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key (server only) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_live_…`, or `sk_test_…` for testing) |
| `STRIPE_WEBHOOK_SECRET` | Signing secret of the Stripe webhook pointing to `/api/stripe-webhook` (events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.refunded`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`) |
| `STRIPE_PRICE_ID` | Optional: a Stripe price for the full €99 complete course (single modules at €19 and upgrades are always priced by the app, see `src/content/pricing.js`) |
| `STRIPE_COACH_PRICE_ID` | Optional: a monthly Stripe price for the AI coach subscription instead of the built-in €12/month |
| `STRIPE_AUTOMATIC_TAX` | Leave unset while H.I.T. is a Kleinunternehmer (no VAT, § 19 UStG). `true` only once you charge VAT and Stripe Tax is set up |
| `ANTHROPIC_API_KEY` | Claude API key for the AI coach |
| `COACH_MODEL`, `COACH_DAILY_LIMIT` | Optional: coach model (default `claude-opus-5-5`) and messages per student per day (default 80) |
| `COACH_TASTER`, `COACH_MONTHLY_LIMIT` | Optional: free coach messages for course buyers (default 10) and messages per subscriber per billing month (default 300) |
| `ADMIN_EMAILS` | Comma-separated emails that see the Students admin page |
| `RESEND_API_KEY`, `NOTIFY_EMAIL`, `NOTIFY_FROM` | Optional: email notifications for new registrations and purchases |
| `SITE_URL` | Optional: e.g. `https://academy.humaninteractionstranslated.com` |

In Supabase, set Authentication → URL Configuration → Site URL to the website address.

**AI coach subscription (€12/month).** Course buyers get 10 free coach messages, then need the subscription.
In Stripe: turn on the customer portal (Settings → Billing → Customer portal → allow cancelling, at the end of
the billing period) so the "Cancel subscription here" button works, and add the § 19 UStG line as the default
invoice footer (Settings → Billing → Invoices), because subscription invoices don't use the checkout footer.
