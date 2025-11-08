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
      {/* Animated gradient border that follows cursor */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl p-[2px] transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
        }}
      >
        <div
          className="h-full w-full rounded-[15px]"
          style={{
            background: `radial-gradient(250px circle at var(--x) var(--y), rgba(255,255,255,0.9), rgba(255,255,255,0.4) 40%, transparent 100%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "2px",
          } as React.CSSProperties}
        />
      </div>

      {/* Static subtle RGB border when not hovering */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl p-[1px] transition-opacity duration-300"
        style={{
          opacity: hover ? 0 : 0.3,
        }}
      >
        <div
          className="h-full w-full rounded-[15px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,179,64,0.4), rgba(255,99,132,0.4), rgba(147,51,234,0.4), rgba(64,201,255,0.4))",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          } as React.CSSProperties}
        />
      </div>

      {/* Outer glow that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at var(--x) var(--y), rgba(255,255,255,0.15), rgba(255,255,255,0.08) 40%, transparent 70%)`,
          filter: "blur(20px)",
          opacity: hover ? 1 : 0,
        }}
      />

      {/* Inner glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at var(--x) var(--y), rgba(255,255,255,0.25), rgba(255,255,255,0.12) 35%, transparent 60%)`,
          filter: "blur(10px)",
          opacity: hover ? 1 : 0,
        }}
      />

      {/* content container */}
      <div className="relative rounded-2xl">{children}</div>
    </div>
  )
}