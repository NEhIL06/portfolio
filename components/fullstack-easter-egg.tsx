"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Terminal, ArrowUpRight, X, Sparkles } from "lucide-react";

// Modal component placed at root in LayoutShell
export function FullstackEasterEggModal() {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();
  const typedKeys = useRef("");

  // Keyboard shortcut listener ("fs" or "fullstack")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Escape closes modal
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      typedKeys.current += e.key.toLowerCase();
      if (typedKeys.current.length > 15) {
        typedKeys.current = typedKeys.current.slice(-15);
      }

      if (
        typedKeys.current.endsWith("fs") ||
        typedKeys.current.endsWith("fullstack")
      ) {
        setOpen(true);
        typedKeys.current = "";
      }
    };

    const handleCustomTrigger = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-fullstack-easter-egg", handleCustomTrigger);

    // Subtle devtools console message
    console.log(
      "%c[SYS_OVERRIDE] Looking for Nehil's interactive editorial fullstack portfolio? Click the '©' symbol in the footer, click Nehil's avatar, or type 'fs' on your keyboard.",
      "color: #10b981; font-family: monospace; font-size: 11px;"
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        "trigger-fullstack-easter-egg",
        handleCustomTrigger
      );
    };
  }, []);

  // Countdown timer auto-redirect when modal is open
  useEffect(() => {
    if (!open || isPaused) return;

    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/fullstack");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, isPaused, router]);

  const navigateNow = () => {
    setOpen(false);
    router.push("/fullstack");
  };

  const closeEgg = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeEgg}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full max-w-md rounded-2xl bg-[#0c0c0e] border border-emerald-500/40 shadow-2xl shadow-emerald-950/50 p-6 text-zinc-200 font-mono text-xs space-y-4 animate-in zoom-in-95 duration-200"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-wide">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>SYS_OVERRIDE // EASTER_EGG</span>
          </div>
          <button
            type="button"
            onClick={closeEgg}
            className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="space-y-3 text-zinc-300">
          <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
            <span>$</span>
            <span className="text-zinc-300">access --showcase=editorial-fullstack</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
            <p className="text-white font-medium flex items-center gap-2 text-[13px]">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              Editorial Fullstack Portfolio Unlocked
            </p>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              You discovered the secret door to Nehil&apos;s interactive showcase with animated Bento cards, live stats strip, and 3D interactions.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Auto-launching in {countdown}s
            </span>
            <span className="text-zinc-500 text-[10px]">
              (hover to pause)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/60">
          <button
            type="button"
            onClick={closeEgg}
            className="px-3.5 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            Stay on Minimal
          </button>
          <button
            type="button"
            onClick={navigateNow}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <span>Launch Fullstack</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Disguised © Trigger for Footer
export function EasterEggTrigger() {
  const trigger = () => {
    triggerFullstackEasterEgg();
  };

  return (
    <button
      type="button"
      onClick={trigger}
      className="hover:text-emerald-400 text-zinc-500 cursor-pointer transition-colors p-0.5 rounded focus:outline-none select-none inline-flex items-center"
      title="secret: click to reveal alternate mode"
      aria-label="Secret Easter Egg"
    >
      &copy;
    </button>
  );
}

// Interactive Avatar that triggers the Easter Egg when clicked
export function EasterEggAvatar() {
  const trigger = () => {
    triggerFullstackEasterEgg();
  };

  return (
    <button
      type="button"
      onClick={trigger}
      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-zinc-700/80 hover:border-emerald-500/60 shadow-md flex-shrink-0 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 group text-left"
      title="Nehil Chandrakar"
      aria-label="Profile Avatar (Click to unlock Easter Egg)"
    >
      <Image
        src="/myimage1.jpg"
        alt="Nehil Chandrakar"
        fill
        sizes="(max-width: 640px) 64px, 80px"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        priority
      />
    </button>
  );
}

// Backwards-compatible alias for existing imports
export const FullstackEasterEgg = EasterEggTrigger;

// Global dispatcher helper to trigger the easter egg safely
export function triggerFullstackEasterEgg() {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("trigger-fullstack-easter-egg"));
    }, 10);
  }
}
