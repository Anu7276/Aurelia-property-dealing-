"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { gsap } from "@/lib/gsap";

interface GalleryCard {
  id: string;
  number: string;
  title: string;
  tag: string;
  src: string;
  alt: string;
  aspect: "wide" | "portrait";
}

const galleryCards: GalleryCard[] = [
  {
    id: "panorama",
    number: "01",
    title: "The Ocean Meridian",
    tag: "WESTERN HORIZON PANORAMA",
    src: "/assets/images/hero-panorama",
    alt: "Aurelia panoramic horizon view",
    aspect: "wide",
  },
  {
    id: "courtyard",
    number: "02",
    title: "Cloistered Courtyard",
    tag: "CENTRAL PERISTYLE COURT",
    src: "/assets/images/hero-courtyard",
    alt: "Aurelia central cloistered courtyard",
    aspect: "wide",
  },
  {
    id: "architecture",
    number: "03",
    title: "Vertical Monolith",
    tag: "NORTH FACET DETAIL",
    src: "/assets/images/architecture",
    alt: "Aurelia modernist tower architecture",
    aspect: "portrait",
  },
  {
    id: "living",
    number: "04",
    title: "Sunken Water Court",
    tag: "TERRACE & REFLECTING POOL",
    src: "/assets/images/living",
    alt: "Aurelia pool and living space",
    aspect: "portrait",
  },
  {
    id: "light",
    number: "05",
    title: "The Solarium Arc",
    tag: "INTERIOR LIGHTWELL",
    src: "/assets/images/light",
    alt: "Aurelia sunlit living interior",
    aspect: "portrait",
  },
  {
    id: "aurelia-one",
    number: "06",
    title: "Penthouse Pavilion",
    tag: "PRIMARY RESIDENCE WING",
    src: "/assets/images/aurelia-one",
    alt: "Aurelia One private villa",
    aspect: "portrait",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !pinWrap || !track || prefersReducedMotion) return;

    // Use gsap.matchMedia for perfect, robust responsive handling
    const mm = gsap.matchMedia();

    // DESKTOP: Horizontal pinned scroll scrub
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.max(1, track.scrollWidth - window.innerWidth)}`,
          pin: pinWrap,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBar) {
              gsap.set(progressBar, { scaleX: self.progress });
            }
          },
        },
      });
    });

    // MOBILE: Clean reset so track is NEVER shifted left by negative transform
    mm.add("(max-width: 767px)", () => {
      gsap.set(track, { clearProps: "all" });
      if (progressBar) {
        gsap.set(progressBar, { scaleX: 1 });
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative z-20 w-full bg-[#1B1A17] text-[#F5F1E8] overflow-x-clip"
    >
      {/* Pinned horizontal wrapper on desktop; normal clean vertical flow on mobile */}
      <div
        ref={pinWrapRef}
        className="w-full h-auto md:h-screen md:overflow-hidden flex flex-col justify-between py-16 sm:py-20 md:pt-[10vh] md:pb-[8vh]"
      >
        {/* Header Strip with responsive padding */}
        <div className="px-5 sm:px-8 md:px-[6vw] flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-6 h-[1.5px] bg-[#B8956A]" />
              <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.28em] text-[#B8956A] font-semibold">
                THE ARCHIVE
              </span>
            </div>
            <h2 className="font-serif font-light text-[clamp(2.4rem,4.5vw,4.5rem)] leading-tight tracking-tight text-white/95">
              Visual Chronicles
            </h2>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/40">
              HORIZONTAL DISCOVERY
            </span>
            <div className="w-32 h-[1px] bg-white/15 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 w-full h-full bg-[#B8956A] origin-left scale-x-0"
              />
            </div>
          </div>
        </div>

        {/* Gallery Cards: Vertical stack on mobile, horizontal track on desktop */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-10 sm:gap-14 md:gap-8 px-5 sm:px-8 md:px-[6vw] w-full will-change-transform"
        >
          {galleryCards.map((card) => {
            const isWide = card.aspect === "wide";

            return (
              <div
                key={card.id}
                className={`w-full flex-shrink-0 flex flex-col justify-between ${
                  isWide
                    ? "md:w-[54vw] md:max-w-[880px]"
                    : "md:w-[28vw] md:max-w-[420px]"
                }`}
              >
                {/* Image Container with robust aspect ratio on mobile & comfortable 54vh on desktop */}
                <div
                  className={`relative w-full overflow-hidden rounded-[2px] bg-[#24231F] shadow-xl group ${
                    isWide
                      ? "aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[54vh]"
                      : "aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-[54vh]"
                  }`}
                >
                  <PictureImage
                    src={card.src}
                    alt={card.alt}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes={
                      isWide
                        ? "(max-width: 768px) 100vw, 54vw"
                        : "(max-width: 768px) 100vw, 28vw"
                    }
                    cinematic={true}
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Captions below image: Title, Tag, Number */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between text-left w-full">
                  <div>
                    <h3 className="font-serif text-[clamp(1.2rem,1.5vw,1.5rem)] font-light text-white/95">
                      {card.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.24em] text-[#B8956A] font-medium block mt-0.5">
                      {card.tag}
                    </span>
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-sans tracking-[0.2em] text-white/40 font-medium ml-4">
                    {card.number}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Generous bottom spacing ensuring clean breathing room before closing section */}
        <div className="w-full h-12 sm:h-16 md:h-20 pointer-events-none" />
      </div>
    </section>
  );
}