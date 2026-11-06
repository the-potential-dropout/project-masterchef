import type { Question } from '../data/courseTypes'
import { mc, num, order, match } from '../data/courseTypes'
import { cookTimes, doneness, oils, tools } from '../data/reference'
import type { Recipe } from '../data/types'
import { formatTimer } from './format'

export function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}
export const sample = <T,>(a: T[], n: number) => shuffle(a).slice(0, n)
const uniq = <T,>(a: T[]) => [...new Set(a)]

/** Wrong answers drawn from a pool, never equal to the right one. */
function distractors(pool: string[], correct: string, n = 3) {
  return sample(uniq(pool).filter((x) => x !== correct), n)
}

// ── reference-table generators ──

export function donenessQs(n = 6): Question[] {
  const qs: Question[] = []
  const temps = uniq(doneness.map((d) => `${d.f}°F (${d.c}°C)`))
  for (const d of sample(doneness.filter((d) => d.f <= 165), n)) {
    const right = `${d.f}°F (${d.c}°C)`
    qs.push(
      Math.random() < 0.5
        ? mc(`What internal temperature should ${d.food.toLowerCase()} reach?`, right, distractors(temps, right), d.note)
        : num(`Safe internal temperature for ${d.food.toLowerCase()}, in °F?`, d.f, '°F', 0, d.note),
    )
  }
  const d = sample(doneness, 1)[0]
  qs.push(mc(`Best tool to cook ${d.food.toLowerCase()} (${d.method.toLowerCase()})?`, d.tool, distractors(doneness.map((x) => x.tool), d.tool), `${d.heat}, ${d.time}.`))
  return qs
}

export function oilQs(n = 6): Question[] {
  const qs: Question[] = []
  const four = sample(oils, 4)
  const hi = [...four].sort((a, b) => b.smokeF - a.smokeF)[0]
  qs.push(mc('Which of these has the highest smoke point?', hi.name, four.filter((o) => o !== hi).map((o) => o.name), `${hi.name}: about ${hi.smokeF}°F.`))
  const sat = [...sample(oils, 4)].sort((a, b) => b.satFatPct - a.satFatPct)
  qs.push(mc('Which is highest in saturated fat?', sat[0].name, sat.slice(1).map((o) => o.name), `${sat[0].name} is about ${sat[0].satFatPct}% saturated fat.`))
  for (const o of sample(oils, n - 3)) {
    qs.push(mc(`What is ${o.name.toLowerCase()} best for?`, o.bestFor, distractors(oils.map((x) => x.bestFor), o.bestFor), `Pros: ${o.pros}. Cons: ${o.cons}.`))
  }
  const m = sample(oils, 4)
  qs.push(match('Match each fat to its best use', m.map((o) => [o.name, o.bestFor.split(',')[0]])))
  return qs
}

export function toolQs(n = 6): Question[] {
  const qs: Question[] = []
  for (const t of sample(tools, n - 1)) {
    qs.push(
      Math.random() < 0.5
        ? mc(`Which tool is best for: ${t.use.toLowerCase()}?`, t.name, distractors(tools.map((x) => x.name), t.name), t.settings)
        : mc(`How should you use the ${t.name.toLowerCase().replace('stovetop: ', 'stovetop on ')}?`, t.settings, distractors(tools.map((x) => x.settings), t.settings)),
    )
  }
  const m = sample(tools.filter((t) => !t.name.startsWith('Stovetop')), 4)
  qs.push(match('Match each tool to its job', m.map((t) => [t.name, t.use.split(',')[0]])))
  return qs
}

export function cookTimeQs(n = 5): Question[] {
  const qs: Question[] = []
  for (const c of sample(cookTimes, n)) {
    qs.push(mc(`How long does ${c.food.toLowerCase()} take?`, c.time, distractors(cookTimes.map((x) => x.time), c.time), `${c.how}${c.ratio ? `. Ratio: ${c.ratio}` : ''}.`))
  }
  const withRatio = cookTimes.filter((c) => c.ratio && c.ratio.includes(':'))
  const r = sample(withRatio, 1)[0]
  qs.push(mc(`What is the water ratio for ${r.food.toLowerCase()}?`, r.ratio!, distractors(withRatio.map((x) => x.ratio!), r.ratio!)))
  return qs
}

// ── recipe drills: memorise a dish ──

export function recipeDrill(r: Recipe, all: Recipe[]): Question[] {
  const qs: Question[] = []
  const others = all.filter((x) => x.id !== r.id)
  const mine = new Set(r.ingredients.map((i) => i.item.toLowerCase()))
  const foreign = uniq(others.flatMap((x) => x.ingredients.map((i) => i.item.toLowerCase()))).filter((i) => !mine.has(i) && !/water|salt|pepper|oil/.test(i))

  // steps in order
  const stepTitles = r.steps.map((s) => s.title)
  const start = Math.max(0, Math.floor(Math.random() * Math.max(1, stepTitles.length - 4)))
  qs.push(order(`Put the steps for ${r.title.toLowerCase()} in order`, stepTitles.slice(start, start + 5)))

  // which ingredient belongs
  const seen = new Set<string>()
  const keyIngs = r.ingredients.filter((i) => {
    const k = i.item.toLowerCase()
    if (/water|salt|pepper|oil/.test(k) || seen.has(k)) return false
    seen.add(k)
    return true
  })
  for (const ing of sample(keyIngs, 2)) {
    qs.push(mc(`Which of these goes into ${r.title.toLowerCase()}?`, ing.item, sample(foreign, 3)))
  }
  // which does NOT belong
  const odd = sample(foreign, 1)[0]
  if (odd) qs.push(mc(`Which of these is NOT in ${r.title.toLowerCase()}?`, odd, sample(keyIngs, 3).map((i) => i.item)))

  // amounts
  const amt = sample(r.ingredients.filter((i) => i.qty !== undefined && i.unit && !/salt|water/.test(i.item)), 1)[0]
  if (amt) {
    const fmt = (q: number) => `${+q.toFixed(2)} ${amt.unit}`
    const right = fmt(amt.qty!)
    const wrong = uniq([amt.qty! * 2, amt.qty! / 2, amt.qty! * 3, amt.qty! + 1].map(fmt)).filter((x) => x !== right).slice(0, 3)
    qs.push(mc(`For ${r.servings} servings of ${r.title.toLowerCase()}, how much ${amt.item}?`, right, wrong))
  }

  // timings
  const timed = sample(r.steps.filter((s) => s.timer && s.timer >= 60), 1)[0]
  if (timed) {
    const right = formatTimer(timed.timer!)
    const wrong = uniq([timed.timer! * 2, Math.round(timed.timer! / 2), timed.timer! + 600].map(formatTimer)).filter((x) => x !== right)
    qs.push(mc(`${r.title}: how long for “${timed.title.toLowerCase()}”?`, right, wrong, timed.text))
  }

  // the technique and a fix
  qs.push(mc(`What technique does ${r.title.toLowerCase()} teach?`, r.skill, sample(uniq(others.map((x) => x.skill)).filter((s) => s !== r.skill), 3)))
  const fix = sample(r.fixes, 1)[0]
  if (fix) {
    const otherFixes = others.flatMap((x) => x.fixes.map((f) => f.fix))
    qs.push(mc(`${r.title}: “${fix.problem}.” What should you do?`, fix.fix, sample(otherFixes, 3)))
  }
  const tip = sample(r.steps.filter((s) => s.tip), 1)[0]
  if (tip) {
    const otherTips = others.flatMap((x) => x.steps.filter((s) => s.tip).map((s) => s.tip!))
    qs.push(mc(`${r.title}, step “${tip.title.toLowerCase()}”: which tip goes with it?`, tip.tip!, sample(otherTips, 3)))
  }
  return qs
}
