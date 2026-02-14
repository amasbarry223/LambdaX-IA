"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// Enregistrer ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Variantes d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function HeroSection() {
  const { t } = useI18n()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const visualElementRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement[]>([])

  // Animations GSAP pour les éléments visuels
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Animation des cercles rotatifs avec GSAP (plus fluide que CSS)
      ringsRef.current.forEach((ring, index) => {
        if (ring) {
          const duration = [20, 15, 25][index] || 20
          const direction = index === 1 ? -1 : 1
          
          gsap.to(ring, {
            rotation: 360 * direction,
            duration: duration,
            repeat: -1,
            ease: "none",
          })
        }
      })

      // Animation parallaxe pour l'élément visuel au scroll
      if (visualElementRef.current) {
        gsap.to(visualElementRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Animation des éléments décoratifs au scroll
      const decorativeDots = sectionRef.current?.querySelectorAll(".decorative-dot")
      decorativeDots?.forEach((dot, index) => {
        gsap.to(dot, {
          y: (index % 2 === 0 ? -20 : 20),
          opacity: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-73px)] flex items-center overflow-hidden grid-bg animated-gradient-bg">
      {/* Gradient de transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
      
      {/* Blur morph shapes - Effet moderne */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blur-morph" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blur-morph" style={{ animationDelay: "5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-blur-morph" style={{ animationDelay: "10s" }} />
      </div>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="decorative-dot absolute top-20 left-10 h-1 w-1 rounded-full bg-primary/60 animate-pulse-glow" />
        <div className="decorative-dot absolute top-40 right-20 h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
        <div className="decorative-dot absolute bottom-40 left-1/4 h-1 w-1 rounded-full bg-primary/50 animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="decorative-dot absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-primary/20 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        {/* Neon line decorations */}
        <div className="absolute top-1/4 left-0 h-px w-32 bg-gradient-to-r from-primary/30 to-transparent" />
        <div className="absolute bottom-1/3 right-0 h-px w-48 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32 w-full z-10">
        <motion.div
          className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="flex-1" variants={prefersReducedMotion ? {} : itemVariants}>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5"
              variants={prefersReducedMotion ? {} : itemVariants}
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {t("hero.tag")}
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
              variants={prefersReducedMotion ? {} : titleVariants}
            >
              <motion.span className="block" variants={prefersReducedMotion ? {} : itemVariants}>
                {t("hero.title1")}
              </motion.span>
              <motion.span
                className="block text-primary neon-text"
                variants={prefersReducedMotion ? {} : itemVariants}
                animate={prefersReducedMotion ? {} : { textShadow: ["0 0 10px hsl(120 100% 50% / 0.5)", "0 0 20px hsl(120 100% 50% / 0.8)", "0 0 10px hsl(120 100% 50% / 0.5)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {t("hero.title2")}
              </motion.span>
              <motion.span className="block" variants={prefersReducedMotion ? {} : itemVariants}>
                {t("hero.title3")}
              </motion.span>
              <motion.span
                className="block text-primary neon-text"
                variants={prefersReducedMotion ? {} : itemVariants}
                animate={prefersReducedMotion ? {} : { textShadow: ["0 0 10px hsl(120 100% 50% / 0.5)", "0 0 20px hsl(120 100% 50% / 0.8)", "0 0 10px hsl(120 100% 50% / 0.5)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                {t("hero.title4")}
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
              variants={prefersReducedMotion ? {} : itemVariants}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={prefersReducedMotion ? {} : itemVariants}
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110 magnetic-hover animate-glow-pulse"
                >
                  {t("hero.cta1")}
                  <motion.div
                    animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                >
                  {t("hero.cta2")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <div ref={visualElementRef} className="relative flex-1 hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Main visual - Abstract AI brain */}
              <div className="relative h-80 w-80 xl:h-96 xl:w-96">
                {/* Outer ring */}
                <div
                  ref={(el) => {
                    if (el) ringsRef.current[0] = el
                  }}
                  className="absolute inset-0 rounded-full border border-primary/20"
                />
                <div
                  ref={(el) => {
                    if (el) ringsRef.current[1] = el
                  }}
                  className="absolute inset-4 rounded-full border border-primary/15"
                />
                <div
                  ref={(el) => {
                    if (el) ringsRef.current[2] = el
                  }}
                  className="absolute inset-8 rounded-full border border-primary/10"
                />

                {/* Center element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm neon-glow animate-float animate-glow-pulse flex items-center justify-center">
                      <span className="font-heading text-5xl font-black text-primary neon-text">{"\u03BB"}</span>
                    </div>
                    {/* Orbiting dots */}
                    <div className="absolute -top-3 -right-3 h-3 w-3 rounded-full bg-primary/60 animate-pulse" />
                    <div className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1/2 -right-6 h-2 w-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>
                </div>

                {/* Connection lines */}
                <div className="absolute top-1/4 left-0 h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
                <div className="absolute bottom-1/4 right-0 h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
                <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-transparent to-primary/30" />
                <div className="absolute bottom-0 left-1/2 w-px h-16 bg-gradient-to-t from-transparent to-primary/30" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.span
            className="text-xs tracking-widest text-muted-foreground uppercase"
            animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("hero.scroll")}
          </motion.span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
