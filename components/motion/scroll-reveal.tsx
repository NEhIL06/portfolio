"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  yOffset = 18,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window))
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.animate(
              [
                { opacity: 0, transform: "translateY(" + yOffset + "px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: "cubic-bezier(.22,1,.36,1)",
              },
            );
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        element.getAnimations().forEach((animation) => animation.cancel());
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      element.getAnimations().forEach((animation) => animation.cancel());
    };
  }, [delay, duration, yOffset]);
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
