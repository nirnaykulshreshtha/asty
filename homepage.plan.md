<!-- 3f74f4b4-52e9-4418-b695-9a4477b9e806 fcf9c2f0-58ef-4833-95e6-0a3f404a6997 -->


### To-dos

- [x] Inventory existing homepage sections and determine per-slide adjustments or new components.
- [x] Redesign targeted components to express the client slide messaging with Asty look and feel.
- [x] Update constants/types and CTA wiring to match new messaging.
- [x] Add/refresh documentation and logging plus update dev notebook.
- [x] Create VaultFlowSection component to visualize community activity → vault → rewards flow
- [x] Create TransparencySection component for trust pillars (on-chain vault, audits, open logic, DAO)
- [x] Create MovementSection component for momentum messaging and scarcity value props
- [x] Refactor existing sections to use updated data structures and slide messaging
- [x] Update homepage layout to include new sections in proper order

### Slide-to-Section Inventory

- **Slide 1 – Introducing Asty:** Update `HeroSection.tsx` to mirror the education/referral/facilitation framing and reinforce community-driven DeFi messaging.
- **Slide 2 – Community Activity → Vault → Rewards:** Plan a new `VaultFlowSection.tsx` (or refactor existing content) to visualize the flywheel and outline revenue sources, keeping CTA buttons for vault model/network join.
- **Slide 3 – Holding Asty = Passive Income:** Extend `MembershipBenefitsGrid.tsx` or introduce complementary cards to surface the four core value props with refreshed copy.
- **Slide 4 – Token Designed for Community Income:** Refresh `TokenomicsSection.tsx` to match supply, hyper-deflationary callouts, and vault distribution notes from the slide.
- **Slide 5 – Asty Turns DeFi Participation into Rewards:** Use `MemesSectionHeader.tsx` with supporting components to articulate the educate/reward/facilitate pillars and align CTA trio.
- **Slide 6 – Early Position = Lifetime Advantage:** Reframe `HowItWorksSection.tsx` to follow the three-stage narrative (secure, build, lifetime earnings) and expand on “why position matters” copy.
- **Slide 7 – Be an Early Holder:** Create or adapt a CTA banner adjacent to `RegistrationSection.tsx` emphasizing fixed supply, hyper-deflationary model, vault rewards, and early network advantage.
- **Slide 8 – It’s a Movement:** Add a momentum-focused strip (new `MovementSection.tsx` or hero sub-module) highlighting scarcity, vault-based income, and early entry messaging.
- **Slide 9 – Building the Asty Layer:** Update `RoadmapSection.tsx` content and iconography to match the roadmap steps from the slide.
- **Slide 10 – Trust Isn’t Promised:** Introduce a `TransparencySection.tsx` detailing on-chain vault, audited contracts, open reward logic, and DAO governance with dashboard/audit CTAs.
- **Slide 11 – Early Position CTA Recap:** Ensure mascot-forward CTA (join network, view vault, read whitepaper) appears near hero or registration for continuity.
- **Slide 12 – Closing Momentum CTA:** Provide a final CTA block (footer-adjacent) that reiterates limited supply, vault rewards, and buy token link once live.

