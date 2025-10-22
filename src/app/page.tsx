"use client"

/**
 * Asty Meme Landing Page
 * ----------------------
 * Transforms the previously corporate home experience into a meme-forward showcase starring the Asty mascot.
 * Loads rotating catchphrases, hero bursts, and a meme gallery while preserving core CTA flows and accessibility.
 * Aggressive runtime logging traces render, interactions, and animation state for debugging and future iterations.
 */

import Image from "next/image"
import Link from "next/link"
import type { MouseEvent as ReactMouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Menu, ShieldCheck, Sparkles, TrendingUp, X } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { astroz } from "@/styles/fonts"
import AstyCharacter from "@/assets/images/asty character.png"

const NAV_ITEMS = [
  { label: "Memes", href: "#memes" },
  { label: "How It Works", href: "#how" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
]

const HERO_CTAS = [
  {
    label: "Summon The Vault",
    href: "#buy",
    variant: "default" as const,
    tone: "primary",
  },
  {
    label: "View Meme-onomics",
    href: "#tokenomics",
    variant: "secondary" as const,
    tone: "secondary",
  },
  {
    label: "Join The Chaos",
    href: "#community",
    variant: "outline" as const,
    tone: "outline",
  },
]

const HERO_VARIANTS = [
  {
    id: "solar-pop",
    borderClass: "border-[#FFB347]/60",
    gradientClass: "from-[#FFF6D4]/50 via-background to-[#FFB347]/20",
    bubbleClass: "bg-[#FFB347] text-[#4C2700]",
    stickerClass: "-rotate-3 saturate-150 drop-shadow-[0_14px_22px_rgba(255,179,71,0.35)]",
  },
  {
    id: "vapor-dream",
    borderClass: "border-[#B366FF]/60",
    gradientClass: "from-[#F4E6FF]/60 via-background to-[#B366FF]/20",
    bubbleClass: "bg-[#B366FF] text-[#220033]",
    stickerClass: "rotate-2 saturate-200 drop-shadow-[0_16px_24px_rgba(179,102,255,0.32)]",
  },
  {
    id: "neon-ice",
    borderClass: "border-[#52D2FF]/60",
    gradientClass: "from-[#E1F8FF]/60 via-background to-[#52D2FF]/25",
    bubbleClass: "bg-[#52D2FF] text-[#003344]",
    stickerClass: "-rotate-1 saturate-150 drop-shadow-[0_16px_28px_rgba(82,210,255,0.35)]",
  },
]

const HERO_BURSTS: string[] = [
  "vault go brrr",
  "hodl the happy monster",
  "airdrop drip eternal",
]

/**
 * Meme card model describing how each Asty reaction should render.
 */
type MascotMeme = {
  id: string
  caption: string
  reaction: string
  badge: string
  transform: string
  background: string
}

const MASCOT_MEMES: MascotMeme[] = [
  {
    id: "moon-walk",
    caption: "When gas fees finally chill",
    reaction: "Asty casually moonwalks across the dashboard.",
    badge: "vibe check",
    transform: "rotate-2",
    background: "bg-[radial-gradient(circle_at_center,_rgba(255,175,53,0.3),_transparent_60%)]",
  },
  {
    id: "airdrop-alert",
    caption: "Snapshot hits and you actually remembered to hodl",
    reaction: "Double high-five, double rainbow, double yield.",
    badge: "airdrop flex",
    transform: "-rotate-3",
    background: "bg-[radial-gradient(circle_at_center,_rgba(179,102,255,0.32),_transparent_60%)]",
  },
  {
    id: "referral-degen",
    caption: "Prints referral links like it's 2017",
    reaction: "Asty screaming \"SEND LINK\" while raining coins.",
    badge: "degen energy",
    transform: "rotate-1",
    background: "bg-[radial-gradient(circle_at_center,_rgba(82,210,255,0.3),_transparent_60%)]",
  },
  {
    id: "calm-before-pump",
    caption: "Vault balance climbs during your nap",
    reaction: "Sleepy Asty drooling on victory pancakes.",
    badge: "lazy gains",
    transform: "-rotate-2",
    background: "bg-[radial-gradient(circle_at_center,_rgba(255,100,137,0.28),_transparent_60%)]",
  },
]

const CTA_MEMES = [
  {
    title: "Buy ASTY in minutes",
    subtitle: "Summon the vault",
    emoji: "🚀",
  },
  {
    title: "Stake? Nah, just vibing",
    subtitle: "Hold and let Asty drip",
    emoji: "💤",
  },
  {
    title: "Referral chaos activated",
    subtitle: "10% USDT + ASTY",
    emoji: "🎁",
  },
]

const HOW_STEPS = [
  {
    title: "6% Vault Skim",
    description:
      "Every trade tips Asty 6% to go shopping for Aster and stack it in the meme vault treasury.",
  },
  {
    title: "Annual Airdrop",
    description:
      "Twelve months later, Asty yeets the vault and rains Aster on holders based on bag size.",
  },
  {
    title: "Perpetual Growth",
    description:
      "More chaos, more swaps, bigger vault. Diamond hands win the meme compounding race.",
  },
]

const TOKENOMICS_ROWS = [
  { type: "Public Sale", amount: "10 lac", rate: "$0.10", percent: 40 },
  { type: "Private Sale", amount: "10 lac", rate: "$0.20", percent: 80 },
  { type: "Final Sale", amount: "5 lac", rate: "$0.25", percent: 100 },
]

const TOKENOMICS_CARDS = [
  {
    title: "Vault Catalyst",
    body: "6% auto-buys Aster so Asty can scream 'number go up' while topping the vault charts.",
  },
  {
    title: "Holder Alignment",
    body: "Meme loyalty pays: the longer you hodl, the spicier your share of the annual Aster dump.",
  },
  {
    title: "BNB Native",
    body: "Low-fee BNB vibes keep swaps smooth so the meme machine can stay in perpetual motion.",
  },
]


const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    detail: "Token launch + DEX listing",
    status: "complete",
    quarter: "Q2 2024",
    progress: 100,
  },
  {
    phase: "Phase 2",
    detail: "Vault automation + dashboard",
    status: "active",
    quarter: "Q1 2025",
    progress: 65,
  },
  {
    phase: "Phase 3",
    detail: "Cross-DEX integration with Aster",
    status: "upcoming",
    quarter: "Q3 2025",
    progress: 25,
  },
  {
    phase: "Phase 4",
    detail: "Global community expansion",
    status: "upcoming",
    quarter: "Q4 2025",
    progress: 10,
  },
] as const

const ROADMAP_STATUS_META: Record<
  (typeof ROADMAP_PHASES)[number]["status"],
  {
    label: string
    badgeClass: string
    glowClass: string
    progressClass: string
  }
> = {
  complete: {
    label: "Complete",
    badgeClass: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    glowClass: "from-emerald-400/25",
    progressClass: "bg-emerald-400",
  },
  active: {
    label: "In Flight",
    badgeClass: "border-primary/40 bg-primary/15 text-primary",
    glowClass: "from-primary/30",
    progressClass: "bg-primary",
  },
  upcoming: {
    label: "Queued",
    badgeClass: "border-border/60 bg-border/15 text-muted-foreground",
    glowClass: "from-border/25",
    progressClass: "bg-border/80",
  },
}

const FAQ_ITEMS = [
  {
    question: "What is the 6% tax?",
    answer:
      "Every ASTY swap allocates 6% to buy Aster on the open market, sending purchased tokens straight to the Aster Vault contract.",
  },
  {
    question: "When are rewards paid?",
    answer:
      "Vault snapshots occur continuously, and Aster rewards are distributed once every 12 months to eligible wallets.",
  },
  {
    question: "Do I need to stake?",
    answer:
      "No staking or lock-ups are required. Simply hold ASTY in a non-custodial wallet to qualify for rewards.",
  },
  {
    question: "How is the Vault secured?",
    answer:
      "The Vault runs on audited smart contracts with multi-sig controls and transparent, on-chain reporting.",
  },
  {
    question: "What chains are supported?",
    answer:
      "Asty is native to the BNB Chain with planned cross-chain liquidity once governance approves the deployment.",
  },
  {
    question: "Where can I buy ASTY?",
    answer:
      "Buy ASTY directly on Aster DEX or any partner exchange listed in the Join Community section.",
  },
]

const COMMUNITY_CARDS = [
  {
    title: "Join Telegram",
    description: "Chat with vault keepers and get launch alerts in real time.",
    href: "https://t.me/asty",
    external: true,
  },
  {
    title: "Read Whitepaper",
    description: "Dive into the token design, audits, and treasury mechanics.",
    href: "#whitepaper",
    external: false,
  },
]

const CORE_GOALS = [
  {
    title: "Grow Aster Ecosystem",
    description: "Build awareness and education around Aster DEX and the Aster token.",
  },
  {
    title: "Deliver Passive Income",
    description: "Offer lifetime passive income for ASTY holders via the tax-to-vault model.",
  },
  {
    title: "Strengthen Community",
    description: "Create a vibrant, transparent community that supports both Asty and Aster.",
  },
]

const TOKENOMICS_SUMMARY = [
  {
    title: "Total Supply",
    value: "25 lac ASTY",
    description: "Structured across three sale phases with locked liquidity backing.",
    icon: Sparkles,
  },
  {
    title: "Vault Tax",
    value: "6% per trade",
    description: "Auto-converts into Aster and compounds inside the shared Vault.",
    icon: TrendingUp,
  },
  {
    title: "Annual Drop",
    value: "Every 12 months",
    description: "Aster payouts proportional to holdings at snapshot time.",
    icon: ShieldCheck,
  },
]

type ToastState = {
  message: string
  visible: boolean
}

/**
 * Renders the meme-forward Asty landing page. Handles interactive navigation, rotating hero bursts,
 * and scroll-triggered reveals while logging aggressively for diagnostics.
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
  const heroBurst = HERO_BURSTS[heroBurstIndex] ?? HERO_BURSTS[0]

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
    logger.info("page:home:memes:init", { totalMemes: MASCOT_MEMES.length })
  }, [])

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
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg"
      >
        Skip to main content
      </a>

      <div aria-live="polite" className="sr-only">
        {toast.visible ? toast.message : ""}
      </div>

      {toast.visible ? (
        <div className="fixed right-4 top-24 z-50 w-72 rounded-lg border border-border/70 bg-card/95 p-4 text-sm shadow-xl backdrop-blur">
          <p className="font-semibold text-primary">Heads up</p>
          <p className="mt-1 text-muted-foreground">{toast.message}</p>
        </div>
      ) : null}

      <header
        id="site-header"
        className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="#hero"
            onClick={handleAnchorClick}
            className="group relative flex items-center gap-3"
            aria-label="Back to Asty hero"
          >
            <span className="relative isolate rounded-md border border-border/60 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 px-3 py-2 text-primary transition-transform duration-200 group-hover:-translate-y-0.5">
              <span className={cn("text-lg font-black tracking-[0.6em]", astroz.className)}>
                ASTY
              </span>
            </span>
            <span className="hidden text-xs uppercase text-muted-foreground tracking-[0.45em] md:block">
              Earn Forever
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-md border border-border/70 bg-background/80 text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 lg:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">Toggle navigation</span>
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            "lg:hidden",
            mobileOpen ? "block border-t border-border/50 bg-background/95 backdrop-blur" : "hidden"
          )}
        >
          <nav aria-label="Mobile navigation" className="mx-auto max-w-6xl px-6 pb-6">
            <ul className="flex flex-col gap-3 pt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleAnchorClick}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-card/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-4 opacity-60" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section
          id="hero"
          data-section-label="Hero"
          className="relative grid gap-16 border-b border-border/40 py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-32"
        >
          <div className="flex flex-col justify-center gap-10">
            <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] shadow-md transition",
                  heroVariant.bubbleClass
                )}
              >
                <span className="rounded-full border border-current/40 bg-background/80 px-2 py-1 text-[0.55rem] tracking-[0.45em]">
                  Live
                </span>
                <span className="tracking-tight normal-case">{heroBurst}</span>
              </span>
            </div>
              <h1
                data-animate-hero
                className={cn(
                  "text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl",
                  astroz.className
                )}
              >
                Earn Forever with Every Transaction
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
              Community-driven DeFi on BNB Chain. Every ASTY trade funds the Aster Vault and pays Aster rewards yearly to loyal holders.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {HERO_CTAS.map((cta) => (
                <Button
                  key={cta.label}
                  asChild
                  variant={cta.variant}
                  size="lg"
                  className={cn(
                    "group transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl",
                    cta.tone === "outline" ? "backdrop-blur" : ""
                  )}
                >
                  <Link href={cta.href} onClick={handleAnchorClick}>
                    {cta.label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <span className="rounded-full border border-border/60 px-3 py-1">
                Meme-first BNB chain
              </span>
              <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
              <span className="rounded-full border border-border/60 px-3 py-1">Vault tax = drip</span>
            </div>
          </div>

          <div
            className="reveal-section relative isolate flex justify-center"
            data-animate-on-scroll
            data-visible="false"
          >
            <div
              className={cn(
                "relative w-full max-w-md overflow-hidden rounded-[2.75rem] border bg-gradient-to-br p-8 shadow-2xl transition",
                heroVariant.borderClass,
                heroVariant.gradientClass
              )}
            >
              <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
                <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.6),_transparent_65%)] blur-3xl" />
              </div>

              <div className="relative space-y-5">
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Vault drip</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">$2,450,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Boost</p>
                    <p className="mt-2 text-xl font-bold text-primary">+18.4%</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Referral chaos</p>
                  <p className="mt-2 text-base text-foreground">
                    10% USDT + 10% ASTY for every friend you convert into a meme believer.
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex flex-col items-center gap-4">
                <div className="relative">
                  <Image
                    src={AstyCharacter}
                    alt="Asty the meme monster waving hello"
                    priority
                    className={cn(
                      "h-auto w-56 select-none transition-transform duration-500 ease-out will-change-transform",
                      heroVariant.stickerClass,
                      motionReduced ? "" : "hover:scale-105"
                    )}
                  />
                  <span
                    className="absolute -right-6 top-6 rounded-full border border-primary/50 bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-md"
                  >
                    Hi fren
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="buy"
          data-section-label="Buy ASTY"
          className="grid gap-8 border-b border-border/40 py-20 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div
            className="reveal-section rounded-3xl border border-border/50 bg-card/60 p-8 shadow-2xl"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <span className="rounded-full border border-border/60 px-3 py-1">How to ape calmly</span>
              <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
              <span className="rounded-full border border-border/60 px-3 py-1">3 step meme plan</span>
            </div>
            <h2 className={cn("mt-6 text-3xl text-foreground sm:text-4xl", astroz.className)}>
              Buy ASTY in minutes
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Connect, swap, and vibe. Asty handles the spreadsheets so you can focus on the memes.
            </p>
            <ol className="mt-6 space-y-4 text-sm text-foreground">
              <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                  1
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Connect wallet</h3>
                  <p className="text-muted-foreground">MetaMask, Rabby, WalletConnect—pick your meme mobile.</p>
                </div>
              </li>
              <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                  2
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Swap on Aster DEX</h3>
                  <p className="text-muted-foreground">
                    Dial in your slippage, smash confirm, and watch the vault counter go brrr.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                  3
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Hold and earn</h3>
                  <p className="text-muted-foreground">
                    Snapshots log every bag. Sit tight and claim the annual Aster confetti drop.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <aside
            className="reveal-section flex flex-col justify-between gap-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Referral bounty</h3>
              <p className="text-sm text-muted-foreground">
                Share your invite link and collect <strong>10% USDT</strong> + <strong>10% ASTY</strong> from every
                meme recruit.
              </p>
              <div className="grid gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {CTA_MEMES.map((cta) => (
                  <div key={cta.title} className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/80 px-4 py-3">
                    <div>
                      <p className="text-foreground">{cta.emoji} {cta.title}</p>
                      <p className="text-muted-foreground">{cta.subtitle}</p>
                    </div>
                    <ArrowRight className="size-4 opacity-60" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="justify-between bg-primary text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <Link href="#community" onClick={handleAnchorClick}>
                Generate your referral link
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </aside>
        </section>

        <section
          id="how"
          data-section-label="How It Works"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Mechanics
            </p>
            <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
              How it works
            </h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Asty powers the Aster Vault with every transaction. Holders gain compounding exposure without
              lifting a finger, making the meme machine keep printing.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {HOW_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="reveal-section flex flex-col gap-4 rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg transition hover:border-primary/40 hover:-translate-y-1"
                data-animate-on-scroll
                data-visible="false"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-base font-semibold text-primary">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="tokenomics"
          data-section-label="Tokenomics"
          className="relative space-y-12 overflow-hidden border-b border-border/40 px-4 py-20"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
            <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,68,255,0.35),_transparent_60%)] blur-3xl" />
            <div className="absolute -bottom-40 right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(73,110,255,0.25),_transparent_60%)] blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,transparent_45%,rgba(255,255,255,0.04)_90%)]" />
          </div>

          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              The Numbers
            </p>
            <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
              Token distribution
            </h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Transparent allocations designed to fuel sustainable liquidity and the tax-to-vault engine.
            </p>
          </div>

          <div
            className="reveal-section relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl sm:p-10"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,68,255,0.18),_transparent_60%)]" />
            <div className="relative grid gap-6 md:grid-cols-3">
              {TOKENOMICS_SUMMARY.map((item) => (
                <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        {item.title}
                      </p>
                      <p className="text-lg font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="reveal-section overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-2xl"
            data-animate-on-scroll
            data-visible="false"
          >
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Asty token sale allocation table</caption>
              <thead className="bg-background/70 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th scope="col" className="px-6 py-4"></th>
                  <th scope="col" className="px-6 py-4">Type</th>
                  <th scope="col" className="px-6 py-4">Amount</th>
                  <th scope="col" className="px-6 py-4">Rate</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {TOKENOMICS_ROWS.map((row, index) => (
                  <tr
                  key={row.type}
                  className={cn(
                    "group relative overflow-hidden border-t border-border/40 transition hover:bg-background/80",
                    index % 2 === 0 ? "bg-background/30" : "bg-background/20"
                  )}
                >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 hidden rounded-e-full bg-primary/15 transition-all duration-500 group-hover:bg-primary/25 md:block"
                      style={{ width: `${row.percent}%` }}
                    />
                    <th scope="row" className="px-6 py-5 font-semibold text-foreground">
                      {row.type}
                      <span className="mt-1 block text-xs font-medium uppercase tracking-[0.3em] text-primary/70">
                        {row.percent}% allocation
                      </span>
                    </th>
                    <td className="px-6 py-5 align-top text-muted-foreground">
                      <div className="rounded-2xl border border-border/40 bg-background/75 px-4 py-3 text-sm">
                        {row.amount}
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-muted-foreground">
                      <div className="rounded-2xl border border-border/40 bg-background/75 px-4 py-3 text-sm">
                        {row.rate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TOKENOMICS_CARDS.map((card) => (
              <article
                key={card.title}
                className="reveal-section flex flex-col gap-3 rounded-3xl border border-border/50 bg-card/50 p-6 shadow-lg transition hover:border-primary/40 hover:-translate-y-1"
                data-animate-on-scroll
                data-visible="false"
              >
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </article>
            ))}
          </div>

          <div
            className="reveal-section rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/15 via-background to-accent/15 p-6 text-sm text-foreground shadow-xl"
            data-animate-on-scroll
            data-visible="false"
          >
            <p className="font-semibold">
              Referral: <span className="text-primary">10% USDT</span> +{" "}
              <span className="text-primary">10% ASTY tokens</span>.
            </p>
            <p className="mt-2 text-muted-foreground">
              Tax: 6% per transaction routed to Vault buys Aster.
            </p>
          </div>
        </section>

        <section
          id="memes"
          data-section-label="Meme Vault"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Meme Evidence
            </p>
            <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
              Asty reaction vault
            </h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Screenshotted straight from the community group chat. Each card captures a moment the meme mascot
              lost its chill.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {MASCOT_MEMES.map((meme) => (
              <article
                key={meme.id}
                className={cn(
                  "reveal-section relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 shadow-2xl transition hover:-translate-y-1",
                  meme.background
                )}
                data-animate-on-scroll
                data-visible="false"
              >
                <div className="absolute -left-10 -top-10 size-32 rounded-full bg-background/40 blur-3xl" aria-hidden="true" />
                <header className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {meme.badge}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    #{meme.id}
                  </span>
                </header>
                <p className="mt-4 text-lg font-semibold text-foreground">{meme.caption}</p>
                <p className="mt-2 text-sm text-muted-foreground">{meme.reaction}</p>

                <div className="mt-6 flex items-end justify-center">
                  <Image
                    src={AstyCharacter}
                    alt="Asty the meme monster reaction"
                    className={cn(
                      "h-auto w-40 object-contain transition-all duration-500 ease-out",
                      meme.transform,
                      motionReduced ? "" : "hover:scale-[1.07]"
                    )}
                  />
                </div>
              </article>
            ))}
          </div>

          <aside
            className="reveal-section grid gap-4 rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg md:grid-cols-3"
            data-animate-on-scroll
            data-visible="false"
          >
            {CORE_GOALS.map((goal) => (
              <div key={goal.title} className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
                  {goal.title}
                </p>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section
          id="roadmap"
          data-section-label="Roadmap"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Forward Motion
            </p>
            <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
              Roadmap
            </h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Shipping in transparent phases to expand the Vault flywheel and cross-chain reach.
            </p>
          </div>

          <div
            className="reveal-section relative overflow-hidden rounded-[3rem] border border-border/60 bg-card/60 p-8 shadow-2xl md:p-12"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="pointer-events-none absolute inset-0 opacity-80">
              <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,68,255,0.25),_transparent_60%)] blur-3xl" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(73,110,255,0.25),_transparent_60%)] blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(255,255,255,0.05)_90%)]" />
            </div>

            <div className="relative mx-auto max-w-5xl">
              <div className="pointer-events-none absolute inset-y-0 left-4 hidden w-px bg-gradient-to-b from-primary/40 via-border/40 to-transparent md:block" />
              <div className="pointer-events-none absolute inset-y-0 right-4 hidden w-px bg-gradient-to-b from-transparent via-border/40 to-primary/40 md:block" />

              <ol className="relative grid gap-8 md:grid-cols-2">
                {ROADMAP_PHASES.map((item, index) => {
                  const meta = ROADMAP_STATUS_META[item.status]

                  return (
                    <li
                      key={item.phase}
                      className="group relative rounded-3xl border border-border/40 bg-background/70 p-6 shadow-lg transition hover:border-primary/50 hover:shadow-xl"
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          meta.glowClass,
                          "to-transparent"
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative flex items-start justify-between gap-4">
                        <span className={cn("text-sm font-semibold uppercase tracking-[0.3em]", astroz.className)}>
                          {item.phase}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]",
                            meta.badgeClass
                          )}
                        >
                          {meta.label}
                        </span>
                      </div>

                      <p className="relative mt-3 text-sm text-muted-foreground">{item.detail}</p>

                      <div className="relative mt-6 space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          <span>{item.quarter}</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full border border-border/60 bg-background/60 p-0.5">
                          <div
                            className={cn("h-full rounded-full transition-all duration-700", meta.progressClass)}
                            style={{ width: `${item.progress}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div className="relative mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex size-8 items-center justify-center rounded-full border border-border/50 bg-background/80 font-semibold text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="flex-1">
                          {item.status === "complete"
                            ? "Milestone shipped and audited."
                            : item.status === "active"
                              ? "Engineering in progress with weekly updates."
                              : "Awaiting governance vote and ecosystem readiness."}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="faq"
          data-section-label="FAQ"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </p>
            <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
              Frequently asked questions
            </h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Everything you need to know about the tax-to-vault design, rewards, and security.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="reveal-section overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-lg data-[state=open]:border-primary/40"
                data-animate-on-scroll
                data-visible="false"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-base font-semibold text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section
          id="community"
          data-section-label="Community"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Stay Connected
            </p>
            <h2 className={cn("text-4xl text-foreground sm:text-5xl", astroz.className)}>
              Join the community
            </h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Coordinate with builders, ambassadors, and liquidity partners to shape the next era of the Aster Vault.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {COMMUNITY_CARDS.map((card) => (
              <article
                key={card.title}
                className="reveal-section flex flex-col justify-between gap-5 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-background to-accent/15 p-6 shadow-xl"
                data-animate-on-scroll
                data-visible="false"
              >
                <div>
                  <h3 className={cn("text-2xl text-foreground", astroz.className)}>{card.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{card.description}</p>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="justify-between border-border/60 bg-background/70 text-foreground transition hover:-translate-y-0.5 hover:border-primary/60"
                >
                  {card.href.startsWith("#") ? (
                    <Link href={card.href} onClick={handleAnchorClick}>
                      <span>{card.external ? "Open" : "Explore"}</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link href={card.href} target="_blank" rel="noopener noreferrer">
                      <span>{card.external ? "Open" : "Explore"}</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </Button>
              </article>
            ))}
          </div>
        </section>

        <div id="whitepaper" data-section-label="Whitepaper" className="sr-only" aria-hidden="true" />
      </main>

      <footer className="border-t border-border/40 bg-background/90 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className={cn("text-2xl tracking-[0.6em] text-primary", astroz.className)}>ASTY</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Celestial Vault contract address:{" "}
              <span className="font-mono text-foreground">0xASTY000000000000000000000000</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Asty. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer links" className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Follow Asty</p>
            <ul className="flex flex-wrap gap-4">
              <li>
                <a
                  href="https://x.com/asty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M3 3h4.5l4.05 5.7L15.6 3H21l-7.05 9.5L21 21h-4.5l-4.5-6.3-5 6.3H3l7.65-10z"
                    />
                  </svg>
                  <span>X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/asty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M21.5 4.5 3.2 11.1c-1.3.5-1.3 1.3-.2 1.6l4.6 1.4 1.8 5.8c.2.5.3.7.7.7.4 0 .5-.2.6-.6l.9-3.1 4.7 3.5c.9.5 1.5.2 1.7-.8l3-14.3c.3-1.2-.4-1.7-1.1-1.4Z"
                    />
                  </svg>
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M20.3 4.3A16.3 16.3 0 0 0 16.6 3l-.5 1.1c-1-.3-2-.5-3.1-.5-1.1 0-2.1.2-3.1.5L9.4 3a16 16 0 0 0-3.7 1.3C3 8.1 2.3 11.6 2.5 15c1 1.3 2.4 2.5 4 3.3l.8-1.2c.6.3 1.2.5 1.9.7l.3-.8c.4.1.9.2 1.3.2.4 0 .9 0 1.3-.2l.3.8c.7-.1 1.3-.4 1.9-.7l.8 1.2c1.6-.8 3-2 4-3.3.3-3.6-.5-6.9-2.8-10.7ZM9.7 14c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Zm4.6 0c-.7 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Z"
                    />
                  </svg>
                  <span>Discord</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}
