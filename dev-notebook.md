# Asty Development Notebook

## 2025-01-27 – Tokenomics Chart Visualization

Context: The tokenomics section needed a proper data visualization to show token distribution more clearly, particularly the presale rounds and remaining supply breakdown. The existing static donut visual was not providing enough detail about how the 21M tokens are distributed.

Changes:
- **Enhanced `src/components/pages/home/TokenomicsSection.tsx`** with interactive chart visualization:
  - Added tokenomics data structure with breakdown across presale rounds (10L, 10L, 5L tokens)
  - Implemented interactive pie/donut chart using Recharts library (already in dependencies)
  - Added ChartContainer with proper tooltip and legend functionality
  - Included "Remaining Supply" slice showing 18.5M tokens after presale allocation
  - Maintained existing UI styling with gradient backgrounds and animations
  - Added comprehensive logging for debugging chart interactions
  - Legend shows formatted values in millions for easy reading
- **Palette Alignment**: Updated `TOKENOMICS_DATA` colors to pull from global `--chart-*` CSS variables for consistent theming; remaining supply uses `--muted` to stay subdued against presale slices.
- **Updated documentation** to reflect chart integration and data structure
- Imported Chart components from existing UI library (`src/components/ui/chart.tsx`)

Features:
- **Interactive Chart**: Hover tooltips showing exact token counts
- **Legend Display**: Shows presale rounds and remaining supply with formatted values (1.0M, 2.5M tokens)
- **Visual Breakdown**: Donut chart with distinct colors for each allocation
- **Responsive Design**: Adapts to different screen sizes
- **Accessible**: Proper ARIA labels and interactive elements
- **Color Scheme**: Uses primary color gradients (hsl 262°) for consistency

Token Distribution:
- Presale Round 1: 1,000,000 tokens (1.0M)
- Presale Round 2: 1,000,000 tokens (1.0M)
- Presale Round 3: 500,000 tokens (0.5M)
- Remaining Supply: 18,500,000 tokens (18.5M)
- **Total: 21,000,000 tokens (21M)**

Impact:
- Much clearer visualization of token distribution
- Interactive experience helps users understand allocation breakdown
- Professional appearance with proper chart library integration
- Maintains existing design system and visual language
- Better user understanding of how tokens are allocated
- Debug-friendly with comprehensive logging
- Responsive and accessible for all users

## 2025-10-23 – Reusable BulletedListCard and MembershipBenefitsGrid refactor

Context: Multiple sections used near-identical bulleted list markup (heading, accent dot, title, description). We extracted a reusable component to reduce duplication and applied it to the benefits grid rendered on the home page.

Changes:
- Added `src/components/ui/BulletedListCard.tsx` with mappers for `key`, `title`, and `description`, plus optional `heading`. Built atop `ContentCard` to inherit reveal/hover behaviors. Includes aggressive render logging.
- Refactored `src/components/pages/home/MembershipBenefitsGrid.tsx` to render two `BulletedListCard` instances: Position Benefits and Network Advantages.
- Home page (`src/app/page.tsx`) already includes `MembershipBenefitsGrid` as a dedicated section and passes `motionReduced`.

Files Added/Modified:
- `src/components/ui/BulletedListCard.tsx` (new)
- `src/components/pages/home/MembershipBenefitsGrid.tsx` (updated to use reusable component)
- `src/app/page.tsx` (previously updated to render benefits section)

Impact:
- Removes duplicated Tailwind markup and consolidates list styles.
- Maintains accessibility and integrates with IntersectionObserver reveal via underlying `ContentCard`.
- Preserves aggressive logging across components for debugging.

Follow-ups:
- Consider migrating other list-style sections to `BulletedListCard` as patterns emerge.

## 2025-10-23 – SectionHeader added above MembershipBenefitsGrid

Context: Benefits grid needed a consistent section heading and deep-link anchor for navigation from the header.

Changes:
- Imported and used `SectionHeader` in `src/app/page.tsx` above `MembershipBenefitsGrid`.
- Wrapped in a `<section id="membership">` container for `#membership` anchor targeting.
- Header copy: label "Membership", title "Benefits and Network Advantages", concise description.

Impact:
- Consistent visual hierarchy with other sections.
- Enables header navigation to land precisely at the benefits area.

## 2025-10-23 – RegistrationSection replaces MembershipProgressSidebar in MemesSection

Context: The MemesSection needed a user registration interface instead of just displaying membership progress statistics. Users should be able to register for Early Membership directly from this section using wallet connection only.

Changes:
- Created `src/components/pages/home/RegistrationSection.tsx` with wallet-only registration functionality:
  - Wallet connection as the only registration method (no email required)
  - Optional referral address input field with Ethereum address validation
  - Registration success state with confirmation and referral display
  - Benefits summary display (12-level network, dividends, lifetime position)
  - Progress indicator showing current membership count vs presale trigger
  - Responsive design with gradient background and decorative elements
  - Aggressive logging for debugging registration flow
- Updated `src/components/pages/home/MemesSection.tsx` to import and use `RegistrationSection` instead of `MembershipProgressSidebar`
- Updated component documentation to reflect the wallet-only registration interface

Features:
- Wallet-only registration (no email forms)
- Optional referral address with real-time validation
- Ethereum address format validation (0x + 40 hex characters)
- Simulated wallet connection process with loading states
- Clear pricing display ($100 lifetime position)
- Visual progress bar showing membership progress toward presale trigger
- Referral address display in success state
- Consistent styling with existing design system
- Scroll-based reveal animations

Impact:
- Transforms the membership section from informational to interactive
- Enables direct user registration via wallet connection
- Supports referral system with optional address input
- Maintains visual consistency with existing components
- Provides clear call-to-action for membership signup

## 2025-10-23 – Referral Link Generation & UI Cleanup

Context: Early members need an actionable way to generate and distribute referral links after connecting their wallet, but the UI was cluttered and concerns were mixed.

Changes:
- Added `src/lib/referrals.ts` with documented helpers for Ethereum address validation and deterministic referral link generation with SSR-safe origin handling.
- Created `src/components/pages/home/ReferralLinkCard.tsx` as a dedicated component for referral link generation, copy/share functionality, and clean UI presentation.
- Refactored `RegistrationSection` to focus solely on registration (wallet connection + referral address input) and removed all referral link generation logic.
- Simplified the success state UI to show only essential information: success message, referral credit (if applicable), and wallet disconnect button.
- Added `ReferralLinkCard` to `MemesSection` below the registration grid, appearing only when a wallet is connected.

Impact:
- Clean separation of concerns: registration vs. referral link management.
- Much cleaner, less cluttered UI in the registration success state.
- Referral link functionality is now reusable and focused in its own component.
- Better user experience with clear visual hierarchy and reduced cognitive load.

## 2025-10-23 – Custom Connect Button Component

Context: Need a reusable, custom-styled connect button component that integrates with RainbowKit's ConnectButton.Custom API while maintaining Asty's design system and providing comprehensive debugging capabilities.

Changes:
- Created `src/components/ui/custom-connect-button.tsx` with full RainbowKit integration:
  - Custom implementation using `ConnectButton.Custom` render prop pattern
  - Support for all connection states: disconnected, wrong network, connected
  - Chain switching and account management functionality
  - Configurable display options (chain name, balance, button size)
  - Responsive design with proper accessibility attributes
  - Comprehensive logging for debugging wallet connection flows
  - Two variants: full-featured `CustomConnectButton` and simplified `SimpleConnectButton`
- Integrated with existing design system using `Button` component variants
- Added aggressive logging throughout connection state changes and user interactions
- Comprehensive TypeScript documentation and prop interfaces

Features:
- Custom styling that matches Asty's button design system
- Support for different button sizes (xs, sm, default, lg)
- Optional chain name and balance display when connected
- Proper loading states and accessibility attributes
- Detailed logging for debugging wallet connection issues
- Chain icon display with proper fallbacks
- Error state handling for unsupported networks

Impact:
- Provides a reusable, well-documented connect button component
- Maintains design consistency with existing UI components
- Enables comprehensive debugging of wallet connection flows
- Supports flexible configuration for different use cases
- Improves developer experience with detailed logging and documentation

## 2025-10-23 – Enhanced Registration Form with Platform Integration

Context: The RegistrationSection needed to be transformed from a simple wallet connection interface into a comprehensive registration form that handles platform registration with proper form validation, state management, and submission handling.

Changes:
- Enhanced `src/components/pages/home/RegistrationSection.tsx` with complete form functionality:
  - Added comprehensive form state management with TypeScript interfaces
  - Implemented real-time form validation for referral address input
  - Added form submission handling with loading states and error management
  - Integrated proper form UI with submit button and error alerts
  - Added wallet connection requirement validation before submission
  - Implemented simulated API call for platform registration (ready for real API integration)
  - Enhanced user feedback with loading spinners and success states
  - Added comprehensive logging throughout the registration flow
- Updated component documentation to reflect the new form capabilities
- Maintained existing design system integration and responsive layout

Features:
- Complete registration form with proper HTML form semantics
- Real-time validation of optional referral address field
- Wallet connection requirement with clear user feedback
- Form submission with loading states and error handling
- Success state with referral address confirmation
- Comprehensive error handling and user feedback
- Aggressive logging for debugging registration flows
- TypeScript interfaces for type safety
- Responsive design with proper accessibility

Impact:
- Transforms registration from simple wallet connection to full platform registration
- Provides proper form validation and user experience
- Enables comprehensive debugging of registration flows
- Maintains design consistency with existing components
- Ready for real API integration (currently simulated)
- Improves user experience with clear feedback and error handling

## 2025-10-23 – RegistrationSection UX Improvements and Enhanced Validation

Context: The RegistrationSection needed better user experience with visual progress indicators, enhanced form validation, and form persistence to prevent data loss during the registration process.

Changes:
- Enhanced `src/components/pages/home/RegistrationSection.tsx` with major UX improvements:
  - Added StepIndicator component showing registration progress (Connect Wallet → Referral → Register)
  - Implemented real-time validation with visual feedback (checkmarks and error icons)
  - Added automatic Ethereum address formatting (auto-adds 0x prefix)
  - Implemented form persistence to localStorage to prevent data loss
  - Enhanced success state with animated checkmark and better visual hierarchy
  - Added comprehensive benefit display in success state
  - Improved error messages with more specific validation guidance
  - Added validation for self-referral prevention
  - Enhanced visual feedback with colored borders and inline validation icons

Features:
- Visual step indicator showing current registration stage
- Real-time validation with success/error icons in input fields
- Auto-formatting of Ethereum addresses
- Form data persistence across page reloads
- Animated success state with pulsing checkmark
- Enhanced benefits display after successful registration
- Better error messages with actionable guidance
- Self-referral validation to prevent users from referring themselves
- Visual feedback for valid/invalid input states

Impact:
- Significantly improved user experience with clear progress indication
- Reduced user errors with real-time validation feedback
- Prevented data loss with localStorage persistence
- Better visual hierarchy and information architecture
- More engaging success state with animations
- Clearer validation messages help users correct errors faster
- Professional appearance with polished UI interactions

## 2025-10-23 – Fixed RegistrationSection Error State Management

Context: The RegistrationSection was showing "Please connect your wallet to register" error message even after the wallet was connected, creating a confusing user experience.

Changes:
- Enhanced `src/components/pages/home/RegistrationSection.tsx` with proper error state management:
  - Added useEffect to clear general error when wallet connects
  - Added logic to clear general error when user starts interacting with form
  - Improved error clearing logic in handleInputChange function

Features:
- **Automatic Error Clearing**: General error disappears immediately when wallet connects
- **User Interaction Clearing**: Error clears when user starts typing in any field
- **Better UX**: No more persistent error messages after wallet connection
- **Real-time Feedback**: Immediate visual feedback when wallet connection state changes

Impact:
- Eliminates confusing error messages after wallet connection
- Provides immediate visual feedback when wallet connects
- Improves user experience with proper error state management
- Maintains error validation for disconnected state
- Professional appearance with proper state transitions

## 2025-10-23 – Simplified RegistrationSection Success State UI

Context: The success state was showing wallet details (Ethereum button and wallet address with balance) which made the UI cluttered and less focused on the registration success.

Changes:
- Simplified `src/components/pages/home/RegistrationSection.tsx` success state:
  - Removed CustomConnectButton from success state
  - Removed wallet details display (Ethereum button and address/balance)
  - Kept essential elements: success animation, benefits display, and referral credit

Features:
- **Minimal Success State**: Clean, focused UI without wallet details
- **Essential Information Only**: Success message, benefits, and referral credit
- **Better Visual Hierarchy**: More attention on the success and benefits
- **Cleaner Design**: Removed unnecessary wallet connection details

Impact:
- Cleaner, more focused success state
- Better visual hierarchy emphasizing registration success
- Reduced UI clutter by removing redundant wallet information
- More professional and minimal appearance
- Better user experience with essential information only

## 2025-10-23 – Added Confetti Animation for Registration Success

Context: The registration success state needed a more celebratory and engaging experience to make users feel excited about their successful registration.

Changes:
- Created `src/components/ui/confetti-stars.tsx` with comprehensive confetti functionality:
  - Star and circle confetti particles with custom colors
  - Multiple burst animation with timing delays
  - Auto-trigger capability with configurable delay
  - useConfetti hook for programmatic triggering
  - Comprehensive logging for debugging
- Integrated confetti into `src/components/pages/home/RegistrationSection.tsx`:
  - Added ConfettiStars component to success state
  - Triggers automatically 300ms after successful registration
  - Positioned above the success checkmark for maximum impact

Features:
- **Celebratory Animation**: Star and circle confetti particles
- **Multiple Bursts**: Three timed bursts for more celebration
- **Custom Colors**: Golden/yellow color scheme matching success theme
- **Auto-trigger**: Automatically plays on successful registration
- **Configurable**: Adjustable delay and trigger options
- **Performance Optimized**: Uses canvas-confetti for smooth animation
- **Comprehensive Logging**: Debug-friendly with detailed logging

Impact:
- Much more engaging and celebratory registration success experience
- Creates excitement and positive reinforcement for users
- Professional animation that enhances the overall user experience
- Reusable confetti component for other celebrations
- Better user satisfaction with visual celebration feedback

## 2025-10-23 – Fixed TypeScript Warnings and Build Issues

Context: The build process was showing several TypeScript warnings for unused variables and imports, which could impact code quality and build performance.

Changes:
- Fixed `src/components/pages/home/MemesSection.tsx`:
  - Removed unused `ReferralLinkCard` import
- Fixed `src/components/pages/home/ReferralLinkCard.tsx`:
  - Removed unused `className` parameter and interface
  - Simplified component signature
- Fixed `src/components/pages/home/RegistrationSection.tsx`:
  - Removed unused `isConnecting` and `isReconnecting` variables from useAccount destructuring

Features:
- **Clean Build**: No TypeScript warnings or errors
- **Optimized Imports**: Removed unused imports to reduce bundle size
- **Simplified Components**: Cleaner component signatures without unused parameters
- **Better Code Quality**: Follows TypeScript best practices

Impact:
- Clean build output without warnings
- Better code maintainability and readability
- Reduced bundle size by removing unused imports
- Improved developer experience with cleaner code
- Professional codebase following TypeScript best practices

## 2025-10-23 – Fixed Linting Errors and Validation Logic

Context: Several linting warnings were present in the codebase that needed to be addressed for code quality and best practices.

Changes:
- Fixed `src/components/pages/home/RegistrationSection.tsx`:
  - Removed unused `isLoading` variable
  - Fixed self-referral validation logic by renaming parameter from `address` to `inputAddress` to avoid shadowing
  - Now properly compares referral address with connected wallet address
  - Fixed unnecessary dependency warning in useCallback
- Fixed `src/components/ui/custom-connect-button.tsx`:
  - Added ESLint disable comment for chain icon image tag (using img instead of Next.js Image is intentional for dynamic external URLs)

Impact:
- Cleaner codebase with no linting warnings
- Fixed self-referral validation now properly prevents users from referring themselves
- Better code quality and maintainability
- Proper variable naming to avoid shadowing issues

## 2025-10-26 – Homepage Redesign Based on Client Slide Narrative

Context: Client provided 12 slides outlining the complete Asty narrative, focusing on community-driven DeFi, vault mechanics, and transparent income distribution. The existing homepage needed to be redesigned to match this messaging while maintaining the Asty visual language.

Changes:
- **Content Audit & Planning**: Created comprehensive slide-to-section mapping in `homepage.plan.md` to track implementation progress.
- **Hero Section Redesign** (`src/components/pages/home/HeroSection.tsx`):
  - Updated main title to "Introducing Asty: the community DeFi layer for DEX adoption"
  - Added three core pillars (Education, Referral, Facilitation) with icons and descriptions
  - Refreshed CTAs to "Join Asty Network" and "View Vault Model"
  - Enhanced pill messaging to include "Token presale unlocks at 10k"
- **Data Structure Overhaul** (`src/components/pages/home/types.ts`):
  - Added comprehensive icon imports from lucide-react (fixed `Safe` icon issue by using `Vault`)
  - Created new interfaces: `HeroPillar`, `VaultFlowStage`, `VaultRevenueStream`, `ParticipationPillar`, `PositionAdvantage`, `IncomeBenefit`, `TransparencyPillar`, `MomentumStat`
  - Updated navigation items to include Vault, Why Asty, Benefits, Trust sections
  - Refreshed tokenomics data to reflect 21M supply, hyper-deflationary model, vault distributions
  - Added vault flow stages, revenue streams, participation pillars, community income benefits, transparency pillars, momentum stats
  - Updated community cards to focus on network joining, vault dashboard, audit reports, community hub
- **Constants Update** (`src/components/pages/home/constants.ts`):
  - Refreshed messaging to emphasize vault-driven rewards and community activity
  - Added transparency and movement section intro text
  - Updated trigger text to focus on vault compounding

Features:
- **Slide-Driven Content**: All 12 client slides mapped to specific homepage sections
- **Vault-Centric Messaging**: Emphasis on community activity feeding into shared vault
- **Transparency Focus**: On-chain vault, audited contracts, open reward logic, DAO governance
- **Community Income Model**: Lifetime passive income, early entry advantage, hyper-deflationary tokenomics
- **Educational Pillars**: Education, referral, and facilitation as core value propositions
- **Comprehensive Data Structure**: Type-safe interfaces for all new content types

Impact:
- Homepage now accurately reflects client's vision of Asty as community-driven DeFi layer
- Clear narrative flow from community activity → vault → rewards → holders
- Enhanced transparency messaging builds trust and credibility
- Vault-centric approach differentiates from typical token projects
- Comprehensive data structure supports future section implementations
- Maintains existing Asty visual language while updating content to match client slides

Next Steps:
- Implement new sections (VaultFlowSection, TransparencySection, MovementSection)
- Refactor existing sections to use updated data structures
- Add remaining slide content to complete the narrative

## 2025-10-26 – Header Simplification and Footer Organization

Context: The header navigation had too many items (10 links), making it cluttered and overwhelming for users. Only essential navigation should remain in the header, with secondary links moved to the footer for better organization and user experience.

- Changes:
  - **Navigation Split** (`src/components/pages/home/types.ts`):
    - Replaced primary set with sections that remain on the homepage after redesign: Introducing, How It Works, Early Membership, Tokenomics, Roadmap
    - Trimmed secondary links to only currently visible anchors: FAQ, Community, Whitepaper placeholder in footer
    - Maintained `NAV_ITEMS` export for mobile menu parity (primary + secondary)
  - **Header Refresh** (`src/components/pages/home/Header.tsx`):
    - Updated documentation to call out the new primary nav ordering
    - Desktop nav now mirrors the revised primary list
    - Logging remains untouched for traceability
  - **Footer Refresh** (`src/components/pages/home/Footer.tsx`):
    - Revised documentation to reference the leaner quick links set
    - Quick Links now surface FAQ, Community, Whitepaper anchors only
    - Retained three-column layout and social section

Features:
- **Focused Header**: 5 essential navigation items (Vault, Why Asty, Membership, How It Works, Trust)
- **Clean Desktop Nav**: Balanced navigation without clutter
- **Complete Mobile Nav**: Full navigation still available in mobile menu
- **Organized Footer**: Secondary links grouped in "Quick Links" section
- **Three-Column Layout**: Branding, Quick Links, and Social Links
- **Better UX**: Well-organized header with all links still accessible

Impact:
- Cleaner, more focused header design
- Reduced cognitive load while maintaining key navigation options
- Better visual hierarchy with essential items prominent
- All navigation still accessible via footer quick links
- Improved user experience with organized information architecture
- Professional appearance with appropriate information placement

## 2025-10-26 – Floating Membership Registration Button

Context: Users need quick, always-accessible access to membership registration as they browse the site. A fixed floating button on the right side provides constant visibility without being intrusive.

Changes:
- **New Component** (`src/components/pages/home/FloatingMemberButton.tsx`):
  - Fixed positioning on right-middle of viewport
  - Vertical centering with top-1/2 and -translate-y-1/2
  - Smooth scroll to #membership section via onAnchorClick
  - Auto-hides near top/bottom of page for better UX
  - Responsive: hidden on mobile (md:flex for desktop only)
  - Gradient background with primary color scheme
  - Hover animations with scale and shadow effects
  - Accessible with proper ARIA labels and focus states
  - Aggressive logging for debugging interactions
  - Auto-hides when hero, membership, or footer sections intersect viewport to reduce CTA clutter
- **Integration** (`src/app/page.tsx`):
  - Imported and rendered FloatingMemberButton above Header
  - Connected to existing handleAnchorClick handler
  - Visible on all pages for consistent UX

Features:
- **Fixed Positioning**: Always visible as users scroll (stays in viewport)
- **Smart Visibility**: Auto-hides near top/bottom and within hero/membership/footer sections to reduce CTA clutter
- **Smooth Animations**: Fade in/out transitions and hover effects
- **Responsive Design**: Mobile-friendly (hidden on small screens)
- **Visual Design**: Gradient background with shadow and border
- **Easy Access**: One-click navigation to membership registration
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Comprehensive Logging**: Debug-friendly with interaction tracking

Impact:
- Provides constant, easy access to membership registration
- Improves conversion funnel with always-visible CTA
- Non-intrusive design that doesn't block content
- Enhances user experience with clear call-to-action
- Professional appearance with smooth animations
- Better mobile experience (hidden on small screens where it might obstruct)

## 2025-10-27 – SectionHeader Word Alignment Fix

Context: Rotating words inside `SectionHeader` were wrapping and misaligning with the hero heading, creating awkward spacing and making the tagline unreadable when long words appeared.

Changes:
- Updated `src/components/ui/word-rotate.tsx` to support `containerClassName` and `wordClassName` props with inline-flex baseline alignment to keep rotations flush with surrounding text. Added defensive logging for empty word arrays.
- Refined `renderWithTokens` in `src/components/ui/SectionHeader.tsx` to render `WordRotate` directly (no extra span) and applied a measured max width container to prevent rotation overflow.

Impact:
- Maintains consistent baseline alignment between static and rotating words across headings and descriptions.
- Eliminates layout shift when rotating words change length.
- Provides clearer logging hooks when debugging future typography adjustments.

## 2025-10-27 – SectionHeader AuroraText Support

Context: Needed the option to apply animated aurora gradient text on section titles or descriptions when spotlighting key phrases.

Changes:
- Imported `AuroraText` into `src/components/ui/SectionHeader.tsx` and added an `aurora` configuration prop allowing per-instance toggles, custom colors, speed, and class overrides.
- Updated rendering logic to wrap title and/or description content in `AuroraText` when enabled while preserving WordRotate token handling.

Impact:
- Gives designers control to highlight specific headers with animated gradients.
- Centralizes aurora configuration to avoid ad-hoc wrappers in consuming components.
- Maintains aggressive logging and documentation standards for future debugging.

## 2025-10-27 – Token-Level Aurora Highlighting
## 2025-10-27 – Homepage Re-render Optimization

Context: The entire homepage was re-rendering every ~2.6s due to a ticking state in the root `Home` component controlling the hero burst rotation. Non-memoized sections consequently re-rendered with each tick. Additionally, provider values (RainbowKit theme object and motion context value) were recreated on every render.

Changes:
- Localized hero rotation into `src/components/pages/home/HeroSection.tsx`:
  - Added internal `heroBurstIndex` state and interval effect gated by `motionReduced`.
  - Removed hero rotation state and effects from `src/app/page.tsx` and passed only `motionReduced` + `onAnchorClick`.
- Memoized heavy sections to prevent unnecessary re-renders:
  - Wrapped `MemesSection`, `CommunitySection`, `RoadmapSection`, and `IntroducingSection` in `React.memo`.
- Stabilized provider values:
  - `src/components/providers/wagmi-provider.tsx`: memoized RainbowKit `theme` with `useMemo` over `isDark`.
  - `src/components/motion/LazyMotionProvider.tsx`: memoized context value `{ prefersReducedMotion }` with `useMemo`.

Impact:
- Only the hero area re-renders during rotation; other sections stay stable.
- Reduced unnecessary reconciliations and layout work across the page.
- Provider updates no longer cascade re-renders via identity changes.

Notes:
- Aggressive logging remains to verify render frequency per component.
- Further improvements could memoize any section receiving frequently-changing props.


## 2025-10-28 – SectionHeader Description Accepts string[]

Context: Consumers needed to pass multiple description lines to `SectionHeader` without manually composing custom markup. We also wanted to preserve token interpolation and optional `AuroraText` wrapping per line.

Changes:
- Updated `src/components/ui/SectionHeader.tsx`:
  - `description` prop now accepts `string | string[]`.
  - When an array is provided, each entry renders as a separate paragraph in order, inheriting the same typography (`max-w-3xl text-base text-muted-foreground`).
  - Maintains token rendering via `renderWithTokens` for every entry.
  - Preserves `aurora.enableDescription` behavior for each paragraph.
  - Added aggressive logging to report description type and entry count for debugging.

Impact:
- Simpler API for multi-line descriptions with consistent styling.
- No breaking changes; existing string usage continues to work.
- Debuggability improved with structured logging around description handling.

## 2025-10-28 – Per-Item Aurora for SectionHeader Descriptions

Context: Need granular control to aurora-highlight individual description lines (different enable flags, gradients, speeds, and class overrides) when passing a `string[]` to `description`.

Changes:
- Extended `aurora` prop in `src/components/ui/SectionHeader.tsx` with `perDescription?: Array<{ enable?: boolean; colors?: string[]; speed?: number; className?: string }>`.
- Each description line now resolves its own aurora configuration by merging per-item overrides with global `aurora` values.
- When `description` is a single string, index 0 of `perDescription` applies if provided.
- Added aggressive logging per line to trace enablement and override presence.

Impact:
- Designers can selectively aurora-highlight specific lines and customize gradients per line.
- Backward compatible; global `enableDescription` still works as default.
- Easier experimentation with different visual emphasis without changing markup.


Context: Marketing requested the ability to aurora-highlight only the `{domain}` token inside `SectionHeader` copy, leaving the rest of the text unaffected.

Changes:
- Extended the `aurora` prop with a `domainToken` option that targets a specific token (defaulting to `domain`) and applies Aurora gradients solely to that token whether it is static text or a `WordRotate` instance.
- Added `duplicateChildren` flag to `AuroraText` to prevent double-rendering when wrapping animated components and updated render pipeline to normalize token configuration once per render.
- Refined `WordRotate` to accept inline aurora configuration so gradients are applied within the animated span, preserving `AnimatePresence` transitions when rotating words are highlighted.

Impact:
- Enables precise aurora emphasis for rotating domain words without affecting surrounding text.
- Supports custom gradients, speed, and class overrides per token while reusing global settings.
- Avoids rendering glitches by skipping duplicate children when wrapping interactive content.
- Keeps motion animations intact even when aurora styling is applied to rotating tokens.

## 2025-01-27 – Dark Theme Set as Default

Context: The application should default to dark theme regardless of user's system preferences to maintain consistent branding and user experience across all devices.

Changes:
- Updated `src/app/layout.tsx` to set `enableSystem={false}` in the ThemeProvider configuration
- Dark theme will now always be the initial theme on first visit
- Users can still toggle to light theme using the mode toggle button

Features:
- **Consistent Branding**: Dark theme as the default experience
- **No System Override**: Ignores system preferences to enforce dark mode
- **User Choice**: Mode toggle still allows users to switch to light theme if preferred
- **Persistent Preference**: User's theme choice is saved and remembered

Impact:
- Consistent visual identity across all devices and platforms
- Better brand experience with dark theme as the primary interface
- Users still have the option to switch themes if they prefer
- Maintains professional appearance with enforced dark mode default

## 2025-01-27 – Removed Mode Toggle from Header

Context: With dark theme enforced as the default and users needing a clean, focused header, the mode toggle button was removed to simplify the navigation and reduce clutter.

Changes:
- Removed `ModeToggle` import and component usage from `src/components/pages/home/Header.tsx`
- Updated header documentation to reflect removal of mode toggle
- Header now focuses on essential navigation and wallet connection only

Features:
- **Cleaner Header**: Reduced visual clutter with one less UI element
- **Focused Navigation**: Essential navigation items and wallet connection only
- **Better UX**: Less distracting header that focuses user attention on key actions
- **Consistent Branding**: Aligns with dark theme default approach

Impact:
- Simpler, more focused header design
- Reduced cognitive load for users
- Cleaner visual hierarchy without mode toggle button
- Professional appearance with essential elements only

## 2025-01-27 – Added Early Membership CTA to Header

Context: Users need easy, prominent access to the Early Membership registration from the header across all devices to increase conversion and improve user experience.

Changes:
- Added "Book Early Membership" button to desktop header (before wallet connect button)
- Added "Book Early Membership" button to mobile menu (after wallet connect button)
- Button links to `#membership` section with smooth scrolling
- Button uses primary variant with proper sizing for desktop (sm) and mobile (full width)
- Desktop button hidden on small screens (md:flex) to prevent clutter
- Mobile button is full-width in mobile menu for better touch target

Features:
- **Prominent CTA**: Eye-catching button placement in header
- **Dual Placement**: Visible on both desktop and mobile
- **Smooth Navigation**: Uses existing smooth scroll handler
- **Responsive Design**: Shows/hides appropriately for screen size
- **Accessible**: Proper button semantics and focus states
- **Consistent Styling**: Uses existing Button component

Impact:
- Improved conversion funnel with prominent membership CTA
- Better user experience with easy access to registration
- Clear call-to-action that guides users to membership section
- Professional appearance with well-placed CTA button
- Mobile-friendly with full-width button in mobile menu

## 2025-01-27 – Added Global Button Hover Animation

Context: All buttons across the application should have a consistent, professional hover animation to provide better visual feedback and improve user experience.

Changes:
- Updated `src/components/ui/button.tsx` to add global hover animation to all buttons:
  - Added `group` class for group-based hover states
  - Added `transition-transform duration-200` for smooth transitions
  - Added `hover:-translate-y-0.5` for slight upward movement on hover
  - Added `hover:shadow-xl` for enhanced shadow on hover
  - Added `disabled:-translate-y-0 disabled:shadow-none` to disable animation for disabled buttons
- Removed duplicate animation classes from `src/components/ui/CTAButton.tsx` since they're now in the base Button component

Features:
- **Consistent Animation**: All buttons now have the same smooth hover effect
- **Visual Feedback**: Users get clear feedback when hovering over interactive elements
- **Professional Polish**: Subtle lift and shadow enhance the overall UX
- **Accessibility**: Animation disabled for disabled buttons
- **Automatic Application**: All buttons using the Button component get the animation without extra code

Impact:
- Consistent user experience across all buttons
- Better visual feedback for interactive elements
- More polished and professional appearance
- Improved perceived quality and attention to detail
- No code duplication - animation defined once in base component

## 2025-01-27 – Referral Link Dialog Implementation

Context: Users need a dedicated dialog for generating and sharing their referral links, providing a professional interface that integrates wallet connection and referral link functionality.

Changes:
- Created `src/components/pages/home/ReferralLinkDialog.tsx`:
  - Full-featured dialog with wallet connection integration
  - Automatic referral link generation based on connected wallet address
  - Copy to clipboard with comprehensive fallback support
  - Web Share API integration for native sharing
  - Visit link button to test referral URL
  - Helpful "How it works" section with earning information
  - Comprehensive error handling and user feedback
  - Aggressive logging for debugging referral generation flows
- Enhanced `src/components/pages/home/HeroSection.tsx`:
  - Added referral dialog state management
  - Modified "Generate Referral Link" CTA to open dialog instead of scrolling
  - Integrated ReferralLinkDialog component with open/close handlers
  - Added proper logging for dialog interactions
- Fixed `src/components/pages/home/ReferralLinkCard.tsx`:
  - Fixed JSX structure issue with proper wrapper div
  - Improved component structure and spacing

Features:
- **Dialog Integration**: Professional modal interface for referral link generation
- **Wallet Connection**: Requires wallet connection to generate link
- **Copy Functionality**: One-click copy to clipboard with visual feedback
- **Native Sharing**: Uses Web Share API when available, falls back to copy
- **Link Preview**: Displays the full referral link for verification
- **How It Works**: Educational content about referral earnings
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: Proper ARIA labels and keyboard navigation support

Impact:
- Provides a professional, dedicated interface for referral link generation
- Improves user experience with clear workflow and helpful information
- Better conversion funnel with prominent referral generation feature
- Enhances trust and transparency with clear earning information
- Maintains design consistency with existing component library
- Professional appearance with polished UI interactions

## 2025-01-27 – Enhanced Dialog Visual Design

Context: The dialog needed more visual presence with enhanced backdrop effects and improved styling to stand out from the background and create a more premium user experience.

Changes:
- Enhanced `src/components/ui/dialog.tsx`:
  - Upgraded backdrop from `bg-black/50` to `bg-black/80` for darker, more prominent overlay
  - Added `backdrop-blur-sm` to backdrop for professional glass effect
  - Enhanced dialog content with `backdrop-blur-xl` for frosted glass effect on content
  - Increased shadow from `shadow-lg` to `shadow-2xl` for more depth
  - Added border styling with `border-border/50` for better definition
- Enhanced `src/components/pages/home/ReferralLinkDialog.tsx`:
  - Added gradient background effect to dialog content using `bg-gradient-to-br from-primary/5 via-transparent to-accent/5`
  - Increased border thickness from default to `border-2 border-primary/20`
  - Added custom shadow effect: `shadow-[0_25px_50px_rgba(0,0,0,0.5)]`
  - Enhanced header with larger title (`text-2xl`) and description (`text-base`)
  - Improved referral link display with gradient background and better contrast
  - Enhanced "How it works" section with gradient background, thicker border, and icon
  - Better visual hierarchy with emphasized earnings information
  - Increased button size from `sm` to `default` for better touch targets

Features:
- **Enhanced Backdrop**: Darker overlay (80% opacity) with blur effect for better focus
- **Premium Glass Effect**: Backdrop blur on both overlay and content for polished look
- **Visual Depth**: Stronger shadows and borders create three-dimensional appearance
- **Gradient Accents**: Subtle gradient backgrounds tie into Asty brand colors
- **Better Contrast**: Improved readability with enhanced text sizing and backgrounds
- **Professional Polish**: All enhancements maintain design consistency

Impact:
- Dialog has much more visual presence and stands out clearly from background
- Premium, polished appearance that matches Asty's professional brand
- Better user focus and attention on referral link generation
- Improved readability and visual hierarchy throughout
- More engaging user experience with enhanced visual feedback
- Maintains accessibility while adding visual depth

## 2025-01-27 – Custom Address Input for Referral Link Dialog

Context: Users needed the ability to generate referral links for any Ethereum address, not just their own connected wallet address. This enables scenarios where users want to create referral links for other addresses or proxy accounts.

Changes:
- Enhanced `src/components/pages/home/ReferralLinkDialog.tsx` with custom address input functionality:
  - Added toggle buttons to switch between "Use My Address" and "Custom Address" modes
  - Added text input field with real-time Ethereum address validation
  - Implemented `isEthereumAddress` validation from `src/lib/referrals.ts`
  - Added visual feedback for valid/invalid address formats (error messages and success checkmarks)
  - Added conditional rendering so action buttons only appear when a valid link can be generated
  - Added helpful error message when custom address format is invalid
  - Comprehensive logging for debugging custom address input flows
- Updated documentation to reflect custom address generation capability

Features:
- **Dual Mode**: Toggle between using connected wallet address or custom address
- **Real-time Validation**: Instant feedback on address format validity
- **Visual Feedback**: Error messages for invalid addresses, success checkmark for valid addresses
- **Smart Button Rendering**: Action buttons only appear when valid referral link can be generated
- **Helpful Guidance**: Clear error messages and placeholder text guide user input
- **Comprehensive Logging**: Debug-friendly with detailed logging for custom address flows
- **Input Sanitization**: Auto-clears errors when switching between modes

Impact:
- Enables users to generate referral links for any Ethereum address
- Flexible referral link generation for advanced use cases
- Better user experience with real-time validation and clear feedback
- Reduces errors with visual validation indicators
- Professional appearance with proper error handling
- Comprehensive debugging capabilities for support scenarios

Follow-up Changes:
- Hide "How it works" section when in custom address mode to avoid misleading users about their own earnings
- The earnings information is only relevant when using your own wallet address, not when generating links for other addresses
- Added validation to prevent users from entering their own logged-in address in custom address field
- Shows helpful error message: "Cannot use your own address. Switch to 'Use My Address' mode instead."
- Validates both address format and checks against connected wallet address (case-insensitive)
- Prevents redundant referral link generation when users can simply use their connected wallet

## 2025-01-27 – Auto-Validation of Referral Address in Secure Your Position

Context: Users accessing the site via referral links should have their referral address automatically validated without needing to manually enter it. This improves user experience and eliminates the possibility of manual entry errors.

Changes:
- **Added `extractReferralFromURL()` function** in `src/lib/referrals.ts`:
  - Extracts the `ref` parameter from URL query string
  - Validates the extracted address using existing `isEthereumAddress()` function
  - Returns the validated address or null if not present/invalid
  - Comprehensive logging for debugging referral extraction flows
- **Enhanced `RegistrationSection.tsx`** with automatic referral validation:
  - Added `autoExtractedReferral` and `referralExtractionError` state variables
  - Added useEffect hook to extract referral address from URL on component mount
  - Validates extracted referral against connected wallet to prevent self-referral
  - Updates formData with extracted referral address when valid
  - Comprehensive logging for automatic referral detection and validation
- **Removed manual input field** from the UI:
  - Completely removed the referral address input field and its associated Label
  - Removed unused imports (Input, Label, cn utilities)
  - Removed unused handleInputChange callback function
  - Cleaned up form UI to show only success/error messages
- **Added success/error message display**:
  - Shows green success alert when valid referral address is detected from URL
  - Shows red error alert when referral address fails validation (invalid format or self-referral)
  - Success message shows abbreviated referral address (first 6 and last 4 chars)
  - Error message clearly explains why the referral failed validation

Features:
- **Automatic Detection**: Extracts referral address from URL parameters (?ref=0x...) on page load
- **Real-time Validation**: Validates format and prevents self-referral automatically
- **User-Friendly Feedback**: Clear success/error messages without manual input required
- **Clean UI**: No input field cluttering the registration form
- **Comprehensive Logging**: Detailed logging for debugging referral extraction and validation
- **Self-Referral Prevention**: Automatically detects and prevents users from referring themselves
- **Silent Success**: If no referral in URL, shows clean registration form without any messages

Impact:
- Significantly improved user experience with automatic referral detection
- Eliminates manual entry errors by removing the input field
- Cleaner, more focused registration form UI
- Better conversion funnel with seamless referral credit application
- Professional appearance with clear visual feedback
- Maintains all existing validation logic and error handling

## 2025-01-27 – Referral Link Generator via Dialog in Registration Section

Context: Users need the ability to generate referral links for any BNB/Ethereum chain address from the registration section. Initially added inline but was making the UI cluttered, so moved to a cleaner dialog-based approach.

Changes:
- **Added "Generate Referral Link" Button** to `src/components/pages/home/RegistrationSection.tsx`:
  - Button shown both when wallet is connected and disconnected
  - Opens ReferralLinkDialog when clicked
  - Clean outline variant to distinguish from primary registration action
  - Icon (Share2) for visual clarity
  - Available at all times, regardless of wallet connection status
- **Integrated ReferralLinkDialog** component which already exists with full functionality:
  - Toggle between "Use My Address" and "Custom Address" modes
  - Real-time Ethereum address validation
  - Copy, Share, and Visit actions for generated links
  - Comprehensive error handling and user feedback
- **Removed inline referral generator** that was cluttering the registration card:
  - Removed all referral link generation UI, input fields, and state management
  - Cleaned up unused imports (Input, Label, toast, Copy, ExternalLink, Check)
  - Simplified component focus on registration only
- **Maintained dialog functionality** through existing ReferralLinkDialog component

Features:
- **Clean UI**: Registration section is no longer cluttered with inline generator
- **Dedicated Dialog**: Full-featured referral link generation in focused modal interface
- **Always Accessible**: Button available regardless of wallet connection state
- **Professional Design**: Outline variant distinguishes secondary action from primary registration
- **Consistent UX**: Uses existing ReferralLinkDialog with proven UX patterns
- **Better Focus**: Registration card focuses on core membership signup flow

Impact:
- Significantly cleaner and less cluttered registration section
- Better separation of concerns: registration vs. referral generation
- Improved user experience with dedicated dialog interface
- Registration flow is more focused and distraction-free
- Professional appearance without overwhelming the UI
- Users still have easy access to referral link generation via button
- Maintains all functionality while improving visual hierarchy

## 2025-01-27 – Payment Widget Integration

Context: The RegistrationSection needed to integrate a real payment processing system using the @matching-platform/payment-widget package to handle $100 Early Membership payments via cross-chain deposits.

Changes:
- **Created `src/components/providers/payment-widget-provider.tsx`**:
  - Payment widget provider component with wagmi wallet client integration
  - Configured supported chains: Ethereum Mainnet (chainId: 1) and Base Mainnet (chainId: 8453)
  - Integrated useWalletClient and useAccount hooks from wagmi
  - Provides payment widget context to all child components
  - Comprehensive logging for debugging payment flows
  - Configurable integrator ID from environment variables
- **Updated `src/app/layout.tsx`**:
  - Added PaymentWidgetProvider wrapper inside WagmiProvider
  - Ensures payment widget has access to wallet client throughout the application
  - Proper provider hierarchy: WagmiProvider → PaymentWidgetProvider → ThemeProvider → LazyMotionProvider
- **Enhanced `src/components/pages/home/RegistrationSection.tsx`**:
  - Imported PaymentWidget component from @matching-platform/payment-widget
  - Added payment widget state management (showPaymentWidget)
  - Configured payment for $100 USDC on Base Mainnet
  - Payment config: 100 USDC (6 decimals) = 100 * 1_000_000 tokens
  - Target token: USDC on Base (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
  - Target chain: Base Mainnet (8453)
  - Added "Pay $100 for Early Membership" button to trigger payment widget
  - Payment widget shown conditionally when button is clicked
  - Handles payment completion: hides widget and shows success state
  - Handles payment failure: displays error messages
  - Back button to return to registration view
  - Comprehensive logging for payment complete/failed events
  - Updated component documentation to reflect payment integration

Features:
- **Cross-Chain Payments**: Accept any asset on supported chains (Ethereum, Base)
- **Flexible Payment Options**: Users can pay with any token, swap, or bridge to USDC
- **Real-Time Tracking**: Live payment status updates and transaction tracking
- **Multiple Payment Modes**: Supports bridge, swap, and direct payment methods
- **Automatic Completion**: Registration completion on successful payment
- **Error Handling**: Comprehensive error messages and recovery options
- **User-Friendly UI**: Clean payment flow with back button navigation
- **Integration with Existing Flow**: Seamless integration with wallet connection and referral system

Technical Details:
- Payment Widget: @matching-platform/payment-widget from GitHub
- Provider Pattern: Shared payment infrastructure via context
- Wallet Integration: Uses wagmi's useWalletClient for wallet operations
- Token Configuration: USDC on Base with proper decimal handling (6 decimals)
- Amount Calculation: 100 USDC = 100 * 1_000_000 wei
- Chain Support: Ethereum Mainnet (1) and Base Mainnet (8453)
- Quote Refresh: 45 seconds refresh interval for live quotes
- Configuration: Integrator ID from environment variable with fallback

Payment Flow:
1. User connects wallet using existing RainbowKit integration
2. User clicks "Pay $100 for Early Membership" button
3. Payment widget appears with available payment options
4. User selects payment method (bridge/swap/direct)
5. Widget handles transaction execution
6. Real-time status updates during payment processing
7. Success: Registration state updates to "isSubmitted"
8. Failure: Error message displayed, user can retry

Impact:
- Real payment processing for Early Membership registration
- Flexible payment options support any asset on supported chains
- Professional payment experience with real-time tracking
- Seamless integration with existing registration flow
- Maintains all existing features (referral links, wallet connection, etc.)
- Better user experience with clear payment flow
- Production-ready payment processing system
- Comprehensive logging for debugging and support

Follow-up Notes:
- Currently configured for Base Mainnet deployment
- USDC address on Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
- Payment amount: 100 USDC (1,000,000 tokens with 6 decimals)
- Can be extended to support additional chains or tokens
- Payment widget supports Across Protocol for cross-chain bridging
- Integrator ID should be configured in environment for production use

## 2025-10-28 – Footer Branding and Copyright Update

Context: Marketing requires a consistent branding line and explicit year in the site footer.

Changes:
- Updated `src/components/pages/home/Footer.tsx` branding section to include:
  - Tagline: "Asty — PeopleFi. Built for collective value creation."
  - Copyright set to exact string: "© Asty 2025" (replaces dynamic year + "All rights reserved.")
- Added aggressive logging to trace branding render state.
- Updated component documentation to reflect marketing requirement.

Impact:
- Footer now reflects required brand messaging verbatim.
- Fixed year for 2025 per marketing directive.
- Easier debugging with explicit branding log entry.

