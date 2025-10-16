# Asty Development Notebook

## Architecture & Design Decisions

### Theme Integration with Rainbow Kit (2025-10-16)

**Problem**: RainbowKit modal should match brand theme (colors, radius, fonts) using CSS variables from `globals.css` across light/dark.

**Solution**: Added `createRainbowKitTheme(isDark)` mapping RainbowKit tokens to our CSS variables and wired it into the existing provider. Retained system-aware theming and added aggressive logs.

**Implementation Details**:
- New file `src/components/providers/rainbowkit-theme.ts` exports `createRainbowKitTheme(isDark)`.
- Maps tokens: accentColor, modal surfaces, borders, radii, fonts to CSS vars: `--primary`, `--popover`, `--border`, `--radius`, `--font-sans`, etc.
- Logs resolved CSS vars at runtime for debugging.
- Updated `wagmi-provider.tsx` to use the custom theme while keeping `useTheme`.

**Files Modified/Added**:
- `src/components/providers/rainbowkit-theme.ts` (new): CSS-vars driven RainbowKit theme.
- `src/components/providers/wagmi-provider.tsx`: consume custom theme and add logs.

**Key Features**:
- Brand-consistent RainbowKit UI via CSS variables.
- Automatic light/dark switching through `next-themes`.
- Aggressive runtime logging for troubleshooting.
- Centralized theme mapping for easy future tweaks.

**Testing Notes**:
- Toggle light/dark and open Connect modal; verify accent, backgrounds, borders.
- Check buttons, hover/focus rings, and radii match app components.
- Confirm no console errors from theme creation/logging.
