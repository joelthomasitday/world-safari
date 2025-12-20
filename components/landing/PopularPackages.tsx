"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Package type from API
interface Package {
  _id: string;
  slug: string;
  title: string;
  duration: string;
  price: string;
  overview: string;
  images: string[];
}

// Derive location from title/overview (same logic as packages page)
function deriveLocation(pkg: Package): string {
  const text = `${pkg.title} ${pkg.overview}`.toLowerCase();
  if (text.includes('bali') || text.includes('indonesia')) return 'Bali, Indonesia';
  if (text.includes('dubai') || text.includes('uae')) return 'Dubai, UAE';
  if (text.includes('thailand')) return 'Thailand';
  if (text.includes('maldives')) return 'Maldives';
  if (text.includes('safari') || text.includes('africa')) return 'Africa';
  if (text.includes('europe')) return 'Europe';
  if (text.includes('japan')) return 'Japan';
  if (text.includes('india')) return 'India';
  return 'Worldwide';
}

export function PopularPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/packages');
        if (res.ok) {
          const data = await res.json();
          // Get first 3 packages for the homepage
          setPackages(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  return (
    <section id="popular" className="py-20 md:py-32 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <ScrollReveal animation="reveal" delay={100}>
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4 text-white">
                Popular Packages
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="reveal" delay={200}>
              <p className="text-white/60 font-light text-lg">
                Explore our most requested itineraries, fully customizable to your needs.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal animation="reveal-fade" delay={300}>
            <Link 
              href="/packages"
              className="px-6 py-3 border border-white/20 rounded-full font-medium text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden animate-pulse">
                <div className="aspect-4/5 bg-white/10" />
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          // Empty state
          <div className="text-center py-16 text-white/60">
            <p>No packages available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg, idx) => (
              <ScrollReveal 
                key={pkg._id} 
                animation="slide-up" 
                delay={200 + idx * 150}
              >
                <Link 
                  href={`/packages/${pkg.slug}`}
                  className="group relative bg-[#222] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-primary/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 block"
                >
                  {/* Image with Shimmer */}
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <Image
                      src={pkg.images?.[0] || '/placeholder-package.jpg'}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                        <Clock className="w-3 h-3 text-primary" />
                        {pkg.duration}
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold text-white shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      4.9
                    </div>

                    {/* Content Overlaid on Bottom of Image */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                      <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                        {deriveLocation(pkg)}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h3>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Starting from</span>
                          <span className="text-2xl font-bold text-white">
                            ₹ {pkg.price?.toString().replace('$', '')}
                          </span>
                        </div>
                        
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-primary/20">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive Shimmer Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
