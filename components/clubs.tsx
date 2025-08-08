"use client"

import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "./glow-card"

export function Clubs() {
  const clubs = siteConfig.clubs

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100">Clubs & Organizations</h2>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {clubs.map((c) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <GlowCard>
              <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span className="text-zinc-100">{c.name}</span>
                    <Badge className="bg-zinc-900/60 border border-zinc-700/70 text-zinc-300">{c.role}</Badge>
                  </CardTitle>
                  <div className="mt-2 text-sm text-zinc-400">
                    {c.since}
                    {c.location ? ` • ${c.location}` : ""}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {c.posts?.map((p, i) => (
                    <p key={i} className="text-sm text-zinc-300">
                      • {p}
                    </p>
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
