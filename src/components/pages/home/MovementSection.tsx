/**
 * Movement Section Component
 * --------------------------
 * Emphasizes the movement aspect of Asty - "This isn't just another token. It's a movement."
 * Highlights scarcity, vault-based income, and early entry advantage. Based on client slide 8.
 * 
 * Features:
 * - Movement messaging with gradient text effects
 * - Four key value propositions with icons
 * - Scarcity and community capture messaging
 * - CTA buttons for joining network and buying tokens
 * - Responsive layout with visual emphasis
 * - Scroll-based reveal animations
 * - Aggressive logging for debugging
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { MOMENTUM_STATS } from "./types"
import { ContentCard } from "@/components/ui/ContentCard"
import { CTAButton } from "@/components/ui/CTAButton"
import { MOVEMENT_SECTION_INTRO } from "./constants"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { AuroraText } from "@/components/ui/aurora-text"

interface MovementSectionProps {
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the movement section emphasizing Asty as more than just a token.
 * Highlights scarcity, vault-based income, and early entry advantages.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function MovementSection({ onAnchorClick }: MovementSectionProps) {
  logger.info("component:movement:render")

  return (
    <section
      id="movement"
      data-section-label="Movement"
      className="relative space-y-12 overflow-hidden border-b border-border/40 px-4 py-20"
    >
      <DecorativeBackground variant="movement" className="-z-10 opacity-80" />
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Main Movement Message */}
        <div className="text-center space-y-6" data-parallax="true" data-parallax-depth="0.35">
          <h2 className={cn("text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl", astroz.className)}>
            This isn&apos;t just another{" "}
            <span className="text-foreground">token.</span>{" "}
            <AuroraText colors={["#f97316", "#FF0000", "#f6339a", "#f97316"]}>It&apos;s a movement.</AuroraText>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Asty&apos;s limited supply and community-first design create real scarcity and lasting value. 
            Early positions don&apos;t just hold tokens — they own a piece of the Vault economy.
          </p>
        </div>

        {/* Key Value Propositions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-parallax="true" data-parallax-depth="0.15">
          {MOMENTUM_STATS.map((stat) => (
            <ContentCard
              key={stat.title}
              title={stat.title}
              description={stat.detail}
              className="bg-card/60"
              leading={
                <div className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                  <stat.icon className="size-6" aria-hidden="true" />
                </div>
              }
            />
          ))}
        </div>

        {/* Scarcity Message */}
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground">
            {MOVEMENT_SECTION_INTRO}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton
            href="#membership"
            label="Join Asty Network"
            onClick={onAnchorClick}
            variant="default"
            size="lg"
          />
          <CTAButton
            href="#tokenomics"
            label="Buy Token"
            onClick={onAnchorClick}
            variant="outline"
            size="lg"
          />
        </div>

        {/* Early Position Reminder */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Early Network Positions Remaining: 1,472
          </p>
        </div>
      </div>
    </section>
  )
}
