"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

export default function Nav() {
  const [isLightSection, setIsLightSection] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    // ScrollTrigger to detect when user enters cream / light sections
    const st1 = ScrollTrigger.create({
      trigger: "#philosophy",
      start: "top top+=80",
      endTrigger: "#gallery",
      end: "top top+=80",
      onEnter: () => setIsLightSection(true),
      onLeaveBack: () => setIsLightSection(false),
      onEnterBack: () => setIsLightSection(true),
      onLeave: () => setIsLightSection(false),
    });

    const st2 = ScrollTrigger.create({
      trigger: "footer",
      start: "top top+=80",
      onEnter: () => setIsLightSection(true),
      onLeaveBack: () => setIsLightSection(false),
      onEnterBack: () => setIsLightSection(true),
      onLeave: () => setIsLightSection(false),
    });

    return () => {
      st1.kill();
      st2.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollTo(target);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[80px] transition-all duration-500 pointer-events-none ${
        isLightSection
          ? "bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#1B1A17]/10 shadow-xs text-[#1B1A17]"
          : "bg-black/40 backdrop-blur-md border-b border-white/10 shadow-sm text-white"
      }`}
    >
      <div className="max-w-[1920px] h-full mx-auto px-[6vw] flex items-center justify-between pointer-events-auto">
        {/* Left: Wordmark with EST. 2024 */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#hero-top")}
          className="group flex flex-col text-left transition-opacity duration-300 hover:opacity-75 focus-visible:opacity-100"
          aria-label="Aurelia Home"
        >
          <span className="font-serif text-[clamp(1.2rem,1.8vw,1.65rem)] font-light tracking-[0.32em] uppercase leading-tight">
            AURELIA
          </span>
          <span
            className={`text-[9px] font-sans uppercase tracking-[0.32em] mt-0.5 transition-colors ${
              isLightSection ? "text-[#6F6A5E]" : "text-white/70"
            }`}
          >
            EST. 2024
          </span>
        </a>

        {/* Right: Navigation items */}
        <nav className="flex items-center space-x-6 sm:space-x-8 lg:space-x-10 text-[11px] sm:text-[12px] font-sans font-medium uppercase tracking-[0.22em]">
          <a
            href="#philosophy"
            onClick={(e) => handleNavClick(e, "#philosophy")}
            className="py-1 transition-opacity duration-300 hover:opacity-70 focus-visible:opacity-100"
          >
            PHILOSOPHY
          </a>
          <a
            href="#residences"
            onClick={(e) => handleNavClick(e, "#residences")}
            className="py-1 transition-opacity duration-300 hover:opacity-70 focus-visible:opacity-100"
          >
            PROJECTS
          </a>
          <a
            href="#craft"
            onClick={(e) => handleNavClick(e, "#craft")}
            className={`border px-3.5 py-1 rounded-[1px] transition-all duration-300 focus-visible:opacity-100 ${
              isLightSection
                ? "border-[#1B1A17] text-[#1B1A17] hover:bg-[#1B1A17] hover:text-[#F5F1E8]"
                : "border-white/70 text-white hover:bg-white hover:text-black"
            }`}
          >
            CRAFT
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, "#gallery")}
            className="py-1 transition-opacity duration-300 hover:opacity-70 focus-visible:opacity-100"
          >
            GALLERY
          </a>
          <a
            href="#enquire"
            onClick={(e) => handleNavClick(e, "#enquire")}
            className="py-1 transition-opacity duration-300 hover:opacity-70 focus-visible:opacity-100"
          >
            ENQUIRE
          </a>
        </nav>
      </div>
    </header>
  );
}
