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
import { PaymentWidgetProvider as BasePaymentWidgetProvider, } from "@matching-platform/payment-widget"
import type { SetupConfig } from "@matching-platform/payment-widget"

import "@matching-platform/payment-widget/styles.css"

import { logger } from "@/lib/logger"

const defaultNative = (symbol: string, decimals = 18) => ({
  name: symbol,
  symbol,
  decimals,
});

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
          chainId: 1,
          name: 'Ethereum',
          logoUrl: 'https://sepolia.etherscan.io/images/svg/brands/ethereum-original.svg',
          logoUrlDark: 'https://sepolia.etherscan.io/images/svg/brands/ethereum-original-light.svg',
          rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'https://ethereum-mainnet.core.chainstack.com/974ecc7fcd719f2ee35a8e8731a166a4',
          rpcWsUrl: process.env.NEXT_PUBLIC_ETHEREUM_WS_URL || 'wss://ethereum-mainnet.core.chainstack.com/974ecc7fcd719f2ee35a8e8731a166a4',
          blockExplorerUrl: 'https://etherscan.io',
          nativeCurrency: defaultNative('ETH'),
      },
      {
          chainId: 8453,
          name: 'Base',
          logoUrl: 'https://basescan.org/assets/base/images/svg/logos/chain-light.svg?v=25.10.4.0',
          logoUrlDark: 'https://basescan.org/assets/base/images/svg/logos/chain-dark.svg?v=25.10.4.0',
          rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://base-mainnet.core.chainstack.com/d93c56071ff6e150acd85f444dcdf7f1',
          rpcWsUrl: process.env.NEXT_PUBLIC_BASE_WS_URL || 'wss://base-mainnet.core.chainstack.com/d93c56071ff6e150acd85f444dcdf7f1',
          blockExplorerUrl: 'https://basescan.org',
          nativeCurrency: defaultNative('ETH'),
      },
      {
          chainId: 42161,
          name: 'Arbitrum',
          logoUrl: 'https://arbiscan.io/assets/arbitrum/images/svg/logos/chain-light.svg?v=25.10.4.0',
          logoUrlDark: 'https://arbiscan.io/assets/arbitrum/images/svg/logos/chain-dark.svg?v=25.10.4.0',
          rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || 'https://arbitrum-mainnet.core.chainstack.com/c24ac5289d91cc2e198c5ea1e9eb9b13',
          rpcWsUrl: process.env.NEXT_PUBLIC_ARBITRUM_WS_URL || 'wss://arbitrum-mainnet.core.chainstack.com/c24ac5289d91cc2e198c5ea1e9eb9b13',
          blockExplorerUrl: 'https://arbiscan.io',
          nativeCurrency: defaultNative('ETH'),
      },
      {
          chainId: 56,
          name: 'BNB Smart Chain',
          logoUrl: 'https://bscscan.com/assets/bsc/images/svg/logos/chain-light.svg?v=25.10.4.0',
          logoUrlDark: 'https://bscscan.com/assets/bsc/images/svg/logos/chain-dark.svg?v=25.10.4.0',
          rpcUrl: process.env.NEXT_PUBLIC_BNB_RPC_URL || 'https://bsc-mainnet.core.chainstack.com/9bf2bf94ce561d6c3869118f5717e1ee',
          rpcWsUrl: process.env.NEXT_PUBLIC_BNB_WS_URL || 'wss://bsc-mainnet.core.chainstack.com/9bf2bf94ce561d6c3869118f5717e1ee',
          blockExplorerUrl: 'https://bscscan.com',
          nativeCurrency: defaultNative('BNB', 18),
      },
      {
          chainId: 10,
          name: 'Optimism',
          logoUrl: 'https://optimistic.etherscan.io/assets/optimism/images/svg/logos/chain-light.svg?v=25.10.4.0',
          logoUrlDark: 'https://optimistic.etherscan.io/assets/optimism/images/svg/logos/chain-dark.svg?v=25.10.4.0',
          rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || 'https://optimism-mainnet.core.chainstack.com/fd142682867420a63f37e66331e56957',
          rpcWsUrl: process.env.NEXT_PUBLIC_OPTIMISM_WS_URL || 'wss://optimism-mainnet.core.chainstack.com/fd142682867420a63f37e66331e56957',
          blockExplorerUrl: 'https://optimistic.etherscan.io',
          nativeCurrency: defaultNative('ETH'),
      },
      {
          chainId: 137,
          name: 'Polygon',
          logoUrl: 'https://polygonscan.com/assets/poly/images/svg/logos/chain-light.svg?v=25.10.4.0',
          logoUrlDark: 'https://polygonscan.com/assets/poly/images/svg/logos/chain-dark.svg?v=25.10.4.0',
          rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 'https://polygon-mainnet.core.chainstack.com/a6819c270ce905b1760086252a751b43',
          rpcWsUrl: process.env.NEXT_PUBLIC_POLYGON_WS_URL || 'wss://polygon-mainnet.core.chainstack.com/a6819c270ce905b1760086252a751b43',
          blockExplorerUrl: 'https://polygonscan.com',
          nativeCurrency: defaultNative('MATIC'),
      },
        {
          chainId: 8453, // Base Mainnet
          name: "Base",
          rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://base-mainnet.core.chainstack.com/d93c56071ff6e150acd85f444dcdf7f1',
          rpcWsUrl: "wss://base-mainnet.core.chainstack.com/d93c56071ff6e150acd85f444dcdf7f1",
          blockExplorerUrl: "https://basescan.org",
          nativeCurrency: {
            name: "Base",
            symbol: "ETH",
            decimals: 18,
          },
        },
        ...(process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? 
          [{
            chainId: 11155111, // Sepolia
            name: "Sepolia",
            rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_RPC_URL || 'https://ethereum-sepolia.core.chainstack.com/0e277d48f1a45d9bff67c1dab4f51560',
            rpcWsUrl: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_WS_URL || 'wss://ethereum-sepolia.core.chainstack.com/0e277d48f1a45d9bff67c1dab4f51560',
            blockExplorerUrl: "https://sepolia.etherscan.io",
            nativeCurrency: {
              name: "Sepolia",
              symbol: "ETH",
              decimals: 18,
            },  
          },
          {
            chainId: 84532, // Base Sepolia
            name: "Base Sepolia",
            rpcUrl: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://base-sepolia.core.chainstack.com/aacc294142486b77a001918cb5e6426e',
            rpcWsUrl: process.env.NEXT_PUBLIC_BASE_SEPOLIA_WS_URL || 'wss://base-sepolia.core.chainstack.com/aacc294142486b77a001918cb5e6426e',
            blockExplorerUrl: "https://sepolia.basescan.org",
            nativeCurrency: {
              name: "Base Sepolia",
              symbol: "ETH",
              decimals: 18,
            },  
          }]: []),
      ],
      walletClient: walletClient || undefined,
      integratorId: process.env.NEXT_PUBLIC_ACROSS_INTEGRATOR_ID as `0x${string}` || `0x0001`,
      useTestnet: process.env.NEXT_PUBLIC_IS_TESTNET === "true",
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

