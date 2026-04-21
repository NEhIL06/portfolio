"use client"

import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "./glow-card"
import { SplitText } from "@/components/motion/split-text"

export function Clubs() {
  const clubs = siteConfig.clubs

  if (!clubs || clubs.length === 0) return null

  return (
    <div className="mx-auto max-w-5xl container-x py-20 md:py-32">
      <div className="flex items-center justify-between mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
          <SplitText>Communities & Leadership</SplitText>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {clubs.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <GlowCard className="h-full">
              <Card className="h-full border border-zinc-800/80 bg-zinc-950/40 backdrop-blur transition-all duration-300 hover:bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                    <span className="text-xl font-semibold text-zinc-100">{c.name}</span>
                    <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 font-mono text-xs">
                      {c.role}
                    </Badge>
                  </CardTitle>
                  <div className="text-sm font-mono text-zinc-500">
                    {c.since}
                    {c.location ? ` • ${c.location}` : ""}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {c.posts?.map((p, i) => (
                    <div key={i} className="flex gap-3 text-zinc-300">
                      <span className="text-zinc-600 mt-1">▹</span>
                      <p className="text-sm leading-relaxed">{p}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

