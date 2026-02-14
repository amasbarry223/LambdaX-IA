"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="font-heading text-sm font-black text-primary-foreground">{"\u03BB"}</span>
              </div>
              <span className="font-heading text-lg font-bold text-foreground">
                Lambda<span className="text-primary">X</span> AI
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              {t("footer.navigation")}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/services", label: t("nav.services") },
                { href: "/about", label: t("nav.about") },
                { href: "/contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              {t("footer.services")}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                t("services.data.title"),
                t("services.strategy.title"),
                t("services.decision.title"),
                t("services.growth.title"),
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              {t("footer.contact")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-muted-foreground">contact@lambdax.ai</li>
              <li className="text-sm text-muted-foreground">+33 1 23 45 67 89</li>
              <li className="text-sm text-muted-foreground">Paris, France</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                >
                  {social}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()} LambdaX AI. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
