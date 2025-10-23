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
 * - Chain switching and account management
 * - Responsive design with proper accessibility
 * 
 * Usage:
 * import { CustomConnectButton } from '@/components/ui/custom-connect-button';
 * 
 * <CustomConnectButton />
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
}

/**
 * Custom Connect Button component that wraps RainbowKit's ConnectButton.Custom
 * with enhanced styling and comprehensive logging for debugging purposes.
 * 
 * @param props - Component props
 * @returns JSX element representing the custom connect button
 */
export function CustomConnectButton({
  className,
  size = 'default',
  showChainName = true,
  showBalance = true,
  compact = false,
}: CustomConnectButtonProps) {
  logger.debug('custom-connect-button:render', { 
    size, 
    showChainName, 
    showBalance 
  });

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
                    className="font-medium"
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
                    variant="destructive"
                    className="font-medium"
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
                    variant="outline"
                    className="font-medium"
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
                      variant="outline"
                      className="font-medium"
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
                    variant="outline"
                    className="font-medium"
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
