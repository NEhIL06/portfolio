"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

import FlipLink from "@/components/motion/flip-link"

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })

  // Map scroll progress to horizontal movement.
  // -75% will slide it most of the way left. Depending on the amount of content, we might need a dynamic value, but -75% works for 4 items.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"])

  // Spring physics for smoothness
  const physicsX = useSpring(x, { stiffness: 100, damping: 30 })

  const featured = siteConfig.projects.filter(p => p.featured)

  return (
    <>
      {/* Mobile: vertical stack of cards */}
      <section className="md:hidden bg-black py-20 container-x">
        <div className="mx-auto max-w-5xl mb-10">
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">Featured Work</h2>
          <p className="mt-3 text-zinc-400 text-base">A selection of my best projects.</p>
        </div>

        <div className="mx-auto max-w-5xl flex flex-col gap-6">
          {featured.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={p.image || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#EDEDED] mb-2">{p.title}</h3>
                <p className="text-[#A1A1AA] text-base leading-relaxed mb-4">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#EDEDED]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5">
                  {p.link && (
                    <FlipLink
                      href={p.link}
                      target="_blank"
                      baseColor="#ffffff"
                      hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"
                      className="inline-flex items-center text-sm font-medium uppercase tracking-wider"
                    >
                      Source
                    </FlipLink>
                  )}
                  {p.demo && (
                    <FlipLink
                      href={p.demo}
                      target="_blank"
                      baseColor="#A1A1AA"
                      hoverColor="#ffffff"
                      className="inline-flex items-center text-sm font-medium uppercase tracking-wider"
                    >
                      Demo
                    </FlipLink>
                  )}
                </div>
              </div>
            </article>
          ))}

          <Button
            asChild
            className="mt-4 w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6 text-base"
          >
            <FlipLink href="/projects" baseColor="#0a0a0a" hoverColor="#0a0a0a">
              View all projects
            </FlipLink>
          </Button>
        </div>
      </section>

      {/* Desktop: horizontal scroll-driven carousel */}
      <section ref={targetRef} className="relative hidden md:block h-[350vh] bg-black">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

          <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 mb-12 flex items-end justify-between shrink-0">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight">Featured Work</h2>
              <p className="mt-4 text-zinc-400 max-w-xl text-lg">A selection of my best projects. Scroll down to explore horizontally.</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-800/40 hover:text-zinc-200 backdrop-blur rounded-full px-6 py-5">
              <FlipLink href="/projects" baseColor="#e4e4e7" hoverColor="#ffffff">
                View all projects
              </FlipLink>
            </Button>
          </div>

          <motion.div style={{ x: physicsX }} className="flex gap-10 px-4 sm:px-6 md:px-12 w-max items-center">
            {featured.map((p) => (
              <div key={p.title} className="w-[85vw] sm:w-[600px] lg:w-[800px] shrink-0">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                    <div className="absolute inset-0 p-8 md:p-10 w-full flex flex-col justify-end">
                      <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                        <h3 className="text-3xl sm:text-4xl font-semibold text-[#EDEDED] mb-3">{p.title}</h3>
                        <p className="text-[#A1A1AA] line-clamp-2 md:line-clamp-none mb-6 max-w-2xl text-lg opacity-90 transition-opacity">{p.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.stack.slice(0, 5).map((s) => (
                            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#EDEDED] backdrop-blur-md">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-6 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                          {p.link && (
                            <FlipLink href={p.link} target="_blank" baseColor="#ffffff" hoverColor="linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)" className="inline-flex items-center text-sm font-medium uppercase tracking-wider">
                              Source Code
                            </FlipLink>
                          )}
                          {p.demo && (
                            <FlipLink href={p.demo} target="_blank" baseColor="#A1A1AA" hoverColor="#ffffff" className="inline-flex items-center text-sm font-medium uppercase tracking-wider">
                              Live Demo
                            </FlipLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Card */}
            <div className="w-[280px] sm:w-[350px] shrink-0 mr-[10vw]">
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-800/80 rounded-3xl p-12 py-32 text-center bg-zinc-950/20 backdrop-blur">
                <h3 className="text-2xl text-white font-serif mb-6">Want to see more?</h3>
                <Button asChild variant="default" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-6 text-base font-medium">
                  <FlipLink href="/projects" baseColor="#0a0a0a" hoverColor="#0a0a0a">
                    All Projects
                  </FlipLink>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
