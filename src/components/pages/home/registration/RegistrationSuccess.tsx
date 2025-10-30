/**
 * Registration Success Component
 * ------------------------------
 * Displays confirmation messaging, celebratory visuals, and referral credit
 * details after a user completes the Early Membership registration flow.
 */

import { ConfettiStars } from "@/components/ui/confetti-stars"
import { CheckCircle } from "lucide-react"

/**
 * Props supported by `RegistrationSuccess`.
 */
interface RegistrationSuccessProps {
  /** Raw referral address applied during registration, if any. */
  referralAddress?: string
  /** Formatted direct referral count surfaced from the contract. */
  directReferralCountDisplay?: string
  /** String representation of currently accrued rewards for quick context. */
  accruedRewardsDisplay?: string
  /** Human-friendly symbol for the deposit token. */
  depositTokenSymbol?: string
}

/**
 * Renders the success state once the user has secured their Stage 1 spot.
 */
export function RegistrationSuccess({
  referralAddress,
  directReferralCountDisplay,
  accruedRewardsDisplay,
  depositTokenSymbol,
}: RegistrationSuccessProps) {
  return (
    <div className="text-center space-y-6">
      <ConfettiStars autoTrigger={true} delay={300} />

      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
          <CheckCircle className="h-8 w-8 text-green-400 relative z-10" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-bold text-foreground">🎉 Stage 1 Spot Secured!</h4>
      </div>

      {referralAddress && (
        <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
          <p className="text-xs text-green-400 font-medium mb-1">Referral Credit Applied</p>
          <p className="text-xs text-muted-foreground font-mono">
            {referralAddress.slice(0, 6)}...{referralAddress.slice(-4)}
          </p>
        </div>
      )}

      {(directReferralCountDisplay || accruedRewardsDisplay) && (
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-xs text-muted-foreground">
          {directReferralCountDisplay && (
            <p className="font-medium text-foreground">Direct referrals: {directReferralCountDisplay}</p>
          )}
          {accruedRewardsDisplay && (
            <p>
              Pending rewards: {accruedRewardsDisplay}
              {depositTokenSymbol ? ` ${depositTokenSymbol}` : ""}
            </p>
          )}
        </div>
      )}

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
          <span>✓ $100 Lifetime Position</span>
          <span>✓ 12-Level Referral Network</span>
          <span>✓ Lifetime Income Engine</span>
        </div>
      </div>
    </div>
  )
}

