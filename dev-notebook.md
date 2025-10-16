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

### MotionDiv Lint + Logging Update (2025-10-16)

**Problem**: ESLint `@typescript-eslint/no-empty-object-type` flagged `MotionDivProps` as an empty interface extending a supertype. Also, per our standards, motion render events should be aggressively logged for debugging.

**Decision**:
- Replace `interface MotionDivProps extends React.ComponentProps<typeof Motion.div> {}` with a type alias to satisfy lint: `export type MotionDivProps = React.ComponentProps<typeof Motion.div>`.
- Add function-level docblock to `MotionDiv` and integrate centralized logger to emit render-time debug events.

**Implementation**:
- Updated `src/components/motion/MotionDiv.tsx` to use a type alias and import `logger` from `@/lib/logger`.
- Added `logger.debug("motion:div:render", { hasChildren, className })` on render.

**Rationale**:
- Type alias avoids empty interface rule while preserving prop inference.
- Render logging helps correlate animation behavior with component lifecycle during troubleshooting.

**Testing Notes**:
- Ensure console shows debug logs on pages rendering `MotionDiv`.
- Verify no remaining ESLint errors for the file.

