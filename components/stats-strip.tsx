"use client"
import { AnimatedCounter } from "@/components/motion/animated-counter"
import { siteConfig } from "@/lib/site-config"

export function StatsStrip() {
    const { stats } = siteConfig

    return (
        <div className="mx-auto max-w-5xl container-x py-10 sm:py-12 border-y border-white/10 bg-black/40 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center divide-x divide-white/10">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center px-2 min-h-[90px]">
                        <div className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#EDEDED] mb-2 font-mono tabular-nums">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-[10px] sm:text-sm text-[#A1A1AA] uppercase tracking-wider leading-tight">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
