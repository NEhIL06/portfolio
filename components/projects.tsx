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
    <section ref={targetRef} className="relative h-[350vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <motion.div 
          className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between shrink-0 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Featured Projects</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">Showcase</h2>
            <p className="mt-4 text-zinc-400 max-w-xl text-base leading-relaxed">Innovative solutions combining design, engineering, and scalability. Each project represents deep technical thinking.</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex border-blue-400/30 bg-blue-400/5 hover:bg-blue-400/10 hover:text-blue-200 hover:border-blue-400/50 backdrop-blur rounded-full px-6 py-5 transition-all duration-300">
            <FlipLink href="/projects" baseColor="#e4e4e7" hoverColor="#bfdbfe">
              View all projects
            </FlipLink>
          </Button>
        </motion.div>

        <motion.div style={{ x: physicsX }} className="flex gap-10 px-4 sm:px-6 md:px-12 w-max items-center">
          {featured.map((p, idx) => (
            <motion.div 
              key={p.title} 
              className="w-[85vw] sm:w-[600px] lg:w-[800px] shrink-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(96,165,250,0.15)] hover:border-blue-400/30">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={p.image || "/placeholder.svg"}
                    alt={p.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-0 p-8 md:p-10 w-full flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-zinc-300 line-clamp-2 md:line-clamp-none mb-6 max-w-2xl text-base leading-relaxed opacity-90 transition-opacity">{p.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.stack.slice(0, 5).map((s) => (
                          <span key={s} className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-md transition-all duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-400/20">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-6 opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100">
                        {p.link && (
                          <FlipLink href={p.link} target="_blank" baseColor="#ffffff" hoverColor="#bfdbfe" className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:text-blue-200 transition-colors">
                            GitHub
                          </FlipLink>
                        )}
                        {p.demo && (
                          <FlipLink href={p.demo} target="_blank" baseColor="#d1d5db" hoverColor="#bfdbfe" className="inline-flex items-center text-sm font-semibold uppercase tracking-wider transition-colors">
                            Live Demo
                          </FlipLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
  )
}

