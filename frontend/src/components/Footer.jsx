// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Monitor, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#a40404] text-[#ebebeb] py-10 px-6 sm:px-12 font-raleway transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-start">
        {/* Column 1: Me */}
        <div className="space-y-3">
          <h2 className="text-[18px] sm:text-[19px] font-bold text-[#ebebeb] tracking-wide">
            Me
          </h2>
          <p className="text-[13px] sm:text-[14px] font-semibold text-[#ebebeb] leading-[1.8] tracking-[1.5px] max-w-sm">
            My experiences in project management will exceed your expectations. I have extensive knowledge of Adobe Creative Suite.
          </p>
        </div>

        {/* Column 2: I do! */}
        <div className="space-y-3">
          <h2 className="text-[18px] sm:text-[19px] font-bold text-[#ebebeb] tracking-wide">
            I do!
          </h2>
          <ul className="space-y-2 text-[14px] font-semibold">
            <li className="flex items-center gap-2.5 text-[#ebebeb] hover:text-[#ff1d25] transition-colors cursor-pointer">
              <Code size={16} className="text-[#ebebeb]" />
              <span>Web development</span>
            </li>
            <li className="flex items-center gap-2.5 text-[#ebebeb] hover:text-[#ff1d25] transition-colors cursor-pointer">
              <Monitor size={16} className="text-[#ebebeb]" />
              <span>Graphic design</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Call Me! */}
        <div className="space-y-3">
          <h2 className="text-[18px] sm:text-[19px] font-bold text-[#ebebeb] tracking-wide">
            Call Me!
          </h2>
          <ul className="space-y-2 text-[14px] font-semibold">
            <li>
              <a
                href="tel:438-393-9465"
                className="flex items-center gap-2.5 text-white hover:text-[#ff1d25] transition-colors"
              >
                <PhoneCall size={16} className="text-white" />
                <span>438-393‑9465</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Brand Logo */}
        <div className="flex justify-start md:justify-end items-center pt-2 md:pt-0">
          <Link to="/">
            <img
              src="/images/cozuna-red-logo.svg"
              alt="Cozuna red logo"
              className="w-[180px] sm:w-[220px] h-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
