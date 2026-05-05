"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { GlowCard } from "./glow-card"
import { SplitText } from "@/components/motion/split-text"

export function Achievements() {
  const items = siteConfig.achievements

  return (
    <div className="mx-auto max-w-5xl container-x py-20 md:py-32 flex flex-col md:flex-row gap-8 md:gap-12 relative items-start">
      <div className="md:w-1/3 md:sticky md:top-64">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          <SplitText>Milestones</SplitText>
        </h2>
        <p className="text-gray-500">Key moments, hackathons, and recognitions along the journey.</p>
      </div>

      <div className="md:w-2/3 relative pt-4 md:pt-0">
        <div aria-hidden="true" className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-400/50 to-gray-200 sm:left-6" />
        <ul className="space-y-12">
          {items.map((a, idx) => (
            <li key={a.title + idx} className="relative pl-12 sm:pl-16">
              <span className="absolute left-[11px] sm:left-[19px] top-2 h-3 w-3 rounded-full bg-gradient-to-tr from-amber-300 to-amber-500 shadow-[0_0_18px_-2px_rgba(251,191,36,0.7)]" />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlowCard>
                  <div className="rounded-2xl border border-black/10 bg-white p-6 backdrop-blur transition-all duration-300 hover:bg-gray-50">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2">
                        <h3 className="text-lg sm:text-2xl text-gray-900 font-semibold">{a.title}</h3>
                        <div className="self-start sm:self-auto text-xs sm:text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap border border-gray-200">{a.date}</div>
                      </div>
                      {a.subtitle && (
                        <p className="text-base font-medium text-amber-400/90 mt-1">{a.subtitle}</p>
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

