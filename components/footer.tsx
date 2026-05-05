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
        className="inline-flex items-center justify-center gap-2 w-48 rounded-full bg-gray-900 text-white px-8 py-4 text-lg font-medium transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
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
    <footer className="relative mt-20 sm:mt-32 border-t border-black/10 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.02)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl container-x py-20 sm:py-28 md:py-32 flex flex-col items-center justify-center text-center">
        <div className="mb-8 flex items-center justify-center gap-3 rounded-full border border-black/10 bg-gray-50 px-5 py-2.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-900">{siteConfig.contact.location}</span>
        </div>

        <h2 className="text-3xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-gray-900 mb-6 sm:mb-8 leading-[1.1]">
          <SplitText>Ready to build?</SplitText>
        </h2>
        <p className="text-base sm:text-lg text-gray-500 mb-10 sm:mb-12 max-w-lg px-2">
          Whether you have a specific project in mind or just want to chat about engineering and design, I&apos;m always open to new connections.
        </p>

        <CopyEmailButton email={siteConfig.contact.email} />

        <div className="flex gap-4 sm:gap-6 mt-10 sm:mt-12">
          <a href={siteConfig.socials.github} target="_blank" className="text-gray-500 hover:text-gray-900 hover:scale-110 transition-all p-3 bg-black/5 border border-black/10 rounded-full hover:bg-black/10">
            <Github className="h-5 w-5" />
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" className="text-gray-500 hover:text-[#0a66c2] hover:scale-110 transition-all p-3 bg-black/5 border border-black/10 rounded-full hover:bg-[#0a66c2]/10">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={siteConfig.socials.x} target="_blank" className="text-gray-500 hover:text-gray-900 hover:scale-110 transition-all p-3 bg-black/5 border border-black/10 rounded-full hover:bg-black/10">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative border-t border-black/10 z-10 bg-gray-50">
        <div className="mx-auto max-w-5xl container-x py-6 sm:py-8 pb-safe text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="order-2 md:order-1 font-mono text-xs text-center md:text-left">
              © {new Date().getFullYear()} {siteConfig.name}. CRAFTED WITH TEA 🍵.
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 order-1 md:order-2 font-medium tracking-wide">
              <FlipLink href="/projects" baseColor="#6b7280" hoverColor="#111111">Projects</FlipLink>
              <FlipLink href="/about" baseColor="#6b7280" hoverColor="#111111">About</FlipLink>
              <FlipLink href="/connect" baseColor="#6b7280" hoverColor="#111111">Connect</FlipLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
