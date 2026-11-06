import { useMemo, useState } from 'react'
import { allRecipes, cuisineName } from '../data'
import type { Recipe } from '../data/types'
import { recipeFacts } from '../lib/nutrition'
import { dietOk, screenRecipe, targets } from '../lib/health'
import { money } from '../lib/groceries'
import { useStore } from '../lib/store'
import { formatMinutes } from '../lib/format'
import { DishPhoto } from '../components/Art'
import { photoUrl } from '../data/photos'
import { COURSES, courseOf, recipesIn, resolvePath, tree, type Folder } from '../lib/folders'

type Sort = 'path' | 'cost' | 'protein' | 'kcal' | 'time'

function FolderCard({ f, href }: { f: Folder; href: string }) {
  const list = recipesIn(f)
  const cover = list.find((r) => photoUrl(r.id))
  const img = cover ? photoUrl(cover.id, 360) : undefined
  return (
    <a href={href} className="folder">
      <span className="folder-cover" style={img ? { backgroundImage: `url("${img}")` } : undefined}>
        <span className="folder-glyph" aria-hidden="true">{f.glyph}</span>
      </span>
      <span className="folder-text">
        <strong>{f.title}</strong>
        <span className="muted small">
          {f.children ? `${f.children.length} folders, ` : ''}
          {list.length} recipe{list.length === 1 ? '' : 's'}
        </span>
      </span>
    </a>
  )
}

function RecipeList({ recipes, go, showCourses }: { recipes: Recipe[]; go: (to: string) => void; showCourses: boolean }) {
  const [s] = useStore()
  const [sort, setSort] = useState<Sort>('path')
  const [fitOnly, setFitOnly] = useState(false)
  const [course, setCourse] = useState<string>('all')
  const t = s.profile ? targets(s.profile) : null
  const rows = useMemo(
    () =>
      recipes.map((r) => {
        const f = recipeFacts(r, s.prices)
        const flags = s.profile && t ? screenRecipe(r, f.perServing, s.profile, t) : []
        return { r, f, flags, ok: s.profile ? dietOk(r, s.profile) : true }
      }),
    [recipes, s.prices, s.profile, t],
  )
  const coursesHere = COURSES.filter((c) => recipes.some((r) => courseOf(r) === c.id))
  const shown = rows
    .filter(({ r }) => course === 'all' || courseOf(r) === course)
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
      {showCourses && coursesHere.length > 1 && (
        <div className="chip-row" role="tablist" aria-label="Filter by meal">
          <button role="tab" aria-selected={course === 'all'} className={course === 'all' ? 'on' : ''} onClick={() => setCourse('all')}>All</button>
          {coursesHere.map((c) => (
            <button key={c.id} role="tab" aria-selected={course === c.id} className={course === c.id ? 'on' : ''} onClick={() => setCourse(c.id)}>
              {c.glyph} {c.title.split(',')[0]}
            </button>
          ))}
        </div>
      )}
      <div className="filters">
        <div className="row">
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
          {s.profile && (
            <label className="check">
              <input type="checkbox" checked={fitOnly} onChange={(e) => setFitOnly(e.target.checked)} /> Fits my diet
            </label>
          )}
        </div>
      </div>
      <ul className="recipe-list">
        {shown.map(({ r, f, flags, ok }) => (
          <li key={r.id}>
            <button className={`recipe-row ${ok ? '' : 'nofit'}`} onClick={() => go(`/recipe/${r.id}`)}>
              <DishPhoto recipe={r} size="thumb" />
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
      {!shown.length && <p className="muted">No dishes match these filters.</p>}
    </>
  )
}

export function Recipes({ path, go }: { path: string[]; go: (to: string) => void }) {
  const [q, setQ] = useState('')
  const search = q.trim().toLowerCase()
  const results = search
    ? allRecipes.filter((r) => `${r.title} ${r.skill} ${cuisineName(r.cuisine)} ${r.ingredients.map((i) => i.item).join(' ')}`.toLowerCase().includes(search))
    : []

  if (path[0] === 'all') {
    return (
      <>
        <a className="back" href="#/recipes">← Folders</a>
        <h1 className="page-title">All recipes</h1>
        <p className="lede">{allRecipes.length} dishes. Use the meal chips to narrow it down.</p>
        <RecipeList recipes={allRecipes} go={go} showCourses />
      </>
    )
  }

  const trail = resolvePath(path)
  const folder = trail[trail.length - 1]
  const base = (n: number) => `#/recipes/${trail.slice(1, n + 1).map((f) => f.id).join('/')}`

  return (
    <>
      {trail.length > 1 && (
        <nav className="crumbs" aria-label="Breadcrumb">
          {trail.slice(0, -1).map((f, i) => (
            <span key={f.id}>
              <a href={i === 0 ? '#/recipes' : base(i)}>{f.title}</a>
              <span aria-hidden="true"> / </span>
            </span>
          ))}
        </nav>
      )}
      <h1 className="page-title">
        {folder !== tree && <span aria-hidden="true">{folder.glyph} </span>}
        {folder.title}
      </h1>
      {folder.blurb && <p className="lede">{folder.blurb}</p>}

      {folder === tree && (
        <>
          <p className="lede">{allRecipes.length} dishes. Open a folder, or search everything.</p>
          <input className="search-big" type="search" placeholder="Search dishes, cuisines or ingredients" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search all recipes" />
          {search ? (
            <>
              <p className="muted small">{results.length} result{results.length === 1 ? '' : 's'}</p>
              <RecipeList recipes={results} go={go} showCourses={false} />
            </>
          ) : (
            <>
              {tree.children!.map((section) => (
                <section key={section.id} className="folder-section">
                  <div className="h-row">
                    <h2>{section.glyph} {section.title}</h2>
                    <a className="link-btn" href={`#/recipes/${section.id}`}>Open</a>
                  </div>
                  {section.blurb && <p className="muted small">{section.blurb}</p>}
                  <div className="folder-scroll">
                    {(section.children ?? [section]).map((f) => (
                      <FolderCard key={f.id} f={f} href={section.children ? `#/recipes/${section.id}/${f.id}` : `#/recipes/${section.id}`} />
                    ))}
                  </div>
                </section>
              ))}
              <a className="all-link" href="#/recipes/all">See all {allRecipes.length} recipes in one list</a>
            </>
          )}
        </>
      )}

      {folder !== tree && folder.children && (
        <div className="folder-grid">
          {folder.children.map((f) => (
            <FolderCard key={f.id} f={f} href={`${base(trail.length - 1)}/${f.id}`} />
          ))}
        </div>
      )}
      {folder !== tree && folder.filter && <RecipeList recipes={recipesIn(folder)} go={go} showCourses />}
    </>
  )
}
