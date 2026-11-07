import { useMemo, useState } from 'react'
import { allRecipes, getRecipe } from '../data'
import { quickFoods } from '../data/quickFoods'
import {
  ACTIVITY, ALLERGENS, CONDITIONS, GOALS, bmi, bodyFor, defaultProfile, dietOk, screenRecipe, supplements, targets,
  type Activity, type Diet, type FishFreq, type Goal, type Profile, type Sex, type Targets,
} from '../lib/health'
import { addMacros, recipeFacts, zeroMacros, type Macros } from '../lib/nutrition'
import { useStore, type PlanEntry } from '../lib/store'
import { NutritionPanel } from '../components/NutritionPanel'
import { money } from '../lib/groceries'
import { MacroBar } from '../components/Charts'
import { Mascot } from '../components/Mascot'

function ProfileForm({ initial, onSave, onCancel }: { initial: Profile; onSave: (p: Profile) => void; onCancel?: () => void }) {
  const [p, setP] = useState<Profile>(initial)
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((x) => ({ ...x, [k]: v }))
  const toggle = (k: 'allergies' | 'conditions', v: string) =>
    setP((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v] }))
  const ft = Math.floor(p.heightCm / 2.54 / 12)
  const inch = Math.round(p.heightCm / 2.54 - ft * 12)

  return (
    <form
      className="profile-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSave(p)
      }}
    >
      <fieldset className="units-toggle">
        <legend className="sr">Units</legend>
        <label className={!p.imperial ? 'on' : ''}><input type="radio" checked={!p.imperial} onChange={() => set('imperial', false)} /> kg / cm</label>
        <label className={p.imperial ? 'on' : ''}><input type="radio" checked={p.imperial} onChange={() => set('imperial', true)} /> lb / ft</label>
      </fieldset>
      <div className="grid2">
        <label className="field">
          Age
          <input type="number" min={18} max={100} value={p.age} onChange={(e) => set('age', Number(e.target.value))} required />
        </label>
        <label className="field">
          Sex (for the calorie formula)
          <select value={p.sex} onChange={(e) => set('sex', e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unspecified">Prefer not to say (uses an average)</option>
          </select>
        </label>
        {p.imperial ? (
          <>
            <label className="field">
              Height
              <span className="pair">
                <input type="number" min={3} max={8} value={ft} onChange={(e) => set('heightCm', (Number(e.target.value) * 12 + inch) * 2.54)} aria-label="Feet" /> ft
                <input type="number" min={0} max={11} value={inch} onChange={(e) => set('heightCm', (ft * 12 + Number(e.target.value)) * 2.54)} aria-label="Inches" /> in
              </span>
            </label>
            <label className="field">
              Weight (lb)
              <input type="number" min={70} max={700} value={Math.round(p.weightKg * 2.2046)} onChange={(e) => set('weightKg', Number(e.target.value) / 2.2046)} />
            </label>
          </>
        ) : (
          <>
            <label className="field">
              Height (cm)
              <input type="number" min={120} max={230} value={Math.round(p.heightCm)} onChange={(e) => set('heightCm', Number(e.target.value))} />
            </label>
            <label className="field">
              Weight (kg)
              <input type="number" min={30} max={300} value={Math.round(p.weightKg)} onChange={(e) => set('weightKg', Number(e.target.value))} />
            </label>
          </>
        )}
      </div>
      {p.age < 18 && <p className="notice">These targets are designed for adults. Teens have different needs; a doctor or dietitian can help.</p>}

      <fieldset>
        <legend>How active are you?</legend>
        {(Object.keys(ACTIVITY) as Activity[]).map((a) => (
          <label key={a} className={`radio-card ${p.activity === a ? 'on' : ''}`}>
            <input type="radio" name="activity" checked={p.activity === a} onChange={() => set('activity', a)} />
            <span><strong>{ACTIVITY[a][0]}</strong><span className="muted small">{ACTIVITY[a][2]}</span></span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Your goal</legend>
        {(Object.keys(GOALS) as Goal[]).map((g) => (
          <label key={g} className={`radio-card ${p.goal === g ? 'on' : ''}`}>
            <input type="radio" name="goal" checked={p.goal === g} onChange={() => set('goal', g)} />
            <span><strong>{GOALS[g][0]}</strong><span className="muted small">{GOALS[g][1]}</span></span>
          </label>
        ))}
      </fieldset>

      <div className="grid2">
        <label className="field">
          Diet
          <select value={p.diet} onChange={(e) => set('diet', e.target.value as Diet)}>
            <option value="omnivore">I eat everything</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </label>
        <label className="field">
          Fatty fish (salmon, sardines)
          <select value={p.fish} onChange={(e) => set('fish', e.target.value as FishFreq)}>
            <option value="rarely">Rarely or never</option>
            <option value="sometimes">About once a week</option>
            <option value="often">Twice a week or more</option>
          </select>
        </label>
      </div>
      <label className="check"><input type="checkbox" checked={p.halal} onChange={(e) => set('halal', e.target.checked)} /> I eat halal (no pork or alcohol)</label>
      <label className="check"><input type="checkbox" checked={p.noAlcohol} onChange={(e) => set('noAlcohol', e.target.checked)} /> No alcohol in cooking</label>

      <fieldset>
        <legend>Allergies or things you avoid</legend>
        <div className="chips">
          {ALLERGENS.map((a) => (
            <label key={a} className={`chip-check ${p.allergies.includes(a) ? 'on' : ''}`}>
              <input type="checkbox" checked={p.allergies.includes(a)} onChange={() => toggle('allergies', a)} /> {a}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Health conditions to account for</legend>
        {Object.entries(CONDITIONS).map(([k, [label, hint]]) => (
          <label key={k} className={`radio-card ${p.conditions.includes(k) ? 'on' : ''}`}>
            <input type="checkbox" checked={p.conditions.includes(k)} onChange={() => toggle('conditions', k)} />
            <span><strong>{label}</strong><span className="muted small">{hint}</span></span>
          </label>
        ))}
      </fieldset>
      {p.sex !== 'male' && (
        <label className="check">
          <input type="checkbox" checked={p.couldBecomePregnant} onChange={(e) => set('couldBecomePregnant', e.target.checked)} /> I could become pregnant (affects folic acid advice)
        </label>
      )}
      <p className="muted small">Saved only on this device. Nothing is sent anywhere.</p>
      <div className="row">
        <button className="btn yolk" type="submit">Save profile</button>
        {onCancel && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

function TargetCard({ t, p }: { t: Targets; p: Profile }) {
  const b = bmi(p)
  return (
    <section className="targets">
      <div className="t-big">
        <span className="t-kcal">{t.kcal.toLocaleString()}</span>
        <span className="muted">calories a day</span>
      </div>
      <dl className="t-grid">
        <div><dt>Protein</dt><dd>{t.protein} g</dd></div>
        <div><dt>Carbs</dt><dd>{t.carbs} g</dd></div>
        <div><dt>Fat</dt><dd>{t.fat} g</dd></div>
        <div><dt>Fibre</dt><dd>{t.fiber}+ g</dd></div>
        <div><dt>Sat fat</dt><dd>under {t.satFat} g</dd></div>
        <div><dt>Sodium</dt><dd>under {t.sodium.toLocaleString()} mg</dd></div>
      </dl>
      <p className="muted small">
        Your body burns about {t.bmr.toLocaleString()} kcal at rest and {t.tdee.toLocaleString()} with your activity (Mifflin-St Jeor equation). BMI {b.toFixed(1)}, which is a rough screening number only. Water: about {t.waterL} L a day from all drinks and food.
      </p>
      <BodyCard p={p} />
      {t.notes.map((n) => <p key={n} className="notice">{n}</p>)}
    </section>
  )
}

function BodyCard({ p }: { p: Profile }) {
  const body = bodyFor(p)
  // scale runs BMI 15–35; the green band is the healthy range for your height
  const pos = (v: number) => `${Math.min(100, Math.max(0, ((v - 15) / 20) * 100))}%`
  const kg = (v: number) => Math.round(v)
  const lb = (v: number) => Math.round(v * 2.2046)
  const ft = Math.floor(p.heightCm / 2.54 / 12)
  const inch = Math.round(p.heightCm / 2.54 - ft * 12)
  const words = { under: 'below the range', in: 'inside the range', over: 'a little above the range', 'well-over': 'above the range' }[body.band]
  return (
    <div className="body-card">
      <h3>Built for your height</h3>
      <p className="small">
        At {Math.round(p.heightCm)} cm ({ft}′{inch}″), a healthy weight range is about <strong>{kg(body.lo)}–{kg(body.hi)} kg</strong> ({lb(body.lo)}–{lb(body.hi)} lb). You are {words}.
      </p>
      <div className="bmi-scale" role="img" aria-label={`BMI ${body.bmi.toFixed(1)}; healthy range 18.5 to 24.9`}>
        <span className="bmi-band" style={{ left: pos(18.5), width: `calc(${pos(24.9)} - ${pos(18.5)})` }} />
        <span className="bmi-dot" style={{ left: pos(body.bmi) }} />
      </div>
      <div className="bmi-legend small muted"><span>{kg(15 * (p.heightCm / 100) ** 2)} kg</span><span>you: {kg(p.weightKg)} kg</span><span>{kg(35 * (p.heightCm / 100) ** 2)} kg</span></div>
      <p className="muted small">
        Height sets your resting burn, your protein reference weight ({kg(body.refWeight)} kg) and your portion sizes on every recipe. BMI ignores muscle, so a lifter can sit "above" and be perfectly healthy.
      </p>
    </div>
  )
}

function suggestions(total: Macros, t: Targets, p: Profile) {
  const left = { kcal: t.kcal - total.kcal, protein: t.protein - total.protein, fiber: t.fiber - total.fiber }
  const ok = quickFoods.filter((f) => !f.tags.some((x) => p.allergies.includes(x)) && (p.diet !== 'vegan' || f.tags.includes('vegan')) && !(p.diet === 'vegetarian' && ['tuna', 'salmon', 'chicken'].includes(f.id)) && !(p.diet === 'pescatarian' && f.id === 'chicken'))
  const out: { text: string; foods: typeof quickFoods }[] = []
  if (left.kcal < -150) out.push({ text: `You are about ${Math.round(-left.kcal)} kcal over today’s target. No stress, one day does not matter; tomorrow just balances out.`, foods: [] })
  if (left.protein > 15) {
    const foods = ok.filter((f) => f.m.kcal <= Math.max(left.kcal, 150) + 50).sort((a, b) => b.m.protein / b.m.kcal - a.m.protein / a.m.kcal).slice(0, 3)
    out.push({ text: `${Math.round(left.protein)} g protein to go. Easy add-ons:`, foods })
  }
  if (left.fiber > 6) {
    const foods = ok.sort((a, b) => b.m.fiber - a.m.fiber).slice(0, 3)
    out.push({ text: `${Math.round(left.fiber)} g fibre to go. Try:`, foods })
  }
  if (total.sodium > t.sodium) out.push({ text: `Sodium is ${Math.round(total.sodium - t.sodium)} mg over. Go easy on soy sauce, broth and cheese for the rest of the day, and drink water.`, foods: [] })
  if (!out.length && total.kcal > 0) out.push({ text: 'This day looks balanced. Nicely done.', foods: [] })
  return out
}

/** protein and fibre density of a meal */
const score = (m: Macros) => (m.protein * 4 + m.fiber * 8) / m.kcal

export function Health({ go }: { go: (to: string) => void }) {
  const [s, update] = useStore()
  const [editing, setEditing] = useState(false)
  const [addRecipe, setAddRecipe] = useState('')
  const p = s.profile
  const t = useMemo(() => (p ? targets(p) : null), [p])

  const planRows = s.plan.map((e, i) => {
    if (e.kind === 'recipe') {
      const r = getRecipe(e.id)
      if (!r) return null
      const f = recipeFacts(r, s.prices)
      return { i, e, name: r.title, portion: `${e.servings} serving${e.servings === 1 ? '' : 's'}`, m: f.perServing, cost: f.perServingCost * e.servings, href: `#/recipe/${r.id}` }
    }
    const f = quickFoods.find((x) => x.id === e.id)
    if (!f) return null
    return { i, e, name: f.name, portion: e.servings === 1 ? f.portion : `${e.servings} × ${f.portion}`, m: f.m, cost: undefined, href: undefined }
  }).filter((x) => !!x)
  const total = planRows.reduce((acc, r) => addMacros(acc, r!.m, r!.e.servings), zeroMacros())
  const setPlan = (fn: (pl: PlanEntry[]) => PlanEntry[]) => update((st) => ({ ...st, plan: fn(st.plan) }))
  const addFood = (id: string) => setPlan((pl) => {
    const ex = pl.find((x) => x.kind === 'food' && x.id === id)
    return ex ? pl.map((x) => (x === ex ? { ...x, servings: x.servings + 1 } : x)) : [...pl, { kind: 'food', id, servings: 1 }]
  })

  if (!p || editing) {
    return (
      <>
        <h1 className="page-title">Health</h1>
        <Mascot size={84} mood="happy" className="health-mascot" />
        <p className="lede">
          {p ? 'Update your profile.' : 'Tell the app a little about you and it will set daily targets, check every recipe against your diet and conditions, and suggest supplements worth asking about.'}
        </p>
        <ProfileForm
          initial={p ?? defaultProfile}
          onSave={(np) => {
            update((st) => ({ ...st, profile: np }))
            setEditing(false)
          }}
          onCancel={p ? () => setEditing(false) : undefined}
        />
        <p className="disclaimer">General information, not medical advice. If you have a health condition, are pregnant, or take medication, check with your doctor, pharmacist or a registered dietitian.</p>
      </>
    )
  }

  const fits = allRecipes
    .filter((r) => dietOk(r, p))
    .map((r) => ({ r, f: recipeFacts(r, s.prices) }))
    .filter(({ f }) => f.perServing.kcal >= 250)
    .filter(({ r, f }) => !screenRecipe(r, f.perServing, p, t!).some((x) => x.level !== 'info'))
    .sort((a, b) => score(b.f.perServing) - score(a.f.perServing))
    .slice(0, 5)

  return (
    <>
      <div className="h-row">
        <h1 className="page-title">Health</h1>
        <button className="btn ghost small" onClick={() => setEditing(true)}>Edit profile</button>
      </div>
      <p className="muted">
        {GOALS[p.goal][0]}, {ACTIVITY[p.activity][0].toLowerCase()}, {p.diet === 'omnivore' ? 'eats everything' : p.diet}
        {p.allergies.length ? `, avoids ${p.allergies.join(', ')}` : ''}.
      </p>
      <TargetCard t={t!} p={p} />

      <section>
        <h2 className="section-h">Today’s plate</h2>
        <p className="muted small">Build a day of meals and see how it stacks up. Recipes count one serving each; tap + for seconds.</p>
        {planRows.length > 0 && (
          <ul className="plan">
            {planRows.map((row) => (
              <li key={row!.i}>
                <span className="gl-body">
                  {row!.href ? <a href={row!.href}>{row!.name}</a> : <span>{row!.name}</span>}
                  <span className="muted small">
                    {row!.portion}, {Math.round(row!.m.kcal * row!.e.servings)} kcal, {Math.round(row!.m.protein * row!.e.servings)} g protein{row!.cost !== undefined ? `, ${money(row!.cost)}` : ''}
                  </span>
                </span>
                <span className="stepper">
                  <button aria-label="Less" onClick={() => setPlan((pl) => pl.map((x, k) => (k === row!.i ? { ...x, servings: x.servings - 1 } : x)).filter((x) => x.servings > 0))}>−</button>
                  <button aria-label="More" onClick={() => setPlan((pl) => pl.map((x, k) => (k === row!.i ? { ...x, servings: x.servings + 1 } : x)))}>+</button>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="plan-add">
          <label className="select">
            <span className="sr">Add a recipe</span>
            <select value={addRecipe} onChange={(e) => {
              const id = e.target.value
              if (id) setPlan((pl) => [...pl, { kind: 'recipe', id, servings: 1 }])
              setAddRecipe('')
            }}>
              <option value="">+ Add a recipe…</option>
              {allRecipes.filter((r) => dietOk(r, p)).map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
            </select>
          </label>
          <label className="select">
            <span className="sr">Add a quick food</span>
            <select value="" onChange={(e) => e.target.value && addFood(e.target.value)}>
              <option value="">+ Add a snack or side…</option>
              {quickFoods.map((f) => <option key={f.id} value={f.id}>{f.name} ({f.portion})</option>)}
            </select>
          </label>
        </div>
        {planRows.length > 0 && (
          <>
            <div className="split-compare">
              <MacroBar m={total} label="Today’s calorie split" />
              <MacroBar m={{ protein: t!.protein, fat: t!.fat, carbs: t!.carbs }} label="Your target split" />
            </div>
            <NutritionPanel m={total} t={t} of="of target" />
            <div className="suggest">
              {suggestions(total, t!, p).map((sg) => (
                <div key={sg.text}>
                  <p>{sg.text}</p>
                  {sg.foods.length > 0 && (
                    <div className="row">
                      {sg.foods.map((f) => (
                        <button key={f.id} className="btn ghost small" onClick={() => addFood(f.id)}>+ {f.name}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="row">
              <button className="btn ghost small" onClick={() => go('/groceries')}>Shop for this plan</button>
              <button className="btn ghost small" onClick={() => setPlan(() => [])}>Clear the day</button>
            </div>
          </>
        )}
        <p className="muted small plate-tip">Balanced plate rule of thumb (Canada’s Food Guide): half vegetables and fruit, a quarter protein, a quarter whole grains, and water to drink.</p>
      </section>

      <section>
        <h2 className="section-h">Good fits for you</h2>
        <p className="muted small">Full meals that fit your diet and conditions, ranked by protein and fibre per calorie.</p>
        <ul className="fit-list">
          {fits.map(({ r, f }) => (
            <li key={r.id}>
              <a href={`#/recipe/${r.id}`}>
                <strong>{r.title}</strong>
                <span className="muted small">{Math.round(f.perServing.kcal)} kcal, {Math.round(f.perServing.protein)} g protein, {Math.round(f.perServing.fiber)} g fibre, {money(f.perServingCost)}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-h">Supplements and vitamins</h2>
        <p className="muted small">Based on your profile. Food comes first; these are worth discussing with your doctor or pharmacist, especially if you take any medication.</p>
        {supplements(p).map((sp) => (
          <details key={sp.name} className="supp">
            <summary>
              <span className={`badge ${sp.strength}`}>{sp.strength === 'recommended' ? 'Recommended' : sp.strength === 'consider' ? 'Worth considering' : 'Optional'}</span>
              <strong>{sp.name}</strong>
            </summary>
            <dl>
              <div><dt>Why</dt><dd>{sp.why}</dd></div>
              <div><dt>Food first</dt><dd>{sp.food}</dd></div>
              <div><dt>Amount</dt><dd>{sp.amount}</dd></div>
              <div><dt>Careful</dt><dd>{sp.caution}</dd></div>
            </dl>
          </details>
        ))}
      </section>
      <p className="disclaimer">
        General information, not medical advice. Calorie and macro targets are estimates from standard equations. Nutrition numbers are estimates from typical values. If you have a health condition, are pregnant, or take medication, check with your doctor, pharmacist or a registered dietitian. If tracking food ever starts to feel stressful or obsessive, step back and talk to someone you trust or a professional.
      </p>
    </>
  )
}
