import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog & Deep-Dives | Nehil Chandrakar",
  description:
    "Technical essays, distributed systems architecture, lock contention physics, and AI infrastructure deep-dives.",
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-zinc-700 selection:text-white pb-32">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 space-y-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>back to home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 font-sans">
            writing & deep-dives
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            long-form essays on distributed systems, memory models, vector search, and auth.
          </p>
        </div>

        <div className="space-y-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>{article.date}</span>
                <span>{article.readingTime}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181b] text-zinc-400 border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
