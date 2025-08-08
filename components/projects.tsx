"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight } from 'lucide-react'
import { siteConfig } from "@/lib/site-config"
import { GlowCard } from "./glow-card"

export function Projects() {
  const projects = siteConfig.projects

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100">Projects</h2>
          <p className="mt-2 text-zinc-400">Scroll horizontally to explore</p>
        </div>
        <Button asChild variant="outline" className="border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-800/40">
          <Link href="/projects">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-6 relative">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="snap-start shrink-0 w-[88vw] sm:w-[560px]"
            >
              <GlowCard>
                <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={p.image || "/placeholder.svg?height=720&width=1280&query=project%20cover%20image"}
                      alt={`${p.title} cover image`}
                      fill
                      sizes="(max-width: 768px) 88vw, 560px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Hover overlay with interesting facts */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="m-3 rounded-xl border border-zinc-800/80 bg-black/50 p-4 backdrop-blur">
                          <p className="text-sm font-medium text-zinc-200">Interesting facts</p>
                          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                            {p.facts?.slice(0, 3).map((f: string, i: number) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-zinc-100">{p.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.stack.map((s: string) => (
                        <Badge key={s} className="bg-zinc-900/60 border border-zinc-700/70 text-zinc-300">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      {p.link && (
                        <Button asChild variant="outline" className="border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-800/40">
                          <Link href={p.link} target="_blank" aria-label={`${p.title} repository link`}>
                            View on GitHub
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <style jsx>{`
          .no-scrollbar {
            scrollbar-width: none;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}
