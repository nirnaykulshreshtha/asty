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
      className="relative space-y-12 overflow-hidden border-b border-border/40 px-4 py-20"
    >
      <DecorativeBackground variant="tokenomics" className="-z-10 opacity-60" />

      <SectionHeader
        label="The Engine"
        title="Community is the engine. The Vault is the reward."
        description="Every action inside the Asty ecosystem — from education to referrals to trading tools — grows the Vault. The Vault then rewards holders and network participants fairly and transparently."
      />

      {/* Main Flow Visualization */}
      <div
        className="reveal-section relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl sm:p-10"
        data-animate-on-scroll
        data-visible="false"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,68,255,0.18),_transparent_60%)]" />
        
        <div className="relative">
          <div className="grid gap-6 md:grid-cols-4">
            {VAULT_FLOW_STAGES.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary shadow-lg">
                    <stage.icon className="size-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                
                {/* Arrow connector */}
                {index < VAULT_FLOW_STAGES.length - 1 && (
                  <div className="absolute -right-3 top-8 hidden md:block">
                    <div className="flex size-6 items-center justify-center rounded-full border border-border/60 bg-background/80 text-xs text-muted-foreground">
                      →
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Vault distributions go to ASTY token holders based on:
          </h3>
          <div className="mt-4 flex justify-center gap-8 text-sm text-muted-foreground">
            <span>• Token holdings</span>
            <span>• Network position</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {VAULT_REVENUE_STREAMS.map((stream) => (
            <ContentCard
              key={stream.title}
              title={stream.title}
              description={stream.description}
              className="bg-card/60"
              leading={
                <div className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                  <stream.icon className="size-5" aria-hidden="true" />
                </div>
              }
            />
          ))}
        </div>
      </div>

      {/* Key Quotes */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 text-center">
            <p className="text-sm italic text-foreground">
              &ldquo;Every referral, every trade, every tool - builds income for the community.&rdquo;
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 text-center">
            <p className="text-sm italic text-foreground">
              &ldquo;No middlemen. Just the Vault and holders.&rdquo;
            </p>
          </div>
        </div>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-4">
        <CTAButton
          href="#vault"
          label="View Vault Model"
          onClick={onAnchorClick}
          variant="default"
          size="lg"
        />
        <CTAButton
          href="#membership"
          label="Join Network"
          onClick={onAnchorClick}
          variant="outline"
          size="lg"
        />
      </div>
    </section>
  )
}
