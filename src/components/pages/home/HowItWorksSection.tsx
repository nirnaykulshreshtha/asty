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
import { HOW_STEPS, POSITION_ADVANTAGES } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"
import { Pill } from "@/components/ui/Pill"
import { ChevronFlowDiagram } from "@/components/ui/ChevronFlowDiagram"
import { cn } from "@/lib/utils"

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
        label="Early Positioning"
        title="Early Position = Lifetime Advantage."
        description="Asty's isn't just about joining a network — it's about locking your position in an ecosystem that pays forever."
      />

      <ChevronFlowDiagram
        steps={HOW_STEPS}
        className="mt-4"
      />

      <div className="grid gap-8">
        <aside
          className="reveal-section flex flex-col gap-6 rounded-3xl border border-border/50 bg-background/80 p-8 shadow-xl"
          data-animate-on-scroll
          data-visible="false"
        >
          <div className="space-y-3">
            <Pill tone="muted" className="border-border/60">
              Why position matters
            </Pill>
          </div>
          <ul className="space-x-4 grid grid-cols-2 gap-4">
            {POSITION_ADVANTAGES.map((advantage) => (
              <li
                key={advantage.title}
                className="flex gap-3 rounded-2xl border border-border/40 bg-card/70 p-4 shadow-md transition duration-200 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="mt-1 flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                  <advantage.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{advantage.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{advantage.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
            &ldquo;A single early position can create a lifetime income stream.&rdquo;
          </p>
        </aside>
      </div>
    </section>
  )
}
