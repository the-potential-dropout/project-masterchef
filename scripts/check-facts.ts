import { recipes } from '../src/data/recipes'
import { world1 } from '../src/data/world1'
import { world2 } from '../src/data/world2'
import { recipeFacts, resolvedLines } from '../src/lib/nutrition'
const all = [...recipes, ...world1, ...world2]
let bad = 0
for (const r of all) {
  const f = recipeFacts(r)
  const p = f.perServing
  console.log(`${r.id.padEnd(20)} $${f.perServingCost.toFixed(2).padStart(5)}/srv  ${Math.round(p.kcal).toString().padStart(4)} kcal  P${Math.round(p.protein)} C${Math.round(p.carbs)} F${Math.round(p.fat)} sat${Math.round(p.satFat)} fib${Math.round(p.fiber)} Na${Math.round(p.sodium)}`)
  for (const l of resolvedLines(r)) {
    if (!l.cat) { console.log('   NO MATCH:', l.ing.item); bad++ }
    else if (l.base === undefined && l.ing.qty !== undefined) { console.log('   NO CONVERT:', l.ing.qty, l.ing.unit, l.ing.item, '->', l.cat.id); bad++ }
  }
}
console.log('problems:', bad)
