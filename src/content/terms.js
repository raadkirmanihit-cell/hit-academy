// Terms and Conditions for H.I.T. Academy.
// DRAFT: have a lawyer qualified in German consumer law review this before selling.
//
// To change the terms: edit the text, then raise TERMS_VERSION (for example to '2026-12-01').
// Everyone who accepted an older version is asked to accept the new one at their next sign-in.
//
// Fill in the company details in LEGAL. Anything still in [square brackets] is a placeholder.

export const TERMS_VERSION = '2026-10-29'
export const TERMS_UPDATED = '29 October 2026'

export const LEGAL = {
  name: 'Human Interactions Translated',
  short: 'H.I.T.',
  entity: 'Raad Kirmani, trading as Human Interactions Translated',
  owner: 'Raad Kirmani',
  address: 'Mainzer Ring 103, 63075 Offenbach am Main, Germany',
  email: 'info@humaninteractionstranslated.com',
  vatId: '', // VAT ID (USt-IdNr.), if you have one. Leave empty if not.
  smallBusiness: true, // Kleinunternehmer under § 19 UStG: no VAT is charged.
  website: 'https://humaninteractionstranslated.com',
  privacyUrl: '/?page=privacy',
  court: 'Offenbach am Main',
}

// Each section: a title and a list of paragraphs. A paragraph can be text, or { list: [...] }.
// **bold** and *italic* work inside the text.
export const TERMS = [
  {
    id: 'scope',
    title: '1. Who we are and what these terms cover',
    body: [
      `These Terms and Conditions ("Terms") apply to every account and every purchase on H.I.T. Academy, the online learning platform of **${LEGAL.entity}**, ${LEGAL.address} ("${LEGAL.short}", "we", "us"). Contact: ${LEGAL.email}.${LEGAL.vatId ? ` VAT ID: ${LEGAL.vatId}.` : ''}`,
      'They cover the self-paced course "Negotiation & Conflict Resolution" and everything that comes with it: lessons, videos, audio, images, illustrations, activities, role-plays, quizzes, worksheets, the certificate of completion and the AI coach (together, the "Course Materials").',
      'You must accept these Terms when you create an account. By ticking the box at sign-up, you confirm that you have read them and agree to them. Terms that differ from these, including your own terms of business, do not apply unless we agree to them in writing.',
      'You can view, save and print these Terms at any time from the link at the bottom of every page.',
    ],
  },
  {
    id: 'account',
    title: '2. Your account',
    body: [
      'You must be at least 18 years old to create an account, or have the consent of a parent or guardian if you are 16 or 17.',
      'Give your real name and a working email address. Your name appears on your certificate.',
      'Keep your password private. You are responsible for everything that happens in your account. Tell us straight away if you think someone else has used it.',
      '**One account, one person.** Your account and your access are personal. You may not share your login, let anyone else use your account, or buy one account for use by a group or a team. For team or company access, contact us for a licence.',
    ],
  },
  {
    id: 'contract',
    title: '3. Buying the course and price',
    body: [
      `The price is shown on the course page and at checkout, in euros. ${LEGAL.smallBusiness ? 'As a small business under § 19 of the German VAT Act (UStG), we do not charge VAT, so the price is the final price.' : 'It includes any VAT that applies.'} Payment is handled securely by our payment provider Stripe. We never see or store your card details.`,
      'Our online course page is an invitation for you to make an offer, not a binding offer. When you click the payment button, you make a binding offer to buy the course. The contract is concluded when your payment is confirmed and we unlock your access. You receive a confirmation and an invoice by email.',
      'The contract language is English.',
    ],
  },
  {
    id: 'access',
    title: '4. What you get and how long you have access',
    body: [
      'After payment you get online access to all seven modules, the downloadable worksheets, the quizzes and, once you complete every module, a certificate of completion.',
      '"Lifetime access" means access for as long as we offer the course online. If we ever stop offering it, we will tell you by email at least 3 months in advance, so that you can finish the course and download your worksheets and certificate.',
      'The course is delivered online only. You need a current web browser and an internet connection. We aim to keep the platform available at all times, but there may be short interruptions for maintenance, updates or reasons outside our control.',
      'We may update, improve, reorganise or replace parts of the Course Materials from time to time, for example to add new research or examples. We will not remove the core content of what you paid for without offering you a fair alternative.',
    ],
  },
  {
    id: 'withdrawal',
    title: '5. Your right of withdrawal (cancellation) as a consumer',
    body: [
      'If you buy as a consumer, you have a legal right to withdraw from the contract within 14 days without giving any reason. The full withdrawal information and a model form are in the section **"Withdrawal information"** at the end of these Terms.',
      '**Early loss of the right of withdrawal for digital content.** The course is digital content that is not supplied on a physical medium. At checkout you can ask us to give you access immediately. If you do so and confirm that you know you then lose your right of withdrawal, your right of withdrawal ends as soon as we unlock your access (§ 356 (5) of the German Civil Code, BGB). We confirm your consent and acknowledgement in your order confirmation email.',
      'Any refund outside the legal right of withdrawal is at our discretion. Write to us if something has gone wrong and we will look at it fairly.',
    ],
  },
  {
    id: 'ip',
    title: '6. Copyright and intellectual property',
    body: [
      'All Course Materials are protected by copyright and other intellectual property laws. They are owned by or licensed to us. This includes the text, structure, frameworks, examples, role-plays, scripts, quizzes, worksheets, illustrations, photos, audio and video recordings, the H.I.T. name and logo, and the design and software of the platform.',
      '**Your licence.** When you buy the course, we give you a personal, non-exclusive, non-transferable licence to view and use the Course Materials online, and to download and print the worksheets, **for your own personal learning only**. This licence lasts as long as your access.',
      'Unless we have agreed otherwise in writing, you may **not**:',
      { list: [
        'copy, reproduce, download (except the worksheets), record, screenshot in bulk, or film the Course Materials;',
        'share, publish, post, upload, forward, sell, rent, lend or give the Course Materials, or your login, to anyone else, online or offline;',
        'use the Course Materials to teach, train, coach or consult others, run workshops or courses, or create competing or derivative products;',
        'remove or change copyright notices, watermarks, names or logos;',
        'scrape, harvest or extract content automatically, or use the Course Materials to train, fine-tune or feed any artificial intelligence or machine-learning system;',
        'copy, reverse-engineer or interfere with the platform, its software or its security.',
      ] },
      'Short quotations with clear credit to "Human Interactions Translated" are allowed where the law permits them.',
      'If you break this section, we may suspend or close your account without refund (see section 12) and take legal action, including claims for injunctive relief and damages.',
      'Sources and research referred to in the course remain the property of their authors and publishers and are cited for teaching purposes.',
    ],
  },
  {
    id: 'education',
    title: '7. For educational purposes only',
    body: [
      'The course is **general education and training in communication, negotiation and conflict resolution**. It explains ideas, models and techniques and lets you practise them.',
      'The role-plays, scenes, characters, companies and figures in the course are made up for teaching unless stated otherwise. Any similarity to real people or situations is coincidental.',
      'Nothing in the course is tailored to your personal situation. You decide whether and how to use what you learn, and you are responsible for your own decisions and their consequences.',
    ],
  },
  {
    id: 'no-advice',
    title: '8. Not legal, psychological, medical or financial advice',
    body: [
      'The course and the AI coach **do not provide, and must not be used as**:',
      { list: [
        '**legal advice**, for example on contracts, employment, disputes, litigation, mediation with legal effect, or any legal rights or obligations;',
        '**psychological, psychotherapeutic or medical advice or treatment**, for example for mental health problems, trauma, abuse, relationship or family crises;',
        '**financial, investment, tax or accounting advice**, for example on salaries, prices, investments, loans, business valuations or tax.',
      ] },
      'If your situation involves any of these areas, speak to a qualified professional, such as a lawyer, a licensed psychotherapist or doctor, or a financial or tax adviser, before you act.',
      'The techniques in this course are for **ordinary professional and personal conversations**. Do not use them in situations of danger, violence, threats, hostage or crisis negotiation, or where someone\'s safety is at risk. In an emergency, contact the emergency services (112 in the EU).',
      'Use what you learn **ethically and lawfully**. Do not use it to deceive, pressure, manipulate or harm others. Some tactics are taught so that you can recognise and defend against them, not so that you use them.',
    ],
  },
  {
    id: 'no-guarantee',
    title: '9. No guaranteed results',
    body: [
      'Negotiations and conflicts depend on many things outside our control: the other people involved, the context, timing and your own choices. **We do not promise or guarantee any particular result**, such as a better deal, a higher salary, a promotion, more sales, a resolved conflict or an improved relationship.',
      'Examples, testimonials and success stories describe individual experiences. They are not typical or guaranteed results.',
      'Completing the course and passing the quizzes earns a **certificate of completion** from H.I.T. It confirms that you completed the course. It is not an academic degree, a state-recognised qualification or a professional licence.',
    ],
  },
  {
    id: 'ai-coach',
    title: '10. The AI coach',
    body: [
      'The course includes an AI coach that answers questions and lets you practise conversations. It is powered by an artificial-intelligence language model from a third-party provider (Anthropic).',
      'The AI coach is a **learning aid only**. Its answers are generated automatically, can be incomplete, wrong or unsuitable for your situation, and are not reviewed by a person before you see them. Section 8 applies to the AI coach in full. Check anything important before relying on it.',
      'Do not enter sensitive personal data into the AI coach, such as health information, other people\'s confidential information, or trade secrets. Use made-up names where you can.',
      'We may limit how often the AI coach can be used (fair use), and we may change or withdraw the AI coach. It is an extra feature and not an essential part of the course you buy.',
    ],
  },
  {
    id: 'conduct',
    title: '11. Using the platform fairly',
    body: [
      'Do not misuse the platform. In particular, do not upload or send anything unlawful, offensive or harmful; do not try to get around payment, security or usage limits; and do not overload or attack the platform.',
      'If you send us feedback, ideas or a testimonial, you allow us to use it to improve the course. We will only publish your name or testimonial with your permission.',
    ],
  },
  {
    id: 'termination',
    title: '12. Suspension and ending your account',
    body: [
      'You can ask us to close your account at any time by writing to us. Closing your account ends your access. The purchase price is not refunded, except where the law requires it.',
      'We may suspend or close your account if you seriously break these Terms, in particular sections 2 (account sharing), 6 (copyright) or 11 (fair use), or if you do not pay. Where reasonable, we will warn you first and give you a chance to fix the problem. If we close your account for a serious breach, you are not entitled to a refund.',
      'Your statutory rights, including the right to terminate for good cause, are not affected.',
    ],
  },
  {
    id: 'liability',
    title: '13. Our liability',
    body: [
      'We are liable without limitation for damage caused intentionally or through gross negligence, for injury to life, body or health, under the German Product Liability Act (Produkthaftungsgesetz), and where we have given a guarantee.',
      'For slight negligence we are only liable if we breach an essential contractual obligation, meaning an obligation that makes proper performance of the contract possible in the first place and on which you may regularly rely. In that case our liability is limited to the damage that is typical and foreseeable for this kind of contract.',
      'Otherwise, our liability for slight negligence is excluded. In particular, we are not liable for decisions you make, or results you get, by applying what you learned in the course or from the AI coach (see sections 7 to 10).',
      'These limits also apply to our employees, representatives and the people we work with.',
      'Your statutory rights for defects in digital products (§§ 327 ff. BGB) are not affected.',
    ],
  },
  {
    id: 'privacy',
    title: '14. Your personal data',
    body: [
      `We process your personal data (name, email, payment confirmation, course progress, quiz results, messages to us and AI coach conversations) to provide the course, in line with the EU General Data Protection Regulation (GDPR). Details, including your rights and the service providers we use (such as Supabase for accounts, Stripe for payments, Vercel for hosting and Anthropic for the AI coach), are in our **Privacy Policy**, linked at the bottom of every page.`,
      'We record when you accepted these Terms, and which version you accepted, so that we can show that you agreed to them.',
    ],
  },
  {
    id: 'changes',
    title: '15. Changes to these Terms',
    body: [
      'We may change these Terms for good reason, for example because of new laws or court decisions, new features, or changes to the platform. We will tell you about any change by email or on the platform at least 4 weeks before it takes effect.',
      'If you do not agree, you can object or close your account. Changes do not affect the main things you paid for (the course content and your access) without your agreement. If you keep using the platform after the change takes effect without objecting, the new Terms apply. We will remind you of this in our notice.',
    ],
  },
  {
    id: 'law',
    title: '16. Governing law, disputes and final provisions',
    body: [
      'German law applies, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). If you are a consumer living in another country, you also keep the protection of the mandatory consumer laws of that country.',
      `If you are a merchant (Kaufmann), a legal entity under public law, or have no general place of jurisdiction in Germany, the exclusive place of jurisdiction is ${LEGAL.court}, Germany.`,
      'We are not willing or obliged to take part in dispute resolution proceedings before a consumer arbitration board. Please contact us directly with any complaint. We will do our best to solve it.',
      'If any part of these Terms is invalid, the rest remains valid. The statutory rules apply in place of the invalid part.',
    ],
  },
  {
    id: 'withdrawal-info',
    title: 'Withdrawal information',
    body: [
      '**Right of withdrawal.** You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period is 14 days from the day the contract is concluded.',
      `To exercise your right of withdrawal, you must inform us (${LEGAL.entity}, ${LEGAL.address}, email: ${LEGAL.email}) of your decision to withdraw from this contract by a clear statement, for example a letter sent by post or an email. You may use the model withdrawal form below, but you do not have to.`,
      'To meet the withdrawal deadline, it is sufficient for you to send your notice of withdrawal before the withdrawal period has expired.',
      '**Effects of withdrawal.** If you withdraw from this contract, we will reimburse all payments we received from you without undue delay and in any event within 14 days of the day we are informed of your decision to withdraw. We will use the same means of payment you used for the original transaction, unless you have expressly agreed otherwise. You will not be charged any fees for this reimbursement.',
      '**Early expiry of the right of withdrawal.** Your right of withdrawal for a contract for digital content not supplied on a physical medium expires when we have begun to perform the contract (unlock your access), after you have expressly agreed that we begin before the end of the withdrawal period and have acknowledged that you thereby lose your right of withdrawal, and we have confirmed this to you.',
      '**Model withdrawal form** (complete and return this form only if you wish to withdraw from the contract):',
      { list: [
        `To: ${LEGAL.entity}, ${LEGAL.address}, ${LEGAL.email}`,
        'I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract for the supply of the following digital content: Negotiation & Conflict Resolution, self-paced online course',
        'Ordered on (*) / received on (*):',
        'Name of consumer(s):',
        'Address of consumer(s):',
        'Signature of consumer(s) (only if this form is sent on paper):',
        'Date:',
        '(*) Delete as appropriate.',
      ] },
    ],
  },
]
