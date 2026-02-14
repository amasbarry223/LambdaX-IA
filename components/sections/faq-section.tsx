"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function FAQSection() {
  const { t } = useI18n()
  const { ref, isVisible } = useAnimateOnScroll(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: "faq.q1", a: "faq.a1" },
    { q: "faq.q2", a: "faq.a2" },
    { q: "faq.q3", a: "faq.a3" },
    { q: "faq.q4", a: "faq.a4" },
  ]

  return (
    <section 
      id="faq" 
      className="relative py-16 sm:py-24 lg:py-32 border-t border-border"
      aria-label="Section questions fréquentes"
      role="region"
    >
      <div ref={ref} className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Section Header */}
        <div className={cn(
          "mb-12 sm:mb-16 text-center transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 sm:px-4 py-1 sm:py-1.5">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-primary">
              {t("faq.tag")}
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t("faq.title")}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={faq.q}
                className={cn(
                  "rounded-lg border transition-all duration-500",
                  isOpen ? "border-primary/40 bg-card neon-glow" : "border-border bg-card/50 hover:border-primary/20",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    "font-heading text-sm sm:text-base font-semibold transition-colors",
                    isOpen ? "text-primary" : "text-foreground"
                  )}>
                    {t(faq.q)}
                  </span>
                  <Plus className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-45"
                  )} />
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {t(faq.a)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
