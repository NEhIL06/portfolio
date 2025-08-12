"use client"

import Image from "next/image"
import Link from "next/link"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Cursor } from "@/components/cursor"
import { GlowCard } from "@/components/glow-card"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { ExternalLink } from 'lucide-react'

export default function ProjectsPage() {
  const { projectsPage, projects } = siteConfig
  return (
    <main className="relative min-h-screen bg-black text-zinc-200 cursor-none">
      <MetallicBackground />
      <Cursor />
      <NavBar />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent"
        >
          {projectsPage.title}
        </motion.h1>
        <p className="mt-3 max-w-3xl text-zinc-400 italic">“{projectsPage.quote}”</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <GlowCard key={p.title}>
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={p.image || "/placeholder.svg?height=720&width=1280&query=project%20cover%20image"}
                    alt={p.title}
                    fill={true}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-100">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s: string) => (
                      <span
                        key={s}
                        className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-2 py-0.5 text-xs text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    {p.link && (
                      <Link
                        href={p.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/40"
                      >
                        Repo
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    {p.demo && (
                      <Link
                        href={p.demo}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/40"
                      >
                        Demo
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
