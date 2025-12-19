"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Compass, Map, Heart } from "lucide-react";

export function ExperienceJourney() {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Consultation",
      desc: "Connect with a tour specialist to discuss your interests, preferences, and travel style."
    },
    {
      num: "02",
      icon: Map,
      title: "Curation",
      desc: "We design a bespoke itinerary, selecting the finest lodges and exclusive experiences for you."
    },
    {
      num: "03",
      icon: Heart,
      title: "Journey",
      desc: "Embark on your seamless safari adventure, with 24/7 support throughout your trip."
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-20 md:mb-32">
          <ScrollReveal animation="slide-right">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Process</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gray-900 leading-tight">
              Crafting Your <br />
              <span className="text-primary italic">Perfect</span> Expedition
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative">
          {/* Animated Background Line */}
          <div className="hidden md:block absolute top-[60px] left-0 w-full h-0.5 bg-gray-200">
             <div className="absolute top-0 left-0 h-full bg-primary animate-pulse w-full origin-left" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 200}>
                <div className="relative group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white border border-gray-100 shadow-xl flex items-center justify-center relative z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:border-primary/20 group-hover:shadow-primary/10">
                    <step.icon className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                  
                  {/* Step Number Background */}
                  <div className="absolute -top-12 left-20 md:left-36 text-[120px] font-black text-black/5 select-none pointer-events-none group-hover:text-primary/5 transition-colors">
                    {step.num}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
