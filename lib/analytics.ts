"use client"

import { useEffect } from "react"

// Déclaration globale pour gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

// Système de tracking pour les interactions utilisateur
export type AnalyticsEvent = 
  | { type: "cta_click"; location: string; label: string }
  | { type: "slide_change"; slideIndex: number; slideName: string }
  | { type: "section_view"; sectionId: string }
  | { type: "scroll_depth"; depth: number }
  | { type: "service_click"; serviceName: string }
  | { type: "navigation_click"; destination: string }

class Analytics {
  private events: AnalyticsEvent[] = []

  track(event: AnalyticsEvent) {
    // En production, envoyer vers Google Analytics ou autre service
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Exemple avec gtag si disponible
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", event.type, {
          ...event,
        })
      }
    }

    // Stocker localement pour debug
    this.events.push(event)
    console.log("[Analytics]", event)
  }

  trackCTA(location: string, label: string) {
    this.track({ type: "cta_click", location, label })
  }

  trackSlideChange(slideIndex: number, slideName: string) {
    this.track({ type: "slide_change", slideIndex, slideName })
  }

  trackSectionView(sectionId: string) {
    this.track({ type: "section_view", sectionId })
  }

  trackScrollDepth(depth: number) {
    this.track({ type: "scroll_depth", depth })
  }

  trackServiceClick(serviceName: string) {
    this.track({ type: "service_click", serviceName })
  }

  trackNavigation(destination: string) {
    this.track({ type: "navigation_click", destination })
  }

  getEvents() {
    return this.events
  }
}

export const analytics = new Analytics()

// Hook pour tracker le scroll depth
export function useScrollDepth() {
  if (typeof window === "undefined") return

  useEffect(() => {
    let maxScroll = 0

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100)

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        // Tracker à 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          analytics.trackScrollDepth(scrollPercent)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
}

