/**
 * Registration Payment Dialog
 * ---------------------------
 * Encapsulates the `@matching-platform/payment-widget` dialog used to process
 * the $100 Early Membership payment. The component remains stateless so the
 * parent container can inject logging behavior and manage registration state.
 */

import { Button } from "@/components/ui/button"
import { ResponsiveDialog } from "@/components/ui/responsive-dialog"
import { PaymentWidget, type PaymentConfig } from "@matching-platform/payment-widget"

/**
 * Props supported by `RegistrationPaymentDialog`.
 */
interface RegistrationPaymentDialogProps {
  /** Current open state of the dialog. */
  open: boolean
  /** Handler invoked when the dialog open state changes. */
  onOpenChange: (open: boolean) => void
  /** Precomputed payment widget configuration. */
  paymentConfig: PaymentConfig | null
  /** Indicates whether the user has an active wallet connection. */
  isWalletConnected: boolean
  /** Callback fired on successful payment completion. */
  onPaymentComplete: (reference: string) => void
  /** Callback fired when payment processing fails. */
  onPaymentFailed: (error: string) => void
}

/**
 * Renders the payment widget dialog used to collect the Early Membership fee.
 */
export function RegistrationPaymentDialog({
  open,
  onOpenChange,
  paymentConfig,
  isWalletConnected,
  onPaymentComplete,
  onPaymentFailed,
}: RegistrationPaymentDialogProps) {
  if (!isWalletConnected || !paymentConfig) {
    return null
  }

  return (
    <ResponsiveDialog 
      isOpen={open} 
      setIsOpen={(state: boolean) => onOpenChange(state)} 
      title={"Register with us !!!"} 
      description={""}
      footerOptions={{
        closeButton: <Button variant="destructive" onClick={() => onOpenChange(false)}>Close</Button>,
      }}
      desktopDialogClassContent="max-w-2xl"
    >
      <div className="mt-2">
        <PaymentWidget
          paymentConfig={paymentConfig}
          onPaymentComplete={onPaymentComplete}
          onPaymentFailed={onPaymentFailed}
        />
      </div>
    </ResponsiveDialog>
  )
}

