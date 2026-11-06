"use client";

import React, { useEffect, useRef } from "react";
import PictureImage from "./PictureImage";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

    if (!container || !pinWrap || !track) return;

    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
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

      return () => {
        horizontalTween.kill();
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative z-20 w-full bg-[#1B1A17] text-[#F5F1E8] overflow-hidden"
    >
      {/* Pinned horizontal wrapper on desktop; normal vertical stack on mobile */}
      <div
        ref={pinWrapRef}
        className="w-full h-auto md:h-screen md:overflow-hidden flex flex-col justify-between pt-[12vh] pb-[10vh]"
      >
        {/* Header Strip with 12vh top spacing */}
        <div className="px-[6vw] flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-6 h-[1px] bg-[#B8956A]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-medium">
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

        {/* Gallery Cards Track: 62vh height, 2rem consistent gap */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-center gap-8 px-[6vw] will-change-transform"
        >
          {galleryCards.map((card) => {
            const isWide = card.aspect === "wide";

            return (
              <div
                key={card.id}
                className={`flex-shrink-0 flex flex-col justify-between w-full ${
                  isWide
                    ? "md:w-[54vw] max-w-[880px]"
                    : "md:w-[28vw] max-w-[420px]"
                }`}
              >
                {/* Image Card Container: Fixed 62vh height */}
                <div className="relative h-[48vh] sm:h-[55vh] md:h-[62vh] w-full overflow-hidden rounded-[2px] bg-[#24231F] shadow-lg group">
                  <PictureImage
                    src={card.src}
                    alt={card.alt}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes={isWide ? "(max-width: 768px) 90vw, 54vw" : "(max-width: 768px) 90vw, 28vw"}
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Captions below image: Number, Title, Tag */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between text-left">
                  <div>
                    <h3 className="font-serif text-[clamp(1.1rem,1.4vw,1.4rem)] font-light text-white/90">
                      {card.title}
                    </h3>
                    <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#B8956A] font-medium block mt-0.5">
                      {card.tag}
                    </span>
                  </div>
                  <span className="text-[12px] font-sans tracking-[0.2em] text-white/35 font-medium ml-4">
                    {card.number}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom space ensuring 10vh breathing room before next section */}
        <div className="hidden md:block h-2" />
      </div>
    </section>
  );
}
