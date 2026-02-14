"use client"

import { useEffect, useState } from "react"

/**
 * Hook pour détecter si l'utilisateur préfère réduire les animations
 * Respecte prefers-reduced-motion media query
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Vérifier que window est disponible (côté client uniquement)
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    // Utiliser setTimeout pour éviter setState synchrone dans l'effet
    const timer = setTimeout(() => {
      setPrefersReducedMotion(mediaQuery.matches)
    }, 0)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      clearTimeout(timer)
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}

