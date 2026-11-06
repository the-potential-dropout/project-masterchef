import { allBranches, branches, trunk, BRANCH_UNLOCK_UNITS } from '../data'
import type { Branch, Unit } from '../data/courseTypes'
import { streak, today, totalXp, useStore, type AppState } from '../lib/store'
import { Mascot } from '../components/Mascot'
import { photoUrl } from '../data/photos'

export function unitDone(u: Unit, s: AppState) {
  return u.lessons.every((l) => s.lessons[l.id])
}
export function branchesUnlocked(s: AppState) {
  return trunk.units.slice(0, BRANCH_UNLOCK_UNITS).every((u) => unitDone(u, s))
}
export function nextLesson(s: AppState) {
  for (const b of allBranches) for (const u of b.units) for (const l of u.lessons) if (!s.lessons[l.id]) return { lesson: l, unit: u, branch: b }
  return undefined
}

function XpBar({ s }: { s: AppState }) {
  const xp = s.xpDays[today()] ?? 0
  const pct = Math.min(100, (xp / s.dailyGoal) * 100)
  const st = streak(s)
  return (
    <div className="xpbar">
      <Mascot className="xp-mascot" size={56} mood={xp >= s.dailyGoal ? 'cheer' : st > 0 ? 'happy' : 'sleep'} />
      <div className="xp-stats">
        <span>
          <strong>{st}</strong> day streak {st > 0 ? '🔥' : ''}
        </span>
        <span>
          <strong>{totalXp(s)}</strong> XP total
        </span>
      </div>
      <div className="goal" role="img" aria-label={`${xp} of ${s.dailyGoal} XP today`}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="muted small">{xp >= s.dailyGoal ? 'Daily goal done. Nice.' : `${xp} / ${s.dailyGoal} XP today`}</p>
    </div>
  )
}

function UnitPath({ unit, s, locked, go }: { unit: Unit; s: AppState; locked: boolean; go: (to: string) => void }) {
  const firstOpen = unit.lessons.findIndex((l) => !s.lessons[l.id])
  return (
    <section className={`unit ${locked ? 'locked' : ''}`}>
      <header className="unit-head">
        <span className="unit-glyph" aria-hidden="true">{unit.glyph}</span>
        <div>
          <h2>{unit.title}</h2>
          <p className="muted small">{unit.blurb}</p>
        </div>
      </header>
      <ol className="nodes">
        {unit.lessons.map((l, i) => {
          const rec = s.lessons[l.id]
          const state = rec ? 'done' : i === firstOpen && !locked ? 'current' : 'todo'
          return (
            <li key={l.id} className={`node-row ${i % 2 ? 'right' : 'left'}`}>
              <button className={`node ${state}`} onClick={() => go(`/lesson/${l.id}`)} aria-label={`${l.title}${rec ? ', done' : ''}`}>
                {rec ? (rec.best === 1 ? '★' : '✓') : state === 'current' ? '▶' : i + 1}
              </button>
              <span className="node-label">
                {l.title}
                {l.recipeId && <span className="muted small"> · cook it</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function Learn({ branchId, go }: { branchId?: string; go: (to: string) => void }) {
  const [s] = useStore()
  const open = branchesUnlocked(s)
  const branch: Branch | undefined = branchId ? allBranches.find((b) => b.id === branchId) : undefined

  if (branch) {
    return (
      <>
        <a className="back" href="#/learn">← All courses</a>
        <h1 className="page-title">{branch.glyph} {branch.title}</h1>
        <p className="lede">{branch.blurb}</p>
        {branch.id !== 'foundations' && !open && (
          <p className="notice">World kitchens open after the first {BRANCH_UNLOCK_UNITS} Foundations units, but you can start any lesson now.</p>
        )}
        {branch.units.map((u, i) => (
          <UnitPath key={u.id} unit={u} s={s} go={go} locked={i > 0 && !unitDone(branch.units[i - 1], s)} />
        ))}
      </>
    )
  }

  const next = nextLesson(s)
  return (
    <>
      <h1 className="page-title">Learn</h1>
      <XpBar s={s} />
      {next && (
        <button className="continue" onClick={() => go(`/lesson/${next.lesson.id}`)}>
          <span className="muted small">{Object.keys(s.lessons).length ? 'Continue' : 'Start here'}: {next.branch.title}</span>
          <strong>{next.lesson.title}</strong>
        </button>
      )}

      <h2 className="section-h">{trunk.glyph} {trunk.title}</h2>
      <p className="muted">{trunk.blurb}</p>
      {trunk.units.map((u, i) => (
        <UnitPath key={u.id} unit={u} s={s} go={go} locked={i > 0 && !unitDone(trunk.units[i - 1], s)} />
      ))}

      <BranchGrid title="🌍 World kitchens" list={branches.filter((b) => !b.group || b.group === 'world')} s={s} open={open} intro={open ? 'Each branch teaches a cuisine’s pantry, techniques and signature dishes.' : `Finish the first ${BRANCH_UNLOCK_UNITS} Foundations units to unlock these. You can peek inside any time.`} />
      <BranchGrid title="🕘 Through the day" list={branches.filter((b) => b.group === 'day')} s={s} open={open} intro="Breakfasts, soups, salads, snacks, desserts, smoothies, café drinks and cocktails." />
      <BranchGrid title="🌿 Eat your way" list={branches.filter((b) => b.group === 'diet')} s={s} open={open} intro="Plant-based and seafood cooking." />
      <p className="ref-link">
        <a href="#/reference">Open the cheat sheets</a>: temperatures, oils, tools, cooking times and food safety.
      </p>
    </>
  )
}

function BranchGrid({ title, list, s, open, intro }: { title: string; list: Branch[]; s: AppState; open: boolean; intro: string }) {
  return (
    <>
      <h2 className="section-h">{title}</h2>
      <p className="muted">{intro}</p>
      <div className="branch-grid">
        {list.map((b) => {
          const lessons = b.units.flatMap((u) => u.lessons)
          const done = lessons.filter((l) => s.lessons[l.id]).length
          const cover = lessons.find((l) => l.recipeId)?.recipeId
          const img = cover ? photoUrl(cover, 360) : undefined
          return (
            <a key={b.id} href={`#/learn/${b.id}`} className={`branch ${open ? '' : 'dim'}`}>
              <span className="branch-cover" style={img ? { backgroundImage: `url("${img}")` } : undefined}>
                <span className="branch-glyph" aria-hidden="true">{b.glyph}</span>
              </span>
              <span className="branch-text">
                <strong>{b.title}</strong>
                <span className="muted small">{done}/{lessons.length} lessons</span>
                <span className="mini-bar"><span style={{ width: `${(done / lessons.length) * 100}%` }} /></span>
              </span>
            </a>
          )
        })}
      </div>
    </>
  )
}
