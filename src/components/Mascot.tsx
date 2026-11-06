/**
 * Yolky: the app's original mascot, a small egg in a chef's hat.
 * Moods change the face; CSS classes animate it (idle bob, blink, bounce, wobble).
 */
export type Mood = 'happy' | 'cheer' | 'sad' | 'think' | 'sleep'

export function Mascot({ mood = 'happy', size = 96, className = '', label }: { mood?: Mood; size?: number; className?: string; label?: string }) {
  const mouth = {
    happy: <path d="M42 70 Q50 78 58 70" />,
    cheer: <path d="M40 68 Q50 84 60 68 Z" fill="var(--m-mouth)" />,
    sad: <path d="M42 75 Q50 68 58 75" />,
    think: <path d="M44 73 L56 71" />,
    sleep: <path d="M45 73 Q50 76 55 73" />,
  }[mood]
  const eyes =
    mood === 'sleep' ? (
      <g className="m-eyes-closed">
        <path d="M36 58 q4 3 8 0" />
        <path d="M56 58 q4 3 8 0" />
      </g>
    ) : mood === 'cheer' ? (
      <g className="m-eyes-closed">
        <path d="M35 59 q5 -6 10 0" />
        <path d="M55 59 q5 -6 10 0" />
      </g>
    ) : (
      <g className="m-eyes">
        <ellipse cx="40" cy="58" rx="3.6" ry="4.6" />
        <ellipse cx="60" cy="58" rx="3.6" ry="4.6" />
        <circle cx="41.3" cy="56.4" r="1.3" fill="#fff" />
        <circle cx="61.3" cy="56.4" r="1.3" fill="#fff" />
      </g>
    )
  return (
    <svg
      className={`mascot mood-${mood} ${className}`}
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <ellipse className="m-shadow" cx="50" cy="110" rx="26" ry="4" />
      <g className="m-body">
        {/* egg */}
        <path d="M50 30 C70 30 82 58 82 78 C82 97 68 106 50 106 C32 106 18 97 18 78 C18 58 30 30 50 30 Z" fill="var(--m-egg)" stroke="var(--m-line)" strokeWidth="2.5" />
        {/* chef hat */}
        <g className="m-hat">
          <rect x="34" y="27" width="32" height="10" rx="3" fill="#fff" stroke="var(--m-line)" strokeWidth="2.5" />
          <path d="M34 29 C24 27 24 10 37 13 C38 3 62 3 63 13 C76 10 76 27 66 29 Z" fill="#fff" stroke="var(--m-line)" strokeWidth="2.5" />
        </g>
        {/* cheeks */}
        <ellipse cx="31" cy="68" rx="6" ry="4" fill="var(--m-cheek)" />
        <ellipse cx="69" cy="68" rx="6" ry="4" fill="var(--m-cheek)" />
        <g fill="var(--m-line)" stroke="var(--m-line)" strokeWidth="2.5" strokeLinecap="round" className="m-face">
          {eyes}
          <g fill="none">{mouth}</g>
        </g>
        {mood === 'think' && <text x="76" y="30" className="m-think">?</text>}
        {mood === 'sleep' && <text x="74" y="34" className="m-think">z</text>}
      </g>
    </svg>
  )
}
