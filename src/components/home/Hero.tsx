/**
 * Hero Section Component
 *
 * Purpose:
 * - Prominent introduction of Asty with primary and secondary CTAs.
 * - Pure presentational component; content is provided via props.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

export interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  className?: string;
}

export function Hero(props: HeroProps) {
  logger.debug("component:Hero:render", { propsProvided: Object.keys(props) });
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, className } = props;

  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <FadeInUp delay={0.05}>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{eyebrow}</div>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">{title}</h1>
        </FadeInUp>
        <FadeInUp delay={0.15}>
          <p className="text-base md:text-lg text-muted-foreground mb-8">{subtitle}</p>
        </FadeInUp>
        <StaggerContainer delay={0.2}>
          <div className="flex items-center justify-center gap-3">
            <StaggerItem>
              <Button asChild>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            </StaggerItem>
            <StaggerItem>
              <Button asChild variant="outline">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}


