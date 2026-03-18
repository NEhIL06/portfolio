"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import FlipLink from "@/components/motion/flip-link"

export function Hero() {
  const { name } = siteConfig

  return (
    <div className="relative mx-auto flex h-[100dvh] min-h-[600px] flex-col items-center justify-center max-w-5xl px-2 sm:px-6 pb-32 pt-0 text-center">
      {/* Ambient beams */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 h-[600px] w-[1200px] -translate-x-1/2">
        <div className="absolute inset-0 blur-[100px] opacity-20 bg-[conic-gradient(from_120deg,rgba(255,255,255,0.2),rgba(180,180,180,0.05),rgba(255,255,255,0.15))]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.05] font-semibold tracking-tight font-serif"
        >
          <span className="flex flex-wrap justify-center gap-x-[0.2em] bg-[linear-gradient(110deg,#fafafa,#d5d5d5_40%,#a3a3a3_65%,#fafafa_95%)] bg-clip-text text-transparent [background-size:200%] animate-[shine_8s_linear_infinite]">
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
          className="mt-6 text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-[#A1A1AA]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (name.length * 0.04) + 1.1, duration: 0.8 }}
        >
          Developer&nbsp;•&nbsp;Engineer&nbsp;•&nbsp;Designer
        </motion.p>

        <motion.p
          className="mt-3 max-w-xl text-base sm:text-lg text-zinc-500 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (name.length * 0.04) + 1.2, duration: 0.8 }}
        >
          builder&nbsp;—&nbsp;crafting systems, shaping experiences.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (name.length * 0.04) + 1.4, duration: 0.8 }}
        >
          <MagneticButton>
            <Button
              variant="default"
              className="group bg-[#EDEDED] text-[#0a0a0a] hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full px-8 py-6 text-lg transition-all flex items-center"
            >
              <FlipLink
                href="/connect"
                baseColor="#0a0a0a"
                hoverColor="#0a0a0a"
                className="flex items-center gap-2"
              >
                Connect with me
              </FlipLink>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button
              variant="outline"
              className="border-white/10 bg-black/40 hover:bg-white/5 hover:text-[#EDEDED] backdrop-blur-md rounded-full px-8 py-6 text-lg text-[#EDEDED] transition-colors flex items-center"
            >
              <Download className="mr-2 h-5 w-5" />
              <FlipLink
                href="/Nehil_SDE (1).pdf"
                target="_blank"
                aria-label="Download resume as PDF"
                baseColor="#EDEDED"
                hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"
              >
                Resume
              </FlipLink>
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-zinc-600" />
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

