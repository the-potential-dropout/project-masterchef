import { recipes } from '../data/recipes'
import { timesCooked, useStore } from '../lib/store'
import { formatMinutes } from '../lib/format'

function Pips({ n }: { n: number }) {
  return (
    <span className="pips" aria-label={n >= 2 ? 'Learned' : n === 1 ? 'Cooked once' : 'Not cooked yet'}>
      <i className={n >= 1 ? 'full' : ''} />
      <i className={n >= 2 ? 'full' : ''} />
    </span>
  )
}

export function Path({ go }: { go: (to: string) => void }) {
  const [state] = useStore()
  const learned = recipes.filter((r) => timesCooked(state, r.id) >= 2).length
  const next = recipes.find((r) => timesCooked(state, r.id) < 2) ?? recipes[recipes.length - 1]
  const nextCount = timesCooked(state, next.id)

  return (
    <>
      <header className="hero">
        <h1 className="wordmark">
          Project
          <br />
          Masterchef
        </h1>
        <p className="lede">
          Six dishes, each teaching one technique. Cook each one twice, and the second time it sticks. Dish six is
          dinner for friends.
        </p>
        <div className="meter" role="img" aria-label={`${learned} of ${recipes.length} dishes learned`}>
          {recipes.map((r) => (
            <span key={r.id} className={`seg s${Math.min(2, timesCooked(state, r.id))}`} />
          ))}
        </div>
        <p className="meter-label">
          {learned === recipes.length
            ? 'All six learned. You can cook now.'
            : `${learned} of ${recipes.length} learned`}
        </p>
      </header>

      <section className="next" aria-labelledby="next-h">
        <p className="next-kicker" id="next-h">
          {nextCount === 0 ? 'Up next' : 'Cook it again to lock it in'}
        </p>
        <h2>{next.title}</h2>
        <p>{next.short}</p>
        <div className="row">
          <button className="btn yolk" onClick={() => go(`/recipe/${next.id}`)}>
            Open recipe
          </button>
          <span className="muted">{formatMinutes(next.minutes)}</span>
        </div>
      </section>

      <ol className="path">
        {recipes.map((r) => {
          const n = timesCooked(state, r.id)
          return (
            <li key={r.id} className={`stop ${r.milestone ? 'milestone' : ''} ${n >= 2 ? 'learned' : ''}`}>
              <a href={`#/recipe/${r.id}`}>
                <span className="num" aria-hidden="true">
                  {r.milestone ? '★' : r.order}
                </span>
                <span className="stop-body">
                  <span className="skill">{r.skill}</span>
                  <span className="stop-title">{r.title}</span>
                </span>
                <Pips n={n} />
              </a>
            </li>
          )
        })}
      </ol>
      <p className="footnote">Two dots fill in as you cook each dish. One new dish a week is a good pace.</p>
    </>
  )
}
