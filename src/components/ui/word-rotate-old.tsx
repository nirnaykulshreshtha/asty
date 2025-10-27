"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"

import { logger } from "@/lib/logger"
import { cn } from "@/lib/utils"
import { DEFAULT_AURORA_COLORS } from "@/components/ui/aurora-text"

/**
 * WordRotate Component — Inline Animated Word Cycling
 * --------------------------------------------------
 * Enables inline word rotation with Motion animations while keeping
 * typography aligned for headings such as `SectionHeader`. Supports optional
 * aurora gradients applied directly to the animated word to preserve
 * `AnimatePresence` transitions.
 */
interface WordRotateProps {
  /** Ordered collection of words to cycle through */
  words: string[]
  /** Delay (ms) before rotating to the next word */
  duration?: number
  /** Override motion props for custom easing/offsets */
  motionProps?: MotionProps
  /** Class applied to the animated word span */
  className?: string
  /** Optional class applied to the outer container */
  containerClassName?: string
  /** Optional class applied directly to each word */
  wordClassName?: string
  /** Optional aurora gradient configuration applied to animated words */
  aurora?: {
    colors?: string[]
    speed?: number
    className?: string
  }
}

/**
 * Renders an inline animated word rotator with aggressive logging hooks for debugging.
 */
export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  containerClassName,
  wordClassName,
  aurora,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    logger.info("component:word-rotate:init", { wordCount: words.length, duration })

    if (!words.length) {
      logger.warn("component:word-rotate:empty-words", { duration })
      return undefined
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length
        logger.debug("component:word-rotate:advance", { prevIndex, nextIndex, nextWord: words[nextIndex] })
        return nextIndex
      })
    }, duration)

    return () => {
      logger.info("component:word-rotate:cleanup", { duration })
      clearInterval(interval)
    }
  }, [words, duration])

  if (!words.length) {
    return null
  }

  const gradientColors = aurora?.colors?.length ? aurora.colors : DEFAULT_AURORA_COLORS
  const gradientStyle = aurora
    ? {
        backgroundImage: `linear-gradient(135deg, ${gradientColors.join(", ")}, ${gradientColors[0]})`,
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent",
        animationDuration: `${10 / (aurora.speed ?? 1)}s`,
      }
    : undefined

  const mergedMotionProps: MotionProps = {
    ...motionProps,
    style: {
      ...(motionProps.style ?? {}),
      ...(gradientStyle ?? {}),
    },
  }

  return (
    <span className={cn("inline-flex overflow-hidden align-baseline", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(
            className,
            wordClassName,
            aurora ? cn("relative animate-aurora bg-[length:200%_auto] text-transparent", aurora.className) : null
          )}
          {...mergedMotionProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/**
 * Type guard to detect if a React element is a WordRotate component.
 */
export function isWordRotateElement(element: React.ReactNode): element is React.ReactElement {
  return Boolean(React.isValidElement(element) && element.type === WordRotate)
}
