"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Database, Brain, BarChart3, Rocket, ArrowRight, Search, Map, Code, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const serviceIcons = [Database, Brain, BarChart3, Rocket]
const processIcons = [Search, Map, Code, Zap]

function ServiceCard({ icon: Icon, titleKey, descKey, index, isVisible }: {
  icon: typeof Database
  titleKey: string
  descKey: string
  index: number
  isVisible: boolean
}) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-card transition-all duration-700 hover:border-primary/40 hover:neon-glow overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${(index + 1) * 150}ms` }}
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-8 lg:p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/40">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <span className="font-heading text-7xl font-black text-primary/5 transition-colors group-hover:text-primary/10 leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mb-4 font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
          {t(titleKey)}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {t(descKey)}
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5"
        >
          {t("services.learnmore")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function ProcessStep({ icon: Icon, titleKey, descKey, index, isVisible }: {
  icon: typeof Search
  titleKey: string
  descKey: string
  index: number
  isVisible: boolean
}) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${(index + 1) * 200}ms` }}
    >
      {/* Step number */}
      <div className="relative mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {index + 1}
        </span>
      </div>

      <h4 className="mb-2 font-heading text-lg font-bold text-foreground">{t(titleKey)}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>

      {/* Connector line (not on last) */}
      {index < 3 && (
        <div className="absolute top-8 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-primary/30 to-primary/10 lg:block" />
      )}
    </div>
  )
}

export default function ServicesPage() {
  const { t } = useI18n()
  const { ref: servicesRef, isVisible: servicesVisible } = useAnimateOnScroll(0.05)
  const { ref: processRef, isVisible: processVisible } = useAnimateOnScroll(0.1)

  const services = [
    { icon: serviceIcons[0], titleKey: "services.data.title", descKey: "services.data.desc" },
    { icon: serviceIcons[1], titleKey: "services.strategy.title", descKey: "services.strategy.desc" },
    { icon: serviceIcons[2], titleKey: "services.decision.title", descKey: "services.decision.desc" },
    { icon: serviceIcons[3], titleKey: "services.growth.title", descKey: "services.growth.desc" },
  ]

  const processSteps = [
    { icon: processIcons[0], titleKey: "servicespage.step1.title", descKey: "servicespage.step1.desc" },
    { icon: processIcons[1], titleKey: "servicespage.step2.title", descKey: "servicespage.step2.desc" },
    { icon: processIcons[2], titleKey: "servicespage.step3.title", descKey: "servicespage.step3.desc" },
    { icon: processIcons[3], titleKey: "servicespage.step4.title", descKey: "servicespage.step4.desc" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 grid-bg">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 animate-fade-in-up">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {t("services.tag")}
              </span>
            </div>
            <h1 className="font-heading text-4xl font-black text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up text-balance" style={{ animationDelay: "0.1s" }}>
              {t("servicespage.title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground animate-fade-in-up text-pretty" style={{ animationDelay: "0.2s" }}>
              {t("servicespage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div ref={servicesRef} className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard
                key={service.titleKey}
                icon={service.icon}
                titleKey={service.titleKey}
                descKey={service.descKey}
                index={i}
                isVisible={servicesVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div ref={processRef} className="mx-auto max-w-7xl px-6">
          <div className={cn(
            "mb-16 text-center max-w-2xl mx-auto transition-all duration-700",
            processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {t("servicespage.process.title")}
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              {t("servicespage.process.title")}
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.titleKey}
                icon={step.icon}
                titleKey={step.titleKey}
                descKey={step.descKey}
                index={i}
                isVisible={processVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 border-t border-border grid-bg">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {t("cta.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110"
            >
              {t("cta.btn1")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
