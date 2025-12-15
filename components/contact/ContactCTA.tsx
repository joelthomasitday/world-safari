"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, PhoneCall } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-20 bg-white">
       <div className="container mx-auto px-6 max-w-4xl text-center">
         <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-8">Prefer instant assistance?</h2>
         <div className="flex flex-col sm:flex-row justify-center gap-6">
           <Button variant="outline" size="lg" className="h-14 px-8 border-gray-200 text-gray-700 hover:text-green-600 hover:border-green-600 hover:bg-green-50 rounded-full gap-3 transition-all">
             <MessageCircle className="w-5 h-5" />
             WhatsApp Us
           </Button>
           <Button variant="outline" size="lg" className="h-14 px-8 border-gray-200 text-gray-700 hover:text-primary hover:border-primary hover:bg-primary/5 rounded-full gap-3 transition-all">
             <PhoneCall className="w-5 h-5" />
             Call Now
           </Button>
         </div>
       </div>
    </section>
  );
}
