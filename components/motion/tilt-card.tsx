"use client"
import React, { useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "./use-reduced-motion"
import { useIsTouch } from "./use-is-touch"

export function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const isTouch = useIsTouch()
    const prefersReducedMotion = useReducedMotion()

    const x = useSpring(0, { stiffness: 200, damping: 20 })
    const y = useSpring(0, { stiffness: 200, damping: 20 })

    const rotateX = useTransform(y, [-100, 100], [8, -8])
    const rotateY = useTransform(x, [-100, 100], [-8, 8])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch || prefersReducedMotion || !ref.current) return
        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Calculate 0 to 1 progress
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct * 100)
        y.set(yPct * 100)
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
            style={{
                perspective: isTouch || prefersReducedMotion ? "none" : "800px",
                transformStyle: "preserve-3d"
            }}
            className={className}
        >
            <motion.div
                style={{
                    rotateX: isTouch || prefersReducedMotion ? 0 : rotateX,
                    rotateY: isTouch || prefersReducedMotion ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
