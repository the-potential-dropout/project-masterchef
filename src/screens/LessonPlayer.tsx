import { useMemo, useState } from 'react'
import { findLesson, getRecipe } from '../data'
import type { Question } from '../data/courseTypes'
import { shuffle } from '../lib/generate'
import { today, update } from '../lib/store'

/** A question prepared for play: options shuffled, answer key remembered. */
type Played =
  | { key: number; t: 'mc'; q: string; options: string[]; answer: string; why?: string }
  | { key: number; t: 'tf'; q: string; a: boolean; why?: string }
  | { key: number; t: 'order'; q: string; items: string[]; pool: string[]; why?: string }
  | { key: number; t: 'match'; q: string; pairs: [string, string][]; left: string[]; right: string[]; why?: string }
  | { key: number; t: 'num'; q: string; a: number; unit: string; tol: number; why?: string }

let keySeq = 0
function prepare(q: Question): Played {
  const key = ++keySeq
  switch (q.t) {
    case 'mc':
      return { key, t: 'mc', q: q.q, options: shuffle(q.options), answer: q.options[q.a], why: q.why }
    case 'tf':
      return { key, ...q }
    case 'order':
      return { key, t: 'order', q: q.q, items: q.items, pool: shuffle(q.items), why: q.why }
    case 'match':
      return { key, t: 'match', q: q.q, pairs: q.pairs, left: shuffle(q.pairs.map((p) => p[0])), right: shuffle(q.pairs.map((p) => p[1])), why: q.why }
    case 'num':
      return { key, ...q }
  }
}

function rightAnswer(p: Played): string {
  switch (p.t) {
    case 'mc': return p.answer
    case 'tf': return p.a ? 'True' : 'False'
    case 'order': return p.items.join(' → ')
    case 'match': return p.pairs.map(([a, b]) => `${a}: ${b}`).join('; ')
    case 'num': return `${p.a} ${p.unit}`
  }
}

export function LessonPlayer({ id, go }: { id: string; go: (to: string) => void }) {
  const found = findLesson(id)
  const initial = useMemo(() => {
    if (!found) return []
    const qs = typeof found.lesson.qs === 'function' ? found.lesson.qs() : found.lesson.qs
    return shuffle(qs).map(prepare)
  }, [found])
  const [phase, setPhase] = useState<'teach' | 'quiz' | 'done'>('teach')
  const [card, setCard] = useState(0)
  const [queue, setQueue] = useState<Played[]>(initial)
  const [result, setResult] = useState<null | boolean>(null)
  const [correct, setCorrect] = useState(0)
  const [missed, setMissed] = useState<Set<number>>(new Set())
  const [earned, setEarned] = useState(0)

  if (!found) {
    return (
      <div className="page">
        <p>That lesson does not exist.</p>
        <a href="#/learn">Back to Learn</a>
      </div>
    )
  }
  const { lesson, branch } = found
  const recipe = lesson.recipeId ? getRecipe(lesson.recipeId) : undefined
  const exitTo = `/learn${branch.id === 'foundations' ? '' : `/${branch.id}`}`

  const finish = (mistakes: number) => {
    const accuracy = (initial.length - mistakes) / initial.length
    const xp = 10 + (mistakes === 0 ? 5 : 0)
    setEarned(xp)
    update((s) => {
      const prev = s.lessons[id]
      const d = today()
      return {
        ...s,
        lessons: { ...s.lessons, [id]: { best: Math.max(prev?.best ?? 0, accuracy), count: (prev?.count ?? 0) + 1, last: d } },
        xpDays: { ...s.xpDays, [d]: (s.xpDays[d] ?? 0) + xp },
      }
    })
    setPhase('done')
  }

  const current = queue[0]
  const onAnswer = (ok: boolean) => {
    setResult(ok)
    if (ok) setCorrect((c) => c + 1)
    else setMissed((m) => new Set(m).add(current.key))
  }
  const onContinue = () => {
    const [head, ...rest] = queue
    const next = result ? rest : [...rest, { ...head, ...prepare(fromPlayed(head)), key: head.key }]
    setResult(null)
    if (!next.length) finish(missed.size)
    else setQueue(next)
  }

  const progress = phase === 'teach' ? 0 : initial.length ? correct / initial.length : 1

  return (
    <div className="lesson">
      <header className="lesson-top">
        <button className="cook-x" onClick={() => go(exitTo)} aria-label="Close lesson">✕</button>
        <div className="lesson-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      </header>

      {phase === 'teach' && (
        <div className="lesson-body">
          <p className="lesson-kicker">{branch.title} · {lesson.title}</p>
          <div className="teach-card" key={card}>
            <h1>{lesson.teach[card][0]}</h1>
            <p>{lesson.teach[card][1]}</p>
          </div>
          <p className="muted small">{card + 1} of {lesson.teach.length}</p>
          <div className="lesson-foot">
            {card > 0 && <button className="btn ghost" onClick={() => setCard(card - 1)}>Back</button>}
            <button className="btn yolk big" onClick={() => (card < lesson.teach.length - 1 ? setCard(card + 1) : setPhase('quiz'))}>
              {card < lesson.teach.length - 1 ? 'Next' : 'Start the quiz'}
            </button>
          </div>
        </div>
      )}

      {phase === 'quiz' && current && (
        <div className="lesson-body">
          {missed.has(current.key) && result === null && <p className="lesson-kicker">Let’s try that one again</p>}
          <QuestionView key={`${current.key}-${queue.length}`} p={current} locked={result !== null} onAnswer={onAnswer} />
          {result !== null && (
            <div className={`feedback ${result ? 'good' : 'bad'}`} role="status">
              <strong>{result ? pickPraise() : 'Not quite.'}</strong>
              {!result && <p>Answer: {rightAnswer(current)}</p>}
              {current.why && <p>{current.why}</p>}
              <button className="btn big" onClick={onContinue} autoFocus>Continue</button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="lesson-body done">
          <p className="done-burst" aria-hidden="true">{missed.size === 0 ? '🏆' : '✅'}</p>
          <h1>Lesson complete</h1>
          <div className="done-stats">
            <div><strong>+{earned}</strong><span>XP</span></div>
            <div><strong>{Math.round(((initial.length - missed.size) / initial.length) * 100)}%</strong><span>first try</span></div>
          </div>
          {missed.size === 0 && <p className="muted">Perfect run, +5 bonus XP.</p>}
          <div className="lesson-foot col">
            {recipe && (
              <button className="btn yolk big" onClick={() => go(`/recipe/${recipe.id}`)}>
                Now cook it: {recipe.title}
              </button>
            )}
            <button className={`btn ${recipe ? 'ghost' : 'yolk big'}`} onClick={() => go(exitTo)}>Back to the course</button>
          </div>
        </div>
      )}
    </div>
  )
}

function fromPlayed(p: Played): Question {
  switch (p.t) {
    case 'mc': return { t: 'mc', q: p.q, options: p.options, a: p.options.indexOf(p.answer), why: p.why }
    case 'order': return { t: 'order', q: p.q, items: p.items, why: p.why }
    case 'match': return { t: 'match', q: p.q, pairs: p.pairs, why: p.why }
    case 'tf': return { t: 'tf', q: p.q, a: p.a, why: p.why }
    case 'num': return { t: 'num', q: p.q, a: p.a, unit: p.unit, tol: p.tol, why: p.why }
  }
}

const PRAISE = ['Nice!', 'Correct!', 'Chef’s kiss.', 'Exactly.', 'You got it.', 'Yes, chef!']
const pickPraise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)]

function QuestionView({ p, locked, onAnswer }: { p: Played; locked: boolean; onAnswer: (ok: boolean) => void }) {
  const [sel, setSel] = useState<string | null>(null)
  const [seq, setSeq] = useState<string[]>([])
  const [num, setNum] = useState('')
  const [pairs, setPairs] = useState<Record<string, string>>({})
  const [leftSel, setLeftSel] = useState<string | null>(null)
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)
  const [matchMistakes, setMatchMistakes] = useState(0)

  if (p.t === 'mc' || p.t === 'tf') {
    const options = p.t === 'mc' ? p.options : ['True', 'False']
    const answer = p.t === 'mc' ? p.answer : p.a ? 'True' : 'False'
    return (
      <>
        <h1 className="q">{p.q}</h1>
        <div className={`options ${p.t === 'tf' ? 'two' : ''}`}>
          {options.map((o) => (
            <button
              key={o}
              className={`opt ${sel === o ? 'sel' : ''} ${locked && o === answer ? 'right' : ''} ${locked && sel === o && o !== answer ? 'wrong' : ''}`}
              disabled={locked}
              onClick={() => setSel(o)}
            >
              {o}
            </button>
          ))}
        </div>
        {!locked && (
          <div className="lesson-foot">
            <button className="btn yolk big" disabled={!sel} onClick={() => onAnswer(sel === answer)}>Check</button>
          </div>
        )}
      </>
    )
  }

  if (p.t === 'order') {
    const left = p.pool.filter((x) => !seq.includes(x))
    return (
      <>
        <h1 className="q">{p.q}</h1>
        <ol className="seq">
          {seq.map((x) => (
            <li key={x}>
              <button className="chip-btn placed" disabled={locked} onClick={() => setSeq(seq.filter((y) => y !== x))}>{x}</button>
            </li>
          ))}
          {!seq.length && <li className="muted small">Tap the steps below in order.</li>}
        </ol>
        <div className="pool">
          {left.map((x) => (
            <button key={x} className="chip-btn" disabled={locked} onClick={() => setSeq([...seq, x])}>{x}</button>
          ))}
        </div>
        {!locked && (
          <div className="lesson-foot">
            <button className="btn yolk big" disabled={seq.length !== p.items.length} onClick={() => onAnswer(seq.every((x, i) => x === p.items[i]))}>Check</button>
          </div>
        )}
      </>
    )
  }

  if (p.t === 'match') {
    const truth = Object.fromEntries(p.pairs)
    const matchedRight = new Set(Object.values(pairs))
    const pickRight = (r: string) => {
      if (!leftSel || locked) return
      if (truth[leftSel] === r) {
        const next = { ...pairs, [leftSel]: r }
        setPairs(next)
        setLeftSel(null)
        if (Object.keys(next).length === p.pairs.length) onAnswer(matchMistakes === 0)
      } else {
        setMatchMistakes((m) => m + 1)
        setWrongFlash(r)
        setTimeout(() => setWrongFlash(null), 450)
      }
    }
    return (
      <>
        <h1 className="q">{p.q}</h1>
        <p className="muted small">Tap one on the left, then its match on the right.</p>
        <div className="match">
          <div>
            {p.left.map((l) => (
              <button key={l} className={`chip-btn ${pairs[l] ? 'matched' : ''} ${leftSel === l ? 'sel' : ''}`} disabled={!!pairs[l] || locked} onClick={() => setLeftSel(l)}>{l}</button>
            ))}
          </div>
          <div>
            {p.right.map((r) => (
              <button key={r} className={`chip-btn ${matchedRight.has(r) ? 'matched' : ''} ${wrongFlash === r ? 'shake' : ''}`} disabled={matchedRight.has(r) || locked} onClick={() => pickRight(r)}>{r}</button>
            ))}
          </div>
        </div>
      </>
    )
  }

  // number
  return (
    <>
      <h1 className="q">{p.q}</h1>
      <form
        className="num-row"
        onSubmit={(e) => {
          e.preventDefault()
          if (num.trim() === '' || locked) return
          onAnswer(Math.abs(Number(num) - p.a) <= p.tol)
        }}
      >
        <input inputMode="decimal" value={num} onChange={(e) => setNum(e.target.value.replace(/[^\d.-]/g, ''))} disabled={locked} aria-label="Your answer" autoFocus />
        <span className="unit-label">{p.unit}</span>
        {!locked && (
          <div className="lesson-foot">
            <button className="btn yolk big" disabled={num.trim() === ''} type="submit">Check</button>
          </div>
        )}
      </form>
    </>
  )
}
