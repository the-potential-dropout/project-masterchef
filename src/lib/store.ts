import { useCallback, useEffect, useState } from 'react'
import { defaultProfile, type Profile } from './health'

export interface CookLog {
  date: string
  rating: number
  note: string
}

export interface GroceryItem {
  /** catalog id, or "x:<text>" for unmatched / custom items */
  id: string
  label: string
  aisle: string
  /** base-unit amount contributed by each recipe */
  parts: Record<string, number>
  pantry?: boolean
  /** pantry staple the user says they need to buy */
  buy?: boolean
  checked: boolean
  custom?: boolean
  /** user-entered price for custom items */
  price?: number
}

export interface LessonRecord {
  best: number
  count: number
  last: string
}

export interface PlanEntry {
  kind: 'recipe' | 'food'
  id: string
  servings: number
}

export interface AppState {
  logs: Record<string, CookLog[]>
  groceries: GroceryItem[]
  servings: Record<string, number>
  prices: Record<string, number>
  weeklyBudget: number
  profile: Profile | null
  plan: PlanEntry[]
  lessons: Record<string, LessonRecord>
  xpDays: Record<string, number>
  dailyGoal: number
}

const KEY = 'project-masterchef:v2'
const OLD_KEY = 'project-masterchef:v1'
const empty: AppState = {
  logs: {}, groceries: [], servings: {}, prices: {}, weeklyBudget: 80, profile: null, plan: [], lessons: {}, xpDays: {}, dailyGoal: 30,
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const s = { ...empty, ...JSON.parse(raw) } as AppState
      if (s.profile) s.profile = { ...defaultProfile, ...s.profile }
      return s
    }
    const old = localStorage.getItem(OLD_KEY)
    if (old) {
      const o = JSON.parse(old)
      // v1 grocery lines are a different shape; keep logs and servings only
      return { ...empty, logs: o.logs ?? {}, servings: o.servings ?? {} }
    }
  } catch {
    /* storage unavailable or corrupt */
  }
  return empty
}

function save(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable: progress lives in memory for this visit */
  }
}

let current = load()
const listeners = new Set<(s: AppState) => void>()

export function getState() {
  return current
}

export function update(fn: (s: AppState) => AppState) {
  current = fn(current)
  save(current)
  listeners.forEach((l) => l(current))
}

export function useStore(): [AppState, typeof update] {
  const [state, setState] = useState(current)
  useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])
  return [state, update]
}

export function timesCooked(state: AppState, id: string) {
  return state.logs[id]?.length ?? 0
}

export const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function streak(state: AppState) {
  let n = 0
  const d = new Date()
  const key = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`
  // today counts if done; otherwise the streak can still be alive from yesterday
  if (!state.xpDays[key(d)]) d.setDate(d.getDate() - 1)
  while (state.xpDays[key(d)]) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export const totalXp = (state: AppState) => Object.values(state.xpDays).reduce((a, b) => a + b, 0)

export function useHashRoute(): [string, (to: string) => void] {
  const get = () => window.location.hash.replace(/^#/, '') || '/'
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const on = () => {
      setRoute(get())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const go = useCallback((to: string) => {
    window.location.hash = to
  }, [])
  return [route, go]
}
