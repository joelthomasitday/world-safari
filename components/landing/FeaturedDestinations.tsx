"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const DESTINATIONS = [
  {
    name: "South Africa",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop",
    description: "Experience the ultimate safari adventure.",
  },
  {
    name: "Kenya",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2671&auto=format&fit=crop",
    description: "Witness the Great Migration in style.",
  },
  {
    name: "Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop", // Using duplicate placeholder for now if needed, or find another
    // Actually let's use a different one
    // "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2669&auto=format&fit=crop"
    // Wait, reusing a good image is safer than a bad random one. I'll pick a diverse one.
    // Tanzania -> Kilimanjaro or Serengeti.
    description: "Home of the Serengeti and Kilimanjaro.",
  },
];

// Correcting the third image to be unique
DESTINATIONS[2].image = "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2669&auto=format&fit=crop";


export function FeaturedDestinations() {
  return (
    <section className=" bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-gray-900 mb-6">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Discover the world's most breathtaking landscapes and wildlife sanctuaries, 
              curated for the discerning traveler.
            </p>
          </div>
          
          <button className="group px-6 py-3 bg-transparent border border-gray-300 rounded-full font-medium text-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center gap-2">
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <div key={idx} className="group relative cursor-pointer">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-sans font-bold mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {dest.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
