/**
 * Vault Flow Section Component
 * ----------------------------
 * Visualizes the core flywheel: Community Activity → Vault → Rewards → Holders.
 * Explains how every network action feeds value into the shared vault and how
 * distributions flow back to participants. Based on client slide 2 narrative.
 * 
 * Features:
 * - Four-stage flow visualization with icons and descriptions
 * - Revenue streams breakdown (referral earnings, education fees, trader tools)
 * - CTA buttons for vault model and network joining
 * - Responsive grid layout with hover animations
 * - Scroll-based reveal animations
 * - Aggressive logging for debugging
 */

"use client"

import { logger } from "@/lib/logger"
import { VAULT_FLOW_STAGES, VAULT_REVENUE_STREAMS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ContentCard } from "@/components/ui/ContentCard"
import { CTAButton } from "@/components/ui/CTAButton"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"

interface VaultFlowSectionProps {
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders the vault flow section showing how community activity feeds into the vault
 * and distributions flow back to holders. Includes revenue streams and key CTAs.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 */
export function VaultFlowSection({ onAnchorClick }: VaultFlowSectionProps) {
  logger.info("component:vault-flow:render")

  return (
    <section
      id="vault"
      data-section-label="Vault Flow"
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background/95 to-background/80 px-4 py-24 sm:px-6 lg:px-8"
    >
      <DecorativeBackground variant="tokenomics" className="-z-10 opacity-60 blur-sm" />

      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <SectionHeader
          label="The Engine"
          title="Community is the engine. The Vault is the reward."
          description="Every touchpoint inside Asty — learning, referrals, trader tooling — deposits value into the shared Vault. The Vault then redistributes yield back to holders based on real contribution and position."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* Main Flow Visualization */}
          <div
            className="reveal-section relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 via-background/85 to-card/70 p-10 shadow-2xl backdrop-blur lg:p-12"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,68,255,0.18),_transparent_70%)]" />

            <div className="relative space-y-8">
              <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl space-y-3">
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                    Vault flywheel
                  </span>
                  <h3 className="text-2xl font-semibold text-foreground">
                    How community activity keeps the Vault circulating
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Follow the flow from community action into the Vault and back out as rewards. Each stage adds momentum, increasing the collective yield the longer you participate.
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm text-primary shadow-lg">
                  Transparent by design. Every input and distribution is trackable on-chain for holders.
                </div>
              </header>

              <div className="relative pl-8 sm:pl-10">
                <div className="pointer-events-none absolute left-3 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-primary/60 via-border/30 to-transparent sm:left-4" />
                <ol className="space-y-8">
                  {VAULT_FLOW_STAGES.map((stage, index) => (
                    <li
                      key={stage.id}
                      className="group relative rounded-2xl border border-border/40 bg-background/70 p-6 shadow-md transition duration-200 hover:border-primary/40 hover:shadow-xl"
                    >
                      <div className="absolute -left-[2.35rem] top-6 flex size-12 items-center justify-center rounded-full border border-primary/50 bg-background/90 text-primary shadow-lg sm:-left-12">
                        <stage.icon className="size-6" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                            Step {index + 1}
                          </p>
                          <h4 className="text-lg font-semibold text-foreground">
                            {stage.title}
                          </h4>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground sm:text-right sm:text-sm">
                          Compounding impact
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {stage.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:gap-8">
            <div className="rounded-3xl border border-border/50 bg-background/80 p-8 shadow-xl backdrop-blur">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                Distribution priorities
              </span>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                Rewards mirror actual network contribution.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vault distributions flow automatically to holders with weightings based on:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-semibold text-primary">
                    1
                  </span>
                  Token holdings and vesting status
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-semibold text-primary">
                    2
                  </span>
                  Network position and access tier
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-semibold text-primary">
                    3
                  </span>
                  Referral and tool usage performance
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-border/60 bg-card/80 p-5 text-sm text-muted-foreground">
                Stakeholders always know why they earned what they earned — no opaque reward formulas or hidden middlemen.
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-card/70 p-8 shadow-xl backdrop-blur">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                Vault revenue streams
              </span>
              <p className="mt-3 text-sm text-muted-foreground">
                Multiple yield engines feed the Vault, keeping rewards sustainable as the network scales.
              </p>
              <div className="mt-6 space-y-4">
                {VAULT_REVENUE_STREAMS.map((stream) => (
                  <div
                    key={stream.title}
                    className="flex items-start gap-4 rounded-2xl border border-border/40 bg-background/70 p-4 shadow transition duration-200 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                      <stream.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {stream.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {stream.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard className="bg-background/80 text-center shadow-lg">
            <p className="text-sm italic text-foreground">
              &ldquo;Every referral, every trade, every tool - builds income for the community.&rdquo;
            </p>
          </ContentCard>
          <ContentCard className="bg-background/80 text-center shadow-lg">
            <p className="text-sm italic text-foreground">
              &ldquo;No middlemen. Just the Vault and holders.&rdquo;
            </p>
          </ContentCard>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton
            href="#vault"
            label="Explore Vault Model"
            onClick={onAnchorClick}
            variant="default"
            size="lg"
            className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          />
          <CTAButton
            href="#membership"
            label="Join the Network"
            onClick={onAnchorClick}
            variant="outline"
            size="lg"
            className="backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}
