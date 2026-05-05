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
    <section className="py-20 sm:py-32 overflow-hidden relative w-full">
      <div className="mx-auto max-w-5xl container-x mb-16 sm:mb-20 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-4 sm:mb-6">
          <SplitText>Technical Arsenal</SplitText>
        </h2>
        <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-2xl">
          The tools and technologies I use to build scalable backends, resilient architectures, and premium web experiences.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 md:gap-8 sm:-rotate-2 sm:scale-105 origin-center">
        {/* Languages & Frameworks (Row 1) */}
        <Marquee speed={40} className="[--gap:1rem] sm:[--gap:1.5rem]">
          {safeLanguages.concat(safeFrameworks).map((skill, idx) => (
            <div
              key={`row1-${skill}-${idx}`}
              className="flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-md transition-all hover:border-black/20 hover:bg-black/10 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]"
            >
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-800">{skill}</span>
            </div>
          ))}
        </Marquee>

        {/* Fundamentals & DB (Row 2 - Reverse) */}
        <Marquee direction="right" speed={30} className="[--gap:1rem] sm:[--gap:1.5rem]">
          {safeFundamentals.concat(safeLanguages).map((skill, idx) => (
            <div
              key={`row2-${skill}-${idx}`}
              className="flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-md transition-all hover:border-black/20 hover:bg-black/10 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]"
            >
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-800">{skill}</span>
            </div>
          ))}
        </Marquee>

        {/* Gradient fades on sides */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-1/4 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-1/4 bg-gradient-to-l from-white via-white/80 to-transparent" />
      </div>
    </section>
  )
}

