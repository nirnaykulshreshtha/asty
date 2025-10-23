/**
 * How It Works Section Component
 * ------------------------------
 * Explains the core mechanics of the Early Membership system with three key steps.
 * Demonstrates how positions are booked, networks expand, and dividends flow.
 * 
 * Features:
 * - Three-step explanation of the tokenomics
 * - Visual step indicators
 * - Hover animations for engagement
 * - Responsive grid layout
 */

"use client"

import { logger } from "@/lib/logger"
import { HOW_STEPS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ContentCard } from "@/components/ui/ContentCard"

/**
 * Renders the how it works section explaining the token mechanics.
 */
export function HowItWorksSection() {
  logger.info("component:how-it-works:render")

  return (
    <section
      id="how"
      data-section-label="How It Works"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <SectionHeader
        label="Mechanics"
        title="How it works"
        description="Early Membership builds the community engine first. Secure a position, expand your 12-level network, and unlock layered income as dividends and token access go live."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {HOW_STEPS.map((step, index) => (
          <ContentCard
            key={step.title}
            title={step.title}
            description={step.description}
            className="bg-card/60"
            leading={
              <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-base font-semibold text-primary">
                {index + 1}
              </span>
            }
          />
        ))}
      </div>
    </section>
  )
}
