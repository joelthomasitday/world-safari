"use client";

import { Quote } from "lucide-react";
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
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-zinc-50 border-t border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <Quote className="w-12 h-12 text-primary/20 mb-8" />
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed mb-8">
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
        </div>
      </div>
    </section>
  );
}
