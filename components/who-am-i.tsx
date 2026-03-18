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
        <h2 className="text-sm font-mono tracking-widest text-zinc-500 uppercase mb-8 text-center sm:text-left">Who Am I</h2>

        {/* Document scale scroll-driven text reveal */}
        <TextReveal className="text-2xl sm:text-3xl md:text-4xl leading-snug font-medium text-white/90">
          {about.intro}
        </TextReveal>

        <div className="mt-16 flex justify-center sm:justify-start opacity-80 hover:opacity-100 transition-opacity">
          <Link
            href="/about"
            className="group flex items-center gap-2 text-lg font-medium text-zinc-300 hover:text-white"
          >
            Learn more about my journey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

