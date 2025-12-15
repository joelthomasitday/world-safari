"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, PhoneCall } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="pb-20 bg-white">
       <div className="container mx-auto px-6 max-w-4xl text-center">
         <h2 className="text-2xl font-semibold text-gray-900 mb-8">Prefer instant assistance?</h2>
         <div className="flex flex-col sm:flex-row justify-center gap-6">
           {/* Open WhatsApp chat in a new tab */}
           <Button
             asChild
             variant="outline"
             size="lg"
             className="h-14 px-8 border-gray-200 text-gray-700 hover:text-green-600 hover:border-green-600 hover:bg-green-50 rounded-full gap-3 transition-all"
           >
             <a
               href="https://wa.me/919947247200"
               target="_blank"
               rel="noopener noreferrer"
             >
               <MessageCircle className="w-5 h-5 inline-block mr-2" />
               WhatsApp Us
             </a>
           </Button>

           {/* Click-to-call using the primary phone number */}
           <Button
             asChild
             variant="outline"
             size="lg"
             className="h-14 px-8 border-gray-200 text-gray-700 hover:text-primary hover:border-primary hover:bg-primary/5 rounded-full gap-3 transition-all"
           >
             <a href="tel:+919947247200">
               <PhoneCall className="w-5 h-5 inline-block mr-2" />
               Call Now
             </a>
           </Button>
         </div>
       </div>
    </section>
  );
}
