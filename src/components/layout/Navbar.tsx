/**
 * Navbar Component
 *
 * Purpose:
 * - Top navigation with brand, primary links, theme toggle, and Connect Wallet.
 */

"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { logger } from "@/lib/logger";

export function Navbar() {
  logger.debug("component:Navbar:render");
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold">
            Asty
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/docs">Docs</Link>
            <Link href="/community">Community</Link>
            <Link href="/app">App</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <ConnectButton chainStatus={{ smallScreen: "icon", largeScreen: "full" }} showBalance={false} />
        </div>
      </div>
    </header>
  );
}


