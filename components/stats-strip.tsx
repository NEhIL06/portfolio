"use client"
import { AnimatedCounter } from "@/components/motion/animated-counter"
import { siteConfig } from "@/lib/site-config"

export function StatsStrip() {
    const { stats } = siteConfig

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-y border-white/10 bg-black/40 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 min-w-[200px] min-h-[100px]">
                        <div className="text-4xl md:text-5xl font-semibold text-[#EDEDED] mb-2 font-mono tabular-nums">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-sm text-[#A1A1AA] uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
