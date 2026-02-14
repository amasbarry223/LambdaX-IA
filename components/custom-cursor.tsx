"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldHideDefault, setShouldHideDefault] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Détecter les éléments interactifs
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseenter", () => setIsVisible(true))
    window.addEventListener("mouseleave", () => setIsVisible(false))

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  // Masquer le curseur par défaut sur mobile et si l'utilisateur préfère réduire les animations
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    
    // Utiliser setTimeout pour éviter setState synchrone dans l'effet
    const timer = setTimeout(() => {
      if (isMobile || prefersReducedMotion) {
        setIsVisible(false)
        setShouldHideDefault(false)
        return
      }

      // Activer le masquage du curseur par défaut uniquement sur desktop
      setShouldHideDefault(true)
    }, 0)
    
    // Ajouter une classe au body pour masquer le curseur
    if (shouldHideDefault && !isMobile && !prefersReducedMotion) {
      document.body.style.cursor = 'none'
      document.documentElement.style.cursor = 'none'
    }

    return () => {
      clearTimeout(timer)
      document.body.style.cursor = ''
      document.documentElement.style.cursor = ''
    }
  }, [shouldHideDefault])

  if (!isVisible) return null

  return (
    <>
      {/* Cursor dot */}
      <div
        className={cn(
          "pointer-events-none fixed z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 bg-primary/20 transition-all duration-300 ease-out",
          isHovering && "scale-150 border-primary bg-primary/30"
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        aria-hidden="true"
      />

      {/* Cursor ring */}
      <div
        className={cn(
          "pointer-events-none fixed z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 transition-all duration-500 ease-out",
          isHovering && "scale-150 border-primary/60"
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        aria-hidden="true"
      />
    </>
  )
}

