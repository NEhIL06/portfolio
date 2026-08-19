"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import type { Article } from "@/lib/articles"

// ─── Inline renderer ──────────────────────────────────────────────────────────
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

// Pull quote only when the ENTIRE paragraph is **bold**
function isPullQuote(block: string): boolean {
  const t = block.trim()
  return t.startsWith("**") && t.endsWith("**") && t.indexOf("**", 2) === t.length - 2
}

function renderContent(raw: string) {
  const blocks = raw.split(/\n{2,}/)
  const nodes: React.ReactNode[] = []

  blocks.forEach((block, bi) => {
    const trimmed = block.trim()
    if (!trimmed) return
    const lines = trimmed.split("\n")

    if (lines[0].startsWith("## ")) {
      nodes.push(<h2 key={bi} className="ar-h2">{lines[0].replace(/^## /, "")}</h2>)
      return
    }

    if (lines.every((l) => l.startsWith("> "))) {
      nodes.push(
        <blockquote key={bi} className="ar-blockquote">
          {lines.map((l) => l.replace(/^> /, "")).join(" ")}
        </blockquote>
      )
      return
    }

    if (lines.every((l) => l.startsWith("- "))) {
      nodes.push(
        <ul key={bi} className="ar-list">
          {lines.map((l, li) => (
            <li key={li} className="ar-list-item">{renderInline(l.replace(/^- /, ""))}</li>
          ))}
        </ul>
      )
      return
    }

    if (isPullQuote(trimmed)) {
      nodes.push(<p key={bi} className="ar-pull">{trimmed.slice(2, -2)}</p>)
      return
    }

    nodes.push(<p key={bi} className="ar-para">{renderInline(trimmed)}</p>)
  })

  return nodes
}

// ─── Component ───────────────────────────────────────────────────────────────
export function ArticleClient({ article }: { article: Article }) {
  const [progress, setProgress] = useState(0)
  const bodyRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const el = bodyRef.current
      if (!el) return
      const scrolled = Math.max(0, -el.getBoundingClientRect().top)
      setProgress(Math.min(100, Math.round((scrolled / el.offsetHeight) * 100)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main className="ar-root">
      {/* Progress bar */}
      <div className="ar-prog-track">
        <div className="ar-prog-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Sticky nav */}
      <div className="ar-sticky">
        <Link href="/writing" className="ar-back">← Writing</Link>
        <span className="ar-sticky-title">{article.title}</span>
        <span className="ar-sticky-pct">{progress}%</span>
      </div>

      {/* Hero */}
      <header className="ar-hero">
        <div className="ar-hero-inner">
          <div className="ar-tag-row">
            {article.tags.map(t => <span key={t} className="ar-tag">{t}</span>)}
          </div>
          <h1 className="ar-title">{article.title}</h1>
          <p className="ar-deck">{article.subtitle}</p>
          <div className="ar-byline">
            <span className="ar-avatar">NC</span>
            <div>
              <div className="ar-byline-name">Nehil Chandrakar</div>
              <div className="ar-byline-meta">{article.date} · {article.readingTime}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <article ref={bodyRef} className="ar-body">
        {renderContent(article.content)}
      </article>

      {/* Footer */}
      <footer className="ar-footer">
        <div className="ar-footer-rule" />
        <p className="ar-footer-eyebrow">End of article</p>
        <Link href="/writing" className="ar-footer-link">← Browse all writing</Link>
      </footer>

      <style>{`
        .ar-root { min-height: 100vh; background: #fff; color: #111; }

        .ar-prog-track {
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px; background: #ebebeb; z-index: 300;
        }
        .ar-prog-fill {
          height: 100%; background: #111; transition: width 0.08s linear;
        }

        .ar-sticky {
          position: fixed; top: 2px; left: 0; right: 0; height: 50px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid #f0f0f0;
          display: flex; align-items: center;
          padding: 0 clamp(1.25rem, 5vw, 5rem); gap: 1.5rem;
          z-index: 200; font-family: 'Inter', system-ui, sans-serif;
        }
        .ar-back {
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 500; color: #999; text-decoration: none;
          white-space: nowrap; transition: color 0.15s; flex-shrink: 0;
        }
        .ar-back:hover { color: #111; }
        .ar-sticky-title {
          flex: 1; font-size: 0.8rem; color: #555; font-weight: 500;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center;
        }
        .ar-sticky-pct {
          font-size: 0.68rem; color: #ccc; white-space: nowrap;
          flex-shrink: 0; font-variant-numeric: tabular-nums;
        }

        .ar-hero {
          padding: 6.5rem clamp(1.25rem, 5vw, 5rem) 3.5rem;
          background: #fafafa; border-bottom: 1px solid #ebebeb;
        }
        .ar-hero-inner { max-width: 960px; margin: 0 auto; }
        .ar-tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.75rem; }
        .ar-tag {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #888; border: 1px solid #ddd; padding: 0.2rem 0.65rem; border-radius: 999px;
        }
        .ar-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700;
          line-height: 1.1; letter-spacing: -0.03em; color: #0a0a0a; margin: 0 0 1.1rem;
        }
        .ar-deck {
          font-family: 'Georgia', serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem); font-style: italic;
          color: #555; line-height: 1.6; margin: 0 0 2rem; max-width: 780px;
        }
        .ar-byline { display: flex; align-items: center; gap: 0.8rem; font-family: 'Inter', system-ui, sans-serif; }
        .ar-avatar {
          width: 36px; height: 36px; border-radius: 50%; background: #111; color: #fff;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.04em;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ar-byline-name { font-size: 0.85rem; font-weight: 600; color: #222; line-height: 1.3; }
        .ar-byline-meta { font-size: 0.75rem; color: #999; line-height: 1.3; }

        .ar-body {
          max-width: 960px; margin: 0 auto;
          padding: 4rem clamp(1.25rem, 5vw, 5rem) 5rem;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .ar-para {
          font-size: clamp(1.05rem, 1.5vw, 1.15rem);
          line-height: 1.88; color: #1c1c1c; margin: 0 0 1.6rem;
        }
        .ar-pull {
          font-family: 'Georgia', serif;
          font-size: clamp(1.2rem, 2.2vw, 1.45rem); font-weight: 700;
          color: #0a0a0a; line-height: 1.5;
          border-left: 3px solid #111; padding: 0.15rem 0 0.15rem 1.5rem;
          margin: 2.5rem 0;
        }
        .ar-h2 {
          font-family: 'Georgia', serif;
          font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700;
          letter-spacing: -0.02em; color: #0a0a0a; line-height: 1.25;
          margin: 3.5rem 0 1.1rem; padding-top: 1.5rem;
          border-top: 1px solid #ebebeb;
        }
        .ar-blockquote {
          font-family: 'Georgia', serif;
          font-size: clamp(1.05rem, 1.6vw, 1.15rem); font-style: italic;
          color: #444; line-height: 1.8;
          border-left: 2px solid #ccc; padding: 0.25rem 0 0.25rem 1.5rem;
          margin: 1.75rem 0;
        }
        .ar-list {
          list-style: none; padding: 0; margin: 0.25rem 0 2rem;
          display: flex; flex-direction: column; gap: 0.65rem;
        }
        .ar-list-item {
          font-size: clamp(1rem, 1.4vw, 1.1rem); line-height: 1.8;
          color: #222; padding-left: 1.5rem; position: relative;
        }
        .ar-list-item::before { content: '–'; position: absolute; left: 0; color: #bbb; }
        .ar-body strong { font-weight: 700; color: #0a0a0a; }

        .ar-footer {
          max-width: 960px; margin: 0 auto;
          padding: 3rem clamp(1.25rem, 5vw, 5rem) 8rem;
          font-family: 'Inter', system-ui, sans-serif;
          border-top: 1px solid #ebebeb;
        }
        .ar-footer-rule { width: 40px; height: 2px; background: #111; margin-bottom: 1.25rem; }
        .ar-footer-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase;
          color: #bbb; margin: 0 0 1rem;
        }
        .ar-footer-link {
          font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase;
          font-weight: 500; color: #555; text-decoration: none;
          border-bottom: 1px solid #ddd; padding-bottom: 1px;
          transition: color 0.15s, border-color 0.15s;
        }
        .ar-footer-link:hover { color: #111; border-color: #111; }

        @media (max-width: 600px) {
          .ar-sticky-title { display: none; }
          .ar-h2 { margin-top: 2.5rem; }
        }
      `}</style>
    </main>
  )
}
