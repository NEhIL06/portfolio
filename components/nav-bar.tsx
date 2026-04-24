"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import FlipLink, { FlipText } from "@/components/motion/flip-link"

// All nav items — Home first, then the rest
const allNavLinks = [
  ...siteConfig.navItems,
]

const pillTransition = { type: "spring" as const, stiffness: 350, damping: 35 }

export function NavBar() {
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/projects") return pathname.startsWith("/projects")
    return pathname === href
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto rounded-full border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl">
      <div className="relative flex items-center justify-between px-3 py-2 gap-2">
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/0 via-white/50 to-white origin-left z-0"
          style={{ scaleX }}
        />

        {/* Desktop nav — all links including Home in one row */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1 relative z-10">
          {allNavLinks.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 select-none flex items-center",
                  active ? "text-black" : "text-[#A1A1AA] hover:text-white"
                )}
              >
                {/* The sliding pill — one shared layoutId means Framer Motion animates it smoothly */}
                {active && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={pillTransition}
                  />
                )}
                <span className="relative z-10">
                  <FlipText
                    baseColor="inherit"
                    hoverColor={active ? "#0a0a0a" : "#ffffff"}
                  >
                    {l.label}
                  </FlipText>
                </span>
              </Link>
            )
          })}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3 relative z-10 pl-2">
          <Button
            size="sm"
            className="hidden sm:inline-flex bg-gradient-to-r from-blue-400 to-blue-500 text-black hover:from-blue-300 hover:to-blue-400 border-0 rounded-full px-5 font-semibold transition-all active:scale-95 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
          >
            <FlipLink
              href="/connect"
              baseColor="#000000"
              hoverColor="#000000"
              className="flex items-center"
            >
              {"Let's Talk"}
            </FlipLink>
          </Button>

          <button
            className="md:hidden text-[#A1A1AA] hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-20 mx-4 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-black via-blue-950/20 to-black backdrop-blur-xl p-6 shadow-2xl z-40"
          >
            <nav className="flex flex-col gap-4">
              {allNavLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FlipLink
                    href={l.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    baseColor={isActive(l.href) ? "#ffffff" : "#a1a1aa"}
                    hoverColor="#ffffff"
                    className={cn(
                      "block text-lg font-medium py-2",
                      isActive(l.href) ? "text-white" : "text-zinc-400"
                    )}
                  >
                    {l.label}
                  </FlipLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: allNavLinks.length * 0.05 + 0.1 }}
                className="mt-4 pt-4 border-t border-zinc-800/50"
              >
                <Button asChild className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-black hover:from-blue-300 hover:to-blue-400 rounded-full font-semibold shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                  <FlipLink
                    href="/connect"
                    onClick={() => setIsMobileMenuOpen(false)}
                    baseColor="#000000"
                    hoverColor="#000000"
                    className="flex items-center justify-center w-full"
                  >
                    {"Let's Talk"}
                  </FlipLink>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
