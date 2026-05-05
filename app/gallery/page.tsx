"use client"

import Image from "next/image"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"

export default function GalleryPage() {
  const images = siteConfig.about.gallery

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900"
        >
          Gallery
        </motion.h1>
        <p className="mt-3 max-w-2xl text-gray-500">
          Moments from hackathons, workshops, and projects.
        </p>

        {/* Masonry using CSS columns */}
        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((img, idx) => (
            <div key={img.src + idx} className="mb-4 break-inside-avoid">
              <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gray-50">
                <div className="relative h-[260px] w-full">
                  <Image
                    src={img.src || "/placeholder.svg?height=1200&width=1600&query=gallery%20photo"}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-sm text-gray-600">{img.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
