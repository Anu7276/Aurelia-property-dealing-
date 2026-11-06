import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Pillars from "@/components/Pillars";
import FeaturedResidence from "@/components/FeaturedResidence";
import Gallery from "@/components/Gallery";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative w-full bg-[#F5F1E8] text-[#1B1A17] overflow-x-hidden selection:bg-[#1B1A17] selection:text-[#F5F1E8]">
        {/* Navigation */}
        <Nav />

        {/* Hero Section with pinned scrub video card */}
        <main>
          <Hero />
          <Statement />
          <Pillars />
          <FeaturedResidence />
          <Gallery />
          <Closing />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
