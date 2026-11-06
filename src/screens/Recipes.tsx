import { useMemo, useState } from 'react'
import { allRecipes, cuisineGlyph, cuisineName } from '../data'
import { cuisineSpecs } from '../data/cuisines'
import { recipeFacts } from '../lib/nutrition'
import { dietOk, screenRecipe, targets } from '../lib/health'
import { money } from '../lib/groceries'
import { useStore } from '../lib/store'
import { formatMinutes } from '../lib/format'

type Sort = 'path' | 'cost' | 'protein' | 'kcal' | 'time'

export function Recipes({ go }: { go: (to: string) => void }) {
  const [s] = useStore()
  const [q, setQ] = useState('')
  const [cuisine, setCuisine] = useState('all')
  const [sort, setSort] = useState<Sort>('path')
  const [fitOnly, setFitOnly] = useState(false)
  const t = s.profile ? targets(s.profile) : null

  const rows = useMemo(() => {
    return allRecipes.map((r) => {
      const f = recipeFacts(r, s.prices)
      const flags = s.profile && t ? screenRecipe(r, f.perServing, s.profile, t) : []
      return { r, f, flags, ok: s.profile ? dietOk(r, s.profile) : true }
    })
  }, [s.prices, s.profile, t])

  const shown = rows
    .filter(({ r }) => cuisine === 'all' || (cuisine === 'core' ? !r.cuisine : r.cuisine === cuisine))
    .filter(({ r }) => !q || `${r.title} ${r.skill} ${r.ingredients.map((i) => i.item).join(' ')}`.toLowerCase().includes(q.toLowerCase()))
    .filter(({ ok }) => !fitOnly || ok)
    .sort((a, b) => {
      if (sort === 'cost') return a.f.perServingCost - b.f.perServingCost
      if (sort === 'protein') return b.f.perServing.protein / b.f.perServing.kcal - a.f.perServing.protein / a.f.perServing.kcal
      if (sort === 'kcal') return a.f.perServing.kcal - b.f.perServing.kcal
      if (sort === 'time') return a.r.minutes - b.r.minutes
      return 0
    })

  return (
    <>
      <h1 className="page-title">Recipes</h1>
      <p className="lede">{allRecipes.length} dishes from {cuisineSpecs.length} cuisines, with cost and nutrition per serving.</p>
      <div className="filters">
        <input type="search" placeholder="Search dishes or ingredients" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search recipes" />
        <div className="row">
          <label className="select">
            <span className="sr">Cuisine</span>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="all">All cuisines</option>
              <option value="core">Core path</option>
              {cuisineSpecs.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </label>
          <label className="select">
            <span className="sr">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="path">Default order</option>
              <option value="cost">Cheapest first</option>
              <option value="protein">Most protein per calorie</option>
              <option value="kcal">Lightest first</option>
              <option value="time">Quickest first</option>
            </select>
          </label>
        </div>
        {s.profile && (
          <label className="check">
            <input type="checkbox" checked={fitOnly} onChange={(e) => setFitOnly(e.target.checked)} /> Only show dishes that fit my diet and allergies
          </label>
        )}
      </div>

      <ul className="recipe-list">
        {shown.map(({ r, f, flags, ok }) => (
          <li key={r.id}>
            <button className={`recipe-row ${ok ? '' : 'nofit'}`} onClick={() => go(`/recipe/${r.id}`)}>
              <span className="rr-glyph" aria-hidden="true">{cuisineGlyph(r.cuisine)}</span>
              <span className="rr-body">
                <span className="rr-cuisine">{cuisineName(r.cuisine)}</span>
                <span className="rr-title">{r.title}</span>
                <span className="rr-meta">
                  <span>{money(f.perServingCost)}/serving</span>
                  <span>{Math.round(f.perServing.kcal)} kcal</span>
                  <span>{Math.round(f.perServing.protein)} g protein</span>
                  <span>{formatMinutes(r.minutes)}</span>
                </span>
                {flags.filter((x) => x.level !== 'info').slice(0, 2).map((x) => (
                  <span key={x.text} className={`flag ${x.level}`}>{x.text}</span>
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!shown.length && <p className="muted">No dishes match. Try clearing the search or filters.</p>}
    </>
  )
}
