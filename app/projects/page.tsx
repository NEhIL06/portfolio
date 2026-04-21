"use client"

import Image from "next/image"
import Link from "next/link"
import { GlowCard } from "@/components/glow-card"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { ExternalLink } from 'lucide-react'
import { useState } from "react"
import { SplitText } from "@/components/motion/split-text"
import { TiltCard } from "@/components/motion/tilt-card"
import FlipLink from "@/components/motion/flip-link"

const CATEGORIES = ["All", "AI/ML", "Web", "Mobile"]

export default function ProjectsPage() {
  const { projectsPage, projects } = siteConfig
  const [activeTab, setActiveTab] = useState("All")

  const featuredProjects = projects.filter(p => p.featured)

  // Basic categorization logic
  const getCategory = (stack: string[]) => {
    const s = stack.map(x => x.toLowerCase())
    if (s.includes("react native") || s.includes("mobile")) return "Mobile"
    if (s.includes("gemini") || s.includes("python") || s.includes("rag") || s.includes("sagemaker") || s.includes("crew ai") || s.includes("generative ai")) return "AI/ML"
    return "Web"
  }

  const filteredProjects = projects.filter(p => !p.featured && (activeTab === "All" || getCategory(p.stack) === activeTab))

  return (
    <div className="relative min-h-screen bg-black text-zinc-200">
      <div className="relative mx-auto max-w-6xl container-x pt-24 sm:pt-28 pb-20 sm:pb-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-4">
          <SplitText>{projectsPage.title}</SplitText>
        </h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-zinc-400 italic">“{projectsPage.quote}”</p>

        {/* Featured Projects */}
        <div className="mt-12 sm:mt-16 text-2xl sm:text-3xl font-semibold text-zinc-100 mb-6 sm:mb-8 font-serif">Featured</div>
        <div className="grid gap-6 sm:gap-8 mb-20 sm:mb-24">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard>
                <GlowCard className="group h-full">
                  <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur flex flex-col lg:flex-row h-full">
                    <div className="relative aspect-[16/9] lg:aspect-auto lg:w-3/5 overflow-hidden">
                      <Image
                        src={p.image || "/placeholder.svg"}
                        alt={p.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="p-6 sm:p-8 lg:w-2/5 flex flex-col justify-center">
                      <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-100">{p.title}</h3>
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">{p.description}</p>

                      {p.facts && (
                        <ul className="mt-4 space-y-2 text-sm text-zinc-400 list-disc list-inside">
                          {p.facts.map((fact, idx) => (
                            <li key={idx} className="marker:text-zinc-600">{fact}</li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-300">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8 flex gap-4">
                        {p.link && (
                          <FlipLink href={p.link} target="_blank" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="font-medium underline underline-offset-4">
                            Source Code
                          </FlipLink>
                        )}
                        {p.demo && (
                          <FlipLink href={p.demo} target="_blank" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="font-medium underline underline-offset-4">
                            Live Demo
                          </FlipLink>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* All Projects Filter */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800/50 pb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 font-serif">More Projects</h2>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeTab === cat
                  ? "bg-zinc-100 text-black font-medium"
                  : "bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-zinc-800/50 hover:border-zinc-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p, i) => {
            const delayOffset = (i % 3) * 0.1
            const yOffset = i % 2 === 0 ? 0 : 30  // Stagger items vertically

            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 + yOffset, scale: 0.95 }}
                whileInView={{ opacity: 1, y: yOffset, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: delayOffset }}
                className="h-full"
              >
                <TiltCard>
                  <GlowCard className="h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur flex-1 flex flex-col group">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={p.image || "/placeholder.svg"}
                          alt={p.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold text-zinc-100">{p.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400 line-clamp-2 flex-1">{p.description}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 3).map((s) => (
                            <span key={s} className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-2 py-0.5 text-xs text-zinc-300">
                              {s}
                            </span>
                          ))}
                          {p.stack.length > 3 && (
                            <span className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-2 py-0.5 text-xs text-zinc-500">
                              +{p.stack.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex gap-3">
                            {p.link && (
                              <Link href={p.link} target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                                <span className="sr-only">Source Code</span>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            )}
                            {p.demo && (
                              <FlipLink href={p.demo} target="_blank" baseColor="#a1a1aa" hoverColor="#ffffff" className="text-sm font-medium">
                                Demo
                              </FlipLink>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

