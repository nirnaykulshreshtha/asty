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

export interface MotionDivProps extends React.ComponentProps<typeof Motion.div> {}

export function MotionDiv(props: MotionDivProps) {
  return <Motion.div {...props} />;
}


