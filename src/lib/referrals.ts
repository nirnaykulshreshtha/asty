/**
 * Referral Utilities
 * ------------------
 * Provides helper functions for generating and validating referral links.
 * Ensures consistent referral URL patterns and Ethereum address validation
 * across the application.
 */

const FALLBACK_ORIGIN = "https://example.com"

/**
 * Build a referral link using the provided wallet address and optional origin.
 * Falls back to the browser origin or a predefined constant when executed in
 * non-browser environments (e.g., during SSR).
 *
 * @param walletAddress - The wallet address that should receive referral credit
 * @param origin - Optional explicit origin to use instead of the browser origin
 * @returns A fully-qualified referral URL containing the wallet address param
 */
export function buildReferralLink(walletAddress: string, origin?: string): string {
  const runtimeOrigin = origin ?? (typeof window !== "undefined" ? window.location.origin : FALLBACK_ORIGIN)
  const normalizedOrigin = runtimeOrigin.endsWith("/") ? runtimeOrigin.slice(0, -1) : runtimeOrigin

  return `${normalizedOrigin}/?ref=${encodeURIComponent(walletAddress)}`
}

const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

/**
 * Determine whether a value matches the basic structure of an Ethereum address.
 *
 * @param value - The string to validate
 * @returns True when the value conforms to Ethereum address formatting
 */
export function isEthereumAddress(value: string): boolean {
  return ETHEREUM_ADDRESS_REGEX.test(value)
}


