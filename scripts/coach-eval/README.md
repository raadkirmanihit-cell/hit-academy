# Improving the AI coach without making it worse

Nobody reads learners' chats. The coach improves from anonymous feedback, in a loop that Raad controls.

## 1. Collect (automatic)
- Under every plan, learners can tap **thumbs up** or **thumbs down** (with an optional reason).
- The server sends that conversation once to the AI for a short, **anonymous** analysis
  (`src/coach/feedback.js`): kind of situation, what went well, what went wrong, the area responsible,
  and one general lesson. Only this analysis and the rating are stored (`coach_feedback`,
  `supabase/update-12-coach-feedback.sql`): no chat, no names, no learner id.
- Raad sees the summary in the control board, tab **Coach feedback**.

## 2. Review (about once a month, or after ~50 new ratings)
1. In the control board, open **Coach feedback** and click **Copy notes for a rule review**.
2. Paste the notes into a chat with Claude and ask for a rule review.
3. Rules for a change:
   - A pattern needs **at least 5 independent notes** saying the same thing. One-off complaints never change the rules.
   - Thumbs-up lessons are kept as "keep doing" points: a change must not undo them.
   - Each change is small and named after the pattern it fixes.
   - If a pattern describes something the coach must always do (or never do), it gets a new case in `cases.json`.

## 3. Test (before every change goes live)
```
node scripts/coach-eval/run.mjs
```
The run fails if any check that passed in `baseline.json` now passes less often. A change only
goes live (merged) when the run passes. After merging, save the new baseline with `--save`.

## 4. Watch (after the change is live)
- Raise `COACH_VERSION` in `src/coach/feedback.js` with every rule change. Ratings are stored per version.
- After 2–4 weeks, compare the new version's "Helpful" rate in the control board with the old one.
  If it is clearly worse, undo the change (revert the pull request).
