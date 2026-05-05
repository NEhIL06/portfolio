"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Copy } from 'lucide-react'
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
      className="border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all text-gray-700 hover:text-gray-900"
    >
      <Copy className="mr-2 h-4 w-4 text-gray-600" />
      <span className="text-gray-700">{copied ? "Copied" : label}</span>
    </Button>
  )
}

export default function ConnectPage() {
  const { contact, socials } = siteConfig

  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="relative mx-auto max-w-5xl container-x">
        <div className="mb-12 sm:mb-16 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-gray-900 mb-4 sm:mb-6">
            <SplitText>Let&apos;s Connect</SplitText>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto"
          >
            I&apos;m always open to collaborating, brainstorming, or building something meaningful.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          <GlowCard>
            <Card className="border border-black/10 bg-white backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Mail className="h-5 w-5 text-gray-400" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Link href={`mailto:${contact.email}`} className="text-gray-700 hover:text-gray-900 underline underline-offset-4 transition-colors break-all">
                  {contact.email}
                </Link>
                <CopyButton text={contact.email} />
              </CardContent>
            </Card>
          </GlowCard>

          <GlowCard>
            <Card className="border border-black/10 bg-white backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-base sm:text-lg">{contact.location}</CardContent>
            </Card>
          </GlowCard>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-1 max-w-3xl mx-auto">
          <GlowCard>
            <Card className="border border-black/10 bg-white backdrop-blur">
              <CardHeader>
                <CardTitle className="text-gray-900 text-xl">Find Me Online</CardTitle>
                <p className="text-sm text-gray-500 mt-2">Connect with me on these platforms</p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild variant="outline" className="border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all">
                  <FlipLink href={socials.linkedin} target="_blank" aria-label="LinkedIn profile" baseColor="#374151" hoverColor="#111111" className="flex items-center text-gray-700">
                    LinkedIn
                  </FlipLink>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all">
                  <FlipLink href={socials.x} target="_blank" aria-label="X profile" baseColor="#374151" hoverColor="#111111" className="flex items-center text-gray-700">
                    X / Twitter
                  </FlipLink>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all">
                  <FlipLink href={socials.github} target="_blank" aria-label="GitHub profile" baseColor="#374151" hoverColor="#111111" className="flex items-center text-gray-700">
                    GitHub
                  </FlipLink>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all">
                  <FlipLink href={socials.leetcode} target="_blank" aria-label="LeetCode profile" baseColor="#374151" hoverColor="#111111" className="flex items-center text-gray-700">
                    LeetCode
                  </FlipLink>
                </Button>
              </CardContent>
            </Card>
          </GlowCard>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <GlowCard>
            <Card className="border border-black/10 bg-white backdrop-blur">
              <CardHeader>
                <CardTitle className="text-gray-900 text-xl sm:text-2xl">What can we build together?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 text-base sm:text-lg leading-relaxed">
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