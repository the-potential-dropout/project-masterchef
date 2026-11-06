import { catalogById } from '../data/catalog'
import type { Ingredient, Recipe } from '../data/types'
import { formatQty } from './format'
import { resolvedLines, priceOf, type Prices } from './nutrition'
import { update, type GroceryItem } from './store'

export function ingredientLine(i: Ingredient, scale: number, withQty = true) {
  const parts: string[] = []
  if (withQty && i.qty !== undefined) parts.push(formatQty(i.qty * scale))
  if (i.unit) parts.push(i.unit)
  parts.push(i.item)
  return parts.join(' ')
}

/** Adds (or refreshes) a recipe's ingredients, merging lines that are the same product. */
export function addRecipeToGroceries(r: Recipe, scale: number) {
  update((s) => {
    const items = s.groceries.map((g) => {
      const parts = { ...g.parts }
      delete parts[r.id]
      return { ...g, parts }
    })
    for (const l of resolvedLines(r)) {
      if (l.cat?.id === 'water') continue
      const id = l.cat ? l.cat.id : `x:${l.ing.item.toLowerCase()}`
      let g = items.find((x) => x.id === id)
      if (!g) {
        g = {
          id,
          label: l.cat ? l.cat.name : l.ing.item,
          aisle: l.cat ? l.cat.aisle : l.ing.aisle,
          parts: {},
          pantry: l.cat?.pantry,
          checked: false,
        }
        items.push(g)
      }
      g.parts[r.id] = (l.base ?? 0) * scale
    }
    return { ...s, groceries: items.filter((g) => g.custom || Object.keys(g.parts).length) }
  })
}

export function removeRecipeFromGroceries(id: string) {
  update((s) => ({
    ...s,
    groceries: s.groceries
      .map((g) => {
        const parts = { ...g.parts }
        delete parts[id]
        return { ...g, parts }
      })
      .filter((g) => g.custom || Object.keys(g.parts).length),
  }))
}

export function needed(g: GroceryItem) {
  return Object.values(g.parts).reduce((a, b) => a + b, 0)
}

const fmtAmt = (n: number, base: string) => {
  if (base === 'each') return formatQty(n)
  if (n >= 1000) return `${+(n / 1000).toFixed(2)} ${base === 'g' ? 'kg' : 'L'}`
  return `${Math.round(n)} ${base}`
}

export interface LineCost {
  /** packs to buy */
  packs: number
  /** cost of those packs */
  cost: number
  /** cost of only the amount recipes use */
  usedCost: number
  needText: string
  packText: string
  counts: boolean
}

export function lineCost(g: GroceryItem, prices: Prices): LineCost {
  if (g.custom) {
    const cost = g.price ?? 0
    return { packs: 1, cost, usedCost: cost, needText: '', packText: '', counts: true }
  }
  const cat = catalogById.get(g.id)
  if (!cat) return { packs: 0, cost: 0, usedCost: 0, needText: '', packText: '', counts: false }
  const need = needed(g)
  const price = priceOf(cat, prices)
  const packs = Math.max(1, Math.ceil(need / cat.amount - 0.02))
  const counts = !g.pantry || !!g.buy
  return {
    packs,
    cost: packs * price,
    usedCost: (need / cat.amount) * price,
    needText: need ? `need ${fmtAmt(need, cat.base)}` : '',
    packText: `${packs > 1 ? `${packs} × ` : ''}${cat.pack}`,
    counts,
  }
}

export function tripTotals(items: GroceryItem[], prices: Prices) {
  let trip = 0
  let used = 0
  let remaining = 0
  for (const g of items) {
    const c = lineCost(g, prices)
    used += c.usedCost
    if (!c.counts) continue
    trip += c.cost
    if (!g.checked) remaining += c.cost
  }
  return { trip, used, remaining }
}

export const money = (n: number) => `$${n.toFixed(2)}`
