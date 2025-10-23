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
import { POSITION_BENEFITS, NETWORK_ADVANTAGES } from "./types"
import { BulletedListCard } from "@/components/ui/BulletedListCard"

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
    <div className="grid gap-6 md:grid-cols-2">
      <BulletedListCard
        heading="Benefits of holding a position"
        items={POSITION_BENEFITS}
        getKey={(item) => item.title}
        getTitle={(item) => item.title}
        getDescription={(item) => item.description}
      />

      <BulletedListCard
        heading="Key advantages of Asty Network"
        items={NETWORK_ADVANTAGES}
        getKey={(item) => item.title}
        getTitle={(item) => item.title}
        getDescription={(item) => item.description}
      />
    </div>
  )
}
