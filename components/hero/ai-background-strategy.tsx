"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AIBackgroundStrategy() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Gradient radial principal */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Formes hexagonales statiques */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
          <defs>
            <radialGradient id="hexGradient1" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hexGradient2" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hexGradient3" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Hexagones statiques */}
          <polygon
            points="300,200 400,200 450,250 400,300 300,300 250,250"
            fill="url(#hexGradient1)"
            opacity="0.6"
          />
          <polygon
            points="800,300 900,300 950,350 900,400 800,400 750,350"
            fill="url(#hexGradient2)"
            opacity="0.5"
          />
          <polygon
            points="550,500 650,500 700,550 650,600 550,600 500,550"
            fill="url(#hexGradient3)"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Cercles flous pour effet de lumière */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/12 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-3xl" />
      </div>

      {/* Lignes de lumière subtiles */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="strategyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <line x1="0" y1="25%" x2="100%" y2="35%" stroke="url(#strategyGradient1)" strokeWidth="1.5" />
          <line x1="0" y1="65%" x2="100%" y2="75%" stroke="url(#strategyGradient1)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Overlay gradient pour profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </>
  )
}
