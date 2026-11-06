"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

export default function Nav() {
  const [isPastHero, setIsPastHero] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#hero-trigger",
      start: "bottom top+=72",
      onEnter: () => setIsPastHero(true),
      onLeaveBack: () => setIsPastHero(false),
    });

    return () => {
      st.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollTo(target);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] transition-all duration-500 pointer-events-none bg-transparent ${
        isPastHero ? "border-b border-[#1B1A17]/10" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1920px] h-full mx-auto px-[6vw] flex items-center justify-between pointer-events-auto mix-blend-difference text-[#F5F1E8]">
        {/* Wordmark with EST. 2024 badge */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#hero-top")}
          className="group flex flex-col text-left transition-opacity duration-300 hover:opacity-75 focus-visible:opacity-100"
          aria-label="Aurelia Home"
        >
          <span className="font-serif text-[clamp(1.2rem,1.8vw,1.6rem)] font-light tracking-[0.28em] uppercase leading-none">
            AURELIA
          </span>
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] opacity-70 mt-1">
            EST. 2024
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 sm:space-x-10 text-[11px] sm:text-[12px] font-sans font-medium uppercase tracking-[0.22em]">
          <a
            href="#philosophy"
            onClick={(e) => handleNavClick(e, "#philosophy")}
            className="relative py-1 transition-opacity duration-300 hover:opacity-70 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
          >
            Philosophy
          </a>
          <a
            href="#residences"
            onClick={(e) => handleNavClick(e, "#residences")}
            className="relative py-1 transition-opacity duration-300 hover:opacity-70 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
          >
            Projects
          </a>
          <a
            href="#craft"
            onClick={(e) => handleNavClick(e, "#craft")}
            className="hidden sm:inline-block relative py-1 transition-opacity duration-300 hover:opacity-70 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
          >
            Craft
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, "#gallery")}
            className="relative py-1 transition-opacity duration-300 hover:opacity-70 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
          >
            Gallery
          </a>
          <a
            href="#enquire"
            onClick={(e) => handleNavClick(e, "#enquire")}
            className="relative py-1 transition-opacity duration-300 hover:opacity-70 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
          >
            Enquire
          </a>
        </nav>
      </div>
    </header>
  );
}
