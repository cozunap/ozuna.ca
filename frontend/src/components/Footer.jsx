// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink } from 'lucide-react';
import BehanceIcon from './icons/BehanceIcon';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dominant border-t border-subtle mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/cozuna-red-logo.svg"
                alt="Carlos Ozuna"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'inline-block';
                }}
              />
              <span className="hidden text-2xl font-black text-white font-heading">
                C<span className="text-accent">OZUNA</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Senior Graphic Designer & Full-Stack Web Developer based in Laval, Quebec. Over 20 years of crafting high-impact branding, custom websites, vehicle graphics, and print media.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about-me" className="text-slate-400 hover:text-accent transition-colors">About Me</Link></li>
              <li><Link to="/work" className="text-slate-400 hover:text-accent transition-colors">Portfolio & Work</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="text-slate-400 hover:text-accent transition-colors">Admin CMS</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.behance.net/cozuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white hover:text-[#0057ff] flex items-center gap-2 transition-colors group"
                >
                  <BehanceIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Behance Portfolio</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/downloads/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  Download Curriculum Vitae <ExternalLink size={13} />
                </a>
              </li>
              <li>
                <span className="text-xs text-muted block mt-4">Location: Laval, QC, Canada</span>
                <span className="text-xs text-accent font-semibold block">Open for Projects & Roles</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Carlos Ozuna. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
