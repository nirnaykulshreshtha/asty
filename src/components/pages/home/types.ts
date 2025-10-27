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
  CalendarClock,
  Coins,
  FileText,
  GraduationCap,
  HandCoins,
  Handshake,
  LifeBuoy,
  Lock,
  Network,
  PieChart,
  Rocket,
  Share2,
  ShieldCheck,
  Sparkles,
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

export interface HeroValueProp {
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

export interface TokenomicsHighlight {
  title: string
  description: string
  icon: typeof Sparkles
}

export interface DistributionPoint {
  title: string
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
export interface RoadmapStep {
  title: string
  description: string
  icon: typeof Rocket
  status: "in-progress" | "upcoming"
  footnote?: string
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
// Primary navigation - Key items surfaced in the header for currently live sections
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "How It Works", href: "#how" },
  { label: "Early Membership", href: "#membership" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
]

// Secondary navigation - Supporting links surfaced in the footer
export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
  { label: "Whitepaper", href: "#whitepaper" },
]

// Legacy export for backward compatibility
export const NAV_ITEMS: NavItem[] = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS]

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
    href: "#membership",
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
  "Community wealth in motion",
  "Twelve levels, one engine",
  "Dividends drop for life",
]

export const HERO_PILLARS: HeroPillar[] = [
  {
    title: "Educate",
    description: "Empower yourself with on-chain learning and community-driven insights.",
    icon: GraduationCap,
  },
  {
    title: "Facilitate",
    description: "Build and use tools that support creators, traders, and educators across the ecosystem.",
    icon: Wrench,
  },
  {
    title: "Refer",
    description: "Grow the network through trust-based links and earn from real participation, not hype.",
    icon: Share2,
  },
]

export const HERO_VALUE_PROPS: HeroValueProp[] = [
  {
    title: "21 Million Fixed Supply",
    description: "On-chain, verifiable cap keeps scarcity permanent.",
    icon: PieChart,
  },
  {
    title: "Hyper-Deflationary Model",
    description: "Automated burns tighten float as community activity accelerates.",
    icon: AlertOctagon,
  },
  {
    title: "Vault-Powered Rewards",
    description: "Vault yield routes directly to holders with transparent tracking.",
    icon: HandCoins,
  },
  {
    title: "Early Network Advantage",
    description: "Founding positions lock priority across referrals and presale access.",
    icon: Rocket,
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
      "",
  },
  {
    title: "Build With Referrals",
    description:
      "",
  },
  {
    title: "Earn Dividends",
    description:
      "",
  },
]

export const POSITION_ADVANTAGES: PositionAdvantage[] = [
  {
    title: "Top positions earn more",
    description: "Highest referral and Vault share routes to the earliest placements.",
    icon: Trophy,
  },
  {
    title: "Slots are permanent",
    description: "Once you secure a position it cannot be displaced or reassigned.",
    icon: Lock,
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
    description: "Fixed issuance aligned with the Vault keeps scarcity real.",
    icon: PieChart,
  },
  {
    title: "Hyper-Deflationary",
    value: "Built-in burns",
    description: "Automated mechanics contract supply as activity scales.",
    icon: AlertOctagon,
  },
  {
    title: "Vault-Powered Yield",
    value: "Holders earn",
    description: "Every transaction reinforces the Vault and shares rewards back.",
    icon: HandCoins,
  },
  {
    title: "Community-Driven",
    value: "No speculation",
    description: "Participation, not hype, drives long-term value in the ecosystem.",
    icon: Users,
  },
]

export const TOKENOMICS_HIGHLIGHTS: TokenomicsHighlight[] = [
  {
    title: "Total Supply: 21,000,000 ASTY",
    description: "The cap is immutable and tied to Vault growth.",
    icon: PieChart,
  },
  {
    title: "Hyper-Deflationary",
    description: "Burn mechanics reduce float with every ecosystem action.",
    icon: AlertOctagon,
  },
  {
    title: "Vault-Powered Yield",
    description: "Transparent rewards flow back to every holder in the network.",
    icon: HandCoins,
  },
  {
    title: "Sustainable Ecosystem",
    description: "Community activity fuels value—no middlemen, no speculation.",
    icon: Users,
  },
]

export const VAULT_DISTRIBUTION_POINTS: DistributionPoint[] = [
  {
    title: "Biweekly & yearly payouts",
    description: "Routine distributions land in wallets on a predictable cadence.",
    icon: CalendarClock,
  },
  {
    title: "Weighted by contribution",
    description: "Token holdings and network position define each holder's share.",
    icon: Network,
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
    title: "",
    description: "Every referral, every trade, every tool – builds income for the community.",
    icon: GraduationCap,
  },
  {
    title: "",
    description: "No middlemen. Just the Vault and holders.",
    icon: HandCoins,
  }
]

export const COMMUNITY_INCOME_BENEFITS: IncomeBenefit[] = [
  {
    title: "Lifetime Passive Income",
    description: "Earned through Vault distributions that reward positions forever.",
    icon: Coins,
  },
  {
    title: "Early Entry Advantage",
    description: "Top positions collect long-term benefits across referrals and dividends.",
    icon: Rocket,
  },
  {
    title: "DeFi+ Community Power",
    description: "Sustainable, transparent model anchored to real community activity.",
    icon: Users,
  },
  {
    title: "Value Appreciation",
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
    title: "21 Million Fixed Supply",
    detail: "Scarcity is hard-coded. Every token ties back to the Vault economy.",
    icon: PieChart,
  },
  {
    title: "Hyper-Deflationary Model",
    detail: "Burn mechanics reduce float as community-driven activity accelerates.",
    icon: AlertOctagon,
  },
  {
    title: "Vault-Based Income",
    detail: "Network actions generate real, transparent cash flow for participants.",
    icon: HandCoins,
  },
  {
    title: "Early Entry Advantage",
    detail: "Secure a founding position before the referral tree locks in full.",
    icon: Rocket,
  },
]

// Roadmap data
export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    title: "Network Launch",
    description: "Early participants secure top positions in the 12-level structure.",
    icon: Rocket,
    status: "in-progress",
  },
  {
    title: "Presale",
    description: "Limited 21M supply prioritized for founding members.",
    icon: Coins,
    status: "upcoming",
  },
  {
    title: "DAO Referral Activation",
    description: "Bridge to the underlying DEX layer to start referral earnings.",
    icon: Handshake,
    status: "upcoming",
  },
  {
    title: "DeFi Live",
    description: "Vault distributions begin with biweekly and yearly cycles.",
    icon: Sparkles,
    status: "upcoming",
  },
  {
    title: "Asty School",
    description: "Launch the education layer to onboard and train traders.",
    icon: GraduationCap,
    status: "upcoming",
  },
  {
    title: "Tools",
    description: "Deploy trader utilities that amplify ecosystem revenue streams.",
    icon: Wrench,
    status: "upcoming",
  },
]

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
    title: "Community Hub",
    description: "Tap into Telegram and social channels to coordinate launches.",
    href: "https://t.me/asty",
    external: true,
  },
]
