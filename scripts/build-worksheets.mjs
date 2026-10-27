// Renders each worksheet HTML in scripts/worksheets to a PDF in public/worksheets.
// Usage: NODE_PATH=$(npm root -g) node scripts/build-worksheets.mjs
import { createRequire } from 'module'
import { readdirSync } from 'fs'
import path from 'path'
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const names = { 'module-01.html': 'module-01-negotiators-blueprint-worksheet.pdf', 'module-02.html': 'module-02-voice-of-influence-worksheet.pdf', 'module-03.html': 'module-03-silent-advantage-worksheet.pdf', 'module-04.html': 'module-04-break-the-stalemate-worksheet.pdf', 'module-05.html': 'module-05-win-before-you-begin-worksheet.pdf', 'module-06.html': 'module-06-shape-their-reality-worksheet.pdf', 'module-07.html': 'module-07-resistance-to-resolution-worksheet.pdf' }
const dir = path.resolve('scripts/worksheets')
const browser = await chromium.launch()
for (const f of readdirSync(dir).filter((f) => f.endsWith('.html'))) {
  const page = await browser.newPage()
  await page.goto('file://' + path.join(dir, f), { waitUntil: 'networkidle' }).catch(() => {})
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: path.resolve('public/worksheets', names[f] || f.replace('.html', '.pdf')), format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="font:7px Arial;color:#8a93b0;width:100%;padding:0 14mm;display:flex;justify-content:space-between"><span>© 2026 Human Interactions Translated · All rights reserved</span><span>Page <span class=pageNumber></span> of <span class=totalPages></span></span></div>', margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' } })
  console.log('built', f)
}
await browser.close()
