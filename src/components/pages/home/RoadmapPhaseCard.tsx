/**
 * RoadmapPhaseCard Component
 * --------------------------
 * Purpose:
 * - Reusable card for a single roadmap phase with status, progress, and details.
 * - Extracted from RoadmapSection to remove duplication and simplify maintenance.
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { Pill } from "@/components/ui/Pill"
import { ROADMAP_STATUS_META, type RoadmapPhase } from "./types"

export interface RoadmapPhaseCardProps {
  item: RoadmapPhase
  index: number
}

/**
 * Renders a roadmap phase card with status badge, description, and progress bar.
 */
export function RoadmapPhaseCard({ item, index }: RoadmapPhaseCardProps) {
  const meta = ROADMAP_STATUS_META[item.status]
  logger.info("component:roadmap-phase-card:render", { phase: item.phase, status: item.status })

  return (
    <li
      className="group relative rounded-3xl border border-border/40 bg-background/70 p-6 shadow-lg transition hover:border-primary/50 hover:shadow-xl"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          meta.glowClass,
          "to-transparent"
        )}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className={cn("text-sm font-semibold uppercase tracking-[0.3em]", astroz.className)}>
          {item.phase}
        </span>
        <Pill className={cn(meta.badgeClass)}>{meta.label}</Pill>
      </div>

      <p className="relative mt-3 text-sm text-muted-foreground">{item.detail}</p>

      <div className="relative mt-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <span>{item.quarter}</span>
          <span>{item.progress}%</span>
        </div>
        <div className="h-2 rounded-full border border-border/60 bg-background/60 p-0.5">
          <div
            className={cn("h-full rounded-full transition-all duration-700", meta.progressClass)}
            style={{ width: `${item.progress}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-border/50 bg-background/80 font-semibold text-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="flex-1">
          {item.status === "complete"
            ? "Phase delivered and community onboarded."
            : item.status === "active"
              ? "Membership onboarding and tooling rolling out."
              : "Launch steps queued once the 10k trigger is met."}
        </p>
      </div>
    </li>
  )
}


