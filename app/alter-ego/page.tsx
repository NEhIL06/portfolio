"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Pause, Play } from "lucide-react"
import { useRef, useState } from "react"
import { RollText } from "@/components/motion/roll-text"
export default function AlterEgoPage() {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState("")
  async function toggleAudio() {
    if (!audio.current) return
    if (playing) { audio.current.pause(); setPlaying(false); return }
    try { await audio.current.play(); setPlaying(true); setError("") }
    catch { setError("Audio couldn’t play. Please try again.") }
  }
  return <div className="site-container page-space"><div className="alter-intro"><p className="eyebrow"><span className="accent-square" />Off the clock / Alter ego</p><Link className="text-link" href="/about"><RollText>Back to the story</RollText><ArrowUpRight size={17} /></Link></div><section className="alter-scene"><Image src="/alter-ego-bg.png" alt="A different side of Nehil" fill priority sizes="100vw" className="object-cover" /><div className="alter-content"><p className="eyebrow">Same person. Different energy.</p><h1>Full stack.<br /><em>Full personality.</em></h1><p>A small corner for the music, mood, and curiosity that exist outside the code.</p><button className="button-primary" onClick={toggleAudio} aria-pressed={playing}>{playing ? <Pause size={16} /> : <Play size={16} />}<RollText>{playing ? "Pause the soundtrack" : "Play the soundtrack"}</RollText></button><span role="status">{error}</span></div></section><audio ref={audio} preload="none" onEnded={() => setPlaying(false)} src="/TOP FELLA (MUSIC VIDEO) KARAN AUJLA _ MXRCI _ Latest Punjabi Songs 2026.mp3" /></div>
}
