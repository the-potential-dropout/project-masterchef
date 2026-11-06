import { useState } from 'react'
import { recipes, recipeById } from '../data/recipes'
import { useStore } from '../lib/store'

const ORDER = ['Produce', 'Meat & eggs', 'Dairy', 'Bakery', 'Frozen', 'Pantry', 'Spices', 'Extras', 'Check the pantry']

export function Groceries({ go }: { go: (to: string) => void }) {
  const [state, update] = useStore()
  const [extra, setExtra] = useState('')
  const items = state.groceries
  const groups = ORDER.map((a) => [a, items.filter((g) => g.aisle === a)] as const).filter(([, l]) => l.length)
  const left = items.filter((g) => !g.checked).length
  const sources = [...new Set(items.flatMap((g) => g.from))].map((id) => recipeById(id)).filter(Boolean)

  const toggle = (id: string) =>
    update((s) => ({ ...s, groceries: s.groceries.map((g) => (g.id === id ? { ...g, checked: !g.checked } : g)) }))

  if (!items.length) {
    const next = recipes[0]
    return (
      <>
        <h1 className="page-title">Groceries</h1>
        <p className="lede">Your list is empty. Open a recipe and tap “Add to groceries” to build it, sorted by aisle.</p>
        <button className="btn yolk" onClick={() => go(`/recipe/${next.id}`)}>
          Start with dish 1
        </button>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">Groceries</h1>
      <p className="lede">
        {left ? `${left} to get` : 'Everything’s in the basket.'} for {sources.map((r) => r!.title.split(',')[0].split(' with')[0].toLowerCase()).join(' and ')}.
      </p>

      <form
        className="add-row"
        onSubmit={(e) => {
          e.preventDefault()
          const label = extra.trim()
          if (!label) return
          update((s) => ({
            ...s,
            groceries: [...s.groceries, { id: `extra:${Date.now()}`, label, aisle: 'Extras', from: [], checked: false }],
          }))
          setExtra('')
        }}
      >
        <label className="sr" htmlFor="extra">
          Add an item
        </label>
        <input id="extra" value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Add something else" />
        <button className="btn ghost small" type="submit">
          Add
        </button>
      </form>

      {groups.map(([aisle, list]) => (
        <section key={aisle} className="aisle">
          <h2>{aisle}</h2>
          {aisle === 'Check the pantry' && <p className="muted small">Staples you may already have. Tick off what you don’t need to buy.</p>}
          <ul>
            {list.map((g) => (
              <li key={g.id}>
                <label className={g.checked ? 'checked' : ''}>
                  <input type="checkbox" checked={g.checked} onChange={() => toggle(g.id)} />
                  <span>{g.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="row">
        <button className="btn ghost" onClick={() => update((s) => ({ ...s, groceries: s.groceries.filter((g) => !g.checked) }))}>
          Remove ticked items
        </button>
        <button className="btn ghost" onClick={() => update((s) => ({ ...s, groceries: [] }))}>
          Clear list
        </button>
      </div>
    </>
  )
}
