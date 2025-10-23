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

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { HOW_STEPS } from "./types"

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
      <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Mechanics
        </p>
        <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
          How it works
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground">
          Early Membership builds the community engine first. Secure a position, expand your 12-level network, and
          unlock layered income as dividends and token access go live.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {HOW_STEPS.map((step, index) => (
          <article
            key={step.title}
            className="reveal-section flex flex-col gap-4 rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg transition hover:border-primary/40 hover:-translate-y-1"
            data-animate-on-scroll
            data-visible="false"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-base font-semibold text-primary">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
