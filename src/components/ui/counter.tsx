/**
 * Animated Counter Component
 * --------------------------
 * Animates numeric values with smooth transitions and aggressive logging.
 */

"use client"

import { useEffect, useRef, useState } from "react"
import { logger } from "@/lib/logger"

interface CounterProps {
  id: string
  value: number
  duration?: number
  suffix?: string
  className?: string
  threshold?: number
}

const FRAME_DURATION = 1000 / 60

export function Counter({
  id,
  value,
  duration = 2,
  suffix = "",
  className,
  threshold = 0.6,
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const elementRef = useRef<HTMLSpanElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const element = elementRef.current

    if (!element) {
      return
    }

    if (prefersReducedMotion) {
      logger.info("component:counter:prefers-reduced-motion", { id })
      setDisplayValue(value)
      return
    }

    animatedRef.current = false
    setDisplayValue(0)

    const totalFrames = Math.max(1, Math.round((duration * 1000) / FRAME_DURATION))

    const animate = () => {
      let frame = 0

      const step = () => {
        frame += 1
        const progress = Math.min(frame / totalFrames, 1)
        const eased = easeOutCubic(progress)
        setDisplayValue(Math.round(value * eased))

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(step)
        }
      }

      rafRef.current = window.requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            logger.info("component:counter:start", { id, value })
            animatedRef.current = true
            animate()
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [id, value, duration, threshold])

  return (
    <span ref={elementRef} className={className}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}


