/**
 * Registration Progress Indicator
 * -------------------------------
 * Presents the Stage 1 progress meter shown at the bottom of the registration
 * sidebar. This component performs the simple percentage calculation and keeps
 * the layout isolated from the parent container.
 */

/**
 * Props supported by `RegistrationProgressIndicator`.
 */
interface RegistrationProgressIndicatorProps {
  /** Stringified representation of the current membership count. */
  currentValue: string
  /** Stringified representation of the overall Stage 1 goal. */
  targetValue: string
}

/**
 * Renders the progress indicator showing how many memberships have been sold.
 */
export function RegistrationProgressIndicator({
  currentValue,
  targetValue,
}: RegistrationProgressIndicatorProps) {
  const sanitizeNumeric = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "")
    const parsed = Number.parseFloat(cleaned)
    return Number.isFinite(parsed) ? parsed : 0
  }

  const current = sanitizeNumeric(currentValue)
  const target = sanitizeNumeric(targetValue)
  const progress = target > 0 ? Math.min(100, (current / target) * 100) : 0

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-[0_10px_25px_rgba(12,8,32,0.25)] backdrop-blur">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-2">
        Stage 1 Progress
      </p>
      <div className="flex items-center justify-center space-x-2 mb-2">
        <span className="text-2xl font-bold text-foreground">{currentValue}</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-2xl font-bold text-primary">{targetValue}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {targetValue} memberships unlock the presale
      </p>
    </div>
  )
}

