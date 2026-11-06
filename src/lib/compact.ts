import type { Ingredient, Recipe, Step } from '../data/types'

/**
 * Compact recipe authoring, so 30+ recipes stay readable.
 *
 * Ingredient strings: "<qty> <unit> <item>, <note> ~<pct>%"
 *   "2 tbsp soy sauce"            -> qty 2, unit tbsp, item soy sauce
 *   "1 1/2 cups jasmine rice"     -> qty 1.5
 *   "4 garlic cloves, minced"     -> qty 4, no unit
 *   "salt, to taste"              -> no qty
 *   "1 cup oil, for frying ~15%"  -> only 15% is eaten (nutrition), full amount bought
 */
const UNITS = [
  'tsp', 'tbsp', 'cups', 'cup', 'ml', 'l', 'g', 'kg', 'lb', 'oz', 'pinch', 'pinches', 'cans', 'can',
  'bunch', 'bunches', 'head', 'heads', 'slices', 'slice', 'sprigs', 'sprig', 'handful', 'handfuls', 'pint', 'stalks', 'stalk', 'sheets', 'sheet', 'pieces', 'piece', 'dashes', 'dash',
]

function parseQty(s: string): number | undefined {
  const parts = s.trim().split(/\s+/)
  let total = 0
  for (const p of parts) {
    if (p.includes('/')) {
      const [a, b] = p.split('/').map(Number)
      total += a / b
    } else total += Number(p)
  }
  return Number.isFinite(total) && total > 0 ? total : undefined
}

export function parseIngredient(src: string): Ingredient {
  let s = src.trim()
  let eaten: number | undefined
  const pct = s.match(/\s*~(\d+)%$/)
  if (pct) {
    eaten = Number(pct[1]) / 100
    s = s.slice(0, pct.index).trim()
  }
  let note: string | undefined
  const comma = s.indexOf(',')
  if (comma > -1) {
    note = s.slice(comma + 1).trim()
    s = s.slice(0, comma).trim()
  }
  const m = s.match(/^((?:\d+(?:\.\d+)?|\d+\/\d+)(?:\s+\d+\/\d+)?)\s+(.*)$/)
  let qty: number | undefined
  let rest = s
  if (m) {
    qty = parseQty(m[1])
    rest = m[2]
  }
  let unit: string | undefined
  if (qty !== undefined) {
    const first = rest.split(/\s+/)[0]
    if (UNITS.includes(first.toLowerCase())) {
      unit = first
      rest = rest.slice(first.length).trim()
    }
  }
  return { qty, unit, item: rest, note, aisle: 'Pantry', eaten }
}

export type StepTuple = [title: string, text: string, minutes?: number, tip?: string]

export interface CompactRecipe {
  id: string
  cuisine: string
  title: string
  short: string
  skill: string
  why: string
  minutes: number
  servings: number
  ing: string[]
  equipment: string
  steps: StepTuple[]
  doneness?: string
  fixes: [string, string][]
  variations: [string, string][]
  tags?: string[]
}

export function r(c: CompactRecipe): Recipe {
  return {
    id: c.id,
    order: 0,
    cuisine: c.cuisine,
    title: c.title,
    short: c.short,
    skill: c.skill,
    why: c.why,
    minutes: c.minutes,
    servings: c.servings,
    ingredients: c.ing.map(parseIngredient),
    equipment: c.equipment.split(',').map((x) => x.trim()),
    steps: c.steps.map(
      ([title, text, minutes, tip]): Step => ({ title, text, timer: minutes ? Math.round(minutes * 60) : undefined, tip }),
    ),
    doneness: c.doneness,
    fixes: c.fixes.map(([problem, fix]) => ({ problem, fix })),
    variations: c.variations.map(([name, how]) => ({ name, how })),
    tags: c.tags,
  }
}
