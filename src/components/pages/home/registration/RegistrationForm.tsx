/**
 * Registration Form Component
 * ---------------------------
 * Encapsulates the primary registration form UI, including wallet connection
 * prompts, referral alerts, and the entry point into the cross-chain payment
 * dialog. The component is intentionally stateless and receives all behavior
 * via props so the parent container can own data fetching and orchestration
 * responsibilities.
 */

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import { Check, Loader2, AlertCircle, Share2 } from "lucide-react"

import type { RegistrationState } from "./types"

/**
 * Props supported by `RegistrationForm`.
 */
interface RegistrationFormProps {
  /** Submission lifecycle state. */
  registrationState: RegistrationState
  /** Auto-detected referral address extracted from the URL, if any. */
  autoExtractedReferral: string | null
  /** Validation error triggered during referral extraction. */
  referralExtractionError: string | null
  /** Flag indicating whether a wallet is presently connected. */
  isWalletConnected: boolean
  /** Indicates whether payment configuration can be constructed. */
  isPaymentConfigAvailable: boolean
  /** Handler invoked when the form is submitted. */
  onSubmit: () => Promise<void> | void
  /** Handler fired when the user wants to generate a referral link. */
  onOpenReferralDialog: () => void
  /** Handler used to open the payment dialog when the wallet is connected. */
  onOpenPaymentDialog: () => void
}

/**
 * Renders the registration form controls including wallet connectivity,
 * referral status messages, and entry points into the payment flow.
 */
export function RegistrationForm({
  registrationState,
  autoExtractedReferral,
  referralExtractionError,
  isWalletConnected,
  isPaymentConfigAvailable,
  onSubmit,
  onOpenReferralDialog,
  onOpenPaymentDialog,
}: RegistrationFormProps) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); void onSubmit(); }} className="space-y-4">
      {registrationState.errors.general && (
        <Alert variant="destructive" className="border-red-400/50 bg-red-400/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-400">
            {registrationState.errors.general}
          </AlertDescription>
        </Alert>
      )}

      {referralExtractionError && (
        <Alert variant="destructive" className="border-red-400/50 bg-red-400/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-400">
            {referralExtractionError}
          </AlertDescription>
        </Alert>
      )}

      {autoExtractedReferral && !referralExtractionError && (
        <Alert className="border-green-400/50 bg-green-400/10">
          <Check className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            Referral address detected: {autoExtractedReferral.slice(0, 6)}...{autoExtractedReferral.slice(-4)}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        {!isWalletConnected ? (
          <>
            <CustomConnectButton
              className="w-full"
              size="sm"
              connectLabel="Connect Wallet / Register"
              variant={{
                connected: "default",
                connect: "default",
                wrongNetwork: "destructive",
              }}
            />
            <Button
              type="button"
              onClick={onOpenReferralDialog}
              className="w-full"
              size="sm"
              variant="outline"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Generate Referral Link
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <Button
              type="button"
              onClick={onOpenPaymentDialog}
              className="w-full"
              size="sm"
              disabled={registrationState.isSubmitting}
            >
              {registrationState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : !isPaymentConfigAvailable ? (
                "Connect Wallet to Pay"
              ) : (
                "Pay $100 for Early Membership"
              )}
            </Button>
            <Button
              type="button"
              onClick={onOpenReferralDialog}
              className="w-full"
              size="sm"
              variant="outline"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Generate Referral Link
            </Button>
          </div>
        )}
      </div>

      {registrationState.errors.referralAddress && (
        <p className="text-xs text-red-400">
          {registrationState.errors.referralAddress}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Stage 1 is your chance to lock in lifetime income before the network opens to everyone.
      </p>
    </form>
  )
}

