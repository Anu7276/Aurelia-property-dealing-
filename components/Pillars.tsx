"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { gsap } from "@/lib/gsap";

interface CraftBlock {
  index: string;
  word: string;
  subtitle: string;
  tag: string;
  category: string;
  description: string;
  materials: string;
  spec: string;
  imageSrc: string;
  imageAlt: string;
  layout: "architecture" | "living" | "light";
}

const craftBlocks: CraftBlock[] = [
  {
    index: "01",
    word: "Architecture",
    subtitle: "A monograph in permanence",
    tag: "MONUMENTAL PROPORTIONS & MASS",
    category: "STRUCTURE & MONOLITH",
    description:
      "Sculpted stone and restrained geometries elevate structural mass into quiet, permanent contemplation across the landscape.",
    materials: "MOLEANOS LIMESTONE • BRONZE JOISTS • STRUCTURAL GLASS",
    spec: "TOLERANCE: ±1.2MM • LOAD: REINFORCED BASALT BEDROCK",
    imageSrc: "/assets/images/architecture",
    imageAlt: "Aurelia modernist tower architecture",
    layout: "architecture",
  },
  {
    index: "02",
    word: "Material & Living",
    subtitle: "The tactile dialogue",
    tag: "THE ART OF INTENTIONAL REPOSE",
    category: "SANCTUARY & REPOSE",
    description:
      "Sanctuaries of effortless calm where cloistered terraces open toward sunken water basins and endless Pacific horizons.",
    materials: "NATURAL HYDRAULIC PLASTER • OILED TEAK • BASALT",
    spec: "ACOUSTIC DAMPING: 48DB RW • THERMAL BARRIER: PASSIVE R-36",
    imageSrc: "/assets/images/living",
    imageAlt: "Aurelia pool courtyard and living sanctuary",
    layout: "living",
  },
  {
    index: "03",
    word: "Light",
    subtitle: "Solar choreography",
    tag: "LUMINESCENT ARCS & SHADOWPLAY",
    category: "SOLAR GEOMETRY",
    description:
      "Orchestrated solar apertures filter raw radiance across natural plaster, shifting the atmosphere through every hour of the solar cycle.",
    materials: "ACOUSTIC DOUBLE GLAZING • BRONZE LOUVRES • LINEAR LIGHTWELLS",
    spec: "SOLAR GAIN: SHGC 0.26 • DAYLIGHT AUTONOMY: 92% YEAR-ROUND",
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
        const parallaxTarget = section.querySelector<HTMLElement>(".craft-parallax");
        const wordReveal = section.querySelector<HTMLElement>(".craft-word-title");
        const textElements = section.querySelectorAll<HTMLElement>(".craft-text-elem");
        const hairline = section.querySelector<HTMLElement>(".craft-hairline");

        // 1. Giant Word Appearing Effect (Slide up + Opacity with graceful ease)
        if (wordReveal) {
          gsap.fromTo(
            wordReveal,
            { opacity: 0, y: 70 },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // 2. Hairline expansion effect
        if (hairline) {
          gsap.fromTo(
            hairline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power2.out",
              transformOrigin: "left",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // 3. Staggered Text Appearing Effect (Category, Description, Materials)
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            }
          );
        }

        // 4. Image Clip-Path Reveal Curtain (Wipe bottom to top + scale down)
        if (imageReveal) {
          gsap.fromTo(
            imageReveal,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );
        }

        // 5. Parallax scroll effect
        if (parallaxTarget) {
          gsap.fromTo(
            parallaxTarget,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });

      // Concluding statement "Built for today." appearing effect
      if (concludingText) {
        gsap.fromTo(
          concludingText.children,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: concludingText,
              start: "top 78%",
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
    <div id="craft" ref={containerRef} className="relative z-20 w-full bg-[#F5F1E8] overflow-hidden">
      {craftBlocks.map((pillar, idx) => {
        const isArch = pillar.layout === "architecture";
        const isLiving = pillar.layout === "living";
        const isLight = pillar.layout === "light";

        return (
          <section
            key={pillar.index}
            className="craft-section relative min-h-screen w-full flex flex-col justify-center px-5 sm:px-8 lg:px-[6vw] py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#F5F1E8] text-[#1B1A17]"
          >
            {/* Top Index and Hairline Header */}
            <div className="w-full max-w-[1920px] mx-auto mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
                    {pillar.index} / 03
                  </span>
                  <span className="w-4 h-[1px] bg-[#1B1A17]/20" />
                  <span className="font-serif italic text-[14px] sm:text-[15px] text-[#6F6A5E]">
                    {pillar.subtitle}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#6F6A5E] font-medium">
                  {pillar.tag}
                </span>
              </div>
              <div className="craft-hairline w-full h-[1px] bg-[#1B1A17]/15 origin-left" />
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-[1920px] mx-auto">
              {/* Architecture Layout */}
              {isArch && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative">
                  {/* Giant Headline Word */}
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-2 sm:mb-[-1vw] lg:mb-[-3vw]">
                    <h3 className="craft-word-title font-serif font-light text-[clamp(3.8rem,13vw,16rem)] leading-[0.88] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Left Column: Prominent Editorial Description */}
                  <div className="lg:col-span-6 z-20 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
                    <div className="craft-text-elem flex items-center space-x-3">
                      <span className="w-6 h-[1.5px] bg-[#B8956A]" />
                      <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
                        {pillar.category}
                      </span>
                    </div>

                    {/* Enriched, prominent headline & body text */}
                    <p className="craft-text-elem font-serif text-[clamp(1.35rem,2.2vw,2.25rem)] font-light leading-[1.45] text-[#1B1A17]">
                      {pillar.description}
                    </p>

                    <div className="craft-text-elem space-y-2 pt-4 border-t border-[#1B1A17]/15">
                      <div className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.24em] text-[#8C7355] font-medium">
                        {pillar.materials}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E]/80">
                        {pillar.spec}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Architectural Photography */}
                  <div className="lg:col-span-6 z-10">
                    <div className="craft-parallax will-change-transform flex justify-start lg:justify-end">
                      <div className="craft-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-xl w-full max-w-[560px] aspect-[4/5] sm:aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          cinematic={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Living Layout (Alternating: Image Left, Text Right) */}
              {isLiving && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative">
                  {/* Giant Headline Word */}
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-2 sm:mb-[-1vw] lg:mb-[-3vw] lg:text-right">
                    <h3 className="craft-word-title font-serif font-light text-[clamp(3.8rem,13vw,16rem)] leading-[0.88] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Image Column */}
                  <div className="lg:col-span-6 z-10 order-2 lg:order-1">
                    <div className="craft-parallax will-change-transform flex justify-start">
                      <div className="craft-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-xl w-full max-w-[560px] aspect-[4/5] sm:aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          cinematic={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="lg:col-span-6 z-20 space-y-6 sm:space-y-8 pl-0 lg:pl-6 order-1 lg:order-2">
                    <div className="craft-text-elem flex items-center space-x-3">
                      <span className="w-6 h-[1.5px] bg-[#B8956A]" />
                      <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
                        {pillar.category}
                      </span>
                    </div>

                    <p className="craft-text-elem font-serif text-[clamp(1.35rem,2.2vw,2.25rem)] font-light leading-[1.45] text-[#1B1A17]">
                      {pillar.description}
                    </p>

                    <div className="craft-text-elem space-y-2 pt-4 border-t border-[#1B1A17]/15">
                      <div className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.24em] text-[#8C7355] font-medium">
                        {pillar.materials}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E]/80">
                        {pillar.spec}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Light Layout */}
              {isLight && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative">
                  {/* Giant Headline Word */}
                  <div className="lg:col-span-12 z-20 relative select-none pointer-events-none mb-2 sm:mb-[-1vw] lg:mb-[-3vw]">
                    <h3 className="craft-word-title font-serif font-light text-[clamp(3.8rem,13vw,16rem)] leading-[0.88] tracking-[-0.03em] text-[#1B1A17]">
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Left Column: Text */}
                  <div className="lg:col-span-6 z-20 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
                    <div className="craft-text-elem flex items-center space-x-3">
                      <span className="w-6 h-[1.5px] bg-[#B8956A]" />
                      <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
                        {pillar.category}
                      </span>
                    </div>

                    <p className="craft-text-elem font-serif text-[clamp(1.35rem,2.2vw,2.25rem)] font-light leading-[1.45] text-[#1B1A17]">
                      {pillar.description}
                    </p>

                    <div className="craft-text-elem space-y-2 pt-4 border-t border-[#1B1A17]/15">
                      <div className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.24em] text-[#8C7355] font-medium">
                        {pillar.materials}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E]/80">
                        {pillar.spec}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Image */}
                  <div className="lg:col-span-6 z-10">
                    <div className="craft-parallax will-change-transform flex justify-start lg:justify-end">
                      <div className="craft-image-reveal overflow-hidden rounded-[2px] bg-[#EFE9DB] shadow-xl w-full max-w-[560px] aspect-[4/5] sm:aspect-[3/4]">
                        <PictureImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          cinematic={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {idx < craftBlocks.length - 1 && (
              <div className="w-full max-w-[1920px] mx-auto mt-16 sm:mt-24 pt-8 border-b border-[#1B1A17]/10" />
            )}
          </section>
        );
      })}

      {/* "Built for today." Concluding Chapter */}
      <section className="relative w-full py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-[6vw] bg-[#F5F1E8] border-t border-[#1B1A17]/10 flex flex-col justify-center">
        <div ref={concludingTextRef} className="w-full max-w-[1920px] mx-auto space-y-8">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#B8956A]" />
            <span className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
              03 / PHILOSOPHY OF PERMANENCE
            </span>
          </div>

          <h3 className="font-serif font-light text-[clamp(3.8rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] text-[#1B1A17]">
            Built <span className="italic">for today.</span>
          </h3>

          <p className="font-serif text-[clamp(1.25rem,2vw,1.85rem)] text-[#6F6A5E] max-w-3xl leading-relaxed font-light">
            Every proportion calibrated to withstand time. Material integrity, natural ventilation,
            and permanent geometries conceived as living architecture.
          </p>

          <div className="pt-8 border-t border-[#1B1A17]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-[#6F6A5E] gap-4">
            <span>AURELIA CRAFT MONOGRAPH</span>
            <span className="text-[#B8956A] font-medium">03 / COMPLETED ARCHIVE</span>
          </div>
        </div>
      </section>
    </div>
  );
}