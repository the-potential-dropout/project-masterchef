import { useState } from 'react'
import type { Macros } from '../lib/nutrition'

/**
 * Calorie split by macro as one stacked bar. Colours validated for CVD in both
 * themes (order matters: protein, fat, carbs). Identity is never colour-alone:
 * a legend with values is always shown.
 */
const SEGS = [
  { key: 'protein', label: 'Protein', kcalPerG: 4, cls: 'seg-p' },
  { key: 'fat', label: 'Fat', kcalPerG: 9, cls: 'seg-f' },
  { key: 'carbs', label: 'Carbs', kcalPerG: 4, cls: 'seg-c' },
] as const

export function MacroBar({ m, label }: { m: Pick<Macros, 'protein' | 'fat' | 'carbs'>; label?: string }) {
  const [hover, setHover] = useState<string | null>(null)
  const kcal = SEGS.map((s) => m[s.key] * s.kcalPerG)
  const total = kcal.reduce((a, b) => a + b, 0) || 1
  return (
    <div className="macro-bar">
      {label && <p className="mb-label">{label}</p>}
      <div className="mb-track" role="img" aria-label={SEGS.map((s, i) => `${s.label} ${Math.round((kcal[i] / total) * 100)}%`).join(', ')}>
        {SEGS.map((s, i) => {
          const pct = (kcal[i] / total) * 100
          return (
            <span
              key={s.key}
              className={`mb-seg ${s.cls} ${hover && hover !== s.key ? 'dim' : ''}`}
              style={{ width: `${pct}%` }}
              tabIndex={0}
              onMouseEnter={() => setHover(s.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(s.key)}
              onBlur={() => setHover(null)}
            >
              {hover === s.key && (
                <span className="mb-tip" role="tooltip">
                  <strong>{s.label}</strong> {Math.round(m[s.key])} g, {Math.round(kcal[i])} kcal ({Math.round(pct)}%)
                </span>
              )}
            </span>
          )
        })}
      </div>
      <ul className="mb-legend">
        {SEGS.map((s, i) => (
          <li key={s.key}>
            <i className={s.cls} aria-hidden="true" />
            {s.label} <strong>{Math.round((kcal[i] / total) * 100)}%</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Horizontal bars, one hue, sorted largest first: where the grocery money goes. */
export function SpendBars({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  const sorted = [...rows].filter((r) => r.value > 0).sort((a, b) => b.value - a.value)
  if (!sorted.length) return null
  return (
    <ul className="spend-bars" aria-label="Spending by aisle">
      {sorted.map((r) => (
        <li key={r.label} title={`${r.label}: $${r.value.toFixed(2)}`}>
          <span className="sb-label">{r.label}</span>
          <span className="sb-track">
            <span className="sb-fill" style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className="sb-val">${r.value.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  )
}
