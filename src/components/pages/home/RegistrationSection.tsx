/**
 * Registration Section Component
 * ----------------------------
 * Displays a comprehensive registration form for Early Membership signup.
 * Handles wallet connection, payment processing, and platform registration with auto-validated referral address.
 * 
 * Features:
 * - Complete registration form with validation
 * - Wallet connection requirement for registration
 * - Payment widget integration for $100 membership fee via cross-chain payment
 * - Automatic referral address extraction from URL parameters (?ref=...)
 * - Auto-validation of extracted referral address on component mount
 * - "Generate Referral Link" button opens referral dialog for any address
 * - Payment completion handling with success states
 * - Clear pricing and benefits display
 * - RainbowKit-powered wallet connection via CustomConnectButton
 * - Progress indicator showing current membership count
 * - Responsive design with gradient background
 * - Comprehensive error handling and user feedback (success/error messages only)
 * - Scroll-based reveal animation
 * - Aggressive logging for debugging registration flow
 * 
 * Payment Integration:
 * - Integrated @matching-platform/payment-widget for cross-chain payments
 * - Accepts any asset and delivers 100 USDC on Base Mainnet
 * - Payment widget supports bridge, swap, and direct payment modes
 * - Real-time payment tracking and status updates
 * - Automatic completion handling on successful payment
 */

"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { useAccount } from "wagmi"
import { CheckCircle, Loader2, AlertCircle, Check, Share2 } from "lucide-react"
import type { Address } from "viem"
import { PaymentWidget, type PaymentConfig } from "@matching-platform/payment-widget"

import { logger } from "@/lib/logger"
import { isEthereumAddress, extractReferralFromURL } from "@/lib/referrals"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MEMBERSHIP_PROGRESS } from "./types"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import { ConfettiStars } from "@/components/ui/confetti-stars"
import { ReferralLinkDialog } from "./ReferralLinkDialog"

interface RegistrationSectionProps {
  motionReduced: boolean
}

interface FormData {
  referralAddress: string
}

interface FormErrors {
  referralAddress?: string
  general?: string
}

interface RegistrationState {
  isSubmitting: boolean
  isSubmitted: boolean
  errors: FormErrors
}


/**
 * Renders a comprehensive registration form for Early Membership signup.
 * Handles wallet connection, form validation, and platform registration with optional referral address.
 * Uses CustomConnectButton for reliable wallet connection and includes proper form state management.
 * 
 * @param motionReduced - Whether animations should be reduced
 */
export function RegistrationSection({ motionReduced }: RegistrationSectionProps) {
  logger.info("component:memes:registration:render", { motionReduced })

  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<FormData>(() => {
    // Load form data from localStorage on component mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('asty-registration-form')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (error) {
          logger.warn("registration:form:localStorage:parse-error", { error })
        }
      }
    }
    return { referralAddress: "" }
  })
  
  const [registrationState, setRegistrationState] = useState<RegistrationState>({
    isSubmitting: false,
    isSubmitted: false,
    errors: {}
  })

  const { address } = useAccount()

  const [autoExtractedReferral, setAutoExtractedReferral] = useState<string | null>(null)
  const [referralExtractionError, setReferralExtractionError] = useState<string | null>(null)
  
  // Dialog state for referral link generation
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false)
  
  // Payment dialog state
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  // Payment configuration for $100 USD
  const paymentConfig = useMemo(() => {
    // Only create config if address is available
    if (!address) {
      return null
    }

    // Using the deposit token address from environment, fallback to USDC on Base
    const depositTokenAddress = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN_ADDRESS || "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    
    // 100 USDC = 100 * 1e6 (USDC has 6 decimals)
    const targetAmount = BigInt(100 * 1_000_000) // 100 USDC
    
    logger.info("payment-widget:config:creating", { 
      targetTokenAddress: depositTokenAddress,
      targetChainId: 8453,
      targetAmount: targetAmount.toString(),
      recipient: address 
    })
    
    return {
      targetTokenAddress: depositTokenAddress as Address,
      targetChainId: 8453, // Base Mainnet
      targetAmount,
      targetRecipient: address as Address,
    } as PaymentConfig
  }, [address])

  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Validates the referral address input with enhanced checks
   * @param inputAddress - The referral address to validate
   * @returns Error message if invalid, undefined if valid
   */
  const validateReferralAddress = useCallback((inputAddress: string): string | undefined => {
    const trimmedAddress = inputAddress.trim()
    
    if (!trimmedAddress) return undefined // Optional field
    
    // Check if it's a valid Ethereum address
    if (!isEthereumAddress(trimmedAddress)) {
      logger.warn("registration:validate-referral:invalid-format", { address: trimmedAddress })
      return "Please enter a valid Ethereum address (0x followed by 40 hex characters)"
    }
    
    // Check if it's the same as the connected wallet
    if (address && trimmedAddress.toLowerCase() === address.toLowerCase()) {
      logger.warn("registration:validate-referral:self-referral", { address: trimmedAddress })
      return "Referral address cannot be the same as your wallet address"
    }
    
    // Check minimum length for basic validation
    if (trimmedAddress.length < 42) {
      logger.warn("registration:validate-referral:too-short", { length: trimmedAddress.length })
      return "Ethereum address must be 42 characters long"
    }
    
    return undefined
  }, [address])

  // Extract and validate referral address from URL on mount
  useEffect(() => {
    if (mounted) {
      const extractedRef = extractReferralFromURL()
      
      if (extractedRef) {
        logger.info("registration:auto-extract-referral:extracted", { referral: extractedRef })
        
        // Full validation using validateReferralAddress
        const validationError = validateReferralAddress(extractedRef)
        
        if (validationError) {
          logger.warn("registration:auto-extract-referral:validation-failed", { 
            referral: extractedRef, 
            error: validationError 
          })
          setReferralExtractionError(validationError)
          setAutoExtractedReferral(null)
        } else if (address && extractedRef.toLowerCase() === address.toLowerCase()) {
          logger.warn("registration:auto-extract-referral:self-referral", { referral: extractedRef })
          setReferralExtractionError("Referral address cannot be the same as your wallet address")
          setAutoExtractedReferral(null)
        } else {
          logger.info("registration:auto-extract-referral:success", { referral: extractedRef })
          setAutoExtractedReferral(extractedRef)
          setReferralExtractionError(null)
          // Update formData with the extracted referral
          setFormData(prev => ({ ...prev, referralAddress: extractedRef }))
        }
      } else {
        logger.debug("registration:auto-extract-referral:no-referral")
        setAutoExtractedReferral(null)
        setReferralExtractionError(null)
      }
    }
  }, [mounted, address, validateReferralAddress])

  const isWalletConnected = mounted && Boolean(address)
  const isRegistered = registrationState.isSubmitted


  // Clear general error when wallet connects
  useEffect(() => {
    if (isWalletConnected && registrationState.errors.general) {
      setRegistrationState(prev => ({
        ...prev,
        errors: { ...prev.errors, general: undefined }
      }))
    }
  }, [isWalletConnected, registrationState.errors.general])

  // Persist form data to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('asty-registration-form', JSON.stringify(formData))
    }
  }, [formData])

  /**
   * Validates the entire form
   * @returns Object containing validation errors
   */
  const validateForm = useCallback((): FormErrors => {
    const errors: FormErrors = {}
    
    const referralError = validateReferralAddress(formData.referralAddress)
    if (referralError) {
      errors.referralAddress = referralError
    }

    logger.debug("registration:form:validation", { 
      formData, 
      errors,
      hasErrors: Object.keys(errors).length > 0
    })

    return errors
  }, [formData, validateReferralAddress])

  /**
   * Handles form submission for platform registration
   */
  const handleSubmit = useCallback(async () => {
    logger.info("registration:form:submit:start", { 
      walletConnected: isWalletConnected,
      referralAddress: formData.referralAddress 
    })

    if (!isWalletConnected) {
      logger.warn("registration:form:submit:no-wallet")
      setRegistrationState(prev => ({
        ...prev,
        errors: { general: "Please connect your wallet to register" }
      }))
      return
    }

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      logger.warn("registration:form:submit:validation-failed", { errors })
      setRegistrationState(prev => ({ ...prev, errors }))
      return
    }

    // Set submitting state
    setRegistrationState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      errors: {}
    }))

    try {
      // Simulate API call for registration
      logger.info("registration:form:submit:api-call", {
        walletAddress: address,
        referralAddress: formData.referralAddress || null
      })

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      logger.info("registration:form:submit:success", {
        walletAddress: address,
        referralAddress: formData.referralAddress || null
      })

      setRegistrationState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true
      }))

    } catch (error) {
      logger.error("registration:form:submit:error", { 
        error: error instanceof Error ? error.message : String(error)
      })
      
      setRegistrationState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: { 
          general: "Registration failed. Please try again." 
        }
      }))
    }
  }, [isWalletConnected, formData, validateForm, address])

  return (
    <aside
      className="reveal-section relative overflow-hidden rounded-[2.75rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20 p-6 shadow-[0_24px_60px_rgba(20,16,48,0.35)] sm:p-8"
      data-animate-on-scroll
      data-visible="false"
    >
      {/* Decorative background elements */}
      <DecorativeBackground variant="sidebar" className="opacity-70" />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Secure Your Position
          </h3>
          <p className="text-sm text-muted-foreground">
            Stage 1 positions are open—join {MEMBERSHIP_PROGRESS[0].value} members powering the Asty Network
          </p>
        </div>

        {/* Registration Form */}
        <Card className="mb-6 border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-foreground">Early Membership</CardTitle>
            <CardDescription className="text-muted-foreground">
              $100 lifetime position • 12-level referral network • Lifetime income engine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isRegistered ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                {/* General Error Alert */}
                {registrationState.errors.general && (
                  <Alert variant="destructive" className="border-red-400/50 bg-red-400/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-400">
                      {registrationState.errors.general}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Auto-extracted Referral Status Messages */}
                {referralExtractionError && (
                  <Alert variant="destructive" className="border-red-400/50 bg-red-400/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-400">
                      {referralExtractionError}
                    </AlertDescription>
                  </Alert>
                )}

                {autoExtractedReferral && !referralExtractionError && (
                  <Alert className="border-green-400/50 bg-green-400/10">
                    <Check className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-400">
                      Referral address detected: {autoExtractedReferral.slice(0, 6)}...{autoExtractedReferral.slice(-4)}
                    </AlertDescription>
                  </Alert>
                )}
                
                {/* Single Button Display */}
                <div className="space-y-3">
                  {!isWalletConnected ? (
                    <>
                      <CustomConnectButton 
                        className="w-full"
                        size="sm"
                        connectLabel="Connect Wallet / Register"
                        variant={{
                          connected: 'default',
                          connect: 'default',
                          wrongNetwork: 'destructive',
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => setIsReferralDialogOpen(true)}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Generate Referral Link
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        type="button"
                        onClick={() => setIsPaymentDialogOpen(true)}
                        className="w-full"
                        size="sm"
                        disabled={registrationState.isSubmitting}
                      >
                        {registrationState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : !paymentConfig ? (
                          'Connect Wallet to Pay'
                        ) : (
                          'Pay $100 for Early Membership'
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsReferralDialogOpen(true)}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Generate Referral Link
                      </Button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Stage 1 is your chance to lock in lifetime income before the network opens to everyone.
                </p>

              </form>
            ) : (
              <div className="text-center space-y-6">
                {/* Confetti Animation */}
                <ConfettiStars autoTrigger={true} delay={300} />
                
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
                    <CheckCircle className="h-8 w-8 text-green-400 relative z-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-foreground">
                    🎉 Stage 1 Spot Secured!
                  </h4>
                </div>
                {formData.referralAddress && (
                  <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 font-medium mb-1">Referral Credit Applied</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {formData.referralAddress.slice(0, 6)}...{formData.referralAddress.slice(-4)}
                    </p>
                  </div>
                )}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
                    <span>✓ $100 Lifetime Position</span>
                    <span>✓ 12-Level Referral Network</span>
                    <span>✓ Lifetime Income Engine</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-[0_10px_25px_rgba(12,8,32,0.25)] backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-2">
              Stage 1 Progress
            </p>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-foreground">
                {MEMBERSHIP_PROGRESS[0].value}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-2xl font-bold text-primary">
                {MEMBERSHIP_PROGRESS[1].value}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(Number(MEMBERSHIP_PROGRESS[0].value) / Number(MEMBERSHIP_PROGRESS[1].value)) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {MEMBERSHIP_PROGRESS[1].value} memberships unlock the presale
            </p>
          </div>
        </div>
      </div>
      
      {/* Referral Link Dialog */}
      <ReferralLinkDialog 
        open={isReferralDialogOpen}
        onOpenChange={setIsReferralDialogOpen}
      />
      
      {/* Payment Dialog */}
      {isWalletConnected && paymentConfig && (
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <PaymentWidget
                paymentConfig={paymentConfig}
                onPaymentComplete={(reference) => {
                  logger.info("payment-widget:payment-complete", { reference })
                  setIsPaymentDialogOpen(false)
                  setRegistrationState({
                    isSubmitting: false,
                    isSubmitted: true,
                    errors: {}
                  })
                }}
                onPaymentFailed={(error) => {
                  logger.error("payment-widget:payment-failed", { error })
                  setIsPaymentDialogOpen(false)
                  setRegistrationState(prev => ({
                    ...prev,
                    errors: { general: error }
                  }))
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </aside>
  )
}
