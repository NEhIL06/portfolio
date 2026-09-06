import Link from "next/link"
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
export function Hero() {
  return <div className="site-container hero">
    <div className="hero-topline"><p className="eyebrow"><span className="accent-square" />Full stack engineer & curious builder</p><span className="eyebrow hero-edition">Personal portfolio / 2026</span></div>
    <div className="hero-composition"><h1>Thoughtfully built.<br /><span className="hero-second-line"><em>Simply</em> experienced<span className="hero-period">.</span></span></h1><Asterisk className="hero-asterisk" strokeWidth={1.1} aria-hidden="true" /></div>
    <div className="hero-bottom"><div className="hero-intro"><span className="eyebrow">Hello, I’m Nehil.</span><p>I build dependable systems and<span className="mobile-break" /> digital experiences that make the<span className="mobile-break" /> complex feel simple.</p></div><div className="hero-actions"><Link className="button-primary" href="#projects">Explore my work <ArrowDown size={17} /></Link><a className="text-link" href="/resume" target="_blank" rel="noopener noreferrer">View résumé <ArrowUpRight size={17} /></a></div></div>
    <div className="hero-footnote"><span>Currently at <a href={siteConfig.experience[0].link} target="_blank" rel="noopener noreferrer">{siteConfig.currentRole.company}<ArrowUpRight size={12} /></a></span><a href="#about">A little more about me <ArrowDown size={13} /></a></div>
  </div>
}

