/**
 * Hero Section Component
 * ---------------------
 * Main hero section featuring rotating themes, call-to-action buttons, and the Asty character.
 * Displays the primary value proposition with animated elements and vault statistics.
 * 
 * Features:
 * - Rotating hero burst messages and visual themes
 * - Primary CTAs for booking membership and referrals
 * - Membership progress indicators
 * - Asty character showcase with animations
 * - Responsive design for all screen sizes
 */

"use client"

import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { HERO_CTAS, HERO_VARIANTS } from "./types"
import Mascot from "@/components/motion/Mascot"
import { MembershipProgressSidebar } from "./MembershipProgressSidebar"

interface HeroSectionProps {
  heroBurstIndex: number
  heroVariant: typeof HERO_VARIANTS[0]
  heroBurst: string
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the main hero section with rotating themes and primary CTAs.
 * 
 * @param heroBurstIndex - Current index for rotating burst messages
 * @param heroVariant - Current visual theme variant
 * @param heroBurst - Current burst message text
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function HeroSection({ 
  heroBurstIndex, 
  heroVariant, 
  heroBurst, 
  onAnchorClick 
}: HeroSectionProps) {
  logger.info("component:hero:render", { 
    heroBurstIndex, 
    variant: heroVariant.id, 
    burst: heroBurst 
  })

  return (
    <section
      id="hero"
      data-section-label="Hero"
      className="relative grid gap-16 border-b border-border/40 py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-32"
    >
      <div className="flex flex-col justify-center gap-10">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] shadow-md transition",
                heroVariant.bubbleClass
              )}
            >
              <span className="rounded-full border border-current/40 bg-background/80 px-2 py-1 text-[0.55rem] tracking-[0.45em]">
                Live
              </span>
              <span className="tracking-tight normal-case">{heroBurst}</span>
            </span>
          </div>
          <h1
            data-animate-hero
            className={cn(
              "text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl",
              astroz.className
            )}
          >
            Community Powered Wealth Engine
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Integrating the power of the Aster ecosystem, a 12-level referral network, and dividend streams. Build once — earn for life.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {HERO_CTAS.map((cta) => (
            <Button
              key={cta.label}
              asChild
              variant={cta.variant}
              size="lg"
              className={cn(
                "group transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl",
                cta.tone === "outline" ? "backdrop-blur" : ""
              )}
            >
              <Link href={cta.href} onClick={onAnchorClick}>
                {cta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <span className="rounded-full border border-border/60 px-3 py-1">
            Aster ecosystem aligned
          </span>
          <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
          <span className="rounded-full border border-border/60 px-3 py-1">Permanent membership income</span>
        </div>
      </div>

      <MembershipProgressSidebar motionReduced={true} />
    </section>
  )
}
