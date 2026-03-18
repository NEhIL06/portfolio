"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Copy, Linkedin, Github, Code2, X } from 'lucide-react'
import { useState } from "react"
import { siteConfig } from "@/lib/site-config"
import { GlowCard } from "@/components/glow-card"
import { SplitText } from "@/components/motion/split-text"
import { motion } from "framer-motion"
import FlipLink from "@/components/motion/flip-link"

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
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tighter text-white mb-6">
            <SplitText>Let&apos;s Connect</SplitText>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            I&apos;m always open to collaborating, brainstorming, or building something meaningful.
          </motion.p>
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
                  <FlipLink href={socials.linkedin} target="_blank" aria-label="LinkedIn profile" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="flex items-center text-white">
                    LinkedIn
                  </FlipLink>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <FlipLink href={socials.x} target="_blank" aria-label="X profile" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="flex items-center text-white">
                    X / Twitter
                  </FlipLink>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <FlipLink href={socials.github} target="_blank" aria-label="GitHub profile" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="flex items-center text-white">
                    GitHub
                  </FlipLink>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-800/40 hover:border-zinc-600 transition-all">
                  <FlipLink href={socials.leetcode} target="_blank" aria-label="LeetCode profile" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="flex items-center text-white">
                    LeetCode
                  </FlipLink>
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
    </div>
  )
}