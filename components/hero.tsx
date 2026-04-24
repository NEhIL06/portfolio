"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { Button } from "@/components/ui/button"

import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import FlipLink from "@/components/motion/flip-link"

export function Hero() {
  const { name } = siteConfig

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const x = clientX - window.innerWidth / 2
    const y = clientY - window.innerHeight / 2
    
    // Update gradient position based on mouse for subtle effect
    const element = e.currentTarget.querySelector('[data-gradient]') as HTMLElement
    if (element) {
      element.style.setProperty('--mouse-x', `${x / 50}px`)
      element.style.setProperty('--mouse-y', `${y / 50}px`)
    }
  }

  return (
    <div 
      className="relative mx-auto flex h-[100dvh] min-h-[600px] flex-col items-center justify-center max-w-5xl px-2 sm:px-6 pb-32 pt-0 text-center"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced ambient background */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0"
        data-gradient
        style={{
          '--mouse-x': '0px',
          '--mouse-y': '0px',
        } as React.CSSProperties}
      >
        {/* Primary gradient beam */}
        <div className="absolute left-1/2 top-10 h-[600px] w-[1200px] -translate-x-1/2">
          <div className="absolute inset-0 blur-[100px] opacity-25 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.15),transparent_70%)]" />
        </div>
        
        {/* Secondary accent gradient */}
        <div className="absolute right-0 top-1/3 h-[500px] w-[800px]">
          <div className="absolute inset-0 blur-[120px] opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.1),transparent_70%)]" />
        </div>

        {/* Tertiary accent */}
        <div className="absolute left-0 bottom-0 h-[400px] w-[600px]">
          <div className="absolute inset-0 blur-[100px] opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_70%)]" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Refined tagline above name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-zinc-300">Full-Stack Builder</span>
          </div>
        </motion.div>

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

        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (name.length * 0.04) + 1.0, duration: 0.6 }}
        >
          <span className="text-sm font-medium text-zinc-400">Developer</span>
          <span className="text-blue-400/60">•</span>
          <span className="text-sm font-medium text-zinc-400">Engineer</span>
          <span className="text-green-400/60">•</span>
          <span className="text-sm font-medium text-zinc-400">Designer</span>
        </motion.div>

        <motion.p
          className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (name.length * 0.04) + 1.2, duration: 0.8 }}
        >
          I craft full-stack solutions and intuitive experiences. Specializing in scalable systems, modern design, and turning complex ideas into elegant products.
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (name.length * 0.04) + 1.5, duration: 0.8 }}
        >
          <MagneticButton>
            <Button
              variant="default"
              className="group w-full sm:w-auto bg-gradient-to-r from-blue-400 to-blue-500 text-black hover:from-blue-300 hover:to-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.3)] rounded-full px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center sm:justify-start"
            >
              <FlipLink
                href="/connect"
                baseColor="#000000"
                hoverColor="#000000"
                className="flex items-center gap-2"
              >
                Let&apos;s Connect
              </FlipLink>
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button
              variant="outline"
              className="w-full sm:w-auto border border-blue-400/30 bg-blue-400/5 hover:bg-blue-400/10 hover:text-blue-200 hover:border-blue-400/50 backdrop-blur-md rounded-full px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-base font-semibold text-zinc-200 transition-all duration-300 flex items-center justify-center group"
            >
              <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:scale-110" />
              <FlipLink
                href="/Nehil_SDE (1).pdf"
                target="_blank"
                aria-label="Download resume as PDF"
                baseColor="#e5e7eb"
                hoverColor="#bfdbfe"
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
        transition={{ delay: 1.2, duration: 1 }}
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

