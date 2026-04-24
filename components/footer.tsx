"use client"


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
        className="inline-flex items-center justify-center gap-2 w-48 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-black px-8 py-4 text-base font-semibold transition-all hover:from-blue-300 hover:to-blue-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(96,165,250,0.4)]"
      >
        {copied ? (
          <>
            <Check className="h-5 w-5 text-green-300" />
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
    <footer className="relative mt-32 border-t border-blue-400/20 bg-gradient-to-b from-black to-blue-950/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(96,165,250,0.05)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-32 flex flex-col items-center justify-center text-center">
        <div className="mb-8 inline-flex items-center justify-center gap-3 rounded-full border border-blue-400/30 bg-blue-400/10 px-5 py-2.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
          </span>
          <span className="text-sm font-semibold text-blue-200">{siteConfig.contact.location}</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8">
          <SplitText>Ready to build?</SplitText>
        </h2>
        <p className="text-lg text-zinc-300 mb-12 max-w-lg leading-relaxed">
          Whether you have a specific project in mind or just want to chat about engineering and design, I&apos;m always open to new connections.
        </p>

        <CopyEmailButton email={siteConfig.contact.email} />

        <div className="flex gap-6 mt-12">
          <a href={siteConfig.socials.github} target="_blank" className="text-zinc-400 hover:text-blue-300 hover:scale-110 transition-all p-3 bg-white/5 border border-white/10 rounded-full hover:border-blue-400/50 hover:bg-blue-400/10">
            <Github className="h-5 w-5" />
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" className="text-zinc-400 hover:text-blue-300 hover:scale-110 transition-all p-3 bg-white/5 border border-white/10 rounded-full hover:border-blue-400/50 hover:bg-blue-400/10">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={siteConfig.socials.x} target="_blank" className="text-zinc-400 hover:text-blue-300 hover:scale-110 transition-all p-3 bg-white/5 border border-white/10 rounded-full hover:border-blue-400/50 hover:bg-blue-400/10">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative border-t border-blue-400/10 z-10 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-sm text-zinc-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="order-2 md:order-1 font-mono text-xs text-zinc-500">
              © {new Date().getFullYear()} {siteConfig.name}. Crafted with passion.
            </p>
            <div className="flex gap-8 order-1 md:order-2 font-semibold tracking-wider">
              <FlipLink href="/projects" baseColor="#a1a1aa" hoverColor="#bfdbfe">Projects</FlipLink>
              <FlipLink href="/about" baseColor="#a1a1aa" hoverColor="#bfdbfe">About</FlipLink>
              <FlipLink href="/connect" baseColor="#a1a1aa" hoverColor="#bfdbfe">Connect</FlipLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
