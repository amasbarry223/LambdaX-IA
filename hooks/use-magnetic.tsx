"use client"

import { useEffect, useRef } from "react"

interface UseMagneticOptions {
  strength?: number
  disabled?: boolean
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticOptions = {}
) {
  const ref = useRef<T>(null)
  const { strength = 0.3, disabled = false } = options

  useEffect(() => {
    if (disabled || typeof window === "undefined" || !ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      element.style.transition = "transform 0.1s ease-out"
    }

    const handleMouseLeave = () => {
      if (!element) return
      element.style.transform = "translate(0, 0)"
      element.style.transition = "transform 0.3s ease-out"
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, disabled])

  return ref
}

