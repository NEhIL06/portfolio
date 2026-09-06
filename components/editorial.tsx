import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/motion/scroll-reveal"

export function SectionHeading({ number, label, title, description, href, linkLabel }: {
  number: string; label: string; title: string; description?: string; href?: string; linkLabel?: string
}) {
  return <ScrollReveal className="section-heading">
    <div className="eyebrow"><span>{number}</span><span>{label}</span></div>
    <div className="section-heading-row"><div><h2 className="display-heading">{title}</h2>{description && <p className="section-description">{description}</p>}</div>
      {href && <Link className="text-link" href={href}>{linkLabel}<ArrowUpRight size={17} /></Link>}
    </div>
  </ScrollReveal>
}
export function PageHeading({ label, title, accent, description }: { label: string; title: string; accent?: string; description: string }) {
  return <header className="page-heading"><p className="eyebrow"><span className="accent-square" />{label}</p><h1>{title}{accent && <><br /><em>{accent}</em></>}</h1><p className="page-description">{description}</p></header>
}
