import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getAllArticles } from "@/lib/articles";
import { FullstackEasterEgg, EasterEggAvatar } from "@/components/fullstack-easter-egg";

export const metadata: Metadata = {
  title: "Nehil Chandrakar | Systems & AI Engineer",
  description:
    "Minimalist portfolio of Nehil Chandrakar. Distributed systems, AI infrastructure, and high-concurrency backends in Go, Python, and TypeScript.",
};

export default function MinimalPage() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-zinc-700 selection:text-white pb-32">
      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 space-y-14 sm:space-y-16">
        {/* Header / Intro Section */}
        <section id="top" className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                  hey, it&apos;s nehil
                </h1>
                
              </div>
              <p className="text-sm font-mono text-zinc-400">
                nehil chandrakar &bull; go / python / typescript &bull; systems & ai infra
              </p>
            </div>

            {/* Profile Avatar with Easter Egg click trigger */}
            <EasterEggAvatar />
          </div>

          {/* Quick Bio Tagline */}
          <div className="text-[15px] sm:text-base leading-relaxed text-zinc-300 space-y-3 font-sans">
            <p>
              i&apos;m an engineer specializing in <strong className="text-white font-medium">distributed systems</strong> and{" "}
              <strong className="text-white font-medium">AI infrastructure</strong>. currently completing my B.E. in CS (AI/ML) at Siddaganga Institute of Technology and building core systems at Alcovia.
            </p>
            <p className="text-zinc-400">
              systems and high-throughput backend is what i specialize in. on the side, i design agentic RAG engines, low-latency microservices, and cross-encoder vector search pipelines.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
            about
          </h2>
          <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-zinc-300">
            <p>
              <span className="text-zinc-500 font-mono">tldr;</span> love building low-latency backends, writing Go/Python, and scolding AI agents into deterministic behaviors.
            </p>
            <p>
              i break prod, fix it under pressure, and get paid to optimize it down to sub-millisecond latencies.
            </p>
            <p>
              production raised me: architected Alcovia&apos;s core ecosystem (3 React Native apps, 2 Next.js apps, WebSocket service, 120+ PostgreSQL models, and 400+ API endpoints), scaling daily traffic to 2,000+ visitors with sub-second page loads.
            </p>
            <p>
              built <strong className="text-white">ZenFit</strong>: high-concurrency Go API gateway handling 3,819 req/s at 0.95MB RAM, coupled with an Agentic Self-RAG Redis VSS semantic cache delivering 3.16ms P50 TTFT.
            </p>
            <p>
              occasionally write{" "}
              <Link
                href="/blog"
                className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors"
              >
                technical essays
              </Link>
              , conduct workshops for 350+ students at SARK, and compete in hackathons (Mercuria 2nd Prize, Emerging Tech 3rd Place).
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              learnt a lot working at
            </h2>
            <span className="text-xs font-mono text-zinc-500">experience</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-3 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center font-bold text-white text-sm">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-base">Alcovia</h3>
                      <a
                        href="https://alcovia.life/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                        title="Visit alcovia.life"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono">
                      software engineer intern | fullstack & systems
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono text-zinc-400">
                    jan 2026 – jun 2026
                  </span>
                  <p className="text-[11px] text-zinc-500">Gurugram, IN</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed pl-3 border-l border-zinc-800 ml-5">
                <li>
                  &bull; <strong className="text-zinc-100">Scaled flagship web platform (alcovia.life):</strong> Redesigned and launched end-to-end with a custom design system and responsive UI, scaling daily traffic from 4–5 to 1,500–2,000+ visitors with sub-second page loads.
                </li>
                <li>
                  &bull; <strong className="text-zinc-100">Product ecosystem from scratch:</strong> Spearheaded engineering across 3 React Native mobile apps, 2 Next.js web applications, and a WebSocket service backed by a 120+ model PostgreSQL schema and 400+ API endpoints.
                </li>
                <li>
                  &bull; <strong className="text-zinc-100">Transactional outbox pipeline:</strong> Architected PostgreSQL advisory locking, 5-stage exponential backoff, and a 6-hour reconciler, eliminating race conditions and ensuring zero data loss across 23 synchronized ClickUp entity types.
                </li>
                <li>
                  &bull; <strong className="text-zinc-100">Asynchronous Gemini AI pipeline:</strong> Built an async extraction pipeline for session notes and study plans, decoupling LLM workflows from HTTP request paths to eliminate 100% of user-facing timeouts under production load.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              projects
            </h2>
            <Link
              href="/projects"
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>see all</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="space-y-7">
            {/* Project 1: ZenFit */}
            <div className="space-y-2 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">
                    ZenFit
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">{"//"}</span>
                  <span className="text-zinc-300 text-sm font-medium">
                    Distributed MultiModal AI Coach
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex flex-wrap gap-1.5">
                  <span className="text-emerald-400/90">go</span> &bull;
                  <span>python</span> &bull;
                  <span>redis vss</span> &bull;
                  <span>rabbitmq</span> &bull;
                  <span>docker</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                A high-throughput distributed AI coaching system. Features a Go API Gateway handling <strong>3,819 req/s</strong> (P50: 7.54ms) at 0.95MB RAM, and a Go audio engine streaming at <strong>2,918 req/s</strong> with zero-alloc sync.Pool buffers. Agentic Self-RAG engine delivering <strong>3.16ms P50 TTFT</strong> via Redis VSS HNSW caching (D &le; 0.08) with Dense + BM25 RRF (k=60). In-process CPU-native FlashRank ONNX cross-encoder (&lt;1ms latency) with calibrated confidence gating (&tau; &ge; 0.65). Dual-stream HTTP/2 SSE outputs, RabbitMQ workers at 318.4 req/s with Redis idempotency, and asymmetric RS256 JWKS authentication.
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                <a
                  href="https://github.com/NEhIL06/zenfit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>source</span>
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://zenletics.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>live demo</span>
                </a>
              </div>
            </div>

            {/* Project 2: Alcovia Core */}
            <div className="space-y-2 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">
                    Alcovia Core
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">{"//"}</span>
                  <span className="text-zinc-300 text-sm font-medium">
                    HealthTech Ecosystem & Sync Engine
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex flex-wrap gap-1.5">
                  <span>react native</span> &bull;
                  <span>next.js</span> &bull;
                  <span>postgresql</span> &bull;
                  <span>websockets</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Flagship digital ecosystem scaled from zero to 2,000+ daily visitors. Built with a 120+ model PostgreSQL schema, 400+ API endpoints, transactional outbox pipeline with PostgreSQL advisory locking across 23 ClickUp entities, and asynchronous Gemini extraction pipeline decoupling LLM workflows from HTTP request paths to eliminate 100% of user timeouts.
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                <a
                  href="https://alcovia.life/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>alcovia.life</span>
                </a>
              </div>
            </div>

            {/* Project 3: Krishi Baazar */}
            <div className="space-y-2 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">
                    Krishi Baazar
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">{"//"}</span>
                  <span className="text-zinc-300 text-sm font-medium">
                    Decentralized Agri Marketplace
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex flex-wrap gap-1.5">
                  <span>react native</span> &bull;
                  <span>node.js</span> &bull;
                  <span>redis</span> &bull;
                  <span>appwrite</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Direct-to-consumer agricultural commerce mobile application connecting small farmers with direct buyers. Integrates real-time weather forecasts, APMC mandi commodity rates, Appwrite authentication/storage, and Redis-cached REST APIs cutting query latency by 60%.
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                <a
                  href="https://github.com/NEhIL06/Krishi_Bazaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>source</span>
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://landingpage-kb.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>demo</span>
                </a>
              </div>
            </div>

            {/* Project 4: SkyScope */}
            <div className="space-y-2 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">
                    SkyScope
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">{"//"}</span>
                  <span className="text-zinc-300 text-sm font-medium">
                    2D Virtual Office Collaboration Backend
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex flex-wrap gap-1.5">
                  <span>turborepo</span> &bull;
                  <span>websockets</span> &bull;
                  <span>webrtc</span> &bull;
                  <span>mongodb</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                High-performance backend for a real-time 2D virtual office enabling proximity-based P2P audio chat, spatial avatar presence, multi-room state synchronisation, and low-latency WebSockets with Dockerized orchestration.
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                <a
                  href="https://github.com/NEhIL06/metaverse_2d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>source</span>
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://metaverse-frontend-6gjy.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>demo</span>
                </a>
              </div>
            </div>

            {/* Project 5: ScribeAI */}
            <div className="space-y-2 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">
                    ScribeAI
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">{"//"}</span>
                  <span className="text-zinc-300 text-sm font-medium">
                    Real-Time Speech & Meeting Intelligence
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex flex-wrap gap-1.5">
                  <span>gemini ai</span> &bull;
                  <span>websockets</span> &bull;
                  <span>next.js</span> &bull;
                  <span>postgresql</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Live speech-to-text meeting transcription with sub-200ms latency via Google Gemini. Dual-audio capture from microphone or tab/screen, automated action-item synthesis, and real-time WebSocket state streaming.
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                <a
                  href="https://github.com/NEhIL06/ScribeAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>source</span>
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://scribe-ai-ws.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>demo</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills & Tool Familiarity */}
        <section id="skills" className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              technical skills & tool familiarity
            </h2>
            <span className="text-xs font-mono text-zinc-500">stack</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-zinc-400 block text-[11px] font-semibold uppercase tracking-wider">
                Languages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {siteConfig.skills.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/50"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-zinc-400 block text-[11px] font-semibold uppercase tracking-wider">
                Backend & Systems
              </span>
              <div className="flex flex-wrap gap-1.5">
                {siteConfig.skills.frameworks.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/50"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-zinc-400 block text-[11px] font-semibold uppercase tracking-wider">
                AI Systems & Vector Search
              </span>
              <div className="flex flex-wrap gap-1.5">
                {siteConfig.skills.aiSystems?.map((ai) => (
                  <span
                    key={ai}
                    className="px-2 py-0.5 rounded bg-zinc-800/80 text-emerald-300 border border-emerald-500/20"
                  >
                    {ai}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <span className="text-zinc-400 block text-[11px] font-semibold uppercase tracking-wider">
                CS Fundamentals
              </span>
              <div className="flex flex-wrap gap-1.5">
                {siteConfig.skills.fundamentals.map((fund) => (
                  <span
                    key={fund}
                    className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                  >
                    {fund}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section id="achievements" className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              achievements & hackathons
            </h2>
            <span className="text-xs font-mono text-zinc-500">awards</span>
          </div>

          <div className="space-y-3">
            {siteConfig.achievements.map((item) => (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-zinc-800/40 text-xs sm:text-sm gap-1"
              >
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    {item.subtitle}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500 flex-shrink-0">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              education
            </h2>
            <span className="text-xs font-mono text-zinc-500">uni</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 text-xs sm:text-sm gap-1">
            <div>
              <h3 className="font-semibold text-white">
                {siteConfig.education.institute}
              </h3>
              <p className="text-zinc-400">
                {siteConfig.education.degree}
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                {siteConfig.education.location}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {siteConfig.education.graduation}
            </span>
          </div>
        </section>

        {/* Writing / Deep Dives */}
        <section id="writing" className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              writing & deep-dives
            </h2>
            <Link
              href="/blog"
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>all essays</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>{article.date}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Clean Contact & Footer without intrusive banners */}
        <footer className="pt-8 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 font-mono gap-3">
            <div className="flex items-center gap-1">
              <span>nehil chandrakar</span>
              <FullstackEasterEgg />
              <span>{new Date().getFullYear()} &bull; 9131203322</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-zinc-300 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <span>&bull;</span>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                github
              </a>
              <span>&bull;</span>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                linkedin
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
