/**
 * Footer Component
 * ---------------
 * Site footer with branding, secondary navigation links, contract address, and social media links.
 * Includes required marketing branding line and explicit copyright year.
 * 
 * Features:
 * - Asty branding with contract address
 * - Marketing line: "Asty — PeopleFi. Built for collective value creation."
 * - Quick Links section with secondary navigation items (FAQ, Community, Whitepaper)
 * - Social media links (X, Telegram Channel, Telegram Group, Discord)
 * - Social URLs read from env: NEXT_PUBLIC_ASTY_TWITTER_URL, NEXT_PUBLIC_ASTY_TELEGRAM_CHANNEL_URL, NEXT_PUBLIC_ASTY_TELEGRAM_GROUP_URL
 * - Copyright line: "© Asty 2025"
 * - Responsive three-column layout
 */

"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { SECONDARY_NAV_ITEMS } from "./types"

// Social URLs from environment with safe fallbacks
const TWITTER_URL = process.env.NEXT_PUBLIC_ASTY_TWITTER_URL || "https://x.com/Astyfinance"
const TELEGRAM_CHANNEL_URL = process.env.NEXT_PUBLIC_ASTY_TELEGRAM_CHANNEL_URL || "https://t.me/Asty_finance"
const TELEGRAM_GROUP_URL = process.env.NEXT_PUBLIC_ASTY_TELEGRAM_GROUP_URL || "https://t.me/Astyfinance"

/**
 * Renders the site footer with branding and social links.
 */
function FooterComponent() {
  logger.info("component:footer:render")
  logger.info("component:footer:branding", {
    tagline: "Asty — PeopleFi. Built for collective value creation.",
    copyright: "© Asty 2025",
  })
  logger.info("component:footer:social_links", {
    twitter: TWITTER_URL,
    telegramChannel: TELEGRAM_CHANNEL_URL,
    telegramGroup: TELEGRAM_GROUP_URL,
  })

  return (
    <footer className="border-t border-border/40 bg-background/90 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Branding Section */}
          <div className="space-y-3">
            <p className={cn("text-2xl tracking-[0.6em] text-primary", astroz.className)}>ASTY</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Asty — PeopleFi. Built for collective value creation.
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Vault contract address:{" "}
              <span className="font-mono text-foreground">0xASTY000000000000000000000000</span>
            </p>
            <p className="text-xs text-muted-foreground">© Asty {new Date().getFullYear()}. All rights reserved.</p>
          </div>

          {/* Quick Links Section */}
          <nav aria-label="Quick links" className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Quick Links</p>
            <ul className="flex flex-wrap gap-3">
              {SECONDARY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links Section */}
          <nav aria-label="Footer links" className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Follow Asty</p>
            <ul className="flex flex-wrap gap-4">
            <li>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M3 3h4.5l4.05 5.7L15.6 3H21l-7.05 9.5L21 21h-4.5l-4.5-6.3-5 6.3H3l7.65-10z"
                  />
                </svg>
                <span>X</span>
              </a>
            </li>
            <li>
              <a
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M21.5 4.5 3.2 11.1c-1.3.5-1.3 1.3-.2 1.6l4.6 1.4 1.8 5.8c.2.5.3.7.7.7.4 0 .5-.2.6-.6l.9-3.1 4.7 3.5c.9.5 1.5.2 1.7-.8l3-14.3c.3-1.2-.4-1.7-1.1-1.4Z"
                  />
                </svg>
                <span>Telegram Channel</span>
              </a>
            </li>
            <li>
              <a
                href={TELEGRAM_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M21.5 4.5 3.2 11.1c-1.3.5-1.3 1.3-.2 1.6l4.6 1.4 1.8 5.8c.2.5.3.7.7.7.4 0 .5-.2.6-.6l.9-3.1 4.7 3.5c.9.5 1.5.2 1.7-.8l3-14.3c.3-1.2-.4-1.7-1.1-1.4Z"
                  />
                </svg>
                <span>Telegram Group</span>
              </a>
            </li>
            <li>
              <a
                href="https://example.com/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M20.3 4.3A16.3 16.3 0 0 0 16.6 3l-.5 1.1c-1-.3-2-.5-3.1-.5-1.1 0-2.1.2-3.1.5L9.4 3a16 16 0 0 0-3.7 1.3C3 8.1 2.3 11.6 2.5 15c1 1.3 2.4 2.5 4 3.3l.8-1.2c.6.3 1.2.5 1.9.7l.3-.8c.4.1.9.2 1.3.2.4 0 .9 0 1.3-.2l.3.8c.7-.1 1.3-.4 1.9-.7l.8 1.2c1.6-.8 3-2 4-3.3.3-3.6-.5-6.9-2.8-10.7ZM9.7 14c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Zm4.6 0c-.7 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Z"
                  />
                </svg>
                <span>Discord</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
