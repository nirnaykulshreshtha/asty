"use client"

/**
 * Asty Meme Landing Page
 * ----------------------
 * Refactored homepage using modular components for better maintainability.
 * Each section is now a separate component with clear responsibilities.
 * Aggressive runtime logging traces render, interactions, and animation state for debugging.
 */

import type { MouseEvent as ReactMouseEvent } from "react"
import { useEffect, useRef, useState } from "react"

import { logger } from "@/lib/logger"
import { HERO_VARIANTS, HERO_BURSTS, ToastState } from "@/components/pages/home/types"
import { Header } from "@/components/pages/home/Header"
import { HeroSection } from "@/components/pages/home/HeroSection"
import { HowItWorksSection } from "@/components/pages/home/HowItWorksSection"
import { TokenomicsSection } from "@/components/pages/home/TokenomicsSection"
import { MemesSection } from "@/components/pages/home/MemesSection"
import { RoadmapSection } from "@/components/pages/home/RoadmapSection"
import { FAQSection } from "@/components/pages/home/FAQSection"
import { CommunitySection } from "@/components/pages/home/CommunitySection"
import { Footer } from "@/components/pages/home/Footer"
import { Toast } from "@/components/pages/home/Toast"
import { VaultFlowSection } from "@/components/pages/home/VaultFlowSection"
import { TransparencySection } from "@/components/pages/home/TransparencySection"
import { MovementSection } from "@/components/pages/home/MovementSection"
import { MembershipBenefitsGrid } from "@/components/pages/home/MembershipBenefitsGrid"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"
import { useScrollReveal, useParallax } from "@/hooks/useScrollMotion"
import { IntroducingSection } from "@/components/pages/home/IntroducingSection"
import { FloatingMemberButton } from "@/components/pages/home/FloatingMemberButton"


/**
 * Renders the refactored Asty landing page using modular components.
 * Handles interactive navigation, rotating hero bursts, and scroll-triggered reveals.
 */
export default function Home() {
  logger.info("page:home:render", { theme: "memeverse" })

  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false })
  const [heroBurstIndex, setHeroBurstIndex] = useState(0)
  const [motionReduced, setMotionReduced] = useState(false)
  const toastTimeoutRef = useRef<number | null>(null)
  const prefersReducedMotion = useRef(false)

  const heroVariant = HERO_VARIANTS[heroBurstIndex % HERO_VARIANTS.length]

  useScrollReveal({ threshold: 0.25 })
  useParallax({ speed: 0.25, maxShift: 140 })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedMotion.current = mediaQuery.matches
    setMotionReduced(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      prefersReducedMotion.current = event.matches
      setMotionReduced(event.matches)
    }

    mediaQuery.addEventListener("change", listener)

    return () => {
      mediaQuery.removeEventListener("change", listener)
    }
  }, [])

  useEffect(() => {
    if (motionReduced) {
      logger.info("page:home:hero-burst:disable", { reason: "reduced_motion" })
      return
    }

    const interval = window.setInterval(() => {
      setHeroBurstIndex((prev) => (prev + 1) % HERO_BURSTS.length)
    }, 2600)

    logger.info("page:home:hero-burst:init", { totalBursts: HERO_BURSTS.length })

    return () => {
      window.clearInterval(interval)
    }
  }, [motionReduced])

  useEffect(() => {
    logger.debug?.("page:home:hero-burst:update", {
      burst: HERO_BURSTS[heroBurstIndex],
      index: heroBurstIndex,
    })
  }, [heroBurstIndex])

  useEffect(() => {
    const heroHeading = document.querySelector("[data-animate-hero]")
    heroHeading?.classList.add("animate-hero")

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate-on-scroll]")
    )

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.setAttribute("data-visible", "true"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  const showToast = (message: string) => {
    setToast({ message, visible: true })

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current)
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 3200)
  }

  const closeMobileNav = () => setMobileOpen(false)
  const toggleMobileNav = () => setMobileOpen((prev) => !prev)

  const handleAnchorClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const href = event.currentTarget.getAttribute("href")
    if (!href) return

    const section = document.querySelector<HTMLElement>(href)
    if (section) {
      const behavior = prefersReducedMotion.current ? "auto" : "smooth"
      section.scrollIntoView({ behavior, block: "start" })
      const label = section.dataset.sectionLabel ?? href.replace("#", "")
      showToast(`Navigated to ${label} section.`)
    }

    if (mobileOpen) {
      closeMobileNav()
    }
  }

  return (
    <>
      <Toast toast={toast} />
      
      <FloatingMemberButton onAnchorClick={handleAnchorClick} />
      
      <Header 
        onAnchorClick={handleAnchorClick}
        mobileOpen={mobileOpen}
        onMobileNavToggle={toggleMobileNav}
        onMobileNavClose={closeMobileNav}
      />

      <main className="mx-auto max-w-7xl px-6 space-y-24 lg:space-y-32">
        <HeroSection
          heroBurstIndex={heroBurstIndex}
          heroVariant={heroVariant}
          onAnchorClick={handleAnchorClick}
        />

        <MovementSection onAnchorClick={handleAnchorClick} />

        <IntroducingSection />

        {/* <VaultFlowSection onAnchorClick={handleAnchorClick} /> */}

        {/* <section id="income" aria-label="Community income benefits" className="space-y-8">
          <SectionHeader
            label="Community Income"
            title="Holding Asty means owning a share of community-driven income"
            description="Asty rewards real participation, not speculation. Holders benefit directly from the growth of the network and Vault — creating lifetime passive income."
          />
          <MembershipBenefitsGrid motionReduced={motionReduced} />
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton
              href="#membership"
              label="Join Asty Network"
              onClick={handleAnchorClick}
              variant="default"
            />
            <CTAButton
              href="#vault"
              label="Check Vault Rewards"
              onClick={handleAnchorClick}
              variant="outline"
            />
          </div>
        </section> */}

        <HowItWorksSection />

        <TokenomicsSection />

        <MemesSection motionReduced={motionReduced} />

        <RoadmapSection />

        {/* <TransparencySection onAnchorClick={handleAnchorClick} /> */}

        <FAQSection />

        <CommunitySection onAnchorClick={handleAnchorClick} />

        <div id="whitepaper" data-section-label="Whitepaper" className="sr-only" aria-hidden="true" />
      </main>

      <Footer />
    </>
  )
}
