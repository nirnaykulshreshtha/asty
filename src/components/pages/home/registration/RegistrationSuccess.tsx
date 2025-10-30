/**
 * Registration Success Component
 * ------------------------------
 * Displays confirmation messaging, celebratory visuals, and referral credit
 * details after a user completes the Early Membership registration flow.
 */

import { ConfettiStars } from "@/components/ui/confetti-stars"
import { Check } from "lucide-react"

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
  /** Controls whether the confetti animation should fire. */
  showConfetti?: boolean
}

/**
 * Renders the success state once the user has secured their Stage 1 spot.
 */
export function RegistrationSuccess({
  referralAddress,
  directReferralCountDisplay,
  accruedRewardsDisplay,
  depositTokenSymbol,
  showConfetti = false,
}: RegistrationSuccessProps) {
  return (
    <div className="space-y-5">
      {showConfetti ? <ConfettiStars autoTrigger={true} delay={150} /> : null}

      <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-200">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="font-semibold text-green-100">Stage 1 spot secured</p>
          <p className="text-xs text-green-200/80">Lifetime position locked. Earnings now flow to this wallet.</p>
        </div>
      </div>

      <div className="grid gap-3 text-xs text-muted-foreground">
        {referralAddress && (
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-3">
            <p className="font-semibold text-foreground">Referral credit applied</p>
            <p className="font-mono text-sm">
              {referralAddress.slice(0, 6)}...{referralAddress.slice(-4)}
            </p>
          </div>
        )}

        {(directReferralCountDisplay || accruedRewardsDisplay) && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            {directReferralCountDisplay && (
              <p className="font-medium text-foreground">Direct referrals • {directReferralCountDisplay}</p>
            )}
            {accruedRewardsDisplay && (
              <p>
                Pending rewards • {accruedRewardsDisplay}
                {depositTokenSymbol ? ` ${depositTokenSymbol}` : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

