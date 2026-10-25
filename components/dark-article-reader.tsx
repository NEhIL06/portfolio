"use client";

import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";
import type { Article } from "@/lib/articles";

type DiagramType =
  | "auth-layers"
  | "session-vs-token"
  | "oauth-oidc"
  | "rag-pipeline"
  | "query-toolbox"
  | "indexing-strategies"
  | "adaptive-rag"
  | "long-context";

const DIAGRAM_TITLES: Record<DiagramType, string> = {
  "auth-layers": "The authentication landscape is a stack, not a list",
  "session-vs-token": "Two ways a server can remember a login",
  "oauth-oidc": "How OAuth 2.0 and OIDC share one flow",
  "rag-pipeline": "RAG has an offline path and an online path",
  "query-toolbox": "Five ways to translate a question before retrieval",
  "indexing-strategies":
    "The index can preserve more than one view of a document",
  "adaptive-rag": "Adaptive RAG turns a chain into a checked, recoverable flow",
  "long-context":
    "The useful design space sits between tiny chunks and context stuffing",
};

function DarkArticleDiagram({ type }: { type: DiagramType }) {
  if (type === "rag-pipeline") {
    return (
      <figure className="my-8 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
        <figcaption className="text-zinc-400 font-semibold mb-4 text-xs uppercase tracking-wider">
          {DIAGRAM_TITLES[type]}
        </figcaption>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="text-emerald-400 font-bold block mb-2 uppercase text-[10px]">
              Offline // Build Index
            </span>
            <div className="flex flex-wrap items-center gap-2 text-zinc-300">
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">1. Load Docs</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">2. Chunk & Overlap</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">3. Embed Vectors</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded">4. HNSW Vector Index</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="text-blue-400 font-bold block mb-2 uppercase text-[10px]">
              Online // Query Time
            </span>
            <div className="flex flex-wrap items-center gap-2 text-zinc-300">
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">A. User Query</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">B. Vector Retrieval</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">C. Context Augment</span>
              <span>&rarr;</span>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded">D. Grounded LLM Response</span>
            </div>
          </div>
        </div>
      </figure>
    );
  }

  if (type === "auth-layers") {
    return (
      <figure className="my-8 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
        <figcaption className="text-zinc-400 font-semibold mb-4 text-xs uppercase tracking-wider">
          {DIAGRAM_TITLES[type]}
        </figcaption>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <span className="text-zinc-500 block text-[10px]">Identity</span>
            <strong className="text-zinc-200 block text-xs mt-1">Credentials</strong>
            <span className="text-zinc-500 text-[10px] mt-1 block">Basic / Passwords</span>
          </div>
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <span className="text-zinc-500 block text-[10px]">Continuity</span>
            <strong className="text-zinc-200 block text-xs mt-1">Sessions / JWTs</strong>
            <span className="text-zinc-500 text-[10px] mt-1 block">Opaque / Claims</span>
          </div>
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <span className="text-zinc-500 block text-[10px]">Delegation</span>
            <strong className="text-zinc-200 block text-xs mt-1">OAuth 2.0 / OIDC</strong>
            <span className="text-zinc-500 text-[10px] mt-1 block">Scopes / Identity</span>
          </div>
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-center">
            <span className="text-zinc-500 block text-[10px]">Authorization</span>
            <strong className="text-zinc-200 block text-xs mt-1">Permissions</strong>
            <span className="text-zinc-500 text-[10px] mt-1 block">RBAC / ABAC</span>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-8 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
      <figcaption className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">
        {DIAGRAM_TITLES[type] || type}
      </figcaption>
    </figure>
  );
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i} className="italic text-zinc-200">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-emerald-300 font-mono text-[13px] border border-zinc-700/50">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a
              key={i}
              className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors"
              href={link[2]}
              target="_blank"
              rel="noreferrer"
            >
              {link[1]}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg bg-[#0e0e11] border border-zinc-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/40 text-zinc-400 text-[11px]">
        <span>{label || "code"}</span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "copied" : "copy"}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DarkArticleReader({ article }: { article: Article }) {
  // Parse blocks
  const renderBody = () => {
    const raw = article.content;
    const blocks = raw.split(/\n{2,}/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Diagram check
      const diagramMatch = trimmed.match(/^\[\[diagram:([a-z-]+)\]\]$/);
      if (diagramMatch) {
        return <DarkArticleDiagram key={idx} type={diagramMatch[1] as DiagramType} />;
      }

      // Code block check
      const codeFence = trimmed.match(/^```([a-zA-Z0-9_-]*)\n([\s\S]*?)```$/);
      if (codeFence) {
        return <CodeBlock key={idx} label={codeFence[1]} code={codeFence[2]} />;
      }

      // Legacy [[code:label]] syntax check
      const legacyCode = trimmed.match(/^\[\[code:([^\]]+)\]\]\n?([\s\S]*?)\n?\[\[\/code\]\]$/);
      if (legacyCode) {
        return <CodeBlock key={idx} label={legacyCode[1]} code={legacyCode[2]} />;
      }

      // Blockquote check
      if (trimmed.startsWith(">")) {
        const quoteText = trimmed
          .split("\n")
          .map((line) => line.replace(/^>\s?/, ""))
          .join("\n");
        return (
          <blockquote
            key={idx}
            className="my-6 border-l-2 border-zinc-600 pl-4 py-1 italic text-zinc-300 space-y-2 font-serif sm:font-sans text-[15px] sm:text-base leading-relaxed"
          >
            <InlineText text={quoteText} />
          </blockquote>
        );
      }

      // Headings
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg font-bold text-white mt-8 mb-3 tracking-tight">
            <InlineText text={trimmed.slice(4)} />
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 tracking-tight border-b border-zinc-800/80 pb-2">
            <InlineText text={trimmed.slice(3)} />
          </h2>
        );
      }

      // Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((l) => l.replace(/^[-*]\s+/, ""));
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc list-inside text-zinc-300 text-sm sm:text-[15px] leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>
                <InlineText text={item} />
              </li>
            ))}
          </ul>
        );
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split("\n").map((l) => l.replace(/^\d+\.\s+/, ""));
        return (
          <ol key={idx} className="my-4 space-y-2 list-decimal list-inside text-zinc-300 text-sm sm:text-[15px] leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>
                <InlineText text={item} />
              </li>
            ))}
          </ol>
        );
      }

      // Paragraph
      return (
        <p key={idx} className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed my-4 font-sans">
          <InlineText text={trimmed} />
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-zinc-700 selection:text-white pb-32">
      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        {/* Breadcrumb Back to Blog */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>back to blog</span>
          </Link>
        </div>

        {/* Article Metadata */}
        <div className="text-xs font-mono text-zinc-400 mb-2">
          <span>{article.date}</span> &bull; <span>{article.readingTime}</span>
        </div>

        {/* Article Title */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight font-sans">
          {article.title}
        </h1>

        {/* Tags matching Image 1 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-zinc-400 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-zinc-800/80 mb-8" />

        {/* Rendered Body */}
        <article className="space-y-4">
          {renderBody()}
        </article>

        {/* Article Footer & Links */}
        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs font-mono text-zinc-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            Written by <strong className="text-zinc-300">Nehil Chandrakar</strong> &bull; Systems & AI Infra
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">
              &larr; More articles
            </Link>
            <Link href="/fullstack" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Fullstack version &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
