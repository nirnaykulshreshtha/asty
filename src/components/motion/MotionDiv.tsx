/**
 * MotionDiv Client Wrapper
 *
 * Purpose:
 * - Provide a safe client-component boundary for using `Motion.div` inside server components.
 * - Avoids RSC serialization issues by ensuring motion elements render on the client.
 */

"use client";

import * as React from "react";
import { Motion } from "./LazyMotionProvider";
import { logger } from "@/lib/logger";

// Using a type alias avoids declaring an empty interface that only extends a supertype,
// which violates @typescript-eslint/no-empty-object-type.
export type MotionDivProps = React.ComponentProps<typeof Motion.div>;

/**
 * MotionDiv
 *
 * Client-safe wrapper around `Motion.div` that preserves all original props.
 * Logs renders to support aggressive debugging.
 */
export function MotionDiv(props: MotionDivProps) {
  logger.debug("motion:div:render", {
    hasChildren: Boolean(props.children),
    className: props.className,
  });
  return <Motion.div {...props} />;
}


