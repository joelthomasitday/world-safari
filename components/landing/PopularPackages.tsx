"use client";

import Image from "next/image";
import { ArrowRight, Clock, Star } from "lucide-react";

// Mock data structure matching potential backend
const PACKAGES = [
  {
    id: 1,
    title: "The Royal Safari",
    location: "South Africa & Botswana",
    duration: "10 Days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop",
    price: "From $5,200",
  },
  {
    id: 2,
    title: "Serengeti Migration",
    location: "Tanzania",
    duration: "7 Days",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2671&auto=format&fit=crop",
    price: "From $4,800",
  },
  {
    id: 3,
    title: "Gorilla Trekking",
    location: "Rwanda & Uganda",
    duration: "5 Days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2669&auto=format&fit=crop",
    price: "From $3,500",
  },
];

export function PopularPackages() {
  return (
    <section className="py-20 md:py-32 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4 text-white">
              Popular Packages
            </h2>
            <p className="text-white/60 font-light text-lg">
              Explore our most requested itineraries, fully customizable to your needs.
            </p>
          </div>
          
          <button className="px-6 py-3 border border-white/20 rounded-full font-medium text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2">
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-white border border-white/20">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {pkg.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary-foreground/80 text-sm font-medium tracking-wide">
                    {pkg.location}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {pkg.duration}
                  </div>
                </div>

                <h3 className="text-2xl font-sans font-bold mb-2 group-hover:text-primary-200 transition-colors">
                  {pkg.title}
                </h3>
                
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-lg font-light text-white/90">
                    {pkg.price}
                  </span>
                  
                  {/* Reuse Hero Button Style exactly */}
                  <button className="group/btn px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full font-medium text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2 border border-white/20">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
