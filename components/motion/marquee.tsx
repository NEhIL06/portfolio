"use client"
import React from "react"
import { useReducedMotion } from "./use-reduced-motion"

interface MarqueeProps {
    children: React.ReactNode
    direction?: "left" | "right"
    speed?: number // in seconds
    className?: string
}

export function Marquee({ children, direction = "left", speed = 30, className }: MarqueeProps) {
    const prefersReducedMotion = useReducedMotion()

    const animationName = direction === "left" ? "marquee" : "marquee-reverse"
    const animationDuration = prefersReducedMotion ? "0.01ms" : `${speed}s`

    return (
        <div className={`flex overflow-hidden relative group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className || ""}`}>
            <div
                className="flex min-w-full shrink-0 items-center justify-around gap-4 will-change-transform pr-4"
                style={{
                    animation: `${animationName} ${animationDuration} linear infinite`,
                    animationPlayState: prefersReducedMotion ? "paused" : "running",
                }}
                onMouseEnter={(e) => {
                    if (!prefersReducedMotion) e.currentTarget.style.animationPlayState = "paused"
                }}
                onMouseLeave={(e) => {
                    if (!prefersReducedMotion) e.currentTarget.style.animationPlayState = "running"
                }}
            >
                {children}
            </div>
            <div
                className="flex min-w-full shrink-0 items-center justify-around gap-4 will-change-transform pr-4"
                style={{
                    animation: `${animationName} ${animationDuration} linear infinite`,
                    animationPlayState: prefersReducedMotion ? "paused" : "running",
                }}
                aria-hidden="true"
                onMouseEnter={(e) => {
                    if (!prefersReducedMotion) e.currentTarget.style.animationPlayState = "paused"
                }}
                onMouseLeave={(e) => {
                    if (!prefersReducedMotion) e.currentTarget.style.animationPlayState = "running"
                }}
            >
                {children}
            </div>
        </div>
    )
}
