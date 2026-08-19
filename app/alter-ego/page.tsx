"use client"

import { useEffect, useRef, useState } from "react"

export default function AlterEgoPage() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [curtainUp, setCurtainUp] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasPlayedRef = useRef(false)

  /* ── Lock body scroll while loader is active ── */
  useEffect(() => {
    if (!curtainUp) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [curtainUp])

  /* ── Audio: play on every page load/reload ── */
  useEffect(() => {
    const audio = new Audio(
      "/TOP FELLA (MUSIC VIDEO) KARAN AUJLA _ MXRCI _ Latest Punjabi Songs 2026.mp3"
    )
    audio.loop = false
    audio.volume = 0.55
    audioRef.current = audio

    const tryPlay = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true
      audio.play().catch(() => {
        /* autoplay blocked — silently ignore */
      })
    }

    // Attempt immediately
    tryPlay()

    // Fallback: play on first user interaction (browser autoplay policy)
    const onInteract = () => {
      tryPlay()
      window.removeEventListener("click", onInteract)
      window.removeEventListener("keydown", onInteract)
      window.removeEventListener("touchstart", onInteract)
    }
    window.addEventListener("click", onInteract)
    window.addEventListener("keydown", onInteract)
    window.addEventListener("touchstart", onInteract)

    return () => {
      audio.pause()
      audio.src = ""
      window.removeEventListener("click", onInteract)
      window.removeEventListener("keydown", onInteract)
      window.removeEventListener("touchstart", onInteract)
    }
  }, [])

  /* ── Loading counter: 0 → 100 in exactly 6 seconds ── */
  useEffect(() => {
    const DURATION = 6000 // ms
    const TICK = 60        // ms per tick (~16.6 fps feel)
    const STEPS = DURATION / TICK
    let step = 0

    const timer = setInterval(() => {
      step += 1
      const raw = step / STEPS
      // Ease-in-out curve so it feels organic
      const eased = raw < 0.5
        ? 2 * raw * raw
        : -1 + (4 - 2 * raw) * raw
      const progress = Math.min(Math.round(eased * 100), 100)
      setLoadingProgress(progress)

      if (step >= STEPS) {
        clearInterval(timer)
        setLoadingProgress(100)
        // Small pause at 100% before curtain lifts
        setTimeout(() => {
          setLoadingComplete(true)
          // Curtain slides up
          setTimeout(() => {
            setCurtainUp(true)
            // Content fades in after curtain is gone
            setTimeout(() => setShowContent(true), 900)
          }, 350)
        }, 400)
      }
    }, TICK)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="ae-root">
      {/* Immersive background wrapper */}
      <div className={`ae-bg-wrapper ${showContent ? "ae-bg-wrapper--visible" : ""}`} />
      {/* Hide the navigation bar globally while the loader curtain is active */}
      {!curtainUp && (
        <style dangerouslySetInnerHTML={{ __html: `
          header {
            opacity: 0 !important;
            pointer-events: none !important;
            transition: opacity 0.8s ease-in-out !important;
          }
        ` }} />
      )}

      {/* ── Curtain Overlay ── */}
      {!curtainUp && (
        <div
          className={`ae-curtain ${loadingComplete ? "ae-curtain--exit" : ""}`}
          aria-hidden="true"
        >
          <div className="ae-curtain-grain" />

          <div className="ae-curtain-body">
            {/* Big counter */}
            <div className="ae-counter">
              <span className="ae-counter-num">{String(loadingProgress).padStart(2, "0")}</span>
              <span className="ae-counter-pct">%</span>
            </div>

            {/* Thin progress bar */}
            <div className="ae-bar-track">
              <div className="ae-bar-fill" style={{ width: `${loadingProgress}%` }} />
            </div>

            {/* Label */}
            <p className="ae-curtain-label">Loading experience</p>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className={`ae-content ${showContent ? "ae-content--visible" : ""}`}>

        {/* Hero */}
        <section className="ae-hero">
          <div className="ae-hero-inner">
            
            <h1 className="ae-hero-title">
              Fullstack<br />
              <span className="ae-hero-title--thin">Developer</span>
            </h1>
      
          </div>
          <div className="ae-hero-rule" />
        </section>

        

       

        
      </main>

      <style>{`
        /* ─── ROOT ─── */
        .ae-root {
          position: relative;
          min-height: 100vh;
          background-color: #a9b3b4;
          color: #0a0a0a;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
          overflow-x: hidden;
        }

        /* ─── BACKGROUND WRAPPER (ZOOMED OUT & MASKED) ─── */
        .ae-bg-wrapper {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 0;
          background-image: url('/alter-ego-bg.png');
          background-repeat: no-repeat;
          background-position: right center;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          background-size: cover;
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 20%);
          mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 20%);
        }

        .ae-bg-wrapper--visible {
          opacity: 1;
        }

        @media (min-width: 768px) {
          .ae-bg-wrapper {
            background-size: contain;
            -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,1) 32%);
            mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,1) 32%);
          }
        }

        /* ─── CURTAIN ─── */
        .ae-curtain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 99999;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 1s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }

        .ae-curtain--exit {
          transform: translateY(-100%);
        }

        .ae-curtain-grain {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px;
          pointer-events: none;
        }

        .ae-curtain-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        /* ─── COUNTER ─── */
        .ae-counter {
          display: flex;
          align-items: flex-start;
          line-height: 1;
          color: #ffffff;
        }

        .ae-counter-num {
          font-size: clamp(5rem, 18vw, 12rem);
          font-weight: 700;
          letter-spacing: -0.05em;
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }

        .ae-counter-pct {
          font-size: clamp(1.5rem, 5vw, 3.5rem);
          font-weight: 300;
          opacity: 0.4;
          align-self: flex-start;
          margin-top: 0.6em;
          letter-spacing: -0.02em;
        }

        /* ─── BAR ─── */
        .ae-bar-track {
          width: clamp(180px, 28vw, 320px);
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .ae-bar-fill {
          height: 100%;
          background: #ffffff;
          transition: width 0.06s linear;
        }

        /* ─── CURTAIN LABEL ─── */
        .ae-curtain-label {
          font-size: 0.68rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
          margin: 0;
        }

        /* ─── CONTENT REVEAL ─── */
        .ae-content {
          opacity: 0;
          transition: opacity 0.9s ease 0.1s;
          pointer-events: none;
        }

        .ae-content--visible {
          opacity: 1;
          pointer-events: auto;
        }

        /* ─── HERO ─── */
        .ae-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(5rem, 12vw, 10rem) clamp(1.5rem, 8vw, 8rem) 4rem;
          position: relative;
        }

        .ae-hero-inner {
          max-width: 900px;
        }

        .ae-eyebrow {
          display: inline-block;
          font-size: clamp(0.6rem, 1.2vw, 0.7rem);
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #888;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .ae-hero-title {
          font-size: clamp(3.5rem, 11vw, 9rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: #0a0a0a;
          margin: 0 0 2.5rem;
          text-align: left;
        }

        .ae-hero-title--thin {
          font-weight: 200;
          color: #555;
          font-style: italic;
        }

        .ae-hero-sub {
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          line-height: 1.75;
          color: #555;
          max-width: 520px;
          font-weight: 300;
          margin: 0;
        }

        .ae-hero-rule {
          position: absolute;
          bottom: 3rem;
          left: clamp(1.5rem, 8vw, 8rem);
          width: 48px;
          height: 1px;
          background: #ccc;
        }

        /* ─── SECTIONS ─── */
        .ae-section {
          padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 8vw, 8rem);
        }

        .ae-section-label {
          font-size: clamp(0.6rem, 1.2vw, 0.7rem);
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #aaa;
          font-weight: 500;
          margin-bottom: 3rem;
        }

        /* ─── GRID ─── */
        .ae-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1px;
          border: 1px solid #ebebeb;
        }

        .ae-card {
          padding: 2.5rem 2rem;
          border-right: 1px solid #ebebeb;
          transition: background 0.2s ease;
        }
        .ae-card:hover { background: #fafafa; }
        .ae-card:last-child { border-right: none; }

        .ae-card-icon {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
          filter: grayscale(1);
        }

        .ae-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #0a0a0a;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }

        .ae-card-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #777;
          margin: 0;
        }

        /* ─── PHILOSOPHY ─── */
        .ae-philosophy {
          background: #fafafa;
          border-top: 1px solid #ebebeb;
          border-bottom: 1px solid #ebebeb;
        }

        .ae-philosophy-inner { max-width: 760px; }

        .ae-quotes {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .ae-quote {
          font-size: clamp(1.05rem, 2.2vw, 1.35rem);
          line-height: 1.65;
          color: #2a2a2a;
          font-weight: 300;
          font-style: italic;
          margin: 0;
          border-left: 2px solid #e0e0e0;
          padding-left: 2rem;
        }

        .ae-quote-mark {
          color: #ddd;
          font-size: 1.2em;
        }

        /* ─── CURRENTLY ─── */
        .ae-now-list {
          display: flex;
          flex-direction: column;
          max-width: 700px;
          border: 1px solid #ebebeb;
        }

        .ae-now-item {
          display: grid;
          grid-template-columns: 12px 1fr 1fr;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #ebebeb;
          transition: background 0.15s ease;
        }
        .ae-now-item:last-child { border-bottom: none; }
        .ae-now-item:hover { background: #fafafa; }

        .ae-now-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
        }

        .ae-now-label {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
          font-weight: 500;
        }

        .ae-now-value {
          font-size: 0.9rem;
          color: #2a2a2a;
        }

        /* ─── CLOSING ─── */
        .ae-closing { text-align: center; padding-top: 6rem; padding-bottom: 8rem; }

        .ae-closing-text {
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          color: #888;
          font-weight: 300;
          font-style: italic;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 640px) {
          .ae-grid { grid-template-columns: 1fr; }
          .ae-card { border-right: none; border-bottom: 1px solid #ebebeb; }
          .ae-now-item { grid-template-columns: 12px 1fr; gap: 0.75rem; }
          .ae-now-value { grid-column: 2; color: #555; }
        }
      `}</style>
    </div>
  )
}

/* ─── Data ─── */

const _interests = [
  { icon: "📷", title: "Photography", desc: "Capturing ordinary moments with an eye for contrast, light, and quiet stories." },
  { icon: "✈️", title: "Travel", desc: "New places recalibrate perspective. I collect experiences, not souvenirs." },
  { icon: "🏆", title: "Hackathons", desc: "Rapid, high-stakes creation under pressure — my favorite environment." },
  { icon: "🎥", title: "Video & Content", desc: "Making things — tutorials, vlogs, essays — because creating is how I think." },
  { icon: "📚", title: "Reading", desc: "Systems thinking, biographies, and anything that shifts how I see the world." },
  { icon: "🎵", title: "Music", desc: "Lo-fi for flow state, jazz for thinking, and everything else for the commute." },
]

const _quotes = [
  "Ship it, then make it beautiful. Waiting for perfect is just fear with better branding.",
  "The best engineers I know are also great communicators. Code is just one language.",
  "Curiosity is a strategy. It compounds over time the same way money does.",
]

const _currently = [
  { label: "Building", value: "Scalable systems at Alcovia" },
  { label: "Learning", value: "Advanced distributed systems & AI" },
  { label: "Reading", value: "The Psychology of Money — Morgan Housel" },
  { label: "Watching", value: "Lectures, talks, long-form essays" },
  { label: "Based In", value: "Gurugram, India" },
]