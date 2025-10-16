/**
 * Lists Components for Homepage
 *
 * Purpose:
 * - Render bullet lists and labeled description items in a consistent style.
 */

import { logger } from "@/lib/logger";
import { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

export interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  logger.debug("component:BulletList:render", { count: items?.length ?? 0 });
  return (
    <StaggerContainer>
      <ul className="list-disc pl-6 space-y-2">
        {items.map((item, idx) => (
          <StaggerItem key={idx}>
            <li className="text-muted-foreground">{item}</li>
          </StaggerItem>
        ))}
      </ul>
    </StaggerContainer>
  );
}

export interface LabeledListProps {
  items: { label: string; description: string }[];
}

export function LabeledList({ items }: LabeledListProps) {
  logger.debug("component:LabeledList:render", { count: items?.length ?? 0 });
  return (
    <StaggerContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <StaggerItem key={idx}>
            <div className="rounded-md border p-4">
              <div className="font-medium mb-1">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  );
}


