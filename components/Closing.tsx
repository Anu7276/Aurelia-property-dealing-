"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interestType, setInterestType] = useState<string>("Aurelia One — Penthouse Villa");

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!video || !section) return;

    // IntersectionObserver to only play closing video when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && content) {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        }
      );
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
    }, 3200);
  };

  return (
    <section
      id="enquire"
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0E0D0C] text-[#F5F1E8]"
    >
      {/* Full-bleed courtyard loop video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/hero-courtyard.jpg"
      >
        <source src="/assets/video/courtyard-loop.mp4" type="video/mp4" />
      </video>

      {/* 40% Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Centered Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto text-center px-[6vw] py-24 sm:py-32 flex flex-col items-center"
      >
        <div className="mb-6 flex items-center space-x-3">
          <div className="w-8 h-[1px] bg-[#B8956A]" />
          <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold">
            PRIVATE INVITATION
          </span>
          <div className="w-8 h-[1px] bg-[#B8956A]" />
        </div>

        {/* Centered headline at clamp(2.5rem, 6vw, 6rem) */}
        <h2 className="font-serif font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1.02] tracking-[-0.015em] text-white/95 max-w-4xl mb-12">
          Come home to something extraordinary.
        </h2>

        {/* Outlined "Enquire" button (hover fills cream, dark text, 0.4s) */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-12 sm:px-16 py-4 text-[12px] font-sans font-medium uppercase tracking-[0.25em] text-[#F5F1E8] border border-[#B8956A] overflow-hidden transition-all duration-[400ms] ease-out hover:border-[#F5F1E8] hover:bg-[#F5F1E8] hover:text-[#1B1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8956A]"
          >
            <span className="relative z-10">Enquire</span>
          </button>
        </div>

        <p className="mt-8 text-[11px] font-sans uppercase tracking-[0.2em] text-white/50">
          Discreet consultations worldwide &bull; Private viewings by appointment
        </p>
      </div>

      {/* ======================================================== */}
      {/* ULTRA-LUXURY ARCHITECTURAL SLIDE-OVER SALON DRAWER       */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-all duration-500 animate-fadeIn">
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close salon"
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-full max-w-xl h-full bg-[#141311] text-[#F5F1E8] p-8 sm:p-14 border-l border-[#B8956A]/30 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            {/* Top Bar Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 sm:mb-10">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-[#B8956A]" />
                  <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
                    AURELIA PRIVATE CLIENT DESK
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="group flex items-center space-x-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors"
                >
                  <span>CLOSE</span>
                  <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs group-hover:border-white transition-colors">
                    ✕
                  </span>
                </button>
              </div>

              {formSubmitted ? (
                /* Success Monogram Cipher Confirmation */
                <div className="py-20 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full border border-[#B8956A]/60 flex items-center justify-center text-[#B8956A] font-serif text-3xl italic">
                    A
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold block mb-2">
                      CONFIDENTIAL TRANSMISSION CONFIRMED
                    </span>
                    <h3 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-light text-white mb-4">
                      Inquiry Registered
                    </h3>
                    <p className="font-serif text-[1.1rem] text-white/75 leading-relaxed max-w-md mx-auto">
                      Your dossier has been encrypted and routed directly to the Managing Partner.
                      A discreet private liaison will establish contact within 24 hours.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/10 text-[10px] font-sans uppercase tracking-[0.2em] text-white/40">
                    DOSSIER CODE: #AR-2026-088 &bull; MALIBU BLUFFS
                  </div>
                </div>
              ) : (
                /* Bespoke Architectural Hairline Input Form */
                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif font-light text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-white mb-3">
                      Private Salon Inquiry
                    </h3>
                    <p className="font-serif text-[1.05rem] text-white/70 leading-relaxed font-light">
                      Arrange a confidential presentation, architectural monograph viewing,
                      or off-market estate acquisition consultation.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-8 pt-2">
                    {/* Hairline Input 1: Full Name */}
                    <div className="space-y-2 group">
                      <label className="block text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-medium transition-colors group-focus-within:text-white">
                        Full Name &amp; Title
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Eleanor Vance, Principal"
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-serif text-white placeholder-white/25 focus:outline-none focus:border-[#B8956A] transition-colors"
                      />
                    </div>

                    {/* Hairline Input 2: Confidential Email */}
                    <div className="space-y-2 group">
                      <label className="block text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-medium transition-colors group-focus-within:text-white">
                        Direct Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="principal@advisory.com"
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-serif text-white placeholder-white/25 focus:outline-none focus:border-[#B8956A] transition-colors"
                      />
                    </div>

                    {/* Hairline Input 3: Direct Phone */}
                    <div className="space-y-2 group">
                      <label className="block text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-medium transition-colors group-focus-within:text-white">
                        Direct Contact / Mobile (Confidential)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (310) 000-0000"
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-serif text-white placeholder-white/25 focus:outline-none focus:border-[#B8956A] transition-colors"
                      />
                    </div>

                    {/* Hairline Select: Residence Portfolio */}
                    <div className="space-y-2 group">
                      <label className="block text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-medium transition-colors group-focus-within:text-white">
                        Residence of Interest
                      </label>
                      <div className="relative">
                        <select
                          value={interestType}
                          onChange={(e) => setInterestType(e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-base sm:text-lg font-serif text-white focus:outline-none focus:border-[#B8956A] transition-colors appearance-none cursor-pointer pr-8"
                        >
                          <option value="Aurelia One — Penthouse Villa" className="bg-[#141311] text-white">
                            Aurelia One — Penthouse Sanctuary (12,400 sq ft)
                          </option>
                          <option value="Aurelia Verde — Cliffside Estate" className="bg-[#141311] text-white">
                            Aurelia Verde — Botanical Cliffside Estate (8,600 sq ft)
                          </option>
                          <option value="The Coastal Monolith Suite" className="bg-[#141311] text-white">
                            The Coastal Monolith Suite (6,200 sq ft)
                          </option>
                          <option value="Entire Compound Acquisition" className="bg-[#141311] text-white">
                            Entire Estate Portfolio Acquisition
                          </option>
                        </select>
                        <div className="absolute right-0 bottom-4 pointer-events-none text-[#B8956A] text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Architectural Consultation Options */}
                    <div className="pt-2 space-y-3">
                      <span className="block text-[10px] font-sans uppercase tracking-[0.22em] text-white/50">
                        REQUESTED ARRANGEMENT:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-sans uppercase tracking-[0.16em] text-white/80">
                        <label className="flex items-center space-x-2.5 cursor-pointer py-1.5 hover:text-[#B8956A] transition-colors">
                          <input type="checkbox" defaultChecked className="accent-[#B8956A] w-3.5 h-3.5" />
                          <span>Private Site Tour</span>
                        </label>
                        <label className="flex items-center space-x-2.5 cursor-pointer py-1.5 hover:text-[#B8956A] transition-colors">
                          <input type="checkbox" defaultChecked className="accent-[#B8956A] w-3.5 h-3.5" />
                          <span>Monograph Dossier</span>
                        </label>
                      </div>
                    </div>

                    {/* Prestige Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="group w-full py-4 border border-[#B8956A] bg-transparent text-[#F5F1E8] text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.28em] font-medium transition-all duration-500 hover:bg-[#B8956A] hover:text-[#1B1A17] flex items-center justify-center space-x-3 cursor-pointer"
                      >
                        <span>Request Private Acquisition Salon</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Footer Details */}
            <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-white/40 gap-2">
              <span>CONFIDENTIAL &amp; PRIVILEGED</span>
              <span>AURELIA REALTY ADVISORY &bull; ZURICH / LA</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}