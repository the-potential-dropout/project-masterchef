import { useState } from 'react'
import { allChapters, findChapter, textbook, type Block, type Chapter } from '../data/textbook'
import { allBranches, getRecipe } from '../data'
import { recipeFacts } from '../lib/nutrition'
import { formatMinutes } from '../lib/format'
import { useStore } from '../lib/store'

const KEY = 'project-masterchef:textbook'

function loadRead(): Record<string, true> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Record<string, true>
  } catch {
    return {}
  }
}

function useRead(): [Record<string, true>, (id: string, on: boolean) => void] {
  const [read, setRead] = useState(loadRead)
  const set = (id: string, on: boolean) => {
    const next = { ...read }
    if (on) next[id] = true
    else delete next[id]
    setRead(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable: progress lasts for this visit only */
    }
  }
  return [read, set]
}

export function Textbook({ chapterId }: { chapterId?: string }) {
  const [read, setRead] = useRead()
  const found = chapterId ? findChapter(chapterId) : undefined
  if (found) return <ChapterView chapter={found.chapter} partTitle={found.part.title} read={!!read[found.chapter.id]} setRead={(on) => setRead(found.chapter.id, on)} />

  const done = allChapters.filter((c) => read[c.chapter.id]).length
  const next = allChapters.find((c) => !read[c.chapter.id])
  return (
    <>
      <a className="back" href="#/learn">← Learn</a>
      <h1 className="page-title">The Masterchef textbook</h1>
      <p className="lede">From healthy survival cooking to every cuisine on earth. Read a chapter, cook its dishes twice, then tick it off.</p>
      <div className="tb-progress" role="img" aria-label={`${done} of ${allChapters.length} chapters read`}>
        <div className="mini-bar"><span style={{ width: `${(done / allChapters.length) * 100}%` }} /></div>
        <span className="muted small">{done} of {allChapters.length} chapters read</span>
      </div>
      {next && (
        <a className="continue" href={`#/textbook/${next.chapter.id}`}>
          <span className="muted small">{done ? 'Continue reading' : 'Start here'}</span>
          <strong>{next.chapter.glyph} {next.chapter.title}</strong>
        </a>
      )}
      {textbook.map((p) => (
        <section key={p.id} className="tb-part">
          <h2 className="section-h">{p.title}</h2>
          <p className="muted">{p.blurb}</p>
          <ol className="tb-toc">
            {p.chapters.map((c) => (
              <li key={c.id} className={read[c.id] ? 'read' : ''}>
                <a href={`#/textbook/${c.id}`}>
                  <span className="tb-glyph" aria-hidden="true">{c.glyph}</span>
                  <span className="tb-toc-body">
                    <strong>{c.title}</strong>
                    <span className="muted small">{c.summary}</span>
                  </span>
                  {read[c.id] && <span className="tb-tick" aria-label="Read">✓</span>}
                </a>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <p className="disclaimer">General cooking and nutrition information, not medical advice. Safe temperatures follow Health Canada and USDA guidance.</p>
    </>
  )
}

function ChapterView({ chapter, partTitle, read, setRead }: { chapter: Chapter; partTitle: string; read: boolean; setRead: (on: boolean) => void }) {
  const i = allChapters.findIndex((c) => c.chapter.id === chapter.id)
  const prev = allChapters[i - 1]?.chapter
  const next = allChapters[i + 1]?.chapter
  const branch = chapter.branch ? allBranches.find((b) => b.id === chapter.branch) : undefined
  return (
    <article className="tb-chapter">
      <a className="back" href="#/textbook">← Contents</a>
      <p className="muted small">{partTitle}</p>
      <h1 className="page-title">{chapter.glyph} {chapter.title}</h1>
      <p className="lede">{chapter.summary}</p>
      {chapter.blocks.map((b, k) => <BlockView key={k} b={b} />)}
      {chapter.mastery && (
        <section className="tb-mastery">
          <h2>You’ve got it when…</h2>
          <ul>{chapter.mastery.map((m) => <li key={m}>{m}</li>)}</ul>
        </section>
      )}
      {branch && (
        <p className="ref-link">Practise it: <a href={`#/learn/${branch.id}`}>{branch.glyph} {branch.title} lessons</a></p>
      )}
      <button className={`btn ${read ? 'ghost' : 'yolk'}`} onClick={() => setRead(!read)}>{read ? '✓ Read (tap to undo)' : 'Mark chapter as read'}</button>
      <nav className="tb-nav" aria-label="Chapters">
        {prev ? <a href={`#/textbook/${prev.id}`}>← {prev.title}</a> : <span />}
        {next ? <a href={`#/textbook/${next.id}`}>{next.title} →</a> : <span />}
      </nav>
    </article>
  )
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === 'string') return <p>{b}</p>
  if ('h' in b) return <h2 className="tb-h">{b.h}</h2>
  if ('list' in b) return <ul className="tb-list">{b.list.map((x) => <li key={x}>{x}</li>)}</ul>
  if ('steps' in b) return <ol className="tb-steps">{b.steps.map((x) => <li key={x}>{x}</li>)}</ol>
  if ('tip' in b) return <p className="tip">💡 {b.tip}</p>
  if ('warn' in b) return <p className="notice">⚠️ {b.warn}</p>
  if ('table' in b)
    return (
      <dl className="basic-dl tb-table">
        {b.table.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    )
  return <RecipeCards ids={b.recipes} />
}

function RecipeCards({ ids }: { ids: string[] }) {
  const [s] = useStore()
  return (
    <ul className="tb-recipes">
      {ids.map((id) => {
        const r = getRecipe(id)
        if (!r) return null
        const f = recipeFacts(r, s.prices)
        const p = f.perServing
        return (
          <li key={id}>
            <a href={`#/recipe/${id}`}>
              <strong>{r.title}</strong>
              <span className="muted small">Teaches: {r.skill} · {formatMinutes(r.minutes)}</span>
              <span className="tb-facts small">
                ${f.perServingCost.toFixed(2)}/serving · {Math.round(p.kcal)} kcal · {Math.round(p.protein)} g protein · {Math.round(p.fiber)} g fibre · {Math.round(p.sodium).toLocaleString()} mg sodium
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
