"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGSAPScrollOptions {
  trigger?: string | Element | null
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export function useGSAPScroll(options: UseGSAPScrollOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const element = ref.current || options.trigger
    if (!element) return

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      scrub: options.scrub || false,
      markers: options.markers || false,
      once: options.once || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    })

    scrollTriggerRef.current = scrollTrigger

    return () => {
      scrollTrigger.kill()
    }
  }, [
    options.start,
    options.end,
    options.scrub,
    options.markers,
    options.once,
    options.onEnter,
    options.onLeave,
    options.onEnterBack,
    options.onLeaveBack,
    options.trigger,
  ])

  return { ref, scrollTrigger: scrollTriggerRef.current }
}

