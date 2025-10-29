/**
 * Header Component
 * ---------------
 * Responsive navigation header with mobile menu functionality and wallet connection.
 * Features the Asty logo, essential navigation items (Introducing, How It Works, Early Membership, Tokenomics, Roadmap), 
 * "Book Early Membership" CTA button, wallet connect button, and mobile hamburger menu.
 * 
 * Handles:
 * - Desktop and mobile navigation states
 * - Smooth scrolling to page sections
 * - Mobile menu toggle with accessibility features
 * - Logo branding with minimal design
 * - Early Membership registration CTA button (desktop and mobile)
 * - Wallet connection via CustomConnectButton (desktop and mobile)
 * - Responsive design with CTA and connect button visibility
 * 
 * Note: Displays PRIMARY_NAV_ITEMS for key navigation (5 items). 
 * Secondary links are moved to footer for better organization.
 */

"use client"

import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"
import { memo } from "react"
import { ArrowRight, Menu, X } from "lucide-react"

import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { NAV_ITEMS, PRIMARY_NAV_ITEMS } from "./types"

interface HeaderProps {
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void
  mobileOpen: boolean
  onMobileNavToggle: () => void
  onMobileNavClose?: () => void
}

/**
 * Renders the main site header with navigation and branding.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to sections
 * @param mobileOpen - Whether mobile menu is currently open
 * @param onMobileNavToggle - Function to toggle mobile menu state
 * @param onMobileNavClose - Function to close mobile menu
 */
function HeaderComponent({ 
  onAnchorClick, 
  mobileOpen, 
  onMobileNavToggle
}: HeaderProps) {
  logger.info("component:header:render", { mobileOpen })

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg"
      >
        Skip to main content
      </a>

      <header
        id="site-header"
        className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="#hero"
            onClick={onAnchorClick}
            className="group relative flex items-center gap-3"
            aria-label="Back to Asty hero"
          >
            <span className="relative isolate rounded-md border border-border/60 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 px-3 py-2 text-primary transition-transform duration-200 group-hover:-translate-y-0.5">
              <span className={cn("text-lg font-black tracking-[0.6em]", astroz.className)}>
                ASTY
              </span>
            </span>
            {/* <span className="hidden text-xs uppercase text-muted-foreground tracking-[0.45em] md:block">
              Earn Forever
            </span> */}
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onAnchorClick}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden md:flex"
            >
              <a href="#membership" onClick={onAnchorClick}>
                Reserve My Position
              </a>
            </Button>
            <div className="hidden sm:block">
              <CustomConnectButton size="sm" compact={true} variant={{
                connected: 'outline',
                connect: 'outline',
                wrongNetwork: 'destructive',
              }} />
            </div>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-md border border-border/70 bg-background/80 text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 lg:hidden"
              onClick={onMobileNavToggle}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">Toggle navigation</span>
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            "lg:hidden",
            mobileOpen ? "block border-t border-border/50 bg-background/95 backdrop-blur" : "hidden"
          )}
        >
          <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-6 pb-6">
            {/* Mobile Connect Button */}
            <div className="pt-4 pb-2">
              <CustomConnectButton size="sm" className="w-full" compact={true} />
            </div>
            
            {/* Mobile Membership Button */}
            <div className="pb-4">
              <Button
                asChild
                size="sm"
                className="w-full"
              >
                <a href="#membership" onClick={onAnchorClick}>
                Reserve My Position
                </a>
              </Button>
            </div>
            
            <ul className="flex flex-col gap-3 pt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onAnchorClick}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-card/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-4 opacity-60" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export const Header = memo(HeaderComponent)
