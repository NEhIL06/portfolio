"use client"

import { siteConfig } from "@/lib/site-config"
import { TextReveal } from "@/components/motion/text-reveal"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function WhoAmI() {
  const { about } = siteConfig

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-24 md:py-40 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-full max-w-4xl">
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="h-2 w-2 rounded-full bg-white" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">About Me</span>
        </div>

        {/* Document scale scroll-driven text reveal */}
        <TextReveal className="text-2xl sm:text-3xl md:text-4xl leading-snug font-medium text-white">
          {about.intro}
        </TextReveal>

        <div className="mt-16 flex justify-center sm:justify-start opacity-90 hover:opacity-100 transition-opacity group">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-base font-semibold text-zinc-300 hover:text-blue-300 group border-b border-transparent group-hover:border-blue-300 pb-1 transition-all duration-300"
          >
            Learn more about my journey
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

