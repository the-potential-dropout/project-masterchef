import { useState } from 'react'
import { getRecipe, coreRecipes } from '../data'
import { useStore } from '../lib/store'
import { lineCost, money, tripTotals, addRecipeToGroceries } from '../lib/groceries'

const ORDER = ['Produce', 'Meat & eggs', 'Dairy', 'Bakery', 'Frozen', 'Pantry', 'Spices', 'Extras']

export function Groceries({ go }: { go: (to: string) => void }) {
  const [state, update] = useStore()
  const [extra, setExtra] = useState('')
  const [extraPrice, setExtraPrice] = useState('')
  const items = state.groceries
  const recipeIds = [...new Set(items.flatMap((g) => Object.keys(g.parts)))]
  const sources = recipeIds.map((id) => getRecipe(id)).filter((r) => !!r)
  const toBuy = items.filter((g) => !g.pantry || g.buy)
  const pantry = items.filter((g) => g.pantry && !g.buy)
  const groups = ORDER.map((a) => [a, toBuy.filter((g) => (g.custom ? 'Extras' : g.aisle) === a)] as const).filter(([, l]) => l.length)
  const { trip, used, remaining } = tripTotals(items, state.prices)
  const budget = state.weeklyBudget
  const pct = budget ? (trip / budget) * 100 : 0
  const plannedRecipes = state.plan.filter((p) => p.kind === 'recipe').map((p) => getRecipe(p.id)).filter((r) => r && !recipeIds.includes(r.id))

  const patch = (id: string, fn: (g: (typeof items)[number]) => (typeof items)[number]) =>
    update((s) => ({ ...s, groceries: s.groceries.map((g) => (g.id === id ? fn(g) : g)) }))

  return (
    <>
      <h1 className="page-title">Groceries</h1>

      <section className="budget">
        <div className="budget-head">
          <div>
            <p className="muted small">This trip, estimated</p>
            <p className="big-money">{money(trip)}</p>
          </div>
          <label className="budget-input">
            <span className="muted small">Weekly budget</span>
            <span className="money-field">
              $
              <input
                inputMode="decimal"
                value={budget || ''}
                onChange={(e) => update((s) => ({ ...s, weeklyBudget: Number(e.target.value.replace(/[^\d.]/g, '')) || 0 }))}
                aria-label="Weekly grocery budget in dollars"
              />
            </span>
          </label>
        </div>
        {budget > 0 && (
          <>
            <div className={`budget-bar ${pct > 100 ? 'over' : ''}`} role="img" aria-label={`${Math.round(pct)}% of budget`}>
              <span style={{ width: `${Math.min(100, pct)}%` }} />
            </div>
            <p className="small">
              {pct > 100 ? (
                <strong className="over-text">{money(trip - budget)} over budget.</strong>
              ) : (
                <>{money(budget - trip)} left in your budget.</>
              )}{' '}
              {items.length > 0 && <span className="muted">{money(remaining)} still to put in the basket.</span>}
            </p>
          </>
        )}
        {items.length > 0 && (
          <p className="muted small">
            You buy whole packs, but the recipes use about {money(used)} worth. The rest stays in your pantry for next time.
          </p>
        )}
        <p className="small">
          <a href="#/prices">Edit ingredient prices</a> to match your store.
        </p>
      </section>

      {!items.length ? (
        <section className="empty">
          <p className="lede">Your list is empty. Open a recipe and tap “Add to groceries”. Lines for the same product are merged, and the cost is added up for you.</p>
          <button className="btn yolk" onClick={() => go(`/recipe/${coreRecipes[0].id}`)}>Start with dish 1</button>
        </section>
      ) : (
        <>
          <p className="lede">
            For {sources.map((r) => r!.title.split(',')[0].split(' (')[0].toLowerCase()).join(', ')}.
          </p>
          {groups.map(([aisle, list]) => (
            <section key={aisle} className="aisle">
              <h2>{aisle}</h2>
              <ul>
                {list.map((g) => {
                  const c = lineCost(g, state.prices)
                  return (
                    <li key={g.id} className="gline">
                      <label className={g.checked ? 'checked' : ''}>
                        <input type="checkbox" checked={g.checked} onChange={() => patch(g.id, (x) => ({ ...x, checked: !x.checked }))} />
                        <span className="gl-body">
                          <span>{g.label}</span>
                          {(c.needText || c.packText) && (
                            <span className="muted small">
                              {c.needText}
                              {c.needText && c.packText ? ', buy ' : ''}
                              {c.packText}
                            </span>
                          )}
                        </span>
                        <span className="gl-cost">{c.cost ? money(c.cost) : ''}</span>
                      </label>
                      {g.pantry && (
                        <button className="link-btn" onClick={() => patch(g.id, (x) => ({ ...x, buy: false }))}>I have it</button>
                      )}
                      {g.custom && (
                        <button className="link-btn" onClick={() => update((s) => ({ ...s, groceries: s.groceries.filter((x) => x.id !== g.id) }))}>Remove</button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}

          {pantry.length > 0 && (
            <section className="aisle pantry">
              <h2>Probably in your pantry</h2>
              <p className="muted small">Staples not counted in the total. Tap “Need to buy” if you are out.</p>
              <ul>
                {pantry.map((g) => {
                  const c = lineCost(g, state.prices)
                  return (
                    <li key={g.id} className="gline">
                      <span className="gl-body">
                        <span>{g.label}</span>
                        <span className="muted small">{c.needText}</span>
                      </span>
                      <button className="link-btn" onClick={() => patch(g.id, (x) => ({ ...x, buy: true, checked: false }))}>Need to buy</button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </>
      )}

      <form
        className="add-row"
        onSubmit={(e) => {
          e.preventDefault()
          const label = extra.trim()
          if (!label) return
          update((s) => ({
            ...s,
            groceries: [...s.groceries, { id: `x:${Date.now()}`, label, aisle: 'Extras', parts: {}, checked: false, custom: true, price: Number(extraPrice) || 0 }],
          }))
          setExtra('')
          setExtraPrice('')
        }}
      >
        <label className="sr" htmlFor="extra">Add an item</label>
        <input id="extra" value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Add something else" />
        <label className="sr" htmlFor="extra-price">Price</label>
        <input id="extra-price" className="price-in" inputMode="decimal" value={extraPrice} onChange={(e) => setExtraPrice(e.target.value.replace(/[^\d.]/g, ''))} placeholder="$" />
        <button className="btn ghost small" type="submit">Add</button>
      </form>

      {plannedRecipes.length > 0 && (
        <section className="aisle">
          <h2>From today’s plan</h2>
          <div className="row">
            {plannedRecipes.map((r) => (
              <button key={r!.id} className="btn ghost small" onClick={() => addRecipeToGroceries(r!, 1)}>Add {r!.title.split(',')[0]}</button>
            ))}
          </div>
        </section>
      )}

      {items.length > 0 && (
        <div className="row">
          <button className="btn ghost" onClick={() => update((s) => ({ ...s, groceries: s.groceries.filter((g) => !g.checked || (g.pantry && !g.buy)) }))}>Remove ticked items</button>
          <button className="btn ghost" onClick={() => update((s) => ({ ...s, groceries: [] }))}>Clear list</button>
        </div>
      )}
    </>
  )
}
