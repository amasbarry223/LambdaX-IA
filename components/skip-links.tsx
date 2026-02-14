"use client"

import Link from "next/link"

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:left-4 focus-within:top-4 focus-within:z-[100]">
      <Link
        href="#main-content"
        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        Aller au contenu principal
      </Link>
      <Link
        href="#navigation"
        className="ml-2 inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        Aller à la navigation
      </Link>
    </div>
  )
}

