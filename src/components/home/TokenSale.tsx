/**
 * TokenSale Section
 *
 * Purpose:
 * - Visualize token sale illustration and a simple rate table with referral note.
 * - Animations use reveal/stagger with framer-motion utilities.
 */

import { Section } from "./Section";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { logger } from "@/lib/logger";

export interface TokenSaleProps {
  title: string;
  illustrationLabel: string;
  columns: [string, string];
  rows: { tokens: string; rate: string }[];
  referralNote: string;
}

export function TokenSale({ title, illustrationLabel, columns, rows, referralNote }: TokenSaleProps) {
  logger.info("component:TokenSale:render", { rows: rows.length });

  return (
    <Section title={title}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Illustration */}
        <FadeInUp>
          <div className="rounded-3xl bg-card text-card-foreground border p-6 h-64 md:h-72 flex items-center justify-center">
            <MotionDiv
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl font-black tracking-wider"
              style={{ letterSpacing: "0.08em" }}
            >
              {illustrationLabel}
            </MotionDiv>
          </div>
        </FadeInUp>

        {/* Table */}
        <StaggerContainer>
          <div className="rounded-2xl overflow-hidden border max-w-md">
            <div className="bg-primary text-primary-foreground px-6 py-3 font-semibold flex items-center justify-between">
              <div>{columns[0]}</div>
              <div>{columns[1]}</div>
            </div>
            <div className="bg-card">
              {rows.map((row, idx) => (
                <StaggerItem key={idx}>
                  <div className="px-6 py-4 flex items-center justify-between text-muted-foreground border-t">
                    <div className="text-lg">{row.tokens}</div>
                    <div className="text-lg">{row.rate}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </StaggerContainer>
      </div>
      <FadeInUp delay={0.05}>
        <div className="text-center text-sm md:text-base text-muted-foreground mt-6">{referralNote}</div>
      </FadeInUp>
    </Section>
  );
}


