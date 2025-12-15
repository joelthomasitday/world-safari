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
    <section className="py-12 md:py-20 bg-zinc-50 border-t border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto relative">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ease-out ${
                idx === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <Quote className="w-12 h-12 text-primary/20 mb-8" />
              <p className="text-xl md:text-2xl italic text-gray-800 leading-relaxed mb-8">
                "{item.text}"
              </p>
              <div>
                <h4 className="font-sans font-bold text-gray-900 uppercase tracking-widest text-sm">
                  {item.author}
                </h4>
                <p className="text-gray-500 text-sm mt-1">{item.location}</p>
              </div>
            </div>
          ))}

          {/* Spacer to keep section height stable */}
          <div className="invisible opacity-0 pointer-events-none">
            <div className="flex flex-col items-center text-center">
              <Quote className="w-12 h-12 mb-8" />
              <p className="text-xl md:text-2xl leading-relaxed mb-8">
                Placeholder
              </p>
              <div>
                <h4 className="font-sans font-bold text-sm">Name</h4>
                <p className="text-sm mt-1">Location</p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            aria-label="Previous testimonial"
            className="hidden md:flex items-center justify-center absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors w-10 h-10"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            className="hidden md:flex items-center justify-center absolute -right-6 lg:-right-10 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors w-10 h-10"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

        </div>
      </div>
    </section>
  );
}
