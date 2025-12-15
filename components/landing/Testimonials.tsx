"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

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
    }, 6000);

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
    <section className="py-8 md:py-20 bg-zinc-50 border-t border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto relative group">
          {/* Grid Layout for stacking without absolute positioning issues */}
          <div className="grid grid-cols-1">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className={`col-start-1 row-start-1 flex flex-col items-center text-center transition-all duration-500 ease-out px-2 ${
                  idx === currentIndex
                    ? "opacity-100 translate-y-0 scale-100 z-10"
                    : "opacity-0 translate-y-4 scale-95 -z-10 pointer-events-none"
                }`}
              >
                <Quote className="w-8 h-8 md:w-12 md:h-12 text-primary/20 mb-4 md:mb-8" />
                <p className="text-lg md:text-2xl italic text-gray-800 leading-relaxed mb-6 md:mb-8 text-balance">
                  "{item.text}"
                </p>
                <div>
                  <h4 className="font-sans font-bold text-gray-900 uppercase tracking-widest text-xs md:text-sm">
                    {item.author}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">{item.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            aria-label="Previous testimonial"
            className="md:hidden flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
             onClick={handlePrev}
          >
             {/* Mobile simple arrow if needed, but usually hidden. Keeping distinct from desktop style if we want to show it. 
                 The original code hid them on mobile. I will check if I should enable them. 
                 User request was 'responsiveness', maybe controls help? 
                 Actually, let's keep the desktop ones and maybe add small tap areas or just leave swipe/auto.
                 The original code had `hidden md:flex` for buttons. 
                 I'll keep them consistent but accessible. 
             */}
          </button>

          <button
            type="button"
            aria-label="Previous testimonial"
            className="hidden md:flex items-center justify-center absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors w-10 h-10 z-20"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            className="hidden md:flex items-center justify-center absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors w-10 h-10 z-20"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

        </div>
      </div>
    </section>
  );
}
