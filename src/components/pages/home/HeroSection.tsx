/**
 * Hero Section Component
 * ----------------------
 * Simplified hero section introducing the Asty community layer and its three core pillars.
 * Focuses on the primary value proposition with streamlined layout and conversion paths.
 * 
 * Features:
 * - Rotating hero burst messages and visual themes
 * - Primary CTAs for joining the network or exploring the Vault model
 * - Hero pillars (Education, Referral, Facilitation)
 * - Ambient background glow for visual depth
 * - Responsive design for all screen sizes
 */

"use client"

import type { MouseEvent as ReactMouseEvent } from "react"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { HERO_CTAS, HERO_VARIANTS, HERO_PILLARS } from "./types"
import { CTAButton } from "@/components/ui/CTAButton"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import Image from "next/image"
import AstyCharacter from "@/assets/images/asty character.png"

interface HeroSectionProps {
  heroBurstIndex: number
  heroVariant: typeof HERO_VARIANTS[0]
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
  onAnchorClick,
}: HeroSectionProps) {
  logger.info("component:hero:render", { 
    heroBurstIndex, 
    variant: heroVariant.id, 
  })

  return (
    <section
      id="hero"
      data-section-label="Hero"
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-background via-background/95 to-background/80 py-24"
    >
      <DecorativeBackground variant="hero" className="-z-10 opacity-70" />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-5">
            <h1
              data-animate-hero
              className={cn(
                "text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl",
                astroz.className
              )}
            >
              Your LifeTime Passive Income Engine
              {/* Turn Your Community Power Into Lifetime Income */}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Asty lets people build, earn, and own together.
            Every action adds value. Every member shares the upside.
              {/* Asty combines education, referrals, and facilitator tooling to channel every community action into a shared Vault. Hold a position, build the network, and earn transparent income for life. */}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {HERO_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-lg transition hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                    <pillar.icon className="size-4 text-primary" aria-hidden="true" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {HERO_CTAS.map((cta) => (
              <CTAButton
                key={cta.label}
                href={cta.href}
                label={cta.label}
                onClick={onAnchorClick}
                variant={cta.variant}
                size="lg"
                className={cn(
                  "group transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl",
                  cta.tone === "outline" ? "backdrop-blur" : ""
                )}
              />
            ))}
          </div>
        </div>

        {/* Mascot on the right with bounce animation */}
        <div className="hidden lg:flex lg:justify-center">
          <div className="group relative flex size-100 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-primary/20 via-background/80 to-accent/20 p-6 shadow-2xl transition-transform duration-500 hover:scale-105">
            <Image
              src={AstyCharacter}
              alt="Asty mascot"
              className="h-auto w-full object-contain animate-[bounce_2.5s_ease-in-out_infinite] group-hover:[animation-play-state:paused]"
              priority
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-12px) scale(1.02);
            }
          }
        `}</style>
      </div>
    </section>
  )
}
