/**
 * Reveal Motion Utilities
 *
 * Purpose:
 * - Lightweight in-view reveal animations with sensible defaults.
 * - Uses LazyMotion context for performance.
 */

"use client";

import { Motion } from "./LazyMotionProvider";
import { logger } from "@/lib/logger";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInUp({ children, className, delay = 0 }: RevealProps) {
  logger.debug("motion:FadeInUp", { delay });
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </Motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
}: RevealProps) {
  logger.debug("motion:StaggerContainer", { delay });
  return (
    <Motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08, delayChildren: delay },
        },
      }}
    >
      {children}
    </Motion.div>
  );
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <Motion.div
      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
}


