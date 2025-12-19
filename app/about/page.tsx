import { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about World Safari Tours - our story, values, and commitment to crafting extraordinary travel experiences across the world's most captivating journeys.",
  openGraph: {
    title: "About World Safari Tours",
    description: "Discover our passion for creating unforgettable travel experiences. Learn about our story and the values that drive us.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-linear-to-b from-[#f8f6f3] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#1a1a1a] mb-6">
              About World Safari Tours
            </h1>
            <p className="text-lg text-[#555] leading-relaxed">
              Crafting extraordinary journeys across the world&apos;s most captivating locations.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-6">
                  Our Story
                </h2>
                <p className="text-[#555] leading-relaxed mb-4">
                  World Safari Tours was founded with a simple yet ambitious vision: to create 
                  travel experiences that go beyond the ordinary. We believe that travel is not 
                  just about visiting places—it&apos;s about connecting with cultures, discovering 
                  hidden gems, and creating memories that last a lifetime.
                </p>
                <p className="text-[#555] leading-relaxed">
                  With years of expertise and a passionate team of travel specialists, we 
                  handcraft each journey to ensure every detail reflects our commitment to 
                  excellence and personalized service.
                </p>
              </div>
              <div className="order-1 md:order-2 relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-tr from-[#c9a227]/5 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative flex justify-center order-2 md:order-1">
                <div className="relative group w-full max-w-[420px]">
                  {/* Elegant border/frame effect */}
                  <div className="absolute -inset-2 bg-linear-to-tr from-[#c9a227]/20 to-transparent rounded-4xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative bg-white p-4 rounded-4xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    <img 
                      src="/owner.png" 
                      alt="Shaji - Founder of World Safari Tours" 
                      className="w-full h-auto rounded-3xl"
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white shadow-xl p-4 rounded-2xl border border-[#f0f0f0] animate-bounce-slow">
                    <p className="text-[#c9a227] font-bold text-xl leading-tight">15+</p>
                    <p className="text-[10px] text-[#555] uppercase tracking-wider font-semibold">Years Experience</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <span className="inline-block px-4 py-1.5 bg-[#c9a227]/10 text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                  Founder's Vision
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-8 leading-tight">
                  Lead by Passion,<br />Driven by Discovery
                </h2>
                
                <div className="space-y-6">
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-[#c9a227]/10 font-serif">"</span>
                    <p className="text-xl text-[#333] font-medium leading-relaxed pl-6 italic">
                      Traditional travel is about seeing. We believe extraordinary travel is about feeling. 
                      Every journey we curate is a piece of my own journey shared with you.
                    </p>
                  </div>
                  
                  <div className="pl-6 space-y-4 pt-4 border-l-2 border-[#c9a227]/30">
                    <p className="text-[#555] leading-relaxed">
                      Our founder, <span className="font-semibold text-[#1a1a1a]">Shaji</span>, established World Safari Tours 
                      with a single guiding principle: to treat every guest's journey as if it were his own. 
                      His deep expertise ensures that your adventure isn't 
                      just a trip, but a transformation.
                    </p>
                    <div>
                      <h4 className="font-playfair text-2xl text-[#1a1a1a] mb-1">Shaji</h4>
                      <p className="text-[#c9a227] font-semibold tracking-wide">Founder & Managing Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#f8f6f3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl font-semibold text-[#1a1a1a] text-center mb-12">
              What We Stand For
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a227]/10 flex items-center justify-center transition-colors group-hover:bg-[#c9a227] group-hover:text-white">
                  <svg className="w-8 h-8 text-[#c9a227] transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Passion</h3>
                <p className="text-sm text-[#555]">
                  Travel is our passion, and we pour that energy into every journey we design.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a227]/10 flex items-center justify-center transition-colors group-hover:bg-[#c9a227] group-hover:text-white">
                  <svg className="w-8 h-8 text-[#c9a227] transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Trust</h3>
                <p className="text-sm text-[#555]">
                  Your safety and satisfaction are our top priorities on every adventure.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a227]/10 flex items-center justify-center transition-colors group-hover:bg-[#c9a227] group-hover:text-white">
                  <svg className="w-8 h-8 text-[#c9a227] transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Excellence</h3>
                <p className="text-sm text-[#555]">
                  We strive for excellence in every detail, from planning to execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Note Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-6">
              Travel With Confidence
            </h2>
            <p className="text-[#555] leading-relaxed mb-10">
              Our team of experienced travel consultants is dedicated to making your 
              dream journey a reality. From your first enquiry to your safe return home, 
              we&apos;re with you every step of the way.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#1a1a1a] text-white font-medium rounded-full hover:bg-[#c9a227] transition-all duration-300 shadow-lg hover:shadow-[#c9a227]/20"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
