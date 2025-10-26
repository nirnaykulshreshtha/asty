/**
 * Introducing Section Component
 * -----------------------------
 * Presents the "Introducing Asty" narrative highlighting the education,
 * referral, and facilitation pillars from the deck. Positioned near the top
 * of the homepage to anchor visitors in the community-driven value story.
 */

"use client"

import { CheckCircle2 } from "lucide-react"

import { logger } from "@/lib/logger"
import { PARTICIPATION_PILLARS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"

export function IntroducingSection() {
  logger.info("component:introducing:render")

  const introductionHighlights = [
    "Education unlocks adoption with guided pathways for new DEX users.",
    "Referral mechanics reward community builders long before token launch.",
    "Facilitator tools keep network activity flowing directly into the Vault.",
  ]

  return (
    <section
      id="participation"
      data-section-label="Introducing Asty"
      className="border-b border-border/40 bg-gradient-to-br from-muted/20 via-background to-background px-4 py-20 sm:px-6 lg:px-8"
    >

<div className="mx-auto flex max-w-6xl flex-col gap-16">
    <SectionHeader
            label="Introducing Asty"
            title="The community-driven DeFi layer for DEX adoption"
            description="Every learning module, referral, and facilitator tool feeds value into the Vault so holders capture real, transparent income."

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
              <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl space-y-3">
                  <p className="text-sm text-muted-foreground">
                  Asty focuses on the community layer first. We onboard, reward, and equip members so the Vault spins up with a ready network the moment token and DeFi phases unlock.
                  </p>
                </div>
              </header>
              <ul className="space-y-3 text-sm text-foreground">
              {introductionHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/70 p-3">
                  <span className="mt-0.5 text-primary">
                    <CheckCircle2 className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:gap-8">
          {PARTICIPATION_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
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

      {/* <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start">
        <div className="space-y-8 lg:w-[56%]">
          <SectionHeader
            label="Introducing Asty"
            title="The community-driven DeFi layer for DEX adoption"
            description="Every learning module, referral, and facilitator tool feeds value into the Vault so holders capture real, transparent income."
            className="space-y-6"
          />

          <div className="reveal-section space-y-4 rounded-3xl border border-border/50 bg-background/80 p-8 shadow-xl" data-animate-on-scroll data-visible="false">
            <p className="text-sm text-muted-foreground">
              Asty focuses on the community layer first. We onboard, reward, and equip members so the Vault spins up with a ready network the moment token and DeFi phases unlock.
            </p>
            <ul className="space-y-3 text-sm text-foreground">
              {introductionHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/70 p-3">
                  <span className="mt-0.5 text-primary">
                    <CheckCircle2 className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 lg:w-[44%]">
          {PARTICIPATION_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
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
        </div>
      </div> */}
    </section>
  )
}
