/**
 * Toast Component
 * --------------
 * Accessible toast notification component for user feedback.
 * Displays navigation confirmations and other important messages.
 * 
 * Features:
 * - Screen reader announcements
 * - Auto-dismiss functionality
 * - Accessible positioning
 * - Smooth animations
 */

"use client"

import { ToastState } from "./types"

interface ToastProps {
  toast: ToastState
}

/**
 * Renders an accessible toast notification.
 * 
 * @param toast - Toast state containing message and visibility
 */
export function Toast({ toast }: ToastProps) {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        {toast.visible ? toast.message : ""}
      </div>

      {toast.visible ? (
        <div className="fixed right-4 top-24 z-50 w-72 rounded-lg border border-border/70 bg-card/95 p-4 text-sm shadow-xl backdrop-blur">
          <p className="font-semibold text-primary">Heads up</p>
          <p className="mt-1 text-muted-foreground">{toast.message}</p>
        </div>
      ) : null}
    </>
  )
}
