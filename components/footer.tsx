"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, Check, Copy, Globe } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

function CheckerboardBanner() {
  return <div className="h-5 border-b border-zinc-900 bg-black sm:h-6" aria-hidden="true"><div className="h-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23fff' d='M0 0h8v8H0zm8 8h8v8H8z'/%3E%3Cpath d='M8 0h8v8H8zM0 8h8v8H0z'/%3E%3C/svg%3E")` }} /></div>
}
function RulerStrip() {
  return <div className="border-b border-zinc-800 bg-black px-4 py-3" aria-hidden="true"><div className="mx-auto max-w-5xl"><div className="flex h-3 items-end justify-between opacity-60">{Array.from({ length: 33 }).map((_, i) => <i key={i} className={i % 4 === 0 ? "h-3 w-px bg-zinc-200" : "h-1.5 w-px bg-zinc-600"} />)}</div><div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-500"><span>-05</span><span>-03</span><span>-01</span><span className="text-white">00</span><span>01</span><span>03</span><span>05</span></div></div></div>
}

export function Footer() {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  async function copyEmail() {
    try { await navigator.clipboard.writeText(siteConfig.contact.email); setCopied(true); setError("") }
    catch { setError("Copy failed. Tap the email address instead.") }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2500)
  }
  return <footer className="overflow-hidden bg-black text-white">
    <CheckerboardBanner /><RulerStrip />
    <div className="relative flex flex-col items-center overflow-hidden px-4 py-14 text-center sm:py-24">
      <p className="font-mono text-xs font-bold uppercase tracking-[.25em]">Have something in mind?</p>
      <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(5rem,15vw,13.5rem)] font-normal uppercase leading-[.85] text-[#FFE500]">Let’s create</h2>
      <button onClick={copyEmail} className="group relative -mt-2 inline-flex items-center gap-4 rounded-full border border-zinc-600 bg-black px-6 py-3 shadow-2xl transition hover:-translate-y-1 hover:border-[#FFE500] sm:-mt-10 sm:px-8" aria-label="Copy contact email">
        <span className="font-bold uppercase tracking-widest">{copied ? "Email copied" : "Start a conversation"}</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFE500] text-black">{copied ? <Check size={18} /> : <ArrowRight size={18} />}</span>
      </button>
      <span className="mt-2 min-h-4 text-xs text-zinc-400" role="status">{error}</span>
      <nav aria-label="Footer navigation" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-zinc-400 sm:mt-16">
        <Link href="/">Home</Link><span className="text-[#FFE500]">✦</span><Link href="/about">About</Link><span className="text-[#FFE500]">✦</span><Link href="/projects">Projects</Link><span className="text-[#FFE500]">✦</span><Link href="/writing">Writing</Link>
      </nav>
    </div>
    <div className="grid border-y border-zinc-800 md:grid-cols-2">
      <p className="border-b border-zinc-800 p-6 font-mono text-xs uppercase leading-relaxed tracking-wider text-zinc-300 md:border-b-0 md:border-r md:p-10">Good ideas deserve careful execution. Let’s make something useful, memorable, and built to last.</p>
      <div className="flex items-center gap-3 p-6 md:p-10"><span className="text-[#FFE500]">✦</span><a href={`mailto:${siteConfig.contact.email}`} className="min-w-0 truncate font-mono text-xs font-semibold text-white transition hover:text-[#FFE500] sm:text-lg">{siteConfig.contact.email}</a><button onClick={copyEmail} aria-label="Copy email address" className="ml-auto rounded-full border border-zinc-700 p-2 text-zinc-400 transition hover:border-[#FFE500] hover:text-[#FFE500]">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div>
    </div>
    <div className="flex flex-col items-center justify-between gap-4 px-6 py-6 font-mono text-[10px] uppercase tracking-widest text-zinc-400 sm:flex-row sm:px-10">
      <span className="flex items-center gap-3"><Globe size={16} />{siteConfig.contact.location}</span>
      <div className="flex gap-5">{Object.entries(siteConfig.socials).slice(0,3).map(([name,url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#FFE500]">{name}<ArrowUpRight size={11} /></a>)}</div>
      <span>Crafted by <b className="text-[#FFE500]">{siteConfig.name}</b></span>
    </div>
  </footer>
}
