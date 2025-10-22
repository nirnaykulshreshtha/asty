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

### Homepage Architecture (2025-10-16)

**Overview**: Modular homepage driven by a typed content config for rapid iteration.

**Key Files**:
- `src/app/(home)/content.ts`: `HomeSectionId`, `HomeContent`, and `homeContent` copy + order.
- `src/components/home/Hero.tsx`: presentational hero with CTAs.
- `src/components/home/Section.tsx`: generic section wrapper.
- `src/components/home/Lists.tsx`: `BulletList` + `LabeledList` utilities.
- `src/components/home/VaultStats.tsx`: placeholder metrics grid.
- `src/app/page.tsx`: renders sections in `homeContent.order` with aggressive logging.
- `src/lib/logger.ts`: centralized logging utility.

**Iteration Workflow**:
- Change copy and sequence in `content.ts` without touching components.
- Add new sections by extending `HomeSectionId` and adding a component under `src/components/home/`.
- Wire new section in `page.tsx` switch using props from content.

### UI & Animation Enhancements (2025-10-16)

**Additions**:
- `src/components/layout/Navbar.tsx`: brand + links + theme toggle + RainbowKit connect.
- `src/components/layout/Footer.tsx`: themed footer links.
- `src/components/motion/LazyMotionProvider.tsx`: global LazyMotion + motion context.
- `src/components/motion/Reveal.tsx`: `FadeInUp`, `StaggerContainer`, `StaggerItem` utilities.
- `src/components/backgrounds/ThemeBackdrop.tsx`: theme-aware gradient + dot grid + soft blob.
- `src/app/layout.tsx`: wired backdrop, navbar, footer, motion provider.

**Performance Notes**:
- Uses framer-motion `LazyMotion` with `domAnimation` to reduce bundle size.
- Viewport-based reveal; animations run once per section.
- Honors reduced-motion via context flag (extendable to system preference hooks).
- Background visuals use CSS gradients and minimal DOM; one animated element.

### Framer Motion Integration Fix (2025-10-16)

**Problem**: Runtime error "Element type is invalid" for `Motion.div` in TokenSale component. Error occurred because `Motion` was exported as `m` from framer-motion, but `m` doesn't have a `div` property.

**Solution**: Updated `LazyMotionProvider.tsx` to export `Motion` as an object containing all common HTML element motion components (div, span, button, etc.) mapped to their respective `m.element` equivalents.

**Implementation Details**:
- Modified `src/components/motion/LazyMotionProvider.tsx` to export `Motion` object with all common HTML elements.
- This allows `Motion.div`, `Motion.span`, etc. to work correctly throughout the application.
- Maintains the existing LazyMotion performance benefits while providing a clean API.

**Files Modified**:
- `src/components/motion/LazyMotionProvider.tsx`: Added comprehensive Motion object export.

**Testing Notes**:
- Verified dev server starts without errors.
- Confirmed TokenSale component renders correctly with Motion.div animations.
- All existing motion components (FadeInUp, StaggerContainer, etc.) continue to work.

### MotionDiv Client Wrapper (2025-10-16)

**Problem**: Using `Motion.div` within server components can cause RSC runtime issues.

**Solution**: Added `src/components/motion/MotionDiv.tsx` as a small "use client" wrapper around `Motion.div` so server components can render animated elements safely.

**Usage**:
- Import `MotionDiv` and use it in place of `Motion.div` inside server components.

**Files Added/Modified**:
- `src/components/motion/MotionDiv.tsx` (new): client wrapper.
- `src/components/home/TokenSale.tsx`: switched from `Motion.div` to `MotionDiv`.

### Meme Homepage Overhaul (2025-10-22)

**Goal**: Transform the corporate DeFi homepage into a meme-forward experience starring the Asty mascot while preserving accessibility and CTA clarity.

**Key Changes**:
- Rebuilt hero section with rotating burst badges, gradient sticker capsule, and inline PNG mascot using `next/image`.
- Added `MASCOT_MEMES`, `HERO_VARIANTS`, and `CTA_MEMES` configs to drive humorous copy, styling, and metadata.
- Introduced an "Asty reaction vault" gallery under a new `#memes` section; repurposed previous "Why" layout.
- Updated copy across hero, buy, and how sections to match meme tone while keeping instructions readable.
- Implemented additional logging for hero burst rotation (`page:home:hero-burst:*`) and meme gallery init (`page:home:memes:init`).
- Ensured reduced-motion preference halts burst rotation and sticker hover scaling.

**Files Modified**:
- `src/app/page.tsx`: hero redesign, meme gallery, CTA updates, new configs/logging, quote escaping.

**Testing & Verification**:
- Ran `npm run lint -- src/app/page.tsx` (pass).
- Manual checks: hero burst cycles when reduced motion is off, navigation to new `#memes` anchor via header.

**Follow-ups**:
- Add diverse mascot image variations (PNG/SVG) for each meme card.
- Consider extracting configs to content module for editors.

