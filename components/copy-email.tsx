"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
export function CopyEmail({
  className = "copy-email",
}: {
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3500);
  }
  return (
    <div className={className}>
      <button onClick={copy} aria-label="Copy email address">
        {status === "copied" ? <Check size={16} /> : <Copy size={16} />}
        <span>{status === "copied" ? "Copied!" : "Copy email"}</span>
      </button>
      <span className="copy-status" role="status">
        {status === "error"
          ? "Couldn’t copy. Use the email link to get in touch."
          : status === "copied"
            ? "Email copied to clipboard."
            : ""}
      </span>
    </div>
  );
}
