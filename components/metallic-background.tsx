"use client"

import Image from "next/image"

export function MetallicBackground({
  noiseSrc = "",
}: {
  noiseSrc?: string
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -20%, rgba(160,160,160,0.18), transparent 50%), radial-gradient(800px 400px at 70% 0%, rgba(255,255,255,0.08), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #0c0c0c 40%, #0a0a0a 100%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 mix-blend-soft-light opacity-[0.06]">
        <Image
          src={noiseSrc || "/placeholder.svg"}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(1200px_500px_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.35)_100%)]" />
    </>
  )
}
