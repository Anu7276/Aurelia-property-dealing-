"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TOTAL_FRAMES = 72;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bottomBadgeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [framesLoaded, setFramesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 1. Preload all 72 WebP frames progressively
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/assets/hero_frames/frame_${num}.webp`;
      img.onload = () => {
        count++;
        if (count >= 10 && !framesLoaded) {
          // As soon as first few frames are ready, enable canvas render
          setFramesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Helper to render frame on canvas with object-fit: cover logic
    const renderFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const rect = canvas.getBoundingClientRect();

      // Ensure canvas internal resolution matches display size
      if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const cw = rect.width;
      const ch = rect.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover math
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
      ctx.restore();
    };

    // Initial draw when frame 0 is ready
    const initialImg = loadedImages[0];
    if (initialImg) {
      if (initialImg.complete) {
        renderFrame(0);
      } else {
        initialImg.onload = () => renderFrame(0);
      }
    }

    // Window resize handler to redraw canvas
    const handleResize = () => {
      renderFrame(0);
    };
    window.addEventListener("resize", handleResize);

    // 2. Set up ScrollTrigger timeline to scrub through frames & shrink card
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const text = textRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const bottomBadge = bottomBadgeRef.current;
    const bg = bgRef.current;

    if (!container || !pinSection || !videoWrapper || !text || !scrollIndicator || !bg) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const frameTracker = { frame: 0 };

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

      // Frame scrubbing: scrubs 0 to 71 across the scroll
      tlScroll.to(
        frameTracker,
        {
          frame: TOTAL_FRAMES - 1,
          snap: "frame",
          ease: "none",
          duration: 0.85,
          onUpdate: () => {
            const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameTracker.frame)));
            renderFrame(idx);
          },
        },
        0
      );

      // Text and badges fade up and out during initial 30% of scroll
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

      if (bottomBadge) {
        tlScroll.to(
          bottomBadge,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Card shrink: shrinks into floating perspective card
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

      // Background color shift to cream #F5F1E8
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
      window.removeEventListener("resize", handleResize);
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

        {/* Video / Canvas Card Container */}
        <div
          ref={videoWrapperRef}
          className="relative w-screen h-screen overflow-hidden transform-gpu will-change-transform flex items-center justify-center bg-black"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* HTML5 Canvas scrubbing WebP frames */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none block"
          />

          {/* Fallback video loop while frames load or if canvas not supported */}
          {!framesLoaded && (
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
          )}

          {/* Dark gradient overlay for contrast matching screenshot */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
        </div>

        {/* Hero Overlay Text: Matching Reference Screenshot exactly */}
        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex flex-col justify-end pb-[8vh] sm:pb-[10vh] md:pb-[11vh] px-[6vw] pointer-events-none"
        >
          <div className="max-w-6xl">
            {/* Headline */}
            <h1 className="font-serif text-white font-light text-[clamp(3rem,7.5vw,8.5rem)] leading-[0.96] tracking-[-0.02em] select-none text-left mb-6">
              <span className="block">Where architecture</span>
              <span className="block italic font-light text-white/95">
                meets possibility.
              </span>
            </h1>

            {/* Subtitle tag with thin line matching screenshot */}
            <div className="flex items-center space-x-3 text-[11px] font-sans uppercase tracking-[0.25em] text-white/80 font-medium">
              <span className="w-6 h-[1px] bg-white/60" />
              <span>AURELIA ESTATES</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator: matching reference screenshot */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-white/80 mb-2 font-medium">
            SCROLL
          </span>
          <div className="w-[1px] h-7 bg-white/70" />
        </div>

        {/* Bottom Left Badge: Circular badge matching reference screenshot */}
        <div
          ref={bottomBadgeRef}
          className="absolute bottom-8 left-[6vw] z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/85 border border-white/20 text-white text-[11px] font-sans font-bold shadow-lg pointer-events-none"
        >
          N
        </div>
      </div>
    </section>
  );
}
