"use client";

import React from "react";
import { useSmoothScroll } from "./SmoothScroll";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative z-30 w-full bg-[#F5F1E8] text-[#1B1A17] pt-24 pb-12 px-[6vw] border-t border-[#1B1A17]/10">
      <div className="w-full max-w-[1920px] mx-auto flex flex-col justify-between space-y-20">
        {/* Top Tier: Columns for Address, Contact, Social, Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Philosophy / Monograph */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
              AURELIA MONOGRAPH
            </span>
            <p className="text-[13px] font-serif text-[#6F6A5E] leading-relaxed max-w-sm">
              An architectural exploration of permanence, silence, and natural illumination.
              Designed in collaboration with world-renowned master builders.
            </p>
          </div>

          {/* Address */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
              Palisades Gallery
            </span>
            <address className="not-italic text-[12px] font-sans tracking-[0.16em] text-[#6F6A5E] leading-relaxed">
              100 Ocean Avenue<br />
              Pacific Palisades, CA 90272<br />
              United States
            </address>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
              Private Concierge
            </span>
            <p className="text-[12px] font-sans tracking-[0.16em] text-[#6F6A5E] leading-relaxed">
              salon@aureliaestates.com<br />
              +1 (310) 555-0198
            </p>
          </div>

          {/* Social */}
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B8956A] font-semibold block">
              Journal &amp; Press
            </span>
            <div className="flex flex-col space-y-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#1B1A17]/85">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B8956A] transition-colors"
              >
                Instagram ↗
              </a>
              <a
                href="#editorial"
                className="hover:text-[#B8956A] transition-colors"
              >
                ArchDaily ↗
              </a>
              <a
                href="#press"
                className="hover:text-[#B8956A] transition-colors"
              >
                Press Release ↗
              </a>
            </div>
          </div>
        </div>

        {/* Giant Editorial Wordmark at Bottom */}
        <div className="pt-8 border-t border-[#1B1A17]/10 flex flex-col items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            className="block w-full font-serif font-light text-[clamp(4rem,14vw,14rem)] leading-[0.82] tracking-[-0.04em] text-center text-[#1B1A17] hover:opacity-85 transition-opacity select-none"
            aria-label="Back to top"
          >
            AURELIA
          </a>
        </div>

        {/* Bottom Line: Copyright & Terms */}
        <div className="pt-4 border-t border-[#1B1A17]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-[#6F6A5E] gap-4">
          <span>&copy; 2026 Aurelia Estates. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#1B1A17] transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-[#1B1A17] transition-colors">Architectural Registry</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-[#1B1A17] transition-colors">Legal Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
