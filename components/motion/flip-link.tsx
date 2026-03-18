"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.015

interface FlipLinkProps extends Omit<React.ComponentProps<typeof Link>, "children"> {
    children: string
    baseColor?: string
    hoverColor?: string
}

export default function FlipLink({
    children,
    href = "#",
    className = "",
    baseColor = "inherit",
    hoverColor = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
    onClick,
    ...props
}: FlipLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={className}
            {...props}
        >
            <motion.div
                initial="initial"
                whileHover="hovered"
                className="relative block overflow-hidden whitespace-nowrap"
                style={{
                    lineHeight: 1,
                    height: "1em",
                }}
            >
                {/* First layer - base text */}
                <div className="relative">
                    {children.split("").map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: 0 },
                                hovered: { y: "-100%" },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                            style={{ color: baseColor, verticalAlign: "top" }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </div>

                {/* Second layer - hover text (positioned absolute, initially below) */}
                <div className="absolute inset-0">
                    {children.split("").map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                            style={{
                                verticalAlign: "top",
                                ...(hoverColor.includes("gradient") ? {
                                    backgroundImage: hoverColor,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    color: "transparent"
                                } : {
                                    color: hoverColor
                                })
                            }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </Link>
    )
}

// Variant without a Link wrapper — for use inside existing <Link> or <button> elements
interface FlipTextProps {
    children: string
    baseColor?: string
    hoverColor?: string
    className?: string
}

export function FlipText({
    children,
    baseColor = "inherit",
    hoverColor = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
    className = "",
}: FlipTextProps) {
    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={`relative block overflow-hidden whitespace-nowrap ${className}`}
            style={{ lineHeight: 1, height: "1em" }}
        >
            <div className="relative">
                {children.split("").map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
                        className="inline-block"
                        style={{ color: baseColor, verticalAlign: "top" }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0">
                {children.split("").map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: "100%" },
                            hovered: { y: 0 },
                        }}
                        transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
                        className="inline-block"
                        style={{
                            verticalAlign: "top",
                            ...(hoverColor.includes("gradient") ? {
                                backgroundImage: hoverColor,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent",
                            } : {
                                color: hoverColor,
                            }),
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    )
}
