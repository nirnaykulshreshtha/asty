/**
 * SectionHeader Component
 * -----------------------
 * Purpose:
 * - Provides a standardized header block for sections with an eyebrow label,
 *   title, and description.
 * - Eliminates duplicated markup across multiple home page sections.
 *
 * Notes:
 * - Includes scroll-reveal data attributes to integrate with the page-level
 *   IntersectionObserver logic.
 * - Uses aggressive logging to aid debugging of render paths.
 */

"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { Pill } from "@/components/ui/Pill"

export interface SectionHeaderProps {
  /** Eyebrow label displayed above the title (e.g., Mechanics, The Numbers) */
  label: string
  /** Main section title */
  title: string
  /** Supporting description text */
  description: string
  /** Optional additional class names for outer container */
  className?: string
}

/**
 * Renders a reusable section header block with consistent styling.
 */
export function SectionHeader({ label, title, description, className }: SectionHeaderProps) {
  logger.info("component:section-header:render", { label, title })

  return (
    <div
      className={cn("reveal-section space-y-4", className)}
      data-animate-on-scroll
      data-visible="false"
    >
      <Pill tone="muted">{label}</Pill>
      <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
        {title}
      </h2>
      <p className="max-w-3xl text-base text-muted-foreground">{description}</p>
    </div>
  )
}


