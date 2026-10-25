// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import Footer from './components/Footer';
import Login from './admin/Login';
import AdminDashboard from './admin/AdminDashboard';
import { Mail, MapPin, Send, CheckCircle2, Download, ExternalLink } from 'lucide-react';

// 1. Home Page View
function HomePage({ settings, pages }) {
  const homePage = pages.find((p) => p.slug === 'home');
  const heroSection = homePage?.sections?.find((s) => s.id === 'hero');

  return <Hero data={heroSection} heroVideo={settings?.heroVideo} />;
}

// 2. About Me Page View
function AboutPage({ pages }) {
  const page = pages.find((p) => p.slug === 'about-me');
  const bio = page?.sections?.find((s) => s.id === 'about-hero');
  const skills = page?.sections?.find((s) => s.id === 'skills');

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          Biography & Background
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-heading uppercase text-white tracking-tight">
          About Carlos Ozuna
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
          {bio?.paragraph || "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms."}
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card border border-subtle rounded-3xl p-8 space-y-4">
          <h3 className="text-xl font-bold font-heading text-white uppercase">My Philosophy</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Over the years, I’ve learned that great design starts with empathy. I ask questions, respect deadlines, and keep things simple and purposeful. Whether it’s a logo, a brochure, or a digital ad, my goal is to deliver work that feels both meaningful and effortless.
          </p>
          <div className="pt-4">
            <a
              href="/downloads/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              <Download size={16} /> Download Curriculum Vitae
            </a>
          </div>
        </div>

        <div className="bg-card border border-subtle rounded-3xl p-8 space-y-4">
          <h3 className="text-xl font-bold font-heading text-white uppercase">What I Bring</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {(skills?.items || [
              'Mastery of Adobe Creative Cloud (Photoshop, InDesign, Illustrator, Premiere)',
              'Modern Web Development (WordPress, CSS3, React, Tailwind CSS)',
              'Large Format Print, Vehicle Wraps & Digital Signage Production',
              'Fluent multilingual communication in English, French, and Spanish'
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// 3. Work Page View
function WorkPage({ portfolio }) {
  return (
    <div className="pt-28 pb-16">
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
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
    <div className="min-h-screen flex flex-col bg-dominant selection:bg-accent selection:text-white">
      <Routes>
        {/* Admin Routes without main site header/footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public Routes with Navigation & Footer */}
        <Route
          path="/*"
          element={
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
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
