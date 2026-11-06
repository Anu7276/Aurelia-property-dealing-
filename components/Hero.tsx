"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TOTAL_FRAMES = 72;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Content layers
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

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
          setFramesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Helper to render frame on canvas with object-fit: cover math (always full screen)
    const renderFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const cw = rect.width;
      const ch = rect.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
      ctx.restore();
    };

    // Initial frame draw
    const initialImg = loadedImages[0];
    if (initialImg) {
      if (initialImg.complete) {
        renderFrame(0);
      } else {
        initialImg.onload = () => renderFrame(0);
      }
    }

    const handleResize = () => {
      renderFrame(0);
    };
    window.addEventListener("resize", handleResize);

    // 2. Set up ScrollTrigger timeline (Full-screen pinned scrub with side content scrolling)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const step3 = step3Ref.current;

    if (!container || !pinSection || !step1 || !step2 || !step3) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const ctx = gsap.context(() => {
      const frameTracker = { frame: 0 };

      // Total timeline pinned over 320vh
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

      // A) Scrub the 72 frames continuously from start to finish
      tlScroll.to(
        frameTracker,
        {
          frame: TOTAL_FRAMES - 1,
          snap: "frame",
          ease: "none",
          duration: 1.0,
          onUpdate: () => {
            const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameTracker.frame)));
            renderFrame(idx);
          },
        },
        0
      );

      // B) Step 1: Initial Title fades out during 0 to 0.25 of scroll
      tlScroll.to(
        step1,
        {
          opacity: 0,
          y: -40,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.04
      );

      // C) Step 2: Philosophy side content enters (0.22), holds, then fades out (0.55)
      tlScroll.fromTo(
        step2,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        0.25
      );

      tlScroll.to(
        step2,
        {
          opacity: 0,
          y: -40,
          duration: 0.14,
          ease: "power2.in",
        },
        0.52
      );

      // D) Step 3: Architecture & Light side content enters (0.58), holds, then fades out (0.90)
      tlScroll.fromTo(
        step3,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        0.60
      );

      tlScroll.to(
        step3,
        {
          opacity: 0,
          y: -30,
          duration: 0.12,
          ease: "power2.in",
        },
        0.88
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
      className="relative z-10 w-full h-[320vh] bg-[#0E0D0C]"
    >
      <div id="hero-top" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Pinned full-screen viewport */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Full-bleed HTML5 Canvas rendering WebP frames (ALWAYS FULL SCREEN) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none block z-0"
        />

        {/* Fallback video loop while frames initialize */}
        {!framesLoaded && (
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
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

        {/* Crisp, clear cinematic lighting scrim: transparent and bright so the architecture remains crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none z-10" />

        {/* ======================================================== */}
        {/* STEP 1: INITIAL HERO HEADLINE (From Screenshot)           */}
        {/* ======================================================== */}
        <div
          ref={step1Ref}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-[8vh] sm:pb-[10vh] md:pb-[11vh] px-[6vw] pointer-events-none"
        >
          <div className="max-w-5xl">
            <h1 className="font-serif text-white font-light text-[clamp(2.8rem,7vw,8rem)] leading-[0.96] tracking-[-0.02em] select-none text-left mb-6">
              <span className="block">Where architecture</span>
              <span className="block italic font-light text-white/95">
                meets possibility.
              </span>
            </h1>

            <div className="flex items-center space-x-3 text-[11px] font-sans uppercase tracking-[0.25em] text-white/80 font-medium">
              <span className="w-6 h-[1px] bg-white/60" />
              <span>AURELIA ESTATES</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: PHILOSOPHY CONTENT SCROLLING ON THE SIDE         */}
        {/* ======================================================== */}
        <div
          ref={step2Ref}
          className="absolute inset-y-0 left-0 w-full md:w-[56vw] lg:w-[46vw] max-w-2xl px-5 sm:px-8 md:px-[6vw] flex flex-col justify-center pointer-events-none z-20 opacity-0"
        >
          <div className="p-6 sm:p-10 rounded-[2px] bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl text-left space-y-4 sm:space-y-5">
            <div className="flex items-center space-x-3">
              <span className="text-[12px] font-sans font-semibold text-[#B8956A] tracking-[0.25em]">
                01
              </span>
              <div className="w-6 h-[1px] bg-[#B8956A]" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-white/70 font-medium">
                PHILOSOPHY OF SANCTUARY
              </span>
            </div>

            <h2 className="font-serif font-light text-[clamp(1.6rem,3.2vw,3.2rem)] leading-[1.1] tracking-[-0.015em] text-white/95">
              We don&apos;t just build spaces. We shape how life is lived.
            </h2>

            <p className="font-serif text-[0.95rem] sm:text-[1.1rem] text-white/80 leading-relaxed">
              Monolithic limestone planes, sheer linen drapery, and pure solar apertures
              sculpted for unhurried quietude and seamless dialogue with coastal horizons.
            </p>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#B8956A]">
              <span>12,400 SQ FT</span>
              <span>&bull;</span>
              <span>PACIFIC PALISADES</span>
              <span>&bull;</span>
              <span>WINTER 2027</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 3: ARCHITECTURE & LIGHT CONTENT SCROLLING ON SIDE   */}
        {/* ======================================================== */}
        <div
          ref={step3Ref}
          className="absolute inset-y-0 left-0 w-full md:w-[56vw] lg:w-[46vw] max-w-2xl px-5 sm:px-8 md:px-[6vw] flex flex-col justify-center pointer-events-none z-20 opacity-0"
        >
          <div className="p-6 sm:p-10 rounded-[2px] bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl text-left space-y-4 sm:space-y-5">
            <div className="flex items-center space-x-3">
              <span className="text-[12px] font-sans font-semibold text-[#B8956A] tracking-[0.25em]">
                02
              </span>
              <div className="w-6 h-[1px] bg-[#B8956A]" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-white/70 font-medium">
                THE ART OF PROPORTION
              </span>
            </div>

            <h2 className="font-serif font-light text-[clamp(1.6rem,3.2vw,3.2rem)] leading-[1.1] tracking-[-0.015em] text-white/95">
              Sculpted to capture the dialogue between horizon and earth.
            </h2>

            <p className="font-serif text-[0.95rem] sm:text-[1.1rem] text-white/80 leading-relaxed">
              Every perspective is calibrated to daylight arcs, transforming natural stone
              and reflective waters into living art from dawn to dusk.
            </p>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#B8956A]">
              <span>DISCREET SALONS</span>
              <span>&bull;</span>
              <span>CLOISTERED TERRACES</span>
              <span>&bull;</span>
              <span>REFLECTING POOLS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
