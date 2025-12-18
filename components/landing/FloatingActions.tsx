"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const { bookOnline, quickEnquiry } = siteConfig.floatingActions;

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col items-end gap-3 sm:gap-4 pointer-events-none">
      {/* Book Online Button */}
      <a
        href={`https://wa.me/${bookOnline.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "pointer-events-auto",
          "group flex items-center gap-3 sm:gap-4",
          "bg-background/95 backdrop-blur-md shadow-xl border border-border/50",
          "pl-5 pr-3 py-2.5 rounded-2xl sm:rounded-3xl",
          "transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 active:scale-95"
        )}
      >
        <div className="flex flex-col items-end">
          <span className="text-xs sm:text-sm font-extrabold text-foreground tracking-tight">
            {bookOnline.label}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-primary/80 uppercase tracking-widest leading-tight">
            {bookOnline.subtext}
          </span>
        </div>
        <div className="relative">
          <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-sm group-hover:bg-primary/30 transition-colors" />
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </a>

      {/* Quick Enquiry Button */}
      <Link
        href={quickEnquiry.target}
        className={cn(
          "pointer-events-auto",
          "group flex items-center gap-3 sm:gap-4",
          "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
          "px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out",
          "hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95"
        )}
      >
        <span className="text-sm sm:text-base font-bold tracking-tight">
          {quickEnquiry.label}
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </Link>
    </div>
  );
}
