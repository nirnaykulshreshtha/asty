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
import { ROADMAP_STEPS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { RoadmapStepCard } from "./RoadmapPhaseCard"

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
        <DecorativeBackground variant="roadmap" className="opacity-70" />

        <div className="relative">
          <span className="pointer-events-none absolute left-12 right-12 top-[3.75rem] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
          <ol className="relative flex gap-6 overflow-x-auto pb-6 pr-4 lg:gap-10 lg:overflow-visible lg:pb-0 lg:pr-0">
            {ROADMAP_STEPS.map((step, index) => (
              <RoadmapStepCard key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
