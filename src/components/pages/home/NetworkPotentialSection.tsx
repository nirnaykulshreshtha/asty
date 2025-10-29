"use client"

/**
 * Network Potential Section
 * -------------------------
 * Visualizes how different growth motions expand the Vault's capital base.
 */

import { memo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { logger } from "@/lib/logger"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Pill } from "@/components/ui/Pill"
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ForecastPoint = {
  users: number
  capital: number
}

type ForecastCard = {
  id: string
  eyebrow: string
  title: string
  description: string
  data: ForecastPoint[]
  color: string
  surfaceGradient: string
  statLabel: string
  helper: string
}

// Deterministic currency compact formatter (SSR/CSR safe)
// Avoids Intl.NumberFormat("compact") which can differ between Node and browsers

const NETWORK_FORECASTS: readonly ForecastCard[] = [
  {
    id: "referrals",
    eyebrow: "Referral flywheel",
    title: "Aster Referral Yield",
    description:
      "",
    data: [
      { users: 150, capital: 18000 },
      { users: 300, capital: 48000 },
      { users: 600, capital: 108000 },
      { users: 900, capital: 176000 },
      { users: 1200, capital: 262000 },
      { users: 1500, capital: 355000 },
    ],
    color: "var(--chart-1)",
    surfaceGradient:
      "radial-gradient(140% 120% at 50% 0%, color-mix(in srgb, var(--chart-1) 22%, transparent) 0%, transparent 70%)",
    statLabel: "Projected at 1,500 referrers",
    helper: "Assumes ~$230 average deposit per referred contributor.",
  },
  {
    id: "tools",
    eyebrow: "Tooling adoption",
    title: "Utility Tools Revenue",
    description:
      "",
    data: [
      { users: 80, capital: 22000 },
      { users: 180, capital: 62000 },
      { users: 320, capital: 134000 },
      { users: 480, capital: 214000 },
      { users: 650, capital: 305000 },
      { users: 820, capital: 404000 },
    ],
    color: "var(--chart-2)",
    surfaceGradient:
      "radial-gradient(140% 120% at 50% 0%, color-mix(in srgb, var(--chart-2) 26%, transparent) 0%, transparent 72%)",
    statLabel: "Projected at 820 active tool users",
    helper: "Assumes ~$45 monthly subscription with 70% profit margin.",
  },
  {
    id: "courses",
    eyebrow: "Education pipeline",
    title: "Course Sales Momentum",
    description:
      "",
    data: [
      { users: 60, capital: 14000 },
      { users: 140, capital: 42000 },
      { users: 240, capital: 96000 },
      { users: 360, capital: 158000 },
      { users: 480, capital: 226000 },
      { users: 600, capital: 298000 },
    ],
    color: "var(--chart-5)",
    surfaceGradient:
      "radial-gradient(140% 120% at 50% 0%, color-mix(in srgb, var(--chart-5) 24%, transparent) 0%, transparent 70%)",
    statLabel: "Projected at 600 learners",
    helper: "Assumes ~$500 average course ticket with 25% Vault allocation.",
  },
] as const

/**
 * formatCapitalApprox
 * Returns a deterministic, SSR/CSR-safe approximate USD string like "~$355K".
 * - Uses manual thresholds (K, M, B, T)
 * - Shows at most one decimal place, trims trailing .0
 * - Avoids Intl "compact" to prevent hydration mismatches
 */
const formatCapitalApprox = (value: number) => {
  if (!Number.isFinite(value)) {
    logger.warn("formatCapitalApprox:non-finite", { value })
  }

  const sanitized = Number.isFinite(value) ? value : 0
  const sign = sanitized < 0 ? "-" : ""
  const abs = Math.abs(sanitized)

  const units = [
    { v: 1_000_000_000_000, s: "T" },
    { v: 1_000_000_000, s: "B" },
    { v: 1_000_000, s: "M" },
    { v: 1_000, s: "K" },
  ] as const

  for (const u of units) {
    if (abs >= u.v) {
      const raw = abs / u.v
      const rounded = raw >= 100 ? Math.round(raw) : Math.round(raw * 10) / 10
      const numStr = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
      return `~$${sign}${numStr}${u.s}`
    }
  }

  // < 1,000: show integer dollars with en-US grouping
  return `~$${sign}${Math.round(abs).toLocaleString("en-US")}`
}

function NetworkPotentialSectionComponent() {
  logger.info("component:network-potential:render")

  return (
    <section
      id="network-potential"
      data-section-label="Network Potential"
      className="space-y-8 border-b border-border/40 py-8 sm:py-12 lg:py-16"
    >
      <SectionHeader
        label="Network Potential"
        title="How the Asty Network Scales Vault Contributions."
        description={[
          "Each growth motion pushes more value toward the Vault. These projections show how user adoption converts into capital inflows.",
        ]}
        align="center"
        showPill
      />

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
        {NETWORK_FORECASTS.map((forecast) => {
          const finalPoint = forecast.data[forecast.data.length - 1]
          const chartConfig: ChartConfig = {
            capital: {
              label: "Vault contribution (USDC)",
              color: forecast.color,
            },
          }

          return (
            <article
              key={forecast.id}
              className="reveal-section relative flex flex-col gap-6 overflow-hidden rounded-[2.25rem] border border-border/50 bg-card/80 p-6 shadow-[0_28px_60px_rgba(15,23,42,0.35)] backdrop-blur-lg"
              data-animate-on-scroll
              data-visible="false"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{ background: forecast.surfaceGradient }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col gap-4">
                <Pill tone="muted" className="w-fit">
                  {forecast.eyebrow}
                </Pill>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {forecast.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {forecast.description}
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col gap-4 rounded-[1.75rem] border border-border/40 bg-background/80 p-4 shadow-inner">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {forecast.statLabel}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatCapitalApprox(finalPoint.capital)}
                  </div>
                </div>

                <div className="h-56">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-full w-full"
                    centerOverlay={null}
                  >
                    <AreaChart data={forecast.data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`line-gradient-${forecast.id}`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor={forecast.color} stopOpacity={0.32} />
                          <stop offset="95%" stopColor={forecast.color} stopOpacity={0.04} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(148, 163, 184, 0.22)" strokeDasharray="8 10" vertical={false} />
                      <XAxis
                        dataKey="users"
                        tickLine={false}
                        axisLine={false}
                        tick={false}
                      />
                      <YAxis
                        width={0}
                        tickLine={false}
                        axisLine={false}
                        tick={false}
                      />
                      <ChartTooltip
                        cursor={{ strokeDasharray: "4 4" }}
                        content={
                          <ChartTooltipContent
                            indicator="line"
                            formatter={(value) =>
                              typeof value === "number"
                                ? formatCapitalApprox(value)
                                : value
                            }
                            labelFormatter={(label) =>
                              `${Number(label).toLocaleString()} users`
                            }
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="capital"
                        stroke="var(--color-capital)"
                        strokeWidth={2.4}
                        fill={`url(#line-gradient-${forecast.id})`}
                        dot={{
                          r: 2.2,
                          fill: forecast.color,
                          stroke: "transparent",
                        }}
                        activeDot={{
                          r: 4,
                          fill: forecast.color,
                          stroke: "var(--color-capital)",
                          strokeWidth: 1,
                        }}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>

                <p className="text-xs text-muted-foreground">
                  {forecast.helper}
                </p>
              </div>
            </article>
          )
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Illustrative projections based on current pricing and conversion assumptions. Use as guidance for narrative only.
      </p>
    </section>
  )
}

export const NetworkPotentialSection = memo(NetworkPotentialSectionComponent)
