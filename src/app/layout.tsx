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
  title: "Asty — Community Powered Wealth Engine",
  description:
    "Book an Early Membership to join the Aster-powered network. Permanent positions, 12-level referrals, and dividends that reward lifetime builders.",
  alternates: {
    canonical: "https://example.com",
  },
  openGraph: {
    title: "Asty — Community Powered Wealth Engine",
    description:
      "Secure a $100 Early Membership, grow a 12-level network, and unlock dividends plus presale priority once 10,000 positions go live.",
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
    title: "Asty — Community Powered Wealth Engine",
    description:
      "Early Membership comes first: $100 secures a permanent position, layered referrals, and dividend access ahead of presale.",
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
            enableSystem={false}
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
