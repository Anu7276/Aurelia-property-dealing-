"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

export default function Nav() {
  const [isLightSection, setIsLightSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    scrollTo(target);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] sm:h-[80px] transition-all duration-500 pointer-events-none ${
          isLightSection
            ? "bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#1B1A17]/10 shadow-xs text-[#1B1A17]"
            : "bg-black/40 backdrop-blur-md border-b border-white/10 shadow-sm text-white"
        }`}
      >
        <div className="max-w-[1920px] h-full mx-auto px-5 sm:px-8 lg:px-[6vw] flex items-center justify-between pointer-events-auto">
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

          {/* Right: Desktop Navigation items (hidden on mobile, visible on md+) */}
          <nav className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-10 text-[11px] sm:text-[12px] font-sans font-medium uppercase tracking-[0.22em]">
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

          {/* Mobile Menu Button (visible on mobile < md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex items-center justify-center p-2 rounded-[2px] transition-colors ${
              isLightSection ? "text-[#1B1A17]" : "text-white"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 origin-right ${
                  mobileMenuOpen ? "w-6 -rotate-45 translate-y-[1px]" : "w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "w-4"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 origin-right ${
                  mobileMenuOpen ? "w-6 rotate-45 -translate-y-[1px]" : "w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Luxury Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#161513]/98 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col justify-between px-6 pt-28 pb-10 text-[#F5F1E8] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B8956A] font-semibold">
            NAVIGATION DIRECTORY
          </span>
          <nav className="flex flex-col space-y-5 font-serif text-[clamp(1.8rem,7vw,2.5rem)] font-light tracking-wide">
            <a
              href="#philosophy"
              onClick={(e) => handleNavClick(e, "#philosophy")}
              className="flex items-baseline justify-between border-b border-white/10 pb-3 hover:text-[#B8956A] transition-colors"
            >
              <span>Philosophy</span>
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#B8956A]">01</span>
            </a>
            <a
              href="#residences"
              onClick={(e) => handleNavClick(e, "#residences")}
              className="flex items-baseline justify-between border-b border-white/10 pb-3 hover:text-[#B8956A] transition-colors"
            >
              <span>Projects</span>
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#B8956A]">02</span>
            </a>
            <a
              href="#craft"
              onClick={(e) => handleNavClick(e, "#craft")}
              className="flex items-baseline justify-between border-b border-white/10 pb-3 hover:text-[#B8956A] transition-colors"
            >
              <span>Craft</span>
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#B8956A]">03</span>
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "#gallery")}
              className="flex items-baseline justify-between border-b border-white/10 pb-3 hover:text-[#B8956A] transition-colors"
            >
              <span>Gallery</span>
              <span className="font-sans text-[11px] tracking-[0.25em] text-[#B8956A]">04</span>
            </a>
            <a
              href="#enquire"
              onClick={(e) => handleNavClick(e, "#enquire")}
              className="flex items-baseline justify-between border-b border-white/10 pb-3 text-[#B8956A] hover:text-white transition-colors"
            >
              <span>Enquire</span>
              <span className="font-sans text-[11px] tracking-[0.25em] text-white/50">05</span>
            </a>
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.22em] text-white/60">
            <span>AURELIA ESTATES</span>
            <span>MALIBU BLUFFS</span>
          </div>
          <p className="text-[12px] font-sans tracking-[0.15em] text-white/40">
            enquiries@aurelia-estates.com
          </p>
        </div>
      </div>
    </>
  );
}
