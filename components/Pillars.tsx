"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CraftBlock {
  index: string;
  word: string;
  tag: string;
  subtitle?: string;
  description: string;
  materials: string;
  imageSrc: string;
  imageAlt: string;
  layout: "architecture" | "living" | "light";
}

const craftBlocks: CraftBlock[] = [
  {
    index: "01",
    word: "Architecture",
    subtitle: "A monograph in...",
    tag: "MONUMENTAL PROPORTIONS & MASS",
    description:
      "Sculpted stone and restrained geometries elevate structural mass into quiet, permanent contemplation across the landscape.",
    materials: "MOLEANOS LIMESTONE • BRONZE JOISTS • STRUCTURAL GLASS",
    imageSrc: "/assets/images/architecture",
    imageAlt: "Aurelia modernist tower architecture",
    layout: "architecture",
  },
  {
    index: "02",
    word: "Material & Living",
    tag: "THE ART OF INTENTIONAL REPOSE",
    description:
      "Sanctuaries of effortless calm where cloistered terraces open toward sunken water basins and endless Pacific horizons.",
    materials: "NATURAL HYDRAULIC PLASTER • OILED TEAK • BASALT",
    imageSrc: "/assets/images/living",
    imageAlt: "Aurelia pool courtyard and living sanctuary",
    layout: "living",
  },
  {
    index: "03",
    word: "Light",
    tag: "LUMINESCENT ARCS & SHADOWPLAY",
    description:
      "Orchestrated solar apertures filter raw radiance across natural plaster, shifting the atmosphere through every hour of the solar cycle.",
    materials: "ACOUSTIC DOUBLE GLAZING • BRONZE LOUVRES • LINEAR LIGHTWELLS",
    imageSrc: "/assets/images/light",
    imageAlt: "Aurelia sunlit interior living space",
    layout: "light",
  },
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const concludingTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const concludingText = concludingTextRef.current;
    if (!container || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = container.querySelectorAll<HTMLElement>(".craft-section");

      sections.forEach((section) => {
        const imageReveal = section.querySelector<HTMLElement>(".craft-image-reveal");
        const img = section.querySelector<HTMLElement>("img");
        const parallaxTarget = section.querySelector<HTMLElement>(".craft-parallax");
        const textBlock = section.querySelector<HTMLElement>(".craft-text");

        // 1. Clip path reveal
        if (imageReveal && img) {
          gsap.fromTo(
            imageReveal,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
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

      // Concluding statement "Built for today."
      if (concludingText) {
        gsap.fromTo(
          concludingText.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: concludingText,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="craft" ref={containerRef} className="relative z-20 w-full bg-[#F5F1E8]">
      {craftBlocks.map((pillar, idx) => {
        const isArch = pillar.layout === "architecture";
        const isLiving = pillar.layout === "living";
        const isLight = pillar.layout === "light";

        return (
          <section
            key={pillar.index}
            className="craft-section relative min-h-screen w-full flex flex-col justify-center px-[6vw] py-20 lg:py-28 overflow-hidden bg-[#F5F1E8] text-[#1B1A17]"
          >
            {/* Top Index and Hairline */}
            <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between pb-6 mb-8 lg:mb-12 border-b border-[#1B1A17]/10">
              <div className="flex items-center space-x-3">
                <span className="text-[12px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold">
                  {pillar.index} / 03
                </span>
                {pillar.subtitle && (
                  <>
                    <span className="w-4 h-[1px] bg-[#1B1A17]/20" />
                    <span className="font-serif italic text-sm text-[#6F6A5E]">
                      {pillar.subtitle}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E]">
                {pillar.tag}
              </span>
            </div>

            {/* Main Content Grid: 12 Columns */}
            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
              {/* Architecture */}
              {isArch && (
                <>
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-[-2vw] lg:mb-[-4vw]">
                    <h3 className="font-serif font-light text-[clamp(4.5rem,15vw,18rem)] leading-[0.85] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  <div className="craft-text lg:col-span-5 lg:col-start-1 z-20 space-y-4">
                    <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
                      STRUCTURE &amp; MONOLITH
                    </span>
                    <p className="font-serif text-[1.125rem] leading-[1.7] text-[#6F6A5E] max-w-[34ch]">
                      {pillar.description}
                    </p>
                    <div className="pt-3 border-t border-[#1B1A17]/10 text-[10px] font-sans uppercase tracking-[0.2em] text-[#B8956A]">
                      {pillar.materials}
                    </div>
                  </div>

                  <div className="lg:col-span-5 lg:col-start-8 z-10">
                    <div className="craft-parallax will-change-transform flex justify-end">
                      <div className="craft-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-md w-full max-w-[clamp(260px,28vw,460px)] max-h-[80vh] aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 85vw, 28vw"
                          cinematic={true}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Living */}
              {isLiving && (
                <>
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-[-2vw] lg:mb-[-4vw] lg:text-right">
                    <h3 className="font-serif font-light text-[clamp(4.5rem,15vw,18rem)] leading-[0.85] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  <div className="lg:col-span-5 lg:col-start-1 z-10 order-2 lg:order-1">
                    <div className="craft-parallax will-change-transform flex justify-start">
                      <div className="craft-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-md w-full max-w-[clamp(260px,28vw,460px)] max-h-[80vh] aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 85vw, 28vw"
                          cinematic={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="craft-text lg:col-span-5 lg:col-start-8 z-20 space-y-4 order-1 lg:order-2">
                    <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
                      SANCTUARY &amp; REPOSE
                    </span>
                    <p className="font-serif text-[1.125rem] leading-[1.7] text-[#6F6A5E] max-w-[34ch]">
                      {pillar.description}
                    </p>
                    <div className="pt-3 border-t border-[#1B1A17]/10 text-[10px] font-sans uppercase tracking-[0.2em] text-[#B8956A]">
                      {pillar.materials}
                    </div>
                  </div>
                </>
              )}

              {/* Light */}
              {isLight && (
                <>
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-[-2vw] lg:mb-[-4vw]">
                    <h3 className="font-serif font-light text-[clamp(4.5rem,15vw,18rem)] leading-[0.85] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  <div className="craft-text lg:col-span-5 lg:col-start-1 z-20 space-y-4">
                    <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
                      SOLAR GEOMETRY
                    </span>
                    <p className="font-serif text-[1.125rem] leading-[1.7] text-[#6F6A5E] max-w-[34ch]">
                      {pillar.description}
                    </p>
                    <div className="pt-3 border-t border-[#1B1A17]/10 text-[10px] font-sans uppercase tracking-[0.2em] text-[#B8956A]">
                      {pillar.materials}
                    </div>
                  </div>

                  <div className="lg:col-span-5 lg:col-start-7 z-10">
                    <div className="craft-parallax will-change-transform flex justify-start lg:justify-center">
                      <div className="craft-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-md w-full max-w-[clamp(260px,28vw,460px)] max-h-[80vh] aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 85vw, 28vw"
                          cinematic={true}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {idx < craftBlocks.length - 1 && (
              <div className="w-full max-w-[1920px] mx-auto mt-20 pt-8 border-b border-[#1B1A17]/10" />
            )}
          </section>
        );
      })}

      {/* "Built for today." */}
      <section className="relative w-full py-28 lg:py-40 px-[6vw] bg-[#F5F1E8] border-t border-[#1B1A17]/10 flex flex-col justify-center">
        <div ref={concludingTextRef} className="w-full max-w-[1920px] mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-6 h-[1px] bg-[#B8956A]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold">
              03 / PHILOSOPHY OF PERMANENCE
            </span>
          </div>

          <h3 className="font-serif font-light text-[clamp(3.8rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] text-[#1B1A17] mb-8">
            Built <span className="italic">for today.</span>
          </h3>

          <p className="font-serif text-[1.25rem] sm:text-[1.5rem] text-[#6F6A5E] max-w-2xl leading-relaxed">
            Every proportion calibrated to withstand time. Material integrity, natural ventilation,
            and permanent geometries conceived as living architecture.
          </p>

          <div className="mt-16 pt-8 border-t border-[#1B1A17]/10 flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E]">
            <span>AURELIA CRAFT MONOGRAPH</span>
            <span className="text-[#B8956A]">03 / COMPLETED ARCHIVE</span>
          </div>
        </div>
      </section>
    </div>
  );
}
