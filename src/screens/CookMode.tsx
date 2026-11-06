import { useEffect, useState } from 'react'
import type { Recipe } from '../data/types'
import { useStore } from '../lib/store'
import { formatTimer } from '../lib/format'
import { ingredientLine } from '../lib/groceries'
import { remaining, useTimers, useWakeLock } from '../lib/timers'
import { LogForm } from './RecipePage'

export function CookMode({ recipe: r, go }: { recipe: Recipe; go: (to: string) => void }) {
  useWakeLock()
  const [state] = useStore()
  const scale = (state.servings[r.id] ?? r.servings) / r.servings
  const [i, setI] = useState(0)
  const [showIngredients, setShowIngredients] = useState(false)
  const [finished, setFinished] = useState(false)
  const { timers, now, start, pause, addMinute, dismiss } = useTimers()
  const step = r.steps[i]
  const total = r.steps.length
  const stepTimerId = `step-${i}`
  const stepTimer = timers.find((t) => t.id === stepTimerId)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight') setI((x) => Math.min(total - 1, x + 1))
      if (e.key === 'ArrowLeft') setI((x) => Math.max(0, x - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  if (finished) {
    return (
      <div className="cook">
        <div className="cook-inner finish">
          <p className="cook-count">Done</p>
          <h1 className="cook-text">You cooked {r.title.toLowerCase()}.</h1>
          <p className="cook-tip">Log it while it’s fresh. Your notes show up next time you open the recipe.</p>
          <div className="log-on-dark">
            <LogForm id={r.id} onDone={() => go(`/recipe/${r.id}`)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cook">
      <header className="cook-top">
        <button className="cook-x" onClick={() => go(`/recipe/${r.id}`)}>
          Exit
        </button>
        <div className="cook-progress" aria-hidden="true">
          {r.steps.map((_, k) => (
            <span key={k} className={k < i ? 'past' : k === i ? 'now' : ''} />
          ))}
        </div>
        <button className="cook-x" onClick={() => setShowIngredients((v) => !v)} aria-expanded={showIngredients}>
          {showIngredients ? 'Hide' : 'Ingredients'}
        </button>
      </header>

      {timers.length > 0 && (
        <ul className="timer-strip" aria-label="Running timers">
          {timers.map((t) => (
            <li key={t.id} className={t.done ? 'ringing' : ''}>
              <span className="t-label">{t.label}</span>
              <span className="t-time">{t.done ? 'Done!' : formatTimer(remaining(t, now))}</span>
              {t.done ? (
                <button onClick={() => dismiss(t.id)}>OK</button>
              ) : (
                <button onClick={() => (t.endsAt ? pause(t.id) : start(t.id, t.label, t.total))}>{t.endsAt ? 'Pause' : 'Go'}</button>
              )}
            </li>
          ))}
        </ul>
      )}

      {showIngredients && (
        <ul className="cook-ingredients">
          {r.ingredients.map((x, k) => (
            <li key={k}>
              {ingredientLine(x, scale)}
              {x.note && <span className="note">, {x.note}</span>}
            </li>
          ))}
        </ul>
      )}

      <div className="cook-inner" aria-live="polite">
        <p className="cook-count">
          Step {i + 1} of {total}: {step.title}
        </p>
        <p className="cook-text">{step.text}</p>
        {step.tip && <p className="cook-tip">{step.tip}</p>}

        {step.timer && (
          <div className="big-timer">
            <span className="big-time">{formatTimer(stepTimer ? remaining(stepTimer, now) : step.timer)}</span>
            <div className="row">
              {!stepTimer || (!stepTimer.endsAt && !stepTimer.done) ? (
                <button className="btn yolk big" onClick={() => start(stepTimerId, step.title, step.timer!)}>
                  {stepTimer ? 'Resume timer' : 'Start timer'}
                </button>
              ) : stepTimer.done ? (
                <button className="btn yolk big" onClick={() => addMinute(stepTimerId)}>
                  1 more minute
                </button>
              ) : (
                <>
                  <button className="btn chalk" onClick={() => pause(stepTimerId)}>
                    Pause
                  </button>
                  <button className="btn chalk" onClick={() => addMinute(stepTimerId)}>
                    +1 min
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="cook-nav">
        <button className="btn chalk" disabled={i === 0} onClick={() => setI(i - 1)}>
          Back
        </button>
        {i < total - 1 ? (
          <button className="btn yolk big" onClick={() => setI(i + 1)}>
            Next step
          </button>
        ) : (
          <button className="btn yolk big" onClick={() => setFinished(true)}>
            Finish
          </button>
        )}
      </footer>
    </div>
  )
}
