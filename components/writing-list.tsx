import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllArticles } from "@/lib/articles";
export function WritingList({ limit }: { limit?: number }) {
  const articles = getAllArticles();
  return (
    <div className="writing-list">
      {(limit ? articles.slice(0, limit) : articles).map((article, i) => (
        <Link
          className="writing-row"
          key={article.slug}
          href={"/writing/" + article.slug}
        >
          <div className="writing-meta">
            <span className="eyebrow">
              0{i + 1} / {article.date}
            </span>
            <span>{article.readingTime}</span>
          </div>
          <div>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <div className="writing-tags">
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <ArrowUpRight className="writing-arrow" size={24} />
        </Link>
      ))}
    </div>
  );
}
