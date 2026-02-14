"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import { Menu, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { t, locale, setLocale } = useI18n()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ]

  const toggleLocale = () => {
    setLocale(locale === "fr" ? "en" : "fr")
  }

  return (
    <nav id="navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-heading text-sm font-black text-primary-foreground">{"\u03BB"}</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            Lambda<span className="text-primary">X</span> AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300 hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
            aria-label={locale === "fr" ? "Switch to English" : "Passer en Fran\u00e7ais"}
          >
            <Globe className="h-3.5 w-3.5" />
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <Link
            href="/contact"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:neon-glow hover:brightness-110"
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-4 py-3 text-sm font-medium transition-colors duration-300",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-border pt-4">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "fr" ? "English" : "Fran\u00e7ais"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-md bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                {t("nav.cta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
