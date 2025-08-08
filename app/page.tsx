"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from 'lucide-react'
import { NavBar } from "@/components/nav-bar"
import { MetallicBackground } from "@/components/metallic-background"
import { Hero } from "@/components/hero"
import { WhoAmI } from "@/components/who-am-i"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Achievements } from "@/components/achievements"
import { Clubs } from "@/components/clubs"
import { Footer } from "@/components/footer"
import { Cursor } from "@/components/cursor"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-zinc-200 cursor-none">
      <MetallicBackground />
      <Cursor />
      <NavBar />

      <div className="relative">
        {/* Hero */}
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>

        

        {/* Quick actions under hero */}
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="default"
              className="bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 border border-zinc-700/80 shadow-lg shadow-black/40"
            >
              <Link href="/connect">
                Connect with me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-800/40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/30"
            >
              <Link href="/resume.pdf" target="_blank" aria-label="Download resume as PDF">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Link>
            </Button>
          </div>
        </div>

        {/* Short Who Am I on home (full page at /about) */}
        <section id="about" className="scroll-mt-24">
          <WhoAmI />
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>

        {/* Projects - horizontal carousel (full grid at /projects) */}
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        {/* Achievements */}
        <section id="achievements" className="scroll-mt-24">
          <Achievements />
        </section>

        {/* Clubs */}
        <section id="clubs" className="scroll-mt-24">
          <Clubs />
        </section>

        <Footer />
      </div>
    </main>
  )
}
