import { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions for booking your luxury travel experience with World Safari Tours.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-linear-to-b from-[#f8f6f3] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#1a1a1a] mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg text-[#555] leading-relaxed">
              Last updated: December 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">1. Introduction</h2>
                <p className="text-[#555] leading-relaxed">
                  Welcome to World Safari Tours. These Terms and Conditions govern your use of our website and the booking of any travel services through us. By accessing our website or booking a tour, you agree to be bound by these terms.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">2. Booking and Payment</h2>
                <div className="space-y-4">
                  <p className="text-[#555] leading-relaxed">
                    A booking is only confirmed once we receive a deposit and issue a confirmation invoice. For luxury safari packages, a 30% non-refundable deposit is typically required at the time of booking.
                  </p>
                  <p className="text-[#555] leading-relaxed">
                    Full payment must be received no later than 60 days before the departure date. If the balance is not paid in full by the due date, we reserve the right to cancel your booking and retain your deposit.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">3. Cancellations and Refunds</h2>
                <p className="text-[#555] leading-relaxed">
                  Cancellations must be made in writing. The following cancellation charges apply based on the number of days before departure:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-[#555]">
                  <li>More than 60 days: Deposit only</li>
                  <li>30-60 days: 50% of total tour cost</li>
                  <li>Less than 30 days: 100% of total tour cost</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">4. Travel Insurance</h2>
                <p className="text-[#555] leading-relaxed">
                  It is a condition of booking with World Safari Tours that you have comprehensive travel insurance. This insurance should cover personal accident, medical expenses, repatriation, and cancellation or curtailment of your trip.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">5. Responsibility and Liability</h2>
                <p className="text-[#555] leading-relaxed">
                  World Safari Tours acts as an agent for various service providers. While we choose our partners with the utmost care, we cannot be held liable for the acts or omissions of third-party suppliers, including airlines, hotels, and local tour operators.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">6. Health and Safety</h2>
                <p className="text-[#555] leading-relaxed">
                  Travelers are responsible for ensuring they are in good health and have all necessary vaccinations and health documentation for their chosen destination. We recommend consulting a travel clinic at least 8 weeks prior to departure.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">7. Governing Law</h2>
                <p className="text-[#555] leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which World Safari Tours is registered.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
