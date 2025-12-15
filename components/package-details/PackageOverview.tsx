"use client";

import { CheckCircle2 } from "lucide-react";

interface PackageOverviewProps {
  overview: string;
  highlights: string[];
}

export function PackageOverview({ overview, highlights }: PackageOverviewProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Overview */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-6 tracking-tight">
              Journey Overview
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line font-light">
              {overview}
            </p>
          </div>

          {/* Right Column: Highlights */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-sans font-semibold text-gray-900 mb-6 tracking-tight">
              Trip Highlights
            </h3>
            <ul className="space-y-4">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
