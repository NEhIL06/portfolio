import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and thoughts on engineering, systems, and building software in the age of AI.",
}

export default function WritingPage() {
  const articles = getAllArticles()

  return (
    <main className="wr-root">
      {/* Header */}
      <header className="wr-header">
        <div className="wr-header-inner">
          <p className="wr-eyebrow">Essays &amp; Thoughts</p>
          <h1 className="wr-title">Writing</h1>
          <p className="wr-subtitle">
            Long-form thinking on engineering, systems, and what it means to build software
            in an era where the tools keep changing faster than the judgment required to use them.
          </p>
        </div>
        <div className="wr-header-rule" />
      </header>

      {/* Article List */}
      <section className="wr-list">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/writing/${article.slug}`}
            className="wr-article-link"
            aria-label={`Read: ${article.title}`}
          >
            <article className="wr-article">
              <div className="wr-article-meta">
                <span className="wr-article-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="wr-article-date">{article.date}</span>
                <span className="wr-article-read">{article.readingTime}</span>
              </div>

              <div className="wr-article-body">
                <h2 className="wr-article-title">{article.title}</h2>
                <p className="wr-article-excerpt">{article.excerpt}</p>
                <div className="wr-article-tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="wr-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="wr-article-arrow" aria-hidden="true">
                →
              </div>
            </article>
          </Link>
        ))}
      </section>

      <style>{`
        /* ─── ROOT ─── */
        .wr-root {
          min-height: 100vh;
          background: #fafafa;
          color: #0a0a0a;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        /* ─── HEADER ─── */
        .wr-header {
          position: relative;
          padding: clamp(7rem, 14vw, 11rem) clamp(1.5rem, 8vw, 8rem) clamp(5rem, 10vw, 9rem);
          border-bottom: 1px solid #e8e8e8;
          background: #ffffff;
        }

        .wr-header-inner {
          max-width: 760px;
        }

        .wr-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #aaa;
          font-weight: 500;
          margin: 0 0 1.5rem;
        }

        .wr-title {
          font-size: clamp(3rem, 9vw, 7rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: #0a0a0a;
          margin: 0 0 2rem;
        }

        .wr-subtitle {
          font-size: clamp(0.9rem, 1.6vw, 1.05rem);
          line-height: 1.75;
          color: #666;
          font-weight: 300;
          max-width: 560px;
          margin: 0;
        }

        .wr-header-rule {
          position: absolute;
          bottom: -1px;
          left: clamp(1.5rem, 8vw, 8rem);
          width: 48px;
          height: 2px;
          background: #0a0a0a;
        }

        /* ─── LIST ─── */
        .wr-list {
          padding: 0 clamp(1.5rem, 8vw, 8rem) clamp(8rem, 15vw, 14rem);
          max-width: 1100px;
        }

        .wr-article-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .wr-article {
          display: grid;
          grid-template-columns: 100px 1fr 40px;
          gap: 2rem;
          align-items: start;
          padding: 2.5rem 0;
          border-bottom: 1px solid #e8e8e8;
          transition: background 0.15s ease;
        }

        .wr-article-link:hover .wr-article {
          background: transparent;
        }

        .wr-article-link:hover .wr-article-title {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .wr-article-link:hover .wr-article-arrow {
          transform: translateX(4px);
        }

        /* Meta column */
        .wr-article-meta {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-top: 0.25rem;
        }

        .wr-article-index {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #ccc;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
        }

        .wr-article-date {
          font-size: 0.75rem;
          color: #999;
          font-weight: 400;
        }

        .wr-article-read {
          font-size: 0.7rem;
          color: #bbb;
        }

        /* Body column */
        .wr-article-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .wr-article-title {
          font-size: clamp(1.1rem, 2.2vw, 1.4rem);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: #0a0a0a;
          margin: 0;
        }

        .wr-article-excerpt {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #666;
          font-weight: 300;
          margin: 0;
          max-width: 600px;
        }

        .wr-article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }

        .wr-tag {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
          border: 1px solid #e0e0e0;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
        }

        /* Arrow */
        .wr-article-arrow {
          font-size: 1.1rem;
          color: #ccc;
          align-self: center;
          transition: transform 0.2s ease, color 0.2s ease;
          padding-top: 0.1rem;
        }

        .wr-article-link:hover .wr-article-arrow {
          color: #0a0a0a;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 640px) {
          .wr-article {
            grid-template-columns: 1fr 30px;
            gap: 1rem;
          }

          .wr-article-meta {
            grid-column: 1 / -1;
            flex-direction: row;
            gap: 1rem;
            align-items: center;
          }

          .wr-article-index {
            display: none;
          }

          .wr-article-body {
            grid-column: 1;
          }

          .wr-article-arrow {
            grid-column: 2;
            grid-row: 2;
            align-self: start;
          }
        }
      `}</style>
    </main>
  )
}
