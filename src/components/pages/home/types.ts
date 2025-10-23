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

// Membership highlight types
export interface MembershipHighlight {
  title: string
  subtitle: string
  emoji: string
}

export interface MembershipProgress {
  label: string
  value: string
  accent?: boolean
}

export interface MembershipFact {
  title: string
  description: string
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
  { label: "Membership", href: "#membership" },
  { label: "How It Works", href: "#how" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
]

// Hero CTAs
export const HERO_CTAS: HeroCta[] = [
  {
    label: "Book Early Membership",
    href: "#membership",
    variant: "default",
    tone: "primary",
  },
  {
    label: "Generate Referral Link",
    href: "#community",
    variant: "secondary",
    tone: "secondary",
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
  "Community wealth in motion",
  "Twelve levels, one engine",
  "Dividends drop for life",
]

// Mascot meme data
// Membership data
export const MEMBERSHIP_PROGRESS: MembershipProgress[] = [
  {
    label: "Memberships booked",
    value: "6,320",
  },
  {
    label: "Presale trigger",
    value: "10,000",
    accent: true,
  },
]

export const MEMBERSHIP_FACTS: MembershipFact[] = [
  {
    title: "Dividend cadence",
    description: "Biweekly and annual distributions for every qualified rank.",
  },
  {
    title: "Referral engine",
    description: "12-level network pays whenever your tree grows.",
  },
]

export const MEMBERSHIP_FOUNDATION: CoreGoal[] = [
  {
    title: "Entry Fee",
    description: "$100 per position to secure your spot in the Asty Network.",
  },
  {
    title: "Network Depth",
    description: "Structured 12-level referral network engineered for scale.",
  },
  {
    title: "Redistribution",
    description: "100% of every entry fee is redistributed across the community.",
  },
  {
    title: "Lifetime Eligibility",
    description: "Permanent positions keep you qualified for every future payout.",
  },
]

export const POSITION_BENEFITS: CoreGoal[] = [
  {
    title: "Referral Income",
    description: "Earn across all 12 levels whenever your network books positions.",
  },
  {
    title: "Dividends",
    description: "Collect biweekly and annual dividends through the Aster ecosystem.",
  },
  {
    title: "Rank Upside",
    description: "Climb tiers for a larger share of network-wide distributions.",
  },
  {
    title: "Future Ready",
    description: "Your position carries straight into the presale and DeFi launch.",
  },
]

export const NETWORK_ADVANTAGES: CoreGoal[] = [
  {
    title: "Community First",
    description: "Designed to reward builders and contributors before token launch.",
  },
  {
    title: "Layered Income",
    description: "Multiple revenue streams stack from referrals and dividends.",
  },
  {
    title: "Volume Driven",
    description: "Sustainable model that scales with network activity and growth.",
  },
  {
    title: "Aster Linked",
    description: "Anchored to the Aster ecosystem so value grows with adoption.",
  },
  {
    title: "Permanent Earnings",
    description: "Lock in a position once and earn for life through every expansion.",
  },
]

export const MEMBERSHIP_HIGHLIGHTS: MembershipHighlight[] = [
  {
    title: "Secure Your Position",
    subtitle: "Early memberships are live now for a fixed $100.",
    emoji: "🛡️",
  },
  {
    title: "10,000 Unlock",
    subtitle: "Token presale starts the moment 10,000 memberships are booked.",
    emoji: "🚀",
  },
  {
    title: "Referral Ready",
    subtitle: "Generate your link today and start building your 12-level tree.",
    emoji: "🔗",
  },
]

// How it works steps
export const HOW_STEPS: HowStep[] = [
  {
    title: "Book Your Slot",
    description:
      "Lock in an Early Membership for $100 and claim a permanent position inside the Asty Network.",
  },
  {
    title: "Build Your Network",
    description:
      "Share referral links to grow 12 levels deep and unlock layered earnings across the tree.",
  },
  {
    title: "Earn Dividends",
    description:
      "Earn biweekly and annual dividends plus presale advantages as the ecosystem scales.",
  },
]

// Tokenomics data
export const TOKENOMICS_ROWS: TokenomicsRow[] = [
  { type: "Round 1 Presale", amount: "10 lac ASTY", rate: "Pricing TBA", percent: 40 },
  { type: "Round 2 Presale", amount: "10 lac ASTY", rate: "Pricing TBA", percent: 80 },
  { type: "Round 3 Presale", amount: "5 lac ASTY", rate: "Pricing TBA", percent: 100 },
]

export const TOKENOMICS_CARDS: TokenomicsCard[] = [
  {
    title: "Community Engine",
    body: "Membership sales build the network first so the presale launches with a ready-made demand base.",
  },
  {
    title: "Multi-Layer Rewards",
    body: "Referral income stacks with dividends, rewarding both growth and long-term participation.",
  },
  {
    title: "Aster Integration",
    body: "Directly linked to the Aster ecosystem so treasury growth reflects ecosystem expansion.",
  },
]

export const TOKENOMICS_SUMMARY: TokenomicsSummary[] = [
  {
    title: "Max Supply",
    value: "2.1 crore ASTY",
    description: "Capped issuance ensures scarcity as utility expands across the network.",
    icon: Sparkles,
  },
  {
    title: "Presale Pool",
    value: "25 lac ASTY",
    description: "Allocated across three rounds (10L + 10L + 5L) for early adopters.",
    icon: TrendingUp,
  },
  {
    title: "Launch Trigger",
    value: "10,000 memberships",
    description: "Token presale activates once the first 10k positions are secured.",
    icon: ShieldCheck,
  },
]

// Roadmap data
export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    detail: "Network creation with $100 entry and 12-level referral income.",
    status: "active",
    quarter: "Current Launch",
    progress: 70,
  },
  {
    phase: "Phase 2",
    detail: "Token presale — Early members take priority across all rounds.",
    status: "upcoming",
    quarter: "Triggers at 10k",
    progress: 20,
  },
  {
    phase: "Phase 3",
    detail: "DeFi launch with dividends and referral rewards going live.",
    status: "upcoming",
    quarter: "Post-Presale",
    progress: 5,
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
    question: "What am I purchasing right now?",
    answer:
      "Early Membership grants a $100 lifetime position in the Asty Network. Tokens are not on sale yet—this is purely for network access.",
  },
  {
    question: "When does the token presale launch?",
    answer:
      "The presale opens immediately after 10,000 Early Memberships are booked. Members receive first access to all three rounds.",
  },
  {
    question: "How do referral rewards work?",
    answer:
      "Share your unique link to fill the 12-level tree. Each new position generates income across the entire uplink instantly.",
  },
  {
    question: "What dividends can I expect?",
    answer:
      "Biweekly and annual dividends are distributed based on rank and network performance once the ecosystem is live.",
  },
  {
    question: "Do I need to buy tokens separately?",
    answer:
      "Not yet. Membership sales fund the foundation. You will be notified when presale rounds open so you can participate.",
  },
  {
    question: "Can my position transfer into DeFi products?",
    answer:
      "Yes. Your permanent position follows you into the presale and the upcoming DeFi rollout with no extra steps.",
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
