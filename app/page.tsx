import { Hero } from "@/components/landing/Hero";
import HeroLayout from "@/components/HeroLayout";
import { WhyWorldSafari } from "@/components/landing/WhyWorldSafari";
import { PopularPackages } from "@/components/landing/PopularPackages";
import { ExperienceJourney } from "@/components/landing/ExperienceJourney";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { CMSSection } from "@/components/landing/CMSSection";
import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  await connectDB();
  const contentData = await PageContent.find({ pageKey: "home" }).lean();
  
  const content = JSON.parse(JSON.stringify(contentData));
  
  const getSection = (key: string) => content.find((c: any) => c.sectionKey === key);
  
  const heroData = getSection("hero");
  const mainContentData = getSection("content");

  return (
    <main className="min-h-screen bg-white">
      <HeroLayout>
        <Hero data={heroData} />
      </HeroLayout>
      
      <WhyWorldSafari />

      {mainContentData && <CMSSection data={mainContentData} />}

      <PopularPackages />
      <ExperienceJourney />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
