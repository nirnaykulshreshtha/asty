/**
 * Transparency Section Component
 * ------------------------------
 * Displays the four pillars of transparency that build trust in the Asty ecosystem.
 * Covers on-chain vault, audited contracts, open reward logic, and DAO governance.
 * Based on client slide 10 "Trust isn't promised. It's built."
 * 
 * Features:
 * - Four transparency pillars with icons and descriptions
 * - CTA buttons for vault dashboard and audit reports
 * - Responsive grid layout
 * - Scroll-based reveal animations
 * - Aggressive logging for debugging
 */

"use client"

import { logger } from "@/lib/logger"
import { TRANSPARENCY_PILLARS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ContentCard } from "@/components/ui/ContentCard"
import { CTAButton } from "@/components/ui/CTAButton"
import { TRANSPARENCY_SECTION_INTRO } from "./constants"

interface TransparencySectionProps {
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the transparency section showcasing the four pillars of trust building.
 * Includes on-chain vault, audited contracts, open reward logic, and DAO governance.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function TransparencySection({ onAnchorClick }: TransparencySectionProps) {
  logger.info("component:transparency:render")

  return (
    <section
      id="trust"
      data-section-label="Trust & Transparency"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <SectionHeader
        label="Trust Building"
        title="Trust isn't promised. It's built."
        description={TRANSPARENCY_SECTION_INTRO}
      />

      {/* Transparency Pillars */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TRANSPARENCY_PILLARS.map((pillar) => (
          <ContentCard
            key={pillar.title}
            title={pillar.title}
            description={pillar.description}
            className="bg-card/60"
            leading={
              <div className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                <pillar.icon className="size-6" aria-hidden="true" />
              </div>
            }
          />
        ))}
      </div>

      {/* Concluding Statement */}
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          See the data. Verify the rewards. Trust the process.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-4">
        {TRANSPARENCY_PILLARS.filter(pillar => pillar.ctaLabel && pillar.ctaHref).map((pillar) => (
          <CTAButton
            key={pillar.title}
            href={pillar.ctaHref!}
            label={pillar.ctaLabel!}
            onClick={pillar.ctaHref!.startsWith("#") ? onAnchorClick : undefined}
            variant="outline"
            size="lg"
            external={!pillar.ctaHref!.startsWith("#")}
          />
        ))}
      </div>
    </section>
  )
}
