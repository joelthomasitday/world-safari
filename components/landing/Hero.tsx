"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden rounded-3xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2668&auto=format&fit=crop" 
          alt="Luxury Travel Experience"
          fill
          priority
          className="object-cover object-center rounded-3xl"
          quality={90}
        />
        {/* Subtle Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between text-white">
        
        {/* Spacer for Navbar */}
        <div className="h-24"></div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Main Title */}
          <ScrollReveal animation="reveal" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-normal tracking-wide mb-4 drop-shadow-lg">
             Welcome Aboard
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="reveal" delay={300}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold tracking-tight mb-12 drop-shadow-lg">
              Curated Journeys Beyond Expectations
            </h2>
          </ScrollReveal>

          {/* Call to Action Buttons - Pill Shaped */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <ScrollReveal animation="reveal-scale" delay={500}>
              <Link
                href="/about"
                className="group px-6 py-3 md:px-8 md:py-4 bg-black/40 backdrop-blur-sm rounded-full font-medium text-sm md:text-base hover:bg-black/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20"
              >
                <span>Our Experience</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
            
            <ScrollReveal animation="reveal-scale" delay={600}>
              <Link
                href="/packages"
                className="group px-6 py-3 md:px-8 md:py-4 bg-black/40 backdrop-blur-sm rounded-full font-medium text-sm md:text-base hover:bg-black/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
            
            <ScrollReveal animation="reveal-scale" delay={700}>
              <Link
                href="/contact"
                className="group px-6 py-3 md:px-8 md:py-4 bg-black/40 backdrop-blur-sm rounded-full font-medium text-sm md:text-base hover:bg-black/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20"
              >
                <span>Webinar</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>

        {/* Partner Logos at Bottom */}
        <div className="pb-8 md:pb-12">
          <ScrollReveal animation="reveal-fade" delay={900}>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12 opacity-80">
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">VERTUOSO</div>
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">IATA</div>
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">LUXURY TRAVEL MAGAZINE</div>
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">CONDÉ NAST</div>
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">The New York Times</div>
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">Atta</div>
              <div className="text-white text-xs md:text-sm font-medium tracking-wider">ensemble</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
