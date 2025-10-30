/**
 * Registration Header Component
 * -----------------------------
 * Renders the headline and supporting message for the registration sidebar.
 * The content is intentionally simple so that branding copy can be adjusted
 * without digging into the logic-heavy parent component.
 */

/**
 * Props supported by `RegistrationHeader`.
 */
interface RegistrationHeaderProps {
  /** Human-readable display of the current membership count. */
  currentMembershipCount: string
}

/**
 * Renders the header section for the registration sidebar, highlighting the
 * urgency and current progress of the Early Membership program.
 */
export function RegistrationHeader({ currentMembershipCount }: RegistrationHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-foreground mb-2">Secure Your Position</h3>
      <p className="text-sm text-muted-foreground">
        Stage 1 positions are open—join {currentMembershipCount} members powering the Asty Network
      </p>
    </div>
  )
}

