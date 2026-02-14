"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Lightbulb, Shield, Award, Users, ArrowRight, Target, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const valueIcons = [Lightbulb, Shield, Award, Users]

export default function AboutPage() {
  const { t } = useI18n()
  const { ref: missionRef, isVisible: missionVisible } = useAnimateOnScroll(0.1)
  const { ref: valuesRef, isVisible: valuesVisible } = useAnimateOnScroll(0.1)
  const { ref: teamRef, isVisible: teamVisible } = useAnimateOnScroll(0.1)

  const values = [
    { icon: valueIcons[0], titleKey: "about.value1.title", descKey: "about.value1.desc" },
    { icon: valueIcons[1], titleKey: "about.value2.title", descKey: "about.value2.desc" },
    { icon: valueIcons[2], titleKey: "about.value3.title", descKey: "about.value3.desc" },
    { icon: valueIcons[3], titleKey: "about.value4.title", descKey: "about.value4.desc" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 lg:py-32 grid-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 animate-fade-in-up">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {t("about.tag")}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-foreground md:text-5xl lg:text-6xl animate-fade-in-up text-balance" style={{ animationDelay: "0.1s" }}>
              {t("about.title")}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up text-pretty" style={{ animationDelay: "0.2s" }}>
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-border">
        <div ref={missionRef} className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Mission */}
            <div
              className={cn(
                "group rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10 transition-all duration-700 hover:border-primary/40 hover:neon-glow",
                missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: "150ms" }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:bg-primary/10">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                {t("about.mission.title")}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("about.mission.desc")}
              </p>
            </div>

            {/* Vision */}
            <div
              className={cn(
                "group rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10 transition-all duration-700 hover:border-primary/40 hover:neon-glow",
                missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:bg-primary/10">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                {t("about.vision.title")}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("about.vision.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-border">
        <div ref={valuesRef} className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={cn(
            "mb-12 sm:mb-16 text-center max-w-2xl mx-auto transition-all duration-700",
            valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              {t("about.values.title")}
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, titleKey, descKey }, i) => (
              <div
                key={titleKey}
                className={cn(
                  "group rounded-lg border border-border bg-card p-6 text-center transition-all duration-700 hover:border-primary/40 hover:neon-glow",
                  valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 transition-all group-hover:bg-primary/10 group-hover:border-primary/40">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {t(titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-border grid-bg">
        <div ref={teamRef} className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              {t("about.team.title")}
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
              {t("about.team.desc")}
            </p>
          </div>

          {/* Team grid visual */}
          <div className={cn(
            "mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-4 sm:grid-cols-4 lg:grid-cols-6 transition-all duration-700 delay-300",
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="group aspect-square rounded-lg border border-border bg-card flex items-center justify-center transition-all duration-500 hover:border-primary/40 hover:neon-glow"
                style={{ transitionDelay: `${400 + i * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 border border-primary/10 transition-all group-hover:bg-primary/10">
                  <Users className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={cn(
            "mt-12 sm:mt-16 text-center transition-all duration-700 delay-500",
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110"
            >
              {t("cta.btn1")}
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
