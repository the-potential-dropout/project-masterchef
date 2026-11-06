import type { Ingredient, Recipe } from '../data/types'
import { formatQty } from './format'
import { update } from './store'

export function ingredientLine(i: Ingredient, scale: number, withQty = true) {
  const parts: string[] = []
  if (withQty && i.qty !== undefined) parts.push(formatQty(i.qty * scale))
  if (i.unit) parts.push(i.unit)
  parts.push(i.item)
  return parts.join(' ')
}

export function addRecipeToGroceries(r: Recipe, scale: number) {
  update((s) => {
    const next = s.groceries.filter((g) => !g.from.includes(r.id))
    for (const i of r.ingredients) {
      if (i.item === 'water' || i.item.startsWith('water')) continue
      next.push({
        id: `${r.id}:${i.item}`,
        label: ingredientLine(i, scale),
        aisle: i.pantry ? 'Check the pantry' : i.aisle,
        from: [r.id],
        checked: false,
      })
    }
    return { ...s, groceries: next }
  })
}
