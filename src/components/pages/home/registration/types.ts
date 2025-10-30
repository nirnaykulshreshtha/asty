import { type Address } from "viem"

/**
 * Registration Component Types
 * -----------------------------
 * Defines the shared TypeScript interfaces used across the multi-file
 * registration flow implementation. Keeping the types centralized avoids
 * tight coupling between components and ensures that future updates to the
 * registration contract or UI state surface in a single location.
 */

/**
 * Props supported by the `RegistrationSection` wrapper component.
 */
export interface RegistrationSectionProps {
  /** Indicates whether reduced motion accessibility mode is enabled. */
  motionReduced: boolean
}

/**
 * Shape of the form data captured during the registration flow.
 */
export interface RegistrationFormData {
  /** Optional referral address captured from user input or URL parameters. */
  referralAddress: string
}

/**
 * Collection of validation errors produced for the form.
 */
export interface RegistrationFormErrors {
  /** Validation error specific to the referral address input. */
  referralAddress?: string
  /** General error displayed at the top of the form. */
  general?: string
}

/**
 * Tracks the lifecycle state of the registration submission.
 */
export interface RegistrationState {
  /** Indicates whether the registration submission is currently running. */
  isSubmitting: boolean
  /** Indicates whether the registration successfully completed. */
  isSubmitted: boolean
  /** Validation and API driven errors for the current registration attempt. */
  errors: RegistrationFormErrors
}

/**
 * Minimal snapshot of the on-chain user data retrieved from the referral
 * contract's `getUser` view. Mirrors the tuple response for easier
 * consumption inside the React components.
 */
export interface RegistrationUserSnapshot {
  /** Address that referred the user, or zero address when none was provided. */
  referrer: Address
  /** Accrued referral rewards denominated in the deposit token's smallest unit. */
  accruedRewards: bigint
  /** Indicates whether the account has already completed their deposit. */
  registered: boolean
  /** Number of direct referrals associated with the account. */
  directReferralCount: bigint
}

/**
 * Tracks the state of a reward withdrawal transaction lifecycle.
 */
export interface RegistrationWithdrawalState {
  /** Indicates an in-flight withdrawal transaction. */
  isProcessing: boolean
  /** Most recent withdrawal-specific error message, if any. */
  error: string | null
  /** Last successful withdrawal transaction hash to aid support/debugging. */
  lastTransactionHash: string | null
  /** Flag the UI uses to show success messaging after a completed withdrawal. */
  wasSuccessful: boolean
}

