"use client"

import React, { memo } from "react"

export const DEFAULT_AURORA_COLORS = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
  /**
   * When true (default), duplicates children into a visually hidden span to preserve accessibility while rendering an animated clone.
   * Set to false when children contain stateful components (e.g., WordRotate) that should not be rendered twice.
   */
  duplicateChildren?: boolean
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = DEFAULT_AURORA_COLORS,
    speed = 1,
    duplicateChildren = true,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    }

    return (
      <span className={`relative inline-block ${className}`}>
        {duplicateChildren ? (
          <>
            <span className="sr-only">{children}</span>
            <span
              className="animate-aurora relative bg-[length:200%_auto] bg-clip-text text-transparent"
              style={gradientStyle}
              aria-hidden="true"
            >
              {children}
            </span>
          </>
        ) : (
          <span
            className="animate-aurora relative bg-[length:200%_auto] bg-clip-text text-transparent"
            style={gradientStyle}
          >
            {children}
          </span>
        )}
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"
