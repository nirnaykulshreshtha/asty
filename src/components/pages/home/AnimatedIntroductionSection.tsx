"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import Mascot from "@/components/motion/Mascot"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function AnimatedIntroductionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)
  const div8Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.user />
          </Circle>
          <Circle ref={div5Ref}>
          <Mascot height={25} width={25} />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
          <Icons.user />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <Icons.vault />
          </Circle>
          <Circle ref={div8Ref} className="size-16">
            <Icons.rewards />
          </Circle>
          <Circle ref={div6Ref}>
          <Mascot height={25} width={25} />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
          <Icons.user />
          </Circle>
          <Circle ref={div7Ref}>
            <Mascot height={25} width={25} />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div8Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div8Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div8Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  )
}

const Icons = {
  user: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  vault: () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
  >
    <path d="m445.953 371.991-73.27-73.268a106.072 106.072 0 0 0 8.873-42.416c0-14.602-3.051-29.115-8.873-42.417l73.267-73.274c14.986-14.992 14.986-39.382-.001-54.369-7.262-7.261-16.916-11.26-27.184-11.26s-19.922 3.999-27.184 11.261l-73.267 73.272a106.033 106.033 0 0 0-42.417-8.874 106.052 106.052 0 0 0-42.418 8.874l-73.27-73.268c-7.263-7.261-16.917-11.26-27.185-11.26-10.268 0-19.922 3.999-27.185 11.261-14.99 14.99-14.989 39.381 0 54.37l73.271 73.268a106.063 106.063 0 0 0-8.874 42.416 106.06 106.06 0 0 0 8.874 42.417l-73.269 73.269c-14.984 14.991-14.984 39.38.002 54.367 7.262 7.262 16.917 11.262 27.185 11.262s19.923-4 27.185-11.262l73.267-73.267a106.048 106.048 0 0 0 42.412 8.874 106.05 106.05 0 0 0 42.417-8.874l73.271 73.266c7.262 7.262 16.916 11.262 27.184 11.262s19.923-3.999 27.183-11.258c7.264-7.261 11.266-16.915 11.266-27.185.002-10.269-3.997-19.924-11.26-27.187zm-14.779 39.592a17.434 17.434 0 0 1-12.408 5.141 17.426 17.426 0 0 1-12.407-5.141l-78.517-78.512a10.446 10.446 0 0 0-12.287-1.842c-12.128 6.437-25.842 9.839-39.662 9.839-13.816 0-27.529-3.403-39.66-9.84a10.45 10.45 0 0 0-12.286 1.841l-78.51 78.512a17.434 17.434 0 0 1-12.408 5.141 17.436 17.436 0 0 1-12.407-5.141c-6.84-6.84-6.839-17.972 0-24.814l78.513-78.513a10.447 10.447 0 0 0 1.84-12.288c-6.436-12.125-9.838-25.84-9.838-39.661 0-13.816 3.402-27.531 9.839-39.662a10.45 10.45 0 0 0-1.842-12.286l-78.516-78.512c-6.842-6.842-6.842-17.974-.001-24.816a17.436 17.436 0 0 1 12.408-5.14c4.686 0 9.094 1.825 12.408 5.14l78.516 78.514a10.449 10.449 0 0 0 12.288 1.84c12.125-6.438 25.84-9.84 39.661-9.84 13.822 0 27.536 3.403 39.661 9.84a10.447 10.447 0 0 0 12.288-1.841l78.513-78.517a17.433 17.433 0 0 1 12.407-5.14 17.43 17.43 0 0 1 12.407 5.14c6.841 6.841 6.84 17.973 0 24.816l-78.51 78.517a10.447 10.447 0 0 0-1.841 12.287c6.436 12.127 9.838 25.841 9.838 39.662 0 13.818-3.401 27.533-9.838 39.663a10.45 10.45 0 0 0 1.842 12.286l78.514 78.513c3.314 3.314 5.14 7.722 5.14 12.408s-1.827 9.092-5.145 12.406z" />
    <path d="M275.894 236.443c-10.947 0-19.853 8.906-19.853 19.853s8.906 19.853 19.853 19.853 19.853-8.906 19.853-19.853-8.906-19.853-19.853-19.853z" />
    <path d="M275.894 200.916c-30.536 0-55.38 24.843-55.38 55.38 0 30.536 24.844 55.38 55.38 55.38s55.38-24.844 55.38-55.38c-.001-30.536-24.844-55.38-55.38-55.38zm0 89.861c-19.013 0-34.482-15.469-34.482-34.482s15.469-34.482 34.482-34.482 34.482 15.469 34.482 34.482c-.001 19.014-15.469 34.482-34.482 34.482z" />
    <path d="M480.653 19.174H69.694c-17.285 0-31.347 14.062-31.347 31.347v62.326H21.131C9.479 112.847 0 122.326 0 133.977v92.03c0 11.651 9.479 21.13 21.131 21.13h17.216v18.545H21.131C9.479 265.682 0 275.161 0 286.813v92.03c0 11.651 9.479 21.129 21.131 21.129h17.216v61.507c0 17.285 14.062 31.347 31.347 31.347h410.959c17.285 0 31.347-14.062 31.347-31.347V50.521c0-17.285-14.062-31.347-31.347-31.347zm10.449 442.306c0 5.762-4.687 10.449-10.449 10.449H69.694c-5.762 0-10.449-4.687-10.449-10.449v-71.956c0-5.771-4.678-10.449-10.449-10.449H21.131a.23.23 0 0 1-.233-.232v-92.03a.23.23 0 0 1 .233-.233h27.665c5.771 0 10.449-4.678 10.449-10.449v-39.443c0-5.771-4.678-10.449-10.449-10.449H21.131a.23.23 0 0 1-.233-.232v-92.03a.23.23 0 0 1 .233-.232h27.665c5.771 0 10.449-4.678 10.449-10.449V50.521c0-5.762 4.687-10.449 10.449-10.449h410.959c5.762 0 10.449 4.687 10.449 10.449V461.48z" />
    <path d="M456.169 175.564c-5.771 0-10.449 4.678-10.449 10.449v4.678c0 5.771 4.678 10.449 10.449 10.449s10.449-4.678 10.449-10.449v-4.678c0-5.771-4.678-10.449-10.449-10.449zM456.169 214.045c-5.771 0-10.449 4.678-10.449 10.449v101.492c0 5.771 4.678 10.449 10.449 10.449s10.449-4.678 10.449-10.449V224.494c0-5.771-4.678-10.449-10.449-10.449z" />
  </svg>
  ),
  rewards: () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 2"
    viewBox="0 0 48 48"
  >
    <path
      d="M11.28 9v3.82H4.5v3.74c0 6.26 1.86 9.75 6.33 11.92a21 21 0 0 1 4.56 3.31 11.08 11.08 0 0 0 3.92 2.69L21 35v4.53h-2.58c-3.12 0-4.17.71-4.17 2.82v1.42h19.5V42.5c0-2.07-1.28-3-4.24-3H27V35l1.72-.51a11 11 0 0 0 3.92-2.7 22.75 22.75 0 0 1 4.74-3.47 11.08 11.08 0 0 0 5.71-6.49 27.27 27.27 0 0 0 .44-5.29v-3.71h-6.81V9ZM24 15.37l2.05 4.24h4.94l-3.87 3.57 1.11 4.56L24 25.47l-4.23 2.3 1.11-4.56L17 19.64h4.95ZM8.06 16.64h3.16v7.88c-.33.2-1.36-1-2.11-2.37a11.81 11.81 0 0 1-.81-3.28Zm28.72 0h3.44l-.29 2.2a7.5 7.5 0 0 1-2.07 4.9 3.68 3.68 0 0 1-1.11 1Z"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  </svg>
  ),
}
