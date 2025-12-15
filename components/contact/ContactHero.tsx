"use client";

import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80"
          alt="Contact World Safari"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-white text-center pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-normal tracking-wide mb-4 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
          Get in Touch
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide drop-shadow-lg opacity-90 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 ease-out">
          Let’s start planning your next journey
        </p>
      </div>
    </section>
  );
}
