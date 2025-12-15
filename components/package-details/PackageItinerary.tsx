"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface PackageItineraryProps {
  itinerary: ItineraryDay[];
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-12 text-center tracking-tight">
          Day-wise Itinerary
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {itinerary.map((item) => (
            <AccordionItem 
              key={item.day} 
              value={`day-${item.day}`}
              className="bg-white border text-left border-gray-200 rounded-xl px-6 shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-black/5"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    {item.day}
                  </div>
                  <span className="text-lg md:text-xl font-medium text-gray-900">
                    {item.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6 pl-[4.5rem]">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
