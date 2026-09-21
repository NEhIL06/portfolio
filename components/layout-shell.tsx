"use client";
import { MotionConfig } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
export function LayoutShell({ children }: { children: React.ReactNode }) {
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
