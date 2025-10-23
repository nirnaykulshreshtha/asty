/**
 * ContentCard Component
 * ---------------------
 * Purpose:
 * - Standardized card shell used across multiple sections.
 * - Provides consistent reveal behavior and hover transitions.
 *
 * Notes:
 * - Accepts an optional `leading` slot for icons, step numbers, etc.
 * - Aggressive logging is enabled for render tracing.
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"

export interface ContentCardProps {
  /** Card title */
  title?: string
  /** Card body/description */
  description?: string
  /** Optional leading slot (icon, number badge, etc.) */
  leading?: React.ReactNode
  /** Optional className override/extension */
  className?: string
  /** Optional children; if provided, takes precedence over title/description */
  children?: React.ReactNode
}

/**
 * Renders a reusable content card with default styles used throughout the homepage.
 */
export function ContentCard({ title, description, leading, className, children }: ContentCardProps) {
  logger.info("component:content-card:render", { titlePresent: Boolean(title), hasChildren: Boolean(children) })

  return (
    <article
      className={cn(
        "reveal-section flex flex-col gap-3 rounded-3xl border border-border/50 bg-card/50 p-6 shadow-lg transition hover:border-primary/40 hover:-translate-y-1",
        className
      )}
      data-animate-on-scroll
      data-visible="false"
    >
      {children ? (
        children
      ) : (
        <>
          {leading ? <div>{leading}</div> : null}
          {title ? <h3 className="text-lg font-semibold text-foreground">{title}</h3> : null}
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </>
      )}
    </article>
  )
}


