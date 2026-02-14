"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { ArrowRight, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function CTASection() {
  const { t } = useI18n()
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section 
      id="cta" 
      className="relative py-16 sm:py-24 lg:py-32 border-t border-border overflow-hidden"
      aria-label="Section appel à l'action"
      role="region"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className={cn(
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {t("cta.subtitle")}
          </p>
        </div>

        <div className={cn(
          "mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            onClick={() => {
              if (typeof window !== "undefined") {
                import("@/lib/analytics").then(({ analytics }) => {
                  analytics.trackCTA("cta", t("cta.btn1"))
                })
              }
            }}
          >
            {t("cta.btn1")}
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            onClick={() => {
              if (typeof window !== "undefined") {
                import("@/lib/analytics").then(({ analytics }) => {
                  analytics.trackCTA("cta", t("cta.btn2"))
                })
              }
            }}
          >
            {t("cta.btn2")}
          </Link>
        </div>

        <div className={cn(
          "mt-8 sm:mt-10 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground transition-all duration-700 delay-400",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <Mail className="h-4 w-4 text-primary" />
          <span>{t("cta.email")}</span>
        </div>
      </div>
    </section>
  )
}
