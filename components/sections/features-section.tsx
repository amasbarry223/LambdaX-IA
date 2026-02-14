"use client"

import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { useCounter } from "@/hooks/use-counter"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

function StatCard({ value, suffix, label, delay, isVisible }: {
  value: number
  suffix: string
  label: string
  delay: number
  isVisible: boolean
}) {
  const count = useCounter(value, 2000, isVisible)

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 text-center transition-all duration-700 hover:border-primary/30",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-heading text-3xl font-black text-primary neon-text lg:text-4xl">
        {suffix === "%" || suffix === "x" ? `${count}${suffix}` : `${suffix}${count}`}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export function FeaturesSection() {
  const { t } = useI18n()
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  const stats = [
    { value: 97, suffix: "%", labelKey: "features.stat1.label" },
    { value: 250, suffix: "+", labelKey: "features.stat2.label" },
    { value: 40, suffix: "%", labelKey: "features.stat3.label" },
    { value: 3, suffix: "x", labelKey: "features.stat4.label" },
  ]

  const capabilities = [
    "features.cap1", "features.cap2", "features.cap3",
    "features.cap4", "features.cap5", "features.cap6",
  ]

  return (
    <section className="relative py-24 lg:py-32 border-t border-border">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={cn(
          "mb-16 max-w-2xl transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {t("features.tag")}
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 mb-16">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.labelKey}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.labelKey)}
              delay={(i + 1) * 150}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Capabilities */}
        <div className={cn(
          "rounded-lg border border-border bg-card p-8 lg:p-12 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h3 className="font-heading text-2xl font-bold text-foreground mb-8">
            {t("features.tag")}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capKey, i) => (
              <div
                key={capKey}
                className={cn(
                  "flex items-start gap-3 rounded-md p-3 transition-all duration-500",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-foreground">{t(capKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
