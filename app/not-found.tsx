import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="hero" />
      
      <section className="relative pt-32 pb-32 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Badge */}
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-[#f8f6f3] border border-[#e5e5e5]">
              <span className="font-playfair text-3xl font-semibold text-[#c9a227]">404</span>
            </div>

            {/* Heading */}
            <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#1a1a1a] mb-6">
              Page Not Found
            </h1>

            {/* Message */}
            <p className="text-lg text-[#555] leading-relaxed mb-10">
              The page you&apos;re looking for seems to have wandered off the trail. 
              Let&apos;s get you back to exploring amazing destinations.
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
                Browse Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
