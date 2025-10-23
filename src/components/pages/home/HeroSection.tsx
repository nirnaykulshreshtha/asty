/**
 * Hero Section Component
 * ---------------------
 * Main hero section featuring rotating themes, call-to-action buttons, and the Asty character.
 * Displays the primary value proposition with animated elements and vault statistics.
 * 
 * Features:
 * - Rotating hero burst messages and visual themes
 * - Primary CTAs for user engagement
 * - Vault statistics display
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
            Earn Forever with Every Transaction
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Community-driven DeFi on BNB Chain. Every ASTY trade funds the Aster Vault and pays Aster rewards yearly to loyal holders.
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
            Meme-first BNB chain
          </span>
          <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
          <span className="rounded-full border border-border/60 px-3 py-1">Vault tax = drip</span>
        </div>
      </div>

      <div
        className="reveal-section relative isolate flex justify-center"
        data-animate-on-scroll
        data-visible="false"
      >
        <div
          className={cn(
            "relative w-full max-w-md overflow-hidden rounded-[2.75rem] border bg-gradient-to-br p-8 shadow-2xl transition",
            heroVariant.borderClass,
            heroVariant.gradientClass
          )}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
            <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.6),_transparent_65%)] blur-3xl" />
          </div>

          <div className="relative space-y-5">
            <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Vault drip</p>
                <p className="mt-2 text-2xl font-bold text-foreground">$2,450,000</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Boost</p>
                <p className="mt-2 text-xl font-bold text-primary">+18.4%</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Referral chaos</p>
              <p className="mt-2 text-base text-foreground">
                10% USDT + 10% ASTY for every friend.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-4 h-[200px] w-[200px]">
            <div className="relative">
              <Mascot />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
