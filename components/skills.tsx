"use client"
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
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6">
          <SplitText>Technical Arsenal</SplitText>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
          The tools and technologies I use to build scalable backends, resilient architectures, and premium web experiences.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 md:gap-8 -rotate-2 scale-105 origin-center">
        {/* Languages & Frameworks (Row 1) */}
        <Marquee speed={40} className="[--gap:1.5rem]">
          {safeLanguages.concat(safeFrameworks).map((skill, idx) => (
            <div
              key={`row1-${skill}-${idx}`}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <span className="text-base md:text-lg font-medium text-[#EDEDED]">{skill}</span>
            </div>
          ))}
        </Marquee>

        {/* Fundamentals & DB (Row 2 - Reverse) */}
        <Marquee direction="right" speed={30} className="[--gap:1.5rem]">
          {safeFundamentals.concat(safeLanguages).map((skill, idx) => (
            <div
              key={`row2-${skill}-${idx}`}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <span className="text-base md:text-lg font-medium text-[#EDEDED]">{skill}</span>
            </div>
          ))}
        </Marquee>

        {/* Gradient fades on sides */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/80 to-transparent" />
      </div>
    </section>
  )
}

