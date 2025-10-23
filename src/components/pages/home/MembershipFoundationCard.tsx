/**
 * Membership Foundation Card Component
 * -----------------------------------
 * Displays the foundation details for the Asty Network creation process.
 * Shows the core principles and steps involved in the membership program.
 * 
 * Features:
 * - Foundation overview with visual elements
 * - Numbered list of core goals
 * - Decorative background elements
 * - Scroll-based reveal animation
 */

"use client"

import { logger } from "@/lib/logger"
import { MEMBERSHIP_FOUNDATION } from "./types"

interface MembershipFoundationCardProps {
  motionReduced: boolean
}

/**
 * Renders the foundation card showing the core principles of Asty Network creation.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function MembershipFoundationCard({ motionReduced }: MembershipFoundationCardProps) {
  logger.info("component:memes:foundation:render", { motionReduced })

  return (
    <article
      className="reveal-section relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 shadow-2xl"
      data-animate-on-scroll
      data-visible="false"
    >
      <div className="absolute -left-16 -top-12 size-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      
      <header className="flex flex-wrap items-center justify-between gap-4">
        <span className="rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Asty Network Creation
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Foundation
        </span>
      </header>
      
      <h3 className="mt-6 text-2xl font-semibold text-foreground">
        Everything starts with membership
      </h3>
      
      <p className="mt-3 text-sm text-muted-foreground">
        Book a position once and unlock lifetime eligibility across dividends, referrals, and the upcoming DeFi rollout.
      </p>
      
      <ul className="mt-6 space-y-4 text-sm text-foreground">
        {MEMBERSHIP_FOUNDATION.map((item, index) => (
          <li key={item.title} className="flex gap-4 rounded-2xl border border-border/40 bg-background/80 p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-base font-semibold text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}
