/**
 * Registration Section Component
 * ----------------------------
 * Displays a user registration interface for Early Membership signup.
 * Provides wallet connection for users to register and secure their position
 * in the Asty Network with a $100 entry fee and optional referral address.
 * 
 * Features:
 * - Wallet-only registration (no email required)
 * - Optional referral address input field
 * - Clear pricing and benefits display
 * - Call-to-action for wallet connection
 * - Progress indicator showing current membership count
 * - Responsive design with gradient background
 * - Form validation for referral address
 * - Scroll-based reveal animation
 */

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { CheckCircle } from "lucide-react"
import { MEMBERSHIP_PROGRESS } from "./types"

interface RegistrationSectionProps {
  motionReduced: boolean
}

/**
 * Renders the registration section with wallet connection and optional referral.
 * Allows users to register for Early Membership with wallet connection and referral address.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function RegistrationSection({ motionReduced }: RegistrationSectionProps) {
  logger.info("component:memes:registration:render", { motionReduced })

  const [referralAddress, setReferralAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handleWalletConnect = async () => {
    setIsLoading(true)
    logger.info("component:memes:registration:wallet_connect", { referralAddress })

    try {
      // TODO: Implement actual wallet connection logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsRegistered(true)
      logger.info("component:memes:registration:success", { referralAddress })
    } catch (error) {
      logger.error("component:memes:registration:error", { error, referralAddress })
    } finally {
      setIsLoading(false)
    }
  }

  const isValidAddress = (address: string) => {
    // Basic Ethereum address validation (0x followed by 40 hex characters)
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  return (
    <aside
      className="reveal-section relative overflow-hidden rounded-[2.75rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20 p-6 shadow-[0_24px_60px_rgba(20,16,48,0.35)] sm:p-8"
      data-animate-on-scroll
      data-visible="false"
    >
      {/* Decorative background elements */}
      <DecorativeBackground variant="sidebar" className="opacity-70" />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Secure Your Position
          </h3>
          <p className="text-sm text-muted-foreground">
            Join {MEMBERSHIP_PROGRESS[0].value} members in the Asty Network
          </p>
        </div>

        {/* Registration Form */}
        <Card className="mb-6 border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-foreground">Early Membership</CardTitle>
            <CardDescription className="text-muted-foreground">
              $100 lifetime position • 12-level referral network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isRegistered ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-sm font-medium text-foreground">
                    Referral Address (Optional)
                  </Label>
                  <Input
                    id="referral"
                    type="text"
                    placeholder="0x..."
                    value={referralAddress}
                    onChange={(e) => setReferralAddress(e.target.value)}
                    className={cn(
                      "bg-background/50 border-white/10 text-foreground placeholder:text-muted-foreground",
                      referralAddress && !isValidAddress(referralAddress) && "border-red-400/50"
                    )}
                  />
                  {referralAddress && !isValidAddress(referralAddress) && (
                    <p className="text-xs text-red-400">
                      Please enter a valid Ethereum address
                    </p>
                  )}
                </div>
                
                <Button
                  type="button"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleWalletConnect}
                  disabled={isLoading || (referralAddress !== "" && !isValidAddress(referralAddress))}
                >
                  {isLoading ? "Connecting Wallet..." : "Connect Wallet & Register"}
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Registration Successful!
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your wallet has been connected and membership is secured.
                  </p>
                </div>
                {referralAddress && (
                  <div className="text-xs text-muted-foreground">
                    Referred by: {referralAddress.slice(0, 6)}...{referralAddress.slice(-4)}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-[0_10px_25px_rgba(12,8,32,0.25)] backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-2">
              Presale Progress
            </p>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-foreground">
                {MEMBERSHIP_PROGRESS[0].value}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-2xl font-bold text-primary">
                {MEMBERSHIP_PROGRESS[1].value}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(6320 / 10000) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {MEMBERSHIP_PROGRESS[1].value} memberships unlock the presale
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
