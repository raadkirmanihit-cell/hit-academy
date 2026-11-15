// Privacy Policy for H.I.T. Academy (GDPR Art. 13).
// DRAFT: have it reviewed together with the Terms. Update it whenever a new service is added
// (for example email via Resend, analytics, or a new payment method).
import { LEGAL } from './terms.js'

export const PRIVACY_VERSION = '2026-11-15'
export const PRIVACY_UPDATED = '14 November 2026'

export const PRIVACY = [
  {
    id: 'controller',
    title: '1. Who is responsible for your data',
    body: [
      `The controller under the EU General Data Protection Regulation (GDPR) is **${LEGAL.entity}**, ${LEGAL.address}. Email: ${LEGAL.email}.`,
      'We are not required to appoint a data protection officer. For any question about your data, or to use your rights, write to the email address above.',
      'This policy covers H.I.T. Academy, the online course platform. Our main website has its own privacy policy.',
    ],
  },
  {
    id: 'overview',
    title: '2. Overview',
    body: [
      'We collect only what we need to run the course: your account, your payment, your progress, and the messages you send us. We do not sell your data, we do not use advertising or tracking cookies, and we do not use analytics tools on the course platform.',
    ],
  },
  {
    id: 'what',
    title: '3. What we process, why, and on which legal basis',
    body: [
      '**Visiting the platform.** When you open any page, our hosting provider automatically processes technical data: IP address, date and time, the page requested, browser and operating system. This is needed to deliver the page and keep the platform secure. Legal basis: our legitimate interest in a secure, working website (Art. 6 (1) (f) GDPR). Server logs are deleted by the hosting provider after a short period.',
      '**Your account.** Name, email address, an encrypted (hashed) password, the date you registered and your sign-in sessions. We need these to create your account, let you sign in and put your name on your certificate. Legal basis: performance of the contract (Art. 6 (1) (b) GDPR).',
      '**Acceptance of the Terms.** The version of the Terms and Conditions you accepted and the date and time. Legal basis: our legal obligation and legitimate interest in being able to prove the agreement (Art. 6 (1) (c) and (f) GDPR).',
      '**Purchase and payment.** Name, email, billing address where required, amount, date, payment status, refunds, and your consent to immediate access (withdrawal waiver). Card or bank details go directly to Stripe and are never seen or stored by us. Legal basis: performance of the contract and our legal obligations under tax and commercial law (Art. 6 (1) (b) and (c) GDPR).',
      '**Course progress.** Lessons completed, activity answers, reflections you write, your before-and-after self-evaluation answers, quiz attempts and scores, and the date you complete each module. We need these to save your place, show your progress and issue your certificate. Legal basis: performance of the contract (Art. 6 (1) (b) GDPR). We can see this progress on our administration board to support you and improve the course.',
      '**Messages to us.** When you use "Message Raad" or email us, we process your name, email and message to reply. Legal basis: performance of the contract, or our legitimate interest in answering enquiries (Art. 6 (1) (b) and (f) GDPR).',
      '**AI coach.** What you type into the AI coach, together with matching excerpts from the course, is sent to our AI provider to generate a reply. **We save your coach chats in your account** (your messages, the coach\'s replies, rehearsals with their debriefs, and any prep sheets), so you can come back to them, switch between chats, and so the coach can take your earlier chats into account. Only you can see them in the app; we do not read them, except when you ask us to look at a problem, or where we are legally required to. You can delete any chat at any time under "Chats" in the coach. We also keep a daily count of how often you used the coach, to enforce the fair-use limit. **Coach profile (optional):** if you fill in "About you" in the coach (for example your role, industry and the negotiations you face), we save these answers in your account and send them with your questions so the advice fits you. You can change or clear them at any time. Please do not enter sensitive personal data, or other people\'s confidential information, into the coach. Legal basis: performance of the contract (Art. 6 (1) (b) GDPR).',
      '**Rating the coach (optional).** If you rate a plan from the coach with a thumbs up or down, the conversation up to that plan is sent once to our AI provider, which writes a short, anonymous note on how well the coach helped (for example "asked for the goal too late"). We store only your rating, the reason you tapped and that note, **without your name, your account or the chat itself**, and the note is checked for personal details before it is saved. We use these notes to improve the coach\'s rules. Nobody at Human Interactions Translated reads your chats for this. Legal basis: our legitimate interest in improving the coach (Art. 6 (1) (f) GDPR); you decide whether to rate at all.',
      '**You are talking to an AI.** The AI coach and the characters in The Arena are generated by an AI model, not by a person. Their answers can be wrong; use them as practice and guidance, not as legal, financial or medical advice. If you write something that suggests you may be in crisis or thinking about harming yourself, the coach or the role-play pauses and shows free help lines instead. That message is not stored and does not use up a message or token.',
      '**The Arena (AI role-plays).** When you practise in The Arena, what you write or say in the role-play is sent to our AI provider so the AI can play the other side. **We store each role-play**: the conversation, the scenario, and the feedback report and score the AI writes at the end. We need this so the score can\'t be changed in the browser, to show your score history and to check the Arena requirement for your certificate. The score is produced automatically by the AI against a published rubric; if you think a score is wrong, write to us and Raad will review the role-play personally. Legal basis: performance of the contract (Art. 6 (1) (b) GDPR). Please do not use real names or confidential details of real people or companies in a role-play.',
      '**Voice features.** If you choose to speak instead of type (in the AI coach, The Arena or the "Say it out loud" exercises), your browser turns your speech into text using its built-in speech recognition. Depending on your browser, this can send your voice to the browser maker for processing: **Google** for Chrome and Edge-based browsers, **Apple** for Safari. We do not receive or store any audio. Measurements of how you sounded (speaking pace, pauses, rising or falling sentence endings, filler words) are calculated on your device; in The Arena these numbers, but never the recording, are sent with your turn and stored with the role-play. Spoken replies from the coach use your device\'s built-in voices. Voice is always optional and starts only when you press the microphone button or switch on hands-free. Legal basis: your request to use the feature, as part of the contract (Art. 6 (1) (b) GDPR).',
      '**Members\' community.** If you join the community, we process the display name you choose, when you accepted the community rules, and what you post (conversations, replies, edits), with dates. **Other members can see your display name and your posts.** Your email address and your real name are never shown to them. If you report a post, we process your report and contact you about the outcome; the author is not told who reported them. If we remove a post or stop you from posting, we keep a record of the decision and the reason. Legal basis: performance of the contract (Art. 6 (1) (b) GDPR), and our legal obligations and legitimate interest in keeping the community safe and handling reports under the EU Digital Services Act (Art. 6 (1) (c) and (f) GDPR). Please do not post sensitive personal data about yourself or anyone else.',
      '**Emails from us.** We send emails that are needed to run your account: confirming your email address, resetting your password, confirming your purchase, and community notices (the outcome of a report you made, or the reason a post of yours was removed). We do not send marketing emails without your separate consent.',
    ],
  },
  {
    id: 'processors',
    title: '4. Service providers we use',
    body: [
      'We use the following providers. They process data only on our instructions under data processing agreements (Art. 28 GDPR):',
      { list: [
        '**Vercel Inc.** (USA): hosting of the platform and its server functions.',
        '**Supabase Inc.** (USA): user accounts, sign-in, and the database for profiles, purchases, progress, messages and community posts.',
        '**Stripe Payments Europe Ltd.** (Ireland) and its affiliates: payment processing, receipts and invoices. Stripe is also an independent controller for some data, for example for fraud prevention and its legal obligations. See stripe.com/privacy.',
        '**Anthropic PBC** (USA): the AI model behind the AI coach and The Arena role-plays and their feedback reports. Under its commercial terms, Anthropic does not use what you send through our platform to train its models.',
        '**Resend** (USA), once switched on: delivery of our account and notification emails.',
        '**Your browser\'s speech service** (for example Google for Chrome, Apple for Safari), only if you use a voice feature: speech-to-text. This is a service of your own browser, governed by its maker\'s privacy policy, not a provider we choose.',
      ] },
      '**Transfers outside the EU.** Some providers are based in the USA or may access data from there. Transfers are protected by the EU–US Data Privacy Framework where the provider is certified under it, and otherwise by the EU Standard Contractual Clauses (Art. 45 and 46 GDPR).',
      'Apart from these providers, we only share your data where the law requires it, for example with tax authorities or our tax adviser.',
    ],
  },
  {
    id: 'storage',
    title: '5. Cookies and browser storage',
    body: [
      'We do not use advertising, tracking or analytics cookies. The platform stores your sign-in session in your browser\'s local storage so that you stay signed in. This is strictly necessary for the service you asked for, so no consent is needed (§ 25 (2) TDDDG). Stripe may set its own necessary cookies on its payment page.',
    ],
  },
  {
    id: 'retention',
    title: '6. How long we keep your data',
    body: [
      { list: [
        'Account, progress and Terms acceptance: for as long as your account exists. You can ask for deletion in your account menu ("Delete my account") or by email; we then delete these within 30 days, except where we must keep them longer (see below) or need them to defend legal claims.',
        'Purchase and invoice records: for the periods required by German tax and commercial law (currently up to 10 years, § 147 AO, § 257 HGB).',
        'Messages to us: for up to 3 years after the matter is closed, unless your account still exists.',
        'AI coach chats and your coach profile: until you delete them, or until your account is deleted.',
      'Anonymous notes from coach ratings: up to 2 years. They contain no personal data and cannot be linked to you.',
        'AI coach usage counts, Arena tokens, and Arena role-plays with their reports and scores: for as long as your account exists, then deleted with it.',
        'Community posts and display name: until you delete them, or until your account is deleted. Posts you delete, and posts we remove, are kept for up to 6 months (so that we can handle complaints about a decision), then deleted. Reports and moderation decisions: up to 1 year after the decision.',
      ] },
    ],
  },
  {
    id: 'rights',
    title: '7. Your rights',
    body: [
      'You have the right to:',
      { list: [
        'access the data we hold about you (Art. 15 GDPR);',
        'have incorrect data corrected (Art. 16);',
        'have your data deleted (Art. 17) or its processing restricted (Art. 18);',
        'receive your data in a common, machine-readable format (Art. 20);',
        '**object** at any time to processing based on our legitimate interest, for reasons arising from your particular situation (Art. 21);',
        'withdraw any consent you gave, with effect for the future (Art. 7 (3)).',
      ] },
      `To use any of these rights, email ${LEGAL.email}.`,
      'You also have the right to complain to a data protection supervisory authority. The authority responsible for us is the **Hessian Commissioner for Data Protection and Freedom of Information** (Der Hessische Beauftragte für Datenschutz und Informationsfreiheit), Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Germany, datenschutz.hessen.de.',
    ],
  },
  {
    id: 'required',
    title: '8. Do you have to give us your data?',
    body: [
      'You need to give your name, email address and a password to create an account, and payment details (to Stripe) to buy the course. Without them we cannot provide the course. Everything else, such as reflections, messages, voice, or using the AI coach and The Arena, is up to you.',
      'We do not use automated decision-making or profiling that has legal or similarly significant effects on you (Art. 22 GDPR).',
    ],
  },
  {
    id: 'security',
    title: '9. Security and changes to this policy',
    body: [
      'All connections to the platform are encrypted (HTTPS). Passwords are stored only in hashed form. Access to the database is restricted so that each student can only see their own data, apart from the community posts and display names that members choose to share with each other.',
      'We may update this policy when the platform or the law changes. The current version is always available on this page.',
    ],
  },
]

// Legal notice (Impressum, § 5 DDG and § 18 MStV).
export const IMPRINT = [
  {
    id: 'provider',
    title: 'Information according to § 5 DDG',
    body: [
      `**${LEGAL.entity}**\n${LEGAL.address}`,
      `Email: ${LEGAL.email}`,
      ...(LEGAL.vatId ? [`VAT ID according to § 27a UStG: ${LEGAL.vatId}`] : []),
    ],
  },
  {
    id: 'content',
    title: 'Responsible for content according to § 18 (2) MStV',
    body: [`${LEGAL.owner}, ${LEGAL.address}`],
  },
  {
    id: 'disputes',
    title: 'Consumer dispute resolution',
    body: ['We are not willing or obliged to take part in dispute resolution proceedings before a consumer arbitration board.'],
  },
]
