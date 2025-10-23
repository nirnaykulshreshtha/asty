/**
 * Pill Component
 * --------------
 * Purpose:
 * - Reusable small rounded badge used as eyebrow/metadata labels.
 * - Centralizes typography and spacing for consistency.
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"

export interface PillProps {
  children: React.ReactNode
  tone?: "neutral" | "primary" | "muted"
  className?: string
}

export function Pill({ children, tone = "neutral", className }: PillProps) {
  logger.info("component:pill:render", { tone })
  const toneClass =
    tone === "primary"
      ? "border-primary/60 text-primary"
      : tone === "muted"
        ? "border-border/60 text-muted-foreground"
        : "border-border/60 text-foreground"

  return (
    <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]", toneClass, className)}>
      {children}
    </span>
  )
}


