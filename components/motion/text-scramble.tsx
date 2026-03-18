"use client"

import { useState, useEffect } from "react"
import { useReducedMotion } from "./use-reduced-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"

interface TextScrambleProps {
    children: string
    className?: string
    speed?: number
}

export function TextScramble({ children, className, speed = 50 }: TextScrambleProps) {
    const [text, setText] = useState(children)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion) {
            setText(children)
            return
        }

        let frame = 0
        let timeoutId: NodeJS.Timeout

        const scramble = () => {
            let result = ""
            for (let i = 0; i < children.length; i++) {
                if (frame >= i * 3) {
                    result += children[i]
                } else {
                    result += CHARS[Math.floor(Math.random() * CHARS.length)]
                }
            }
            setText(result)

            if (frame < children.length * 3) {
                frame++
                timeoutId = setTimeout(scramble, speed)
            }
        }

        scramble()
        return () => clearTimeout(timeoutId)
    }, [children, speed, prefersReducedMotion])

    return (
        <span
            className={className}
            onMouseEnter={() => {
                // We could restart animation on hover here if wanted
            }}
        >
            {text}
        </span>
    )
}
