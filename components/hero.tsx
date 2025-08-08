"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { Badge } from "@/components/ui/badge"
import { Bodoni_Moda, Playfair_Display } from 'next/font/google'

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export function Hero() {
  const { name, tagline, role, education } = siteConfig

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-32 pb-16">
      {/* Ambient beams */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 h-[600px] w-[1200px] -translate-x-1/2">
        <div className="absolute inset-0 blur-3xl opacity-20 bg-[conic-gradient(from_120deg,rgba(255,255,255,0.2),rgba(180,180,180,0.05),rgba(255,255,255,0.15))]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >

        
          <div className="inline-flex flex-wrap items-center gap-2">
            <Badge className="bg-zinc-900/60 border border-zinc-700/70 text-zinc-300">{education.institute}</Badge>
            <Badge className="bg-zinc-900/60 border border-zinc-700/70 text-zinc-300">{education.degree}</Badge>
            <Badge className="bg-zinc-900/60 border border-zinc-700/70 text-zinc-300">Graduating {education.graduation}</Badge>
          </div>

          <h1
            className={`mt-6 text-5xl sm:text-6xl md:text-7xl leading-[0.95] font-semibold tracking-tight ${bodoni.className}`}
          >
            <span className="bg-[linear-gradient(110deg,#fafafa,#d5d5d5_40%,#a3a3a3_65%,#fafafa_95%)] bg-clip-text text-transparent [background-size:200%] animate-[shine_8s_linear_infinite]">
              {name}
            </span>
          </h1>

          <p className={`mt-4 text-xl text-zinc-300 ${playfair.className}`}>{role}</p>
          <p className="mt-2 max-w-2xl text-zinc-400">{tagline}</p>

          <div className="mt-6 text-sm text-zinc-500">
            <span className="font-medium text-zinc-300">{education.institute}</span> • {education.location}
          </div>
        
          
        
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
