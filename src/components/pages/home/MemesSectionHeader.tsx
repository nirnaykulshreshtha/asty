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

import { logger } from "@/lib/logger"
import { SectionHeader } from "@/components/ui/SectionHeader"

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
    <SectionHeader
      as="span"
      label="The Missing Layer"
      title="Asty Turns Participation into Real Rewards with {domain}"
      description=""
      tokens={{
        domain: ["DeFi", "PeopleFi"],
      }}
      aurora={{ domainToken: true, colors: ["#f97316", "#FF0000", "#f6339a", "#f97316"] }}
    />
  )
}
