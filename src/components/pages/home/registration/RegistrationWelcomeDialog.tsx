"use client"

import Image from "next/image"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import AstyCharacter from "@/assets/images/asty character.png"
import { MagicCard } from "@/components/ui/magic-card"
import { Meteors } from "@/components/ui/meteors"

interface RegistrationWelcomeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
  motionReduced: boolean
}

/**
 * Reimagined celebratory modal shown post-deposit. Introduces layered
 * gradients, animated stat chips, and a guided “next steps” list while
 * respecting reduced motion preferences.
 */
export function RegistrationWelcomeDialog({
  open,
  onOpenChange,
  onContinue,
  motionReduced,
}: RegistrationWelcomeDialogProps) {
  const shouldAnimateLoop = !motionReduced

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden border-0 bg-transparent p-0 shadow-none">
        <MagicCard>
          <motion.div
            initial={motionReduced ? undefined : { opacity: 0, y: 32, scale: 0.97 }}
            animate={motionReduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={motionReduced ? undefined : { opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate overflow-hidden px-8 pb-12 pt-10 text-center text-base text-muted-foreground shadow-[0_35px_120px_rgba(10,7,38,0.65)] backdrop-blur-2xl sm:px-12"
          >
            <Meteors number={30} />
            
            <DialogHeader className="relative z-10 mx-auto max-w-xl space-y-5 text-center">
              <DialogTitle className="text-pretty text-xs font-semibold leading-tight text-foreground">
              <div className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-6xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
                Welcome aboard.
              </div>
              <div className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-6xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
                You&apos;re officially in.
              </div>
              </DialogTitle>

            </DialogHeader>

            <motion.div
              className="relative z-10 mx-auto mt-8 flex w-full max-w-sm justify-center"
              initial={motionReduced ? undefined : { opacity: 0, y: 18 }}
              animate={motionReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                aria-hidden
                className="absolute -inset-12 rounded-[40px] bg-gradient-to-tr from-primary/35 via-primary/10 to-transparent blur-3xl"
              />
              <motion.div
                animate={
                  shouldAnimateLoop
                    ? {
                        y: [0, -12, 0],
                        rotate: [0, 2, -2, 0],
                      }
                    : undefined
                }
                transition={
                  shouldAnimateLoop
                    ? {
                        duration: 7.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
                className="relative"
              >
                <Image
                  src={AstyCharacter}
                  alt="Asty mascot celebrating your successful membership deposit"
                  width={400}
                  height={400}
                  className="h-72 w-auto drop-shadow-[0_35px_60px_rgba(15,11,40,0.55)] sm:h-64"
                  priority
                />
              </motion.div>
            </motion.div>

            <DialogFooter className="relative z-10 mt-6 flex justify-center sm:justify-center items-center">
              <Button size="lg" onClick={onContinue} className="cursor-pointer">
                Continue exploring
              </Button>
            </DialogFooter>
          </motion.div>
        </MagicCard>
      </DialogContent>
    </Dialog>
  )
}