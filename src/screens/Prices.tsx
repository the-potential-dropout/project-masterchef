import { useState } from 'react'
import { catalog } from '../data/catalog'
import { useStore } from '../lib/store'
import { money } from '../lib/groceries'

const AISLES = ['Produce', 'Meat & eggs', 'Dairy', 'Bakery', 'Frozen', 'Pantry', 'Spices']

export function Prices() {
  const [s, update] = useStore()
  const [q, setQ] = useState('')
  const [onlyEdited, setOnlyEdited] = useState(false)
  const items = catalog
    .filter((c) => c.id !== 'water')
    .filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()))
    .filter((c) => !onlyEdited || c.id in s.prices)
  const edited = Object.keys(s.prices).length

  const setPrice = (id: string, v: string) =>
    update((st) => {
      const prices = { ...st.prices }
      const n = Number(v)
      if (v === '' || !Number.isFinite(n)) delete prices[id]
      else prices[id] = n
      return { ...st, prices }
    })

  return (
    <>
      <a className="back" href="#/groceries">← Groceries</a>
      <h1 className="page-title">Ingredient prices</h1>
      <p className="lede">
        Starting prices are rough Montreal supermarket estimates in Canadian dollars. Change any of them to match your store and every recipe cost and grocery total updates.
      </p>
      <div className="filters">
        <input type="search" placeholder="Search ingredients" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search ingredients" />
        <div className="row">
          <label className="check">
            <input type="checkbox" checked={onlyEdited} onChange={(e) => setOnlyEdited(e.target.checked)} /> Only show prices I changed ({edited})
          </label>
          {edited > 0 && (
            <button className="btn ghost small" onClick={() => update((st) => ({ ...st, prices: {} }))}>Reset all</button>
          )}
        </div>
      </div>
      {AISLES.map((a) => {
        const list = items.filter((c) => c.aisle === a)
        if (!list.length) return null
        return (
          <section key={a} className="aisle">
            <h2>{a}</h2>
            <ul className="price-list">
              {list.map((c) => {
                const custom = c.id in s.prices
                return (
                  <li key={c.id}>
                    <span className="gl-body">
                      <span>{c.name}</span>
                      <span className="muted small">
                        {c.pack}
                        {custom && <> · default {money(c.price)}</>}
                      </span>
                    </span>
                    <span className="money-field">
                      $
                      <input
                        inputMode="decimal"
                        aria-label={`Price of ${c.name}, ${c.pack}`}
                        className={custom ? 'edited' : ''}
                        value={custom ? String(s.prices[c.id]) : c.price.toFixed(2)}
                        onChange={(e) => setPrice(c.id, e.target.value.replace(/[^\d.]/g, ''))}
                        onFocus={(e) => e.target.select()}
                      />
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </>
  )
}
