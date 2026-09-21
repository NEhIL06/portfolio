"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { PageHeading } from "@/components/editorial";
import { ProjectCard, projectCategory } from "@/components/project-card";
const categories = ["All", "Web", "AI / ML", "Mobile"];
export default function ProjectsPage() {
  const [category, setCategory] = useState("All");
  const projects = siteConfig.projects.filter(
    (p) => category === "All" || projectCategory(p.stack) === category,
  );
  return (
    <div className="site-container page-space">
      <PageHeading
        label="The project index"
        title="Made with intent."
        accent="Built to work."
        description="A collection of products and experiments across web, mobile, and AI. Each one started with a problem worth solving."
      />
      <div className="project-filter">
        <div
          className="filter-buttons"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
              <span>
                {item === "All"
                  ? siteConfig.projects.length
                  : siteConfig.projects.filter(
                      (p) => projectCategory(p.stack) === item,
                    ).length}
              </span>
            </button>
          ))}
        </div>
        <p className="eyebrow" role="status">
          {projects.length} projects
        </p>
      </div>
      <div className="projects-grid" key={category}>
        {projects.map((p, i) => (
          <ProjectCard project={p} index={i} details key={p.title} />
        ))}
      </div>
    </div>
  );
}
