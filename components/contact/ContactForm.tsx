"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-50/50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 tracking-tight">
            Send Us a Message
          </h2>
          <p className="text-gray-500 font-light text-xl max-w-2xl mx-auto">
             Tell us about your dream trip, and we'll make it happen.
          </p>
        </div>

        <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-14">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Full Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Phone Number</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="destination" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Destination</label>
                  <Input 
                    id="destination" 
                    placeholder="e.g. Kenya, Tanzania" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <label htmlFor="dates" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Preferred Travel Dates</label>
                  <Input 
                    id="dates" 
                    placeholder="e.g. June 2024" 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all h-14 rounded-xl text-lg font-light placeholder:text-gray-400" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <label htmlFor="message" className="text-sm font-medium text-gray-900 tracking-wide uppercase">Your Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your preferences..." 
                    className="bg-gray-50 border-gray-100 focus:bg-white focus:border-primary/20 transition-all min-h-[180px] rounded-xl text-lg font-light placeholder:text-gray-400 resize-none p-4" 
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-6 pt-6">
                <Button size="lg" className="h-16 px-16 text-lg rounded-full font-serif tracking-wide w-full md:w-auto shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300">
                  Send Enquiry
                </Button>
                <p className="text-gray-400 text-sm font-light flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Our travel experts usually respond within 24 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
