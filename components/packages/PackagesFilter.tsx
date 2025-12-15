"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterState {
  destination: string;
  duration: string;
  experience: string;
}

interface PackagesFilterProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const DESTINATIONS = ["Asia", "Europe", "Middle East", "Africa"];
const DURATIONS = ["3-5 days", "6-9 days", "10+ days"];
const EXPERIENCES = ["Adventure", "Honeymoon", "Family", "Luxury"];

export function PackagesFilter({ filters, setFilters }: PackagesFilterProps) {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          
          {/* Destination Filter */}
          <div className="w-full md:w-auto min-w-[200px]">
            <Select
              value={filters.destination}
              onValueChange={(val) => handleFilterChange("destination", val === "all" ? "" : val)}
            >
              <SelectTrigger className="w-full bg-transparent border-0 shadow-none hover:bg-gray-100/50 rounded-full transition-colors focus:ring-0 focus:ring-offset-0 text-base font-medium text-gray-800">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20 shadow-xl rounded-xl">
                <SelectItem value="all">All Destinations</SelectItem>
                {DESTINATIONS.map((dest) => (
                  <SelectItem key={dest} value={dest} className="cursor-pointer">
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration Filter */}
          <div className="hidden md:block w-px h-8 bg-gray-200" /> {/* Divider */}

          <div className="w-full md:w-auto min-w-[200px]">
            <Select
              value={filters.duration}
              onValueChange={(val) => handleFilterChange("duration", val === "all" ? "" : val)}
            >
               <SelectTrigger className="w-full bg-transparent border-0 shadow-none hover:bg-gray-100/50 rounded-full transition-colors focus:ring-0 focus:ring-offset-0 text-base font-medium text-gray-800">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20 shadow-xl rounded-xl">
                <SelectItem value="all">Any Duration</SelectItem>
                {DURATIONS.map((dur) => (
                  <SelectItem key={dur} value={dur} className="cursor-pointer">
                    {dur}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience Filter */}
          <div className="hidden md:block w-px h-8 bg-gray-200" /> {/* Divider */}

          <div className="w-full md:w-auto min-w-[200px]">
            <Select
              value={filters.experience}
              onValueChange={(val) => handleFilterChange("experience", val === "all" ? "" : val)}
            >
               <SelectTrigger className="w-full bg-transparent border-0 shadow-none hover:bg-gray-100/50 rounded-full transition-colors focus:ring-0 focus:ring-offset-0 text-base font-medium text-gray-800">
                <SelectValue placeholder="Experience Type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20 shadow-xl rounded-xl">
                <SelectItem value="all">All Experiences</SelectItem>
                {EXPERIENCES.map((exp) => (
                  <SelectItem key={exp} value={exp} className="cursor-pointer">
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>
    </div>
  );
}
