import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/editorial";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
export function Skills() {
  const groups = [
    {
      name: "Languages",
      detail: "The building blocks.",
      items: siteConfig.skills.languages,
    },
    {
      name: "Frameworks & infrastructure",
      detail: "From interface to deployment.",
      items: siteConfig.skills.frameworks,
    },
    {
      name: "Foundations",
      detail: "The thinking beneath the tools.",
      items: siteConfig.skills.fundamentals,
    },
  ];
  return (
    <div className="site-container section-space">
      <SectionHeading
        number="04"
        label="Tools of the trade"
        title="The right tool. The right reason."
        description="A practical toolkit for building across the stack."
      />
      <div className="skills-grid">
        {groups.map((group, i) => (
          <ScrollReveal
            className="skill-group"
            key={group.name}
            delay={i * 0.06}
          >
            <span className="eyebrow">0{i + 1} /</span>
            <h3>{group.name}</h3>
            <p className="muted">{group.detail}</p>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
