 "use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
    <section className="bg-zinc-50 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <ScrollReveal animation="reveal" delay={100}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-gray-900 mb-6">
                Featured Destinations
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="reveal" delay={200}>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Discover the world's most breathtaking landscapes and wildlife sanctuaries, 
                curated for the discerning traveler.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal animation="reveal-fade" delay={300}>
            <Link
              href="/packages"
              className="group px-6 py-3 bg-transparent border border-gray-300 rounded-full font-medium text-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center gap-2"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DESTINATIONS.map((dest, idx) => (
            <ScrollReveal 
              key={idx} 
              animation="slide-up" 
              delay={200 + idx * 150}
              className="group"
            >
            <Link href={`/packages?search=${dest.name}`} className="block relative cursor-pointer overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white premium-shadow-hover border border-gray-100/50">
              <div className="relative aspect-square sm:aspect-4/5 w-full overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 sm:opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                
                <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white w-full">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-0 sm:translate-y-4 group-hover:translate-y-0">
                    <span className="h-0.5 w-6 sm:w-8 bg-primary rounded-full" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">Discover More</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 sm:mb-3 tracking-tight">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 sm:text-white/70 font-medium text-sm sm:text-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-0 sm:translate-y-6 group-hover:translate-y-0 line-clamp-2">
                    {dest.description}
                  </p>
                  
                  <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[10px] sm:text-sm font-bold uppercase tracking-tighter opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-0 sm:translate-y-8 group-hover:translate-y-0 group/btn bg-white/20 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/30 hover:bg-primary hover:text-white hover:border-primary w-fit">
                    Plan This Trip
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
