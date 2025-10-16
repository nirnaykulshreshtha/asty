/**
 * Asty Homepage
 *
 * Purpose:
 * - Compose modular sections from a centralized content config.
 * - Keep UI presentation separate from content to enable rapid iteration.
 */

import { homeContent } from "./(home)/content";
import { Hero } from "@/components/home/Hero";
import { Section } from "@/components/home/Section";
import { BulletList, LabeledList } from "@/components/home/Lists";
import { VaultStats } from "@/components/home/VaultStats";
import { TokenSale } from "@/components/home/TokenSale";
import { logger } from "@/lib/logger";

export default function Home() {
  logger.info("page:home:render", { order: homeContent.order });

  return (
    <main>
      {homeContent.order.map((sectionId) => {
        switch (sectionId) {
          case "hero": {
            const h = homeContent.hero;
            return (
              <Hero
                key="hero"
                eyebrow={h.eyebrow}
                title={h.title}
                subtitle={h.subtitle}
                primaryCta={h.primaryCta}
                secondaryCta={h.secondaryCta}
              />
            );
          }
          case "token-sale": {
            const s = homeContent.tokenSale;
            return (
              <TokenSale
                key="token-sale"
                title={s.title}
                illustrationLabel={s.illustrationLabel}
                columns={s.columns}
                rows={s.rows}
                referralNote={s.referralNote}
              />
            );
          }
          case "vision": {
            const v = homeContent.vision;
            return (
              <Section key="vision" title={v.title} description={v.description} />
            );
          }
          case "core-goals": {
            const cg = homeContent.coreGoals;
            return (
              <Section key="core-goals" title={cg.title}>
                <BulletList items={cg.items} />
              </Section>
            );
          }
          case "key-actions": {
            const ka = homeContent.keyActions;
            return (
              <Section key="key-actions" title={ka.title}>
                <BulletList items={ka.items} />
              </Section>
            );
          }
          case "team-focus": {
            const tf = homeContent.teamFocus;
            return (
              <Section key="team-focus" title={tf.title}>
                <LabeledList items={tf.items} />
              </Section>
            );
          }
          case "vault-stats": {
            const vs = homeContent.vaultStats;
            return (
              <VaultStats key="vault-stats" title={vs.title} subtitle={vs.subtitle} />
            );
          }
          case "cta": {
            const c = homeContent.cta;
            return (
              <Section key="cta" title={c.title} description={c.description}>
                <div className="mt-4">
                  <a className="underline" href={c.primaryCta.href}>{c.primaryCta.label}</a>
                </div>
              </Section>
            );
          }
          default:
            return null;
        }
      })}
    </main>
  );
}
