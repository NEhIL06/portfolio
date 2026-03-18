"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "./use-reduced-motion"

interface AnimatedCounterProps {
    value: number
    direction?: "up" | "down"
    className?: string
    duration?: number
    suffix?: string
}

export function AnimatedCounter({
    value,
    direction = "up",
    className,
    duration = 1.5,
    suffix = ""
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(direction === "down" ? value : 0)
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        duration: duration * 1000
    })
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const prefersReducedMotion = useReducedMotion()
    const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : (direction === "down" ? value : 0))

    useEffect(() => {
        if (prefersReducedMotion) return
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value)
        }
    }, [motionValue, isInView, value, direction, prefersReducedMotion])

    useEffect(() => {
        if (prefersReducedMotion) return
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest))
        })
    }, [springValue, prefersReducedMotion])

    return (
        <span ref={ref} className={`tabular-nums ${className || ""}`}>
            {displayValue}{suffix}
        </span>
    )
}
