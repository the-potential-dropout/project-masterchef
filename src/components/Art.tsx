import { useEffect, useMemo, useState } from 'react'
import { photoPage, photoUrl } from '../data/photos'
import { cuisineGlyph } from '../data'
import type { Recipe } from '../data/types'

/** Dish photo with a fade-in, and a drawn plate as a fallback when offline or blocked. */
export function DishPhoto({ recipe, size = 'hero', credit = false }: { recipe: Recipe; size?: 'hero' | 'card' | 'thumb'; credit?: boolean }) {
  const width = size === 'hero' ? 900 : size === 'card' ? 480 : 160
  const src = photoUrl(recipe.id, width)
  const [state, setState] = useState<'loading' | 'ok' | 'err'>(src ? 'loading' : 'err')
  const hot = /soups|drinks/.test(recipe.cuisine ?? '') || /soup|chai|chocolate|chili|curry|stew|risotto/i.test(recipe.title)
  return (
    <figure className={`dish-photo ${size} ${state}`}>
      {state !== 'err' && src && (
        <img
          src={src}
          alt={recipe.title}
          loading={size === 'hero' ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setState('ok')}
          onError={() => setState('err')}
        />
      )}
      {state !== 'ok' && <PlateArt glyph={cuisineGlyph(recipe.cuisine)} seed={recipe.id} />}
      {hot && size !== 'thumb' && <Steam />}
      {credit && state === 'ok' && (
        <figcaption>
          <a href={photoPage(recipe.id)} target="_blank" rel="noreferrer">Photo: Wikimedia Commons</a>
        </figcaption>
      )}
    </figure>
  )
}

const TINTS = ['#f6d9a8', '#cfe6d3', '#f4c9bd', '#d9d2ef', '#f9e7a6', '#cde3ef']
function hash(s: string) {
  let h = 0
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) | 0
  return Math.abs(h)
}

/** A cute top-down plate illustration, tinted per dish. */
export function PlateArt({ glyph, seed }: { glyph: string; seed: string }) {
  const tint = TINTS[hash(seed) % TINTS.length]
  return (
    <svg className="plate-art" viewBox="0 0 200 140" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill={tint} />
      <g opacity="0.35" fill="#fff">
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={(i * 37 + (hash(seed) % 30)) % 200} cy={(i * 53) % 140} r={2 + (i % 3)} />
        ))}
      </g>
      <ellipse cx="100" cy="78" rx="62" ry="50" fill="#fff" opacity="0.95" />
      <ellipse cx="100" cy="78" rx="46" ry="36" fill="none" stroke="#e7e2d8" strokeWidth="3" />
      <text x="100" y="92" textAnchor="middle" fontSize="40">{glyph}</text>
    </svg>
  )
}

/** Three wisps of rising steam. */
export function Steam() {
  return (
    <svg className="steam" viewBox="0 0 60 50" aria-hidden="true">
      <path d="M12 46 C4 36 20 30 12 18 C6 10 14 4 12 2" />
      <path d="M30 46 C22 36 38 30 30 18 C24 10 32 4 30 2" />
      <path d="M48 46 C40 36 56 30 48 18 C42 10 50 4 48 2" />
    </svg>
  )
}

const BITS = ['🥚', '🍅', '🥕', '🧄', '🌶️', '🍋', '🥦', '🧀', '⭐', '✨']

/** A one-shot burst of food confetti. Skipped entirely with reduced motion. */
export function Confetti({ count = 36 }: { count?: number }) {
  const reduced = useMemo(() => {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }, [])
  const [on, setOn] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setOn(false), 3200)
    return () => clearTimeout(t)
  }, [])
  const pieces = useMemo(
    () =>
      [...Array(count)].map((_, i) => ({
        ch: BITS[i % BITS.length],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 1.8 + Math.random() * 1.2,
        rot: (Math.random() - 0.5) * 720,
        drift: (Math.random() - 0.5) * 120,
        size: 16 + Math.random() * 14,
      })),
    [count],
  )
  if (reduced || !on) return null
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ['--rot' as string]: `${p.rot}deg`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          {p.ch}
        </span>
      ))}
    </div>
  )
}

/** Countdown ring for cook-mode timers. */
export function TimerRing({ frac, children }: { frac: number; children: React.ReactNode }) {
  const r = 54
  const c = 2 * Math.PI * r
  return (
    <div className="timer-ring">
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <circle cx="64" cy="64" r={r} className="tr-track" />
        <circle cx="64" cy="64" r={r} className="tr-fill" strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, Math.min(1, frac)))} />
      </svg>
      <div className="tr-center">{children}</div>
    </div>
  )
}
