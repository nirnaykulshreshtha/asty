/**
 * Payment Widget Provider
 * ----------------------
 * Provides configuration and context for the @matching-platform/payment-widget.
 * This component wraps the application with the necessary setup for cross-chain payments.
 * 
 * Features:
 * - Configures payment widget with wagmi wallet client
 * - Supports mainnet and testnet chains
 * - Integrates with Asty's wallet connection system
 * - Provides payment widget context to all child components
 * - Handles testnet/mainnet configuration
 * 
 * @see https://github.com/nirnaykulshreshtha/payment-widget
 */

"use client"

import { useMemo } from "react"
import { useWalletClient, useAccount } from "wagmi"
import { PaymentWidgetProvider as BasePaymentWidgetProvider } from "@matching-platform/payment-widget"
import type { SetupConfig } from "@matching-platform/payment-widget"

import { logger } from "@/lib/logger"

/**
 * Payment Widget Provider component that configures the payment widget infrastructure
 * using wagmi's wallet client and account information.
 */
export function PaymentWidgetProvider({ children }: { children: React.ReactNode }) {
  logger.info("payment-widget:provider:render")

  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  const setupConfig = useMemo<SetupConfig>(() => {
    const config: SetupConfig = {
      supportedChains: [
        {
          chainId: 1, // Ethereum Mainnet
          name: "Ethereum",
          rpcUrl: "https://eth.llamarpc.com",
          blockExplorerUrl: "https://etherscan.io",
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },
        },
        {
          chainId: 8453, // Base Mainnet
          name: "Base",
          rpcUrl: "https://mainnet.base.org",
          blockExplorerUrl: "https://basescan.org",
          nativeCurrency: {
            name: "Base",
            symbol: "ETH",
            decimals: 18,
          },
        },
      ],
      walletClient: walletClient || undefined,
      integratorId: process.env.NEXT_PUBLIC_ACROSS_INTEGRATOR_ID as `0x${string}` || "0x0000000000000000000000000000000000000000",
      useTestnet: false,
      quoteRefreshMs: 45_000,
      showUnavailableOptions: false,
    }

    logger.info("payment-widget:provider:config", {
      supportedChains: config.supportedChains.map((c) => c.chainId),
      hasWalletClient: Boolean(walletClient),
      walletAddress: address,
    })

    return config
  }, [walletClient, address])

  return (
    <BasePaymentWidgetProvider setupConfig={setupConfig}>
      {children}
    </BasePaymentWidgetProvider>
  )
}

