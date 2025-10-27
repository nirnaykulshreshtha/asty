/**
 * Introducing Section Component
 * -----------------------------
 * Presents the "Introducing Asty" narrative highlighting the education,
 * referral, and facilitation pillars from the deck. Positioned near the top
 * of the homepage to anchor visitors in the community-driven value story.
 */

"use client"

import { memo } from "react"
import { logger } from "@/lib/logger"
import { PARTICIPATION_PILLARS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { AnimatedIntroductionSection } from "./AnimatedIntroductionSection"

function IntroducingSectionComponent() {
  logger.info("component:introducing:render")
  return (
    <section
      id="participation"
      data-section-label="Introducing Asty"
      className="border-b border-border/40 bg-gradient-to-br from-muted/20 via-background to-background px-4 py-20 sm:px-6 lg:px-8"
    >

<div className="mx-auto flex max-w-6xl flex-col gap-16">
    <SectionHeader
            label="Introducing Asty"
            title="Community is the engine. The Vault is the reward"
            description="Every action — from education to referrals to trading tools — grows the Vault. The Vault then rewards holders and network participants fairly and transparently."

          />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* Main Flow Visualization */}
          <div
            className="reveal-section relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 via-background/85 to-card/70 p-10 shadow-2xl backdrop-blur lg:p-12"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,68,255,0.18),_transparent_70%)]" />

            <div className="relative space-y-8">
            <AnimatedIntroductionSection />
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:gap-8">
          {PARTICIPATION_PILLARS.map((pillar, index) => (
            <div
              key={`${pillar.title}-${index}`}
              className="reveal-section flex items-start gap-4 rounded-3xl border-l-4 border-primary/60 bg-background/85 p-5 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-primary/80 hover:shadow-xl"
              data-animate-on-scroll
              data-visible="false"
            >
              <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                <pillar.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}. {pillar.title}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">{pillar.description}</p>
              </div>
            </div>
          ))}
          </aside>
        </div>
      </div>
    </section>
  )
}

export const IntroducingSection = memo(IntroducingSectionComponent)
