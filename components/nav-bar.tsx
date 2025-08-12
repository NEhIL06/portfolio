"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function NavBar({
  links = [
    { href: "/#home", label: "Home" },
    { href: "/about", label: "Who Am I" },
    { href: "/projects", label: "Projects" },
    { href: "/#skills", label: "Skills" },
    { href: "/#achievements", label: "Achievements" },
    { href: "/#clubs", label: "Clubs" },
    { href: "/connect", label: "Connect" },
  ],
}: {
  links?: { href: string; label: string }[]
}) {
  const pathname = usePathname()
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mt-4 flex items-center justify-between rounded-full border border-zinc-800/80 bg-zinc-950/40 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/30">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gradient-to-tr from-amber-300 to-amber-500 shadow-[0_0_24px_-2px_rgba(251,191,36,0.6)]" />
            <span className="text-sm font-medium text-zinc-200">{siteConfig.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-50 transition-colors",
                  pathname === l.href ? "text-zinc-50" : ""
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80">
              <Link href="/connect">Let&apos;s Talk</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
