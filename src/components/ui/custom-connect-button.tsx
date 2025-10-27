"use client"

/**
 * Custom Connect Button Component for Asty
 * 
 * This component provides a custom implementation of RainbowKit's ConnectButton.Custom
 * with enhanced styling, comprehensive logging, and better user experience.
 * 
 * Features:
 * - Custom styling that matches Asty's design system
 * - Comprehensive logging for debugging wallet connection flows
 * - Support for different connection states (disconnected, wrong network, connected)
 * - Dynamic button variants for different states
 * - Chain switching and account management
 * - Responsive design with proper accessibility
 * 
 * Usage:
 * import { CustomConnectButton } from '@/components/ui/custom-connect-button';
 * 
 * // Basic usage with default outline variant
 * <CustomConnectButton />
 * 
 * // Customize variant for all states
 * <CustomConnectButton variant="default" />
 * 
 * // Customize variant for each state individually
 * <CustomConnectButton variant={{
 *   connect: 'default',
 *   connected: 'outline',
 *   wrongNetwork: 'destructive'
 * }} />
 */

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

interface CustomConnectButtonProps {
  /**
   * Additional CSS classes to apply to the button container
   */
  className?: string;
  /**
   * Size variant for the button
   */
  size?: 'xs' | 'sm' | 'default' | 'lg';
  /**
   * Whether to show the chain name when connected
   */
  showChainName?: boolean;
  /**
   * Whether to show the account balance when connected
   */
  showBalance?: boolean;
  /**
   * Whether to show only the account address when connected (compact mode)
   */
  compact?: boolean;
  /**
   * Button variant for different states. Can be a string to apply to all buttons,
   * or an object to customize each state individually
   */
  variant?: 
    | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    | {
        connect?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
        connected?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
        wrongNetwork?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
      };
}

/**
 * Custom Connect Button component that wraps RainbowKit's ConnectButton.Custom
 * with enhanced styling and comprehensive logging for debugging purposes.
 * 
 * @param props - Component props
 * @param props.variant - Button variant(s) for different states. Can be a string to apply globally,
 *                        or an object with `connect`, `connected`, and `wrongNetwork` properties
 *                        to customize each state individually
 * @returns JSX element representing the custom connect button
 * 
 * @example
 * // Apply the same variant to all states
 * <CustomConnectButton variant="default" />
 * 
 * @example
 * // Customize variants for each state
 * <CustomConnectButton variant={{
 *   connect: 'default',
 *   connected: 'default',
 *   wrongNetwork: 'destructive'
 * }} />
 */
export function CustomConnectButton({
  className,
  size = 'default',
  showChainName = true,
  showBalance = true,
  compact = false,
  variant = 'default',
}: CustomConnectButtonProps) {
  logger.debug('custom-connect-button:render', { 
    size, 
    showChainName, 
    showBalance,
    variant
  });

  // Helper function to get the appropriate variant based on state
  const getVariant = (state: 'connect' | 'connected' | 'wrongNetwork'): 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' => {
    if (typeof variant === 'string') {
      return variant;
    }
    return variant[state] || 'default';
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Log connection state changes for debugging
        logger.debug('custom-connect-button:state-change', {
          mounted,
          authenticationStatus,
          hasAccount: !!account,
          hasChain: !!chain,
          chainId: chain?.id,
          chainName: chain?.name,
          accountAddress: account?.address,
          accountDisplayName: account?.displayName,
        });

        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        logger.debug('custom-connect-button:computed-state', {
          ready,
          connected,
        });

        return (
          <div
            className={cn('inline-flex items-center', className)}
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                logger.debug('custom-connect-button:rendering-connect-state');
                return (
                  <Button
                    onClick={() => {
                      logger.info('custom-connect-button:connect-clicked');
                      openConnectModal();
                    }}
                    size={size}
                    className={cn("font-medium cursor-pointer", className)}
                    variant={getVariant('connect')}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                logger.warn('custom-connect-button:unsupported-chain', {
                  chainId: chain.id,
                  chainName: chain.name,
                });
                return (
                  <Button
                    onClick={() => {
                      logger.info('custom-connect-button:chain-modal-clicked');
                      openChainModal();
                    }}
                    size={size}
                    variant={getVariant('wrongNetwork')}
                    className="font-medium cursor-pointer"
                  >
                    Wrong Network
                  </Button>
                );
              }

              logger.debug('custom-connect-button:rendering-connected-state', {
                chainId: chain.id,
                chainName: chain.name,
                accountAddress: account.address,
                compact,
              });

              if (compact) {
                return (
                  <Button
                    onClick={() => {
                      logger.info('custom-connect-button:account-modal-clicked');
                      openAccountModal();
                    }}
                    size={size}
                    variant={getVariant('connected')}
                    className="font-medium cursor-pointer"
                  >
                    {account.displayName}
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {showChainName && (
                    <Button
                      onClick={() => {
                        logger.info('custom-connect-button:chain-switch-clicked');
                        openChainModal();
                      }}
                      size={size}
                      variant={getVariant('connected')}
                      className="font-medium cursor-pointer"
                    >
                      {chain.hasIcon && (
                        <div
                          className="mr-2 h-3 w-3 rounded-full overflow-hidden"
                          style={{
                            background: chain.iconBackground,
                          }}
                        >
                          {chain.iconUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              className="h-3 w-3"
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => {
                      logger.info('custom-connect-button:account-modal-clicked');
                      openAccountModal();
                    }}
                    size={size}
                    variant={getVariant('connected')}
                    className="font-medium cursor-pointer"
                  >
                    {account.displayName}
                    {showBalance && account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

/**
 * Simplified version of the custom connect button with minimal props
 * for quick integration in existing components.
 */
export function SimpleConnectButton({ className }: { className?: string }) {
  return (
    <CustomConnectButton 
      className={className}
      size="sm"
      compact={true}
    />
  );
}
