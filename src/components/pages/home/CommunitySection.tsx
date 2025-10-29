/**
 * Community Section Component
 * ---------------------------
 * Displays community links and engagement opportunities.
 * Features cards for Telegram, whitepaper, and other community resources.
 * 
 * Features:
 * - Community resource cards
 * - External and internal link handling
 * - Hover animations
 * - Responsive grid layout
 */

"use client"

import type { MouseEvent as ReactMouseEvent } from "react"
import { memo } from "react"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { COMMUNITY_CARDS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"

interface CommunitySectionProps {
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the community section with resource links and engagement opportunities.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
function CommunitySectionComponent({ onAnchorClick }: CommunitySectionProps) {
  logger.info("component:community:render")

  return (
    <section
      id="community"
      data-section-label="Community"
      className="space-y-4 border-b border-border/40 py-12 sm:py-16 lg:py-20"
    >
      <SectionHeader
        label="Stay Connected"
        title="Join the community"
        description="Coordinate with builders, ambassadors, and liquidity partners to shape the next era of the Aster Vault."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {COMMUNITY_CARDS.map((card) => (
          <article
            key={card.title}
            className="reveal-section flex flex-col justify-between gap-5 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-background to-accent/15 p-6 shadow-xl"
            data-animate-on-scroll
            data-visible="false"
          >
            <div>
              <h3 className={cn("text-2xl text-foreground", astroz.className)}>{card.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{card.description}</p>
            </div>
            <CTAButton
              href={card.href}
              label={card.external ? "Open" : "Secure your position"}
              onClick={card.href.startsWith("#") ? onAnchorClick : undefined}
              variant="outline"
              size="lg"
              className="justify-between border-border/60 bg-background/70 text-foreground transition hover:-translate-y-0.5 hover:border-primary/60"
              external={!card.href.startsWith("#")}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export const CommunitySection = memo(CommunitySectionComponent)
