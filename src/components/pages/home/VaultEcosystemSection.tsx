"use client"

/**
 * Vault Ecosystem Section
 * -----------------------
 * Visualizes how every value stream routes into the Vault and flows back to holders.
 */

import Link from "next/link"
import { memo } from "react"
import { ArrowRight, ArrowDown, Check, Vault } from "lucide-react"
import { logger } from "@/lib/logger"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/button"

const VAULT_INPUTS = [
  { id: "referrals", label: "Referral income", emoji: "🔸" },
  { id: "tools", label: "Tools revenue", emoji: "🔸" },
  { id: "tax", label: "Tax mechanism", emoji: "🔸" },
] as const

const VAULT_BENEFITS = [
  "100% on-chain and transparent",
  "Passive income without daily trading",
  "Growth directly tied to network activity",
] as const

function VaultEcosystemSectionComponent() {
  logger.info("component:vault-ecosystem:render")

  return (
    <section
      id="vault-ecosystem"
      data-section-label="Vault Ecosystem"
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background/92 to-background/80 py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-0">
        <SectionHeader
          label="Section 6 · Vault Ecosystem"
          title="Where All Value Converges."
          description="Every action in the ecosystem flows into the Vault. The Vault rewards everyone."
          align="center"
          showPill={false}
        />

        <div
          className="reveal-section grid gap-8 rounded-[2.75rem] border border-border/50 bg-card/75 p-8 shadow-[0_32px_80px_rgba(12,10,28,0.55)] backdrop-blur-xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          data-animate-on-scroll
          data-visible="false"
        >
          <div className="flex flex-col gap-8">
            <div className="relative flex flex-col gap-6 rounded-3xl border border-border/50 bg-background/80 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Flow Diagram
              </p>
              <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-6">
                <div className="flex flex-col gap-3">
                  {VAULT_INPUTS.map(({ id, label, emoji }) => (
                    <div
                      key={id}
                      className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/90 px-4 py-3 text-sm font-medium text-muted-foreground shadow transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                    >
                      <span className="text-lg" aria-hidden="true">
                        {emoji}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center text-muted-foreground lg:self-stretch lg:px-4">
                  <ArrowRight className="hidden size-6 lg:block" aria-hidden="true" />
                  <ArrowDown className="block size-6 lg:hidden" aria-hidden="true" />
                </div>

                <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary/40 bg-primary/15 px-6 py-8 text-center text-sm text-primary-foreground shadow-lg">
                  <span className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/25 text-primary shadow-inner">
                    <Vault className="size-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Vault</h3>
                    <p className="text-muted-foreground">
                      Distributes rewards to holders (biweekly + yearly).
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -left-24 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.22),transparent_70%)] blur-2xl lg:block" aria-hidden="true" />
            </div>

            <div className="grid gap-3 rounded-3xl border border-border/50 bg-background/80 p-6 shadow-lg">
              {VAULT_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex size-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary" aria-hidden="true">
                    <Check className="size-3.5" />
                  </span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-3 rounded-3xl border border-border/50 bg-background/80 p-6 shadow-lg">
              <p className="text-sm text-muted-foreground">
                Every referral, tool, and transactional touchpoint feeds the same treasury.
                As the ecosystem expands, Vault rewards compound for everyone holding Asty.
              </p>
              <p className="text-sm text-muted-foreground">
                The design is transparent, automated, and entirely on-chain — ensuring the community
                can audit how value is created and shared.
              </p>
            </div>

            <Button asChild size="lg" className="self-start rounded-full px-8">
              <Link href="#membership">Start Earning with Asty</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const VaultEcosystemSection = memo(VaultEcosystemSectionComponent)
