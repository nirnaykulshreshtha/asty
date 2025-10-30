"use client"

/**
 * Registration Section Container
 * ------------------------------
 * Coordinates the Early Membership registration flow by managing form state,
 * referral extraction, payment widget integration, and success handling. The
 * component delegates presentation responsibilities to smaller, focused
 * components located in the same directory for easier maintenance.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi"
import { BaseError, formatUnits, zeroAddress, type Address } from "viem"
import { encodeCalls, type PaymentConfig } from "@matching-platform/payment-widget"

import { logger } from "@/lib/logger"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReferralLinkDialog } from "../ReferralLinkDialog"
import { MEMBERSHIP_PROGRESS } from "../types"
import { erc20Abi } from "@/abis/erc20"
import { referralContractAbi } from "@/abis/referral"
import { extractReferralFromURL, isEthereumAddress } from "@/lib/referrals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  RegistrationFormData,
  RegistrationFormErrors,
  RegistrationSectionProps,
  RegistrationState,
  RegistrationUserSnapshot,
  RegistrationWithdrawalState,
} from "./types"
import { RegistrationHeader } from "./RegistrationHeader"
import { RegistrationForm } from "./RegistrationForm"
import { RegistrationSuccess } from "./RegistrationSuccess"
import { RegistrationProgressIndicator } from "./RegistrationProgressIndicator"
import { RegistrationPaymentDialog } from "./RegistrationPaymentDialog"
import { RegistrationWithdrawalSection } from "./RegistrationWithdrawalSection"

const ZERO_BIGINT = BigInt(0)

/**
 * Helper to map the tuple returned by the referral smart contract's getUser()
 * into our RegistrationUserSnapshot structure.
 * @param raw userDataRaw value (tuple/array from contract, or undefined/null)
 * @returns RegistrationUserSnapshot or undefined
 */
function mapUserDataRaw(raw: unknown): RegistrationUserSnapshot | undefined {
  if (!raw || !Array.isArray(raw) || raw.length < 4) return undefined;
  return {
    referrer: raw[0],
    accruedRewards: BigInt(raw[1]),
    registered: Boolean(raw[2]),
    directReferralCount: BigInt(raw[3]),
  };
}

/**
 * Renders a comprehensive registration form for Early Membership signup.
 * Handles wallet connection, form validation, and platform registration with
 * optional referral address. Uses CustomConnectButton for reliable wallet
 * connection and includes proper form state management.
 */
export function RegistrationSection({ motionReduced }: RegistrationSectionProps) {
  logger.info("component:memes:registration:render", { motionReduced })

  const depositTokenAddress = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN_ADDRESS as Address | undefined
  const referralContractAddress = process.env.NEXT_PUBLIC_REFERRAL_CONTRACT as Address | undefined
  const depositTokenSymbol = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN_SYMBOL ?? "USDC"

  const targetChainId = useMemo(() => {
    const fallback = 8453
    const raw = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID
    if (!raw) {
      logger.warn("registration:chain-id:fallback", { fallback })
      return fallback
    }

    const parsed = Number.parseInt(raw, 10)
    if (Number.isNaN(parsed)) {
      logger.error("registration:chain-id:parse-error", { raw, fallback })
      return fallback
    }

    return parsed
  }, [])

  const depositTokenDecimals = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN_DECIMALS
    if (!raw) {
      return 6
    }

    const parsed = Number.parseInt(raw, 10)
    if (Number.isNaN(parsed)) {
      logger.error("registration:deposit-token:decimals-parse-error", { raw })
      return 6
    }

    return parsed
  }, [])

  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<RegistrationFormData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("asty-registration-form")
      if (saved) {
        try {
          return JSON.parse(saved) as RegistrationFormData
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
  })

  const { address } = useAccount()
  const publicClient = usePublicClient({ chainId: targetChainId })
  const { writeContractAsync } = useWriteContract()

  const [autoExtractedReferral, setAutoExtractedReferral] = useState<string | null>(null)
  const [referralExtractionError, setReferralExtractionError] = useState<string | null>(null)
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [withdrawalState, setWithdrawalState] = useState<RegistrationWithdrawalState>({
    isProcessing: false,
    error: null,
    lastTransactionHash: null,
    wasSuccessful: false,
  })
  const [hasShownConfetti, setHasShownConfetti] = useState(false)
  const [shouldShowConfetti, setShouldShowConfetti] = useState(false)
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (!referralContractAddress) {
      logger.error("registration:contract-address:missing")
    }
    if (!depositTokenAddress) {
      logger.error("registration:deposit-token-address:missing")
    }
  }, [referralContractAddress, depositTokenAddress])

  const {
    data: userDataRaw,
    refetch: refetchUserData,
  } = useReadContract({
    chainId: targetChainId,
    address: (referralContractAddress ?? zeroAddress) as Address,
    abi: referralContractAbi.abi,
    functionName: "getUser",
    args: address ? [address as Address] : undefined,
    query: {
      enabled: Boolean(address && referralContractAddress),
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  })

  console.log('userDataRaw', userDataRaw)

  const {
    data: totalRegisteredUsersRaw,
    refetch: refetchTotalRegisteredUsers,
  } = useReadContract({
    chainId: targetChainId,
    address: (referralContractAddress ?? zeroAddress) as Address,
    abi: referralContractAbi.abi,
    functionName: "totalRegisteredUsers",
    query: {
      enabled: Boolean(referralContractAddress),
      staleTime: 30_000,
      refetchInterval: 30_000,
    },
  })

  const forceWithdrawalPreview = process.env.NEXT_PUBLIC_FORCE_WITHDRAWAL_PREVIEW === "true"

  const userData = useMemo<RegistrationUserSnapshot | undefined>(() => {
    if (forceWithdrawalPreview) {
      logger.warn("registration:preview:force-withdrawal-enabled")
      return {
        referrer: zeroAddress,
        // Example: 250_000 with 6 decimals = 0.25 tokens (e.g., USDC)
        accruedRewards: BigInt(250_000),
        registered: true,
        directReferralCount: BigInt(12),
      }
    }
    // Map the userDataRaw to a typed object
    return mapUserDataRaw(userDataRaw)
  }, [forceWithdrawalPreview, userDataRaw])

  console.log('userData', userData)

  const totalRegisteredUsers = totalRegisteredUsersRaw ?? null

  const paymentConfig = useMemo(() => {
    if (!depositTokenAddress || !referralContractAddress) {
      logger.error("payment-widget:config:missing-env", {
        depositTokenAddress,
        referralContractAddress,
      })
      return null
    }

    if (!address) {
      return null
    }

    const targetAmount = process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? BigInt(1 * 1_000_000) : BigInt(100 * 1_000_000)

    logger.info("payment-widget:config:creating", {
      targetTokenAddress: depositTokenAddress,
      targetChainId,
      targetAmount: targetAmount.toString(),
      recipient: referralContractAddress,
    })

    const calls = [
      {
        target: depositTokenAddress,
        functionName: "approve",
        args: [referralContractAddress, targetAmount],
        abi: erc20Abi.abi,
      },
      {
        target: referralContractAddress,
        functionName: "depositFor",
        args: [address, formData.referralAddress ? (formData.referralAddress as Address) : (zeroAddress as Address)],
        abi: referralContractAbi.abi,
      },
    ]

    logger.debug("payment-widget:config:calls-prepared", { callCount: calls.length })

    const targetContractCalls = encodeCalls(calls)

    return {
      targetTokenAddress: depositTokenAddress,
      targetChainId,
      targetAmount,
      targetRecipient: referralContractAddress as Address,
      targetContractCalls,
      fallbackRecipient: address,
    } as PaymentConfig
  }, [address, depositTokenAddress, referralContractAddress, targetChainId, formData.referralAddress])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setWithdrawalState({
      isProcessing: false,
      error: null,
      lastTransactionHash: null,
      wasSuccessful: false,
    })
  }, [address])

  const formatBigIntWithGrouping = useCallback((value: bigint): string => {
    const stringValue = value.toString()
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }, [])

  const formatRewards = useCallback(
    (amount: bigint): string => {
      if (amount === ZERO_BIGINT) {
        return "0.00"
      }

      const decimalString = formatUnits(amount, depositTokenDecimals)
      const numeric = Number.parseFloat(decimalString)
      if (!Number.isFinite(numeric)) {
        logger.warn("registration:rewards:format-failed", {
          amount: amount.toString(),
          depositTokenDecimals,
        })
        return decimalString
      }

      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numeric)
    },
    [depositTokenDecimals],
  )

  const validateReferralAddress = useCallback(
    (inputAddress: string): string | undefined => {
      const trimmedAddress = inputAddress.trim()

      if (!trimmedAddress) return undefined

      if (!isEthereumAddress(trimmedAddress)) {
        logger.warn("registration:validate-referral:invalid-format", { address: trimmedAddress })
        return "Please enter a valid Ethereum address (0x followed by 40 hex characters)"
      }

      if (address && trimmedAddress.toLowerCase() === address.toLowerCase()) {
        logger.warn("registration:validate-referral:self-referral", { address: trimmedAddress })
        return "Referral address cannot be the same as your wallet address"
      }

      if (trimmedAddress.length < 42) {
        logger.warn("registration:validate-referral:too-short", { length: trimmedAddress.length })
        return "Ethereum address must be 42 characters long"
      }

      return undefined
    },
    [address],
  )

  useEffect(() => {
    if (!mounted) {
      return
    }

    const extractedRef = extractReferralFromURL()

    if (!extractedRef) {
      logger.debug("registration:auto-extract-referral:no-referral")
      setAutoExtractedReferral(null)
      setReferralExtractionError(null)
      return
    }

    logger.info("registration:auto-extract-referral:extracted", { referral: extractedRef })

    const validationError = validateReferralAddress(extractedRef)

    if (validationError) {
      logger.warn("registration:auto-extract-referral:validation-failed", {
        referral: extractedRef,
        error: validationError,
      })
      setReferralExtractionError(validationError)
      setAutoExtractedReferral(null)
      return
    }

    if (address && extractedRef.toLowerCase() === address.toLowerCase()) {
      logger.warn("registration:auto-extract-referral:self-referral", { referral: extractedRef })
      setReferralExtractionError("Referral address cannot be the same as your wallet address")
      setAutoExtractedReferral(null)
      return
    }

    logger.info("registration:auto-extract-referral:success", { referral: extractedRef })
    setAutoExtractedReferral(extractedRef)
    setReferralExtractionError(null)
    setFormData((previous) => ({ ...previous, referralAddress: extractedRef }))
  }, [mounted, address, validateReferralAddress])

  const isWalletConnected = mounted && Boolean(address)
  const registeredOnChain = userData?.registered ?? false
  const isRegistered = registrationState.isSubmitted || registeredOnChain

  const hasWithdrawableRewards = Boolean(userData && userData.accruedRewards > ZERO_BIGINT)

  const directReferralCountDisplay = useMemo(
    () => formatBigIntWithGrouping(userData?.directReferralCount ?? ZERO_BIGINT),
    [userData?.directReferralCount, formatBigIntWithGrouping],
  )

  const accruedRewardsDisplay = useMemo(
    () => formatRewards(userData?.accruedRewards ?? ZERO_BIGINT),
    [userData?.accruedRewards, formatRewards],
  )

  const membershipCountDisplay = useMemo(() => {
    if (totalRegisteredUsers !== null) {
      return formatBigIntWithGrouping(totalRegisteredUsers)
    }
    return MEMBERSHIP_PROGRESS[0].value
  }, [totalRegisteredUsers, formatBigIntWithGrouping])

  useEffect(() => {
    if (registeredOnChain) {
      setRegistrationState((previous) => {
        if (previous.isSubmitted && !previous.isSubmitting) {
          return previous
        }

        return {
          ...previous,
          isSubmitting: false,
          isSubmitted: true,
        }
      })
    }
  }, [registeredOnChain])

  useEffect(() => {
    if (isWalletConnected && registrationState.errors.general) {
      setRegistrationState((previous) => ({
        ...previous,
        errors: { ...previous.errors, general: undefined },
      }))
    }
  }, [isWalletConnected, registrationState.errors.general])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("asty-registration-form", JSON.stringify(formData))
    }
  }, [formData])

  // --- Remove previous confetti auto-trigger effect (lines 421–443)
  // Instead, trigger confetti ONLY inside handlePaymentComplete below

  const validateForm = useCallback((): RegistrationFormErrors => {
    const errors: RegistrationFormErrors = {}

    const referralError = validateReferralAddress(formData.referralAddress)
    if (referralError) {
      errors.referralAddress = referralError
    }

    logger.debug("registration:form:validation", {
      formData,
      errors,
      hasErrors: Object.keys(errors).length > 0,
    })

    return errors
  }, [formData, validateReferralAddress])

  const handleSubmit = useCallback(async () => {
    logger.info("registration:form:submit:start", {
      walletConnected: isWalletConnected,
      referralAddress: formData.referralAddress,
    })

    if (isRegistered) {
      logger.warn("registration:form:submit:already-registered", { address })
      setRegistrationState((previous) => ({
        ...previous,
        errors: {
          general: "You are already registered.",
        },
      }))
      return
    }

    if (!isWalletConnected) {
      logger.warn("registration:form:submit:no-wallet")
      setRegistrationState((previous) => ({
        ...previous,
        errors: { general: "Please connect your wallet to register" },
      }))
      return
    }

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      logger.warn("registration:form:submit:validation-failed", { errors })
      setRegistrationState((previous) => ({ ...previous, errors }))
      return
    }

    setRegistrationState((previous) => ({
      ...previous,
      isSubmitting: true,
      errors: {},
    }))

    try {
      logger.info("registration:form:submit:api-call", {
        walletAddress: address,
        referralAddress: formData.referralAddress || null,
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      logger.info("registration:form:submit:success", {
        walletAddress: address,
        referralAddress: formData.referralAddress || null,
      })

      setRegistrationState((previous) => ({
        ...previous,
        isSubmitting: false,
        isSubmitted: true,
      }))
    } catch (error) {
      logger.error("registration:form:submit:error", {
        error: error instanceof Error ? error.message : String(error),
      })

      setRegistrationState((previous) => ({
        ...previous,
        isSubmitting: false,
        errors: {
          general: "Registration failed. Please try again.",
        },
      }))
    }
  }, [isWalletConnected, formData, validateForm, address, isRegistered]);

  const handleOpenReferralDialog = useCallback(() => setIsReferralDialogOpen(true), [])

  const handleOpenPaymentDialog = useCallback(() => {
    logger.info("registration:payment-dialog:open-request", {
      walletConnected: isWalletConnected,
      hasPaymentConfig: Boolean(paymentConfig),
      alreadyRegistered: isRegistered,
    })
    if (isRegistered) {
      logger.warn("registration:payment-dialog:already-registered", { address })
      return
    }
    if (!paymentConfig) {
      logger.warn("registration:payment-dialog:no-config")
      return
    }
    setIsPaymentDialogOpen(true)
  }, [isWalletConnected, paymentConfig, isRegistered, address]);

  const handlePaymentComplete = useCallback(
    (reference: string) => {
      logger.info("payment-widget:payment-complete", { reference })
      setIsPaymentDialogOpen(false)
      setRegistrationState({
        isSubmitting: false,
        isSubmitted: true,
        errors: {},
      })
      setHasShownConfetti(true)
      setShouldShowConfetti(true)
      setTimeout(() => {
        setShouldShowConfetti(false)
      }, 800)
      void refetchUserData()
      void refetchTotalRegisteredUsers()
    },
    [refetchUserData, refetchTotalRegisteredUsers],
  )

  const handlePaymentFailed = useCallback(
    (error: string) => {
      logger.error("payment-widget:payment-failed", { error })
      setIsPaymentDialogOpen(false)
      setRegistrationState((previous) => ({
        ...previous,
        errors: { general: error },
      }))
    },
    [],
  )

  const handleWithdrawRewards = useCallback(async () => {
    logger.info("registration:withdraw:start", {
      walletConnected: isWalletConnected,
      hasRewards: hasWithdrawableRewards,
    })

    if (!isWalletConnected || !address) {
      setWithdrawalState((previous) => ({
        ...previous,
        error: "Connect your wallet to withdraw rewards.",
        wasSuccessful: false,
      }))
      logger.warn("registration:withdraw:no-wallet")
      return
    }

    if (!referralContractAddress) {
      setWithdrawalState((previous) => ({
        ...previous,
        error: "Referral contract address missing. Please contact support.",
        wasSuccessful: false,
      }))
      logger.error("registration:withdraw:missing-contract")
      return
    }

    if (!hasWithdrawableRewards) {
      setWithdrawalState((previous) => ({
        ...previous,
        error: "No rewards available to withdraw yet.",
        wasSuccessful: false,
      }))
      logger.warn("registration:withdraw:no-rewards", { address })
      return
    }

    setWithdrawalState({
      isProcessing: true,
      error: null,
      lastTransactionHash: null,
      wasSuccessful: false,
    })

    try {
      const hash = await writeContractAsync({
        chainId: targetChainId,
        address: referralContractAddress,
        abi: referralContractAbi.abi,
        functionName: "withdrawRewards",
      })

      logger.info("registration:withdraw:submitted", { hash })

      if (publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        logger.info("registration:withdraw:confirmed", {
          hash,
          status: receipt.status,
        })
      }

      setWithdrawalState({
        isProcessing: false,
        error: null,
        lastTransactionHash: hash,
        wasSuccessful: true,
      })

      void refetchUserData()
    } catch (error) {
      const errorMessage = error instanceof BaseError
        ? error.shortMessage ?? error.message
        : error instanceof Error
          ? error.message
          : String(error)

      logger.error("registration:withdraw:error", { error: errorMessage })

      setWithdrawalState({
        isProcessing: false,
        error: errorMessage,
        lastTransactionHash: null,
        wasSuccessful: false,
      })
    }
  }, [
    isWalletConnected,
    address,
    referralContractAddress,
    hasWithdrawableRewards,
    writeContractAsync,
    targetChainId,
    publicClient,
    refetchUserData,
  ])

  return (
    <aside
      className="reveal-section relative overflow-hidden rounded-[2.75rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20 p-6 shadow-[0_24px_60px_rgba(20,16,48,0.35)] sm:p-8"
      data-animate-on-scroll
      data-visible="false"
    >
      <DecorativeBackground variant="sidebar" className="opacity-70" />

      <div className="relative flex h-full flex-col">
        <RegistrationHeader currentMembershipCount={membershipCountDisplay} />

        {!isRegistered ? (
          <Card className="mb-6 border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-foreground">Early Membership</CardTitle>
              <CardDescription className="text-muted-foreground">
                $100 lifetime position • 12-level referral network • Lifetime income engine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegistrationForm
                registrationState={registrationState}
                autoExtractedReferral={autoExtractedReferral}
                referralExtractionError={referralExtractionError}
                isWalletConnected={isWalletConnected}
                isPaymentConfigAvailable={Boolean(paymentConfig)}
                onSubmit={handleSubmit}
                onOpenReferralDialog={handleOpenReferralDialog}
                onOpenPaymentDialog={handleOpenPaymentDialog}
              />
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="status" className="mb-6">
            <TabsList className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5">
              <TabsTrigger
                value="status"
                className="rounded-2xl text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/40 data-[state=active]:bg-background data-[state=active]:text-primary"
              >
                Membership
              </TabsTrigger>
              <TabsTrigger
                value="rewards"
                className="rounded-2xl text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/40 data-[state=active]:bg-background data-[state=active]:text-primary"
              >
                Referral Rewards
              </TabsTrigger>
            </TabsList>
            <TabsContent value="status" className="mt-4">
              <Card className="border-white/10 bg-white/5 backdrop-blur gap-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-foreground">Membership Status</CardTitle>
                  {/* <CardDescription className="text-muted-foreground">
                    Snapshot of your Early Membership confirmation and referral metrics.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <RegistrationSuccess
                    referralAddress={formData.referralAddress}
                    directReferralCountDisplay={directReferralCountDisplay}
                    accruedRewardsDisplay={accruedRewardsDisplay}
                    depositTokenSymbol={depositTokenSymbol}
                    showConfetti={shouldShowConfetti}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rewards" className="mt-4">
              <RegistrationWithdrawalSection
                className="mb-0"
                availableRewardsDisplay={accruedRewardsDisplay}
                hasWithdrawableRewards={hasWithdrawableRewards}
                depositTokenSymbol={depositTokenSymbol}
                directReferralCountDisplay={directReferralCountDisplay}
                isWithdrawing={withdrawalState.isProcessing}
                withdrawalError={withdrawalState.error}
                withdrawalSuccess={withdrawalState.wasSuccessful}
                onWithdraw={handleWithdrawRewards}
              />
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-auto">
          <RegistrationProgressIndicator
            currentValue={membershipCountDisplay}
            targetValue={MEMBERSHIP_PROGRESS[1].value}
          />
        </div>
      </div>

      <ReferralLinkDialog open={isReferralDialogOpen} onOpenChange={setIsReferralDialogOpen} />

      <RegistrationPaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        paymentConfig={paymentConfig}
        isWalletConnected={isWalletConnected}
        onPaymentComplete={handlePaymentComplete}
        onPaymentFailed={handlePaymentFailed}
      />
    </aside>
  )
}

