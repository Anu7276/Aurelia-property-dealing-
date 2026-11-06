"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { useSmoothScroll } from "./SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function FeaturedResidence() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const header = headerRef.current;

    if (!container || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal header
      if (header) {
        gsap.fromTo(
          header.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Project blocks reveal with clip-path wipe
      const blocks = container.querySelectorAll(".residence-card");
      blocks.forEach((block) => {
        const imgWrap = block.querySelector(".residence-img-reveal");
        const details = block.querySelector(".residence-details");

        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 72%",
                once: true,
              },
            }
          );
        }

        if (details) {
          gsap.fromTo(
            details.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 70%",
                once: true,
              },
            }
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="residences"
      ref={containerRef}
      className="relative z-20 w-full min-h-screen bg-[#F5F1E8] py-28 lg:py-40 px-[6vw] text-[#1B1A17] overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Selected Works Header */}
        <div ref={headerRef} className="mb-20 sm:mb-28 border-b border-[#1B1A17]/10 pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-[1px] bg-[#B8956A]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold">
                CURATED ARCHITECTURAL PORTFOLIO
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E]">
              <span>AURELIA</span>
              <span className="w-5 h-[1px] bg-[#1B1A17]/20" />
              <span className="text-[#B8956A]">02 / PROJECTS</span>
            </div>
          </div>

          <h2 className="font-serif font-light text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.025em] text-[#1B1A17]">
            Selected works
          </h2>
        </div>

        {/* Project 1: Aurelia One */}
        <div className="residence-card grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative mb-36 sm:mb-48">
          {/* Left Column: Image with Video-like Ease-Out Drift */}
          <div className="lg:col-span-5 lg:col-start-1">
            <div className="residence-img-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-md aspect-[3/4] w-full max-w-[480px] mx-auto will-change-transform group">
              <PictureImage
                src="/assets/images/aurelia-one"
                alt="Aurelia One flagship residence"
                className="w-full h-full"
                sizes="(max-width: 1024px) 90vw, 40vw"
                cinematic={true}
              />
            </div>
          </div>

          {/* Right Column: Editorial Details */}
          <div className="residence-details lg:col-span-6 lg:col-start-7 space-y-8">
            <div>
              <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold block mb-3">
                FLAGSHIP PENTHOUSE SANCTUARY
              </span>
              <h3 className="font-serif font-light text-[clamp(3.2rem,6.5vw,5.8rem)] leading-[0.96] tracking-[-0.02em] text-[#1B1A17]">
                Aurelia One
              </h3>
            </div>

            <p className="font-serif text-[clamp(1.2rem,1.7vw,1.55rem)] text-[#2C2A26] font-light leading-relaxed max-w-xl">
              Suspended in absolute privacy above the Pacific horizon, Aurelia One merges
              Portuguese Moleanos limestone planes, bronze-profile joinery, and expansive
              acoustic solariums for quiet, timeless contemplation.
            </p>

            {/* Hairline-divided row with 3 key facts */}
            <div className="grid grid-cols-3 border-y border-[#1B1A17]/15 py-6 my-8 divide-x divide-[#1B1A17]/15">
              <div className="pr-4 text-left">
                <span className="block text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] mb-1">
                  Bedrooms
                </span>
                <span className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light text-[#1B1A17]">
                  05 Suites
                </span>
              </div>
              <div className="px-4 text-left">
                <span className="block text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] mb-1">
                  Primary Area
                </span>
                <span className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light text-[#1B1A17]">
                  12,400 sq ft
                </span>
              </div>
              <div className="pl-4 text-left">
                <span className="block text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] mb-1">
                  Possession
                </span>
                <span className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light text-[#1B1A17]">
                  Winter 2027
                </span>
              </div>
            </div>

            {/* Request a private viewing text link */}
            <div className="pt-2">
              <a
                href="#enquire"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#enquire");
                }}
                className="group relative inline-flex items-center space-x-3 text-[12px] sm:text-[13px] font-sans font-medium uppercase tracking-[0.25em] text-[#1B1A17] py-2"
              >
                <span className="relative">
                  Request a private viewing
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1B1A17] origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:bg-[#B8956A]" />
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1 text-[#B8956A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Project 2: Aurelia Verde */}
        <div className="residence-card grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
          {/* Left Column: Details */}
          <div className="residence-details lg:col-span-6 lg:col-start-1 order-2 lg:order-1 space-y-8">
            <div>
              <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold block mb-3">
                02 — BOTANICAL CLOISTERED VILLAS
              </span>
              <h3 className="font-serif font-light text-[clamp(3.2rem,6.5vw,5.8rem)] leading-[0.96] tracking-[-0.02em] text-[#1B1A17]">
                Aurelia Verde
              </h3>
            </div>

            <p className="font-serif text-[clamp(1.2rem,1.7vw,1.55rem)] text-[#2C2A26] font-light leading-relaxed max-w-xl">
              Cascading private villas nestled in tiered limestone cloisters. Open botanical
              terraces, shaded teak loggias, and reflecting pools open to meet coastal breezes
              and sunset horizons.
            </p>

            <div className="grid grid-cols-3 border-y border-[#1B1A17]/15 py-6 my-8 divide-x divide-[#1B1A17]/15">
              <div className="pr-4 text-left">
                <span className="block text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] mb-1">
                  Bedrooms
                </span>
                <span className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light text-[#1B1A17]">
                  04 Suites
                </span>
              </div>
              <div className="px-4 text-left">
                <span className="block text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] mb-1">
                  Primary Area
                </span>
                <span className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light text-[#1B1A17]">
                  8,600 sq ft
                </span>
              </div>
              <div className="pl-4 text-left">
                <span className="block text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] mb-1">
                  Possession
                </span>
                <span className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light text-[#1B1A17]">
                  Spring 2027
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#enquire"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#enquire");
                }}
                className="group relative inline-flex items-center space-x-3 text-[12px] sm:text-[13px] font-sans font-medium uppercase tracking-[0.25em] text-[#1B1A17] py-2"
              >
                <span className="relative">
                  Explore villa specifications
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1B1A17] origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:bg-[#B8956A]" />
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1 text-[#B8956A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Image with Video-like Ease-Out Drift */}
          <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <div className="residence-img-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-md aspect-[3/4] w-full max-w-[480px] mx-auto will-change-transform group">
              <PictureImage
                src="/assets/images/hero-courtyard"
                alt="Aurelia Verde contemporary villa courtyard"
                className="w-full h-full"
                sizes="(max-width: 1024px) 90vw, 40vw"
                cinematic={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
