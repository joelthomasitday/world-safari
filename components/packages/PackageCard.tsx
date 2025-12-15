"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Package {
  id: string;
  title: string;
  image: string;
  destination: string;
  duration: string;
  description: string;
  price?: string;
  slug: string;
}

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Link href={`/packages/${pkg.slug}`} className="block h-full">
      <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient on image bottom for text readability if we put text there, mostly distinct here */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Meta Info */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase mb-3">
            <span>{pkg.destination}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{pkg.duration}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
            {pkg.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-1 grow">
            {pkg.description}
          </p>

          {/* Footer: Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="text-sm font-medium text-gray-500">
              {pkg.price ? (
                <span className="text-gray-900 font-bold text-lg">₹ {pkg.price?.toString().replace('$', '')}</span>
              ) : (
                <span className="italic">Price on request</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
              View Details
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
