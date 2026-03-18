"use client"
import { motion } from "framer-motion"
import { useReducedMotion } from "./use-reduced-motion"

interface SplitTextProps {
    children: string
    className?: string
    delay?: number
}

export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
    const prefersReducedMotion = useReducedMotion()
    const words = children.split(" ")

    if (prefersReducedMotion) {
        return <span className={className}>{children}</span>
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: delay }
        }
    }

    const wordVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } }
    }

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span className="inline-block mr-[0.25em]" variants={wordVariants}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    )
}
