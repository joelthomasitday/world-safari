"use client";

import { Shield, Star, Globe } from "lucide-react";

const REASONS = [
  {
    icon: Shield,
    title: "Expert Guidance",
    description: "Our travel specialists have over 15 years of experience crafting bespoke journeys across the globe.",
  },
  {
    icon: Star,
    title: "Luxury Standard",
    description: "We partner only with the finest hotels, lodges, and service providers to ensure exceptional quality.",
  },
  {
    icon: Globe,
    title: "Sustainable Travel",
    description: "We are committed to conservation and community empowerment in every destination we visit.",
  },
];

export function WhyWorldSafari() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-gray-900 mb-6">
            Why World Safari Tours
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light">
            We don't just plan trips; we curate life-enriching experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {REASONS.map((reason, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-500">
                <reason.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-sans font-semibold mb-4 text-gray-900">
                {reason.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
