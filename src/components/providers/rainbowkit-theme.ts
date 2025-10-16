"use client"

/**
 * RainbowKit theme generator mapped to application CSS variables.
 *
 * This module exposes a function that produces a RainbowKit `Theme` object
 * derived from our global CSS design tokens defined in `src/app/globals.css`.
 * The goal is to ensure the wallet UI visually matches our brand colors,
 * typography, radius scale, and light/dark modes without duplicating values.
 *
 * Key mappings:
 * - Colors: `--primary`, `--background`, `--foreground`, `--card`, `--border`,
 *   `--popover`, `--muted`, `--destructive`, etc.
 * - Radii: `--radius` used across all RainbowKit radii knobs.
 * - Fonts: `--font-sans` for the body font.
 *
 * This function composes on top of RainbowKit's built-in light/dark themes and
 * overrides tokens to point at our CSS variables. Using CSS variables allows
 * the theme to update reactively when `dark` class toggles.
 */

import { darkTheme, lightTheme, Theme } from "@rainbow-me/rainbowkit";

/**
 * Create a RainbowKit theme instance bound to our CSS variables.
 *
 * @param isDark - Whether the dark color scheme is active.
 * @returns Theme - A RainbowKit `Theme` object referencing CSS variables.
 */
export function createRainbowKitTheme(isDark: boolean): Theme {
  const base = isDark ? darkTheme() : lightTheme();

  // Aggressive logging for observability and future debugging.
  try {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      const getVar = (name: string) =>
        getComputedStyle(root).getPropertyValue(name).trim();
      // Log a small, representative sample of variables we rely on.
      // Avoid logging too many to keep console readable.
      // These logs help verify that CSS variables resolve at runtime.
      // Note: Values may include colors in oklch() space.
      // eslint-disable-next-line no-console
      console.debug("[createRainbowKitTheme] CSS vars", {
        primary: getVar("--primary"),
        primaryForeground: getVar("--primary-foreground"),
        background: getVar("--background"),
        foreground: getVar("--foreground"),
        card: getVar("--card"),
        cardForeground: getVar("--card-foreground"),
        border: getVar("--border"),
        popover: getVar("--popover"),
        popoverForeground: getVar("--popover-foreground"),
        radius: getVar("--radius"),
        fontSans: getVar("--font-sans"),
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[createRainbowKitTheme] Failed reading CSS vars", error);
  }

  // Return theme with our CSS variable mappings.
  const theme: Theme = {
    ...base,
    blurs: {
      ...base.blurs,
    },
    fonts: {
      body: "var(--font-sans)",
    },
    radii: {
      actionButton: "var(--radius)",
      connectButton: "var(--radius)",
      menuButton: "var(--radius)",
      modal: "var(--radius)",
      modalMobile: "var(--radius)",
    },
    colors: {
      ...base.colors,
      // Brand accent
      accentColor: "var(--primary)",
      accentColorForeground: "var(--primary-foreground)",

      // General surfaces
      modalBackground: "var(--popover)",
      modalText: "var(--popover-foreground)",
      modalTextSecondary: "var(--muted-foreground)",
      modalBorder: "var(--border)",
      modalBackdrop: "color-mix(in oklch, var(--background) 40%, black)",
      profileForeground: "var(--card)",
      profileAction: "var(--muted)",
      profileActionHover: "var(--accent)",
      menuItemBackground: "var(--accent)",

      // Borders and rings
      generalBorder: "var(--border)",
      generalBorderDim: "color-mix(in oklch, var(--border) 70%, transparent)",
      selectedOptionBorder: "var(--ring)",

      // Buttons & states
      connectButtonBackground: "var(--card)",
      connectButtonInnerBackground: "var(--card)",
      actionButtonBorder: "var(--border)",
      actionButtonBorderMobile: "var(--border)",
      connectButtonText: "var(--card-foreground)",
      connectButtonBackgroundError: "var(--destructive)",
      connectButtonTextError: "var(--destructive-foreground)",
      actionButtonSecondaryBackground: "var(--muted)",
      closeButton: "var(--foreground)",
      closeButtonBackground: "var(--muted)",
      // Note: RainbowKit Theme type doesn't expose a separate hover key
      // for `closeButtonBackground`. Hover handled via CSS where needed.

      // Status colors
      error: "var(--destructive)",
      standby: "var(--muted)",

      // Download cards, tooltips, indicators
      downloadTopCardBackground: "var(--card)",
      downloadBottomCardBackground: "var(--card)",
      connectionIndicator: "var(--ring)",
      // RainbowKit Theme does not expose tooltip tokens; use default styles
    },
    shadows: {
      ...base.shadows,
      connectButton: "var(--shadow-sm)",
      dialog: "var(--shadow-md)",
      profileDetailsAction: "var(--shadow-xs)",
      selectedOption: "var(--shadow-xs)",
      selectedWallet: "var(--shadow-xs)",
      walletLogo: "var(--shadow-2xs)",
    },
  };

  // eslint-disable-next-line no-console
  console.debug("[createRainbowKitTheme] Generated theme", { isDark, theme });
  return theme;
}


