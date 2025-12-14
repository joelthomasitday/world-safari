"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PackagesHero } from "@/components/packages/PackagesHero";
import { PackagesFilter } from "@/components/packages/PackagesFilter";
import { PackageCard, Package } from "@/components/packages/PackageCard";
import { PackagesCTA } from "@/components/packages/PackagesCTA";
import { Skeleton } from "@/components/ui/skeleton";
// User requested "Smooth transitions only (fade / slide / scale)". I'll use simple CSS or conditional rendering.
// I will stick to React conditional rendering with standard Tailwind transitions for simplicity and robustness unless Framer Motion is confirmed.
// Actually, "Smooth open/close animation" for filters was requested.
// I'll use standard array mapping.

// MOCK DATA
const PACKAGES_DATA: Package[] = [
  {
    id: "1",
    title: "Serengeti Migration Safari",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80",
    destination: "Africa",
    duration: "6-9 days",
    description: "Witness the Great Migration in Tanzania’s Serengeti National Park. A once-in-a-lifetime wildlife spectacle.",
    price: "$4,500",
    slug: "serengeti-migration-safari"
  },
  {
    id: "2",
    title: "Kyoto Cultural Immersion",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
    destination: "Asia",
    duration: "10+ days",
    description: "Experience the ancient traditions of Japan. Tea ceremonies, temple visits, and private geisha entertainment.",
    price: "$6,200",
    slug: "kyoto-cultural-immersion"
  },
  {
    id: "3",
    title: "Amalfi Coast Luxury Escape",
    image: "https://images.unsplash.com/photo-1613809622272-9602e1c4701e?auto=format&fit=crop&q=80",
    destination: "Europe",
    duration: "6-9 days",
    description: "Indulge in la dolce vita with a private yacht tour, cliffside dining, and exclusive villa stays.",
    price: "$5,800",
    slug: "amalfi-coast-luxury-escape"
  },
  {
    id: "4",
    title: "Dubai Desert & City Tour",
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80",
    destination: "Middle East",
    duration: "3-5 days",
    description: "From the Burj Khalifa to a private desert safari. The ultimate blend of modern luxury and Arabian heritage.",
    price: "$3,200",
    slug: "dubai-desert-city-tour"
  },
  {
    id: "5",
    title: "Swiss Alps Ski Retreat",
    image: "https://images.unsplash.com/photo-1526662092594-e9e71e6b0b6b?auto=format&fit=crop&q=80",
    destination: "Europe",
    duration: "6-9 days",
    description: "World-class skiing in St. Moritz combined with five-star chalet accommodation and spa treatments.",
    slug: "swiss-alps-ski-retreat"
  },
  {
    id: "6",
    title: "Bali Honeymoon Paradise",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
    destination: "Asia",
    duration: "10+ days",
    description: "Romantic private pool villas in Ubud and Seminyak. Includes couples massage and sunset dinner cruises.",
    price: "$3,900",
    slug: "bali-honeymoon-paradise"
  },
  {
    id: "7",
    title: "Masai Mara Adventure",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80",
    destination: "Africa",
    duration: "3-5 days",
    description: "An intense, action-packed safari experience in Kenya. Spot the Big Five with expert guides.",
    price: "$2,800",
    slug: "masai-mara-adventure"
  },
  {
    id: "8",
    title: "Paris & Provence Romantique",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
    destination: "Europe",
    duration: "6-9 days",
    description: "A journey through the city of love and the lavender fields of Provence. Wine tasting and gourmet dining included.",
    price: "$5,100",
    slug: "paris-provence-romantique"
  },
  {
    id: "9",
    title: "Jordanian Ancient Wonders",
    image: "https://images.unsplash.com/photo-1549141974-9580b008d77d?auto=format&fit=crop&q=80",
    destination: "Middle East",
    duration: "6-9 days",
    description: "Explore Petra by candlelight and float in the Dead Sea. A historical journey through time.",
    slug: "jordanian-ancient-wonders"
  }
];

// Helper to map filters. 
// Note: In a real app, I'd match exact values or use IDs. Here I match string loosely or exactly.

export default function PackagesPage() {
  const [filters, setFilters] = useState({
    destination: "",
    duration: "",
    experience: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPackages = useMemo(() => {
    return PACKAGES_DATA.filter((pkg) => {
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
         // Simple keyword matching for demo
         if (exp === "honeymoon" && !(title.includes("honeymoon") || title.includes("romanti") || desc.includes("couple"))) return false;
         if (exp === "adventure" && !(title.includes("adventure") || title.includes("safari") || desc.includes("hike") || desc.includes("ski"))) return false;
         if (exp === "family" && !(desc.includes("family") || title.includes("family"))) return false;
         if (exp === "luxury" && !(title.includes("luxury") || desc.includes("luxury") || pkg.price?.includes("5,"))) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar with lower scroll threshold for the shorter hero */}
      <Navbar scrollThreshold={300} />

      {/* Hero Section */}
      <PackagesHero 
        title="Explore Our Travel Packages"
        subtitle="Handcrafted journeys across the world"
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
                <div key={pkg.id} className="animate-in fade-in zoom-in-50 duration-500 fill-mode-both">
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
               <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No packages found</h3>
               <p className="text-gray-500 max-w-md mx-auto">
                 More journeys are being crafted. Check back soon.
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
