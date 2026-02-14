"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { useMagnetic } from "@/hooks/use-magnetic"
import { Database, Brain, BarChart3, Rocket, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const serviceIcons = [Database, Brain, BarChart3, Rocket]

function ServiceCard({ titleKey, descKey, Icon, index, isVisible }: {
  titleKey: string
  descKey: string
  Icon: typeof Database
  index: number
  isVisible: boolean
}) {
  const { t } = useI18n()
  const magneticRef = useMagnetic<HTMLDivElement>({ strength: 0.15 })

  return (
    <div
      ref={magneticRef}
      className={cn(
        "group relative rounded-xl border border-border/80 bg-card/50 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:neon-glow magnetic-hover",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms" }}
    >
      {/* Gradient overlay au hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Number */}
      <span className="absolute top-6 right-6 font-heading text-6xl font-black text-primary/5 transition-colors group-hover:text-primary/10">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:scale-110">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <h3 className="mb-3 font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
        {t(titleKey)}
      </h3>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {t(descKey)}
      </p>

      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2"
      >
        {t("services.learnmore")}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export function ServicesSection() {
  const { t } = useI18n()
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  const services = [
    { titleKey: "services.data.title", descKey: "services.data.desc", Icon: serviceIcons[0] },
    { titleKey: "services.strategy.title", descKey: "services.strategy.desc", Icon: serviceIcons[1] },
    { titleKey: "services.decision.title", descKey: "services.decision.desc", Icon: serviceIcons[2] },
    { titleKey: "services.growth.title", descKey: "services.growth.desc", Icon: serviceIcons[3] },
  ]

  return (
    <section id="services" className="relative py-24 lg:py-32 border-t border-border/50 bg-gradient-to-b from-background via-background to-muted/20 animated-gradient-bg">
      {/* Séparateur décoratif */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 h-1 w-1 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-20 h-1.5 w-1.5 rounded-full bg-primary/15 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 h-1 w-1 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Section Header */}
        <div className={cn(
          "mb-16 max-w-2xl transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {t("services.tag")}
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("services.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map(({ titleKey, descKey, Icon }, i) => (
            <ServiceCard
              key={titleKey}
              titleKey={titleKey}
              descKey={descKey}
              Icon={Icon}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
