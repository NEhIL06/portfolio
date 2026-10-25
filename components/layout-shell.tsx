"use client";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { MinimalDock } from "@/components/minimal-dock";
import { FullstackEasterEggModal } from "@/components/fullstack-easter-egg";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMinimalTheme = pathname === "/" || pathname.startsWith("/blog");

  if (isMinimalTheme) {
    return (
      <MotionConfig reducedMotion="user">
        <a className="skip-link sr-only focus:not-sr-only" href="#main-content">
          Skip to content
        </a>
        <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
          {children}
        </main>
        <MinimalDock />
        <FullstackEasterEggModal />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </MotionConfig>
  );
}
