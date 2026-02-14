"use client"

import { useEffect, useState } from "react"

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      // Trouver la section actuellement visible
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionIds[i])
            return
          }
        }
      }

      // Si on est en haut de la page, activer la première section
      if (window.scrollY < 100) {
        setActiveSection(sectionIds[0] || "")
      }
    }

    // Écouter le scroll
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Appel initial

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, offset])

  return activeSection
}

