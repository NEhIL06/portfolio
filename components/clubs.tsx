import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/editorial";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
export function Clubs() {
  return (
    <div className="site-container section-space">
      <SectionHeading
        number="06"
        label="Community & leadership"
        title="Better when we build together."
      />
      <div className="community-grid">
        {siteConfig.clubs.map((club) => (
          <ScrollReveal className="community-item" key={club.name}>
            <p className="eyebrow">
              {club.location} / {club.since}
            </p>
            <h3>{club.name}</h3>
            <p className="community-role">{club.role}</p>
            {club.posts.map((post) => (
              <p className="muted" key={post}>
                {post}
              </p>
            ))}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
