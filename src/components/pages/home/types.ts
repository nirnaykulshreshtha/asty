/**
 * Homepage Types and Constants
 * ---------------------------
 * Centralized type definitions and constant data for the Asty homepage components.
 * Contains all navigation items, hero variants, meme data, and other static content.
 * 
 * This file serves as the single source of truth for homepage data to ensure
 * consistency across all refactored components.
 */

import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react"

// Navigation types
export interface NavItem {
  label: string
  href: string
}

// Hero section types
export interface HeroCta {
  label: string
  href: string
  variant: "default" | "secondary" | "outline"
  tone: "primary" | "secondary" | "outline"
}

export interface HeroVariant {
  id: string
  borderClass: string
  gradientClass: string
  bubbleClass: string
  stickerClass: string
}

// Meme types
export interface MascotMeme {
  id: string
  caption: string
  reaction: string
  badge: string
  transform: string
  background: string
}

export interface CtaMeme {
  title: string
  subtitle: string
  emoji: string
}

// How it works types
export interface HowStep {
  title: string
  description: string
}

// Tokenomics types
export interface TokenomicsRow {
  type: string
  amount: string
  rate: string
  percent: number
}

export interface TokenomicsCard {
  title: string
  body: string
}

export interface TokenomicsSummary {
  title: string
  value: string
  description: string
  icon: typeof Sparkles
}

// Roadmap types
export interface RoadmapPhase {
  phase: string
  detail: string
  status: "complete" | "active" | "upcoming"
  quarter: string
  progress: number
}

export interface RoadmapStatusMeta {
  label: string
  badgeClass: string
  glowClass: string
  progressClass: string
}

// FAQ types
export interface FaqItem {
  question: string
  answer: string
}

// Community types
export interface CommunityCard {
  title: string
  description: string
  href: string
  external: boolean
}

export interface CoreGoal {
  title: string
  description: string
}

// Toast state
export interface ToastState {
  message: string
  visible: boolean
}

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { label: "Memes", href: "#memes" },
  { label: "How It Works", href: "#how" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
]

// Hero CTAs
export const HERO_CTAS: HeroCta[] = [
  {
    label: "Summon The Vault",
    href: "#buy",
    variant: "default",
    tone: "primary",
  },
  {
    label: "View Meme-onomics",
    href: "#tokenomics",
    variant: "secondary",
    tone: "secondary",
  },
  {
    label: "Join The Chaos",
    href: "#community",
    variant: "outline",
    tone: "outline",
  },
]

// Hero variants for rotating themes
export const HERO_VARIANTS: HeroVariant[] = [
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

// Hero burst messages
export const HERO_BURSTS: string[] = [
  "vault go brrr",
  "hodl the happy monster",
  "airdrop drip eternal",
]

// Mascot meme data
export const MASCOT_MEMES: MascotMeme[] = [
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

// CTA memes for referral section
export const CTA_MEMES: CtaMeme[] = [
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

// How it works steps
export const HOW_STEPS: HowStep[] = [
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

// Tokenomics data
export const TOKENOMICS_ROWS: TokenomicsRow[] = [
  { type: "Public Sale", amount: "10 lac", rate: "$0.10", percent: 40 },
  { type: "Private Sale", amount: "10 lac", rate: "$0.20", percent: 80 },
  { type: "Final Sale", amount: "5 lac", rate: "$0.25", percent: 100 },
]

export const TOKENOMICS_CARDS: TokenomicsCard[] = [
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

export const TOKENOMICS_SUMMARY: TokenomicsSummary[] = [
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

// Roadmap data
export const ROADMAP_PHASES: RoadmapPhase[] = [
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
]

export const ROADMAP_STATUS_META: Record<
  RoadmapPhase["status"],
  RoadmapStatusMeta
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

// FAQ data
export const FAQ_ITEMS: FaqItem[] = [
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

// Community data
export const COMMUNITY_CARDS: CommunityCard[] = [
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

export const CORE_GOALS: CoreGoal[] = [
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
