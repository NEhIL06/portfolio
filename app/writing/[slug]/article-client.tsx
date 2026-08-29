"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import type { Article } from "@/lib/articles"

type DiagramType =
  | "auth-layers"
  | "session-vs-token"
  | "oauth-oidc"
  | "rag-pipeline"
  | "query-toolbox"
  | "indexing-strategies"
  | "adaptive-rag"
  | "long-context"

const DIAGRAM_TITLES: Record<DiagramType, string> = {
  "auth-layers": "The authentication landscape is a stack, not a list",
  "session-vs-token": "Two ways a server can remember a login",
  "oauth-oidc": "How OAuth 2.0 and OIDC share one flow",
  "rag-pipeline": "RAG has an offline path and an online path",
  "query-toolbox": "Five ways to translate a question before retrieval",
  "indexing-strategies": "The index can preserve more than one view of a document",
  "adaptive-rag": "Adaptive RAG turns a chain into a checked, recoverable flow",
  "long-context": "The useful design space sits between tiny chunks and context stuffing",
}

function ArticleDiagram({ type }: { type: DiagramType }) {
  if (type === "rag-pipeline") {
    return (
      <figure className="ar-figure ar-wide-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">{DIAGRAM_TITLES[type]}</figcaption>
        <div className="ar-rag-pipeline">
          <section className="ar-pipeline-lane">
            <div className="ar-lane-label"><strong>Offline</strong><span>build the index</span></div>
            <div className="ar-node-row">
              <div className="ar-node"><b>1</b><strong>Load</strong><span>documents + metadata</span></div><i>→</i>
              <div className="ar-node"><b>2</b><strong>Split</strong><span>bounded, overlapping chunks</span></div><i>→</i>
              <div className="ar-node"><b>3</b><strong>Embed</strong><span>semantic vectors</span></div><i>→</i>
              <div className="ar-node ar-node-dark"><b>4</b><strong>Index</strong><span>vector + source text</span></div>
            </div>
          </section>
          <section className="ar-pipeline-lane">
            <div className="ar-lane-label"><strong>Online</strong><span>answer one question</span></div>
            <div className="ar-node-row">
              <div className="ar-node"><b>A</b><strong>Question</strong><span>embed with same model</span></div><i>→</i>
              <div className="ar-node"><b>B</b><strong>Retrieve</strong><span>top-k nearest chunks</span></div><i>→</i>
              <div className="ar-node"><b>C</b><strong>Augment</strong><span>context + question prompt</span></div><i>→</i>
              <div className="ar-node ar-node-dark"><b>D</b><strong>Generate</strong><span>grounded answer</span></div>
            </div>
          </section>
        </div>
        <p className="ar-figure-note">Retrieval does not change the model’s weights. It changes the evidence available inside the prompt at inference time.</p>
      </figure>
    )
  }

  if (type === "query-toolbox") {
    return (
      <figure className="ar-figure ar-wide-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">{DIAGRAM_TITLES[type]}</figcaption>
        <div className="ar-query-origin"><span>User question</span><i>↓</i></div>
        <div className="ar-query-grid">
          <div><b>01</b><strong>Multi-query</strong><span>Rephrase from several angles, retrieve each, take the unique union.</span></div>
          <div><b>02</b><strong>RAG-Fusion</strong><span>Retrieve for several queries, then fuse the ranked lists with RRF.</span></div>
          <div><b>03</b><strong>Decomposition</strong><span>Break a compound question into independently answerable sub-questions.</span></div>
          <div><b>04</b><strong>Step-back</strong><span>Ask a broader principle question alongside the literal question.</span></div>
          <div><b>05</b><strong>HyDE</strong><span>Generate a hypothetical answer passage and use its embedding to search.</span></div>
        </div>
        <p className="ar-figure-note">Query translation changes the geometry or granularity of the search without changing the underlying corpus.</p>
      </figure>
    )
  }

  if (type === "indexing-strategies") {
    return (
      <figure className="ar-figure ar-wide-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">{DIAGRAM_TITLES[type]}</figcaption>
        <div className="ar-strategy-grid">
          <section>
            <div className="ar-strategy-kicker">Multi-representation</div>
            <div className="ar-mini-flow"><span>summary</span><i>search</i><span className="ar-mini-dark">full document</span></div>
            <p>Index an easy-to-match representation; return the richer parent document.</p>
          </section>
          <section>
            <div className="ar-strategy-kicker">RAPTOR</div>
            <div className="ar-tree"><span>corpus summary</span><div><i>cluster summary</i><i>cluster summary</i></div><div><b>docs</b><b>docs</b><b>docs</b></div></div>
            <p>Embed, cluster, summarize, and recurse; index every abstraction level.</p>
          </section>
          <section>
            <div className="ar-strategy-kicker">ColBERT</div>
            <div className="ar-token-vectors"><span>q₁</span><span>q₂</span><span>q₃</span><i>MaxSim</i><b>d₁ d₂ d₃ d₄ d₅</b></div>
            <p>Keep one contextual vector per token and score with late interaction.</p>
          </section>
        </div>
        <p className="ar-figure-note">A single vector per chunk is only the baseline. The retrieval representation and the returned context do not have to be identical.</p>
      </figure>
    )
  }

  if (type === "adaptive-rag") {
    return (
      <figure className="ar-figure ar-wide-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">{DIAGRAM_TITLES[type]}</figcaption>
        <div className="ar-adaptive-flow">
          <div className="ar-adaptive-start">Question</div><div className="ar-adaptive-arrow">↓</div>
          <div className="ar-adaptive-choice"><strong>Route</strong><span>vector store · web search · LLM fallback</span></div><div className="ar-adaptive-arrow">↓</div>
          <div className="ar-adaptive-check"><strong>Are retrieved documents relevant?</strong><span>No → rewrite / search the web</span><span>Yes → generate</span></div><div className="ar-adaptive-arrow">↓</div>
          <div className="ar-adaptive-check"><strong>Is the answer grounded in the documents?</strong><span>No → regenerate</span><span>Yes → test usefulness</span></div><div className="ar-adaptive-arrow">↓</div>
          <div className="ar-adaptive-check"><strong>Does it answer the question?</strong><span>No → broaden retrieval</span><span>Yes → return</span></div>
        </div>
        <p className="ar-figure-note">Nodes modify shared state; conditional edges choose the next allowed transition. The loops are explicit, observable, and bounded.</p>
      </figure>
    )
  }

  if (type === "long-context") {
    return (
      <figure className="ar-figure ar-wide-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">{DIAGRAM_TITLES[type]}</figcaption>
        <div className="ar-context-scale">
          <section><strong>Precise chunks</strong><span>low token cost</span><span>complex tuning</span><span>recall risk</span></section><i>←</i>
          <section className="ar-context-optimum"><small>likely middle</small><strong>Whole documents</strong><span>route first</span><span>preserve coherence</span><span>auditable access</span></section><i>→</i>
          <section><strong>Stuff everything</strong><span>high token cost</span><span>latency</span><span>attention + security risk</span></section>
        </div>
        <p className="ar-figure-note">Longer context weakens the case for arbitrary micro-chunks, but it does not remove routing, retrieval, access control, cost, or attention limits.</p>
      </figure>
    )
  }

  if (type === "auth-layers") {
    return (
      <figure className="ar-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">
          {DIAGRAM_TITLES[type]}
        </figcaption>
        <div className="ar-layer-map">
          <div className="ar-layer ar-layer-question">
            <span className="ar-layer-kicker">Identity</span>
            <strong>Who are you?</strong>
            <span>Authentication</span>
          </div>
          <div className="ar-layer">
            <span className="ar-layer-kicker">Credentials</span>
            <strong>How do you prove it?</strong>
            <span>Basic · Digest · API key</span>
          </div>
          <div className="ar-layer">
            <span className="ar-layer-kicker">Continuity</span>
            <strong>How do requests remember?</strong>
            <span>Session · Bearer token · JWT</span>
          </div>
          <div className="ar-layer">
            <span className="ar-layer-kicker">Delegation &amp; federation</span>
            <strong>Who else can be trusted?</strong>
            <span>OAuth 2.0 · OIDC · SAML · SSO</span>
          </div>
          <div className="ar-layer ar-layer-question">
            <span className="ar-layer-kicker">Permissions</span>
            <strong>What can you do?</strong>
            <span>Authorization</span>
          </div>
        </div>
        <p className="ar-figure-note">
          The terms are related, but they solve different questions at different layers.
        </p>
      </figure>
    )
  }

  if (type === "session-vs-token") {
    return (
      <figure className="ar-figure" aria-labelledby={`${type}-title`}>
        <figcaption id={`${type}-title`} className="ar-figure-title">
          {DIAGRAM_TITLES[type]}
        </figcaption>
        <div className="ar-compare-grid">
          <section className="ar-compare-panel">
            <div className="ar-compare-heading">
              <span className="ar-step-number">A</span>
              <div><strong>Session</strong><span>Server keeps the state</span></div>
            </div>
            <div className="ar-flow-row"><span>Client</span><b>credentials →</b><span>Server</span></div>
            <div className="ar-flow-row"><span>Client</span><b>← session ID</b><span>Session store</span></div>
            <p>Each request sends the ID. The server looks up the session before continuing.</p>
          </section>
          <section className="ar-compare-panel">
            <div className="ar-compare-heading">
              <span className="ar-step-number">B</span>
              <div><strong>Signed token</strong><span>Token carries the claims</span></div>
            </div>
            <div className="ar-flow-row"><span>Client</span><b>credentials →</b><span>Server</span></div>
            <div className="ar-flow-row"><span>Client</span><b>← signed JWT</b><span>Signer</span></div>
            <p>Each request sends the token. The server can validate its signature locally.</p>
          </section>
        </div>
        <p className="ar-figure-note">
          Sessions make revocation direct. Locally validated tokens remove a lookup but remain valid until they expire unless another revocation mechanism exists.
        </p>
      </figure>
    )
  }

  return (
    <figure className="ar-figure" aria-labelledby={`${type}-title`}>
      <figcaption id={`${type}-title`} className="ar-figure-title">
        {DIAGRAM_TITLES[type]}
      </figcaption>
      <ol className="ar-sequence">
        <li><span>1</span><div><strong>App redirects the browser</strong><p>It requests access, identity, or both from the provider.</p></div></li>
        <li><span>2</span><div><strong>User signs in and consents</strong><p>The password stays with the identity provider.</p></div></li>
        <li><span>3</span><div><strong>Provider returns a code</strong><p>The app exchanges the short-lived code at the token endpoint.</p></div></li>
        <li><span>4</span><div><strong>Different tokens answer different questions</strong><p>Access token: what can the app access? ID token: who authenticated?</p></div></li>
      </ol>
      <div className="ar-token-key">
        <span><i className="ar-key-dot ar-key-access" />OAuth 2.0 → delegated access</span>
        <span><i className="ar-key-dot ar-key-identity" />OIDC → verified identity</span>
      </div>
      <p className="ar-figure-note">
        SSO is the experience created when several apps trust the same identity provider.
      </p>
    </figure>
  )
}

// ─── Inline renderer ──────────────────────────────────────────────────────────
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="ar-inline-code">{part.slice(1, -1)}</code>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <a key={i} className="ar-inline-link" href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      )
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
  const nodes: React.ReactNode[] = []
  const segments = raw.split(/(\[\[code:[^\]]+\]\][\s\S]*?\[\[\/code\]\])/g)
  let nodeIndex = 0

  segments.forEach((segment) => {
    const codeBlock = segment.match(/^\[\[code:([^\]]+)\]\]\n?([\s\S]*?)\n?\[\[\/code\]\]$/)
    if (codeBlock) {
      nodes.push(
        <div key={nodeIndex++} className="ar-code-wrap">
          <div className="ar-code-label">{codeBlock[1]}</div>
          <pre className="ar-code"><code>{codeBlock[2]}</code></pre>
        </div>
      )
      return
    }

    segment.split(/\n{2,}/).forEach((block) => {
      const trimmed = block.trim()
      if (!trimmed) return
      const lines = trimmed.split("\n")
      const key = nodeIndex++

      const diagram = trimmed.match(/^\[\[diagram:([a-z-]+)\]\]$/)
      if (diagram) {
        nodes.push(<ArticleDiagram key={key} type={diagram[1] as DiagramType} />)
        return
      }

      if (lines[0].startsWith("## ")) {
        nodes.push(<h2 key={key} className="ar-h2">{lines[0].replace(/^## /, "")}</h2>)
        return
      }

      if (lines[0].startsWith("### ")) {
        nodes.push(<h3 key={key} className="ar-h3">{lines[0].replace(/^### /, "")}</h3>)
        return
      }

      if (lines.every((line) => line.startsWith("> "))) {
        nodes.push(
          <blockquote key={key} className="ar-blockquote">
            {renderInline(lines.map((line) => line.replace(/^> /, "")).join(" "))}
          </blockquote>
        )
        return
      }

      if (lines.every((line) => line.startsWith("- "))) {
        nodes.push(
          <ul key={key} className="ar-list">
            {lines.map((line, lineIndex) => (
              <li key={lineIndex} className="ar-list-item">{renderInline(line.replace(/^- /, ""))}</li>
            ))}
          </ul>
        )
        return
      }

      if (lines.every((line) => /^\d+\. /.test(line))) {
        nodes.push(
          <ol key={key} className="ar-number-list">
            {lines.map((line, lineIndex) => (
              <li key={lineIndex}>{renderInline(line.replace(/^\d+\. /, ""))}</li>
            ))}
          </ol>
        )
        return
      }

      if (isPullQuote(trimmed)) {
        nodes.push(<p key={key} className="ar-pull">{trimmed.slice(2, -2)}</p>)
        return
      }

      nodes.push(<p key={key} className="ar-para">{renderInline(trimmed)}</p>)
    })
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
        .ar-h3 {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(0.9rem, 1.8vw, 1.05rem); font-weight: 750;
          letter-spacing: 0.01em; color: #111; line-height: 1.4;
          margin: 2.4rem 0 0.8rem;
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
        .ar-number-list {
          margin: 0.25rem 0 2rem; padding: 0; list-style: none;
          counter-reset: article-step; display: flex; flex-direction: column; gap: 0.8rem;
        }
        .ar-number-list li {
          counter-increment: article-step; position: relative; padding-left: 2.35rem;
          font-size: clamp(1rem, 1.4vw, 1.1rem); line-height: 1.75; color: #222;
        }
        .ar-number-list li::before {
          content: counter(article-step, decimal-leading-zero); position: absolute; left: 0; top: 0.18rem;
          font-family: 'Inter', system-ui, sans-serif; font-size: 0.62rem; font-weight: 700;
          color: #999; letter-spacing: 0.05em;
        }
        .ar-body strong { font-weight: 700; color: #0a0a0a; }
        .ar-inline-link {
          color: #111; text-decoration-color: #aaa; text-decoration-thickness: 1px;
          text-underline-offset: 3px; transition: text-decoration-color 0.15s;
        }
        .ar-inline-link:hover { text-decoration-color: #111; }
        .ar-inline-code {
          padding: 0.12em 0.35em; border: 1px solid #e2e2e2; background: #f6f6f6;
          color: #222; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.82em; white-space: nowrap;
        }
        .ar-code-wrap {
          margin: 2rem 0 2.4rem; border: 1px solid #dedede; background: #111;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }
        .ar-code-label {
          padding: 0.55rem 0.8rem; border-bottom: 1px solid #2d2d2d; color: #888;
          font-family: 'Inter', system-ui, sans-serif; font-size: 0.58rem;
          font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
        }
        .ar-code {
          margin: 0; padding: 1rem; overflow-x: auto; color: #e8e8e8;
          font-size: clamp(0.7rem, 1.4vw, 0.82rem); line-height: 1.7; tab-size: 2;
        }

        .ar-figure {
          margin: 3rem 0; padding: 1.4rem;
          border: 1px solid #dedede; background: #fafafa;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .ar-figure-title {
          margin-bottom: 1.25rem; color: #111; font-size: 0.82rem;
          font-weight: 700; letter-spacing: 0; line-height: 1.4;
        }
        .ar-figure-note {
          margin: 1rem 0 0; color: #777; font-size: 0.72rem; line-height: 1.6;
        }
        .ar-layer-map { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
        .ar-layer {
          position: relative; min-height: 142px; padding: 1rem;
          border: 1px solid #e1e1e1; border-right: 0; background: #fff;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .ar-layer:last-child { border-right: 1px solid #e1e1e1; }
        .ar-layer:not(:last-child)::after {
          content: '›'; position: absolute; right: -0.42rem; top: 50%; z-index: 1;
          width: 0.8rem; height: 1.4rem; margin-top: -0.7rem;
          background: #fff; color: #aaa; font-size: 1.2rem; line-height: 1.25rem;
          text-align: center;
        }
        .ar-layer-question { background: #111; border-color: #111; color: #fff; }
        .ar-layer-question:not(:last-child)::after { background: #111; color: #fff; }
        .ar-layer-kicker {
          color: #999; font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .ar-layer strong { color: inherit; font-size: 0.78rem; line-height: 1.35; }
        .ar-layer > span:last-child { margin-top: auto; color: #777; font-size: 0.66rem; line-height: 1.45; }
        .ar-layer-question > span:last-child { color: #bbb; }

        .ar-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .ar-compare-panel { border: 1px solid #e1e1e1; background: #fff; padding: 1rem; }
        .ar-compare-heading { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1rem; }
        .ar-step-number {
          width: 1.7rem; height: 1.7rem; flex: 0 0 auto; border-radius: 50%;
          background: #111; color: #fff; display: grid; place-items: center;
          font-size: 0.64rem; font-weight: 700;
        }
        .ar-compare-heading div { display: flex; flex-direction: column; gap: 0.1rem; }
        .ar-compare-heading strong { font-size: 0.78rem; }
        .ar-compare-heading div span { color: #888; font-size: 0.64rem; }
        .ar-flow-row {
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
          gap: 0.5rem; margin-bottom: 0.45rem; color: #555; font-size: 0.64rem;
        }
        .ar-flow-row span {
          min-height: 2.2rem; border: 1px solid #dedede; background: #f7f7f7;
          display: grid; place-items: center; padding: 0.3rem; text-align: center;
        }
        .ar-flow-row b { color: #999; font-size: 0.58rem; font-weight: 500; white-space: nowrap; }
        .ar-compare-panel > p { margin: 0.8rem 0 0; color: #666; font-size: 0.68rem; line-height: 1.55; }

        .ar-sequence { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); }
        .ar-sequence li {
          position: relative; min-height: 130px; padding: 0 0.9rem;
          border-right: 1px solid #ddd; display: flex; align-items: flex-start; gap: 0.6rem;
        }
        .ar-sequence li:first-child { padding-left: 0; }
        .ar-sequence li:last-child { padding-right: 0; border-right: 0; }
        .ar-sequence li > span {
          width: 1.55rem; height: 1.55rem; flex: 0 0 auto; border-radius: 50%;
          background: #111; color: #fff; display: grid; place-items: center;
          font-size: 0.6rem; font-weight: 700;
        }
        .ar-sequence strong { display: block; font-size: 0.72rem; line-height: 1.4; }
        .ar-sequence p { margin: 0.4rem 0 0; color: #777; font-size: 0.64rem; line-height: 1.5; }
        .ar-token-key {
          display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; padding-top: 0.8rem;
          border-top: 1px solid #e1e1e1; color: #555; font-size: 0.66rem;
        }
        .ar-token-key span { display: flex; align-items: center; gap: 0.4rem; }
        .ar-key-dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; }
        .ar-key-access { background: #111; }
        .ar-key-identity { background: #fff; border: 2px solid #777; }

        .ar-wide-figure { margin-left: clamp(-4rem, -5vw, -1rem); margin-right: clamp(-4rem, -5vw, -1rem); }
        .ar-rag-pipeline { display: flex; flex-direction: column; gap: 0.8rem; }
        .ar-pipeline-lane { display: grid; grid-template-columns: 84px 1fr; gap: 0.8rem; align-items: stretch; }
        .ar-lane-label {
          border-right: 1px solid #ddd; display: flex; flex-direction: column;
          justify-content: center; gap: 0.15rem; padding-right: 0.8rem;
        }
        .ar-lane-label strong { font-size: 0.7rem; }
        .ar-lane-label span { color: #999; font-size: 0.58rem; line-height: 1.35; }
        .ar-node-row { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; align-items: center; gap: 0.45rem; }
        .ar-node-row > i { color: #aaa; font-size: 0.72rem; font-style: normal; }
        .ar-node {
          min-height: 88px; border: 1px solid #ddd; background: #fff; padding: 0.7rem;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .ar-node b { color: #bbb; font-size: 0.55rem; }
        .ar-node strong { margin-top: auto; font-size: 0.7rem; }
        .ar-node span { color: #888; font-size: 0.57rem; line-height: 1.35; }
        .ar-node-dark { background: #111; border-color: #111; color: #fff; }
        .ar-node-dark strong { color: #fff; }
        .ar-node-dark span { color: #aaa; }

        .ar-query-origin { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; margin-bottom: 0.45rem; }
        .ar-query-origin span { background: #111; color: #fff; padding: 0.55rem 1rem; font-size: 0.68rem; font-weight: 700; }
        .ar-query-origin i { color: #aaa; font-style: normal; font-size: 0.7rem; }
        .ar-query-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
        .ar-query-grid > div { border-top: 2px solid #111; background: #fff; padding: 0.8rem; min-height: 142px; display: flex; flex-direction: column; }
        .ar-query-grid b { color: #bbb; font-size: 0.55rem; }
        .ar-query-grid strong { margin: 0.7rem 0 0.35rem; font-size: 0.69rem; }
        .ar-query-grid span { color: #777; font-size: 0.61rem; line-height: 1.5; }

        .ar-strategy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; }
        .ar-strategy-grid > section { min-height: 205px; padding: 0.9rem; border: 1px solid #ddd; background: #fff; }
        .ar-strategy-kicker { margin-bottom: 1rem; color: #111; font-size: 0.68rem; font-weight: 700; }
        .ar-strategy-grid p { margin: 1rem 0 0; color: #777; font-size: 0.62rem; line-height: 1.5; }
        .ar-mini-flow { display: grid; grid-template-columns: 1fr auto 1fr; gap: 0.35rem; align-items: center; }
        .ar-mini-flow span { border: 1px solid #ddd; padding: 0.8rem 0.3rem; text-align: center; color: #666; font-size: 0.6rem; }
        .ar-mini-flow i { color: #aaa; font-size: 0.52rem; font-style: normal; }
        .ar-mini-flow .ar-mini-dark { background: #111; color: #fff; border-color: #111; }
        .ar-tree { display: flex; flex-direction: column; gap: 0.35rem; align-items: center; }
        .ar-tree > span { background: #111; color: #fff; padding: 0.45rem 0.7rem; font-size: 0.56rem; }
        .ar-tree > div { display: flex; gap: 0.35rem; }
        .ar-tree i, .ar-tree b { border: 1px solid #ddd; padding: 0.4rem; color: #777; font-size: 0.5rem; font-style: normal; font-weight: 500; }
        .ar-token-vectors { display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center; }
        .ar-token-vectors span { width: 1.65rem; height: 1.65rem; background: #111; color: #fff; display: grid; place-items: center; font-size: 0.55rem; }
        .ar-token-vectors i { color: #999; font-size: 0.53rem; font-style: normal; margin: 0 0.2rem; }
        .ar-token-vectors b { flex-basis: 100%; border: 1px solid #ddd; padding: 0.6rem; color: #777; font-size: 0.58rem; text-align: center; letter-spacing: 0.12em; }

        .ar-adaptive-flow { max-width: 620px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .ar-adaptive-start { background: #111; color: #fff; padding: 0.55rem 1.4rem; font-size: 0.68rem; font-weight: 700; }
        .ar-adaptive-arrow { height: 1.25rem; color: #aaa; font-size: 0.75rem; display: grid; place-items: center; }
        .ar-adaptive-choice, .ar-adaptive-check {
          width: 100%; border: 1px solid #d9d9d9; background: #fff; padding: 0.75rem 0.9rem;
          display: grid; grid-template-columns: 1.2fr 2fr; gap: 0.4rem 0.8rem; align-items: center;
        }
        .ar-adaptive-choice strong, .ar-adaptive-check strong { font-size: 0.67rem; }
        .ar-adaptive-choice span, .ar-adaptive-check span { color: #777; font-size: 0.59rem; line-height: 1.4; }
        .ar-adaptive-check { grid-template-columns: 1.6fr 1fr 1fr; }

        .ar-context-scale { display: grid; grid-template-columns: 1fr auto 1.15fr auto 1fr; gap: 0.55rem; align-items: center; }
        .ar-context-scale > i { color: #aaa; font-style: normal; }
        .ar-context-scale section { min-height: 145px; border: 1px solid #ddd; background: #fff; padding: 0.85rem; display: flex; flex-direction: column; gap: 0.35rem; }
        .ar-context-scale strong { font-size: 0.7rem; margin-bottom: 0.4rem; }
        .ar-context-scale span { color: #888; font-size: 0.59rem; }
        .ar-context-scale .ar-context-optimum { background: #111; border-color: #111; color: #fff; transform: scale(1.03); }
        .ar-context-optimum strong { color: #fff; }
        .ar-context-optimum small { color: #777; font-size: 0.52rem; letter-spacing: 0.09em; text-transform: uppercase; }
        .ar-context-optimum span { color: #aaa; }

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
          .ar-figure { margin: 2.5rem 0; padding: 1rem; }
          .ar-layer-map { grid-template-columns: 1fr; }
          .ar-layer { min-height: 105px; border-right: 1px solid #e1e1e1; border-bottom: 0; }
          .ar-layer:last-child { border-bottom: 1px solid #e1e1e1; }
          .ar-layer:not(:last-child)::after {
            content: '⌄'; top: auto; right: 50%; bottom: -0.6rem; margin: 0 -0.4rem 0 0;
            height: 1rem; line-height: 0.7rem;
          }
          .ar-compare-grid { grid-template-columns: 1fr; }
          .ar-sequence { grid-template-columns: 1fr; }
          .ar-sequence li {
            min-height: auto; padding: 0.75rem 0; border-right: 0; border-bottom: 1px solid #ddd;
          }
          .ar-sequence li:first-child { padding-top: 0; }
          .ar-sequence li:last-child { padding-bottom: 0; border-bottom: 0; }
          .ar-wide-figure { margin-left: 0; margin-right: 0; }
          .ar-pipeline-lane { grid-template-columns: 1fr; }
          .ar-lane-label { border-right: 0; border-bottom: 1px solid #ddd; padding: 0 0 0.55rem; }
          .ar-node-row { grid-template-columns: 1fr; }
          .ar-node-row > i { text-align: center; transform: rotate(90deg); }
          .ar-node { min-height: 80px; }
          .ar-query-grid, .ar-strategy-grid { grid-template-columns: 1fr; }
          .ar-query-grid > div { min-height: auto; }
          .ar-adaptive-choice, .ar-adaptive-check { grid-template-columns: 1fr; }
          .ar-context-scale { grid-template-columns: 1fr; }
          .ar-context-scale > i { text-align: center; transform: rotate(90deg); }
          .ar-context-scale .ar-context-optimum { transform: none; }
        }
      `}</style>
    </main>
  )
}
