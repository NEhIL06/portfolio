"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const categories = ["Languages", "Frameworks & Tools", "Computer Fundamentals"] as const

export function Skills() {
  const skills = siteConfig.skills
  const [active, setActive] = useState<(typeof categories)[number]>("Languages")

  const activeList = useMemo(() => {
    if (active === "Languages") return skills.languages
    if (active === "Frameworks & Tools") return skills.frameworks
    return skills.fundamentals
  }, [active, skills])

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100">Skills</h2>

        <div className="flex gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/40 p-1 backdrop-blur">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                active === cat ? "bg-zinc-800 text-zinc-100" : "text-zinc-300 hover:text-zinc-100"
              )}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {activeList.map((skill) => (
            <motion.div
              key={skill}
              layout
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="group rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 backdrop-blur hover:border-zinc-700/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-200">{skill}</span>
                <Badge className="border border-zinc-700/80 bg-zinc-900/40 text-zinc-300">Pro</Badge>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80">
                <div className="h-full w-3/4 bg-gradient-to-r from-amber-300/80 to-amber-500/80 group-hover:from-amber-200 group-hover:to-amber-400 transition-all" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
