"use client";

import React, { useEffect, useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumPopupProps {
  type: "entry" | "exit";
  delay?: number; // for entry type
  title: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  storageKey?: string;
}

export function PremiumPopup({
  type,
  delay = 5000,
  title,
  description,
  ctaText,
  onCtaClick,
  storageKey = "premium-popup-dismissed",
}: PremiumPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(storageKey);
    if (isDismissed) return;

    if (type === "entry") {
      const timer = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsOpen(true), 100);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setShouldRender(true);
          setTimeout(() => setIsOpen(true), 100);
          window.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
      window.addEventListener("mouseleave", handleMouseLeave);
      return () => window.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [type, delay, storageKey]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(storageKey, "true");
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-6 transition-opacity duration-500",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={handleClose}
      />
      
      <div
        className={cn(
          "relative w-full max-w-lg glass-panel p-8 rounded-3xl premium-shadow border-white/20 transition-all duration-700 ease-out transform",
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-bounce">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-3xl font-serif font-bold text-foreground mb-4 leading-tight">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {description}
          </p>

          <Button
            onClick={() => {
              onCtaClick();
              handleClose();
            }}
            className="w-full h-14 text-lg font-bold rounded-2xl group relative overflow-hidden bg-primary hover:bg-primary/95 transition-all duration-300"
          >
             <span className="relative z-10 flex items-center justify-center gap-2">
              {ctaText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
          
          <p className="mt-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Limited time offer • Premium Experience
          </p>
        </div>
      </div>
    </div>
  );
}
