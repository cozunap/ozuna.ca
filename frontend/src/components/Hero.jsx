// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ data, heroVideo }) {
  const title = data?.title || "WELCOME TO CARLOS OZUNA'S PORTFOLIO";
  const subtitle = data?.subtitle || "WEB | GRAPHIC DESIGN | PRINTING | DIGITAL SIGNAGE";
  const cvUrl = data?.cvUrl || "/downloads/CV.pdf";
  const videoSrc = heroVideo || "/videos/hero-background.mp4";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-dominant">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 filter brightness-75 contrast-125"
          src={videoSrc}
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dominant via-dominant/40 to-dominant/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent font-semibold text-xs tracking-widest uppercase mb-6"
        >
          Carlos Ozuna Portfolio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-white uppercase leading-none drop-shadow-2xl"
        >
          {title.split("CARLOS OZUNA").map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-accent">CARLOS OZUNA</span>}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm sm:text-lg md:text-xl font-medium tracking-widest text-slate-300 uppercase max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Dual Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-accent px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download CV
          </a>

          <Link
            to="/work"
            className="w-full sm:w-auto bg-card hover:bg-cardHover text-white border border-subtle hover:border-slate-400 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all"
          >
            Go To Portfolio
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[10px] tracking-widest uppercase text-slate-400">Scroll Down</span>
        <div className="w-1 h-6 rounded-full bg-accent animate-pulse" />
      </div>
    </section>
  );
}
