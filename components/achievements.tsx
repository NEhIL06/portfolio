"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { GlowCard } from "./glow-card"
import { SplitText } from "@/components/motion/split-text"

export function Achievements() {
  const items = siteConfig.achievements

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-24 md:py-32 flex flex-col md:flex-row gap-12 relative items-start">
      <div className="md:w-1/3 md:sticky md:top-64">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Achievements</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          <SplitText>Milestones</SplitText>
        </h2>
        <p className="text-zinc-400 leading-relaxed">Key moments, awards, and recognitions that showcase growth and impact.</p>
      </div>

      <div className="md:w-2/3 relative pt-4 md:pt-0">
        <div aria-hidden="true" className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/10 to-transparent sm:left-6" />
        <ul className="space-y-12">
          {items.map((a, idx) => (
            <li key={a.title + idx} className="relative pl-12 sm:pl-16">
              <span className="absolute left-[11px] sm:left-[19px] top-2 h-3 w-3 rounded-full bg-gradient-to-tr from-amber-300 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlowCard>
                  <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400/15">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-y-2">
                        <h3 className="text-xl sm:text-2xl text-white font-bold hover:text-amber-100 transition-colors">{a.title}</h3>
                        <div className="text-xs font-semibold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full whitespace-nowrap">{a.date}</div>
                      </div>
                      {a.subtitle && (
                        <p className="text-base font-medium text-amber-200/80 mt-2">{a.subtitle}</p>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

