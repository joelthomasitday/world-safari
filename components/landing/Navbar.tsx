"use client";

import * as React from "react";
import Link from "next/link";
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

export function Navbar() {
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
  // Always white pill, static consistent style
  const navClasses = cn(
    "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl",
    "bg-white backdrop-blur-md rounded-full border border-gray-100/50 shadow-xl py-3"
  );

  // Using solid white bg to satisfy 'white bg rounded'.

  return (
    <>
      <header className={navClasses}>
        <div className="px-6 flex items-center justify-between h-full">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:bg-primary/90 transition-colors">
               W
             </div>
             <span className="font-serif text-xl font-bold tracking-tight text-gray-900 hidden md:block">
               World Safari
             </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <NavigationMenu delayDuration={0}>
              <NavigationMenuList className="gap-1">

                {/* Destinations Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full px-4 h-9 text-gray-700 hover:text-primary hover:bg-gray-50 bg-transparent text-sm font-medium focus:bg-gray-50 data-[state=open]:bg-gray-50">
                    Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[650px] p-6 grid grid-cols-12 gap-6 relative outline-none">
                       {/* Decoration */}
                       <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

                       {Object.keys(destinationsByRegion).length > 0 ? (
                         Object.entries(destinationsByRegion).map(([region, dests], idx) => (
                           <div key={region} className={cn(
                             "space-y-3",
                             // Simple masonry-like span logic
                             idx % 2 === 0 ? "col-span-12 md:col-span-5" : "col-span-12 md:col-span-7 pl-6 border-l border-gray-50"
                           )}>
                             <div className="flex items-center gap-2 mb-2">
                               <MapPin className="w-4 h-4 text-primary" />
                               <Link href={`/packages?destination=${region}`} className="font-serif font-bold text-gray-900 hover:text-primary transition-colors">
                                 {region}
                               </Link>
                             </div>
                             <ul className="grid grid-cols-2 gap-2">
                               {dests.map((dest) => (
                                 <li key={dest}>
                                   <Link 
                                     href={`/packages?query=${dest}`} 
                                     className="block rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-all font-medium truncate"
                                   >
                                     {dest}
                                   </Link>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         ))
                       ) : (
                         <div className="col-span-12 text-center py-10 text-gray-500">
                           {isLoading ? (
                             <div className="flex items-center justify-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                               <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                               <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                             </div>
                           ) : "Destinations loading..."}
                         </div>
                       )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

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
                            <h4 className="font-serif font-bold text-lg text-gray-900 mb-2">Featured</h4>
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

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
             <Button asChild className="hidden sm:inline-flex rounded-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all h-10 px-6 font-medium">
               <Link href="/enquire">Enquire Now</Link>
             </Button>
             
             <button 
               className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X className="w-6 h-6 z-50 relative" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white animate-in slide-in-from-bottom-5 fade-in duration-300 overflow-y-auto pt-28 pb-10 px-6 md:px-10">
           <div className="max-w-md mx-auto space-y-8">
             
             {/* Mobile Destination Links */}
             <div className="space-y-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Destinations</h3>
               <div className="space-y-4">
                 {Object.keys(destinationsByRegion).map((region) => (
                   <div key={region} className="border-b border-gray-100 pb-3">
                     <Link href={`/packages?destination=${region}`} className="block text-lg font-bold text-gray-900 mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                       {region}
                     </Link>
                     <div className="flex flex-wrap gap-2">
                       {destinationsByRegion[region].slice(0, 5).map((dest) => (
                         <Link key={dest} href={`/packages?query=${dest}`} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                           {dest}
                         </Link>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>

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
