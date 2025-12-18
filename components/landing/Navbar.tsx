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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [isOpen, setIsOpen] = React.useState(false);

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
    <div className="relative flex items-center justify-between h-full px-4 lg:px-6 pt-6 pb-3 lg:pt-4 lg:pb-0">
          {/* Mobile Title */}
          <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-1.5 font-bold text-xl text-gray-900 pointer-events-none">
           World Safari Tours
          </div>
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile burger (left on mobile, hidden on desktop) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[380px] p-0">
                <div className="flex flex-col h-full bg-white">
                  <SheetHeader className="p-6 text-left border-b border-gray-100">
                    <SheetTitle className="flex items-center gap-2">
                       <div className="relative w-8 h-8">
                         <Image
                           src="/WST-logo.png"
                           alt="World Safari logo"
                           fill
                           className="object-contain"
                         />
                       </div>
                       <span className="font-bold text-xl">World Safari</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto py-6 px-6">
                    <div className="flex flex-col gap-6 text-lg font-bold text-gray-900">
                       <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between">
                         Home
                       </Link>
                       <Link href="/packages" onClick={() => setIsOpen(false)} className="flex items-center justify-between">
                         All Packages <ChevronRight className="w-4 h-4 text-gray-400" />
                       </Link>
                       <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
                       <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                       <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Support</h4>
                       <div className="grid gap-3">
                         <Button variant="outline" className="w-full justify-start gap-2 h-11" asChild>
                           <Link href="/contact">
                             <Phone className="w-4 h-4" /> Call Us
                           </Link>
                         </Button>
                         <Button className="w-full justify-start gap-2 h-11 bg-[#25D366] hover:bg-[#128C7E] text-white hover:text-white" asChild>
                           <Link href="https://wa.me/123456789">
                             <MessageCircle className="w-4 h-4" /> WhatsApp
                           </Link>
                         </Button>
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                     <Button asChild className="w-full h-11 rounded-xl shadow-lg shadow-primary/20">
                       <Link href="/contact" onClick={() => setIsOpen(false)}>Plan Your Trip</Link>
                     </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative w-20 h-20">
                <Image
                  src="/WST-logo.png"
                  alt="World Safari logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 hidden md:block">
             World Safari Tours
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <NavigationMenu delayDuration={0}>
              <NavigationMenuList className="gap-8">

                {/* Packages Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full px-6 h-10 text-lg font-bold text-gray-900 hover:text-primary hover:bg-primary/10 bg-transparent transition-all duration-200 focus:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
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
                                   {pkg.price && <div className="text-xs font-semibold text-primary mt-1">{pkg.price.includes('$') ? pkg.price.replace('$', '₹') : (pkg.price.match(/^\d/) && !pkg.price.includes('₹') ? `₹${pkg.price}` : pkg.price)}</div>}
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
                  <NavigationMenuTrigger className="rounded-full px-6 h-10 text-lg font-bold text-gray-900 hover:text-primary hover:bg-primary/10 bg-transparent transition-all duration-200 focus:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
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
                  <NavigationMenuLink asChild>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-6 py-2 text-lg font-bold text-gray-900 transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About Us
                  </Link>
                </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                  <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-6 py-2 text-lg font-bold text-gray-900 transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Contact
                  </Link>
                </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA (desktop only) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all h-10 px-6 font-bold text-base"
            >
              {/* Route to existing contact/enquiry flow */}
              <Link href="/contact">Enquire Now</Link>
            </Button>
          </div>

        </div>
        </div>
      </header>


    </>
  );
}
