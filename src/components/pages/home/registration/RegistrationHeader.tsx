/**
 * Registration Header Component
 * -----------------------------
 * Renders the headline and supporting message for the registration sidebar.
 * The content is intentionally simple so that branding copy can be adjusted
 * without digging into the logic-heavy parent component.
 */

/**
 * Renders the header section for the registration sidebar, highlighting the
 * urgency and current progress of the Early Membership program without
 * exposing the live membership total.
 */
export function RegistrationHeader() {
  return (
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-foreground mb-2">Secure Your Position</h3>
      <p className="text-sm text-muted-foreground">
        Stage 1 positions are open—claim your spot and power the Asty Network.
      </p>
    </div>
  )
}

