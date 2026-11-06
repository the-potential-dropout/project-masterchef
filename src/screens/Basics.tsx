import { basics } from '../data/basics'

export function Basics() {
  return (
    <>
      <h1 className="page-title">Kitchen basics</h1>
      <p className="lede">Read this once before dish 1. Come back whenever a recipe says “medium heat” and you think, “Whose medium?”</p>
      {basics.map((b) => (
        <section key={b.id} className="basic">
          <h2>{b.title}</h2>
          <p className="muted">{b.intro}</p>
          <dl>
            {b.points.map((p) => (
              <div key={p.head}>
                <dt>{p.head}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  )
}
