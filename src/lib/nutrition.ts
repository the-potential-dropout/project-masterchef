import { catalogById, findCatalog, type CatalogItem } from '../data/catalog'
import type { Ingredient, Recipe } from '../data/types'

export interface Macros {
  kcal: number
  protein: number
  carbs: number
  fat: number
  satFat: number
  fiber: number
  sodium: number
}

export const zeroMacros = (): Macros => ({ kcal: 0, protein: 0, carbs: 0, fat: 0, satFat: 0, fiber: 0, sodium: 0 })

export function addMacros(a: Macros, b: Macros, k = 1): Macros {
  return {
    kcal: a.kcal + b.kcal * k,
    protein: a.protein + b.protein * k,
    carbs: a.carbs + b.carbs * k,
    fat: a.fat + b.fat * k,
    satFat: a.satFat + b.satFat * k,
    fiber: a.fiber + b.fiber * k,
    sodium: a.sodium + b.sodium * k,
  }
}

const ML: Record<string, number> = { tsp: 4.93, tbsp: 14.79, cup: 240, ml: 1, l: 1000, pinch: 0.31 }
const G: Record<string, number> = { g: 1, kg: 1000, lb: 453.6, oz: 28.35 }

function normUnit(u?: string): string | undefined {
  if (!u) return undefined
  let s = u.toLowerCase().replace(/\(.*\)/, '').trim()
  if (s.startsWith('can')) return 'can'
  if (s === 'pinches') return 'pinch'
  if (s === 'bunches') return 'bunch'
  if (s.endsWith('s') && !['tbsp', 'lbs'].includes(s)) s = s.slice(0, -1)
  if (s === 'lbs') s = 'lb'
  return s
}

/** How much of the catalog item's base unit this ingredient line uses. */
export function baseAmount(ing: Ingredient, cat: CatalogItem): number | undefined {
  if (ing.qty === undefined) return undefined
  const unit = normUnit(ing.unit)
  const q = ing.qty
  // canned tomatoes come in 796 ml and 398 ml cans
  if (unit === 'can' && cat.id === 'canned-tomatoes') {
    const small = /1[45] oz/.test(`${ing.unit ?? ''} ${ing.note ?? ''}`)
    return q * (small ? 398 : 796)
  }
  if (unit && cat.per?.[unit] !== undefined) return q * cat.per[unit]
  if (!unit) {
    if (cat.base === 'each') return q
    if (cat.e) return cat.base === 'g' ? q * cat.e : q * cat.e / (cat.d ?? 1)
    return undefined
  }
  if (unit in ML) {
    const ml = q * ML[unit]
    if (cat.base === 'ml') return ml
    if (cat.base === 'g') return ml * (cat.d ?? 1)
    if (cat.base === 'each' && cat.e) return (ml * (cat.d ?? 1)) / cat.e
  }
  if (unit in G) {
    const g = q * G[unit]
    if (cat.base === 'g') return g
    if (cat.base === 'ml') return g / (cat.d ?? 1)
    if (cat.base === 'each' && cat.e) return g / cat.e
  }
  return undefined
}

export function gramsOf(cat: CatalogItem, base: number): number {
  if (cat.base === 'g') return base
  if (cat.base === 'ml') return base * (cat.d ?? 1)
  return base * (cat.e ?? 0)
}

export function macrosOf(cat: CatalogItem, base: number): Macros {
  const k = gramsOf(cat, base) / 100
  const [kcal, protein, carbs, fat, satFat, fiber, sodium] = cat.n
  return { kcal: kcal * k, protein: protein * k, carbs: carbs * k, fat: fat * k, satFat: satFat * k, fiber: fiber * k, sodium: sodium * k }
}

export type Prices = Record<string, number>

export function priceOf(cat: CatalogItem, prices: Prices) {
  return prices[cat.id] ?? cat.price
}

export interface ResolvedLine {
  ing: Ingredient
  cat?: CatalogItem
  base?: number
}

export function resolveLine(ing: Ingredient): ResolvedLine {
  const cat = findCatalog(ing.item)
  if (!cat) return { ing }
  return { ing, cat, base: baseAmount(ing, cat) }
}

export interface RecipeFacts {
  /** cost of what the recipe actually uses, whole recipe at base servings */
  cost: number
  perServingCost: number
  total: Macros
  perServing: Macros
  unresolved: string[]
}

const cache = new Map<string, ResolvedLine[]>()
export function resolvedLines(r: Recipe) {
  let v = cache.get(r.id)
  if (!v) {
    v = r.ingredients.map(resolveLine)
    cache.set(r.id, v)
  }
  return v
}

export function recipeFacts(r: Recipe, prices: Prices = {}): RecipeFacts {
  let cost = 0
  let total = zeroMacros()
  const unresolved: string[] = []
  for (const l of resolvedLines(r)) {
    if (!l.cat || l.base === undefined) {
      if (l.ing.qty !== undefined || !l.cat) unresolved.push(l.ing.item)
      continue
    }
    cost += (priceOf(l.cat, prices) * l.base) / l.cat.amount
    total = addMacros(total, macrosOf(l.cat, l.base), l.ing.eaten ?? 1)
  }
  return {
    cost,
    perServingCost: cost / r.servings,
    total,
    perServing: addMacros(zeroMacros(), total, 1 / r.servings),
    unresolved,
  }
}

export const catalogItem = (id: string) => catalogById.get(id)
