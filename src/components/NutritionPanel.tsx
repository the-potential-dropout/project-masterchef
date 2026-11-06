import type { Macros } from '../lib/nutrition'
import type { Targets } from '../lib/health'

const ROWS: { key: keyof Macros; label: string; unit: string; limit?: boolean }[] = [
  { key: 'kcal', label: 'Calories', unit: 'kcal' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'carbs', label: 'Carbs', unit: 'g' },
  { key: 'fat', label: 'Fat', unit: 'g' },
  { key: 'fiber', label: 'Fibre', unit: 'g' },
  { key: 'satFat', label: 'Saturated fat', unit: 'g', limit: true },
  { key: 'sodium', label: 'Sodium', unit: 'mg', limit: true },
]

/** Macro rows; with targets, each shows its share of the day as a bar. */
export function NutritionPanel({ m, t, of = 'of your day' }: { m: Macros; t: Targets | null; of?: string }) {
  return (
    <dl className="nutri">
      {ROWS.map(({ key, label, unit, limit }) => {
        const v = m[key]
        const goal = t ? (t[key as keyof Targets] as number) : 0
        const pct = goal ? (v / goal) * 100 : 0
        return (
          <div key={key} className={`nrow ${limit && pct > 100 ? 'over' : ''}`}>
            <dt>{label}</dt>
            <dd>
              <span className="nval">
                {Math.round(v).toLocaleString()} {unit}
                {t && <span className="muted small"> ({Math.round(pct)}% {of})</span>}
              </span>
              {t && (
                <span className={`nbar ${limit ? 'limit' : ''}`}>
                  <span style={{ width: `${Math.min(100, pct)}%` }} />
                </span>
              )}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
