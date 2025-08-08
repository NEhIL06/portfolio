"use client"

import Link from "next/link"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Copy, Linkedin, Github, Code2, Twitter } from 'lucide-react'
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
      className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40"
    >
      <Copy className="mr-2 h-4 w-4" />
      {copied ? "Copied" : label}
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

        <div className="grid gap-6 md:grid-cols-3">
          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-200">
                  <Mail className="h-5 w-5 text-zinc-400" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Link href={`mailto:${contact.email}`} className="text-zinc-300 hover:text-zinc-50 underline underline-offset-4">
                  {contact.email}
                </Link>
                <CopyButton text={contact.email} />
              </CardContent>
            </Card>
          </GlowCard>

          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-200">
                  <Phone className="h-5 w-5 text-zinc-400" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Link href={`tel:${contact.phone}`} className="text-zinc-300 hover:text-zinc-50">
                  {contact.phone}
                </Link>
                <CopyButton text={contact.phone} />
              </CardContent>
            </Card>
          </GlowCard>

          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-200">
                  <MapPin className="h-5 w-5 text-zinc-400" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">{contact.location}</CardContent>
            </Card>
          </GlowCard>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <GlowCard>
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-zinc-200">Social</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40">
                  <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn profile">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40">
                  <Link href={socials.x} target="_blank" aria-label="X profile">
                    <Twitter className="mr-2 h-4 w-4" />
                    X
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40">
                  <Link href={socials.github} target="_blank" aria-label="GitHub profile">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40">
                  <Link href={socials.leetcode} target="_blank" aria-label="LeetCode profile">
                    <Code2 className="mr-2 h-4 w-4" />
                    LeetCode
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </GlowCard>

          <GlowCard className="md:col-span-2">
            <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-zinc-200">What can we build together?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                I specialize in systems design, scalable backends, and human-centered interfaces. If your project needs thoughtful engineering and a high bar for craft, drop me a note — I usually respond within a day.
              </CardContent>
            </Card>
          </GlowCard>
        </div>
      </div>

      <Footer />
    </main>
  )
}
