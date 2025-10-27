/**
 * CTAButton Component
 * -------------------
 * Purpose:
 * - Standardizes CTA buttons that wrap Next.js Link with an ArrowRight icon.
 * - Reduces duplication across Buy, Community, and Hero sections.
 *
 * Notes:
 * - Accepts variant and size passthroughs; defaults match current style usage.
 * - Aggressive logging included for traceability.
 */

"use client"

import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"
import { cn } from "@/lib/utils"

export interface CTAButtonProps {
  href: string
  label: string
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void
  variant?: "default" | "secondary" | "outline"
  size?: "xs" | "sm" | "lg" | "default"
  className?: string
  external?: boolean
}

export function CTAButton({ href, label, onClick, variant = "default", size = "lg", className, external = false }: CTAButtonProps) {
  logger.info("component:cta-button:render", { href, variant, size, external })

  const isHash = href.startsWith("#")
  const linkProps = external && !isHash ? { target: "_blank", rel: "noopener noreferrer" } : {}

  const classes = cn(
    "group transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl",
    variant === "outline" ? "backdrop-blur" : "outline",
    className
  )

  return (
    <Button asChild variant={variant} size={size} className={classes}>
      <Link href={href} onClick={onClick} {...linkProps}>
        <span>{label}</span>
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Button>
  )
}

