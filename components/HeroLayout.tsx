"use client";

import React from "react";

export default function HeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full bg-[#eef1f7]">
      {/* Unified Hero Container - full width */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#f5f7ff] to-white pt-20 lg:pt-0">
        {/* Navbar is now globally in RootLayout */}

        {/* Hero content */}
        <div className="relative px-6 pb-20 pt-5 text-center">{children}</div>
      </div>
    </section>
  );
}

