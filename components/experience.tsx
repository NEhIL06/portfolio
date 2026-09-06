import { siteConfig } from "@/lib/site-config"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/editorial"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
export function Experience() {
  return <div className="site-container section-space"><SectionHeading number="03" label="The journey" title="Built through experience." />
    {siteConfig.experience.map(exp => <ScrollReveal className="experience-row" key={exp.company}><div><span className="eyebrow">{exp.duration}</span><p className="muted">{siteConfig.contact.location}</p></div><div><h3>{exp.role}</h3><a className="text-link" href={exp.link} target="_blank" rel="noopener noreferrer">{exp.company}<ArrowUpRight size={16} /></a></div><p className="muted">{exp.description}</p></ScrollReveal>)}
    <div className="education-row"><span className="eyebrow">Education</span><div><h3>{siteConfig.education.degree}</h3><p className="muted">{siteConfig.education.institute} · {siteConfig.education.location}</p></div><span className="eyebrow">{siteConfig.education.graduation}</span></div>
  </div>
}
