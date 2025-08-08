"use client"

import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-zinc-900/80 bg-black/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-sm text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/projects" className="hover:text-zinc-300">Projects</Link>
            <Link href="/gallery" className="hover:text-zinc-300">Gallery</Link>
            <Link href="/connect" className="hover:text-zinc-300">Connect</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
