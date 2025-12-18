"use client";

import React from "react";

export default function HeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden">
      {children}
    </div>
  );
}

