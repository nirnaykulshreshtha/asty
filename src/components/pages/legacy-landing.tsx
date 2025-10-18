"use client"

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

const NAV_ITEMS = [
  { label: "How It Works", href: "#how" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
]

const HERO_CTAS = [
  {
    label: "Buy ASTY",
    href: "#buy",
    variant: "default" as const,
    tone: "primary",
  },
  {
    label: "View Tokenomics",
    href: "#tokenomics",
    variant: "secondary" as const,
    tone: "secondary",
  },
  {
    label: "Join Community",
    href: "#community",
    variant: "outline" as const,
    tone: "outline",
  },
]

const HOW_STEPS = [
  {
    title: "6% Tax-to-Vault",
    description:
      "Every ASTY transaction allocates 6% to buy Aster and store it in the Vault.",
  },
  {
    title: "Annual Airdrop",
    description:
      "After 12 months, Vault Aster is distributed to all ASTY holders proportional to holdings.",
  },
  {
    title: "Perpetual Growth",
    description:
      "More activity grows the Vault and your future Aster rewards.",
  },
]

const TOKENOMICS_ROWS = [
  { type: "Public Sale", amount: "10 lac", rate: "$0.10" },
  { type: "Private Sale", amount: "10 lac", rate: "$0.20" },
  { type: "Final Sale", amount: "5 lac", rate: "$0.25" },
]

const TOKENOMICS_CARDS = [
  {
    title: "Vault Catalyst",
    body: "6% of every trade purchases Aster and compounds the Vault balance automatically.",
  },
  {
    title: "Holder Alignment",
    body: "Airdrops scale with holdings; the longer you stay, the larger your share of Aster rewards.",
  },
  {
    title: "BNB Native",
    body: "Optimized for the BNB Chain with low fees and deep liquidity on Aster DEX.",
  },
]

const WHY_FEATURES = [
  {
    title: "Transparent",
    description: "Every Vault movement is verifiable on-chain with real-time dashboards.",
    icon: ShieldCheck,
  },
  {
    title: "Sustainable",
    description: "Tax-driven yield keeps rewards flowing without inflationary emissions.",
    icon: TrendingUp,
  },
  {
    title: "Community First",
    description: "Rewards favor long-term holders and community proposals guide the roadmap.",
    icon: Sparkles,
  },
]

const ROADMAP_PHASES = [
  { phase: "Phase 1", detail: "Token launch + DEX listing" },
  { phase: "Phase 2", detail: "Vault automation + dashboard" },
  { phase: "Phase 3", detail: "Cross-DEX integration with Aster" },
  { phase: "Phase 4", detail: "Global community expansion" },
]

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

type ToastState = {
  message: string
  visible: boolean
}

export function LegacyLanding() {
  logger.info("page:home:legacy", { order: 1 })

  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false })
  const toastTimeoutRef = useRef<number | null>(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedMotion.current = mediaQuery.matches

    const listener = (event: MediaQueryListEvent) => {
      prefersReducedMotion.current = event.matches
    }

    mediaQuery.addEventListener("change", listener)

    return () => {
      mediaQuery.removeEventListener("change", listener)
    }
  }, [])

  useEffect(() => {
    const heroHeading = document.querySelector("[data-animate-hero]")
    heroHeading?.classList.add("animate-hero")

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate-on-scroll]")
    )

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
            <span className="relative isolate rounded-md border border-border/60 bg-gradient-to-br from-primary/15 via-transparent to-accent/20 px-3 py-2 font-black tracking-[0.6em] text-primary transition-transform duration-200 group-hover:-translate-y-0.5">
              ASTY
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
              <p className="inline-flex max-w-max items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Asty Protocol
              </p>
              <h1
                data-animate-hero
                className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                Asty — Earn Forever with Every Transaction
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
                Community-driven DeFi on BNB Chain. Every ASTY trade funds the Aster Vault and pays
                Aster rewards yearly to loyal holders.
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
              <span className="rounded-full border border-border/60 px-3 py-1">Built for Aster DEX</span>
              <span className="hidden h-0.5 w-8 bg-border/60 sm:block" aria-hidden="true" />
              <span className="rounded-full border border-border/60 px-3 py-1">BNB Chain</span>
            </div>
          </div>

          <div
            className="reveal-section relative isolate flex justify-center"
            data-animate-on-scroll
            data-visible="false"
          >
            <div className="relative w-full max-w-md rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-accent/20 p-8 shadow-2xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3">
                  <span className="text-sm font-semibold text-muted-foreground">Vault Balance</span>
                  <span className="text-lg font-semibold text-primary">$2,450,000</span>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Next Airdrop
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">183 Days</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hold ASTY to capture your share of the annual Aster rewards.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Current Yield
                  </p>
                  <p className="mt-3 flex items-baseline gap-2 text-2xl font-bold text-primary">
                    18.4%
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      est. APY
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Calculated from trailing 30-day trading volume and vault growth.
                  </p>
                </div>
              </div>

              <div className="mascot-bob absolute -right-10 -top-10 w-28 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/30 via-background to-accent/30 p-4 shadow-xl">
                <svg
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="astro-mascot-title"
                  className="drop-shadow-lg"
                >
                  <title id="astro-mascot-title">Asty floating mascot smiling</title>
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(210 100% 75%)" />
                      <stop offset="100%" stopColor="hsl(280 100% 65%)" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="48" fill="url(#grad)" />
                  <path
                    d="M45 55a7 7 0 1 1 14 0"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M75 55a7 7 0 1 1 14 0"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M45 75c8 8 22 8 30 0"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="60" cy="20" r="10" fill="white" opacity="0.45" />
                </svg>
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
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Buy ASTY in minutes</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Connect your wallet, swap BNB for ASTY, and let the Vault amplify your Aster exposure
              automatically—no staking or complex flows.
            </p>
            <ol className="mt-6 space-y-4 text-sm text-foreground">
              <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                  1
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Connect wallet</h3>
                  <p className="text-muted-foreground">Supports MetaMask, Rabby, and WalletConnect.</p>
                </div>
              </li>
              <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                  2
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Swap on Aster DEX</h3>
                  <p className="text-muted-foreground">
                    Choose your slippage and confirm the ASTY purchase in one click.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-xl border border-border/50 bg-background/80 p-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                  3
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Hold and earn</h3>
                  <p className="text-muted-foreground">
                    Vault snapshots log your holdings—claim airdropped Aster yearly.
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
            <div>
              <h3 className="text-xl font-semibold text-primary">Referral bounty</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Share your invitation link and collect <strong>10% USDT</strong> + <strong>10% ASTY</strong> in bonus tokens on every successful referral.
              </p>
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
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">How it works</h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Asty powers the Aster Vault with every transaction. Holders gain compounding exposure
              without having to lift a finger.
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
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              The Numbers
            </p>
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Tokenomics</h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Transparent allocations designed to fuel sustainable liquidity and the tax-to-vault
              engine.
            </p>
          </div>

          <div className="reveal-section overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-2xl" data-animate-on-scroll data-visible="false">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Asty token sale allocation table</caption>
              <thead className="bg-background/60 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
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
                      "border-t border-border/40 transition hover:bg-background/80",
                      index % 2 === 0 ? "bg-background/40" : "bg-background/20"
                    )}
                  >
                    <th scope="row" className="px-6 py-5 font-semibold text-foreground">
                      {row.type}
                    </th>
                    <td className="px-6 py-5 text-muted-foreground">{row.amount}</td>
                    <td className="px-6 py-5 text-muted-foreground">{row.rate}</td>
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
          id="why"
          data-section-label="Why Asty"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              The Edge
            </p>
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Why Asty</h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Built for resilience and community ownership, Asty aligns incentives between traders,
              vault keepers, and long-term believers.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WHY_FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="reveal-section flex flex-col gap-4 rounded-3xl border border-border/50 bg-card/60 p-6 shadow-lg transition hover:border-primary/40 hover:-translate-y-1"
                data-animate-on-scroll
                data-visible="false"
              >
                <feature.icon className="size-10 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Roadmap</h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Shipping in transparent phases to expand the Vault flywheel and cross-chain reach.
            </p>
          </div>
          <ol className="relative space-y-10 border-l-2 border-border/50 pl-8">
            {ROADMAP_PHASES.map((item, index) => (
              <li
                key={item.phase}
                className="reveal-section relative rounded-3xl border border-border/40 bg-card/60 p-6 shadow-lg transition hover:border-primary/40"
                data-animate-on-scroll
                data-visible="false"
              >
                <span className="absolute -left-[39px] top-6 flex size-8 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{item.phase}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="faq"
          data-section-label="FAQ"
          className="space-y-12 border-b border-border/40 py-20"
        >
          <div className="reveal-section space-y-4" data-animate-on-scroll data-visible="false">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Answers
            </p>
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
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
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Join the community</h2>
            <p className="max-w-3xl text-base text-muted-foreground">
              Coordinate with builders, ambassadors, and liquidity partners to shape the next era of
              the Aster Vault.
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
                  <h3 className="text-2xl font-semibold text-foreground">{card.title}</h3>
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
                    <Link
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
            <p className="text-2xl font-black tracking-[0.6em] text-primary">ASTY</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Aster Vault contract address: <span className="font-mono text-foreground">0xASTY000000000000000000000000</span>
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
