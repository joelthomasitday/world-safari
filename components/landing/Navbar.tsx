"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DESTINATIONS = {
  "Asia": ["Thailand", "Singapore", "Malaysia", "Vietnam", "Sri Lanka", "China"],
  "Europe": ["Schengen Tours", "France", "Switzerland", "Italy"],
  "Middle East": ["Dubai", "Abu Dhabi"],
};

const PACKAGES = [
  "All Packages",
  "Honeymoon Packages",
  "Family Tours",
  "Group Tours",
  "Luxury Tours",
];

const EXPERIENCES = [
  "Adventure",
  "Leisure",
  "Honeymoon",
  "Cultural",
  "Wildlife",
];

const ABOUT_US = [
  "Company Profile",
  "Why World Safari",
  "Our Experience (15+ Years)",
];

const CONTACT = [
  "Contact Us",
  "Office Location",
  "Call / WhatsApp",
];

const NAV_ITEMS = [
  { 
    label: "Destinations", 
    hasDropdown: true,
    dropdown: DESTINATIONS,
  },
  { 
    label: "Packages", 
    hasDropdown: true,
    dropdown: PACKAGES,
  },
  { 
    label: "Experiences", 
    hasDropdown: true,
    dropdown: EXPERIENCES,
  },
  { 
    label: "About Us", 
    hasDropdown: true,
    dropdown: ABOUT_US,
  },
  { 
    label: "Contact", 
    hasDropdown: true,
    dropdown: CONTACT,
  },
];

interface NavbarProps {
  scrollThreshold?: number;
}

export function Navbar({ scrollThreshold }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<Record<string, boolean>>({});
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position to determine if navbar is over white sections
  useEffect(() => {
    const handleScroll = () => {
      // Use provided threshold or default to 80% of viewport height
      const threshold = scrollThreshold ?? window.innerHeight * 0.8;
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > threshold); 
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isDropdownObject = (dropdown: any): dropdown is Record<string, string[]> => {
    return typeof dropdown === 'object' && !Array.isArray(dropdown);
  };

  // Dynamic classes based on scroll position
  const navTextClass = isScrolled 
    ? "text-gray-900" 
    : "text-white";
  
  const navBgClass = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
    : "bg-transparent";

  const logoBgClass = isScrolled
    ? "bg-gray-900/10 border-gray-200"
    : "bg-white/10 backdrop-blur-md border-white/20";

  const logoTextClass = isScrolled
    ? "text-gray-900"
    : "text-white";

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBgClass,
        navTextClass
      )}>
        {/* Desktop & Mobile Header Container */}
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 relative">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
              logoBgClass
            )}>
              <span className={cn(
                "font-serif text-xl font-bold transition-colors duration-300",
                logoTextClass
              )}>W</span>
            </div>
            <span className={cn(
              "font-serif text-2xl font-bold tracking-wide transition-colors duration-300",
              navTextClass
            )}>
              World Safari Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.hasDropdown ? (
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={cn(
                              "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out",
                              // Remove default focus rings and borders
                              "outline-none",
                              navTextClass,
                              isScrolled 
                                ? "hover:bg-gray-100 data-[state=open]:bg-gray-100" 
                                : "hover:bg-white/10 data-[state=open]:bg-white/15 data-[state=open]:backdrop-blur-sm"
                            )}
                          >
                            {item.label}
                            <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="start" 
                          sideOffset={8}
                          className="w-[280px] p-3 bg-white/95 backdrop-blur-xl shadow-2xl border-white/20 rounded-xl"
                        >
                          {isDropdownObject(item.dropdown) ? (
                            // Destinations nested structure
                            <>
                              {Object.entries(item.dropdown).map(([region, countries], idx) => (
                                <div key={region} className="mb-2 last:mb-0">
                                  {idx > 0 && <DropdownMenuSeparator className="my-2 bg-gray-100/50" />}
                                  <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] px-3 py-2">
                                    {region}
                                  </DropdownMenuLabel>
                                  {countries.map((country) => (
                                    <DropdownMenuItem key={country} asChild>
                                      <Link
                                        href={`/destinations/${country.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary outline-none transition-all duration-200 cursor-pointer"
                                      >
                                        <span>{country}</span>
                                        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary/50" />
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </div>
                              ))}
                            </>
                          ) : (
                            // Simple array structure (Packages, Experiences, etc.)
                            <div className="space-y-1">
                              {(item.dropdown as string[]).map((subItem) => (
                                <DropdownMenuItem key={subItem} asChild>
                                  <Link
                                    href={`/${item.label.toLowerCase().replace(/\s+/g, '-')}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary outline-none transition-all duration-200 cursor-pointer"
                                  >
                                    <span>{subItem}</span>
                                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary/50" />
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <NavigationMenuLink
                        href={`/${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        className={cn(
                          "text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full",
                          navTextClass,
                          isScrolled 
                            ? "hover:bg-gray-100" 
                            : "hover:bg-white/10 hover:backdrop-blur-sm"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Link href="/enquire">
                Enquire Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "lg:hidden z-50 relative p-2 transition-colors duration-300",
              navTextClass
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col transition-all duration-500 lg:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-1 overflow-y-auto pt-24 pb-24 px-6">
          <div className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const isExpanded = expandedMobileItems[item.label] || false;
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMobileItem(item.label)}
                    className="w-full flex items-center justify-between text-xl font-medium text-white/90 hover:text-white transition-colors py-2"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <X className={cn(
                        "w-5 h-5 transition-transform",
                        isExpanded ? "rotate-45" : "rotate-0"
                      )} />
                    )}
                  </button>
                  {item.hasDropdown && isExpanded && (
                    <div className="mt-2 ml-4 space-y-2 border-l border-white/20 pl-4">
                      {isDropdownObject(item.dropdown) ? (
                        Object.entries(item.dropdown).map(([region, countries]) => (
                          <div key={region} className="space-y-2">
                            <div className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                              {region}
                            </div>
                            {countries.map((country) => (
                              <Link
                                key={country}
                                href={`/destinations/${country.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-base text-white/80 hover:text-white transition-colors py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {country}
                              </Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        (item.dropdown as string[]).map((subItem) => (
                          <Link
                            key={subItem}
                            href={`/${item.label.toLowerCase().replace(/\s+/g, '-')}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block text-base text-white/80 hover:text-white transition-colors py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-center gap-4 p-4">
          <a
            href="tel:+1234567890"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-medium text-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium text-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
