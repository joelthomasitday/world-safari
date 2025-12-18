"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "Connect with a tour specialist to discuss your interests, preferences, and travel style."
    },
    {
      num: "02",
      title: "Curation",
      desc: "We design a bespoke itinerary, selecting the finest lodges and exclusive experiences for you."
    },
    {
      num: "03",
      title: "Journey",
      desc: "Embark on your seamless safari adventure, with 24/7 support throughout your trip."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="reveal" delay={100}>
          <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-gray-900 mb-16 md:mb-24 text-center">
            How It Works
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gray-200 -z-10" />

          {steps.map((step, idx) => (
            <ScrollReveal key={idx} animation="reveal" delay={100 + idx * 200}>
              <div className="flex flex-col items-center text-center bg-white group">
                <div className="w-24 h-24 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-3xl font-bold text-primary mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/20 group-hover:shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-2xl font-sans font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light max-w-xs">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
