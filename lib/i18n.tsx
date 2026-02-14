"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "fr" | "en"

type Translations = {
  [key: string]: {
    fr: string
    en: string
  }
}

const translations: Translations = {
  // Navigation
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.services": { fr: "Services", en: "Services" },
  "nav.about": { fr: "A propos", en: "About" },
  "nav.contact": { fr: "Contact", en: "Contact" },
  "nav.cta": { fr: "Commencer", en: "Get Started" },

  // Hero
  "hero.tag": { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
  "hero.title1": { fr: "Transformez", en: "Transform" },
  "hero.title2": { fr: "vos donn\u00e9es", en: "your data" },
  "hero.title3": { fr: "en avantage", en: "into a" },
  "hero.title4": { fr: "comp\u00e9titif", en: "competitive edge" },
  "hero.subtitle": {
    fr: "LambdaX AI est un cabinet de conseil sp\u00e9cialis\u00e9 en Intelligence Artificielle qui aide les entreprises \u00e0 exploiter la puissance de l'IA pour acc\u00e9l\u00e9rer leur croissance et optimiser leurs op\u00e9rations.",
    en: "LambdaX AI is a consulting firm specialized in Artificial Intelligence, helping businesses harness the power of AI to accelerate growth and optimize operations."
  },
  "hero.cta1": { fr: "D\u00e9couvrir nos services", en: "Discover our services" },
  "hero.cta2": { fr: "Nous contacter", en: "Contact us" },
  "hero.scroll": { fr: "D\u00e9filez pour explorer", en: "Scroll to explore" },

  // Services
  "services.tag": { fr: "Nos Services", en: "Our Services" },
  "services.title": { fr: "Des solutions IA sur mesure", en: "Tailored AI solutions" },
  "services.subtitle": {
    fr: "Nous accompagnons les entreprises dans leur transformation digitale avec des solutions d'IA adapt\u00e9es \u00e0 leurs besoins sp\u00e9cifiques.",
    en: "We support businesses in their digital transformation with AI solutions tailored to their specific needs."
  },
  "services.data.title": { fr: "Audit Data & IA", en: "Data & AI Audit" },
  "services.data.desc": {
    fr: "Analyse compl\u00e8te de votre maturit\u00e9 data et identification des opportunit\u00e9s d'int\u00e9gration IA dans vos processus m\u00e9tier.",
    en: "Complete analysis of your data maturity and identification of AI integration opportunities in your business processes."
  },
  "services.strategy.title": { fr: "Strat\u00e9gie IA", en: "AI Strategy" },
  "services.strategy.desc": {
    fr: "D\u00e9finition d'une feuille de route IA align\u00e9e avec vos objectifs business et votre budget.",
    en: "Definition of an AI roadmap aligned with your business objectives and budget."
  },
  "services.decision.title": { fr: "Decision Intelligence", en: "Decision Intelligence" },
  "services.decision.desc": {
    fr: "Mise en place de syst\u00e8mes d'aide \u00e0 la d\u00e9cision bas\u00e9s sur l'IA pour optimiser vos performances.",
    en: "Implementation of AI-based decision support systems to optimize your performance."
  },
  "services.growth.title": { fr: "Croissance Op\u00e9rationnelle", en: "Operational Growth" },
  "services.growth.desc": {
    fr: "Automatisation intelligente et optimisation des processus pour une croissance durable et mesurable.",
    en: "Intelligent automation and process optimization for sustainable and measurable growth."
  },
  "services.learnmore": { fr: "En savoir plus", en: "Learn more" },

  // Features / Stats
  "features.tag": { fr: "Pourquoi Nous", en: "Why Us" },
  "features.title": { fr: "Des r\u00e9sultats mesurables", en: "Measurable results" },
  "features.subtitle": {
    fr: "Nos clients constatent des am\u00e9liorations significatives apr\u00e8s l'int\u00e9gration de nos solutions IA.",
    en: "Our clients see significant improvements after integrating our AI solutions."
  },
  "features.stat1.value": { fr: "97%", en: "97%" },
  "features.stat1.label": { fr: "Satisfaction Client", en: "Client Satisfaction" },
  "features.stat2.value": { fr: "+250", en: "+250" },
  "features.stat2.label": { fr: "Projets D\u00e9livr\u00e9s", en: "Projects Delivered" },
  "features.stat3.value": { fr: "40%", en: "40%" },
  "features.stat3.label": { fr: "Gain de Productivit\u00e9", en: "Productivity Gain" },
  "features.stat4.value": { fr: "3x", en: "3x" },
  "features.stat4.label": { fr: "ROI Moyen", en: "Average ROI" },
  "features.cap1": { fr: "Machine Learning & Deep Learning", en: "Machine Learning & Deep Learning" },
  "features.cap2": { fr: "Traitement du Langage Naturel (NLP)", en: "Natural Language Processing (NLP)" },
  "features.cap3": { fr: "Computer Vision & Reconnaissance", en: "Computer Vision & Recognition" },
  "features.cap4": { fr: "Automatisation des Processus (RPA)", en: "Process Automation (RPA)" },
  "features.cap5": { fr: "Analytics Pr\u00e9dictif & Prescriptif", en: "Predictive & Prescriptive Analytics" },
  "features.cap6": { fr: "IA G\u00e9n\u00e9rative & LLMs", en: "Generative AI & LLMs" },

  // FAQ
  "faq.tag": { fr: "FAQ", en: "FAQ" },
  "faq.title": { fr: "Questions fr\u00e9quentes", en: "Frequently asked questions" },
  "faq.q1": { fr: "Qu'est-ce que LambdaX AI peut faire pour mon entreprise ?", en: "What can LambdaX AI do for my business?" },
  "faq.a1": {
    fr: "Nous analysons vos processus m\u00e9tier, identifions les opportunit\u00e9s d'int\u00e9gration IA, et d\u00e9ployons des solutions sur mesure qui g\u00e9n\u00e8rent un ROI mesurable. De l'audit initial au d\u00e9ploiement, nous vous accompagnons \u00e0 chaque \u00e9tape.",
    en: "We analyze your business processes, identify AI integration opportunities, and deploy tailored solutions that generate measurable ROI. From initial audit to deployment, we support you every step of the way."
  },
  "faq.q2": { fr: "Combien de temps prend un projet IA typique ?", en: "How long does a typical AI project take?" },
  "faq.a2": {
    fr: "La dur\u00e9e d\u00e9pend de la complexit\u00e9 du projet. Un audit prend g\u00e9n\u00e9ralement 2 \u00e0 4 semaines, tandis qu'un projet complet de d\u00e9ploiement IA peut s'\u00e9tendre de 3 \u00e0 6 mois. Nous privil\u00e9gions une approche agile avec des livrables r\u00e9guliers.",
    en: "Duration depends on project complexity. An audit typically takes 2 to 4 weeks, while a complete AI deployment project can span 3 to 6 months. We favor an agile approach with regular deliverables."
  },
  "faq.q3": { fr: "Faut-il des donn\u00e9es existantes pour d\u00e9marrer ?", en: "Do I need existing data to get started?" },
  "faq.a3": {
    fr: "Pas n\u00e9cessairement. Si vous disposez d\u00e9j\u00e0 de donn\u00e9es, nous les valorisons. Sinon, nous vous aidons \u00e0 mettre en place une strat\u00e9gie de collecte et de structuration des donn\u00e9es adapt\u00e9e \u00e0 vos objectifs.",
    en: "Not necessarily. If you already have data, we leverage it. Otherwise, we help you set up a data collection and structuring strategy tailored to your objectives."
  },
  "faq.q4": { fr: "Comment garantissez-vous la s\u00e9curit\u00e9 des donn\u00e9es ?", en: "How do you ensure data security?" },
  "faq.a4": {
    fr: "La s\u00e9curit\u00e9 est au c\u0153ur de notre approche. Nous appliquons les normes RGPD, utilisons le chiffrement bout en bout, et pouvons d\u00e9ployer des solutions on-premise si n\u00e9cessaire pour garantir la confidentialit\u00e9 de vos donn\u00e9es.",
    en: "Security is at the core of our approach. We apply GDPR standards, use end-to-end encryption, and can deploy on-premise solutions if necessary to ensure your data confidentiality."
  },

  // CTA
  "cta.title": { fr: "Pr\u00eat \u00e0 transformer votre entreprise ?", en: "Ready to transform your business?" },
  "cta.subtitle": {
    fr: "Contactez-nous d\u00e8s aujourd'hui pour d\u00e9couvrir comment l'IA peut r\u00e9volutionner vos op\u00e9rations et acc\u00e9l\u00e9rer votre croissance.",
    en: "Contact us today to discover how AI can revolutionize your operations and accelerate your growth."
  },
  "cta.btn1": { fr: "Planifier un appel", en: "Schedule a call" },
  "cta.btn2": { fr: "Voir nos services", en: "View our services" },
  "cta.email": { fr: "contact@lambdax.ai", en: "contact@lambdax.ai" },

  // Footer
  "footer.tagline": {
    fr: "Cabinet de conseil en Intelligence Artificielle. Nous transformons vos donn\u00e9es en avantage comp\u00e9titif.",
    en: "Artificial Intelligence consulting firm. We transform your data into a competitive advantage."
  },
  "footer.navigation": { fr: "Navigation", en: "Navigation" },
  "footer.services": { fr: "Services", en: "Services" },
  "footer.contact": { fr: "Contact", en: "Contact" },
  "footer.rights": { fr: "Tous droits r\u00e9serv\u00e9s.", en: "All rights reserved." },
  "footer.privacy": { fr: "Politique de confidentialit\u00e9", en: "Privacy Policy" },
  "footer.terms": { fr: "Conditions d'utilisation", en: "Terms of Use" },

  // About page
  "about.tag": { fr: "A propos", en: "About Us" },
  "about.title": { fr: "Qui sommes-nous ?", en: "Who are we?" },
  "about.subtitle": {
    fr: "LambdaX AI est n\u00e9 de la conviction que l'intelligence artificielle doit \u00eatre accessible, \u00e9thique et cr\u00e9atrice de valeur pour toutes les entreprises.",
    en: "LambdaX AI was born from the conviction that artificial intelligence should be accessible, ethical, and value-creating for all businesses."
  },
  "about.mission.title": { fr: "Notre Mission", en: "Our Mission" },
  "about.mission.desc": {
    fr: "D\u00e9mocratiser l'acc\u00e8s \u00e0 l'intelligence artificielle et permettre \u00e0 chaque entreprise, quelle que soit sa taille, de b\u00e9n\u00e9ficier de la puissance des donn\u00e9es et de l'IA pour prendre de meilleures d\u00e9cisions.",
    en: "Democratize access to artificial intelligence and enable every business, regardless of size, to benefit from the power of data and AI to make better decisions."
  },
  "about.vision.title": { fr: "Notre Vision", en: "Our Vision" },
  "about.vision.desc": {
    fr: "Devenir le partenaire IA de r\u00e9f\u00e9rence en Europe francophone, reconnu pour l'excellence de nos solutions, notre approche \u00e9thique et notre impact mesurable sur la performance de nos clients.",
    en: "Become the leading AI partner in French-speaking Europe, recognized for the excellence of our solutions, our ethical approach, and our measurable impact on our clients' performance."
  },
  "about.values.title": { fr: "Nos Valeurs", en: "Our Values" },
  "about.value1.title": { fr: "Innovation", en: "Innovation" },
  "about.value1.desc": { fr: "Toujours \u00e0 la pointe des derni\u00e8res avanc\u00e9es technologiques en IA.", en: "Always at the forefront of the latest AI technological advances." },
  "about.value2.title": { fr: "\u00c9thique", en: "Ethics" },
  "about.value2.desc": { fr: "IA responsable, transparente et respectueuse de la vie priv\u00e9e.", en: "Responsible, transparent AI that respects privacy." },
  "about.value3.title": { fr: "Excellence", en: "Excellence" },
  "about.value3.desc": { fr: "Engagement qualit\u00e9 et r\u00e9sultats mesurables pour chaque client.", en: "Quality commitment and measurable results for every client." },
  "about.value4.title": { fr: "Collaboration", en: "Collaboration" },
  "about.value4.desc": { fr: "Partenariat \u00e9troit avec nos clients pour un succ\u00e8s partag\u00e9.", en: "Close partnership with our clients for shared success." },
  "about.team.title": { fr: "Notre \u00c9quipe", en: "Our Team" },
  "about.team.desc": {
    fr: "Une \u00e9quipe pluridisciplinaire de data scientists, ing\u00e9nieurs ML, consultants strat\u00e9giques et designers UX, unis par la passion de l'IA.",
    en: "A multidisciplinary team of data scientists, ML engineers, strategic consultants, and UX designers, united by a passion for AI."
  },

  // Contact page
  "contact.tag": { fr: "Contact", en: "Contact" },
  "contact.title": { fr: "Parlons de votre projet", en: "Let's talk about your project" },
  "contact.subtitle": {
    fr: "Envoyez-nous un message et notre \u00e9quipe vous r\u00e9pondra dans les 24 heures.",
    en: "Send us a message and our team will respond within 24 hours."
  },
  "contact.name": { fr: "Nom complet", en: "Full name" },
  "contact.email": { fr: "Email professionnel", en: "Professional email" },
  "contact.company": { fr: "Entreprise", en: "Company" },
  "contact.subject": { fr: "Sujet", en: "Subject" },
  "contact.message": { fr: "Votre message", en: "Your message" },
  "contact.send": { fr: "Envoyer le message", en: "Send message" },
  "contact.info.title": { fr: "Informations de contact", en: "Contact Information" },
  "contact.info.email": { fr: "Email", en: "Email" },
  "contact.info.phone": { fr: "T\u00e9l\u00e9phone", en: "Phone" },
  "contact.info.address": { fr: "Adresse", en: "Address" },
  "contact.info.address.value": { fr: "Paris, France", en: "Paris, France" },

  // Services page
  "servicespage.title": { fr: "Nos Services", en: "Our Services" },
  "servicespage.subtitle": {
    fr: "Des solutions d'intelligence artificielle compl\u00e8tes pour chaque \u00e9tape de votre transformation digitale.",
    en: "Comprehensive artificial intelligence solutions for every stage of your digital transformation."
  },
  "servicespage.process.title": { fr: "Notre Processus", en: "Our Process" },
  "servicespage.step1.title": { fr: "D\u00e9couverte", en: "Discovery" },
  "servicespage.step1.desc": { fr: "Analyse approfondie de vos besoins, processus et donn\u00e9es existantes.", en: "In-depth analysis of your needs, processes, and existing data." },
  "servicespage.step2.title": { fr: "Strat\u00e9gie", en: "Strategy" },
  "servicespage.step2.desc": { fr: "D\u00e9finition d'une feuille de route IA adapt\u00e9e \u00e0 vos objectifs.", en: "Definition of an AI roadmap tailored to your objectives." },
  "servicespage.step3.title": { fr: "D\u00e9veloppement", en: "Development" },
  "servicespage.step3.desc": { fr: "Conception et d\u00e9veloppement de solutions IA sur mesure.", en: "Design and development of custom AI solutions." },
  "servicespage.step4.title": { fr: "D\u00e9ploiement", en: "Deployment" },
  "servicespage.step4.desc": { fr: "Mise en production, formation et accompagnement continu.", en: "Production deployment, training, and ongoing support." },

  // Testimonials
  "testimonials.tag": { fr: "T\u00e9moignages", en: "Testimonials" },
  "testimonials.title": { fr: "Ce que disent nos clients", en: "What our clients say" },
  "testimonials.subtitle": {
    fr: "D\u00e9couvrez les retours d'exp\u00e9rience de nos clients qui ont transform\u00e9 leur entreprise avec l'IA.",
    en: "Discover the experiences of our clients who have transformed their business with AI."
  },
  "testimonials.testimonial1.name": { fr: "Sophie Martin", en: "Sophie Martin" },
  "testimonials.testimonial1.role": { fr: "Directrice Digitale, TechCorp", en: "Digital Director, TechCorp" },
  "testimonials.testimonial1.text": {
    fr: "LambdaX AI a r\u00e9volutionn\u00e9 notre approche de la data. Leur expertise nous a permis d'augmenter notre efficacit\u00e9 op\u00e9rationnelle de 40% en seulement 6 mois.",
    en: "LambdaX AI revolutionized our approach to data. Their expertise enabled us to increase our operational efficiency by 40% in just 6 months."
  },
  "testimonials.testimonial2.name": { fr: "Pierre Dubois", en: "Pierre Dubois" },
  "testimonials.testimonial2.role": { fr: "CEO, InnovateLab", en: "CEO, InnovateLab" },
  "testimonials.testimonial2.text": {
    fr: "L'\u00e9quipe LambdaX a su comprendre nos besoins et d\u00e9velopper une solution sur mesure qui s'int\u00e8gre parfaitement dans notre workflow. Un partenariat exceptionnel.",
    en: "The LambdaX team understood our needs and developed a custom solution that integrates perfectly into our workflow. An exceptional partnership."
  },
  "testimonials.testimonial3.name": { fr: "Marie Leclerc", en: "Marie Leclerc" },
  "testimonials.testimonial3.role": { fr: "Directrice Innovation, FinanceGroup", en: "Innovation Director, FinanceGroup" },
  "testimonials.testimonial3.text": {
    fr: "Gr\u00e2ce \u00e0 LambdaX, nous avons pu automatiser 60% de nos processus de d\u00e9cision. Le ROI a \u00e9t\u00e9 visible d\u00e8s le premier trimestre.",
    en: "Thanks to LambdaX, we were able to automate 60% of our decision-making processes. The ROI was visible from the first quarter."
  },
  "testimonials.testimonial4.name": { fr: "Thomas Bernard", en: "Thomas Bernard" },
  "testimonials.testimonial4.role": { fr: "CTO, RetailMax", en: "CTO, RetailMax" },
  "testimonials.testimonial4.text": {
    fr: "Une expertise technique remarquable et une approche tr\u00e8s professionnelle. LambdaX a su transformer nos donn\u00e9es en v\u00e9ritable avantage comp\u00e9titif.",
    en: "Remarkable technical expertise and a very professional approach. LambdaX successfully transformed our data into a real competitive advantage."
  },
}

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr")

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key]
      if (!entry) return key
      return entry[locale]
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
