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
      {/* Position Benefits Card */}
      <article
        className="reveal-section rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg"
        data-animate-on-scroll
        data-visible="false"
      >
        <h3 className="text-xl font-semibold text-foreground">Benefits of holding a position</h3>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          {POSITION_BENEFITS.map((item) => (
            <li key={item.title} className="flex gap-3 rounded-2xl border border-border/40 bg-background/80 p-4">
              <span className="mt-1 size-2 rounded-full bg-primary" aria-hidden="true" />
              <div>
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>

      {/* Network Advantages Card */}
      <article
        className="reveal-section rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg"
        data-animate-on-scroll
        data-visible="false"
      >
        <h3 className="text-xl font-semibold text-foreground">Key advantages of Asty Network</h3>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          {NETWORK_ADVANTAGES.map((item) => (
            <li key={item.title} className="flex gap-3 rounded-2xl border border-border/40 bg-background/80 p-4">
              <span className="mt-1 size-2 rounded-full bg-primary" aria-hidden="true" />
              <div>
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
