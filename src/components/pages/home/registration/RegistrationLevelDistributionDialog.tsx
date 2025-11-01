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
import { ResponsiveDialog } from "@/components/ui/responsive-dialog"
import { Button } from "@/components/ui/button"

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
    <ResponsiveDialog
      isOpen={open}
      setIsOpen={(state: boolean) => onOpenChange(state)}
      title={"Referral depth breakdown"}
      description={"Review how many members your network has across each level. Refresh anytime to pull the latest on-chain snapshot."}
      footerOptions={{
        closeButton: <Button variant="destructive" onClick={() => onOpenChange(false)}>Close</Button>,
      }}
      desktopDialogClassContent="max-w-2xl"
    >
      <RegistrationLevelDistribution
        levels={levels}
        isLoading={isLoading}
        error={error}
        onRefresh={onRefresh}
      />
    </ResponsiveDialog>
  )
}


