import { useCallback, useEffect, useState } from 'react'

export interface CookLog {
  date: string
  rating: number
  note: string
}

export interface GroceryItem {
  id: string
  label: string
  aisle: string
  from: string[]
  checked: boolean
}

export interface AppState {
  logs: Record<string, CookLog[]>
  groceries: GroceryItem[]
  servings: Record<string, number>
}

const KEY = 'project-masterchef:v1'
const empty: AppState = { logs: {}, groceries: [], servings: {} }

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    return { ...empty, ...JSON.parse(raw) }
  } catch {
    return empty
  }
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

/** 0 = not cooked, 1 = cooked once, 2+ = learned */
export function timesCooked(state: AppState, id: string) {
  return state.logs[id]?.length ?? 0
}

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
