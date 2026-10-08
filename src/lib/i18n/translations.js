/**
 * Dictionnaire bilingue haute fidélité (Anglais / Français canadien CA-FR).
 * Vocabulaire élégant, professionnel et adapté au milieu créatif québécois/canadien.
 * AUCUN recours à des outils de traduction automatique tierces (pas de Google Translate / gtranslate).
 */

export const translations = {
  en: {
    meta: {
      siteTitle: 'Carlos Ozuna | Senior Graphic Designer & Web Developer',
      siteDescription: 'Senior Graphic Designer and Web Developer based in Montreal, Canada. Specializing in premium digital experiences, brand identity, and scalable design systems.',
      workTitle: 'Work | Carlos Ozuna',
      workDescription: 'A curated portfolio of graphic design, branding, and web development projects.',
      aboutTitle: 'About Me – Carlos Ozuna | Senior Graphic Designer & Web Developer',
      aboutDescription: 'Senior graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms.',
      notFoundTitle: 'Page Not Found | Carlos Ozuna'
    },
    nav: {
      work: 'Work',
      about: 'About',
      switchToFr: 'FR',
      switchToEn: 'EN',
      ariaToggleLang: 'Switch language to French (Canada)',
      ariaToggleMenu: 'Toggle navigation menu'
    },
    home: {
      heroTitleLine1: 'Elevating Brands',
      heroTitleLine2: 'Through Design.',
      heroSubtitle: 'I’m a Senior Creative Graphic Designer and AI Web Developer specializing in premium digital experiences, strategic brand identities, and scalable design systems. I combine creative direction, advanced design, web development, and AI-driven technologies to build sophisticated, high-performing digital experiences and cohesive brand ecosystems.',
      btnPortfolio: 'View Portfolio',
      btnAbout: 'About Me',
      selectedWorks: 'Selected Works'
    },
    work: {
      heroTitle: 'Portfolio',
      heroSubtitle: 'A curated gallery of my latest graphic design, branding, and web development projects.',
      allProjects: 'All Projects',
      graphicDesign: 'Graphic Design',
      webDesign: 'Web Design',
      noProjects: 'No projects found.',
      goToWebsite: 'GO TO WEBSITE',
      relatedDesigns: 'Related Designs',
      interactiveCatalog: 'Interactive Catalog / Booklet',
      viewingDoc: (current, total) => `Viewing document ${current} of ${total}`,
      viewFullPub: 'View full publication or expand to full screen below.',
      expand: 'Expand 🔍',
      openInNewTab: 'Open in new tab ↗',
      fullScreen: 'Full Screen ⛶',
      exitFullScreen: 'Exit Full Screen ✕',
      close: 'Close',
      prev: 'Previous',
      next: 'Next'
    },
    about: {
      heroTitle: 'About',
      heroSubtitle: 'A little bit about who I am and what I do.',
      watermark: 'about',
      headline: "Let’s Create Something Great Together",
      intro: "Hi there! I’m a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people.",
      whatIBringTitle: "What I Bring:",
      skills: [
        "Mastery of Adobe tools (Photoshop, InDesign, Illustrator, WordPress and CSS3) to create polished, versatile work.",
        "A deep understanding of print and digital design—from magazines and promotional materials to social campaigns and email marketing.",
        "A humble, team-first mindset: I listen closely, adapt quickly, and believe feedback makes every project stronger.",
        "Fluent communication in English, French, and Spanish, which helps me collaborate smoothly across cultures."
      ],
      approachTitle: "My Approach:",
      approachText: "Over the years, I’ve learned that great design starts with empathy. I ask questions, respect deadlines, and keep things simple and purposeful. Whether it’s a logo, a brochure, or a digital ad, my goal is to deliver work that feels both meaningful and effortless.",
      closingText: "If you’re looking for a professional graphic designer who loves design (and is excited by well-chosen typography or an engaging layout!), let’s talk. I’m open to full-time, freelance, or contract positions where I can contribute, learn, and grow with a caring team.",
      thanksText: "Thanks for your time—I’d be honoured to help bring your company to the next level.",
      contactTitle: "Contact Carlos Ozuna",
      downloadCv: "Download my CV.",
      seeWork: "See Carlos Ozuna's work",
      contactMe: "contact me",
      emblemText: "PORTFOLIO OF CARLOS OZUNA • PORTFOLIO OF CARLOS OZUNA • "
    },
    footer: {
      rights: `© ${new Date().getFullYear()} Carlos Ozuna. All rights reserved. Montreal, Canada.`,
      basedIn: 'Based in Montreal, Canada'
    }
  },

  fr: {
    meta: {
      siteTitle: 'Carlos Ozuna | Designer graphique sénior et développeur Web',
      siteDescription: 'Designer graphique sénior et développeur Web établi à Montréal, Canada. Spécialisé en expériences numériques haut de gamme, identité de marque et systèmes de design évolutifs.',
      workTitle: 'Projets | Carlos Ozuna',
      workDescription: 'Une sélection soignée de réalisations en design graphique, image de marque et développement Web.',
      aboutTitle: 'À propos – Carlos Ozuna | Designer graphique sénior et développeur Web',
      aboutDescription: 'Designer graphique sénior cumulant plus de 20 ans d’expérience dans la création visuelle pour des marques, l’imprimé, les agences et les plateformes numériques.',
      notFoundTitle: 'Page non trouvée | Carlos Ozuna'
    },
    nav: {
      work: 'Projets',
      about: 'À propos',
      switchToFr: 'FR',
      switchToEn: 'EN',
      ariaToggleLang: 'Basculer vers la version anglaise',
      ariaToggleMenu: 'Ouvrir ou fermer le menu de navigation'
    },
    home: {
      heroTitleLine1: 'Valoriser les marques',
      heroTitleLine2: 'par le design.',
      heroSubtitle: 'Je suis un designer graphique sénior et développeur Web créatif spécialisé dans les expériences numériques haut de gamme, les identités de marque stratégiques et les systèmes de design évolutifs. J’allie direction artistique, design de pointe et technologies Web modernes pour concevoir des expériences numériques performantes et des écosystèmes de marque cohérents.',
      btnPortfolio: 'Voir le portfolio',
      btnAbout: 'À propos de moi',
      selectedWorks: 'Réalisations choisies'
    },
    work: {
      heroTitle: 'Portfolio',
      heroSubtitle: 'Une sélection de mes plus récents projets en design graphique, image de marque et conception Web.',
      allProjects: 'Tous les projets',
      graphicDesign: 'Design graphique',
      webDesign: 'Design Web',
      noProjects: 'Aucun projet trouvé.',
      goToWebsite: 'VISITER LE SITE WEB',
      relatedDesigns: 'Projets connexes',
      interactiveCatalog: 'Catalogue interactif / Brochure',
      viewingDoc: (current, total) => `Affichage du document ${current} sur ${total}`,
      viewFullPub: 'Consultez la publication complète ou agrandissez en plein écran ci-dessous.',
      expand: 'Agrandir 🔍',
      openInNewTab: 'Ouvrir dans un nouvel onglet ↗',
      fullScreen: 'Plein écran ⛶',
      exitFullScreen: 'Quitter le plein écran ✕',
      close: 'Fermer',
      prev: 'Précédent',
      next: 'Suivant'
    },
    about: {
      heroTitle: 'À propos',
      heroSubtitle: 'Un aperçu de mon parcours, de ma vision et de mon savoir-faire.',
      watermark: 'à propos',
      headline: "Créons ensemble quelque chose d'exceptionnel",
      intro: "Bonjour! Je suis un designer graphique cumulant plus de 20 ans d'expérience dans la création visuelle pour les marques, l'imprimé, les agences et les plateformes numériques. J'accorde une grande importance à la collaboration, et ma plus grande passion consiste à transformer des idées en designs qui créent une véritable connexion humaine.",
      whatIBringTitle: "Ce que j'apporte :",
      skills: [
        "Maîtrise approfondie des outils Adobe (Photoshop, InDesign, Illustrator, WordPress et CSS3) pour concevoir des réalisations polyvalentes et impeccables.",
        "Une fine compréhension du design imprimé et numérique — des magazines et documents promotionnels aux campagnes sur les réseaux sociaux et marketing par courriel.",
        "Un esprit d'équipe bienveillant et axé sur l'écoute : je m'adapte rapidement et je crois fermement que la rétroaction enrichit chaque projet.",
        "Communication fluide en français, anglais et espagnol, facilitant une collaboration harmonieuse au sein d'équipes pluriculturelles."
      ],
      approachTitle: "Ma démarche :",
      approachText: "Au fil des années, j'ai appris que l'excellence en design commence par l'empathie. Je pose les bonnes questions, respecte rigoureusement les échéanciers et privilégie la simplicité ainsi que la pertinence. Qu'il s'agisse d'un logo, d'une brochure ou d'une campagne numérique, mon objectif est d'offrir un travail à la fois porteur de sens et naturel.",
      closingText: "Si vous recherchez un designer graphique passionné (qui s'enthousiasme pour une typographie bien choisie ou une mise en page soignée!), discutons ensemble. Je suis ouvert aux mandats à temps plein, à la pige ou sous contrat où je pourrai contribuer, apprendre et évoluer aux côtés d'une équipe engagée.",
      thanksText: "Merci pour votre temps — ce serait un privilège d'aider votre entreprise à franchir un nouveau cap.",
      contactTitle: "Contacter Carlos Ozuna",
      downloadCv: "Télécharger mon CV (PDF).",
      seeWork: "Voir les réalisations de Carlos Ozuna",
      contactMe: "m'écrire par courriel",
      emblemText: "PORTFOLIO DE CARLOS OZUNA • MONTRÉAL CANADA • "
    },
    footer: {
      rights: `© ${new Date().getFullYear()} Carlos Ozuna. Tous droits réservés. Montréal, Canada.`,
      basedIn: 'Établi à Montréal, Québec, Canada'
    }
  }
};

/**
 * Descriptions et catégories traduites pour les projets spécifiques
 */
export const projectTranslations = {
  fr: {
    'AJS Mechanical': {
      category: 'Design Web',
      description: "AJ Sanchez, Inc. propose des services d'installation, d'entretien et de remplacement en chauffage, ventilation, climatisation, centrales de traitement d'air, tours de refroidissement, machines à glace, thermopompes, chauffe-eau, chaudières et systèmes de réfrigération spécialisés pour la restauration et les entreprises."
    },
    'Eletto Sport': {
      category: 'Design graphique',
      description: "Catalogue officiel et conception de supports imprimés pour la marque canadienne de soccer et vêtements de sport Eletto Sport."
    },
    'Over All HVAC NJ': {
      category: 'Design Web',
      description: "Conception et développement du site Web pour Over All HVAC, spécialiste des solutions CVC résidentielles et commerciales au New Jersey."
    },
    'PostCards': {
      category: 'Design graphique',
      description: "Série de cartes postales promotionnelles et supports d'envoi direct conçus avec une typographie percutante et une mise en page soignée."
    },
    'Promotional Flyers': {
      category: 'Design graphique',
      description: "Dépliants et circulaires publicitaires haut de gamme créés pour stimuler l'engagement client et la notoriété commerciale."
    },
    'Refried Beans': {
      category: 'Design graphique',
      description: "Création d'emballage et identité visuelle pour les produits alimentaires Refried Beans."
    },
    'Reseind': {
      category: 'Design graphique',
      description: "Identité visuelle de marque, typographie et déclinaisons promotionnelles complètes pour Reseind."
    },
    'Roberto Clemente Foundation Booklet': {
      category: 'Design graphique',
      description: "Roberto Enrique Clemente Walker figure parmi les plus grands athlètes et philanthropes du XXe siècle. Pour le peuple de Porto Rico, il incarne un symbole absolu de fierté nationale, non seulement pour ses exploits sportifs, mais aussi pour les vies touchées par son dévouement humanitaire."
    },
    'Roberto Clemente Invitations': {
      category: 'Design graphique',
      description: "Conception exclusive des cartons d'invitation officiels et de la papeterie d'honneur pour la Fondation Roberto Clemente."
    },
    'Tu Voz Amiga': {
      category: 'Design graphique',
      description: "Tu Voz Amiga Multiservices, Inc. est un cabinet spécialisé dans la préparation fiscale pour particuliers, couples et propriétaires de petites entreprises. Notre mission est de simplifier la période des impôts grâce à une rigueur exemplaire et un accompagnement virtuel personnalisé."
    },
    'Business Cards': {
      category: 'Design graphique',
      description: "Une collection soignée de cartes d'affaires sur mesure conçues pour des clients corporatifs, des entreprises en démarrage, des courtiers immobiliers, des salons de beauté, des restaurants et des professionnels de la santé à Montréal et New York."
    },
    'Turpone Foods Website': {
      category: 'Design Web',
      description: "Notre initiative a débuté avec notre marque maison TURPONE, vouée à la distribution d'aliments fins auprès de détaillants spécialisés et de restaurants réputés. Notre mission est de proposer des produits d'épicerie fine d'une qualité exceptionnelle qui se démarquent sur le marché canadien."
    },
    'Product Catalog': {
      category: 'Design graphique',
      description: "Catalogue de produits corporatif complet, mise en page éditoriale et fiches techniques détaillées pour l'industrie."
    },
    'Degan Tax': {
      category: 'Design graphique',
      description: "Deegan Tax Service est un cabinet complet de comptabilité, tenue de livres et fiscalité, offrant une gamme intégrée de services professionnels et de conseils financiers aux particuliers et aux PME."
    }
  }
};
