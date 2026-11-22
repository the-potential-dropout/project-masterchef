// Exports the textbook content and live recipe facts for scripts/textbook/build.py.
import { textbook } from '../../src/data/textbook'
import { allRecipes } from '../../src/data'
import { recipeFacts } from '../../src/lib/nutrition'
import * as fs from 'fs'
const facts = Object.fromEntries(allRecipes.map((r) => { const f = recipeFacts(r); const p = f.perServing; return [r.id, { title: r.title, skill: r.skill, min: r.minutes, cuisine: r.cuisine ?? 'core', cost: +f.perServingCost.toFixed(2), kcal: Math.round(p.kcal), P: Math.round(p.protein), C: Math.round(p.carbs), F: Math.round(p.fat), fib: Math.round(p.fiber), Na: Math.round(p.sodium), sat: Math.round(p.satFat) }] }))
fs.writeFileSync(process.argv[2], JSON.stringify({ textbook, facts }))
