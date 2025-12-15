import { Hero } from "@/components/landing/Hero";
import HeroLayout from "@/components/HeroLayout";
import { SocialProof } from "@/components/landing/SocialProof";
import { FeaturedDestinations } from "@/components/landing/FeaturedDestinations";
import { WhyWorldSafari } from "@/components/landing/WhyWorldSafari";
import { PopularPackages } from "@/components/landing/PopularPackages";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroLayout>
        <Hero />
      </HeroLayout>
      {/* <SocialProof /> */}
      <FeaturedDestinations />
      <WhyWorldSafari />
      <PopularPackages />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
