"use client"

import { type ReactNode, useEffect } from "react"
import { I18nProvider } from "@/lib/i18n"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { BackToTop } from "@/components/back-to-top"
import { CustomCursor } from "@/components/custom-cursor"
import { SkipLinks } from "@/components/skip-links"
import { useScrollDepth } from "@/lib/analytics"

function AnalyticsTracker() {
  useScrollDepth()
  return null
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <SkipLinks />
      <ScrollProgress />
      <CustomCursor />
      <AnalyticsTracker />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-[73px]" role="main">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </I18nProvider>
  )
}
