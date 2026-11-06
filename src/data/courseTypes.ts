export type Question =
  | { t: 'mc'; q: string; options: string[]; a: number; why?: string }
  | { t: 'tf'; q: string; a: boolean; why?: string }
  | { t: 'order'; q: string; items: string[]; why?: string }
  | { t: 'match'; q: string; pairs: [string, string][]; why?: string }
  | { t: 'num'; q: string; a: number; unit: string; tol: number; why?: string }

export interface Lesson {
  id: string
  title: string
  /** short teaching cards shown before the questions */
  teach: [title: string, body: string][]
  /** questions, or a generator that builds a fresh set each time */
  qs: Question[] | (() => Question[])
  /** recipe to cook as the practical part of this lesson */
  recipeId?: string
}

export interface Unit {
  id: string
  title: string
  glyph: string
  blurb: string
  lessons: Lesson[]
}

export interface Branch {
  group?: 'world' | 'day'
  id: string
  title: string
  glyph: string
  blurb: string
  units: Unit[]
}

// ── authoring helpers ──
/** multiple choice: correct answer first, it gets shuffled when played */
export const mc = (q: string, correct: string, wrong: string[], why?: string): Question => ({ t: 'mc', q, options: [correct, ...wrong], a: 0, why })
export const tf = (q: string, a: boolean, why?: string): Question => ({ t: 'tf', q, a, why })
export const order = (q: string, items: string[], why?: string): Question => ({ t: 'order', q, items, why })
export const match = (q: string, pairs: [string, string][], why?: string): Question => ({ t: 'match', q, pairs, why })
export const num = (q: string, a: number, unit: string, tol = 0, why?: string): Question => ({ t: 'num', q, a, unit, tol, why })
