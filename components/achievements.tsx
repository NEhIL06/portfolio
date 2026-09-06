import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/editorial"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
export function Achievements() {
  return <div className="site-container section-space"><SectionHeading number="05" label="Recognition" title="A few proud moments." description="Ideas put to the test. Lessons taken forward." /><div>{siteConfig.achievements.map((item, i) => <ScrollReveal className="award-row" key={item.title}><span className="eyebrow">0{i + 1}</span><h3>{item.title}</h3><span className="award-result">{item.subtitle}</span><span className="eyebrow">{item.date}</span></ScrollReveal>)}</div></div>
}

