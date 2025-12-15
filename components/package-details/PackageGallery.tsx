"use client";

import Image from "next/image";

interface PackageGalleryProps {
  images: string[];
}

export function PackageGallery({ images }: PackageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                index === 0 ? "md:col-span-2 md:row-span-2 min-h-[400px]" : "min-h-[200px]"
              }`}
            >
              <Image
                src={img}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
