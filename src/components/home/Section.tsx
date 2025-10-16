/**
 * Generic Section Wrapper
 *
 * Purpose:
 * - Shared container for section layout with optional title and description.
 * - Keeps consistent spacing/width across homepage modules.
 */

import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { FadeInUp } from "@/components/motion/Reveal";

export interface SectionProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Section(props: SectionProps) {
  logger.debug("component:Section:render", { hasTitle: Boolean(props.title) });
  const { title, description, className, children } = props;

  return (
    <section className={cn("w-full py-12 md:py-16", className)}>
      <div className="container mx-auto px-4 max-w-5xl">
        {title ? (
          <div className="mb-6">
            <FadeInUp>
              <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
            </FadeInUp>
            {description ? (
              <FadeInUp delay={0.05}>
                <p className="text-muted-foreground mt-2">{description}</p>
              </FadeInUp>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}


