"use client"
import { useRef, ReactNode } from "react"
import { motion, useSpring } from "framer-motion"
import { useReducedMotion } from "./use-reduced-motion"
import { useIsTouch } from "./use-is-touch"

export function MagneticButton({ children, className }: { children: ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const isTouch = useIsTouch()
    const expectsReducedMotion = useReducedMotion()

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
    const x = useSpring(0, springConfig)
    const y = useSpring(0, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch || expectsReducedMotion || !ref.current) return
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)
        x.set(middleX * 0.3)
        y.set(middleY * 0.3)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={`relative inline-flex ${className || ""}`}
        >
            {children}
        </motion.div>
    )
}
