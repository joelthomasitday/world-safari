import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactCTA } from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with World Safari Tours. Let us help you plan your dream journey. Contact our travel experts today for personalized travel consultation.",
  openGraph: {
    title: "Contact World Safari Tours",
    description: "Ready to start your journey? Contact our travel experts for personalized consultation and custom travel packages.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
      <Footer />
    </main>
  );
}
