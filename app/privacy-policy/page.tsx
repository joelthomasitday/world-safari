import { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how World Safari Tours collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-linear-to-b from-[#f8f6f3] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#1a1a1a] mb-6">
              Privacy Policy
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
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">1. Information We Collect</h2>
                <div className="space-y-4">
                  <p className="text-[#555] leading-relaxed">
                    At World Safari Tours, we collect personal information necessary to provide you with our luxury travel services. This may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 text-[#555]">
                    <li>Contact information (name, email address, phone number).</li>
                    <li>Passport and identity information for travel bookings.</li>
                    <li>Payment details for transaction processing.</li>
                    <li>Travel preferences and special requirements (dietary, medical).</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">2. How We Use Your Information</h2>
                <p className="text-[#555] leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-[#555]">
                  <li>Process and manage your travel bookings.</li>
                  <li>Communicate with you regarding your itinerary and enquiries.</li>
                  <li>Personalize your travel experiences.</li>
                  <li>Improve our services and website functionality.</li>
                  <li>Comply with legal and regulatory requirements.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">3. Data Security</h2>
                <p className="text-[#555] leading-relaxed">
                  We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or alteration. All online payment transactions are processed through secure, encrypted gateways.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">4. Sharing Your Information</h2>
                <p className="text-[#555] leading-relaxed">
                  To provide our services, we may share your information with trusted third parties, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-[#555]">
                  <li>Airlines, hotels, and local tour operators.</li>
                  <li>Payment processing services.</li>
                  <li>Regulatory bodies when required by law.</li>
                </ul>
                <p className="text-[#555] leading-relaxed mt-4">
                  We do not sell or rent your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">5. Your Rights</h2>
                <p className="text-[#555] leading-relaxed">
                  You have the right to access, correct, or request the deletion of your personal information. If you wish to exercise any of these rights, please contact us at privacy@worldsafaritours.com.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">6. Cookies</h2>
                <p className="text-[#555] leading-relaxed">
                  Our website uses cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-semibold mb-4 text-[#1a1a1a]">7. Changes to This Policy</h2>
                <p className="text-[#555] leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "last updated" date.
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
