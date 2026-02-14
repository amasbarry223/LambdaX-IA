"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { 
  Brain, 
  Database, 
  BarChart3, 
  Rocket, 
  ArrowRight, 
  Code,
  Zap,
  TrendingUp,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  icon: typeof Brain
  titleKey: string
  descKey: string
  categoryKey: string
  techKey: string
  resultsKey: string
  index: number
}

function ProjectCard({ project, isVisible }: { project: Project; isVisible: boolean }) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-card transition-all duration-700 hover:border-primary/40 hover:neon-glow overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${(project.index + 1) * 150}ms` }}
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-8 lg:p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/40">
            <project.icon className="h-7 w-7 text-primary" />
          </div>
          <span className="font-heading text-7xl font-black text-primary/5 transition-colors group-hover:text-primary/10 leading-none">
            {String(project.index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mb-4">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            {t(project.categoryKey)}
          </span>
          <h3 className="font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
            {t(project.titleKey)}
          </h3>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {t(project.descKey)}
        </p>

        <div className="mb-6 space-y-3">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t("projects.tech")}
            </span>
            <p className="mt-1 text-sm text-foreground">{t(project.techKey)}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t("projects.results")}
            </span>
            <p className="mt-1 text-sm text-foreground">{t(project.resultsKey)}</p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5"
        >
          {t("projects.learnmore")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function ProjetsPage() {
  const { t } = useI18n()
  const { ref: projectsRef, isVisible: projectsVisible } = useAnimateOnScroll(0.05)
  const { ref: statsRef, isVisible: statsVisible } = useAnimateOnScroll(0.1)

  const projects: Project[] = [
    {
      icon: Brain,
      titleKey: "projects.project1.title",
      descKey: "projects.project1.desc",
      categoryKey: "projects.project1.category",
      techKey: "projects.project1.tech",
      resultsKey: "projects.project1.results",
      index: 0,
    },
    {
      icon: Database,
      titleKey: "projects.project2.title",
      descKey: "projects.project2.desc",
      categoryKey: "projects.project2.category",
      techKey: "projects.project2.tech",
      resultsKey: "projects.project2.results",
      index: 1,
    },
    {
      icon: BarChart3,
      titleKey: "projects.project3.title",
      descKey: "projects.project3.desc",
      categoryKey: "projects.project3.category",
      techKey: "projects.project3.tech",
      resultsKey: "projects.project3.results",
      index: 2,
    },
    {
      icon: Rocket,
      titleKey: "projects.project4.title",
      descKey: "projects.project4.desc",
      categoryKey: "projects.project4.category",
      techKey: "projects.project4.tech",
      resultsKey: "projects.project4.results",
      index: 3,
    },
    {
      icon: Code,
      titleKey: "projects.project5.title",
      descKey: "projects.project5.desc",
      categoryKey: "projects.project5.category",
      techKey: "projects.project5.tech",
      resultsKey: "projects.project5.results",
      index: 4,
    },
    {
      icon: Zap,
      titleKey: "projects.project6.title",
      descKey: "projects.project6.desc",
      categoryKey: "projects.project6.category",
      techKey: "projects.project6.tech",
      resultsKey: "projects.project6.results",
      index: 5,
    },
  ]

  const stats = [
    { icon: TrendingUp, valueKey: "projects.stats.projects", labelKey: "projects.stats.projects.label" },
    { icon: Shield, valueKey: "projects.stats.success", labelKey: "projects.stats.success.label" },
    { icon: Zap, valueKey: "projects.stats.efficiency", labelKey: "projects.stats.efficiency.label" },
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
                {t("projects.tag")}
              </span>
            </div>
            <h1 className="font-heading text-4xl font-black text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up text-balance" style={{ animationDelay: "0.1s" }}>
              {t("projects.title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground animate-fade-in-up text-pretty" style={{ animationDelay: "0.2s" }}>
              {t("projects.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div ref={statsRef} className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.valueKey}
                className={cn(
                  "text-center transition-all duration-700",
                  statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="font-heading text-4xl font-black text-primary mb-2">
                  {t(stat.valueKey)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div ref={projectsRef} className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance mb-4">
              {t("projects.portfolio.title")}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
              {t("projects.portfolio.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.titleKey}
                project={project}
                isVisible={projectsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 border-t border-border grid-bg">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("projects.cta.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {t("projects.cta.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110"
            >
              {t("projects.cta.button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

