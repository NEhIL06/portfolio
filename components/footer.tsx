"use client"

import Link from "next/link"
import { useState } from "react"
import { siteConfig } from "@/lib/site-config"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { SplitText } from "@/components/motion/split-text"
import FlipLink from "@/components/motion/flip-link"
import { Github, Twitter, Linkedin, Copy, Check } from "lucide-react"

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <MagneticButton>
      <button
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 w-48 rounded-full bg-[#EDEDED] text-[#0a0a0a] px-8 py-4 text-lg font-medium transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      >
        {copied ? (
          <>
            <Check className="h-5 w-5 text-green-600" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-5 w-5" />
            <span>Copy Email</span>
          </>
        )}
      </button>
    </MagneticButton>
  )
}

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-32 flex flex-col items-center justify-center text-center">
        <div className="mb-8 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-[#111111] px-5 py-2.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-[#EDEDED]">{siteConfig.contact.location}</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-[#EDEDED] mb-8">
          <SplitText>Ready to build?</SplitText>
        </h2>
        <p className="text-lg text-[#A1A1AA] mb-12 max-w-lg">
          Whether you have a specific project in mind or just want to chat about engineering and design, I&apos;m always open to new connections.
        </p>

        <CopyEmailButton email={siteConfig.contact.email} />

        <div className="flex gap-6 mt-12">
          <a href={siteConfig.socials.github} target="_blank" className="text-[#A1A1AA] hover:text-[#EDEDED] hover:scale-110 transition-all p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">
            <Github className="h-5 w-5" />
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" className="text-[#A1A1AA] hover:text-[#0a66c2] hover:scale-110 transition-all p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#0a66c2]/10">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={siteConfig.socials.x} target="_blank" className="text-[#A1A1AA] hover:text-[#EDEDED] hover:scale-110 transition-all p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10 z-10 bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-sm text-[#A1A1AA]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="order-2 md:order-1 font-mono text-xs">
              © {new Date().getFullYear()} {siteConfig.name}. CRAFTED WITH TEA 🍵.
            </p>
            <div className="flex gap-8 order-1 md:order-2 font-medium tracking-wide">
              <FlipLink href="/projects" baseColor="#A1A1AA" hoverColor="#EDEDED">Projects</FlipLink>
              <FlipLink href="/about" baseColor="#A1A1AA" hoverColor="#EDEDED">About</FlipLink>
              <FlipLink href="/connect" baseColor="#A1A1AA" hoverColor="#EDEDED">Connect</FlipLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
