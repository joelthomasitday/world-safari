  "use client";

import Image from "next/image";

// Using placeholder logos for the simulation
const LOGOS = [
  { name: "Condé Nast Traveler", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cond%C3%A9_Nast_Traveler_logo.svg/2560px-Cond%C3%A9_Nast_Traveler_logo.svg.png" },
  { name: "National Geographic", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/National_Geographic_Logo.svg/2560px-National_Geographic_Logo.svg.png" },
  { name: "Lonely Planet", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Lonely_Planet_Logo.svg/2560px-Lonely_Planet_Logo.svg.png" },
  { name: "Travel + Leisure", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Travel_%2B_Leisure_logo.svg/2560px-Travel_%2B_Leisure_logo.svg.png" },
  { name: "Forbes", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/2560px-Forbes_logo.svg.png" },
  { name: "The New York Times", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_New_York_Times_logo.png/800px-The_New_York_Times_logo.png" },
];

export function SocialProof() {
  return (
    <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">As Featured In</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 py-4">
          {/* Double the logos to create seamless loop */}
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <div key={`${logo.name}-${idx}`} className="relative h-8 md:h-10 w-32 md:w-48 shrink-0 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500 cursor-pointer">
              <Image 
                src={logo.src} 
                alt={logo.name} 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
