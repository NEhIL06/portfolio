"use client"

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

export function GlowCard({ className, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn("relative", className)}
      style={
        {
          "--x": `${coords.x}px`,
          "--y": `${coords.y}px`,
        } as React.CSSProperties
      }
    >
      {/* thin RGB line */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl p-[1px]">
        <div
          className={cn(
            "h-full w-full rounded-[15px]",
            "bg-[conic-gradient(from_0deg, #ffb340, #ff6384, #9333ea, #40c9ff, #ffb340)]",
            "opacity-60"
          )}
          style={{
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          } as any}
        />
      </div>

      {/* glow that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(180px 180px at var(--x) var(--y), rgba(255,179,64,0.18), rgba(255,99,132,0.12) 35%, rgba(147,51,234,0.12) 60%, transparent 70%)",
          filter: "blur(8px)",
          opacity: hover ? 1 : 0,
        }}
      />

      {/* content container */}
      <div className="relative rounded-2xl">{children}</div>
    </div>
  )
}
