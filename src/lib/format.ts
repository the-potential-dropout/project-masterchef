const FRACTIONS: [number, string][] = [
  [0.125, '⅛'],
  [0.25, '¼'],
  [0.333, '⅓'],
  [0.5, '½'],
  [0.667, '⅔'],
  [0.75, '¾'],
]

/** 1.5 -> "1½", 0.25 -> "¼", 2.97 -> "3" */
export function formatQty(n: number): string {
  if (n >= 10) return String(Math.round(n))
  const whole = Math.floor(n)
  const rest = n - whole
  if (rest < 0.06) return String(whole)
  if (rest > 0.94) return String(whole + 1)
  let best = FRACTIONS[0]
  for (const f of FRACTIONS) if (Math.abs(f[0] - rest) < Math.abs(best[0] - rest)) best = f
  if (Math.abs(best[0] - rest) > 0.07) return n.toFixed(1).replace(/\.0$/, '')
  return whole ? `${whole}${best[1]}` : best[1]
}

export function formatTimer(sec: number): string {
  const s = Math.max(0, Math.round(sec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = s % 60
  const mm = h ? String(m).padStart(2, '0') : String(m)
  return `${h ? h + ':' : ''}${mm}:${String(r).padStart(2, '0')}`
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}
