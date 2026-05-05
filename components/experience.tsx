"use client"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"
import { SplitText } from "@/components/motion/split-text"

export function Experience() {
    const { experience } = siteConfig

    return (
        <div className="mx-auto max-w-5xl container-x py-16 md:py-28 flex flex-col md:flex-row gap-8 md:gap-12 relative items-start">
            <div className="md:w-1/3 md:sticky md:top-32">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                    <SplitText>Experience</SplitText>
                </h2>
                <p className="mt-4 text-gray-500">Where I&apos;ve worked and what I&apos;ve built.</p>
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-6 md:gap-8 relative pl-8 md:pl-0">
                {/* Gradient Timeline Line */}
                <div className="absolute left-[11px] md:left-[19px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-gray-900 via-gray-400/20 to-transparent" />

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
                        <div className="absolute left-[-25px] md:left-[15px] top-8 h-[10px] w-[10px] rounded-full bg-gray-900 z-10 shadow-[0_0_10px_rgba(0,0,0,0.3)]" />
                        <div className="absolute left-[-25px] md:left-[15px] top-8 h-[10px] w-[10px] rounded-full bg-gray-900 animate-[ping_3s_ease-in-out_infinite] z-0" />

                        <div className="group rounded-2xl border border-black/10 bg-white p-6 backdrop-blur transition-all duration-300 hover:border-black/20 hover:bg-gray-50 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] cursor-default">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <h3 className="text-xl font-medium text-gray-900">{exp.role}</h3>
                                <span className="text-sm font-medium text-gray-500 bg-black/5 border border-black/10 px-3 py-1 rounded-full whitespace-nowrap">{exp.duration}</span>
                            </div>
                            <div className="mt-2 text-gray-700 font-medium">{exp.company}</div>
                            <p className="mt-4 text-gray-500 leading-relaxed transition-colors group-hover:text-gray-700">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
