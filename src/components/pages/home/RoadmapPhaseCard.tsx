/**
 * RoadmapPhaseCard Component
 * --------------------------
 * Purpose:
 * - Reusable card for a single roadmap phase with status, progress, and details.
 * - Extracted from RoadmapSection to remove duplication and simplify maintenance.
 */

"use client"

import { logger } from "@/lib/logger"
import { cn } from "@/lib/utils"
import { type RoadmapStep } from "./types"

export interface RoadmapStepCardProps {
  step: RoadmapStep
  index: number
}

/**
 * Roadmap step displayed in a horizontal timeline with icon node and info card.
 */
export function RoadmapStepCard({ step, index }: RoadmapStepCardProps) {
  const isActive = step.status === "in-progress"
  logger.info("component:roadmap-step-card:render", { step: step.title, status: step.status })

  return (
    <li className="relative flex min-w-[240px] flex-col items-center gap-6 pt-6 text-center lg:min-w-0">
      <span
        className={cn(
          "flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-[0_18px_50px_rgba(127,90,240,0.35)] transition duration-300",
          isActive ? "scale-110 bg-primary/20 text-primary-foreground" : ""
        )}
      >
        <step.icon className="size-6" aria-hidden="true" />
      </span>

      <div
        className={cn(
          "w-full rounded-[2rem] border p-6 text-left shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl",
          isActive
            ? "border-primary/40 bg-gradient-to-br from-primary/20 via-background/85 to-card/70"
            : "border-border/60 bg-card/70"
        )}
      >
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          <span>Step {String(index + 1).padStart(2, "0")}</span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[0.65rem] tracking-[0.25em]",
              isActive ? "bg-primary/20 text-primary" : "bg-border/20 text-muted-foreground"
            )}
          >
            {isActive ? "" : ""}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
        {step.footnote && (
          <p className="mt-3 rounded-2xl border border-border/40 bg-background/70 p-3 text-xs text-muted-foreground">
            {step.footnote}
          </p>
        )}
      </div>
    </li>
  )
}
