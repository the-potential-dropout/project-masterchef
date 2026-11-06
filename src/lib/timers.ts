import { useEffect, useRef, useState } from 'react'

export interface Timer {
  id: string
  label: string
  total: number
  /** epoch ms when it ends, while running */
  endsAt?: number
  /** seconds left, while paused */
  left?: number
  done?: boolean
}

let ctx: AudioContext | null = null

export function unlockAudio() {
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
  } catch {
    /* no audio */
  }
}

function ring() {
  try {
    navigator.vibrate?.([300, 150, 300, 150, 300])
  } catch {
    /* no vibration */
  }
  if (!ctx) return
  const now = ctx.currentTime
  for (let i = 0; i < 3; i++) {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.frequency.value = 880
    o.type = 'triangle'
    g.gain.setValueAtTime(0.0001, now + i * 0.45)
    g.gain.exponentialRampToValueAtTime(0.4, now + i * 0.45 + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.45 + 0.35)
    o.connect(g).connect(ctx.destination)
    o.start(now + i * 0.45)
    o.stop(now + i * 0.45 + 0.4)
  }
}

export function remaining(t: Timer, now: number) {
  if (t.done) return 0
  if (t.endsAt) return Math.max(0, (t.endsAt - now) / 1000)
  return t.left ?? t.total
}

/** Several timers can run at once: rice keeps going while you chop. */
export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([])
  const [now, setNow] = useState(Date.now())
  const ref = useRef(timers)
  ref.current = timers

  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now()
      setNow(t)
      const finished = ref.current.filter((x) => x.endsAt && !x.done && x.endsAt <= t)
      if (finished.length) {
        ring()
        setTimers((all) => all.map((x) => (finished.some((f) => f.id === x.id) ? { ...x, done: true, endsAt: undefined, left: 0 } : x)))
      }
    }, 250)
    return () => clearInterval(id)
  }, [])

  const start = (id: string, label: string, seconds: number) => {
    unlockAudio()
    setTimers((all) => {
      const existing = all.find((x) => x.id === id)
      if (existing) {
        if (existing.endsAt) return all
        const left = existing.done ? existing.total : remaining(existing, Date.now())
        return all.map((x) => (x.id === id ? { ...x, done: false, left: undefined, endsAt: Date.now() + left * 1000 } : x))
      }
      return [...all, { id, label, total: seconds, endsAt: Date.now() + seconds * 1000 }]
    })
  }
  const pause = (id: string) =>
    setTimers((all) => all.map((x) => (x.id === id && x.endsAt ? { ...x, left: remaining(x, Date.now()), endsAt: undefined } : x)))
  const addMinute = (id: string) =>
    setTimers((all) =>
      all.map((x) => {
        if (x.id !== id) return x
        if (x.done) return { ...x, done: false, total: 60, endsAt: Date.now() + 60_000 }
        if (x.endsAt) return { ...x, endsAt: x.endsAt + 60_000 }
        return { ...x, left: (x.left ?? x.total) + 60 }
      }),
    )
  const dismiss = (id: string) => setTimers((all) => all.filter((x) => x.id !== id))

  return { timers, now, start, pause, addMinute, dismiss }
}

/** Keeps the phone screen awake while cooking, where supported. */
export function useWakeLock() {
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }
    const req = async () => {
      try {
        lock = (await nav.wakeLock?.request('screen')) ?? null
      } catch {
        /* not supported or denied */
      }
    }
    void req()
    const onVis = () => document.visibilityState === 'visible' && void req()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      void lock?.release().catch(() => {})
    }
  }, [])
}
