import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion"
import { useRef } from "react"

interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode
    id?: string
    className?: string
    parallax?: boolean
    speed?: number
}

export function Section({ children, id, className, parallax = false, speed = 1, ...props }: SectionProps) {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [parallax ? speed * 50 : 0, parallax ? speed * -50 : 0])

    return (
        <motion.section
            ref={ref}
            id={id}
            style={{ y }}
            className={cn("scroll-mt-24 py-20 md:py-28", className)}
            {...props}
        >
            {children}
        </motion.section>
    )
}
