/**
 * Buy Section Component
 * --------------------
 * Section explaining how to purchase ASTY tokens with step-by-step instructions
 * and referral program information. Features a detailed buying process and
 * referral bounty details.
 * 
 * Features:
 * - Step-by-step buying instructions
 * - Referral program details with rewards
 * - CTA memes for engagement
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
import { CTA_MEMES } from "./types"

interface BuySectionProps {
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the buy section with purchasing instructions and referral information.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function BuySection({ onAnchorClick }: BuySectionProps) {
  logger.info("component:buy:render")

  return (
    <section
      id="buy"
      data-section-label="Buy ASTY"
      className="grid gap-8 border-b border-border/40 py-20 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div
        className="reveal-section rounded-3xl border border-border/50 bg-card/60 p-8 shadow-2xl"
        data-animate-on-scroll
        data-visible="false"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <span className="rounded-full border border-border/60 px-3 py-1">How to ape calmly</span>
          <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
          <span className="rounded-full border border-border/60 px-3 py-1">3 step meme plan</span>
        </div>
        <h2 className={cn("mt-6 text-3xl text-foreground sm:text-4xl", astroz.className)}>
          Buy ASTY in minutes
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Connect, swap, and vibe. Asty handles the spreadsheets so you can focus on the memes.
        </p>
        <ol className="mt-6 space-y-4 text-sm text-foreground">
          <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
              1
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Connect wallet</h3>
              <p className="text-muted-foreground">MetaMask, Rabby, WalletConnect—pick your meme mobile.</p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
              2
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Swap on Aster DEX</h3>
              <p className="text-muted-foreground">
                Dial in your slippage, smash confirm, and watch the vault counter go brrr.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
              3
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Hold and earn</h3>
              <p className="text-muted-foreground">
                Snapshots log every bag. Sit tight and claim the annual Aster confetti drop.
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
          <h3 className="text-xl font-semibold text-primary">Referral bounty</h3>
          <p className="text-sm text-muted-foreground">
            Share your invite link and collect <strong>10% USDT</strong> + <strong>10% ASTY</strong> from every
            meme recruit.
          </p>
          <div className="grid gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {CTA_MEMES.map((cta) => (
              <div key={cta.title} className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/80 px-4 py-3">
                <div>
                  <p className="text-foreground">{cta.emoji} {cta.title}</p>
                  <p className="text-muted-foreground">{cta.subtitle}</p>
                </div>
                <ArrowRight className="size-4 opacity-60" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
        <Button
          asChild
          size="lg"
          className="justify-between bg-primary text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:bg-primary/90"
        >
          <Link href="#community" onClick={onAnchorClick}>
            Generate your referral link
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </aside>
    </section>
  )
}
