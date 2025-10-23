/**
 * Tokenomics Section Component
 * ----------------------------
 * Comprehensive tokenomics display including distribution table, summary cards,
 * and key metrics. Features animated backgrounds and interactive elements.
 * 
 * Features:
 * - Token distribution table with progress indicators
 * - Summary cards outlining supply and presale triggers
 * - Feature cards explaining the network-first rollout
 * - Animated background effects
 * - Membership callouts and presale reminders
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { 
  TOKENOMICS_ROWS, 
  TOKENOMICS_CARDS, 
  TOKENOMICS_SUMMARY 
} from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ContentCard } from "@/components/ui/ContentCard"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { TEN_K_TRIGGER_TEXT } from "./constants"

/**
 * Renders the tokenomics section with distribution data and key metrics.
 */
export function TokenomicsSection() {
  logger.info("component:tokenomics:render")

  return (
    <section
      id="tokenomics"
      data-section-label="Tokenomics"
      className="relative space-y-12 overflow-hidden border-b border-border/40 px-4 py-20"
    >
      <DecorativeBackground variant="tokenomics" className="-z-10 opacity-70" />

      <SectionHeader
        label="The Numbers"
        title="Token distribution"
        description="Membership-first launch ensures tokens arrive with a ready community. Track the presale layout and the milestone that unlocks it."
      />

      <div
        className="reveal-section relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl sm:p-10"
        data-animate-on-scroll
        data-visible="false"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,68,255,0.18),_transparent_60%)]" />
        <div className="relative grid gap-6 md:grid-cols-3">
          {TOKENOMICS_SUMMARY.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="reveal-section overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-2xl"
        data-animate-on-scroll
        data-visible="false"
      >
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Asty token sale allocation table</caption>
          <thead className="bg-background/70 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              <th scope="col" className="px-6 py-4"></th>
              <th scope="col" className="px-6 py-4">Type</th>
              <th scope="col" className="px-6 py-4">Amount</th>
              <th scope="col" className="px-6 py-4">Rate</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {TOKENOMICS_ROWS.map((row, index) => (
              <tr
                key={row.type}
                className={cn(
                  "group relative overflow-hidden border-t border-border/40 transition hover:bg-background/80",
                  index % 2 === 0 ? "bg-background/30" : "bg-background/20"
                )}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 hidden rounded-e-full bg-primary/15 transition-all duration-500 group-hover:bg-primary/25 md:block"
                  style={{ width: `${row.percent}%` }}
                />
                <th scope="row" className="px-6 py-5 font-semibold text-foreground">
                  {row.type}
                  <span className="mt-1 block text-xs font-medium uppercase tracking-[0.3em] text-primary/70">
                    {row.percent}% allocation
                  </span>
                </th>
                <td className="px-6 py-5 align-top text-muted-foreground">
                  <div className="rounded-2xl border border-border/40 bg-background/75 px-4 py-3 text-sm">
                    {row.amount}
                  </div>
                </td>
                <td className="px-6 py-5 align-top text-muted-foreground">
                  <div className="rounded-2xl border border-border/40 bg-background/75 px-4 py-3 text-sm">
                    {row.rate}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TOKENOMICS_CARDS.map((card) => (
          <ContentCard key={card.title} title={card.title} description={card.body} />
        ))}
      </div>

      <div
        className="reveal-section rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/15 via-background to-accent/15 p-6 text-sm text-foreground shadow-xl"
        data-animate-on-scroll
        data-visible="false"
      >
        <p className="font-semibold">
          Early memberships only: <span className="text-primary">$100</span> secures a lifetime position ahead of presale.
        </p>
        <p className="mt-2 text-muted-foreground">{TEN_K_TRIGGER_TEXT}</p>
      </div>
    </section>
  )
}
