/**
 * Membership Section Component
 * -----------------------
 * Main container for the Early Membership program section. Orchestrates
 * multiple smaller components to display foundational info, benefits,
 * and user registration interface. Highlights how positions work ahead of the token presale.
 * 
 * Features:
 * - Composed of smaller, focused components
 * - Early membership foundation overview
 * - Benefits of holding a position
 * - Key advantages of the Asty network
 * - User registration form with email and wallet connection
 * - Progress tracking and presale trigger highlight
 * - Responsive, animated layout
 */

"use client"

import { memo } from "react"
import Link from "next/link"
import { logger } from "@/lib/logger"
import { MemesSectionHeader } from "./MemesSectionHeader"
// import { MembershipFoundationCard } from "./MembershipFoundationCard"
import { RegistrationSection } from "./RegistrationSection"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import { Button } from "@/components/ui/button"

interface MemesSectionProps {
  motionReduced: boolean
}

/**
 * Renders the Early Membership section by composing smaller, focused components.
 * Orchestrates the display of foundation details, benefits, and user registration interface.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
function MemesSectionComponent({ motionReduced }: MemesSectionProps) {
  logger.info("component:memes:render", { motionReduced })

  return (
    <section
      id="membership"
      data-section-label="Early Membership"
      className="border-b border-border/40 py-20"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-8">
            <MemesSectionHeader motionReduced={motionReduced} />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <CustomConnectButton
                  size="lg"
                  connectLabel="Connect Wallet / Register"
                  variant={{
                    connect: "default",
                    connected: "outline",
                    wrongNetwork: "destructive",
                  }}
                  className="w-full sm:w-auto"
                  showBalance={false}
                  showChainName={false}
                />
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="#how">Learn More</Link>
                </Button>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                Limited early slots • On-chain registration
              </p>
            </div>
          </div>
        </div>
        {/* <MembershipFoundationCard motionReduced={motionReduced} /> */}
        <RegistrationSection motionReduced={motionReduced} />
      </div>
    </section>
  )
}

export const MemesSection = memo(MemesSectionComponent)
