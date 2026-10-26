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
  { id: "1", title: "AJS Mechanical", category: "Web Design", slug: "ajs-mechanical", image: "/images/ajsmechanical-net.jpg", link: "https://ozuna.ca/ajs-mechanical/", order: 1, featured: true },
  { id: "2", title: "Business Cards", category: "Graphic Design", slug: "business-cards", image: "/images/jacinta.jpg", link: "https://ozuna.ca/business-cards/", order: 2, featured: true },
  { id: "3", title: "Cross Way Driving School", category: "Graphic Design", slug: "cross-way-driving-school", image: "/images/carro.jpg", link: "https://ozuna.ca/cross-way-driving-school/", order: 3, featured: true },
  { id: "4", title: "Degan Tax", category: "Graphic Design", slug: "degan-tax", image: "/images/Bus-Advertising.jpg", link: "https://ozuna.ca/degan-tax/", order: 4, featured: true },
  { id: "5", title: "Degan Tax Web Design", category: "Web Design", slug: "degan-tax-web-design", image: "/images/degantax-scaled-1.jpg", link: "https://ozuna.ca/degan-tax-web-design/", order: 5, featured: true },
  { id: "6", title: "Jacinthe Coiffure Studio", category: "Web Design", slug: "jacinthe-coiffure-studio", image: "/images/jacinthecoiffurestudio.jpg", link: "https://ozuna.ca/jacinthe-coiffure-studio/", order: 6, featured: true },
  { id: "7", title: "Over All HVAC NJ", category: "Web Design", slug: "over-all-hvac-nj", image: "/images/overallhvacnj-home-scaled.jpg", link: "https://ozuna.ca/over-all-hvac-nj/", order: 7, featured: true },
  { id: "8", title: "PostCards", category: "Graphic Design", slug: "postcards", image: "/images/pennzoil-9.jpg", link: "https://ozuna.ca/postcards/", order: 8, featured: false },
  { id: "9", title: "Promotional Flyers", category: "Graphic Design", slug: "promotional-flyers", image: "/images/Celebrating-Life.jpg", link: "https://ozuna.ca/promotional-flyers/", order: 9, featured: false },
  { id: "10", title: "Refried Beans", category: "Graphic Design", slug: "refried-beans", image: "/images/menu-cover.jpg", link: "https://ozuna.ca/refried-beans/", order: 10, featured: true },
  { id: "11", title: "Reseind", category: "Graphic Design", slug: "reseind", image: "/images/bcmockup-scaled.jpg", link: "https://ozuna.ca/reseind/", order: 11, featured: false },
  { id: "12", title: "Roberto Clemente Foundation Booklet", category: "Graphic Design", slug: "roberto-clemente-foundation-booklet", image: "/images/Roberto-Clemente-Booklet-1.jpg", link: "https://ozuna.ca/roberto-clemente-foundation-booklet/", order: 12, featured: false },
  { id: "13", title: "Roberto Clemente Foundation Business Cards", category: "Graphic Design", slug: "roberto-clemente-foundation-business-cards", image: "/images/Roberto-Clemente-Foundation-Business-Cards-1.jpg", link: "https://ozuna.ca/roberto-clemente-foundation-business-cards/", order: 13, featured: false },
  { id: "14", title: "Tee Shirt", category: "Graphic Design", slug: "tee-shirt", image: "/images/tshirt.jpg", link: "https://ozuna.ca/tee-shirt/", order: 14, featured: false },
  { id: "15", title: "Vehicle Lettering", category: "Graphic Design", slug: "vehicle-lettering", image: "/images/car-1.jpg", link: "https://ozuna.ca/vehicle-lettering/", order: 15, featured: false }
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
                return jsonResponse(results);
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
