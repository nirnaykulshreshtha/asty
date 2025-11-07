/**
 * Position Importance Section
 * ---------------------------
 * Highlights why securing an early position in the Asty Network matters.
 * Reinforces the lifetime income narrative with supporting bullet points,
 * a simple ladder visual, and a direct registration CTA.
 */

"use client"

import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import { logger } from "@/lib/logger"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TrendingUp, Compass, Coins, Network } from "lucide-react"

const POSITION_POINTS = [
  { icon: TrendingUp, text: "Early = Higher lifetime share of Vault rewards" },
  { icon: Compass, text: "Permanent position — never expires" },
  { icon: Coins, text: "Biweekly + yearly Vault rewards" },
  { icon: Network, text: "Network grows → your income grows" },
]

const POSITION_TREE_LEVELS = [
  { label: "Level 2", nodes: 2, value: "3", highlight: true },
  { label: "Level 3", nodes: 2, value: "4", highlight: true },
  { label: "Levels 4-6", nodes: 3, value: "5" },
  { label: "Levels 7-9", nodes: 4, value: "6-8" },
  { label: "Levels 10-12", nodes: 5, value: "9-12" },
]

function PositionImportanceSectionComponent() {
  logger.info("component:position-importance:render")

  return (
    <section
      id="position"
      data-section-label="Why Your Position Matters"
      className="border-b border-border/40 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
        <div className="space-y-6">
          <SectionHeader
            label="Why Your Position Matters?"
            title="Early Position. Lifetime Advantage."
            description={[
              "Your position in the Asty Network is your permanent share in a 12-level reward structure.",
              "Early positions earn more as the community grows.",
            ]}
            aurora={{
              enableDescription: false, // default; can still enable globally
              perDescription: [
                { enable: false },
                { enable: true, colors: ["#ffcc00", "#ff0080"], speed: 1.2 }
              ]
            }}
          />
          {/* Early positions earn more as the community grows. */}

          <ul className="grid gap-3 sm:grid-cols-2">
            {POSITION_POINTS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-md backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-xl"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary" aria-hidden="true">
                  <Icon className="size-5" />
                </span>
                <p className="text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#membership">Register My Position</Link>
          </Button>
        </div>

        <div
          className="reveal-section relative flex min-h-[520px] flex-col items-center overflow-hidden rounded-[2.75rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-background/90 to-accent/20 p-10 shadow-[0_24px_60px_rgba(20,16,48,0.35)]"
          data-animate-on-scroll
          data-visible="false"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_75%)]" />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[0.6rem] font-semibold uppercase tracking-[0.6em] text-primary/70">
            Reward Share ↑
          </span>
          <div className="relative flex h-full w-full flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-primary shadow-[0_0_45px_rgba(249,115,22,0.45)]">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 via-white/0 to-white/5 blur-sm" />
                <Image
                  src="/images/asty character.png"
                  alt="Asty mascot highlighting the top position"
                  fill
                  priority
                  className="relative z-10 object-contain drop-shadow-[0_12px_18px_rgba(9,6,28,0.45)]"
                />
                {/* <ArrowBigUp className="absolute bottom-4 size-8 text-white/90" aria-hidden="true" /> */}
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              {POSITION_TREE_LEVELS.map((level, levelIndex) => (
                <div key={level.label} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "relative flex items-center justify-center gap-4",
                      level.nodes > 1 &&
                        "before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[70%] before:-translate-x-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:content-['']"
                    )}
                  >
                    {Array.from({ length: level.nodes }).map((_, nodeIndex) => (
                      <div
                        key={`${level.label}-${nodeIndex}`}
                        className={cn(
                          "relative flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-semibold text-white/80 shadow-[0_10px_25px_rgba(9,6,28,0.35)] backdrop-blur",
                          level.highlight && "border-primary/70 bg-primary/30 text-primary-foreground shadow-[0_14px_32px_rgba(249,115,22,0.35)]"
                        )}
                      >
                        {level.value}
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground/90 text-center">
                    {level.label}
                  </p>
                  {levelIndex < POSITION_TREE_LEVELS.length - 1 && (
                    <div className="h-8 w-px bg-gradient-to-b from-white/50 via-white/20 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const PositionImportanceSection = memo(PositionImportanceSectionComponent)
