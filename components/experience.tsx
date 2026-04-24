"use client"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { SplitText } from "@/components/motion/split-text"

export function Experience() {
    const { experience } = siteConfig

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-28 flex flex-col md:flex-row gap-12 relative items-start">
            <div className="md:w-1/3 md:sticky md:top-32">
                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Professional Journey</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    <SplitText>Experience</SplitText>
                </h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">Roles that shaped my expertise in full-stack development, system design, and product thinking.</p>
            </div>

            <div className="md:w-2/3 flex flex-col gap-8 relative">
                {/* Gradient Timeline Line */}
                <div className="absolute left-[19px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-green-400/50 via-green-400/20 to-transparent hidden md:block" />

                {experience.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative md:pl-16"
                    >
                        {/* Pulsing Indicator Dot */}
                        <div className="absolute left-[15px] top-8 h-[10px] w-[10px] rounded-full bg-green-400 hidden md:block z-10 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                        <div className="absolute left-[15px] top-8 h-[10px] w-[10px] rounded-full bg-green-400 animate-[pulse_2s_ease-in-out_infinite] hidden md:block z-0 opacity-50" />

                        <div className="group rounded-2xl border border-green-400/20 bg-gradient-to-br from-green-400/5 to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-400/40 hover:bg-green-400/10 hover:shadow-[0_0_25px_rgba(52,211,153,0.1)] cursor-default">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-green-100 transition-colors">{exp.role}</h3>
                                    <div className="mt-1 text-green-300 font-semibold text-sm">{exp.company}</div>
                                </div>
                                <span className="text-xs font-semibold text-green-300 bg-green-400/20 border border-green-400/30 px-3 py-1.5 rounded-full whitespace-nowrap">{exp.duration}</span>
                            </div>
                            <p className="mt-4 text-zinc-300 leading-relaxed transition-colors group-hover:text-white">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
