/**
 * Footer Component
 *
 * Purpose:
 * - Bottom site footer with themed links and concise branding.
 */

import Link from "next/link";
import { logger } from "@/lib/logger";

export function Footer() {
  logger.debug("component:Footer:render");
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Asty</div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/docs">Docs</Link>
          <Link href="/community">Community</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}


