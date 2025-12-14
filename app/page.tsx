import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { SocialProof } from "@/components/landing/SocialProof";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SocialProof />
      
      {/* Spacer for future content */}
      <div className="h-screen bg-zinc-50 flex items-center justify-center text-zinc-400">
        <p>Featured Destinations Section Coming Soon...</p>
      </div>
    </main>
  );
}
