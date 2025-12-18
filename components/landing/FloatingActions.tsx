"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const { bookOnline, quickEnquiry } = siteConfig.floatingActions;

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col items-end gap-4 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-1000 ease-out fill-mode-forwards">
      {/* Book Online Button */}
      <a
        href={`https://wa.me/${bookOnline.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "pointer-events-auto",
          "group flex items-center gap-2 sm:gap-4",
          "bg-background/95 backdrop-blur-md shadow-2xl border border-border/50",
          "pl-4 sm:pl-6 pr-2 sm:pr-3 py-2 sm:py-3 rounded-3xl sm:rounded-4xl",
          "transition-premium hover:shadow-primary/20 hover:-translate-y-2 active:scale-95"
        )}
      >
        <div className="flex flex-col items-end">
          <span className="text-[8px] sm:text-xs font-black text-primary uppercase tracking-[0.2em] mb-0.5 leading-none">
            {bookOnline.subtext}
          </span>
          <span className="text-[12px] sm:text-base font-bold text-foreground tracking-tight leading-none">
            {bookOnline.label}
          </span>
        </div>
        <div className="relative">
          <div className="absolute -inset-1 sm:-inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-500">
            <Phone className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
        </div>
      </a>

      {/* Quick Enquiry Button */}
      <Link
        href={quickEnquiry.target}
        className={cn(
          "pointer-events-auto",
          "group flex items-center gap-3 sm:gap-4",
          "bg-primary text-white shadow-2xl shadow-primary/40",
          "px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-premium",
          "hover:bg-primary/95 hover:-translate-y-2 active:scale-95 hover:shadow-primary/60"
        )}
      >
        <span className="text-sm sm:text-lg font-bold tracking-tight">
          {quickEnquiry.label}
        </span>
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:rotate-360 transition-transform duration-700">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </Link>
    </div>
  );
}
