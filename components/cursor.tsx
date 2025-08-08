"use client"

import { useEffect, useRef, useState } from "react"

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
  }, [pos.x, pos.y])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[100] -translate-x-1 -translate-y-1"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {/* Simple black pointer cursor */}
      <div className="relative">
        {/* Main triangular pointer body */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid #ffffff",
            borderTop: "8px solid transparent",
            borderBottom: "16px solid transparent",
          }}
        />
        {/* Inner curved cutout for the pointer shape */}
        <div
          className="absolute"
          style={{
            left: "12px",
            top: "8px",
            width: 0,
            height: 0,
            borderLeft: "8px solid #000000",
            borderTop: "4px solid transparent",
            borderBottom: "8px solid transparent",
          }}
        />
      </div>
    </div>
  )
}