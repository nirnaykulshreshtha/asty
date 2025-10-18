import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WagmiProvider } from "@/components/providers/wagmi-provider";
import { LazyMotionProvider } from "@/components/motion/LazyMotionProvider";
import { astroz, plexMono, spaceGrotesk } from "@/styles/fonts";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Asty",
  url: "https://example.com",
  sameAs: [
    "https://x.com/asty",
    "https://t.me/asty",
    "https://example.com/discord",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Asty — Tax-to-Vault Passive Income on BNB Chain",
  description:
    "Community-driven DeFi on BNB Chain. Every ASTY trade funds the Aster Vault and pays Aster rewards yearly to loyal holders.",
  alternates: {
    canonical: "https://example.com",
  },
  openGraph: {
    title: "Asty — Earn Forever with Every Transaction",
    description:
      "Asty routes a 6% tax into the Aster Vault, compounding Aster tokens for annual holder rewards.",
    url: "https://example.com",
    siteName: "Asty",
    images: [
      {
        url: "https://example.com/assets/asty-slide.png",
        width: 1200,
        height: 630,
        alt: "Asty landing hero with vault analytics on dark background",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asty — Earn Forever with Every Transaction",
    description:
      "Every ASTY trade funds the Aster Vault and returns Aster tokens to loyal holders once per year.",
    images: ["https://example.com/assets/asty-slide.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${plexMono.variable} ${astroz.variable} min-h-screen bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <WagmiProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LazyMotionProvider>
              {children}
            </LazyMotionProvider>
          </ThemeProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
