"use client"

import Image from "next/image"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Cursor } from "@/components/cursor"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"

export default function GalleryPage() {
  const images = siteConfig.about.gallery

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
          Gallery
        </motion.h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Moments from hackathons, workshops, and projects.
        </p>

        {/* Masonry using CSS columns */}
        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((img, idx) => (
            <div key={img.src + idx} className="mb-4 break-inside-avoid">
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40">
                <div className="relative h-[260px] w-full">
                  <Image
                    src={img.src || "/placeholder.svg?height=1200&width=1600&query=gallery%20photo"}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-sm text-zinc-300">{img.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
