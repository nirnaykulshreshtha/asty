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
 * - Referral link dialog integration for wallet-connected users
 */

"use client"

import type { MouseEvent as ReactMouseEvent } from "react"
import { memo, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { HERO_CTAS, HERO_VARIANTS, HERO_PILLARS, HERO_BURSTS } from "./types"
import { CTAButton } from "@/components/ui/CTAButton"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import Image from "next/image"
import AstyCharacter from "@/assets/images/asty character.png"
import { MagicCard } from "@/components/ui/magic-card"
import { AuroraText } from "@/components/ui/aurora-text"
import { ReferralLinkDialog } from "./ReferralLinkDialog"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  motionReduced: boolean
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
function HeroSectionComponent({
  motionReduced,
  onAnchorClick,
}: HeroSectionProps) {
  const [heroBurstIndex, setHeroBurstIndex] = useState(0)
  const [referralDialogOpen, setReferralDialogOpen] = useState(false)
  const heroVariant = HERO_VARIANTS[heroBurstIndex % HERO_VARIANTS.length]

  useEffect(() => {
    if (motionReduced) {
      logger.info("component:hero:burst:disable", { reason: "reduced_motion" })
      return
    }

    const interval = window.setInterval(() => {
      setHeroBurstIndex((prev) => (prev + 1) % HERO_BURSTS.length)
    }, 2600)

    logger.info("component:hero:burst:init", { totalBursts: HERO_BURSTS.length })

    return () => {
      window.clearInterval(interval)
    }
  }, [motionReduced])

  useEffect(() => {
    logger.debug?.("component:hero:burst:update", {
      burst: HERO_BURSTS[heroBurstIndex],
      index: heroBurstIndex,
    })
  }, [heroBurstIndex])
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
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Every action adds value. Every member shares the upside. <AuroraText colors={["#f97316", "#FF0000", "#f6339a", "#f97316"]}>Asty lets people build, earn, and own together.</AuroraText>
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {HERO_PILLARS.map((pillar) => (
                <MagicCard key={pillar.title} className="rounded-2xl bg-background/80 p-5 shadow-lg transition hover:shadow-xl" >
                  <div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                      <pillar.icon className="size-4 text-primary" aria-hidden="true" />
                      <span>{pillar.title}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {pillar.description}
                    </p>
                </div>
                </MagicCard>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {HERO_CTAS.map((cta) => {
                // Special handling for "Generate Referral Link" button to open dialog
                if (cta.label === "Generate Referral Link") {
                  return (
                    <Button
                      key={cta.label}
                      variant={cta.variant}
                      size="lg"
                      onClick={() => {
                        logger.info("component:hero:referral-dialog:open")
                        setReferralDialogOpen(true)
                      }}
                      className={cn(
                        "group transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl",
                        cta.tone === "outline" ? "backdrop-blur" : ""
                      )}
                    >
                      <span>{cta.label}</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  )
                }
                
                return (
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
                )
              })}
            </div>
          </div>
        </div>

        {/* Mascot on the right with bounce animation */}
        <div className="hidden lg:flex lg:justify-center">
          <div className="group relative flex size-100 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-primary/20 via-background/80 to-accent/20 shadow-2xl transition-transform duration-500 hover:scale-105 overflow-visible">
            <Image
              src={AstyCharacter}
              alt="Asty mascot"
              className="h-auto w-[160%] object-contain animate-[bounce_2.5s_ease-in-out_infinite] group-hover:[animation-play-state:paused]"
              priority
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0) scale(1.0);
            }
            50% {
              transform: translateY(-12px) scale(1.02);
            }
          }
        `}</style>
      </div>

      {/* Referral Link Dialog */}
      <ReferralLinkDialog 
        open={referralDialogOpen} 
        onOpenChange={setReferralDialogOpen} 
      />
    </section>
  )
}

export const HeroSection = memo(HeroSectionComponent)
