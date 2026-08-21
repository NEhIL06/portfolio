"use client"

import { useState } from "react"
import { siteConfig } from "@/lib/site-config"
import FlipLink from "@/components/motion/flip-link"
import { ArrowRight, Check, Copy, Globe } from "lucide-react"

// Checkerboard pattern top strip
function CheckerboardBanner() {
  return (
    <div className="w-full max-w-full h-5 sm:h-6 bg-black relative overflow-hidden border-b border-zinc-900 select-none">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='8' height='8' fill='%23ffffff'/%3E%3Crect x='8' width='8' height='8' fill='%23000000'/%3E%3Crect y='8' width='8' height='8' fill='%23000000'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Glowing electric yellow dot accent on top right */}
      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFE500] shadow-[0_0_8px_#FFE500] z-10" />
    </div>
  )
}

// Technical Ruler strip with numbered gauge ticks (-05 to 05)
function RulerStrip() {
  return (
    <div className="w-full max-w-full bg-black py-2 sm:py-3 border-b border-zinc-900/80 overflow-hidden select-none">
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
        {/* Gauge Ticks */}
        <div className="w-full flex items-end justify-between h-3.5 opacity-60 overflow-hidden">
          {Array.from({ length: 33 }).map((_, i) => {
            const isMajor = i % 4 === 0
            return (
              <div
                key={i}
                className={`bg-zinc-400 shrink-0 ${
                  isMajor ? "h-3.5 w-[1.5px] bg-zinc-200" : "h-1.5 w-[1px] bg-zinc-600"
                }`}
              />
            )
          })}
        </div>
        {/* Scale Numbers */}
        <div className="w-full flex justify-between mt-1 font-mono text-[9px] sm:text-xs text-zinc-500 font-medium">
          <span className="hidden sm:inline">-05</span>
          <span className="hidden sm:inline">-04</span>
          <span className="hidden sm:inline">-03</span>
          <span className="hidden sm:inline">-02</span>
          <span>-01</span>
          <span className="text-zinc-200 font-bold">00</span>
          <span>01</span>
          <span className="hidden sm:inline">02</span>
          <span className="hidden sm:inline">03</span>
          <span className="hidden sm:inline">04</span>
          <span className="hidden sm:inline">05</span>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const socialLinks = [
    { name: "BEHANCE", url: "https://behance.net" },
    { name: "LINKEDIN", url: siteConfig.socials.linkedin },
    { name: "INSTAGRAM", url: "https://instagram.com" },
    { name: "GITHUB", url: siteConfig.socials.github },
    { name: "X", url: siteConfig.socials.x },
  ].filter((s) => Boolean(s.url))

  return (
    <footer className="relative bg-black text-white w-full max-w-full overflow-hidden select-none font-sans border-t border-zinc-900 mt-20 sm:mt-32">
      {/* Top Banner & Ruler */}
      <CheckerboardBanner />
      <RulerStrip />

      {/* Main High-Impact Header Section */}
      <div className="relative py-12 sm:py-20 md:py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden max-w-full">
        {/* Eyebrow */}
        <p className="font-mono tracking-[0.25em] text-xs sm:text-sm font-extrabold text-white uppercase mb-2 sm:mb-4">
          READY TO WORK?
        </p>

        {/* Giant Yellow Condensed Display Heading (Responsive font size to prevent overflow) */}
        <div className="w-full overflow-hidden flex justify-center items-center py-2">
          <h2 className="font-[family-name:var(--font-bebas)] text-[#FFE500] text-[13vw] sm:text-[12vw] md:text-[9rem] lg:text-[12rem] xl:text-[13.5rem] leading-[0.85] font-normal tracking-normal uppercase select-none transform scale-y-110 sm:scale-y-125 whitespace-nowrap">
            CONTACT ME
          </h2>
        </div>

        {/* Overlaid Floating Capsule Contact Button */}
        <div className="relative -mt-6 sm:-mt-14 md:-mt-20 z-20 group">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-3 sm:gap-4 bg-black/90 hover:bg-black border border-zinc-600/90 rounded-full px-5 py-2 sm:px-8 sm:py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#FFE500] cursor-pointer"
            aria-label="Copy contact email"
          >
            <span className="font-sans font-bold tracking-widest text-base sm:text-xl md:text-2xl text-white group-hover:text-[#FFE500] transition-colors">
              {copied ? "COPIED!" : "CONTACT"}
            </span>
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FFE500] text-black flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:scale-110 shrink-0">
              {copied ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5 stroke-[3]" />
              ) : (
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
              )}
            </div>
          </button>
        </div>

        {/* Navigation Items Row with Yellow Star Separators */}
        <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10 sm:mt-16 text-xs sm:text-sm font-semibold tracking-widest uppercase font-mono px-4 max-w-full">
          <FlipLink href="/" baseColor="#A1A1AA" hoverColor="#FFE500">
            HOME
          </FlipLink>
          <span className="text-[#FFE500] text-xs sm:text-sm select-none">✦</span>
          <FlipLink href="/about" baseColor="#A1A1AA" hoverColor="#FFE500">
            ABOUT
          </FlipLink>
          <span className="text-[#FFE500] text-xs sm:text-sm select-none">✦</span>
          <FlipLink href="/projects" baseColor="#A1A1AA" hoverColor="#FFE500">
            PROJECTS
          </FlipLink>
          <span className="text-[#FFE500] text-xs sm:text-sm select-none">✦</span>
          <FlipLink href="/writing" baseColor="#A1A1AA" hoverColor="#FFE500">
            WRITING
          </FlipLink>
        </nav>
      </div>

      {/* Middle Split Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b border-zinc-800 bg-black w-full max-w-full overflow-hidden">
        {/* Left Cell */}
        <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-zinc-800 flex items-center">
          <p className="font-mono text-xs sm:text-sm tracking-wider text-zinc-300 font-medium uppercase leading-relaxed max-w-md">
            GOT SOME EXCITING IDEAS? LET&apos;S CONNECT AND CREATE SOMETHING EXTRAORDINARY TOGETHER!
          </p>
        </div>

        {/* Right Cell */}
        <div
          onClick={handleCopyEmail}
          className="p-6 sm:p-10 flex items-center justify-between group cursor-pointer hover:bg-zinc-950/80 transition-colors overflow-hidden"
        >
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <span className="text-[#FFE500] text-lg sm:text-xl font-bold select-none shrink-0">✦</span>
            <span className="font-mono text-xs sm:text-lg md:text-xl font-semibold text-white tracking-tight group-hover:text-[#FFE500] transition-colors truncate">
              {siteConfig.contact.email}
            </span>
          </div>
          <div className="shrink-0 ml-2 p-2 rounded-full border border-zinc-800 text-zinc-400 group-hover:border-[#FFE500] group-hover:text-[#FFE500] transition-colors">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="px-6 sm:px-10 py-6 bg-black flex flex-col md:flex-row items-center justify-between text-xs font-mono w-full max-w-full overflow-hidden">
        {/* Left Globe / Location Badge */}
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-300 hover:border-[#FFE500] hover:text-[#FFE500] transition-colors">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px] text-zinc-400">
            {siteConfig.contact.location || "REMOTE"}
          </span>
        </div>

        {/* Middle Social Outline Pills */}
        {/* <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-700/80 hover:border-[#FFE500] hover:bg-[#FFE500] hover:text-black px-3.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-mono tracking-widest transition-all duration-200 text-zinc-300 uppercase"
            >
              {social.name}
            </a>
          ))}
        </div> */}

        {/* Right Credits */}
        <div className="text-zinc-400 text-center md:text-right tracking-wider text-[11px] sm:text-xs">
          Crafted by{" "}
          <span className="font-extrabold text-[#FFE500] uppercase tracking-wider">
            {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
