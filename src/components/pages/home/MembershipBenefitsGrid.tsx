/**
 * Membership Benefits Grid Component
 * ---------------------------------
 * Displays the benefits of holding a position and key advantages of the Asty Network.
 * Shows two cards in a responsive grid layout with detailed benefit information.
 * 
 * Features:
 * - Position benefits card with detailed list
 * - Network advantages card with key points
 * - Responsive grid layout
 * - Scroll-based reveal animations
 * - Consistent styling with visual indicators
 */

"use client"

import { logger } from "@/lib/logger"
import { COMMUNITY_INCOME_BENEFITS } from "./types"

interface MembershipBenefitsGridProps {
  motionReduced: boolean
}

/**
 * Renders the benefits grid showing position benefits and network advantages.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function MembershipBenefitsGrid({ motionReduced }: MembershipBenefitsGridProps) {
  logger.info("component:memes:benefits:render", { motionReduced })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {COMMUNITY_INCOME_BENEFITS.map((benefit) => (
        <div
          key={benefit.title}
          className="reveal-section rounded-2xl border border-border/60 bg-card/60 p-6 shadow-lg"
          data-animate-on-scroll
          data-visible="false"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
              <benefit.icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {benefit.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  )
}
