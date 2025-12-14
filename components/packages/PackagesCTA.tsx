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
          Can’t find what you’re looking for?
        </h2>
        <p className="text-lg md:text-xl font-light text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
           Our travel experts can craft a custom itinerary just for you.
        </p>

        <Link href="/plan-your-journey">
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium text-base hover:bg-white hover:text-black transition-all flex items-center gap-2 mx-auto">
            <span>Plan Your Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </Link>
      </div>
    </section>
  );
}
