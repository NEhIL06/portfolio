"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { motion, useScroll } from "framer-motion"
const links = [{ href: "/", label: "Home" }, { href: "/projects", label: "Work" }, { href: "/about", label: "About" }, { href: "/writing", label: "Writing" }]
export function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const menuRef = useRef<HTMLDialogElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const dialog = menuRef.current
    if (open) dialog?.showModal()
    else if (dialog?.open) dialog.close()
    const previous = document.body.style.overflow
    if (open) document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [open])
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => { if (query.matches) setOpen(false) }
    query.addEventListener("change", closeOnDesktop)
    return () => query.removeEventListener("change", closeOnDesktop)
  }, [])
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)
  return <>
    <header className="site-header"><div className="site-container header-inner">
      <Link href="/" className="brand" aria-label="Nehil Chandrakar, home">nc<span className="brand-dot" /><span className="brand-name">Nehil Chandrakar</span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} className={active(link.href) ? "active" : ""}>{link.label}</Link>)}</nav>
      <Link href="/connect" className="header-contact">Let’s talk <ArrowUpRight size={16} /></Link>
      <button ref={toggleRef} className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation"><span>Menu</span><Menu size={18} /></button>
    </div><motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} /></header>
    <dialog ref={menuRef} id="mobile-navigation" className="mobile-menu" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); toggleRef.current?.focus() }} aria-label="Navigation">
      <div className="mobile-menu-top"><span className="eyebrow">Explore the portfolio</span><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div>
      <nav aria-label="Mobile navigation">{[...links, { href: "/gallery", label: "Gallery" }, { href: "/connect", label: "Let’s talk" }].map((link, i) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={active(link.href) ? "page" : undefined}><span className="eyebrow">0{i + 1}</span>{link.label}<ArrowUpRight size={24} /></Link>)}</nav>
      <p className="mobile-menu-note">Thoughtful software. A little personality.</p>
    </dialog>
  </>
}
