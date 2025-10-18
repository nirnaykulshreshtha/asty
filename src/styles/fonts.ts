import localFont from "next/font/local"
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google"

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const astroz = localFont({
  src: "../assets/fonts/Astroz.ttf",
  variable: "--font-astroz",
  display: "swap",
})
