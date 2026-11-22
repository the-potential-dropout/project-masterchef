import { allChapters } from '../src/data/textbook'
import { allBranches, getRecipe } from '../src/data'

let bad = 0
const ids = new Set<string>()
let words = 0
for (const { chapter: c } of allChapters) {
  if (ids.has(c.id)) { console.log('duplicate chapter id', c.id); bad++ }
  ids.add(c.id)
  if (c.branch && !allBranches.some((b) => b.id === c.branch)) { console.log(c.id, 'unknown branch', c.branch); bad++ }
  for (const b of c.blocks) {
    words += JSON.stringify(b).split(/\s+/).length
    if (typeof b === 'object' && 'recipes' in b) for (const r of b.recipes) if (!getRecipe(r)) { console.log(c.id, 'unknown recipe', r); bad++ }
  }
}
console.log(`textbook: ${allChapters.length} chapters, about ${words.toLocaleString()} words, problems: ${bad}`)
if (bad) process.exit(1)
