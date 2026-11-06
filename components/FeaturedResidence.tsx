"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { useSmoothScroll } from "./SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function FeaturedResidence() {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const details = detailsRef.current;

    if (!container || !imageWrapper || !details || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image reveal on scroll
      gsap.fromTo(
        imageWrapper,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
            once: true,
          },
        }
      );

      // Details reveal
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
            trigger: container,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="residences"
      ref={containerRef}
      className="relative z-20 w-full min-h-screen bg-[#F5F1E8] py-28 lg:py-36 px-[6vw] text-[#1B1A17] overflow-hidden flex flex-col justify-center"
    >
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center space-x-4 mb-16 pb-6 border-b border-[#1B1A17]/10">
          <div className="w-8 h-[1px] bg-[#B8956A]" />
          <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.25em] text-[#6F6A5E] font-medium">
            FLAGSHIP RESIDENCE — AURELIA ONE
          </span>
        </div>

        {/* 12-Column Grid: Image 5 cols (left), Details 5 cols (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image (5 cols) */}
          <div className="lg:col-span-5 lg:col-start-1">
            <div
              ref={imageWrapperRef}
              className="overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-md aspect-[3/4] w-full max-w-[480px] mx-auto will-change-transform"
            >
              <PictureImage
                src="/assets/images/aurelia-one"
                alt="Aurelia One flagship residence"
                className="w-full h-full"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
          </div>

          {/* Right Column: Details (5 cols) */}
          <div
            ref={detailsRef}
            className="lg:col-span-6 lg:col-start-7 space-y-8"
          >
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block mb-3">
                PRIMARY PENTHOUSE SANCTUARY
              </span>
              <h2 className="font-serif font-light text-[clamp(3rem,6vw,6rem)] leading-[0.96] tracking-[-0.02em] text-[#1B1A17]">
                Aurelia One
              </h2>
            </div>

            {/* 2-line description */}
            <p className="font-serif text-[1.125rem] sm:text-[1.25rem] text-[#6F6A5E] leading-relaxed max-w-xl">
              Suspended in absolute privacy above the horizon, Aurelia One merges
              monolithic limestone planes with expansive glass solariums for timeless contemplation.
            </p>

            {/* Hairline-divided row with 3 key facts */}
            <div className="grid grid-cols-3 border-y border-[#1B1A17]/15 py-6 my-8 divide-x divide-[#1B1A17]/15">
              <div className="pr-4 text-left">
                <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] mb-1">
                  Bedrooms
                </span>
                <span className="font-serif text-[clamp(1.2rem,2.2vw,1.75rem)] font-light text-[#1B1A17]">
                  05 Suites
                </span>
              </div>
              <div className="px-4 text-left">
                <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] mb-1">
                  Area
                </span>
                <span className="font-serif text-[clamp(1.2rem,2.2vw,1.75rem)] font-light text-[#1B1A17]">
                  12,400 sq ft
                </span>
              </div>
              <div className="pl-4 text-left">
                <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] mb-1">
                  Possession
                </span>
                <span className="font-serif text-[clamp(1.2rem,2.2vw,1.75rem)] font-light text-[#1B1A17]">
                  Winter 2027
                </span>
              </div>
            </div>

            {/* Request a private viewing text link with animated underline */}
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
      </div>
    </section>
  );
}
