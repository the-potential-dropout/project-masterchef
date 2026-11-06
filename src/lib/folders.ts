import { allRecipes, coreRecipes } from '../data'
import { cuisineSpecs } from '../data/cuisines'
import type { Recipe } from '../data/types'
import { contains } from './health'
import { recipeFacts } from './nutrition'

export type Course = 'breakfast' | 'main' | 'soup' | 'salad' | 'side' | 'snack' | 'dessert' | 'drink'

export const COURSES: { id: Course; title: string; glyph: string }[] = [
  { id: 'breakfast', title: 'Breakfast', glyph: '🍳' },
  { id: 'main', title: 'Mains', glyph: '🍽️' },
  { id: 'soup', title: 'Soups, bisques and chowders', glyph: '🥣' },
  { id: 'salad', title: 'Salads', glyph: '🥗' },
  { id: 'side', title: 'Sides', glyph: '🥔' },
  { id: 'snack', title: 'Snacks, starters and dips', glyph: '🥨' },
  { id: 'dessert', title: 'Desserts and baking', glyph: '🍰' },
  { id: 'drink', title: 'Drinks', glyph: '🥤' },
]

const BY_BRANCH: Record<string, Course> = {
  breakfast: 'breakfast', soups: 'soup', snacks: 'snack', desserts: 'dessert', salads: 'salad',
  smoothies: 'drink', drinks: 'drink', cocktails: 'drink',
}
const OVERRIDES: Record<string, Course> = {
  eggs: 'breakfast', pancakes: 'breakfast', crepes: 'breakfast', 'tofu-scramble': 'breakfast', shakshuka: 'breakfast',
  minestrone: 'soup', 'miso-soup': 'soup', 'tom-yum': 'soup', avgolemono: 'soup', 'pho-ga': 'soup',
  horiatiki: 'salad', tabbouleh: 'salad', nicoise: 'salad', 'oi-muchim': 'salad',
  'arroz-rojo': 'side', vinagrete: 'side', farofa: 'side', 'bok-choy': 'side', 'lemon-potatoes': 'side',
  tzatziki: 'snack', hummus: 'snack', 'guac-pico': 'snack', 'scallion-pancakes': 'snack', 'goi-cuon': 'snack', onigiri: 'snack',
  tiramisu: 'dessert', 'mango-sticky-rice': 'dessert',
}

export function courseOf(r: Recipe): Course {
  return OVERRIDES[r.id] ?? (r.cuisine ? BY_BRANCH[r.cuisine] : undefined) ?? 'main'
}

export type Diet = 'vegan' | 'vegetarian' | 'pescatarian'
export function dietsOf(r: Recipe): Set<Diet> {
  const c = contains(r)
  const meat = c.has('pork') || c.has('beef') || c.has('poultry')
  const sea = c.has('fish') || c.has('shellfish')
  const out = new Set<Diet>()
  if (!meat && !sea) out.add('vegetarian')
  if (!meat && !sea && !c.has('dairy') && !c.has('egg') && !c.has('honey')) out.add('vegan')
  if (!meat && sea) out.add('pescatarian')
  return out
}

export interface Folder {
  id: string
  title: string
  glyph: string
  blurb?: string
  children?: Folder[]
  filter?: (r: Recipe) => boolean
}

const cuisine = (id: string): Folder => {
  const spec = cuisineSpecs.find((c) => c.id === id)!
  return { id, title: spec.title, glyph: spec.glyph, blurb: spec.blurb, filter: (r) => r.cuisine === id }
}

const notDrink = (r: Recipe) => courseOf(r) !== 'drink'
const facts = new Map<string, ReturnType<typeof recipeFacts>>()
const factsOf = (r: Recipe) => {
  let f = facts.get(r.id)
  if (!f) facts.set(r.id, (f = recipeFacts(r)))
  return f
}

export const tree: Folder = {
  id: 'recipes',
  title: 'Recipes',
  glyph: '📖',
  children: [
    { id: 'start', title: 'Starter path', glyph: '⭐', blurb: 'The six dishes that teach the basics.', filter: (r) => coreRecipes.includes(r) },
    {
      id: 'cuisines', title: 'World cuisines', glyph: '🌍', blurb: 'Browse by region, then country.',
      children: [
        { id: 'europe', title: 'Europe', glyph: '🇪🇺', children: ['italian', 'french', 'greek'].map(cuisine) },
        { id: 'asia', title: 'Asia', glyph: '🥢', children: ['chinese', 'japanese', 'korean', 'thai', 'vietnamese', 'indian'].map(cuisine) },
        { id: 'mideast-africa', title: 'Middle East and Africa', glyph: '🧆', children: ['levantine', 'west-african'].map(cuisine) },
        { id: 'americas', title: 'The Americas', glyph: '🌮', children: ['mexican', 'american', 'brazilian'].map(cuisine) },
      ],
    },
    {
      id: 'meals', title: 'By meal', glyph: '🕘', blurb: 'Breakfast to dessert, plus drinks.',
      children: COURSES.map((c) =>
        c.id === 'drink'
          ? {
              id: 'drink', title: c.title, glyph: c.glyph,
              children: [
                { id: 'smoothies', title: 'Smoothies and juices', glyph: '🥤', filter: (r) => r.cuisine === 'smoothies' },
                { id: 'cafe', title: 'Coffee, tea and cocoa', glyph: '☕', filter: (r) => r.cuisine === 'drinks' },
                { id: 'cocktails', title: 'Cocktails and mocktails', glyph: '🍸', filter: (r) => r.cuisine === 'cocktails' },
              ],
            }
          : { id: c.id, title: c.title, glyph: c.glyph, filter: (r) => courseOf(r) === c.id },
      ),
    },
    {
      id: 'diets', title: 'By diet and goal', glyph: '🥦', blurb: 'Vegan, vegetarian, pescatarian, high-protein and more.',
      children: [
        { id: 'vegan', title: 'Vegan', glyph: '🌱', blurb: 'No meat, fish, dairy, eggs or honey, as written.', filter: (r) => notDrink(r) && dietsOf(r).has('vegan') },
        { id: 'vegetarian', title: 'Vegetarian', glyph: '🥕', blurb: 'No meat or fish. Includes the vegan dishes.', filter: (r) => notDrink(r) && dietsOf(r).has('vegetarian') },
        { id: 'pescatarian', title: 'Fish and seafood', glyph: '🐟', blurb: 'Pescatarian dishes with fish or shellfish.', filter: (r) => notDrink(r) && dietsOf(r).has('pescatarian') },
        { id: 'gluten-free', title: 'Gluten-free as written', glyph: '🌾', blurb: 'No wheat-based ingredients; always check labels.', filter: (r) => notDrink(r) && !contains(r).has('gluten') },
        { id: 'high-protein', title: 'High protein', glyph: '💪', blurb: '25 g+ protein a serving, and at least a quarter of the calories from protein.', filter: (r) => { const p = factsOf(r).perServing; return p.protein >= 25 && (p.protein * 4) / p.kcal >= 0.25 } },
        { id: 'budget', title: 'Budget: under $2.50 a serving', glyph: '💸', filter: (r) => notDrink(r) && factsOf(r).perServingCost <= 2.5 },
        { id: 'quick', title: 'Quick: 30 minutes or less', glyph: '⚡', filter: (r) => r.minutes <= 30 },
        { id: 'plants', title: 'Plant-based classics', glyph: '🌿', filter: (r) => r.cuisine === 'plants' },
        { id: 'seafood', title: 'Seafood classics', glyph: '🦐', filter: (r) => r.cuisine === 'seafood' },
      ],
    },
  ],
}

/** Recipes reachable from a folder (its own filter, or any child's). */
export function recipesIn(f: Folder): Recipe[] {
  if (f.filter) return allRecipes.filter(f.filter)
  const seen = new Set<Recipe>()
  for (const c of f.children ?? []) for (const r of recipesIn(c)) seen.add(r)
  return [...seen]
}

export function resolvePath(ids: string[]): Folder[] {
  const trail: Folder[] = [tree]
  let cur = tree
  for (const id of ids) {
    const next = cur.children?.find((c) => c.id === id)
    if (!next) break
    trail.push(next)
    cur = next
  }
  return trail
}
