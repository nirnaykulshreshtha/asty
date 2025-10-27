"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"

import { logger } from "@/lib/logger"
import { cn } from "@/lib/utils"

/**
 * WordRotate Component — Inline Animated Word Cycling
 * --------------------------------------------------
 * Enables inline word rotation with Motion animations while keeping
 * typography aligned for headings such as `SectionHeader`.
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

  return (
    <span className={cn("inline-flex overflow-hidden align-baseline", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(className, wordClassName)}
          {...motionProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
