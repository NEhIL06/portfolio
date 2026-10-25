"use client";

import Link from "next/link";
import { Home, BookOpen, Mail, Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useState } from "react";

export function MinimalDock() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const dockItems = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: <Home className="w-4 h-4" />,
      external: false,
    },
    {
      id: "blog",
      label: "Writing & Blog",
      href: "/blog",
      icon: <BookOpen className="w-4 h-4" />,
      external: false,
    },
    {
      id: "github",
      label: "GitHub",
      href: siteConfig.socials.github,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: siteConfig.socials.linkedin,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      external: true,
    },
    {
      id: "x",
      label: "X (Twitter)",
      href: siteConfig.socials.x,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      external: true,
    },
    {
      id: "mail",
      label: "Email",
      href: `mailto:${siteConfig.contact.email}`,
      icon: <Mail className="w-4 h-4" />,
      external: true,
    },
    {
      id: "resume",
      label: "Résumé PDF",
      href: "/resume",
      icon: <Download className="w-4 h-4" />,
      external: true,
    }
  ];

  return (
    <nav
      aria-label="Floating dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 px-3 py-2 bg-[#121215]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/90 transition-all hover:border-white/20"
    >
      {dockItems.map((item) => {
        const content = (
          <div
            className="relative p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            onMouseEnter={() => setActiveTooltip(item.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {item.icon}

            {/* Tooltip */}
            {activeTooltip === item.id && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-mono tracking-tight bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-100">
                {item.label}
              </span>
            )}
          </div>
        );

        if (item.external) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              {content}
            </a>
          );
        }

        // if (item.onClick) {
        //   return (
        //     <button
        //       key={item.id}
        //       onClick={item.onClick}
        //       aria-label={item.label}
        //       className="cursor-pointer"
        //     >
        //       {content}
        //     </button>
        //   );
        // }

        return (
          <Link key={item.id} href={item.href} aria-label={item.label}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
