"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { AIBackgroundData } from "@/components/hero/ai-background-data"
import { AIBackgroundStrategy } from "@/components/hero/ai-background-strategy"
import { AIBackgroundDecision } from "@/components/hero/ai-background-decision"

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
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

type Slide = {
  id: number
  title: string
  subtitle: string
  background: React.ReactNode
}

export function HeroSection() {
  const { t } = useI18n()
  const prefersReducedMotion = useReducedMotion()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)

  // Configuration des 3 slides
  const slides: Slide[] = [
    {
      id: 0,
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
      background: <AIBackgroundData />,
    },
    {
      id: 1,
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
      background: <AIBackgroundStrategy />,
    },
    {
      id: 2,
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
      background: <AIBackgroundDecision />,
    },
  ]

  // Auto-play du slider
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return

    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [prefersReducedMotion, isPaused, slides.length])

  // Navigation manuelle
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  // Swipe gestures pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return

    const diff = touchStartXRef.current - touchEndXRef.current
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }

    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden border-b border-border/50"
      aria-label="Section principale"
      role="region"
      style={{ minHeight: "calc(100vh - 73px)", maxHeight: "800px" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Arrière-plan du slide actuel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {slides[currentSlide].background}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 text-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={prefersReducedMotion ? {} : itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {t("hero.tag")}
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              variants={prefersReducedMotion ? {} : itemVariants}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block text-primary neon-text">
                {slides[currentSlide].title}
              </span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={prefersReducedMotion ? {} : itemVariants}
              className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={prefersReducedMotion ? {} : itemVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    import("@/lib/analytics").then(({ analytics }) => {
                      analytics.trackCTA("hero", t("hero.cta1"))
                    })
                  }
                }}
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    import("@/lib/analytics").then(({ analytics }) => {
                      analytics.trackCTA("hero", t("hero.cta2"))
                    })
                  }
                }}
              >
                {t("hero.cta2")}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
          {/* Bouton précédent */}
          <button
            onClick={prevSlide}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />
          </button>

          {/* Indicateurs de slides */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={nextSlide}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Slide suivant"
          >
            <ChevronRight className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />
          </button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.span
            className="text-xs tracking-widest text-muted-foreground uppercase"
            animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("hero.scroll")}
          </motion.span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
