/**
 * Registration Withdrawal Section
 * -------------------------------
 * Renders the referral reward summary and exposes a CTA for the connected user
 * to withdraw their accrued rewards from the referral contract. The component
 * remains stateless so that the parent container can orchestrate contract
 * interactions, logging, and error management.
 */

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, PiggyBank, Wallet } from "lucide-react"

/**
 * Props supported by `RegistrationWithdrawalSection`.
 */
interface RegistrationWithdrawalSectionProps {
  /** Readable representation of the user's withdrawable rewards. */
  availableRewardsDisplay: string
  /** Indicates whether the user currently has any withdrawable rewards. */
  hasWithdrawableRewards: boolean
  /** Human-friendly label for the deposit token (defaults to USDC upstream). */
  depositTokenSymbol: string
  /** Formatted direct referral count for quick insight into network size. */
  directReferralCountDisplay: string
  /** Signals that a withdrawal transaction is presently pending. */
  isWithdrawing: boolean
  /** Optional error message surfaced from the withdrawal attempt. */
  withdrawalError?: string | null
  /** Indicates that the most recent withdrawal succeeded. */
  withdrawalSuccess: boolean
  /** Callback invoked when the user presses the withdraw button. */
  onWithdraw: () => Promise<void> | void
  /** Optional className override for the root Card. */
  className?: string
}

/**
 * Displays the withdrawal controls and referral stats beneath the registration
 * success state.
 */
export function RegistrationWithdrawalSection({
  availableRewardsDisplay,
  hasWithdrawableRewards,
  depositTokenSymbol,
  directReferralCountDisplay,
  isWithdrawing,
  withdrawalError,
  withdrawalSuccess,
  onWithdraw,
  className,
}: RegistrationWithdrawalSectionProps) {
  const cardClassName = ["border-white/10 bg-white/5 backdrop-blur", className ?? "mb-6"].join(" ")

  return (
    <Card className={cardClassName}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <PiggyBank className="h-4 w-4 text-primary" />
          Referral Rewards
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track your referral performance and withdraw available {depositTokenSymbol} rewards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-primary/10 bg-primary/10 p-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Available Rewards</p>
            <p className="text-2xl font-semibold text-foreground">{availableRewardsDisplay} {depositTokenSymbol}</p>
          </div>
          <Badge variant={hasWithdrawableRewards ? "default" : "secondary"} className="flex items-center gap-1 text-foreground">
            <Wallet className="h-3.5 w-3.5" />
            {directReferralCountDisplay} direct
          </Badge>
        </div>

        {withdrawalError && (
          <Alert variant="destructive" className="border-red-400/50 bg-red-400/10">
            <AlertDescription className="text-red-300">
              {withdrawalError}
            </AlertDescription>
          </Alert>
        )}

        {withdrawalSuccess && !withdrawalError && (
          <Alert className="border-green-400/50 bg-green-400/10">
            <AlertDescription className="text-green-300">
              Rewards withdrawn successfully. Funds will arrive shortly.
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="button"
          className="w-full"
          size="sm"
          onClick={() => {
            void onWithdraw()
          }}
          disabled={!hasWithdrawableRewards || isWithdrawing}
        >
          {isWithdrawing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Withdrawing...
            </>
          ) : hasWithdrawableRewards ? (
            "Withdraw Rewards"
          ) : (
            "No Rewards Available"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

