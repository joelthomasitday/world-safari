"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PackagesCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden text-center text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2671&auto=format&fit=crop"
          alt="Safari Landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold mb-8 tracking-tight drop-shadow-lg">
          Not sure which package fits you?
        </h2>
        <p className="text-lg md:text-xl font-light text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
           Let our experts plan your perfect journey.
        </p>

        {/* Route to existing contact page for enquiries */}
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium text-base hover:bg-white hover:text-black transition-all mx-auto"
        >
          <span>Enquire Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
