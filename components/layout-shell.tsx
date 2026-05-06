"use client"

import { usePathname } from "next/navigation"
import SmoothScrollProvider from "@/app/smoothscroll"
import { MetallicBackground } from "@/components/metallic-background"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

// Pages that want a bare full-screen canvas (no smooth-scroll, no footer)
const CANVAS_ROUTES = ["/gallery"]

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCanvas = CANVAS_ROUTES.includes(pathname)

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
      <NavBar />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
