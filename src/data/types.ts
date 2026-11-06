export type Aisle = 'Produce' | 'Meat & eggs' | 'Dairy' | 'Pantry' | 'Spices' | 'Bakery' | 'Frozen'

export interface Ingredient {
  /** amount for the recipe's base servings; omit for "to taste" items */
  qty?: number
  unit?: string
  item: string
  note?: string
  aisle: Aisle
  /** true for things most kitchens already have once you've stocked the pantry */
  pantry?: boolean
}

export interface Step {
  title: string
  text: string
  /** seconds; shows a timer in cook mode */
  timer?: number
  tip?: string
}

export interface Fix {
  problem: string
  fix: string
}

export interface TimelineItem {
  when: string
  what: string
}

export interface Recipe {
  id: string
  order: number
  title: string
  short: string
  /** the technique this dish exists to teach */
  skill: string
  why: string
  minutes: number
  servings: number
  ingredients: Ingredient[]
  equipment: string[]
  steps: Step[]
  doneness?: string
  fixes: Fix[]
  variations: { name: string; how: string }[]
  milestone?: boolean
  timeline?: TimelineItem[]
}
