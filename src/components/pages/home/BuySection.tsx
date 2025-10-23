/**
 * Membership CTA Section Component
 * --------------------
 * Guides users through booking an Early Membership and highlights the key
 * actions they can take before the token presale opens.
 * 
 * Features:
 * - Step-by-step membership booking flow
 * - Membership highlights and presale trigger reminders
 * - Referral link call-to-action
 * - Responsive grid layout
 */

"use client"

import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { MEMBERSHIP_HIGHLIGHTS } from "./types"
import { CTAButton } from "@/components/ui/CTAButton"
import { Pill } from "@/components/ui/Pill"
import { MEMBERSHIP_PITCH_SHORT, MEMBERSHIP_ONBOARDING_LABEL, NO_TOKEN_SALE_YET } from "./constants"

interface BuySectionProps {
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the membership call-to-action with booking steps and referral information.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function BuySection({ onAnchorClick }: BuySectionProps) {
  logger.info("component:buy:render")

  return (
    <section
      id="buy"
      data-section-label="Book Membership"
      className="grid gap-8 border-b border-border/40 py-20 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div
        className="reveal-section rounded-3xl border border-border/50 bg-card/60 p-8 shadow-2xl"
        data-animate-on-scroll
        data-visible="false"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <Pill tone="muted">{MEMBERSHIP_ONBOARDING_LABEL}</Pill>
          <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
          <Pill tone="muted">{NO_TOKEN_SALE_YET}</Pill>
        </div>
        <h2 className={cn("mt-6 text-3xl text-foreground sm:text-4xl", astroz.className)}>
          Book your Early Membership
        </h2>
        <p className="mt-4 text-base text-muted-foreground">{MEMBERSHIP_PITCH_SHORT}</p>
        <ol className="mt-6 space-y-4 text-sm text-foreground">
          <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
              1
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Reserve your spot</h3>
              <p className="text-muted-foreground">Submit the $100 entry fee to lock in a permanent Asty position.</p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
              2
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Activate foundation access</h3>
              <p className="text-muted-foreground">
                Membership unlocks referral tools, rank tracking, and dividend eligibility instantly.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
              3
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Share your referral link</h3>
              <p className="text-muted-foreground">
                Build your 12-level network to amplify referral income and future dividend share.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <aside
        className="reveal-section flex flex-col justify-between gap-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8"
        data-animate-on-scroll
        data-visible="false"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Why move now</h3>
          <p className="text-sm text-muted-foreground">
            Early memberships are the only way in today. Secure the foundation, then ride every presale round and
            dividend cycle that follows.
          </p>
          <div className="grid gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {MEMBERSHIP_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/80 px-4 py-3">
                <div>
                  <p className="text-foreground">{item.emoji} {item.title}</p>
                  <p className="text-muted-foreground">{item.subtitle}</p>
                </div>
                <span className="size-4 opacity-60" aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
        <CTAButton
          href="#community"
          label="Generate your referral link"
          onClick={onAnchorClick}
          variant="default"
          size="lg"
          className="justify-between bg-primary text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:bg-primary/90"
        />
      </aside>
    </section>
  )
}
