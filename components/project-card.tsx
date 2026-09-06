import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { RollText } from "@/components/motion/roll-text"
type Project = (typeof siteConfig.projects)[number]
const missingImages = new Set(["/newsanchor.png", "/truestate.png", "/outbreak.png"])
export function projectCategory(stack: string[]) {
  const s = stack.join(" ").toLowerCase()
  if (s.includes("react native")) return "Mobile"
  if (/gemini|python|rag|sagemaker|generative ai|llm|xgboost/.test(s)) return "AI / ML"
  return "Web"
}
export function ProjectCard({ project: p, index, details = false }: { project: Project; index: number; details?: boolean }) {
  const destination = p.demo || (p.link !== "#" ? p.link : undefined)
  const visual = <><div className="project-visual-label"><span>{String(index + 1).padStart(2, "0")}</span><span>{projectCategory(p.stack)}</span></div>{p.image && !missingImages.has(p.image) ? <div className="project-screenshot"><Image src={p.image} alt={p.title + " interface"} fill sizes="(max-width: 767px) 90vw, 560px" className="object-contain" /></div> : <span className="project-placeholder">{p.title.split(" ").slice(0, 2).join(" ")}</span>}<span className="project-open"><ArrowUpRight size={22} /></span></>
  return <ScrollReveal className="project-card"><article>
    {destination ? <a className={"project-visual project-tone-" + index % 4} href={destination} target="_blank" rel="noopener noreferrer" aria-label={"Open " + p.title + (p.demo ? " demo" : " source code")}>{visual}</a> : <div className="project-visual">{visual}</div>}
    <div className="project-title-row"><h3>{p.title.trim()}</h3>{p.featured && <span className="eyebrow">Selected</span>}</div>
    <p className="project-description">{p.description}</p>
    {details && p.facts && <details className="project-details"><summary>Project highlights</summary><ul>{p.facts.map(fact => <li key={fact}>{fact}</li>)}</ul></details>}
    <ul className="project-stack">{(details ? p.stack : p.stack.slice(0, 4)).map(item => <li key={item}>{item}</li>)}</ul>
    <div className="project-links">{p.link && p.link !== "#" && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-link"><RollText>Source code</RollText><ArrowUpRight size={15} /></a>}{p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-link"><RollText>Live demo</RollText><ArrowUpRight size={15} /></a>}</div>
  </article></ScrollReveal>
}
