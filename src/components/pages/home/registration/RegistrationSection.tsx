"use client"

/**
 * Registration Section Container
 * ------------------------------
 * Coordinates the Early Membership registration flow by managing form state,
 * referral extraction, payment widget integration, and success handling. The
 * component delegates presentation responsibilities to smaller, focused
 * components located in the same directory for easier maintenance. Upon
 * successful deposit completion it now triggers a celebratory welcome dialog
 * with the Asty mascot while keeping confetti logic scoped locally.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAccount, usePublicClient, useReadContract, useWriteContract, useChainId, useSwitchChain } from "wagmi"
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
import { Button } from "@/components/ui/button"
import { RegistrationWelcomeDialog } from "./RegistrationWelcomeDialog"
import { RegistrationLevelDistributionDialog } from "./RegistrationLevelDistributionDialog"

const ZERO_BIGINT = BigInt(0)
const REFERRAL_LEVEL_DEPTH = 12

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
  /**
   * useChainId gets the current connected wallet's chainId.
   * useSwitchChain provides a function to request the wallet to switch to a different network.
   */
  const chainIdCurrent = useChainId();
  const { switchChainAsync, isPending: isSwitchNetworkLoading } = useSwitchChain();

  const [autoExtractedReferral, setAutoExtractedReferral] = useState<string | null>(null)
  const [referralExtractionError, setReferralExtractionError] = useState<string | null>(null)
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false)
  const [isLevelDistributionDialogOpen, setIsLevelDistributionDialogOpen] = useState(false)
  const [withdrawalState, setWithdrawalState] = useState<RegistrationWithdrawalState>({
    isProcessing: false,
    error: null,
    lastTransactionHash: null,
    wasSuccessful: false,
  })
  const [shouldShowConfetti, setShouldShowConfetti] = useState(false)
  const [referralLevelCounts, setReferralLevelCounts] = useState<number[] | null>(null)
  const [referralLevelLoading, setReferralLevelLoading] = useState(false)
  const [referralLevelError, setReferralLevelError] = useState<string | null>(null)

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

  /**
   * Check if the referral address is registered in the contract.
   * This hook queries the contract's getUser function to verify registration status.
   */
  const referralAddressToCheck = useMemo(() => {
    const trimmed = formData.referralAddress?.trim()
    if (!trimmed || !isEthereumAddress(trimmed)) {
      return undefined
    }
    return trimmed as Address
  }, [formData.referralAddress])

  const {
    data: referralUserDataRaw,
    isLoading: isCheckingReferralRegistration,
    refetch: refetchReferralRegistration,
  } = useReadContract({
    chainId: targetChainId,
    address: (referralContractAddress ?? zeroAddress) as Address,
    abi: referralContractAbi.abi,
    functionName: "getUser",
    args: referralAddressToCheck ? [referralAddressToCheck] : undefined,
    query: {
      enabled: Boolean(referralAddressToCheck && referralContractAddress),
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  })

  const referralUserData = useMemo<RegistrationUserSnapshot | undefined>(() => {
    return mapUserDataRaw(referralUserDataRaw)
  }, [referralUserDataRaw])

  const isReferralRegistered = referralUserData?.registered ?? false

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

  /**
   * Determines the effective referral address to use in the contract call.
   * Returns zeroAddress if:
   * - No referral address is provided
   * - Referral address format is invalid
   * - Referral address is not registered in the contract
   * - Referral address is the user's own address (self-referral)
   * 
   * Only returns the actual referral address if it passes all validations.
   */
  const effectiveReferralAddress = useMemo(() => {
    const referralAddr = formData.referralAddress?.trim()
    
    // No referral address provided
    if (!referralAddr) {
      logger.debug("payment-widget:effective-referral:no-referral")
      return zeroAddress
    }

    // Check if format is valid
    if (!isEthereumAddress(referralAddr)) {
      logger.warn("payment-widget:effective-referral:invalid-format", {
        referralAddress: referralAddr,
      })
      return zeroAddress
    }

    // Check for self-referral
    if (address && referralAddr.toLowerCase() === address.toLowerCase()) {
      logger.warn("payment-widget:effective-referral:self-referral", {
        referralAddress: referralAddr,
      })
      return zeroAddress
    }

    // Check if referral is registered in contract
    // Only use the referral if we've confirmed it's registered
    if (referralAddressToCheck && referralAddressToCheck.toLowerCase() === referralAddr.toLowerCase()) {
      if (referralUserDataRaw !== undefined) {
        if (!isReferralRegistered) {
          logger.warn("payment-widget:effective-referral:not-registered", {
            referralAddress: referralAddr,
          })
          return zeroAddress
        }
        // Referral is valid and registered
        logger.info("payment-widget:effective-referral:valid-registered", {
          referralAddress: referralAddr,
        })
        return referralAddr as Address
      } else {
        // Still checking registration status - be conservative and use zeroAddress
        // This prevents using an unregistered referral if check is pending
        logger.debug("payment-widget:effective-referral:check-pending", {
          referralAddress: referralAddr,
        })
        return zeroAddress
      }
    }

    // If we don't have a matching referralAddressToCheck but the format is valid,
    // it might be that the check hasn't started yet - use zeroAddress to be safe
    logger.debug("payment-widget:effective-referral:not-verified", {
      referralAddress: referralAddr,
    })
    return zeroAddress
  }, [
    formData.referralAddress,
    address,
    referralAddressToCheck,
    referralUserDataRaw,
    isReferralRegistered,
  ])

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

    const depositTokenDecimals = Number(process.env.NEXT_PUBLIC_DEPOSIT_TOKEN_DECIMALS ?? 18)

    const targetAmount = process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? BigInt(1 * 10 ** depositTokenDecimals) : BigInt(100 * 10 ** depositTokenDecimals)

    logger.info("payment-widget:config:creating", {
      targetTokenAddress: depositTokenAddress,
      targetChainId,
      targetAmount: targetAmount.toString(),
      recipient: referralContractAddress,
      effectiveReferralAddress: effectiveReferralAddress === zeroAddress ? "zeroAddress (no referral)" : effectiveReferralAddress,
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
        args: [address, effectiveReferralAddress],
        abi: referralContractAbi.abi,
      },
    ]

    logger.debug("payment-widget:config:calls-prepared", {
      callCount: calls.length,
      referralAddress: effectiveReferralAddress === zeroAddress ? "none" : effectiveReferralAddress,
    })

    const targetContractCalls = encodeCalls(calls)

    const appFee = process.env.NEXT_PUBLIC_APP_FEE
    const appFeeRecipient = process.env.NEXT_PUBLIC_APP_FEE_RECIPIENT as Address

    return {
      targetTokenAddress: depositTokenAddress,
      targetChainId,
      targetAmount,
      targetRecipient: referralContractAddress as Address,
      targetContractCalls,
      fallbackRecipient: address,
      appFee: appFee ? Number(appFee) * 10 ** depositTokenDecimals : undefined,
      appFeeRecipient: appFeeRecipient ?? undefined,
    } as PaymentConfig
  }, [address, depositTokenAddress, referralContractAddress, targetChainId, effectiveReferralAddress])

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

  // Reset state when wallet is disconnected
  useEffect(() => {
    if (!address) {
      setRegistrationState({
        isSubmitting: false,
        isSubmitted: false,
        errors: {},
      });
      setFormData({ referralAddress: "" });
      setWithdrawalState({
        isProcessing: false,
        error: null,
        lastTransactionHash: null,
        wasSuccessful: false,
      });
      setAutoExtractedReferral(null);
      setReferralExtractionError(null);
      setShouldShowConfetti(false);
    }
  }, [address]);

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

  /**
   * Validates the referral address format and basic constraints.
   * Note: Registration status check is handled separately via contract query
   * to allow for async validation feedback.
   * 
   * @param inputAddress - The referral address to validate
   * @returns Error message string if validation fails, undefined if valid
   */
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

  /**
   * Validates referral address registration status when a referral address is provided.
   * This effect runs when the referral user data is fetched from the contract.
   * 
   * Flow:
   * 1. When a valid referral address is detected (from URL or manual input), we query the contract
   * 2. Once the query completes, we check the registered status
   * 3. If not registered, we set an error and clear the auto-extracted referral
   * 4. If registered, we clear registration errors and confirm the referral is valid
   */
  useEffect(() => {
    if (!referralAddressToCheck) {
      // No valid referral address to check
      // Don't clear errors here - let format validation handle those
      return
    }

    if (isCheckingReferralRegistration) {
      logger.debug("registration:referral-registration:checking", {
        referralAddress: referralAddressToCheck,
      })
      return
    }

    // Check if referral is registered in the contract
    if (referralUserDataRaw !== undefined) {
      if (!isReferralRegistered) {
        logger.warn("registration:referral-registration:not-registered", {
          referralAddress: referralAddressToCheck,
        })
        setReferralExtractionError(
          "Referral address is not registered. Please use a registered referral address."
        )
        setAutoExtractedReferral(null)
      } else {
        logger.info("registration:referral-registration:confirmed", {
          referralAddress: referralAddressToCheck,
          registered: isReferralRegistered,
        })
        // Clear any previous registration errors
        setReferralExtractionError((prev) => {
          if (prev?.includes("not registered")) {
            return null
          }
          return prev
        })
        // Ensure autoExtractedReferral is set if this came from URL extraction
        // (it should already be set by the URL extraction effect, but ensure consistency)
        if (formData.referralAddress?.toLowerCase() === referralAddressToCheck.toLowerCase()) {
          setAutoExtractedReferral(referralAddressToCheck)
        }
      }
    } else if (!isCheckingReferralRegistration) {
      // Query completed but returned undefined (shouldn't happen normally)
      // This could indicate the contract call failed or address doesn't exist
      logger.warn("registration:referral-registration:query-returned-undefined", {
        referralAddress: referralAddressToCheck,
      })
      // Don't set error here - undefined might mean address doesn't exist in contract
      // which effectively means not registered, but we'll let the contract handle it
    }
  }, [
    referralAddressToCheck,
    referralUserDataRaw,
    isReferralRegistered,
    isCheckingReferralRegistration,
    formData.referralAddress,
  ])

  /**
   * Extracts referral address from URL and performs initial validation.
   * Registration status check is handled separately in the effect above.
   */
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

    logger.info("registration:auto-extract-referral:format-valid", { referral: extractedRef })
    setAutoExtractedReferral(extractedRef)
    // Don't clear extraction error here - let the registration check effect handle it
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

  /**
   * Validates the registration form including format checks and contract registration status.
   * This function performs synchronous validation. The registration status check
   * is performed asynchronously via the contract query hook, but we also check
   * the resolved state here for form submission validation.
   * 
   * @returns Object containing validation errors keyed by field name
   */
  const validateForm = useCallback((): RegistrationFormErrors => {
    const errors: RegistrationFormErrors = {}

    // Check format validation first
    const referralError = validateReferralAddress(formData.referralAddress)
    if (referralError) {
      errors.referralAddress = referralError
    } else if (formData.referralAddress?.trim()) {
      // If format is valid, check registration status
      const trimmedAddress = formData.referralAddress.trim()
      if (referralAddressToCheck && referralAddressToCheck.toLowerCase() === trimmedAddress.toLowerCase()) {
        // We have a valid address format, now check if registration check has completed
        if (!isCheckingReferralRegistration && referralUserDataRaw !== undefined) {
          if (!isReferralRegistered) {
            logger.warn("registration:form:validation:referral-not-registered", {
              referralAddress: trimmedAddress,
            })
            errors.referralAddress = "Referral address is not registered in the contract. Please use a registered referral address."
          }
        } else if (!isCheckingReferralRegistration && referralUserDataRaw === undefined) {
          // Check might have failed, but don't block form submission for this
          // The error will be shown via referralExtractionError state
          logger.debug("registration:form:validation:referral-check-pending", {
            referralAddress: trimmedAddress,
          })
        }
      }
    }

    logger.debug("registration:form:validation", {
      formData,
      errors,
      hasErrors: Object.keys(errors).length > 0,
      isReferralRegistered,
      isCheckingReferralRegistration,
    })

    return errors
  }, [formData, validateReferralAddress, referralAddressToCheck, isReferralRegistered, isCheckingReferralRegistration, referralUserDataRaw])

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
      const shouldCelebrate = !motionReduced
      setShouldShowConfetti(shouldCelebrate)
      setIsWelcomeDialogOpen(true)
      logger.info("registration:welcome-dialog:open", { reference })
      if (shouldCelebrate) {
        setTimeout(() => {
          setShouldShowConfetti(false)
        }, 800)
      }
      void refetchUserData()
      void refetchTotalRegisteredUsers()
    },
    [motionReduced, refetchUserData, refetchTotalRegisteredUsers],
  )

  const handlePaymentFailed = useCallback(
    (error: string) => {
      logger.error("payment-widget:payment-failed", { error })
      // setIsPaymentDialogOpen(false)
      setRegistrationState((previous) => ({
        ...previous,
        errors: { general: error },
      }))
    },
    [],
  )

  const welcomeConfettiActive = shouldShowConfetti && !motionReduced

  /**
   * Fetches referral level counts for the connected user's referral network.
   * Uses the smart contract's getReferralCountsByLevel function which performs
   * the computation on-chain, eliminating the need for client-side BFS traversal.
   * This significantly improves performance, especially for large referral networks.
   *
   * @returns Promise that resolves when the counts are fetched and state is updated
   */
  const fetchReferralLevelCounts = useCallback(async () => {
    if (!publicClient || !referralContractAddress || !address) {
      setReferralLevelCounts(null)
      return
    }

    logger.info("registration:levels:fetch:start", {
      address,
      depth: REFERRAL_LEVEL_DEPTH,
    })

    setReferralLevelLoading(true)
    setReferralLevelError(null)

    try {
      const response = (await publicClient.readContract({
        address: referralContractAddress,
        abi: referralContractAbi.abi,
        functionName: "getReferralCountsByLevel",
        args: [address],
      })) as readonly bigint[]

      // Contract returns uint256[13] - convert BigInt values to numbers
      // and take the 1-13 levels (12 levels)
      const levelCounts = response
        .slice(1, REFERRAL_LEVEL_DEPTH + 1)
        .map((count) => Number(count))

      setReferralLevelCounts(levelCounts)
      logger.info("registration:levels:fetch:success", {
        levels: levelCounts,
        contractReturnedLevels: response.length,
      })
    } catch (error) {
      const errorMessage = error instanceof BaseError
        ? error.shortMessage ?? error.message
        : error instanceof Error
          ? error.message
          : String(error)
      logger.error("registration:levels:fetch:error", {
        error: errorMessage,
        address,
        referralContractAddress,
      })
      setReferralLevelError("Unable to load your network depth right now. Try again shortly.")
    } finally {
      setReferralLevelLoading(false)
    }
  }, [address, publicClient, referralContractAddress])

  useEffect(() => {
    if (!address || !referralContractAddress || !publicClient) {
      setReferralLevelCounts(null)
      setReferralLevelError(null)
      setReferralLevelLoading(false)
      return
    }

    if (!isRegistered) {
      setReferralLevelCounts(null)
      setReferralLevelError(null)
      setReferralLevelLoading(false)
      return
    }

    void fetchReferralLevelCounts()
  }, [address, fetchReferralLevelCounts, isRegistered, publicClient, referralContractAddress])

  const handleRefreshLevelCounts = useCallback(() => {
    void fetchReferralLevelCounts()
  }, [fetchReferralLevelCounts])

  const referralLevelEntries = useMemo(() => {
    if (!referralLevelCounts) {
      return []
    }

    return referralLevelCounts.map((count, index) => ({
      level: index + 1,
      count,
    }))
  }, [referralLevelCounts])

  const handleOpenLevelDistributionDialog = useCallback(() => {
    logger.info("registration:levels:dialog-open")
    setIsLevelDistributionDialogOpen(true)
    if (!referralLevelLoading) {
      void fetchReferralLevelCounts()
    }
  }, [fetchReferralLevelCounts, referralLevelLoading])

  useEffect(() => {
    if (!isRegistered) {
      setIsLevelDistributionDialogOpen(false)
    }
  }, [isRegistered])

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

    // ==== AUTOSWITCH CHAIN LOGIC BELOW ====
    if (chainIdCurrent !== targetChainId) {
      if (switchChainAsync && !isSwitchNetworkLoading) {
        logger.info("registration:withdraw:wrong-chain:attempt-switch", { from: chainIdCurrent, to: targetChainId })
        try {
          await switchChainAsync({ chainId: targetChainId })
          logger.info("registration:withdraw:wrong-chain:switch-success", { targetChainId })
        } catch (switchError) {
          const switchMessage = switchError instanceof BaseError
            ? switchError.shortMessage ?? switchError.message
            : switchError instanceof Error
              ? switchError.message
              : String(switchError)

          setWithdrawalState((previous) => ({
            ...previous,
            error: `Switch to the required network to continue. ${switchMessage}`,
            wasSuccessful: false,
          }))
          logger.error("registration:withdraw:wrong-chain:switch-failed", { switchMessage })
          return
        }
      } else {
        setWithdrawalState((previous) => ({
          ...previous,
          error: `Wallet is on the wrong network and cannot trigger automatic switch. Manually switch to the correct chain (id: ${targetChainId}).`,
          wasSuccessful: false,
        }))
        logger.error("registration:withdraw:autonetwork-failed", { chainIdCurrent, targetChainId })
        return
      }
    }
    // ====================================

    setWithdrawalState({
      isProcessing: true,
      error: null,
      lastTransactionHash: null,
      wasSuccessful: false,
    });

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
    chainIdCurrent,
    switchChainAsync,
    isSwitchNetworkLoading,
  ])

  return (
    <aside
      className="reveal-section relative overflow-hidden rounded-[2.75rem] border border-primary/40 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20 p-6 shadow-[0_24px_60px_rgba(20,16,48,0.35)] sm:p-8"
      data-animate-on-scroll
      data-visible="false"
    >
      <DecorativeBackground variant="sidebar" className="opacity-70" />

      <div className="relative flex h-full flex-col">
        <RegistrationHeader />

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
              <Card className="border-white/10 bg-white/5 backdrop-blur gap-4">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">Membership Status</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleOpenReferralDialog}
                    className="ml-auto cursor-pointer flex items-center gap-1 rounded-md border border-primary/40 bg-background/60 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors duration-150"
                  >
                    {/* Icon: optional → import { Share2 } from 'lucide-react' above if not present */}
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                    <span>Generate Referral Link</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <RegistrationSuccess
                    referralAddress={!isRegistered ? formData.referralAddress : undefined} // Only show referral credit before registration
                    directReferralCountDisplay={directReferralCountDisplay}
                    accruedRewardsDisplay={accruedRewardsDisplay}
                    depositTokenSymbol={depositTokenSymbol}
                    showConfetti={welcomeConfettiActive}
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
                onOpenLevelDistribution={handleOpenLevelDistributionDialog}
                isLevelDistributionLoading={referralLevelLoading}
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

      <RegistrationWelcomeDialog
        open={isWelcomeDialogOpen}
        onOpenChange={setIsWelcomeDialogOpen}
        onContinue={() => setIsWelcomeDialogOpen(false)}
        motionReduced={motionReduced}
      />

      <RegistrationLevelDistributionDialog
        open={isLevelDistributionDialogOpen}
        onOpenChange={setIsLevelDistributionDialogOpen}
        levels={referralLevelEntries}
        isLoading={referralLevelLoading}
        error={referralLevelError}
        onRefresh={handleRefreshLevelCounts}
      />
    </aside>
  )
}
