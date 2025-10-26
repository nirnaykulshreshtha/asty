/**
 * Floating Member Button Component
 * --------------------------------
 * Fixed floating button on the right side of the screen that remains visible as users scroll.
 * Provides quick access to the membership registration section.
 * 
 * Features:
 * - Fixed positioning on right-middle of viewport
 * - Smooth scroll to membership section
 * - Responsive design with mobile considerations
 * - Hover animations and visual feedback
 * - Accessible with proper ARIA labels
 * - Aggressive logging for debugging interactions
 */

"use client"

import { useEffect, useState, useCallback } from "react"
import { LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"

interface FloatingMemberButtonProps {
  onAnchorClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders a floating button for quick access to membership registration.
 * 
 * @param onAnchorClick - Handler for smooth scrolling to membership section
 */
export function FloatingMemberButton({ onAnchorClick }: FloatingMemberButtonProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const evaluateVisibility = useCallback(() => {
    const targets = [
      document.querySelector<HTMLElement>("#hero"),
      document.querySelector<HTMLElement>("#membership"),
      document.querySelector<HTMLElement>("footer"),
    ].filter(Boolean) as HTMLElement[]

    if (targets.length === 0) {
      logger.warn?.("component:floating-member-button:visibility-targets-missing")
      setIsVisible(true)
      return
    }

    const viewportTop = window.scrollY
    const viewportBottom = viewportTop + window.innerHeight

    const shouldHide = targets.some((element) => {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementBottom = rect.bottom + window.scrollY

      const inView = elementBottom > viewportTop && elementTop < viewportBottom

      logger.debug?.("component:floating-member-button:target-visibility", {
        target: element.id || element.tagName.toLowerCase(),
        elementTop,
        elementBottom,
        viewportTop,
        viewportBottom,
        inView,
      })

      return inView
    })

    setIsVisible((visible) => {
      if (visible === !shouldHide) {
        return visible
      }

      logger.info("component:floating-member-button:visibility", { visible: !shouldHide })
      return !shouldHide
    })
  }, [])

  useEffect(() => {
    logger.info("component:floating-member-button:mount")

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      logger.debug?.("component:floating-member-button:scroll", { scrollY: currentScrollY })
      evaluateVisibility()
    }

    const handleResize = () => {
      logger.debug?.("component:floating-member-button:resize")
      evaluateVisibility()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    handleScroll() // Initial check
    evaluateVisibility()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      logger.info("component:floating-member-button:unmount")
    }
  }, [evaluateVisibility])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    logger.info("component:floating-member-button:click", { scrollY })
    onAnchorClick(event)
  }

  return (
    <a
      href="#membership"
      onClick={handleClick}
      className={cn(
        "group fixed right-6 top-1/2 -translate-y-1/2 z-[9999]",
        "flex items-center justify-center",
        "w-16 h-52 rounded-full",
        "relative overflow-hidden",
        "bg-gradient-to-br from-primary via-primary to-primary/90",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/80 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        "border-2 border-primary/60 shadow-2xl",
        "hover:border-primary hover:shadow-primary/40",
        "transition-all duration-500 ease-out",
        "hover:scale-105 hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        "backdrop-blur-sm",
        "animate-[pulse_3s_ease-in-out_infinite]",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}
      style={{ position: 'fixed' }}
      aria-label="Register for Asty Membership"
    >
      {/* Glowing effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl" />
      
      {/* Inner content */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <span 
          className="text-white text-sm font-black uppercase tracking-widest whitespace-nowrap [writing-mode:vertical-lr] [text-orientation:mixed] select-none"
        >
          R E G I S T E R
        </span>
        <div className="flex flex-col items-center gap-1">
          <LogIn 
            className="size-5 text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" 
            aria-hidden="true" 
          />
          <div className="h-0.5 w-8 bg-white/60 rounded-full group-hover:w-10 transition-all duration-300" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 bg-primary rounded-full animate-ping" />
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-[spin_8s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </a>
  )
}
