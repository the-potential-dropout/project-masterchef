import { useState } from 'react'
import type { Recipe } from '../data/types'
import { timesCooked, useStore } from '../lib/store'
import { formatMinutes, formatQty, formatTimer } from '../lib/format'
import { ingredientLine, addRecipeToGroceries, removeRecipeFromGroceries, money } from '../lib/groceries'
import { recipeFacts } from '../lib/nutrition'
import { screenRecipe, targets } from '../lib/health'
import { cuisineName } from '../data'
import { NutritionPanel } from '../components/NutritionPanel'
import { DishPhoto } from '../components/Art'
import { MacroBar } from '../components/Charts'

export function RecipePage({ recipe: r, go }: { recipe: Recipe; go: (to: string) => void }) {
  const [state, update] = useStore()
  const servings = state.servings[r.id] ?? r.servings
  const scale = servings / r.servings
  const n = timesCooked(state, r.id)
  const logs = state.logs[r.id] ?? []
  const inList = state.groceries.some((g) => r.id in g.parts)
  const [logging, setLogging] = useState(false)
  const facts = recipeFacts(r, state.prices)
  const t = state.profile ? targets(state.profile) : null
  const flags = state.profile && t ? screenRecipe(r, facts.perServing, state.profile, t) : []
  const planned = state.plan.some((p) => p.kind === 'recipe' && p.id === r.id)

  const setServings = (v: number) =>
    update((s) => ({ ...s, servings: { ...s.servings, [r.id]: Math.max(1, Math.min(12, v)) } }))

  return (
    <article className="recipe">
      <a className="back" href={r.cuisine ? '#/recipes' : '#/'}>
        ← {r.cuisine ? 'Recipes' : 'Path'}
      </a>
      <DishPhoto recipe={r} credit />
      <p className="skill">{r.cuisine ? `${cuisineName(r.cuisine)}: ` : r.milestone ? 'Milestone: ' : `Dish ${r.order}: `}{r.skill}</p>
      <h1>{r.title}</h1>
      <p className="lede">{r.short}</p>

      <dl className="facts">
        <div>
          <dt>Time</dt>
          <dd>{formatMinutes(r.minutes)}</dd>
        </div>
        <div>
          <dt>Serves</dt>
          <dd className="stepper">
            <button aria-label="Fewer servings" onClick={() => setServings(servings - 1)}>
              −
            </button>
            <span aria-live="polite">{servings}</span>
            <button aria-label="More servings" onClick={() => setServings(servings + 1)}>
              +
            </button>
          </dd>
        </div>
        <div>
          <dt>Cooked</dt>
          <dd>{n === 0 ? 'Not yet' : n === 1 ? 'Once' : `${n} times`}</dd>
        </div>
      </dl>

      {flags.length > 0 && (
        <ul className="flags" aria-label="Notes for your profile">
          {flags.map((f) => (
            <li key={f.text} className={`flag ${f.level}`}>{f.text}</li>
          ))}
        </ul>
      )}

      <section>
        <div className="h-row">
          <h2>Per serving</h2>
          <span className="cost-pill">{money(facts.perServingCost)} a serving</span>
        </div>
        <MacroBar m={facts.perServing} label="Where the calories come from" />
        <NutritionPanel m={facts.perServing} t={t} />
        <p className="muted small">
          About {money(facts.perServingCost * servings)} for {servings} serving{servings > 1 ? 's' : ''}, counting only what the recipe uses. Estimates from typical values;{' '}
          <a href="#/prices">edit prices</a>.
        </p>
        <button
          className="btn ghost small"
          onClick={() =>
            update((s) => ({
              ...s,
              plan: planned ? s.plan.filter((p) => !(p.kind === 'recipe' && p.id === r.id)) : [...s.plan, { kind: 'recipe', id: r.id, servings: 1 }],
            }))
          }
        >
          {planned ? 'Remove from today’s plan' : 'Add a serving to today’s plan'}
        </button>
      </section>

      <section className="why">
        <h2>What this teaches you</h2>
        <p>{r.why}</p>
      </section>

      {r.timeline && (
        <section>
          <h2>Party timeline</h2>
          <ol className="timeline">
            {r.timeline.map((t) => (
              <li key={t.when}>
                <strong>{t.when}</strong>
                <span>{t.what}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <div className="h-row">
          <h2>Ingredients</h2>
          <div className="row">
            {inList && (
              <button className="btn ghost small" onClick={() => removeRecipeFromGroceries(r.id)}>
                Remove
              </button>
            )}
            <button className="btn ghost small" onClick={() => addRecipeToGroceries(r, scale)}>
              {inList ? 'Update groceries' : 'Add to groceries'}
            </button>
          </div>
        </div>
        <ul className="ingredients">
          {r.ingredients.map((i, k) => (
            <li key={k}>
              <span className="qty">{i.qty !== undefined ? formatQty(i.qty * scale) : ''}</span>
              <span>
                {ingredientLine(i, scale, false)}
                {i.note && <span className="note">, {i.note}</span>}
              </span>
            </li>
          ))}
        </ul>
        {scale !== 1 && <p className="muted small">Cooking times stay about the same, but use a bigger pan so nothing is crowded.</p>}
      </section>

      <section>
        <h2>Equipment</h2>
        <p>{r.equipment.join(', ')}</p>
      </section>

      <section>
        <h2>Method</h2>
        <ol className="steps">
          {r.steps.map((s) => (
            <li key={s.title}>
              <h3>
                {s.title}
                {s.timer && <span className="chip">{formatTimer(s.timer)}</span>}
              </h3>
              <p>{s.text}</p>
              {s.tip && <p className="tip">{s.tip}</p>}
            </li>
          ))}
        </ol>
        {r.doneness && (
          <p className="done-note">
            <strong>You’re done when:</strong> {r.doneness}
          </p>
        )}
      </section>

      <section>
        <h2>If it goes wrong</h2>
        {r.fixes.map((f) => (
          <details key={f.problem} className="fix">
            <summary>{f.problem}</summary>
            <p>{f.fix}</p>
          </details>
        ))}
      </section>

      <section>
        <h2>Make it yours</h2>
        {r.variations.map((v) => (
          <div key={v.name} className="variation">
            <h3>{v.name}</h3>
            <p>{v.how}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Your cooks</h2>
        {logs.length === 0 && !logging && <p className="muted">Nothing logged yet. Cook it, then come back and write down how it went.</p>}
        {logs.map((l, i) => (
          <div key={i} className="log">
            <span className="stars" aria-label={`${l.rating} out of 5`}>
              {'●'.repeat(l.rating)}
              <span className="dim">{'●'.repeat(5 - l.rating)}</span>
            </span>
            <span className="muted small">{new Date(l.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            {l.note && <p>{l.note}</p>}
          </div>
        ))}
        {logging ? (
          <LogForm id={r.id} onDone={() => setLogging(false)} />
        ) : (
          <button className="btn ghost" onClick={() => setLogging(true)}>
            Log a cook
          </button>
        )}
      </section>

      <div className="sticky-cta">
        <button className="btn yolk big" onClick={() => go(`/cook/${r.id}`)}>
          Start cooking
        </button>
      </div>
    </article>
  )
}

export function LogForm({ id, onDone }: { id: string; onDone: () => void }) {
  const [, update] = useStore()
  const [rating, setRating] = useState(4)
  const [note, setNote] = useState('')
  return (
    <form
      className="log-form"
      onSubmit={(e) => {
        e.preventDefault()
        update((s) => ({
          ...s,
          logs: { ...s.logs, [id]: [...(s.logs[id] ?? []), { date: new Date().toISOString(), rating, note: note.trim() }] },
        }))
        onDone()
      }}
    >
      <fieldset>
        <legend>How did it turn out?</legend>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((v) => (
            <label key={v} className={v <= rating ? 'on' : ''}>
              <input type="radio" name="rating" value={v} checked={rating === v} onChange={() => setRating(v)} />
              <span className="sr">{v}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field">
        Notes for next time
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Needed more salt. Eggs were great at medium-low." />
      </label>
      <div className="row">
        <button className="btn yolk" type="submit">
          Save cook
        </button>
        <button className="btn ghost" type="button" onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  )
}
