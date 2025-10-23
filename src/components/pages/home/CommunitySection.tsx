/**
 * Community Section Component
 * ---------------------------
 * Displays community links and engagement opportunities.
 * Features cards for Telegram, whitepaper, and other community resources.
 * 
 * Features:
 * - Community resource cards
 * - External and internal link handling
 * - Hover animations
 * - Responsive grid layout
 */

"use client"

import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { COMMUNITY_CARDS } from "./types"

interface CommunitySectionProps {
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the community section with resource links and engagement opportunities.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function CommunitySection({ onAnchorClick }: CommunitySectionProps) {
  logger.info("component:community:render")

  return (
    <section
      id="community"
      data-section-label="Community"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Stay Connected
        </p>
        <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
          Join the community
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground">
          Coordinate with builders, ambassadors, and liquidity partners to shape the next era of the Aster Vault.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {COMMUNITY_CARDS.map((card) => (
          <article
            key={card.title}
            className="reveal-section flex flex-col justify-between gap-5 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-background to-accent/15 p-6 shadow-xl"
            data-animate-on-scroll
            data-visible="false"
          >
            <div>
              <h3 className={cn("text-2xl text-foreground", astroz.className)}>{card.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{card.description}</p>
            </div>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="justify-between border-border/60 bg-background/70 text-foreground transition hover:-translate-y-0.5 hover:border-primary/60"
            >
              {card.href.startsWith("#") ? (
                <Link href={card.href} onClick={onAnchorClick}>
                  <span>{card.external ? "Open" : "Explore"}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <Link href={card.href} target="_blank" rel="noopener noreferrer">
                  <span>{card.external ? "Open" : "Explore"}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}
