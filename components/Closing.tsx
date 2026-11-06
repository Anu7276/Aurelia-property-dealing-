"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
    }, 2500);
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
        className="relative z-10 max-w-5xl mx-auto text-center px-[6vw] py-24 flex flex-col items-center"
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

      {/* Private Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-md bg-[#F5F1E8] text-[#1B1A17] p-8 sm:p-10 rounded-[2px] shadow-2xl border border-[#B8956A]/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-xs uppercase tracking-[0.2em] text-[#6F6A5E] hover:text-[#1B1A17] focus-visible:outline-none"
            >
              Close [✕]
            </button>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <span className="text-[#B8956A] text-2xl font-serif block mb-3">✓</span>
                <h3 className="font-serif text-2xl font-light mb-2">Inquiry Registered</h3>
                <p className="text-sm font-sans text-[#6F6A5E] tracking-wide">
                  Our private client advisory will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block mb-2">
                  CONFIDENTIAL DOSSIER
                </span>
                <h3 className="font-serif text-3xl font-light text-[#1B1A17] mb-6">
                  Private Salon Inquiry
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#EFE9DB] border border-[#1B1A17]/15 px-3 py-2 text-sm font-serif text-[#1B1A17] focus:outline-none focus:border-[#B8956A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] mb-1">
                      Direct Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="vance@residence.com"
                      className="w-full bg-[#EFE9DB] border border-[#1B1A17]/15 px-3 py-2 text-sm font-serif text-[#1B1A17] focus:outline-none focus:border-[#B8956A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] mb-1">
                      Residence of Interest
                    </label>
                    <select className="w-full bg-[#EFE9DB] border border-[#1B1A17]/15 px-3 py-2 text-sm font-serif text-[#1B1A17] focus:outline-none focus:border-[#B8956A]">
                      <option>Aurelia One — Penthouse Villa</option>
                      <option>The Coastal Tower Suite</option>
                      <option>Courtyard Ground Pavilion</option>
                      <option>Entire Estate Acquisition</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#1B1A17] text-[#F5F1E8] py-3 text-[11px] font-sans uppercase tracking-[0.25em] hover:bg-[#B8956A] transition-colors"
                  >
                    Submit Private Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
