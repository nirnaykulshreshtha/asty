/**
 * FAQ Section Component
 * ---------------------
 * Displays frequently asked questions in an accordion format.
 * Covers membership, referral mechanics, dividends, and presale timing.
 * 
 * Features:
 * - Accordion-style FAQ items
 * - Smooth expand/collapse animations
 * - Scroll-triggered reveals
 * - Responsive design
 */

"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { logger } from "@/lib/logger"
import { FAQ_ITEMS } from "./types"
import { SectionHeader } from "@/components/ui/SectionHeader"

/**
 * Renders the FAQ section with accordion-style questions and answers.
 */
export function FAQSection() {
  logger.info("component:faq:render")

  return (
    <section
      id="faq"
      data-section-label="FAQ"
      className="space-y-12 border-b border-border/40 py-20"
    >
      <SectionHeader
        label="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about Early Membership, the referral engine, dividends, and presale timing."
      />

      <Accordion type="single" collapsible className="space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`faq-${index}`}
            className="reveal-section overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-lg data-[state=open]:border-primary/40"
            data-animate-on-scroll
            data-visible="false"
          >
            <AccordionTrigger className="px-6 py-4 text-left text-base font-semibold text-foreground">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-sm text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
