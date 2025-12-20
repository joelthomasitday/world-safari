"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const TESTIMONIALS = [
  {
    text: "The abundance of wildlife was staggering. Every detail was handled with precision, making it the most relaxing adventure we've ever had.",
    author: "Sarah & James",
    location: "London, UK",
  },
  {
    text: "World Safari Tours exceeded all expectations. The lodges were exquisite, and the guides were incredibly knowledgeable.",
    author: "Michael R.",
    location: "New York, USA",
  },
  {
    text: "From dawn game drives to starlit dinners, every moment felt thoughtfully curated. We can't wait to book our next safari.",
    author: "Aisha K.",
    location: "Dubai, UAE",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="slide-down" delay={100} className="text-center mb-20 md:mb-32">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gray-900 mb-6">
            Stories from <span className="text-primary italic">Our</span> Guests
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 font-medium">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                    <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" fill className="object-cover" />
                  </div>
                ))}
             </div>
             <span className="ml-2 text-sm">Trusted by 1,200+ Discerning Travelers</span>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto relative group">
          {/* Main Content Area */}
          <div className="relative min-h-[450px] sm:min-h-[400px] md:min-h-[350px] glass-panel rounded-4xl sm:rounded-[3rem] p-8 sm:p-12 md:p-20 shadow-2xl border-gray-100 flex items-center justify-center overflow-hidden">
            <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary/5 z-0" />
            
            <div className="relative z-10 w-full">
              {TESTIMONIALS.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1) ${
                    idx === currentIndex
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                  }`}
                >
                  <p className="text-lg sm:text-xl md:text-3xl font-serif font-medium text-gray-800 leading-[1.6] mb-8 sm:mb-10 text-balance px-4">
                    "{item.text}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                      <span className="text-primary font-bold">{item.author[0]}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs sm:text-sm mb-1">
                      {item.author}
                    </h4>
                    <p className="text-primary font-medium text-[10px] sm:text-xs tracking-wider">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-0">
            {/* Desktop Left Arrow */}
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-20">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 border border-gray-100 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 group/btn"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover/btn:-translate-x-0.5" />
              </button>
            </div>

            {/* Mobile/Tablet Prev Button */}
            <button
              onClick={handlePrev}
              className="md:hidden w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-900 border border-gray-100 active:bg-primary active:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Mobile/Tablet Next Button */}
            <button
              onClick={handleNext}
              className="md:hidden w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-900 border border-gray-100 active:bg-primary active:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Desktop Right Arrow */}
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-20">
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 border border-gray-100 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 group/btn"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-12 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
