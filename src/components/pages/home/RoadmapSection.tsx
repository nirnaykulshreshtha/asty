/**
 * Roadmap Section Component
 * -------------------------
 * Displays the project roadmap with phases, progress indicators, and status badges.
 * Features animated progress bars and hover effects for each phase.
 * 
 * Features:
 * - Four-phase roadmap with status indicators
 * - Animated progress bars
 * - Hover effects with glow animations
 * - Status badges (Complete, In Flight, Queued)
 * - Responsive grid layout
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { ROADMAP_PHASES, ROADMAP_STATUS_META } from "./types"

/**
 * Renders the roadmap section with project phases and progress indicators.
 */
export function RoadmapSection() {
  logger.info("component:roadmap:render")

  return (
    <section
      id="roadmap"
      data-section-label="Roadmap"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Forward Motion
        </p>
        <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
          Roadmap
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground">
          Shipping in transparent phases to expand the Vault flywheel and cross-chain reach.
        </p>
      </div>

      <div
        className="reveal-section relative overflow-hidden rounded-[3rem] border border-border/60 bg-card/60 p-8 shadow-2xl md:p-12"
        data-animate-on-scroll
        data-visible="false"
      >
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,68,255,0.25),_transparent_60%)] blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(73,110,255,0.25),_transparent_60%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(255,255,255,0.05)_90%)]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute inset-y-0 left-4 hidden w-px bg-gradient-to-b from-primary/40 via-border/40 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-4 hidden w-px bg-gradient-to-b from-transparent via-border/40 to-primary/40 md:block" />

          <ol className="relative grid gap-8 md:grid-cols-2">
            {ROADMAP_PHASES.map((item, index) => {
              const meta = ROADMAP_STATUS_META[item.status]

              return (
                <li
                  key={item.phase}
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
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]",
                        meta.badgeClass
                      )}
                    >
                      {meta.label}
                    </span>
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
                        ? "Milestone shipped and audited."
                        : item.status === "active"
                          ? "Engineering in progress with weekly updates."
                          : "Awaiting governance vote and ecosystem readiness."}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
