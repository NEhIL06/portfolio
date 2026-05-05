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
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="relative mx-auto max-w-6xl container-x">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-gray-900 mb-4 sm:mb-6">
          <SplitText>Who Am I?</SplitText>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-lg text-gray-500 mb-12 sm:mb-16"
        >
          {about.intro}
        </motion.p>

        {/* Mosaic grid */}
        <div className="mt-10 grid grid-cols-12 auto-rows-[180px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {/* Hobbies */}
          {about.hobbies.map((hobby) => (
            <div key={hobby.title} className="col-span-12 sm:col-span-6 lg:col-span-4 group relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl border border-black/10 bg-gray-100">
              <Image
                src={hobby.image || "/placeholder.svg?height=800&width=1200&query=hobby%20photo%20for%20portfolio"}
                alt={hobby.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 p-6 z-10 w-full">
                <h3 className="text-xl font-medium text-white">{hobby.title}</h3>
                <p className="text-sm text-white/70 mt-1">{hobby.description}</p>
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
              <div key={g.caption + idx} className={`${span} group relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl border border-black/10 bg-gray-100`}>
                <Image
                  src={g.src || "/placeholder.svg?height=1200&width=1600&query=hackathon%20photo%20for%20portfolio"}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 w-full p-6 text-sm font-medium text-white z-10">{g.caption}</div>
              </div>
            )
          })}

          {/* YouTube Card */}
          <GlowCard className="col-span-12 row-span-2 sm:row-span-1">
            <div className="relative flex flex-col sm:flex-row h-full min-h-[200px] w-full items-stretch sm:items-center justify-between gap-4 sm:gap-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6 backdrop-blur">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-gray-600">
                  <Youtube className="h-5 w-5 text-red-500" />
                  YouTube
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900">{about.youtube.channelName}</h3>
                <p className="mt-1 text-sm sm:text-base text-gray-500">{about.youtube.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={about.youtube.link}
                    target="_blank"
                    className="rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Visit Channel
                  </a>
                  <a
                    href={about.youtube.latestVideo || "#"}
                    target="_blank"
                    className="rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Latest Video
                  </a>
                </div>
              </div>
              <div className="relative aspect-video w-full sm:h-[160px] sm:w-[280px] sm:aspect-auto overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shrink-0">
                <Image
                  src={about.youtube.preview || "/placeholder.svg?height=900&width=1600&query=youtube%20channel%20preview"}
                  alt="YouTube channel preview"
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
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