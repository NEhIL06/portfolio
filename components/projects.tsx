import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/editorial"
import { ProjectCard } from "@/components/project-card"
export function Projects() {
  return <div className="site-container section-space"><SectionHeading number="02" label="Selected work" title="From an idea to something real." description="A selection of products, experiments, and problems I’ve enjoyed solving." href="/projects" linkLabel={"All projects (" + siteConfig.projects.length + ")"} /><div className="projects-grid">{siteConfig.projects.filter(p => p.featured).map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}</div></div>
}
