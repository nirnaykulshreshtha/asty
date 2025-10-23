/**
 * Membership Section Component
 * -----------------------
 * Main container for the Early Membership program section. Orchestrates
 * multiple smaller components to display foundational info, benefits,
 * and network advantages. Highlights how positions work ahead of the token presale.
 * 
 * Features:
 * - Composed of smaller, focused components
 * - Early membership foundation overview
 * - Benefits of holding a position
 * - Key advantages of the Asty network
 * - Token presale trigger highlight
 * - Responsive, animated layout
 */

"use client"

import { logger } from "@/lib/logger"
import { MemesSectionHeader } from "./MemesSectionHeader"
import { MembershipFoundationCard } from "./MembershipFoundationCard"
import { MembershipProgressSidebar } from "./MembershipProgressSidebar"

interface MemesSectionProps {
  motionReduced: boolean
}

/**
 * Renders the Early Membership section by composing smaller, focused components.
 * Orchestrates the display of foundation details, benefits, and network advantages.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function MemesSection({ motionReduced }: MemesSectionProps) {
  logger.info("component:memes:render", { motionReduced })

  return (
    <section
      id="membership"
      data-section-label="Early Membership"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <MemesSectionHeader motionReduced={motionReduced} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <MembershipFoundationCard motionReduced={motionReduced} />
        <MembershipProgressSidebar motionReduced={motionReduced} />
      </div>
    </section>
  )
}
