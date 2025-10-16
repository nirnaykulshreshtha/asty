"use client"

import * as React from "react"
import { WagmiProvider as WagmiProviderWagmi } from 'wagmi'
import { config } from '@/configs/wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient()

export function WagmiProvider({
  children
}: { children: React.ReactNode }) {
  return <WagmiProviderWagmi config={config}>
    <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            {children}
        </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProviderWagmi>
}