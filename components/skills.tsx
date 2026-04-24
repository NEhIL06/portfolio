"use client"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { Marquee } from "@/components/motion/marquee"
import { SplitText } from "@/components/motion/split-text"

export function Skills() {
  const { languages, frameworks, fundamentals } = siteConfig.skills

  // Ensure enough items to scroll smoothly without wrapping visibly
  const makeList = (arr: string[]) => Array(4).fill(arr).flat()

  const safeLanguages = makeList(languages)
  const safeFrameworks = makeList(frameworks)
  const safeFundamentals = makeList(fundamentals)

  return (
    <section className="py-24 sm:py-32 overflow-hidden relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-20 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tech Stack</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          <SplitText>Technical Arsenal</SplitText>
        </h2>
        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed">
          Specialized in building scalable backends, resilient architectures, and premium user experiences using modern technologies.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 md:gap-8 -rotate-1 scale-100 origin-center">
        {/* Languages & Frameworks (Row 1) */}
        <Marquee speed={40} className="[--gap:1.5rem]">
          {safeLanguages.concat(safeFrameworks).map((skill, idx) => (
            <motion.div
              key={`row1-${skill}-${idx}`}
              className="flex items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-r from-blue-500/10 to-blue-400/5 px-6 py-3 backdrop-blur-md transition-all hover:border-blue-400/60 hover:bg-blue-400/20 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-base md:text-lg font-semibold text-blue-100">{skill}</span>
            </motion.div>
          ))}
        </Marquee>

        {/* Fundamentals & DB (Row 2 - Reverse) */}
        <Marquee direction="right" speed={30} className="[--gap:1.5rem]">
          {safeFundamentals.concat(safeLanguages).map((skill, idx) => (
            <motion.div
              key={`row2-${skill}-${idx}`}
              className="flex items-center justify-center rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-400/5 px-6 py-3 backdrop-blur-md transition-all hover:border-amber-400/60 hover:bg-amber-400/20 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-base md:text-lg font-semibold text-amber-100">{skill}</span>
            </motion.div>
          ))}
        </Marquee>

        {/* Gradient fades on sides */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/80 to-transparent" />
      </div>
    </section>
  )
}

