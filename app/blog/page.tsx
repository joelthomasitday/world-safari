"use client";

import React, { useState } from "react";
import { Footer } from "@/components/landing/Footer";
import { Calendar, User, ArrowRight, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Planning Your First African Safari",
    excerpt: "Discover everything you need to know about planning an unforgettable safari experience, from the best time to visit to essential packing tips.",
    content: `
      <p>Embarking on your first African safari is a dream for many travelers. The continent offers some of the most spectacular wildlife viewing opportunities on Earth, but planning such a trip requires careful consideration.</p>
      
      <h3>1. Choose Your Destination Wisely</h3>
      <p>Africa is vast, and different regions offer different experiences. East Africa (Kenya and Tanzania) is famous for the Great Migration and vast open plains. Southern Africa (South Africa, Botswana, Namibia) offers diverse landscapes from the Okavango Delta to the Kalahari Desert.</p>
      
      <h3>2. Timing is Everything</h3>
      <p>The best time for wildlife viewing is generally during the dry season (June to October) when animals congregate around water holes and the vegetation is less dense.</p>
      
      <h3>3. What to Pack</h3>
      <p>Focus on neutral-colored clothing, comfortable walking shoes, a good pair of binoculars, and a high-quality camera. Don't forget sun protection and insect repellent!</p>
      
      <p>At World Safari Tours, we specialize in crafting personalized itineraries that match your interests and comfort level. Contact us today to start planning your adventure of a lifetime.</p>
    `,
    date: "Dec 15, 2025",
    author: "Shaji",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
    category: "Safari Guide",
  },
  {
    id: 2,
    title: "10 Hidden Gems in South East Asia You Must Visit",
    excerpt: "Escape the crowds and explore these breathtaking off-the-beaten-path destinations across South East Asia that offer true cultural immersion.",
    content: `
      <p>South East Asia is home to some of the world's most popular tourist destinations, but there are still many hidden gems waiting to be discovered by the intrepid traveler.</p>
      
      <h3>1. Koh Kood, Thailand</h3>
      <p>While many islands in Thailand have become overcrowded, Koh Kood remains a tranquil paradise with pristine beaches and crystal-clear waters.</p>
      
      <h3>2. Hsipaw, Myanmar</h3>
      <p>Nestled in the Shan Hills, Hsipaw offers incredible trekking opportunities through traditional villages and stunning landscapes.</p>
      
      <h3>3. Champasak, Laos</h3>
      <p>Home to the UNESCO-listed Wat Phou temple complex, Champasak is a peaceful town on the banks of the Mekong River.</p>
      
      <p>Exploring these lesser-known spots allows you to connect more deeply with local cultures and experience the authentic charm of South East Asia.</p>
    `,
    date: "Dec 10, 2025",
    author: "World Safari Team",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop",
    category: "Travel Tips",
  },
  {
    id: 3,
    title: "Luxury Meets Adventure: The New Era of Sustainable Travel",
    excerpt: "How modern travelers are seeking high-end experiences that prioritize environmental conservation and support local communities.",
    content: `
      <p>The travel industry is undergoing a significant transformation. Today's luxury travelers are increasingly looking for experiences that not only provide comfort and exclusivity but also have a positive impact on the planet.</p>
      
      <h3>Eco-Friendly Lodges</h3>
      <p>From solar-powered safari camps in the Serengeti to rainforest retreats built with sustainable materials in Costa Rica, luxury lodges are leading the way in environmental stewardship.</p>
      
      <h3>Community Engagement</h3>
      <p>Sustainable travel is also about supporting local people. Many high-end operators now partner with local communities to provide employment and fund conservation projects.</p>
      
      <p>At World Safari Tours, we believe that luxury and sustainability can go hand in hand. We are committed to offering experiences that respect the environment and enrich the lives of everyone involved.</p>
    `,
    date: "Dec 05, 2025",
    author: "Shaji",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop",
    category: "Sustainability",
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openPost = (post: typeof BLOG_POSTS[0]) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-linear-to-b from-[#f8f6f3] to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6">
              Our Journal
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1a1a1a] mb-6">
              Stories & Insights
            </h1>
            <p className="text-lg text-[#555] leading-relaxed">
              Explore our latest travel guides, safari tips, and inspiring stories from around the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => openPost(post)}
              >
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider rounded-xl">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-[#555] leading-relaxed mb-6 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <button 
                      className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group/link hover:gap-3 transition-all"
                    >
                      Read Story <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter / CTA */}
          <div className="mt-24 bg-[#1a1a1a] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -ml-40 -mb-40" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-white mb-6">
                Never Miss an Adventure
              </h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Subscribe to our newsletter and get the latest travel inspiration and exclusive offers delivered straight to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full Story Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent showCloseButton={false} className="max-w-4xl max-h-[90vh] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
          {selectedPost && (
            <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl">
              <div className="relative h-64 md:h-96 w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedPost.image}')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-10 border border-white/20"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block">
                    {selectedPost.category}
                  </span>
                  <DialogTitle className="font-playfair text-3xl md:text-5xl font-bold text-white leading-tight">
                    {selectedPost.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {selectedPost.excerpt}
                  </DialogDescription>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-primary" />
                       <span className="font-semibold">{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <User className="w-4 h-4 text-primary" />
                       <span className="font-semibold">By {selectedPost.author}</span>
                    </div>
                  </div>
                  
                  <div 
                    className="max-w-none text-gray-700 leading-relaxed 
                      [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-playfair
                      [&_p]:mb-6 [&_p]:text-lg [&_p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                  
                  <div className="mt-12 pt-8 border-t border-gray-100 italic text-gray-500 text-center">
                    Interested in a similar journey? <a href="/contact" className="text-primary font-bold not-italic hover:underline underline-offset-4">Let's talk!</a>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
