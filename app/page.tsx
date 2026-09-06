import { Hero } from "@/components/hero"
import { WhoAmI } from "@/components/who-am-i"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Achievements } from "@/components/achievements"
import { Analytics } from "@vercel/analytics/next"
import { Experience } from "@/components/experience"
import { StatsStrip } from "@/components/stats-strip"
import { Clubs } from "@/components/clubs"
import { WritingList } from "@/components/writing-list"
import { SectionHeading } from "@/components/editorial"
export default function Page() {
  return <><Analytics /><section id="home"><Hero /></section><StatsStrip /><section id="about"><WhoAmI /></section><section id="projects" className="tonal-section"><Projects /></section><section id="experience"><Experience /></section><section id="skills" className="tonal-section"><Skills /></section><section id="achievements"><Achievements /></section><section id="community"><Clubs /></section><section id="writing" className="tonal-section"><div className="site-container section-space"><SectionHeading number="07" label="Notes & observations" title="Thinking out loud." href="/writing" linkLabel="All writing" /><WritingList limit={2} /></div></section></>
}
