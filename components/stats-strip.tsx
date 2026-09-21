import { siteConfig } from "@/lib/site-config";
export function StatsStrip() {
  return (
    <div className="site-container">
      <div className="stats-strip">
        <p className="eyebrow stats-caption">
          A few things
          <br />
          along the way
        </p>
        {siteConfig.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>
              {stat.value}
              {stat.suffix}
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
