/**
 * Referral Link Dialog Component
 * ------------------------------
 * Displays referral link generation in a dialog for connected wallets.
 * Handles copy/share operations with comprehensive logging and user feedback.
 * 
 * Features:
 * - Automatic referral link generation based on wallet address
 * - Custom address input for generating referral links for any Ethereum address
 * - Real-time address validation with user feedback
 * - Copy to clipboard with fallback support
 * - Web Share API integration with graceful fallback
 * - Clean, focused dialog UI
 * - Wallet connection requirement with helpful messaging
 * - Comprehensive logging for debugging
 */

"use client"

import { useMemo, useState } from "react"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { Check, Copy, Share2, ExternalLink, X } from "lucide-react"

import { logger } from "@/lib/logger"
import { buildReferralLink, isEthereumAddress } from "@/lib/referrals"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"

interface ReferralLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Renders a dialog with referral link generation and sharing functionality.
 * Only displays referral content when a wallet is connected.
 * 
 * @param open - Whether the dialog is open
 * @param onOpenChange - Handler for dialog open/close state changes
 */
export function ReferralLinkDialog({ open, onOpenChange }: ReferralLinkDialogProps) {
  logger.info("component:referral-link-dialog:render", { open })
  
  const [hasCopied, setHasCopied] = useState(false)
  const [customAddress, setCustomAddress] = useState("")
  const [useCustomAddress, setUseCustomAddress] = useState(false)
  const [addressError, setAddressError] = useState<string | null>(null)
  const { address, isConnected } = useAccount()

  const effectiveAddress = useMemo(() => {
    if (useCustomAddress && customAddress) {
      logger.debug("referral-link-dialog:using-custom-address", { customAddress })
      return customAddress
    }
    return address
  }, [useCustomAddress, customAddress, address])

  const referralLink = useMemo(() => {
    if (!effectiveAddress) return ""
    logger.debug("referral-link-dialog:generating-link", { address: effectiveAddress, isCustom: useCustomAddress })
    return buildReferralLink(effectiveAddress)
  }, [effectiveAddress, useCustomAddress])

  const handleCustomAddressChange = (value: string) => {
    logger.debug("referral-link-dialog:custom-address-changed", { value })
    setCustomAddress(value)
    
    if (!value) {
      setAddressError(null)
      return
    }
    
    if (!isEthereumAddress(value)) {
      setAddressError("Invalid Ethereum address format")
      logger.warn("referral-link-dialog:invalid-address-format", { value })
    } else if (address && value.toLowerCase() === address.toLowerCase()) {
      setAddressError("Cannot use your own address. Switch to 'Use My Address' mode instead.")
      logger.warn("referral-link-dialog:own-address-entered", { value })
    } else {
      setAddressError(null)
    }
  }

  const canGenerateLink = () => {
    if (useCustomAddress) {
      if (!customAddress || !isEthereumAddress(customAddress)) {
        return false
      }
      // Don't allow generating link if it's the user's own address
      if (address && customAddress.toLowerCase() === address.toLowerCase()) {
        return false
      }
      return true
    }
    return isConnected && address
  }

  const handleCopyReferral = () => {
    if (!referralLink) {
      logger.warn("referral-link-dialog:copy_no_link")
      return
    }

    let copied = false

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          logger.debug("referral-link-dialog:clipboard_success", { referralLink })
        })
        .catch((error) => {
          logger.warn("referral-link-dialog:clipboard_error", { error })
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
      logger.info("referral-link-dialog:exec_command", { copied })
    } else {
      logger.error("referral-link-dialog:noop")
    }

    setHasCopied(copied)

    if (copied) {
      logger.info("referral-link-dialog:copy_success", { referralLink })
      toast.success("Referral link copied to clipboard")
    } else {
      logger.warn("referral-link-dialog:copy_failed", { referralLink })
      toast.error("Unable to copy referral link")
    }

    setTimeout(() => setHasCopied(false), 2200)
  }

  const handleShare = () => {
    if (!referralLink) {
      logger.warn("referral-link-dialog:share_no_link")
      return
    }

    const sharePayload = {
      title: "Join the Asty Network",
      text: "Secure your Asty membership and earn through the 12-level referral network.",
      url: referralLink,
    }

    logger.info("referral-link-dialog:share_attempt", sharePayload)

    if (navigator.share) {
      navigator
        .share(sharePayload)
        .then(() => {
          toast.success("Referral link shared successfully")
          logger.info("referral-link-dialog:share_success", sharePayload)
        })
        .catch((error) => {
          logger.warn("referral-link-dialog:share_cancel", { error })
        })
      return
    }

    handleCopyReferral()
    toast.message("Share feature not supported", {
      description: "Link copied to clipboard instead.",
    })
    logger.info("referral-link-dialog:share_fallback_to_copy")
  }

  const handleVisitLink = () => {
    if (!referralLink) return
    logger.info("referral-link-dialog:visit_link", { referralLink })
    window.open(referralLink, "_blank", "noopener,noreferrer")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent 
        className="sm:max-w-[500px] border-2 border-primary/20 shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-xs bg-transparent p-1 text-muted-foreground transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-2xl">Generate Your Referral Link</DialogTitle>
          <DialogDescription className="text-base">
            Share your unique link and earn through the 12-level referral network. 
            Each successful referral contributes to your position and unlocks network rewards.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isConnected ? (
            <>
              <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
                <p className="text-sm text-foreground">
                  Connect your wallet to generate your unique referral link and start earning.
                </p>
              </div>
              <CustomConnectButton 
                className="w-full"
                size="default"
                variant={{
                  connected: 'default',
                  connect: 'default',
                  wrongNetwork: 'destructive',
                }}
              />
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={!useCustomAddress ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setUseCustomAddress(false)
                      setAddressError(null)
                      logger.debug("referral-link-dialog:switched-to-my-address")
                    }}
                  >
                    Use My Address
                  </Button>
                  <Button
                    type="button"
                    variant={useCustomAddress ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setUseCustomAddress(true)
                      logger.debug("referral-link-dialog:switched-to-custom-address")
                    }}
                  >
                    Custom Address
                  </Button>
                </div>

                {useCustomAddress && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-address" className="text-sm">
                      Enter Ethereum Address
                    </Label>
                    <Input
                      id="custom-address"
                      type="text"
                      placeholder="0x..."
                      value={customAddress}
                      onChange={(e) => handleCustomAddressChange(e.target.value)}
                      className={addressError ? "border-destructive" : ""}
                    />
                    {addressError && (
                      <p className="text-xs text-destructive">{addressError}</p>
                    )}
                    {customAddress && isEthereumAddress(customAddress) && !addressError && (
                      <p className="text-xs text-green-600 dark:text-green-400">✓ Valid address format</p>
                    )}
                  </div>
                )}

                {canGenerateLink() && (
                  <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-4 border border-primary/20 shadow-sm">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {useCustomAddress ? "Custom Referral Link" : "Your Referral Link"}
                    </p>
                    <p className="break-words text-sm font-mono text-foreground bg-background/50 p-2 rounded border">
                      {referralLink}
                    </p>
                  </div>
                )}
              </div>
              
              {canGenerateLink() && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyReferral}
                    variant="default"
                    size="default"
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
                    size="default"
                    className="flex-1"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </span>
                  </Button>

                  <Button
                    onClick={handleVisitLink}
                    variant="outline"
                    size="default"
                    className="shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {useCustomAddress && !canGenerateLink() && customAddress && (
                <div className="rounded-lg bg-muted/50 border border-border p-3">
                  <p className="text-sm text-muted-foreground">
                    Please enter a valid Ethereum address (0x followed by 40 hex characters)
                  </p>
                </div>
              )}

              {!useCustomAddress && (
                <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 p-4 shadow-sm">
                  <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    How it works
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Share this link with friends and colleagues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Earn <strong className="text-primary">10% USDT + 10% ASTY</strong> on every successful referral</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Build your 12-level network and maximize your rewards</span>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

