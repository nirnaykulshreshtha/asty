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
import { HERO_CTAS, HERO_VARIANTS, HERO_BURSTS, HERO_VALUE_PROPS } from "./types"
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

  const heroBurst = HERO_BURSTS[heroBurstIndex % HERO_BURSTS.length]

  return (
    <section
      id="hero"
      data-section-label="Hero"
      className="relative overflow-hidden border-b border-border/40 bg-[#07030f] py-24"
    >
      <DecorativeBackground variant="hero" className="-z-10 opacity-40" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center">
        <article
          className="reveal-section relative overflow-hidden rounded-[3.5rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(27,11,60,0.92)_0%,rgba(19,8,44,0.9)_65%,rgba(12,6,30,0.88)_100%)] p-14 shadow-[0_45px_140px_rgba(80,35,140,0.35)]"
          data-animate-on-scroll
          data-visible="false"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10 opacity-70" aria-hidden="true" />
          <div className="relative space-y-12">
            <div className="flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/60">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 shadow-inner">
                Founder Access Round
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/15 px-4 py-1 text-primary-foreground">
                Dividends Drop for Life
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.35fr)] lg:items-start">
              <h1
                data-animate-hero
                className={cn(
                  "text-4xl uppercase leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl",
                  astroz.className
                )}
              >
                Be an early holder. Earn from the future of DeFi.
              </h1>
              <div className="hidden h-full rounded-[2rem] border border-primary/20 bg-black/30 p-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary lg:flex lg:flex-col lg:items-center lg:justify-center">
                {heroBurst}
              </div>
            </div>

            <p className="max-w-2xl text-base text-zinc-300 sm:text-lg">
              Limited supply. Real income. Transparent rewards. Secure a founding position in the Asty ecosystem before the Vault goes live for everyone else.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {HERO_CTAS.map((cta) => (
                <CTAButton
                  key={cta.label}
                  href={cta.href}
                  label={cta.label}
                  onClick={onAnchorClick}
                  variant={cta.variant}
                  size="lg"
                  className={cn(
                    "group min-w-[12rem] justify-between text-sm font-semibold uppercase tracking-[0.25em] transition-transform duration-200 hover:-translate-y-0.5",
                    cta.tone === "primary"
                      ? "bg-gradient-to-r from-[#ffb347] via-[#ff5f9e] to-[#8c5bff] text-black"
                      : "",
                    cta.tone === "secondary"
                      ? "border border-white/15 bg-white/5 text-white hover:border-white/30"
                      : "",
                    cta.tone === "outline"
                      ? "border border-white/25 bg-transparent text-white/80 hover:border-white/40"
                      : ""
                  )}
                />
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {HERO_VALUE_PROPS.map((value) => (
                <div
                  key={value.title}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition duration-200 hover:border-primary/50 hover:shadow-[0_25px_60px_rgba(127,90,240,0.45)]"
                >
                  <span className="mt-1 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/70 via-primary/40 to-primary/10 text-black shadow-inner">
                    <value.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">{value.title}</p>
                    <p className="text-xs text-zinc-300 sm:text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-6 py-4 text-sm text-primary/80">
              <span className="uppercase tracking-[0.25em]">Early Network Positions Remaining</span>
              <span className="text-lg font-bold text-primary/70">1,472</span>
            </div>
          </div>
        </article>

        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
          <div className="absolute -inset-24 hidden rounded-full bg-[radial-gradient(circle,_rgba(127,90,240,0.35)_0%,_transparent_70%)] blur-3xl lg:block" aria-hidden="true" />
          <div className="relative flex size-[21rem] items-center justify-center rounded-full border border-primary/30 bg-[radial-gradient(circle_at_center,_rgba(18,9,34,0.95)_0%,_rgba(11,6,24,0.92)_70%,_rgba(6,4,18,0.88)_100%)] shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
            <Image
              src={AstyCharacter}
              alt="Asty mascot"
              className="h-auto w-[78%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] animate-[bounce_3s_ease-in-out_infinite]"
              priority
            />
            <div className={cn(
              "absolute -bottom-6 right-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary/80 shadow-[0_16px_28px_rgba(127,90,240,0.35)] backdrop-blur",
              heroVariant.stickerClass
            )}
            >
              Vault Ready
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
      `}</style>
    </section>
  )
}
