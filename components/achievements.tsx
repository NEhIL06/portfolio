"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { GlowCard } from "./glow-card"

export function Achievements() {
  const items = siteConfig.achievements

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100">Achievements</h2>

      <div className="relative mt-6">
        <div aria-hidden="true" className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800/70 sm:left-6" />
        <ul className="space-y-6">
          {items.map((a, idx) => (
            <li key={a.title + idx} className="relative pl-10 sm:pl-14">
              <span className="absolute left-2.5 sm:left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-amber-300 to-amber-500 shadow-[0_0_18px_-2px_rgba(251,191,36,0.7)]" />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <GlowCard>
                  <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-4 backdrop-blur">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-zinc-100 font-medium">{a.title}</h3>
                        {a.subtitle && <p className="text-sm text-zinc-400">{a.subtitle}</p>}
                      </div>
                      <div className="text-sm text-zinc-400">{a.date}</div>
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
