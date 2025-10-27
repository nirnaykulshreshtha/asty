/**
 * Tokenomics Section Component
 * ----------------------------
 * Presents the "A token designed for real community income" narrative with
 * highlight cards, vault distribution explainer, and a hero donut visual for
 * total supply. Mirrors the latest deck copy and tightens the CTA flow.
 * 
 * Includes an interactive chart visualization showing token distribution
 * across presale rounds and remaining supply.
 */

"use client"

import { logger } from "@/lib/logger"
import {
  TOKENOMICS_HIGHLIGHTS,
  VAULT_DISTRIBUTION_POINTS,
} from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { CTAButton } from "@/components/ui/CTAButton"
import { TEN_K_TRIGGER_TEXT } from "./constants"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, Label } from "recharts"

/**
 * Token Distribution Data
 * Represents the breakdown of 21M max supply across presale rounds
 * Palette ties into the global chart variables for on-brand theming.
 */
const TOKENOMICS_DATA = [
  { name: "Presale Round 1", value: 1000000, color: "var(--chart-3)" }, // 10L tokens
  { name: "Presale Round 2", value: 1000000, color: "var(--chart-4)" }, // 10L tokens
  { name: "Presale Round 3", value: 500000, color: "var(--muted)" }, // 5L tokens
  { name: "Remaining Supply", value: 18500000, color: "var(--chart-1)" }, // 185L tokens
]

/**
 * Chart configuration for tokenomics visualization
 */
const chartConfig = {
  tokens: {
    label: "Tokens",
  },
} satisfies ChartConfig

/**
 * Renders the tokenomics section with distribution data and key metrics.
 * Includes an interactive pie chart showing token allocation breakdown.
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
        label="Tokenomics"
        title="A token designed for real community income."
        description="Asty is built on a hyper-deflationary model with a fixed supply of 21 million tokens. Every transaction strengthens the Vault — every holder shares the reward."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <div
            className="reveal-section space-y-4 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl"
            data-animate-on-scroll
            data-visible="false"
          >
            {/* <h3 className="text-lg font-semibold text-foreground">Key Tokenomics Highlights</h3> */}
            <ul className="space-y-0 grid grid-cols-2 gap-4">
              {[...TOKENOMICS_HIGHLIGHTS, ...VAULT_DISTRIBUTION_POINTS].map((highlight) => (
                <li
                  key={highlight.title}
                  className="flex gap-4 rounded-2xl border border-border/40 bg-background/80 p-4 transition duration-200 hover:border-primary/50 hover:shadow-xl flex justify-start items-center"
                >
                  <span className="mt-1 flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                    <highlight.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{highlight.title}</p>
                    {/* <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{highlight.description}</p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-8">
          <div
            className="reveal-section relative overflow-hidden rounded-3xl border border-border/50 bg-card/70 p-8 shadow-2xl"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,68,255,0.18),_transparent_65%)]" aria-hidden="true" />
            <div className="relative space-y-8">
              <div className="text-center space-y-6">
                {/* <h3 className="text-lg font-semibold text-foreground">Token Distribution</h3> */}
                <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[250px] aspect-square">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
                    <Pie
                      data={TOKENOMICS_DATA}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="80%"
                      outerRadius="100%"
                      cornerRadius="50%"
                      paddingAngle={5}
                      stroke="none"
                      isAnimationActive={false}
                    >
                      {TOKENOMICS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Total Supply
                  </span>
                  <div className="text-3xl font-bold text-foreground">21,000,000</div>
                  <span className="text-sm font-medium text-muted-foreground">ASTY Tokens</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
