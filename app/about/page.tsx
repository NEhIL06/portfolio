"use client"

import Image from "next/image"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Cursor } from "@/components/cursor"
import { GlowCard } from "@/components/glow-card"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Youtube } from 'lucide-react'

export default function AboutPage() {
  const { about } = siteConfig
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
          Who Am I?
        </motion.h1>
        <p className="mt-3 max-w-2xl text-zinc-400">{about.intro}</p>

        {/* Mosaic grid */}
        <div className="mt-10 grid grid-cols-12 auto-rows-[200px] gap-4">
          {/* Hobbies */}
          {about.hobbies.map((hobby) => (
            <GlowCard key={hobby.title} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
                <Image
                  src={hobby.image || "/placeholder.svg?height=800&width=1200&query=hobby%20photo%20for%20portfolio"}
                  alt={hobby.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-lg font-medium text-zinc-100">{hobby.title}</h3>
                  <p className="text-sm text-zinc-300">{hobby.description}</p>
                </div>
              </div>
            </GlowCard>
          ))}

          {/* Hackathons / Events Gallery tiles with varied spans */}
          {about.gallery.map((g, idx) => {
            const span =
              idx % 5 === 0
                ? "col-span-12 sm:col-span-8 row-span-2"
                : idx % 3 === 0
                ? "col-span-12 sm:col-span-4"
                : "col-span-12 sm:col-span-6"
            return (
              <GlowCard key={g.caption + idx} className={span}>
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
                  <Image
                    src={g.src || "/placeholder.svg?height=1200&width=1600&query=hackathon%20photo%20for%20portfolio"}
                    alt={g.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-4 text-sm text-zinc-300">{g.caption}</div>
                </div>
              </GlowCard>
            )
          })}

          {/* YouTube Card */}
          <GlowCard className="col-span-12">
            <div className="relative flex h-full w-full items-center justify-between gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 backdrop-blur">
              <div>
                <div className="inline-flex items-center gap-2 text-zinc-300">
                  <Youtube className="h-5 w-5 text-red-400" />
                  YouTube
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-zinc-100">{about.youtube.channelName}</h3>
                <p className="mt-1 text-zinc-400">{about.youtube.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={about.youtube.link}
                    target="_blank"
                    className="rounded-full border border-zinc-700/80 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800/40"
                  >
                    Visit Channel
                  </a>
                  <a
                    href={about.youtube.latestVideo || "#"}
                    target="_blank"
                    className="rounded-full border border-zinc-700/80 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800/40"
                  >
                    Latest Video
                  </a>
                </div>
              </div>
              <div className="relative hidden h-[160px] w-[280px] overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 sm:block">
                <Image
                  src={about.youtube.preview || "/placeholder.svg?height=900&width=1600&query=youtube%20channel%20preview"}
                  alt="YouTube channel preview"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      <Footer />
    </main>
  )
}
