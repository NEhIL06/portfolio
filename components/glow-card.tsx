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
            background: `radial-gradient(250px circle at var(--x) var(--y), rgba(0,0,0,0.2), rgba(0,0,0,0.08) 40%, transparent 100%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "2px",
          } as React.CSSProperties}
        />
      </div>

      {/* content container */}
      <div className="relative rounded-2xl">{children}</div>
    </div>
  )
}
