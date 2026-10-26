import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Login from './admin/Login';
import AdminDashboard from './admin/AdminDashboard';
import { Mail, MapPin, Send, CheckCircle2, Download, ExternalLink, X } from 'lucide-react';

// 1. Home Page View
function HomePage({ settings, pages }) {
  const homePage = pages.find((p) => p.slug === 'home');
  const heroSection = homePage?.sections?.find((s) => s.id === 'hero');

  return <Hero data={heroSection} heroVideo={settings?.heroVideo} />;
}

// 2. About Me Page View (1:1 replica of https://ozuna.ca/about-me/)
function AboutPage() {

  return (
    <div className="bg-white min-h-screen text-[#011437] font-raleway pt-20 pb-16 selection:bg-[#ff1d25] selection:text-white">
      {/* Title Watermark & Outlined Header */}
      <section className="pt-12 sm:pt-20 pb-4 text-center relative overflow-hidden">
        {/* Lowercase Outlined Foreground Title: about (elementor-element-4eeaee2) */}
        <h1
          className="font-raleway text-[48px] sm:text-[60px] font-black tracking-tight text-center leading-none lowercase relative z-10"
          style={{
            WebkitTextStroke: '1px #011437',
            color: 'transparent'
          }}
        >
          about
        </h1>

        {/* Large Faint Watermark: about (elementor-element-4c4fede) */}
        <div
          className="font-raleway text-[76px] sm:text-[100px] font-black uppercase tracking-wider text-center leading-none select-none -mt-[56px] sm:-mt-[90px]"
          style={{ color: 'rgba(37, 37, 37, 0.05)' }}
        >
          about
        </div>

        {/* Downward Bouncing Chevron Arrow Icon (elementor-element-04ae8c1) */}
        <div className="pt-2 flex justify-center">
          <a
            href="#Down"
            className="text-[#011437] hover:text-[#ff1d25] transition-colors p-2 inline-block animate-moveUpDown"
            aria-label="Scroll to content"
          >
            <svg
              className="w-[55px] h-[55px] sm:w-[75px] sm:h-[75px]"
              viewBox="0 0 612 792"
              fill="currentColor"
            >
              <path d="M304.8,477.3c12.2-12.3,23.5-23.7,34.8-35c47.1-47.1,94.3-94.2,141.4-141.3c1.1-1.1,2.3-2.3,3.6-3.3 c3.3-2.4,7.5-2.1,10.2,0.8c2.7,2.8,3,7.1,0.6,10.3c-0.9,1.2-2,2.2-3.1,3.3c-58.9,58.8-117.8,117.7-176.7,176.5 c-1.4,1.4-2.8,2.9-4.2,4.3c-4,4-8.4,4-12.5-0.1c-13.7-13.7-27.3-27.5-41-41.2c-46.1-46.2-92.2-92.4-138.3-138.5 c-1.1-1.1-2.4-2.3-3.3-3.6c-2.2-3.2-1.7-7.3,1-9.9c2.6-2.6,7-3,10-0.8c1.2,0.9,2.2,2,3.3,3.1c57,57,113.9,114.1,170.9,171.2 C302.6,474.1,303.5,475.6,304.8,477.3z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Main Copy Section (elementor-element-e6bf42a) */}
      <section
        id="about-content"
        className="max-w-[760px] mx-auto px-6 py-6 space-y-6 text-[14px] leading-[2em] tracking-[2px] text-[#011437] font-raleway font-normal"
      >
        <div>
          <strong className="block text-[14px] font-bold text-[#011437] mb-1">
            Let’s Create Something Great Together
          </strong>
          <p>
            Hi there! I’m a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people.
          </p>
        </div>

        <div>
          <strong className="block text-[14px] font-bold text-[#011437] mb-1">
            What I Bring:
          </strong>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mastery of Adobe tools (Photoshop, InDesign, Illustrator, WordPress y CSS3) to create polished, versatile work.</li>
            <li>A deep understanding of print and digital design—from magazines and promotional materials to social campaigns and email marketing.</li>
            <li>A humble, team-first mindset: I listen closely, adapt quickly, and believe feedback makes every project stronger.</li>
            <li>Fluent communication in English, French, and Spanish, which helps me collaborate smoothly across cultures.</li>
          </ul>
        </div>

        <div>
          <strong className="block text-[14px] font-bold text-[#011437] mb-1">
            My Approach:
          </strong>
          <p>
            Over the years, I’ve learned that great design starts with empathy. I ask questions, respect deadlines, and keep things simple and purposeful. Whether it’s a logo, a brochure, or a digital ad, my goal is to deliver work that feels both meaningful and effortless.
          </p>
        </div>

        <p>
          If you’re looking for a professional graphic designer who loves design (and is excited by well-chosen typography or an engaging layout!), let’s talk. I’m open to full-time, freelance, or contract positions where I can contribute, learn, and grow with a caring team.
        </p>

        <p>
          Thanks for your time—I’d be honoured to help bring your company to the next level.
        </p>
      </section>

      {/* Centered CQ Emblem with Circular Rotating Text Path (elementor-element-ef91366 & d023a62) */}
      <section id="Down" className="pt-[6%] pb-[6%] flex flex-col items-center justify-center relative">
        <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]">
          {/* Rotating SVG Circular Text Path */}
          <svg
            viewBox="0 0 320 320"
            className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_30s_linear_infinite]"
          >
            <defs>
              <path
                id="circlePath"
                d="M 160, 160 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                fill="none"
              />
            </defs>
            <text
              className="text-[14px] sm:text-[15px] fill-[#011437] uppercase tracking-[3px]"
              style={{ fontFamily: '"Archivo Black", sans-serif', wordSpacing: '-4px' }}
            >
              <textPath href="#circlePath" startOffset="0%">
                PORTFOLIO OF CARLOS OZUNA • PORTFOLIO OF CARLOS OZUNA •
              </textPath>
            </text>
          </svg>

          {/* Centered Emblem Logo */}
          <img
            src="/images/COzuna-favico.svg"
            alt="Carlos Ozuna - CQ Web Design Graphic Design Printing"
            className="w-[120px] sm:w-[150px] h-auto object-contain relative z-10 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Contact Carlos Ozuna Heading & Link List (elementor-element-c7a461d & 141b523) */}
      <section className="text-center pt-[2%] pb-20 space-y-4 font-raleway">
        <h2
          className="text-[28px] sm:text-[33px] text-[#011437] capitalize tracking-normal"
          style={{ fontFamily: '"Archivo Black", sans-serif' }}
        >
          Contact Carlos Ozuna
        </h2>
        <ul className="space-y-1.5 text-[14px] sm:text-[16px] font-medium leading-[2em] text-[#011437]">
          <li>
            <a
              href="/downloads/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff1d25] transition-colors inline-block capitalize"
            >
              Download my CV.
            </a>
          </li>
          <li>
            <Link
              to="/work"
              className="hover:text-[#ff1d25] transition-colors inline-block capitalize"
            >
              See Carlos Ozuna's work
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="hover:text-[#ff1d25] transition-colors inline-block capitalize cursor-pointer font-medium"
            >
              contact me
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}

// 3. Work Page View (1:1 replica of https://ozuna.ca/work/)
function WorkPage({ portfolio }) {
  return (
    <div className="bg-white min-h-screen pt-20">
      <PortfolioGrid items={portfolio} />
    </div>
  );
}

// 4. Contact Route -> triggers Contact Me Pop-Up Modal
function ContactRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
    navigate('/work', { replace: true });
  }, [navigate]);

  return <div className="bg-white min-h-screen pt-20" />;
}

// Main Layout for public pages (hides footer on home page hero)
function MainLayout({ settings, pages, portfolio }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpen);

    if (location.pathname === '/contact' || location.hash === '#contact') {
      setContactModalOpen(true);
    }

    const handleHash = () => {
      if (window.location.hash === '#contact') {
        setContactModalOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);

    return () => {
      window.removeEventListener('open-contact-modal', handleOpen);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [location]);

  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage settings={settings} pages={pages} />} />
          <Route path="/about-me" element={<AboutPage pages={pages} />} />
          <Route path="/work" element={<WorkPage portfolio={portfolio} />} />
          <Route path="/work/:slug" element={<WorkPage portfolio={portfolio} />} />
          <Route path="/contact" element={<ContactRedirect />} />
        </Routes>
      </main>
      {!isHome && <Footer />}

      {/* Global Authentic "Contact Me" Pop-Up Form Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}

// Main App Router Component
export default function App() {
  const [settings, setSettings] = useState(null);
  const [pages, setPages] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch('/api/content/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setSettings(data);
          if (data.colors?.dominant60) {
            document.documentElement.style.setProperty('--color-dominant-60', data.colors.dominant60);
          }
          if (data.colors?.secondary30) {
            document.documentElement.style.setProperty('--color-secondary-30', data.colors.secondary30);
          }
          if (data.colors?.accent10) {
            document.documentElement.style.setProperty('--color-accent-10', data.colors.accent10);
          }
        }
      })
      .catch((err) => console.warn('Could not load settings:', err));

    fetch('/api/content/pages')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPages(data))
      .catch((err) => console.warn('Could not load pages:', err));

    fetch('/api/content/portfolio')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPortfolio(data))
      .catch((err) => console.warn('Could not load portfolio:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#ff1d25] selection:text-white">
      <Routes>
        {/* Admin Routes without main site header/footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public Routes with Navigation & Footer */}
        <Route
          path="/*"
          element={<MainLayout settings={settings} pages={pages} portfolio={portfolio} />}
        />
      </Routes>
    </div>
  );
}
