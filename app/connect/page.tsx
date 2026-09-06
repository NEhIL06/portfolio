import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { PageHeading } from "@/components/editorial"
import { CopyEmail } from "@/components/copy-email"
import { RollText } from "@/components/motion/roll-text"
export default function ConnectPage() {
  const labels: Record<string, string> = { linkedin: "LinkedIn", x: "X / Twitter", github: "GitHub", leetcode: "LeetCode" }
  return <div className="site-container page-space"><PageHeading label="Start a conversation" title="Good things begin" accent="with a hello." description="Have an idea, an interesting problem, or an opportunity in mind? I’d love to hear about it." /><div className="contact-layout"><div className="contact-main"><p className="eyebrow">The best way to reach me</p><a className="contact-email" href={"mailto:" + siteConfig.contact.email}>{siteConfig.contact.email}<ArrowUpRight /></a><CopyEmail /><div className="contact-note"><span className="accent-square" /><p>I enjoy building things that work well and feel simple. Let’s see what we can make together.</p></div></div><div className="contact-aside"><p className="eyebrow">Elsewhere on the internet</p>{Object.entries(siteConfig.socials).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social-row"><RollText>{labels[name]}</RollText><ArrowUpRight size={18} /></a>)}<div className="contact-location"><span className="eyebrow">Working from</span><p>{siteConfig.contact.location}</p></div></div></div></div>
}
