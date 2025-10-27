/**
 * Registration Section Component
 * ----------------------------
 * Displays a comprehensive registration form for Early Membership signup.
 * Handles wallet connection, form validation, and platform registration with optional referral address.
 * 
 * Features:
 * - Complete registration form with validation
 * - Wallet connection requirement for registration
 * - Optional referral address input with real-time validation
 * - Form submission handling with loading states
 * - Clear pricing and benefits display
 * - RainbowKit-powered wallet connection via CustomConnectButton
 * - Progress indicator showing current membership count
 * - Responsive design with gradient background
 * - Comprehensive error handling and user feedback
 * - Scroll-based reveal animation
 * - Aggressive logging for debugging registration flow
 */

"use client"

import { useState, useCallback, useEffect } from "react"
import { useAccount } from "wagmi"
import { CheckCircle, Loader2, AlertCircle, Check, X, Wallet, UserPlus, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { isEthereumAddress } from "@/lib/referrals"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { MEMBERSHIP_PROGRESS } from "./types"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import { ReferralLinkCard } from "./ReferralLinkCard"
import { ConfettiStars } from "@/components/ui/confetti-stars"

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
  currentStep: 'wallet' | 'referral' | 'register' | 'success'
}

interface StepIndicatorProps {
  currentStep: string
  steps: Array<{ id: string; label: string; icon: React.ReactNode; completed: boolean }>
}

/**
 * Step Indicator Component
 * 
 * Displays a visual progress indicator for the registration process.
 * Shows current step and completed steps with appropriate icons and styling.
 * 
 * @param currentStep - The current active step
 * @param steps - Array of step definitions with labels and icons
 */
function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center space-x-4 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background/50 border-muted-foreground/30 text-muted-foreground">
              {step.icon}
            </div>
            <span className="ml-2 text-xs font-medium text-muted-foreground">
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className="w-8 h-0.5 mx-2 bg-muted-foreground/30" />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
            step.completed 
              ? "bg-green-500 border-green-500 text-white" 
              : step.id === currentStep
              ? "bg-primary border-primary text-white"
              : "bg-background/50 border-muted-foreground/30 text-muted-foreground"
          )}>
            {step.completed ? (
              <Check className="w-4 h-4" />
            ) : (
              step.icon
            )}
          </div>
          <span className={cn(
            "ml-2 text-xs font-medium transition-colors duration-300",
            step.completed || step.id === currentStep
              ? "text-foreground"
              : "text-muted-foreground"
          )}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-8 h-0.5 mx-2 transition-colors duration-300",
              step.completed ? "bg-green-500" : "bg-muted-foreground/30"
            )} />
          )}
        </div>
      ))}
    </div>
  )
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
    errors: {},
    currentStep: 'wallet'
  })

  const { address } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isWalletConnected = mounted && Boolean(address)
  const isRegistered = registrationState.isSubmitted

  // Step management
  useEffect(() => {
    if (isWalletConnected && registrationState.currentStep === 'wallet') {
      setRegistrationState(prev => ({ ...prev, currentStep: 'referral' }))
    }
  }, [isWalletConnected, registrationState.currentStep])

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

  // Define registration steps
  const steps = [
    {
      id: 'wallet',
      label: 'Connect Wallet',
      icon: <Wallet className="w-4 h-4" />,
      completed: isWalletConnected
    },
    {
      id: 'referral',
      label: 'Referral (Optional)',
      icon: <UserPlus className="w-4 h-4" />,
      completed: isWalletConnected && (formData.referralAddress === '' || !registrationState.errors.referralAddress)
    },
    {
      id: 'register',
      label: 'Register',
      icon: <Sparkles className="w-4 h-4" />,
      completed: isRegistered
    }
  ]

  /**
   * Validates the referral address input with enhanced checks
   * @param inputAddress - The referral address to validate
   * @returns Error message if invalid, undefined if valid
   */
  const validateReferralAddress = useCallback((inputAddress: string): string | undefined => {
    if (!inputAddress.trim()) return undefined // Optional field
    
    // Check if it's a valid Ethereum address
    if (!isEthereumAddress(inputAddress)) {
      return "Please enter a valid Ethereum address (0x followed by 40 hex characters)"
    }
    
    // Check if it's the same as the connected wallet
    if (address && inputAddress.toLowerCase() === address.toLowerCase()) {
      return "Referral address cannot be the same as your wallet address"
    }
    
    // Check minimum length for basic validation
    if (inputAddress.length < 42) {
      return "Ethereum address must be 42 characters long"
    }
    
    return undefined
  }, [address])

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
   * Handles form input changes with real-time validation
   * @param field - The field being updated
   * @param value - The new value
   */
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    logger.debug("registration:form:input-change", { field, value })
    
    // Auto-format Ethereum addresses
    let formattedValue = value
    if (field === 'referralAddress' && value && !value.startsWith('0x')) {
      formattedValue = '0x' + value
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Real-time validation for referral address
    if (field === 'referralAddress') {
      const error = validateReferralAddress(formattedValue)
      setRegistrationState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error }
      }))
    } else {
      // Clear errors when user starts typing
      if (registrationState.errors[field]) {
        setRegistrationState(prev => ({
          ...prev,
          errors: { ...prev.errors, [field]: undefined }
        }))
      }
    }

    // Clear general error when user starts interacting with the form
    if (registrationState.errors.general) {
      setRegistrationState(prev => ({
        ...prev,
        errors: { ...prev.errors, general: undefined }
      }))
    }
  }, [registrationState.errors, validateReferralAddress])

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

    // Set submitting state and move to register step
    setRegistrationState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      errors: {},
      currentStep: 'register'
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
        isSubmitted: true,
        currentStep: 'success'
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
            Join {MEMBERSHIP_PROGRESS[0].value} members in the Asty Network
          </p>
        </div>

        {/* Step Indicator */}
        {!isRegistered && (
          <StepIndicator currentStep={registrationState.currentStep} steps={steps} />
        )}

        {/* Registration Form */}
        <Card className="mb-6 border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-foreground">Early Membership</CardTitle>
            <CardDescription className="text-muted-foreground">
              $100 lifetime position • 12-level referral network
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

                {/* Referral Address Input */}
                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-sm font-medium text-foreground">
                    Referral Address (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="referral"
                      type="text"
                      placeholder="0x..."
                      value={formData.referralAddress}
                      onChange={(e) => handleInputChange('referralAddress', e.target.value)}
                      className={cn(
                        "bg-background/50 border-white/10 text-foreground placeholder:text-muted-foreground pr-10",
                        registrationState.errors.referralAddress && "border-red-400/50",
                        formData.referralAddress && !registrationState.errors.referralAddress && "border-green-400/50"
                      )}
                      disabled={registrationState.isSubmitting}
                    />
                    {formData.referralAddress && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {registrationState.errors.referralAddress ? (
                          <X className="w-4 h-4 text-red-400" />
                        ) : (
                          <Check className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    )}
                  </div>
                  {registrationState.errors.referralAddress && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {registrationState.errors.referralAddress}
                    </p>
                  )}
                  {formData.referralAddress && !registrationState.errors.referralAddress && (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Valid Ethereum address
                    </p>
                  )}
                </div>
                
                {/* Single Button Display */}
                <div className="space-y-3">
                  {!isWalletConnected ? (
                    <CustomConnectButton 
                      className="w-full"
                      size="sm"
                      variant={{
                        connected: 'default',
                        connect: 'default',
                        wrongNetwork: 'destructive',
                      }}
                    />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full"
                      size="sm"
                      disabled={registrationState.isSubmitting}
                    >
                      {registrationState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        'Register for Early Membership'
                      )}
                    </Button>
                  )}
                </div>
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
                    🎉 Registration Successful!
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
                    <span>✓ Early Access</span>
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
              Your Referral Link
            </p>
            <ReferralLinkCard />
          </div>
        </div>
      </div>
    </aside>
  )
}
