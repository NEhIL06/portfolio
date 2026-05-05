"use client"

import { Hero } from "@/components/hero"
import { WhoAmI } from "@/components/who-am-i"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Achievements } from "@/components/achievements"
import { Analytics } from "@vercel/analytics/next"
import { Section } from "@/components/ui/section"
import { Experience } from "@/components/experience"
import { StatsStrip } from "@/components/stats-strip"
export default function Page() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <Analytics />

      <div className="relative">
        <Section id="home">
          <Hero />
        </Section>

        <StatsStrip />

        <Section id="about">
          <WhoAmI />
        </Section>

        <Section id="experience">
          <Experience />
        </Section>

        {/* Skills */}
        {/* Skills */}
        <Section id="skills">
          <Skills />
        </Section>


        <Section id="projects">
          <Projects />
        </Section>


        <Section id="achievements">
          <Achievements />
        </Section>

      </div>
    </div>
  )
}
