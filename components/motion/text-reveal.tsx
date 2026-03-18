"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useReducedMotion } from "./use-reduced-motion"

interface TextRevealProps {
    children: string
    className?: string
}

export function TextReveal({ children, className }: TextRevealProps) {
    const targetRef = useRef<HTMLParagraphElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.9", "start 0.4"],
    })

    // If using reduced motion, return simple text element
    if (prefersReducedMotion) {
        return <p className={className}>{children}</p>
    }

    const words = children.split(" ")

    return (
        <p ref={targetRef} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length
                const end = start + 1 / words.length
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                )
            })}
        </p>
    )
}

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.15, 1])
    return (
        <motion.span style={{ opacity }} className="mr-[0.25em] mb-1">
            {children}
        </motion.span>
    )
}
