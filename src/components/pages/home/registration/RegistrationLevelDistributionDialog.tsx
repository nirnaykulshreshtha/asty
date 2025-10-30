"use client"

/**
 * Registration Level Distribution Dialog
 * --------------------------------------
 * Wraps the level distribution grid inside a modal surface so deeper referral
 * analytics can be launched contextually from the withdrawal section without
 * cluttering the primary success card.
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { RegistrationLevelDistribution } from "./RegistrationLevelDistribution"

interface RegistrationLevelDistributionDialogProps {
  /** Controls whether the dialog is currently visible. */
  open: boolean
  /** Handler invoked when the open state changes (Radix controlled). */
  onOpenChange: (open: boolean) => void
  /** Pre-normalized referral depth entries supplied by the parent container. */
  levels: Array<{ level: number; count: number }>
  /** Reflects whether the depth computation is in-flight. */
  isLoading: boolean
  /** Optional error string to surface when the computation fails. */
  error: string | null
  /** Callback used to manually trigger a fresh computation from the dialog. */
  onRefresh: () => void
}

export function RegistrationLevelDistributionDialog({
  open,
  onOpenChange,
  levels,
  isLoading,
  error,
  onRefresh,
}: RegistrationLevelDistributionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border border-white/10 bg-background/95 p-8 text-left shadow-[0_25px_80px_rgba(16,12,48,0.55)] sm:p-10">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Referral depth breakdown
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Review how many members your network has across each level. Refresh anytime to pull the latest on-chain snapshot.
          </DialogDescription>
        </DialogHeader>
        <RegistrationLevelDistribution
          levels={levels}
          isLoading={isLoading}
          error={error}
          onRefresh={onRefresh}
        />
      </DialogContent>
    </Dialog>
  )
}


