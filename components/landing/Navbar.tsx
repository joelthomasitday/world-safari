"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ChevronDown, ChevronRight, MapPin, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// --- Types ---

interface Package {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  price?: string;
  duration?: string;
  overview?: string;
  destination?: string; // Derived or possibly in future API
  isActive?: boolean;
}

// --- Helpers ---

// Helper to determine region
const getRegion = (title: string = "", overview: string = ""): string => {
  const text = (title + " " + overview).toLowerCase();
  
  if (text.includes("bali") || text.includes("japan") || text.includes("asia") || text.includes("thailand") || 
      text.includes("kyoto") || text.includes("vietnam") || text.includes("sri lanka") || text.includes("china") || 
      text.includes("singapore") || text.includes("malaysia") || text.includes("india") || text.includes("kerala") || 
      text.includes("goa") || text.includes("manali")) return "Asia";
      
  if (text.includes("paris") || text.includes("europe") || text.includes("swiss") || text.includes("italy") || 
      text.includes("amalfi") || text.includes("provence") || text.includes("france") || text.includes("germany") || 
      text.includes("spain") || text.includes("greece")) return "Europe";
      
  if (text.includes("dubai") || text.includes("jordan") || text.includes("middle east") || text.includes("egypt") || 
      text.includes("abu dhabi") || text.includes("turkey")) return "Middle East";
      
  if (text.includes("safari") || text.includes("africa") || text.includes("tanzania") || text.includes("serengeti") || 
      text.includes("kenya") || text.includes("masai") || text.includes("south africa") || text.includes("morocco")) return "Africa";
      
  return "International"; 
};

// Expanded list of known countries/destinations to extract from package data
const KNOWN_DESTINATIONS = [
  "Thailand", "Singapore", "Malaysia", "Vietnam", "Sri Lanka", "China", "Japan", "Bali", "India", "Kerala", "Manali", // Asia
  "France", "Switzerland", "Italy", "Greece", "Spain", "Germany", "London", "Paris", // Europe
  "Dubai", "Abu Dhabi", "Jordan", "Egypt", "Turkey", // Middle East
  "Kenya", "Tanzania", "South Africa", "Morocco", "Mauritius", "Seychelles" // Africa
];

export function Navbar({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [packages, setPackages] = React.useState<Package[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const pathname = usePathname();

  // --- Data Fetching ---

  React.useEffect(() => {



    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        if (res.ok) {
          const data = await res.json();
          setPackages(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPackages();

    return () => {};

  }, []);

  // --- Derived Data ---

  // Dynamically group destinations based on available packages
  const destinationsByRegion = React.useMemo(() => {
    const groups: Record<string, Set<string>> = {
      "Asia": new Set(),
      "Europe": new Set(),
      "Middle East": new Set(),
      "Africa": new Set(),
      "International": new Set()
    };

    packages.forEach(pkg => {
      if (pkg.isActive === false) return; // Skip explicitly inactive
      
      const region = getRegion(pkg.title, pkg.overview);
      if (groups[region]) {
        // Try to find specific known destinations in the title
        let found = false;
        KNOWN_DESTINATIONS.forEach(dest => {
          if (pkg.title.toLowerCase().includes(dest.toLowerCase())) {
            groups[region].add(dest);
            found = true;
          }
        });
        // If no specific destination found but region is valid? 
        // We'll rely on the region link itself.
      }
    });

    // Cleanup empty regions and sort
    return Object.entries(groups).reduce((acc, [region, dests]) => {
      if (dests.size > 0) {
        acc[region] = Array.from(dests).sort();
      }
      return acc;
    }, {} as Record<string, string[]>);
  }, [packages]);

  const popularPackages = React.useMemo(() => {
    // Top 4 active packages
    return packages.filter(p => p.isActive !== false).slice(0, 4); 
  }, [packages]);

  // --- Styling ---
  const navClasses = cn(
    "relative z-20 w-full",
    variant === "hero"
      ? "bg-transparent mb-4 "
      : [
          // Mobile / tablet: normal full-width bar at top
          "fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm",
          // Desktop: centered floating pill
          "lg:top-6 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-[95%] lg:max-w-6xl lg:rounded-full lg:shadow-xl"
        ]
  );

  return (
    <>
     <header className={navClasses}>
  <div className="mx-auto max-w-7xl">
    <div className="flex items-center justify-between h-full px-4 lg:px-6 pt-6 pb-3 lg:pt-4 lg:pb-0">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile burger (left on mobile, hidden on desktop) */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 z-50 relative" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src="/WST-logo.png"
                  alt="World Safari logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 hidden md:block">
                World Safari
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <NavigationMenu delayDuration={0}>
              <NavigationMenuList className="gap-1">

                {/* Packages Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full px-4 h-9 text-gray-700 hover:text-primary hover:bg-gray-50 bg-transparent text-sm font-medium focus:bg-gray-50 data-[state=open]:bg-gray-50">
                    Packages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-0 flex outline-none h-full">
                       {/* Featured Sidebar */}
                       <div className="w-1/4 bg-gray-50 p-6 flex flex-col justify-between border-r border-gray-100">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900 mb-2">Featured</h4>
                            <p className="text-xs text-gray-500 mb-4">Handpicked tours for the ultimate experience.</p>
                          </div>
                          <Link href="/packages" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                            View All <ArrowRight className="w-4 h-4" />
                          </Link>
                       </div>
                       
                       {/* Grid */}
                       <div className="w-3/4 p-6 grid grid-cols-2 gap-4">
                          {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                              <div key={i} className="flex gap-3">
                                <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                                <div className="space-y-1 w-full">
                                  <Skeleton className="h-4 w-3/4" />
                                  <Skeleton className="h-3 w-1/2" />
                                </div>
                              </div>
                            ))
                          ) : popularPackages.length > 0 ? (
                            popularPackages.map((pkg) => (
                               <Link key={pkg._id} href={`/packages/${pkg.slug || pkg._id}`} className="flex gap-4 group/card p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                 <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                   {pkg.images?.[0] && (
                                     <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover transition-transform group-hover/card:scale-105" />
                                   )}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                   <h5 className="font-bold text-gray-900 text-sm truncate group-hover/card:text-primary transition-colors">{pkg.title}</h5>
                                   <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                      {pkg.duration && <span>{pkg.duration}</span>}
                                      <span>•</span>
                                      <span>{getRegion(pkg.title, pkg.overview)}</span>
                                   </div>
                                   {pkg.price && <div className="text-xs font-semibold text-primary mt-1">{pkg.price.startsWith('$') || pkg.price.match(/^\d/) ? (pkg.price.includes('$') ? pkg.price : `$${pkg.price}`) : pkg.price}</div>}
                                 </div>
                               </Link>
                            ))
                          ) : (
                            <div className="col-span-2 text-sm text-gray-500 flex items-center justify-center p-4">No packages found</div>
                          )}
                       </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Experiences */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full px-4 h-9 text-gray-700 hover:text-primary hover:bg-gray-50 bg-transparent text-sm font-medium focus:bg-gray-50 data-[state=open]:bg-gray-50">
                    Experiences
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ul className="w-[300px] p-3 outline-none">
                       {["Honeymoon", "Adventure", "Family", "Luxury", "Wildlife"].map((exp) => (
                         <li key={exp}>
                           <Link href={`/packages?experience=${exp.toLowerCase()}`} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                             {exp}
                             <ChevronRight className="w-3 h-3 text-gray-300" />
                           </Link>
                         </li>
                       ))}
                     </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About & Contact */}
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-primary focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-700">
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-primary focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-700">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA (desktop only) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all h-10 px-6 font-medium"
            >
              <Link href="/enquire">Enquire Now</Link>
            </Button>
          </div>

        </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white animate-in slide-in-from-bottom-5 fade-in duration-300 overflow-y-auto pt-28 pb-10 px-6 md:px-10">
           <div className="max-w-md mx-auto space-y-8">
             
             {/* Links */}
             <div className="flex flex-col gap-4 text-lg font-medium text-gray-900">
               <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between border-b border-gray-100 pb-2">
                 All Packages <ArrowRight className="w-4 h-4" />
               </Link>
               <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2">About Us</Link>
               <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2">Contact</Link>
             </div>

             {/* Mobile CTA */}
             <div className="space-y-3 pt-4">
               <Button asChild className="w-full h-12 rounded-full text-lg shadow-xl shadow-primary/20">
                 <Link href="/enquire" onClick={() => setIsMobileMenuOpen(false)}>Plan Your Trip</Link>
               </Button>
               <div className="grid grid-cols-2 gap-3">
                 <Button variant="outline" className="h-10 rounded-full border-gray-200" asChild>
                   <Link href="/contact">Call Us</Link>
                 </Button>
                 <Button className="h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white hover:text-white" asChild>
                   <Link href="https://wa.me/123456789">WhatsApp</Link>
                 </Button>
               </div>
             </div>

           </div>
        </div>
      )}
    </>
  );
}
