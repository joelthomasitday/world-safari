"use client";

import { Check, X } from "lucide-react";

interface PackageInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function PackageInclusions({ inclusions, exclusions }: PackageInclusionsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Inclusions */}
          <div>
            <h3 className="text-2xl font-sans font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </span>
              What's Included
            </h3>
            <ul className="space-y-4">
              {inclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-600">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div>
            <h3 className="text-2xl font-sans font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-700" />
              </span>
              Not Included
            </h3>
            <ul className="space-y-4">
              {exclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0 opacity-70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
