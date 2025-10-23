/**
 * BulletedListCard Component
 * --------------------------
 * Purpose:
 * - Reusable card that renders a bulleted list of items with a small accent dot.
 * - Normalizes the markup used by multiple sections for list-style content.
 *
 * Features:
 * - Optional heading rendered above the list
 * - Accepts arbitrary item shape via getKey/getTitle/getDescription mappers
 * - Integrates with page-level reveal animations via data attributes
 * - Aggressive logging for render tracing
 */

"use client"

import { logger } from "@/lib/logger"
import { ContentCard } from "@/components/ui/ContentCard"

export interface BulletedListCardProps<TItem> {
  /** Optional heading displayed at the top of the card */
  heading?: string
  /** Items to render as a bulleted list */
  items: TItem[]
  /** Function returning a unique key for each item */
  getKey: (item: TItem, index: number) => string
  /** Function returning the primary title text for an item */
  getTitle: (item: TItem) => string
  /** Function returning the secondary description text for an item */
  getDescription: (item: TItem) => string
}

/**
 * Renders a reusable bulleted list inside a standardized content card shell.
 */
export function BulletedListCard<TItem>({ heading, items, getKey, getTitle, getDescription }: BulletedListCardProps<TItem>) {
  logger.info("component:bulleted-list-card:render", { heading, count: items?.length ?? 0 })

  return (
    <ContentCard>
      {heading ? <h3 className="text-xl font-semibold text-foreground">{heading}</h3> : null}
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={getKey(item, index)} className="flex gap-3 rounded-2xl border border-border/40 bg-background/80 p-4">
            <span className="mt-1 size-2 rounded-full bg-primary" aria-hidden="true" />
            <div>
              <p className="text-base font-semibold text-foreground">{getTitle(item)}</p>
              <p>{getDescription(item)}</p>
            </div>
          </li>
        ))}
      </ul>
    </ContentCard>
  )
}


