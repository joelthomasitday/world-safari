"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Hero() {
  return (
    <section className="relative h-[85vh] sm:h-[95vh] min-h-[600px] sm:min-h-[700px] w-full overflow-hidden sm:rounded-[2.5rem] mt-0 sm:mt-2 group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2668&auto=format&fit=crop" 
          alt="Luxury Travel Experience"
          fill
          priority
          className="object-cover object-center transition-transform duration-[10000ms] ease-out group-hover:scale-110"
          quality={95}
        />
        {/* Premium Readability Overlay Layering */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between text-white">
        
        {/* Top Spacer for Navbar - Reduced for mobile */}
        <div className="h-16 sm:h-24 md:h-32 shrink-0"></div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-4 sm:py-0">
          {/* Main Title Tag */}
          <ScrollReveal animation="slide-down" delay={100}>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-bold tracking-[0.3em] uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full drop-shadow-lg">
              EST. 2005 • The Hallmark of Premium Travel
            </span>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="reveal" delay={300}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 drop-shadow-[0_12px_40px_rgba(0,0,0,0.7)] leading-[1.1] px-2 sm:px-0">
              Curated Journeys <br />
              <span className="text-[#a7d08c] italic drop-shadow-[0_4px_15px_rgba(0,0,0,0.4)]">Beyond</span> Expectations
            </h1>
          </ScrollReveal>

          {/* Call to Action Buttons - Pill Shaped */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 w-full max-w-sm sm:max-w-none px-6 sm:px-0">
            <ScrollReveal animation="reveal-scale" delay={500} className="w-full sm:w-auto">
              <Link
                href="/packages"
                className="group w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-base md:text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
            
            <ScrollReveal animation="reveal-scale" delay={600} className="w-full sm:w-auto">
              <Link
                href="/about"
                className="group w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-white/30 shadow-xl"
              >
                <span>Our Story</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Stats Bar */}
          <ScrollReveal animation="reveal-fade" delay={800} className="w-full max-w-4xl px-4 sm:px-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-16 pt-8 border-t border-white/20 w-full mx-auto">
              <div className="flex flex-col items-center">
                <AnimatedCounter end={18} suffix="+" className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 drop-shadow-md" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 drop-shadow-sm text-center">Years of Expertise</span>
              </div>
              <div className="flex flex-col items-center">
                <AnimatedCounter end={150} suffix="+" className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 drop-shadow-md" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 drop-shadow-sm text-center">Destinations</span>
              </div>
              <div className="flex flex-col items-center">
                <AnimatedCounter end={1200} suffix="+" className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 drop-shadow-md" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 drop-shadow-sm text-center">Happy Clients</span>
              </div>
              <div className="flex flex-col items-center">
                <AnimatedCounter end={98} suffix="%" className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 drop-shadow-md" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 drop-shadow-sm text-center">Satisfaction</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
