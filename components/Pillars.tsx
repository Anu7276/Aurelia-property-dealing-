"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface PillarData {
  index: string;
  word: string;
  tag: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  layout: "architecture" | "living" | "light";
}

const pillarsData: PillarData[] = [
  {
    index: "01",
    word: "Architecture",
    tag: "MONUMENTAL FORM & TIMELESS PROPORTION",
    description:
      "Sculpted stone and restrained geometries elevate structural mass into quiet, permanent contemplation across the landscape.",
    imageSrc: "/assets/images/architecture",
    imageAlt: "Aurelia modernist tower architecture",
    layout: "architecture",
  },
  {
    index: "02",
    word: "Living",
    tag: "THE ART OF INTENTIONAL REPOSE",
    description:
      "Sanctuaries of effortless calm where cloistered terraces open toward sunken water basins and endless sky.",
    imageSrc: "/assets/images/living",
    imageAlt: "Aurelia pool courtyard and living sanctuary",
    layout: "living",
  },
  {
    index: "03",
    word: "Light",
    tag: "LUMINESCENT ARCS & SHADOWPLAY",
    description:
      "Orchestrated solar apertures filter raw radiance across natural plaster, shifting the atmosphere through every hour of the day.",
    imageSrc: "/assets/images/light",
    imageAlt: "Aurelia sunlit interior living space",
    layout: "light",
  },
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = container.querySelectorAll<HTMLElement>(".pillar-section");

      sections.forEach((section) => {
        const imageReveal = section.querySelector<HTMLElement>(".pillar-image-reveal");
        const img = section.querySelector<HTMLElement>("img");
        const parallaxTarget = section.querySelector<HTMLElement>(".pillar-parallax");
        const textBlock = section.querySelector<HTMLElement>(".pillar-text");

        // 1. Clip path reveal
        if (imageReveal && img) {
          gsap.fromTo(
            imageReveal,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );
        }

        // 2. Parallax: y from -8% to 8%
        if (parallaxTarget) {
          gsap.fromTo(
            parallaxTarget,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // 3. Text entrance
        if (textBlock) {
          gsap.fromTo(
            textBlock,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
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
    <div ref={containerRef} className="relative z-20 w-full bg-[#F5F1E8]">
      {pillarsData.map((pillar, idx) => {
        const isArch = pillar.layout === "architecture";
        const isLiving = pillar.layout === "living";
        const isLight = pillar.layout === "light";

        return (
          <section
            key={pillar.index}
            className="pillar-section relative min-h-screen w-full flex flex-col justify-center px-[6vw] py-20 lg:py-28 overflow-hidden bg-[#F5F1E8] text-[#1B1A17]"
          >
            {/* Top Index and Hairline */}
            <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between pb-6 mb-8 lg:mb-12 border-b border-[#1B1A17]/10">
              <span className="text-[12px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold">
                {pillar.index} / 03
              </span>
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E]">
                {pillar.tag}
              </span>
            </div>

            {/* Main Content Grid: 12 Columns so elements never collide */}
            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
              {/* Architecture: Word left, Image right, Text left */}
              {isArch && (
                <>
                  {/* Giant Word: positioned above in z-index, overlapping only ~15% on large screens */}
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-[-2vw] lg:mb-[-4vw]">
                    <h3 className="font-serif font-light text-[clamp(4.5rem,15vw,18rem)] leading-[0.85] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Text Column with 3rem gap from image */}
                  <div className="pillar-text lg:col-span-5 lg:col-start-1 z-20 space-y-4">
                    <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
                      STRUCTURE &amp; MONOLITH
                    </span>
                    <p className="font-serif text-[1rem] leading-[1.7] text-[#6F6A5E] max-w-[34ch]">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Image Column */}
                  <div className="lg:col-span-5 lg:col-start-8 z-10">
                    <div className="pillar-parallax will-change-transform flex justify-end">
                      <div className="pillar-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-sm w-full max-w-[clamp(260px,28vw,460px)] max-h-[80vh] aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 85vw, 28vw"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Living: Image left, Word right, Text right */}
              {isLiving && (
                <>
                  {/* Giant Word Right */}
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-[-2vw] lg:mb-[-4vw] lg:text-right">
                    <h3 className="font-serif font-light text-[clamp(4.5rem,15vw,18rem)] leading-[0.85] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Image Column Left */}
                  <div className="lg:col-span-5 lg:col-start-1 z-10 order-2 lg:order-1">
                    <div className="pillar-parallax will-change-transform flex justify-start">
                      <div className="pillar-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-sm w-full max-w-[clamp(260px,28vw,460px)] max-h-[80vh] aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 85vw, 28vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Column Right with 3rem gap */}
                  <div className="pillar-text lg:col-span-5 lg:col-start-8 z-20 space-y-4 order-1 lg:order-2">
                    <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
                      SANCTUARY &amp; REPOSE
                    </span>
                    <p className="font-serif text-[1rem] leading-[1.7] text-[#6F6A5E] max-w-[34ch]">
                      {pillar.description}
                    </p>
                  </div>
                </>
              )}

              {/* Light: Word left, Image center-right, Text left */}
              {isLight && (
                <>
                  {/* Giant Word Left */}
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-[-2vw] lg:mb-[-4vw]">
                    <h3 className="font-serif font-light text-[clamp(4.5rem,15vw,18rem)] leading-[0.85] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Text Column Left with 3rem gap */}
                  <div className="pillar-text lg:col-span-5 lg:col-start-1 z-20 space-y-4">
                    <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
                      SOLAR GEOMETRY
                    </span>
                    <p className="font-serif text-[1rem] leading-[1.7] text-[#6F6A5E] max-w-[34ch]">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Image Column Center-Right */}
                  <div className="lg:col-span-5 lg:col-start-7 z-10">
                    <div className="pillar-parallax will-change-transform flex justify-start lg:justify-center">
                      <div className="pillar-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-sm w-full max-w-[clamp(260px,28vw,460px)] max-h-[80vh] aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 85vw, 28vw"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Hairline separator if not last */}
            {idx < pillarsData.length - 1 && (
              <div className="w-full max-w-[1920px] mx-auto mt-20 pt-8 border-b border-[#1B1A17]/10" />
            )}
          </section>
        );
      })}
    </div>
  );
}
