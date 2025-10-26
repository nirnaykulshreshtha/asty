/**
 * Homepage Types and Constants
 * ----------------------------
 * Centralized type definitions and constant data for the Asty homepage components.
 * Contains all navigation items, hero variants, meme data, and other static content.
 * 
 * This file serves as the single source of truth for homepage data to ensure
 * consistency across all refactored components.
 */

import {
  AlertOctagon,
  ArrowBigUpDash,
  Coins,
  FileText,
  GraduationCap,
  HandCoins,
  Layers3,
  LifeBuoy,
  Lock,
  PieChart,
  Rocket,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Vault,
  Wallet,
  Wrench
} from "lucide-react"

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

export interface HeroPillar {
  title: string
  description: string
  icon: typeof GraduationCap
}

export interface AnimatedMetric {
  id: string
  label: string
  value: number
  suffix?: string
  duration?: number
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

export interface VaultFlowStage {
  id: string
  title: string
  description: string
  icon: typeof Users
}

export interface VaultRevenueStream {
  title: string
  description: string
  icon: typeof HandCoins
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

export interface ParticipationPillar {
  title: string
  description: string
  icon: typeof GraduationCap
}

export interface PositionAdvantage {
  title: string
  description: string
  icon: typeof Trophy
}

export interface IncomeBenefit {
  title: string
  description: string
  icon: typeof Coins
}

export interface TransparencyPillar {
  title: string
  description: string
  icon: typeof PieChart
  ctaLabel?: string
  ctaHref?: string
}

export interface MomentumStat {
  title: string
  detail: string
  icon: typeof Rocket
}

// Toast state
export interface ToastState {
  message: string
  visible: boolean
}

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { label: "Vault", href: "#vault" },
  { label: "Why Asty", href: "#participation" },
  { label: "Membership", href: "#membership" },
  { label: "How It Works", href: "#how" },
  { label: "Benefits", href: "#income" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Trust", href: "#trust" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
]

// Hero CTAs
export const HERO_CTAS: HeroCta[] = [
  {
    label: "Join Asty Network",
    href: "#membership",
    variant: "default",
    tone: "primary",
  },
  {
    label: "View Vault Model",
    href: "#vault",
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

export const HERO_PILLARS: HeroPillar[] = [
  {
    title: "Education",
    description: "Empowering DEX users through actionable, community-first content.",
    icon: GraduationCap,
  },
  {
    title: "Referral",
    description: "Driving network growth and shared rewards via a 12-level program.",
    icon: Share2,
  },
  {
    title: "Facilitation",
    description: "Building tools that support trader needs across the Aster ecosystem.",
    icon: Wrench,
  },
]

export const HERO_METRICS: AnimatedMetric[] = [
  {
    id: "members",
    label: "Members Onboarded",
    value: 6320,
    duration: 2.4,
  },
  {
    id: "vault",
    label: "Vault Growth Streams",
    value: 12,
    suffix: "+",
    duration: 1.8,
  },
  {
    id: "rewards",
    label: "Rewards Distributed",
    value: 48,
    suffix: "%",
    duration: 2,
  },
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
    title: "Secure Your Position",
    description:
      "Lock in a $100 Early Membership and cement your place inside the structured ecosystem.",
  },
  {
    title: "Build With Referrals",
    description:
      "Grow a 12-level tree that channels referral earnings straight into the Vault.",
  },
  {
    title: "Earn Dividends",
    description:
      "Collect biweekly and annual Vault distributions as the DeFi layer comes online.",
  },
]

export const POSITION_ADVANTAGES: PositionAdvantage[] = [
  {
    title: "Top share of rewards",
    description: "Early positions receive the highest share of referral and Vault income.",
    icon: Trophy,
  },
  {
    title: "Permanent placement",
    description: "Once you lock a slot, it cannot be displaced—your spot pays forever.",
    icon: Lock,
  },
  {
    title: "Compounding flow",
    description: "Biweekly and yearly Vault payouts stack with every new network action.",
    icon: Vault,
  },
  {
    title: "Built for builders",
    description: "Ideal for network leaders, early supporters, and long-term DeFi participants.",
    icon: Users,
  },
]

// Tokenomics data
export const TOKENOMICS_ROWS: TokenomicsRow[] = [
  { type: "Community Vault", amount: "9,000,000 ASTY", rate: "Vault-driven rewards", percent: 43 },
  { type: "Public Circulation", amount: "5,000,000 ASTY", rate: "Unlocked post-launch", percent: 67 },
  { type: "Strategic Growth", amount: "4,000,000 ASTY", rate: "Governed allocations", percent: 86 },
  { type: "Presale Rounds", amount: "3,000,000 ASTY", rate: "Bi-stage early access", percent: 100 },
]

export const TOKENOMICS_CARDS: TokenomicsCard[] = [
  {
    title: "Hyper-deflationary",
    body: "Built-in burn mechanics tighten supply as usage grows, boosting Vault share per holder.",
  },
  {
    title: "Vault-powered yield",
    body: "Every network action strengthens the Vault, distributing real income across holders.",
  },
  {
    title: "Sustainable ecosystem",
    body: "Community activity, not speculation, drives long-term value inside the Asty layer.",
  },
]

export const TOKENOMICS_SUMMARY: TokenomicsSummary[] = [
  {
    title: "Total Supply",
    value: "21,000,000 ASTY",
    description: "Fixed issuance paired with hyper-deflationary mechanics preserves scarcity.",
    icon: Sparkles,
  },
  {
    title: "Vault Distribution",
    value: "Biweekly & yearly",
    description: "Income flows to holders based on position and token ownership.",
    icon: Vault,
  },
  {
    title: "Network First",
    value: "10,000 memberships",
    description: "Presale unlocks once the community layer reaches critical mass.",
    icon: TrendingUp,
  },
]

export const VAULT_FLOW_STAGES: VaultFlowStage[] = [
  {
    id: "community",
    title: "Community Activity",
    description: "Every referral, lesson, and tool run feeds value into the shared Vault.",
    icon: Users,
  },
  {
    id: "vault",
    title: "Vault",
    description: "The on-chain engine that captures ecosystem revenue and prepares distributions.",
    icon: Vault,
  },
  {
    id: "rewards",
    title: "Rewards",
    description: "Biweekly and yearly payouts route to qualified members and holders.",
    icon: HandCoins,
  },
  {
    id: "holders",
    title: "Holders",
    description: "ASTY holders benefit directly—no intermediaries, just transparent flow.",
    icon: Wallet,
  },
]

export const VAULT_REVENUE_STREAMS: VaultRevenueStream[] = [
  {
    title: "Referral earnings",
    description: "Connected DEX layer funnels referral share into the Vault treasury.",
    icon: Share2,
  },
  {
    title: "Education layer fees",
    description: "Participation in Asty School programs contributes sustainable revenue.",
    icon: GraduationCap,
  },
  {
    title: "Trader tools",
    description: "Utility products launch new income streams that reinforce Vault rewards.",
    icon: Wrench,
  },
]

export const PARTICIPATION_PILLARS: ParticipationPillar[] = [
  {
    title: "Educate",
    description: "Onboard the next wave of DEX users with guided curriculum and support.",
    icon: GraduationCap,
  },
  {
    title: "Reward",
    description: "Share fair income distributions across every contributor in the network.",
    icon: HandCoins,
  },
  {
    title: "Facilitate",
    description: "Deploy tools that strengthen traders and expand the ecosystem flywheel.",
    icon: Layers3,
  },
]

export const COMMUNITY_INCOME_BENEFITS: IncomeBenefit[] = [
  {
    title: "Lifetime passive income",
    description: "Vault distributions reward positions forever once the network activates.",
    icon: Coins,
  },
  {
    title: "Early entry advantage",
    description: "Top placements receive long-term benefits across referrals and dividends.",
    icon: Rocket,
  },
  {
    title: "DeFi + community power",
    description: "Sustainable, transparent model anchored to real ecosystem activity.",
    icon: Users,
  },
  {
    title: "Value appreciation",
    description: "Hyper-deflationary tokenomics create lasting scarcity for holders.",
    icon: ArrowBigUpDash,
  },
]

export const TRANSPARENCY_PILLARS: TransparencyPillar[] = [
  {
    title: "On-chain vault",
    description: "Trackable distributions and balances in real time for every member.",
    icon: Vault,
    ctaLabel: "View Vault Dashboard",
    ctaHref: "#vault",
  },
  {
    title: "Audited contracts",
    description: "Security-first smart contracts reviewed and published for the community.",
    icon: ShieldCheck,
    ctaLabel: "Audit Reports",
    ctaHref: "#community",
  },
  {
    title: "Open reward logic",
    description: "No hidden switches—reward formulas are open, verifiable, and logged.",
    icon: FileText,
  },
  {
    title: "DAO governance",
    description: "Community-first decision making steers treasury and roadmap milestones.",
    icon: LifeBuoy,
  },
]

export const MOMENTUM_STATS: MomentumStat[] = [
  {
    title: "21 Million fixed supply",
    detail: "Scarcity is hard-coded. Every token ties back to the Vault economy.",
    icon: PieChart,
  },
  {
    title: "Hyper-deflationary model",
    detail: "Burn mechanics reduce float as community-driven activity accelerates.",
    icon: AlertOctagon,
  },
  {
    title: "Vault-based income",
    detail: "Network actions generate real, transparent cash flow for participants.",
    icon: HandCoins,
  },
  {
    title: "Early entry advantage",
    detail: "Secure a founding position before the referral tree locks in full.",
    icon: Rocket,
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
    title: "Join Asty Network",
    description: "Secure your membership slot and grow alongside early builders.",
    href: "#membership",
    external: false,
  },
  {
    title: "View Vault Dashboard",
    description: "Track live Vault stats, flows, and historic distributions.",
    href: "#vault",
    external: false,
  },
  {
    title: "Audit Reports",
    description: "Review third-party contract audits and transparency packages.",
    href: "https://example.com/audit-reports",
    external: true,
  },
  {
    title: "Community Hub",
    description: "Tap into Telegram and social channels to coordinate launches.",
    href: "https://t.me/asty",
    external: true,
  },
]
