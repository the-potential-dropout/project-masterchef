import { recipes as core } from './recipes'
import { world1 } from './world1'
import { world2 } from './world2'
import { world3 } from './world3'
import { foundations } from './foundations'
import { buildCuisineBranches, cuisineSpecs } from './cuisines'
import type { Branch, Lesson, Unit } from './courseTypes'
import type { Recipe } from './types'
import { recipeDrill } from '../lib/generate'

export const coreRecipes = core
export const worldRecipes: Recipe[] = [...world1, ...world2, ...world3]
export const allRecipes: Recipe[] = [...core, ...worldRecipes]
const byId = new Map(allRecipes.map((r) => [r.id, r]))
export const getRecipe = (id: string) => byId.get(id)

export const cuisineName = (id?: string) => cuisineSpecs.find((c) => c.id === id)?.title ?? 'Core path'
export const cuisineGlyph = (id?: string) => cuisineSpecs.find((c) => c.id === id)?.glyph ?? '⭐'

const firstSix: Unit = {
  id: 'f-six', title: 'Your first six dishes', glyph: '⭐', blurb: 'Memorise the six dishes on your path.',
  lessons: core.map(
    (r): Lesson => ({
      id: `six-${r.id}`,
      title: r.title.split(',')[0],
      recipeId: r.id,
      teach: [[r.title, r.short], ['What it teaches', `${r.skill}. ${r.why}`]],
      qs: () => recipeDrill(r, allRecipes),
    }),
  ),
}

export const trunk: Branch = {
  id: 'foundations',
  title: 'Kitchen Foundations',
  glyph: '🏠',
  blurb: 'The general knowledge every cook needs.',
  units: [...foundations.slice(0, 3), firstSix, ...foundations.slice(3)],
}

export const branches: Branch[] = buildCuisineBranches(allRecipes)

export const allBranches = [trunk, ...branches]
export const allLessons = allBranches.flatMap((b) => b.units.flatMap((u) => u.lessons.map((l) => ({ lesson: l, unit: u, branch: b }))))
export const findLesson = (id: string) => allLessons.find((x) => x.lesson.id === id)

/** World branches open once the first three Foundations units are done. */
export const BRANCH_UNLOCK_UNITS = 3
