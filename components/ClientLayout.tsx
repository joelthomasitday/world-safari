"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { FloatingActions } from "@/components/landing/FloatingActions";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import { PremiumPopup } from "@/components/ui/PremiumPopup";
import { useRouter } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHeroPage = pathname === "/" || 
                    pathname === "/contact" || 
                    pathname === "/about" || 
                    pathname.startsWith("/packages");

  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main className={cn("flex-1 flex flex-col", !isHeroPage && !isAdminPage && "pt-24 lg:pt-32")}>
        {children}
      </main>
      <Toaster />
      {!isAdminPage && <FloatingActions />}
      
      {!isAdminPage && (
        <>
          {/* Entry Popup - Special Offer */}
          <PremiumPopup
            type="entry"
            delay={10000}
            title="Exclusive Early Booking Offer"
            description="Book your next luxury safari before the end of the month and receive a complimentary hot air balloon safari over the Serengeti."
            ctaText="Claim Your Offer"
            onCtaClick={() => router.push("/packages")}
            storageKey="entry-offer-popup"
          />

          {/* Exit Intent Popup - Personalized Consultation */}
          <PremiumPopup
            type="exit"
            title="Wait! Before You Go..."
            description="Not sure which package is right for you? Speak with our expert travel designers for a free personalized consultation."
            ctaText="Request Call Back"
            onCtaClick={() => router.push("/contact")}
            storageKey="exit-intent-popup"
          />
        </>
      )}
    </>
  );
}
