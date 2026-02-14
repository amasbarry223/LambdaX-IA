# 🎬 Animations GSAP & Scroll - LambdaX AI

## 📋 Vue d'ensemble

Ce document décrit les animations GSAP et les effets de scroll implémentés dans le projet LambdaX AI.

---

## 🚀 Technologies Utilisées

- **GSAP 3.14.2** : Bibliothèque d'animation JavaScript haute performance
- **ScrollTrigger** : Plugin GSAP pour les animations basées sur le scroll
- **Framer Motion** : Animations React (conservées pour compatibilité)

---

## 📦 Fichiers Créés

### 1. Hook Personnalisé GSAP
**Fichier** : `hooks/use-gsap-scroll.ts`

Hook réutilisable pour créer des animations GSAP basées sur le scroll avec ScrollTrigger.

**Fonctionnalités** :
- Configuration flexible des triggers
- Support des callbacks (onEnter, onLeave, etc.)
- Nettoyage automatique des animations
- Option `once` pour animations uniques

**Exemple d'utilisation** :
```typescript
const { ref } = useGSAPScroll({
  start: "top 80%",
  end: "bottom 20%",
  scrub: true,
  onEnter: () => console.log("Element entered viewport")
})
```

---

## 🎨 Sections avec Animations GSAP

### 1. Section Hero (`components/sections/hero-section.tsx`)

#### Animations Implémentées :

**a) Cercles Rotatifs (GSAP)**
- Remplacement des animations CSS par GSAP pour plus de fluidité
- 3 cercles concentriques avec rotations continues
- Durées différentes (20s, 15s, 25s) pour effet dynamique
- Rotation inverse pour le cercle du milieu

**b) Parallaxe sur l'Élément Visuel**
- L'élément visuel (cercles + symbole λ) se déplace vers le haut au scroll
- Effet parallaxe avec `scrub: 1` pour fluidité
- Déplacement de -30px au scroll complet

**c) Éléments Décoratifs**
- Points lumineux avec animation parallaxe
- Opacité variable selon la position de scroll
- Déplacement vertical différentiel selon l'index

**Code clé** :
```typescript
// Rotation des cercles
gsap.to(ring, {
  rotation: 360 * direction,
  duration: duration,
  repeat: -1,
  ease: "none",
})

// Parallaxe
gsap.to(visualElementRef.current, {
  y: -30,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
})
```

---

### 2. Section Témoignages (`components/sections/testimonials-section.tsx`)

#### Animations Implémentées :

**a) Animation du Header**
- Fade in + slide up depuis le bas
- Déclenchement à 80% de la viewport
- Durée : 1s avec easing `power3.out`

**b) Animation des Cartes (Stagger)**
- Chaque carte apparaît avec un délai progressif
- Effet : Fade in + slide up + scale
- Délai entre chaque carte : 150ms
- Animation déclenchée à 85% de la viewport

**c) Animations au Hover**
- Élévation de la carte (-10px)
- Légère mise à l'échelle (1.02)
- Transition fluide de 0.3s
- Utilisation de `power2.out` pour un effet naturel

**d) Parallaxe sur Éléments Décoratifs**
- Points lumineux avec mouvement parallaxe
- Déplacement vertical différentiel selon l'index
- Effet `scrub: 1` pour fluidité

**Code clé** :
```typescript
// Animation stagger des cartes
cardsRef.current.forEach((card, index) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 80, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: index * 0.15,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  )
})

// Hover effect
gsap.to(card, {
  y: -10,
  scale: 1.02,
  duration: 0.3,
  ease: "power2.out",
})
```

---

## 🎯 Types d'Animations GSAP Utilisées

### 1. **Fade In + Slide**
```typescript
gsap.fromTo(element, 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 }
)
```

### 2. **Scale Animation**
```typescript
gsap.fromTo(element,
  { scale: 0.9 },
  { scale: 1, duration: 0.8 }
)
```

### 3. **Rotation Continue**
```typescript
gsap.to(element, {
  rotation: 360,
  duration: 20,
  repeat: -1,
  ease: "none"
})
```

### 4. **Parallaxe Scroll**
```typescript
gsap.to(element, {
  y: -30,
  scrollTrigger: {
    trigger: parent,
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
})
```

### 5. **Stagger Animation**
```typescript
elements.forEach((el, index) => {
  gsap.to(el, {
    opacity: 1,
    delay: index * 0.15
  })
})
```

---

## ⚙️ Configuration ScrollTrigger

### Points de Déclenchement (Start/End)

- **Hero Section** : `start: "top top"`, `end: "bottom top"`
- **Témoignages Header** : `start: "top 80%"`
- **Témoignages Cartes** : `start: "top 85%"`

### Options Communes

- **scrub** : `true` ou `1` pour animations liées au scroll
- **once** : `true` pour animations qui ne se répètent pas
- **toggleActions** : `"play none none none"` pour contrôle précis

---

## 🎨 Easing Functions Utilisées

- **power2.out** : Pour les hover effects (naturel)
- **power3.out** : Pour les entrées de section (fluide)
- **none** : Pour les rotations continues (linéaire)

---

## ♿ Accessibilité

Toutes les animations GSAP respectent `prefers-reduced-motion` :

```typescript
useEffect(() => {
  if (prefersReducedMotion) return
  // Animations GSAP
}, [prefersReducedMotion])
```

---

## 📊 Performance

### Optimisations Appliquées :

1. **GPU Acceleration** : Utilisation de `transform` et `opacity`
2. **Context API** : Utilisation de `gsap.context()` pour nettoyage automatique
3. **ScrollTrigger Refresh** : Automatique lors du resize
4. **Lazy Loading** : Animations uniquement côté client

### Bonnes Pratiques :

- ✅ Nettoyage des animations avec `ctx.revert()`
- ✅ Vérification de `typeof window !== "undefined"`
- ✅ Utilisation de refs pour éviter les re-renders
- ✅ Désactivation sur mobile si nécessaire

---

## 🔧 Intégration dans le Projet

### Page Principale (`app/page.tsx`)

```typescript
<HeroSection />          // Animations GSAP + Framer Motion
<ServicesSection />     // Animations existantes
<FeaturesSection />     // Animations existantes
<TestimonialsSection /> // ✨ Nouvelles animations GSAP
<FAQSection />
<CTASection />
```

---

## 📝 Traductions Ajoutées

Nouvelles clés de traduction dans `lib/i18n.tsx` :

- `testimonials.tag`
- `testimonials.title`
- `testimonials.subtitle`
- `testimonials.testimonial[1-4].name`
- `testimonials.testimonial[1-4].role`
- `testimonials.testimonial[1-4].text`

---

## 🚀 Prochaines Améliorations Possibles

1. **Scroll Progress Indicator** avec GSAP
2. **Text Reveal Animations** (split text)
3. **Magnetic Buttons** (effet magnétique au hover)
4. **Smooth Scroll** avec GSAP ScrollToPlugin
5. **Page Transitions** avec GSAP
6. **Cursor Follower** avec GSAP

---

## 📚 Ressources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Guide](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing](https://greensock.com/docs/v3/Eases)

---

**Créé le** : 2024  
**Dernière mise à jour** : 2024

