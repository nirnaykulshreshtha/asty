/**
 * Memes Section Header Component
 * -----------------------------
 * Displays the header section for the Early Membership area including
 * the section label, main title, and descriptive text.
 * 
 * Features:
 * - Section label with proper styling
 * - Main title with custom font
 * - Descriptive paragraph with responsive text
 * - Scroll-based reveal animation
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"

interface MemesSectionHeaderProps {
  motionReduced: boolean
}

/**
 * Renders the header section for the Early Membership area.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function MemesSectionHeader({ motionReduced }: MemesSectionHeaderProps) {
  logger.info("component:memes:header:render", { motionReduced })

  return (
    <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Early Opportunity
      </p>
      <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
        Book Early Membership
      </h2>
      <p className="max-w-3xl text-base text-muted-foreground">
        We&apos;re currently onboarding members only—no token purchase required. Secure a $100 lifetime position,
        build your 12-level network, and be first in line when the token presale unlocks at 10,000 memberships.
      </p>
    </div>
  )
}
