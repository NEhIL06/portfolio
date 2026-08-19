"use client"

import { usePathname } from "next/navigation"
import SmoothScrollProvider from "@/app/smoothscroll"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

// Pages that want a bare full-screen canvas (no smooth-scroll, no footer)
const CANVAS_ROUTES = ["/gallery", "/alter-ego", "/writing"]

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCanvas = CANVAS_ROUTES.includes(pathname) || pathname.startsWith("/writing")

  if (isCanvas) {
    return (
      <>
        <NavBar />
        <main>{children}</main>
      </>
    )
  }

  return (
    <SmoothScrollProvider>
      <MetallicBackground />
      <div className="fixed top-5 left-6 z-50">
        <span className="text-xs font-semibold tracking-[0.3em] text-gray-800 uppercase select-none">
          Nehil Chandrakar
        </span>
      </div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
