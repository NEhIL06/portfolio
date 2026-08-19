"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { Button } from "@/components/ui/button"

import { ArrowRight, ChevronDown } from 'lucide-react'
import FlipLink from "@/components/motion/flip-link"

export function Hero() {
  const { name } = siteConfig

  return (
    <div className="relative mx-auto flex h-[100dvh] min-h-[600px] flex-col items-center justify-center max-w-5xl container-x pb-20 sm:pb-32 pt-0 text-center overflow-hidden">
      {/* Ambient beams */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 h-[600px] w-[1200px] max-w-[100vw] -translate-x-1/2">
        <div className="absolute inset-0 blur-[100px] opacity-10 bg-[conic-gradient(from_120deg,rgba(0,0,0,0.1),rgba(100,100,100,0.03),rgba(0,0,0,0.08))]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center -mt-14 sm:-mt-18 md:-mt-25"
      >
        <h1
          className="text-[clamp(2.75rem,11vw,4rem)] sm:text-7xl md:text-8xl lg:text-9xl leading-[1.05] font-semibold tracking-tight font-serif"
        >
          <span className="flex flex-wrap justify-center gap-x-[0.2em] bg-[linear-gradient(110deg,#111111,#444444_40%,#111111_65%,#222222_95%)] bg-clip-text text-transparent [background-size:200%] animate-[shine_8s_linear_infinite]">
            {name.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: wordIdx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-5 text-[11px] sm:text-base font-medium tracking-[0.2em] uppercase text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (name.length * 0.04) + 1.1, duration: 0.8 }}
        >
          Developer&nbsp;•&nbsp;Engineer&nbsp;•&nbsp;Designer
        </motion.p>

        <motion.p
          className="mt-3 max-w-xl text-sm sm:text-lg text-gray-500 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (name.length * 0.04) + 1.2, duration: 0.8 }}
        >
          builder&nbsp;—&nbsp;crafting systems, shaping experiences.
        </motion.p>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 pb-safe"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: 0% 0; }
        }
      `}</style>
    </div>
  )
}

