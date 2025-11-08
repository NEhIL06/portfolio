"use client"

import Link from "next/link"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Copy, Linkedin, Github, Code2, X } from 'lucide-react'
import { useState } from "react"
import { siteConfig } from "@/lib/site-config"
import { Cursor } from "@/components/cursor"
import { GlowCard } from "@/components/glow-card"

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        } catch {
          // noop
        }
      }}
      className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all text-white hover:text-white"
    >
      <Copy className="mr-2 h-4 w-4 text-white" />
      <span className="text-white">{copied ? "Copied" : label}</span>
    </Button>
  )
}

export default function ConnectPage() {
  const { contact, socials } = siteConfig

  return (
    <main className="relative min-h-screen bg-black text-zinc-200 cursor-none">
      <MetallicBackground />
      <Cursor />
      <NavBar />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-28 pb-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h1>
          <p className="mt-3 text-zinc-400">
            I&apos;m always open to collaborating, brainstorming, or building something meaningful.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-200">
                  <Mail className="h-5 w-5 text-zinc-400" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Link href={`mailto:${contact.email}`} className="text-zinc-300 hover:text-zinc-50 underline underline-offset-4 transition-colors">
                  {contact.email}
                </Link>
                <CopyButton text={contact.email} />
              </CardContent>
            </Card>
          </GlowCard>

          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-200">
                  <MapPin className="h-5 w-5 text-zinc-400" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 text-lg">{contact.location}</CardContent>
            </Card>
          </GlowCard>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-1 max-w-3xl mx-auto">
          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-zinc-200 text-xl">Find Me Online</CardTitle>
                <p className="text-sm text-zinc-400 mt-2">Connect with me on these platforms</p>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn profile" className="text-white hover:text-white">
                    <Linkedin className="mr-2 h-4 w-4 text-white" />
                    <span className="text-white">LinkedIn</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <Link href={socials.x} target="_blank" aria-label="X profile" className="text-white hover:text-white">
                    <X className="mr-2 h-4 w-4 text-white" />
                    <span className="text-white">X</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <Link href={socials.github} target="_blank" aria-label="GitHub profile" className="text-white hover:text-white">
                    <Github className="mr-2 h-4 w-4 text-white" />
                    <span className="text-white">GitHub</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <Link href={socials.leetcode} target="_blank" aria-label="LeetCode profile" className="text-white hover:text-white">
                    <Code2 className="mr-2 h-4 w-4 text-white" />
                    <span className="text-white">LeetCode</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </GlowCard>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-zinc-200 text-2xl">What can we build together?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 text-lg leading-relaxed">
                I enjoy building things that work well and feel simple — whether it&apos;s an AI idea, a web app, or a fun side project. 
                Let&apos;s connect and make something awesome.
              </CardContent>
            </Card>
          </GlowCard>
        </div>
      </div>

      <Footer />
    </main>
  )
}