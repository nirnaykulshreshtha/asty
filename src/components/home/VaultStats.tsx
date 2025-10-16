/**
 * Vault Stats Placeholder
 *
 * Purpose:
 * - Provide a well-structured placeholder for live dashboard metrics.
 * - Clear layout to swap in real data later without changing the section shape.
 */

import { Section } from "./Section";
import { logger } from "@/lib/logger";

export interface VaultStatsProps {
  title: string;
  subtitle: string;
}

export function VaultStats({ title, subtitle }: VaultStatsProps) {
  logger.info("component:VaultStats:render", { title });
  return (
    <Section title={title} description={subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Vault Aster</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Taxes Collected</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Next Distribution</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
      </div>
    </Section>
  );
}


