/**
 * Tokenomics Section Component
 * ----------------------------
 * Reframes the token narrative around community income with highlight callouts,
 * summary metrics, an interactive supply visualization, and detailed
 * distribution breakdowns that mirror the latest deck copy.
 *
 * Features:
 * - Vault-first messaging that explains the fixed supply story
 * - Summary stat cards for supply mechanics and deflationary design
 * - Interactive pie chart showing allocation share of the 21M supply
 * - Distribution list with progress indicators for quick scanning
 */

"use client"

import { memo } from "react"
import { Pie, PieChart, Cell } from "recharts"
import { logger } from "@/lib/logger"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { SectionHeader } from "@/components/ui/SectionHeader"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ContentCard } from "@/components/ui/ContentCard"
import { Progress } from "@/components/ui/progress"
import {
  TOKENOMICS_CARDS,
  TOKENOMICS_HIGHLIGHTS,
  TOKENOMICS_ROWS,
  TOKENOMICS_SUMMARY,
} from "./types"

const TOKENOMICS_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
] as const

const TOKENOMICS_BREAKDOWN = TOKENOMICS_ROWS.map((row, index) => {
  const numericValue = Number(row.amount.replace(/[^0-9.]/g, ""))

  return {
    ...row,
    numericValue,
    color: TOKENOMICS_COLORS[index % TOKENOMICS_COLORS.length],
  }
})

const TOTAL_SUPPLY_TOKENS = TOKENOMICS_BREAKDOWN.reduce(
  (total, slice) => total + slice.numericValue,
  0
)

const TOKENOMICS_DISTRIBUTION = TOKENOMICS_BREAKDOWN.map((slice) => ({
  ...slice,
  share:
    slice.percent ??
    Math.round((slice.numericValue / TOTAL_SUPPLY_TOKENS) * 100),
}))

const TOKENOMICS_CHART_CONFIG = TOKENOMICS_DISTRIBUTION.reduce(
  (config, slice) => {
    config[slice.type] = {
      label: slice.type,
      color: slice.color,
    }
    return config
  },
  {} as Record<string, { label: string; color: string }>
) satisfies ChartConfig

/**
 * Renders the tokenomics section with distribution data, highlight cards, and
 * an interactive supply visualization aligned with the slide narrative.
 */
function TokenomicsSectionComponent() {
  logger.info("component:tokenomics:render")

  const totalSupplyLabel = TOTAL_SUPPLY_TOKENS.toLocaleString()

  return (
    <section
      id="tokenomics"
      data-section-label="Tokenomics"
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background/95 to-background/80 px-4 py-24 sm:px-6 lg:px-8"
    >
      <DecorativeBackground variant="tokenomics" className="-z-10 opacity-70" />

      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <SectionHeader
          label="Token Designed for Community Income"
          title="Fixed supply. Vault-first distribution."
          description="21 million ASTY is locked at genesis. The Vault routes emissions toward the people building the network — founders, early members, and the community that keeps activity flowing."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            <div
              className="reveal-section space-y-6 rounded-3xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur"
              data-animate-on-scroll
              data-visible="false"
            >
              <header className="space-y-3">
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Community-first economics
                </span>
                <h3 className="text-2xl font-semibold text-foreground">
                  Built to reward participation long after launch
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every tranche reinforces the Vault flywheel. Holders don&apos;t rely on hype —
                  they capture real income as Asty tools, referrals, and education programs scale.
                </p>
              </header>

              <ul className="space-y-4">
                {TOKENOMICS_HIGHLIGHTS.map((highlight) => (
                  <li
                    key={highlight.title}
                    className="flex gap-4 rounded-2xl border border-border/40 bg-background/70 p-4 shadow"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
                      <highlight.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {highlight.title}
                      </p>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div
            className="reveal-section relative flex flex-col gap-6 rounded-3xl border border-border/50 bg-gradient-to-br from-card/85 via-background/90 to-card/70 p-8 text-center shadow-2xl backdrop-blur"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Supply visualization
              </p>
              <p className="text-sm text-muted-foreground">
                Hover each slice to inspect how every allocation maps to the fixed 21M supply.
              </p>
            </div>

            <ChartContainer
              config={TOKENOMICS_CHART_CONFIG}
              className="relative mx-auto aspect-square w-full max-w-[360px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={{ fill: "transparent" }}
                  content={<ChartTooltipContent hideIndicator />}
                />
                <Pie
                  data={TOKENOMICS_DISTRIBUTION}
                  dataKey="numericValue"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="82%"
                  cornerRadius={38}
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {TOKENOMICS_DISTRIBUTION.map((slice) => (
                    <Cell key={slice.type} fill={slice.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export const TokenomicsSection = memo(TokenomicsSectionComponent)
