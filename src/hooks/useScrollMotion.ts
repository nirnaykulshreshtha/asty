/**
 * useScrollMotion Hook
 * --------------------
 * Provides helper utilities for scroll-triggered animations and parallax effects.
 * Maintains aggressive logging for debugging and respects prefers-reduced-motion.
 */

"use client"

import { useEffect } from "react"
import { logger } from "@/lib/logger"

interface ParallaxOptions {
  speed?: number
  axis?: "x" | "y"
  maxShift?: number
}

/**
 * Applies a parallax transform to targets with `data-parallax` attribute.
 * @param options - Config for speed, axis, and max shift.
 */
export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.3, axis = "y", maxShift = 120 } = options

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax="true"]')
    )

    if (!elements.length) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      logger.info("scroll:parallax:disabled", { reason: "reduced motion" })
      return
    }

    logger.info("scroll:parallax:init", { count: elements.length, speed, axis, maxShift })

    const handleScroll = () => {
      const viewportHeight = window.innerHeight

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const offset = elementCenter - viewportHeight / 2

        const depth = Number(element.dataset.parallaxDepth ?? "1") || 1
        const localSpeed = Number(element.dataset.parallaxSpeed ?? speed) || speed
        const localMax = Number(element.dataset.parallaxMax ?? maxShift) || maxShift
        const localAxis = (element.dataset.parallaxAxis as "x" | "y") ?? axis

        const shiftRaw = -offset * localSpeed * depth
        const clamped = Math.max(Math.min(shiftRaw, localMax), -localMax)

        if (localAxis === "y") {
          element.style.transform = `translate3d(0, ${clamped}px, 0)`
        } else {
          element.style.transform = `translate3d(${clamped}px, 0, 0)`
        }
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      elements.forEach((element) => {
        element.style.transform = ""
      })
    }
  }, [speed, axis, maxShift])
}

interface RevealOptions {
  threshold?: number
  once?: boolean
}

/**
 * Initializes intersection observers for elements with `data-animate-on-scroll`.
 * @param options - Observer threshold and whether to animate only once.
 */
export function useScrollReveal(options: RevealOptions = {}) {
  const { threshold = 0.2, once = true } = options

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate-on-scroll]")
    )

    if (!elements.length) {
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"))
      logger.info("scroll:reveal:disabled", { reason: "reduced motion" })
      return
    }

    logger.info("scroll:reveal:init", { count: elements.length, threshold, once })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true")
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.setAttribute("data-visible", "false")
          }
        })
      },
      { threshold }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [threshold, once])
}

