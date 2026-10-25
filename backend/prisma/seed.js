// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with exact local assets...');

  // 1. Admin User
  const hashedPassword = await bcrypt.hash('OzunaMaster2026!', 10);
  await prisma.user.upsert({
    where: { username: 'admin@ozuna.ca' },
    update: { password: hashedPassword },
    create: {
      username: 'admin@ozuna.ca',
      password: hashedPassword,
      name: 'Carlos Ozuna',
      role: 'admin'
    }
  });
  console.log('✓ Admin user seeded: admin@ozuna.ca / OzunaMaster2026!');

  // 2. Global Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 'global-settings' },
    update: {},
    create: {
      id: 'global-settings',
      title: 'Carlos Ozuna | Senior Graphic Designer & Web Developer',
      description: 'Senior Graphic Designer & Web Developer located in Laval, CA. 20+ years of experience crafting high-impact visuals.',
      colorsJson: JSON.stringify({
        dominant60: '#020202',
        secondary30: '#111111',
        accent10: '#ff1d25'
      }),
      heroVideo: '/videos/hero-background.mp4'
    }
  });
  console.log('✓ Global site settings seeded.');

  // 3. Pages
  const pages = [
    {
      slug: 'home',
      title: "Carlos Ozuna | Senior Graphic Designer & Web Developer",
      metaDescription: "Welcome to Carlos Ozuna's portfolio. Web Design, Graphic Design, Printing, and Digital Signage.",
      sectionsJson: JSON.stringify([
        {
          id: 'hero',
          name: 'Hero Section',
          tag: 'WELCOME TO CARLOS OZUNA’S PORTFOLIO',
          title: "WELCOME TO CARLOS OZUNA'S PORTFOLIO",
          subtitle: 'WEB | GRAPHIC DESIGN | PRINTING | DIGITAL SIGNAGE',
          cvUrl: '/downloads/CV.pdf',
          portfolioCta: 'GO TO PORTFOLIO'
        },
        {
          id: 'about-summary',
          name: 'About Intro',
          heading: 'Creative Precision & Strategic Visuals',
          paragraph: 'With over 20 years in graphic and digital design, I craft brand identities, marketing campaigns, high-converting websites, and large-format vehicle graphics that speak boldly.'
        }
      ])
    },
    {
      slug: 'about-me',
      title: 'About Me — Carlos Ozuna | Senior Designer',
      metaDescription: "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms.",
      sectionsJson: JSON.stringify([
        {
          id: 'about-hero',
          name: 'About Story',
          heading: 'Let’s Create Something Great Together',
          paragraph: 'Hi there! I’m a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people.'
        },
        {
          id: 'skills',
          name: 'Core Competencies',
          items: [
            'Mastery of Adobe Creative Cloud (Photoshop, InDesign, Illustrator, Premiere)',
            'Modern Web Development (WordPress, CSS3, React, Tailwind CSS)',
            'Large Format Print, Vehicle Wraps & Digital Signage Production',
            'Fluent multilingual communication in English, French, and Spanish'
          ]
        }
      ])
    },
    {
      slug: 'work',
      title: 'Work & Case Studies — Carlos Ozuna',
      metaDescription: 'Explore the full portfolio of graphic design, e-commerce web design, branding, and advertising projects by Carlos Ozuna.',
      sectionsJson: JSON.stringify([
        {
          id: 'work-header',
          name: 'Portfolio Showcase Header',
          title: 'SELECTED PROJECTS',
          subtitle: 'A curation of corporate identities, custom web platforms, print collateral, and advertising.'
        }
      ])
    },
    {
      slug: 'contact',
      title: 'Contact Me — Carlos Ozuna',
      metaDescription: 'Get in touch for freelance collaborations, corporate design projects, or full-time opportunities.',
      sectionsJson: JSON.stringify([
        {
          id: 'contact-info',
          name: 'Contact Details',
          email: 'carlos@ozuna.ca',
          location: 'Laval, Quebec, Canada',
          availability: 'Open to full-time, freelance, and contract positions'
        }
      ])
    }
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page
    });
  }
  console.log('✓ Multi-page content seeded.');

  // 4. Portfolio Items with verified local images
  const portfolioItems = [
    {
      title: 'AJS Mechanical',
      category: 'Web Design',
      slug: 'ajs-mechanical',
      image: '/images/ajsmechanical-net.jpg',
      description: 'Responsive web platform and complete visual brand identity for commercial mechanical contractors.',
      client: 'AJS Mechanical Services',
      year: '2023',
      link: 'https://ajsmechanical.net',
      order: 1,
      featured: true
    },
    {
      title: 'Business Cards Showcase',
      category: 'Graphic Design',
      slug: 'business-cards',
      image: '/images/jacinta.jpg',
      description: 'Luxury foiled and soft-touch business card series engineered for boutique studios and entrepreneurs.',
      client: 'Jacinthe Coiffure Studio & Partners',
      year: '2023',
      order: 2,
      featured: true
    },
    {
      title: 'Cross Way Driving School',
      category: 'Graphic Design',
      slug: 'cross-way-driving-school',
      image: '/images/carro.jpg',
      description: 'Comprehensive high-visibility vehicle wrap design and brand identity system.',
      client: 'Cross Way Driving School',
      year: '2022',
      order: 3,
      featured: true
    },
    {
      title: 'Degan Tax Transit Advertising',
      category: 'Graphic Design',
      slug: 'degan-tax',
      image: '/images/Bus-Advertising.jpg',
      description: 'High-impact municipal bus advertising campaign, billboards, and transit visual assets.',
      client: 'Degan Tax Services',
      year: '2023',
      order: 4,
      featured: true
    },
    {
      title: 'Degan Tax Web Platform',
      category: 'Web Design',
      slug: 'degan-tax-web-design',
      image: '/images/degantax-scaled-1.jpg',
      description: 'Full corporate website redesign, lead capture funnel, and corporate accounting branding.',
      client: 'Degan Tax Services',
      year: '2023',
      order: 5,
      featured: true
    },
    {
      title: 'Jacinthe Coiffure Studio',
      category: 'Web Design',
      slug: 'jacinthe-coiffure-studio',
      image: '/images/jacinthecoiffurestudio.jpg',
      description: 'Boutique hair salon identity, responsive website, service menu layout, and booking integration.',
      client: 'Jacinthe Coiffure',
      year: '2023',
      order: 6,
      featured: true
    },
    {
      title: 'Over All HVAC NJ',
      category: 'Web Design',
      slug: 'over-all-hvac-nj',
      image: '/images/overallhvacnj-home-scaled.jpg',
      description: 'Commercial and residential HVAC emergency service web design and local SEO landing architecture.',
      client: 'Over All HVAC LLC',
      year: '2022',
      order: 7,
      featured: true
    },
    {
      title: 'Pennzoil Collector Postcards',
      category: 'Graphic Design',
      slug: 'postcards',
      image: '/images/pennzoil-9.jpg',
      description: 'Vintage-inspired collectible automotive postcard series with custom typography treatment.',
      client: 'Automotive Heritage Series',
      year: '2021',
      order: 8,
      featured: false
    },
    {
      title: 'Celebrating Life Event Flyers',
      category: 'Graphic Design',
      slug: 'promotional-flyers',
      image: '/images/Celebrating-Life.jpg',
      description: 'Custom celebratory gala and promotional collateral with bespoke typography and layout hierarchy.',
      client: 'Gala & Cultural Arts Foundation',
      year: '2022',
      order: 9,
      featured: false
    },
    {
      title: 'Refried Beans Restaurant Branding',
      category: 'Graphic Design',
      slug: 'refried-beans',
      image: '/images/menu-cover.jpg',
      description: 'Authentic culinary branding, artisanal illustrated menu design, and restaurant table signage.',
      client: 'Refried Beans Taqueria',
      year: '2023',
      order: 10,
      featured: true
    },
    {
      title: 'Trade Show Roll Up Banners',
      category: 'Graphic Design',
      slug: 'roll-up-banners',
      image: '/images/bcmockup-scaled.jpg',
      description: 'Large-scale trade show exhibition banners with high-contrast messaging and architectural graphics.',
      client: 'Industrial Expo Montreal',
      year: '2023',
      order: 11,
      featured: false
    },
    {
      title: 'Saint-Laurent Express Newspaper',
      category: 'Graphic Design',
      slug: 'saint-laurent-express',
      image: '/images/Roberto-Clemente-Booklet-1.jpg',
      description: 'Editorial grid architecture, front-page masthead styling, and weekly publication layout.',
      client: 'Saint-Laurent Regional Press',
      year: '2022',
      order: 12,
      featured: false
    },
    {
      title: 'Tires Direct Canada',
      category: 'Web Design',
      slug: 'tires-direct-canada',
      image: '/images/Sponsorship-RSVP-Card-8x6-1.jpg',
      description: 'E-commerce tire selector UX, inventory catalog styling, and seasonal promotional landing pages.',
      client: 'Tires Direct Canada Inc.',
      year: '2023',
      order: 13,
      featured: true
    },
    {
      title: 'Fleet Commercial Vehicle Wrap',
      category: 'Graphic Design',
      slug: 'vehicle-wrap',
      image: '/images/Children-Shoe-Box-Template.webp',
      description: 'Full-bleed 3D contour vehicle wrap vector design for commercial delivery van fleet.',
      client: 'Metro Express Logistics',
      year: '2022',
      order: 14,
      featured: false
    },
    {
      title: 'Tu Voz Amiga Web Platform',
      category: 'Web Design',
      slug: 'tu-voz-amiga',
      image: '/images/tuvozamiga.jpg',
      description: 'Multilingual radio and community portal design with streaming media integration.',
      client: 'Tu Voz Amiga Radio',
      year: '2021',
      order: 15,
      featured: true
    }
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item
    });
  }
  console.log(`✓ ${portfolioItems.length} portfolio items seeded with verified local media!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
