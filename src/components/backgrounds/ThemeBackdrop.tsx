/**
 * ThemeBackdrop
 *
 * Purpose:
 * - Provide subtle, theme-aware background visuals using CSS + light motion.
 * - Keeps DOM light: gradients + dot grid; disabled when user prefers reduced motion.
 */

"use client";

import { Motion } from "@/components/motion/LazyMotionProvider";
import { useMotionPrefs } from "@/components/motion/LazyMotionProvider";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";

export interface ThemeBackdropProps {
  className?: string;
}

export function ThemeBackdrop({ className }: ThemeBackdropProps) {
  const { prefersReducedMotion } = useMotionPrefs();
  logger.debug("component:ThemeBackdrop:render", { prefersReducedMotion });

  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-10", className)} aria-hidden>
      {/* radial gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,_color-mix(in_oklab,_var(--color-primary)_35%,_transparent)_0%,_transparent_70%)]" />
      {/* animated soft glow blob */}
      {prefersReducedMotion ? null : (
        <Motion.div
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-25 dark:opacity-20"
          style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 60%)" }}
          initial={{ scale: 0.9, opacity: 0.18 }}
          animate={{ scale: 1.05, opacity: 0.25 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      )}
      {/* subtle dot grid overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-[0.07] dark:opacity-[0.08]"
           style={{
             backgroundImage:
               "radial-gradient(currentColor 1px, transparent 1px)",
             backgroundSize: "20px 20px",
             color: "var(--color-foreground)",
           }}
      />
    </div>
  );
}


