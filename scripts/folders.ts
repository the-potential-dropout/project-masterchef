import { tree, recipesIn, type Folder } from '../src/lib/folders'
import { allRecipes } from '../src/data/index'
function walk(f: Folder, d = 0) { console.log('  '.repeat(d) + f.title + ' (' + recipesIn(f).length + ')'); f.children?.forEach((c) => walk(c, d + 1)) }
walk(tree)
const inMeals = new Set(recipesIn(tree.children![2]).map((r) => r.id))
console.log('not in any meal folder:', allRecipes.filter((r) => !inMeals.has(r.id)).map((r) => r.id))
