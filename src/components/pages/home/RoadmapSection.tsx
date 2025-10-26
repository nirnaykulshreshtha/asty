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

import { logger } from "@/lib/logger"
import { ROADMAP_PHASES } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { RoadmapPhaseCard } from "./RoadmapPhaseCard"

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
      <SectionHeader
        label="Roadmap"
        title="Building the Asty Layer — Step by Step."
        description="Asty's roadmap is focused on real ecosystem growth — from community network creation to DeFi infrastructure and utility tools."
      />

      <div
        className="reveal-section relative overflow-hidden rounded-[3rem] border border-border/60 bg-card/60 p-8 shadow-2xl md:p-12"
        data-animate-on-scroll
        data-visible="false"
      >
        <DecorativeBackground variant="roadmap" className="opacity-80" />

        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute inset-y-0 left-4 hidden w-px bg-gradient-to-b from-primary/40 via-border/40 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-4 hidden w-px bg-gradient-to-b from-transparent via-border/40 to-primary/40 md:block" />

          <ol className="relative grid gap-8 md:grid-cols-2">
            {ROADMAP_PHASES.map((item, index) => (
              <RoadmapPhaseCard key={item.phase} item={item} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
