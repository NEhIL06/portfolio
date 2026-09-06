import type { CSSProperties } from "react"

export function RollText({ children }: { children: string }) {
  const characters = Array.from(children)

  const row = (hovered: boolean) => (
    <span className={`roll-text-row${hovered ? " roll-text-row-hover" : ""}`} aria-hidden="true">
      {characters.map((character, index) => (
        <span
          className="roll-text-character"
          style={{ "--character-index": index } as CSSProperties}
          key={`${character}-${index}`}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  )

  return (
    <span className="roll-text">
      <span className="sr-only">{children}</span>
      {row(false)}
      {row(true)}
    </span>
  )
}
