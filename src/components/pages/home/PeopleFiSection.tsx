"use client"

/**
 * PeopleFi Section
 * ----------------
 * Explains the cooperative engine behind Asty with four layered "cylinders"
 * that route community-generated value back into the Vault.
 */

import { memo } from "react"
import {
  GraduationCap,
  Megaphone,
  Coins,
  Wrench,
} from "lucide-react"
import { logger } from "@/lib/logger"
import { SectionHeader } from "@/components/ui/SectionHeader"

const PEOPLEFI_CYLINDERS = [
  {
    id: "education",
    title: "Education Layer",
    description: [
      "Paid courses, onboarding, and training by the community.",
      "Income flows to the Vault.",
    ],
    icon: GraduationCap,
  },
  {
    id: "marketing",
    title: "Marketing Layer",
    description: [
      "Community refers users to partner DEXs like Aster.",
      "Marketing income goes to the Vault.",
    ],
    icon: Megaphone,
  },
  {
    id: "defi",
    title: "DeFi Layer",
    description: [
      "Every action adds value. Members share the upside through a tax mechanism.",
      "Hyper-deflationary design compounds Vault capital.",
    ],
    icon: Coins,
  },
  {
    id: "facilitation",
    title: "Facilitation Layer",
    description: [
      "Tools and utilities built or promoted by the community.",
      "Product revenue goes to the Vault.",
    ],
    icon: Wrench,
  },
] as const

function PeopleFiSectionComponent() {
  logger.info("component:peoplefi:render")

  return (
    <section
      id="peoplefi"
      data-section-label="What Is Asty — PeopleFi"
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-background via-background/90 to-background/70 py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.12),transparent_65%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/5 to-transparent lg:block" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-0">
        <SectionHeader
          label="How Income Is Generating ? — Through PeopleFi"
          title="The engine is fueled by community."
          description="A decentralized cooperative where people work together, create value, and share it through the Vault."
          align="center"
          showPill={true}
        />

        <div className="reveal-section grid gap-6 rounded-[2.5rem] border border-border/50 bg-card/70 p-8 shadow-2xl backdrop-blur-xl sm:p-10 lg:grid-cols-2" data-animate-on-scroll data-visible="false">
          {PEOPLEFI_CYLINDERS.map(({ id, title, description, icon: Icon }, index) => (
            <div
              key={id}
              className="group relative flex flex-col gap-4 rounded-3xl border border-border/40 bg-background/80 p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl"
            >
                  {/* position: absolute; */}
    {/* right: 0; */}
    {/* font-size: 120px; */}
    {/* letter-spacing: 16px; */}
    {/* line-height: 1; */}
    {/* color: var(--primary); */}
    {/* opacity: 0.5; */}
    {/* z-index: -1; */}
              <p className="absolute top-0 right-0 text-[100px] -z-1 hover:-z-1 font-semibold uppercase tracking-[0.1em] text-primary opacity-20">{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
              <div className="pointer-events-none absolute -top-12 left-1/2 size-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.18),_transparent_65%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-2xl leading-none">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                {description.map((line) => (
                  <p key={line} className="flex items-center gap-2"><span className="flex size-2 rounded-full bg-primary opacity-50" aria-hidden="true" />{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          Unlike typical tokens, here the community isn&apos;t just holding — it&apos;s producing value.
        </p>
      </div>
    </section>
  )
}

export const PeopleFiSection = memo(PeopleFiSectionComponent)
