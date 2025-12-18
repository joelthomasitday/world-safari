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

export function Navbar({ variant: propVariant }: { variant?: "default" | "hero" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const [packages, setPackages] = React.useState<Package[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const pathname = usePathname();

  // Auto-detect variant if not explicitly provided
  const variant = propVariant || (
    pathname === "/" || 
    pathname === "/contact" || 
    pathname === "/about" || 
    pathname.startsWith("/packages") 
    ? "hero" : "default"
  );
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const isTransparent = variant === "hero" && !scrolled;

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out",
    isTransparent
      ? "bg-white/5 backdrop-blur-[3px] border-b border-white/5"
      : "bg-background/95 backdrop-blur-md border-b border-border shadow-md",
    // Desktop: centered floating pill when not scrolled and in default variant
    variant !== "hero" && !scrolled && "lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-[95%] lg:max-w-7xl lg:rounded-full lg:shadow-lg lg:border lg:bg-background/95",
    scrolled && "bg-background/95 backdrop-blur-lg shadow-lg py-1 border-b border-border"
  );

  const linkColor = isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary";
  const iconColor = isTransparent ? "text-white" : "text-foreground";

  return (
    <>
     {/* Subtle Overlay for Hero visibility */}
     {isTransparent && <div className="fixed top-0 left-0 right-0 h-32 bg-linear-to-b from-black/50 via-black/20 to-transparent z-40 pointer-events-none transition-opacity duration-500" />}

     <header className={navClasses}>
  <div className="mx-auto max-w-7xl">
    <div className="relative flex items-center justify-between h-full px-4 lg:px-6 py-2 lg:pt-4 lg:pb-0">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile burger (left on mobile, hidden on desktop) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn("lg:hidden p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20", isTransparent ? "text-white hover:bg-white/10" : "text-foreground/80 hover:bg-accent")}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[380px] p-0 border-r border-border">
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-6 text-left border-b border-border">
                    <SheetTitle className="flex items-center gap-2">
                       <div className="relative w-8 h-8">
                         <Image
                           src="/WST-logo.png"
                           alt="World Safari logo"
                           fill
                           className="object-contain"
                         />
                       </div>
                       <span className="font-bold text-xl text-foreground">World Safari</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto py-6 px-6">
                    <div className="flex flex-col gap-6 text-lg font-bold text-foreground">
                       <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between hover:text-primary transition-colors">
                         Home
                       </Link>
                       <Link href="/packages" onClick={() => setIsOpen(false)} className="flex items-center justify-between hover:text-primary transition-colors">
                         All Packages <ChevronRight className="w-4 h-4 text-muted-foreground" />
                       </Link>
                       <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">About Us</Link>
                       <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Contact</Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border">
                       <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Support</h4>
                       <div className="grid gap-3">
                         <Button variant="outline" className="w-full justify-start gap-2 h-11 border-border hover:bg-accent" asChild>
                           <Link href="/contact">
                             <Phone className="w-4 h-4" /> Call Us
                           </Link>
                         </Button>
                         <Button className="w-full justify-start gap-2 h-11 bg-[#25D366] hover:bg-[#128C7E] text-white" asChild>
                           <Link href="https://wa.me/919947247200">
                             <MessageCircle className="w-4 h-4" /> WhatsApp
                           </Link>
                         </Button>
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-muted/30 border-t border-border">
                     <Button asChild className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                       <Link href="/contact" onClick={() => setIsOpen(false)}>Plan Your Trip</Link>
                     </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0 relative z-10 transition-transform active:scale-95">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-all duration-300">
                <Image
                  src="/WST-logo.png"
                  alt="World Safari logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className={cn("text-[16px] xs:text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 whitespace-nowrap", isTransparent ? "text-white" : "text-foreground")}>
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
                  <NavigationMenuTrigger className={cn("rounded-full px-6 h-10 text-lg font-bold transition-all duration-300 bg-transparent focus:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary", isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary")}>
                    Packages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] flex outline-none min-h-[300px]">
                       {/* Featured Sidebar */}
                       <div className="w-1/3 bg-muted/30 p-8 flex flex-col justify-between border-r border-border/50">
                          <div>
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                              Featured
                            </div>
                            <h4 className="font-bold text-xl text-foreground mb-3 leading-tight">Handpicked for You</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Discover our most exclusive and highly-rated travel experiences curated just for your dreams.</p>
                          </div>
                          <Link href="/packages" className="text-primary text-sm font-bold flex items-center gap-2 group/all hover:gap-3 transition-all duration-300 mt-8">
                            View All Packages <ArrowRight className="w-4 h-4" />
                          </Link>
                       </div>
                       
                       {/* Grid */}
                       <div className="w-2/3 p-8 grid grid-cols-2 gap-x-8 gap-y-6">
                          {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                              <div key={i} className="flex gap-4">
                                <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
                                <div className="space-y-2 w-full pt-1">
                                  <Skeleton className="h-4 w-3/4" />
                                  <Skeleton className="h-3 w-1/2" />
                                </div>
                              </div>
                            ))
                          ) : popularPackages.length > 0 ? (
                            popularPackages.map((pkg) => (
                               <Link key={pkg._id} href={`/packages/${pkg.slug || pkg._id}`} className="flex gap-4 group/card items-start">
                                 <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-muted shadow-sm border border-border/50">
                                   {pkg.images?.[0] && (
                                     <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                                   )}
                                 </div>
                                 <div className="flex-1 min-w-0 pt-1">
                                   <h5 className="font-bold text-foreground text-sm leading-snug group-hover/card:text-primary transition-colors line-clamp-2">{pkg.title}</h5>
                                   <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-2 font-medium">
                                      <span className="flex items-center gap-1 uppercase tracking-tight">{pkg.duration}</span>
                                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                      <span className="uppercase tracking-tight">{getRegion(pkg.title, pkg.overview)}</span>
                                   </div>
                                   {pkg.price && <div className="text-sm font-bold text-primary mt-1.5">{pkg.price.includes('$') ? pkg.price.replace('$', '₹') : (pkg.price.match(/^\d/) && !pkg.price.includes('₹') ? `₹${pkg.price}` : pkg.price)}</div>}
                                 </div>
                               </Link>
                            ))
                          ) : (
                            <div className="col-span-2 text-sm text-muted-foreground flex items-center justify-center p-4">No packages found</div>
                          )}
                       </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Experiences */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("rounded-full px-6 h-10 text-lg font-bold transition-all duration-300 bg-transparent focus:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary", isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary")}>
                    Experiences
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ul className="w-[280px] p-4 outline-none">
                       {["Honeymoon", "Adventure", "Family", "Luxury", "Wildlife"].map((exp) => (
                         <li key={exp}>
                           <Link href={`/packages?experience=${exp.toLowerCase()}`} className="flex items-center justify-between px-4 py-3 hover:bg-accent rounded-xl text-sm text-foreground hover:text-primary font-bold transition-all duration-200 group/item mb-1 last:mb-0">
                             {exp}
                             <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-hover/item:translate-x-1" />
                           </Link>
                         </li>
                       ))}
                     </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About & Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                  <Link href="/about" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-6 py-2 text-lg font-bold transition-all duration-300 focus:bg-primary/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50", isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary")}>
                    About Us
                  </Link>
                </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                  <Link href="/contact" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-6 py-2 text-lg font-bold transition-all duration-300 focus:bg-primary/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50", isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary")}>
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
              className={cn("rounded-full shadow-md hover:shadow-lg transition-all h-10 px-6 font-bold text-base", isTransparent ? "bg-white text-primary hover:bg-white/90" : "bg-primary hover:bg-primary/90 text-primary-foreground")}
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
