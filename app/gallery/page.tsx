"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

const TILE_W = 2600
const TILE_H = 1500

const CARDS = [
  { src: "/mercuria.jpg", caption: "EcoSap", x: 60, y: 80, w: 480, h: 320 },
  { src: "/metadome.jpg", caption: "Multi-agent", x: 620, y: 120, w: 280, h: 390 },
  { src: "/latenights.jpg", caption: "latenights sprints", x: 980, y: 60, w: 520, h: 260 },
  { src: "/travel.jpg", caption: "Explorations", x: 950, y: 540, w: 360, h: 360 },
  { src: "/companyvisits.jpg", caption: "Connections", x: 1390, y: 560, w: 500, h: 280 },
]

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-TILE_W)
  const y = useMotionValue(-TILE_H)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "auto" }
  }, [])

  // Two-finger trackpad scroll — wheel events carry deltaX/deltaY
  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      x.set(x.get() - e.deltaX)
      y.set(y.get() - e.deltaY)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [mounted, x, y])

  // The SSR Fallback: Match the relative layout so it doesn't collapse
  if (!mounted) {
    return <div className="relative w-full h-[100dvh] bg-[#0a0a0a]" />
  }

  // The Client Render: Using relative + h-[100dvh] breaks out of the layout trap
  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] z-50 bg-[#0a0a0a] overflow-hidden select-none">
      
      {/* Background Parallax Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[15vw] font-black text-[#1a1a1a] tracking-tighter">
          MOMENTS
        </h1>
      </div>

      {/* Interactive Framer Motion Canvas */}
      <motion.div
        drag
        dragMomentum={true}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20, power: 0.2 }}
        className="absolute top-0 left-0 cursor-grab active:cursor-grabbing"
        style={{ width: TILE_W * 3, height: TILE_H * 3, x, y }}
      >
        {Array.from({ length: 9 }).map((_, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: col * TILE_W,
                top: row * TILE_H,
                width: TILE_W,
                height: TILE_H,
              }}
            >
              {CARDS.map((card, j) => (
                <div
                  key={j}
                  className="absolute group"
                  style={{ left: card.x, top: card.y, width: card.w, height: card.h }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <Image
                      src={card.src}
                      alt={card.caption}
                      fill
                      sizes={`${card.w}px`}
                      className="object-cover pointer-events-none"
                      priority={i === 4}
                    />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent px-6 pb-6 pt-12 pointer-events-none">
                      <p className="text-white text-sm font-medium tracking-wide">
                        {card.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </motion.div>

      {/* UI Overlay */}
      <div className="absolute top-10 left-10 z-50 pointer-events-none">
        <h2 className="text-white text-3xl font-bold tracking-tight">Gallery</h2>
        <p className="text-gray-400 mt-2 text-sm">Click and drag around</p>
      </div>
    </div>
  )
}