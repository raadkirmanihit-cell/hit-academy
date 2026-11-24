// Checks that every lesson on the coach's map still exists in the course content.
// Run: node scripts/check-coach-lessons.mjs
import { modules } from '../src/content/index.js'
import { LESSONS, lessonOf } from '../src/coach/lessons.js'
import { MOVES } from '../src/coach/moves.js'
let bad = 0
for (const [id] of LESSONS) if (!lessonOf(modules, id)) { console.error('Missing lesson:', id); bad++ }
const onMap = new Set(LESSONS.map(([id]) => id))
for (const m of MOVES) if (!onMap.has(m.lesson)) { console.error('Move', m.id, 'points to a lesson not on the map:', m.lesson); bad++ }
console.log(bad ? `${bad} broken lesson link(s)` : `All ${LESSONS.length} coach lesson links point to real pages.`)
process.exit(bad ? 1 : 0)
