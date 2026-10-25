import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import Footer from './components/Footer';
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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOpenModal = () => setContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModal);
    if (window.location.hash === '#contact') setContactModalOpen(true);
    const handleHash = () => {
      if (window.location.hash === '#contact') setContactModalOpen(true);
    };
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('open-contact-modal', handleOpenModal);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message');

      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
              className="font-archivo text-[14px] sm:text-[15px] font-medium fill-[#011437] uppercase tracking-[3px]"
              style={{ wordSpacing: '-4px' }}
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
        <h2 className="font-archivo text-[26px] sm:text-[33px] font-normal text-[#011437] capitalize tracking-normal">
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
              onClick={() => setContactModalOpen(true)}
              className="hover:text-[#ff1d25] transition-colors inline-block capitalize cursor-pointer font-medium"
            >
              contact me
            </button>
          </li>
        </ul>
      </section>

      {/* Interactive Contact Popup Modal (1:1 replica of Elementor Popup 907) */}
      {contactModalOpen && (
        <div id="contact-popup-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-gray-100 text-[#011437] font-raleway">
            <button
              type="button"
              onClick={() => { setContactModalOpen(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#011437] p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold font-archivo text-[#011437] uppercase">
                  Thank You!
                </h3>
                <p className="text-sm text-gray-600">
                  Your message has been sent to Carlos Ozuna. We'll be in touch shortly!
                </p>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-6 py-2.5 bg-[#ff1d25] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#e0121a] transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4 pt-2">
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold font-archivo text-[#011437] tracking-tight">
                    Contact Me Today!
                  </h3>
                  <p className="text-xs text-gray-500 tracking-wider uppercase mt-1">
                    Send a direct inquiry to Carlos
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#011437] focus:outline-none focus:border-[#ff1d25] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#011437] focus:outline-none focus:border-[#ff1d25] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="438-000-0000"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#011437] focus:outline-none focus:border-[#ff1d25] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#011437] focus:outline-none focus:border-[#ff1d25] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your project inquiry or question..."
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#011437] focus:outline-none focus:border-[#ff1d25] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#ff1d25] hover:bg-[#e0121a] text-white text-xs font-bold uppercase tracking-[2px] rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'ContaCT ME NOW!'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 3. Work Page View
function WorkPage({ portfolio }) {
  return (
    <div className="bg-[#020202] text-white min-h-screen pt-28 pb-16">
      <PortfolioGrid items={portfolio} />
    </div>
  );
}

// 4. Contact Page View
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit form');

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#020202] text-white min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-accent font-bold text-xs uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-4xl sm:text-6xl font-black font-heading uppercase text-white tracking-tight">
          Let’s Collaborate
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Have an upcoming project, design inquiry, or opportunity? Send a message and let's bring it to reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-card border border-subtle rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold font-heading uppercase text-white">Direct Contacts</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-surface border border-subtle text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-[11px] text-muted uppercase font-bold">Email Address</span>
                  <a href="mailto:carlos@ozuna.ca" className="hover:text-accent font-medium">carlos@ozuna.ca</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-surface border border-subtle text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-[11px] text-muted uppercase font-bold">Location</span>
                  <span>Laval, QC, Canada</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-subtle rounded-3xl p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">Availability</h4>
            <p className="text-xs text-muted leading-relaxed">
              Available for contract work, agency freelance sprints, and full-time senior design / front-end engineering roles.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 bg-card border border-subtle rounded-3xl p-8 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 border border-accent/30 text-accent rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white uppercase">Message Sent Successfully!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for reaching out. Carlos will review your inquiry and get back to you promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-accent px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider mt-4"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                  placeholder="+1 (514) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Project Details / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                  placeholder="Describe your vision, timeline, and goals..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-accent w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={16} />
                {submitting ? 'Sending Message...' : 'Submit Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

// Main Layout for public pages (hides footer on home page hero)
function MainLayout({ settings, pages, portfolio }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage settings={settings} pages={pages} />} />
          <Route path="/about-me" element={<AboutPage pages={pages} />} />
          <Route path="/work" element={<WorkPage portfolio={portfolio} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      {!isHome && <Footer />}
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
