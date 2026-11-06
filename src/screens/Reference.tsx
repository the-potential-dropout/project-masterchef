import { useState } from 'react'
import { conversions, cookTimes, doneness, oils, safety, tools } from '../data/reference'
import { basics } from '../data/basics'

const TABS = ['Temperatures', 'Cooking times', 'Oils and fats', 'Tools', 'Conversions', 'Safety', 'Basics'] as const
type Tab = (typeof TABS)[number]

export function Reference() {
  const [tab, setTab] = useState<Tab>(() => {
    try {
      return (sessionStorage.getItem('ref-tab') as Tab) || 'Temperatures'
    } catch {
      return 'Temperatures'
    }
  })
  const pick = (t: Tab) => {
    setTab(t)
    try {
      sessionStorage.setItem('ref-tab', t)
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <a className="back" href="#/learn">← Learn</a>
      <h1 className="page-title">Cheat sheets</h1>
      <p className="muted small"><a href="#/credits">Photo credits</a></p>
      <div className="seg-tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => pick(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Temperatures' && (
        <>
          <p className="muted">Safe minimum internal temperatures follow Health Canada and USDA guidance. Use an instant-read thermometer in the thickest part.</p>
          <ul className="ref-cards">
            {doneness.map((d) => (
              <li key={d.food}>
                <div className="rc-head">
                  <strong>{d.food}</strong>
                  <span className="temp">{d.f}°F <span className="muted">{d.c}°C</span></span>
                </div>
                <dl>
                  <div><dt>Method</dt><dd>{d.method}, {d.heat}</dd></div>
                  <div><dt>Time</dt><dd>{d.time}</dd></div>
                  <div><dt>Tool</dt><dd>{d.tool}</dd></div>
                </dl>
                <p className="muted small">{d.note}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {tab === 'Cooking times' && (
        <ul className="ref-cards">
          {cookTimes.map((c) => (
            <li key={c.food}>
              <div className="rc-head"><strong>{c.food}</strong><span className="temp">{c.time}</span></div>
              <p className="small">{c.how}{c.ratio ? `. ${c.ratio}.` : '.'}</p>
            </li>
          ))}
        </ul>
      )}

      {tab === 'Oils and fats' && (
        <>
          <p className="muted">Smoke points are approximate and vary by brand and refinement.</p>
          <ul className="ref-cards">
            {[...oils].sort((a, b) => b.smokeF - a.smokeF).map((o) => (
              <li key={o.name}>
                <div className="rc-head"><strong>{o.name}</strong><span className="temp">{o.smokeF}°F</span></div>
                <div className="smoke-bar" aria-hidden="true"><span style={{ width: `${(o.smokeF / 520) * 100}%` }} /></div>
                <dl>
                  <div><dt>Flavour</dt><dd>{o.flavour}</dd></div>
                  <div><dt>Best for</dt><dd>{o.bestFor}</dd></div>
                  <div><dt>Health pros</dt><dd>{o.pros}</dd></div>
                  <div><dt>Health cons</dt><dd>{o.cons}</dd></div>
                  <div><dt>Saturated fat</dt><dd>about {o.satFatPct}%</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}

      {tab === 'Tools' && (
        <ul className="ref-cards">
          {tools.map((t) => (
            <li key={t.name}>
              <strong>{t.name}</strong>
              <p className="small">{t.use}.</p>
              <p className="muted small">{t.settings}</p>
            </li>
          ))}
        </ul>
      )}

      {tab === 'Conversions' && (
        <dl className="conv">
          {conversions.map(([a, b]) => (
            <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
          ))}
        </dl>
      )}

      {tab === 'Safety' && (
        <dl className="basic-dl">
          {safety.map(([a, b]) => (
            <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
          ))}
        </dl>
      )}

      {tab === 'Basics' &&
        basics.map((b) => (
          <section key={b.id} className="basic">
            <h2>{b.title}</h2>
            <p className="muted">{b.intro}</p>
            <dl className="basic-dl">
              {b.points.map((p) => (
                <div key={p.head}><dt>{p.head}</dt><dd>{p.body}</dd></div>
              ))}
            </dl>
          </section>
        ))}
    </>
  )
}
