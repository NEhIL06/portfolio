"use client"
import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/motion/animated-counter"
import { siteConfig } from "@/lib/site-config"

export function StatsStrip() {
    const { stats } = siteConfig
    const colors = ['bg-blue-500/20 border-blue-400/30', 'bg-green-500/20 border-green-400/30', 'bg-amber-500/20 border-amber-400/30']

    return (
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-16 border-y border-white/10 bg-gradient-to-r from-blue-500/5 via-black to-green-500/5 backdrop-blur-md overflow-hidden">
            {/* Accent lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 top-1/2 h-[1px] w-1/4 bg-gradient-to-r from-blue-400/20 to-transparent" />
                <div className="absolute right-0 top-1/2 h-[1px] w-1/4 bg-gradient-to-l from-green-400/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5 relative z-10">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i} 
                        className="flex flex-col items-center justify-center pt-8 md:pt-0 min-w-[200px] min-h-[120px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                    >
                        <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${colors[i]} border mb-4`}>
                            <div className="text-xl font-bold text-white">
                                {i === 0 && '⚡'}
                                {i === 1 && '🚀'}
                                {i === 2 && '✨'}
                            </div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-3 font-mono tabular-nums">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest letter-spacing-1">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
