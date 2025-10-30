"use client"

/**
 * Registration Level Distribution
 * -------------------------------
 * Presents a compact summary of the member counts across referral levels 1–12
 * for the signed-in wallet. The component is intentionally lightweight so it
 * can live inside the registration success card without introducing additional
 * contract knowledge. Data hydration and logging remain the responsibility of
 * the container (`RegistrationSection`).
 */

import { Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface LevelEntry {
  /** Referral depth (starting at 1 for direct referrals). */
  level: number
  /** Member count registered at the given depth. */
  count: number
}

interface RegistrationLevelDistributionProps {
  /** Normalized referral tree metrics keyed by level. */
  levels: LevelEntry[]
  /** Indicates when the container is actively recomputing the tree. */
  isLoading: boolean
  /** Human-readable error message shown when the fetch fails. */
  error: string | null
  /** Handler invoked when the user explicitly requests a refresh. */
  onRefresh: () => void
}

/**
 * Renders a responsive grid highlighting the referral depth totals that the
 * caller precomputed. Loading and error states are handled inline so the
 * surrounding success card stays minimal.
 */
export function RegistrationLevelDistribution({
  levels,
  isLoading,
  error,
  onRefresh,
}: RegistrationLevelDistributionProps) {
  const hasLevels = levels.length > 0

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Users className="h-4 w-4 text-primary" />
          <span>Network depth</span>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? <Spinner className="h-3.5 w-3.5" /> : null}
          <span>{isLoading ? "Refreshing" : "Refresh"}</span>
        </Button>
      </div>

      {error ? (
        <p className="mt-4 text-xs text-destructive/80">{error}</p>
      ) : null}

      {!error && hasLevels ? (
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {levels.map((entry) => (
            <div
              key={entry.level}
              className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 text-xs text-muted-foreground"
            >
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-primary/80">
                Level {entry.level}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{entry.count.toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {!error && !hasLevels && !isLoading ? (
        <p className="mt-4 text-xs text-muted-foreground">
          No downline members yet. Share your referral link to start building depth.
        </p>
      ) : null}
    </div>
  )
}


