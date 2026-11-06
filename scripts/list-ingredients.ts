import { recipes } from '../src/data/recipes'
import { world1 } from '../src/data/world1'
import { world2 } from '../src/data/world2'
const all = [...recipes, ...world1, ...world2]
const set = new Map<string, Set<string>>()
for (const r of all) for (const i of r.ingredients) {
  const k = i.item.toLowerCase()
  if (!set.has(k)) set.set(k, new Set())
  set.get(k)!.add(`${i.qty ?? ''} ${i.unit ?? ''}`.trim())
}
console.log(all.length, 'recipes', set.size, 'items')
for (const [k, v] of [...set].sort()) console.log(k, '|', [...v].join('; '))
