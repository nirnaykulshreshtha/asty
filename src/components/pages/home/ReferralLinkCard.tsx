/**
 * Referral Link Card Component
 * ---------------------------
 * Displays referral link generation and sharing functionality for connected wallets.
 * Handles copy/share operations with comprehensive logging and user feedback.
 * 
 * Features:
 * - Automatic referral link generation based on wallet address
 * - Copy to clipboard with fallback support
 * - Web Share API integration with graceful fallback
 * - Clean, focused UI without clutter
 * - Comprehensive logging for debugging
 */

"use client"

import { useMemo, useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { Check, Copy, Share2 } from "lucide-react"

import { logger } from "@/lib/logger"
import { buildReferralLink } from "@/lib/referrals"
import { Button } from "@/components/ui/button"

/**
 * Renders a clean referral link card with copy/share functionality.
 * Only displays when a wallet is connected.
 */
export function ReferralLinkCard() {
  const [hasCopied, setHasCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const referralLink = useMemo(() => {
    if (!mounted || !address) return ""
    return buildReferralLink(address)
  }, [mounted, address])

  const handleCopyReferral = () => {
    if (!referralLink) {
      logger.warn("referral-link-card:copy_no_link")
      return
    }

    let copied = false

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          logger.debug?.("referral-link-card:clipboard_success", { referralLink })
        })
        .catch((error) => {
          logger.warn("referral-link-card:clipboard_error", { error })
        })
      copied = true
    } else if (typeof document !== "undefined") {
      const textarea = document.createElement("textarea")
      textarea.value = referralLink
      textarea.setAttribute("readonly", "")
      textarea.style.position = "absolute"
      textarea.style.left = "-9999px"
      document.body.appendChild(textarea)
      textarea.select()
      copied = document.execCommand("copy")
      document.body.removeChild(textarea)
      logger.info("referral-link-card:exec_command", { copied })
    } else {
      logger.error("referral-link-card:noop")
    }

    setHasCopied(copied)

    if (copied) {
      logger.info("referral-link-card:copy_success", { referralLink })
      toast.success("Referral link copied")
    } else {
      logger.warn("referral-link-card:copy_failed", { referralLink })
      toast.error("Unable to copy referral link")
    }

    window.setTimeout(() => setHasCopied(false), 2200)
  }

  const handleShare = () => {
    if (!referralLink) return

    const sharePayload = {
      title: "Join the Asty Network",
      text: "Secure your Asty membership and earn through the 12-level referral network.",
      url: referralLink,
    }

    logger.info("referral-link-card:share_attempt", sharePayload)

    if (navigator.share) {
      navigator
        .share(sharePayload)
        .then(() => {
          toast.success("Referral link shared")
        })
        .catch((error) => {
          logger.warn("referral-link-card:share_cancel", { error })
        })
      return
    }

    handleCopyReferral()
    toast.message("Share feature not supported", {
      description: "Link copied to clipboard instead.",
    })
  }

  // Don't render if not mounted or no wallet connected
  if (!mounted || !address || !referralLink) {
    return null
  }

  return (
    <>
    <div className="rounded-lg bg-muted/50 p-3">
          <p className="break-words text-sm text-muted-foreground font-mono">
            {referralLink}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleCopyReferral}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            <span className="inline-flex items-center gap-2">
              {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {hasCopied ? "Copied" : "Copy"}
            </span>
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <span className="inline-flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </span>
          </Button>
        </div>
        </>
  )
}
