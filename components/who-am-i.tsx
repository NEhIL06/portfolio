"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function WhoAmI({
  title = "Who Am I",
  content = "I’m a Developer — I design and engineer systems that are clean, scalable, and human. I obsess over details, craft thoughtful abstractions, and ship with intent. From distributed backends to intuitive interfaces, I aim to create software that is fast, reliable, and delightful.",
}: {
  title?: string
  content?: string
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-semibold text-zinc-100"
      >
        {title}
      </motion.h2>

      <Card className="mt-4 border border-zinc-800/80 bg-zinc-950/40 backdrop-blur">
        <CardContent className="p-6 text-zinc-300 leading-relaxed">
          <p>{content}</p>
          <p className="mt-4 text-zinc-400">
            Explore more about me, my hobbies, and my journey on the{" "}
            <Link href="/about" className="underline underline-offset-4 text-zinc-200 hover:text-zinc-50">
              dedicated page
            </Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
