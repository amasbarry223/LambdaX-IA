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
  "nav.projects": { fr: "Projets", en: "Projects" },
  "nav.about": { fr: "A propos", en: "About" },
  "nav.contact": { fr: "Contact", en: "Contact" },
  "nav.cta": { fr: "Commencer", en: "Get Started" },

  // Hero
  "hero.tag": { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
  "hero.title1": { fr: "Vos donn\u00e9es ont", en: "Your data has" },
  "hero.title2": { fr: "une voix", en: "a voice" },
  "hero.title3": { fr: "Nous la", en: "We" },
  "hero.title4": { fr: "r\u00e9v\u00e9lons", en: "reveal it" },
  "hero.subtitle": {
    fr: "LambdaX AI est un partenaire strat\u00e9gique en intelligence d\u00e9cisionnelle. Nous transformons vos donn\u00e9es en intelligence et l'intelligence en d\u00e9cisions strat\u00e9giques. Nous d\u00e9veloppons des plateformes web et mobiles, des syst\u00e8mes intelligents bas\u00e9s sur le machine learning, et des solutions d'automatisation pour cr\u00e9er un avantage concurrentiel durable.",
    en: "LambdaX AI is a strategic partner in decision intelligence. We transform your data into intelligence and intelligence into strategic decisions. We develop web and mobile platforms, intelligent systems based on machine learning, and automation solutions to create a sustainable competitive advantage."
  },
  "hero.cta1": { fr: "D\u00e9couvrir nos services", en: "Discover our services" },
  "hero.cta2": { fr: "Nous contacter", en: "Contact us" },
  "hero.scroll": { fr: "D\u00e9filez pour explorer", en: "Scroll to explore" },

  // Services
  "services.tag": { fr: "Nos Services", en: "Our Services" },
  "services.title": { fr: "Des solutions IA sur mesure", en: "Tailored AI solutions" },
  "services.subtitle": {
    fr: "Nous aidons nos partenaires \u00e0 structurer leurs donn\u00e9es, nettoyer et qualifier leurs bases, cr\u00e9er des pipelines data robustes, d\u00e9velopper des mod\u00e8les pr\u00e9dictifs, automatiser les d\u00e9cisions r\u00e9p\u00e9titives et am\u00e9liorer leurs performances op\u00e9rationnelles.",
    en: "We help our partners structure their data, clean and qualify their databases, create robust data pipelines, develop predictive models, automate repetitive decisions, and improve their operational performance."
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
    fr: "Partenaire strat\u00e9gique en intelligence d\u00e9cisionnelle. Vos donn\u00e9es ont une voix. Nous la r\u00e9v\u00e9lons.",
    en: "Strategic partner in decision intelligence. Your data has a voice. We reveal it."
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
    fr: "LambdaX AI est une entreprise technologique sp\u00e9cialis\u00e9e dans le d\u00e9veloppement de solutions d'intelligence artificielle bas\u00e9es sur les donn\u00e9es des entreprises. Nous croyons que chaque entreprise poss\u00e8de un capital cach\u00e9 : ses donn\u00e9es.",
    en: "LambdaX AI is a technology company specialized in developing artificial intelligence solutions based on business data. We believe that every company has a hidden asset: its data."
  },
  "about.mission.title": { fr: "Notre Mission", en: "Our Mission" },
  "about.mission.desc": {
    fr: "Transformer les donn\u00e9es en intelligence. Transformer l'intelligence en d\u00e9cisions strat\u00e9giques. Nous accompagnons les entreprises dans leur transformation digitale en d\u00e9veloppant des plateformes web et mobiles sur mesure, des syst\u00e8mes intelligents bas\u00e9s sur le machine learning, des solutions d'automatisation des processus m\u00e9tiers, et des outils d'analyse pr\u00e9dictive.",
    en: "Transform data into intelligence. Transform intelligence into strategic decisions. We support businesses in their digital transformation by developing custom web and mobile platforms, intelligent systems based on machine learning, business process automation solutions, and predictive analytics tools."
  },
  "about.vision.title": { fr: "Notre Vision", en: "Our Vision" },
  "about.vision.desc": {
    fr: "Construire de l'intelligence \u00e0 partir des donn\u00e9es r\u00e9elles des organisations, afin de cr\u00e9er un avantage concurrentiel durable. Nous faisons parler les donn\u00e9es pour optimiser les ventes, r\u00e9duire les co\u00fbts, pr\u00e9voir la demande, d\u00e9tecter les fraudes, automatiser les workflows et am\u00e9liorer l'exp\u00e9rience client.",
    en: "Build intelligence from organizations' real data to create a sustainable competitive advantage. We make data speak to optimize sales, reduce costs, forecast demand, detect fraud, automate workflows, and improve customer experience."
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

  // Projects
  "projects.tag": { fr: "Nos Projets", en: "Our Projects" },
  "projects.title": { fr: "Projets R\u00e9alis\u00e9s", en: "Completed Projects" },
  "projects.subtitle": {
    fr: "D\u00e9couvrez nos r\u00e9alisations et les solutions IA que nous avons d\u00e9velopp\u00e9es pour nos clients.",
    en: "Discover our achievements and the AI solutions we have developed for our clients."
  },
  "projects.tech": { fr: "Technologies", en: "Technologies" },
  "projects.results": { fr: "R\u00e9sultats", en: "Results" },
  "projects.learnmore": { fr: "En savoir plus", en: "Learn more" },
  "projects.portfolio.title": { fr: "Portfolio", en: "Portfolio" },
  "projects.portfolio.subtitle": {
    fr: "Une s\u00e9lection de nos projets les plus marquants dans diff\u00e9rents secteurs d'activit\u00e9.",
    en: "A selection of our most significant projects across different business sectors."
  },
  "projects.cta.title": { fr: "Un projet en t\u00eate ?", en: "Have a project in mind?" },
  "projects.cta.subtitle": {
    fr: "Discutons de votre projet et d\u00e9couvrons comment l'IA peut transformer votre entreprise.",
    en: "Let's discuss your project and discover how AI can transform your business."
  },
  "projects.cta.button": { fr: "D\u00e9marrer un projet", en: "Start a project" },
  "projects.stats.projects": { fr: "150+", en: "150+" },
  "projects.stats.projects.label": { fr: "Projets Livr\u00e9s", en: "Projects Delivered" },
  "projects.stats.success": { fr: "98%", en: "98%" },
  "projects.stats.success.label": { fr: "Taux de R\u00e9ussite", en: "Success Rate" },
  "projects.stats.efficiency": { fr: "45%", en: "45%" },
  "projects.stats.efficiency.label": { fr: "Gain d'Efficacit\u00e9 Moyen", en: "Average Efficiency Gain" },
  "projects.project1.title": { fr: "Syst\u00e8me de Pr\u00e9diction des Ventes", en: "Sales Prediction System" },
  "projects.project1.desc": {
    fr: "D\u00e9veloppement d'un mod\u00e8le de machine learning pour pr\u00e9dire les ventes avec une pr\u00e9cision de 94%, permettant une optimisation des stocks et une r\u00e9duction des co\u00fbts.",
    en: "Development of a machine learning model to predict sales with 94% accuracy, enabling inventory optimization and cost reduction."
  },
  "projects.project1.category": { fr: "Machine Learning", en: "Machine Learning" },
  "projects.project1.tech": { fr: "Python, TensorFlow, Scikit-learn, PostgreSQL", en: "Python, TensorFlow, Scikit-learn, PostgreSQL" },
  "projects.project1.results": { fr: "94% de pr\u00e9cision, 30% de r\u00e9duction des stocks", en: "94% accuracy, 30% inventory reduction" },
  "projects.project2.title": { fr: "Plateforme d'Analyse de Donn\u00e9es", en: "Data Analytics Platform" },
  "projects.project2.desc": {
    fr: "Cr\u00e9ation d'une plateforme compl\u00e8te d'analyse de donn\u00e9es en temps r\u00e9el avec visualisations interactives et tableaux de bord personnalisables.",
    en: "Creation of a comprehensive real-time data analytics platform with interactive visualizations and customizable dashboards."
  },
  "projects.project2.category": { fr: "Data Analytics", en: "Data Analytics" },
  "projects.project2.tech": { fr: "React, Node.js, Apache Spark, MongoDB", en: "React, Node.js, Apache Spark, MongoDB" },
  "projects.project2.results": { fr: "Temps d'analyse r\u00e9duit de 80%, 500+ utilisateurs", en: "Analysis time reduced by 80%, 500+ users" },
  "projects.project3.title": { fr: "Assistant IA pour Service Client", en: "AI Customer Service Assistant" },
  "projects.project3.desc": {
    fr: "Impl\u00e9mentation d'un chatbot intelligent utilisant le NLP pour g\u00e9rer 70% des requ\u00eates clients automatiquement, am\u00e9liorant la satisfaction client de 35%.",
    en: "Implementation of an intelligent chatbot using NLP to handle 70% of customer requests automatically, improving customer satisfaction by 35%."
  },
  "projects.project3.category": { fr: "NLP & Chatbot", en: "NLP & Chatbot" },
  "projects.project3.tech": { fr: "OpenAI GPT, Python, FastAPI, Redis", en: "OpenAI GPT, Python, FastAPI, Redis" },
  "projects.project3.results": { fr: "70% de requ\u00eates automatis\u00e9es, +35% de satisfaction", en: "70% automated requests, +35% satisfaction" },
  "projects.project4.title": { fr: "Optimisation de Cha\u00eene Logistique", en: "Supply Chain Optimization" },
  "projects.project4.desc": {
    fr: "D\u00e9veloppement d'un syst\u00e8me d'optimisation utilisant l'IA pour r\u00e9duire les co\u00fbtts logistiques de 25% et am\u00e9liorer les d\u00e9lais de livraison.",
    en: "Development of an optimization system using AI to reduce logistics costs by 25% and improve delivery times."
  },
  "projects.project4.category": { fr: "Optimisation", en: "Optimization" },
  "projects.project4.tech": { fr: "Python, Gurobi, Apache Kafka, Docker", en: "Python, Gurobi, Apache Kafka, Docker" },
  "projects.project4.results": { fr: "25% de r\u00e9duction des co\u00fbtts, d\u00e9lais -40%", en: "25% cost reduction, 40% faster delivery" },
  "projects.project5.title": { fr: "D\u00e9tection de Fraude en Temps R\u00e9el", en: "Real-time Fraud Detection" },
  "projects.project5.desc": {
    fr: "Syst\u00e8me de d\u00e9tection de fraude bas\u00e9 sur le deep learning pour identifier les transactions suspectes avec une pr\u00e9cision de 99.2%.",
    en: "Deep learning-based fraud detection system to identify suspicious transactions with 99.2% accuracy."
  },
  "projects.project5.category": { fr: "S\u00e9curit\u00e9", en: "Security" },
  "projects.project5.tech": { fr: "TensorFlow, Python, Apache Flink, Elasticsearch", en: "TensorFlow, Python, Apache Flink, Elasticsearch" },
  "projects.project5.results": { fr: "99.2% de pr\u00e9cision, 0.01% de faux positifs", en: "99.2% accuracy, 0.01% false positives" },
  "projects.project6.title": { fr: "Reconnaissance Vocale Multilingue", en: "Multilingual Speech Recognition" },
  "projects.project6.desc": {
    fr: "D\u00e9veloppement d'un syst\u00e8me de reconnaissance vocale supportant 12 langues avec une pr\u00e9cision de 96% pour l'automatisation des centres d'appels.",
    en: "Development of a speech recognition system supporting 12 languages with 96% accuracy for call center automation."
  },
  "projects.project6.category": { fr: "Speech Recognition", en: "Speech Recognition" },
  "projects.project6.tech": { fr: "PyTorch, Whisper, WebRTC, Kubernetes", en: "PyTorch, Whisper, WebRTC, Kubernetes" },
  "projects.project6.results": { fr: "96% de pr\u00e9cision, 12 langues support\u00e9es", en: "96% accuracy, 12 languages supported" },
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
