"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const text = textRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const bg = bgRef.current;

    if (!container || !pinSection || !videoWrapper || !text || !scrollIndicator || !bg) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Pinned scrub timeline over ~250vh
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinSection,
          anticipatePin: 1,
        },
      });

      // 1. Headline and bottom tag fade up and out during initial 30% of scroll
      tlScroll.to(
        text,
        {
          opacity: 0,
          y: -50,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );

      // Scroll indicator fades out quickly
      tlScroll.to(
        scrollIndicator,
        {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Video wrapper shrinks smoothly to centered perspective card
      // Desktop: 60vw wide, ~64vh high, rotateY -6deg, rotateX 3deg, rounded 4px
      // Mobile: 90vw wide, 54vh high, 0deg tilt, rounded 4px
      tlScroll.to(
        videoWrapper,
        {
          width: isMobile ? "90vw" : "60vw",
          height: isMobile ? "54vh" : "64vh",
          borderRadius: "4px",
          rotateY: isMobile ? 0 : -6,
          rotateX: isMobile ? 0 : 3,
          boxShadow: "0 30px 70px -15px rgba(27, 26, 23, 0.3)",
          duration: 0.75,
          ease: "power2.inOut",
        },
        0.05
      );

      // 3. Section background shifts seamlessly to warm architectural cream
      tlScroll.to(
        bg,
        {
          backgroundColor: "#F5F1E8",
          duration: 0.75,
          ease: "power2.inOut",
        },
        0.05
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero-trigger"
      ref={containerRef}
      className="relative z-10 w-full h-[250vh] bg-[#0E0D0C]"
    >
      <div id="hero-top" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Pinned viewport stage */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* Background layer transitioning to cream */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-[#0E0D0C] pointer-events-none -z-10"
        />

        {/* Video Card Container */}
        <div
          ref={videoWrapperRef}
          className="relative w-screen h-screen overflow-hidden transform-gpu will-change-transform flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hero Video Loop */}
          <video
            className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/hero-poster.jpg"
          >
            <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
          </video>

          {/* Dark gradient overlay for pristine contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Hero Overlay Text: Opaque from frame 1, bottom-left aligned with 6vw padding */}
        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex flex-col justify-end pb-[8vh] sm:pb-[10vh] md:pb-[12vh] px-[6vw] pointer-events-none"
        >
          <div className="max-w-6xl">
            <h1 className="font-serif text-white font-light text-[clamp(3rem,8vw,9rem)] leading-[0.95] tracking-[-0.02em] select-none text-left mb-6">
              <span className="block">Where architecture</span>
              <span className="block italic font-light text-white/95">
                meets possibility.
              </span>
            </h1>

            {/* Subtitle tag matching reference video */}
            <div className="flex items-center space-x-3 text-[11px] font-sans uppercase tracking-[0.25em] text-white/70">
              <span className="w-5 h-[1px] bg-[#B8956A]" />
              <span>AURELIA ESTATES</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-white/75 mb-2 font-medium">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/80 via-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
