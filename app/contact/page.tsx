"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Mail, Phone, MapPin, Send, ArrowUpRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const { t } = useI18n()
  const { ref: formRef, isVisible: formVisible } = useAnimateOnScroll(0.05)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactInfo = [
    { icon: Mail, label: t("contact.info.email"), value: "contact@lambdax.ai", href: "mailto:contact@lambdax.ai" },
    { icon: Phone, label: t("contact.info.phone"), value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
    { icon: MapPin, label: t("contact.info.address"), value: t("contact.info.address.value"), href: "#" },
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
                {t("contact.tag")}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-foreground md:text-5xl lg:text-6xl animate-fade-in-up text-balance" style={{ animationDelay: "0.1s" }}>
              {t("contact.title")}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up text-pretty" style={{ animationDelay: "0.2s" }}>
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-border">
        <div ref={formRef} className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className={cn(
              "lg:col-span-3 transition-all duration-700",
              formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10">
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="jean@entreprise.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.company")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="Mon Entreprise SAS"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="Audit IA"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4 sm:mt-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 resize-none"
                    placeholder="Bonjour, je souhaite en savoir plus sur..."
                  />
                </div>

                {/* Submit */}
                <div className="mt-6 sm:mt-8">
                  {submitted ? (
                    <div className="flex items-center gap-2 rounded-md bg-primary/10 border border-primary/30 px-6 py-3.5 text-sm font-medium text-primary">
                      <CheckCircle className="h-4 w-4" />
                      {t("contact.name") === "Nom complet" ? "Message envoy\u00e9 avec succ\u00e8s !" : "Message sent successfully!"}
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110"
                    >
                      {t("contact.send")}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className={cn(
              "lg:col-span-2 transition-all duration-700 delay-200",
              formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10 mb-4 sm:mb-6">
                <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
                  {t("contact.info.title")}
                </h2>

                <div className="flex flex-col gap-6">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="group flex items-start gap-4 transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all group-hover:bg-primary/10 group-hover:border-primary/40">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">{value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
                  {"Social"}
                </h3>
                <div className="flex flex-col gap-3">
                  {["LinkedIn", "Twitter / X", "GitHub"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="group flex items-center justify-between rounded-md border border-border px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                    >
                      {social}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
