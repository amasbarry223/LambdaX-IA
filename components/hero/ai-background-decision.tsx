"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AIBackgroundDecision() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Gradient radial principal */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, rgba(239, 68, 68, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Formes géométriques angulaires statiques */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
          <defs>
            <radialGradient id="decisionGradient1" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(249, 115, 22)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="decisionGradient2" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="decisionGradient3" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgb(251, 146, 60)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="rgb(251, 146, 60)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Triangles et formes angulaires */}
          <polygon
            points="200,150 350,150 275,250"
            fill="url(#decisionGradient1)"
            opacity="0.6"
          />
          <polygon
            points="850,200 1000,200 925,300"
            fill="url(#decisionGradient2)"
            opacity="0.5"
          />
          <polygon
            points="500,550 650,550 575,650"
            fill="url(#decisionGradient3)"
            opacity="0.4"
          />
          
          {/* Formes rectangulaires inclinées */}
          <rect
            x="300"
            y="400"
            width="150"
            height="100"
            fill="url(#decisionGradient1)"
            opacity="0.3"
            transform="rotate(15 375 450)"
          />
          <rect
            x="750"
            y="450"
            width="120"
            height="80"
            fill="url(#decisionGradient2)"
            opacity="0.25"
            transform="rotate(-20 810 490)"
          />
        </svg>
      </div>

      {/* Cercles flous pour effet de profondeur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/12 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-400/8 rounded-full blur-3xl" />
      </div>

      {/* Lignes géométriques angulaires */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="decisionLineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="decisionLineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(251, 146, 60)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="40%" stroke="url(#decisionLineGradient1)" strokeWidth="1.5" />
          <line x1="0" y1="70%" x2="100%" y2="80%" stroke="url(#decisionLineGradient2)" strokeWidth="1.5" />
          <line x1="25%" y1="0" x2="35%" y2="100%" stroke="url(#decisionLineGradient1)" strokeWidth="1.5" />
          <line x1="75%" y1="0" x2="85%" y2="100%" stroke="url(#decisionLineGradient2)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Overlay gradient pour profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </>
  )
}
