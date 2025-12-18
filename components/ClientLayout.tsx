"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { FloatingActions } from "@/components/landing/FloatingActions";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeroPage = pathname === "/" || 
                    pathname === "/contact" || 
                    pathname === "/about" || 
                    pathname.startsWith("/packages");

  return (
    <>
      <Navbar />
      <main className={cn("flex-1 flex flex-col", !isHeroPage && "pt-24 lg:pt-32")}>
        {children}
      </main>
      <Toaster />
      <FloatingActions />
    </>
  );
}
