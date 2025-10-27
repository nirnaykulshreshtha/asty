"use client"

import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import { Pill } from "@/components/ui/Pill"
import { AuroraText, DEFAULT_AURORA_COLORS } from "@/components/ui/aurora-text"
import { WordRotate } from "./word-rotate-old"
import * as React from "react"

/**
 * SectionHeader Component — Dynamic + WordRotate
 * ------------------------------------------------
 * - Drop-in replacement for the previous SectionHeader.
 * - Adds dynamic word rotation inside title/description.
 * - Supports token templating and flexible layout.
 */

export interface SectionHeaderProps {
  /** Eyebrow label displayed above the title (e.g., Mechanics, The Numbers) */
  label?: string
  /** Main section title as a string template. Example: "Asty Turns {domain} Participation into Real Rewards" */
  title: string
  /** Supporting description text. Can also include tokens like {domain}. */
  description?: string
  /** Optional additional class names for outer container */
  className?: string
  /**
   * Map of tokens to values. Values can be a string or array of rotating words.
   * Example: { domain: ["DeFi", "PeopleFi"] }
   */
  tokens?: Record<string, string | string[]>
  /**
   * Optional per-token class overrides for the <WordRotate/>, keyed by token name.
   */
  tokenClassName?: Partial<Record<string, string>>
  /**
   * Fallback words for rotation when a token value is an empty array.
   */
  defaultRotateWords?: string[]
  /**
   * Heading tag for the title. Accepts any valid React element type.
   */
  as?: React.ElementType
  /**
   * Text alignment.
   */
  align?: "start" | "center" | "end"
  /**
   * Toggle the eyebrow pill.
   */
  showPill?: boolean
  /**
   * Pill props
   */
  pillTone?: React.ComponentProps<typeof Pill>["tone"]
  /**
   * Optional configuration to render parts of the heading with AuroraText animation.
   */
  aurora?: {
    /** Enable AuroraText wrapping on the title */
    enableTitle?: boolean
    /** Enable AuroraText wrapping on the description */
    enableDescription?: boolean
    /** Custom gradient colors for AuroraText */
    colors?: string[]
    /** Animation speed multiplier */
    speed?: number
    /** Optional class override when AuroraText wraps the title */
    titleClassName?: string
    /** Optional class override when AuroraText wraps the description */
    descriptionClassName?: string
    /**
     * Enable AuroraText wrapping for a single token value (e.g., {domain}).
     * Provide the token key and optional overrides.
     */
    domainToken?:
      | boolean
      | {
          /** Token key to target, defaults to "domain" */
          token?: string
          /** Custom colors for the token highlight */
          colors?: string[]
          /** Animation speed override */
          speed?: number
          /** Additional className for Aurora wrapper around the token */
          className?: string
        }
  }
}

function normalizeAuroraTokenConfig(
  aurora: SectionHeaderProps["aurora"],
  tokens: SectionHeaderProps["tokens"]
): {
  enabled: boolean
  tokenName: string
  colors?: string[]
  speed?: number
  className?: string
} | undefined {
  if (!aurora?.domainToken) {
    return undefined
  }

  const config =
    typeof aurora.domainToken === "object"
      ? aurora.domainToken
      : { token: "domain" }

  const tokenName = config.token ?? "domain"

  if (!tokens?.[tokenName]) {
    return undefined
  }

  return {
    enabled: true,
    tokenName,
    colors: config.colors ?? aurora.colors,
    speed: config.speed ?? aurora.speed,
    className: config.className,
  }
}

/**
 * Replace tokens in a text string with either plain text or <WordRotate/>.
 * Tokens are expressed as {token}.
 */
function renderWithTokens(
  text: string | undefined,
  opts: {
    tokens?: SectionHeaderProps["tokens"]
    tokenClassName?: SectionHeaderProps["tokenClassName"]
    defaultRotateWords?: string[]
    baseRotateClassName?: string
    auroraToken?: {
      enabled: boolean
      tokenName: string
      colors?: string[]
      speed?: number
      className?: string
    }
  }
) {
  if (!text) return null
  const {
    tokens = {},
    tokenClassName = {},
    defaultRotateWords = [],
    baseRotateClassName = "",
    auroraToken,
  } = opts

  // Split by tokens like {token}
  const parts: Array<string | React.ReactNode> = []
  const regex = /\{([a-zA-Z0-9_\-]+)\}/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text))) {
    const [full, name] = match
    const before = text.slice(lastIndex, match.index)
    if (before) parts.push(before)

    const value = tokens[name]
    const shouldHighlightToken = auroraToken?.enabled && auroraToken.tokenName === name

    if (Array.isArray(value)) {
      parts.push(
        <WordRotate
          key={`${name}-${match.index}-wrap`}
          className={cn("inline align-baseline [&&]:py-0", baseRotateClassName, tokenClassName[name])}
          containerClassName="max-w-[24ch]"
          wordClassName="inline m-0 p-0 align-baseline"
          words={value.length ? value : defaultRotateWords}
          aurora={
            shouldHighlightToken
              ? {
                  colors: auroraToken?.colors ?? DEFAULT_AURORA_COLORS,
                  speed: auroraToken?.speed,
                  className: auroraToken?.className,
                }
              : undefined
          }
        />
      )
    } else if (typeof value === "string") {
      if (shouldHighlightToken) {
        parts.push(
          <AuroraText
            key={`${name}-${match.index}-aurora-string`}
            colors={auroraToken?.colors ?? DEFAULT_AURORA_COLORS}
            speed={auroraToken?.speed}
            className={cn("inline-block align-baseline", auroraToken?.className)}
            duplicateChildren={false}
          >
            {value}
          </AuroraText>
        )
      } else {
        parts.push(
          <span key={`${name}-${match.index}`} className={cn(baseRotateClassName, tokenClassName[name])}>
            {value}
          </span>
        )
      }
    } else {
      // No mapping provided. Render the raw token name to avoid silent failure.
      parts.push(
        <span key={`${name}-${match.index}`} className={cn(baseRotateClassName, tokenClassName[name])}>
          {`{${name}}`}
        </span>
      )
    }

    lastIndex = match.index + full.length
  }

  const tail = text.slice(lastIndex)
  if (tail) parts.push(tail)
  return parts
}

/**
 * Renders a reusable section header block with consistent styling and dynamic tokens.
 */
export function SectionHeader({
  label,
  title,
  description,
  className,
  tokens,
  tokenClassName,
  defaultRotateWords = ["DeFi", "PeopleFi"],
  as,
  align = "start",
  showPill = true,
  pillTone = "muted",
  aurora,
}: SectionHeaderProps) {
    logger.info("component:section-header:render", { label, title, tokens })

  const TitleTag: React.ElementType = as ?? "h2"
  const alignClass =
    align === "center" ? "text-center items-center" : align === "end" ? "text-right items-end" : "text-left items-start"

  const shouldRenderAuroraTitle = aurora?.enableTitle ?? false
  const shouldRenderAuroraDescription = aurora?.enableDescription ?? false
  const auroraTokenConfig = normalizeAuroraTokenConfig(aurora, tokens)

  return (
    <div
      className={cn("reveal-section space-y-4 flex flex-col", alignClass, className)}
      data-animate-on-scroll
      data-visible="false"
    >
      {showPill && label ? <Pill tone={pillTone}>{label}</Pill> : null}

      <TitleTag className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
        {shouldRenderAuroraTitle ? (
          <AuroraText
            colors={aurora?.colors}
            speed={aurora?.speed}
            className={cn("tracking-tight", aurora?.titleClassName)}
          >
            {renderWithTokens(title, {
              tokens,
              tokenClassName,
              defaultRotateWords,
              baseRotateClassName: "font-bold text-foreground",
              auroraToken: auroraTokenConfig,
            })}
          </AuroraText>
        ) : (
          renderWithTokens(title, {
            tokens,
            tokenClassName,
            defaultRotateWords,
            baseRotateClassName: "font-bold text-foreground",
            auroraToken: auroraTokenConfig,
          })
        )}
      </TitleTag>

      {description ? (
        <p className="max-w-3xl text-base text-muted-foreground">
          {shouldRenderAuroraDescription ? (
            <AuroraText
              colors={aurora?.colors}
              speed={aurora?.speed}
              className={cn("font-semibold", aurora?.descriptionClassName)}
            >
              {renderWithTokens(description, {
                tokens,
                tokenClassName,
                defaultRotateWords,
                baseRotateClassName: "font-semibold",
                auroraToken: auroraTokenConfig,
              })}
            </AuroraText>
          ) : (
            renderWithTokens(description, {
              tokens,
              tokenClassName,
              defaultRotateWords,
              baseRotateClassName: "font-semibold",
              auroraToken: auroraTokenConfig,
            })
          )}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Usage examples
 * --------------
 * 1) Simple swap with rotation in the title:
 * <SectionHeader
 *   label="Tagline"
 *   title={"Asty Turns {domain} Participation into Real Rewards"}
 *   description={"Join the future of {domain} with rewards that matter."}
 *   tokens={{ domain: ["DeFi", "PeopleFi"] }}
 * />
 *
 * 2) Fixed token value, no rotation:
 * <SectionHeader
 *   title={"Asty Turns {domain} Participation into Real Rewards"}
 *   tokens={{ domain: "PeopleFi" }}
 * />
 *
 * 3) Custom heading level, centered layout, custom classes for a token:
 * <SectionHeader
 *   as="h1"
 *   align="center"
 *   title={"Asty Turns {domain} Participation into Real Rewards"}
 *   tokens={{ domain: ["DeFi", "PeopleFi", "CreatorFi"] }}
 *   tokenClassName={{ domain: "text-black dark:text-white" }}
 * />
 */
