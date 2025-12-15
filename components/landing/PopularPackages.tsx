"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";

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
          
          <Link 
            href="/packages"
            className="px-6 py-3 border border-white/20 rounded-full font-medium text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-64 bg-white/10" />
                <div className="p-6 md:p-8 space-y-4">
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-6 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          // Empty state
          <div className="text-center py-16 text-white/60">
            <p>No packages available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Link 
                key={pkg._id} 
                href={`/packages/${pkg.slug}`}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={pkg.images?.[0] || '/placeholder-package.jpg'}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-white border border-white/20">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    4.9
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary-foreground/80 text-sm font-medium tracking-wide">
                      {deriveLocation(pkg)}
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
                      ₹ {pkg.price?.toString().replace('$', '')}
                    </span>
                    
                    {/* Reuse Hero Button Style exactly */}
                    <span className="group/btn px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full font-medium text-sm group-hover:bg-white group-hover:text-black transition-all flex items-center gap-2 border border-white/20">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
