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
        The Missing Layer
      </p>
      <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
        Asty Turns DeFi Participation into Real Rewards
      </h2>
      <p className="max-w-3xl text-base text-muted-foreground">
        Today, DEX adoption faces one big barrier: onboarding and rewarding the community fairly. Asty solves this by combining education, referrals, and facilitator tools – and channels that value into a shared Vault for its holders.
      </p>
    </div>
  )
}
