"use client"

import { useEffect, useRef, useState } from "react"

export function useAnimateOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Optimisation: ajouter will-change avant l'animation
    element.style.willChange = "transform, opacity"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
          // Retirer will-change après l'animation pour économiser les ressources
          setTimeout(() => {
            element.style.willChange = "auto"
          }, 1000)
        }
      },
      { 
        threshold,
        rootMargin: "50px" // Déclencher un peu avant pour une animation plus fluide
      }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      element.style.willChange = "auto"
    }
  }, [threshold])

  return { ref, isVisible }
}
