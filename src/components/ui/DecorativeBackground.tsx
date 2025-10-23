/**
 * DecorativeBackground Component
 * ------------------------------
 * Purpose:
 * - Consolidates repeated radial/linear gradient background stacks used across sections.
 * - Provides consistent, accessible decorative layers without interfering with layout.
 *
 * Notes:
 * - Renders pointer-events-none, absolute, inset-0 container by default.
 * - Variants cover current use-cases: tokenomics, roadmap, sidebar.
 * - Aggressive logging included for render tracing.
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"

export interface DecorativeBackgroundProps {
  variant: "tokenomics" | "roadmap" | "sidebar"
  className?: string
}

export function DecorativeBackground({ variant, className }: DecorativeBackgroundProps) {
  logger.info("component:decorative-background:render", { variant })

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {variant === "tokenomics" && (
        <>
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,68,255,0.35),_transparent_60%)] blur-3xl" />
          <div className="absolute -bottom-40 right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(73,110,255,0.25),_transparent_60%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,transparent_45%,rgba(255,255,255,0.04)_90%)]" />
        </>
      )}
      {variant === "roadmap" && (
        <>
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,68,255,0.25),_transparent_60%)] blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(73,110,255,0.25),_transparent_60%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(255,255,255,0.05)_90%)]" />
        </>
      )}
      {variant === "sidebar" && (
        <>
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,68,255,0.25),_transparent_65%)] blur-3xl" />
          <div className="absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,_rgba(73,110,255,0.2),_transparent_65%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(255,255,255,0.08)_100%)]" />
        </>
      )}
    </div>
  )
}


