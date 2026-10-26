// Cloudflare Pages Advanced Edge Worker for ozuna.ca
// Handles all /api/* requests with Cloudflare D1 database and serves static assets

const DEFAULT_SETTINGS = {
  id: "global-settings",
  title: "Carlos Ozuna | Senior Graphic Designer & Web Developer",
  description: "Senior Graphic Designer & Web Developer located in Laval, CA. 20+ years of experience crafting high-impact visuals.",
  heroVideo: "/videos/hero-background.mp4",
  colors: {
    dominant60: "#020202",
    secondary30: "#111111",
    accent10: "#ff1d25"
  }
};

const DEFAULT_PAGES = [
  {
    id: "43e7db87-8bde-4e99-8e4f-afe5ae37da9a",
    slug: "home",
    title: "Carlos Ozuna | Senior Graphic Designer & Web Developer",
    metaDescription: "Welcome to Carlos Ozuna's portfolio. Web Design, Graphic Design, Printing, and Digital Signage.",
    sections: [
      {
        id: "hero",
        name: "Hero Section",
        tag: "WELCOME TO CARLOS OZUNA’S PORTFOLIO",
        title: "WELCOME TO CARLOS OZUNA'S PORTFOLIO",
        subtitle: "WEB | GRAPHIC DESIGN | PRINTING | DIGITAL SIGNAGE",
        cvUrl: "/downloads/CV.pdf",
        portfolioCta: "GO TO PORTFOLIO"
      },
      {
        id: "about-summary",
        name: "About Intro",
        heading: "Creative Precision & Strategic Visuals",
        paragraph: "With over 20 years in graphic and digital design, I craft brand identities, marketing campaigns, high-converting websites, and large-format vehicle graphics that speak boldly."
      }
    ]
  },
  {
    id: "da45643c-767c-4f9d-9d39-e2de18d462bf",
    slug: "about-me",
    title: "About Me — Carlos Ozuna | Senior Designer",
    metaDescription: "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms.",
    sections: [
      {
        id: "about-hero",
        name: "About Story",
        heading: "Let’s Create Something Great Together",
        paragraph: "Hi there! I’m a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people."
      }
    ]
  },
  {
    id: "work",
    slug: "work",
    title: "Work & Case Studies — Carlos Ozuna",
    metaDescription: "Explore the full portfolio of graphic design, e-commerce web design, branding, and advertising projects by Carlos Ozuna.",
    sections: [
      {
        id: "work-header",
        name: "Portfolio Showcase Header",
        title: "SELECTED PROJECTS",
        subtitle: "A curation of corporate identities, custom web platforms, print collateral, and advertising."
      }
    ]
  }
];

const DEFAULT_PORTFOLIO = [
  {
    "id": "work-1",
    "slug": "ajs-mechanical",
    "title": "AJS Mechanical",
    "category": "Web Design",
    "image": "/images/ajsmechanical-net.jpg",
    "description": "Responsive web platform, booking workflow, and complete visual brand identity for commercial mechanical contractors.",
    "client": "AJS Mechanical Services",
    "year": "2023",
    "link": "https://ozuna.ca/ajs-mechanical/",
    "order": 1,
    "featured": true,
    "gallery": [
      "/images/ajsmechanical-net.jpg",
      "/images/ajsmechanical-net-about.jpg",
      "/images/ajsmechanical-net-services.jpg",
      "/images/ajsmechanical-net-get-a-quote.jpg",
      "/images/ajsmechanical-net-contact.jpg"
    ]
  },
  {
    "id": "work-2",
    "slug": "business-cards",
    "title": "Business Cards",
    "category": "Graphic Design",
    "image": "/images/jacinta.jpg",
    "description": "Luxury foiled, embossed, and soft-touch corporate business card series engineered for boutique studios, corporate executives, and entrepreneurs.",
    "client": "Multiple Corporate Clients",
    "year": "2023",
    "link": "https://ozuna.ca/business-cards/",
    "order": 2,
    "featured": true,
    "gallery": [
      "/images/jacinta.jpg",
      "/images/Casa.jpg",
      "/images/voz.jpg",
      "/images/mgw.jpg",
      "/images/lisbeth.jpg",
      "/images/mkhail.jpg",
      "/images/next.jpg",
      "/images/reseind.jpg",
      "/images/fina.jpg",
      "/images/oasis.jpg",
      "/images/grisel.jpg",
      "/images/william.jpg",
      "/images/target.jpg",
      "/images/AJS.jpg",
      "/images/smoking.jpg",
      "/images/ruth.jpg",
      "/images/refried.jpg",
      "/images/reedom.jpg",
      "/images/lainez.jpg",
      "/images/justice.jpg",
      "/images/jelisssa.jpg",
      "/images/JC.jpg",
      "/images/hotel.jpg",
      "/images/gaucho.jpg",
      "/images/essence.jpg",
      "/images/Era.jpg",
      "/images/Dominican.jpg",
      "/images/DH-Services.jpg",
      "/images/demsoco.jpg",
      "/images/CS.jpg",
      "/images/almonte.jpg",
      "/images/ALMHER.jpg"
    ]
  },
  {
    "id": "work-3",
    "slug": "cross-way-driving-school",
    "title": "Cross Way Driving School",
    "category": "Graphic Design",
    "image": "/images/carro.jpg",
    "description": "Comprehensive high-visibility vehicle fleet wrap design, roll-up banners, 5-hour pre-licensing posters, business cards, and outdoor teardrop flags.",
    "client": "Cross Way Driving School",
    "year": "2022",
    "link": "https://ozuna.ca/cross-way-driving-school/",
    "order": 3,
    "featured": true,
    "gallery": [
      "/images/carro.jpg",
      "/images/Roll_Up_Banner.jpg",
      "/images/5-hour-Poster.jpg",
      "/images/Poster.jpg",
      "/images/flyers.jpg",
      "/images/crossway_business_card.jpg",
      "/images/crossway_flag.jpg"
    ]
  },
  {
    "id": "work-4",
    "slug": "degan-tax",
    "title": "Degan Tax",
    "category": "Graphic Design",
    "image": "/images/Bus-Advertising.jpg",
    "description": "High-impact municipal bus advertising campaigns, promotional posters, corporate stationery, double-sided business cards, feather flags, and roll-up exhibition banners across NYC.",
    "client": "Degan Tax Services",
    "year": "2023",
    "link": "https://ozuna.ca/degan-tax/",
    "order": 4,
    "featured": true,
    "gallery": [
      "/images/Bus-Advertising.jpg",
      "/images/flyers.jpg",
      "/images/Degan-Business-C.jpg",
      "/images/degan-posters.jpg",
      "/images/Poeters.jpg",
      "/images/Pdegan-poster.jpg",
      "/images/degan-business-cards.jpg",
      "/images/rollup-banners.jpg",
      "/images/X-Stand-Banner.jpg",
      "/images/posters.jpg",
      "/images/Feather-Flag.jpg",
      "/images/degan-web-design.jpg"
    ]
  },
  {
    "id": "work-5",
    "slug": "degan-tax-web-design",
    "title": "Degan Tax Web Design",
    "category": "Web Design",
    "image": "/images/degantax-scaled-1.jpg",
    "description": "Full corporate website redesign, tax preparation booking funnel, client portal integration, and responsive brand interface.",
    "client": "Degan Tax Services",
    "year": "2023",
    "link": "https://ozuna.ca/degan-tax-web-design/",
    "order": 5,
    "featured": true,
    "gallery": [
      "/images/degantax-scaled-1.jpg",
      "/images/degantax-about-us.jpg",
      "/images/degantax-services.jpg",
      "/images/degantax-contact-us.jpg"
    ]
  },
  {
    "id": "work-6",
    "slug": "jacinthe-coiffure-studio",
    "title": "Jacinthe Coiffure Studio",
    "category": "Web Design",
    "image": "/images/jacinthecoiffurestudio.jpg",
    "description": "Boutique hair salon identity, responsive website, service catalogue layout, and appointment scheduling system located in Montreal.",
    "client": "Jacinthe Coiffure Studio",
    "year": "2023",
    "link": "https://ozuna.ca/jacinthe-coiffure-studio/",
    "order": 6,
    "featured": true,
    "gallery": [
      "/images/jacinthecoiffurestudio.jpg",
      "/images/jacinthecoiffurestudio-nous.jpg",
      "/images/jacinthecoiffurestudio-catalogue.jpg",
      "/images/jacinthecoiffurestudio-contactez-nous.jpg"
    ]
  },
  {
    "id": "work-7",
    "slug": "over-all-hvac-nj",
    "title": "Over All HVAC NJ",
    "category": "Web Design",
    "image": "/images/overallhvacnj-home-scaled.jpg",
    "description": "Commercial and residential HVAC emergency service web platform, customer request portal, and local SEO landing architecture.",
    "client": "Over All HVAC NJ",
    "year": "2022",
    "link": "https://ozuna.ca/over-all-hvac-nj/",
    "order": 7,
    "featured": true,
    "gallery": [
      "/images/overallhvacnj-home-scaled.jpg",
      "/images/overallhvacnj-about.jpg",
      "/images/overallhvacnj-contact.jpg"
    ]
  },
  {
    "id": "work-8",
    "slug": "postcards",
    "title": "PostCards",
    "category": "Graphic Design",
    "image": "/images/pennzoil-9.jpg",
    "description": "Pennzoil automotive lubrication postcard campaign featuring high-impact typography, mechanical graphics, and promotion layouts.",
    "client": "Pennzoil / Fast Lube NYC",
    "year": "2021",
    "link": "https://ozuna.ca/postcards/",
    "order": 8,
    "featured": false,
    "gallery": [
      "/images/pennzoil-9.jpg",
      "/images/pennzoil-5.jpg",
      "/images/pennzoil-2.jpg",
      "/images/pennzoil-6.jpg",
      "/images/pennzoil-3.jpg",
      "/images/pennzoil-4.jpg",
      "/images/pennzoil-7.jpg",
      "/images/pennzoil-8.jpg",
      "/images/pennzoil-10.jpg",
      "/images/pennzoil-1.jpg"
    ]
  },
  {
    "id": "work-9",
    "slug": "promotional-flyers",
    "title": "Promotional Flyers",
    "category": "Graphic Design",
    "image": "/images/Celebrating-Life.jpg",
    "description": "Extensive curation of over 40 bespoke concert, nightclub, festival, restaurant, and anniversary gala promotional posters and flyers.",
    "client": "Major NYC Nightclubs & Concert Promoters",
    "year": "2022",
    "link": "https://ozuna.ca/promotional-flyers/",
    "order": 9,
    "featured": false,
    "gallery": [
      "/images/Celebrating-Life.jpg",
      "/images/Alenny.jpg",
      "/images/Cepeda.jpg",
      "/images/El-Zafiro.jpg",
      "/images/Frank-Reyes.jpg",
      "/images/i-Love-bachata-2018.jpg",
      "/images/la-doncella-del-acordion.jpg",
      "/images/pakolev2.jpg",
      "/images/Raul-Morel.jpg",
      "/images/Karaoke-Night.jpg",
      "/images/Todos-los-Sabados.jpg",
      "/images/sabado-25-de-febrero.jpg",
      "/images/Aramis-Camilo.jpg",
      "/images/charlie.jpg",
      "/images/combos.jpg",
      "/images/Divas.jpg",
      "/images/henrry.jpg",
      "/images/Ladies-Night.jpg",
      "/images/pakole.jpg",
      "/images/Restaurant-Back-Flyer.jpg",
      "/images/Restaurant-Front-Flyer.jpg",
      "/images/sabado-25-de-marzo.jpg",
      "/images/Sabados-Gozadera.jpg",
      "/images/Casanova-fans.jpg",
      "/images/YOUR-CITY-IS-MINEv2.jpg",
      "/images/THURSDAY-NOV-10TH-2022.jpg",
      "/images/THURSDAY-APRIL-14TH-BACKv2.jpg",
      "/images/SUNDAY-MAY-1ST-2022-FRONT.jpg",
      "/images/SUNDAY-MAY-1ST-2022-BACK.jpg",
      "/images/SAT-DEC-11TH-2021-F.jpg",
      "/images/SAT-DEC-11TH-2021-B.jpg",
      "/images/QUEENSBRIDGE.jpg",
      "/images/Nipsey-Front.jpg",
      "/images/Don-Coqui-5x7_F_July_30.jpg",
      "/images/Don-Coqui-5x7_B_July_30.jpg",
      "/images/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division.jpg",
      "/images/CHERLY-WILLS-NY1-Flyer5x7v2.jpg",
      "/images/CHERLY-WILLS-NY1-Flyer-5.5x8.5v2.jpg",
      "/images/Carl-Dunn-Flyer.jpg",
      "/images/Cafe-D-Alsace-BC-2.jpg",
      "/images/Cafe-D-Alsace-BC-1.jpg",
      "/images/Brisa-del-Mar-8.5-x-14-2.jpg",
      "/images/Brisa-del-Mar-8.5-x-14-1.jpg"
    ]
  },
  {
    "id": "work-10",
    "slug": "refried-beans",
    "title": "Refried Beans",
    "category": "Graphic Design",
    "image": "/images/menu-cover.jpg",
    "description": "Authentic Mexican culinary branding, artisanal leather illustrated menu design, cocktail specials, and restaurant table collateral.",
    "client": "Refried Beans Restaurant",
    "year": "2023",
    "link": "https://ozuna.ca/refried-beans/",
    "order": 10,
    "featured": true,
    "gallery": [
      "/images/menu-cover.jpg",
      "/images/Dine-In-Menu-1.jpg",
      "/images/Liquor-Menu-1.jpg",
      "/images/Lunch-Special-2.jpg",
      "/images/Dine-In-Menu-2.jpg",
      "/images/Dine-In-Menu-4.jpg",
      "/images/Liquor-Menu-2.jpg",
      "/images/Dine-In-Menu-3.jpg",
      "/images/Lunch-Special-1.jpg"
    ]
  },
  {
    "id": "work-11",
    "slug": "reseind",
    "title": "Reseind",
    "category": "Graphic Design",
    "image": "/images/bcmockup-scaled.jpg",
    "description": "Reseind corporate identity system, foil business cards, 3D architectural wall signage, and executive apparel branding.",
    "client": "Reseind Technologies",
    "year": "2023",
    "link": "https://ozuna.ca/reseind/",
    "order": 11,
    "featured": false,
    "gallery": [
      "/images/bcmockup-scaled.jpg",
      "/images/21022459.jpg",
      "/images/wall_mockup.jpg",
      "/images/white_cap_mockup.jpg",
      "/images/sign_mockup.jpg"
    ]
  },
  {
    "id": "work-12",
    "slug": "roberto-clemente-foundation-booklet",
    "title": "Roberto Clemente Foundation Booklet",
    "category": "Graphic Design",
    "image": "/images/Roberto-Clemente-Booklet-1.jpg",
    "description": "Commemorative 50th Anniversary Gala booklet design, corporate sponsor tributes, editorial layout, and archival typography.",
    "client": "Roberto Clemente Foundation",
    "year": "2022",
    "link": "https://ozuna.ca/roberto-clemente-foundation-booklet/",
    "order": 12,
    "featured": false,
    "gallery": [
      "/images/Roberto-Clemente-Booklet-1.jpg",
      "/images/Roberto-Clemente-Booklet-2.jpg",
      "/images/Roberto-Clemente-Booklet-3.jpg",
      "/images/Roberto-Clemente-Booklet-4.jpg",
      "/images/Roberto-Clemente-Booklet-5.jpg",
      "/images/Roberto-Clemente-Booklet-6.jpg",
      "/images/Roberto-Clemente-Booklet-7.jpg",
      "/images/Roberto-Clemente-Booklet-8.jpg",
      "/images/Roberto-Clemente-Booklet-9.jpg",
      "/images/Roberto-Clemente-Booklet-10.jpg",
      "/images/Roberto-Clemente-Booklet-11.jpg",
      "/images/Roberto-Clemente-Booklet-12.jpg",
      "/images/Roberto-Clemente-Booklet-13.jpg",
      "/images/Roberto-Clemente-Booklet-14.jpg",
      "/images/Roberto-Clemente-Booklet-15.jpg",
      "/images/Roberto-Clemente-Booklet-16.jpg",
      "/images/Roberto-Clemente-Booklet-17.jpg",
      "/images/Roberto-Clemente-Booklet-18.jpg",
      "/images/Roberto-Clemente-Booklet-19.jpg"
    ]
  },
  {
    "id": "work-13",
    "slug": "roberto-clemente-invitations",
    "title": "Roberto Clemente Invitations",
    "category": "Graphic Design",
    "image": "/images/Sponsorship-RSVP-Card-8x6-1.jpg",
    "description": "VIP Gala invitations, gold foil card stock, custom typography, and formal sponsorship response cards.",
    "client": "Roberto Clemente Foundation",
    "year": "2022",
    "link": "https://ozuna.ca/roberto-clemente-invitations/",
    "order": 13,
    "featured": false,
    "gallery": [
      "/images/Sponsorship-RSVP-Card-8x6-1.jpg",
      "/images/RC-Invitate-7x10-2.jpg",
      "/images/RC-Invitate-7x10-1.jpg",
      "/images/Sponsorship-RSVP-Card-8x6-2.jpg"
    ]
  },
  {
    "id": "work-14",
    "slug": "sannico-sports",
    "title": "Sannico Sports",
    "category": "Graphic Design",
    "image": "/images/Children-Shoe-Box-Template.webp",
    "description": "Athletic equipment and apparel packaging system, die-cut soccer cleat shoebox, socks header cards, and retail hangtags.",
    "client": "Sannico Sports International",
    "year": "2024",
    "link": "https://ozuna.ca/sannico-sports/",
    "order": 14,
    "featured": false,
    "gallery": [
      "/images/Children-Shoe-Box-Template.webp",
      "/images/Classico-Socks-Header-Card.webp",
      "/images/Generic-Outside-Tag.webp",
      "/images/Shin-Guard.webp",
      "/images/Children-Shoe-Box-Template-v1.webp"
    ]
  },
  {
    "id": "work-15",
    "slug": "tu-voz-amiga",
    "title": "Tu Voz Amiga",
    "category": "Web Design",
    "image": "/images/tuvozamiga.jpg",
    "description": "Non-profit advocacy and community counseling web platform with multi-language support, crisis helpline resources, and consultation booking.",
    "client": "Tu Voz Amiga Non-Profit",
    "year": "2023",
    "link": "https://ozuna.ca/tu-voz-amiga/",
    "order": 15,
    "featured": true,
    "gallery": [
      "/images/tuvozamiga.jpg",
      "/images/tuvozamiga-about-us.jpg",
      "/images/tuvozamiga-services.jpg",
      "/images/tuvozamiga-prices.jpg",
      "/images/tuvozamiga-resources.jpg",
      "/images/tuvozamiga-contact-us.jpg"
    ]
  }
];

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    // CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    // API Routes
    if (url.pathname.startsWith("/api/")) {
      try {
        // 1. Auth: Login
        if (url.pathname === "/api/auth/login" && method === "POST") {
          const body = await request.json().catch(() => ({}));
          const userStr = (body.username || "").trim().toLowerCase();
          const passStr = body.password || "";

          const validEmails = ["cmozunap@gmail.com", "admin@ozuna.ca"];
          const isValid = validEmails.includes(userStr) && passStr === "OzunaMaster2026!";

          if (isValid) {
            const token = "ozuna_token_" + btoa(JSON.stringify({ u: userStr, exp: Date.now() + 86400000 * 7 }));
            return jsonResponse({
              success: true,
              token,
              user: {
                id: "6e341333-95ad-4d07-9cbc-0bef62a7be79",
                username: "cmozunap@gmail.com",
                name: "Carlos Ozuna",
                role: "admin"
              }
            });
          }

          return jsonResponse({ error: "Invalid username or password" }, 401);
        }

        // 2. Auth: Me
        if (url.pathname === "/api/auth/me" && method === "GET") {
          return jsonResponse({
            user: {
              id: "6e341333-95ad-4d07-9cbc-0bef62a7be79",
              username: "cmozunap@gmail.com",
              name: "Carlos Ozuna",
              role: "admin"
            }
          });
        }

        // 3. Content: Settings
        if (url.pathname === "/api/content/settings") {
          if (method === "GET") {
            if (env.DB) {
              const row = await env.DB.prepare("SELECT * FROM SiteSetting WHERE id = 'global-settings'").first();
              if (row) {
                return jsonResponse({
                  ...row,
                  colors: JSON.parse(row.colorsJson || "{}")
                });
              }
            }
            return jsonResponse(DEFAULT_SETTINGS);
          }

          if (method === "PUT") {
            const body = await request.json().catch(() => ({}));
            if (env.DB) {
              await env.DB.prepare(
                "UPDATE SiteSetting SET title = ?, description = ?, heroVideo = ?, colorsJson = ?, updatedAt = ? WHERE id = 'global-settings'"
              ).bind(
                body.title || DEFAULT_SETTINGS.title,
                body.description || DEFAULT_SETTINGS.description,
                body.heroVideo || DEFAULT_SETTINGS.heroVideo,
                JSON.stringify(body.colors || DEFAULT_SETTINGS.colors),
                Date.now()
              ).run();
            }
            return jsonResponse({ ...DEFAULT_SETTINGS, ...body, colors: body.colors || DEFAULT_SETTINGS.colors });
          }
        }

        // 4. Content: Pages
        if (url.pathname === "/api/content/pages") {
          if (method === "GET") {
            if (env.DB) {
              const { results } = await env.DB.prepare("SELECT * FROM Page").all();
              if (results && results.length > 0) {
                const formatted = results.map(p => ({
                  ...p,
                  sections: JSON.parse(p.sectionsJson || "[]")
                }));
                return jsonResponse(formatted);
              }
            }
            return jsonResponse(DEFAULT_PAGES);
          }
        }

        // 5. Content: Single Page
        if (url.pathname.startsWith("/api/content/pages/")) {
          const slug = url.pathname.replace("/api/content/pages/", "");
          if (method === "GET") {
            if (env.DB) {
              const page = await env.DB.prepare("SELECT * FROM Page WHERE slug = ?").bind(slug).first();
              if (page) {
                return jsonResponse({
                  ...page,
                  sections: JSON.parse(page.sectionsJson || "[]")
                });
              }
            }
            const found = DEFAULT_PAGES.find(p => p.slug === slug);
            if (found) return jsonResponse(found);
            return jsonResponse({ error: "Page not found" }, 404);
          }

          if (method === "PUT") {
            const body = await request.json().catch(() => ({}));
            if (env.DB) {
              await env.DB.prepare(
                "UPDATE Page SET title = ?, metaDescription = ?, sectionsJson = ?, updatedAt = ? WHERE slug = ?"
              ).bind(
                body.title || "",
                body.metaDescription || "",
                JSON.stringify(body.sections || []),
                Date.now(),
                slug
              ).run();
            }
            return jsonResponse({ success: true, slug, ...body });
          }
        }

        // 6. Content: Portfolio
        if (url.pathname === "/api/content/portfolio") {
          if (method === "GET") {
            const category = url.searchParams.get("category");
            if (env.DB) {
              let query = "SELECT * FROM PortfolioItem";
              let params = [];
              if (category && category !== "ALL") {
                query += " WHERE category = ?";
                params.push(category);
              }
              query += ' ORDER BY "order" ASC';
              const { results } = await env.DB.prepare(query).bind(...params).all();
              if (results && results.length > 0) {
                const mapped = results.map(r => {
                  const def = DEFAULT_PORTFOLIO.find(p => p.slug === r.slug);
                  return { ...r, gallery: def ? def.gallery : [r.image] };
                });
                return jsonResponse(mapped);
              }
            }
            if (category && category !== "ALL") {
              return jsonResponse(DEFAULT_PORTFOLIO.filter(p => p.category === category));
            }
            return jsonResponse(DEFAULT_PORTFOLIO);
          }

          if (method === "POST") {
            const body = await request.json().catch(() => ({}));
            const id = "item_" + Date.now();
            if (env.DB) {
              await env.DB.prepare(
                'INSERT INTO PortfolioItem ("id", "title", "category", "slug", "image", "description", "client", "year", "link", "order", "featured", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
              ).bind(
                id,
                body.title || "New Project",
                body.category || "Graphic Design",
                body.slug || (body.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                body.image || "/images/ajsmechanical-net.jpg",
                body.description || "",
                body.client || "",
                body.year || "2026",
                body.link || "",
                body.order || 0,
                body.featured ? 1 : 0,
                Date.now(),
                Date.now()
              ).run();
            }
            return jsonResponse({ id, ...body }, 201);
          }
        }

        // Single Portfolio Item Actions
        if (url.pathname.startsWith("/api/content/portfolio/")) {
          const itemId = url.pathname.replace("/api/content/portfolio/", "");
          if (method === "PUT") {
            const body = await request.json().catch(() => ({}));
            if (env.DB) {
              await env.DB.prepare(
                'UPDATE PortfolioItem SET "title" = ?, "category" = ?, "slug" = ?, "image" = ?, "description" = ?, "client" = ?, "year" = ?, "link" = ?, "featured" = ?, "order" = ?, "updatedAt" = ? WHERE "id" = ?'
              ).bind(
                body.title, body.category, body.slug, body.image, body.description, body.client, body.year, body.link, body.featured ? 1 : 0, body.order || 0, Date.now(), itemId
              ).run();
            }
            return jsonResponse({ id: itemId, ...body });
          }

          if (method === "DELETE") {
            if (env.DB) {
              await env.DB.prepare('DELETE FROM PortfolioItem WHERE "id" = ?').bind(itemId).run();
            }
            return jsonResponse({ success: true, message: "Item deleted" });
          }
        }

        // 7. Contact Submission (from Contact Me modal)
        if (url.pathname === "/api/content/contact" && method === "POST") {
          const body = await request.json().catch(() => ({}));
          const id = "sub_" + Date.now();
          if (env.DB) {
            await env.DB.prepare(
              'INSERT INTO ContactSubmission ("id", "name", "email", "phone", "message", "payload", "createdAt") VALUES (?, ?, ?, ?, ?, ?, ?)'
            ).bind(
              id,
              body.name || "",
              body.email || "",
              body.phone || "",
              body.message || "",
              JSON.stringify(body),
              Date.now()
            ).run();
          }
          return jsonResponse({ success: true, message: "Thank you for reaching out!", submissionId: id }, 201);
        }

        // 8. Contact Submissions list for admin
        if (url.pathname === "/api/content/submissions" && method === "GET") {
          if (env.DB) {
            const { results } = await env.DB.prepare('SELECT * FROM ContactSubmission ORDER BY createdAt DESC').all();
            return jsonResponse(results || []);
          }
          return jsonResponse([]);
        }

        // 9. Media upload fallback
        if (url.pathname === "/api/media/upload-base64" && method === "POST") {
          const body = await request.json().catch(() => ({}));
          return jsonResponse({ success: true, url: body.dataUrl || "/images/ajsmechanical-net.jpg" });
        }

        // 10. Health
        if (url.pathname === "/api/health") {
          return jsonResponse({ status: "healthy", runtime: "cloudflare-edge", timestamp: new Date().toISOString() });
        }

        return jsonResponse({ error: "Endpoint not found" }, 404);
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // Static Assets serving via Cloudflare Pages
    let response = await env.ASSETS.fetch(request);
    
    // SPA routing fallback (for /admin, /about-me, /work, etc.)
    if (response.status === 404 && !url.pathname.includes(".")) {
      const indexRequest = new Request(new URL("/index.html", request.url), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  }
};
