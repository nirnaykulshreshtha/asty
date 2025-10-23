/**
 * Membership Progress Sidebar Component
 * ------------------------------------
 * Displays the membership progress statistics, facts, and the Asty mascot.
 * Shows current membership count, presale trigger, and key information.
 * 
 * Features:
 * - Progress statistics with visual emphasis
 * - Membership facts and details
 * - Presale trigger information
 * - Interactive Asty mascot with hover effects
 * - Gradient background with decorative elements
 * - Scroll-based reveal animation
 */

"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import AstyCharacter from "@/assets/images/asty character.png"
import {
  MEMBERSHIP_PROGRESS,
  MEMBERSHIP_FACTS,
} from "./types"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"

interface MembershipProgressSidebarProps {
  motionReduced: boolean
}

/**
 * Renders the progress sidebar showing membership statistics and the Asty mascot.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function MembershipProgressSidebar({ motionReduced }: MembershipProgressSidebarProps) {
  logger.info("component:memes:progress:render", { motionReduced })

  return (
    <aside
      className="reveal-section relative overflow-hidden rounded-[2.75rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20 p-6 shadow-[0_24px_60px_rgba(20,16,48,0.35)] sm:p-8"
      data-animate-on-scroll
      data-visible="false"
    >
      {/* Decorative background elements */}
      <DecorativeBackground variant="sidebar" className="opacity-70" />

      <div className="relative flex h-full flex-col">
        {/* Progress statistics */}
        <div className="grid gap-4 sm:grid-cols-2">
          {MEMBERSHIP_PROGRESS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left shadow-[0_10px_25px_rgba(12,8,32,0.25)] backdrop-blur"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {item.label}
              </p>
              <p
                className={cn(
                  "mt-3 text-2xl font-bold text-foreground sm:text-3xl",
                  item.accent ? "text-primary" : ""
                )}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Membership facts */}
        <div className="mt-6 space-y-4">
          {MEMBERSHIP_FACTS.map((fact) => (
            <div
              key={fact.title}
              className="rounded-2xl border border-white/8 bg-background/70 px-5 py-4 text-sm text-muted-foreground shadow-[0_18px_35px_rgba(15,10,32,0.35)] backdrop-blur"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-primary/80">
                {fact.title}
              </p>
              <p className="mt-2 text-sm text-foreground/90">{fact.description}</p>
            </div>
          ))}
        </div>

        {/* Presale trigger information */}
        <div className="mt-6 space-y-2 text-xs text-muted-foreground">
          <p className="font-semibold uppercase tracking-[0.35em] text-foreground/80">
            10,000 memberships unlock the presale.
          </p>
          <p>
            Until then we&apos;re focused on community creation—the DeFi protocol stays a mystery until launch day.
          </p>
        </div>

        {/* Asty mascot */}
        <div className="mt-auto flex justify-center pt-8">
          <div
            className={cn(
              "relative flex size-28 items-center justify-center rounded-full border border-white/10 bg-background/80 p-3 shadow-[0_12px_28px_rgba(12,8,32,0.4)]",
              motionReduced ? "" : "transition-transform duration-500 hover:scale-[1.05]"
            )}
          >
            <Image
              src={AstyCharacter}
              alt="Asty mascot waving hello"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
