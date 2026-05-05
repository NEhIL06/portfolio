"use client"
import { useEffect, useState } from "react"
import { motion, useMotionTemplate, useSpring } from "framer-motion"
import { useReducedMotion } from "./motion/use-reduced-motion"
import { useIsTouch } from "./motion/use-is-touch"

export function MetallicBackground() {
  const isTouch = useIsTouch()
  const prefersReducedMotion = useReducedMotion()
  const disableMotion = isTouch || prefersReducedMotion

  const [mounted, setMounted] = useState(false)

  const smoothX = useSpring(0, { stiffness: 50, damping: 40 })
  const smoothY = useSpring(0, { stiffness: 50, damping: 40 })

  useEffect(() => {
    setMounted(true)
    // Set initial position to center
    smoothX.set(window.innerWidth / 2)
    smoothY.set(window.innerHeight / 2)

    if (disableMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      smoothX.set(e.clientX)
      smoothY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [disableMotion, smoothX, smoothY])

  const background = useMotionTemplate`
    radial-gradient(1200px 600px at ${smoothX}px ${smoothY}px, rgba(100,100,100,0.07), transparent 50%),
    linear-gradient(180deg, #ffffff 0%, #f7f7f7 40%, #ffffff 100%)
  `

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          background: disableMotion
            ? "radial-gradient(1200px 600px at 50% -20%, rgba(100,100,100,0.07), transparent 50%), linear-gradient(180deg, #ffffff 0%, #f7f7f7 40%, #ffffff 100%)"
            : background,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(1200px_500px_at_50%_0%,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_60%,rgba(0,0,0,0.04)_100%)] opacity-80" />
    </>
  )
}

