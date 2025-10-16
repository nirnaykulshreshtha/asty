/**
 * Home Page Content Configuration for Asty
 *
 * Purpose:
 * - Centralize copy and data for the modular homepage.
 * - Enable rapid iteration by editing content without touching components.
 * - Provide typed structure for sections for predictable rendering.
 */

export type HomeSectionId =
  | "hero"
  | "vision"
  | "core-goals"
  | "key-actions"
  | "team-focus"
  | "vault-stats"
  | "token-sale"
  | "cta";

export interface HomeContent {
  order: HomeSectionId[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  vision: {
    title: string;
    description: string;
  };
  coreGoals: {
    title: string;
    items: string[];
  };
  keyActions: {
    title: string;
    items: string[];
  };
  teamFocus: {
    title: string;
    items: { label: string; description: string }[];
  };
  vaultStats: {
    title: string;
    subtitle: string;
  };
  tokenSale: {
    title: string;
    illustrationLabel: string;
    columns: [string, string];
    rows: { tokens: string; rate: string }[];
    referralNote: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
  };
}

export const homeContent: HomeContent = {
  order: [
    "hero",
    "token-sale",
    "vision",
    "core-goals",
    "key-actions",
    "team-focus",
    "vault-stats",
    "cta",
  ],
  hero: {
    eyebrow: "Community-Driven DeFi on BNB Chain",
    title: "Asty rewards loyalty — forever connected to Aster",
    subtitle:
      "6% tax buys Aster into a collective Vault. Every year, the Vault distributes Aster proportionally to ASTY holders.",
    primaryCta: { label: "Launch App", href: "/app" },
    secondaryCta: { label: "Read Docs", href: "/docs" },
  },
  vision: {
    title: "Simple Vision",
    description:
      "Every transaction grows the Vault, every year rewards the holders. Asty aligns incentives with Aster DEX to create a sustainable passive income flywheel.",
  },
  coreGoals: {
    title: "Core Goals",
    items: [
      "Build awareness for Aster DEX and Aster token",
      "Offer lifetime passive income via tax-to-vault",
      "Foster a transparent, vibrant community",
    ],
  },
  keyActions: {
    title: "Key Actions",
    items: [
      "Develop and audit smart contracts for tax and distributions",
      "Launch educational content explaining Asty mechanics",
      "Build a real-time dashboard for Vault and rewards",
      "Run community outreach, contests, and AMAs",
    ],
  },
  teamFocus: {
    title: "Team Focus",
    items: [
      { label: "Dev Team", description: "Contracts, dashboard, vault automation" },
      { label: "Content Team", description: "Education for Aster & Asty" },
      { label: "Community", description: "Socials, events, holder engagement" },
      { label: "Partnerships", description: "Aster leaders and DeFi educators" },
    ],
  },
  vaultStats: {
    title: "Vault Status",
    subtitle: "Live data coming soon — dashboard in development",
  },
  tokenSale: {
    title: "Token Sale",
    illustrationLabel: "ASTY",
    columns: ["Tokens", "Rate"],
    rows: [
      { tokens: "10 lac", rate: "10 cent" },
      { tokens: "10 lac", rate: "20 cent" },
      { tokens: "5 lac", rate: "25 cent" },
    ],
    referralNote: "Referral — 10% USDT with 10% Tokens",
  },
  cta: {
    title: "Join the Asty Community",
    description: "Be part of building sustainable passive income aligned with Aster.",
    primaryCta: { label: "Join Discord", href: "/community" },
  },
};


