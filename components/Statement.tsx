"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const quote = "We don't just build spaces. We shape how life is lived.";
  const words = quote.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const section = sectionRef.current;
    const text = textRef.current;
    const caption = captionRef.current;

    if (!section || !text) return;
    if (prefersReducedMotion) return;

    const wordSpans = text.querySelectorAll(".statement-word");

    const ctx = gsap.context(() => {
      // Fade in caption gently
      if (caption) {
        gsap.fromTo(
          caption,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );
      }

      // Word by word reveal scrubbed from 0.15 to 1
      gsap.fromTo(
        wordSpans,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen bg-[#F5F1E8] flex flex-col justify-center pt-[20vh] pb-[15vh] px-5 sm:px-8 lg:px-[6vw] text-[#1B1A17] overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 relative">
        {/* Caption row with reference indexing */}
        <div ref={captionRef} className="md:col-span-12 flex items-center space-x-4 mb-4">
          <span className="text-[12px] font-sans font-semibold text-[#B8956A] tracking-[0.25em]">
            (01)
          </span>
          <div className="w-8 h-[1px] bg-[#B8956A]" />
          <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.25em] text-[#6F6A5E] font-medium">
            AURELIA ESTATES
          </span>
        </div>

        {/* Thin large serif line revealing word by word */}
        <div className="md:col-span-11 lg:col-span-10">
          <h2
            ref={textRef}
            className="font-serif font-light text-[clamp(2.5rem,6.2vw,6.5rem)] leading-[1.04] tracking-[-0.02em] text-[#1B1A17]"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="statement-word inline-block mr-[0.28em] transition-opacity will-change-[opacity]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Bottom hairline coordinates matching reference */}
        <div className="md:col-span-12 mt-12 sm:mt-20 pt-8 border-t border-[#1B1A17]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#6F6A5E] text-[11px] font-sans tracking-[0.22em] uppercase font-medium gap-4">
          <div className="flex items-center space-x-3">
            <span>AURELIA</span>
            <span className="w-6 h-[1px] bg-[#1B1A17]/20" />
            <span className="text-[#B8956A]">01 / PHILOSOPHY</span>
          </div>
          <div>
            <span>SCULPTED MONOLITHS &amp; PURE SOLAR DIALOGUE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
