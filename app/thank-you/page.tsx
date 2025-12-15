import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="hero" />
      
      <section className="relative pt-32 pb-32 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-[#22c55e]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#1a1a1a] mb-6">
              Thank You!
            </h1>

            {/* Message */}
            <p className="text-lg text-[#555] leading-relaxed mb-4">
              Your inquiry has been successfully submitted.
            </p>
            <p className="text-[#555] leading-relaxed mb-10">
              Our travel specialists will review your request and get back to you 
              within 24 hours. We&apos;re excited to help you plan your dream journey!
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#1a1a1a] text-white font-medium rounded-full hover:bg-[#333] transition-colors"
              >
                Return to Home
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] font-medium rounded-full hover:bg-[#f8f6f3] transition-colors"
              >
                Explore More Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
