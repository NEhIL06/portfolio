"use client"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { SplitText } from "@/components/motion/split-text"

export function Experience() {
    const { experience } = siteConfig

    return (
        <div className="mx-auto max-w-5xl container-x py-16 md:py-28 flex flex-col md:flex-row gap-8 md:gap-12 relative items-start">
            <div className="md:w-1/3 md:sticky md:top-32">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
                    <SplitText>Experience</SplitText>
                </h2>
                <p className="mt-4 text-zinc-400">Where I&apos;ve worked and what I&apos;ve built.</p>
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-6 md:gap-8 relative pl-8 md:pl-0">
                {/* Gradient Timeline Line */}
                <div className="absolute left-[11px] md:left-[19px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-white via-white/20 to-transparent" />

                {experience.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-6 md:pl-16"
                    >
                        {/* Pulsing Indicator Dot */}
                        <div className="absolute left-[-25px] md:left-[15px] top-8 h-[10px] w-[10px] rounded-full bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        <div className="absolute left-[-25px] md:left-[15px] top-8 h-[10px] w-[10px] rounded-full bg-white animate-[ping_3s_ease-in-out_infinite] z-0" />

                        <div className="group rounded-2xl border border-white/10 bg-[#111111] p-6 backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] cursor-default">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <h3 className="text-xl font-medium text-[#EDEDED]">{exp.role}</h3>
                                <span className="text-sm font-medium text-[#A1A1AA] bg-white/5 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">{exp.duration}</span>
                            </div>
                            <div className="mt-2 text-zinc-300 font-medium">{exp.company}</div>
                            <p className="mt-4 text-[#A1A1AA] leading-relaxed transition-colors group-hover:text-zinc-300">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
