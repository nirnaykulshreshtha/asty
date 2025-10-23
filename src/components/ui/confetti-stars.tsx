/**
 * Confetti Stars Component
 * ----------------------
 * Displays celebratory confetti animation with stars and circles.
 * Used to celebrate successful registration and other achievements.
 * 
 * Features:
 * - Star and circle confetti particles
 * - Multiple burst animation with timing delays
 * - Customizable colors and particle counts
 * - Automatic trigger on component mount
 * - Comprehensive logging for debugging
 */

"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

import { logger } from "@/lib/logger"

interface ConfettiStarsProps {
  /**
   * Whether to automatically trigger confetti on mount
   * @default true
   */
  autoTrigger?: boolean
  /**
   * Delay before triggering confetti (in milliseconds)
   * @default 500
   */
  delay?: number
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Renders a confetti animation component with stars and circles.
 * Can be triggered automatically on mount or manually via ref.
 * 
 * @param autoTrigger - Whether to automatically trigger confetti on mount
 * @param delay - Delay before triggering confetti (in milliseconds)
 * @param className - Additional CSS classes
 */
export function ConfettiStars({ 
  autoTrigger = true, 
  delay = 500, 
  className 
}: ConfettiStarsProps) {
  
  /**
   * Triggers the confetti animation with star and circle particles
   */
  const triggerConfetti = () => {
    logger.info("confetti:trigger:start")
    
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    }

    const shoot = () => {
      // Star particles
      confetti({
        ...defaults,
        particleCount: 100,
        scalar: 1.2,
        shapes: ["star"],
      })

      // Circle particles
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 0.75,
        shapes: ["circle"],
      })
    }

    // Multiple bursts for more celebration
    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
    setTimeout(shoot, 1000)

    logger.info("confetti:trigger:complete")
  }

  // Auto-trigger confetti on mount if enabled
  useEffect(() => {
    if (autoTrigger) {
      const timer = setTimeout(() => {
        triggerConfetti()
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [autoTrigger, delay])

  return (
    <div className={className} />
  )
}

/**
 * Hook to trigger confetti programmatically
 * 
 * @returns Function to trigger confetti animation
 */
export function useConfetti() {
  const triggerConfetti = () => {
    logger.info("confetti:hook:trigger:start")
    
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    }

    const shoot = () => {
      // Star particles
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      })

      // Circle particles
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      })
    }

    // Multiple bursts for more celebration
    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
    
    logger.info("confetti:hook:trigger:complete")
  }

  return triggerConfetti
}
