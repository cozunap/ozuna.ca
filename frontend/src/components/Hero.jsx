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

      {/* Hero Content matching ozuna.ca elementor-11 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16 flex flex-col items-center justify-center">
        {/* Animated Main Heading (elementor-element-cf6323b) */}
        <h1
          className="text-[30px] sm:text-[40px] text-white uppercase tracking-[2px] leading-tight select-none animate-moveUpDown drop-shadow-lg"
          style={{ fontFamily: '"Archivo Black", sans-serif', fontWeight: 400 }}
        >
          Welcome to
          <br />
          <span style={{ color: '#F29611', fontWeight: 900 }}>Carlos Ozuna's</span> portfolio
        </h1>

        {/* Action Buttons matching ozuna.ca elementor-element-a216577 & ce8460d */}
        <div className="mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4 font-raleway">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ff1d25] hover:bg-[#a40404] text-white font-bold text-[12px] uppercase leading-[2em] tracking-[1px] px-6 sm:px-8 py-1 sm:py-1.5 rounded-full shadow-md transition-all animate-moveUpDown inline-block"
          >
            Download CV
          </a>

          <Link
            to="/work"
            className="bg-[#ff1d25] hover:bg-[#a40404] text-white font-bold text-[12px] uppercase leading-[2em] tracking-[1px] px-6 sm:px-8 py-1 sm:py-1.5 rounded-full shadow-md transition-all animate-moveUpDown inline-block"
          >
            go to portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
