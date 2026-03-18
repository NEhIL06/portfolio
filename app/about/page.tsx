"use client"

import Image from "next/image"
import { GlowCard } from "@/components/glow-card"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Youtube } from 'lucide-react'
import { SplitText } from "@/components/motion/split-text"

export default function AboutPage() {
  const { about } = siteConfig
  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-5xl sm:text-7xl font-semibold tracking-tighter text-white mb-6">
          <SplitText>Who Am I?</SplitText>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-lg text-zinc-400 mb-16"
        >
          {about.intro}
        </motion.p>

        {/* Mosaic grid */}
        <div className="mt-10 grid grid-cols-12 auto-rows-[200px] gap-4">
          {/* Hobbies */}
          {about.hobbies.map((hobby) => (
            <div key={hobby.title} className="col-span-12 sm:col-span-6 lg:col-span-4 group relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
              <Image
                src={hobby.image || "/placeholder.svg?height=800&width=1200&query=hobby%20photo%20for%20portfolio"}
                alt={hobby.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 p-6 z-10 w-full">
                <h3 className="text-xl font-medium text-[#EDEDED]">{hobby.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">{hobby.description}</p>
              </div>
            </div>
          ))}

          {/* Hackathons / Events Gallery tiles with varied spans */}
          {about.gallery.map((g, idx) => {
            const span =
              idx % 5 === 0
                ? "col-span-12 sm:col-span-8 row-span-2"
                : "col-span-12 sm:col-span-4 row-span-1"

            return (
              <div key={g.caption + idx} className={`${span} group relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111111]`}>
                <Image
                  src={g.src || "/placeholder.svg?height=1200&width=1600&query=hackathon%20photo%20for%20portfolio"}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 w-full p-6 text-sm font-medium text-[#EDEDED] z-10">{g.caption}</div>
              </div>
            )
          })}

          {/* YouTube Card */}
          <GlowCard className="col-span-12">
            <div className="relative flex h-[200px] w-full items-center justify-between gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 backdrop-blur">
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
    </div>
  )
}