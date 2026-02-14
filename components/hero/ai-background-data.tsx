"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AIBackgroundData() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Gradient radial principal */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.2) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Cercles flous statiques */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-3xl" />
      </div>

      {/* Lignes géométriques simples */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dataGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="dataGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line x1="0" y1="20%" x2="100%" y2="30%" stroke="url(#dataGradient1)" strokeWidth="1" />
          <line x1="0" y1="60%" x2="100%" y2="70%" stroke="url(#dataGradient2)" strokeWidth="1" />
          <line x1="20%" y1="0" x2="30%" y2="100%" stroke="url(#dataGradient1)" strokeWidth="1" />
          <line x1="70%" y1="0" x2="80%" y2="100%" stroke="url(#dataGradient2)" strokeWidth="1" />
        </svg>
      </div>

      {/* Overlay gradient pour profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </>
  )
}
