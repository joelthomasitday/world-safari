"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PackagesHero } from "@/components/packages/PackagesHero";
import { PackagesFilter } from "@/components/packages/PackagesFilter";
import { PackageCard, Package } from "@/components/packages/PackageCard";
import { PackagesCTA } from "@/components/packages/PackagesCTA";
import { Skeleton } from "@/components/ui/skeleton";

// Helper to determine region for filtering (since backend lacks explicit 'destination' field yet)
function getRegion(title: string = "", overview: string = ""): string {
  const text = (title + " " + overview).toLowerCase();
  if (text.includes("bali") || text.includes("japan") || text.includes("asia") || text.includes("thailand") || text.includes("kyoto")) return "Asia";
  if (text.includes("paris") || text.includes("europe") || text.includes("swiss") || text.includes("italy") || text.includes("amalfi") || text.includes("provence")) return "Europe";
  if (text.includes("dubai") || text.includes("jordan") || text.includes("middle east") || text.includes("egypt")) return "Middle East";
  if (text.includes("safari") || text.includes("africa") || text.includes("tanzania") || text.includes("serengeti") || text.includes("kenya") || text.includes("masai")) return "Africa";
  return "International"; 
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    destination: "",
    duration: "",
    experience: ""
  });

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || '/api'}/packages`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        // Map backend data to frontend Package interface
        const mappedPackages: Package[] = Array.isArray(data) ? data.map((pkg: any) => ({
          id: pkg._id,
          title: pkg.title || "Untitled Package",
          // Use first image or fallback
          image: pkg.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop", 
          destination: getRegion(pkg.title, pkg.overview), // Derive region for filters
          duration: pkg.duration || "N/A",
          description: pkg.overview || "No description available.",
          price: pkg.price ? `$${pkg.price}` : "Price on Request", // Ensure currency symbol if missing
          slug: pkg.slug || pkg._id // Use slug from API, fallback to _id for backward compatibility
        })) : [];

        setPackages(mappedPackages);
      } catch (error) {
        console.error("Error loading packages:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Destination Filter
      if (filters.destination && filters.destination !== "all") {
        if (pkg.destination !== filters.destination) return false;
      }
      // Duration Filter
      if (filters.duration && filters.duration !== "all") {
        if (pkg.duration !== filters.duration) return false;
      }
      // Experience Filter
      if (filters.experience && filters.experience !== "all") {
         const exp = filters.experience.toLowerCase();
         const title = pkg.title.toLowerCase();
         const desc = pkg.description.toLowerCase();
         // Simple keyword matching
         if (exp === "honeymoon" && !(title.includes("honeymoon") || title.includes("romanti") || desc.includes("couple"))) return false;
         if (exp === "adventure" && !(title.includes("adventure") || title.includes("safari") || desc.includes("hike") || desc.includes("ski"))) return false;
         if (exp === "family" && !(desc.includes("family") || title.includes("family"))) return false;
         if (exp === "luxury" && !(title.includes("luxury") || desc.includes("luxury") || (pkg.price && pkg.price.includes("5,")))) return false;
      }

      return true;
    });
  }, [packages, filters]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar with same behavior as landing page */}
      <Navbar variant="hero" />

      {/* Hero Section */}
      <PackagesHero 
        title="Explore Our Travel Packages"
        subtitle="Handcrafted journeys designed for unforgettable experiences"
      />

      {/* Sticky Filters */}
      <PackagesFilter filters={filters} setFilters={setFilters} />

      {/* Packages Grid Section */}
      <section className="py-16 md:py-24 bg-white min-h-[500px]">
        <div className="container mx-auto px-6">
          
          {isLoading ? (
             /* Loading State with Skeletons */
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
               {[1, 2, 3, 4, 5, 6].map((n) => (
                 <div key={n} className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                   <Skeleton className="h-64 w-full" />
                   <div className="p-6 flex-1 flex flex-col space-y-4">
                     <Skeleton className="h-4 w-1/3" />
                     <Skeleton className="h-8 w-3/4" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <div className="pt-4 mt-auto flex justify-between items-center border-t border-gray-50">
                       <Skeleton className="h-6 w-1/4" />
                       <Skeleton className="h-4 w-1/4" />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          ) : filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both">
                    <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">No packages found</h3>
               <p className="text-gray-500 max-w-md mx-auto">
                 More journeys coming soon.
               </p>
               <button 
                 onClick={() => setFilters({ destination: "", duration: "", experience: "" })}
                 className="mt-6 text-primary font-medium hover:underline underline-offset-4"
               >
                 Clear all filters
               </button>
            </div>
          )}

        </div>
      </section>

      <PackagesCTA />

      <Footer />
    </main>
  );
}
