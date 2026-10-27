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
  In preview mode it uses the browser's storage. Swap these three objects for real providers
  (e.g. Supabase/Clerk for accounts, Stripe Checkout + webhook for payment) without changing any screen.
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
