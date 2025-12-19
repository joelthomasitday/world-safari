"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";

interface PackageHeroProps {
  title: string;
  duration: string;
  price?: string;
  backgroundImage: string;
}

export function PackageHero({
  title,
  duration,
  price,
  backgroundImage,
}: PackageHeroProps) {
  const scrollToEnquiry = () => {
    if (typeof document === "undefined") return;
    const target = document.getElementById("enquire-now");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/60 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-white text-center pt-20">
        

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight mb-6 drop-shadow-lg max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 fill-mode-backwards">
          {title}
        </h1>

        {/* Duration & Price */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 fill-mode-backwards">
          <div className="flex items-center gap-2 text-lg md:text-xl font-light">
            <Clock className="w-5 h-5 text-white/80" />
            <span>{duration}</span>
          </div>
          {price && (
            <div className="text-lg md:text-xl font-light">
              <span className="opacity-80">Starting from </span>
              <span className="font-semibold text-white">{price}</span>
            </div>
          )}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards">
          {/* Scroll to the enquiry form section on this page */}
          <button
            type="button"
            onClick={scrollToEnquiry}
            className="group px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          {/* Route to contact page for expert consultation */}
          <Link
            href="/contact"
            className="group px-8 py-4 bg-black/30 backdrop-blur-md border border-white/30 rounded-full font-medium text-base text-white hover:bg-black/50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Talk to Expert</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
