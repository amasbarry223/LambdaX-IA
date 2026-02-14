"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useI18n } from "@/lib/i18n"
import { Quote, Star, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// Enregistrer ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Testimonial {
  nameKey: string
  roleKey: string
  textKey: string
}

const testimonials: Testimonial[] = [
  {
    nameKey: "testimonials.testimonial1.name",
    roleKey: "testimonials.testimonial1.role",
    textKey: "testimonials.testimonial1.text",
  },
  {
    nameKey: "testimonials.testimonial2.name",
    roleKey: "testimonials.testimonial2.role",
    textKey: "testimonials.testimonial2.text",
  },
  {
    nameKey: "testimonials.testimonial3.name",
    roleKey: "testimonials.testimonial3.role",
    textKey: "testimonials.testimonial3.text",
  },
  {
    nameKey: "testimonials.testimonial4.name",
    roleKey: "testimonials.testimonial4.role",
    textKey: "testimonials.testimonial4.text",
  },
]

// Composant de carte témoignage amélioré
function TestimonialCard({
  testimonial,
  index,
  t,
  isPaused,
}: {
  testimonial: Testimonial
  index: number
  t: (key: string) => string
  isPaused: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return

    const card = cardRef.current

    // Animation au hover avec GSAP (plus fluide)
    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(card, {
        y: -12,
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0, 255, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const initials = t(testimonial.nameKey)
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      ref={cardRef}
      role="article"
      aria-label={`Témoignage de ${t(testimonial.nameKey)}`}
      className={cn(
        "group relative flex-shrink-0 rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl p-6 transition-all duration-300",
        "hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10",
        "focus-within:ring-2 focus-within:ring-primary/50 focus-within:outline-none",
        "w-[85vw] sm:w-[360px] md:w-[400px] lg:w-[420px]",
        isPaused && "opacity-90"
      )}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 255, 0, 0.05)",
      }}
    >
      {/* Gradient overlay au hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 pointer-events-none",
          isHovered && "opacity-100"
        )}
      />

      {/* Quote Icon avec animation */}
      <div className="relative mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 rounded-xl border border-primary/30 bg-primary/10 p-2.5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Quote className="h-5 w-5 text-primary" />
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  "fill-primary text-primary",
                  isHovered && "scale-110"
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
        {/* Indicateur de pause */}
        {isPaused && (
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1">
            <Pause className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">Pause</span>
          </div>
        )}
      </div>

      {/* Testimonial Text avec meilleure typographie */}
      <blockquote className="mb-6 text-base leading-relaxed text-foreground/90 font-medium">
        <span className="text-3xl leading-none text-primary/30 font-serif absolute -top-1 -left-1">
          &ldquo;
        </span>
        <span className="relative z-10 pl-5">{t(testimonial.textKey)}</span>
        <span className="text-3xl leading-none text-primary/30 font-serif">&rdquo;</span>
      </blockquote>

      {/* Author Info amélioré */}
      <div className="relative flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <span className="text-lg font-bold text-primary">{initials}</span>
          </div>
          {/* Glow effect au hover */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-base mb-0.5 truncate">
            {t(testimonial.nameKey)}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {t(testimonial.roleKey)}
          </p>
        </div>
      </div>

      {/* Border accent animé */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useI18n()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Dupliquer les témoignages pour l'effet infini
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Animation du header avec stagger
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Animation du carousel infini
      if (carouselRef.current) {
        const cards = carouselRef.current.children
        if (cards.length === 0) return

        let animationInstance: gsap.core.Tween | null = null

        // Attendre que les cartes soient rendues pour calculer les dimensions
        const updateAnimation = () => {
          const firstCard = cards[0] as HTMLElement
          if (!firstCard || firstCard.offsetWidth === 0) return

          const cardWidth = firstCard.offsetWidth
          const gap = 16 // 1rem = 16px (réduit de 24px)
          const singleSetWidth = (cardWidth + gap) * testimonials.length

          // Tuer l'animation précédente si elle existe
          if (animationInstance) {
            animationInstance.kill()
          }

          // Position initiale (début du deuxième set)
          const startX = -singleSetWidth
          gsap.set(carouselRef.current, { x: startX })

          // Créer l'animation qui se répète
          const animate = () => {
            // Vitesse optimale : 120px par seconde pour un défilement visible mais pas trop rapide
            const distance = singleSetWidth
            const speed = 120 // pixels par seconde
            const duration = distance / speed

            animationInstance = gsap.to(carouselRef.current, {
              x: startX - singleSetWidth,
              duration: duration,
              ease: "none",
              onComplete: () => {
                // Reset invisible à la position de départ
                gsap.set(carouselRef.current, { x: startX })
                // Relancer l'animation
                if (!isPaused) {
                  animate()
                }
              },
            })
          }

          // Démarrer l'animation seulement si pas en pause
          if (!isPaused) {
            animate()
            animationRef.current = animationInstance
          }
        }

        // Attendre le rendu complet avec plusieurs tentatives
        let attempts = 0
        const tryInit = () => {
          attempts++
          const firstCard = cards[0] as HTMLElement
          if (firstCard && firstCard.offsetWidth > 0) {
            updateAnimation()
          } else if (attempts < 10) {
            setTimeout(tryInit, 100)
          }
        }
        tryInit()

        // Recalculer au resize avec debounce
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
          clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            updateAnimation()
          }, 250)
        }
        window.addEventListener("resize", handleResize)

        // Pause au hover
        const handleMouseEnter = () => {
          setIsHovered(true)
          animationInstance?.pause()
        }

        const handleMouseLeave = () => {
          setIsHovered(false)
          if (!isPaused) {
            animationInstance?.resume()
          }
        }

        carouselRef.current.addEventListener("mouseenter", handleMouseEnter)
        carouselRef.current.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          clearTimeout(resizeTimeout)
          window.removeEventListener("resize", handleResize)
          carouselRef.current?.removeEventListener("mouseenter", handleMouseEnter)
          carouselRef.current?.removeEventListener("mouseleave", handleMouseLeave)
          if (animationInstance) {
            animationInstance.kill()
          }
        }
      }

      // Animation parallaxe pour les éléments décoratifs
      const decorativeElements = sectionRef.current?.querySelectorAll(".decorative-element")
      decorativeElements?.forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? -50 : 50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [isPaused, prefersReducedMotion])

  // Gestion de la pause/play
  const togglePause = () => {
    setIsPaused(!isPaused)
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.resume()
      } else {
        animationRef.current.pause()
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 border-t border-border/50 bg-gradient-to-b from-muted/20 via-background to-background overflow-hidden"
      aria-label="Section témoignages clients"
    >
      {/* Éléments décoratifs améliorés */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-element absolute top-20 left-10 h-2 w-2 rounded-full bg-primary/20 animate-pulse" />
        <div className="decorative-element absolute top-40 right-20 h-1.5 w-1.5 rounded-full bg-primary/15 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="decorative-element absolute bottom-40 left-1/4 h-1 w-1 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/4 left-0 h-px w-32 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="absolute bottom-1/3 right-0 h-px w-48 bg-gradient-to-l from-primary/15 to-transparent" />
        {/* Gradient overlay subtil */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Section Header amélioré */}
        <div ref={headerRef} className="mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {t("testimonials.tag")}
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Contrôles de navigation */}
        <div className="mb-6 flex items-center justify-end gap-3">
          <button
            onClick={togglePause}
            aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
            className={cn(
              "flex items-center gap-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300",
              "hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            )}
          >
            {isPaused ? (
              <>
                <Play className="h-4 w-4 text-primary" />
                <span className="text-foreground">Reprendre</span>
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 text-primary" />
                <span className="text-foreground">Pause</span>
              </>
            )}
          </button>
        </div>

        {/* Testimonials Carousel amélioré */}
        <div
          className="overflow-hidden -mx-6 px-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={carouselRef}
            className="flex gap-4 will-change-transform"
            style={{
              width: "fit-content",
            }}
            aria-live="polite"
            aria-label="Carousel de témoignages en défilement automatique"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.nameKey}-${index}`}
                testimonial={testimonial}
                index={index}
                t={t}
                isPaused={isPaused || isHovered}
              />
            ))}
          </div>
        </div>

        {/* Indicateurs de position (dots) */}
        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                "bg-primary/30 hover:bg-primary/50",
                "cursor-pointer"
              )}
              aria-label={`Témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
