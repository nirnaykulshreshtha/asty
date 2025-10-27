/**
 * Chevron Flow Diagram
 * --------------------
 * Reusable component that renders a responsive chevron-style flow for sequential steps.
 * On smaller screens the steps stack with vertical connectors, while on medium displays
 * and above they transform into an overlapping chevron ribbon.
 */

"use client"

import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

export interface ChevronFlowStep {
  title: string
  description?: string
  icon?: ReactNode
  accentLabel?: string
}

interface ChevronFlowDiagramProps {
  steps: ChevronFlowStep[]
  className?: string
  showStepNumbers?: boolean
}

/**
 * Renders a responsive flow diagram with chevron styling.
 */
export function ChevronFlowDiagram({
  steps,
  className,
  showStepNumbers = true,
}: ChevronFlowDiagramProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:gap-0", className)}>
      {steps.map((step, index) => {
        const isFirst = index === 0
        const isLast = index === steps.length - 1

        return (
          <div
            key={step.title}
            className={cn(
              "relative flex flex-1 flex-col",
              !isFirst && "md:-ml-6"
            )}
            style={{ zIndex: steps.length - index }}
          >
            <div
              className={cn(
                "group relative flex h-full flex-col gap-4 overflow-visible rounded-3xl border border-border/40 bg-gradient-to-br from-background via-card/95 to-card/80 p-6 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-2xl md:rounded-3xl md:p-8",
                !isLast &&
                  "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:block md:after:h-12 md:after:w-12 md:after:-translate-y-1/2 md:after:translate-x-1/3 md:after:rotate-45 md:after:bg-gradient-to-br md:after:from-primary/40 md:after:via-primary/20 md:after:to-transparent md:after:opacity-80 md:after:content-['']"
              )}
            >
              <div className="flex items-center gap-3">
                {showStepNumbers && (
                  <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}

                {step.accentLabel && (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {step.accentLabel}
                  </span>
                )}

                {step.icon && (
                  <span className="flex size-9 items-center justify-center rounded-full border border-border/50 bg-background/60 text-primary">
                    {step.icon}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                {step.description ? (
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </div>

            {!isLast && (
              <>
                <span className="absolute left-6 top-[calc(100%+0.25rem)] h-6 w-px bg-gradient-to-b from-primary/40 via-primary/30 to-transparent md:hidden" />
                <span className="absolute left-5 top-[calc(100%+1.6rem)] hidden h-0 w-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-primary/30 md:hidden" />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
