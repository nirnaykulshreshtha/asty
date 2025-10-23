/**
 * Memes Section Component
 * -----------------------
 * Showcases the Asty mascot in various meme reactions with community goals.
 * Features animated meme cards with the Asty character in different poses.
 * 
 * Features:
 * - Mascot meme cards with different reactions
 * - Animated character images with hover effects
 * - Community goals display
 * - Responsive grid layout
 * - Background gradient effects
 */

"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import AstyCharacter from "@/assets/images/asty character.png"
import { MASCOT_MEMES, CORE_GOALS } from "./types"

interface MemesSectionProps {
  motionReduced: boolean
}

/**
 * Renders the memes section showcasing Asty reactions and community goals.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function MemesSection({ motionReduced }: MemesSectionProps) {
  logger.info("component:memes:render", { motionReduced })

  return (
    <section
      id="memes"
      data-section-label="Meme Vault"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Meme Evidence
        </p>
        <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
          Asty reaction vault
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground">
          Screenshotted straight from the community group chat. Each card captures a moment the meme mascot
          lost its chill.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {MASCOT_MEMES.map((meme) => (
          <article
            key={meme.id}
            className={cn(
              "reveal-section relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 shadow-2xl transition hover:-translate-y-1",
              meme.background
            )}
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="absolute -left-10 -top-10 size-32 rounded-full bg-background/40 blur-3xl" aria-hidden="true" />
            <header className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {meme.badge}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                #{meme.id}
              </span>
            </header>
            <p className="mt-4 text-lg font-semibold text-foreground">{meme.caption}</p>
            <p className="mt-2 text-sm text-muted-foreground">{meme.reaction}</p>

            <div className="mt-6 flex items-end justify-center">
              <Image
                src={AstyCharacter}
                alt="Asty the meme monster reaction"
                className={cn(
                  "h-auto w-40 object-contain transition-all duration-500 ease-out",
                  meme.transform,
                  motionReduced ? "" : "hover:scale-[1.07]"
                )}
              />
            </div>
          </article>
        ))}
      </div>

      <aside
        className="reveal-section grid gap-4 rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg md:grid-cols-3"
        data-animate-on-scroll
        data-visible="false"
      >
        {CORE_GOALS.map((goal) => (
          <div key={goal.title} className="space-y-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
              {goal.title}
            </p>
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          </div>
        ))}
      </aside>
    </section>
  )
}
